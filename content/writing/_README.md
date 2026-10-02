# Technical writing content

Create one `.md` file per article in this directory. The filename becomes the URL slug. Files whose names begin with `_` are ignored.

Required frontmatter:

- `title`: article title
- `excerpt`: archive and metadata summary
- `publishedAt`: ISO date (`YYYY-MM-DD`)
- `tags`: inline list, for example `[Next.js, AI]`

Optional frontmatter:

- `updatedAt`: ISO date
- `featured`: highlights the article at the top of the archive
- `draft`: hidden in production when `true`
- `coverImage`: local path or remote URL
- `coverAlt`: description for a meaningful cover image

Markdown features include headings, links, images, emphasis, blockquotes, ordered and unordered lists, fenced code, tables, and horizontal rules. Raw HTML is intentionally rendered for trusted repository content, including `details`, `figure`, and custom elements such as `<div class="article-callout">`.

Copy `_template.md` to start a post, rename it without the leading underscore, and set `draft: false` when it is ready.
