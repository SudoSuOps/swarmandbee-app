// bakery.swarmandbee.ai/box · the seamless transaction
//
// Customer walks in, sees the rack, picks 12 from any flavors, hits the register.
// Pays $149. Gets a sha256 receipt + Tribunal seal + Hedera anchor + download link.
// Goes home and treats the family.
//
// 4 flavors on the rack — every pair on every card is Tribunal-stamped, drawn
// from real source files in /mnt/swarm/CATALOG.md (the rails catalog).
//
//   Jelly Donut       · APEX  · Royal Jelly tier · finance/aviation/grants/failure/signal
//   Chocolate Twist   · HONEY · finance/valuation (cap-rate, DSCR, IRR, LTV)
//   Glazed Old-Fashioned · HONEY · CRE workhorse · lease, debt, risk discipline
//   Blueberry Cake    · HONEY · specialty (grants, aviation ops, OpenAlex extraction)

import { useEffect, useMemo, useState } from "react";

const FLAT_PRICE_USD = 149;
const BOX_SIZE = 12;
const BAKERY_URL = "https://bakery.swarmandbee.ai";

type Flavor = "jelly" | "choc" | "glaze" | "blueberry";
type Tier = "APEX" | "HONEY";

interface Card {
  id: string;
  flavor: Flavor;
  tier: Tier;
  source: string;
  pair_index: number;
  domain: string;
  rubric_avg: number;
  tribunal_seal: boolean;
  preview: string;
}

interface RackData {
  generated_at_utc: string;
  anchor_grand_root: string;
  anchor_catalog: string;
  flat_price_usd: number;
  flat_price_btc_sats_floor: number;
  box_size: number;
  flavor_legend: Record<Flavor, { label: string; tier: Tier; color_hex: string; description: string }>;
  cards: Card[];
}

type Step = "rack" | "register" | "paid";

export default function BuildABox() {
  const [rack, setRack] = useState<RackData | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | Flavor>("all");
  const [step, setStep] = useState<Step>("rack");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [payRail, setPayRail] = useState<"stripe" | "lightning">("stripe");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [bundleHash, setBundleHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/box-rack.json")
      .then((r) => r.json())
      .then((d) => setRack(d as RackData))
      .catch((e) => setErrorMsg("Couldn't load the rack — " + String(e)));
  }, []);

  // hydrate picks from localStorage (the customer's basket persists across reloads)
  useEffect(() => {
    const stored = localStorage.getItem("sb_box_picks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setPicks(parsed.slice(0, BOX_SIZE));
      } catch {
        /* ignore */
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("sb_box_picks", JSON.stringify(picks));
  }, [picks]);

  // compute bundle hash whenever picks change (client-side preview · server re-computes for receipt)
  useEffect(() => {
    if (picks.length !== BOX_SIZE) {
      setBundleHash(null);
      return;
    }
    const sorted = [...picks].sort();
    const payload = sorted.join("|");
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload)).then((buf) => {
      const hex = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setBundleHash(hex);
    });
  }, [picks]);

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-neutral-950 text-rose-300 p-10 font-mono text-sm">
        {errorMsg}
      </div>
    );
  }
  if (!rack) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-500 p-10 font-mono text-sm">
        loading rack…
      </div>
    );
  }

  const cardById = (id: string) => rack.cards.find((c) => c.id === id);
  const togglePick = (id: string) => {
    setPicks((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= BOX_SIZE) return prev;
      return [...prev, id];
    });
  };
  const clearBox = () => setPicks([]);

  const visibleCards = filter === "all" ? rack.cards : rack.cards.filter((c) => c.flavor === filter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-32">
      <Header />
      {step === "rack" ? (
        <>
          <RackHero />
          <WhatYouNeed />
          <FlavorBar rack={rack} active={filter} onChange={setFilter} />
          <RackGrid cards={visibleCards} picks={picks} onToggle={togglePick} rack={rack} />
        </>
      ) : null}

      {step === "register" ? (
        <Register
          picks={picks}
          cardById={cardById}
          bundleHash={bundleHash}
          email={email}
          setEmail={setEmail}
          orgName={orgName}
          setOrgName={setOrgName}
          intendedUse={intendedUse}
          setIntendedUse={setIntendedUse}
          payRail={payRail}
          setPayRail={setPayRail}
          submitting={submitting}
          onBack={() => setStep("rack")}
          onSubmit={async () => {
            setSubmitting(true);
            setErrorMsg(null);
            try {
              const res = await fetch("/api/box-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  picks,
                  bundle_hash: bundleHash,
                  email,
                  org_name: orgName,
                  intended_use: intendedUse,
                  pay_rail: payRail,
                }),
              });
              const json = (await res.json()) as { ok: boolean; order_id?: string; error?: string };
              if (!json.ok || !json.order_id) {
                throw new Error(json.error || "checkout failed");
              }
              setOrderId(json.order_id);
              setStep("paid");
              setPicks([]);
              localStorage.removeItem("sb_box_picks");
            } catch (e) {
              setErrorMsg(String(e));
            } finally {
              setSubmitting(false);
            }
          }}
        />
      ) : null}

      {step === "paid" && orderId ? (
        <Receipt
          orderId={orderId}
          bundleHash={bundleHash}
          email={email}
          payRail={payRail}
          onBuyAnother={() => {
            setOrderId(null);
            setBundleHash(null);
            setStep("rack");
          }}
        />
      ) : null}

      <BoxBar
        picks={picks}
        rack={rack}
        bundleHash={bundleHash}
        onClear={clearBox}
        onCheckout={() => setStep("register")}
        visible={step === "rack"}
      />
    </div>
  );
}

/* ------------------------------- header ----------------------------------- */

function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={BAKERY_URL} className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors">
          ← The bakery
        </a>
        <span className="ml-2 text-xs text-neutral-500 font-mono">/ build a box</span>
        <div className="ml-auto text-[10px] uppercase tracking-widest text-neutral-500 font-mono hidden md:block">
          Tribunal-stamped · pick 12 · $149 flat
        </div>
      </div>
    </header>
  );
}

/* ------------------------------- rack hero -------------------------------- */

function RackHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-neutral-950 to-rose-950/10 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-10">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          The Taste Pack · 12 Tribunal-stamped pairs
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
          Pick a dozen.<br />
          <span className="text-amber-400">$149 flat.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-neutral-300 max-w-3xl leading-relaxed">
          For evaluation, A/B benchmarking, pipeline testing, or seeding your own
          curation set. Walk the rack, add 12 pairs from any flavors, hit the
          register — take home a sha256-stamped, Tribunal-sealed, Hedera-anchored
          Baker&apos;s Dozen. Every pair is drawn from a real, audited source file in
          our rails catalog.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-rose-300/90 px-3 py-2 bg-rose-950/20 border border-rose-900/40 rounded">
          <span className="text-rose-400 font-bold">▸ Not a training set.</span>
          12 pairs cannot fine-tune a model — the
          <a href="#what-you-need" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">calculator below</a>
          points to the right SKU for actual training.
        </div>
        <div className="mt-3 text-sm text-neutral-500 font-mono">
          freshness · weekly re-bake · catalog anchor <span className="text-amber-400">9ff608f0…</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- what-you-need calculator -------------------------- */
// 4 questions · 30 seconds · honest recommendation. The customer ends up at
// Taste Pack, 500-Pack, or wholesale depending on what they actually need.

type Goal = "evaluate" | "repair" | "skill" | "mastery";
type BaseSize = "1-4B" | "7-13B" | "27-35B" | "70B+";
type Domain = "general" | "finance" | "legal" | "medical" | "aviation" | "grants" | "other";
type HasEval = "yes" | "no";

interface Recommendation {
  sku: string;
  pairs: string;
  priceLabel: string;
  cookTime: string;
  gpuCost: string;
  why: string;
  evalNote: string;
  cta: { label: string; href: string };
  variant: "taste" | "training";
}

function WhatYouNeed() {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState<Goal | "">("");
  const [baseSize, setBaseSize] = useState<BaseSize | "">("");
  const [domain, setDomain] = useState<Domain | "">("");
  const [hasEval, setHasEval] = useState<HasEval | "">("");

  const rec: Recommendation | null = useMemo(() => {
    if (!goal || !baseSize || !domain || !hasEval) return null;
    return recommend(goal, baseSize, domain, hasEval);
  }, [goal, baseSize, domain, hasEval]);

  const reset = () => {
    setGoal("");
    setBaseSize("");
    setDomain("");
    setHasEval("");
  };

  return (
    <section id="what-you-need" className="border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-amber-950/5 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="w-full text-left rounded-lg border border-amber-900/40 bg-amber-950/10 px-5 py-4 hover:bg-amber-950/20 hover:border-amber-700/60 transition-colors flex items-center justify-between gap-4"
          >
            <div>
              <div className="text-amber-300 font-bold text-base">Not sure what you need?</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                30-second guide · four questions · honest recommendation. We&apos;ll point you to Taste Pack, 500-Pack, or wholesale.
              </div>
            </div>
            <span className="text-amber-400 font-mono text-xl">▸</span>
          </button>
        ) : (
          <div className="rounded-lg border border-amber-900/40 bg-neutral-900/40 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase">▍ What pairs do you need?</div>
                <div className="text-sm text-neutral-400 mt-1">
                  Four questions. We&apos;ll point you to the right rung of the ladder.
                </div>
              </div>
              <button
                onClick={() => { setOpen(false); reset(); }}
                className="text-xs text-neutral-500 hover:text-neutral-300 font-mono"
              >
                close ✕
              </button>
            </div>

            <div className="space-y-6">
              <Q
                label="1 · What's your goal?"
                value={goal}
                options={[
                  { v: "evaluate", l: "Just evaluate quality / test pipeline / A/B" },
                  { v: "repair", l: "Repair ONE specific failure mode in an existing model" },
                  { v: "skill", l: "Add a new narrow skill to a base model" },
                  { v: "mastery", l: "Build full domain mastery (vertical capability)" },
                ]}
                onChange={(v) => setGoal(v as Goal)}
              />
              <Q
                label="2 · Base model size?"
                value={baseSize}
                disabled={!goal}
                options={[
                  { v: "1-4B", l: "1B – 4B (Qwen3.5-4B, Phi-3-mini)" },
                  { v: "7-13B", l: "7B – 13B (Llama-3.1-8B, Mistral-7B)" },
                  { v: "27-35B", l: "27B – 35B (Qwen3-32B, Gemma-3-27B)" },
                  { v: "70B+", l: "70B+ (Llama-3.1-70B, Qwen-72B)" },
                ]}
                onChange={(v) => setBaseSize(v as BaseSize)}
              />
              <Q
                label="3 · Domain?"
                value={domain}
                disabled={!baseSize}
                options={[
                  { v: "general", l: "General / multi-domain" },
                  { v: "finance", l: "Finance / valuation / capital markets (×3)" },
                  { v: "legal", l: "Legal / contract / regulatory (×2.5)" },
                  { v: "medical", l: "Medical / clinical / pharmacology (×4)" },
                  { v: "aviation", l: "Aviation / incident reasoning" },
                  { v: "grants", l: "Grants / funding / proposal writing" },
                  { v: "other", l: "Other (we'll scope on intake)" },
                ]}
                onChange={(v) => setDomain(v as Domain)}
              />
              <Q
                label="4 · Do you have an eval set?"
                value={hasEval}
                disabled={!domain}
                options={[
                  { v: "yes", l: "Yes · I have a held-out benchmark already" },
                  { v: "no", l: "No · we'll need one" },
                ]}
                onChange={(v) => setHasEval(v as HasEval)}
              />
            </div>

            {rec ? <RecommendationCard rec={rec} onReset={reset} /> : (
              <div className="mt-6 text-xs text-neutral-500 font-mono">
                Answer the four to see the recommendation.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Q({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  options: { v: string; l: string }[];
  disabled?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.v}
            onClick={() => onChange(opt.v)}
            className={`text-left text-sm px-3 py-2 rounded border transition-colors ${
              value === opt.v
                ? "bg-amber-500 border-amber-500 text-neutral-950 font-bold"
                : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-amber-600"
            }`}
          >
            {opt.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ rec, onReset }: { rec: Recommendation; onReset: () => void }) {
  return (
    <div className={`mt-8 rounded-lg border-2 p-6 bg-gradient-to-br ${
      rec.variant === "taste"
        ? "border-amber-400/60 from-amber-900/30 to-neutral-900/30"
        : "border-amber-500/60 from-amber-900/40 to-neutral-900/30"
    }`}>
      <div className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-2">▶ Recommendation</div>
      <div className="flex items-baseline flex-wrap gap-3 mb-2">
        <span className="text-2xl font-black text-neutral-100">{rec.sku}</span>
        <span className="text-amber-300 font-mono text-sm">{rec.pairs} pairs · {rec.priceLabel}</span>
      </div>
      <p className="text-sm text-neutral-300 leading-relaxed mb-4">{rec.why}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mb-4">
        <div className="rounded bg-neutral-950/50 border border-neutral-800 px-3 py-2">
          <div className="text-neutral-500">cook time</div>
          <div className="text-amber-300 font-bold">{rec.cookTime}</div>
        </div>
        <div className="rounded bg-neutral-950/50 border border-neutral-800 px-3 py-2">
          <div className="text-neutral-500">est. GPU cost</div>
          <div className="text-amber-300 font-bold">{rec.gpuCost}</div>
        </div>
      </div>

      {rec.evalNote ? (
        <p className="text-xs text-neutral-400 italic mb-4">▸ {rec.evalNote}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800">
        <a
          href={rec.cta.href}
          className="px-5 py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition-colors text-sm"
        >
          {rec.cta.label}
        </a>
        <button onClick={onReset} className="text-xs text-neutral-500 hover:text-neutral-300 font-mono">
          reset
        </button>
      </div>
    </div>
  );
}

function recommend(goal: Goal, baseSize: BaseSize, domain: Domain, hasEval: HasEval): Recommendation {
  const multipliers: Record<Domain, number> = {
    general: 1,
    finance: 3,
    legal: 2.5,
    medical: 4,
    aviation: 1,
    grants: 1,
    other: 1,
  };
  const mult = multipliers[domain];
  const multLabel = mult > 1 ? ` · ×${mult} ${domain}` : "";
  const evalNote = hasEval === "no" ? "We'll seed a 12-prompt held-out eval set from your domain on intake — Tribunal-sealed, not from your training pairs." : "";

  if (goal === "evaluate") {
    return {
      sku: "Taste Pack (Baker's Dozen)",
      pairs: "12",
      priceLabel: "$149 flat",
      cookTime: "—",
      gpuCost: "$0 · no cook needed",
      why: "12 Tribunal-stamped pairs is the right size to inspect curator quality, test your eval pipeline, A/B benchmark an existing model, or seed your own curation patterns. It is NOT large enough to fine-tune.",
      evalNote: hasEval === "yes"
        ? "Use the 12 pairs as targeted prompts against your existing eval set."
        : "12 pairs makes a strong starter eval set — many teams ship without one.",
      cta: { label: "Walk into the bakery →", href: "/box" },
      variant: "taste",
    };
  }

  if (goal === "repair") {
    const cookTime =
      baseSize === "1-4B" ? "4-6 hours" :
      baseSize === "7-13B" ? "8-12 hours" :
      baseSize === "27-35B" ? "12-24 hours" :
      "1-2 days";
    const gpuCost =
      baseSize === "1-4B" ? "$5-15 · vast.ai or your own T1000/4060" :
      baseSize === "7-13B" ? "$15-30 · vast.ai or 1× RTX 4500" :
      baseSize === "27-35B" ? "$30-80 · 1× RTX PRO 6000 or rental" :
      "$80-200 · 2× 5090 / PRO 6000 / cloud H100";
    return {
      sku: "500-Pack",
      pairs: "500",
      priceLabel: `$${Math.round(249 * mult)}${multLabel}`,
      cookTime,
      gpuCost,
      why: "500 pairs scoped to ONE specific failure mode is the minimum that reliably moves a LoRA on the failure you're targeting. Our own Curator-Mistral-3B v2 cook proved the leverage at this size — direct repair of v1's fabrication-detection blind spot.",
      evalNote,
      cta: { label: "Brief the bakers →", href: "https://bounty.swarmandbee.ai" },
      variant: "training",
    };
  }

  if (goal === "skill") {
    const low = Math.round(498 * mult);
    const high = Math.round(1245 * mult);
    const cookTime =
      baseSize === "1-4B" ? "8-12 hours" :
      baseSize === "7-13B" ? "12-24 hours" :
      baseSize === "27-35B" ? "1-2 days" :
      "2-3 days";
    const gpuCost =
      baseSize === "1-4B" ? "$15-30" :
      baseSize === "7-13B" ? "$30-80" :
      baseSize === "27-35B" ? "$80-200" :
      "$200-500";
    return {
      sku: "1-2K Pack",
      pairs: "1,000 – 2,500",
      priceLabel: `$${low} – $${high}${multLabel}`,
      cookTime,
      gpuCost,
      why: "1,000–2,500 targeted pairs is the floor for adding a clean new capability to an instruction-tuned base. Enough update steps for the new skill to take hold without overwriting general capability. SwarmGrant-style verticals sit here.",
      evalNote,
      cta: { label: "Brief the bakers →", href: "https://bounty.swarmandbee.ai" },
      variant: "training",
    };
  }

  // mastery
  const low = Math.round(1990 * mult);
  const high = Math.round(7450 * mult);
  const cookTime =
    baseSize === "1-4B" ? "1-2 days" :
    baseSize === "7-13B" ? "2-3 days" :
    baseSize === "27-35B" ? "3-5 days" :
    "5-7 days";
  const gpuCost =
    baseSize === "1-4B" ? "$50-150" :
    baseSize === "7-13B" ? "$150-400" :
    baseSize === "27-35B" ? "$400-1,200" :
    "$1,200-3,500";
  return {
    sku: "Wholesale (10-50 lb)",
    pairs: "5,000 – 25,000",
    priceLabel: `$${low} – $${high}${multLabel}`,
    cookTime,
    gpuCost,
    why: "5,000–25,000 pairs is the range for full vertical domain coverage — what SwarmAtlas-27B (19.8K), SwarmPharma-35B (25.6K), and the planned Atlas-70B sit on. 25,000 is the hard cap per cook (bakery doctrine: above that, signal scatters and the model regresses).",
    evalNote,
    cta: { label: "Brief the bakers →", href: "https://bounty.swarmandbee.ai" },
    variant: "training",
  };
}

/* ------------------------------- flavor bar ------------------------------- */

function FlavorBar({
  rack,
  active,
  onChange,
}: {
  rack: RackData;
  active: "all" | Flavor;
  onChange: (f: "all" | Flavor) => void;
}) {
  const all: ("all" | Flavor)[] = ["all", "jelly", "choc", "glaze", "blueberry"];
  const label = (f: "all" | Flavor) => (f === "all" ? "All flavors" : rack.flavor_legend[f].label);
  const color = (f: "all" | Flavor) =>
    f === "all" ? "#fbbf24" : rack.flavor_legend[f].color_hex;
  return (
    <section className="border-b border-neutral-800 bg-neutral-950 sticky top-[57px] z-20">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-sm">
        {all.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
              active === f
                ? "bg-amber-500 border-amber-500 text-neutral-950 font-bold"
                : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600"
            }`}
            style={{ boxShadow: active === f ? `0 0 14px ${color(f)}40` : undefined }}
          >
            {label(f)}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-neutral-500 font-mono hidden md:inline">
          showing 48 of {rack.cards.length}
        </span>
      </div>
    </section>
  );
}

/* ------------------------------- rack grid -------------------------------- */

function RackGrid({
  cards,
  picks,
  onToggle,
  rack,
}: {
  cards: Card[];
  picks: string[];
  onToggle: (id: string) => void;
  rack: RackData;
}) {
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <PairCard
            key={c.id}
            card={c}
            selected={picks.includes(c.id)}
            disabled={picks.length >= BOX_SIZE && !picks.includes(c.id)}
            onToggle={() => onToggle(c.id)}
            color={rack.flavor_legend[c.flavor].color_hex}
            flavorLabel={rack.flavor_legend[c.flavor].label}
          />
        ))}
      </div>
    </section>
  );
}

function PairCard({
  card,
  selected,
  disabled,
  onToggle,
  color,
  flavorLabel,
}: {
  card: Card;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
  color: string;
  flavorLabel: string;
}) {
  return (
    <div
      className={`rounded-lg border bg-neutral-900/40 p-4 transition-all flex flex-col ${
        selected
          ? "border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-400/10"
          : disabled
          ? "border-neutral-900 opacity-40"
          : "border-neutral-800 hover:border-neutral-600"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ color, borderColor: color + "40", border: "1px solid" }}
        >
          {flavorLabel}
        </span>
        <span className="text-[10px] font-mono text-neutral-400">{card.tier} · {card.rubric_avg.toFixed(1)}/10</span>
      </div>
      <div className="text-[10px] text-neutral-500 font-mono mb-2 truncate" title={card.source}>
        {card.domain} · {card.source.split("/").pop()} · #{card.pair_index}
      </div>
      <p className="text-sm text-neutral-200 leading-snug flex-1">{card.preview}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-amber-500 font-mono">▣ Tribunal-sealed</span>
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
            selected
              ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
              : disabled
              ? "bg-neutral-900 text-neutral-600 cursor-not-allowed"
              : "bg-neutral-800 text-amber-400 hover:bg-neutral-700"
          }`}
        >
          {selected ? "✓ In box" : "Add to box"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- sticky box bar --------------------------- */

function BoxBar({
  picks,
  rack,
  bundleHash,
  onClear,
  onCheckout,
  visible,
}: {
  picks: string[];
  rack: RackData;
  bundleHash: string | null;
  onClear: () => void;
  onCheckout: () => void;
  visible: boolean;
}) {
  if (!visible) return null;
  const counts = useMemo(() => {
    const c: Record<Flavor, number> = { jelly: 0, choc: 0, glaze: 0, blueberry: 0 };
    picks.forEach((id) => {
      const card = rack.cards.find((x) => x.id === id);
      if (card) c[card.flavor] += 1;
    });
    return c;
  }, [picks, rack.cards]);
  const ready = picks.length === BOX_SIZE;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur shadow-2xl shadow-amber-500/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <BoxIcon filled={picks.length} />
          <div>
            <div className="text-sm font-bold text-amber-400 font-mono">{picks.length} / {BOX_SIZE}</div>
            <div className="text-[10px] text-neutral-500 font-mono">
              {counts.jelly}J · {counts.choc}C · {counts.glaze}G · {counts.blueberry}B
            </div>
          </div>
        </div>

        {bundleHash ? (
          <div className="hidden md:block text-[10px] font-mono text-neutral-500 max-w-xs truncate" title={bundleHash}>
            sha256 · {bundleHash.slice(0, 16)}…
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Total</div>
            <div className="text-xl font-black text-neutral-100">${FLAT_PRICE_USD}</div>
          </div>
          {picks.length > 0 ? (
            <button
              onClick={onClear}
              className="text-xs text-neutral-500 hover:text-rose-400 font-mono"
            >
              clear
            </button>
          ) : null}
          <button
            onClick={onCheckout}
            disabled={!ready}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${
              ready
                ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                : "bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800"
            }`}
          >
            {ready ? "To the register →" : `Pick ${BOX_SIZE - picks.length} more`}
          </button>
        </div>
      </div>
    </div>
  );
}

function BoxIcon({ filled }: { filled: number }) {
  const pct = Math.min(1, filled / BOX_SIZE);
  return (
    <svg viewBox="0 0 36 30" className="w-10 h-8" aria-hidden="true">
      {/* box outline */}
      <rect x="2" y="8" width="32" height="20" rx="2" fill="none" stroke="#525252" strokeWidth="1.5" />
      {/* lid */}
      <rect x="0" y="6" width="36" height="5" rx="1.5" fill="#3f3f46" stroke="#525252" strokeWidth="1.2" />
      {/* fill */}
      <rect x="3" y={28 - 18 * pct} width="30" height={18 * pct} fill="#fbbf24" opacity="0.6" />
      {/* count */}
      {filled > 0 ? (
        <text x="18" y="23" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#0a0a0a">
          {filled}
        </text>
      ) : null}
    </svg>
  );
}

/* ------------------------------- register --------------------------------- */

function Register({
  picks,
  cardById,
  bundleHash,
  email,
  setEmail,
  orgName,
  setOrgName,
  intendedUse,
  setIntendedUse,
  payRail,
  setPayRail,
  submitting,
  onBack,
  onSubmit,
}: {
  picks: string[];
  cardById: (id: string) => Card | undefined;
  bundleHash: string | null;
  email: string;
  setEmail: (v: string) => void;
  orgName: string;
  setOrgName: (v: string) => void;
  intendedUse: string;
  setIntendedUse: (v: string) => void;
  payRail: "stripe" | "lightning";
  setPayRail: (v: "stripe" | "lightning") => void;
  submitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = email.trim().length > 4 && email.includes("@") && picks.length === BOX_SIZE && !submitting;
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onBack} className="text-sm text-neutral-400 hover:text-amber-400 mb-6">
          ← back to the rack
        </button>
        <h2 className="text-3xl font-black mb-2">The register</h2>
        <p className="text-neutral-400 mb-8">
          12 pairs in the box. $149 flat. Payment confirms the order; the bundle ships with sha256 + Tribunal seal + Hedera HCS tx anchor.
        </p>

        {/* box contents */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 mb-6">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-3">In the box</div>
          <ul className="text-sm space-y-1.5">
            {picks.map((id, i) => {
              const c = cardById(id);
              if (!c) return null;
              return (
                <li key={id} className="flex gap-3 text-neutral-300">
                  <span className="text-neutral-600 font-mono w-6 text-right">{i + 1}.</span>
                  <span className="text-amber-400 font-mono text-xs uppercase w-24">{c.flavor}</span>
                  <span className="text-neutral-500 font-mono text-xs">{c.domain}</span>
                  <span className="ml-auto text-neutral-500 font-mono text-xs">{c.rubric_avg.toFixed(1)}/10</span>
                </li>
              );
            })}
          </ul>
          {bundleHash ? (
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono text-neutral-500 break-all">
              bundle.sha256 · <span className="text-amber-500">{bundleHash}</span>
            </div>
          ) : null}
        </div>

        {/* contact + use */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Email · receipt + download link</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourshop.ai"
              className="mt-1 w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Organization · optional</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme AI Labs"
              className="mt-1 w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Intended use · helps us cook the next batch</label>
            <textarea
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              placeholder="Fine-tune a 4B base for CRE underwriting · evaluate a curator · benchmark · etc."
              rows={3}
              className="mt-1 w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-100 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* payment rail */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-3">Payment rail</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label
              className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                payRail === "stripe" ? "border-amber-400 bg-amber-950/20" : "border-neutral-800 hover:border-neutral-600"
              }`}
            >
              <input
                type="radio"
                name="rail"
                value="stripe"
                checked={payRail === "stripe"}
                onChange={() => setPayRail("stripe")}
                className="hidden"
              />
              <div className="font-bold">USD · card / ACH</div>
              <div className="text-xs text-neutral-400 mt-1">
                Stripe checkout link delivered to your email within 1 business hour.
              </div>
            </label>
            <label
              className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                payRail === "lightning" ? "border-amber-400 bg-amber-950/20" : "border-neutral-800 hover:border-neutral-600"
              }`}
            >
              <input
                type="radio"
                name="rail"
                value="lightning"
                checked={payRail === "lightning"}
                onChange={() => setPayRail("lightning")}
                className="hidden"
              />
              <div className="font-bold">BTC · Lightning</div>
              <div className="text-xs text-neutral-400 mt-1">
                Lightning invoice delivered to your email within 1 business hour. Sovereign settlement.
              </div>
            </label>
          </div>
        </div>

        {/* submit */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Total</div>
            <div className="text-3xl font-black text-amber-400">${FLAT_PRICE_USD}</div>
          </div>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              canSubmit
                ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                : "bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800"
            }`}
          >
            {submitting ? "stamping receipt…" : "Place order →"}
          </button>
        </div>
        <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
          Placing the order reserves your 12 pairs and triggers the payment link.
          You confirm payment via the rail you pick · the bundle ships from R2 the
          moment payment lands · the Hedera HCS tx is recorded against your order
          id. No card data touches Swarm &amp; Bee servers.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- receipt ---------------------------------- */

function Receipt({
  orderId,
  bundleHash,
  email,
  payRail,
  onBuyAnother,
}: {
  orderId: string;
  bundleHash: string | null;
  email: string;
  payRail: "stripe" | "lightning";
  onBuyAnother: () => void;
}) {
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          Order received · the receipt
        </div>
        <h2 className="text-4xl font-black mb-3">Thank you for shopping the bakery.</h2>
        <p className="text-neutral-300 mb-8">
          Your Baker&apos;s Dozen is reserved. A {payRail === "stripe" ? "Stripe checkout link" : "Lightning invoice"} is on its way to
          <span className="text-amber-400 font-mono"> {email}</span> within the next business hour. Pay it and the
          bundle download lands in your inbox with sha256 manifest + Defendable Tribunal seal + Hedera HCS tx hash.
        </p>

        <div className="rounded-xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-950/30 to-neutral-900/30 p-6 mb-6 font-mono text-sm space-y-3">
          <div className="flex flex-wrap gap-3 items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-500">order id</span>
            <span className="text-amber-400 font-bold text-base">{orderId}</span>
          </div>
          <div className="flex flex-wrap gap-3 items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-500">bundle sha256</span>
            <span className="text-amber-300 break-all">{bundleHash}</span>
          </div>
          <div className="flex flex-wrap gap-3 items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-500">size</span>
            <span className="text-neutral-300">12 pairs · 1 Baker&apos;s Dozen · $149</span>
          </div>
          <div className="flex flex-wrap gap-3 items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-500">pay rail</span>
            <span className="text-neutral-300">{payRail === "stripe" ? "Stripe · USD" : "Lightning · BTC"}</span>
          </div>
          <div className="flex flex-wrap gap-3 items-baseline">
            <span className="text-xs uppercase tracking-widest text-neutral-500">seal</span>
            <span className="text-neutral-300">Tribunal-stamped · Defendable receipt pending Hedera HCS anchor post-payment</span>
          </div>
        </div>

        <div className="text-sm text-neutral-400 leading-relaxed space-y-3 mb-8">
          <p>
            <strong className="text-neutral-200">What ships:</strong> a signed zip with all 12 pair JSONL records,
            a <code className="text-amber-400">manifest.json</code> with the per-pair sha256 + source-file
            attribution + rubric scores, and a <code className="text-amber-400">defendable_receipt.json</code> with
            the Tribunal seal + Hedera HCS tx hash + this order id.
          </p>
          <p>
            <strong className="text-neutral-200">License:</strong> use the pairs for any internal training,
            evaluation, or research. Resale of the raw pairs is not permitted. Models fine-tuned on the pairs are yours.
          </p>
          <p>
            <strong className="text-neutral-200">Need a different mix or volume?</strong> Reply to the receipt email —
            500-Packs at <code className="text-amber-400">$249/lb</code> with domain multipliers are quoted on intake.
          </p>
        </div>

        <button
          onClick={onBuyAnother}
          className="text-sm text-amber-400 hover:text-amber-300 font-semibold"
        >
          ← grab another dozen
        </button>
      </div>
    </section>
  );
}
