// Honey · Offering Memorandum · CRE — Capital Markets v1.0
//
// CRE-broker-grade OM teaser. Branded Defendable + Swarm & Bee.
// Public surface; full data room is NDA-gated.

import { Link } from "react-router-dom";

export default function OM_CRE() {
  return (
    <div className="bg-stone-50 min-h-screen text-neutral-900">
      <TopBar />
      <Cover />
      <ExecSummary />
      <AssetProfile />
      <WhoBuysWhyBuy />
      <CoverageAnalysis />
      <MarketStudy />
      <Outcomes />
      <ModelHomeInspection />
      <DueDiligence />
      <RiskFactors />
      <FeeSimpleTransfer />
      <Closing />
      <BottomBar />
    </div>
  );
}

// ─── top bar (nav back) ────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
        <Link to="/" className="text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1">
          ← Swarm &amp; Bee
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-500">OM-CRE-v1.0</span>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold tracking-wider">
            FEE SIMPLE · RWA
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold tracking-wider">
            DEFENDABLE CLASS A
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── cover ─────────────────────────────────────────────────────────────────────

function Cover() {
  return (
    <section className="border-b border-neutral-300 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <span>Honey · Offering Memorandum</span>
          <span>Confidential · For qualified buyers</span>
        </div>

        <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase mb-3">
          Commercial Real Estate · Capital Markets
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          Honey-CRE-Capital-Markets
        </h1>
        <div className="mt-2 text-2xl font-serif text-neutral-700">v1.0 · 810,097 deeded pairs</div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded">
          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
          Fee simple · Free and clear · Title transfers on closing · No encumbrances · No royalty back
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 border-y border-neutral-300 py-8">
          <CoverStat label="Class" value="Honey 87.4" />
          <CoverStat label="Pairs" value="810,097" />
          <CoverStat label="Vintage" value="Mar–Apr 2026" />
          <CoverStat label="Anchor" value="Hedera + Merkle" />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Asking
            </div>
            <div className="font-serif text-2xl text-neutral-900">Pricing on application</div>
            <p className="mt-2 text-neutral-600 leading-relaxed">
              Tier pricing: full corpus · vertical slice · sample pair. USDC or Stripe at close.
              Sample 100 pairs delivered free upon NDA execution.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Listing
            </div>
            <div className="font-serif text-lg text-neutral-900">Swarm &amp; Bee</div>
            <p className="mt-1 text-neutral-700 leading-snug">
              D-U-N-S 138652395 · Florida LLC<br />
              Licensed Real Estate Brokerage<br />
              Donovan Mackey, Founder &amp; Broker of Record
            </p>
          </div>
        </div>

        <div className="mt-10 text-xs font-mono text-neutral-500 leading-relaxed">
          Hedera HCS topic · <span className="text-neutral-900">0.0.10291838</span><br />
          Catalog hash · <span className="text-neutral-900 break-all">5822f146a14c537c7f8c96600414bb0bb59dde0b57e8a2c9df381e29ff116251</span>
        </div>
      </div>
    </section>
  );
}

function CoverStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</div>
      <div className="mt-1 font-serif text-xl text-neutral-900 leading-tight">{value}</div>
    </div>
  );
}

// ─── 1. Executive summary ──────────────────────────────────────────────────────

function ExecSummary() {
  return (
    <Section number="01" title="Executive Summary">
      <p className="font-serif text-xl leading-relaxed text-neutral-800">
        Honey-CRE-Capital-Markets v1.0 is a 810,097-pair institutional dataset for fine-tuning
        AI models on commercial real estate underwriting, capital markets reasoning, and
        distress workouts. Generated organically from the same brokerage deal pipeline that
        closed $8B in transactions over 30 years on a national platform — not scraped, not
        synthetic, not commodity.
      </p>

      <ul className="mt-8 space-y-4 text-base text-neutral-800 leading-relaxed">
        <Bullet>
          <strong>Organic origin.</strong> Every pair traces to a real deal artifact, working memo,
          or analyst workflow — graded with Royal Jelly Protocol scoring (5-dim Chain-of-Thought) and
          deeded at the pair level.
        </Bullet>
        <Bullet>
          <strong>Capital-markets depth.</strong> 12 task types covering underwriting, IC memos,
          comp analysis, valuation, debt analysis, tax assessment, rent roll, 1031 exchange,
          and distress workouts.
        </Bullet>
        <Bullet>
          <strong>Provable.</strong> Per-pair fingerprint, package-level Merkle root, Hedera-anchored
          on mainnet topic <span className="font-mono text-sm">0.0.10291838</span>. Anyone with the
          deed receipt can verify chain of custody independently.
        </Bullet>
        <Bullet>
          <strong>Proven outcome.</strong> Atlas-class models trained on this corpus underwrote a
          real Memphis 312-unit multifamily deal — 12/12 math, correct kill decision. Not a
          chatbot answer; a trained colleague's call.
        </Bullet>
        <Bullet>
          <strong>Defendable Class A.</strong> Audit-ready under SR 26-2 (Fed/OCC/FDIC AI guidance,
          April 2026) and EU AI Act enforcement (August 2026). The training-data lineage every
          regulated buyer's MRM team needs.
        </Bullet>
      </ul>
    </Section>
  );
}

// ─── (after exec summary) Who Buys & Why Buy ──────────────────────────────────

function WhoBuysWhyBuy() {
  return (
    <Section number="03" title="Who Buys &amp; Why Buy">
      <p className="font-serif text-lg text-neutral-700 leading-relaxed mb-8">
        This asset is positioned for institutions that need <strong>permanent intelligence
        infrastructure</strong> — not a data subscription, not a vendor lock-in. You buy it,
        you own it. Title transfers to your books. The deed records on Hedera mainnet under
        your name. From that point, the corpus and any model you train from it are yours,
        free and clear.
      </p>

      <h3 className="font-serif text-2xl font-semibold mb-4">Who buys</h3>
      <DataTable
        rows={[
          ["Sovereign wealth funds", "Long-duration capital. Patient ownership of intelligence assets that compound over decades. Fits PIF, ADIA, GIC, Norges, Mubadala mandates — own the data layer that drives AI infrastructure."],
          ["Insurance majors (CRE direct lending)", "MetLife $100B+ CRE debt book, PGIM, Prudential, NYL. Internal underwriting AI must be MRM-auditable under SR 26-2. Owning the training corpus is the only path to defensible AI."],
          ["Family offices", "ICONIQ, Pritzker-tier multi-family offices. CRE allocation desks need a proprietary AI moat. Renting from a vendor is a single point of failure; owning the corpus is portfolio infrastructure."],
          ["Big-4 brokerage internal AI teams", "CBRE Ellis, JLL Falcon, Cushman, M&M. Race to internal AI advantage. Owning specialized CRE training data leapfrogs the generic-LLM approach competitors are stuck with."],
          ["Hedge funds / RE-credit shops", "Apollo Real Estate Credit, Blackstone BREDS, KKR REC, Ares. Bespoke models for CMBS pricing, distress signal, recovery modeling. Fee simple ownership = trade-secret moat."],
          ["AI model vendors / specialty inference", "OEM vertical-AI offerings. License Atlas-class fine-tunes, but own the underlying corpus that gives you defensible specialty in CRE."],
          ["University endowments + research labs", "Fee simple academic + commercial use. Atlas-grade datasets for CRE finance / urban econ research with provenance suitable for peer-reviewed publication."],
        ]}
      />

      <h3 className="font-serif text-2xl font-semibold mt-12 mb-4">Why buy — the value thesis</h3>
      <ul className="space-y-4 text-base text-neutral-800 leading-relaxed">
        <Bullet>
          <strong>It's a real-world asset on your balance sheet.</strong> Once title transfers, the
          corpus is an intangible asset (IP) under your books — not a recurring SaaS expense.
          Treat it like the buildings in your portfolio: own outright, depreciate (or amortize)
          per your accountant, sell when you choose.
        </Bullet>
        <Bullet>
          <strong>Train proprietary models you control.</strong> Fine-tune Atlas-class CRE
          underwriting, IC memo generation, distress scoring, deal screening. The models you
          produce are <em>derivatives</em> of an asset you OWN — not outputs of a vendor's tool.
          Your competitors can't replicate them without buying the underlying corpus from you (or us).
        </Bullet>
        <Bullet>
          <strong>Trade-secret moat under deal pressure.</strong> When a sovereign LP allocates $500M
          into your fund based partly on AI-driven underwriting, "we use ChatGPT" loses the deal.
          "We own a 810K-pair Class A CRE corpus, deeded on Hedera, and trained our internal model
          on it" wins it.
        </Bullet>
        <Bullet>
          <strong>Defensible procurement under SR 26-2 + EU AI Act.</strong> Regulated finance buyers
          must show training-data lineage. Fee simple ownership of a deed-anchored corpus is the
          highest-confidence form. ChatGPT's data lineage is sealed in NYT v OpenAI discovery; yours
          is on Hedera mainnet under your topic ID.
        </Bullet>
        <Bullet>
          <strong>Compounding intelligence asset.</strong> Add future freshness pools (Q2 2026,
          Q3 2026, etc.) — each deeded separately, each owned outright by you. The corpus value
          grows as the world changes. Like adding floors to a building you own.
        </Bullet>
        <Bullet>
          <strong>Resaleable.</strong> Fee simple means you can sell it. If your fund unwinds, your
          firm pivots, or you simply find a buyer at a higher mark — the corpus transfers to a new
          owner. Hedera deed records the chain of custody. Liquid intelligence asset.
        </Bullet>
      </ul>
    </Section>
  );
}

// ─── 2. Asset profile ──────────────────────────────────────────────────────────

function AssetProfile() {
  return (
    <Section number="02" title="Asset Profile" hint="The property — what you're acquiring at closing.">
      <DataTable
        rows={[
          ["Total pairs", "810,097"],
          ["Median tokens / pair", "1,532"],
          ["P90 tokens / pair", "3,706"],
          ["Schema fields", "cell_id · domain · cluster · grade · messages · verification_score · gate_results · lineage · task_type · stream · fingerprint"],
          ["File format", "JSONL · UTF-8 · one record per line · OpenAI chat-message format"],
          ["JellyScore range", "0–100 (gate threshold ≥ 75 for Honey class)"],
          ["Top class share", "Honey 87.4% · the marquee tier"],
          ["Genesis-class subset", "13,702 pairs (the seed reasoning)"],
        ]}
      />

      <div className="mt-10">
        <h3 className="font-serif text-2xl font-semibold mb-3">Sample pair (anonymized)</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-5 rounded-lg text-xs leading-relaxed overflow-x-auto">
{`{
  "cell_id": "HIVE-CRE-5c9b6ce0e982",
  "domain": "cre",
  "task_type": "underwriting",
  "verification_score": 90,
  "grade": "honey",
  "messages": [
    {"role": "system", "content": "You are SwarmCRE. Prepare an Investment Committee memo for the described deal..."},
    {"role": "user",   "content": "Prepare an IC memo for the following acquisition: 117,000 SF cold storage facility,
                                    Phoenix submarket, NOI $145,866, cap rate 6.15%, single tenant Metro Partners..."},
    {"role": "assistant", "content": "INVESTMENT COMMITTEE MEMO\\n\\nDEAL: Industrial Plaza\\n\\nEXECUTIVE SUMMARY..."}
  ],
  "fingerprint": "5c9b6ce0e982a4f1...",
  "lineage": { "source": "deal_artifact", "stamped_at": "2026-03-12", "judge": "qwen2.5-32b + gemma3-12b" }
}`}
        </pre>
      </div>
    </Section>
  );
}

// ─── 3. Coverage & tenant analysis ─────────────────────────────────────────────

function CoverageAnalysis() {
  return (
    <Section number="04" title="Coverage Analysis">
      <p className="font-serif text-lg text-neutral-700 leading-relaxed mb-8">
        Like a CRE OM tenant analysis, this section tells you what's actually <em>in</em> the data —
        the asset classes, the task types, the geographies, the sponsor / lender / asset names you'd
        actually find in the pairs.
      </p>

      <h3 className="font-serif text-xl font-semibold mb-4">Task type distribution</h3>
      <DataTable
        rows={[
          ["Underwriting (IC memos, deal screens, math)", "297,656 pairs · 36.7%"],
          ["Comp analysis", "114,304 pairs · 14.1%"],
          ["Valuation (DCF, cap rate, sales approach)", "107,675 pairs · 13.3%"],
          ["Tax assessment", "75,012 pairs · 9.3%"],
          ["Debt analysis", "72,960 pairs · 9.0%"],
          ["Rent roll / T-12 normalization", "59,189 pairs · 7.3%"],
          ["1031 exchange (tax-deferred)", "18,682 pairs · 2.3%"],
          ["Risk · market report · portfolio strategy · lease", "~10K combined"],
          ["Other / cross-task", "~50K"],
        ]}
      />

      <h3 className="font-serif text-xl font-semibold mt-10 mb-4">Asset class coverage</h3>
      <p className="text-sm text-neutral-700 leading-relaxed mb-3">
        Industrial STNL · Cold storage · Multifamily (market-rate &amp; affordable) · Office (trophy &amp; Class B) ·
        Retail strip · Hospitality · Self-storage · BTR (build-to-rent) · Data-center-adjacent industrial.
      </p>

      <h3 className="font-serif text-xl font-semibold mt-10 mb-4">Geographic footprint</h3>
      <p className="text-sm text-neutral-700 leading-relaxed mb-3">
        Sun Belt corridor (Phoenix, Memphis, Houston, Dallas, Atlanta, Nashville, Tampa) ·
        Gateway markets (NYC, SF, Chicago, Boston, DC) · Midwest secondary ·
        Power-corridor markets (Northern VA, Atlanta, Columbus, Permian Basin).
      </p>

      <h3 className="font-serif text-xl font-semibold mt-10 mb-4">System prompt diversity</h3>
      <p className="text-sm text-neutral-700 leading-relaxed">
        41 unique system prompts across the corpus (above the Gold Standard floor of 30) — preventing
        template memorization during fine-tuning while maintaining task consistency.
      </p>
    </Section>
  );
}

// ─── 4. Market study ───────────────────────────────────────────────────────────

function MarketStudy() {
  return (
    <Section number="05" title="Market Position" hint="How this asset stacks against the alternatives.">
      <p className="font-serif text-lg text-neutral-700 leading-relaxed">
        The Atlas Block-0 Market Study (May 2026) frames the demand: $4.7T CRE debt requires
        refinancing 2024–2028 with the peak in 2027. CMBS distress hit 11.71% in March 2026.
        Multifamily CMBS reached an all-time high of 7.15% the same month — eclipsing office
        at the same point in its cycle. 1,374 banks (31% of FDIC-insured) sit at &gt;300%
        CRE-to-Tier-1 capital concentration.
      </p>

      <p className="mt-4 font-serif text-lg text-neutral-700 leading-relaxed">
        This dataset trains the analytical layer that capital allocators, special servicers,
        independent brokers, and family office CRE desks need to navigate the maturity wall.
      </p>

      <h3 className="font-serif text-xl font-semibold mt-10 mb-4">Comparable transactions</h3>
      <DataTable
        rows={[
          ["CoStar / MSCI CRE data subscription", "$50,000–$100,000 / yr per seat — data, not training-grade"],
          ["Trepp / KBRA CMBS analytics", "$20,000–$50,000 / yr per user — analytics, not pairs"],
          ["Generic LLM fine-tune dataset (HF, web)", "Commodity → race-to-zero pricing"],
          ["Custom CRE dataset commission", "$1–5 / pair (raw) · $5–25 / pair (vetted)"],
          ["Honey-CRE-Capital-Markets v1.0 (this OM)", "Class-A vetted · Hedera-anchored · proven outcomes"],
        ]}
      />
    </Section>
  );
}

// ─── 5. Outcomes / proof ───────────────────────────────────────────────────────

function Outcomes() {
  return (
    <Section number="06" title="Outcomes &amp; Proof Points">
      <div className="border-l-4 border-amber-500 pl-6 py-2">
        <h3 className="font-serif text-2xl font-semibold mb-3">Memphis 312-unit multifamily — kill decision</h3>
        <p className="text-base text-neutral-700 leading-relaxed">
          An Atlas-class model trained on this corpus underwrote a real 312-unit Memphis multifamily
          acquisition. <strong>12 of 12 financial calculations correct.</strong> Result: a recommended <em>kill</em> on
          the deal — the property didn't pencil under stress test. A chatbot would have hedged; a
          trained colleague said no. The customer didn't lose money on a deal a generic LLM would
          have rationalized.
        </p>
      </div>

      <h3 className="font-serif text-xl font-semibold mt-10 mb-3">Models lineaged from this corpus</h3>
      <DataTable
        rows={[
          ["Atlas-class CRE underwriting models", "Memphis kill decision · IC memo grade output"],
          ["SwarmCurator-27B (CRE analysis tier)", "Loss 0.477 · 14.38h on 2× RTX PRO 6000"],
          ["Atlas-70B (Llama-3.3 + Block-0 corpus)", "Cooking now · live Wed May 6 at atlas.defendable.eth"],
        ]}
      />

      <p className="mt-6 text-sm text-neutral-600 leading-relaxed italic">
        Customer references available under NDA. Fine-tune notebooks and recipe deeds reproducible
        from <span className="font-mono">cookbook.defendable.eth</span>.
      </p>
    </Section>
  );
}

// ─── 7. Model Home Inspection ──────────────────────────────────────────────────

function ModelHomeInspection() {
  return (
    <Section number="07" title="Model Home Inspection" hint="Walk through before you wire the funds.">
      <p className="font-serif text-lg text-neutral-700 leading-relaxed mb-8">
        This building has a finished model home — <strong>Atlas-70B</strong>. Like a CRE buyer
        walking a spec home before taking title, qualified prospects test, query, and verify the
        working proof of what this corpus produces. The model home isn't marketing — it's the
        deliverable. <strong>Take it home with the deal, day-1 working.</strong>
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded mb-10">
        <div className="font-serif text-xl font-semibold text-amber-900 mb-2">
          The model home is also the deliverable.
        </div>
        <p className="text-sm text-amber-900 leading-relaxed">
          Buy the dataset alone (the lot &amp; the plans), buy the dataset + cookbook
          (lot + materials specced), or take the furnished model home with the deal —
          corpus + Cookbook Recipe #1 + Atlas-70B merged weights, fee simple, day-1 working.
          Three tiers. Same closing process.
        </p>
      </div>

      <h3 className="font-serif text-2xl font-semibold mb-4">Five-step inspection</h3>
      <div className="space-y-5">
        <InspectionStep
          n="1"
          title="Walk the model home"
          body="Live demo at atlas.defendable.eth — opens for showings Wed May 6, 2026. Query Atlas-70B with your own deal scenarios. See real reasoning on real underwriting math, not marketing copy. The same Atlas-class reasoning that closed the Memphis 312-unit deal is what answers your test queries."
        />
        <InspectionStep
          n="2"
          title="Inspect the construction grade"
          body="Read Cookbook Recipe #1 at cookbook.defendable.eth — the full construction manual. Inspect JellyScore distribution (target ≥ 75 for Honey-class). Audit pair samples for Class A material. The recipe is open-source; you can re-cook from base weights and verify identical outputs."
        />
        <InspectionStep
          n="3"
          title="Audit the title"
          body="Verify the Hedera anchor on mainnet topic 0.0.10291838. Recompute Merkle proofs from any pair fingerprint up to the catalog root. Confirm dataset SHA-256 matches the published hash (5822f146a14c537c…). No central authority required — anyone with the public deed can verify, including you, before you wire."
        />
        <InspectionStep
          n="4"
          title="Run your own DD"
          body="Sample 100 pairs delivered post-NDA. Train a probe model on your own infrastructure (or compare against Atlas-70B at atlas.defendable.eth). Check that the math holds, the format is what we claim, and the outputs match what you saw in the live demo."
        />
        <InspectionStep
          n="5"
          title="Close &amp; take title"
          body="Wire USDC (preferred — same-day finality) or initiate Stripe close. Hedera deed records the title transfer under your account ID. Within 24 hours of close, you receive the corpus archive, Merkle proof bundle, recipe deed, and (Furnished tier) merged Atlas-70B weights. Free and clear. Day-1 working product."
        />
      </div>

      <h3 className="font-serif text-2xl font-semibold mt-12 mb-4">Time-to-market comparison</h3>
      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
        AI shops compete on speed-to-market. The model-home-with-the-deal compresses your build cycle
        from months to a single day.
      </p>
      <div className="rounded-lg border border-neutral-300 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100">
            <tr>
              <th className="text-left p-4 font-semibold border-b border-neutral-200 w-2/5">Build path</th>
              <th className="text-left p-4 font-semibold border-b border-neutral-200">Time to deployed model</th>
              <th className="text-left p-4 font-semibold border-b border-neutral-200">Risk profile</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 align-top">Build everything from scratch</td>
              <td className="p-4 align-top font-mono text-red-700">5 – 10 months</td>
              <td className="p-4 align-top text-neutral-700">Data sourcing · cleaning · validation · MRM audit · training execution</td>
            </tr>
            <tr className="bg-neutral-50">
              <td className="p-4 align-top">Build from open / scraped data</td>
              <td className="p-4 align-top font-mono text-orange-700">3 – 6 months</td>
              <td className="p-4 align-top text-neutral-700">Compliance · MRM-audit failure · Class B / commodity grade · provenance gap</td>
            </tr>
            <tr>
              <td className="p-4 align-top">Buy the corpus + train your own model</td>
              <td className="p-4 align-top font-mono text-amber-700">2 – 4 weeks</td>
              <td className="p-4 align-top text-neutral-700">Training execution risk only · GPU + recipe-fidelity hold the rest</td>
            </tr>
            <tr className="bg-emerald-50">
              <td className="p-4 align-top font-semibold">Take the model home with the deal</td>
              <td className="p-4 align-top font-mono font-bold text-emerald-700">24 hours</td>
              <td className="p-4 align-top text-emerald-900 font-medium">Day-1 working product · iterate from there · zero build risk</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-neutral-600 leading-relaxed italic">
        In CRE, stabilized assets (already leased, already cash-flowing) trade at tighter cap rates
        than value-add plays. Time is in the price. The model home with the deal is the stabilized tier.
      </p>
    </Section>
  );
}

function InspectionStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500 text-neutral-900 font-bold flex items-center justify-center text-lg">
        {n}
      </div>
      <div className="flex-1">
        <h4 className="font-serif text-lg font-semibold mb-1">{title}</h4>
        <p className="text-sm text-neutral-700 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── 8. Due diligence / title ──────────────────────────────────────────────────

function DueDiligence() {
  return (
    <Section number="08" title="Due Diligence &amp; Title">
      <p className="font-serif text-lg text-neutral-700 leading-relaxed mb-6">
        Like a CRE deal, every Honey package carries title work. Below is the chain of custody —
        verifiable independently before you wire funds.
      </p>

      <DataTable
        rows={[
          ["Per-pair fingerprint", "SHA-256 of canonicalized message content · stable across format normalizations"],
          ["Pair-level grade", "JellyScore 0–100 (≥ 75 for Honey class) · 5-dim CoT scoring · tribunal of dual judges (different families)"],
          ["Package Merkle root", "Computed over all pair fingerprints · O(log n) audit path per pair"],
          ["Hedera anchor", "HCS mainnet topic 0.0.10291838 · sequence number per package · timestamped + signed"],
          ["Dataset SHA-256 (full corpus)", "5822f146a14c537c7f8c96600414bb0bb59dde0b57e8a2c9df381e29ff116251"],
          ["Recipe deed (how the corpus was cooked)", "cookbook.defendable.eth · Recipe #1 · Meta-Cookbook FSDP-QLoRA"],
          ["Sample audit URL", "Provided in data room · click any pair → full lineage path back to raw signal"],
          ["Schema spec", "Open source · published with the OM · breaks if non-compliant pair is ingested"],
        ]}
      />

      <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
        Standing audit principle: <strong>any buyer can re-anchor any pair to the published Merkle root and Hedera
        receipt independently — no Swarm involvement required.</strong> That's the Defendable standard.
      </p>
    </Section>
  );
}

// ─── 7. Risk factors ───────────────────────────────────────────────────────────

function RiskFactors() {
  return (
    <Section number="09" title="Risk Factors">
      <ul className="space-y-3 text-base text-neutral-800 leading-relaxed">
        <Bullet>
          <strong>Vintage cap.</strong> Pairs were generated March–April 2026. Q2 2026 specific facts
          (e.g., named foreclosures from May 2026 onward) require the Q2 2026 Freshness Pool, which is
          deeded separately as <span className="font-mono">cookbook.defendable.eth/freshness-2026Q2</span>.
        </Bullet>
        <Bullet>
          <strong>Out of scope.</strong> No personal data, no real-time prices, no individual borrower
          identities tied to PII. The corpus is reasoning-grade, not a market data feed.
        </Bullet>
        <Bullet>
          <strong>Geographic skew.</strong> Sun Belt and Gateway markets are over-represented vs national
          population. Mountain West and Pacific Northwest have lighter coverage.
        </Bullet>
        <Bullet>
          <strong>Generation framework.</strong> Pairs were RJP-cooked through SwarmCurator + Together.ai
          frontier models, then judged by independent dual-family LLM tribunals. No human-in-the-loop for
          every pair (would not scale to 810K).
        </Bullet>
      </ul>
    </Section>
  );
}

// ─── 9. Fee simple transfer terms ──────────────────────────────────────────────

function FeeSimpleTransfer() {
  return (
    <Section number="10" title="Fee Simple Transfer Terms" hint="Title moves cleanly. You own it.">
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded mb-8">
        <div className="font-serif text-xl font-semibold text-emerald-900 mb-2">
          You buy it. You own it. Title transfers.
        </div>
        <p className="text-sm text-emerald-900 leading-relaxed">
          This is a fee simple sale. No royalty back. No revenue share. No kill switch. No
          subscription gate. The corpus, its provenance chain, and every right to use, modify,
          and derive from it transfer to the buyer at closing. Swarm &amp; Bee retains only the
          immutable Hedera record proving the sale occurred — like a county recorder's office
          retaining the deed-of-sale document.
        </p>
      </div>

      <h3 className="font-serif text-xl font-semibold mb-4">What transfers to the buyer</h3>
      <ul className="space-y-2 text-base text-neutral-800 leading-relaxed mb-8">
        <Bullet>The full corpus (signed JSONL archive · 810,097 pairs · ~2.86 GB).</Bullet>
        <Bullet>The Merkle proof archive — every pair's audit path back to the catalog root.</Bullet>
        <Bullet>The Hedera ownership receipt — recorded on mainnet topic <span className="font-mono text-sm">0.0.10291838</span> under the buyer's account ID.</Bullet>
        <Bullet>Schema spec, fingerprint manifest, JellyScore methodology — all open to verify.</Bullet>
        <Bullet>Right to fine-tune, evaluate, deploy internally, derive new models, sublicense derivatives, resell the underlying corpus.</Bullet>
        <Bullet>Defendable Class A certification chain — transfers to models trained on the corpus, subject to recipe + audit compliance.</Bullet>
      </ul>

      <h3 className="font-serif text-xl font-semibold mb-4">Reasonable deed restrictions (CRE-style covenants)</h3>
      <ul className="space-y-2 text-base text-neutral-800 leading-relaxed mb-8">
        <Bullet>No bulk re-publication of the raw corpus to public registries (HuggingFace, GitHub) — preserves the asset class for the buyer and any future buyers.</Bullet>
        <Bullet>No competitive re-deeding (selling the same corpus as "your" Class A asset to a different buyer simultaneously) — title is unique per Hedera record.</Bullet>
        <Bullet>Attribution preserved on derivative model cards where reasonable (papers, public deployments) — same as a CRE seller asking for credit on a successful repositioning.</Bullet>
      </ul>
      <p className="text-sm text-neutral-600 italic mb-8">
        These are deed restrictions, not licenses. They run with the asset, not with the buyer's
        balance sheet. Same way an HOA covenant follows the property when you sell the house.
      </p>

      <h3 className="font-serif text-xl font-semibold mb-4">Pricing tiers (indicative — confirm in data room)</h3>
      <DataTable
        rows={[
          ["Sample (100 pairs, NDA-gated)", "Free · pre-purchase due diligence"],
          ["Vertical slice (≤ 100K pairs, single asset class focus)", "Fee simple · inquire"],
          ["Full corpus (810,097 pairs)", "Fee simple · inquire"],
          ["Per-pair tier (volume ≥ 1,000 pairs)", "Fee simple per-unit · inquire"],
          ["Refresh access (future freshness pools, e.g. Q2 2026, Q3 2026)", "Separately deeded sales — each freshness pool is a new fee simple asset"],
        ]}
      />

      <h3 className="font-serif text-xl font-semibold mt-10 mb-4">Delivery &amp; closing</h3>
      <DataTable
        rows={[
          ["Format", "JSONL · UTF-8 · OpenAI chat-message structure · one record per line"],
          ["Verification artifacts", "Merkle proof archive · Hedera anchor receipt · per-pair fingerprint manifest"],
          ["Channel", "Buyer-controlled S3-compatible bucket · IPFS pin · or signed direct download"],
          ["Closing settlement", "USDC on Ethereum (preferred · same-day finality) · Stripe USD ACH/wire · custom on request"],
          ["Title recording", "Hedera HCS deed transfer message under buyer's account ID · receipt issued at close"],
          ["Closing timeline", "Standard 5–10 business days post-NDA · accelerated close available for institutional buyers"],
        ]}
      />
    </Section>
  );
}

// ─── 9. Closing / next steps ──────────────────────────────────────────────────

function Closing() {
  return (
    <section className="bg-neutral-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          11 · Closing
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
          Three ways to take title.
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <CloseCard
            step="01"
            title="Walk the model home"
            cost="Free · live demo"
            href="mailto:build@swarmandbee.ai?subject=Honey-CRE-Capital-Markets%20—%20Model%20Home%20Walkthrough%20(Atlas-70B%20Demo)"
            cta="Book showing"
          />
          <CloseCard
            step="02"
            title="Full data room"
            cost="NDA-gated · sample 100 pairs"
            href="mailto:build@swarmandbee.ai?subject=Honey-CRE-Capital-Markets%20—%20Data%20Room%20Access%20(NDA)"
            cta="Request access"
          />
          <CloseCard
            step="03"
            title="Take the deal · furnished tier"
            cost="USDC or Stripe at close"
            href="mailto:build@swarmandbee.ai?subject=Honey-CRE-Capital-Markets%20—%20Furnished%20Tier%20(Corpus%20%2B%20Recipe%20%2B%20Atlas%20Weights)"
            cta="Begin closing"
          />
        </div>

        <p className="mt-12 text-sm text-neutral-400 leading-relaxed">
          For verified data room access we'll ask for a one-page background — institution, intended
          use case, signing authority. NDAs are templated and turn around in 24h. Sample pairs deliver
          within the same business day after NDA execution.
        </p>
      </div>
    </section>
  );
}

function CloseCard({ step, title, cost, href, cta }: {
  step: string; title: string; cost: string; href: string; cta: string;
}) {
  return (
    <a href={href} className="block rounded-lg border border-neutral-700 bg-neutral-800 p-6 hover:border-amber-400 transition-colors">
      <div className="text-xs font-mono text-amber-400 mb-2">STEP {step}</div>
      <div className="font-serif text-xl font-semibold">{title}</div>
      <div className="mt-1 text-xs text-neutral-400">{cost}</div>
      <div className="mt-4 text-sm text-amber-400 font-semibold">{cta} →</div>
    </a>
  );
}

// ─── bottom bar ────────────────────────────────────────────────────────────────

function BottomBar() {
  return (
    <footer className="bg-stone-100 border-t border-neutral-300 py-10">
      <div className="max-w-4xl mx-auto px-6 text-xs text-neutral-600 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-neutral-900 mb-1">Swarm &amp; Bee</div>
            <p>Commercial Compute Intelligence Refinery.<br />
              D-U-N-S 138652395 · Florida LLC · Licensed real estate brokerage<br />
              Donovan Mackey, Founder &amp; Broker of Record</p>
          </div>
          <div>
            <div className="font-semibold text-neutral-900 mb-1">Document</div>
            <p className="font-mono">OM-CRE-Capital-Markets-v1.0</p>
            <p>Issued <span className="font-mono">2026-05-03</span> · Confidential · Defendable Class A</p>
            <p className="mt-2">For qualified institutional buyers. NDA required for full data room.</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-neutral-300 flex flex-wrap justify-between gap-3">
          <span>© 2026 Swarm &amp; Bee. All rights reserved.</span>
          <Link to="/" className="hover:text-neutral-900">← swarmandbee.ai</Link>
        </div>
      </div>
    </footer>
  );
}

// ─── shared section primitives ─────────────────────────────────────────────────

function Section({ number, title, hint, children }: {
  number: string; title: React.ReactNode; hint?: string; children: React.ReactNode;
}) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-xs font-mono text-amber-700 mb-2">{number}</div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-2">{title}</h2>
        {hint && <p className="text-sm text-neutral-500 italic mb-8">{hint}</p>}
        {!hint && <div className="mb-8" />}
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="pl-5 relative leading-relaxed">
      <span className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full" />
      {children}
    </li>
  );
}

function DataTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-lg border border-neutral-300 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} className={i % 2 ? "bg-neutral-50" : ""}>
              <td className="p-4 font-semibold text-neutral-700 align-top w-1/3 border-r border-neutral-200">{label}</td>
              <td className="p-4 text-neutral-900 leading-snug">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
