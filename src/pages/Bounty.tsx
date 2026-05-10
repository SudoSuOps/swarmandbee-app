// bounty.swarmandbee.ai · Bounty intake landing
// Hostname-aware route — same Pages deployment, separate brand surface.
//
// Voice: terse, factual, no hype. Owned compute / defendable receipts /
// sovereign rails. Form posts to /api/bounty-intake → Discord webhook.

import { useState } from "react";

const APEX = "https://swarmandbee.ai";
const X_URL = "https://x.com/swarmandbee";
const EMAIL = "build@swarmandbee.ai";

export default function Bounty() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <BountyHeader />
      <Hero />
      <Capabilities />
      <Why />
      <Process />
      <ContactForm />
      <BountyFooter />
    </div>
  );
}

/* ------------------------------ header ------------------------------ */

function BountyHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <a href={APEX}
           className="text-sm font-semibold text-neutral-300 hover:text-emerald-400 transition-colors">
          ← Swarm &amp; Bee
        </a>
        <span className="ml-2 text-xs text-neutral-500 font-mono">/ bounty</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <a href="#capabilities" className="text-neutral-400 hover:text-neutral-100">capabilities</a>
          <a href="#why" className="text-neutral-400 hover:text-neutral-100">why</a>
          <a href="#contact" className="text-neutral-400 hover:text-neutral-100">contact</a>
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
          Bounty intake · build@swarmandbee.ai
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          Have a bounty.<br />
          <span className="text-emerald-400">Need defendable AI work shipped.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          We own the compute. We anchor the receipts. We ship on sovereign rails —
          no cloud middleman, no borrowed time. Got a job? Swarm makes it seamless
          and defendable.
        </p>
        <Stats />
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contact"
             className="px-6 py-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors">
            Send a brief →
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

function Stats() {
  const stats = [
    { v: "186", k: "GPUs owned" },
    { v: "~14 TB", k: "VRAM on-prem" },
    { v: "80 kW", k: "sovereign power" },
    { v: "sha256 + Hedera", k: "per artifact" },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
      {stats.map((s) => (
        <div key={s.k} className="bg-neutral-950 p-5">
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">{s.v}</div>
          <div className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">{s.k}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ capabilities ------------------------------ */

const CAPABILITIES = [
  {
    title: "LLM evaluation",
    body: "Reproducible eval harnesses. Multi-model comparison with rubric scoring. Per-prompt CSV, summary report, seed + env hash captured.",
  },
  {
    title: "Fine-tuning",
    body: "LoRA + full fine-tune on owned Blackwell silicon. Locked recipes, canary-then-cook discipline, tribunal-sealed verdicts.",
  },
  {
    title: "Dataset audit + repair",
    body: "Dedup, fabrication detection, schema validation, mathematical claim verification. Cleaned sample + repair recommendations + manifest hashes.",
  },
  {
    title: "Research briefs",
    body: "Source-cited, decision-ready briefs with explicit observed-vs-inferred separation. Skeptic-review pass on every claim.",
  },
  {
    title: "AI / GEO audits",
    body: "AI-answer visibility scoring across ChatGPT, Perplexity, Claude, Gemini. Per-page extraction, prioritized recommendations, scorecard.",
  },
  {
    title: "Synthetic data + RAG",
    body: "Curated generation at scale. Retrieval pipelines built and benchmarked on local inference, no third-party data exposure.",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> What we run
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title}
                 className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 hover:border-neutral-700 transition-colors">
              <h3 className="text-base font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ why ------------------------------ */

const WHY = [
  {
    tag: "owned",
    title: "Compute we control",
    body: "126× RTX PRO 6000 Blackwell + 48× RTX 4500 + 12× RTX 5090. 14 TB of VRAM, 80 kW of sovereign power, twelve to eighteen months of lead time no broker shop in the country has replicated.",
  },
  {
    tag: "defendable",
    title: "Receipts on every artifact",
    body: "Every deliverable hashed (sha256). Anchored to Hedera Consensus Service on demand. The certification standard is defendable.eth. You can verify your work after we hand it over.",
  },
  {
    tag: "sovereign",
    title: "No cloud middleman",
    body: "Your data never touches a hyperscaler. Air-gapped runs available. Receipts are the audit trail; the data stays on our rails or yours.",
  },
];

function Why() {
  return (
    <section id="why" className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> Why us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WHY.map((w) => (
            <div key={w.tag}
                 className="rounded-lg border border-emerald-900/40 bg-neutral-900/50 p-6">
              <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-3">
                {w.tag}
              </div>
              <h3 className="text-lg font-semibold mb-3">{w.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ process ------------------------------ */

function Process() {
  const steps = [
    { strong: "Send a brief.", rest: ` Form below or ${EMAIL}. Scope, acceptance criteria, budget, deadline.` },
    { strong: "We scope back.", rest: " Within one business day. Fixed-price pilot when shape is clear; hourly with cap when it isn't." },
    { strong: "We ship.", rest: " Deliverable + summary report + reproducibility notes + per-artifact sha256 receipts." },
    { strong: "You verify.", rest: " Hash-check the receipts. Anchor to Hedera if your compliance needs it. Done." },
  ];
  return (
    <section className="border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-8">
          <span className="text-emerald-400">▍</span> How it works
        </h2>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={i}
                className="relative rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 pl-16 text-neutral-400">
              <span className="absolute left-5 top-5 text-emerald-400 font-bold font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong className="text-neutral-100">{s.strong}</strong>{s.rest}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ contact form ------------------------------ */

type FormStatus = { kind: "idle" | "busy" | "ok" | "err"; msg: string };

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", msg: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => { payload[k] = typeof v === "string" ? v : ""; });

    setStatus({ kind: "busy", msg: "Sending…" });
    try {
      const resp = await fetch("/api/bounty-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok && data.ok) {
        setStatus({ kind: "ok", msg: "Received. Reply within one business day." });
        form.reset();
      } else {
        const err = (data && (data.error || data.detail)) || `HTTP ${resp.status}`;
        setStatus({ kind: "err", msg: `Submission failed: ${err}` });
      }
    } catch (err) {
      setStatus({ kind: "err", msg: `Network error: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  const statusColor = {
    idle: "text-neutral-500",
    busy: "text-amber-400",
    ok: "text-emerald-400",
    err: "text-rose-400",
  }[status.kind];

  return (
    <section id="contact" className="border-b border-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
          <span className="text-emerald-400">▍</span> Send a brief
        </h2>
        <p className="text-neutral-400 mb-8">Nothing automated. A human reads every submission.</p>

        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" required>
              <input name="name" type="text" required maxLength={120} placeholder="Jane Doe"
                     className={INPUT_CLS} />
            </Field>
            <Field label="Email" required>
              <input name="email" type="email" required maxLength={200} placeholder="jane@company.com"
                     className={INPUT_CLS} />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Company / project (optional)">
              <input name="company" type="text" maxLength={200} placeholder="Acme Corp"
                     className={INPUT_CLS} />
            </Field>
            <Field label="Work type" required>
              <select name="work_type" required defaultValue="" className={INPUT_CLS}>
                <option value="" disabled>— select —</option>
                <option value="ai_eval">AI / LLM evaluation</option>
                <option value="fine_tune">Fine-tuning</option>
                <option value="dataset">Dataset audit / cleanup</option>
                <option value="research">Research brief</option>
                <option value="geo_audit">AI / GEO audit</option>
                <option value="synthetic_data">Synthetic data / RAG</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Budget (optional)">
              <input name="budget" type="text" maxLength={120}
                     placeholder="$500 fixed · $50/hr · open"
                     className={INPUT_CLS} />
            </Field>
            <Field label="Deadline (optional)">
              <input name="deadline" type="text" maxLength={120}
                     placeholder="ASAP · 2 weeks · no rush"
                     className={INPUT_CLS} />
            </Field>
          </div>

          <Field label="Brief" required>
            <textarea name="description" required minLength={20} maxLength={6000} rows={7}
                      placeholder="Scope, acceptance criteria, anything we should know. The terser the better."
                      className={INPUT_CLS} />
          </Field>

          {/* honeypot — real users don't fill this */}
          <label aria-hidden="true"
                 style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
            <span>Leave this empty</span>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit"
                    disabled={status.kind === "busy"}
                    className="px-6 py-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {status.kind === "busy" ? "Sending…" : "Submit"}
            </button>
            <span className={`text-sm ${statusColor}`}>{status.msg}</span>
          </div>

          <p className="text-xs text-neutral-500 pt-2">
            Or skip the form: <a href={`mailto:${EMAIL}`} className="text-emerald-400 hover:text-emerald-300">{EMAIL}</a>
          </p>
        </form>
      </div>
    </section>
  );
}

const INPUT_CLS =
  "w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition-colors";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-neutral-500 mb-1.5">
        {label}{required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

/* ------------------------------ footer ------------------------------ */

function BountyFooter() {
  return (
    <footer className="bg-neutral-950">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div>
          <strong className="text-neutral-300">Swarm &amp; Bee</strong>
          <span className="text-neutral-600"> · Commercial Compute Intelligence Refinery</span>
        </div>
        <div className="flex gap-5 text-neutral-400">
          <a href={`mailto:${EMAIL}`} className="hover:text-emerald-400">{EMAIL}</a>
          <a href={X_URL} target="_blank" rel="noreferrer" className="hover:text-emerald-400">x.com/swarmandbee</a>
          <a href={APEX} className="hover:text-emerald-400">swarmandbee.ai</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-10 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600">
        <span>Sovereign compute · defendable receipts · no cloud middleman.</span>
        <span>© Swarm and Bee LLC</span>
      </div>
    </footer>
  );
}
