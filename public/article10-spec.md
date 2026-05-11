> **DEPRECATED · OUT OF JURISDICTION · 2026-05-11**
>
> Swarm and Bee LLC is registered in the USA. EU AI Act Article 10 enforcement applies to providers
> operating in or placing AI systems on the EU market. We don't, so we're not subject to it as an
> issuer. This spec is archived. If a US-applicable equivalent emerges (NIST AI RMF mapping, SEC AI
> data governance, HIPAA evidence pack for medical corpora), it will be drafted as a separate
> spec under our actual jurisdiction. The underlying pack format (evidence-pack.json, Merkle root,
> Tribunal seal, sha256 receipts) is reusable; the Article 10 clause-mapping is not.
>
> Original draft preserved below for reference only.
>
> ---

# Defendable Article 10 Compliance Evidence Pack · Spec v1.0

**Status:** ARCHIVED · DEPRECATED · 2026-05-11 · v1.0
**Issuer:** Swarm and Bee LLC · `swarmandbee.eth`
**Standard:** Carries the `defendable.eth` certification mark
**Enforcement target:** [EU AI Act Article 10](https://artificialintelligenceact.eu/article/10/) · enforcement effective **2026-08-02**
**Pre-flight legal review:** REQUIRED before commercial issuance (Section 11)

---

## 1 · Goal

Every Swarm & Bee dataset shipped after 2026-08-02 carries a **machine-verifiable, legally-reviewable Article 10 evidence pack** that demonstrates the corpus satisfies EU AI Act Article 10 requirements for high-risk AI training, validation, and testing data.

The pack is:
- **Self-contained** — one tarball, no external dependencies to verify
- **Machine-validatable** — every file has a JSON schema
- **Human-readable** — every file has a markdown counterpart for legal review
- **Independently verifiable** — buyer runs `VERIFY.sh` and gets a deterministic pass/fail
- **Chain-anchored** (optional) — hash committed to Hedera Consensus Service topic `0.0.10291838`
- **Tribunal-sealed** — signed by `swarmandbee.eth` after senior-hack + (where applicable) external counsel review

Buyers pay a **Defendable-Certified premium tier** (15–30% over plain wholesale) for the pack. The pack is delivered alongside the corpus tarball; either can be verified independently.

---

## 2 · What Article 10 requires (the compliance surface)

EU AI Act Article 10 ([full text](https://artificialintelligenceact.eu/article/10/)) governs **training, validation, and testing data** for high-risk AI systems. The evidence pack maps to:

| Article 10 clause | Subject | Evidence pack file |
|---|---|---|
| 10(2)(a) | Design choices in data collection | `design-choices.md` |
| 10(2)(b) | Data collection processes & origin | `source-log.jsonl` + `collection-process.md` |
| 10(2)(c) | Data prep ops (annotation, labeling, cleaning, enrichment, aggregation) | `transformation-log.jsonl` + `curator-process.md` |
| 10(2)(d) | Assumptions about what data measures / represents | `representativeness.md` |
| 10(2)(e) | Availability, quantity, suitability assessment | `suitability.md` + `manifest.json` |
| 10(2)(f) | Examination for possible biases (likelihood / impact / mitigation) | `bias-assessment.md` |
| 10(2)(g) | Identified data gaps & shortcomings, plan to address | `gaps-statement.md` |
| 10(3) | Relevance · representativeness · free of errors · completeness | `quality-statement.md` |
| 10(4) | Characteristics of geographical / behavioral / functional setting | `setting-fit.md` |
| 10(5) | Special categories of personal data (handling + safeguards) | `pii-handling.md` (only when applicable) |

Plus our standard provenance layer:
- `manifest.json` — pair-level inventory + sha256
- `merkle-tree.json` — Merkle tree over all pair hashes
- `tribunal-seal.json` — tribunal grade + reviewer signatures
- `hedera-anchor.json` — HCS transaction id (optional)
- `curator-signature.json` — `swarmandbee.eth` signature over the Merkle root
- `defendable-cert.json` — `defendable.eth` certification stamp

**Penalties for non-compliance:** Article 99(4) — up to **€35M or 7% of global revenue**, whichever is higher.

---

## 3 · Pack structure

```
<corpus_name>.evidence-pack-v1.tar.zst
├── README.md                       human-readable overview · entry point
├── evidence-pack.json              canonical entry · index of all files + their hashes
├── article10-mapping.md            clause-by-clause mapping (table from Section 2)
│
├── article10/                      one file per Article 10 sub-clause
│   ├── design-choices.md           10(2)(a)
│   ├── collection-process.md       10(2)(b)
│   ├── curator-process.md          10(2)(c)
│   ├── representativeness.md       10(2)(d)
│   ├── suitability.md              10(2)(e)
│   ├── bias-assessment.md          10(2)(f)
│   ├── gaps-statement.md           10(2)(g)
│   ├── quality-statement.md        10(3)
│   ├── setting-fit.md              10(4)
│   └── pii-handling.md             10(5) (when applicable)
│
├── logs/
│   ├── source-log.jsonl            one row per source ingested
│   ├── transformation-log.jsonl    one row per cleaning/dedup/grading op
│   └── reviewer-log.jsonl          tribunal reviewer signatures + timestamps
│
├── provenance/
│   ├── manifest.json               every pair with sha256 + tier grade + timestamps
│   ├── merkle-tree.json            full Merkle tree (root + intermediate nodes)
│   ├── tribunal-seal.json          tribunal grade + reviewer pubkeys + signature
│   ├── curator-signature.json      detached signature by swarmandbee.eth over merkle root
│   ├── defendable-cert.json        defendable.eth certification stamp + version
│   └── hedera-anchor.json          HCS topic 0.0.10291838 · transaction id + timestamp
│
├── schemas/                        JSON Schema for each machine-readable file
│   ├── evidence-pack.schema.json
│   ├── manifest.schema.json
│   ├── source-log.schema.json
│   ├── transformation-log.schema.json
│   ├── tribunal-seal.schema.json
│   ├── merkle-tree.schema.json
│   └── ...
│
└── VERIFY.sh                       deterministic verification script
    VERIFY.py                       Python equivalent · no shell deps
```

Pack is distributed as a single tarball with `.tar.zst` compression (zstd, level 19). Typical size: **2–8 MB per evidence pack**, independent of corpus size (the corpus ships separately).

---

## 4 · Canonical entry point · `evidence-pack.json`

The single file a verifier reads first. Everything else is discoverable from here.

```json
{
  "$schema": "https://defendable.eth.limo/schemas/evidence-pack/v1.json",
  "spec_version": "1.0",
  "issuer": {
    "name": "Swarm and Bee LLC",
    "ens": "swarmandbee.eth",
    "duns": "138652395",
    "url": "https://swarmandbee.ai"
  },
  "certification": {
    "standard": "defendable.eth",
    "stamp_file": "provenance/defendable-cert.json",
    "version": "1.0"
  },
  "corpus": {
    "name": "sb-cre-verified",
    "version": "1.0.0",
    "pair_count": 810097,
    "tier_breakdown": {
      "APEX": 12483,
      "HONEY": 695627,
      "JELLY": 89211,
      "POLLEN": 11843,
      "PROPOLIS_GLAZE": 933
    },
    "honey_grade_pct": 87.4,
    "rubric_dimensions": [
      "math_accuracy", "grounding", "capital_markets_discipline",
      "risk_awareness", "ic_readiness"
    ],
    "corpus_sha256": "<32-byte hex>",
    "merkle_root": "<32-byte hex>",
    "manifest_file": "provenance/manifest.json"
  },
  "article10_compliance": {
    "clauses_addressed": ["10(2)(a)", "10(2)(b)", "10(2)(c)",
                          "10(2)(d)", "10(2)(e)", "10(2)(f)",
                          "10(2)(g)", "10(3)", "10(4)"],
    "clauses_not_applicable": ["10(5)"],
    "rationale_for_na": "Corpus contains no special categories of personal data per GDPR Art. 9."
  },
  "tribunal_seal": {
    "seal_file": "provenance/tribunal-seal.json",
    "graded_at": "2026-04-15T00:00:00Z",
    "reviewers": ["swarmandbee.eth", "<senior_hack_pubkey>"],
    "grade": "DEFENDABLE_CERTIFIED"
  },
  "hedera_anchor": {
    "topic_id": "0.0.10291838",
    "transaction_id": "<HCS tx id>",
    "anchor_file": "provenance/hedera-anchor.json"
  },
  "legal_review": {
    "reviewed_by": "<EU-qualified counsel name + bar id>",
    "reviewed_at": "<ISO 8601>",
    "review_scope": "Article 10 sub-clauses (2)(a) through (5), Article 99(4) penalty exposure",
    "signed_attestation": "<sha256 of signed attestation pdf>"
  },
  "file_hashes": {
    "README.md": "<sha256>",
    "article10/design-choices.md": "<sha256>",
    "article10/...": "<sha256>"
  },
  "created_at": "2026-08-01T00:00:00Z"
}
```

The verifier reads `evidence-pack.json`, recomputes the sha256 of every listed file, and confirms each matches. Then it recomputes the Merkle tree from `manifest.json` and confirms the root matches `corpus.merkle_root`. Then (optional) it queries Hedera HCS for the anchor transaction and confirms the message matches the canonical hash of the pack. Three independent verification paths.

---

## 5 · Article 10 file specifications

Each file under `article10/` is a markdown document with a fixed structure for legal-reviewer scan-ability:

```markdown
# Article 10(2)(a) — Design Choices

## What the clause requires
<verbatim or close-paraphrase from Article 10 text>

## How this corpus satisfies the clause
<one paragraph, plain language, defensible>

## Concrete evidence
- <bullet> referencing specific log entries, source files, or transformation steps
- <bullet> citing the appropriate `logs/*.jsonl` or `provenance/*.json` file
- <bullet> with reproducible verification step

## Edge cases & limitations
<what we DO NOT claim · honest about scope>

## Sign-off
- Tribunal reviewer: `<pubkey>` at `<ISO 8601>`
- Issuer signature: `swarmandbee.eth` (see `provenance/curator-signature.json`)
```

Critical: the **Edge cases & limitations** section is mandatory. Honest scope-narrowing is the difference between a compliance artifact and a sales pitch. Buyers' counsel reads this section first.

---

## 6 · `bias-assessment.md` · the load-bearing one (10(2)(f))

Most legal review fails on biases. Spec requires:

```markdown
# Article 10(2)(f) — Examination for Possible Biases

## Method
- Bias categories examined: <demographic, geographic, temporal, source, vocabulary, domain-distribution>
- Detection technique per category (cite tools/scripts)
- Mitigation steps applied (cite transformation-log line numbers)

## Findings · per category

### Demographic bias
- Likelihood: <Low / Medium / High>
- Impact on health, safety, fundamental rights: <one paragraph>
- Evidence: <link to detection output>
- Mitigation: <transformation-log refs>
- Residual risk: <honest statement>

### Geographic bias
...
### Temporal bias
...
### Source bias
...
### Vocabulary / dialect bias
...
### Domain-distribution bias
...

## Aggregate residual risk
<one paragraph · what risk REMAINS after mitigation · cited to specific
   downstream use cases that may need additional safeguards>
```

The bias detection scripts run on the **graded corpus** (post-curator) and produce machine-readable output stored in `logs/bias-detection-output.jsonl`. The markdown is the legal-reviewer narrative around the data.

---

## 7 · Generator tooling · what we build

**Repo:** `github.com/SudoSuOps/defendable-article10-tools` (to be created)
**Language:** Python 3.11+, single binary entry, no GPU
**Runtime:** local on rails or any rig with the corpus mounted

```bash
# generator CLI
defendable-pack generate \
    --corpus /data/sb-cre-verified \
    --manifest /data/sb-cre-verified/manifest.json \
    --tribunal-seal /data/sb-cre-verified/tribunal-seal.json \
    --out /data/packs/sb-cre-verified.evidence-pack-v1.tar.zst \
    --hedera-anchor                 # optional; queries HCS topic 0.0.10291838
    --signer ~/.swarm/swarmandbee.eth.key

# verifier (also bundled inside the tarball as VERIFY.sh / VERIFY.py)
defendable-pack verify \
    --pack /data/packs/sb-cre-verified.evidence-pack-v1.tar.zst \
    --check-hedera                  # optional; verifies HCS anchor
    --strict                        # exit non-zero on any failure
```

Modules:
- `evidence_pack/core.py` — pack assembly, schema validation, Merkle tree
- `evidence_pack/article10.py` — clause-mapping helpers, markdown generators (with templated sections that the curator team fills in per corpus)
- `evidence_pack/bias.py` — bias-detection runners (per category)
- `evidence_pack/hedera.py` — HCS anchor + verification
- `evidence_pack/signing.py` — ENS-key signing + verification
- `evidence_pack/verify.py` — verifier entry point

**Stack:** stdlib + `requests` + `hedera-sdk-python` + `eth-account` + `jsonschema` + `cryptography`. No ML deps. Should run anywhere.

**Build time estimate:** 6–10 engineer days for v1.

---

## 8 · Verifier spec · `VERIFY.sh`

Bundled inside every tarball. A buyer extracts, runs one command, gets a deterministic verdict.

```bash
#!/usr/bin/env bash
# Defendable Article 10 Evidence Pack · Verifier v1.0
set -euo pipefail

PACK_DIR="${1:-.}"
cd "$PACK_DIR"

echo "→ Reading evidence-pack.json..."
python3 -c "import json; json.load(open('evidence-pack.json'))" \
    || { echo "FAIL: evidence-pack.json invalid"; exit 1; }

echo "→ Validating against JSON Schema..."
python3 -m jsonschema -i evidence-pack.json schemas/evidence-pack.schema.json \
    || { echo "FAIL: schema validation failed"; exit 1; }

echo "→ Recomputing file sha256 hashes..."
python3 verify_hashes.py \
    || { echo "FAIL: file hash mismatch"; exit 1; }

echo "→ Recomputing Merkle tree from manifest..."
python3 verify_merkle.py \
    || { echo "FAIL: Merkle root mismatch"; exit 1; }

echo "→ Verifying issuer signature (swarmandbee.eth)..."
python3 verify_signature.py \
    || { echo "FAIL: issuer signature invalid"; exit 1; }

if [ "${HEDERA_CHECK:-}" = "1" ]; then
    echo "→ Querying Hedera HCS topic 0.0.10291838..."
    python3 verify_hedera.py \
        || { echo "FAIL: Hedera anchor not found or mismatched"; exit 1; }
fi

echo ""
echo "PASS · Defendable Article 10 Evidence Pack verified."
echo "Issuer: swarmandbee.eth"
echo "Corpus: $(python3 -c 'import json; print(json.load(open("evidence-pack.json"))["corpus"]["name"])')"
```

A buyer's counsel reviews the markdown evidence files; their MLOps team runs `VERIFY.sh`. Two independent verification paths.

---

## 9 · Defendable certification language

Carried in `provenance/defendable-cert.json`:

```json
{
  "$schema": "https://defendable.eth.limo/schemas/cert/v1.json",
  "standard": "defendable.eth",
  "version": "1.0",
  "issued_for": "sb-cre-verified",
  "claim_summary": "This corpus has been graded, curated, and reviewed in accordance with the Swarm & Bee Bakery operating doctrine (5-dim rubric, Tribunal-Before-Training, sha256+optional-Hedera receipts). The accompanying Article 10 evidence pack addresses sub-clauses (2)(a) through (4) of EU AI Act Article 10.",
  "claim_does_not_constitute": [
    "A guarantee of suitability for any specific high-risk AI use case",
    "Legal advice — buyers must obtain independent counsel for their use case",
    "Verification of upstream source data accuracy beyond what is auditable from sources"
  ],
  "independent_verification": "Run VERIFY.sh in the evidence pack",
  "issuer_address_ens": "swarmandbee.eth",
  "certification_standard_address_ens": "defendable.eth"
}
```

**Critical:** the `claim_does_not_constitute` array is mandatory. We sell evidence of compliance, not a legal opinion. Buyers' counsel renders the legal opinion.

---

## 10 · Distribution

The corpus + evidence pack pair ships through three surfaces:

1. **bakery.swarmandbee.ai** — listed on `/menu.json` with `defendable_certified: true` flag and premium pricing tier
2. **swarmbee-bakery CLI** — `swarmbee-bakery order --sku by-the-pound --domain finance --certification defendable-article10`
3. **defendable.eth.limo / publishing** — spec v1.0 published at `defendable.eth.limo/article10-spec-v1.0` (this document, plus the JSON schemas) so any third party can independently issue compliant packs under the same standard

The **standard is open**; the **issuance is gated** by `swarmandbee.eth`-signed Tribunal seal. Other issuers can co-sign under `defendable.eth` once they prove out their own tribunal process.

---

## 11 · Legal review checkpoint · MANDATORY before commercial issuance

Before the **first paying customer** receives a v1.0 evidence pack, the spec passes external counsel review:

**Reviewer profile:**
- EU-qualified counsel (Germany, Ireland, France, or Netherlands preferred)
- AI regulatory experience (ideally on AI Act implementing acts)
- Independent of Swarm & Bee LLC (no firm advising the issuer)

**Review scope:**
- Spec v1.0 (this document) against Article 10 text
- Sample evidence pack for `sb-cre-verified` (CRE domain) against Article 10
- Sample evidence pack for `sb-medical-verified` (medical domain — Article 10(5) applies if any PII in the source)
- `defendable-cert.json` claim language for misrepresentation risk

**Output:** signed PDF attestation, attached as `legal_review.signed_attestation` in `evidence-pack.json`

**Cost estimate:** €15K–€40K [unverified]. Build budget includes this.

**Until counsel sign-off:** evidence packs may ship **for free** as preview / R&D artifacts, but **paid Defendable-Certified tier does not activate**. Customers can preview the artifact and provide feedback during this window.

---

## 12 · Week-by-week build plan (4-week launch target)

### Week 1
- Build `evidence_pack.core` + `evidence_pack.article10` modules
- Generate dry-run pack for `sb-cre-verified` (no signing yet)
- Author all 10 article10/*.md files for CRE corpus (curator team, ~2 days)
- Lock JSON Schemas in `schemas/`
- Senior-hack review of pack v0.1 — punch list

### Week 2
- Apply senior-hack fixes
- Build `evidence_pack.bias` runners + run on full sb-cre-verified corpus
- Generate `bias-assessment.md` from bias-detection output
- Build `evidence_pack.signing` (ENS-key signing + verifier)
- Build `evidence_pack.hedera` (HCS anchor + verifier)
- Generate v0.5 pack — full content, internal-grade seal only

### Week 3
- Send v0.5 pack + spec to external EU counsel for review (open the legal track)
- Build `VERIFY.sh` / `VERIFY.py` + JSON Schema validation
- Generate v0.9 pack for `sb-medical-verified` (different domain, tests generality)
- Public-facing copy on bakery.swarmandbee.ai about Defendable-Certified tier

### Week 4
- Apply counsel feedback (likely punch list on claim language + scope statements)
- Cut v1.0 packs for both corpora
- Anchor v1.0 packs to Hedera HCS topic `0.0.10291838`
- Publish spec v1.0 at `defendable.eth.limo/article10-spec-v1.0`
- List Defendable-Certified premium tier on `/menu.json`
- Outreach to first EU-exposed buyer (target: one pre-Aug-2 sale)

### Build cost
- ~10 engineer days local
- €15K–€40K external legal [unverified]
- Zero GPU time

---

## 13 · What this does NOT cover (honest scope)

- **Article 10 of EU AI Act ONLY.** The pack does not address other AI Act articles (risk management Article 9, technical documentation Article 11, transparency Article 13, human oversight Article 14, etc.). Buyers' counsel addresses those.
- **No safe harbor.** Possessing a Defendable-Certified evidence pack does not guarantee that the buyer's use of the dataset is Article 10 compliant. The buyer's use case, downstream processing, and AI system architecture all factor.
- **No retroactive coverage.** v1.0 packs issued after 2026-08-02 carry the v1.0 claim. Earlier-issued artifacts retain their original (non-Article-10-specific) Defendable seal.
- **No medical/financial advice.** The corpus is training data, not professional advice. Article 10(5) handling on `sb-medical-verified` may require domain-specific safeguards that go beyond the pack.

---

## 14 · Versioning

This is `spec v1.0`. Future revisions:
- **v1.x** — clarifications, additional optional fields, expanded bias categories
- **v2.0** — extensions for Article 13 (transparency obligations) and Article 14 (human oversight) bundling, once those clauses' implementing acts publish
- **v3.0** — multi-issuer co-signing (other organizations co-attesting under `defendable.eth`)

Each version is published at `defendable.eth.limo/article10-spec-vX.Y`. Packs reference their spec version in `evidence-pack.json` `spec_version` field.

---

**Spec author:** Swarm and Bee LLC · `swarmandbee.eth`
**Carries:** `defendable.eth` certification mark
**Distribution:** [bakery.swarmandbee.ai](https://bakery.swarmandbee.ai/) · [defendable.eth.limo](https://defendable.eth.limo/)
**Spec source:** [github.com/SudoSuOps/swarmandbee-app/blob/main/public/article10-spec.md](https://github.com/SudoSuOps/swarmandbee-app/blob/main/public/article10-spec.md) (this file)
**Word count:** ~2,450
