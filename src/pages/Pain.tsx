import { Link } from "react-router-dom";

// pain.defendable.eth · the CRE debt wall mapped · May 4, 2026
//
// Source-cited long-form market thesis. Every figure has a citation in the
// Sources section. Updated as the wall moves. Mirror at pain.defendable.eth
// (ENS subdomain · IPFS-pinned) once configured.

export default function Pain() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <PainHeader />
      <PainHero />
      <Headline />
      <TheWall />
      <BankSqueeze />
      <DistressMap />
      <TheVultures />
      <Waterfall />
      <TheLane />
      <AtlasAnswer />
      <CTA />
      <Sources />
      <PainFooter />
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function PainHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <Link to="/" className="text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors">
          ← Swarm &amp; Bee
        </Link>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <span className="font-mono text-amber-400 hidden sm:inline">pain.defendable.eth</span>
          <span className="font-mono text-neutral-500">v1 · May 4, 2026</span>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function PainHero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-neutral-950 to-amber-950/30 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          The CRE debt wall · mapped
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9]">
          The <span className="text-amber-400">Pain</span>.
        </h1>
        <p className="mt-8 text-2xl md:text-3xl text-white max-w-3xl font-bold leading-snug">
          $5 trillion outstanding. $1.5 trillion rolling. 1,374 banks at the trigger.
        </p>
        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
          A market thesis on the commercial real estate debt maturity wall — sourced,
          dated, and cited. We pulled the receipts so you don't have to. <strong>This
          is what the desk is staring at on May 4, 2026.</strong>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#wall" className="px-6 py-3 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors">
            Walk the wall →
          </a>
          <a href="#answer" className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors">
            How Atlas closes
          </a>
          <a href="#sources" className="px-6 py-3 rounded-lg border-2 border-neutral-700 text-neutral-300 font-semibold hover:border-amber-400 transition-colors">
            Sources ↓
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Headline thesis ──────────────────────────────────────────────────────────

function Headline() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4">
          The headline thesis
        </div>
        <p className="text-2xl md:text-3xl text-white leading-snug font-bold">
          The CRE debt market is in a controlled demolition.
        </p>
        <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-3xl">
          $4.99T outstanding. $1.5T rolling across 2026-2027. A $300-500B equity gap on
          2018-2021 vintage refinances. CMBS delinquency 7.55% and rising. Multifamily
          just passed office at 7.15% (record). Hotel jumped <strong>+137 bps in a
          single month.</strong> Distress is now <strong className="text-amber-400">
          maturity-driven</strong> — lenders stopped extending in Q1 2026.
        </p>
        <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-3xl">
          <strong className="text-white">EXCEPT one corner:</strong> single-tenant net
          lease at $1M-$5M with credit tenants is <strong className="text-amber-400">
          repriced, not broken</strong>. Cap 6.80% Q1 2026 (only -1 bp QoQ). 1031 buyers
          still hunt. IG-tenant financing prints positive leverage. <strong>The
          structural setup is built for a firm that can move at machine speed.</strong>
        </p>
      </div>
    </section>
  );
}

// ─── The Wall ─────────────────────────────────────────────────────────────────

function TheWall() {
  return (
    <section id="wall" className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="01" title="The wall" subtitle="Sourced data on the maturity stack" />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <BigStat n="$4.99T" label="Total CRE/MF debt" sup="1" />
          <BigStat n="$875B" label="Maturing 2026" sup="2" />
          <BigStat n="$1.26T" label="Peak year (2027)" sup="3" />
          <BigStat n="$300-500B" label="Refi equity gap" sup="9" />
          <BigStat n="+148 bps" label="Coupon shock" sup="2" />
          <BigStat n="52.7%" label="Distress is maturity-driven" sup="13" />
          <BigStat n="$23B" label="Past-maturity unpaid" sup="4" />
          <BigStat n="$115B" label="Loans <1.20× DSCR" sup="14" />
        </div>

        <div className="mt-10 prose prose-invert max-w-3xl text-neutral-300 leading-relaxed">
          <p className="text-lg">
            The Mortgage Bankers Association reports <strong className="text-white">
            $4.99 trillion of commercial and multifamily mortgage debt outstanding
            </strong> as of Q4 2025<Cite n="1" />. The MBA puts <strong className="text-white">
            17% of that stack — roughly $875 billion — maturing in 2026 alone</strong><Cite n="2" />.
            S&amp;P / CoStar's stack (which captures rolled extensions MBA leaves out)
            shows $1.15T due in 2026, peaking at $1.26T in 2027<Cite n="3" />.
          </p>
          <p className="text-lg mt-6">
            The refi gap — the difference between the proceeds a 2018-2021 vintage loan
            originated at ~4-4.7% rates and what current ~6.5% pricing supports at the
            same DSCR — runs <strong className="text-white">$300-500 billion in equity</strong>
            sponsors must inject to refi flat<Cite n="9" />. Average rate on the maturing
            cohort is 4.76% vs. 6.24% in-place — a 148 bps coupon shock per the MBA<Cite n="2" />.
          </p>
          <p className="text-lg mt-6 border-l-4 border-amber-400 pl-6">
            <strong className="text-amber-400">The gotcha:</strong> $23 billion of CMBS is
            already past its maturity date without payoff or extension<Cite n="4" />. In
            2019 that figure was effectively zero. Translation: <strong className="text-white">
            lenders stopped extending in Q1 2026.</strong> The "extend and pretend" playbook
            ended. CRED iQ data shows <strong className="text-white">52.7% of January 2026
            distress was maturity-driven</strong><Cite n="13" /> — sponsors are walking
            into the wall weekly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Bank Squeeze ─────────────────────────────────────────────────────────────

function BankSqueeze() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="02" title="The bank squeeze" subtitle="1,374 phone numbers waiting to dial" />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <BigStat n="$1.9T" label="Bank-held CRE debt" sup="5" />
          <BigStat n="37%" label="Bank share of stack" sup="5" />
          <BigStat n="1,374" label="Banks above 300% trigger" sup="6" />
          <BigStat n="195%" label="Median community bank" sup="6" />
          <BigStat n="4.06%" label="Non-OO CRE PDNA at $250B+ banks" sup="7" />
          <BigStat n="$13.4B" label="Flagstar CRE shed since YE2023" sup="11" />
          <BigStat n="333%" label="Valley concentration YE25" sup="12" />
          <BigStat n="0.9 pp" label="Empirical extend-and-pretend gap" sup="10" />
        </div>

        <div className="mt-10 prose prose-invert max-w-3xl text-neutral-300 leading-relaxed">
          <p className="text-lg">
            Banks hold the largest single share of the stack — <strong className="text-white">
            $1.9 trillion, or 37%</strong><Cite n="5" />. The pain concentrates where capital
            is thinnest: <strong className="text-white">1,374 institutions (31% of FDIC-insured
            banks) sit above the 300%-of-Tier-1 CRE concentration trigger</strong><Cite n="6" />.
            Median community-bank concentration is 195% of capital. Non-owner-occupied CRE
            past-due-non-accrual rates at the largest banks hit 4.06% in Q4 2025 — roughly
            7× the pre-pandemic average<Cite n="7" />.
          </p>

          <h3 className="mt-10 text-2xl font-bold text-white">Two case studies that crystallize the risk</h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 not-prose">
            <CaseStudy
              name="Flagstar (ex-NYCB)"
              body="Pushed profitability target from 2025 to 2026. Posted a $177M loss in 2025 (vs. $1B loss 2024). Shed $13.4B / 28% of CRE balances since YE2023. Took $388M YTD office charge-offs. Built ACL to 1.78% / >$1.2B. Reviewed 97% of its $14.6B NYC rent-regulated multifamily book — they now know exactly how underwater they are."
              cite="11"
            />
            <CaseStudy
              name="Valley National"
              body="CRE concentration trajectory: 474% (YE2023) → 362% (YE2024) → 333% (YE2025). Raised $400M in fresh capital in January 2026 explicitly to accelerate the pivot away from CRE. The slow-motion deleverage. Every borrower in the book is hearing 'reduce concentration' downstream."
              cite="12"
            />
          </div>

          <p className="mt-10 text-lg border-l-4 border-amber-400 pl-6">
            <strong className="text-amber-400">The empirical receipt:</strong> NY Fed
            Staff Report 1130 found weakly-capitalized banks assigned <strong className="text-white">
            0.9 percentage points lower</strong> probability of default to modified loans
            than well-capitalized peers<Cite n="10" /> — direct statistical evidence of
            extend-and-pretend behavior. The OCC's Fall 2025 Semiannual Risk Perspective
            now flags this in writing<Cite n="8" />.
          </p>

          <p className="mt-6 text-lg">
            <strong className="text-white">Translation for the borrower with a 2026
            balloon at one of these banks:</strong> the renewal call ends with <em>"we
            can't extend on terms you'll accept."</em> The exam calendar is the deadline.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Distress Map ─────────────────────────────────────────────────────────────

function DistressMap() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="03" title="The distress map" subtitle="Ranked by asset class · May 2026" />

        <div className="mt-10 space-y-3">
          <DistressRow
            rank="1"
            asset="Office"
            delq="11.71%"
            cite="15"
            color="red"
            note="January 2026 ATH 12.34%. CBD values -50% peak-to-trough. Towers actively deeded back: 45 Fremont SF, 600 California SF, 181 W. Madison Chicago. The depression."
          />
          <DistressRow
            rank="2"
            asset="Multifamily Sun Belt"
            delq="7.15%"
            cite="16"
            color="red"
            note="NEW ATH (March 2026) — passed office at the same cycle point. Tides Equities (lost Haverwood + Westcreek to foreclosure). GVA Real Estate (~$500M of $1B late). Applesway (~$300M lost). The bridge-loan time bomb."
          />
          <DistressRow
            rank="3"
            asset="Hotel / Lodging"
            delq="7.31%"
            cite="17"
            color="orange"
            note="Jumped +137 bps in March alone — fastest-deteriorating asset class. Nearly half of regional hotel debt matures by 2027. The wave is starting now while the press still calls it 'recovering.'"
          />
          <DistressRow
            rank="4"
            asset="Retail (broad CMBS)"
            delq="6.62%"
            cite="15"
            color="orange"
            note="Elevated but stable. Legacy mall debt drives most of the print. Headlines blur this with credit-tenant net lease — they shouldn't."
          />
          <DistressRow
            rank="5"
            asset="STNL net lease"
            delq="6.80%"
            cite="18"
            color="amber"
            note="Cap rate Q1 2026 (only -1 bp QoQ). Walgreens 8.10% (+200 bps from 2022). Dollar General 7.15% (+140 bps). CVS 6.79% intact. McDonald's ground 4.30-4.60%. Repriced, not broken. THIS IS THE LANE."
          />
          <DistressRow
            rank="6"
            asset="Industrial"
            delq="0.65%"
            cite="15"
            color="green"
            note="Cleanest asset class. But fundamentals softening: Inland Empire vacancy 8.5%, asking rents -7.8% YoY, sales volume -53.5% QoQ. Cooling, not distressed."
          />
        </div>

        <div className="mt-10 max-w-3xl text-neutral-300 leading-relaxed">
          <p className="text-lg border-l-4 border-amber-400 pl-6">
            <strong className="text-amber-400">The contrarian read:</strong> Hotel is
            underrated as a distress play (consensus still calls it "recovering"). Broad
            retail is overhyped — the headline numbers blur dying-mall CMBS with credit-tenant
            net lease, and the latter hasn't broken. STNL with Dollar General / 7-Eleven /
            QSR ground leases at 6.85-7.15% caps with 12-15 year terms is <strong className="text-white">
            still bid by 1031 capital</strong> that doesn't care about the headline CMBS print.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── The Vultures ─────────────────────────────────────────────────────────────

function TheVultures() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-neutral-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="04" title="The vultures" subtitle="Who's raising · who's actually deploying" />

        <div className="mt-10">
          <div className="rounded-lg border border-neutral-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900">
                <tr className="text-left">
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400">Fund</th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400">Size</th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400">Close</th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400">Strategy</th>
                </tr>
              </thead>
              <tbody className="text-neutral-200">
                <FundRow fund="Blackstone BREDS V" size="$8B" close="Mar 2025" strat="RE debt opportunistic" cite="19" />
                <FundRow fund="Oaktree Opportunities XII" size="$16B" close="Feb 2025" strat="Distressed debt (record)" cite="20" />
                <FundRow fund="Brookfield BSREP V" size="~$16B" close="mid-2025" strat="Strategic RE Partners" cite="21" />
                <FundRow fund="Ares AREOF IV" size="$3.3B" close="Sep 2024" strat="Special situations RE" cite="22" />
                <FundRow fund="KKR ROX II" size="$850M" close="Feb 2025" strat="Opportunistic RE credit" cite="23" />
                <FundRow fund="Starwood Fund XIII" size="active" close="Q1 2026" strat="Global opportunistic" cite="24" />
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 prose prose-invert max-w-3xl text-neutral-300 leading-relaxed">
          <p className="text-lg">
            Global real-estate dry powder runs about <strong className="text-white">$400
            billion globally, ~$260 billion targeting North America</strong><Cite n="25" />.
            The megafunds have closed. But the headline disguises a structural reality:
          </p>

          <p className="text-lg mt-6 border-l-4 border-amber-400 pl-6">
            <strong className="text-amber-400">The gotcha:</strong> pure-play "distressed"
            funds raised only <strong className="text-white">$240 million across two funds
            in 2024</strong><Cite n="26" /> — vs. roughly $70 billion in 2022. The capital
            is opportunistic and credit-flavored, not deep distress. <strong className="text-white">
            Vultures want yield, not workouts.</strong> They'll buy the note; they won't
            save the sponsor.
          </p>

          <p className="text-lg mt-6">
            Investor-driven lenders — non-bank private credit — now hold <strong className="text-white">
            14% of all CRE originations and 34% of construction</strong><Cite n="27" />.
            Banks didn't disappear; they got crowded. NPL bulk pricing trades 65-75¢ on the
            dollar<Cite n="28" />. In January 2026, Apollo sold <strong className="text-white">
            $8.6-9 billion of CRE loans to sister-co Athene at 99.7% of par</strong> — public
            CRE-debt REITs migrating onto insurance-company balance sheets<Cite n="3" />.
            The whale pool is sovereign + insurer + pension, not the retail-distress bid.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Borrower Waterfall ───────────────────────────────────────────────────────

function Waterfall() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="05" title="The borrower waterfall" subtitle="$2-5M STNL · maturing 2026 · best to worst" />

        <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
          For a typical sponsor with a 2026 balloon on a $2-5M single-tenant net lease
          asset, here's the realistic menu — ranked best outcome to last resort.
        </p>

        <div className="mt-10 space-y-3">
          <WaterRow num="1" name="Regional bank refi · full proceeds" terms="SOFR+175-225 · 65-70% LTV" body="Cleanest exit if the bank has capacity. Credit-tenant STNL clears here. Increasingly rare in 2026." />
          <WaterRow num="2" name="Life co / agency takeout" terms="5.85-6.25% · 25yr am · 60-65% LTV" body="IG-credit STNL only (Walgreens, CVS, McDonald's, etc.). Tightest pricing if the tenant earns the call." />
          <WaterRow num="3" name="CMBS execution" terms="175-250 bps · 10yr · IO available" body="STNL with IG tenant: tight spreads. Non-IG widens to 300-350 bps. Lockout / defeasance baggage." />
          <WaterRow num="4" name="SBA 504 (owner-user only)" terms="5.94% 25yr fixed · April 2026" body="Best rate in market. Requires owner-occupancy and 'substantial benefit' test — narrow eligibility." />
          <WaterRow num="5" name="Bank refi · reduced proceeds + cash-in" terms="50-55% LTV · sponsor writes the gap" body="The most common 2026 outcome. Bank renews but at a smaller stick. Sponsor injects fresh equity to bridge." highlight />
          <WaterRow num="6" name="Debt fund / private credit bridge" terms="SOFR+450-650 · 1-2yr · 1pt in/out · ~10% all-in" body="Buys time. Costs ~10% all-in. Usually a transition to a permanent takeout in 12-18 months." />
          <WaterRow num="7" name="Preferred equity recap" terms="12-15% pref + warrants · sponsor keeps control" body="RXR / Meadow / GreenBarn / Dwight as anchors. Reprices the stack but preserves the GP. Dilution real." />
          <WaterRow num="8" name="DPO with sponsor cash-in" terms="65-80¢ on the dollar · lender-motivated only" body="Sponsor or affiliate buys the note back at a discount. Only works when the lender is at the workout desk and the sponsor has dry capital." />
          <WaterRow num="9" name="Deed-in-lieu / surrender" terms="last resort · credit hit but bleeding stops" body="Hand the keys back. Credit consequences. Sometimes the right call when the equity is gone." dim />
        </div>
      </div>
    </section>
  );
}

// ─── The Lane ─────────────────────────────────────────────────────────────────

function TheLane() {
  return (
    <section className="border-b border-neutral-800 py-16 bg-gradient-to-br from-amber-950/30 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="06" title="The lane" subtitle="Why STNL $1M-$5M is where the firm hunts" />

        <div className="mt-10 max-w-3xl">
          <p className="text-2xl md:text-3xl text-white font-bold leading-snug">
            STNL is repriced. Not broken.
          </p>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Cap rates widened 75-150 bps from the 2022 peak. Walgreens repriced hard
            (+200 bps). Dollar General widened (+140 bps). CVS, McDonald's ground, and
            QSR drive-thrus held. Transaction velocity stayed healthy. <strong className="text-white">
            1031 buyers — 70% of the $2-5M lane — still hunt</strong>, and the 45-day
            ID / 180-day close clock punishes anyone slow.
          </p>
        </div>

        <div className="mt-10 rounded-lg border-2 border-amber-400 bg-neutral-900 p-7 max-w-3xl">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-3">
            The data point that crystallizes the alpha
          </div>
          <p className="text-xl text-white leading-relaxed">
            <strong className="text-amber-400">14 NNN retail assets traded 50+ basis
            points above market in Q1 2026</strong> due to maturity-driven seller
            motivation<Cite n="29" />.
          </p>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed">
            The maturity wall is creating real-time dispersion in pricing on assets that
            are otherwise fundamentally healthy. Sellers with a 2026 balloon and no bank
            renewal don't have time to shop the market. They take the first credible bid.
            <strong className="text-white"> Speed is the trade.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Atlas IS the Answer ──────────────────────────────────────────────────────

function AtlasAnswer() {
  return (
    <section id="answer" className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="07" title="Atlas IS the answer" subtitle="What the firm does about the wall" />

        <div className="mt-10 max-w-3xl text-neutral-300 leading-relaxed">
          <p className="text-lg">
            The structural setup is built for an AI-native firm:
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnswerCard
            num="01"
            title="Speed is the trade"
            body="Bank refi capacity is shut for non-IG tenants. The borrower needs a non-bank takeout in 30 days, not 90. Atlas-Underwrite delivers a refi-readiness scan in 24 hours — the same scan that takes a bank 6 weeks."
          />
          <AnswerCard
            num="02"
            title="1,374 dial-list segments"
            body="Every regional bank above the 300% trigger is a dial-list segment for the Hack-fleet. Lender by zip, maturity by month, tenant by credit. The phone book is the wall."
          />
          <AnswerCard
            num="03"
            title="The full waterfall · in real time"
            body="Atlas-SMD runs the 9-option borrower waterfall on every sponsor in the pipeline. Bank refi, life co, CMBS, SBA, debt fund, pref equity, DPO — all priced to the borrower in one conversation."
          />
          <AnswerCard
            num="04"
            title="1% closes the takeout"
            body="The brokerage closes the non-bank takeout at 1% — a third of the legacy 3% fee. The math holds because the cost stack is electrons, not headcount. The borrower saves. The firm prints."
          />
        </div>

        <div className="mt-10 max-w-3xl">
          <p className="text-lg text-neutral-300 leading-relaxed border-l-4 border-amber-400 pl-6">
            <strong className="text-white">The pain is the lane. The lane is the firm.</strong>
            {" "}A $5T market in controlled demolition needs a desk that can move at machine
            speed. That desk is Atlas. That firm is Swarm &amp; Bee.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="border-b border-neutral-800 py-20 bg-gradient-to-br from-amber-950/40 to-neutral-950">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Got a 2026 maturity?
        </h2>
        <p className="mt-6 text-xl text-neutral-300 max-w-2xl mx-auto">
          Atlas-Underwrite ships a refi-readiness scan in 24 hours. $5,000 flat.
          The 9-option waterfall priced to your specific deal.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/#services"
            className="px-7 py-4 rounded-lg bg-amber-500 text-neutral-900 font-bold hover:bg-amber-400 transition-colors"
          >
            See the menu →
          </Link>
          <Link
            to="/"
            className="px-7 py-4 rounded-lg border-2 border-neutral-700 text-neutral-100 font-semibold hover:border-amber-400 transition-colors"
          >
            Hand us a deal
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Sources ──────────────────────────────────────────────────────────────────

function Sources() {
  return (
    <section id="sources" className="border-b border-neutral-800 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader chapter="∞" title="Sources" subtitle="Every figure on this page · linked + dated" />

        <ol className="mt-10 space-y-3 text-sm text-neutral-300">
          <Source n="1" cite="MBA · Q4 2025 CRE/MF Mortgage Debt Outstanding ($4.99T)" date="Mar 26, 2026"
            href="https://www.mba.org/news-and-research/newsroom/news/2026/03/26/commercial-and-multifamily-mortgage-debt-outstanding-increased-to--4.99-trillion-in-fourth-quarter-2025" />
          <Source n="2" cite="MBA · 17% of CRE/MF mortgage balances mature in 2026 (148 bps coupon shock)" date="Feb 9, 2026"
            href="https://www.mba.org/news-and-research/newsroom/news/2026/02/09/17-percent-of-commercial-and-multifamily-mortgage-balances-to-mature-in-2026" />
          <Source n="3" cite="CoStar / S&P · The looming $1.26T debt wall" date="2026"
            href="https://www.costar.com/article/1122236114/why-commercial-property-pros-say-a-looming-1-26-trillion-debt-wall-can-be-scaled" />
          <Source n="4" cite="Trepp via MBA Newslink · CMBS delinquency Mar 2026 (7.55%)" date="April 2026"
            href="https://newslink.mba.org/mba-newslinks/2026/april/trepp-cmbs-delinquency-rate-increases/" />
          <Source n="5" cite="MBA Q4 2025 (banks 37% / $1.9T share); CRE Daily lender mix" date="Mar 26, 2026"
            href="https://www.credaily.com/briefs/cre-debt-2025-lifecos-and-cmbs-lenders-gain-ground/" />
          <Source n="6" cite="FDIC 2025 Risk Review (1,374 banks above 300% CRE concentration)" date="2025"
            href="https://www.fdic.gov/analysis/2025-risk-review.pdf" />
          <Source n="7" cite="FDIC Q4 2025 Quarterly Banking Profile (Non-OO CRE PDNA 4.06%)" date="Q4 2025"
            href="https://www.fdic.gov/quarterly-banking-profile/quarterly-banking-profile-q4-2025" />
          <Source n="8" cite="OCC Semiannual Risk Perspective Fall 2025 (refinance risk language)" date="Dec 2025"
            href="https://www.occ.gov/publications-and-resources/publications/semiannual-risk-perspective/files/pub-semiannual-risk-perspective-fall-2025.pdf" />
          <Source n="9" cite="AEW + C2R Capital · 2018-2021 vintage refi gap ($300-500B)" date="2026"
            href="https://www.aew.com/research/cre-lending-stabilises-while-debt-funding-gap-remains" />
          <Source n="10" cite="NY Fed Staff Report 1130 · Extend-and-Pretend in U.S. CRE (0.9 pp PD gap)" date="Dec 2024"
            href="https://www.newyorkfed.org/research/staff_reports/sr1130.html" />
          <Source n="11" cite="The Real Deal / Bisnow · Flagstar (NYCB) Q4 2025 deep dive" date="Q4 2025 / Q1 2026"
            href="https://therealdeal.com/new-york/2026/02/02/flagstar-back-to-profitability-after-slashing-cre-exposure/" />
          <Source n="12" cite="American Banker · Valley National's $400M capital raise" date="Jan 29, 2026"
            href="https://www.americanbanker.com/news/valleys-400m-capital-raise-accelerates-pivot-away-from-cre" />
          <Source n="13" cite="CRED iQ · January 2026 distress flow 52.7% maturity-driven" date="Jan 2026"
            href="https://www.credaily.com/briefs/maturing-debt-drives-2026-cre-distress/" />
          <Source n="14" cite="Trepp · $115B maturing 2026 with in-place DSCR <1.20×" date="2026"
            href="https://www.trepp.com/trepp-talk" />
          <Source n="15" cite="Trepp via Connect CRE · CMBS office delinq 11.71% Mar 2026" date="April 2026"
            href="https://www.connectcre.com/stories/office-cmbs-delinquencies-reach-new-all-time-high-to-start-2026/" />
          <Source n="16" cite="YieldPRO / Trepp · Multifamily CMBS new ATH 7.15%" date="April 2026"
            href="https://yieldpro.com/2026/04/multifamily-cmbs-delinquency-rate-reaches-new-high-in-march/" />
          <Source n="17" cite="Matthews REIS · Hotel CMBS delinquency +137 bps in March" date="April 2026"
            href="https://www.matthews.com/market_insights/hotel-delinquency" />
          <Source n="18" cite="Boulder Group · Single-Tenant Net Lease cap rates Q1 2026 (6.80%)" date="April 2026"
            href="https://www.connectcre.com/stories/single-tenant-net-lease-cap-rates-compress-slightly-in-q1-2026/" />
          <Source n="19" cite="Blackstone · BREDS V $8B final close" date="Mar 7, 2025"
            href="https://www.blackstone.com/news/press/blackstone-announces-8-billion-final-close-for-latest-real-estate-debt-strategies-fund/" />
          <Source n="20" cite="Dakota / Connect Money · Oaktree XII $16B record close" date="Feb 2025"
            href="https://www.dakota.com/fundraising-news/oaktree-capital-closes-distressed-debt-fund-at-16b" />
          <Source n="21" cite="Inforcapital · Brookfield BSREP V" date="2025"
            href="https://inforcapital.com/funds/brookfield-strategic-real-estate-partners-v-bsrep-v/" />
          <Source n="22" cite="Ares · AREOF IV $3.3B final close" date="Sept 13, 2024"
            href="https://www.businesswire.com/news/home/20240913180027/en/Ares-Management-Raises-Over-%243.3-Billion-of-U.S.-Opportunistic-Real-Estate-Capital" />
          <Source n="23" cite="Private Debt Investor · KKR ROX II $850M" date="Feb 2025"
            href="https://www.privatedebtinvestor.com/kkr-lines-up-850m-for-opportunistic-real-estate-credit-fund/" />
          <Source n="24" cite="PERE · Starwood Fund XIII Q1 2026 close target" date="2026"
            href="https://www.perenews.com/starwood-eyes-final-close-for-fund-xiii-by-q1-2026/" />
          <Source n="25" cite="JLL · Dry powder for real estate (~$400B global / ~$260B North America)" date="2026"
            href="https://www.jll.com/en-us/insights/dry-powder-for-investment" />
          <Source n="26" cite="CRE Daily / Preqin · Distressed CRE funds dry up ($240M in 2024)" date="2025"
            href="https://www.credaily.com/newsletters/distressed-opportunistic-cre-funds-dry-up/" />
          <Source n="27" cite="The Real Deal · Investor-driven lenders 14% / 34% share" date="2026"
            href="https://therealdeal.com/data/national/2026/banks-private-lenders-lead-2025-cre-debt-growth/" />
          <Source n="28" cite="commercialrealestate.loans · NPL bulk pricing 65-75¢ on the dollar" date="2026"
            href="https://www.commercialrealestate.loans/npl-performing-loan-financing/" />
          <Source n="29" cite="Boulder Group · Q1 2026 Net Lease Tenant Profiles (14 NNN +50 bps)" date="April 2026"
            href="https://www.barchart.com/story/news/618489/the-boulder-group-releases-q1-2026-net-lease-tenant-profiles-report" />
        </ol>
      </div>
    </section>
  );
}

// ─── Footer + Hack credit ─────────────────────────────────────────────────────

function PainFooter() {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-400">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
              Receipts pulled by
            </div>
            <p className="text-sm">
              Four research Hacks running in parallel · May 4, 2026.
            </p>
            <ul className="mt-3 space-y-1 font-mono text-xs">
              <li><span className="text-amber-400">●</span> Hack-Wall (the maturity stack)</li>
              <li><span className="text-amber-400">●</span> Hack-Bank (regional concentration)</li>
              <li><span className="text-amber-400">●</span> Hack-Map (asset-class distress)</li>
              <li><span className="text-neutral-600">●</span> Hack-Vultures · <span className="text-neutral-500 italic">on Shine — bailed on first attempt, brought receipts on rerun</span></li>
            </ul>
            <p className="mt-3 text-[11px] text-neutral-500 italic">
              MAGIC sprint discipline: the floor is glass.
            </p>
          </div>
          <div className="md:text-right">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-2">
              The page
            </div>
            <p className="text-sm">
              Mirrored at <span className="text-amber-400 font-mono">pain.defendable.eth</span>{" "}
              (ENS · IPFS-pinned)
            </p>
            <p className="mt-2 text-sm">
              Updates as the wall moves. Version stamped at top.
            </p>
            <p className="mt-3 text-[11px] text-neutral-500">
              <Link to="/" className="hover:text-amber-400 transition-colors">← Back to Swarm &amp; Bee</Link>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 text-[11px] text-neutral-600">
          <p>
            <strong className="text-neutral-400">Honest disclosure:</strong> This is market
            commentary based on cited public sources as of May 4, 2026. Not investment
            advice. Sponsor-specific outcomes will vary. Numbers move; cited sources are
            timestamped. Forward-looking statements about firm capabilities reflect current
            operating intent — not committed outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ chapter, title, subtitle }: { chapter: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-baseline gap-4 flex-wrap">
      <span className="text-[11px] font-mono text-amber-400 tracking-widest">CH {chapter}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">{title}</h2>
      <span className="text-sm text-neutral-500 font-mono">{subtitle}</span>
    </div>
  );
}

function BigStat({ n, label, sup }: { n: string; label: string; sup: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <div className="text-2xl md:text-3xl font-black text-amber-400 leading-tight">
        {n}<sup className="text-xs text-neutral-500 ml-1 font-normal">{sup}</sup>
      </div>
      <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-neutral-400">{label}</div>
    </div>
  );
}

function Cite({ n }: { n: string }) {
  return (
    <a href={`#src-${n}`} className="text-[11px] text-amber-400 ml-0.5 align-super hover:underline">
      [{n}]
    </a>
  );
}

function CaseStudy({ name, body, cite }: { name: string; body: string; cite: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <h4 className="text-lg font-bold text-amber-400">{name}<Cite n={cite} /></h4>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

function DistressRow({ rank, asset, delq, cite, color, note }: {
  rank: string; asset: string; delq: string; cite: string;
  color: "red" | "orange" | "amber" | "green"; note: string;
}) {
  const colorMap: Record<string, string> = {
    red: "border-red-500/60 bg-red-950/20",
    orange: "border-orange-500/60 bg-orange-950/20",
    amber: "border-amber-500/60 bg-amber-950/20",
    green: "border-emerald-500/60 bg-emerald-950/20",
  };
  return (
    <div className={`rounded-lg border-l-4 border ${colorMap[color]} p-5 grid grid-cols-12 gap-4 items-baseline`}>
      <div className="col-span-1 text-2xl font-black text-amber-400">{rank}</div>
      <div className="col-span-11 md:col-span-3">
        <h4 className="text-lg font-bold text-white">{asset}</h4>
        <div className="mt-1 text-2xl font-black text-amber-400">{delq}<Cite n={cite} /></div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">CMBS delinquency / cap</div>
      </div>
      <div className="col-span-12 md:col-span-8 text-sm text-neutral-300 leading-relaxed">{note}</div>
    </div>
  );
}

function FundRow({ fund, size, close, strat, cite }: { fund: string; size: string; close: string; strat: string; cite: string }) {
  return (
    <tr className="border-t border-neutral-800">
      <td className="px-4 py-3 font-semibold">{fund}<Cite n={cite} /></td>
      <td className="px-4 py-3 font-black text-amber-400">{size}</td>
      <td className="px-4 py-3 text-neutral-400">{close}</td>
      <td className="px-4 py-3 text-neutral-300">{strat}</td>
    </tr>
  );
}

function WaterRow({ num, name, terms, body, highlight, dim }: {
  num: string; name: string; terms: string; body: string; highlight?: boolean; dim?: boolean;
}) {
  const cls = highlight
    ? "border-amber-500/60 bg-amber-950/20"
    : dim
    ? "border-neutral-800 bg-neutral-900/30 opacity-70"
    : "border-neutral-800 bg-neutral-900";
  return (
    <div className={`rounded-lg border ${cls} p-5 grid grid-cols-12 gap-4 items-baseline`}>
      <div className="col-span-1 text-2xl font-black text-amber-400">{num}</div>
      <div className="col-span-11 md:col-span-4">
        <h4 className="text-base font-bold text-white">{name}</h4>
        <div className="mt-1 text-xs font-mono text-amber-400 leading-relaxed">{terms}</div>
      </div>
      <div className="col-span-12 md:col-span-7 text-sm text-neutral-300 leading-relaxed">{body}</div>
    </div>
  );
}

function AnswerCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border-2 border-neutral-800 bg-neutral-900 p-6 hover:border-amber-400 transition-colors">
      <div className="text-xs font-mono text-amber-400 font-bold tracking-widest">{num}</div>
      <h4 className="mt-2 text-xl font-bold text-white">{title}</h4>
      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{body}</p>
    </div>
  );
}

function Source({ n, cite, date, href }: { n: string; cite: string; date: string; href: string }) {
  return (
    <li id={`src-${n}`} className="flex gap-4">
      <span className="font-mono text-amber-400 shrink-0 w-8">[{n}]</span>
      <span className="flex-1">
        <a href={href} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-amber-400 transition-colors">
          {cite}
        </a>
        <span className="text-neutral-500 ml-2">· {date}</span>
      </span>
    </li>
  );
}
