import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getAllWritingPosts } from "@/lib/writing";

const projects = [
  {
    index: "01",
    name: "agentops",
    description:
      "an agent lifecycle platform with DAG workflows, tool orchestration, eval pipelines, prompt versioning, and traces. agents need supervision too.",
    stack: "agents / evaluation",
    url: "https://github.com/Martian-dev/agentops",
  },
  {
    index: "02",
    name: "ai brain",
    description:
      "a Go assistant that routes between local and cloud models, remembers user context, and manages email and calendars behind approval gates.",
    stack: "go / agent infrastructure",
    url: "https://github.com/Martian-dev/ai-brain-infra",
  },
  {
    index: "03",
    name: "skillsphere",
    description:
      "a gamified mobile app with agent-generated, scenario-based life-skills lessons, plus text-to-speech and multilingual support.",
    stack: "react native / education",
    url: "https://github.com/skills-bridge/backend",
  },
  {
    index: "04",
    name: "protein.sh",
    description:
      "a terminal shop for fitness supplements, built while learning Go. niche? yes. fun? also yes.",
    stack: "go / terminal",
    status: "work in progress",
    url: "https://github.com/Martian-dev/protein.sh",
  },
];

const experience = [
  {
    when: "jun — sep 2026",
    company: "parsewave",
    role: "ai/ml research engineer",
    description:
      "shipped 1,000+ RL environments and 5,000+ evaluated trajectories, then built the MCPs, harnesses, judges, and adversarial tasks behind them.",
  },
  {
    when: "jun — jul 2025",
    company: "sciphics technology",
    role: "ai application developer intern",
    description:
      "deployed a telecom support agent that reduced manual work by about 40%, plus an ML system that improved water-leak detection by around 30%.",
  },
  {
    when: "may — jul 2025",
    company: "enlight wisdom",
    role: "full-stack developer intern",
    description:
      "designed and shipped responsive client websites with SEO and observability baked in — because deployment is only the beginning.",
  },
];

export default function Home() {
  const posts = getAllWritingPosts().slice(0, 2);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[70] -translate-y-24 rounded bg-primary px-4 py-3 font-technical-sm text-xs font-bold text-on-primary transition-transform focus:translate-y-0"
      >
        skip to the good stuff
      </a>
      <Navbar />

      <main id="main-content" className="pt-20">
        <section className="intro-hero px-margin-mobile md:px-margin-desktop">
          <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-container-max grid-cols-1 items-center gap-14 py-16 lg:grid-cols-12 lg:gap-gutter lg:py-20">
            <div className="lg:col-span-8">
              <p className="font-technical-sm text-xs lowercase tracking-[0.12em] text-primary">
                hi, internet.
              </p>
              <h1 className="mt-7 max-w-[12ch] font-display-lg text-[clamp(3.6rem,8.2vw,7.4rem)] font-extrabold leading-[0.87] tracking-[-0.06em] text-on-background">
                i&apos;m vaibhav.
                <span className="mt-4 block text-primary">i make computers do things.</span>
              </h1>
              <p className="intro-aside mt-7 font-headline-md text-[clamp(1.2rem,2.4vw,1.7rem)] font-medium text-secondary">
                occasionally, useful things.
              </p>
              <p className="mt-9 max-w-xl text-lg leading-8 text-on-surface-variant">
                student, developer, and serial side-project starter. currently
                messing around with AI, LLMs, and ML. when that gets boring, i
                build something else.
              </p>
              <a
                href="#work"
                className="mt-10 inline-flex min-h-11 items-center gap-3 font-technical-sm text-xs lowercase text-outline transition-colors duration-200 hover:text-on-surface"
              >
                the stuff is down there <span aria-hidden="true">↓</span>
              </a>
            </div>

            <figure className="order-first mx-auto w-full max-w-[20rem] lg:order-none lg:col-span-4 lg:max-w-none">
              <div className="avatar-card">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-surface-container-lowest">
                  <Image
                    src="/images/pfp.png"
                    alt="Vaibhav's illustrated online avatar"
                    fill
                    priority
                    sizes="(min-width: 1024px) 340px, 320px"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="px-2 pt-4 font-technical-sm text-[10px] lowercase tracking-[0.08em] text-outline">
                  <span>face reveal? nice try.</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        <section
          id="work"
          className="scroll-mt-20 border-t border-outline-variant/60 px-margin-mobile py-24 md:px-margin-desktop md:py-32"
        >
          <div className="mx-auto max-w-container-max">
            <header className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-gutter">
              <div className="md:col-span-8">
                <p className="font-technical-sm text-xs lowercase tracking-[0.12em] text-secondary">
                  work
                </p>
                <h2 className="mt-3 font-display-lg text-[clamp(2.65rem,5.3vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.05em] text-on-background">
                  stuff i&apos;ve made.
                </h2>
              </div>
              <p className="max-w-sm self-end text-base leading-7 text-on-surface-variant md:col-span-4">
                a few favorites. the rest are probably hiding on github.
              </p>
            </header>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-tile group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-low p-6 transition-colors duration-200 hover:border-primary/70 md:min-h-72 md:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-technical-sm text-[10px] text-outline">
                      {project.index}
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {project.status && (
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 font-technical-sm text-[9px] lowercase tracking-[0.08em] text-primary">
                          {project.status}
                        </span>
                      )}
                      <span className="font-technical-sm text-[10px] lowercase tracking-[0.08em] text-secondary">
                        {project.stack}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display-lg text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.045em] text-on-surface transition-colors duration-200 group-hover:text-primary">
                      {project.name}
                    </h3>
                    <div className="mt-5 flex items-end justify-between gap-8 border-t border-outline-variant/50 pt-5">
                      <p className="max-w-md text-base leading-6 text-on-surface-variant">
                        {project.description}
                      </p>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl text-primary transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-8 text-sm text-on-surface-variant">
              there&apos;s more on{" "}
              <a
                href="https://github.com/Martian-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:text-secondary"
              >
                github
              </a>
              . some of it even has documentation.
            </p>
          </div>
        </section>

        <section
          id="experience"
          className="scroll-mt-20 border-t border-outline-variant/60 bg-surface-container-lowest px-margin-mobile py-24 md:px-margin-desktop md:py-32"
        >
          <div className="mx-auto grid max-w-container-max grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-gutter">
            <header className="lg:col-span-5">
              <p className="font-technical-sm text-xs lowercase tracking-[0.12em] text-primary">
                experience
              </p>
              <h2 className="mt-3 max-w-lg font-display-lg text-[clamp(2.65rem,5.3vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.05em] text-on-background">
                where my brain cells went.
              </h2>
              <p className="mt-6 text-sm text-outline">
                the useful version, not the corporate one.
              </p>
            </header>

            <ol className="lg:col-span-7">
              {experience.map((item, index) => (
                <li
                  key={item.company}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-outline-variant/60 py-8 first:border-t-0 lg:grid-cols-[3rem_9rem_1fr] lg:gap-5"
                >
                  <span className="font-technical-sm text-[10px] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="hidden font-technical-sm text-[10px] lowercase tracking-[0.08em] text-outline lg:block">
                    {item.when}
                  </p>
                  <div>
                    <p className="font-technical-sm text-[10px] lowercase tracking-[0.08em] text-outline lg:hidden">
                      {item.when}
                    </p>
                    <h3 className="mt-2 font-headline-md text-2xl font-semibold lowercase text-on-surface lg:mt-0 lg:text-3xl">
                      {item.company}
                    </h3>
                    <p className="mt-2 font-technical-sm text-[10px] lowercase tracking-[0.08em] text-secondary">
                      {item.role}
                    </p>
                    <p className="mt-3 max-w-xl text-base leading-7 text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {posts.length > 0 && (
          <section
            id="writing"
            className="scroll-mt-20 border-t border-outline-variant/60 px-margin-mobile py-24 md:px-margin-desktop md:py-32"
          >
            <div className="mx-auto grid max-w-container-max grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-gutter">
              <header className="lg:col-span-5">
                <p className="font-technical-sm text-xs lowercase tracking-[0.12em] text-secondary">
                  writing
                </p>
                <h2 className="mt-3 max-w-lg font-display-lg text-[clamp(2.65rem,5.3vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.05em] text-on-background">
                  things i wrote before i forgot them.
                </h2>
                <div
                  aria-hidden="true"
                  className="mt-8 font-display-lg text-6xl leading-none text-primary md:text-8xl"
                >
                  ↳
                </div>
              </header>

              <div className="lg:col-span-7">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block border-t border-outline-variant/60 py-8 last:border-b lg:py-10"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-technical-sm text-[10px] lowercase tracking-[0.08em] text-outline">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                      <span aria-hidden="true">/</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h3 className="mt-4 max-w-2xl font-headline-md text-3xl font-semibold leading-tight text-on-surface transition-colors duration-200 group-hover:text-primary md:text-4xl">
                      {post.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-5">
                      <ul className="flex flex-wrap gap-2" aria-label="Article topics">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-outline-variant px-3 py-1 font-technical-sm text-[10px] lowercase text-outline"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl text-primary transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/blog"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-technical-sm text-xs lowercase text-primary transition-colors duration-200 hover:text-secondary"
                >
                  rummage through all the writing <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}
