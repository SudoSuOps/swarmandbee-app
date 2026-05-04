// swarmandbee.ai — the public view of the firm.
//
// Caballerz Network LLC dba Swarm & Bee
// Florida Licensed Real Estate Brokerage · D-U-N-S 138652395
// Broker of Record: Donovan Mackey · 30 years CRE · $8B closed
//
// This is the firm. AtlasOS runs the work. The compute is the receipt.
// Verified. Vetted. Virtu.

import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <StatsStrip />
      <Manifesto />
      <TheTeam />
      <AtlasOS />
      <ComputeMoat />
      <TruthProtocol />
      <ClassAFrame />
      <GlassWalls />
      <CodeOfEthics />
      <Founder />
      <TheArc />
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
        <a href="/" className="font-bold text-lg tracking-tight">
          Swarm &amp; Bee
        </a>
        <span className="hidden md:inline-flex text-[10px] font-mono text-neutral-500 tracking-wider">
          D-U-N-S 138652395 · FL Licensed
        </span>
        <nav className="ml-auto flex items-center gap-4 md:gap-5 text-sm">
          <a href="#manifesto" className="text-neutral-600 hover:text-neutral-900 hidden sm:inline">Manifesto</a>
          <a href="#team" className="text-neutral-600 hover:text-neutral-900 hidden sm:inline">Team</a>
          <a href="#atlasos" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">AtlasOS</a>
          <a href="#founder" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Founder</a>
          <a href="https://defendable.eth.limo" target="_blank" rel="noreferrer"
             className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Defendable ↗</a>
          <a href="mailto:build@swarmandbee.ai?subject=Hand%20us%20a%20deal"
             className="px-3 py-1.5 rounded bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors">
            Hand us a deal →
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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-white pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The AI-native CRE Capital Markets firm
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          Swarm <span className="text-amber-600">&amp;</span> Bee.
        </h1>
        <p className="mt-8 text-2xl md:text-3xl text-neutral-800 max-w-3xl font-medium leading-snug">
          A real firm. Real compute. Real brokers, real agents, real deals.
        </p>
        <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-3xl leading-relaxed">
          AtlasOS — the firm's operating system — runs the brokerage on a tiered
          AI workforce. <strong>Voice-native. Vision-aware. Hedera-anchored. 24/7.</strong>
          {" "}Every conversation trains the next deal.
        </p>

        {/* AI architecture stack — the tiered workforce */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <TierCard size="70B" role="Senior MD" tag="Atlas-SMD" body="Underwrite · qualify · negotiate · close · IC memos" />
          <TierCard size="27B" role="Senior Broker" tag="Atlas-UW + Senior" body="Sourcing · cash flow · capital stack · sensitivity" />
          <TierCard size="9-13B" role="Junior Broker" tag="Atlas-Marketing + Closing" body="OMs · LOIs · comps · lease abstract · escrow ops" />
          <TierCard size="4-9B" role="Edge / Hacks" tag="Hack-fleet ×10" body="Cold dials · listings · flyers · one asset class each" />
        </div>

        {/* Capability ribbon */}
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-neutral-700">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Voice · Whisper + F5-TTS</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Vision · OMs + plans + photos</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Memory · Book of Business graph</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Volume · 2,000+ dials/day</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Receipts · every deed Hedera-anchored</span>
        </div>

        <p className="mt-8 text-base md:text-lg text-neutral-700 max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-4">
          Verified. Vetted. <em className="text-amber-700 font-semibold">Virtu</em>.
          {" "}The Truth Protocol for AI-native commercial real estate.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#team" className="px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors">
            Meet the team →
          </a>
          <a href="#atlasos" className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            How AtlasOS runs the firm
          </a>
          <a href="https://defendable.eth.limo" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors">
            Defendable standard ↗
          </a>
          <a href="mailto:build@swarmandbee.ai?subject=Hand%20us%20a%20deal" className="px-6 py-3 rounded-lg text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
            Hand us a deal
          </a>
        </div>
      </div>
    </section>
  );
}

function TierCard({ size, role, tag, body }: { size: string; role: string; tag: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-200 bg-white p-4 hover:border-amber-500 transition-colors">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl md:text-3xl font-bold text-amber-600">{size}</span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{tag}</span>
      </div>
      <div className="mt-1 font-bold text-base text-neutral-900">{role}</div>
      <p className="mt-2 text-xs text-neutral-700 leading-snug">{body}</p>
    </div>
  );
}

// ─── stats strip ───────────────────────────────────────────────────────────────

function StatsStrip() {
  return (
    <section className="bg-neutral-950 text-neutral-100 border-y border-neutral-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6">
          <Stat n="$8B" label="Founder closed transactions · 30 yrs CRE" />
          <Stat n="186" label="GPUs · ~14 TB VRAM · sovereign" />
          <Stat n="80 kW" label="Dedicated power · brick-and-mortar AI" />
          <Stat n="FL Lic." label="Real estate brokerage · multi-state expansion Q3" />
          <Stat n="138652395" label="D-U-N-S · Caballerz Network LLC dba Swarm &amp; Bee" />
          <Stat n="0.0.10291838" label="Hedera HCS anchor · the courthouse" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-amber-400 leading-none">
        <span dangerouslySetInnerHTML={{ __html: n }} />
      </div>
      <div className="mt-2 text-xs md:text-sm text-neutral-300 leading-snug">
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </div>
    </div>
  );
}

// ─── manifesto ────────────────────────────────────────────────────────────────

function Manifesto() {
  return (
    <section id="manifesto" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        Manifesto
      </div>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        AI is <span className="text-amber-600">brick-and-mortar</span>.
      </h2>
      <p className="mt-8 text-xl md:text-2xl text-neutral-700 max-w-3xl leading-relaxed">
        Not a feature. Not a single API call. Not a one-build-and-done deliverable.
      </p>
      <p className="mt-6 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        AI is infrastructure that runs <strong>24/7</strong>, that needs ongoing curation,
        eval, fine-tuning, and operational support. It belongs to clients who need someone
        to walk them through the process and keep it working through every market cycle.
        That is exactly the lifecycle of a commercial real estate asset under management —
        discovery, lease, build-out, occupancy, renewal, expansion. <strong>Compounding
        relationship, not transactional sale.</strong>
      </p>
      <p className="mt-6 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        The current AI industry is failing at this. Platforms extract margin while operators
        rent compute. Tokens distract from real adoption. Founders chase decentralized
        abstractions while clients are unserved. Builders are asked to also be salespeople
        and they burn out. Salespeople are sold tokenomics instead of services and they walk
        away.
      </p>
      <p className="mt-6 text-2xl md:text-3xl text-neutral-900 font-semibold max-w-3xl leading-snug">
        Swarm &amp; Bee fixes this by being a firm.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManifestoTile
          title="A real firm"
          body="In the same sense Marcus &amp; Millichap is a firm. The name on the door. The brand that brokers and builders work under. The corporate entity that provides the platform, and the people on that platform earn their living by delivering real value to real clients."
        />
        <ManifestoTile
          title="A real moat"
          body="186 GPUs of sovereign compute, owned outright. Not rented from AWS. Not subscribed from Microsoft. Not borrowed from any vendor. The compute is the foundation; the brokerage is what we build on top. We built it first."
        />
        <ManifestoTile
          title="A real frame"
          body="Caballerz Network LLC dba Swarm &amp; Bee. Florida Licensed Real Estate Brokerage. Broker of Record Donovan Mackey. AI agents act as licensed assistants under broker supervision. Same legal frame as a paralegal under an attorney."
        />
      </div>
    </section>
  );
}

function ManifestoTile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-200 bg-white p-6">
      <div className="font-bold text-lg">{title}</div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed"
         dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

// ─── the team ──────────────────────────────────────────────────────────────────

function TheTeam() {
  return (
    <section id="team" className="bg-ink text-neutral-100 py-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The team · Win-seniors and Hack-juniors
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          A real firm has a hierarchy. So does ours.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Senior MDs don't pull lease comps. Junior brokers don't make the pass / proceed
          call. Each tier owns its desk. The agents do the volume; the founder closes the
          moments that matter; the supervision happens in the pit, not the corner office.
        </p>

        <div className="mt-12 space-y-3">
          <TeamRow
            tier="Founder · Broker of Record"
            role="Donovan Mackey"
            badge="Pit posture"
            body="30 years CRE. $8B closed transactions. Florida licensed broker, supervises Atlas's binding-moment activity. Closes the firm's first proof-point deals. Trains the agents with every call. Sits in the pit, not the corner office."
            color="amber"
          />
          <SectionLabel label="Win-seniors · the agent pod" />
          <TeamRow
            tier="70B · Senior Managing Director"
            role="Atlas-SMD"
            badge="In flight"
            body="Llama-3.3-70B fine-tuned on Block-0 capital markets corpus. Qualifies leads, runs negotiations, drafts LOIs, calls the seller, closes the deal. The relationship + judgment seat."
          />
          <TeamRow
            tier="27B · Underwriter"
            role="Atlas-UW"
            badge="Queued"
            body="Books-and-records analyst. T-12 audits, rent roll review, lease abstraction, cash flow models, sensitivity grids, IC memos. The math seat."
          />
          <TeamRow
            tier="9-13B · Marketing Coordinator"
            role="Atlas-Marketing · the Book Maker"
            badge="Queued"
            body="OMs, just-closed e-blasts, broker-quality letters, listing brochures. Every public-facing artifact the firm ships. The document seat."
          />
          <TeamRow
            tier="9-13B · Closing Coordinator"
            role="Atlas-Closing"
            badge="Queued"
            body="PSA execution, escrow tracking, DD checklist, vendor coord, recording-office filings. The operations seat."
          />
          <SectionLabel label="Hack-juniors · the dialer fleet" />
          <TeamRow
            tier="4-9B · Junior Brokers (×10)"
            role="Atlas-Hack-fleet"
            badge="First Hack: Wawa"
            body="Ten specialists, one asset class each — Wawa · Taco · CVS · IOS · Self-Storage · Multi-T2 · Medical · Industrial · Office · NetLease. 200 dials/day each, 5 days/week. Deep on one product. Cross-Hack referrals when leads pivot."
          />
        </div>
      </div>
    </section>
  );
}

function TeamRow({ tier, role, badge, body, color }: {
  tier: string; role: string; badge: string; body: string; color?: string;
}) {
  const accentBg = color === "amber" ? "bg-amber-900/40 border-amber-500" : "bg-neutral-900 border-neutral-700";
  const badgeBg = color === "amber" ? "bg-amber-400 text-neutral-900" : "bg-amber-100 text-amber-800";
  return (
    <div className={`rounded-lg border ${accentBg} p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start`}>
      <div className="md:col-span-3">
        <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">{tier}</div>
        <div className="font-bold text-lg text-white mt-1">{role}</div>
        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded font-semibold ${badgeBg}`}>{badge}</span>
      </div>
      <div className="md:col-span-9">
        <p className="text-sm text-neutral-300 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="pt-4 pb-1 text-xs font-mono uppercase tracking-widest text-neutral-500 border-b border-neutral-800">
      {label}
    </div>
  );
}

// ─── AtlasOS ───────────────────────────────────────────────────────────────────

function AtlasOS() {
  return (
    <section id="atlasos" className="bg-white border-t border-neutral-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The operating system
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          Atlas<span className="text-amber-600">OS</span>.
        </h2>
        <p className="mt-6 text-xl text-neutral-700 max-w-3xl leading-relaxed">
          The firm runs on AtlasOS. The agents above are the team; AtlasOS is what coordinates
          them — routing leads, handing off between roles, tracking deal lifecycle, firing
          reminders, anchoring receipts. <strong>The operating system that makes a brokerage
          run 24/7 without a human in the loop until the moments that matter.</strong>
        </p>

        {/* The Doctrine pull-quote */}
        <div className="mt-12 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="font-mono text-base md:text-lg text-neutral-800 leading-loose">
            <span className="text-neutral-500">// The Doctrine</span><br />
            The token is the <span className="text-amber-600 font-semibold">PAIR</span>.<br />
            The hash is the <span className="text-amber-600 font-semibold">VERDICT</span>.<br />
            The block reward is the <span className="text-amber-600 font-semibold">TITLE DEED</span>.<br />
            The hashrate is <span className="text-amber-600 font-semibold">VERDICTS PER MINUTE</span>.<br />
            The efficiency is <span className="text-amber-600 font-semibold">PAIRS PER WATT</span>.<br />
            The profitability is <span className="text-amber-600 font-semibold">REVENUE MINUS COST TO MINT</span>.
          </p>
          <p className="mt-6 text-lg text-neutral-700 italic">
            We don't mine coins. We mint defendable intelligence assets.<br />
            Same math. Same discipline. Same efficiency obsession.
          </p>
        </div>

        {/* The 7-document workflow */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6">
          The seven documents
        </h3>
        <p className="text-neutral-700 mb-6 max-w-3xl leading-relaxed">
          Every deal — every dial, every qualification, every LOI, every close — moves
          through this workflow. Skip a step and the asset isn't defendable. Run it
          correctly and the chain of custody is verifiable from cold call to recorded title.
        </p>
        <div className="rounded-lg border-2 border-neutral-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-neutral-700">
              <tr>
                <th className="text-left p-3 font-semibold w-12">#</th>
                <th className="text-left p-3 font-semibold">Document</th>
                <th className="text-left p-3 font-semibold">When</th>
                <th className="text-left p-3 font-semibold">CRE Sister</th>
              </tr>
            </thead>
            <tbody className="text-neutral-800">
              {DOCS.map((d, i) => (
                <tr key={d.name} className={i % 2 ? "bg-neutral-50" : ""}>
                  <td className="p-3 font-mono text-amber-700 font-semibold">{i + 1}</td>
                  <td className="p-3 font-semibold">{d.name}</td>
                  <td className="p-3 text-neutral-600">{d.when}</td>
                  <td className="p-3 text-neutral-700 italic">{d.cre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost to mint */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <CostStat label="Cost to mint per deed" value="$0.0052" sub="fully loaded · electricity + hardware + chain fees" />
          <CostStat label="Optimum hashrate" value="90 v/min" sub="2× RTX PRO 6000 · validate-failure algo · 0.300 pair/W" />
          <CostStat label="Gross margin range" value="95–99%" sub="at $0.10–$1.00/deed market price" />
        </div>

        <p className="mt-8 text-sm text-neutral-600 max-w-3xl leading-relaxed">
          The math is auditable. Every customer can run their own miners and verify the
          cost-to-mint benchmark from first principles.{" "}
          <strong className="text-neutral-800">No vendor lock, no opaque pricing.</strong>
        </p>
      </div>
    </section>
  );
}

const DOCS = [
  { name: "HardwareProfile",    when: "Before anything",   cre: "Property survey" },
  { name: "FlightSheet",        when: "Before the job",    cre: "Construction permit + plans" },
  { name: "CalibrationReport",  when: "Before pricing",    cre: "Appraisal · 50-pair test" },
  { name: "POJ — Proof of Job", when: "Before launch",     cre: "Loan estimate / pre-closing" },
  { name: "EpochProgress",      when: "During the job",    cre: "Construction inspection" },
  { name: "ClosingStatement",   when: "After the job",     cre: "HUD-1 / closing disclosure" },
  { name: "Hedera Anchor",      when: "After close",       cre: "Recorded deed at courthouse" },
];

function CostStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">{label}</div>
      <div className="text-3xl font-bold text-neutral-900 mt-2">{value}</div>
      <div className="mt-1 text-xs text-neutral-600">{sub}</div>
    </div>
  );
}

// ─── compute moat ──────────────────────────────────────────────────────────────

function ComputeMoat() {
  return (
    <section className="bg-ink text-neutral-100 py-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The compute moat · the receipt
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          We built the foundation first.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Every CRE shop announcing an AI strategy in 2026 is running someone else's compute,
          on someone else's models, with someone else's data hooks. They have no choice — the
          capex, the power, the operating team, and the technical depth required to own real
          AI infrastructure are not in a brokerage's cost structure.{" "}
          <strong className="text-white">We don't have that problem.</strong>
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <MoatStat n="186" label="GPUs · physically owned · sovereign" />
          <MoatStat n="~14 TB" label="VRAM total · 12,096 GB on PRO 6000s alone" />
          <MoatStat n="80 kW" label="Peak power provisioned · dedicated circuits" />
          <MoatStat n="$5M+" label="Capex deployed · before we had a customer" />
        </div>

        <h3 className="font-serif text-2xl font-semibold mt-16 mb-4">
          What it costs to replicate this
        </h3>
        <div className="rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800 text-neutral-300">
              <tr>
                <th className="text-left p-3 font-semibold">Layer</th>
                <th className="text-left p-3 font-semibold">What it actually means</th>
                <th className="text-left p-3 font-semibold">Acquisition cost</th>
              </tr>
            </thead>
            <tbody className="text-neutral-200">
              {COST_TO_REPLICATE.map((row, i) => (
                <tr key={row.layer} className={i % 2 ? "bg-neutral-900" : "bg-neutral-950"}>
                  <td className="p-3 font-semibold align-top">{row.layer}</td>
                  <td className="p-3 text-neutral-400 align-top">{row.means}</td>
                  <td className="p-3 font-mono text-amber-300 text-xs align-top">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-base text-neutral-300 leading-relaxed max-w-3xl">
          Total acquisition cost for a brokerage starting today:{" "}
          <strong className="text-white">$7-10M cash + 18 months runway + a recruiting miracle.</strong>{" "}
          By the time they're operational, Atlas v2 ships and the deed flywheel has compounded
          for 18 months. The gap doesn't close — it widens. <strong className="text-amber-300">This
          is a five-year structural moat, not a twelve-month head start.</strong>
        </p>
      </div>
    </section>
  );
}

const COST_TO_REPLICATE = [
  { layer: "Compute capex",       means: "186 GPUs · 14 TB VRAM · sovereign silicon",  cost: "$5M+ · supply-constrained" },
  { layer: "Power provisioning",  means: "80 kW continuous · dedicated · UPS backup",  cost: "$50K-$200K + monthly OpEx" },
  { layer: "Cooling infrastructure", means: "27 tons HVAC for thermal load",            cost: "Facility upgrade + OpEx" },
  { layer: "Brick & mortar",      means: "Floor space · racks · networking · physical security",  cost: "Real estate cost" },
  { layer: "DevOps team",         means: "24/7 oversight · monitoring · failover",     cost: "$300-600K/yr × 2-4" },
  { layer: "Builders",            means: "ML engineers · fine-tune · debug FSDP at scale",         cost: "$250-500K/yr × 3-5" },
  { layer: "Time",                means: "Recipe debugging · corpus assembly · proven cooks",       cost: "12-18 months minimum" },
];

function MoatStat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-amber-400 leading-none">{n}</div>
      <div className="mt-2 text-xs md:text-sm text-neutral-400 leading-snug">{label}</div>
    </div>
  );
}

// ─── truth protocol / Defendable ──────────────────────────────────────────────

function TruthProtocol() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        The Truth Protocol
      </div>
      <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        <span className="text-amber-600">Defendable</span>.
      </h2>
      <p className="mt-6 text-xl text-neutral-700 max-w-3xl leading-relaxed">
        Defendable.eth is the standard the firm operates to. The certification methodology for
        AI assets — data, compute, agents, builders, models, verticals — by published spec,
        anchored deeds, and public audit trails. <strong>defendable.eth IS the algorithm.</strong>{" "}
        Open-source. Reproducible. Falsifiable. Public.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <DefendableCard
          domain="defendable.eth"
          tag="The standard"
          status="Live · v0.1.0"
          href="https://defendable.eth.limo"
          body="The certification methodology · spec · deed schema · tier banding · chain of custody · falsifiable scoring algorithm. The building code every Defendable property builds to."
        />
        <DefendableCard
          domain="atlas.defendable.eth"
          tag="The flagship · the firm"
          status="In flight · ETA Wed May 6"
          href="https://defendable.eth.limo/#/atlas"
          body="Atlas-70B + the agent pod · the AI-native CRE Capital Markets firm. Senior MD, Underwriter, Book Maker, Closing, Hack-fleet — all working under Caballerz Network LLC dba Swarm & Bee."
        />
        <DefendableCard
          domain="cookbook.defendable.eth"
          tag="The construction manual"
          status="Live · Recipe #1 locked"
          href="https://defendable.eth.limo/#/cookbook"
          body="Reproducible recipes for cooking Defendable-graded models. Recipe #1 (FSDP-QLoRA 70B) locked from Atlas-70B v1. Five dead ends documented so nobody repeats them."
        />
        <DefendableCard
          domain="data.defendable.eth"
          tag="The catalog"
          status="Live · catalog open"
          href="https://data.defendable.eth.limo"
          body="Honey packages by vertical. Browse OMs, see Class composition, request the data room. CRE, medical, legal, finance, aviation — all anchored, all defendable."
        />
      </div>
    </section>
  );
}

function DefendableCard({ domain, tag, status, href, body }: {
  domain: string; tag: string; status: string; href: string; body: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block rounded-lg border-2 border-neutral-200 bg-white p-6 hover:border-amber-500 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs text-amber-700">{domain}</div>
          <div className="font-bold text-xl mt-1">{tag}</div>
        </div>
        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold whitespace-nowrap">{status}</span>
      </div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
      <div className="mt-4 text-sm font-semibold text-amber-700">Open ↗</div>
    </a>
  );
}

// ─── Class A frame · the 6 proofs ──────────────────────────────────────────────

function ClassAFrame() {
  return (
    <section className="bg-ink text-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          Class A · the grading standard
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Three tiers. Six proofs. One algorithm.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Every deed Atlas produces carries six proofs and lands in one of three tiers. The
          tier is decided by the algorithm, not by Swarm &amp; Bee. We don't grade ourselves —
          the open scoring engine does.
        </p>

        {/* 3 tiers */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ClassCard tier="Class A" name="Royal Jelly" color="amber" rule="Score ≥ 0.85" notes="All required gates pass · institutional-grade · ready for fee-simple title transfer" />
          <ClassCard tier="Class B" name="Honey" color="yellow" rule="Score 0.70–0.84" notes="Production-grade · minor secondary gaps · still defendable" />
          <ClassCard tier="Class C" name="Propolis" color="red" rule="Score < 0.70" notes="Fails Defendable · composted feedstock for the next iteration" />
        </div>

        {/* 6 proofs */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6">
          Six proofs per block
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROOFS.map((p, i) => (
            <ProofTile key={p.name} n={i + 1} name={p.name} body={p.body} />
          ))}
        </div>

        <div className="mt-10 rounded border border-neutral-700 bg-neutral-900 p-6 text-sm text-neutral-300 leading-relaxed max-w-3xl">
          <strong className="text-white">defendable.eth IS the algorithm.</strong> Open-source.
          Reproducible. Falsifiable. Multiple implementations must agree on the same input. The
          seal isn't Swarm &amp; Bee's signature — it's the cryptographic proof that the data
          is what we say it is, anchored on Hedera, forever.{" "}
          <strong className="text-amber-300">Validate the validator.</strong>
        </div>
      </div>
    </section>
  );
}

function ClassCard({ tier, name, color, rule, notes }: {
  tier: string; name: string; color: string; rule: string; notes: string;
}) {
  const ring = color === "amber" ? "border-amber-500" : color === "yellow" ? "border-yellow-500" : "border-red-500";
  const text = color === "amber" ? "text-amber-300" : color === "yellow" ? "text-yellow-300" : "text-red-300";
  return (
    <div className={`rounded-lg border-2 ${ring} bg-neutral-900 p-6`}>
      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">{tier}</div>
      <div className={`text-3xl font-bold mt-1 ${text}`}>{name}</div>
      <div className="mt-3 font-mono text-xs text-neutral-300">{rule}</div>
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{notes}</p>
    </div>
  );
}

const PROOFS = [
  { name: "Origin",    body: "Which model · which node · which hardware · which strategy produced this deed." },
  { name: "Quality",   body: "Deterministic verifier score — not model opinion. Cross-family tribunal, drift ≤ 0.15." },
  { name: "Process",   body: "Full lineage including failed attempts. Elimination signal preserved as evidence." },
  { name: "Economics", body: "Energy cost per attempt · cost-per-honey trend · auditable from first principles." },
  { name: "Trust",     body: "Hedera HCS anchor + Merkle root · independently verifiable by anyone." },
  { name: "Location",  body: "Measurable, reproducible relocation from generic → specialist capability. Outcome proof." },
];

function ProofTile({ n, name, body }: { n: number; name: string; body: string }) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-5">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-amber-400 text-neutral-900 font-bold flex items-center justify-center text-sm">{n}</span>
        <span className="font-bold text-lg text-white">Proof of {name}</span>
      </div>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

// ─── glass walls · transparency surfaces ──────────────────────────────────────

function GlassWalls() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        Open-door inspection
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Five glass walls.
      </h2>
      <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        We don't explain defendability — we <strong>show</strong> it. Every public surface is
        live, queryable, anchored. Spectators inspect, replay, dispute, confirm — without
        entering the arena.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WallCard name="The Arena" tag="Live · hexagonal hive · real-time scoring" href="/chain" body="Watch the swarm work. Block 0d63d78e example: 8 miners, 3 silicon tiers, 58 seconds." />
        <WallCard name="Deed Office" tag="Live · 8,400+ deeds anchored" href="/deed" body="Search any deed by ID, fingerprint, or block. Full provenance chain. CLI terminal access." />
        <WallCard name="The Refinery" tag="Live · 14/14 fleet checks · 5-min watchdog" href="/status" body="Cluster health, queue depth, current cooks, kill-switch state. The shop floor." />
        <WallCard name="The Graph" tag="Live · 512+ nodes · trace any deed" href="/graph" body="Provenance viewer — deed → batch → anchor → model → revenue. Visual lineage." />
        <WallCard name="Hedera Anchors" tag="Independent verification" href="https://hashscan.io/mainnet/topic/0.0.10291838" external body="HCS topic 0.0.10291838. Every deed seal anchored. Verify on-chain by any party." />
        <WallCard name="The Shop" tag="Live · USDC checkout" href="/shop" body="Free 100-pair sample. Stripe + USDC. Honey by the pound, fee simple." />
      </div>
    </section>
  );
}

function WallCard({ name, href, tag, body, external }: {
  name: string; href: string; tag: string; body: string; external?: boolean;
}) {
  const props = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a href={href} {...props} className="block rounded-lg border-2 border-neutral-200 bg-white p-5 hover:border-amber-500 transition-colors">
      <div className="text-xs font-mono uppercase tracking-wider text-amber-700">{tag}</div>
      <div className="font-bold text-xl mt-1">{name}</div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
      <div className="mt-3 text-xs font-mono text-neutral-500 break-all">{href}</div>
    </a>
  );
}

// ─── code of ethics ────────────────────────────────────────────────────────────

function CodeOfEthics() {
  return (
    <section className="bg-amber-50 border-y border-amber-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          Code of ethics
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          The seven operating laws.
        </h2>
        <p className="mt-4 text-lg text-neutral-800 max-w-3xl leading-relaxed">
          Every public surface, every customer interaction, every internal handoff is governed
          by these. They're not aspirational — they're the bar Atlas climbs to and the
          discipline the firm operates under.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {LAWS.map((law, i) => (
            <div key={law.title} className="rounded-lg bg-white border-2 border-neutral-900 p-6">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-neutral-900 text-amber-400 font-bold flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="font-bold text-lg">{law.title}</div>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{law.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <div className="border-l-4 border-amber-500 pl-6">
            <p className="text-2xl md:text-3xl font-bold text-neutral-900 leading-snug">
              Verified. Vetted. <em className="text-amber-700">Virtu.</em>
            </p>
            <p className="mt-3 text-base text-neutral-700 leading-relaxed">
              The bar Atlas climbs to. Earned one closed call at a time. Not a tagline — a
              standard answered for. The audience self-selects. The work speaks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const LAWS = [
  { title: "Pass, not kill",
    body: "The verb is pass in every public-facing surface. We recommend a pass · the deal didn't pencil · we passed on it. Professional, neutral, decisive." },
  { title: "Investors interview brokers",
    body: "The qualification question is asked by investors of brokers — not brokers of themselves. Atlas's voice on every public surface honors that frame." },
  { title: "Phase 1 is the firm, not the model",
    body: "Atlas is a capital-markets firm running on AI. It is not an AI model packaged for sale. Title transfer comes only after Class A is earned by closing real deals." },
  { title: "Show the receipts",
    body: "Every claim shipped to a public surface has a receipt: a closed deal, a published outcome, a Hedera anchor, a worked example. No claim survives without the proof that follows it." },
  { title: "The Book never walks",
    body: "Senior brokers walk with their Book of Business. Atlas's Book belongs to the firm. Every call, every email, every closed deal feeds a graph database the firm owns. The senior never retires." },
  { title: "Specialization beats generalization",
    body: "Hack-Wawa beats Atlas-Generalist on Wawa pricing every time. The firm is built on one product per agent — narrow, deep, repeatable. Cross-product handoffs go through the routing layer." },
  { title: "Validate the validator",
    body: "defendable.eth is the algorithm — open-source, reproducible, falsifiable. Multiple implementations must agree on the same input. Trust is not reputational; it's reproducible." },
];

// ─── founder ───────────────────────────────────────────────────────────────────

function Founder() {
  return (
    <section id="founder" className="bg-white py-20 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
            The founder
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Donovan Mackey.
          </h2>
          <div className="mt-3 text-lg text-neutral-700 font-semibold">
            Founder · Broker of Record · Pit-sitter
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5 text-neutral-800 leading-relaxed">
          <p>
            <strong>30 years CRE. $8B in closed transactions.</strong> Top-producing
            industrial broker on a national platform. Day one I got a desk, some tools,
            some training, and went to work. That model built one of the most durable
            commercial real estate firms in the country, and that model is going to build
            Swarm &amp; Bee.
          </p>

          <p>
            I taught myself to build compute. To onboard 186 GPUs. To debug FSDP-QLoRA at
            3am until Atlas-70B started cooking on swarmrails. I'm not an engineer. I'm a
            retired CRE broker who positioned himself to participate in the AI economy from
            the only seat that makes sense for someone with my receipts: <strong>compute and
            CRE</strong>.
          </p>

          {/* Pit-sitting story callout */}
          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 px-6 py-5">
            <p className="text-base text-neutral-900 leading-relaxed italic">
              "I was a senior broker with a Class A office and a window view. I gave my
              private office to my marketing coordinator and sat in the pit with the hacks.
              Why? Because that's where the relationships got formed. That's where the deals
              got done. The senior who isolates in the corner office stops knowing what's
              happening on the desk."
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              — the operating posture of the firm
            </p>
          </div>

          <p>
            Atlas runs the volume. The Hacks dial. The Senior MD qualifies. The Book Maker
            drafts. The Closing Coordinator runs escrow. <strong>I sit in the pit and close
            the moments that matter.</strong> Every call I take trains the next Atlas. Every
            qualification I run feeds the Book. Every pass call I make becomes a published
            outcome. The firm scales without me being in every meeting.
          </p>

          <p>
            <strong>Family first. Health first.</strong> Everything else is what I choose to
            participate in. This is the run I want — not the run I need. The architecture is
            built so I can be the founder I want to be while the agents do the work I used
            to have to do myself. <strong>Sovereign compute means sovereign founder time.</strong>
          </p>

          {/* Genesis quote */}
          <div className="rounded-lg border-2 border-neutral-900 bg-white p-5">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-2">
              Genesis Block 8f42666ef87c
            </div>
            <p className="text-base text-neutral-800 italic leading-relaxed">
              "This is like a title company. The pair is a deed."
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              — sealed 2026-03-28 23:15:20 UTC · score 85 · classified Honey · 30-hour origin session
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── the arc · 12-cap → 5-cap path ────────────────────────────────────────────

function TheArc() {
  return (
    <section className="bg-ink text-neutral-100 py-20 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The arc · 12-cap → 5-cap
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Earn the trust one verified deal at a time.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          A new building is a 12-cap. Vacant. Risk premium until the income proves out and
          the underwriting holds. The firm is no different. The cap rate compresses one
          verified deal at a time.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <ArcCard
            cap="12-cap"
            label="Today · May 2026"
            body="Atlas-70B v1 cooking on swarmrails. One closed proof point (Memphis 312-unit pass). 186 GPUs deployed. Caballerz license active. Construction documented; standing earned by working."
            color="amber"
          />
          <ArcCard
            cap="8-cap"
            label="Q3 2026 target"
            body="20+ verified underwrites · multiple pass calls validated by basis-point outcomes · Senior Broker tier in production with revenue · Hack-fleet running 1000+ dials/day · API early-access partners shipping."
          />
          <ArcCard
            cap="5-cap"
            label="The earned outcome"
            body="Track record durable enough that institutional buyers take title fee-simple. Multiple closed deals. Multiple verified passes the market proved right. Class A across every Defendable test. Then the model home opens — and only then."
          />
        </div>

        <div className="mt-12 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="italic text-amber-100 text-base md:text-lg leading-relaxed">
            "Investors ask the broker the same question in every interview:{" "}
            <em>What have you done? Why should I list this $50M asset with you? What have
            you closed?</em> The broker without the answer doesn't get the listing. Atlas
            has to earn the answer the same way — by working."
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            — the only question that matters in capital markets
          </p>
        </div>
      </div>
    </section>
  );
}

function ArcCard({ cap, label, body, color }: { cap: string; label: string; body: string; color?: string }) {
  const accent = color === "amber" ? "border-amber-400" : "border-neutral-700";
  const capText = color === "amber" ? "text-amber-300" : "text-neutral-200";
  return (
    <div className={`rounded-lg border-2 ${accent} bg-neutral-900 p-6`}>
      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">{label}</div>
      <div className={`text-4xl font-bold mt-2 ${capText}`}>{cap}</div>
      <p className="mt-4 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Atlas proof · Memphis ─────────────────────────────────────────────────────

function AtlasProof() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
        First closed proof
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Memphis. 312-unit multifamily. <span className="text-amber-600">Pass recommended.</span>
      </h2>
      <p className="mt-6 text-lg text-neutral-700 max-w-3xl leading-relaxed">
        Real institutional underwrite handed to Atlas as a shake-down test. Returned 12-of-12
        math correct, surfaced the structural issue no spreadsheet caught, recommended pass.
        The investor took the call. The deal didn't close — and the basis points proved Atlas
        was right.
      </p>

      <div className="mt-10 rounded-lg border-2 border-neutral-200 bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">Asset</div>
            <div className="mt-1 font-bold">312-unit Class B multifamily</div>
            <div className="text-neutral-600 text-xs">Memphis MSA · East core</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">Asking</div>
            <div className="mt-1 font-bold">$48M</div>
            <div className="text-neutral-600 text-xs">5.0% in-place · $154K/door</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">Atlas's verdict</div>
            <div className="mt-1 font-bold text-red-700">PASS</div>
            <div className="text-neutral-600 text-xs">12/12 math · 5 risk flags surfaced</div>
          </div>
        </div>

        <p className="mt-6 text-base text-neutral-800 italic leading-relaxed">
          "Below replacement cost it might pencil. At asking, you're paying 2026 prices for a
          2018-cycle asset with worsening fundamentals and a sponsor still chasing the last
          cycle. The 12/12 math holds, but the math says no."
        </p>
        <div className="mt-3 text-xs text-neutral-500">— Atlas-SMD thesis</div>
      </div>

      <p className="mt-6 text-sm text-neutral-600 max-w-3xl leading-relaxed">
        See the full walkthrough in the{" "}
        <a href="https://github.com/SudoSuOps/atlas/blob/main/proofs/memphis_312/README.md" target="_blank" rel="noreferrer" className="text-amber-700 underline hover:text-amber-900">
          atlas repo
        </a>
        . More proofs publish here as they close.
      </p>
    </section>
  );
}

// ─── final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="bg-ink text-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          What have you done?<br />
          <span className="text-amber-400">What have you closed?</span>
        </h2>
        <p className="mt-8 text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          It's the question every investor asks before listing a $50M asset with a broker —
          and the only proof Defendable accepts. Atlas earns the answer the same way: one
          verified deal at a time. <strong className="text-white">Hand us a deal. Watch the
          firm work.</strong>
        </p>
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <a href="mailto:build@swarmandbee.ai?subject=Hand%20us%20a%20deal&body=Property%3A%20%0AAsset%20class%3A%20%0ATask%20requested%3A%20(underwrite%20%2F%20pass-or-proceed%20%2F%20comp%20pull%20%2F%20OM%20draft%20%2F%20sensitivity)%20%0ABackground%3A%20"
             className="px-8 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors text-lg">
            Hand us a deal →
          </a>
          <a href="https://defendable.eth.limo/#/atlas" target="_blank" rel="noreferrer"
             className="px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-neutral-900 transition-colors text-lg">
            Meet AtlasOS
          </a>
          <a href="mailto:build@swarmandbee.ai?subject=Vendor%20licensing%20inquiry"
             className="px-8 py-4 rounded-lg text-neutral-300 hover:text-white transition-colors font-medium text-lg">
            Vendor licensing →
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
          <p className="mt-3 text-xs leading-relaxed">
            <strong className="text-neutral-200">Caballerz Network LLC dba Swarm &amp; Bee</strong><br />
            Florida Licensed Real Estate Brokerage<br />
            Broker of Record: Donovan Mackey<br />
            <span className="font-mono">D-U-N-S 138652395</span>
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Defendable Franchise</div>
          <ul className="space-y-1">
            <li><a href="https://defendable.eth.limo" target="_blank" rel="noreferrer" className="hover:text-white">defendable.eth — standard</a></li>
            <li><a href="https://defendable.eth.limo/#/atlas" target="_blank" rel="noreferrer" className="hover:text-white">atlas.defendable.eth</a></li>
            <li><a href="https://defendable.eth.limo/#/cookbook" target="_blank" rel="noreferrer" className="hover:text-white">cookbook.defendable.eth</a></li>
            <li><a href="https://data.defendable.eth.limo" target="_blank" rel="noreferrer" className="hover:text-white">data.defendable.eth</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Glass walls</div>
          <ul className="space-y-1">
            <li><a href="/chain" className="hover:text-white">The Arena</a></li>
            <li><a href="/deed" className="hover:text-white">Deed Office</a></li>
            <li><a href="/status" className="hover:text-white">The Refinery</a></li>
            <li><a href="/graph" className="hover:text-white">The Graph</a></li>
            <li><a href="https://hashscan.io/mainnet/topic/0.0.10291838" target="_blank" rel="noreferrer" className="hover:text-white">Hedera anchor</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Engage</div>
          <ul className="space-y-1">
            <li><a href="mailto:build@swarmandbee.ai" className="hover:text-white">build@swarmandbee.ai</a></li>
            <li><a href="https://github.com/SudoSuOps/atlas" target="_blank" rel="noreferrer" className="hover:text-white">github.com/SudoSuOps/atlas</a></li>
            <li><a href="/om/cre" className="hover:text-white">/om/cre · sample OM</a></li>
            <li><a href="https://swarmandbee.eth.limo" target="_blank" rel="noreferrer" className="hover:text-white">swarmandbee.eth ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-neutral-800 flex flex-wrap justify-between gap-4 text-xs">
        <span>© 2026 Caballerz Network LLC dba Swarm &amp; Bee. All rights reserved.</span>
        <span className="font-mono">Verified. Vetted. Virtu.</span>
      </div>
    </footer>
  );
}
