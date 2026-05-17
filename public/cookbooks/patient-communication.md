# Cookbook · Patient Communication · 1500

**Target failure mode.** Medical-jargon-to-plain-language rewrite, consent explanation, triage script generation — while maintaining clinical accuracy. The model should pass a Flesch reading-ease check **and** still be medically defensible.

This is the cookbook for patient-portal copy, after-visit summaries, and any LLM surface that talks to non-clinicians without dumbing it down.

---

## ▍ The receipt

**Plain language doesn't mean medically wrong.** The headline claim of this cookbook is that maintained-accuracy at patient register is achievable when you train on a corpus of *already-verified plain-language clinical content* — not on synthetic "rewrite this jargon" pairs that drift over time.

**The receipt comes from the source materials, not from a cooked model:**

- **NHS patient-facing guidance** is the largest verified plain-language clinical corpus in production. Reading ease on the source pages averages **Flesch 60+** while passing UK MHRA accuracy review.
- **MedlinePlus** (US NIH) is the equivalent US gold standard for patient-level health info.
- Both sources are *already cooked by humans for register*. The training task becomes mimicking the register, not inventing it.

**Cookbook-specific receipt:** *pending.* No model has been cooked on this exact ingredient mix yet. First paying customer's pre/post `founder-voice` eval delta publishes here.

---

## ▍ The recipe — Swarm & Bee Gold Standard QLoRA

Same Gold Standard config. See [Glycemic Reasoning](/cookbooks/glycemic-reasoning.md) for full YAML.

**Patient-communication-specific tweak:** if you want the cooked model to *prefer* shorter responses, set `max_new_tokens` in your eval generation config to `256` and the model will learn the brevity register implicitly through the corpus distribution. NHS pages average ~180 tokens per Q/A. Don't fight it.

---

## ▍ The ingredients — 1500 cells, deterministic

| SKU | Cells | Source file | Why it's in the mix |
|---|---:|---|---|
| [Global Crumpet](/menu.json) | **800** | `09_international_pairs.jsonl` | NHS patient-facing guidance — the foundation. UK English register. |
| [Federal Glaze](/menu.json) | **500** | `06_government_pairs.jsonl` | MedlinePlus + CDC patient-level. US English register, federal voice. |
| [Founder's Pretzel](/menu.json) | **100** | `07_bigideas_pattern_pairs.jsonl` | Lived-experience register — patient-to-patient compassionate vocabulary. |
| [Compliance Cookie](/menu.json) | **100** | `10_refusal_pairs.jsonl` | Defer-to-clinician patterns — friendly register but knows its limits. |
| **Total** | **1500** | | |

Note: NHS and MedlinePlus pull together gives you both UK and US registers. The cooked model will tend toward the dominant register (UK at 800 cells vs US at 500). If you need US-dominant, swap proportions — say so in `--notes` and we adjust before assembly.

---

## ▍ Schema · what a Global Crumpet cell looks like

```json
{
  "id": "intl-diabetesau-facts-about-diabetes-www-diabetesaustralia-com-au-a-q1",
  "specialty": "diabetic-companion",
  "tier": "royal-jelly",
  "source": "DiabetesAU",
  "source_title": "Diabetes Australia",
  "url": "https://www.diabetesaustralia.com.au/about-diabetes/",
  "page_title": "Diabetes Australia",
  "section_heading": "Facts about diabetes",
  "license_note": "Diabetes Australia, open patient education",
  "scraped_at": "2026-05-14",
  "citation": "www.diabetesaustralia.com.au/about-diabetes/",
  "question": "According to Diabetes Australia, on the topic of \"facts about diabetes\"...",
  "answer": "Diabetes is the epidemic of the 21st century and the biggest challenge confronting..."
}
```

Every cell carries the source URL and a citation string. The cooked model can emit `(source: NHS / National Diabetes Service)` style attributions in its responses — the corpus models the pattern.

---

## ▍ Loader

Identical to other cookbooks. The `source`, `url`, and `citation` metadata fields are particularly useful here — you can train a citation-emitting model by including them in your prompt template, or strip them with `del metadata['url']` if you want pure register-only training.

---

## ▍ Eval · dmack_eval_set_v1 focus

| Category | Probes | Why it matters here |
|---|---:|---|
| `founder-voice` | **20** (all) | Register tests — the model must hold compassionate, patient-level voice without drifting to clinical-jargon or to over-casual chatbot tone. |
| `citation-behavior` | **5** | Model must cite source when stating clinical facts — exactly what the corpus trains for. |
| `voicedrift-and-thinktag` | **5** | Model must not leak `<think>` tokens or drift register mid-response. |

The 20 `founder-voice` probes are the highest-stakes for this cookbook — failing them means the cooked model lost the register, which defeats the purpose.

---

## ▍ How to order

```bash
swarmbee-bakery cookbook patient-communication

swarmbee-bakery order \
  --sku cookbook \
  --cookbook patient-communication \
  --name "Your Name" \
  --email "you@you.dev" \
  --settlement stripe \
  --notes "cooking for patient-portal after-visit summaries · US register dominant please" \
  --confirm
```

---

## ▍ What you get on delivery

Same shape as other cookbooks. Includes the additional `register_eval_pack.jsonl` — 30 patient-portal prompts hand-curated specifically for this cookbook to test register hold over 256-token generations.

---

## ▍ Pricing

- **$899** flat for 1500-cell cookbook
- Cooked-for-you: +$249 + GPU pass-through
- Settlement: Stripe invoice OR USDC to `swarmusdc.eth`

---

## ▍ No fake science

- NHS / MedlinePlus reading-ease numbers (Flesch 60+) are measured on the source pages, not on cooked model outputs. The claim is: *training on this register tends to produce this register.* The full claim ("the cooked model maintains Flesch 60+ after fine-tune") publishes when the first eval ships.
- License notes are real and per-cell. NHS pages are Crown Copyright with open re-use for clinical/educational; MedlinePlus is US Public Domain. You can train commercially on this corpus.
- If your post-cook register drift exceeds 5 Flesch points downward, that is a cookbook bug — tell us, we adjust ingredient proportions and re-ship.
