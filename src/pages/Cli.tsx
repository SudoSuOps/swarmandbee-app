// cli.swarmandbee.ai · the swb CLI · install + quickstart

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Cli() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono">
      <CliHeader />
      <CliHero />
      <Install />
      <Commands />
      <CliFooter />
    </div>
  );
}

function CliHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
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

function CliHero() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-br from-amber-950/20 to-neutral-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">
          The Atlas-as-a-Closer command line
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight font-sans">
          swb<span className="text-amber-400 text-3xl md:text-5xl"> · the cli</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-2xl font-bold leading-snug font-sans">
          Underwrite a deal from your terminal.
        </p>
        <div className="mt-8 rounded-lg border-2 border-amber-500 bg-neutral-900 p-5 text-sm md:text-base">
          <div className="text-amber-400 mb-2">$ pip install swarmandbee</div>
          <div className="text-amber-400 mb-2">$ swb auth sb_live_xxxxx</div>
          <div className="text-amber-400">$ swb underwrite om.pdf</div>
        </div>
        <p className="mt-6 text-sm font-sans text-neutral-400">
          Phase 1 today: this page · install scripts staged · CLI binary ships post-Atlas-70B (Wed PM).
        </p>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">Install</div>
        <div className="space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Python (recommended)</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm">
              <span className="text-amber-400">pip install swarmandbee</span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Standalone (curl one-liner)</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm">
              <span className="text-amber-400">curl -sSL https://cli.swarmandbee.ai/install.sh | bash</span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Verify</div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm">
              <span className="text-amber-400">swb --version</span>
              <div className="text-neutral-400 mt-1">→ swb 0.1.0 · the swarm and bee cli</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Commands() {
  const cmds: Array<[string, string]> = [
    ["swb auth <api-key>", "Save API key to ~/.swb/config.toml"],
    ["swb whoami", "Show current customer + tier + usage"],
    ["swb underwrite <om.pdf>", "Run an IC-grade underwrite · $5,000 per call"],
    ["swb om '<deal summary>'", "Generate branded OM + landing page · $1,500 per call"],
    ["swb loi <deal-id>", "Generate LOI / PSA · included in underwrite"],
    ["swb comp --tenant DG --msa Tampa --cap 6.5-7.5", "Comparable trades lookup · $250 per call"],
    ["swb blast --list 1031-fl-stnl --deal <id> --send", "Email blast · $2,000 per call · gated"],
    ["swb debt '$3M STNL · 2026 maturity'", "9-option borrower waterfall · $500 per call"],
    ["swb pain", "Drop the CRE debt wall summary in your terminal · free"],
    ["swb receipts <hash>", "Verify a Hedera-anchored deed · free"],
    ["swb help", "Full command reference"],
  ];
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">Commands</div>
        <h2 className="text-3xl font-black font-sans mb-6">The full kit</h2>
        <div className="space-y-2">
          {cmds.map(([cmd, desc]) => (
            <div key={cmd} className="rounded border border-neutral-800 bg-neutral-900 p-3 grid grid-cols-12 gap-3 text-sm">
              <code className="col-span-12 md:col-span-5 text-amber-400">{cmd}</code>
              <span className="col-span-12 md:col-span-7 text-neutral-300 font-sans">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CliFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-4xl mx-auto px-6 text-sm text-neutral-400 font-sans">
        <p className="text-xs text-neutral-600">© 2026 Swarm &amp; Bee LLC · the cli wraps api.swarmandbee.ai · Apache 2.0 (planned) · v0.1.0</p>
        <p className="mt-2">
          <a href="https://github.com/SudoSuOps/atlas" className="hover:text-amber-400">github · atlas</a> · <a href={DISCORD} className="hover:text-amber-400">the Pit</a>
        </p>
      </div>
    </footer>
  );
}
