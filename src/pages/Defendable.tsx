// defendable.swarmandbee.ai · Defendable.eth on Cloudflare
// Hostname-aware fallback for when defendable.eth.limo is degraded.
// Same content surface · same brand · stable HTTPS via Cloudflare Pages.

const DISCORD_INVITE = "https://discord.gg/buUjYgzP5m";
const APEX = "https://swarmandbee.ai";
const CID = "bafybeicznv4wvbnwtrt7nvnywlr5d3v6tkb6lgsfzoa7kc2t5qkgtcmv3e";

export default function Defendable() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <DefHeader />
      <DefHero />
      <Spec />
      <FiveProofs />
      <Office />
      <Subdomains />
      <CTA />
      <DefFooter />
    </div>
  );
}

function DefHeader() {
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
          <span className="font-mono text-neutral-500 hidden sm:inline">defendable.eth</span>
        </div>
      </div>
    </header>
  );
}

function DefHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-neutral-950 to-emerald-950/20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The open standard for audited AI assets
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]">
          defendable<span className="text-amber-400">.eth</span>
        </h1>
        <p className="mt-8 text-2xl md:text-3xl text-white max-w-3xl font-bold leading-snug">
          Verify, don't trust. Receipts on every output.
        </p>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Every AI output should carry a deed: <strong>five proofs</strong> (Origin · Quality · Process · Economics · Trust),
          anchored to a public chain, falsifiable by independent implementations. Multiple issuers must agree on the
          same input. <strong className="text-amber-400">The floor is glass.</strong>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            🐝 Join the Pit (Discord) →
          </a>
          <a href={`${APEX}/pain`}
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            See the live thesis · /pain
          </a>
          <a href="https://github.com/SudoSuOps/atlas" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-300 font-semibold hover:border-amber-400 transition-colors">
            GitHub · Atlas ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Spec() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The standard · v0.1.0
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Three rules. No exceptions.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <RuleCard
            num="01"
            title="Verify, don't trust"
            body="Every AI output carries a receipt. The deed includes the five proofs and is anchored to a public chain. Spectators can verify without permission, without paying, without trusting the issuer."
          />
          <RuleCard
            num="02"
            title="Multi-issuer falsifiable"
            body="Multiple independent implementations of the standard must produce the same answer for the same input. If they don't, one is wrong. The standard is open and remixable."
          />
          <RuleCard
            num="03"
            title="Glass-wall transparency"
            body="The provenance chain is visible end-to-end: signal → pair → batch → anchor → model → revenue. Anyone can walk it. Anyone can audit. The floor is glass."
          />
        </div>
      </div>
    </section>
  );
}

function RuleCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-800 bg-neutral-900 p-6">
      <div className="text-xs font-mono text-amber-400 font-bold tracking-widest">{num}</div>
      <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

function FiveProofs() {
  const proofs = [
    { letter: "O", name: "Origin",    body: "Where did this output come from? Source attribution chain · upstream pairs · corpus version · dataset CID." },
    { letter: "Q", name: "Quality",   body: "What grade is it? Tribunal score from 9B+9B different-family judges · jelly · honey · pollen · propolis tier." },
    { letter: "P", name: "Process",   body: "How was it produced? Recipe ID · base model · LoRA hyperparameters · cook environment hash." },
    { letter: "E", name: "Economics", body: "What did it cost? GPU hours · electron cost · capex amortization · economic provenance." },
    { letter: "T", name: "Trust",     body: "Who vouches? Issuer signature · multi-implementation agreement · spectator verification path." },
  ];
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The deed · five proofs · O·Q·P·E·T
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Every output. Every time.
        </h2>
        <p className="mt-4 text-base text-neutral-300 max-w-3xl">
          Plus a sixth coordinate: <strong className="text-amber-400">Location</strong> — where the deed itself
          lives on chain. Hedera HCS topic <code className="text-amber-400">0.0.10291838</code>, operator
          <code className="text-amber-400">0.0.10291827</code>.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3">
          {proofs.map((p) => (
            <div key={p.letter} className="rounded-lg bg-neutral-900 border border-neutral-800 p-4">
              <div className="text-4xl font-black text-amber-400">{p.letter}</div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-neutral-500">{p.name}</div>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Office() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The office · live floor
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Defendable runs in the open.
        </h2>
        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          The Defendable Discord is the public floor. <strong className="text-amber-400">9 named agents</strong> drop
          live signal into <code>#signal-feed</code> · <strong>cook auditor</strong> pings every 3 hours ·
          <strong>Hedera anchors</strong> post on every publish · <strong>Monday Sales Meeting</strong>
          opens to all every Mon 8AM ET · <strong>🍸 Tito's Tuesday</strong> 8PM ET · the floor is glass.
        </p>
        <div className="mt-10 rounded-lg border-2 border-amber-400 bg-gradient-to-br from-amber-950/40 to-neutral-900 p-7">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            Walk into the Pit
          </div>
          <h3 className="text-2xl font-black text-white">
            🐝 The Defendable Discord is the office.
          </h3>
          <p className="mt-3 text-base text-neutral-200 leading-relaxed">
            Free to join · open invite · @Spectator role on entry. Watch the floor live, ask <code>@HACK</code> for
            <code>/pain</code>, <code>/lane</code>, <code>/menu</code>. When you bring a deal — Monday 8AM ET in
            <code>#monday-sales-meeting</code>.
          </p>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
             className="mt-5 inline-block px-7 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            🐝 Join the Pit · discord.gg/buUjYgzP5m →
          </a>
        </div>
      </div>
    </section>
  );
}

function Subdomains() {
  const subs = [
    { domain: "atlas.defendable.eth",    body: "The Atlas-fleet · 70B SR Broker · 27B UW · 9B Bookmaker · the brokerage running on the standard." },
    { domain: "cookbook.defendable.eth", body: "Recipes · gold-standard 70B FSDP-QLoRA · 27B LoRA · 9B QLoRA · 4B Hack-fleet · ship logs." },
    { domain: "pain.defendable.eth",     body: "The CRE debt wall · live thesis · 29 cited sources · maturity wall mapped + ranked.", live: true },
    { domain: "vendor.defendable.eth",   body: "Atlas-as-a-Closer service menu · $5K underwrite · $1.5K OM · $2K blast · per-Hack dialer." },
  ];
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          Subdomain map
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Defendable surfaces · the bee &amp; the swarm.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {subs.map((s) => (
            <div key={s.domain} className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <code className="text-amber-400 font-bold">{s.domain}</code>
                {s.live && <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">● live</span>}
              </div>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-950/30 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Read · verify · build.
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-2xl mx-auto">
          The standard is open · falsifiable · multi-issuer. The Discord is the public floor. The receipts
          are on chain. <strong>The floor is glass.</strong>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
             className="px-7 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            🐝 Join the Pit
          </a>
          <a href={APEX}
             className="px-7 py-4 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            See Swarm &amp; Bee · the firm
          </a>
        </div>
      </div>
    </section>
  );
}

function DefFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-400">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            Verification
          </div>
          <p className="text-sm leading-relaxed">
            Hedera operator <code className="text-amber-400">0.0.10291827</code><br/>
            Anchor topic <code className="text-amber-400">0.0.10291838</code><br/>
            IPFS pin <code className="text-amber-400 break-all text-xs">{CID}</code>
          </p>
        </div>
        <div className="md:text-right">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
            Surfaces
          </div>
          <p className="text-sm leading-relaxed">
            <a href={`https://${CID}.ipfs.w3s.link/`} target="_blank" rel="noreferrer" className="hover:text-amber-400">IPFS gateway (w3s.link) ↗</a><br/>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="hover:text-amber-400">Discord · the Pit ↗</a><br/>
            <a href={APEX} className="hover:text-amber-400">swarmandbee.ai · the firm</a>
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-10 pt-6 border-t border-neutral-800 text-[11px] text-neutral-600">
        <p>© 2026 Swarm &amp; Bee LLC · D-U-N-S 138652395 · the first issuer of the Defendable standard. The standard is open · Apache-2-style · multi-issuer.</p>
      </div>
    </footer>
  );
}
