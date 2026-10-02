---
title: "A writing pipeline for Markdown and HTML"
excerpt: "How this portfolio turns local Markdown files into fast, readable article pages while still allowing carefully chosen HTML when Markdown is not enough."
publishedAt: "2026-10-02"
tags: [Next.js, Markdown, Architecture]
featured: true
draft: false
---

## Why keep the writing in files?

Technical writing benefits from the same workflow as code: small diffs, local previews, and a history that can be reviewed. Each article in this portfolio is a `.md` file with a short frontmatter block for its title, summary, date, and tags.

The page itself stays a server component. At build time, it reads the files, calculates a reading time, creates the archive, and generates a route for every published slug.

<div class="article-callout">
  <strong>One important boundary:</strong> embedded HTML is rendered as trusted markup. Only commit article files from authors who are allowed to change the site.
</div>

## The authoring contract

An article begins with a small metadata block:

```markdown
---
title: "Designing resilient agent workflows"
excerpt: "What changes when failure is treated as a normal state."
publishedAt: "2026-10-02"
tags: [AI, Systems]
featured: false
draft: false
---
```

Everything after that block is article content. Standard Markdown covers the usual structure:

- headings become linkable sections;
- fenced blocks preserve code and language metadata;
- tables remain horizontally scrollable on small screens;
- links, quotes, lists, emphasis, and images receive article-specific styles.

## Where HTML fits

Markdown should remain the default, but an occasional semantic component is useful. A `<details>` block, a figure, or a styled callout can live directly beside Markdown.

<details>
  <summary>Show an embedded HTML example</summary>
  <p>This disclosure is authored directly in the Markdown file and remains keyboard accessible because it uses the native HTML element.</p>
</details>

| Content need | Preferred format |
| --- | --- |
| Paragraphs, lists, links | Markdown |
| Code samples | Fenced Markdown |
| Disclosures and custom callouts | Semantic HTML |

## Adding the next article

Copy the included `_template.md`, remove the leading underscore from the new filename, and fill in the frontmatter. The filename becomes the URL, so `reliable-tool-calling.md` becomes `/blog/reliable-tool-calling`.

> The archive is intentionally file-backed: no dashboard, database, or client-side request is needed to publish a note.
