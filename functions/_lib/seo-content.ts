// Per-route HTML body content + JSON-LD generators for SSR-lite injection.
//
// The React SPA serves an empty <div id="root"></div> to crawlers. This module
// generates static HTML body content per route + structured JSON-LD (Product,
// SoftwareApplication, HowTo, TechArticle, BreadcrumbList) so AI bots and search
// engines see real, citable content without executing JS.
//
// The HTML gets injected INTO <div id="root">. React's createRoot() replaces
// the content on hydration, so users see the React app once JS loads. Crawlers
// see this static content forever.
//
// Data sources: cookbooks/index.json + menu.json are fetched at request time
// via ASSETS binding. Single source of truth, no duplicate copy maintenance.

export interface RouteContent {
  bodyHtml: string;          // injected INTO <div id="root">
  jsonLdBlocks: object[];    // injected INTO <head>
  title?: string;            // optional <title> override (path-specific)
  description?: string;      // optional meta description override
}

interface CookbookMeta {
  slug: string;
  name: string;
  cells: number;
  price_usd: number;
  tier: string;
  lane: string;
  target_failure_mode?: string;
  url_markdown?: string;
  receipt?: string;
  ingredients?: Array<{ name: string; cells: number; rationale?: string }>;
}

interface SKUMeta {
  name: string;
  sku_id?: string;
  pairs: number;
  domain?: string;
  tier_grade?: string;
  status?: string;
  note?: string;
}

const BAKERY_ORG_URL = "https://swarmandbee.ai/#organization";
const FOUNDER_URL = "https://swarmandbee.ai/#founder";
const FULL_USDC_ADDRESS = "0xBDe2153C5799f4012a9fAF327e3421D1caB4Ea23";

// ─── Fetch helpers ─────────────────────────────────────────────────────────

async function fetchJsonAsset<T = unknown>(
  baseUrl: string,
  path: string,
): Promise<T | null> {
  try {
    const resp = await fetch(new URL(path, baseUrl).toString(), {
      cf: { cacheTtl: 300 } as RequestInit["cf"],
    } as RequestInit);
    if (!resp.ok) return null;
    return (await resp.json()) as T;
  } catch {
    return null;
  }
}

async function fetchTextAsset(baseUrl: string, path: string): Promise<string | null> {
  try {
    const resp = await fetch(new URL(path, baseUrl).toString(), {
      cf: { cacheTtl: 300 } as RequestInit["cf"],
    } as RequestInit);
    if (!resp.ok) return null;
    return await resp.text();
  } catch {
    return null;
  }
}

// ─── Escape helpers ────────────────────────────────────────────────────────

function esc(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── HOMEPAGE (apex `/`) ────────────────────────────────────────────────────

async function buildHomeContent(requestUrl: string): Promise<RouteContent> {
  const base = new URL("/", requestUrl).toString();
  const menu = await fetchJsonAsset<any>(base, "/menu.json");
  const cookbooksIdx = await fetchJsonAsset<any>(base, "/cookbooks/index.json");

  const cookbooks: CookbookMeta[] = cookbooksIdx?.cookbooks ?? [];
  const skus: SKUMeta[] = (menu?.skus?.by_the_pound?.stock ?? [])
    .filter((s: SKUMeta) => s.status === "in_stock");
  const medicalSkus = skus.filter((s) => s.domain?.startsWith("medical")).slice(0, 8);
  const otherSkus = skus.filter((s) => !s.domain?.startsWith("medical")).slice(0, 4);

  // ─ visible body HTML ─
  const cookbookRows = cookbooks
    .map(
      (c) =>
        `<li><a href="/cookbooks/${esc(c.slug)}"><strong>${esc(c.name)}</strong></a> · ${c.cells.toLocaleString()} cells · $${c.price_usd.toLocaleString()} · ${esc(c.tier?.replace("_", " "))} · <em>${esc(c.target_failure_mode?.slice(0, 100) || c.lane)}</em></li>`,
    )
    .join("\n      ");

  const skuRows = [...medicalSkus, ...otherSkus]
    .map(
      (s) =>
        `<li><strong>${esc(s.name)}</strong> · ${s.pairs.toLocaleString()} cells · ${esc(s.domain)} · tier <code>${esc(s.tier_grade)}</code></li>`,
    )
    .join("\n      ");

  const bodyHtml = `
<main class="sb-crawler-static">
  <header>
    <h1>Swarm &amp; Bee · The Organic Dataset Bakery</h1>
    <p class="tagline">Sovereign-compute AI training-data refinery. 186 GPUs · 14 TB VRAM owned on-prem. Pre-curated medical training corpora for ML engineers building clinical-support models. Receipts where we have them, explicitly pending where we don&apos;t. <strong>No fake science.</strong></p>
  </header>

  <section id="real-receipts">
    <h2>Real receipts (the load-bearing claims)</h2>
    <ul>
      <li><strong>Atlas-Qwen-27B</strong> · final loss <strong>0.4186</strong> — CRE-vertical adapter on the Gold Standard QLoRA config (LR 1e-5, LoRA r=64 α=32, cosine, eff batch 32, bf16).</li>
      <li><strong>SwarmCurator-9B</strong> · final loss <strong>0.707</strong> — auditor model cooked on same config.</li>
      <li><strong>501 Jelly Donuts</strong> · Curator-Mistral-3B v2 directly repaired Atlas-Qwen-27B v1&apos;s fabrication-detection blind spot — the empirical anchor for &ldquo;less is better when the cut is targeted.&rdquo; This is the floor for spot-repair on one narrow failure mode.</li>
      <li><strong>Cookbooks scale that pattern</strong> · Standard 3,000 cells = move the needle on a domain. Master 5,000 cells = confident behavioral pivot. Below 3,000, route to the 500-Pack ($249) where the direct receipt lives.</li>
    </ul>
  </section>

  <section id="cookbooks">
    <h2>Cookbooks (curated recipes that move the needle)</h2>
    <p>Pre-built multi-SKU bundles, deterministic per-cookbook (sha256-seeded), ship with the 60-probe <code>dmack_eval_set_v1</code> + recipe YAML + loader.py. Pre/post the eval set; the delta is the receipt.</p>
    <ul>
      ${cookbookRows}
    </ul>
  </section>

  <section id="medical-catalog">
    <h2>Medical SKU catalog (in stock)</h2>
    <p>Every cell count is from <code>wc -l</code> on the source file — never estimated, never rounded. Two-stream architecture preserved: sourced authority (ADA, IWGDF, NIDDK, NHS, PMC) vs. founder lived-experience register, never confused.</p>
    <ul>
      ${skuRows}
    </ul>
  </section>

  <section id="how-to-buy">
    <h2>How to buy · CLI-only doctrine</h2>
    <p>Datasets are sold <strong>only through the <code>swarmbee-bakery</code> CLI</strong> (pip install). No browser auto-checkout. A human reads every order within one business day.</p>
    <ol>
      <li><code>pipx install swarmbee-bakery</code> (or pip in a venv)</li>
      <li><code>swarmbee-bakery cookbook</code> — browse the 6 curated recipes</li>
      <li><code>swarmbee-bakery free --all --out-dir ./samples</code> — pull 10 free medical sample packs (500 cells, no signup)</li>
      <li><code>swarmbee-bakery order --sku cookbook --cookbook &lt;slug&gt; --settlement swarmusdc --confirm</code></li>
    </ol>
    <p>Settlement rails: <strong>Stripe invoice</strong> (email link, no card-on-file) or <strong>USDC</strong> to <code>swarmusdc.eth</code> (resolves to <code>${FULL_USDC_ADDRESS}</code>) on <strong>Ethereum L1 ERC-20 mainnet only</strong> — no L2, no Base, we are root.</p>
  </section>

  <section id="founder">
    <h2>Founder · Compassionate Intelligence</h2>
    <p><strong>Donovan Mackey</strong> — Founder, Family Office. 30 years CRE, $8B in closed transactions. <strong>Type 1 diabetic, Addison&apos;s disease, insulin-dependent, 14 foot-complication surgeries.</strong> Lived experience anchors the medical vertical&apos;s register — used for human resonance, <strong>never as medical authority</strong>. Sourced medical claims carry the citation chain.</p>
    <p><em>Datasets and cooked models are training and decision-support tools for ML engineers. Not medical advice. Not a substitute for a licensed clinician.</em></p>
  </section>

  <footer>
    <p>Swarm and Bee LLC · Florida · DUNS 138652395 · <a href="mailto:build@swarmandbee.ai">build@swarmandbee.ai</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/cookies">Cookies</a> · <a href="/llms.txt">llms.txt</a> · <a href="/cookbooks/index.json">cookbooks/index.json</a> · <a href="/menu.json">menu.json</a></p>
  </footer>
</main>
`;

  // ─ JSON-LD blocks ─
  const jsonLdBlocks: object[] = [];

  // Product per cookbook
  for (const c of cookbooks) {
    jsonLdBlocks.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://swarmandbee.ai/cookbooks/${c.slug}`,
      name: `${c.name} · Cookbook`,
      sku: c.slug,
      category: `AI Training Dataset · ${c.lane}`,
      description: c.target_failure_mode || `${c.name} curated training cookbook`,
      brand: { "@id": BAKERY_ORG_URL },
      additionalProperty: [
        { "@type": "PropertyValue", name: "cells", value: c.cells },
        { "@type": "PropertyValue", name: "tier", value: c.tier },
        { "@type": "PropertyValue", name: "lane", value: c.lane },
      ],
      offers: {
        "@type": "Offer",
        url: `https://swarmandbee.ai/cookbooks/${c.slug}`,
        priceCurrency: "USD",
        price: c.price_usd,
        availability: "https://schema.org/InStock",
        seller: { "@id": BAKERY_ORG_URL },
        acceptedPaymentMethod: [
          "http://purl.org/goodrelations/v1#ByInvoice",
          "Stripe Invoice",
          `USDC ERC-20 to swarmusdc.eth (${FULL_USDC_ADDRESS})`,
        ],
      },
    });
  }

  // SoftwareApplication for the CLI
  jsonLdBlocks.push({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://swarmandbee.ai/cli#swarmbee-bakery",
    name: "swarmbee-bakery",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    softwareVersion: "0.1.6",
    downloadUrl: "https://pypi.org/project/swarmbee-bakery/",
    installUrl: "https://pypi.org/project/swarmbee-bakery/",
    description:
      "CLI for browsing, sampling, and ordering Swarm & Bee dataset cookbooks. Install via pipx install swarmbee-bakery. Order via swarmbee-bakery order --sku cookbook --cookbook <slug> --settlement swarmusdc --confirm.",
    publisher: { "@id": BAKERY_ORG_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });

  // HowTo for the order flow
  jsonLdBlocks.push({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://swarmandbee.ai/#how-to-order",
    name: "Order a Swarm & Bee cookbook",
    description:
      "Sovereign CLI-only ordering flow. Install the CLI, browse cookbooks, optionally taste free samples, submit an order, pay via Stripe invoice or USDC settlement to swarmusdc.eth.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "1299" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Install", text: "pipx install swarmbee-bakery", url: "https://pypi.org/project/swarmbee-bakery/" },
      { "@type": "HowToStep", position: 2, name: "Browse", text: "swarmbee-bakery cookbook" },
      { "@type": "HowToStep", position: 3, name: "Taste free", text: "swarmbee-bakery free --all --out-dir ./samples (500 free medical cells)" },
      { "@type": "HowToStep", position: 4, name: "Order", text: "swarmbee-bakery order --sku cookbook --cookbook <slug> --settlement swarmusdc --confirm" },
      { "@type": "HowToStep", position: 5, name: "Pay", text: `Stripe invoice via email, or USDC settlement to swarmusdc.eth (${FULL_USDC_ADDRESS}) on Ethereum L1 ERC-20 mainnet only` },
      { "@type": "HowToStep", position: 6, name: "Receive", text: "Signed R2 download URL emailed within one business day with manifest.json + sha256 + 60-probe eval set + recipe YAML" },
    ],
  });

  // OfferCatalog rollup for top SKUs (limited subset so payload stays sane)
  jsonLdBlocks.push({
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": "https://swarmandbee.ai/#medical-catalog",
    name: "Swarm & Bee Medical SKU Catalog",
    itemListElement: medicalSkus.slice(0, 6).map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: s.name,
      description: `${s.pairs.toLocaleString()} cells · ${s.domain} · tier ${s.tier_grade}`,
      availability: "https://schema.org/InStock",
    })),
  });

  return {
    bodyHtml,
    jsonLdBlocks,
    title: "Swarm & Bee · The Organic Dataset Bakery · Sovereign Medical Training Data + CLI",
    description:
      "Pre-curated AI training corpora for ML engineers building medical-vertical models. Standard 3,000-cell cookbooks at $1,299, master 5,000-cell cookbooks at $2,199. 10 free medical sample packs (500 cells) to taste. Sovereign compute (186 GPUs · 14 TB VRAM). CLI-only ordering (pip install swarmbee-bakery), Stripe invoice or USDC swarmusdc.eth settlement.",
  };
}

// ─── COOKBOOK DETAIL (`/cookbooks/<slug>`) ──────────────────────────────────

export async function buildCookbookContent(
  requestUrl: string,
  slug: string,
): Promise<RouteContent | null> {
  const base = new URL("/", requestUrl).toString();
  const cookbooksIdx = await fetchJsonAsset<any>(base, "/cookbooks/index.json");
  if (!cookbooksIdx) return null;
  const cookbook = (cookbooksIdx.cookbooks ?? []).find(
    (c: CookbookMeta) => c.slug === slug,
  );
  if (!cookbook) return null;

  const md = await fetchTextAsset(base, `/cookbooks/${slug}.md`);

  // Render markdown into a coarse HTML preview (no full markdown parser — just
  // preserve structure for crawlers + link the source).
  const mdPreview = md
    ? md
        .split("\n")
        .map((line) => {
          if (line.startsWith("# ")) return `<h1>${esc(line.slice(2))}</h1>`;
          if (line.startsWith("## ▍ ")) return `<h2>${esc(line.slice(5))}</h2>`;
          if (line.startsWith("## ")) return `<h2>${esc(line.slice(3))}</h2>`;
          if (line.startsWith("### ")) return `<h3>${esc(line.slice(4))}</h3>`;
          if (line.startsWith("```")) return ""; // strip code fences for preview
          if (line.startsWith("- ")) return `<li>${esc(line.slice(2))}</li>`;
          if (line.startsWith("|")) return ""; // strip table rows for preview brevity
          if (line.match(/^---+$/)) return "<hr/>";
          if (line.trim() === "") return "";
          return `<p>${esc(line)}</p>`;
        })
        .join("\n")
        .slice(0, 8000) // cap preview size
    : `<p>Cookbook source at <a href="/cookbooks/${esc(slug)}.md">/cookbooks/${esc(slug)}.md</a></p>`;

  const ingredientsList = (cookbook.ingredients ?? [])
    .map(
      (i: any) =>
        `<li><strong>${esc(i.name)}</strong> · ${i.cells?.toLocaleString()} cells · <em>${esc(i.rationale || "")}</em></li>`,
    )
    .join("\n      ");

  const bodyHtml = `
<main class="sb-crawler-static">
  <header>
    <h1>Cookbook · ${esc(cookbook.name)} · ${cookbook.cells.toLocaleString()} cells</h1>
    <p><strong>$${cookbook.price_usd.toLocaleString()}</strong> · ${esc(cookbook.tier?.replace("_", " "))} · ${esc(cookbook.lane)} lane</p>
    <p>${esc(cookbook.target_failure_mode || "")}</p>
  </header>

  <section id="receipt">
    <h2>The receipt</h2>
    <p>${esc(cookbook.receipt || "")}</p>
  </section>

  <section id="ingredients">
    <h2>Ingredients · ${cookbook.cells.toLocaleString()} cells, deterministic</h2>
    <ul>
      ${ingredientsList}
    </ul>
  </section>

  <section id="order">
    <h2>Order this cookbook</h2>
    <pre><code>swarmbee-bakery order \\
  --sku cookbook \\
  --cookbook ${esc(slug)} \\
  --domain medical \\
  --name "Your Name" --email "you@you.dev" \\
  --settlement swarmusdc \\
  --confirm</code></pre>
    <p>Settlement: <strong>Stripe invoice</strong> or <strong>USDC</strong> to <code>swarmusdc.eth</code> (<code>${FULL_USDC_ADDRESS}</code>) on Ethereum L1 ERC-20 mainnet only.</p>
  </section>

  <section id="full-recipe">
    <h2>Full recipe + schema + loader + eval pattern</h2>
    <p>The complete markdown recipe is at <a href="/cookbooks/${esc(slug)}.md"><code>/cookbooks/${esc(slug)}.md</code></a> — includes the Gold Standard QLoRA config (used to cook Atlas-Qwen-27B loss 0.4186, SwarmCurator-9B loss 0.707), schema reference with quirks, drop-in Python loader, and the 60-probe <code>dmack_eval_set_v1</code> grading pattern.</p>
    <details>
      <summary>Preview the cookbook (first ~8KB rendered)</summary>
      <article class="cookbook-preview">${mdPreview}</article>
    </details>
  </section>

  <footer>
    <p><em>Not medical advice. Cookbooks ship training data and recipes for ML engineers building clinical-support models. Outputs of a cooked model are not a substitute for a licensed clinician.</em></p>
    <p>← <a href="/">Back to Swarm &amp; Bee</a> · <a href="/cookbooks/index.json">All cookbooks (JSON)</a> · <a href="mailto:build@swarmandbee.ai">build@swarmandbee.ai</a></p>
  </footer>
</main>
`;

  // TechArticle + Product + BreadcrumbList JSON-LD per cookbook
  const jsonLdBlocks: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `https://swarmandbee.ai/cookbooks/${slug}#article`,
      headline: `${cookbook.name} Cookbook · ${cookbook.cells.toLocaleString()} cells · $${cookbook.price_usd}`,
      url: `https://swarmandbee.ai/cookbooks/${slug}`,
      author: { "@id": FOUNDER_URL },
      publisher: { "@id": BAKERY_ORG_URL },
      datePublished: cookbooksIdx.updated_at || "2026-05-17",
      dateModified: cookbooksIdx.updated_at || "2026-05-17",
      proficiencyLevel: "Expert",
      about: [
        { "@type": "Thing", name: cookbook.lane },
        { "@type": "Thing", name: "AI training data" },
        { "@type": "Thing", name: "QLoRA fine-tuning" },
      ],
      description: cookbook.target_failure_mode || cookbook.name,
      articleBody: (md || "").slice(0, 5000),
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://swarmandbee.ai/cookbooks/${slug}#product`,
      name: `${cookbook.name} · Cookbook`,
      sku: slug,
      category: `AI Training Dataset · ${cookbook.lane}`,
      description: cookbook.target_failure_mode || cookbook.name,
      brand: { "@id": BAKERY_ORG_URL },
      additionalProperty: [
        { "@type": "PropertyValue", name: "cells", value: cookbook.cells },
        { "@type": "PropertyValue", name: "tier", value: cookbook.tier },
        { "@type": "PropertyValue", name: "lane", value: cookbook.lane },
      ],
      offers: {
        "@type": "Offer",
        url: `https://swarmandbee.ai/cookbooks/${slug}`,
        priceCurrency: "USD",
        price: cookbook.price_usd,
        availability: "https://schema.org/InStock",
        seller: { "@id": BAKERY_ORG_URL },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Swarm & Bee", item: "https://swarmandbee.ai/" },
        { "@type": "ListItem", position: 2, name: "Cookbooks", item: "https://swarmandbee.ai/#cookbooks" },
        { "@type": "ListItem", position: 3, name: cookbook.name, item: `https://swarmandbee.ai/cookbooks/${slug}` },
      ],
    },
  ];

  return {
    bodyHtml,
    jsonLdBlocks,
    title: `${cookbook.name} Cookbook · ${cookbook.cells.toLocaleString()} cells · $${cookbook.price_usd.toLocaleString()} · Swarm & Bee`,
    description: `${cookbook.target_failure_mode || cookbook.name} · ${cookbook.cells.toLocaleString()} cells, ${cookbook.tier?.replace("_", " ")} tier. Gold Standard QLoRA recipe, 60-probe eval set, loader.py. Order via CLI (Stripe or USDC swarmusdc.eth settlement).`,
  };
}

// ─── ROUTER ────────────────────────────────────────────────────────────────

export async function getRouteContent(
  requestUrl: string,
  host: string,
  pathname: string,
): Promise<RouteContent | null> {
  // Apex homepage (or bakery subdomain — same canonical content)
  if (pathname === "/" && (host === "swarmandbee.ai" || host === "bakery.swarmandbee.ai")) {
    return buildHomeContent(requestUrl);
  }
  // Cookbook detail pages — handled by functions/cookbooks/[slug].ts directly,
  // but middleware can also augment here if needed.
  return null;
}
