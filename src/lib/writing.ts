import fs from "node:fs";
import path from "node:path";

const WRITING_DIRECTORY = path.join(process.cwd(), "content", "writing");

export type WritingPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  coverImage?: string;
  coverAlt?: string;
  readingTime: number;
  html: string;
};

type Frontmatter = Record<string, string | string[] | boolean>;

function parseValue(value: string): string | string[] | boolean {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatter(source: string) {
  if (!source.startsWith("---\n")) {
    return { data: {} as Frontmatter, content: source };
  }

  const closingFence = source.indexOf("\n---\n", 4);
  if (closingFence === -1) {
    return { data: {} as Frontmatter, content: source };
  }

  const data = source
    .slice(4, closingFence)
    .split("\n")
    .reduce<Frontmatter>((result, line) => {
      const separator = line.indexOf(":");
      if (separator === -1 || line.trim().startsWith("#")) return result;

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1);
      if (key) result[key] = parseValue(value);
      return result;
    }, {});

  return { data, content: source.slice(closingFence + 5) };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHref(value: string) {
  const href = value.trim();
  if (/^(https?:\/\/|mailto:|\/|#)/i.test(href)) return escapeHtml(href);
  return "#";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function renderInline(value: string) {
  const protectedFragments: string[] = [];
  const protect = (fragment: string) => {
    const token = `\u0000${protectedFragments.length}\u0000`;
    protectedFragments.push(fragment);
    return token;
  };

  let output = value
    .replace(/<!--[\s\S]*?-->|<\/?[A-Za-z][^>]*>/g, protect)
    .replace(/`([^`]+)`/g, (_, code: string) =>
      protect(`<code>${escapeHtml(code)}</code>`),
    );

  output = escapeHtml(output)
    .replace(
      /!\[([^\]]*)\]\(([^\s)]+)(?:\s+["']([^"']+)["'])?\)/g,
      (_, alt: string, source: string, title?: string) => {
        const titleAttribute = title
          ? ` title="${escapeHtml(title)}"`
          : "";
        return `<img src="${safeHref(source)}" alt="${escapeHtml(alt)}"${titleAttribute} loading="lazy" />`;
      },
    )
    .replace(
      /\[([^\]]+)\]\(([^\s)]+)(?:\s+["']([^"']+)["'])?\)/g,
      (_, label: string, href: string, title?: string) => {
        const titleAttribute = title
          ? ` title="${escapeHtml(title)}"`
          : "";
        const external = /^https?:\/\//i.test(href)
          ? ' target="_blank" rel="noreferrer noopener"'
          : "";
        return `<a href="${safeHref(href)}"${titleAttribute}${external}>${label}</a>`;
      },
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_]+)_/g, "$1<em>$2</em>");

  return output.replace(/\u0000(\d+)\u0000/g, (_, index: string) => {
    return protectedFragments[Number(index)] ?? "";
  });
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

/**
 * A small, dependency-free renderer for trusted, repository-owned Markdown.
 * Raw HTML is intentionally preserved so article files can use semantic HTML,
 * custom classes, details/summary blocks, and richer layouts.
 */
export function renderMarkdown(source: string) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const output: string[] = [];
  const headingCounts = new Map<string, number>();
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const fence = trimmed.match(/^```([\w-]*)$/);
    if (fence) {
      flushParagraph();
      const language = fence[1];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      const languageAttribute = language
        ? ` data-language="${escapeHtml(language)}" class="language-${escapeHtml(language)}"`
        : "";
      output.push(
        `<pre><code${languageAttribute}>${escapeHtml(code.join("\n"))}</code></pre>`,
      );
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const baseSlug = slugify(heading[2]) || "section";
      const count = headingCounts.get(baseSlug) ?? 0;
      headingCounts.set(baseSlug, count + 1);
      const id = count ? `${baseSlug}-${count + 1}` : baseSlug;
      output.push(
        `<h${level} id="${id}">${renderInline(heading[2])}</h${level}>`,
      );
      continue;
    }

    if (/^(---+|___+|\*\*\*+)$/.test(trimmed)) {
      flushParagraph();
      output.push("<hr />");
      continue;
    }

    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])
    ) {
      flushParagraph();
      const headers = splitTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      index -= 1;
      output.push(
        `<table><thead><tr>${headers
          .map((cell) => `<th>${renderInline(cell)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map(
            (row) =>
              `<tr>${row
                .map((cell) => `<td>${renderInline(cell)}</td>`)
                .join("")}</tr>`,
          )
          .join("")}</tbody></table>`,
      );
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      index -= 1;
      output.push(`<blockquote>${renderInline(quote.join(" "))}</blockquote>`);
      continue;
    }

    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const tag = unordered ? "ul" : "ol";
      const items: string[] = [];
      const pattern = unordered ? /^[-*+]\s+(.+)$/ : /^\d+[.)]\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].trim().match(pattern);
        if (!match) break;
        items.push(`<li>${renderInline(match[1])}</li>`);
        index += 1;
      }
      index -= 1;
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    if (trimmed.startsWith("<")) {
      flushParagraph();
      const htmlLines = [line];
      let openAngles = (line.match(/</g) ?? []).length;
      let closeAngles = (line.match(/>/g) ?? []).length;
      while (openAngles > closeAngles && index + 1 < lines.length) {
        index += 1;
        htmlLines.push(lines[index]);
        openAngles += (lines[index].match(/</g) ?? []).length;
        closeAngles += (lines[index].match(/>/g) ?? []).length;
      }
      output.push(htmlLines.join("\n"));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return output.join("\n");
}

function asString(value: Frontmatter[string], fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: Frontmatter[string]) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value) return [value];
  return [];
}

function getReadingTime(content: string) {
  const wordCount = content
    .replace(/<[^>]*>/g, " ")
    .replace(/[`#>*_[\]()|-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 210));
}

function readPost(fileName: string): WritingPost {
  const slug = fileName.replace(/\.md$/, "");
  const source = fs
    .readFileSync(path.join(WRITING_DIRECTORY, fileName), "utf8")
    .replaceAll("\r\n", "\n");
  const { data, content } = parseFrontmatter(source);
  const publishedAt = asString(data.publishedAt, new Date(0).toISOString());

  return {
    slug,
    title: asString(data.title, slug.replaceAll("-", " ")),
    excerpt: asString(data.excerpt),
    publishedAt,
    updatedAt: asString(data.updatedAt) || undefined,
    tags: asStringArray(data.tags),
    featured: data.featured === true,
    draft: data.draft === true,
    coverImage: asString(data.coverImage) || undefined,
    coverAlt: asString(data.coverAlt) || undefined,
    readingTime: getReadingTime(content),
    html: renderMarkdown(content),
  };
}

export function getAllWritingPosts() {
  if (!fs.existsSync(WRITING_DIRECTORY)) return [];

  return fs
    .readdirSync(WRITING_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map(readPost)
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getWritingPost(slug: string) {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filePath = path.join(WRITING_DIRECTORY, `${safeSlug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const post = readPost(`${safeSlug}.md`);
  if (process.env.NODE_ENV === "production" && post.draft) return undefined;
  return post;
}

export function formatWritingDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
