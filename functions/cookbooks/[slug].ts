// /cookbooks/<slug> — per-cookbook HTML page with TechArticle + Product JSON-LD.
//
// This catches requests like `/cookbooks/glycemic-reasoning` (no .md extension)
// that would otherwise 404 or fall through to the SPA. Renders a crawler-visible
// HTML preview of the cookbook + the per-cookbook structured data so AI bots can
// cite the recipe at one-hop-from-homepage discoverability.
//
// The full markdown remains at `/cookbooks/<slug>.md` (linked from the preview).

import { buildCookbookContent } from "../_lib/seo-content";

interface Env {
  ASSETS?: { fetch: (req: Request) => Promise<Response> };
}

const SHELL_HEAD = `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
__TITLE__
__META__
<link rel="canonical" href="__CANONICAL__" />
<meta property="og:type" content="article" />
<meta property="og:url" content="__CANONICAL__" />
<meta property="og:title" content="__OG_TITLE__" />
<meta property="og:description" content="__OG_DESC__" />
<meta property="og:image" content="https://swarmandbee.ai/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@swarmandbee" />
<meta name="twitter:image" content="https://swarmandbee.ai/og-image.png" />
<meta name="robots" content="index, follow" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate" type="text/plain" href="/llms.txt" title="AI context manifest (concise)" />
<link rel="alternate" type="text/markdown" href="__MD_URL__" title="Cookbook source (markdown)" />
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:0; background:#0a0a0a; color:#e5e5e5; font:15px/1.55 -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
  main { max-width:780px; margin:0 auto; padding:32px 20px 80px; }
  header { border-bottom:1px solid #262626; padding-bottom:20px; margin-bottom:28px; }
  h1 { color:#fbbf24; font-size:28px; line-height:1.2; margin:0 0 12px; font-weight:800; letter-spacing:-0.01em; }
  h2 { color:#fbbf24; font-size:18px; margin:32px 0 10px; font-weight:700; letter-spacing:-0.005em; }
  h3 { color:#fde047; font-size:14px; margin:22px 0 8px; text-transform:uppercase; letter-spacing:1.5px; }
  p { margin:0 0 12px; }
  ul, ol { padding-left:22px; margin:0 0 14px; }
  li { margin:4px 0; }
  a { color:#fbbf24; text-decoration:none; }
  a:hover { text-decoration:underline; }
  code { background:#171717; border:1px solid #262626; padding:1px 6px; border-radius:4px; font-size:13px; color:#fde047; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }
  pre { background:#0f0f0f; border:1px solid #262626; padding:14px 16px; border-radius:8px; overflow-x:auto; margin:14px 0; }
  pre code { background:transparent; border:0; padding:0; color:#fbbf24; font-size:12.5px; line-height:1.5; }
  strong { color:#fff; }
  em { color:#a3a3a3; font-style:italic; }
  hr { border:0; border-top:1px solid #262626; margin:32px 0; }
  details { margin:20px 0; }
  summary { cursor:pointer; color:#a3a3a3; font-size:13px; padding:8px 0; }
  details[open] summary { color:#fbbf24; }
  article.cookbook-preview { max-height:1200px; overflow-y:auto; background:#0f0f0f; border:1px solid #262626; padding:16px 20px; border-radius:8px; margin-top:8px; font-size:13.5px; }
  footer { border-top:1px solid #262626; margin-top:48px; padding-top:18px; color:#737373; font-size:12.5px; }
  nav.back { font-size:12.5px; color:#737373; margin-bottom:18px; }
  nav.back a { color:#737373; }
</style>
__JSONLD__
</head>
<body>
<nav class="back"><a href="/">← Swarm &amp; Bee</a> · <a href="/#cookbooks">Cookbooks</a></nav>`;

const SHELL_TAIL = `</body></html>`;

function escAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const rawSlug = ctx.params.slug as string;

  // Pass-through for static assets that share the /cookbooks/ namespace.
  // CF Pages [slug] catches everything; we need to defer .md, .json, .jsonl,
  // index.json, etc. to the static asset handler.
  if (/\.(md|jsonl?|txt|png|jpg|svg|ico)$/i.test(rawSlug)) {
    return ctx.next();
  }

  const slug = rawSlug.replace(/\.md$/, "");
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return new Response("invalid slug", { status: 400 });
  }

  // Use the seo-content helper to build the HTML body + JSON-LD blocks.
  // It handles fetching the markdown + the index.json + assembling the
  // page-content + per-cookbook schema.
  let content;
  try {
    content = await import("../_lib/seo-content").then((m) =>
      m.buildCookbookContent(ctx.request.url, slug),
    );
  } catch (err) {
    console.error(`[cookbooks/${slug}] generator error:`, err);
    return new Response("cookbook rendering error", { status: 500 });
  }

  if (!content) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "cookbook not found",
        slug,
        hint: "See /cookbooks/index.json for valid slugs.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  const canonical = `https://swarmandbee.ai/cookbooks/${slug}`;
  const mdUrl = `/cookbooks/${slug}.md`;
  const jsonLdHtml = content.jsonLdBlocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");

  const head = SHELL_HEAD
    .replace("__TITLE__", `<title>${escAttr(content.title || slug)}</title>`)
    .replace("__META__", `<meta name="description" content="${escAttr(content.description || "")}" />`)
    .replace(/__CANONICAL__/g, escAttr(canonical))
    .replace("__OG_TITLE__", escAttr(content.title || slug))
    .replace("__OG_DESC__", escAttr(content.description || ""))
    .replace("__MD_URL__", escAttr(mdUrl))
    .replace("__JSONLD__", jsonLdHtml);

  return new Response(head + content.bodyHtml + SHELL_TAIL, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
      "X-Cookbook-Slug": slug,
    },
  });
};
