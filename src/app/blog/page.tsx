import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import {
  formatWritingDate,
  getAllWritingPosts,
  type WritingPost,
} from "@/lib/writing";

export const metadata: Metadata = {
  title: "Technical Writing | Vaibhav",
  description:
    "Notes on applied AI, software architecture, developer tooling, and the systems behind the work.",
};

function PostArtwork({ post, index }: { post: WritingPost; index: number }) {
  if (post.coverImage) {
    return (
      // Article authors control this trusted, file-backed content and its image URL.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={post.coverImage}
        alt={post.coverAlt || ""}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute -right-12 -top-16 size-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <span className="absolute bottom-6 right-7 font-technical-sm text-[clamp(4rem,10vw,7rem)] font-bold leading-none text-white/[0.04]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute left-6 top-6 flex items-center gap-2 font-technical-sm text-[10px] uppercase tracking-[0.2em] text-primary/70">
        <span className="size-1.5 rounded-full bg-primary" />
        Text artifact
      </div>
    </div>
  );
}

function ArticleMeta({ post }: { post: WritingPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-technical-sm text-[11px] uppercase tracking-[0.12em] text-on-surface-variant">
      <time dateTime={post.publishedAt}>{formatWritingDate(post.publishedAt)}</time>
      <span aria-hidden="true" className="text-outline">
        /
      </span>
      <span>{post.readingTime} min read</span>
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllWritingPosts();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost?.slug);
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 5);

  return (
    <>
      <a
        href="#writing-content"
        className="fixed left-4 top-3 z-[70] -translate-y-20 rounded bg-primary px-4 py-3 font-technical-sm text-xs font-bold text-on-primary transition-transform focus:translate-y-0"
      >
        Skip to writing
      </a>
      <Navbar />

      <main
        id="writing-content"
        className="mx-auto max-w-container-max px-margin-mobile pb-32 pt-32 md:px-margin-desktop md:pt-40"
      >
        <header className="grid grid-cols-1 gap-8 border-b border-outline-variant/60 pb-14 md:grid-cols-12 md:gap-gutter md:pb-20">
          <div className="md:col-span-2">
            <div className="sticky top-28 font-technical-sm text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">
              <p className="text-primary">Archive / Writing</p>
              <p className="mt-3">Index: {String(posts.length).padStart(2, "0")}</p>
              <p className="mt-1 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-secondary" />
                Updated manually
              </p>
            </div>
          </div>

          <div className="md:col-span-9 md:col-start-4">
            <p className="mb-5 font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary">
              Field notes from building
            </p>
            <h1 className="max-w-4xl font-display-lg text-[clamp(3.25rem,9vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-on-background">
              Technical
              <span className="block text-primary">writing.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-on-surface-variant md:text-xl">
              Detailed notes on applied AI, software architecture, developer
              tooling, and the decisions that survive contact with production.
            </p>

            {tags.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 font-technical-sm text-[10px] uppercase tracking-[0.12em] text-on-surface-variant"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {featuredPost ? (
          <>
            <section aria-labelledby="featured-writing" className="py-16 md:py-24">
              <div className="mb-7 flex items-end justify-between border-b border-outline-variant/40 pb-4">
                <h2
                  id="featured-writing"
                  className="font-label-caps text-label-caps uppercase tracking-[0.22em] text-primary"
                >
                  Featured note
                </h2>
                <span className="font-technical-sm text-[10px] text-outline">
                  01 / {String(posts.length).padStart(2, "0")}
                </span>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid min-h-[34rem] overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-low transition-colors duration-200 hover:border-primary/60 md:grid-cols-12"
              >
                <div className="relative min-h-72 overflow-hidden md:col-span-7 md:min-h-full">
                  <PostArtwork post={featuredPost} index={0} />
                </div>
                <article className="relative flex flex-col justify-between p-7 md:col-span-5 md:p-10 lg:p-12">
                  <div>
                    <ArticleMeta post={featuredPost} />
                    <h2 className="mt-7 font-headline-md text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-on-surface transition-colors duration-200 group-hover:text-primary">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-5 text-base leading-7 text-on-surface-variant">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-12 flex items-center justify-between border-t border-outline-variant/50 pt-5">
                    <span className="font-label-caps text-[11px] uppercase tracking-[0.12em] text-secondary">
                      Read article
                    </span>
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-primary transition-transform duration-200 group-hover:translate-x-1"
                    >
                      arrow_forward
                    </span>
                  </div>
                </article>
              </Link>
            </section>

            {remainingPosts.length > 0 && (
              <section aria-labelledby="all-writing" className="pb-12">
                <div className="mb-3 grid grid-cols-12 gap-gutter border-b border-outline-variant/40 pb-4 font-technical-sm text-[10px] uppercase tracking-[0.16em] text-outline">
                  <h2 id="all-writing" className="col-span-9 text-primary">
                    Recent entries
                  </h2>
                  <span className="col-span-3 text-right">Read time</span>
                </div>
                <div>
                  {remainingPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group grid grid-cols-12 gap-x-4 border-b border-outline-variant/40 py-7 transition-colors duration-200 hover:bg-surface-container-low/60 md:gap-gutter md:px-4"
                    >
                      <div className="col-span-2 font-technical-sm text-[11px] text-outline md:col-span-1">
                        {String(index + 2).padStart(2, "0")}
                      </div>
                      <article className="col-span-8 md:col-span-8">
                        <ArticleMeta post={post} />
                        <h3 className="mt-3 font-headline-md text-2xl font-semibold leading-tight text-on-surface transition-colors duration-200 group-hover:text-primary md:text-3xl">
                          {post.title}
                        </h3>
                        <p className="mt-3 hidden max-w-2xl text-body-md text-on-surface-variant sm:block">
                          {post.excerpt}
                        </p>
                      </article>
                      <div className="col-span-2 flex items-center justify-end gap-3 font-technical-sm text-[11px] text-on-surface-variant md:col-span-3">
                        <span>{post.readingTime}m</span>
                        <span
                          aria-hidden="true"
                          className="material-symbols-outlined text-lg text-primary transition-transform duration-200 group-hover:translate-x-1"
                        >
                          arrow_outward
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="my-20 rounded-2xl border border-dashed border-outline-variant bg-surface-container-low/40 p-8 md:p-14">
            <p className="font-label-caps text-label-caps uppercase tracking-[0.2em] text-secondary">
              Archive initialized
            </p>
            <h2 className="mt-4 font-headline-md text-3xl font-semibold text-on-surface">
              The first note is being drafted.
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-on-surface-variant">
              Add a Markdown file to <code>content/writing</code> and it will
              appear here automatically.
            </p>
          </section>
        )}
      </main>

      <Footer />
      <MobileNav />
    </>
  );
}
