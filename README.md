# vermeerhasbigmachines

Private customer-share landing page for the **Vermeer × Microsoft Contact Center** follow-up,
hosted on **GitHub Pages** (the SE-OS Pages pattern — `templates/agent-team/web_ui/DEPLOY.md`,
Option A).

- **Live URL:** https://billwhalenmsft.github.io/vermeerhasbigmachines/
- **Front gate:** client-side passphrase (SHA-256 checked; plaintext is not in the source).
  Share the passphrase out-of-band; it is not stored in this repo.
- **Content:** external-safe recap only — one-platform value, capabilities mapped to Vermeer's
  evaluation with public Microsoft Learn links, before/after, next steps. **No internal or
  confidential Microsoft content.**

## How it deploys
`.github/workflows/pages.yml` publishes `web_ui/` to GitHub Pages on every push to `main`.
Enable once: **Settings → Pages → Source: GitHub Actions**.

## Honest scope of the gate
GitHub Pages is static hosting with **no server-side auth**, so the passphrase is a **soft
display gate**, not a security boundary — appropriate because the content here is already
external-safe. Take the repo private or delete it when the engagement window closes.

## Source of truth
The ungated source page lives in the private SE-OS repo at
`customers/vermeer/projects/contact_center_rfp/vermeer-customer-followup.html`. Regenerate this
gated copy from there if the recap changes.
