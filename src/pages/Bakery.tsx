// bakery.swarmandbee.ai · the dataset bakery
//
// The operational doctrine made public-facing. AI is a bakery first:
// signal is supply, curators are bakers, distribution is delivery.
// Fresh every day. 500-1000 muffins beat 25K of ingredients.

const APEX = "https://swarmandbee.ai";
const X_URL = "https://x.com/swarmandbee";
const EMAIL = "build@swarmandbee.ai";

export default function Bakery() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <BakeryHeader />
      <Hero />
      <Mapping />
      <LessIsBetter />
      <ShelfGrades />
      <Freshness />
      <Menu />
      <CallToAction />
      <BakeryFooter />
    </div>
  );
}

/* ------------------------------ header ------------------------------ */

function BakeryHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={APEX}
           className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors">
          ← Swarm &amp; Bee
        </a>
        <span className="ml-2 text-xs text-neutral-500 font-mono">/ the bakery</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <a href="#mapping" className="text-neutral-400 hover:text-neutral-100">mapping</a>
          <a href="#less" className="text-neutral-400 hover:text-neutral-100">less is better</a>
          <a href="#grades" className="text-neutral-400 hover:text-neutral-100">shelf grades</a>
          <a href="#freshness" className="text-neutral-400 hover:text-neutral-100">freshness</a>
          <a href="#menu" className="text-neutral-400 hover:text-neutral-100">the menu</a>
          <a href={X_URL} target="_blank" rel="noreferrer"
             className="text-amber-400 font-semibold hover:text-amber-300">x ↗</a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-neutral-950 to-emerald-950/10 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The organic dataset bakery · CCIR operating doctrine
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          AI is a<br />
          <span className="text-amber-400">bakery first.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Organic, fresh-baked datasets. Sold <strong className="text-amber-400">by the pound</strong> in
          wholesale corpora — or as signature <strong className="text-amber-400">500-Packs</strong> built
          to repair one failure mode at a time. Signal is supply, curators are bakers, the Tribunal is
          the head baker who tastes before shipping. Fresh every day, with a shelf life.
        </p>
        <p className="mt-4 text-lg md:text-xl text-amber-400 max-w-3xl leading-relaxed font-semibold">
          500 fantastic muffins crush 25,000 ingredients. Less is better.
        </p>
        <Stats />
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://bounty.swarmandbee.ai"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors">
            Place an order →
          </a>
          <a href="#mapping"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            How the bakery works ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "5", k: "tier grades" },
    { v: "25-50×", k: "curation leverage" },
    { v: "Daily", k: "re-bake cadence" },
    { v: "sha256", k: "provenance seal" },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
      {stats.map((s) => (
        <div key={s.k} className="bg-neutral-950 p-5">
          <div className="text-2xl font-bold text-amber-400 tracking-tight">{s.v}</div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">{s.k}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ mapping ------------------------------ */

const MAPPING: { bakery: string; swarm: string; detail: string }[] = [
  {
    bakery: "Ingredients (supply)",
    swarm: "Signal",
    detail: "Scraped corpora, OpenAlex pulls, X/Reddit/YouTube intake, source documents, deal packets.",
  },
  {
    bakery: "Bakers",
    swarm: "Curators",
    detail: "SwarmCurator-9B/27B audit + QC + Royal Jelly tier classifier. Atlas-UW underwriter on deal docs.",
  },
  {
    bakery: "The oven",
    swarm: "Cooks",
    detail: "Fine-tune runs on owned Blackwell silicon. TRL/Unsloth, locked recipes, canary-then-cook discipline.",
  },
  {
    bakery: "Head baker",
    swarm: "The Tribunal",
    detail: "Senior-hack review before launch. Curator-as-validator. Tastes every batch before it ships.",
  },
  {
    bakery: "Recipe book",
    swarm: "Honey Ledger",
    detail: "SQLite WAL with full provenance — every pair carries signal → batch → anchor → model → revenue chain.",
  },
  {
    bakery: "Delivery",
    swarm: "Distribution",
    detail: "api.swarmandbee.ai/honey · bounty.swarmandbee.ai · inference endpoints · the bounty Discord channel.",
  },
  {
    bakery: "Freshness",
    swarm: "Recency-weighted signal",
    detail: "Stale comps don't underwrite fresh deals. OpenAlex re-cooks on schedule. Source weight decays with age.",
  },
  {
    bakery: "Shelf life",
    swarm: "RJP tier downgrade",
    detail: "A pair that was honey-grade in 2024 becomes propolis in 2026 if the market reality moved. We re-classify.",
  },
];

function Mapping() {
  return (
    <section id="mapping" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-amber-400">▍</span> The mapping
        </h2>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-xs uppercase tracking-widest text-neutral-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">bakery role</th>
                <th className="text-left px-5 py-3 font-medium">swarm component</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">what it actually does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {MAPPING.map((m) => (
                <tr key={m.bakery} className="hover:bg-neutral-900/50">
                  <td className="px-5 py-4 whitespace-nowrap font-semibold">{m.bakery}</td>
                  <td className="px-5 py-4 font-mono text-amber-400 whitespace-nowrap">{m.swarm}</td>
                  <td className="px-5 py-4 text-neutral-400 hidden md:table-cell">{m.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ less is better ------------------------------ */

function LessIsBetter() {
  return (
    <section id="less" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
          <span className="text-amber-400">▍</span> Less is better
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-6 text-lg max-w-3xl">
          Volume of pairs is not the bottleneck. <strong className="text-amber-400">Targeting is.</strong> A
          500-pair corpus that fixes a specific failure mode beats a 244,000-pair corpus that scatters signal
          across modes. We&apos;ve already lived this:
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-xs uppercase tracking-widest text-neutral-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">cook</th>
                <th className="text-right px-5 py-3 font-medium">input volume</th>
                <th className="text-left px-5 py-3 font-medium">result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              <tr>
                <td className="px-5 py-4 font-mono whitespace-nowrap">Atlas-Qwen-27B v1</td>
                <td className="px-5 py-4 text-right font-mono text-neutral-300">244,000 pairs</td>
                <td className="px-5 py-4 text-neutral-400">Net regression on 6 of 10 institutional CRE prompts. Cooked underperformed base.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono whitespace-nowrap">Atlas-Qwen-27B v2 (planned)</td>
                <td className="px-5 py-4 text-right font-mono text-neutral-300">~107,000 pairs</td>
                <td className="px-5 py-4 text-neutral-400">Block-by-block repair. Half the volume, all of it targeted.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono whitespace-nowrap text-amber-400">Curator-Mistral-3B v2</td>
                <td className="px-5 py-4 text-right font-mono text-amber-400 font-bold">501 pairs</td>
                <td className="px-5 py-4 text-neutral-300">Direct repair of v1&apos;s fabrication-detection blind spot. Staged for cook.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-neutral-400 leading-relaxed max-w-3xl">
          When we scope a cook the question is never <em>"how much corpus do we have?"</em>{" "}
          It is <strong className="text-neutral-200">"what failure mode are we repairing,
          and how few targeted pairs do we need?"</strong>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ shelf grades ------------------------------ */

const GRADES: { name: string; range: string; rule: string; color: string; bg: string }[] = [
  { name: "APEX",     range: "9.5–10", rule: "Master-baker grade. Tribunal-sealed, anchored, ships as reference.", color: "text-amber-300", bg: "from-amber-900/40 to-amber-800/10" },
  { name: "HONEY",    range: "7.5–9.4", rule: "Fresh and shippable. Goes in the case. Defendable certification applies.", color: "text-amber-400", bg: "from-amber-900/30 to-neutral-900/0" },
  { name: "JELLY",    range: "5.0–7.4", rule: "Useful but needs repair. Send back to the curator for re-bake.", color: "text-yellow-400", bg: "from-yellow-900/20 to-neutral-900/0" },
  { name: "POLLEN",   range: "2.5–4.9", rule: "Weak signal. Save the seed, throw the loaf. Useful only as starter.", color: "text-orange-400", bg: "from-orange-900/20 to-neutral-900/0" },
  { name: "PROPOLIS", range: "0–2.4",  rule: "Stale, fabricated, or contradictory. Compost it. Never enters training.", color: "text-rose-400", bg: "from-rose-900/20 to-neutral-900/0" },
];

function ShelfGrades() {
  return (
    <section id="grades" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> The shelf grades
        </h2>
        <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
          Every pair gets graded by the curator on a 1–10 rubric across 5 dimensions
          (math accuracy · grounding · capital markets discipline · risk awareness · IC
          readiness). The grade determines where the pair goes — the case, the
          curator&apos;s bench, or the compost.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {GRADES.map((g) => (
            <div key={g.name}
                 className={`rounded-lg border border-neutral-800 bg-gradient-to-br ${g.bg} p-5`}>
              <div className="flex items-baseline justify-between mb-2">
                <span className={`text-lg font-black tracking-tight ${g.color}`}>{g.name}</span>
                <span className="text-xs font-mono text-neutral-500">{g.range}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-snug">{g.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ freshness ------------------------------ */

function Freshness() {
  return (
    <section id="freshness" className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
          <span className="text-amber-400">▍</span> Freshness has a shelf life
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          A bakery doesn&apos;t sell yesterday&apos;s bread at full price. Datasets
          shouldn&apos;t either.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          A cap rate from 2023 is honey-grade signal in 2023. By 2026 it&apos;s a
          historical reference, not market truth — useful for trend studies, dangerous
          for fresh underwriting. The Royal Jelly tier system has a re-classification
          loop: every pair is re-graded as the world moves, and what was honey can
          become propolis if the market reality shifts.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          Our OpenAlex pull re-bakes on a cadence. Our deal-comp corpora re-bake when
          the macro shifts. Our institutional CRE corpus re-bakes when the debt wall
          moves a cap-rate basis point. <strong className="text-neutral-200">Freshness
          is a first-class signal property</strong> — not an afterthought.
        </p>
        <p className="text-neutral-300 leading-relaxed mt-6 text-lg">
          The model is only as fresh as the last bake.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ menu ------------------------------ */

function Menu() {
  return (
    <section id="menu" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> The menu
        </h2>
        <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
          Two SKUs. Both organic, both fresh-baked, both anchored. Pick the one that
          fits the brief.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ──── By the pound ──── */}
          <div className="rounded-lg border border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-neutral-900/30 p-7 flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-black text-amber-400">By the pound</h3>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                wholesale corpora
              </span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              Bulk training corpora, graded, deduped, schema-validated, freshness-stamped.
              Sold per 1,000 pairs. For shops with a base model and a need for breadth.
            </p>
            <ul className="text-sm text-neutral-400 space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-amber-500">•</span>Honey-grade pairs only (jelly/propolis filtered)</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>Provenance chain per pair (signal → batch → anchor)</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>SHA256 manifest + optional Hedera anchor</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>Re-bake guarantee: 90-day freshness refresh on request</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>Domains in stock: CRE, medical, aviation</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-neutral-800">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">price</div>
              <div className="text-sm text-neutral-300">Quote on volume — typically <code className="text-amber-400">$/1k pairs</code></div>
            </div>
          </div>

          {/* ──── 500-Pack ──── */}
          <div className="rounded-lg border-2 border-amber-500/40 bg-gradient-to-br from-amber-900/30 to-neutral-900/30 p-7 flex flex-col relative">
            <div className="absolute -top-3 left-7 px-2 py-1 text-[10px] uppercase tracking-widest bg-amber-500 text-neutral-950 rounded font-bold">
              signature blend
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-black text-amber-300">The 500-Pack</h3>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                targeted micro-corpus
              </span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              500-1,000 pairs hand-built around one failure mode. The bakery&apos;s
              flagship SKU. This is what Curator-Mistral-3B v2 ships against —
              and what put Atlas Block-2 on the path to recovery.
            </p>
            <ul className="text-sm text-neutral-400 space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-amber-400">•</span>Failure mode scoped + acceptance criteria locked before bake</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Each pair carries <code className="text-amber-400">failure_source</code> + <code className="text-amber-400">repair_goal</code> metadata</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Tribunal-sealed before delivery (head baker signs off)</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Optional: we cook the model for you on the corpus</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>25-50× the leverage of an equivalent wholesale order</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-neutral-800">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">price</div>
              <div className="text-sm text-neutral-300">Fixed-price per pack — scoped on intake</div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-neutral-500 leading-relaxed max-w-3xl">
          Wholesale buyers training a generalist model? Take a pound (or ten).
          Engineers with a specific failure mode to repair? A 500-Pack will out-perform
          a wholesale ton at one-tenth the cost. <strong className="text-neutral-300">Less
          is better when the cut is targeted.</strong>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ CTA ------------------------------ */

function CallToAction() {
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want bakery-grade data on your next deliverable?</h2>
        <p className="text-neutral-400 mb-8">
          Bring us a failure mode. We&apos;ll bake the 500-1000 pairs that target it
          and ship a corpus or a tuned model — your choice — with sha256 receipts
          and optional Hedera anchoring.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://bounty.swarmandbee.ai"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors">
            Send a brief →
          </a>
          <a href="https://identity.swarmandbee.ai"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            The receipts ↗
          </a>
          <a href={`mailto:${EMAIL}`}
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            {EMAIL}
          </a>
        </div>
        <p className="text-sm text-neutral-500 mt-10">
          Need GPUs to train on the corpus you order? We use vast.ai —{" "}
          <a href="/gpu" className="text-amber-400 hover:text-amber-300">
            swarmandbee.ai/gpu
          </a>{" "}
          <span className="text-neutral-600">(referral)</span>.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ footer ------------------------------ */

function BakeryFooter() {
  return (
    <footer className="bg-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div>
          <strong className="text-neutral-300">Swarm &amp; Bee</strong>
          <span className="text-neutral-600"> · The dataset bakery</span>
        </div>
        <div className="flex gap-5 text-neutral-400">
          <a href={`mailto:${EMAIL}`} className="hover:text-amber-400">{EMAIL}</a>
          <a href={X_URL} target="_blank" rel="noreferrer" className="hover:text-amber-400">x.com/swarmandbee</a>
          <a href={APEX} className="hover:text-amber-400">swarmandbee.ai</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-10 text-xs text-neutral-600">
        Fresh every day. Less is better. © Swarm and Bee LLC
      </div>
    </footer>
  );
}
