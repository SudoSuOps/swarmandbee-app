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
        // Sovereign identities — sameAs lets crawlers map the HTTP surface
        // to the canonical on-chain addresses. defendable.eth is the cert
        // standard the work is delivered under; aiov.eth is the sibling
        // product surface (AI Opinion of Value).
        sameAs: [
          "https://defendable.eth.limo",
          "https://aiov.eth.limo",
          "https://swarmandbee.eth.limo",
          "https://swarmusdc.eth.limo",
          "https://x.com/swarmandbee",
        ],
        description:
          "Inbound bounty + scoped AI build work, delivered on owned 186-GPU sovereign compute with sha256 receipts on every artifact. Carries the defendable.eth certification standard.",
        provider: {
          "@type": "Organization",
          "@id": "https://swarmandbee.ai/#organization",
          name: "Swarm & Bee LLC",
          url: "https://swarmandbee.ai/",
          sameAs: [
            "https://defendable.eth.limo",
            "https://aiov.eth.limo",
            "https://swarmandbee.eth.limo",
          ],
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
  "identity.swarmandbee.ai": {
    title: "Swarm & Bee · Sovereign Identity (ENS + Hedera Names)",
    description:
      "The ID is the sovereignty. Every Swarm & Bee asset has an on-chain address before it has a URL. ENS + Hedera Names · immutable, transparent, censorship-resistant.",
    url: "https://identity.swarmandbee.ai/",
    image: "https://identity.swarmandbee.ai/og-identity.png",
    keywords: [
      "ENS",
      "Ethereum Name Service",
      "Hedera Names",
      "sovereign identity",
      "on-chain identity",
      "decentralized identity",
      "censorship-resistant identity",
      "defendable.eth",
      "aiov.eth",
      "swarmusdc.eth",
      "swarmandbee.eth",
      "swarm.hbar",
      "hive.hbar",
      "Hedera Consensus Service",
      "HCS anchor",
      "immutable receipts",
      "web3 identity",
    ].join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://identity.swarmandbee.ai/#page",
        name: "Swarm & Bee · Sovereign Identity",
        url: "https://identity.swarmandbee.ai/",
        description:
          "Public explainer for the ENS and Hedera Names sovereign identities owned by Swarm & Bee LLC.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://swarmandbee.ai/#website",
          name: "Swarm & Bee",
          url: "https://swarmandbee.ai/",
        },
        about: {
          "@type": "Organization",
          "@id": "https://swarmandbee.ai/#organization",
          name: "Swarm & Bee LLC",
          url: "https://swarmandbee.ai/",
          sameAs: [
            "https://swarmandbee.eth.limo",
            "https://defendable.eth.limo",
            "https://aiov.eth.limo",
            "https://swarmusdc.eth.limo",
            "https://x.com/swarmandbee",
          ],
          identifier: [
            { "@type": "PropertyValue", propertyID: "ENS", value: "swarmandbee.eth" },
            { "@type": "PropertyValue", propertyID: "ENS", value: "defendable.eth" },
            { "@type": "PropertyValue", propertyID: "ENS", value: "aiov.eth" },
            { "@type": "PropertyValue", propertyID: "ENS", value: "swarmusdc.eth" },
            { "@type": "PropertyValue", propertyID: "HederaName", value: "swarm.hbar" },
            { "@type": "PropertyValue", propertyID: "HederaName", value: "swarmandbee.hbar" },
            { "@type": "PropertyValue", propertyID: "HederaName", value: "hive.hbar" },
            { "@type": "PropertyValue", propertyID: "HCS-Topic", value: "0.0.10291838" },
            { "@type": "PropertyValue", propertyID: "D-U-N-S",   value: "138652395" },
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why does Swarm & Bee own .eth and .hbar names?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ENS and Hedera Names are immutable on-chain identities. They can't be censored by a registrar, seized by a platform, or quietly redirected without a public on-chain transaction. The .ai domain is a gateway; the on-chain address is the asset.",
            },
          },
          {
            "@type": "Question",
            name: "What is defendable.eth?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "defendable.eth is the open certification standard. Every deliverable Swarm & Bee ships is signed under this address. Future co-issuers can publish their own work under the same standard.",
            },
          },
          {
            "@type": "Question",
            name: "What is swarmusdc.eth?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "swarmusdc.eth is the firm's USDC settlement address — invoicing and receipts settle to a stable USD-pegged on-chain address with no payment-rail intermediary.",
            },
          },
          {
            "@type": "Question",
            name: "What is swarm.hbar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "swarm.hbar is the Hedera-native firm identity. Every Defendable receipt is anchored to Hedera Consensus Service topic 0.0.10291838 under this name.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Swarm & Bee", item: "https://swarmandbee.ai/" },
          { "@type": "ListItem", position: 2, name: "Sovereign identity", item: "https://identity.swarmandbee.ai/" },
        ],
      },
    ],
  },
  "bakery.swarmandbee.ai": {
    // Bakery subdomain stays as an alias of the apex. The canonical URL points
    // to apex (swarmandbee.ai) since the bakery is now the apex identity.
    title: "Swarm & Bee · The Organic Dataset Bakery",
    description:
      "Organic, fresh-baked AI training datasets. Sold by the pound in wholesale corpora, or as signature 500-Packs targeting one failure mode. Curated, tier-graded, sha256-receipted, Hedera-anchored. Less is better when the cut is targeted.",
    url: "https://swarmandbee.ai/",
    image: "https://swarmandbee.ai/og-bakery.png",
    keywords: [
      "organic AI dataset",
      "fresh baked dataset",
      "AI training data by the pound",
      "500 pack dataset",
      "targeted training corpus",
      "less is better dataset",
      "curated training data",
      "Royal Jelly tiers",
      "honey jelly pollen propolis",
      "data refinery",
      "Commercial Compute Intelligence Refinery",
      "CCIR",
      "Atlas-Qwen-27B",
      "SwarmCurator",
      "Tribunal-Before-Training",
      "data freshness shelf life",
      "fabrication detection",
      "rubric grading dataset",
      "sha256 receipts dataset",
      "Hedera anchored dataset",
      "AI bakery doctrine",
      "Swarm and Bee bakery",
      "wholesale AI corpus",
      "failure mode repair corpus",
    ].join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://bakery.swarmandbee.ai/#page",
        name: "Swarm & Bee · The Dataset Bakery",
        url: "https://bakery.swarmandbee.ai/",
        description:
          "Public explainer for the Swarm & Bee dataset operating doctrine. Curated, tiered, fresh — the bakery model for AI training data.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://swarmandbee.ai/#website",
          name: "Swarm & Bee",
          url: "https://swarmandbee.ai/",
        },
        about: {
          "@type": "Organization",
          "@id": "https://swarmandbee.ai/#organization",
          name: "Swarm & Bee LLC",
          url: "https://swarmandbee.ai/",
          sameAs: [
            "https://swarmandbee.eth.limo",
            "https://defendable.eth.limo",
            "https://aiov.eth.limo",
            "https://swarmusdc.eth.limo",
            "https://x.com/swarmandbee",
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why is AI a bakery first?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Signal is raw supply, curators are the bakers who shape it into shippable product, the cook is the oven, the Tribunal is the head baker who tastes before shipping, and distribution is the delivery. Fresh every day with a shelf life — datasets decay like bread.",
            },
          },
          {
            "@type": "Question",
            name: "What does 'less is better' mean in practice?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Volume of pairs is not the bottleneck — targeting is. A 500-pair corpus that fixes a specific failure mode beats a 244,000-pair corpus that scatters signal. Atlas-Qwen-27B v1 with 244K pairs net-regressed; Curator v2 with 501 pairs targets the exact blind spot.",
            },
          },
          {
            "@type": "Question",
            name: "What are the Royal Jelly tier grades?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Five shelf grades from a 1–10 curator rubric: APEX (9.5+, master-baker reference), HONEY (7.5–9.4, shippable), JELLY (5.0–7.4, needs repair), POLLEN (2.5–4.9, weak seed only), PROPOLIS (0–2.4, compost).",
            },
          },
          {
            "@type": "Question",
            name: "How is freshness handled?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every pair is re-graded as the world moves. A 2023 cap rate that was honey-grade then is reference-only by 2026. The Royal Jelly tier system has a re-classification loop; corpora re-bake on cadence; the model is only as fresh as the last bake.",
            },
          },
          {
            "@type": "Question",
            name: "What SKUs does the bakery sell?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Two: 'By the pound' wholesale corpora (priced per 1,000 pairs, for shops needing breadth) and 'The 500-Pack' signature blend (500-1000 hand-built pairs targeting one failure mode, Tribunal-sealed, 25-50× the leverage of equivalent wholesale).",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "Swarm & Bee Bakery Menu",
        itemListElement: [
          {
            "@type": "Offer",
            name: "By the pound — wholesale corpora",
            description: "Bulk training corpora, graded, deduped, freshness-stamped. Sold per 1,000 pairs.",
            category: "AI Training Data — Wholesale",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "The 500-Pack — signature blend",
            description: "500-1,000 pairs hand-built around one failure mode. Tribunal-sealed. 25-50× the leverage of wholesale.",
            category: "AI Training Data — Targeted Micro-Corpus",
            availability: "https://schema.org/InStock",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Swarm & Bee", item: "https://swarmandbee.ai/" },
          { "@type": "ListItem", position: 2, name: "The dataset bakery", item: "https://bakery.swarmandbee.ai/" },
        ],
      },
    ],
  },
  "cre.swarmandbee.ai": {
    title: "Swarm & Bee · CRE Capital Markets — Florida Licensed Brokerage",
    description:
      "The AI-native CRE Capital Markets firm. Florida Licensed Real Estate Brokerage running on 186 GPUs of sovereign compute. AtlasOS coordinates the agent pod: Senior MD, Underwriter, Book Maker, Closing, 10-Hack fleet. Verified. Vetted. Virtu.",
    url: "https://cre.swarmandbee.ai/",
    image: "https://cre.swarmandbee.ai/og-cre.png",
    keywords: [
      "AI-native CRE",
      "AI commercial real estate brokerage",
      "AtlasOS",
      "Atlas-70B",
      "AI underwriting",
      "AI capital markets",
      "Florida Licensed Real Estate Brokerage",
      "Donovan Mackey",
      "Memphis 312-unit",
      "12 cap maturation thesis",
      "Verified Vetted Virtu",
      "Defendable Franchise",
      "Hedera anchored deals",
      "sovereign compute brokerage",
      "Swarm and Bee CRE",
      "Family Office posture",
      "D-U-N-S 138652395",
    ].join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": ["ProfessionalService", "RealEstateAgent"],
        "@id": "https://cre.swarmandbee.ai/#cre-firm",
        name: "Swarm & Bee · CRE Capital Markets",
        url: "https://cre.swarmandbee.ai/",
        image: "https://cre.swarmandbee.ai/og-cre.png",
        description:
          "Florida Licensed Real Estate Brokerage operated by Swarm & Bee LLC. AI-native CRE Capital Markets firm running AtlasOS on 186 GPUs of sovereign compute.",
        slogan: "Verified. Vetted. Virtu.",
        email: "build@swarmandbee.ai",
        areaServed: {"@type": "AdministrativeArea", name: "Florida"},
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://swarmandbee.ai/#organization",
          name: "Swarm & Bee LLC",
          url: "https://swarmandbee.ai/",
        },
        identifier: [
          {"@type": "PropertyValue", propertyID: "DUNS", value: "138652395"},
          {"@type": "PropertyValue", propertyID: "ENS", value: "swarmandbee.eth"},
          {"@type": "PropertyValue", propertyID: "Hedera HCS Topic", value: "0.0.10291838"},
        ],
        knowsAbout: [
          "Commercial Real Estate underwriting",
          "CRE Capital Markets",
          "Industrial STNL",
          "Multifamily",
          "Multi-agent AI brokerage",
          "Hedera Consensus Service",
          "AtlasOS",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://cre.swarmandbee.ai/#founder",
        name: "Donovan Mackey",
        jobTitle: "Founder · Family Office",
        description: "30 years CRE. $8B in closed transactions. Top-producing industrial broker on a national platform. Founded Swarm & Bee LLC to operate the CCIR dataset bakery — CRE is the first vertical it serves.",
        worksFor: {"@id": "https://cre.swarmandbee.ai/#cre-firm"},
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {"@type": "ListItem", position: 1, name: "Swarm & Bee", item: "https://swarmandbee.ai/"},
          {"@type": "ListItem", position: 2, name: "CRE Capital Markets", item: "https://cre.swarmandbee.ai/"},
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
