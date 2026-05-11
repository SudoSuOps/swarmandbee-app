// cli.swarmandbee.ai · the swb CLI · install + quickstart

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Cli() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono">
      <CliHeader />
      <CliHero />
      <Install />
      <Commands />
      <BakeryCli />
      <Compute />
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

function BakeryCli() {
  const cmds: Array<[string, string]> = [
    ["swarmbee-bakery menu", "Browse the bakery inventory · in-stock corpora + 500-pack starter kits"],
    ["swarmbee-bakery menu --domain finance", "Filter to one vertical (finance / medical / healing / agents / legal)"],
    ["swarmbee-bakery sample finance --summary", "Taste the finance pack · 7 pairs · grades + APEX + PROPOLIS contrast"],
    ["swarmbee-bakery sample <domain> --out path.json", "Save sample pack to file"],
    ["swarmbee-bakery order --sku 500-pack --domain finance --failure-mode \"...\"", "Build an order payload + sha256 receipt · DRY RUN by default"],
    ["swarmbee-bakery order ... --confirm", "Actually POST to /api/bakery-intake (human reads every submission)"],
    ["swarmbee-bakery receipt --file payload.json", "Compute sha256 of any JSON payload · audit utility"],
    ["swarmbee-bakery version", "Print version + endpoint"],
  ];
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-b from-amber-950/10 to-neutral-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">
          Sibling CLI · already shipping
        </div>
        <h2 className="text-4xl font-black font-sans mb-4">
          swarmbee-bakery<span className="text-amber-400 text-2xl"> · order curated AI training corpora</span>
        </h2>
        <p className="text-base text-neutral-300 font-sans mb-6 max-w-3xl">
          Order from the dataset bakery without ever leaving the terminal. Same backend
          as the form on{" "}
          <a href="https://bakery.swarmandbee.ai" className="text-amber-400 hover:text-amber-300">
            bakery.swarmandbee.ai
          </a>
          ; structured input via <code>--sku</code> / <code>--domain</code> /{" "}
          <code>--failure-mode</code> flags. Dry-run by default. A human reads every order.
        </p>
        <div className="rounded-lg border-2 border-amber-500 bg-neutral-900 p-5 text-sm md:text-base mb-8">
          <div className="text-amber-400 mb-2">$ pip install git+https://github.com/SudoSuOps/swarmbee-bakery</div>
          <div className="text-amber-400 mb-2">$ swarmbee-bakery menu</div>
          <div className="text-amber-400">$ swarmbee-bakery sample finance --summary</div>
        </div>
        <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-sans">Commands</div>
        <div className="space-y-2 mb-6">
          {cmds.map(([cmd, desc]) => (
            <div key={cmd} className="rounded border border-neutral-800 bg-neutral-900 p-3 grid grid-cols-12 gap-3 text-sm">
              <code className="col-span-12 md:col-span-6 text-amber-400 break-all">{cmd}</code>
              <span className="col-span-12 md:col-span-6 text-neutral-300 font-sans">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-sans text-neutral-400">
          Source · MIT ·{" "}
          <a href="https://github.com/SudoSuOps/swarmbee-bakery" className="text-amber-400 hover:text-amber-300">
            github.com/SudoSuOps/swarmbee-bakery
          </a>
        </p>
      </div>
    </section>
  );
}

function Compute() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-sans tracking-widest text-amber-400 uppercase mb-4">
          Need compute? · the rail we use
        </div>
        <h2 className="text-3xl font-black font-sans mb-4">
          GPUs from operators, not hyperscalers.
        </h2>
        <p className="text-base text-neutral-300 font-sans mb-6 max-w-3xl">
          We list two of our 5090s on vast.ai — smash (machine 84859) and whale (68562).
          Same platform we'd rent from when we need a node we don't own. If you've got a
          training run, an eval sweep, or a one-off inference job, vast.ai is the rail
          we trust because we're on both sides of it.
        </p>
        <div className="rounded-lg border-2 border-amber-500 bg-neutral-900 p-5 text-sm md:text-base mb-4">
          <div className="text-amber-400 mb-2 font-sans text-xs uppercase tracking-widest">Sign up · referral</div>
          <a href="/gpu"
             className="text-amber-400 text-lg hover:text-amber-300 break-all">
            swarmandbee.ai/gpu
          </a>
          <div className="text-neutral-400 mt-2 font-sans text-sm">
            → redirects to <code>cloud.vast.ai/?ref_id=468981</code>
          </div>
        </div>
        <p className="text-sm font-sans text-neutral-500 max-w-3xl">
          Disclosure: this is a referral link. We get credit when you sign up through it,
          which helps cover the bakery's compute costs. We'd recommend vast either way —
          it's where the fleet lives.
        </p>
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
