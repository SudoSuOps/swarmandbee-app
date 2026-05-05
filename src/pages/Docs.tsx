// docs.swarmandbee.ai · API documentation · stub mode v0.1.0

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Docs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <DocsHeader />
      <DocsHero />
      <Quickstart />
      <Schema />
      <DocsFooter />
    </div>
  );
}

function DocsHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href="https://swarmandbee.ai" className="text-sm font-semibold text-neutral-300 hover:text-amber-400">
          ← Swarm &amp; Bee
        </a>
        <div className="ml-auto flex items-center gap-5 text-xs">
          <a href="https://api.swarmandbee.ai" className="hover:text-amber-400">api</a>
          <a href="https://cli.swarmandbee.ai" className="hover:text-amber-400">cli</a>
          <a href="https://api.swarmandbee.ai/v1/openapi.json" className="hover:text-amber-400">openapi.json</a>
          <span className="text-amber-400 font-bold">v0.1.0</span>
        </div>
      </div>
    </header>
  );
}

function DocsHero() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">
          Documentation · v0.1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          docs<span className="text-amber-400">.swarmandbee.ai</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-3xl font-bold leading-snug">
          The Atlas-as-a-Closer integration guide.
        </p>
        <p className="mt-4 text-base text-neutral-300 max-w-3xl leading-relaxed">
          Three-step onboarding · auth · call · verify. Every endpoint returns a Defendable deed.
          Customers can audit every output against the Hedera anchor independently.
        </p>
      </div>
    </section>
  );
}

function Quickstart() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">Quickstart</div>
        <h2 className="text-3xl font-black mb-8">Three steps to your first underwrite.</h2>
        <div className="space-y-8">
          <Step n="01" title="Get an API key">
            <p>
              Join <a href={DISCORD} className="text-amber-400 hover:underline">the Pit</a> and request a key in
              {" "}<code className="text-amber-400">#issuers</code>, or sign up at <code className="text-amber-400">app.swarmandbee.ai</code> (Phase 2).
              Keys are prefixed <code className="text-amber-400">sb_live_*</code>.
            </p>
          </Step>
          <Step n="02" title="Make a call">
            <pre className="text-sm text-amber-400 bg-neutral-900 border border-neutral-800 p-4 rounded overflow-x-auto whitespace-pre">{`curl -X POST https://api.swarmandbee.ai/v1/atlas/underwrite \\
  -H "Authorization: Bearer sb_live_xxxxx" \\
  -F "om=@om.pdf" \\
  -F "deal_type=stnl-mf"`}</pre>
          </Step>
          <Step n="03" title="Verify the receipt">
            <p>
              Every response carries a <code className="text-amber-400">defendable_deed</code> with a Hedera sequence
              number. Verify independently via <a href="https://hashscan.io/mainnet/topic/0.0.10291838" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">hashscan.io</a> — no API key required to verify.
            </p>
          </Step>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1 md:col-span-2 text-3xl font-black font-mono text-amber-400">{n}</div>
      <div className="col-span-11 md:col-span-10">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <div className="text-base text-neutral-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Schema() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">Response shape</div>
        <h2 className="text-3xl font-black mb-6">Every response has a deed.</h2>
        <p className="text-base text-neutral-300 max-w-3xl mb-6">
          The <code className="text-amber-400">defendable_deed</code> object is mandatory in every Atlas response.
          It carries the five proofs (Origin · Quality · Process · Economics · Trust) plus location (Hedera).
        </p>
        <pre className="text-sm text-amber-400 bg-neutral-900 border border-neutral-800 p-5 rounded overflow-x-auto whitespace-pre">{`{
  "request_id":   "req_2k4j2lkj4...",
  "session_id":   "sess_abc123...",
  "model":        "atlas-smd-70b",
  "result":       { ... },                  // endpoint-specific output

  "defendable_deed": {
    "version":       "0.1.0",
    "issuer":        "Swarm & Bee LLC",
    "merkle_root":   "0xabc123...",
    "tribunal_grade": "Class A",            // jelly | honey | pollen | propolis
    "hedera_seq":    2742,
    "hedera_topic":  "0.0.10291838",
    "verify_url":    "https://hashscan.io/mainnet/topic/0.0.10291838/messages/2742",
    "anchored_at":   "2026-05-05T14:32:18Z",
    "proofs": {
      "origin":     { "corpus_cid": "bafy...", "pair_count": 19800 },
      "quality":    { "tribunal_score": 0.94, "judges": ["gemma3-12b","qwen2.5-32b"] },
      "process":    { "recipe": "recipe_1_70b_atlas", "base": "llama-3.3-70b" },
      "economics":  { "gpu_hours": 2.4, "marginal_cost_usd": 0.18 },
      "trust":      { "issuer_sig": "0xdef456...", "spec": "defendable.eth/v0.1.0" }
    }
  }
}`}</pre>
      </div>
    </section>
  );
}

function DocsFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6 text-sm text-neutral-400 font-mono">
        <p className="text-xs text-neutral-600">© 2026 Swarm &amp; Bee LLC · D-U-N-S 138652395 · docs v0.1.0 · stub mode</p>
        <p className="mt-2">
          <a href={DISCORD} className="hover:text-amber-400">the Pit (discord)</a> · <a href="https://github.com/SudoSuOps/atlas" className="hover:text-amber-400">github · atlas</a>
        </p>
      </div>
    </footer>
  );
}
