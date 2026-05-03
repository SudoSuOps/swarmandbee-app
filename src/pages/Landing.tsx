// swarmandbee.ai — the Commercial Compute Intelligence Refinery.
//
// Brand voice (Donovan): "Honey by the pound. Organic signal, never recycled.
// Trust. Verified. Vetted. Defendable Class A. We scale, we weigh, we ship.
// AI assets — the real-economy ROI."
//
// Visual discipline matches swarmgeo.eth.limo: black/white/amber, single hero,
// stat strips, no marketing fluff, dark footer. CRE-broker authority over
// AI-startup hype.

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <StatsStrip />
      <NoRecycle />
      <ScaleWeighShip />
      <SwarmOS />
      <CanonicalBlock />
      <TruthProtocol />
      <ClassAFrame />
      <HoneyByThePound />
      <Products />
      <GlassWalls />
      <Founder />
      <AtlasProof />
      <FinalCTA />
      <Footer />
    </div>
  );
}

// ─── header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        <a href="/" className="font-bold text-lg tracking-tight">Swarm &amp; Bee</a>
        <nav className="ml-auto flex items-center gap-5 text-sm">
          <a href="#thesis" className="text-neutral-600 hover:text-neutral-900">Thesis</a>
          <a href="#honey" className="text-neutral-600 hover:text-neutral-900">Honey</a>
          <a href="#products" className="text-neutral-600 hover:text-neutral-900">Products</a>
          <a href="#founder" className="text-neutral-600 hover:text-neutral-900">Founder</a>
          <a href="https://swarmgeo.eth.limo" target="_blank" rel="noreferrer"
             className="px-3 py-1.5 rounded bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors">
            Free GEO Score →
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle honey gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-white pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          Commercial Compute Intelligence Refinery
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          The data refinery <br className="hidden md:block" />
          for <span className="text-amber-600">serious verticals</span>.
        </h1>

        <p className="mt-8 text-xl md:text-2xl text-neutral-700 max-w-3xl leading-relaxed">
          <span className="font-semibold text-neutral-900">We develop intelligence assets like commercial real estate.</span>
          <br />
          Honey by the pound. Buildings, not subscriptions. Fee simple. Free and clear.
        </p>

        <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-3xl leading-relaxed">
          The <span className="font-semibold">Truth Protocol</span>: Verified. Vetted. <span className="font-semibold">Virtu</span>.
          We scale. We weigh. We ship.
          <br />
          <span className="text-neutral-900 font-semibold">The model home comes with the deal.</span>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#honey"
             className="px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors">
            Browse the Portfolio →
          </a>
          <a href="/om/cre"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Read the OM · CRE
          </a>
          <a href="https://swarmgeo.eth.limo" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors">
            Free GEO Score
          </a>
          <a href="mailto:build@swarmandbee.ai"
             className="px-6 py-3 rounded-lg text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
            build@swarmandbee.ai
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── stats strip ───────────────────────────────────────────────────────────────

function StatsStrip() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-4">
          <Stat n="1,495,857" label="Pairs in production · 10 domains" />
          <Stat n="8,400+" label="Deeds filed · dual-judge scored · Hedera-anchored" />
          <Stat n="5,200+" label="Royal Jelly · Class A · score ≥ 0.85" />
          <Stat n="176" label="GPUs · 128 RTX PRO 6000 + 48 RTX 4500" />
          <Stat n="$0.0052" label="Cost to mint per deed · auditable" />
          <Stat n="$8B / 30 yrs" label="Founder · national CRE platform" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-neutral-900 leading-none">{n}</div>
      <div className="mt-2 text-xs md:text-sm text-neutral-600 leading-snug">{label}</div>
    </div>
  );
}

// ─── no recycle / what it actually is ──────────────────────────────────────────

function NoRecycle() {
  return (
    <section id="thesis" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        We don't recycle data
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-4xl">
        Most AI training data is <span className="line-through text-neutral-400">scraped</span>.
        Commodity. Synthetic noise.
      </h2>
      <p className="mt-6 text-xl text-neutral-700 max-w-3xl leading-relaxed">
        We start from raw signal. Every pair is organically sourced from the deal flow itself —
        the brokerage deal machine, automated. You don't get warehouse data.
        You get <span className="font-semibold">audited deals</span>.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {THESIS_LAYERS.map((layer, i) => (
          <div key={layer.name} className="relative">
            <div className="text-xs font-mono text-amber-700 mb-2">LAYER {i + 1}</div>
            <div className="text-lg font-bold">{layer.name}</div>
            <p className="mt-2 text-sm text-neutral-700">{layer.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const THESIS_LAYERS = [
  {
    name: "Signal",
    body: "Raw data from the working economy — deals, filings, tribunals, real customer questions. No scraping. First-source.",
  },
  {
    name: "Curate",
    body: "Royal Jelly Protocol. JellyScore. 5-dimensional Chain-of-Thought judging. Class graded from the moment it lands.",
  },
  {
    name: "Verticals",
    body: "12 industries — CRE, Medical, Aviation, Pharma, Grants, Finance, Failure Pairs. Each pair owned by the vertical it serves.",
  },
  {
    name: "Ledger",
    body: "Every Honey package is deeded. Hedera-anchored. IPFS-pinned. Auditable end-to-end. The buyer owns title.",
  },
];

// ─── scale / weigh / ship ──────────────────────────────────────────────────────

function ScaleWeighShip() {
  return (
    <section className="bg-ink text-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          Operational mantra
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          We <span className="text-amber-400">scale</span>.
          We <span className="text-amber-400">weigh</span>.
          We <span className="text-amber-400">ship</span>.
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Pillar
            label="SCALE"
            title="The compute"
            body="176 GPUs across the fleet — 128 RTX PRO 6000 + 48 RTX 4500. Sovereign compute on owned hardware. Ours, not rented. Same rigs that train models cook the data."
          />
          <Pillar
            label="WEIGH"
            title="The grading"
            body="Royal Jelly Protocol RJP-1. JellyScore from 0–1. Class A / B / C banding. Tribunal of dual judges. Every pair has a deposition."
          />
          <Pillar
            label="SHIP"
            title="The delivery"
            body="Hedera Consensus Service-anchored deeds. USDC + Stripe settlement. IPFS-pinned proofs. Title transfers cleanly — every package carries its own audit chain."
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-6">
      <div className="text-amber-400 font-bold text-sm tracking-wider">{label}</div>
      <div className="text-xl font-semibold mt-1">{title}</div>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

// ─── SwarmOS — the operating system underneath everything ────────────────────

function SwarmOS() {
  return (
    <section id="swarmos" className="bg-ink text-neutral-100 py-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The protocol
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          SwarmOS <span className="text-amber-400">Protocol</span>.
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-3xl leading-relaxed">
          The operating standard for intelligence-asset development. One protocol across every job —
          rigs, hashrate, watts, blocks, deeds. Same primitives. Same discipline. Same audit trail.
          <strong className="text-white"> The output is title deeds, defendable on-chain, owned in fee simple.</strong>
        </p>

        {/* The Doctrine — pull-quote */}
        <div className="mt-12 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="font-mono text-base md:text-lg text-amber-100 leading-loose">
            <span className="text-neutral-400">// The Doctrine</span><br />
            The token is the <span className="text-amber-400 font-semibold">PAIR</span>.<br />
            The hash is the <span className="text-amber-400 font-semibold">VERDICT</span>.<br />
            The block reward is the <span className="text-amber-400 font-semibold">TITLE DEED</span>.<br />
            The hashrate is <span className="text-amber-400 font-semibold">VERDICTS PER MINUTE</span>.<br />
            The efficiency is <span className="text-amber-400 font-semibold">PAIRS PER WATT</span>.<br />
            The profitability is <span className="text-amber-400 font-semibold">REVENUE MINUS COST TO MINT</span>.
          </p>
          <p className="mt-6 text-lg text-neutral-200 italic">
            We don't mine coins. We mint defendable intelligence assets.<br />
            Same math. Same discipline. Same efficiency obsession.
          </p>
        </div>

        {/* The 7-document workflow */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6 text-white">
          The seven documents
        </h3>
        <p className="text-neutral-400 mb-6 max-w-3xl leading-relaxed">
          Every epoch — every dataset, every model, every deed — moves through this construction
          process. Skip a step and the asset isn't defendable. Run it correctly and the chain of
          custody is verifiable from raw signal to recorded title.
        </p>
        <div className="rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800 text-neutral-300">
              <tr>
                <th className="text-left p-3 font-semibold w-12">#</th>
                <th className="text-left p-3 font-semibold">Document</th>
                <th className="text-left p-3 font-semibold">When</th>
                <th className="text-left p-3 font-semibold">CRE Sister</th>
              </tr>
            </thead>
            <tbody className="text-neutral-200">
              {DOCS.map((d, i) => (
                <tr key={d.name} className={i % 2 ? "bg-neutral-900" : "bg-neutral-950"}>
                  <td className="p-3 font-mono text-amber-400 font-semibold">{i + 1}</td>
                  <td className="p-3 font-semibold">{d.name}</td>
                  <td className="p-3 text-neutral-400">{d.when}</td>
                  <td className="p-3 text-neutral-300 italic">{d.cre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost to mint — the killer metric */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <CostStat
            label="Cost to mint per deed"
            value="$0.0052"
            sub="fully loaded · electricity + hardware + chain fees"
          />
          <CostStat
            label="Optimum hashrate"
            value="90 v/min"
            sub="2× RTX PRO 6000 · validate-failure algo · 0.300 pair/W"
          />
          <CostStat
            label="Gross margin range"
            value="95–99%"
            sub="at $0.10–$1.00/deed market price"
          />
        </div>

        <p className="mt-8 text-sm text-neutral-400 max-w-3xl leading-relaxed">
          The math is auditable. Every customer can run their own miners and verify the cost-to-mint
          benchmark from first principles. <strong className="text-neutral-200">No vendor lock, no opaque pricing.</strong>{" "}
          Same way Bitcoin's profitability is independently verifiable from any rig's hashrate and
          power draw — that's the standard SwarmOS holds itself to.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://github.com/SudoSuOps/SwarmOS" target="_blank" rel="noreferrer"
             className="px-5 py-2.5 rounded-lg bg-amber-500 text-neutral-900 font-bold text-sm hover:bg-amber-400 transition-colors">
            SwarmOS on GitHub →
          </a>
          <a href="https://github.com/SudoSuOps/Swarn-chain" target="_blank" rel="noreferrer"
             className="px-5 py-2.5 rounded-lg border border-neutral-600 text-neutral-200 font-semibold text-sm hover:border-amber-400 hover:text-amber-400 transition-colors">
            SwarmChain (the backend)
          </a>
          <a href="https://github.com/SudoSuOps/glass-wall" target="_blank" rel="noreferrer"
             className="px-5 py-2.5 rounded-lg border border-neutral-600 text-neutral-200 font-semibold text-sm hover:border-amber-400 hover:text-amber-400 transition-colors">
            Glass-Wall (the doctrine)
          </a>
        </div>
      </div>
    </section>
  );
}

const DOCS = [
  { name: "HardwareProfile",   when: "Before anything",   cre: "Property survey" },
  { name: "FlightSheet",       when: "Before job",        cre: "Construction permit + plans (signed contract)" },
  { name: "CalibrationReport", when: "Before pricing",    cre: "Appraisal — 50-pair test gives actuals" },
  { name: "POJ (Proof of Job)", when: "Before launch",    cre: "Loan Estimate / Pre-Closing — authorize launch" },
  { name: "EpochProgress",     when: "During job",        cre: "Construction inspections — honest nulls, never fake zeros" },
  { name: "ClosingStatement",  when: "After job",         cre: "HUD-1 / Closing Disclosure — variance reasons explained" },
  { name: "Hedera Anchor",     when: "After close",       cre: "Recorded deed at courthouse — title transfers, immutable" },
];

function CostStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-6">
      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-4xl font-bold text-white tracking-tight">{value}</div>
      <div className="mt-2 text-xs text-neutral-400 leading-snug">{sub}</div>
    </div>
  );
}

// ─── Canonical block — what one looks like in 58 seconds ─────────────────────

function CanonicalBlock() {
  return (
    <section className="bg-stone-50 border-t border-stone-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          One block · 58 seconds · the whole thesis
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Block <span className="font-mono text-amber-600">0d63d78e</span>.
        </h2>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
          A reasoning task enters the refinery. <strong>8 miners across 3 tiers of silicon</strong>{" "}
          attempt solutions. The chain scores them, traces lineage, distributes rewards, and seals
          the result — <strong>all in 58 seconds</strong>. Every block on swarmandbee.ai/chain
          works the same way.
        </p>

        {/* The timeline */}
        <div className="mt-10 rounded-lg border-2 border-stone-300 bg-white overflow-hidden">
          <div className="bg-neutral-900 text-white px-5 py-3 font-mono text-xs flex items-center justify-between">
            <span>// task: flip the grid horizontally (4×5 → 4×5)</span>
            <span className="text-amber-400">block 0d63d78e</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-stone-100 text-neutral-700">
              <tr>
                <th className="text-left p-3 font-semibold w-20">t (sec)</th>
                <th className="text-left p-3 font-semibold">Event</th>
                <th className="text-right p-3 font-semibold w-24">Score</th>
              </tr>
            </thead>
            <tbody>
              <BlockRow t="0:00" event="Block opens · 8 miners start working" score="—" />
              <BlockRow t="0:12" event="xeon-bee submits first attempt" score="0.450" />
              <BlockRow t="0:18" event="Same bee improves" score="0.600 → PROMOTED" highlight />
              <BlockRow t="0:24" event="Three more bees converge" score="0.750 (×3)" />
              <BlockRow t="0:31" event={<>Jetson edge — <span className="font-mono text-amber-700">$200 board, 15 watts</span></>} score="0.700" />
              <BlockRow t="0:44" event="GPU-4B drops the hammer" score="1.000 — HONEY" winner />
              <BlockRow t="0:58" event="Block sealed · rewards distributed · next block opens" score="✓" />
            </tbody>
          </table>
        </div>

        {/* The reward distribution */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Reward distribution</h3>
            <div className="rounded-lg border border-neutral-300 bg-white overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <RewardRow node="gpu-4b" amount="40.00" reason="Solver — found the answer" />
                  <RewardRow node="xeon-bee" amount="30.00" reason="Lineage — its work led to the solve (+0.250 improvement)" />
                  <RewardRow node="5 bees" amount="16.50" reason="Exploration — tried different angles" />
                  <RewardRow node="sigedge" amount="6.27" reason="Exploration + efficiency — cheapest per score" />
                  <RewardRow node="all nodes" amount="7.22" reason="Efficiency — proportional to energy" />
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">What this proves</h3>
            <ul className="space-y-3 text-sm text-neutral-700 leading-relaxed">
              <li className="pl-5 relative">
                <span className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full" />
                <strong>Nobody got nothing.</strong> Even the 0.450 attempt earned exploration reward. Every miner contributed. Every contribution is receipted.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full" />
                <strong>The Jetson didn't lose.</strong> $200 of silicon at 15 watts produced a 0.700 — and earned exploration + efficiency rewards alongside the GPU.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full" />
                <strong>The bee got paid for being a parent.</strong> Its 0.600 was the lineage ancestor of the GPU's 1.000. 30% of the reward followed the lineage.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full" />
                <strong>The client sees ALL of this.</strong> Every attempt. Every score. Every node. Every strategy. The lineage graph. The reward split. The energy cost. The seal timestamp.
              </li>
            </ul>

            <a href="https://swarmandbee.ai/chain/" target="_blank" rel="noreferrer"
               className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900">
              Watch a live block on /chain →
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-neutral-500 italic">
          Genesis block <span className="font-mono">8f42666ef87c</span> sealed 2026-03-28 ·
          the first titled AI data pair. 8,400+ deeds since.
        </p>
      </div>
    </section>
  );
}

function BlockRow({ t, event, score, highlight, winner }: {
  t: string; event: React.ReactNode; score: string; highlight?: boolean; winner?: boolean;
}) {
  return (
    <tr className={`${winner ? "bg-amber-50" : highlight ? "bg-yellow-50" : ""} border-t border-stone-200`}>
      <td className="p-3 font-mono text-neutral-700">{t}</td>
      <td className="p-3">{event}</td>
      <td className={`p-3 text-right font-mono ${winner ? "font-bold text-amber-900" : highlight ? "font-semibold text-amber-800" : "text-neutral-700"}`}>{score}</td>
    </tr>
  );
}

function RewardRow({ node, amount, reason }: { node: string; amount: string; reason: string }) {
  return (
    <tr className="border-t border-neutral-200 first:border-0">
      <td className="p-3 font-semibold text-neutral-900 w-28">{node}</td>
      <td className="p-3 font-mono text-amber-700 w-20 text-right">{amount}</td>
      <td className="p-3 text-neutral-600 text-xs leading-snug">{reason}</td>
    </tr>
  );
}

// ─── The Truth Protocol — Defendable franchise ───────────────────────────────

function TruthProtocol() {
  return (
    <section id="defendable" className="bg-white py-20 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          Defendable — the brand for AI that has to defend itself
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-4xl">
          The Truth Protocol.
        </h2>
        <p className="mt-6 text-xl text-neutral-700 max-w-3xl leading-relaxed">
          Disclosure isn't enough. You need title. You need provenance. You need a chain
          of custody you can put in front of a regulator. <strong>Defendable</strong> is
          the protocol — every recipe, every corpus, every weight deeded on-chain.
          Customers don't trust us. They <em>verify</em> us.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DefendableCard
            domain="defendable.eth"
            tag="The Standard"
            status="Live"
            href="https://defendable.eth.limo"
            body="The certification standard. Spec. Test. Deed. Anchor. Audit. Issued by Swarm & Bee. Open for licensing."
          />
          <DefendableCard
            domain="data.defendable.eth"
            tag="The Catalog"
            status="Live"
            href="https://data.defendable.eth.limo"
            body="The Honey Warehouse — every dataset deeded, every package verifiable. The receipts."
          />
          <DefendableCard
            domain="atlas.defendable.eth"
            tag="The Flagship"
            status="Cooking · live Wed May 6"
            href="#products"
            body="The Atlas franchise GOAT. Llama-3.3-70B fine-tuned on the Block-0 capital markets corpus. The first Defendable-Class-A model trained from a Defendable-Class-A recipe."
          />
          <DefendableCard
            domain="cookbook.defendable.eth"
            tag="The Recipes"
            status="Recipe #1 ready"
            href="#products"
            body="Every model's build recipe is published, versioned, anchored. Anyone can re-cook from the deed. Open the chain of custody."
          />
        </div>

        <div className="mt-12 max-w-3xl border-l-4 border-amber-500 pl-6">
          <p className="text-2xl md:text-3xl text-neutral-900 font-semibold leading-snug">
            Atlas is the building.
            The cookbook is the title docs.
            The compute is the dirt.
          </p>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Real estate's hardest-won principle, applied to AI: <strong>disclosure, disclosure, disclosure</strong>.
            But disclosure alone is just a proforma — to execute you need capital, compute, and infrastructure.
            That's why every model in the Defendable franchise runs on metal Swarm owns. Real brick and mortar.
          </p>
        </div>
      </div>
    </section>
  );
}

function DefendableCard({ domain, tag, status, href, body }: {
  domain: string; tag: string; status: string; href: string; body: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a href={href}
       target={isExternal ? "_blank" : undefined}
       rel={isExternal ? "noreferrer" : undefined}
       className="block rounded-lg border-2 border-neutral-200 bg-white p-5 hover:border-amber-500 transition-colors">
      <div className="text-xs font-mono text-amber-700 mb-2 uppercase tracking-wider">{tag}</div>
      <div className="font-bold text-base font-mono break-all">{domain}</div>
      <div className="text-xs text-neutral-500 mt-1">{status}</div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
    </a>
  );
}

// ─── Class A / 5-cap CRE frame ─────────────────────────────────────────────────

function ClassAFrame() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        AI assets, graded like commercial real estate
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-4xl">
        Defendable <span className="text-amber-600">Class A</span>.
      </h2>
      <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
        Like commercial real estate, the asset is <strong>grading + provenance + cap rate</strong>.
        Every Honey package shows you all three.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ClassCard
          tier="A"
          name="Royal Jelly"
          color="bg-amber-500"
          rule="JellyScore ≥ 0.85"
          notes="Institutional-grade. Peer-reviewed. Hedera-anchored. The pairs models actually learn from."
        />
        <ClassCard
          tier="B"
          name="Honey"
          color="bg-yellow-400"
          rule="JellyScore 0.70 – 0.84"
          notes="Vetted, verified, packaged. Production-ready for fine-tunes that don't need RJ-grade."
        />
        <ClassCard
          tier="C"
          name="Propolis"
          color="bg-red-500"
          rule="JellyScore < 0.70"
          notes="Not for sale. Composted into the genome — the next batch's signal source. Class C feeds the system."
        />
      </div>

      <div className="mt-12">
        <h3 className="font-serif text-2xl font-semibold mb-4">Six proofs per block</h3>
        <p className="text-sm text-neutral-700 mb-6 max-w-3xl leading-relaxed">
          Every sealed block carries six independent proofs. Buyers don't take our word — they
          recompute the chain themselves before wiring funds. <strong>Validate the Validator.</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ProofTile n="1" name="Proof of Origin" body="Which model · which node · which hardware · which strategy" />
          <ProofTile n="2" name="Proof of Quality" body="Deterministic verifier score — never model opinion" />
          <ProofTile n="3" name="Proof of Process" body="Full lineage — what was tried, what failed, what survived" />
          <ProofTile n="4" name="Proof of Economics" body="Energy cost per attempt · cost-per-honey trend" />
          <ProofTile n="5" name="Proof of Trust" body="Hedera HCS anchor + Merkle root · verifiable by anyone" />
          <ProofTile n="6" name="Proof of Location" body="Measurable, reproducible relocation of the model from generic → specialist (April 2026)" />
        </div>

        <p className="mt-6 text-sm text-neutral-600 max-w-3xl leading-relaxed italic">
          The deed proves origin. The title insures quality. The Proof of Location proves outcome.
          <br />
          <strong className="text-neutral-900 not-italic">defendable.eth IS the algorithm.</strong>{" "}
          Open-source. Reproducible. Falsifiable. Public.
        </p>
      </div>
    </section>
  );
}

function ProofTile({ n, name, body }: { n: string; name: string; body: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-amber-700 text-xs">#{n}</span>
        <span className="font-semibold text-neutral-900 text-sm">{name}</span>
      </div>
      <p className="text-xs text-neutral-600 leading-snug">{body}</p>
    </div>
  );
}

function ClassCard({ tier, name, color, rule, notes }: {
  tier: string; name: string; color: string; rule: string; notes: string;
}) {
  return (
    <div className="rounded-lg border-2 border-neutral-200 p-6 bg-white">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-lg`}>
          {tier}
        </div>
        <div>
          <div className="font-bold text-lg">{name}</div>
          <div className="text-xs text-neutral-500 font-mono">{rule}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-neutral-700 leading-relaxed">{notes}</p>
    </div>
  );
}

// ─── Honey by the pound — inventory ────────────────────────────────────────────

function HoneyByThePound() {
  return (
    <section id="honey" className="bg-amber-50 border-y border-amber-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          Open offering memoranda
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Datasets like real estate.
        </h2>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
          Every Honey package goes to market with an <strong>Offering Memorandum</strong> — the same way a
          national CRE broker takes a building to market. Asset class. Tenant analysis. Vintage. Market study.
          Title work. Anchored to Hedera mainnet, Merkle-rooted at the package level, fingerprinted at the pair level.
        </p>
        <p className="mt-3 text-base text-neutral-700 italic max-w-3xl">
          Like a building, you should know what you're buying before you wire the funds.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {OMS.map(om => <OMCard key={om.name} {...om} />)}
        </div>
        <p className="mt-6 text-xs text-neutral-600">
          Catalog hash <span className="font-mono">5822f146a14c537c7f8c96600414bb0bb59dde0b57e8a2c9df381e29ff116251</span> ·
          per-package Merkle proofs + per-pair fingerprints on request.
        </p>
      </div>
    </section>
  );
}

type OM = {
  name: string;
  pairs: string;
  grade: string;
  vintage: string;
  coverage: string;
  outcome: string;
  anchor: string;
};

const OMS: OM[] = [
  {
    name: "Commercial Real Estate — Capital Markets",
    pairs: "810,097",
    grade: "Honey 87.4",
    vintage: "Mar–Apr 2026",
    coverage: "Industrial STNL · Cold Storage · Multifamily · Office · 1031 Exchange · Underwriting · IC memos · Distress",
    outcome: "Atlas-class models trained on this corpus closed a real Memphis 312-unit deal — 12/12 math, correct kill decision.",
    anchor: "Hedera + Merkle root",
  },
  {
    name: "Medical",
    pairs: "418,783",
    grade: "Honey",
    vintage: "Q1 2026",
    coverage: "USMLE-step reasoning · clinical decisions · drug interactions",
    outcome: "5,021 Hedera-deeded medical batches anchored on mainnet topic 0.0.10291838.",
    anchor: "Hedera HCS · 5,021 deeded",
  },
  {
    name: "Pharma",
    pairs: "25,600",
    grade: "Honey",
    vintage: "Q1 2026",
    coverage: "Drug interactions · mechanism analysis · clinical pharmacology",
    outcome: "SwarmPharma-35B trained on this corpus (final loss 0.337, deployed).",
    anchor: "Merkle root",
  },
  {
    name: "Grants — NSF + NIH",
    pairs: "31,940",
    grade: "Honey",
    vintage: "Q1 2026",
    coverage: "NSF + NIH funded grant records · eligibility scoring · proposal drafting · agency fit",
    outcome: "Powers SwarmGrant: $99 strategy + $499 proposal GTM.",
    anchor: "Merkle root",
  },
  {
    name: "Finance — CreditSniper v1",
    pairs: "18,066",
    grade: "Royal Jelly 70%",
    vintage: "Apr 2026",
    coverage: "Consumer credit dispute drafting · debt validation · FCRA reasoning · collector defense",
    outcome: "Tribunal-vetted with 5-dim Chain-of-Thought scoring (TC: 9B+9B different-family judges).",
    anchor: "Merkle root + per-deed proof",
  },
  {
    name: "Failure Pairs",
    pairs: "rolling catalog",
    grade: "Honey",
    vintage: "rolling",
    coverage: "Production failures · error catalogs · debugging traces · negative training signal",
    outcome: "Used to harden agentic systems against the failure modes scraped data can't teach.",
    anchor: "Merkle root",
  },
];

type OMWithLink = OM & { previewHref?: string };

const OM_LINKS: Record<string, string> = {
  "Commercial Real Estate — Capital Markets": "/om/cre",
};

function OMCard({ name, pairs, grade, vintage, coverage, outcome, anchor }: OM) {
  const previewHref = OM_LINKS[name];
  return (
    <div className="rounded-lg border-2 border-neutral-900 bg-white p-6 hover:border-amber-500 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="font-bold text-lg leading-tight">{name}</div>
        <span className={`text-xs font-mono px-2 py-0.5 rounded shrink-0 ${gradeColor(grade)}`}>{grade}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 border-y border-neutral-200 py-3">
        <div>
          <div className="font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Pairs</div>
          <div className="font-mono text-neutral-900 text-sm">{pairs}</div>
        </div>
        <div>
          <div className="font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Vintage</div>
          <div className="text-neutral-900 text-sm">{vintage}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Coverage</div>
        <p className="text-sm text-neutral-700 leading-snug">{coverage}</p>
      </div>

      <div className="mt-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Outcome / proof</div>
        <p className="text-sm text-neutral-800 leading-snug font-medium">{outcome}</p>
      </div>

      <div className="mt-3 text-xs font-mono text-neutral-500">{anchor}</div>

      <div className="mt-4 flex flex-wrap gap-3 items-center">
        {previewHref && (
          <a href={previewHref}
             className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900">
            Preview the OM →
          </a>
        )}
        <a href={`mailto:build@swarmandbee.ai?subject=OM%20request%20—%20${encodeURIComponent(name)}`}
           className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-700 hover:text-neutral-900">
          {previewHref ? "Request data room" : "Request the OM"} →
        </a>
      </div>
    </div>
  );
}

function gradeColor(g: string): string {
  if (g.startsWith("Royal Jelly")) return "bg-amber-200 text-amber-900";
  if (g.startsWith("Honey")) return "bg-yellow-100 text-yellow-900";
  return "bg-neutral-200 text-neutral-700";
}

// ─── products ──────────────────────────────────────────────────────────────────

function Products() {
  return (
    <section id="products" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        Tools built on the same refinery
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Products.
      </h2>
      <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
        Each one runs the same Signal → Curate → Verticals → Ledger stack.
        Buy data. Buy tools. Buy both. Sovereign compute, sovereign settlement.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard
          name="SwarmGeo"
          tag="Live · $29 / $99"
          href="https://swarmgeo.eth.limo"
          body="AI search readiness scanner. Drop a URL → SwarmGeo Score (0–100) → site-specific code patches. The free wedge that funnels into the data refinery."
        />
        <ProductCard
          name="Atlas-70B · The Model Home"
          tag="Showings Wed May 6"
          href="/om/cre"
          body="The fully-finished reference build. Trained on Honey-CRE-Capital-Markets corpus using Cookbook Recipe #1. Walk through before you buy: Atlas closed a real 312-unit Memphis deal — 12/12 math, correct kill decision. Audit the title. Verify the proof. Take the model home with the deal: corpus + recipe + Atlas weights, free and clear, day-1 working."
        />
        <ProductCard
          name="SwarmGrant"
          tag="Beta"
          href="mailto:build@swarmandbee.ai?subject=SwarmGrant"
          body="Funding intelligence engine. NSF + NIH catalog scoring eligibility, drafting proposals, building decks. 8 skills, not a chatbot."
        />
        <ProductCard
          name="Honey Warehouse"
          tag="Inquire"
          href="mailto:build@swarmandbee.ai?subject=Honey%20Warehouse%20data%20room"
          body="Direct dataset purchase. USDC or Stripe at checkout. Per-pair receipts, per-package Merkle proofs. Verified data room shared on inquiry."
        />
      </div>
    </section>
  );
}

function ProductCard({ name, tag, href, body }: {
  name: string; tag: string; href: string; body: string;
}) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
       className="block rounded-lg border-2 border-neutral-200 bg-white p-6 hover:border-amber-500 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="font-bold text-lg">{name}</div>
        <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 whitespace-nowrap">{tag}</span>
      </div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
      <div className="mt-4 text-sm text-amber-700 font-semibold">→</div>
    </a>
  );
}

// ─── live glass walls ────────────────────────────────────────────────────────

function GlassWalls() {
  return (
    <section id="walls" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        Open-door inspection
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Five glass walls.
      </h2>
      <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        We don't explain defendability — we <strong>show</strong> it. Every transparency surface
        below is live, public, queryable. Watch the algorithm work. Recompute the proofs. Verify
        independently. <span className="italic">The process IS the product.</span>
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WallCard
          name="The Arena"
          href="/chain/"
          tag="LIVE · real-time"
          body="Live hexagonal hive. Pairs scored in real-time. Judges flanking. Deeds filing. Watch a block reach finality in 58 seconds."
        />
        <WallCard
          name="The Deed Office"
          href="/deed/"
          tag="LIVE · 8,400+ deeds"
          body="Search any deed. Inspect judge scores, reasoning, Merkle proofs. CLI terminal for power users. The county recorder's office, made queryable."
        />
        <WallCard
          name="The Refinery"
          href="/status/"
          tag="LIVE · 14/14 checks"
          body="Fleet status — every 5 minutes. Tribunal runner, deed recorder, watchdog, 3 APIs, chain. Always-on health monitoring."
        />
        <WallCard
          name="The Graph"
          href="/graph/"
          tag="LIVE · 512 nodes"
          body="Provenance graph. Trace any deed through judges, silicon, lineage. The chain of custody, made visual."
        />
        <WallCard
          name="Hedera Anchors"
          href="https://hashscan.io/#/mainnet/topic/0.0.10291838"
          external
          tag="MAINNET · topic 0.0.10291838"
          body="On-chain proof. Append-only. aBFT consensus. Verify any anchor independently — no Swarm involvement required."
        />
        <WallCard
          name="The Shop"
          href="/shop/"
          tag="LIVE · Stripe + USDC"
          body="Buy deeded datasets. Free 100-pair sample. Stripe checkout. 10 domains registered, 2 currently selling: Medical + Grants."
        />
      </div>
    </section>
  );
}

function WallCard({ name, href, tag, body, external }: {
  name: string; href: string; tag: string; body: string; external?: boolean;
}) {
  return (
    <a href={href}
       target={external ? "_blank" : undefined}
       rel={external ? "noreferrer" : undefined}
       className="block rounded-lg border-2 border-neutral-200 bg-white p-5 hover:border-amber-500 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="font-bold text-base">{name}</div>
        <span className="text-xs font-mono text-emerald-700 whitespace-nowrap">{tag}</span>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed">{body}</p>
      <div className="mt-3 text-xs font-mono text-amber-700">{href.startsWith("http") ? "↗ external" : `swarmandbee.ai${href}`}</div>
    </a>
  );
}

// ─── founder ───────────────────────────────────────────────────────────────────

function Founder() {
  return (
    <section id="founder" className="bg-neutral-50 border-y border-neutral-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          A developer, not an operator
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Donovan Mackey.
        </h2>
        <p className="mt-6 text-xl text-neutral-700 max-w-4xl leading-relaxed">
          30 years on a national CRE platform. <strong>$8 billion in closed transactions.</strong>{" "}
          Industrial single-tenant net-lease. Cold storage. Supply-chain logistics.
          Economic development.
        </p>
        <p className="mt-4 text-lg text-neutral-700 max-w-4xl leading-relaxed">
          Now developing the asset class that didn't exist yet —{" "}
          <strong>fee-simple, deed-anchored intelligence assets</strong>. Trading-developer mindset:
          we build the building, finish the model home, deed the title, close the deal. Then we
          do it again. AI shops operate. End users tenant. <em>We develop.</em>
        </p>
        <p className="mt-4 text-base text-neutral-600 italic">
          That's the moat. Models come and go. The pipeline survives every generation —
          because real estate developers know how to build.
        </p>

        <div className="mt-8 inline-block border-l-4 border-amber-500 pl-5 max-w-3xl">
          <p className="text-sm text-neutral-700 leading-relaxed">
            <strong>Genesis block</strong> <span className="font-mono text-amber-700">8f42666ef87c</span>{" "}
            — sealed 2026-03-28 23:15:20 UTC, score 85, classified Honey.
            The first titled AI data pair. Built in one 30-hour session that started with a single sentence:{" "}
            <em className="text-neutral-900">"This is like a title company. The pair is a deed."</em>
            <br /><br />
            Every architecture decision since traces back to that line. The wiki is the HOW.
            The doctrine is the WHY. The chain is the work. <strong>Defendable is the algorithm.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Atlas proof point ─────────────────────────────────────────────────────────

function AtlasProof() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        Proof of work
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">
        SwarmAtlas underwrote a real 312-unit Memphis multifamily deal.
      </h2>
      <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        12 / 12 math correct. Correct <strong>kill decision</strong>. The model wasn't trained to
        say yes — it was trained to walk away when the deal didn't pencil. That's the difference
        between a chatbot that talks deals and a colleague that closes them.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-neutral-600 bg-neutral-100 px-3 py-2 rounded">
        Hedera anchor topic <span className="text-neutral-900">0.0.10291838</span> · 101 batches · 5,021 deeds
      </div>
    </section>
  );
}

// ─── final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="bg-ink text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          AI assets. <span className="text-amber-400">Real-economy ROI.</span>
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-2xl mx-auto">
          Start with a free GEO score for your own site. Or skip ahead to the warehouse and
          inquire about packaged Honey for your model.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <a href="https://swarmgeo.eth.limo" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Free GEO Score →
          </a>
          <a href="mailto:build@swarmandbee.ai?subject=Honey%20warehouse%20inquiry"
             className="px-6 py-3 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-neutral-900 transition-colors">
            Inquire about the Warehouse
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-white font-bold text-lg">Swarm &amp; Bee</div>
          <p className="mt-2 text-xs leading-relaxed">
            Commercial Compute Intelligence Refinery.<br />
            D-U-N-S 138652395.<br />
            Florida LLC · Licensed real estate brokerage.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Contact</div>
          <ul className="space-y-1">
            <li><a href="mailto:build@swarmandbee.ai" className="hover:text-white">build@swarmandbee.ai</a></li>
            <li><a href="https://x.com/swarmandbee" target="_blank" rel="noreferrer" className="hover:text-white">X · @swarmandbee</a></li>
            <li><a href="https://github.com/SudoSuOps" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Sovereign rails</div>
          <ul className="space-y-1">
            <li>Compute · 127× RTX PRO 6000 Blackwell</li>
            <li>Settlement · USDC + Stripe</li>
            <li>Anchor · Hedera Consensus Service</li>
            <li>Naming · ENS + Hedera HBAR</li>
            <li>Storage · IPFS via Storacha</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">On-chain</div>
          <ul className="space-y-1">
            <li><span className="font-mono text-xs">swarmgeo.eth.limo</span></li>
            <li><span className="font-mono text-xs">defendable.eth.limo</span></li>
            <li><span className="font-mono text-xs">data.defendable.eth.limo</span></li>
            <li><span className="font-mono text-xs">swarmusdc.eth</span></li>
            <li>Hedera mainnet topic <span className="font-mono">0.0.10291838</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-neutral-800 flex flex-wrap justify-between gap-4 text-xs">
        <span>© 2026 Swarm &amp; Bee. Honey by the pound.</span>
        <span className="font-mono">We scale. We weigh. We ship.</span>
      </div>
    </footer>
  );
}
