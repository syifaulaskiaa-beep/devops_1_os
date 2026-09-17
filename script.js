/* ===================== DATA APLIKASI =====================
   CARA MENGISI PROYEK YANG SUDAH SELESAI:
   Ganti "url: null" jadi "url: 'https://link-live-demo-kalian', kind: 'iframe'"
   pada proyek yang bersangkutan. Selama url masih null, ikon itu
   akan membuka jendela "Segera Hadir" alih-alih iframe.
   ========================================================== */
const APPS = [
  {
    id: "proyek1",
    name: "Proyek 1",
    color: "linear-gradient(135deg,#d8ab3a,#b8862a)",
    url: null,
    icon: `<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l2.5 2.5L16 9"/>`,
    kind: "placeholder"
  },
  {
    id: "proyek2",
    name: "Proyek 2",
    color: "linear-gradient(135deg,#7c4dd1,#4c1d95)",
    url: null,
    icon: `<path d="M4 9l1.5-5h13L20 9M4 9h16M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M9 13a3 3 0 006 0"/>`,
    kind: "placeholder"
  },
  {
    id: "proyek3",
    name: "Proyek 3",
    color: "linear-gradient(135deg,#6fb3a6,#4a8579)",
    url: null,
    icon: `<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12.5 11h2M17 11h.01M8 15h2M12.5 15h2"/>`,
    kind: "placeholder"
  },
  {
    id: "proyek4",
    name: "Proyek 4",
    color: "linear-gradient(135deg,#3d6b4a,#234030)",
    url: null,
    icon: `<path d="M6 4h12l1 4H5l1-4zM5 8h14l-1 12H6L5 8zM9 8a3 3 0 006 0"/>`,
    kind: "placeholder"
  },
  {
    id: "proyek5",
    name: "Proyek 5",
    color: "linear-gradient(135deg,#6fa8dc,#3d6ea5)",
    url: null,
    icon: `<path d="M7 17a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 17H7z"/>`,
    kind: "placeholder"
  },
  {
    id: "about",
    name: "Tentang Kelompok",
    color: "linear-gradient(135deg,#b083d1,#8a63ad)",
    icon: `<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>`,
    kind: "about"
  }
];

/* ===================== BOOT SEQUENCE ===================== */
const bootMessages = [
  "Memuat modul inti\u2026",
  "Menyiapkan proyek pengguna\u2026",
  "Menghubungkan ke GitHub Pages\u2026",
  "Menata antarmuka desktop\u2026",
  "Hampir selesai\u2026"
];

function runBoot(){
  const fill = document.getElementById("bootBarFill");
  const status = document.getElementById("bootStatus");
  let progress = 0;
  let msgIndex = 0;
  status.textContent = bootMessages[0];

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100){
      progress = 100;
      fill.style.width = "100%";
      clearInterval(interval);
      setTimeout(showLogin, 400);
      return;
    }
    fill.style.width = progress + "%";
    const newIndex = Math.min(bootMessages.length - 1, Math.floor(progress / (100 / bootMessages.length)));
    if (newIndex !== msgIndex){
      msgIndex = newIndex;
      status.textContent = bootMessages[msgIndex];
    }
  }, 260);
}

function showLogin(){
  document.getElementById("bootScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  updateClocks();
}

function updateClocks(){
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const loginTime = document.getElementById("loginTime");
  const loginDate = document.getElementById("loginDate");
  const trayClock = document.getElementById("trayClock");
  if (loginTime) loginTime.textContent = time;
  if (loginDate) loginDate.textContent = date;
  if (trayClock) trayClock.textContent = time;
}
setInterval(updateClocks, 15000);

document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("desktop").classList.remove("hidden");
});

/* ===================== DESKTOP ICONS ===================== */
const desktopIconsEl = document.getElementById("desktopIcons");
APPS.forEach(app => {
  const btn = document.createElement("button");
  btn.className = "desktop-icon";
  btn.innerHTML = `
    <span class="icon-box" style="background:${app.color}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${app.icon}</svg>
    </span>
    <span class="icon-label">${app.name}</span>
  `;
  btn.addEventListener("dblclick", () => openApp(app.id));
  let tapTimer = null;
  btn.addEventListener("click", () => {
    if (tapTimer){ clearTimeout(tapTimer); tapTimer = null; openApp(app.id); }
    else { tapTimer = setTimeout(() => { tapTimer = null; }, 350); }
  });
  desktopIconsEl.appendChild(btn);
});

/* ===================== START MENU ===================== */
const startMenuList = document.getElementById("startMenuList");
APPS.forEach(app => {
  const item = document.createElement("button");
  item.className = "start-menu-item";
  item.innerHTML = `
    <span class="dot" style="background:${app.color}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${app.icon}</svg>
    </span>
    ${app.name}
  `;
  item.addEventListener("click", () => { openApp(app.id); toggleStartMenu(false); });
  startMenuList.appendChild(item);
});

const startBtn = document.getElementById("startBtn");
const startMenu = document.getElementById("startMenu");
function toggleStartMenu(force){
  const show = force !== undefined ? force : startMenu.classList.contains("hidden");
  startMenu.classList.toggle("hidden", !show);
}
startBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleStartMenu(); });
document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && e.target !== startBtn) toggleStartMenu(false);
});

/* ===================== SHUTDOWN ===================== */
document.getElementById("shutdownBtn").addEventListener("click", () => {
  toggleStartMenu(false);
  document.getElementById("desktop").classList.add("hidden");
  document.getElementById("shutdownScreen").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("shutdownScreen").classList.add("hidden");
    document.getElementById("bootScreen").classList.remove("hidden");
    document.getElementById("bootBarFill").style.width = "0%";
    runBoot();
  }, 1800);
});

/* ===================== WINDOW MANAGER ===================== */
const windowsLayer = document.getElementById("windowsLayer");
const taskbarRunning = document.getElementById("taskbarRunning");
const openWindows = {};
let zTop = 50;
let cascadeOffset = 0;

function openApp(id){
  toggleStartMenu(false);
  const app = APPS.find(a => a.id === id);
  if (!app) return;

  if (openWindows[id]){
    const w = openWindows[id];
    w.el.classList.remove("minimized");
    focusWindow(id);
    return;
  }

  const el = document.createElement("div");
  el.className = "app-window";
  const startW = Math.min(760, window.innerWidth - 60);
  const startH = Math.min(520, window.innerHeight - 140);
  const offset = (cascadeOffset % 6) * 26;
  cascadeOffset++;
  el.style.width = startW + "px";
  el.style.height = startH + "px";
  el.style.left = (40 + offset) + "px";
  el.style.top = (30 + offset) + "px";

  const bodyHtml = app.kind === "iframe"
    ? `<iframe src="${app.url}" title="${app.name}" loading="lazy"></iframe>`
    : app.kind === "placeholder"
    ? placeholderContentHTML(app)
    : aboutContentHTML();

  el.innerHTML = `
    <div class="win-titlebar" data-role="drag">
      <span class="win-icon" style="background:${app.color}"></span>
      <span class="win-title">${app.name}</span>
      <button class="win-btn" data-action="minimize" aria-label="Minimize">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14"/></svg>
      </button>
      <button class="win-btn" data-action="maximize" aria-label="Maximize">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>
      </button>
      <button class="win-btn close" data-action="close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="win-body">${bodyHtml}</div>
    <div class="win-resize"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M14 14H10L14 10ZM14 8H12L14 6ZM8 14H6L8 12Z"/></svg></div>
  `;

  windowsLayer.appendChild(el);

  const tbBtn = document.createElement("button");
  tbBtn.className = "taskbar-app active";
  tbBtn.innerHTML = `<span class="dot" style="background:${app.color}"></span>${app.name}`;
  tbBtn.addEventListener("click", () => {
    const w = openWindows[id];
    if (w.el.classList.contains("minimized")){
      w.el.classList.remove("minimized");
      focusWindow(id);
    } else if (w.focused){
      w.el.classList.add("minimized");
      tbBtn.classList.remove("active");
    } else {
      focusWindow(id);
    }
  });
  taskbarRunning.appendChild(tbBtn);

  openWindows[id] = { el, tbBtn, focused: true, maximized: false, prevRect: null };

  el.querySelector('[data-action="close"]').addEventListener("click", () => closeApp(id));
  el.querySelector('[data-action="minimize"]').addEventListener("click", () => {
    el.classList.add("minimized");
    tbBtn.classList.remove("active");
  });
  el.querySelector('[data-action="maximize"]').addEventListener("click", () => toggleMaximize(id));

  el.addEventListener("mousedown", () => focusWindow(id));
  makeDraggable(el, id);
  makeResizable(el, id);

  focusWindow(id);
}

function placeholderContentHTML(app){
  return `
    <div class="about-content" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; height:100%;">
      <div style="width:52px;height:52px;border-radius:14px;background:${app.color};display:flex;align-items:center;justify-content:center;margin-bottom:18px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6" style="width:26px;height:26px;">${app.icon}</svg>
      </div>
      <h2 style="margin-bottom:6px;">${app.name}</h2>
      <p style="max-width:320px;">Proyek ini belum ditambahkan. Begitu tim DevOps_1 selesai mengerjakannya, buka <code style="font-family:var(--font-mono);font-size:12px;background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;">script.js</code> dan isi link live demo-nya di bagian data APPS.</p>
    </div>
  `;
}

function aboutContentHTML(){
  return `
    <div class="about-content">
      <h2>Kelompok DevOps_1</h2>
      <p>DevOps_1 OS adalah platform mini bergaya sistem operasi yang dibangun untuk menampung semua proyek tugas kelompok dalam satu tempat &mdash; cukup klik dua kali ikon di desktop untuk membukanya sebagai jendela aplikasi.</p>
      <p>Proyek-proyek yang belum selesai akan tampil sebagai "Segera Hadir" sampai link live demo-nya ditambahkan ke kode.</p>
    </div>
  `;
}

function focusWindow(id){
  Object.entries(openWindows).forEach(([key, w]) => {
    const isTarget = key === id;
    w.focused = isTarget;
    w.el.classList.toggle("focused", isTarget);
    w.tbBtn.classList.toggle("active", isTarget && !w.el.classList.contains("minimized"));
    if (isTarget){ zTop += 1; w.el.style.zIndex = zTop; }
  });
}

function closeApp(id){
  const w = openWindows[id];
  if (!w) return;
  w.el.remove();
  w.tbBtn.remove();
  delete openWindows[id];
}

function toggleMaximize(id){
  const w = openWindows[id];
  const el = w.el;
  if (!w.maximized){
    w.prevRect = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
    el.style.left = "0px"; el.style.top = "0px";
    el.style.width = "100%"; el.style.height = "100%";
    w.maximized = true;
  } else {
    Object.assign(el.style, w.prevRect);
    w.maximized = false;
  }
}

function makeDraggable(el, id){
  const handle = el.querySelector('[data-role="drag"]');
  let sx, sy, ox, oy, dragging = false;

  handle.addEventListener("mousedown", (e) => {
    if (e.target.closest(".win-btn")) return;
    dragging = true;
    focusWindow(id);
    sx = e.clientX; sy = e.clientY;
    ox = el.offsetLeft; oy = el.offsetTop;
    document.body.style.userSelect = "none";
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const w = openWindows[id];
    if (w.maximized) return;
    el.style.left = Math.max(0, ox + (e.clientX - sx)) + "px";
    el.style.top = Math.max(0, oy + (e.clientY - sy)) + "px";
  });
  window.addEventListener("mouseup", () => { dragging = false; document.body.style.userSelect = ""; });

  handle.addEventListener("dblclick", (e) => {
    if (e.target.closest(".win-btn")) return;
    toggleMaximize(id);
  });
}

function makeResizable(el, id){
  const handle = el.querySelector(".win-resize");
  let sx, sy, sw, sh, resizing = false;
  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    resizing = true;
    focusWindow(id);
    sx = e.clientX; sy = e.clientY;
    sw = el.offsetWidth; sh = el.offsetHeight;
    document.body.style.userSelect = "none";
  });
  window.addEventListener("mousemove", (e) => {
    if (!resizing) return;
    el.style.width = Math.max(280, sw + (e.clientX - sx)) + "px";
    el.style.height = Math.max(200, sh + (e.clientY - sy)) + "px";
  });
  window.addEventListener("mouseup", () => { resizing = false; document.body.style.userSelect = ""; });
}

/* ===================== INIT ===================== */
runBoot();