// swarmandbee.ai — the public view of the firm.
//
// Swarm & Bee LLC
// Florida Licensed Real Estate Brokerage · D-U-N-S 138652395 (footer only)
// Operated by designated licensed brokers · Founder: Donovan Mackey
// Family Office posture · 30 years CRE · $8B closed
//
// This is the firm. AtlasOS runs the work. The compute is the receipt.
// Verified. Vetted. Virtu.

import { Link } from "react-router-dom";
import { useState, useCallback, useEffect, type FormEvent } from "react";

// ─── modal singleton state ─────────────────────────────────────────────────────
// Lightweight global event bus so any CTA on the page can pop the modal
// without prop-drilling through 16 sections.

const MODAL_EVENT = "open-hand-us-deal-modal";
function openHandDealModal() {
  window.dispatchEvent(new CustomEvent(MODAL_EVENT));
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <StatsStrip />
      <Manifesto />
      <TheTeam />
      <Magic />
      <TheHacks />
      <TheLane />
      <AtlasOS />
      <TheMath />
      <ComputeMoat />
      <TruthProtocol />
      <AIEconomy />
      <GlassWalls />
      <CodeOfEthics />
      <Founder />
      <TheArc />
      <AtlasProof />
      <FinalCTA />
      <Footer />
      <HandUsDealModal />
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
        <nav className="ml-auto flex items-center gap-4 md:gap-5 text-sm">
          <a href="#manifesto" className="text-neutral-600 hover:text-neutral-900 hidden sm:inline">Manifesto</a>
          <a href="#team" className="text-neutral-600 hover:text-neutral-900 hidden sm:inline">Team</a>
          <a href="#magic" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">MAGIC</a>
          <a href="#hacks" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Hacks</a>
          <a href="#lane" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">The&nbsp;Lane</a>
          <a href="#atlasos" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">AtlasOS</a>
          <a href="#math" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Math</a>
          <a href="#founder" className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Founder</a>
          <a href="https://defendable.eth.limo" target="_blank" rel="noreferrer"
             className="text-neutral-600 hover:text-neutral-900 hidden md:inline">Defendable ↗</a>
          <a href="https://x.com/swarmandbee" target="_blank" rel="noreferrer"
             aria-label="Swarm & Bee on X"
             className="text-neutral-600 hover:text-neutral-900 inline-flex items-center"
             title="@swarmandbee on X">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <button onClick={openHandDealModal}
             className="px-3 py-1.5 rounded bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors">
            Hand us a deal →
          </button>
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
          <button onClick={openHandDealModal} className="px-6 py-3 rounded-lg text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
            Hand us a deal
          </button>
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
    <section className="bg-neutral-950 text-neutral-100 border-y border-neutral-800 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-8">
          The receipt — and the wave
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6">
          <Stat n="$8B" label="Founder closed transactions · 30 yrs CRE" />
          <Stat n="$20T+" label="US Commercial Real Estate · total asset class" />
          <Stat n="$1T/yr" label="US CRE transaction volume · 2024 baseline" />
          <Stat n="$800B+" label="CRE debt maturing 2024–2027 · the wall" />
          <Stat n="$1.3T" label="Gen-AI market · projected by 2032" />
          <Stat n="32×" label="AI economy growth · $40B (2022) → $1.3T (2032)" />
        </div>
        <div className="mt-8 text-[10px] text-neutral-500 font-mono leading-relaxed">
          Sources: NAIOP · MSCI Real Capital Analytics · Trepp · Mortgage Bankers Association · Bloomberg Intelligence (Jun 2023)
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
          body="National CRE has always been a firm business. The name on the door. The brand that brokers and builders work under. Corporate provides the platform, and the people on that platform earn their living delivering real value to real clients. <strong>Same hundred-year model — built for the AI wave.</strong>"
        />
        <ManifestoTile
          title="A real moat"
          body="186 GPUs of sovereign compute, owned outright. Not rented from AWS. Not subscribed from Microsoft. Not borrowed from any vendor. The compute is the foundation; the brokerage is what we build on top. <strong>We built it first.</strong>"
        />
        <ManifestoTile
          title="A real gap"
          body="The AI wave is here. CRE isn't. Phones, obsolete spreadsheets, and the dial. Junior brokers panic at the LOI handoff. Senior brokers hoard books that walk when they leave. <strong>$800B in CRE distress maturing 2024–2027 — and no AI infrastructure exists to meet it.</strong> The industry was never going to build it. We did."
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
            tier="Founder · Family Office"
            role="Donovan Mackey"
            badge="Pit posture"
            body="30 years CRE. $8B closed transactions. Founder of Swarm & Bee. Sits in the pit on the moments that matter — closes the firm's first proof-point deals, trains the agents with every call. The brokerage operates under designated licensed brokers; the firm operates under his vision."
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

// ─── MAGIC ────────────────────────────────────────────────────────────────────

function Magic() {
  return (
    <section id="magic" className="bg-amber-50 border-t border-amber-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The framework · 30-year operating doctrine
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          <span className="text-amber-600">M</span>
          <span className="text-amber-600">A</span>
          <span className="text-amber-600">G</span>
          <span className="text-amber-600">I</span>
          <span className="text-amber-600">C</span>
          <span className="text-neutral-900">.</span>
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-neutral-900 max-w-3xl font-bold leading-snug">
          Six-week event. Eat or shine.
        </p>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
          Thirty years on the desk, this was how the floor ran. The framework that compressed
          deal-making into five letters every Hack memorized before they took their first
          dial. <strong>No ideas. Just MAGIC.</strong> Now Atlas runs the same cadence — 24/7,
          across every active deal.
        </p>

        {/* The 5 letters */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-3">
          <MagicCard letter="M" word="MEETINGS" body="Atlas queries the Book → owners scored 'likely seller.' The dial list builds itself overnight." />
          <MagicCard letter="A" word="APPRAISALS" body="Auto-BOV from the comp set → 1-sheet OM. Underwrite in 30 seconds, not 8 hours." />
          <MagicCard letter="G" word="GRIND" body="Personalized outreach to every contact → blast the book. The dialer never sleeps." />
          <MagicCard letter="I" word="INK" body="LOI / PSA generated from pipeline templates → bound digitally, anchored on chain." />
          <MagicCard letter="C" word="CLOSE" body="Closing statement filed → deed anchored to Hedera. The receipt." />
        </div>

        {/* Event time + Green Jacket */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-lg border-2 border-neutral-900 bg-white p-7">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-700 mb-3">
              Event time · 6-week sprint
            </div>
            <h3 className="text-3xl font-black text-neutral-900 leading-tight">
              You couldn't hide from it.
            </h3>
            <p className="mt-4 text-base text-neutral-700 leading-relaxed">
              Six weeks, top to bottom. Every dial, every package, every pass-or-proceed
              call, every close — visible on the leaderboard, every morning, no exceptions.
              Winner takes the bucket. Last place shines shoes for a week, off the desk.
            </p>
            <p className="mt-4 text-xl font-bold text-amber-700">
              Eat or go shine.
            </p>
          </div>

          <div className="rounded-lg border-2 border-amber-500 bg-gradient-to-br from-emerald-50 to-amber-50 p-7">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 mb-3">
              The trophy · six-figure fees
            </div>
            <h3 className="text-3xl font-black text-neutral-900 leading-tight">
              The Green Jacket.
            </h3>
            <p className="mt-4 text-base text-neutral-700 leading-relaxed">
              Six-figure-fee deals earned the green. The broker who closed the most fees
              over six weeks took the jacket and the $10K bucket-list feeder for the next
              cycle. The Masters of the dial floor — every sprint, a champion.
            </p>
            <p className="mt-4 text-xl font-bold text-emerald-800">
              First place gets the jacket.
            </p>
          </div>
        </div>

        {/* The four rules block */}
        <div className="mt-12 rounded-lg bg-neutral-900 text-neutral-100 p-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-4">
            The MAGIC sprint · house rules
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 font-mono text-sm md:text-base">
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold">01</span>
              <span>Six-week sprints · the cadence of the floor</span>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold">02</span>
              <span>Winner takes the $10K bucket-list feeder</span>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold">03</span>
              <span>Last place shines shoes for the next week off the desk</span>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold">04</span>
              <span>No ideas — just MAGIC</span>
            </div>
          </div>
        </div>

        {/* Closing pull-quote */}
        <div className="mt-12 border-l-4 border-amber-500 pl-6 max-w-3xl">
          <p className="text-base md:text-lg italic text-neutral-800 leading-relaxed">
            "It was the EVENT. The framework that built $8B in closes is the framework
            Atlas runs now — six weeks, eat or shine, green jacket on the wall."
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            — Founder, Family Office · the operating doctrine of the firm
          </p>
        </div>
      </div>
    </section>
  );
}

function MagicCard({ letter, word, body }: { letter: string; word: string; body: string }) {
  return (
    <div className="rounded-lg bg-white border-2 border-neutral-900 p-5 shadow-sm">
      <div className="text-6xl font-black text-amber-600 leading-none">{letter}</div>
      <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-neutral-500">{word}</div>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
    </div>
  );
}

// ─── The Hacks · the human lineage ────────────────────────────────────────────

function TheHacks() {
  return (
    <section id="hacks" className="bg-neutral-900 text-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The human lineage · the desk before the agents
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tight">
          The <span className="text-amber-400">Hacks</span>.
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Every Hack got a name. Every Hack got a vertical. The Atlas Hack-fleet
          inherits the playbook from the original brokers who ran MAGIC on this
          desk before there were agents.
        </p>
        <p className="mt-4 text-base font-mono text-amber-400 max-w-3xl">
          // A Hack owns one asset class. A Hack dials. A Hack feeds the book.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <HackCard
            name="Elon"
            tag="Hack-DG · Dollar General · STNL"
            tagline="The DG King."
            body="Owned the Dollar General universe end-to-end — comps, owners, brokers, developers. The original Hack the Atlas-DG specialist now models. Hack-STNL-DG ships first because Elon's playbook is the playbook."
            heir="→ Atlas-Hack-STNL-DG · first to ship"
          />
          <HackCard
            name="Alec"
            tag="Hack-Auto-Stores · auto retail"
            tagline="Brought us bitcoin at $600."
            body="Walked onto the desk with two things — an auto-stores comp set, and the conviction that Bitcoin at $600 was worth a check. We wrote it. The firm's sovereign-settlement DNA traces directly to that conversation."
            heir="→ Atlas-Hack-Auto-Retail · queued"
          />
          <HackCard
            name="AJ"
            tag="Hack-QSR · quick-service restaurants"
            tagline="The QSR specialist."
            body="QSR comps, ground-lease structures, brand pipelines, drive-thru cap rates. Could read a fast-food site lease line by line and price a 5-mile co-tenancy clause."
            heir="→ Atlas-Hack-QSR · queued"
          />
          <HackCard
            name="Harvey"
            tag="Hack-Entertainment · movie centers · Regal"
            tagline="300 dials a day."
            body="The best dialer ever made. Couldn't close — but could dial. And in MAGIC, that's a green jacket of its own: the funnel builder. The prototype for the Atlas Hack-fleet thesis — agents that don't close, agents that feed the book."
            heir="→ The Hack-fleet thesis · pure dialers, 24/7"
          />
        </div>

        {/* The Harvey doctrine pull-quote */}
        <div className="mt-12 rounded-lg border-2 border-amber-400 bg-neutral-800 p-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            The Harvey doctrine
          </div>
          <p className="text-lg text-white leading-relaxed">
            <strong>Closing isn't the only way to earn.</strong> Pure dial volume builds
            the book that everyone else closes against. The Atlas Hack-fleet was designed
            to this thesis: ten specialists, one asset class each, all dialing — feeding
            the SMD with qualified deals around the clock. Harvey could not close, but he
            built the book that did. Atlas Hacks dial 24/7.
          </p>
        </div>

        {/* Closing pull-quote */}
        <div className="mt-12 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="text-base md:text-lg italic text-neutral-200 leading-relaxed">
            "Every Hack got a name and a vertical. Atlas Hack-fleet works the same way —
            ten specialists, one asset class each, one dial-list each. The script doesn't
            change. The compute does."
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            — Founder · Family Office
          </p>
        </div>
      </div>
    </section>
  );
}

function HackCard({ name, tag, tagline, body, heir }: {
  name: string; tag: string; tagline: string; body: string; heir: string;
}) {
  return (
    <div className="rounded-lg border-2 border-neutral-700 bg-neutral-800/50 p-6 hover:border-amber-400 transition-colors">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h3 className="text-3xl font-black text-amber-400">{name}</h3>
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">{tag}</span>
      </div>
      <p className="mt-2 text-base font-bold text-white">{tagline}</p>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
      <p className="mt-4 text-[11px] font-mono text-amber-400 uppercase tracking-widest">{heir}</p>
    </div>
  );
}

// ─── The Lane · STNL · Hack Heaven ────────────────────────────────────────────

function TheLane() {
  return (
    <section id="lane" className="bg-gradient-to-br from-amber-50 to-white border-t border-amber-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The lane · where AI wins · STNL · $1M – $5M
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          Hack <span className="text-amber-600">Heaven</span>.
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-neutral-900 max-w-3xl font-bold leading-snug">
          No tours. No drywall. No site visits.
        </p>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
          Single-Tenant Net Lease (STNL) is the asset class AI was built for. The deal
          underwrites on three vectors — <strong>tenant. credit. terms.</strong> Everything
          you need is in the document. The Hacks dial. The Senior MD underwrites. No one
          ever drives to the property.
        </p>

        {/* The lane stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <LaneStat
            number="80%"
            label="of CRE deals"
            body="$1M – $5M is where the volume lives. Not trophy assets — the deal-count belly of the market."
          />
          <LaneStat
            number="70%"
            label="of $2M – $5M buyers"
            body="…are 1031 exchange buyers. 45-day ID clock · 180-day close. Motivated. On a deadline. Hunting replacement property."
          />
          <LaneStat
            number="$2 – $5M"
            label="the sweet spot"
            body="Dial-friendly. Data-rich. Tour-free. The deal size where AI compresses a 90-day cycle to 30."
          />
        </div>

        {/* Why STNL is the AI lane */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900">
            Why STNL is where AI wins.
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <ReasonCard
              num="01"
              title="No tours required"
              body="The deal closes on the lease and the credit, not on a walk-through. Atlas underwrites from the OM, the lease abstract, and the credit profile alone. Brokers don't drive 200 miles to see a Dollar General."
            />
            <ReasonCard
              num="02"
              title="Pure-data underwriting"
              body="Three vectors: tenant credit (BBB / IG / sub-IG), lease term remaining (10-yr+ NNN gold standard), cap rate vs. comps. Atlas reads all three faster and more consistently than any human pencil."
            />
            <ReasonCard
              num="03"
              title="Motivated counterparties"
              body="1031 buyers don't browse — they hunt with a clock. The Hack who calls them with the right deal at the right cap rate at the right moment closes. Speed wins. Atlas runs at machine speed."
            />
          </div>
        </div>

        {/* Tie back to the Hacks · why DG ships first */}
        <div className="mt-16 rounded-lg bg-neutral-900 text-neutral-100 p-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            Why Hack-STNL-DG ships first
          </div>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Dollar General has <strong>~19,000 stores</strong>, ~80% leased to third-party
            owners, mostly in the $1M-$3M deal lane. Most-traded credit-tenant net lease
            asset class in CRE — standardized 15-year NNN, BBB credit, narrow cap-rate
            band. <strong className="text-amber-400">Elon's playbook, Atlas's compute, the
            lane where AI dominates.</strong> First Hack to ship. Everything that worked
            for the original Hack-DG works at machine scale.
          </p>
        </div>

        {/* Closing pull-quote */}
        <div className="mt-12 border-l-4 border-amber-500 pl-6 max-w-3xl">
          <p className="text-base md:text-lg italic text-neutral-800 leading-relaxed">
            "STNL is tenant, credit, terms. No drywall. No tours. The Hacks dial. The
            Senior MD underwrites. The 1031 buyer signs. Everyone home for dinner."
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            — Founder · Family Office · 30 years in the lane
          </p>
        </div>
      </div>
    </section>
  );
}

function LaneStat({ number, label, body }: { number: string; label: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-900 bg-white p-6">
      <div className="text-5xl md:text-6xl font-black text-amber-600 leading-none">{number}</div>
      <div className="mt-2 text-xs font-mono uppercase tracking-widest text-neutral-500">{label}</div>
      <p className="mt-4 text-sm text-neutral-700 leading-relaxed">{body}</p>
    </div>
  );
}

function ReasonCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-900 bg-white p-6">
      <div className="text-xs font-mono text-amber-700 font-bold tracking-widest">{num}</div>
      <h4 className="mt-2 text-xl font-bold text-neutral-900">{title}</h4>
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{body}</p>
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
            The dial is the <span className="text-amber-600 font-semibold">SIGNAL</span>.<br />
            The call is the <span className="text-amber-600 font-semibold">QUALIFICATION</span>.<br />
            The LOI is the <span className="text-amber-600 font-semibold">BIND</span>.<br />
            The close is the <span className="text-amber-600 font-semibold">RECEIPT</span>.<br />
            The Book is the <span className="text-amber-600 font-semibold">MOAT</span>.<br />
            The Hedera anchor is the <span className="text-amber-600 font-semibold">COURTHOUSE</span>.
          </p>
          <p className="mt-6 text-lg text-neutral-700 italic">
            We don't sell tools to brokers. We are the brokerage.<br />
            Same discipline. Same audit trail. Same compounding moat.
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

        <p className="mt-8 text-sm text-neutral-600 max-w-3xl leading-relaxed">
          Auditable economics. Every output carries a Hedera receipt. Every conversation
          feeds the Book. The firm scales without a human in the loop until the moments
          that matter — and those moments are signed by a designated licensed broker.
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


// ─── The Math · unit economics ────────────────────────────────────────────────

function TheMath() {
  return (
    <section id="math" className="bg-neutral-950 text-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          Unit economics · the numbers don't lie
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          The <span className="text-amber-400">Math</span>.
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-white max-w-3xl font-bold leading-snug">
          One desk. One hundred deals. Electrons, not overhead.
        </p>
        <p className="mt-4 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          A $3M STNL deal pays a 3% commission — $90K gross. Here's where it goes
          on a traditional desk, and here's what happens when a 186-GPU desk runs
          the same play at 1%.
        </p>

        {/* Traditional desk math */}
        <div className="mt-12">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Traditional brokerage · 1 deal · $3M · 3% fee
          </div>
          <div className="rounded-lg border-2 border-neutral-700 bg-neutral-900 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SplitTile
                label="Gross commission"
                value="$90,000"
                detail="3% of $3M deal"
                color="white"
              />
              <SplitTile
                label="After SR / Hack split"
                value="$45K · $45K"
                detail="Senior + Hack 50 / 50"
                color="white"
              />
              <SplitTile
                label="After house split"
                value="$29.25K · $22.5K"
                detail="SR 65/35 · Hack 50/50 with house"
                color="amber"
              />
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <p className="text-sm text-neutral-300 leading-relaxed">
                <strong className="text-white">Hack takes home $22,500.</strong> Five deals
                a year and the Hack eats six figures. <strong className="text-white">Senior
                takes home $29,250</strong> — but the Senior runs a team: bookmaker,
                underwriter, closing coordinator, all salaried at ~$60K each plus bonus.
                <strong className="text-amber-400"> Senior overhead: ~$180K base before
                deal one.</strong> The Senior needs 20+ deals to print net.
              </p>
            </div>
          </div>
        </div>

        {/* The pivot */}
        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-400" />
          <p className="text-[11px] md:text-sm font-mono uppercase tracking-widest text-amber-400 whitespace-nowrap">
            Now run the same play at machine scale
          </p>
          <div className="h-px flex-1 bg-amber-400" />
        </div>

        {/* Atlas brokerage math */}
        <div className="mt-14">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            Atlas brokerage · 100 deals/yr · $3M avg · 1% fee
          </div>
          <div className="rounded-lg border-2 border-amber-400 bg-gradient-to-br from-amber-950/40 to-neutral-900 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SplitTile
                label="Gross revenue"
                value="$3,000,000"
                detail="100 × $30K (1% of $3M)"
                color="amber"
              />
              <SplitTile
                label="Operating cost (est.)"
                value="~$400,000"
                detail="Energy + thin bench + cloud"
                color="white"
              />
              <SplitTile
                label="Net margin (est.)"
                value="~$2.6M"
                detail="~87% net at target volume"
                color="amber"
              />
            </div>
            <div className="mt-6 pt-6 border-t border-amber-800/50">
              <p className="text-sm text-neutral-200 leading-relaxed">
                No SR / Hack split. No house split. No team salaries. Atlas IS the team.
                The marginal cost of the next deal is the electrons it takes to run the
                pipeline — energy, compute on already-owned GPUs, Hedera anchoring at
                fractions of a cent, and a thin human bench (designated broker, ops, QA).
                <strong className="text-amber-400"> The model holds the line at 1% fee
                because the cost stack is electrons, not headcount.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* The unlock */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white">The structural unlock.</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <UnlockCard
              num="01"
              title="1% beats 3%"
              body="Atlas charges 1/3 the fee and still prints ~87% margin. Traditional brokerages can't compete on price without going underwater on team overhead — the salaries are fixed, the splits aren't optional."
            />
            <UnlockCard
              num="02"
              title="Sub-$2M becomes profitable"
              body="A $1M deal at 1% = $10K gross — Atlas still nets it. Traditional desks lose money on $1M deals: too much human labor per dollar of fee. Atlas opens a TAM that humans cannot service."
            />
            <UnlockCard
              num="03"
              title="The flywheel compounds"
              body="Every closed deal feeds the Book. Every deed Hedera-anchors. Every audit pass extends the V/V/V record. The margin isn't the moat — the deed flywheel is. Margin funds the next sprint of compute and corpus build."
            />
          </div>
        </div>

        {/* Closing pull-quote */}
        <div className="mt-14 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="text-base md:text-lg italic text-white leading-relaxed">
            "The traditional desk needs 20 deals to feed the Senior and 5 to feed the
            Hack. The AI desk does 100 at 1% and the cost is electrons. The math is
            the argument."
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            — Founder · Family Office · the operating thesis of the firm
          </p>
        </div>

        {/* Honest disclosure */}
        <div className="mt-10 max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Honest disclosure
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Operating-cost figures are estimates at target run-rate volume — energy
            assumes ~50% GPU utilization at Florida industrial rates; human bench
            sized for one designated broker plus ops/QA. Voice stack and E&O insurance
            not yet itemized. Forward-looking projection, not a current P&L.
          </p>
        </div>
      </div>
    </section>
  );
}

function SplitTile({ label, value, detail, color }: { label: string; value: string; detail: string; color: "white" | "amber" }) {
  const valueColor = color === "amber" ? "text-amber-400" : "text-white";
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">{label}</div>
      <div className={`mt-2 text-2xl md:text-3xl font-black ${valueColor}`}>{value}</div>
      <div className="mt-1 text-xs text-neutral-400">{detail}</div>
    </div>
  );
}

function UnlockCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-800 bg-neutral-900 p-5">
      <div className="text-[11px] font-mono text-amber-400 font-bold tracking-widest">{num}</div>
      <h4 className="mt-2 text-lg font-bold text-white">{title}</h4>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
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
          body="Atlas-70B + the agent pod · the AI-native CRE Capital Markets firm. Senior MD, Underwriter, Book Maker, Closing, Hack-fleet — all working under Swarm & Bee LLC."
        />
        <DefendableCard
          domain="cookbook.defendable.eth"
          tag="The construction manual"
          status="Live · Recipe #1 locked"
          href="https://defendable.eth.limo/#/cookbook"
          body="Reproducible recipes for cooking Defendable-graded models. Recipe #1 (FSDP-QLoRA 70B) locked from Atlas-70B v1. Five dead ends documented so nobody repeats them."
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

// ─── AI economy · the why ──────────────────────────────────────────────────────

function AIEconomy() {
  return (
    <section className="bg-ink text-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The AI economy
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          The front door is changing.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Every workflow that runs on phone calls, spreadsheets, and relationships is being
          rebuilt with AI. CRE — the most relationship-heavy, document-heavy, conversation-
          heavy industry on earth — is in the path.{" "}
          <strong className="text-white">The firm that owns the new front door wins the next decade.</strong>
        </p>

        {/* growth projections */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6">
          Growth projections — the wave size
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <EconTile n="$1.3T" label="Gen-AI market by 2032 · Bloomberg Intelligence" />
          <EconTile n="$4.4T" label="Annual gen-AI productivity uplift · McKinsey" />
          <EconTile n="$200B+" label="AI infra spending baseline · 2025+ industry estimates" />
          <EconTile n="75%" label="Enterprise AI adoption target by 2026 · Gartner" />
          <EconTile n="30×" label="AI compute scale-up since 2020 · Stanford AI Index" />
          <EconTile n="0" label="AI-native CRE firms operating before us" highlight />
        </div>

        {/* CRE before / after */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6">
          What's in the path · CRE before vs CRE on AI rails
        </h3>
        <div className="rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800 text-neutral-300">
              <tr>
                <th className="text-left p-3 font-semibold w-1/2">CRE today · 2025-era workflow</th>
                <th className="text-left p-3 font-semibold">CRE on AI rails · what Atlas does</th>
              </tr>
            </thead>
            <tbody className="text-neutral-200">
              {ECON_DELTAS.map((row, i) => (
                <tr key={row.before} className={i % 2 ? "bg-neutral-900" : "bg-neutral-950"}>
                  <td className="p-3 align-top text-neutral-400">{row.before}</td>
                  <td className="p-3 align-top font-mono text-amber-300">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* market reality bullets */}
        <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-16 mb-6">
          Market reality
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MARKET_REALITY.map((item) => (
            <div key={item.headline} className="rounded-lg border border-neutral-700 bg-neutral-900 p-5">
              <div className="text-xl font-bold text-amber-300">{item.headline}</div>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* closing — why us */}
        <div className="mt-12 border-l-4 border-amber-400 pl-6 max-w-3xl">
          <p className="text-base md:text-lg italic text-amber-100 leading-relaxed">
            CRE has been waiting for someone to build the rails. The industry can't build them
            itself — the capex, the talent, the technical depth aren't in a brokerage's cost
            structure. <strong className="not-italic text-white">We built them first.</strong>
          </p>
          <p className="mt-3 text-sm text-neutral-400">
            See the Compute Moat above for what it costs to replicate.
          </p>
        </div>
      </div>
    </section>
  );
}

const ECON_DELTAS = [
  { before: "Underwrite a deal in 8 hours of analyst time", after: "30 seconds — sensitivity grids included" },
  { before: "Draft an LOI in half a day with senior-broker handoff",  after: "60 seconds — derived from the qualified call" },
  { before: "Pull a comp set in 2-3 days across teams",                after: "15 seconds — weighted, normalized, ranked" },
  { before: "Dial coverage 9-5 by junior brokers, one asset class",    after: "24/7 across 10 asset-class specialists" },
  { before: "Senior broker book walks at exit · the firm loses the moat", after: "Compounds in firm-owned graph · the senior never retires" },
  { before: "Verbal handshake on terms · lawyer-disputable",           after: "Hedera-anchored binding LOI · cryptographically provable" },
  { before: "$48M deal underwrite costs the firm $30K in labor",       after: "Same underwrite costs $0.0052 in compute" },
];

const MARKET_REALITY = [
  {
    headline: "$20T US asset class",
    body: "Commercial real estate is the largest privately-owned asset class on the planet. The volume is enormous. The workflow has barely changed in 30 years.",
  },
  {
    headline: "$800B in distress, 2024-2027",
    body: "The CRE debt wall is here. Office, multifamily, hospitality, retail — refinancing windows closing into a higher-rate environment with no AI infrastructure to triage at scale.",
  },
  {
    headline: "50,000+ licensed brokers, no AI tooling",
    body: "Most run on phones, spreadsheets, and the dial. The technology stack is the same it was in 2005. The labor model breaks long before AI arrives — burnout, attrition, knowledge walking with senior brokers at retirement.",
  },
  {
    headline: "Senior brokers aging out",
    body: "30-year veterans retiring. Their books — counterparty intel, deal patterns, market history — leave the firm with them. Industry-wide knowledge drain with no replacement pipeline.",
  },
  {
    headline: "AI-to-AI deal flow is legal today",
    body: "UETA + ESIGN authorize electronic agents to bind contracts on behalf of principals. The infrastructure to support AI-to-AI CRE transactions exists. Nobody's built the rails. Until us.",
  },
  {
    headline: "Vendor lane is wide open",
    body: "Every brokerage will need AI rails by 2027. None can build them in time. The firm that ships first becomes the standard the industry licenses — not a competitor, the foundation.",
  },
];

function EconTile({ n, label, highlight }: { n: string; label: string; highlight?: boolean }) {
  const ring = highlight ? "border-amber-400 bg-amber-900/30" : "border-neutral-700 bg-neutral-900";
  const text = highlight ? "text-amber-300" : "text-amber-400";
  return (
    <div className={`rounded-lg border ${ring} p-5`}>
      <div className={`text-3xl md:text-4xl font-bold leading-none ${text}`}>{n}</div>
      <div className="mt-2 text-xs md:text-sm text-neutral-300 leading-snug">{label}</div>
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
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-4">
          The founder
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Donovan Mackey.
        </h2>
        <div className="mt-3 text-lg text-neutral-700 font-semibold">
          Founder · Family Office · Pit-sitter
        </div>

        <div className="mt-10 space-y-5 text-neutral-800 leading-relaxed">
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
            CRE</strong>. The firm operates as a family office — designated licensed brokers
            handle binding regulated activity; I sit at the strategy + capital + culture seat.
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

          {/* Founder closing quote */}
          <div className="rounded-lg border-2 border-neutral-900 bg-white p-5">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-2">
              Operating posture
            </div>
            <p className="text-base text-neutral-800 italic leading-relaxed">
              "AI is brick-and-mortar. We don't sell tools to brokers — we are the brokerage. Same hundred-year model, built for the AI wave."
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              — Donovan Mackey · Founder · Family Office · Pit-sitter
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
            body="Atlas-70B v1 cooking on swarmrails. One closed proof point (Memphis 312-unit pass). 186 GPUs deployed. Brokerage license active. Construction documented; standing earned by working."
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
          <button onClick={openHandDealModal}
             className="px-8 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors text-lg">
            Hand us a deal →
          </button>
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
            <strong className="text-neutral-200">Swarm &amp; Bee LLC</strong><br />
            Florida Licensed Real Estate Brokerage<br />
            Operated by designated licensed brokers<br />
            Founder: Donovan Mackey · Family Office<br />
            <span className="font-mono">D-U-N-S 138652395</span>
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-2">Defendable Franchise</div>
          <ul className="space-y-1">
            <li><a href="https://defendable.eth.limo" target="_blank" rel="noreferrer" className="hover:text-white">defendable.eth — standard</a></li>
            <li><a href="https://defendable.eth.limo/#/atlas" target="_blank" rel="noreferrer" className="hover:text-white">atlas.defendable.eth</a></li>
            <li><a href="https://defendable.eth.limo/#/cookbook" target="_blank" rel="noreferrer" className="hover:text-white">cookbook.defendable.eth</a></li>
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
            <li><a href="https://swarmandbee.eth.limo" target="_blank" rel="noreferrer" className="hover:text-white">swarmandbee.eth ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-neutral-800 flex flex-wrap justify-between gap-4 text-xs">
        <span>© 2026 Swarm &amp; Bee LLC. All rights reserved.</span>
        <span className="font-mono">Verified. Vetted. Virtu.</span>
      </div>
    </footer>
  );
}

// ─── Hand us a deal · modal form ──────────────────────────────────────────────

const ASSET_CLASSES = [
  "Multifamily",
  "NNN Retail (Wawa, CVS, dollar stores, QSR)",
  "Industrial / Light Industrial",
  "Industrial Outdoor Storage (IOS)",
  "Self-Storage",
  "Medical Office",
  "Office",
  "Hospitality",
  "Net Lease (other)",
  "Mixed-use / Other",
];

const TASKS = [
  "Underwrite — full IC-grade memo",
  "Pass / proceed call",
  "Comp pull (sales + lease)",
  "OM draft (we rep the seller)",
  "Sensitivity sweep",
  "Capital stack analysis",
  "Other (describe in background)",
];

type ModalState =
  | { kind: "closed" }
  | { kind: "open" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function HandUsDealModal() {
  const [state, setState] = useState<ModalState>({ kind: "closed" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    property: "",
    assetClass: "",
    task: "",
    background: "",
    website: "", // honeypot
  });

  // Listen for the global open event
  useEffect(() => {
    const handler = () => setState({ kind: "open" });
    window.addEventListener(MODAL_EVENT, handler);
    return () => window.removeEventListener(MODAL_EVENT, handler);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    const isOpen = state.kind === "open" || state.kind === "submitting" || state.kind === "success" || state.kind === "error";
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [state.kind]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.kind !== "closed") setState({ kind: "closed" });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state.kind]);

  const close = useCallback(() => {
    setState({ kind: "closed" });
    // Reset form on close after success
    if (state.kind === "success") {
      setForm({ name: "", email: "", company: "", phone: "", property: "", assetClass: "", task: "", background: "", website: "" });
    }
  }, [state.kind]);

  const submit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setState({ kind: "submitting" });

    try {
      const resp = await fetch("/api/hand-us-a-deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json().catch(() => ({ ok: false, error: "Bad response" }));

      if (!resp.ok || !data.ok) {
        setState({ kind: "error", message: data.error || `Server returned ${resp.status}` });
        return;
      }

      setState({ kind: "success" });
    } catch (err) {
      setState({ kind: "error", message: "Network error — please try again or email build@swarmandbee.ai directly." });
    }
  }, [form]);

  if (state.kind === "closed") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-900/70 backdrop-blur-sm overflow-y-auto"
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl my-8 mx-4 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {state.kind === "success" ? (
          // SUCCESS STATE
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
            <h3 className="mt-6 text-2xl font-bold tracking-tight">Deal received.</h3>
            <p className="mt-3 text-neutral-700 max-w-md mx-auto leading-relaxed">
              Thank you. We'll be in touch within 24 hours. Atlas reviews every submission;
              the seat that calls back depends on the work requested.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              <em>Verified. Vetted. Virtu.</em>
            </p>
            <button
              onClick={close}
              className="mt-8 px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // FORM STATE
          <form onSubmit={submit} className="p-6 md:p-10">
            <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-2">
              Hand us a deal
            </div>
            <h3 className="text-3xl font-bold tracking-tight">Atlas takes the work.</h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              Underwrite. Pass-or-proceed. Comp pull. OM draft. Sensitivity sweep.
              We respond within 24 hours. <strong>Hand us a real deal — we publish the result.</strong>
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" required>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  maxLength={200}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  maxLength={200}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  maxLength={50}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Property / Deal" required help="Address or one-line descriptor">
                <input
                  type="text"
                  required
                  maxLength={500}
                  placeholder="e.g. 312-unit MF · Memphis MSA · $48M asking"
                  value={form.property}
                  onChange={(e) => setForm({ ...form, property: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Asset class">
                <select
                  value={form.assetClass}
                  onChange={(e) => setForm({ ...form, assetClass: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Select...</option>
                  {ASSET_CLASSES.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </Field>
              <Field label="Task" required>
                <select
                  required
                  value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Select...</option>
                  {TASKS.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Background / context" help="What's the deal? Timing? Mandate? Anything Atlas should know.">
                <textarea
                  rows={4}
                  maxLength={5000}
                  value={form.background}
                  onChange={(e) => setForm({ ...form, background: e.target.value })}
                  className={inputCls + " resize-y"}
                />
              </Field>
            </div>

            {/* Honeypot — hidden from users, bots fill it */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="absolute left-[-9999px] w-px h-px opacity-0"
              aria-hidden="true"
            />

            {state.kind === "error" && (
              <div className="mt-4 rounded-lg border-2 border-red-300 bg-red-50 p-3 text-sm text-red-900">
                {state.message}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={state.kind === "submitting"}
                className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-wait"
              >
                {state.kind === "submitting" ? "Sending..." : "Submit deal →"}
              </button>
              <button
                type="button"
                onClick={close}
                className="px-6 py-3 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <span className="text-xs text-neutral-500 ml-auto">
                Submissions go to <span className="font-mono">build@swarmandbee.ai</span>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white";

function Field({ label, required, help, children }: { label: string; required?: boolean; help?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
        {label}{required && <span className="text-amber-700 ml-1">*</span>}
      </div>
      {help && <div className="text-xs text-neutral-500 mt-0.5">{help}</div>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
