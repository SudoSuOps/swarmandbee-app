// api.swarmandbee.ai · the REST API for Atlas-as-a-Closer
// Stub mode today · real Atlas dispatch ships post-Atlas-70B (Wed PM)

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Api() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono">
      <ApiHeader />
      <ApiHero />
      <Endpoints />
      <Auth />
      <Examples />
      <Receipts />
      <ApiFooter />
    </div>
  );
}

function ApiHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href="https://swarmandbee.ai" className="text-sm font-semibold text-neutral-300 hover:text-amber-400">
          ← Swarm &amp; Bee
        </a>
        <div className="ml-auto flex items-center gap-5 text-xs">
          <a href="https://docs.swarmandbee.ai" className="hover:text-amber-400">docs</a>
          <a href="https://cli.swarmandbee.ai" className="hover:text-amber-400">cli</a>
          <a href="https://inference.swarmandbee.ai" className="hover:text-amber-400">inference</a>
          <span className="text-amber-400 font-bold">v0.1.0</span>
        </div>
      </div>
    </header>
  );
}

function ApiHero() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-br from-amber-950/20 via-neutral-950 to-emerald-950/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">
          The Atlas-as-a-Closer REST API
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight font-sans">
          api<span className="text-amber-400">.swarmandbee.ai</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-3xl font-bold leading-snug font-sans">
          One brain. Many surfaces. Receipts on every output.
        </p>
        <p className="mt-4 text-base text-neutral-300 max-w-3xl leading-relaxed font-sans">
          Programmatic access to the Atlas-fleet · 70B SR Broker · 27B Underwriter ·
          9B Bookmaker · 4B Hack-fleet specialists. Every response carries a Defendable
          deed anchored to Hedera. <strong className="text-amber-400">Stub mode v0.1.0
          today · real Atlas dispatch ships post-cook (Wed PM).</strong>
        </p>
        <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm">
          <div className="text-amber-400 mb-2">$ curl https://api.swarmandbee.ai/v1/health</div>
          <div className="text-neutral-300">{"{"}<br/>
          &nbsp;&nbsp;"status": "ok",<br/>
          &nbsp;&nbsp;"version": "0.1.0",<br/>
          &nbsp;&nbsp;"mode": "stub",<br/>
          &nbsp;&nbsp;"atlas_fleet": &#123; "smd_70b": "cooking", "smd_27b": "live", "bookmaker_9b": "live" &#125;<br/>
          {"}"}</div>
        </div>
      </div>
    </section>
  );
}

function Endpoints() {
  const eps = [
    { method: "GET",  path: "/v1/health",                desc: "Service health · Atlas fleet status",                price: "free" },
    { method: "GET",  path: "/v1/atlas/models",          desc: "List available Atlas models",                         price: "free" },
    { method: "POST", path: "/v1/atlas/underwrite",      desc: "IC-memo from OM PDF · 12-vector underwrite",          price: "$5,000" },
    { method: "POST", path: "/v1/atlas/om",              desc: "Branded OM + project landing page",                   price: "$1,500" },
    { method: "POST", path: "/v1/atlas/loi",             desc: "LOI / PSA template generation",                       price: "incl." },
    { method: "POST", path: "/v1/atlas/comp",            desc: "Comparable trades by tenant/market/cap-band",         price: "$250" },
    { method: "POST", path: "/v1/atlas/blast",           desc: "Email blast to The Book · gated · approval token",    price: "$2,000" },
    { method: "POST", path: "/v1/atlas/debt",            desc: "9-option borrower waterfall priced to deal",          price: "$500" },
    { method: "GET",  path: "/v1/atlas/sessions/{id}",   desc: "Job status · resume · cancel",                        price: "free" },
    { method: "GET",  path: "/v1/receipts/{hash}",       desc: "Verify a Hedera-anchored deed",                       price: "free" },
    { method: "POST", path: "/v1/tribunal/grade",        desc: "Submit a pair for tribunal grading",                  price: "$10" },
    { method: "POST", path: "/v1/agents/{name}",         desc: "Direct agent invocation (Atlas-SMD, Bookmaker, Hack)", price: "varies" },
  ];
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">Endpoints</div>
        <h2 className="text-3xl font-black font-sans mb-8">REST · v1</h2>
        <div className="space-y-2">
          {eps.map((e) => (
            <div key={e.path} className="rounded border border-neutral-800 bg-neutral-900 p-4 grid grid-cols-12 gap-3 items-center text-sm">
              <span className={`col-span-1 px-2 py-0.5 rounded text-xs font-bold ${e.method === "GET" ? "bg-emerald-900 text-emerald-300" : "bg-amber-900 text-amber-300"}`}>{e.method}</span>
              <code className="col-span-4 text-amber-400">{e.path}</code>
              <span className="col-span-5 text-neutral-300 font-sans">{e.desc}</span>
              <span className={`col-span-2 text-right text-xs font-bold ${e.price === "free" ? "text-neutral-500" : "text-amber-400"}`}>{e.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Auth() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">Authentication</div>
        <h2 className="text-3xl font-black font-sans mb-6">API keys · sb_live_*</h2>
        <p className="text-base font-sans text-neutral-300 max-w-3xl mb-6">
          All paid endpoints require a Bearer token. Free endpoints (health · models · receipts) are public.
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm">
          <div className="text-amber-400">Authorization: Bearer sb_live_xxxxxxxxxxxxxxxxxx</div>
        </div>
        <p className="mt-6 text-base font-sans text-neutral-300 max-w-3xl">
          Get an API key by joining <a href={DISCORD} className="text-amber-400 hover:underline">the Pit</a> and
          requesting one in <code className="text-amber-400">#issuers</code>, or via the customer portal at <code className="text-amber-400">app.swarmandbee.ai</code> (Phase 2).
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-xs uppercase tracking-widest text-amber-400 mb-2">Junior</div>
            <div className="text-2xl font-black">$99/mo</div>
            <div className="text-xs text-neutral-400 mt-2">60 calls/hr · 50 underwrites/mo · dry-run blast only</div>
          </div>
          <div className="rounded-lg border-2 border-amber-500 bg-neutral-900 p-4">
            <div className="text-xs uppercase tracking-widest text-amber-400 mb-2">Senior</div>
            <div className="text-2xl font-black">$299/mo</div>
            <div className="text-xs text-neutral-400 mt-2">300 calls/hr · unlimited underwrites · live blast · LOI/PSA</div>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-xs uppercase tracking-widest text-amber-400 mb-2">Brokerage</div>
            <div className="text-2xl font-black">$1,500/mo</div>
            <div className="text-xs text-neutral-400 mt-2">10+ seats · volume pricing · single-tenant deploy option</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Examples() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">Quick start</div>
        <h2 className="text-3xl font-black font-sans mb-6">Examples</h2>
        <div className="space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Health check</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm overflow-x-auto">
              <pre className="text-amber-400">curl https://api.swarmandbee.ai/v1/health</pre>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Underwrite a deal</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm overflow-x-auto">
              <pre className="text-amber-400 whitespace-pre">{`curl -X POST https://api.swarmandbee.ai/v1/atlas/underwrite \\
  -H "Authorization: Bearer sb_live_xxxxx" \\
  -F "om=@om.pdf" \\
  -F "deal_type=stnl-mf" \\
  -F "target_cap_rate=6.85"`}</pre>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Verify a deed</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm overflow-x-auto">
              <pre className="text-amber-400">curl https://api.swarmandbee.ai/v1/receipts/0xabc123...</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Receipts() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-br from-amber-950/20 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">The brand differentiator</div>
        <h2 className="text-3xl font-black font-sans mb-6">Every response carries a deed.</h2>
        <p className="text-base font-sans text-neutral-300 max-w-3xl mb-6">
          Atlas outputs are anchored to Hedera HCS topic <code className="text-amber-400">0.0.10291838</code>.
          The API embeds the deed reference in every response · customers can verify the work was actually done.
        </p>
        <div className="rounded-lg border border-amber-500 bg-neutral-900 p-5 text-sm overflow-x-auto">
          <pre className="text-neutral-300 whitespace-pre">{`{
  "ic_memo": { ... },
  "recommendation": "Pass",
  "math_check": "12/12",
  "defendable_deed": {
    "hedera_seq": 2742,
    "merkle_root": "0xabc123...",
    "verify_url": "https://hashscan.io/mainnet/topic/0.0.10291838/messages/2742",
    "tribunal_grade": "Class A · Royal Jelly",
    "issuer": "Swarm & Bee LLC",
    "spec_version": "v0.1.0"
  }
}`}</pre>
        </div>
        <p className="mt-6 text-base font-sans text-neutral-300 max-w-3xl">
          OpenAI doesn't anchor outputs. Anthropic doesn't. <strong className="text-amber-400">Defendable does.</strong>
          {" "}Verify, don't trust.
        </p>
      </div>
    </section>
  );
}

function ApiFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6 text-sm text-neutral-400 font-sans">
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
          <a href="https://swarmandbee.ai" className="hover:text-amber-400">swarmandbee.ai</a>
          <a href="https://defendable.swarmandbee.ai" className="hover:text-amber-400">defendable.eth</a>
          <a href="https://pain.swarmandbee.ai" className="hover:text-amber-400">/pain</a>
          <a href="https://docs.swarmandbee.ai" className="hover:text-amber-400">docs</a>
          <a href="https://cli.swarmandbee.ai" className="hover:text-amber-400">cli</a>
          <a href="https://inference.swarmandbee.ai" className="hover:text-amber-400">inference</a>
          <a href={DISCORD} className="hover:text-amber-400">discord</a>
        </div>
        <p className="text-xs text-neutral-600">© 2026 Swarm &amp; Bee LLC · D-U-N-S 138652395 · v0.1.0 · stub mode</p>
      </div>
    </footer>
  );
}
