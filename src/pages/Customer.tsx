// app.swarmandbee.ai · customer portal placeholder · Phase 2

const DISCORD = "https://discord.gg/buUjYgzP5m";

export default function Customer() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <header className="border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <a href="https://swarmandbee.ai" className="text-sm font-semibold text-neutral-300 hover:text-amber-400">
            ← Swarm &amp; Bee
          </a>
          <span className="ml-auto text-xs text-amber-400 font-mono font-bold">Phase 2 · Coming soon</span>
        </div>
      </header>

      <section className="flex-1 flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase mb-6">
            Customer portal · v0.2.0 · ETA Q2 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            app<span className="text-amber-400">.swarmandbee.ai</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-bold leading-snug mb-6">
            Self-serve account · usage dashboards · deal rooms · billing portal.
          </p>
          <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            The customer-facing console for Atlas-as-a-Closer. Manage API keys · audit usage · stand up
            private deal rooms · review Hedera receipts · upgrade tier · invoice management.
            <strong className="text-amber-400"> Phase 2 · ships after the API spine stabilizes.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Coming · Q2</div>
              <h3 className="font-bold mb-2">Account &amp; keys</h3>
              <p className="text-sm text-neutral-300">Provision API keys · rotate · scope · revoke. Tier upgrades self-serve via Stripe.</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Coming · Q2</div>
              <h3 className="font-bold mb-2">Deal rooms</h3>
              <p className="text-sm text-neutral-300">Private channels for active deals · auto-pinned receipts · close-to-anchor flow · archive on completion.</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Coming · Q2</div>
              <h3 className="font-bold mb-2">Usage &amp; receipts</h3>
              <p className="text-sm text-neutral-300">Every Atlas call · with deed · with cost · with verification link to Hedera. Glass-wall doctrine.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://api.swarmandbee.ai" className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
              Use the API directly →
            </a>
            <a href={DISCORD} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
              🐝 Join the Pit
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-neutral-600 font-mono border-t border-neutral-800">
        © 2026 Swarm &amp; Bee LLC · D-U-N-S 138652395 · app.swarmandbee.ai · placeholder
      </footer>
    </div>
  );
}
