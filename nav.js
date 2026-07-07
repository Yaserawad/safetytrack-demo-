/* ============================================
   SafetyTrack — Shared Navigation
   Include on EVERY page, right after <body> opens:
   <script src="nav.js"></script>

   How it works:
   - Wraps your existing page content automatically
   - Renders the same sidebar + top bar everywhere
   - Highlights whichever page matches the current filename
   - Add a new screen to the NAV_ITEMS list below and it
     appears on every page's sidebar automatically
   ============================================ */

const NAV_ITEMS = [
  { label: "Dashboard",           file: "index.html",       icon: "ti-layout-dashboard" },
  { label: "Campus Map",          file: "map.html",         icon: "ti-map-2" },
  { label: "Equipment",           file: "equipment.html",   icon: "ti-fire-extinguisher" },
  { label: "Inspections",         file: "inspections.html", icon: "ti-clipboard-check" },
  { label: "History",             file: "history.html",     icon: "ti-history" },
  { label: "Findings",            file: "findings.html",    icon: "ti-alert-triangle" },
  { label: "Sites",               file: "sites.html",       icon: "ti-building" },
  { label: "Accounts",            file: "accounts.html",    icon: "ti-users" },
  { label: "Reports",             file: "reports.html",     icon: "ti-chart-bar" },
  { label: "Notifications",       file: "notifications.html", icon: "ti-bell" },
  { label: "QR Codes",            file: "qrcodes.html",     icon: "ti-qrcode" },
  { label: "Settings",            file: "settings.html",    icon: "ti-settings" },
];

(function () {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  const sidebarLinks = NAV_ITEMS.map(item => {
    const active = item.file === currentFile ? "active" : "";
    return `<a class="st-sidebar-link ${active}" href="${item.file}">
              <i class="ti ${item.icon}"></i><span>${item.label}</span>
            </a>`;
  }).join("");

  const shellStart = `
    <div class="st-topbar">
      <button class="st-menu-btn" id="stMenuBtn" aria-label="Open menu">
        <i class="ti ti-menu-2"></i>
      </button>
      <a class="st-topbar-logo" href="index.html">
        SafetyTrack<span class="dot">.</span>
      </a>
    </div>
    <div class="st-layout">
      <nav class="st-sidebar" id="stSidebar">${sidebarLinks}</nav>
      <div class="st-overlay" id="stOverlay"></div>
      <main class="st-main" id="stMain"></main>
    </div>
  `;

  document.addEventListener("DOMContentLoaded", () => {
    // Move all existing body content into the new #stMain container,
    // so every page keeps its own screen content untouched.
    const existingContent = Array.from(document.body.childNodes);
    document.body.insertAdjacentHTML("afterbegin", shellStart);
    const main = document.getElementById("stMain");
    existingContent.forEach(node => main.appendChild(node));

    // Mobile menu toggle
    const sidebar = document.getElementById("stSidebar");
    const overlay = document.getElementById("stOverlay");
    const menuBtn = document.getElementById("stMenuBtn");
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("open");
    });
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    });
  });
})();
