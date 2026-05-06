// aiov.swarmandbee.ai · The AI Opinion of Value · pre-broker valuation product
// Hostname-aware route: window.location.hostname.startsWith("aiov.")

const DISCORD_INVITE = "https://discord.gg/buUjYgzP5m";
const APEX = "https://swarmandbee.ai";
const HACKERPRO = "https://hackerpro.eth.link";
const ATLAS_REPO = "https://github.com/SudoSuOps/atlasOS";

export default function Aiov() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <AiovHeader />
      <AiovHero />
      <Asymmetry />
      <HowItWorks />
      <Privacy />
      <Comparison />
      <Receipt />
      <Pricing />
      <TheBox />
      <CookShop />
      <AiovCTA />
      <AiovFooter />
    </div>
  );
}

function AiovHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={APEX} className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors">
          ← Swarm &amp; Bee
        </a>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:text-amber-300">
            Discord ↗
          </a>
          <span className="font-mono text-neutral-500 hidden sm:inline">aiov.eth</span>
        </div>
      </div>
    </header>
  );
}

function AiovHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-neutral-950 to-emerald-950/20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The AI Opinion of Value · pre-broker · sovereign · receipts on chain
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.95]">
          <span className="text-amber-400">AIOV</span>
        </h1>
        <p className="mt-8 text-2xl md:text-3xl text-white max-w-3xl font-bold leading-snug">
          Get a defensible value before you call a broker.
        </p>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Thirty minutes. Five hundred dollars. Zero market exposure. The killer pre-broker product
          for family offices and institutional sellers — <strong className="text-amber-400">we can't see your deal even if we wanted to.</strong> Architecture, not policy.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl">
          <div>
            <div className="text-3xl font-black text-amber-400">30 min</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">turnaround</div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400">$499</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">per deal</div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400">0</div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-1">market exposure</div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={HACKERPRO} target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Order HACKER-PRO →
          </a>
          <a href="#how-it-works"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            How it works
          </a>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-300 font-semibold hover:border-amber-400 transition-colors">
            🐝 Discord
          </a>
        </div>
      </div>
    </section>
  );
}

function Asymmetry() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The asymmetry · what a BOV costs you
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          A Broker Opinion of Value is "free" because it costs you the listing.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          The first broker who runs a BOV thinks they have your business. The first appraiser may leak
          your comps. The first listing teaser is indexed by every data platform within an hour.
          <strong className="text-amber-400"> Once the market knows you're thinking about it, the leverage shifts before you've decided anything.</strong>
        </p>
        <p className="mt-4 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Family offices have lived with this asymmetry for thirty years.
          <em className="text-white"> How do I know what I have without telling everyone I might sell?</em>
        </p>
        <p className="mt-6 text-xl text-white font-bold">
          AIOV is what comes before any of that.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Drop your documents",
      body: "Rent roll · T-12 · lease · ESA — whatever you have. Files go to your HACKER-PRO box. They never touch a cloud." },
    { num: "02", title: "Local parse, locked numbers",
      body: "Granite Docling reads every page on your hardware. Every cap rate, lease term, escalation, tenant credit — structured and locked before anything moves." },
    { num: "03", title: "Encrypted brief to Atlas-70B",
      body: "A small encrypted JSON travels to Atlas-70B in an ephemeral container. No persistent storage. No analyst sees it. No support tech sees it." },
    { num: "04", title: "Encrypted return, on-box render",
      body: "The result comes back encrypted to your wallet only. Your HACKER-PRO renders the AIOV report locally. Stays on your disk." },
    { num: "05", title: "Receipt anchored on Hedera",
      body: "Session metadata posts to aiov.defendable.eth. Counsel can prove the work was done — without ever seeing what was done." },
  ];
  return (
    <section id="how-it-works" className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          How it works · five steps
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Drop the docs. Read the report.
        </h2>
        <div className="mt-10 space-y-4">
          {steps.map((s) => (
            <div key={s.num} className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 flex gap-6">
              <div className="text-3xl font-black text-amber-400 shrink-0 font-mono">{s.num}</div>
              <div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const claims = [
    "The PDFs never leave your office hardware. Local parsing on your HACKER-PRO. No cloud upload.",
    "The encrypted brief uses a one-time session key. The key is generated on your box · we never hold it.",
    "Atlas-70B runs in a TPM-attested ephemeral container. No persistent volumes. No writable disk. The container is destroyed on response.",
    "The return is encrypted to your wallet. Only your <name>.atlasos.eth wallet can decrypt.",
    "Hedera anchors metadata only. Session ID, timestamps, request size, container attestation — never deal data, address, tenant, or financials.",
  ];
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The privacy architecture · structure, not policy
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          We can't see your deal even if we wanted to.
        </h2>
        <p className="mt-4 text-base text-neutral-400 italic">
          That sentence isn't policy. It's structure.
        </p>
        <div className="mt-8 space-y-3">
          {claims.map((claim, i) => (
            <div key={i} className="rounded-lg bg-neutral-900 border border-neutral-800 p-5 flex gap-4">
              <div className="text-xl text-amber-400 font-bold shrink-0">→</div>
              <p className="text-sm text-neutral-200 leading-relaxed">{claim}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base text-neutral-300">
          This is what makes the claim survive a CTO audit. <strong className="text-amber-400">Architecture, not contract language.</strong>
        </p>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          Side by side · AIOV vs BOV vs Appraisal
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          The math.
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left py-3 pr-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500"></th>
                <th className="text-left py-3 px-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">BOV</th>
                <th className="text-left py-3 px-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">Appraisal</th>
                <th className="text-left py-3 px-4 font-mono text-[11px] uppercase tracking-widest text-amber-400">AIOV</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              <CompareRow label="Turnaround" bov="1 to 2 weeks" appr="2 to 4 weeks" aiov="30 to 60 min" kill />
              <CompareRow label="Stated cost" bov={`"Free"`} appr="$5K to $15K" aiov="$499" />
              <CompareRow label="Hidden cost" bov="Broker thinks they have your listing" appr="Comps may leak" aiov="None" kill />
              <CompareRow label="Market exposure" bov="Often leaks" appr="Possible" aiov="Zero" kill />
              <CompareRow label="Confidentiality" bov="Trust the broker" appr="Trust the firm" aiov="Cryptographic" kill />
              <CompareRow label="Receipt" bov="Word of mouth" appr="Bound report" aiov="aiov.defendable.eth/<id>" />
              <CompareRow label="Defensibility" bov="Broker reputation" appr="Designation (MAI etc.)" aiov="Anchored chain" kill />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CompareRow({ label, bov, appr, aiov, kill }: { label: string; bov: string; appr: string; aiov: string; kill?: boolean }) {
  return (
    <tr className="border-b border-neutral-800">
      <td className="py-3 pr-4 text-neutral-500 align-top">{label}</td>
      <td className="py-3 px-4 align-top">{bov}</td>
      <td className="py-3 px-4 align-top">{appr}</td>
      <td className={`py-3 px-4 align-top ${kill ? "text-white font-bold" : "text-amber-400"}`}>{aiov}</td>
    </tr>
  );
}

function Receipt() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The receipt · what lands on Hedera
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Counsel verifies the work without seeing the work.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          Every AIOV produces an anchored session record at <code className="text-amber-400">aiov.defendable.eth/&lt;id&gt;</code>.
          Counsel verifies in 30 seconds. The deal data itself never gets posted.
        </p>
        <pre className="mt-8 rounded-lg border border-neutral-800 border-l-4 border-l-amber-400 bg-neutral-900 p-6 overflow-x-auto text-xs leading-relaxed text-neutral-300 font-mono">
{`// aiov.defendable.eth/<your-deal-id>
{
  "session_id":           "01970d54-7b3c-4f12-9e8e-2c4f6a1d5fb8",
  "requestor":            "familyofficexyz.atlasos.eth",
  "service":              "atlas70b.atlasos.eth",
  "started_at":           "2026-05-06T14:33:11Z",
  "completed_at":         "2026-05-06T15:08:42Z",
  "request_size_bytes":   2387,
  "response_size_bytes":  18452,
  "container_attestation": "sha256:tpm:0x2c8f...4a91",
  "hedera_topic":         "0.0.10291838",
  "hedera_seq":           5103
  // no deal data, no address, no tenant, no financials — by design
}`}
        </pre>
        <p className="mt-6 text-base text-neutral-300 leading-relaxed">
          Hand that to your CFO, your CTO, your counsel. They confirm <strong className="text-white">the work happened, when it happened, who requested it, which container produced it</strong>. They cannot — and will never be able to — see what was inside.
        </p>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          Pricing · two ways to engage
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          $499 per deal. $4,999 per year.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-lg border-2 border-neutral-800 bg-neutral-900 p-7">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
              Per deal
            </div>
            <div className="text-5xl font-black text-white">
              $499<span className="text-lg text-neutral-500 font-normal"> / AIOV</span>
            </div>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              Single deal. 30 to 60 minute turnaround. Sovereign architecture. Anchored receipt.
              Settled in USDC from your HACKER-PRO wallet.
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-400 bg-gradient-to-br from-amber-950/40 to-neutral-900 p-7">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
              Subscription · best value
            </div>
            <div className="text-5xl font-black text-white">
              $4,999<span className="text-lg text-neutral-500 font-normal"> / yr</span>
            </div>
            <p className="mt-3 text-xs font-mono uppercase tracking-widest text-amber-400">12 AIOVs · effective $416 each</p>
            <p className="mt-3 text-sm text-neutral-200 leading-relaxed">
              For active family offices managing 10+ properties. Priority Atlas-70B compute.
              Quarterly portfolio refresh.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-neutral-400">
          Enterprise pricing available for multi-billion family offices and full-portfolio coverage.
          Contact <a href="mailto:build@swarmandbee.ai" className="text-amber-400 hover:text-amber-300">build@swarmandbee.ai</a>.
        </p>
      </div>
    </section>
  );
}

function TheBox() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The box · AIOV runs on a HACKER-PRO
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          $599 silver box. Sits on your desk. Runs sovereign.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          The HACKER-PRO hosts the Bookmaker brain locally, parses your documents on your hardware,
          and routes the encrypted brief to Atlas-70B for the heavy lift. The brain at the desk-edge
          plus the doctrine model in our datacenter — <strong className="text-amber-400">both run on compute we own.</strong>
          No cloud provider. No data harvester. No third-party model API.
        </p>
        <p className="mt-4 text-base text-neutral-400 leading-relaxed">
          Every HACKER-PRO ships with one ENS subdomain at <code className="text-amber-400">&lt;your-name&gt;.atlasos.eth</code> · your wallet · your sovereignty boundary on the network.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={HACKERPRO} target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Learn about HACKER-PRO →
          </a>
        </div>
      </div>
    </section>
  );
}

function CookShop() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The cook shop · 186 GPUs · ~14 TB VRAM · 24/7 · bare metal · owned
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Why the brains are cracked.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          AIOV runs on Atlas-70B — a 70-billion-parameter doctrine model fine-tuned on 125,000
          broker-grade underwriting exchanges (the Royal Jelly CRE corpus). Cooking that model takes
          real compute. Running it for an AIOV in 30 minutes takes more.
        </p>
        <p className="mt-4 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          We own the stack. <strong className="text-amber-400">126 NVIDIA RTX PRO 6000 Blackwell</strong>
          {" · "}48 RTX 4500{" · "}12 RTX 5090 — <strong className="text-amber-400">186 GPUs · roughly 14 terabytes of VRAM</strong>{" "}
          racked in our datacenter. <strong className="text-white">Bare metal.</strong> No AWS line item. No Azure margin. No "model API" middleman charging the customer for a thin wrapper.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <CookStat num="186" label="NVIDIA GPUs" />
          <CookStat num="~14 TB" label="VRAM total" />
          <CookStat num="24/7" label="Cook shop" />
          <CookStat num="$0" label="Cloud margin" />
        </div>

        <div className="mt-10 rounded-lg border-2 border-amber-400 bg-gradient-to-br from-amber-950/40 to-neutral-900 p-7">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            Any model. Any day. In-house.
          </div>
          <h3 className="text-2xl font-black text-white">
            We are a cook shop. Not a cloud reseller.
          </h3>
          <p className="mt-3 text-base text-neutral-200 leading-relaxed">
            We cook the Atlas-70B doctrine model on this rig. We cook the Bookmaker-8B and
            Hack-Deed-Maker-3B brains that ship inside HACKER boxes. We cook every vertical Hack —
            STNL · QSR · Auto · Cold Storage · Medical Office.
            <strong className="text-amber-400"> New model drops on Tuesday? We're cooking on Wednesday.</strong>
            No vendor lock-in. No third-party API throttling. No "your prompts may be used to improve our models" clause.
            Just bare-metal capacity, owned and operated.
          </p>
          <p className="mt-4 text-sm text-neutral-400 italic">
            Sovereign compute is what makes the AIOV "we can't see your deal" claim survive an audit.
            It's also what makes the brains cracked enough to hold broker-grade output at 87% token
            accuracy on a fingerprint-disjoint holdout — measured, not promised.
          </p>
        </div>

        <p className="mt-8 text-sm text-neutral-400 max-w-3xl leading-relaxed">
          Compute isn't the moat by itself · it's what makes every other claim — sovereign data,
          structural confidentiality, per-call pricing that beats cloud margins, in-house cook
          schedules — economically and architecturally real. <a href="https://github.com/SudoSuOps/atlasOS/blob/main/INFRA.md" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">
          Audit the fleet inventory ↗</a>
        </p>
      </div>
    </section>
  );
}

function CookStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-5">
      <div className="text-3xl md:text-4xl font-black text-amber-400">{num}</div>
      <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500">{label}</div>
    </div>
  );
}

function AiovCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-950/30 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Get a real number before the market knows you asked.
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          Thirty years on a national platform. Eight billion in transacted deals.
          The buyer always asked the same question first: <em className="text-white">what is this really worth, before I have to tell anyone I'm asking?</em>
          <br className="hidden md:block" />
          <strong className="text-amber-400 mt-2 block">AIOV is the answer. We built it because nothing else did.</strong>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={HACKERPRO} target="_blank" rel="noreferrer"
             className="px-7 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Order HACKER-PRO →
          </a>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
             className="px-7 py-4 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            🐝 Join the Pit
          </a>
          <a href="mailto:build@swarmandbee.ai?subject=AIOV%20%C2%B7%20enterprise%20inquiry"
             className="px-7 py-4 rounded-lg border-2 border-neutral-700 text-neutral-300 font-semibold hover:border-amber-400 transition-colors">
            Enterprise inquiry
          </a>
        </div>
      </div>
    </section>
  );
}

function AiovFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-400">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            The trust standard
          </div>
          <p className="text-sm leading-relaxed">
            <strong className="text-neutral-200">Verified.</strong> Every fact traces to a source.<br/>
            <strong className="text-neutral-200">Vetted.</strong> Every fact passes the seven-dimension drill.<br/>
            <strong className="text-neutral-200">Virtu.</strong> Something the founder would put his name on.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            Surfaces
          </div>
          <p className="text-sm leading-relaxed">
            <a href={APEX} className="hover:text-amber-400">swarmandbee.ai · the firm</a><br/>
            <a href={HACKERPRO} className="hover:text-amber-400">hackerpro.eth · the box</a><br/>
            <a href="https://defendable.swarmandbee.ai" className="hover:text-amber-400">defendable · the standard</a><br/>
            <a href={ATLAS_REPO} className="hover:text-amber-400" target="_blank" rel="noreferrer">github.com/SudoSuOps/atlasOS ↗</a>
          </p>
        </div>
        <div className="md:text-right">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            Provenance
          </div>
          <p className="text-sm leading-relaxed">
            Swarm and Bee LLC<br/>
            Florida · D-U-N-S 138652395<br/>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="hover:text-amber-400">Discord · the Pit ↗</a>
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-10 pt-6 border-t border-neutral-800">
        <p className="text-[11px] text-neutral-600 leading-relaxed">
          AIOV is an AI-generated opinion of value. It is not an appraisal and is not provided by a state-licensed appraiser.
          AIOV reports are intended as an internal analytical tool for property owners, family offices, and institutional investors.
          Reports must not be used as the basis for federally regulated transactions where a state-licensed appraisal is required (FIRREA).
        </p>
        <p className="mt-4 text-[11px] text-neutral-600">
          © 2026 Swarm &amp; Bee LLC · D-U-N-S 138652395
        </p>
        <p className="mt-2 text-xs italic text-amber-400 font-bold">
          The 3% commission is optional now.
        </p>
      </div>
    </footer>
  );
}
