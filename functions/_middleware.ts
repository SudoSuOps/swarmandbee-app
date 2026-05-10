// Per-host HTML meta-tag rewriter for CF Pages.
//
// All subdomains serve the same compiled SPA (single index.html with apex
// OG/Twitter meta). When a crawler (Twitterbot, Discord, LinkedIn, etc.)
// fetches a brand-surface subdomain, we want them to see the appropriate
// OG card — not the apex card.
//
// This middleware intercepts HTML responses, inspects the Host header,
// rewrites the og:/twitter:/title meta tags that already exist in
// index.html (og:url, og:title, og:description, canonical), AND injects
// og:image + twitter:image into <head> (these don't exist in index.html
// yet — we don't want to add a broken-link reference at the apex).
//
// Adding a new subdomain card:
//   1. Drop the image at public/og-<name>.png (1200x630)
//   2. Add an entry to HOST_META below

interface HostMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}

const HOST_META: Record<string, HostMeta> = {
  "bounty.swarmandbee.ai": {
    title: "Swarm & Bee · Bounty Intake",
    description:
      "Have a bounty. Need defendable AI work shipped. 186 GPUs owned, 14 TB VRAM on-prem, sha256 + Hedera receipts on every artifact.",
    url: "https://bounty.swarmandbee.ai/",
    image: "https://bounty.swarmandbee.ai/og-bounty.png",
  },
  // Future subdomains can be added here without touching this code path.
};

class AttrRewriter {
  constructor(private attr: string, private value: string) {}
  element(el: Element) {
    el.setAttribute(this.attr, this.value);
  }
}

class TitleRewriter {
  constructor(private value: string) {}
  element(el: Element) {
    el.setInnerContent(this.value);
  }
}

class HeadInjector {
  constructor(private html: string) {}
  element(el: Element) {
    el.append(this.html, { html: true });
  }
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const onRequest: PagesFunction = async (ctx) => {
  const response = await ctx.next();

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return response;
  }

  const url = new URL(ctx.request.url);
  const host = url.hostname.toLowerCase();
  const meta = HOST_META[host];
  if (!meta) {
    return response;
  }

  // Tags we'll inject (don't exist in apex index.html — adding them would
  // create broken-link previews everywhere they're not rewritten).
  const injected = [
    `<meta property="og:image" content="${escapeAttr(meta.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`,
  ].join("\n");

  return new HTMLRewriter()
    .on("title", new TitleRewriter(meta.title))
    .on('meta[name="description"]',         new AttrRewriter("content", meta.description))
    .on('meta[property="og:title"]',        new AttrRewriter("content", meta.title))
    .on('meta[property="og:description"]',  new AttrRewriter("content", meta.description))
    .on('meta[property="og:url"]',          new AttrRewriter("content", meta.url))
    .on('link[rel="canonical"]',            new AttrRewriter("href",   meta.url))
    .on("head", new HeadInjector(injected))
    .transform(response);
};
