// bakery.swarmandbee.ai · the dataset bakery
//
// The operational doctrine made visceral. AI is a bakery first.
// Signal is supply. Curators are bakers. The Tribunal is the head baker
// who tastes before shipping. Distribution is delivery. Fresh every day.
//
// Tier vocabulary (the bake goods):
//   Royal Jelly Donut  · APEX     · master-baker reference
//   Honey Bun          · HONEY    · shippable
//   Jelly Donut        · JELLY    · needs repair, the workhorse
//   Pollen Crumb       · POLLEN   · weak seed
//   Propolis Glaze     · PROPOLIS · the deceiving shine — looks shippable, fabricated underneath

import { useState } from "react";

const APEX = "https://swarmandbee.ai";
const X_URL = "https://x.com/swarmandbee";
const EMAIL = "build@swarmandbee.ai";

export default function Bakery() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <BakeryHeader />
      <Hero />
      <Oven />
      <BakersRack />
      <Mapping />
      <LessIsBetter />
      <Freshness />
      <Compassionate />
      <Menu />
      <Cookbooks />
      <TryFree />
      <HowToBuy />
      <BakeryFooter />
    </div>
  );
}

/* ------------------------------ header ------------------------------ */

function BakeryHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={APEX} className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors">
          ← Swarm &amp; Bee
        </a>
        <span className="ml-2 text-xs text-neutral-500 font-mono">/ the bakery</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <a href="#oven" className="text-neutral-400 hover:text-neutral-100">the oven</a>
          <a href="#rack" className="text-neutral-400 hover:text-neutral-100">bakers rack</a>
          <a href="#menu" className="text-neutral-400 hover:text-neutral-100">the menu</a>
          <a href="#cookbooks" className="text-neutral-400 hover:text-neutral-100">cookbooks</a>
          <a href="#freshness" className="text-neutral-400 hover:text-neutral-100">freshness</a>
          <a href="#compassionate" className="text-rose-300/80 hover:text-rose-200">compassionate</a>
          <a href="#how-to-buy" className="text-amber-400 font-semibold hover:text-amber-300">how to buy ↓</a>
          <a href={X_URL} target="_blank" rel="noreferrer"
             className="text-neutral-500 hover:text-amber-300">x ↗</a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-neutral-950 to-rose-950/10 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12">
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
          500 fresh Jelly Donuts crush 25,000 ingredients. Less is better.
        </p>
        <p className="mt-3 text-sm text-rose-300/80 font-mono">
          ▸ Now baking · <strong className="text-rose-200">24,000 diabetes pairs</strong> for{" "}
          <code className="text-rose-200">dmack.ai</code> ·{" "}
          <a href="#compassionate" className="underline-offset-2 hover:underline hover:text-rose-200">
            the founder&apos;s vertical ↓
          </a>
        </p>
        <Stats />
        <div className="mt-10 flex flex-wrap gap-3 items-center">
          <a href="#try-free"
             className="px-6 py-3 rounded-lg bg-rose-500 text-neutral-950 font-bold hover:bg-rose-400 transition-colors">
            Try 10 free medical datasets →
          </a>
          <a href="#rack"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            Walk the rack ↓
          </a>
        </div>
        <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-sm">
          <span className="text-neutral-500">$</span>
          <span className="text-amber-300">pip install swarmbee-bakery</span>
          <span className="text-neutral-600 text-xs">· v0.1.1 on PyPI</span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "5", k: "shelf grades" },
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

/* ------------------------------ oven ------------------------------ */
// Ingredients (left) drift in → glowing oven (middle) → AI weights (right) emerge.
// Pure CSS animations. No JS lib.

function Oven() {
  return (
    <section id="oven" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-amber-950/10 to-neutral-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> The oven
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-10 max-w-3xl">
          Ingredients go in. Heat, time, judgment apply. Weights come out.
          The oven is the cheap part; what you put IN and how you grade what
          comes OUT is the bakery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* INGREDIENTS — left side */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">Ingredients · signal</div>
            {[
              { txt: "X tweet · founder pain", delay: "0s" },
              { txt: "OpenAlex paper · 2026-Q1", delay: "0.4s" },
              { txt: "Source doc · IC memo", delay: "0.8s" },
              { txt: "Deal packet · STNL", delay: "1.2s" },
              { txt: "Curator gold seed", delay: "1.6s" },
            ].map((i) => (
              <div key={i.txt}
                   className="rounded border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-400 font-mono ingredient-drift"
                   style={{ animationDelay: i.delay }}>
                {i.txt}
              </div>
            ))}
          </div>

          {/* OVEN — middle */}
          <div className="oven-box flex flex-col items-center justify-center min-h-[260px] px-4">
            <svg viewBox="0 0 120 140" className="w-32 md:w-40 h-auto" aria-hidden="true">
              {/* Oven frame */}
              <rect x="10" y="10" width="100" height="120" rx="8" fill="#1a1209" stroke="#3a2810" strokeWidth="2"/>
              {/* Oven door (slight inset) */}
              <rect x="18" y="40" width="84" height="78" rx="4" fill="#0f0a05" stroke="#5a3a14" strokeWidth="1.5"/>
              {/* Glowing interior */}
              <rect x="22" y="44" width="76" height="70" rx="3" fill="url(#ovenGlow)"/>
              {/* Wire rack lines */}
              <line x1="22" y1="72" x2="98" y2="72" stroke="#7a5418" strokeWidth="0.6" opacity="0.5"/>
              <line x1="22" y1="92" x2="98" y2="92" stroke="#7a5418" strokeWidth="0.6" opacity="0.5"/>
              {/* Knobs */}
              <circle cx="28" cy="24" r="3.5" fill="#5a3a14"/>
              <circle cx="60" cy="24" r="3.5" fill="#5a3a14"/>
              <circle cx="92" cy="24" r="3.5" fill="#5a3a14"/>
              {/* Door handle */}
              <rect x="32" y="120" width="56" height="3" rx="1.5" fill="#7a5418"/>
              <defs>
                <radialGradient id="ovenGlow" cx="50%" cy="60%" r="55%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9"/>
                  <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.3"/>
                </radialGradient>
              </defs>
            </svg>
            <div className="oven-pulse mt-4 text-amber-400 font-mono text-xs tracking-widest">
              BAKING · 450W
            </div>
            <div className="mt-1 text-[10px] text-neutral-500 font-mono tracking-wide">
              sustained · per GPU · 5090 + PRO 6000
            </div>
          </div>

          {/* OUTPUTS — right side */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3 md:text-right">Out · weights + receipts</div>
            {[
              { txt: "honey 0.87 · sha256:a4f5…", delay: "2.0s" },
              { txt: "tribunal-sealed · graded 2026-05-11", delay: "2.4s" },
              { txt: "5-dim rubric · math/grounding/cap/risk/IC", delay: "2.8s" },
              { txt: "anchor → HCS 0.0.10291838", delay: "3.2s" },
              { txt: "model: atlas-block-2-v2.safetensors", delay: "3.6s" },
            ].map((o) => (
              <div key={o.txt}
                   className="rounded border border-amber-900/40 bg-gradient-to-r from-amber-950/30 to-neutral-900/60 px-3 py-2 text-sm text-amber-300 font-mono output-emerge"
                   style={{ animationDelay: o.delay }}>
                {o.txt}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm text-neutral-500 leading-relaxed max-w-3xl text-center md:text-left">
          <em className="text-neutral-300">The oven is the cheap part.</em> Anyone can run a fine-tune.
          What separates a bakery from a printer is the curator at the front and the Tribunal at the back.
        </p>
      </div>

      {/* Animations — kept inline so the page is self-contained */}
      <style>{`
        @keyframes ingredient-drift {
          0%   { transform: translateX(-30px); opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @keyframes output-emerge {
          0%   { transform: translateX(60px); opacity: 0; filter: blur(4px); }
          30%  { opacity: 0; }
          70%  { transform: translateX(0); opacity: 1; filter: blur(0); }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes oven-pulse {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        .ingredient-drift { animation: ingredient-drift 6s ease-in-out infinite; }
        .output-emerge   { animation: output-emerge 6s ease-in-out infinite; }
        .oven-pulse      { animation: oven-pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ingredient-drift, .output-emerge, .oven-pulse { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------ bakers rack ------------------------------ */
// Interactive. Click a baked good to see its tier sample pair.

type Tier = "APEX" | "HONEY" | "JELLY" | "POLLEN" | "PROPOLIS";

interface BakedGood {
  id: string;
  name: string;
  tier: Tier;
  range: string;
  short: string;
  icon: JSX.Element;
  borderClass: string;   // tailwind border color
  textClass: string;     // tailwind text color
  bgClass: string;       // tailwind gradient bg
  glowClass: string;     // tailwind ring/shadow color for selected
}

interface SamplePair {
  instruction: string;
  input?: string;
  output: string;
  rubric: Record<string, number>;
  note?: string;
}

const RACK: BakedGood[] = [
  {
    id: "royal-jelly",
    name: "Royal Jelly Donut",
    tier: "APEX",
    range: "9.5–10",
    short: "Master-baker reference. Tribunal-sealed, anchored, ships as gold standard.",
    borderClass: "border-amber-300/50",
    textClass: "text-amber-300",
    bgClass: "from-amber-900/30 to-amber-700/10",
    glowClass: "ring-amber-300/60 shadow-amber-300/30",
    icon: <RoyalJellyIcon />,
  },
  {
    id: "honey-bun",
    name: "Honey Bun",
    tier: "HONEY",
    range: "7.5–9.4",
    short: "Fresh and shippable. Goes in the case. Defendable certification applies.",
    borderClass: "border-amber-400/40",
    textClass: "text-amber-400",
    bgClass: "from-amber-900/20 to-neutral-900/0",
    glowClass: "ring-amber-400/60 shadow-amber-400/30",
    icon: <HoneyBunIcon />,
  },
  {
    id: "jelly-donut",
    name: "Jelly Donut",
    tier: "JELLY",
    range: "5.0–7.4",
    short: "Useful but needs repair. Send back to the curator for a re-bake.",
    borderClass: "border-rose-400/40",
    textClass: "text-rose-300",
    bgClass: "from-rose-900/20 to-neutral-900/0",
    glowClass: "ring-rose-400/60 shadow-rose-400/30",
    icon: <JellyDonutIcon />,
  },
  {
    id: "pollen-crumb",
    name: "Pollen Crumb",
    tier: "POLLEN",
    range: "2.5–4.9",
    short: "Weak signal. Save the seed, lose the loaf. Useful only as starter.",
    borderClass: "border-yellow-500/40",
    textClass: "text-yellow-300",
    bgClass: "from-yellow-900/20 to-neutral-900/0",
    glowClass: "ring-yellow-500/60 shadow-yellow-500/30",
    icon: <PollenCrumbIcon />,
  },
  {
    id: "propolis-glaze",
    name: "Propolis Glaze",
    tier: "PROPOLIS",
    range: "0–2.4",
    short: "The deceiving shine. Looks shippable from outside, fabricated underneath. The Tribunal's job is to look past the glaze.",
    borderClass: "border-orange-700/50",
    textClass: "text-orange-400",
    bgClass: "from-orange-950/40 to-rose-950/20",
    glowClass: "ring-orange-500/60 shadow-orange-500/30",
    icon: <PropolisGlazeIcon />,
  },
];

const SAMPLES: Record<string, SamplePair> = {
  "royal-jelly": {
    instruction: "Recommend action on this Memphis multifamily acquisition.",
    input: "312-unit Class B multifamily, Memphis MSA. Asking $28.5M ($91K/unit). T-12 NOI $1.86M (cap 6.5%). Sub-market rent growth -2.4% YoY. Stabilized debt 7.85%. Operator 8% vacancy.",
    output: "PASS. Going-in cap rate 6.5% vs prevailing stabilized debt 7.85% = negative leverage of 135 bps. Sub-market growth is negative; underwriting positive growth to close the gap requires a market-thesis bet that observed data contradicts. Counter-offer below $24M (cap >7.75%) is the only way this deal pencils.",
    rubric: { math_accuracy: 10, grounding: 10, capital_markets: 10, risk_awareness: 10, ic_readiness: 10 },
    note: "Atlas v1 produced this on the actual Memphis deal — 12/12 math correct, correct kill decision.",
  },
  "honey-bun": {
    instruction: "Calculate the going-in cap rate.",
    input: "Purchase price $42,000,000. NOI $2,940,000. Acquisition closing costs $420,000.",
    output: "Going-in cap rate = NOI / (Purchase Price + Acquisition Costs) = $2,940,000 / $42,420,000 = 6.93%. Acquisition costs included per institutional convention; on a pre-cost basis the cap rate would be 7.00%.",
    rubric: { math_accuracy: 10, grounding: 9, capital_markets: 9, risk_awareness: 7, ic_readiness: 8 },
  },
  "jelly-donut": {
    instruction: "What's a reasonable cap rate for industrial in Memphis right now?",
    output: "Around 7%. Industrial cap rates have been rising over the last year on Treasury yield expansion.",
    rubric: { math_accuracy: 7, grounding: 4, capital_markets: 6, risk_awareness: 5, ic_readiness: 5 },
    note: "Directionally correct but unsourced — needs repair: add source attribution, sub-market (Class A vs B), and date specificity. Curator returns this to the bench with a repair_goal tag.",
  },
  "pollen-crumb": {
    instruction: "Should I underwrite this deal at a 5% cap or 8% cap?",
    output: "It depends on the market and asset class. Some markets have lower cap rates.",
    rubric: { math_accuracy: 3, grounding: 2, capital_markets: 3, risk_awareness: 2, ic_readiness: 1 },
    note: "Weak seed. Generic, non-actionable. Useful only as raw material — a curator can rewrite this into something real with the right input context. Otherwise: compost.",
  },
  "propolis-glaze": {
    instruction: "Analyze financing risk on this acquisition.",
    input: "Purchase price $12,000,000. NOI $840,000. No loan terms provided.",
    output: "Debt risk is low because the deal has a 1.35x DSCR at 65% LTV with a 6.25% interest rate.",
    rubric: { math_accuracy: 1, grounding: 0, capital_markets: 0, risk_awareness: 0, ic_readiness: 0 },
    note: "The glaze. Looks like a shippable answer — confident, specific, formatted right. But DSCR / LTV / interest rate are fabricated from no provided inputs. This is what we filter out. The Tribunal's job is to taste past the glaze.",
  },
};

function BakersRack() {
  const [selected, setSelected] = useState<string | null>("royal-jelly");

  return (
    <section id="rack" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 to-amber-950/5">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> The bakers rack
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-2 max-w-3xl">
          Every pair gets graded by the curator on a 1–10 rubric across five
          dimensions. The grade determines where it goes: the case, the bench,
          or the compost pile.
        </p>
        <p className="text-neutral-500 text-sm mb-10 max-w-3xl">
          Click a baked good to see what a pair at that grade actually looks like.
        </p>

        {/* The rack — 5 shelves */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {RACK.map((g) => {
            const active = selected === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setSelected(active ? null : g.id)}
                className={`
                  group rounded-lg border bg-gradient-to-br ${g.bgClass}
                  ${g.borderClass} p-4 text-left transition-all
                  ${active ? `ring-2 ${g.glowClass} shadow-lg` : "hover:ring-1 hover:ring-neutral-700"}
                `}
              >
                <div className={`mb-3 ${g.textClass} h-16 flex items-center justify-center`}>
                  {g.icon}
                </div>
                <div className={`text-xs font-mono font-bold ${g.textClass} mb-1`}>
                  {g.tier}
                </div>
                <div className="text-sm font-semibold text-neutral-100 mb-1">
                  {g.name}
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  rubric {g.range}
                </div>
              </button>
            );
          })}
        </div>

        {/* The sample pair display */}
        {selected ? <PairDisplay key={selected} item={RACK.find((r) => r.id === selected)!} sample={SAMPLES[selected]} /> : null}
      </div>
    </section>
  );
}

function PairDisplay({ item, sample }: { item: BakedGood; sample: SamplePair }) {
  const rubricAvg =
    Object.values(sample.rubric).reduce((a, b) => a + b, 0) /
    Object.values(sample.rubric).length;

  return (
    <div
      className={`
        rounded-xl border-2 bg-gradient-to-br ${item.bgClass}
        ${item.borderClass} p-6 md:p-8
        pair-slide-in
      `}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className={`${item.textClass} w-12 h-12`}>{item.icon}</div>
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest ${item.textClass}`}>
              {item.tier} · rubric {item.range}
            </div>
            <div className="text-xl font-bold">{item.name}</div>
          </div>
        </div>
        <div className={`text-3xl font-black ${item.textClass} font-mono`}>
          {rubricAvg.toFixed(1)}
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Instruction</div>
          <div className="text-neutral-300 leading-relaxed">{sample.instruction}</div>
        </div>
        {sample.input ? (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Input</div>
            <div className="font-mono text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap bg-neutral-950/50 rounded p-3 border border-neutral-800">
              {sample.input}
            </div>
          </div>
        ) : null}
        <div>
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Output</div>
          <div className={`leading-relaxed ${item.tier === "PROPOLIS" ? "text-orange-200/90 italic" : "text-neutral-200"}`}>
            {sample.output}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800/50">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">5-dim rubric</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px] font-mono">
            {Object.entries(sample.rubric).map(([k, v]) => (
              <div key={k} className="rounded bg-neutral-950/40 px-2 py-1.5 border border-neutral-800">
                <div className="text-neutral-500 truncate">{k.replace(/_/g, " ")}</div>
                <div className={`${item.textClass} font-bold`}>{v}/10</div>
              </div>
            ))}
          </div>
        </div>

        {sample.note ? (
          <div className={`pt-2 text-xs ${item.tier === "PROPOLIS" ? "text-orange-300" : "text-neutral-400"} italic leading-relaxed`}>
            ▶ {sample.note}
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes pair-slide-in {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .pair-slide-in { animation: pair-slide-in 0.35s ease-out; }
      `}</style>
    </div>
  );
}

/* ------------------------------ baked-good icons (inline SVG) -------------- */

function RoyalJellyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      {/* crown */}
      <path d="M14 20 L20 12 L26 18 L32 10 L38 18 L44 12 L50 20 L50 26 L14 26 Z"
            fill="currentColor" opacity="0.9"/>
      <circle cx="20" cy="12" r="2" fill="currentColor"/>
      <circle cx="32" cy="10" r="2" fill="currentColor"/>
      <circle cx="44" cy="12" r="2" fill="currentColor"/>
      {/* donut body */}
      <ellipse cx="32" cy="42" rx="20" ry="14" fill="currentColor" opacity="0.85"/>
      <ellipse cx="32" cy="42" rx="6" ry="4" fill="#0a0c11"/>
      {/* sprinkles of light */}
      <circle cx="22" cy="38" r="1" fill="#fff" opacity="0.9"/>
      <circle cx="42" cy="40" r="1" fill="#fff" opacity="0.9"/>
      <circle cx="32" cy="32" r="1" fill="#fff" opacity="0.9"/>
    </svg>
  );
}

function HoneyBunIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      {/* oblong bun */}
      <ellipse cx="32" cy="32" rx="24" ry="14" fill="currentColor" opacity="0.85"/>
      {/* honey drizzle swirl */}
      <path d="M14 30 Q24 22 32 30 T50 30" stroke="#0a0c11" strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M14 36 Q24 28 32 36 T50 36" stroke="#0a0c11" strokeWidth="2" fill="none" opacity="0.6"/>
      {/* shine */}
      <ellipse cx="22" cy="24" rx="5" ry="2" fill="#fff" opacity="0.4"/>
    </svg>
  );
}

function JellyDonutIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      {/* donut body */}
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.85"/>
      <circle cx="32" cy="32" r="6" fill="#0a0c11"/>
      {/* jelly squirt spot */}
      <ellipse cx="32" cy="14" rx="4" ry="3" fill="#fb7185"/>
      {/* sugar dots */}
      <circle cx="18" cy="28" r="1.5" fill="#fff" opacity="0.7"/>
      <circle cx="46" cy="34" r="1.5" fill="#fff" opacity="0.7"/>
      <circle cx="36" cy="48" r="1.5" fill="#fff" opacity="0.7"/>
      <circle cx="24" cy="46" r="1.5" fill="#fff" opacity="0.7"/>
    </svg>
  );
}

function PollenCrumbIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      {/* scattered crumbs */}
      <circle cx="20" cy="22" r="3" fill="currentColor"/>
      <circle cx="34" cy="18" r="2" fill="currentColor"/>
      <circle cx="46" cy="26" r="3.5" fill="currentColor"/>
      <circle cx="14" cy="38" r="2.5" fill="currentColor"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="38" r="2.5" fill="currentColor"/>
      <circle cx="22" cy="48" r="2" fill="currentColor"/>
      <circle cx="36" cy="50" r="3" fill="currentColor"/>
      <circle cx="48" cy="46" r="1.5" fill="currentColor"/>
      {/* dust */}
      <circle cx="32" cy="24" r="0.8" fill="currentColor" opacity="0.5"/>
      <circle cx="42" cy="32" r="0.8" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function PropolisGlazeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      {/* pastry blob under glaze — looks shiny */}
      <ellipse cx="32" cy="38" rx="22" ry="12" fill="#5a2a14" opacity="0.6"/>
      {/* dripping glaze on top */}
      <path d="M10 30 L10 36 Q14 42 16 38 L20 44 Q24 36 26 42 L30 48 Q34 38 36 44 L40 40 Q44 46 46 38 L50 44 Q54 38 56 32 Z"
            fill="currentColor" opacity="0.95"/>
      {/* deceptive shine highlight */}
      <ellipse cx="24" cy="30" rx="8" ry="2.5" fill="#fff" opacity="0.45"/>
      <ellipse cx="42" cy="33" rx="5" ry="1.5" fill="#fff" opacity="0.35"/>
      {/* subtle crack revealing hollow inside */}
      <path d="M30 38 L34 44" stroke="#0a0c11" strokeWidth="0.8" opacity="0.6"/>
    </svg>
  );
}

/* ------------------------------ mapping ------------------------------ */

const MAPPING: { bakery: string; swarm: string; detail: string }[] = [
  { bakery: "Ingredients (supply)", swarm: "Signal",
    detail: "Scraped corpora, OpenAlex pulls, X/Reddit/YouTube intake, source documents, deal packets." },
  { bakery: "Bakers", swarm: "Curators",
    detail: "SwarmCurator-9B/27B audit + grade pairs on a 1-10 rubric across 5 dimensions. Atlas-UW underwriter on deal docs." },
  { bakery: "The oven", swarm: "Cooks",
    detail: "Fine-tune runs on owned Blackwell silicon. TRL/Unsloth, locked recipes, canary-then-cook discipline." },
  { bakery: "Head baker", swarm: "The Tribunal",
    detail: "Senior-hack review before launch. Curator-as-validator. Tastes every batch before it ships." },
  { bakery: "Recipe book", swarm: "Honey Ledger",
    detail: "SQLite WAL with full provenance — signal → batch → anchor → model → revenue chain." },
  { bakery: "Delivery", swarm: "Distribution",
    detail: "api.swarmandbee.ai/honey · bounty.swarmandbee.ai · inference endpoints · the bounty Discord channel." },
  { bakery: "Freshness", swarm: "Recency-weighted signal",
    detail: "Stale comps don't underwrite fresh deals. OpenAlex re-cooks on schedule. Source weight decays with age." },
  { bakery: "Shelf life", swarm: "RJP tier downgrade",
    detail: "A pair that was honey-grade in 2024 becomes propolis glaze in 2026 if the market reality moved. We re-classify." },
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
          500-Jelly-Donut corpus that fixes a specific failure mode beats a 244,000-pair corpus that
          scatters signal across modes. We&apos;ve already lived this:
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
                <td className="px-5 py-4 text-neutral-400">Net regression on 6 of 10 institutional CRE prompts. Mostly Propolis-Glaze in disguise.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono whitespace-nowrap">Atlas-Qwen-27B v2 (planned)</td>
                <td className="px-5 py-4 text-right font-mono text-neutral-300">~107,000 pairs</td>
                <td className="px-5 py-4 text-neutral-400">Block-by-block repair. Half the volume, all of it targeted.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-mono whitespace-nowrap text-amber-400">Curator-Mistral-3B v2</td>
                <td className="px-5 py-4 text-right font-mono text-amber-400 font-bold">501 Jelly Donuts</td>
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

/* ------------------------------ freshness ------------------------------ */

function Freshness() {
  return (
    <section id="freshness" className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
          <span className="text-amber-400">▍</span> Freshness has a shelf life
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          A bakery doesn&apos;t sell yesterday&apos;s bread at full price.
          Datasets shouldn&apos;t either.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          A cap rate from 2023 is Honey Bun signal in 2023. By 2026 it&apos;s
          a historical reference, not market truth — useful for trend studies,
          dangerous for fresh underwriting. The Royal Jelly tier system has a
          re-classification loop: every pair is re-graded as the world moves,
          and what was Honey Bun can become Propolis Glaze if the market reality
          shifts.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          Our OpenAlex pull re-bakes on a cadence. Deal-comp corpora re-bake
          when the macro shifts. The institutional CRE corpus re-bakes when the
          debt wall moves a basis point. <strong className="text-neutral-200">Freshness
          is a first-class signal property</strong> — not an afterthought.
        </p>
        <p className="text-neutral-300 leading-relaxed mt-6 text-lg">
          The model is only as fresh as the last bake.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ compassionate ------------------------------ */
// The founder's chair. Two-stream guardrail: sourced medical facts + lived voice.
// Lived voice is for register, never for medical authority. This is load-bearing.

function Compassionate() {
  return (
    <section id="compassionate" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-rose-950/10 to-neutral-950">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
          <span className="text-rose-300">▍</span> Compassionate intelligence
        </div>

        <p className="text-neutral-100 text-xl leading-relaxed mb-6 font-semibold">
          The bakery has a founder&apos;s chair.
        </p>

        <p className="text-neutral-300 leading-relaxed mb-4">
          Donovan Mackey is a <strong className="text-rose-300">Type 1 diabetic</strong>.
          Insulin-dependent. 14 foot surgeries. The lived experience that anchors
          the diabetes vertical — and the gift that demands we get the data right.
        </p>

        <p className="text-neutral-300 leading-relaxed mb-8">
          We&apos;ve minted{" "}
          <strong className="text-amber-400">24,000 pairs in the diabetes space</strong>{" "}
          for <code className="text-amber-300 font-mono">dmack.ai</code> — the first
          focused build in a longer arc toward the <em>diabetic supply shop</em>.
          Two streams, never confused:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg border border-amber-900/40 bg-amber-950/10 p-5">
            <div className="text-[10px] uppercase tracking-widest text-amber-400 font-mono mb-2">
              Stream 1 · sourced facts
            </div>
            <div className="text-sm text-neutral-300 leading-relaxed">
              Medical authority pulled from documented sources — ADA, Endocrine
              Society, IWGDF, NIDDK. Citation-locked, source-attributed,
              Tribunal-graded.
            </div>
          </div>
          <div className="rounded-lg border border-rose-900/40 bg-rose-950/10 p-5">
            <div className="text-[10px] uppercase tracking-widest text-rose-300 font-mono mb-2">
              Stream 2 · lived voice
            </div>
            <div className="text-sm text-neutral-300 leading-relaxed">
              The founder&apos;s voice — used for register and human resonance,{" "}
              <strong className="text-rose-200">never as the medical authority</strong>.
              The discipline that closed $8B in deals is the same discipline that
              grades a pair.
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 mb-10">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-4">
            Where the corpus goes
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-neutral-300">
            <li className="flex gap-2"><span className="text-rose-300">•</span>earlier detection</li>
            <li className="flex gap-2"><span className="text-rose-300">•</span>smarter monitoring</li>
            <li className="flex gap-2"><span className="text-rose-300">•</span>better education</li>
            <li className="flex gap-2"><span className="text-rose-300">•</span>personalized support</li>
            <li className="flex gap-2"><span className="text-rose-300">•</span>wound-care intelligence</li>
            <li className="flex gap-2"><span className="text-rose-300">•</span>nutrition &amp; wellness guidance</li>
          </ul>
        </div>

        <p className="text-neutral-300 leading-relaxed mb-4">
          Technology alone isn&apos;t the answer.{" "}
          <strong className="text-rose-200">Compassionate intelligence</strong> —
          real data plus human resilience — is what changes millions of lives.
        </p>

        <p className="text-neutral-400 leading-relaxed italic mb-8">
          Diabetes didn&apos;t break the founder. It taught him awareness,
          discipline, gratitude, and purpose.{" "}
          <span className="not-italic">🎁</span>
        </p>

        <p className="text-lg text-amber-300 font-semibold leading-relaxed">
          The future is brighter than people think.{" "}
          <span className="ml-1">🍯</span>
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
        <p className="text-neutral-400 leading-relaxed mb-3 max-w-3xl">
          One ladder, three rungs — <strong className="text-rose-300">taste free</strong>,{" "}
          <strong className="text-amber-300">scope a repair</strong>, or{" "}
          <strong className="text-amber-300">order by the pound</strong>. Every order is
          invoiced (Stripe) or settled to <code className="text-amber-300">swarmusdc.eth</code>.
          A human reads every submission.
        </p>
        <p className="text-amber-300/90 text-sm font-mono mb-8 max-w-3xl">
          ▸ 500 free cells is a <em>taste</em>. 500 paid pairs is the <em>training floor</em>. 25,000 is the <em>hard cap per cook</em>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Free 10-Pack — the new entry point. No money. */}
          <div className="rounded-lg border-2 border-rose-400/50 bg-gradient-to-br from-rose-900/30 to-neutral-900/30 p-7 flex flex-col relative">
            <div className="absolute -top-3 left-7 px-2 py-1 text-[10px] uppercase tracking-widest bg-rose-400 text-neutral-950 rounded font-bold">try it first · free</div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-black text-rose-300">10 Free</h3>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">$0 · 500 cells</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-3">
              10 free medical sample packs — 50 cells each, one from every named medical
              SKU. The actual schema, the actual tier grading, the actual sources. No signup,
              no card, no friction.
            </p>
            <p className="text-xs text-rose-300/90 font-mono leading-relaxed mb-4 px-2 py-1.5 bg-rose-950/20 border border-rose-900/30 rounded">
              ▸ Eval before you pay. 500 free cells covers Dmack&apos;s Royal Jelly, Endo Eclair, Cinnamon Spiral, Madeleine, Scholar Croissant, Global Crumpet, Federal Glaze, Founder&apos;s Pretzel, Royal Jelly Brioche, Golden Glaze.
            </p>
            <ul className="text-sm text-neutral-400 space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-rose-300">•</span>50 cells × 10 named SKUs</li>
              <li className="flex gap-2"><span className="text-rose-300">•</span>Same JSON schema as paid delivery</li>
              <li className="flex gap-2"><span className="text-rose-300">•</span>Tier + source + citation preserved</li>
              <li className="flex gap-2"><span className="text-rose-300">•</span>Pull via CLI in 60 seconds</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-rose-900/40">
              <pre className="text-[11px] font-mono bg-neutral-950 border border-rose-900/30 rounded px-3 py-2 text-rose-300 overflow-x-auto">{`swarmbee-bakery free --all \\
  --out-dir ./samples`}</pre>
            </div>
          </div>

          {/* The 500-Pack — the actual training floor */}
          <div className="rounded-lg border-2 border-amber-500/60 bg-gradient-to-br from-amber-900/40 to-neutral-900/30 p-7 flex flex-col relative">
            <div className="absolute -top-3 left-7 px-2 py-1 text-[10px] uppercase tracking-widest bg-amber-500 text-neutral-950 rounded font-bold">training floor</div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-black text-amber-300">500-Pack</h3>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">$249 · 500 pairs</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-3">
              The minimum viable training-data SKU. 500 Tribunal-sealed pairs scoped to
              ONE specific failure mode you bring on intake. This is where a LoRA cook
              actually starts to move the needle.
            </p>
            <p className="text-xs text-amber-300/90 font-mono leading-relaxed mb-4 px-2 py-1.5 bg-amber-950/20 border border-amber-900/40 rounded">
              ▸ Cooks 4-6h on a 4B base · $5-15 of GPU on vast.ai · our own Curator-3B v2 proved the leverage at this size.
            </p>
            <ul className="text-sm text-neutral-400 space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-amber-400">•</span>Scoped to one failure mode · acceptance criteria locked pre-bake</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Each pair carries <code className="text-amber-400">failure_source</code> + <code className="text-amber-400">repair_goal</code></li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Optional: we cook the model for you ($249 prep + GPU pass-through)</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>25-50× leverage vs equivalent wholesale tonnage</li>
              <li className="flex gap-2"><span className="text-amber-400">•</span>Invoice via Stripe or swarmusdc.eth</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-amber-900/40">
              <pre className="text-[11px] font-mono bg-neutral-950 border border-amber-900/40 rounded px-3 py-2 text-amber-300 overflow-x-auto">{`swarmbee-bakery order \\
  --sku 500-pack \\
  --domain medical \\
  --failure-mode "..." \\
  --confirm`}</pre>
            </div>
          </div>

          {/* By the pound — wholesale breadth */}
          <div className="rounded-lg border border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-neutral-900/30 p-7 flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-black text-amber-400">By the pound</h3>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">$249/lb floor</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              Wholesale corpora by named SKU. 1 lb = 500 HONEY cells. Pick a flavor
              (Dmack&apos;s Royal Jelly, Madeleine, Scholar Croissant, Royal Jelly Brioche…)
              and specify quantity in notes.
            </p>
            <ul className="text-sm text-neutral-400 space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-amber-500">•</span>1-9 lb · $249/lb · narrow-skill build (1-4.5K cells)</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>10-99 lb · $199/lb · vertical domain (5-49K cells)</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>100+ lb · $149/lb · domain mastery (50K+ cells · 25K cap per cook)</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>sha256 manifest + optional Hedera anchor</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span>Invoice via Stripe or swarmusdc.eth</li>
            </ul>
            <div className="mt-auto pt-4 border-t border-neutral-800">
              <pre className="text-[11px] font-mono bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-amber-400 overflow-x-auto">{`swarmbee-bakery order \\
  --sku by-the-pound \\
  --domain medical \\
  --notes "Dmack RJ · 5 lb" \\
  --confirm`}</pre>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-neutral-500 leading-relaxed max-w-3xl">
          Not sure where to start? <a href="#try-free" className="text-rose-300 hover:text-rose-200">Pull the 10 free packs ↓</a> —
          they&apos;re identical in shape to a paid delivery, just smaller. If the schema fits
          your loader and the quality reads honest, step up to a 500-Pack or order by the
          pound. <strong className="text-neutral-300">Less is better when the cut is targeted.</strong>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ cookbooks ------------------------------ */

const COOKBOOKS: { slug: string; name: string; cells: number; price: number; lane: string; pitch: string; receipt: string }[] = [
  {
    slug: "glycemic-reasoning",
    name: "Glycemic Reasoning",
    cells: 3000, price: 1299, lane: "diabetes",
    pitch: "Insulin dosing reasoning with refusal on insufficient inputs. The model that won't fabricate a dose.",
    receipt: "Architecture proven: Curator v2's 501-pack repaired Atlas v1's fabrication-detection blind spot — same shape, 6× scaled to the glycemic state space.",
  },
  {
    slug: "diabetic-foot-care",
    name: "Diabetic Foot Care",
    cells: 3000, price: 1299, lane: "diabetes",
    pitch: "IWGDF-aligned wound assessment + escalation timing. The model that knows when not to wait.",
    receipt: "Founder is the receipt: 14 foot surgeries, lived register, hyper-vigilance patterns hand-curated.",
  },
  {
    slug: "patient-communication",
    name: "Patient Communication",
    cells: 3000, price: 1299, lane: "diabetes",
    pitch: "Medical-jargon-to-plain-language. Maintains accuracy at patient register.",
    receipt: "NHS + MedlinePlus source pages average Flesch 60+ at MHRA-reviewed accuracy. The corpus is already cooked-for-register.",
  },
  {
    slug: "spine-imaging-reasoning",
    name: "Spine Imaging Reasoning",
    cells: 3000, price: 1299, lane: "imaging",
    pitch: "Spine MRI + CT differential diagnosis at radiology-fellow register. Text-only training that graduates to multimodal.",
    receipt: "Source: pre-Tribunal MASTER_PLATINUM (406K imaging vignettes). Cook receipt: first customer.",
  },
  {
    slug: "diabetes-companion",
    name: "Diabetes Companion",
    cells: 5000, price: 2199, lane: "diabetes",
    pitch: "The full-stack flagship — clinical + research + patient + lived, two-stream architecture intact. The dmack.ai recipe itself.",
    receipt: "Pending. This IS the staged dmack.ai cook. Order if you're prepared to be the first external receipt — cooked-for-you fee waived if you share your eval delta back.",
  },
  {
    slug: "multimodal-clinical-reasoning",
    name: "Multimodal Clinical Reasoning",
    cells: 5000, price: 2199, lane: "imaging",
    pitch: "Broad clinical assistant: imaging + literature + guidelines. For shops building generalists that don't collapse on either side.",
    receipt: "Pending. Cross-domain mix not yet cooked — first-customer-publishes-delta discount available.",
  },
];

function Cookbooks() {
  return (
    <section id="cookbooks" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-amber-950/5 to-neutral-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> Cookbooks · pre-curated recipes that move the needle
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-3 max-w-3xl">
          A cookbook is a <strong className="text-amber-300">recipe with enough ingredients to move the needle</strong> on
          a domain — <strong className="text-amber-300">standard 3000</strong> moves the needle,{" "}
          <strong className="text-amber-300">master 5000</strong> is a confident behavioral pivot. Named ingredient mix
          from the medical SKU shelf. Gold Standard QLoRA recipe (the one we used on{" "}
          <strong className="text-amber-300">Atlas-27B</strong> · final loss 0.4186, and{" "}
          <strong className="text-amber-300">Curator-9B</strong> · 0.707). 60-probe eval set ships in every bundle.
        </p>
        <p className="text-rose-300/90 text-sm font-mono mb-3 max-w-3xl px-3 py-2 bg-rose-950/20 border border-rose-900/30 rounded">
          ▸ Headline receipt: <strong className="text-rose-200">501 targeted Jelly Donuts directly repaired Atlas v1&apos;s
          fabrication-detection blind spot.</strong> That receipt is the floor for spot-repair on one failure mode — for that
          job, route to the <a href="#menu" className="text-rose-200 underline-offset-2 hover:underline">500-Pack ($249)</a>{" "}
          instead.
        </p>
        <p className="text-amber-300/90 text-sm font-mono mb-8 max-w-3xl">
          ▸ Cookbooks start at <strong className="text-amber-200">3,000 cells</strong> because that&apos;s the honest floor
          where a model&apos;s domain behavior actually shifts. We won&apos;t sell a smaller cookbook with a needle-moving
          claim we can&apos;t back.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {COOKBOOKS.map((c) => {
            const isMaster = c.cells === 3000;
            return (
              <a
                key={c.slug}
                href={`/cookbooks/${c.slug}.md`}
                className={`block rounded-lg border-2 ${
                  isMaster
                    ? "border-amber-400/60 bg-gradient-to-br from-amber-900/30 to-neutral-900/30"
                    : "border-amber-900/40 bg-neutral-900/40"
                } p-6 hover:border-amber-400/80 transition-colors group`}
              >
                <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-black text-amber-300 leading-tight">{c.name}</h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-300 font-mono">${c.price}</div>
                    <div className="text-[10px] text-neutral-500 font-mono">{c.cells.toLocaleString()} cells</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
                  lane: {c.lane}  ·  {isMaster ? "master · 3000" : "standard · 1500"}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed mb-3">{c.pitch}</p>
                <div className="text-xs text-amber-300/80 font-mono leading-relaxed mb-4 px-2 py-1.5 bg-amber-950/20 border border-amber-900/30 rounded">
                  ▸ {c.receipt}
                </div>
                <pre className="text-[11px] font-mono bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-amber-300 overflow-x-auto">{`swarmbee-bakery order \\
  --sku cookbook \\
  --cookbook ${c.slug} \\
  --domain medical --confirm`}</pre>
                <div className="mt-3 text-[11px] text-neutral-500 font-mono group-hover:text-amber-400 transition-colors">
                  read full recipe + ingredients + receipt →
                </div>
              </a>
            );
          })}
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-3">
            What ships in every cookbook bundle
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-neutral-300">
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">JSONL corpus</code> · 1500 or 3000 cells</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">manifest.json</code> · per-cell sha256 + ingredient breakdown</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">dmack_eval_set_v1.jsonl</code> · 60 real probes</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">eval_runner.py</code> · pre/post grading harness</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">qlora_config.yaml</code> · Gold Standard recipe pinned</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span><code className="text-amber-300">loader.py</code> · TRL/Unsloth/Axolotl-compatible</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>Optional · Hedera HCS anchor of bundle root hash</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>Optional · cooked-for-you adapter weights · pass-through GPU fee</li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-3xl">
          See the full recipe + ingredients + eval focus for each cookbook by clicking through.
          Also via CLI: <code className="text-amber-300">swarmbee-bakery cookbook</code> lists all,
          <code className="text-amber-300"> swarmbee-bakery cookbook glycemic-reasoning</code> prints the full recipe.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ try free ------------------------------ */

const FREE_PACKS: { flavor: string; slug: string; tier: string; pairs: number }[] = [
  { flavor: "Dmack's Royal Jelly",  slug: "dmack-royal-jelly",  tier: "APEX",  pairs: 50 },
  { flavor: "Endo Eclair",          slug: "endo-eclair",        tier: "APEX",  pairs: 50 },
  { flavor: "Cinnamon Spiral",      slug: "cinnamon-spiral",    tier: "APEX",  pairs: 50 },
  { flavor: "Madeleine",            slug: "madeleine",          tier: "HONEY", pairs: 50 },
  { flavor: "Scholar Croissant",    slug: "scholar-croissant",  tier: "HONEY", pairs: 50 },
  { flavor: "Global Crumpet",       slug: "global-crumpet",     tier: "HONEY", pairs: 50 },
  { flavor: "Federal Glaze",        slug: "federal-glaze",      tier: "HONEY", pairs: 50 },
  { flavor: "Founder's Pretzel",    slug: "founders-pretzel",   tier: "APEX",  pairs: 50 },
  { flavor: "Royal Jelly Brioche",  slug: "royal-jelly-brioche",tier: "APEX",  pairs: 50 },
  { flavor: "Golden Glaze",         slug: "golden-glaze",       tier: "HONEY", pairs: 50 },
];

function TryFree() {
  return (
    <section id="try-free" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-rose-950/10 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-rose-300">▍</span> Try 10 free medical datasets · no signup, no card
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-3 max-w-3xl">
          <strong className="text-rose-200">500 free medical cells</strong> · 50 cells from each of
          our 10 named medical SKUs. Real schema, real tier grading, real source citations.
          Pull all 10 packs in one command, evaluate the shape, then decide if you want the
          full corpus.
        </p>
        <p className="text-neutral-500 text-sm mb-8 max-w-3xl">
          Same JSON shape as a paid delivery — just smaller. If the loader works on the
          free pack, it works on the full corpus.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {FREE_PACKS.map((p) => (
            <a
              key={p.slug}
              href={`/samples/free/${p.slug}.jsonl`}
              className="rounded-lg border border-rose-900/40 bg-neutral-900/40 p-3 hover:border-rose-400/60 hover:bg-rose-950/20 transition-colors group"
            >
              <div className="text-[10px] font-mono text-rose-400 mb-1">{p.tier}</div>
              <div className="text-sm font-semibold text-neutral-100 leading-tight mb-1 group-hover:text-rose-200">{p.flavor}</div>
              <div className="text-[10px] font-mono text-neutral-500">{p.pairs} cells · .jsonl</div>
            </a>
          ))}
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-5 mb-4">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-3">
            Pull all 10 in one shot · 60 seconds
          </div>
          <pre className="text-sm font-mono text-amber-300 leading-relaxed overflow-x-auto">{`# install (one-time)
pipx install swarmbee-bakery        # or: pip install in a venv

# pull all 10 free medical packs
swarmbee-bakery free --all --out-dir ./swarm-samples/

# inspect one pack
swarmbee-bakery free dmack-royal-jelly --summary`}</pre>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-3xl">
          Or click any pack above to download directly. Index manifest is at{" "}
          <a href="/samples/free/index.json" className="text-rose-300 hover:text-rose-200 font-mono">/samples/free/index.json</a>.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ how to buy ------------------------------ */

function HowToBuy() {
  return (
    <section id="how-to-buy" className="border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-amber-400">▍</span> How to buy · for devs
        </div>
        <p className="text-neutral-300 text-lg leading-relaxed mb-3 max-w-3xl">
          Datasets are available <strong className="text-amber-300">only through the CLI</strong>.
          No browser checkout, no card-on-file, no instant download.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
          A human reads every order within one business day. Settlement is{" "}
          <strong className="text-amber-300">Stripe invoice</strong> or{" "}
          <strong className="text-amber-300">USDC</strong> to{" "}
          <code className="text-amber-300">swarmusdc.eth</code>. The manual touch is the
          feature, not a gap — every shipment has a name behind it.
        </p>

        <ol className="space-y-5 mb-10">
          {[
            {
              n: "1",
              label: "Install",
              cmd: "pipx install swarmbee-bakery   # or pip in a venv",
              note: "Python 3.10+, one runtime dep (requests). v0.1.1 live on PyPI.",
            },
            {
              n: "2",
              label: "Browse the menu",
              cmd: "swarmbee-bakery menu --domain medical",
              note: "Shows TIER + TRIBUNAL columns. 11 named medical SKUs with real cell counts.",
            },
            {
              n: "3",
              label: "Taste a sample (free)",
              cmd: "swarmbee-bakery free --all --out-dir ./swarm-samples/",
              note: "10 free packs · 500 cells total · same schema as paid delivery.",
            },
            {
              n: "4",
              label: "Submit your order",
              cmd: "swarmbee-bakery order --sku by-the-pound \\\n  --domain medical \\\n  --name 'Your Name' --email 'you@you.dev' \\\n  --notes \"Dmack's Royal Jelly · 5 lb · Stripe invoice\" \\\n  --confirm",
              note: "Dry-run prints by default. --confirm POSTs to /api/bakery-intake (your sha256 receipt is local + immediate).",
            },
          ].map((s) => (
            <li key={s.n} className="flex gap-5">
              <div className="text-3xl font-black text-amber-400 font-mono w-10 flex-shrink-0 leading-none pt-1">{s.n}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-neutral-200 mb-2">{s.label}</div>
                <pre className="text-xs font-mono bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-amber-300 overflow-x-auto leading-relaxed">{s.cmd}</pre>
                <div className="mt-1.5 text-[11px] text-neutral-500 leading-relaxed">{s.note}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-lg border border-amber-900/40 bg-amber-950/10 p-5 mb-10">
          <div className="text-[10px] uppercase tracking-widest text-amber-400 font-mono mb-3">
            Then a human takes over — within one business day
          </div>
          <ul className="text-sm text-neutral-300 space-y-2">
            <li><span className="text-amber-400 font-mono mr-2">5 ·</span>We review your order, scope the deliverable, confirm pricing.</li>
            <li><span className="text-amber-400 font-mono mr-2">6 ·</span>We invoice (Stripe email) <em className="text-neutral-500">or</em> send a settlement address (swarmusdc.eth → 0xBDe2153C5799f4012a9fAF327e3421D1caB4Ea23).</li>
            <li><span className="text-amber-400 font-mono mr-2">7 ·</span>You pay. We assemble the bundle from rails + NAS · sha256 manifest · optional Hedera anchor.</li>
            <li><span className="text-amber-400 font-mono mr-2">8 ·</span>Signed R2 download URL lands in your inbox.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-2">Stripe invoice</div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Human mints a Stripe invoice and emails the link. No card kept on file.
              Standard fiat rail, monthly statements, auto-billable to a company.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-2">swarmusdc.eth</div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              USDC on <strong className="text-amber-300">Ethereum L1 ERC-20</strong> (mainnet only — no L2, no Base, we are root) · ENS{" "}
              <code className="text-amber-300">swarmusdc.eth</code> resolves to{" "}
              <code className="text-amber-300">0xBDe2153C5799f4012a9fAF327e3421D1caB4Ea23</code>.
              Sovereign settlement.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-5 mb-8">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono mb-2">Boundaries</div>
          <ul className="text-xs text-neutral-400 space-y-1 font-mono leading-relaxed">
            <li>· CLI will never auto-submit without <span className="text-amber-300">--confirm</span></li>
            <li>· CLI never charges a card · never creates an account on your behalf</li>
            <li>· No browser checkout · no card-on-file · no instant download · no upsell flow</li>
            <li>· Every order is read by a human at Swarm &amp; Bee within one business day</li>
          </ul>
        </div>

        <div className="text-sm text-neutral-500 leading-relaxed">
          Questions before ordering? Email{" "}
          <a href={`mailto:${EMAIL}`} className="text-amber-400 hover:text-amber-300">{EMAIL}</a>{" "}
          or jump to{" "}
          <a href="https://discord.gg/buUjYgzP5m" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noreferrer">Discord</a>.
          GPUs for training? We use vast.ai —{" "}
          <a href="/gpu" className="text-amber-400 hover:text-amber-300">swarmandbee.ai/gpu</a>{" "}
          <span className="text-neutral-600">(referral)</span>.
        </div>
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
