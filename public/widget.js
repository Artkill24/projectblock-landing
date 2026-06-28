/**
 * ProjectBlock Usage Widget
 *
 * <div id="pb-usage"></div>
 * <script src="https://project-block.com/widget.js"
 *         data-key="pb_pub_..."
 *         data-user="usr_123"></script>
 */
(function () {
  // Trova il proprio tag <script> in modo robusto, indipendentemente
  // da come è stato inserito nel DOM (document.currentScript è fragile
  // sotto React/Next.js e altri framework che manipolano il DOM).
  function findOwnScript() {
    if (document.currentScript) return document.currentScript;
    const scripts = document.querySelectorAll('script[src*="widget.js"]');
    return scripts[scripts.length - 1] || null;
  }

  const script = findOwnScript();
  if (!script) {
    console.error("[ProjectBlock Widget] Could not locate own script tag.");
    return;
  }

  const key = script.getAttribute("data-key");
  const userId = script.getAttribute("data-user");
  const targetId = script.getAttribute("data-target") || "pb-usage";
  const API = "https://api.project-block.com";

  if (!key || !userId) {
    console.error("[ProjectBlock Widget] Missing data-key or data-user attribute.");
    return;
  }

  function init() {
    const container = document.getElementById(targetId);
    if (!container) {
      console.error(`[ProjectBlock Widget] No element with id="${targetId}" found.`);
      return;
    }

    if (!document.getElementById("pb-widget-style")) {
      const style = document.createElement("style");
      style.id = "pb-widget-style";
      style.textContent = `
        .pb-widget { font-family: monospace; background: #0d0d12; border: 1px solid rgba(255,255,255,0.1);
          padding: 16px 20px; border-radius: 4px; color: #e8e8f0; max-width: 280px; }
        .pb-widget .pb-label { font-size: 10px; letter-spacing: 0.1em; color: rgba(232,232,240,0.45);
          text-transform: uppercase; margin-bottom: 8px; }
        .pb-widget .pb-bar-track { background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
        .pb-widget .pb-bar-fill { height: 100%; background: #00e5cc; transition: width 0.3s ease; }
        .pb-widget .pb-bar-fill.pb-warn { background: #f59e0b; }
        .pb-widget .pb-bar-fill.pb-danger { background: #ff4d6d; }
        .pb-widget .pb-stats { display: flex; justify-content: space-between; font-size: 11px; color: rgba(232,232,240,0.7); }
        .pb-widget .pb-footer { margin-top: 10px; font-size: 9px; color: rgba(232,232,240,0.3); text-align: right; }
        .pb-widget .pb-footer a { color: #00e5cc; text-decoration: none; }
      `;
      document.head.appendChild(style);
    }

    async function render() {
      container.innerHTML = `<div class="pb-widget"><div class="pb-label">Loading usage...</div></div>`;
      try {
        const res = await fetch(`${API}/v1/embed/usage?key=${encodeURIComponent(key)}&user_id=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();

        const pct = Math.min(data.used_pct, 100);
        const barClass = pct >= 100 ? "pb-danger" : pct >= 80 ? "pb-warn" : "";

        container.innerHTML = `
          <div class="pb-widget">
            <div class="pb-label">AI Usage This Month</div>
            <div class="pb-bar-track">
              <div class="pb-bar-fill ${barClass}" style="width:${pct}%"></div>
            </div>
            <div class="pb-stats">
              <span>$${data.cost_usd.toFixed(4)} used</span>
              <span>$${data.budget_usd.toFixed(2)} budget</span>
            </div>
            <div class="pb-footer">Powered by <a href="https://project-block.com" target="_blank">ProjectBlock</a></div>
          </div>
        `;
      } catch (e) {
        container.innerHTML = `<div class="pb-widget"><div class="pb-label" style="color:#ff4d6d">Could not load usage data.</div></div>`;
        console.error("[ProjectBlock Widget]", e);
      }
    }

    render();
    setInterval(render, 30000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
