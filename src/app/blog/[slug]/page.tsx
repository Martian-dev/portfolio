import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import ReadingProgress from "@/components/reading-progress";
import {
  formatWritingDate,
  getAllWritingPosts,
  getWritingPost,
} from "@/lib/writing";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getTableOfContents(html: string) {
  return Array.from(
    html.matchAll(/<h([23]) id="([^"]+)">(.+?)<\/h\1>/g),
  ).map((match) => ({
    level: Number(match[1]),
    id: match[2],
    label: match[3].replace(/<[^>]+>/g, ""),
  }));
}

export function generateStaticParams() {
  return getAllWritingPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Vaibhav`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();

  const posts = getAllWritingPosts();
  const postIndex = posts.findIndex((item) => item.slug === post.slug);
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : undefined;
  const olderPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : undefined;
  const tableOfContents = getTableOfContents(post.html);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: "Vaibhav" },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <a
        href="#article-content"
        className="fixed left-4 top-3 z-[70] -translate-y-20 rounded bg-primary px-4 py-3 font-technical-sm text-xs font-bold text-on-primary transition-transform focus:translate-y-0"
      >
        Skip to article
      </a>
      <Navbar />

      <main className="pb-32 pt-28 md:pt-36">
        <article>
          <header className="mx-auto grid max-w-container-max grid-cols-1 gap-8 px-margin-mobile pb-14 md:grid-cols-12 md:gap-gutter md:px-margin-desktop md:pb-20">
            <div className="md:col-span-2">
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-2 font-technical-sm text-[11px] uppercase tracking-[0.14em] text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-base">
                  west
                </span>
                Writing index
              </Link>
            </div>

            <div className="md:col-span-9 md:col-start-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-technical-sm text-[11px] uppercase tracking-[0.14em] text-primary">
                <time dateTime={post.publishedAt}>
                  {formatWritingDate(post.publishedAt)}
                </time>
                <span aria-hidden="true" className="text-outline">
                  /
                </span>
                <span className="text-on-surface-variant">
                  {post.readingTime} min read
                </span>
              </div>

              <h1 className="mt-7 max-w-5xl font-display-lg text-[clamp(3rem,8vw,6.75rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-on-background">
                {post.title}
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-on-surface-variant md:text-2xl md:leading-9">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Article topics">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 font-technical-sm text-[10px] uppercase tracking-[0.12em] text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>

          {post.coverImage && (
            <figure className="mx-auto mb-16 max-w-container-max px-margin-mobile md:mb-24 md:px-margin-desktop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.coverAlt || ""}
                className="aspect-[16/7] w-full rounded-2xl border border-outline-variant object-cover"
              />
            </figure>
          )}

          <div className="border-y border-outline-variant/50 bg-surface-container-low/30">
            <div className="mx-auto grid max-w-container-max grid-cols-1 gap-10 px-margin-mobile py-14 md:grid-cols-12 md:gap-gutter md:px-margin-desktop md:py-20">
              <aside className="hidden md:col-span-3 md:block" aria-label="Article table of contents">
                <div className="sticky top-28 border-l border-outline-variant pl-5">
                  <p className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-secondary">
                    On this page
                  </p>
                  {tableOfContents.length > 0 ? (
                    <ol className="mt-5 space-y-3">
                      {tableOfContents.map((heading) => (
                        <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
                          <a
                            href={`#${heading.id}`}
                            className="block font-technical-sm text-[11px] leading-5 text-on-surface-variant transition-colors duration-200 hover:text-primary"
                          >
                            {heading.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-4 font-technical-sm text-[11px] leading-5 text-outline">
                      Long-form note
                    </p>
                  )}
                </div>
              </aside>

              <div
                id="article-content"
                className="prose-writing min-w-0 md:col-span-8 md:col-start-5"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>

          <footer className="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-24">
            <p className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-secondary">
              Continue reading
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {newerPost ? (
                <Link
                  href={`/blog/${newerPost.slug}`}
                  className="group rounded-xl border border-outline-variant bg-surface-container-low p-6 transition-colors duration-200 hover:border-primary/60"
                >
                  <span className="font-technical-sm text-[10px] uppercase tracking-[0.14em] text-outline">
                    Newer note
                  </span>
                  <span className="mt-3 block font-headline-md text-xl font-semibold text-on-surface group-hover:text-primary">
                    {newerPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {olderPost && (
                <Link
                  href={`/blog/${olderPost.slug}`}
                  className="group rounded-xl border border-outline-variant bg-surface-container-low p-6 text-right transition-colors duration-200 hover:border-primary/60"
                >
                  <span className="font-technical-sm text-[10px] uppercase tracking-[0.14em] text-outline">
                    Older note
                  </span>
                  <span className="mt-3 block font-headline-md text-xl font-semibold text-on-surface group-hover:text-primary">
                    {olderPost.title}
                  </span>
                </Link>
              )}
            </div>
          </footer>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Footer />
      <MobileNav />
    </>
  );
}
