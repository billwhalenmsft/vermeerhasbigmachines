/*
 * SE OS leave-behind SHARE GATE — client-side password + expiration.
 *
 * Reusable across customer leave-behinds. Referenced as the first <script> in
 * <body> of each page you want gated (the hub and any prototype).
 *
 * ⚠️ SCOPE: this is a DISPLAY / controlled-distribution gate, not a
 * confidentiality boundary. The site is on public GitHub Pages, so a determined
 * person could still pull assets directly. Use it for DEMO-DATA-ONLY content
 * (no real customer data). For confidential content use PageDrop (single HTML,
 * server-side password) or Azure Static Web Apps / Cloudflare Access (real auth).
 *
 * To change the password: compute the SHA-256 of the new passphrase and replace
 * CFG.passHash below. PowerShell one-liner:
 *   $p="newpass"; ([Security.Cryptography.SHA256]::Create().ComputeHash(
 *     [Text.Encoding]::UTF8.GetBytes($p)) | %{ $_.ToString('x2') }) -join ''
 * To change expiry: set CFG.expires (YYYY-MM-DD, hides after end of that day).
 */
(function () {
  var CFG = {
    title: "Vermeer Contact Center Engagement",
    subtitle: "Prepared for Vermeer Corporation by Microsoft",
    // SHA-256 of the share passphrase (passphrase itself is shared out-of-band).
    // Current passphrase: sammy-booing-mahal-endeavor
    passHash: "e16fbb82a3b353561063f240779f5d10d5ab63043c99674ed5b0d6c40d80ef5f",
    expires: "2026-08-24", // ~60-day window; preview hidden after end of this day
    contact: "Bill Whalen (Microsoft)",
  };
  var KEY = "seos_share_gate_ok";
  var root = document.documentElement;
  root.style.visibility = "hidden";

  function reveal() { root.style.visibility = "visible"; }
  function mount(el) {
    if (document.body) document.body.appendChild(el);
    else document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(el); });
  }
  function isExpired() { return new Date() > new Date(CFG.expires + "T23:59:59"); }
  async function sha256(s) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }
  function wall(inner) {
    var ov = document.createElement("div");
    ov.id = "seos-gate";
    ov.style.cssText =
      "visibility:visible;position:fixed;inset:0;z-index:2147483647;background:#0b3b66;color:#fff;" +
      "font-family:'Segoe UI',system-ui,sans-serif;display:flex;align-items:center;justify-content:center;" +
      "padding:24px;box-sizing:border-box;";
    ov.innerHTML = "<div style='max-width:420px;width:100%;text-align:center'>" + inner + "</div>";
    mount(ov);
    return ov;
  }
  function showExpired() {
    wall(
      "<div style='font-size:46px;margin-bottom:12px'>\u23F3</div>" +
      "<h1 style='font-size:22px;margin:0 0 8px'>This preview has expired</h1>" +
      "<p style='color:rgba(255,255,255,.7);margin:0;font-size:15px;line-height:1.5'>Please contact " +
      CFG.contact + " for an updated link.</p>"
    );
  }
  function showPrompt(err) {
    wall(
      "<div style='display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:20px'>" +
      "<div style='display:flex;align-items:center;gap:7px'>" +
      "<div style='display:grid;grid-template-columns:repeat(2,11px);gap:2px'>" +
      "<span style='display:block;width:11px;height:11px;background:#F25022'></span>" +
      "<span style='display:block;width:11px;height:11px;background:#7FBA00'></span>" +
      "<span style='display:block;width:11px;height:11px;background:#00A4EF'></span>" +
      "<span style='display:block;width:11px;height:11px;background:#FFB900'></span></div>" +
      "<span style='font-size:15px;font-weight:600;color:#fff'>Microsoft</span></div>" +
      "<span style='width:1px;height:26px;background:rgba(255,255,255,.3)'></span>" +
      "<span style='font-size:15px;font-weight:800;letter-spacing:.5px;color:#FFCD00'>VERMEER</span></div>" +
      "<h1 style='font-size:21px;margin:0 0 4px'>" + CFG.title + "</h1>" +
      "<p style='color:rgba(255,255,255,.6);margin:0 0 18px;font-size:13px'>" + CFG.subtitle + "</p>" +
      "<input id='seos-pw' type='password' autocomplete='off' placeholder='Password' " +
      "style='width:100%;padding:11px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.25);" +
      "background:rgba(255,255,255,.08);color:#fff;font-size:15px;box-sizing:border-box;margin-bottom:10px'/>" +
      (err ? "<div style='color:#ff9a9a;font-size:13px;margin-bottom:10px'>Incorrect password. Try again.</div>" : "") +
      "<button id='seos-go' style='width:100%;padding:11px;border:0;border-radius:9px;background:#0078d4;" +
      "color:#fff;font-weight:700;font-size:15px;cursor:pointer'>View preview \u2192</button>"
    );
    function submit() {
      var v = document.getElementById("seos-pw").value;
      sha256(v).then(function (h) {
        var g = document.getElementById("seos-gate");
        if (h === CFG.passHash) {
          try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
          if (g) g.remove();
          reveal();
        } else {
          if (g) g.remove();
          showPrompt(true);
        }
      });
    }
    var go = document.getElementById("seos-go");
    if (go) go.addEventListener("click", submit);
    var pw = document.getElementById("seos-pw");
    if (pw) {
      pw.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
      pw.focus();
    }
  }

  if (isExpired()) { showExpired(); return; }
  var ok = false;
  try { ok = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  if (ok) { reveal(); return; }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { showPrompt(false); });
  else showPrompt(false);
})();
