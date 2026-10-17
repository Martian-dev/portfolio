---
title: "can a model edit video if you just give it ffmpeg?"
excerpt: "i built a deliberately unhelpful harness to find out whether a model can inspect footage, make editorial decisions, and review its own cut."
publishedAt: "2026-10-16"
updatedAt: "2026-10-17"
tags: [draft, video, agents, evaluation]
featured: false
---

<div class="article-callout">
  <strong>draft:</strong> notes on the minimal video-editing harness I built for a multimodal model.
</div>

## the problem with a helpful harness

I wanted to find out whether a multimodal model could edit video on its own. Not generate video, and not turn a list of human-written timecodes into an mp4. I mean the whole annoying loop: inspect the footage, work out what matters, make a cut, watch it back, notice what feels wrong, and revise it.

The first version I built was called `montage`. You give it one stitched source video and an instruction such as "make a 60 second trailer that sets up the conflict." It splits the source at scene changes, transcribes the audio with Whisper, samples three frames from every segment, asks a vision model to describe those frames, and turns the combined index into an edit decision list. ffmpeg handles the final cut.

It is a useful editing pipeline. It is also a bad way to answer my question.

`montage` already knows how an edit should be made. I chose the scene-detection threshold, the number and position of sampled frames, the shape of the edit decision list, and the prompt that tells the model how to select clips. If the output is good, some unknown share of the credit belongs to that scaffolding.

So I built the second version by removing nearly all of the help.

## three tools and no editing advice

The harness puts the model in a CPU-only Linux container with ffmpeg, ffprobe, a local Whisper command, and writable scratch space. Its system prompt is 166 words long. Most of those words explain paths and limits.

The model gets three tools:

| tool | what it does |
| --- | --- |
| `shell(command)` | runs ffmpeg, ffprobe, `transcribe`, or any normal shell command |
| `view(paths)` | puts images or video clips into the model's context |
| `submit(path)` | checks that the final file exists and is playable, then ends the run |

There is no `find_scenes` tool. There is no `make_trailer` tool. The prompt does not suggest extracting frames, detecting cuts, reading a transcript, or reviewing the output. The model has to invent its own workflow from the instruction and the files it finds.

That distinction matters. `view` does not sample the footage for the model. The model uses ffmpeg to create the exact stills or clips it wants, then asks the harness to deliver them. If it wants a contact sheet, it has to make one. If it wants to inspect a transition, it has to render and watch that span. Even deciding what to look at is part of the capability being measured.

The sibling systems now give me a rough control and experiment:

| | `montage` | minimal harness |
| --- | --- | --- |
| segmentation | chosen by human-written code | chosen by the model |
| visual samples | three stills per segment | whatever the model asks to see |
| editing strategy | supplied in a planning prompt | invented during the run |
| review | renders once at the end | can watch and revise its own output |
| purpose | make a useful cut | measure how the model approaches the work |

The gap between their results is more useful than either result by itself.

## there is an asterisk on "multimodal"

The current model is `muse-spark-1.2-contributor`. It accepts images and video in the middle of a tool-using conversation, and it perceives motion across video frames. That part works.

Audio does not. An `audio_url` request fails, while two other accepted audio formats are silently ignored. A model answering as though it heard silence is worse than a loud error, so the harness refuses audio files and tells the model to run `transcribe` instead.

For this version, I use the model's vision for picture and Whisper for speech. The model can reason about what was said and when it was said, but it cannot hear music, delivery, room tone, or the rhythm of a cut. Calling that full audio-and-video editing would be dishonest.

The local transcription is not free either. The default `medium.en-q5_0` Whisper model ran at about 1.5 times realtime on the CPU host used for testing. A smaller model was more than twice as fast on the same sample, but it labelled the opening narration as `[Music]`. The harness keeps the slower default because missing the script can ruin a narration-led edit before the agent has made its first decision.

## the boring parts are part of the measurement

Agent loops fail in ways that have nothing to do with taste. APIs time out. Media fills the context window. A model can repeat the same command forever and remain extremely confident about its progress.

The harness has to handle those failures without quietly becoming the editor.

I bound each run by wall-clock time, cost, and consecutive tool errors. There is no practical turn limit because the number of steps is one of the things I want to observe. Model requests and shell commands cannot run past the time left in the episode.

The API accepts at most 50 images and five videos in one request. Since the full conversation is sent again on every turn, old media has to leave the context eventually. The harness keeps the newest views, replaces older ones with an explicit marker, and batches oversized requests across turns. That makes forgetting visible instead of pretending context is infinite.

I detect stalls through the filesystem rather than asking the model whether it is stuck. The harness watches the output hash, duration, work-directory file count, tool calls, and views. Three identical actions with identical results count as a tight loop. Twelve turns with no observable change count as no progress. The first stall rewinds the loop once; a second one ends the run.

None of those rules choose a clip or improve a cut. They keep the experiment alive long enough to produce an answer.

## what I found

I ended up with a containerized agent loop that handles media delivery, local transcription, retries, budgets, stall recovery, submission checks, and trajectory export. I kept the opinionated `montage` pipeline beside it as a control, including its cached source index and editable JSON decision list.

A minimally prompted vision model can use ordinary media tools to inspect footage, assemble a cut, watch its own work, and revise it. The current model still lacks native audio perception in this region, so it reads speech through Whisper and misses music, delivery, room tone, and other parts of editing that depend on hearing.
