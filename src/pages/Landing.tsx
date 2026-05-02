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
      <ClassAFrame />
      <HoneyByThePound />
      <Products />
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
        <span className="hidden md:inline-flex text-xs text-neutral-500 font-mono">D-U-N-S 138652395</span>
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
          <span className="font-semibold">Honey by the pound.</span> Organic signal, never recycled.
          Trust. Verified. Vetted. Defendable <span className="font-semibold">Class A</span>.
          We scale. We weigh. We ship.
          <br />
          <span className="text-neutral-900 font-semibold">AI assets with real-economy ROI.</span>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#honey"
             className="px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors">
            Browse the Warehouse →
          </a>
          <a href="https://swarmgeo.eth.limo" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors">
            Free GEO Score for Your Site
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
          <Stat n="3.36M" label="Honey pairs · 12 verticals" />
          <Stat n="5,021" label="Hedera-anchored deeds" />
          <Stat n="127" label="RTX PRO 6000 Blackwell GPUs" />
          <Stat n="$8B" label="CRE transactions closed (founder)" />
          <Stat n="30 yrs" label="On a national platform" />
          <Stat n="0%" label="Recycled data" />
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
            body="127 RTX PRO 6000 Blackwell GPUs. Sovereign compute on owned hardware. Ours, not rented. The same rigs that train models cook the data."
          />
          <Pillar
            label="WEIGH"
            title="The grading"
            body="Royal Jelly Protocol RJP-1. JellyScore from 0–1. Class A / B / C banding. Tribunal of dual judges. Every pair has a deposition."
          />
          <Pillar
            label="SHIP"
            title="The delivery"
            body="Hedera Consensus Service-anchored deeds. USDC + Stripe settlement. IPFS-pinned proofs. D-U-N-S 138652395 verified delivery."
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

      <div className="mt-8 text-sm text-neutral-600 max-w-3xl">
        <strong>The 5-cap promise:</strong> every pair carries an on-chain deed (Hedera Consensus
        Service), a Merkle leaf in the package's anchor root, and a JellyScore certificate. You can
        audit any pair back to its raw signal. Provenance you can defend.
      </div>
    </section>
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
          Active inventory
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Honey by the pound.
        </h2>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
          12 verticals. 99 sale-ready packages. Every pair rolls up to a single
          Merkle root — anchored on Hedera mainnet for tamper-evident proof.
          Inquire at <a href="mailto:build@swarmandbee.ai?subject=Honey%20warehouse%20data%20room" className="text-amber-700 underline hover:text-amber-900">build@swarmandbee.ai</a> for a verified data room.
        </p>

        <div className="mt-10 rounded-lg border-2 border-neutral-900 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-white">
              <tr>
                <th className="text-left p-4 font-semibold">Vertical</th>
                <th className="text-right p-4 font-semibold">Pairs</th>
                <th className="text-left p-4 font-semibold">Top grade</th>
                <th className="text-left p-4 font-semibold">Anchor</th>
                <th className="text-right p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {VERTICALS.map((v, i) => (
                <tr key={v.name} className={i % 2 ? "bg-neutral-50" : ""}>
                  <td className="p-4 font-semibold">{v.name}</td>
                  <td className="p-4 text-right font-mono">{v.pairs}</td>
                  <td className="p-4">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${gradeColor(v.grade)}`}>
                      {v.grade}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-mono text-neutral-600">{v.anchor}</td>
                  <td className="p-4 text-right text-xs text-neutral-600">{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-neutral-600">
          Catalog hash <span className="font-mono">5822f146a14c537c7f8c96600414bb0bb59dde0b57e8a2c9df381e29ff116251</span>.
          Per-package Merkle proofs available on request.
        </p>
      </div>
    </section>
  );
}

const VERTICALS = [
  { name: "Commercial Real Estate", pairs: "810,097",     grade: "Honey 87.4",      anchor: "Merkle root + Hedera", status: "Live" },
  { name: "Medical",                pairs: "418,783",     grade: "Honey",           anchor: "Hedera HCS · 5,021 deeded", status: "Live" },
  { name: "Aviation",               pairs: "41,288",      grade: "Royal Jelly",     anchor: "OpenAlex source",      status: "Cooking" },
  { name: "Pharma",                 pairs: "25,600",      grade: "Honey",           anchor: "Merkle root",          status: "Live" },
  { name: "Grants (NSF + NIH)",     pairs: "31,940",      grade: "Honey",           anchor: "Merkle root",          status: "Live" },
  { name: "Failure Pairs",          pairs: "see catalog", grade: "Honey",           anchor: "Merkle root",          status: "Live" },
  { name: "Finance / CreditSniper", pairs: "18,066 (v1)", grade: "Royal Jelly 70%", anchor: "Merkle root",          status: "Live" },
  { name: "More verticals",         pairs: "Inquire",     grade: "—",               anchor: "—",                    status: "On request" },
];

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
          name="SwarmCore"
          tag="Live · enterprise"
          href="mailto:build@swarmandbee.ai?subject=SwarmCore"
          body="Mechanical evaluation process for AI agent systems. Five failure layers — scaffold, retrieval, memory, verifier, authority — sealed and audited."
        />
        <ProductCard
          name="SwarmGraph"
          tag="Live"
          href="https://swarmgraph.eth.limo"
          body="Deeded inventory graph. 52K nodes, 127K edges, every Honey pair traceable to its raw signal. Queryable via REST or browser."
        />
        <ProductCard
          name="SwarmAtlas"
          tag="Live · CRE"
          href="mailto:build@swarmandbee.ai?subject=SwarmAtlas"
          body="Underwriting copilot for industrial STNL, cold storage, multifamily. Underwrote a real Memphis 312-unit deal — 12/12 math, correct kill decision."
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

// ─── founder ───────────────────────────────────────────────────────────────────

function Founder() {
  return (
    <section id="founder" className="bg-neutral-50 border-y border-neutral-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The brokerage deal machine — automated
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
          The CRE vertical isn't built on theory. It's built on decades of deal-making —
          the same pipeline that closed those $8B is now refining the data that trains the next
          generation of vertical-specific AI.
        </p>
        <p className="mt-4 text-base text-neutral-600 italic">
          That's the moat. Models come and go. The pipeline survives every generation.
        </p>
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
            <li><span className="font-mono text-xs">swarmgraph.eth.limo</span></li>
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
