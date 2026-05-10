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
  keywords?: string;
  jsonLd?: object | object[];
}

const HOST_META: Record<string, HostMeta> = {
  "bounty.swarmandbee.ai": {
    title: "Swarm & Bee · Bounty Intake",
    description:
      "Have a bounty. Need defendable AI work shipped. 186 GPUs owned, 14 TB VRAM on-prem, sha256 + Hedera receipts on every artifact.",
    url: "https://bounty.swarmandbee.ai/",
    image: "https://bounty.swarmandbee.ai/og-bounty.png",
    keywords: [
      "AI bounty intake",
      "LLM evaluation services",
      "fine-tuning bounty",
      "dataset audit",
      "GEO audit",
      "AI answer visibility audit",
      "synthetic data generation",
      "RAG pipeline",
      "sovereign compute",
      "owned GPU compute",
      "defendable AI work",
      "Hedera anchored AI",
      "sha256 receipts",
      "RTX PRO 6000 Blackwell",
      "Swarm and Bee bounty",
      "build@swarmandbee.ai",
    ].join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://bounty.swarmandbee.ai/#service",
        name: "Swarm & Bee · Bounty Intake",
        url: "https://bounty.swarmandbee.ai/",
        image: "https://bounty.swarmandbee.ai/og-bounty.png",
        description:
          "Inbound bounty + scoped AI build work, delivered on owned 186-GPU sovereign compute with sha256 receipts on every artifact.",
        provider: {
          "@type": "Organization",
          "@id": "https://swarmandbee.ai/#organization",
          name: "Swarm & Bee LLC",
          url: "https://swarmandbee.ai/",
        },
        areaServed: "Global",
        serviceType: [
          "LLM evaluation",
          "Fine-tuning",
          "Dataset audit and repair",
          "Research briefs",
          "AI / GEO audit",
          "Synthetic data and RAG",
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: "250",
          highPrice: "10000",
          offerCount: "6",
          availability: "https://schema.org/InStock",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "build@swarmandbee.ai",
          url: "https://bounty.swarmandbee.ai/#contact",
          availableLanguage: ["en"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What kinds of AI work does Swarm & Bee take on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LLM evaluation harnesses, fine-tuning (LoRA + full), dataset audit and repair, source-cited research briefs, AI / GEO audits, and synthetic data + RAG pipelines.",
            },
          },
          {
            "@type": "Question",
            name: "Why choose owned compute over cloud-rented GPUs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "186 GPUs (14 TB VRAM, 80 kW) means no token rationing, no spot-instance preemption, and client data never touches a hyperscaler. Air-gapped runs are available.",
            },
          },
          {
            "@type": "Question",
            name: "How are deliverables made auditable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every artifact gets a sha256 receipt. Hedera Consensus Service anchoring is available on demand for audit-grade compliance.",
            },
          },
          {
            "@type": "Question",
            name: "What is the response time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A human responds within one business day of submission. Nothing is automated, no auto-submit, no spam.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Swarm & Bee", item: "https://swarmandbee.ai/" },
          { "@type": "ListItem", position: 2, name: "Bounty intake", item: "https://bounty.swarmandbee.ai/" },
        ],
      },
    ],
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
  const injected: string[] = [
    `<meta property="og:image" content="${escapeAttr(meta.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`,
  ];

  if (meta.jsonLd) {
    const blocks = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
    for (const block of blocks) {
      injected.push(
        `<script type="application/ld+json">${JSON.stringify(block)}</script>`
      );
    }
  }

  const rewriter = new HTMLRewriter()
    .on("title", new TitleRewriter(meta.title))
    .on('meta[name="description"]',         new AttrRewriter("content", meta.description))
    .on('meta[property="og:title"]',        new AttrRewriter("content", meta.title))
    .on('meta[property="og:description"]',  new AttrRewriter("content", meta.description))
    .on('meta[property="og:url"]',          new AttrRewriter("content", meta.url))
    .on('link[rel="canonical"]',            new AttrRewriter("href",   meta.url))
    .on("head", new HeadInjector(injected.join("\n")));

  // Optional: keywords meta exists in apex index.html — rewrite for bounty
  if (meta.keywords) {
    rewriter.on('meta[name="keywords"]', new AttrRewriter("content", meta.keywords));
  }

  return rewriter.transform(response);
};
