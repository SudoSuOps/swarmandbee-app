// inference.swarmandbee.ai · OpenAI-compatible LLM endpoint

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Inference() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <InfHeader />
      <InfHero />
      <DropIn />
      <Models />
      <InfFooter />
    </div>
  );
}

function InfHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href="https://swarmandbee.ai" className="text-sm font-semibold text-neutral-300 hover:text-amber-400">
          ← Swarm &amp; Bee
        </a>
        <div className="ml-auto flex items-center gap-5 text-xs">
          <a href="https://api.swarmandbee.ai" className="hover:text-amber-400">api</a>
          <a href="https://docs.swarmandbee.ai" className="hover:text-amber-400">docs</a>
          <span className="text-amber-400 font-bold">v0.1.0</span>
        </div>
      </div>
    </header>
  );
}

function InfHero() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-br from-emerald-950/20 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">
          OpenAI-compatible · sovereign compute
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          inference<span className="text-amber-400">.swarmandbee.ai</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-3xl font-bold leading-snug">
          Drop-in replacement for `api.openai.com/v1`.
        </p>
        <p className="mt-4 text-base text-neutral-300 max-w-3xl leading-relaxed">
          Swap one line in your existing OpenAI SDK and start hitting the Atlas-fleet — 70B SR Broker, 27B
          Underwriter, 9B Bookmaker, 4B Hack-fleet specialists. Same interface as OpenAI · CRE-domain trained ·
          sovereign compute · receipts on every output. <strong className="text-amber-400">Ships post-Atlas-70B
          (Wed PM).</strong>
        </p>
      </div>
    </section>
  );
}

function DropIn() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">The drop-in</div>
        <h2 className="text-3xl font-black mb-6">One line. That's it.</h2>
        <div className="space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Python · OpenAI SDK</div>
            <pre className="text-sm text-amber-400 bg-neutral-900 border border-neutral-800 p-5 rounded overflow-x-auto whitespace-pre">{`from openai import OpenAI

client = OpenAI(
    api_key="sb_live_xxxxxxxxxxxxxxxxxx",
    base_url="https://inference.swarmandbee.ai/v1"  # ← only line that changes
)

response = client.chat.completions.create(
    model="atlas-smd-70b",
    messages=[{"role": "user", "content": "Underwrite this DG STNL deal..."}]
)
print(response.choices[0].message.content)`}</pre>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Node · OpenAI SDK</div>
            <pre className="text-sm text-amber-400 bg-neutral-900 border border-neutral-800 p-5 rounded overflow-x-auto whitespace-pre">{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sb_live_xxxxxxxxxxxxxxxxxx",
  baseURL: "https://inference.swarmandbee.ai/v1"   // ← only line that changes
});

const r = await client.chat.completions.create({
  model: "atlas-smd-70b",
  messages: [{ role: "user", content: "Underwrite this DG STNL deal..." }]
});`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Models() {
  const models = [
    { id: "atlas-smd-70b",        body: "Senior Managing Director · IC-grade underwrites · LOI/PSA · qualifies + closes", status: "cooking · ships Wed PM" },
    { id: "atlas-smd-27b",        body: "Senior MD · 27B Qwen-based · live today · IC-grade underwrites",                  status: "live" },
    { id: "atlas-uw-27b",         body: "Underwriter specialist · cash flow + IC memos · same recipe family",               status: "live" },
    { id: "atlas-bookmaker-9b",   body: "OMs · proposals · pitch decks · LOIs · marketing materials",                       status: "queued · cooks after Atlas-70B" },
    { id: "atlas-closing-9b",     body: "PSA · escrow · DD coordination · template-driven",                                 status: "queued" },
    { id: "atlas-hack-stnl-dg",   body: "DG specialist · 4B QLoRA · DG-WIKI-GRAPH corpus · dial-native",                    status: "queued · first Hack to ship" },
  ];
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-4">Available models</div>
        <h2 className="text-3xl font-black mb-6">The Atlas-fleet</h2>
        <div className="space-y-2">
          {models.map((m) => (
            <div key={m.id} className="rounded border border-neutral-800 bg-neutral-900 p-4 grid grid-cols-12 gap-3 items-start text-sm">
              <code className="col-span-12 md:col-span-3 text-amber-400">{m.id}</code>
              <span className="col-span-12 md:col-span-7 text-neutral-300">{m.body}</span>
              <span className={`col-span-12 md:col-span-2 text-xs font-bold ${m.status === "live" ? "text-emerald-400" : "text-amber-400"}`}>{m.status}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-neutral-400 font-mono">
          GET <code className="text-amber-400">/v1/models</code> · returns this list as JSON
        </p>
      </div>
    </section>
  );
}

function InfFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6 text-sm text-neutral-400 font-mono">
        <p className="text-xs text-neutral-600">© 2026 Swarm &amp; Bee LLC · 186 GPUs sovereign · v0.1.0 · stub mode</p>
        <p className="mt-2">
          <a href={DISCORD} className="hover:text-amber-400">the Pit</a> · <a href="https://api.swarmandbee.ai" className="hover:text-amber-400">api.swarmandbee.ai</a> · <a href="https://docs.swarmandbee.ai" className="hover:text-amber-400">docs</a>
        </p>
      </div>
    </footer>
  );
}
