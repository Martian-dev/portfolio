---
title: "how do you give a coding agent a controller?"
excerpt: "six browser games, one very unfinished Minecraft agent, and a lesson in why the environment matters more than the game."
publishedAt: "2026-10-17"
updatedAt: "2026-10-17"
tags: [draft, agents, games, MCP]
featured: true
---

<div class="article-callout">
  <strong>draft:</strong> the browser harness is working across six example games. the Minecraft side is an experiment, and its recordings mostly show failure. that failure is doing useful work.
</div>

## the game is not the hard part

A coding agent already knows the basic loop: inspect some state, choose a tool, see what changed, and try again. Give it a screenshot instead of a repository and keyboard controls instead of a shell, and it can technically play a game.

Technically is carrying a lot of weight there.

Games keep moving while models think. A half-second keypress means something different at 20 FPS and 200 FPS. A screenshot can arrive after the player has already fallen off the platform. "The command ran" does not mean "the action worked." Once an agent is allowed to remember things, one bad observation can turn into a permanent fake fact.

I have been exploring this through two setups. The first is a reusable MCP harness wrapped around six small browser games. The second is an early Minecraft agent built around persistent learning. One is a fairly strict test environment. The other is still a pile of sharp edges around an idea I like.

The useful comparison is not which game is harder. It is what each environment lets the agent claim, and how much evidence it requires before believing that claim.

## pausing the world while the model thinks

The browser setup turns a local WebGL game into a small MCP server. The game can be Unity, Godot, Three.js, or another browser runtime. The harness does not read engine state. It needs an entrypoint, a canvas selector, a ready signal, and a manifest describing the public controls.

An episode looks like this:

1. `game_start` launches Chromium and returns the first screenshot.
2. The complete Chromium process tree is paused with `SIGSTOP`.
3. The agent studies the frozen image and chooses an action.
4. `game_act` or `game_pointer` resumes Chromium, applies input for a bounded window, captures the result, and pauses it again.
5. The next model turn starts from that frozen result.

The pause is the important bit. Model-thinking time can take seconds or minutes, but no game time passes during it. An action duration is quantized onto a 50 ms simulation clock, and the harness tracks gameplay time separately from browser-active time, model-thinking time, and total wall time.

This is much closer to a turn-based API than normal computer use, even when the game itself is real-time. The agent still has to understand pixels and control movement, but API latency cannot quietly change the task.

The MCP surface includes named controls such as `forward`, `jump`, or `fire`. Key controls also get persistent `_down` and `_up` forms, so the agent can hold one input while applying another. For games that need free mouse control, `game_pointer` accepts a bounded batch of relative moves, clicks, button-down events, and button-up events.

Every call returns the next image as MCP image content. The agent never gets a browser handle or a path into the game files. In the actual tasks, shell and exec tools are disabled.

## testing the harness on six games

To check that this was not tied to one game, I tested the same harness on six free browser games sourced from itch.io. The browser build and `webgame.json` manifest changed for each game. The harness did not.

I ran the experiment through Codex with `gpt-5.6-sol` at `xhigh` reasoning effort. Across the six games, the agent worked for more than an hour of wall-clock time, including the time it spent reasoning. The replays leave those pauses out and contain only the intervals when the browser was active.

Two samples from that experiment are below. Unstable Ship is a complete run. Q1K3 is one continuous spawn-to-death sequence cut from a longer run.

<figure class="article-media">
  <video controls preload="none" playsinline width="960" height="540" poster="/images/writing/game-agents/unstable-ship-agent-run.jpg" aria-label="A complete Unstable Ship agent run using the shared browser-game harness">
    <source src="/videos/writing/game-agents/unstable-ship-agent-run.webm" type="video/webm" />
    Your browser does not support embedded WebM video.
  </video>
  <figcaption><span>recording 01 · 01:02 · complete agent run</span> Unstable Ship. The agent locates the extinguisher and sprays at the fires, but the recording ends with several fires still burning. The replay contains only browser-active game time; model-thinking pauses are omitted.</figcaption>
</figure>

<figure class="article-media">
  <video controls preload="none" playsinline width="960" height="540" poster="/images/writing/game-agents/q1k3-agent-cut.jpg" aria-label="A continuous 26-second excerpt from a Q1K3 agent run using the shared browser-game harness">
    <source src="/videos/writing/game-agents/q1k3-agent-cut.webm" type="video/webm" />
    Your browser does not support embedded WebM video.
  </video>
  <figcaption><span>recording 02 · 00:26 · continuous excerpt</span> Q1K3, 00:20 to 00:46 of the longer agent trace. One life is preserved without stitching: the agent starts at 100 health, approaches an enemy, falls to 16, and reaches the next respawn.</figcaption>
</figure>

## what these tasks actually measure

The six games are examples for a screenshot-matching task. The agent receives four public target frames and has to reach similar states in chronological order.

The rest of the MCP surface exists around that contract:

- `game_reference` shows one target;
- `game_similarity` compares the latest frozen frame with it without advancing time;
- `game_capture` commits the current frame to one of four slots;
- `game_finish` closes the episode and writes the replay and metadata.

The graded similarity is an equal mix of perceptual hash and spatial edge layout. RGB similarity, SSIM, and SIFT geometry are reported as diagnostics, although SIFT currently has zero weight in the score. The agent can query this feedback repeatedly before committing a frame.

That makes the task measurable, but narrower than "beat the game." The harness does not infer victory or death from pixels. Its own terminal states are runtime states such as timeout or fault. A good run is one that navigates the visual world well enough to reproduce four moments.

This is why I think of the games as test fixtures for the interface. They cover different camera models and control problems, but the environment is the thing being built.

## then there is Minecraft

Minecraft changes the shape of the problem. There is no short path to one target frame. A useful agent has to preserve a goal across hundreds of actions, notice causal changes, survive mistakes, and retain knowledge between sessions.

The current project contains two separate approaches.

The screen agent runs Minecraft Java inside Docker on a 1280×720 Xvfb display. Each turn it captures the desktop with `scrot`, shrinks the frame to a 640×360 JPEG, sends it to a vision model through OpenRouter, and executes the returned keyboard or mouse actions with `xdotool`. It has tools for walking, looking, aiming at image coordinates, mining, clicking inventory slots, selecting the hotbar, placing blocks, and writing discoveries to memory.

Its present mission is finite: collect logs, craft a table, gather materials, build a shelter, go inside, and call `complete_mission`. The prompt supplies the two recipes needed to make planks and a crafting table. This is less open-ended than the README's original "learn Minecraft from first principles" framing, but it gives the prototype an actual stopping condition.

The other route uses Mineflayer. It reads structured state from the Minecraft protocol: health, hunger, coordinates, inventory, nearby entities, and notable blocks. Its actions are also semantic. Pathfinder moves to coordinates, the recipe API crafts items, and block operations use exact positions.

That version is useful for exploring planning and memory, but it is not the same perception problem. It already knows much more than a player looking at the screen. There is also no Minecraft MCP server in this repository today; both implementations are standalone agent loops that call OpenRouter directly.

## the idea I want to keep

The solid part is the learning loop:

1. observe the current world and memory;
2. form one hypothesis;
3. take an action;
4. measure what changed;
5. record a rule only when the result supports it.

The project has the beginnings of the storage needed for that. `action_history.json` is short-term context, `journal.jsonl` is an append-only episode record, and `notes.json` is meant to hold durable world knowledge. A separate recipe store exists for the Mineflayer path.

If that loop works, the agent does not need a giant walkthrough in its prompt. It can learn local rules, survive a restart, and stop retrying experiments that already have an answer.

The current implementation does not protect the fourth step well enough, so the fifth one falls apart.

## a keypress is not an outcome

Most screen-agent tools report that input was executed. `mine_block`, for example, holds the mouse button, steps forward, and returns `collected: true`. It does not inspect the next frame or inventory before making that claim. `write_discovery` accepts whatever lesson the model sends and saves it without attaching evidence.

The result is memory that sounds much more successful than the run.

The current journal has 1,724 entries. Many describe a frozen Ubuntu screen while the model continues to announce that wood was collected, recipes were confirmed, and stone was mined. `notes.json` contains 52 entries under `survival_loop_completion`, with repeated claims that the full loop was "permanently verified." The corresponding journal often says there was no Minecraft render.

The finite mission has the same trust problem. `complete_mission` is described as valid only after the shelter is visibly verified, but the tool handler does not run a verifier. The latest saved action history ends when the model calls it at step 64 while the state detector says `MENU_SCREEN`. The chat attempt is blocked because the agent is on a menu, yet the loop still records `mission_complete` and exits.

The recordings are less flattering and more useful:

- In the 30-second clip, the agent walks along a coastline, approaches a dirt slope, and spends the final seconds pressed against the block in front of it.
- In the 421-second clip, it starts by looking at grass, opens an almost empty inventory, acquires three dirt blocks, and ends boxed into a dirt hole. The view is effectively unchanged from about the four-minute mark through the end.

Neither recording shows the shelter mission completing. They do show that screen capture, movement, inventory interaction, and recording are connected. That is where the evidence stops.

<figure class="article-media">
  <video controls preload="none" playsinline width="960" height="540" poster="/images/writing/game-agents/minecraft-coast-run.jpg" aria-label="A Minecraft screen agent walking from a coastline into a dirt slope">
    <source src="/videos/writing/game-agents/minecraft-coast-run.webm" type="video/webm" />
    Your browser does not support embedded WebM video.
  </video>
  <figcaption><span>recording 03 · 00:30 · complete run</span> The screen agent moves from the coast to a dirt slope, then keeps walking into the block. There is no successful recovery or task completion hidden after the cut.</figcaption>
</figure>

<figure class="article-media">
  <video controls preload="none" playsinline width="960" height="540" poster="/images/writing/game-agents/minecraft-stuck-run.jpg" aria-label="A complete seven-minute Minecraft screen-agent run ending inside a dirt hole">
    <source src="/videos/writing/game-agents/minecraft-stuck-run.webm" type="video/webm" />
    Your browser does not support embedded WebM video.
  </video>
  <figcaption><span>recording 04 · 07:01 · complete run</span> The unabridged failed run. Inventory checks happen early; three dirt blocks are acquired; by roughly 04:00 the agent is in a dirt hole, where the view remains almost unchanged through the end.</figcaption>
</figure>

## the environments are answering different questions

| | browser MCP harness | Minecraft screen agent | Minecraft protocol agent |
| --- | --- | --- | --- |
| observation | frozen canvas screenshot | live desktop screenshot | structured protocol state |
| action | bounded keys and relative pointer events | keyboard and mouse through X11 | semantic Mineflayer operations |
| time | advances only inside tool calls | keeps moving while the model thinks | normal server time |
| reset | fresh bounded episode | persistent world and memory | persistent server and memory |
| evaluation | four externally scored frames | model declares mission complete | no task-level verifier yet |
| maturity | reusable runtime across six tasks | working prototype with visible failure modes | architectural prototype |

The browser harness is a good instrument for short-horizon visual control. Minecraft is trying to become a place where an agent can accumulate competence. That requires a stricter evidence model, not just more tools or a larger context window.

## what I would change next

The visual agent needs to separate four facts that are currently collapsed:

1. the harness sent an input;
2. Minecraft received the input;
3. the world changed;
4. the change satisfied the agent's intention.

Only the last two should create durable knowledge.

A next version should compute an observation delta after every action, attach that evidence to the journal, and make memory writes cite those observations. Inventory changes need visual verification. Mission completion needs an external check instead of a self-report. Runs need an episode contract with a seed, task, budget, stop reason, and replay, similar to the browser harness.

The protocol agent could help without becoming the policy. Mineflayer can act as a private verifier for position, inventory, and placed blocks while the agent itself continues to see only screenshots. That would preserve the visual-control problem and give the evaluation a source of truth.

The small games taught me how to freeze time, constrain input, and produce an inspectable trajectory. Minecraft exposed the next problem: an autonomous agent needs an environment that is skeptical of it. Otherwise its memory accumulates confidence instead of knowledge.
