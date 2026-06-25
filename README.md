# vermeerhasbigmachines

Customer-facing **Vermeer × Microsoft Contact Center** engagement page, hosted on **GitHub Pages**
using the **SE-OS leave-behind SHARE GATE pattern** (`gate.js`).

- **Live URL:** https://billwhalenmsft.github.io/vermeerhasbigmachines/
- **Front gate:** `gate.js` — client-side passphrase (SHA-256) **+ expiry date**. Passphrase is
  shared out-of-band; plaintext is not in the source. Hidden automatically after `CFG.expires`.
- **Window:** expires **2026-08-24** (~60 days). To extend, bump `CFG.expires` in `gate.js`.
- **Content:** external-safe recap only — one-platform value, capabilities mapped to Vermeer's
  evaluation with public Microsoft Learn links, before/after, next steps. **No internal or
  confidential Microsoft content / no real customer data.**

## The pattern
Mirrors `billwhalenmsft/tennant-field-service-engagement`:
- Flat repo root: `index.html` + `gate.js` (+ assets).
- `index.html` references the gate as the **first** element in `<body>`:
  `<script src="gate.js"></script>`.
- GitHub Pages serves from `main` (root). Settings → Pages → Source: **Deploy from a branch → main / root**.

`gate.js` is reusable: copy it into any customer leave-behind, set `CFG.title` / `subtitle` /
`passHash` / `expires` / `contact`, and reference it as the first `<body>` script.

## Honest scope of the gate
GitHub Pages is static hosting with **no server-side auth**, so the passphrase is a **soft
display / controlled-distribution gate**, not a security boundary — appropriate because the
content here is already external-safe. Take the repo private or delete it when the engagement
window closes.

## Source of truth
The ungated source page lives in the private SE-OS repo at
`customers/vermeer/projects/contact_center_rfp/vermeer-customer-followup.html`. Regenerate this
gated copy from there if the recap changes.
