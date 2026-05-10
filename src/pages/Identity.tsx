// /identity · the public explainer for sovereign on-chain identity
// Why we own .eth and .hbar names — what immutable identity unlocks for
// real work, and why every Swarm asset is anchored on-chain before it has
// a URL.

const X_URL = "https://x.com/swarmandbee";
const EMAIL = "build@swarmandbee.ai";
const HCS_TOPIC_URL = "https://hashscan.io/mainnet/topic/0.0.10291838";

export default function Identity() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <IdentityHeader />
      <Hero />
      <Properties />
      <OurAddresses />
      <Practical />
      <Underrated />
      <CallToAction />
      <IdentityFooter />
    </div>
  );
}

/* ------------------------------ header ------------------------------ */

function IdentityHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href="https://swarmandbee.ai"
           className="text-sm font-semibold text-neutral-300 hover:text-emerald-400 transition-colors">
          ← Swarm &amp; Bee
        </a>
        <span className="ml-2 text-xs text-neutral-500 font-mono">/ identity</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <a href="#properties" className="text-neutral-400 hover:text-neutral-100">why</a>
          <a href="#addresses" className="text-neutral-400 hover:text-neutral-100">addresses</a>
          <a href="#practical" className="text-neutral-400 hover:text-neutral-100">practical</a>
          <a href={X_URL} target="_blank" rel="noreferrer"
             className="text-emerald-400 font-semibold hover:text-emerald-300">x ↗</a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-neutral-950 to-amber-950/20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-4">
          Sovereign identity · ENS · Hedera Names
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          The ID is the<br />
          <span className="text-emerald-400">sovereignty.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          Every Swarm &amp; Bee asset has a sovereign on-chain address before it has a URL.
          ENS (.eth) and Hedera Names (.hbar) are not branding decorations — they are
          the canonical identities. The .ai domain is a gateway. The address is the asset.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#addresses"
             className="px-6 py-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors">
            See our addresses →
          </a>
          <a href="https://defendable.eth.limo" target="_blank" rel="noreferrer"
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-emerald-400 transition-colors">
            defendable.eth ↗
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ properties ------------------------------ */

const PROPERTIES = [
  {
    title: "Immutable events",
    body: "Once a transaction is on chain, no one can quietly edit it. Every issuance, transfer, signature, and anchor is publicly verifiable forever. A registrar can stop renewing a .com tomorrow — they can't delete an ENS record.",
  },
  {
    title: "Transparency",
    body: "Anyone with a wallet can audit our identity history. No hidden ownership transfers, no quiet sleight-of-hand. The chain is the audit log; we don't have to ask you to trust us, you can verify.",
  },
  {
    title: "Confidentiality",
    body: "Public chain does not mean public data. Identities sign and anchor receipts; the data itself stays where it should — on our rails or yours. You verify the seal without seeing the inside of the package.",
  },
  {
    title: "Sovereignty",
    body: "No platform can ban us. No registrar can seize the name. No state can pressure a custodian to redirect the address. The owner controls the key; the key controls the identity; the identity carries the brand.",
  },
];

function Properties() {
  return (
    <section id="properties" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> Four properties that change how you work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPERTIES.map((p) => (
            <div key={p.title}
                 className="rounded-lg border border-emerald-900/40 bg-neutral-900/50 p-6">
              <h3 className="text-lg font-semibold mb-3">{p.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ addresses ------------------------------ */

interface Addr {
  name: string;
  chain: "ENS" | "Hedera Names";
  role: string;
  link?: string;
  detail?: string;
}

const ADDRESSES: Addr[] = [
  {
    name: "swarmandbee.eth",
    chain: "ENS",
    role: "The firm — canonical identity for Swarm and Bee LLC",
    link: "https://swarmandbee.eth.limo",
  },
  {
    name: "defendable.eth",
    chain: "ENS",
    role: "The open certification standard. Every deliverable we ship carries this mark.",
    link: "https://defendable.eth.limo",
  },
  {
    name: "aiov.eth",
    chain: "ENS",
    role: "AI Opinion of Value — the pre-broker SKU. Signed valuations anchored to this address.",
    link: "https://aiov.eth.limo",
  },
  {
    name: "swarmusdc.eth",
    chain: "ENS",
    role: "Settlement rail — receipts and invoices resolve to a stable USD address.",
    link: "https://swarmusdc.eth.limo",
    detail: "→ 0xBDe2153C…",
  },
  {
    name: "swarm.hbar",
    chain: "Hedera Names",
    role: "Hedera-native firm identity. Receipts are anchored to Hedera Consensus Service.",
    link: "https://app.hashgraph.name",
  },
  {
    name: "swarmandbee.hbar",
    chain: "Hedera Names",
    role: "Hedera-native firm identity (alternate).",
    link: "https://app.hashgraph.name",
  },
  {
    name: "hive.hbar",
    chain: "Hedera Names",
    role: "Hive Intelligence taxonomy — the framework underneath the firm.",
    link: "https://app.hashgraph.name",
  },
];

function OurAddresses() {
  return (
    <section id="addresses" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> Our owned identities
        </h2>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-xs uppercase tracking-widest text-neutral-500">
              <tr>
                <th className="text-left px-5 py-3 font-medium">name</th>
                <th className="text-left px-5 py-3 font-medium">chain</th>
                <th className="text-left px-5 py-3 font-medium">role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {ADDRESSES.map((a) => (
                <tr key={a.name} className="hover:bg-neutral-900/50">
                  <td className="px-5 py-4 font-mono text-emerald-400 whitespace-nowrap">
                    {a.link ? (
                      <a href={a.link} target="_blank" rel="noreferrer" className="hover:underline">
                        {a.name}
                      </a>
                    ) : a.name}
                    {a.detail ? (
                      <div className="text-[11px] text-neutral-500 font-mono mt-1">{a.detail}</div>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-neutral-500 text-xs whitespace-nowrap">{a.chain}</td>
                  <td className="px-5 py-4 text-neutral-400">{a.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          ENS names resolve via the public Ethereum Name Service. The
          <code className="mx-1">.eth.limo</code> gateway is a censorship-resistant
          public mirror; the address itself does not depend on any HTTP host to exist.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ practical ------------------------------ */

const PRACTICAL = [
  {
    title: "Bounty receipt",
    body: "Every artifact we ship is sha256-hashed and optionally anchored to Hedera Consensus Service topic 0.0.10291838 under swarm.hbar. The client can verify the deliverable was not altered after delivery, forever.",
    link: { label: "HCS topic ↗", url: HCS_TOPIC_URL },
  },
  {
    title: "Defendable certification",
    body: "Outputs are signed against defendable.eth. Independent issuers can publish their own work under the same standard; the chain proves who signed what when.",
    link: { label: "defendable.eth ↗", url: "https://defendable.eth.limo" },
  },
  {
    title: "AIOV signed valuation",
    body: "AI Opinion of Value outputs are issued under aiov.eth. The valuation, the inputs, the model version, and the timestamp are all anchored — the client receives a deed, not a PDF.",
    link: { label: "aiov.eth ↗", url: "https://aiov.eth.limo" },
  },
  {
    title: "USDC settlement",
    body: "Invoicing and receipts settle to swarmusdc.eth, which resolves to a public stablecoin address. No wire instructions, no chargeback risk, no payment-rail intermediary.",
    link: { label: "swarmusdc.eth ↗", url: "https://swarmusdc.eth.limo" },
  },
];

function Practical() {
  return (
    <section id="practical" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> How this changes real work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRACTICAL.map((p) => (
            <div key={p.title}
                 className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
              <h3 className="text-base font-semibold mb-3">{p.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-3">{p.body}</p>
              {p.link ? (
                <a href={p.link.url} target="_blank" rel="noreferrer"
                   className="text-xs text-emerald-400 hover:text-emerald-300 font-mono">
                  {p.link.label}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ underrated ------------------------------ */

function Underrated() {
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-6">
          <span className="text-emerald-400">▍</span> Why ENS is still underrated
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-4">
          DNS is a rental from a registrar. ENS is property held by a key. That distinction will
          look obvious in five years and weird in ten.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          Every wallet already resolves ENS. Every Web3 protocol already accepts it. Every
          blockchain explorer already shows it. The infrastructure is in place; the public hasn't
          finished noticing yet. We own our identities at the bottom of that stack now, so when the
          rest of the market catches up, we're already there with verifiable history.
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          The same logic applies to Hedera Names (.hbar). Hedera's consensus service is what we
          use to anchor every Defendable receipt — having <code>swarm.hbar</code> resolve to the
          same wallet that owns the HCS topic ties the identity, the receipts, and the firm
          together in a way no central party can quietly rewrite.
        </p>
        <p className="text-neutral-300 leading-relaxed mt-6">
          <strong>The brand is not a logo. The brand is a key that signs.</strong>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ CTA ------------------------------ */

function CallToAction() {
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want defendable receipts on your next deliverable?</h2>
        <p className="text-neutral-400 mb-8">
          Every bounty we take ships with sha256 receipts and optional Hedera anchoring under
          swarm.hbar. The signature is the trust.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://bounty.swarmandbee.ai"
             className="px-6 py-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors">
            Send us a bounty →
          </a>
          <a href={`mailto:${EMAIL}`}
             className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-emerald-400 transition-colors">
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ footer ------------------------------ */

function IdentityFooter() {
  return (
    <footer className="bg-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div>
          <strong className="text-neutral-300">Swarm &amp; Bee</strong>
          <span className="text-neutral-600"> · Sovereign identity layer</span>
        </div>
        <div className="flex gap-5 text-neutral-400">
          <a href={`mailto:${EMAIL}`} className="hover:text-emerald-400">{EMAIL}</a>
          <a href={X_URL} target="_blank" rel="noreferrer" className="hover:text-emerald-400">x.com/swarmandbee</a>
          <a href="https://swarmandbee.ai" className="hover:text-emerald-400">swarmandbee.ai</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-10 text-xs text-neutral-600">
        The .ai domain is a gateway. The address is the asset. © Swarm and Bee LLC
      </div>
    </footer>
  );
}
