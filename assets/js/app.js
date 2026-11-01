/* ============================================================
 * app.js — 路由 / 页面渲染 / 交互
 * ============================================================ */

Store.load();

const appEl = document.querySelector('.app-shell');
const contentEl = () => document.getElementById('content');

/* ---------------- 图标 ---------------- */
const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M10 4h8.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H10"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><path d="M8.4 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.6"/></svg>',
  practice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.9-5.2A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1.5 1.5-2 6-2 6s4.5-.5 6-2"/><path d="M14 4c4 0 6 2 6 6 0 5-5 9-9 10l-3-3C9 13 10 4 14 4z"/><circle cx="15" cy="9" r="1.6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5A1.5 1.5 0 0 0 20 18.5z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3-1 4-2 6s0 3 0 3-2-1-2-3c-1.5 2-2 3.5-2 5a6 6 0 0 0 12 0c0-4-3-6-6-11z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7"/></svg>',
  timeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/></svg>',
  agent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="9" width="14" height="10" rx="2.5"/><path d="M9.5 14h.01M14.5 14h.01M12 9V5.5"/><circle cx="12" cy="4" r="1.3"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3.5V8M15 3.5V8"/><path d="M7 8h10v2.5a5 5 0 0 1-5 5 5 5 0 0 1-5-5z"/><path d="M12 15.5V21"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 19.5 6v5.5c0 4.6-3.2 7.6-7.5 9-4.3-1.4-7.5-4.4-7.5-9V6z"/><path d="m9 11.5 2.2 2.2L15.5 9.5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/></svg>'
};

function ic(name, size = 18, color) {
  return `<span class="ic-s" style="width:${size}px;height:${size}px;${color ? 'color:' + color + ';' : ''}">${I[name] || ''}</span>`;
}

/* 分类色（仅用于色点与图表） */
function catColor(catId) {
  return (CATEGORY_MAP[catId] || {}).color || '#0f5f5c';
}

/* ---------------- 工具 ---------------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function highlight(text, q) {
  const t = esc(text);
  if (!q) return t;
  const safe = esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return t.replace(new RegExp(safe, 'ig'), m => `<mark>${m}</mark>`);
}
/* 本地时区日期，避免 ISO 字符串直接截断导致跨时区差一天 */
function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}
function fmtFullDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function ring(pct, size = 64, stroke = 7, color = '#0f5f5c') {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#f1f3f3" stroke-width="${stroke}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
      style="transition:stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)"/>
  </svg>`;
}
function ringBox(pct, size, stroke, color, label, sub) {
  return `<div class="ring-box" style="position:relative;">
    <div style="position:relative;width:${size}px;height:${size}px;">
      ${ring(pct, size, stroke, color)}
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <b style="font-size:${Math.round(size / 4.2)}px;font-weight:600;line-height:1;">${pct}%</b>
        ${sub ? `<span style="font-size:10px;color:var(--faint);margin-top:2px;">${sub}</span>` : ''}
      </div>
    </div>
    ${label ? `<div style="font-size:12px;color:var(--muted);font-weight:600;">${label}</div>` : ''}
  </div>`;
}
function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.setAttribute('role', 'status');
  t.setAttribute('aria-live', 'polite');
  t.style.cssText = 'position:fixed;left:50%;bottom:34px;transform:translateX(-50%);background:#181b20;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;z-index:200;box-shadow:0 12px 30px rgba(24,27,32,.3);animation:fadeUp .2s ease';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1900);
}
const lessonHash = (l) => `#/lesson/${l.courseSlug}/${l.id}`;

/* ---------------- 菜单 ---------------- */
const MENU = [
  { hash: 'home', label: '学习概览', icon: 'home' },
  { hash: 'courses', label: '课程库', icon: 'library' },
  { hash: 'paths', label: '学习路径', icon: 'route' },
  { hash: 'practice', label: '练习测验', icon: 'practice' },
  { hash: 'progress', label: '学习进度', icon: 'chart' },
  { hash: 'bookmarks', label: '收藏笔记', icon: 'bookmark' }
];

const TITLES = {
  home: '学习概览', courses: '课程库', course: '课程详情', lesson: '课时学习',
  paths: '学习路径', practice: '练习与测验', progress: '学习进度',
  bookmarks: '收藏与笔记', assessment: '能力测评'
};

/* ---------------- 侧边栏 ---------------- */
function renderSidebar(active) {
  const lv = Store.level();
  const mk = Store.openMistakes().length;
  const bm = ALL_LESSONS.filter(l => Store.isBookmarked(l.id)).length;

  document.getElementById('sbNav').innerHTML = MENU.map(m => {
    const badge =
      m.hash === 'practice' && mk ? `<span class="sb-badge hot">${mk}</span>` :
      m.hash === 'bookmarks' && bm ? `<span class="sb-badge">${bm}</span>` : '';
    return `<a class="sb-link ${active === m.hash ? 'active' : ''}" href="#/${m.hash}" ${active === m.hash ? 'aria-current="page"' : ''}>
      ${ic(m.icon, 18)}<span>${m.label}</span>${badge}</a>`;
  }).join('');

  const streakEl = document.getElementById('streakNum');
  if (streakEl) streakEl.textContent = Store.streak();

  document.getElementById('sbLevel').innerHTML = `
    <div class="lv-t"><span class="lv-ring">${lv.level}</span> ${lv.name}</div>
    <div class="lv-s">${lv.next ? `再完成 ${lv.toNext} 节升 ${lv.next.level}` : '已达最高等级'}</div>`;
}

/* ---------------- 路由 ---------------- */
function parseHash() {
  let raw = location.hash.replace(/^#\/?/, '');
  let query = {};
  const dec = s => { try { return decodeURIComponent(s); } catch { return s; } };
  const qi = raw.indexOf('?');
  if (qi >= 0) {
    const qs = raw.slice(qi + 1);
    raw = raw.slice(0, qi);
    qs.split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) query[dec(k)] = dec(v || '');
    });
  }
  const parts = raw.split('/').filter(Boolean);
  return { name: parts[0] || 'home', p1: parts[1] || null, p2: parts[2] || null, query };
}

function router() {
  const r = parseHash();
  const view = contentEl();
  if (searchEl) closeSearch();
  document.getElementById('pageTitle').textContent = TITLES[r.name] || '学习概览';
  document.getElementById('streakNum').textContent = Store.streak();
  appEl.classList.remove('nav-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
  document.getElementById('menuBtn').setAttribute('aria-label', '打开菜单');

  let navKey = r.name;
  if (r.name === 'lesson' || r.name === 'course') navKey = 'courses';
  if (r.name === 'assessment') navKey = 'paths';
  renderSidebar(navKey);

  switch (r.name) {
    case 'courses': renderCourses(view, r.query); break;
    case 'course': renderCourse(view, r.p1); break;
    case 'lesson': renderLesson(view, r.p1, r.p2); break;
    case 'paths': renderPaths(view); break;
    case 'assessment': renderAssessment(view); break;
    case 'practice': renderPractice(view, r.query); break;
    case 'progress': renderProgress(view); break;
    case 'bookmarks': renderBookmarks(view); break;
    default: renderHome(view);
  }
  view.scrollTop = 0;
}
window.addEventListener('hashchange', router);

/* ============================================================
 * 1. 学习概览
 * ============================================================ */
function renderHome(view) {
  const s = Store.overall();
  const lv = Store.level();
  const next = Engine.nextLesson();
  const cs = Store.courseStats(next.courseSlug);
  const hour = new Date().getHours();
  const greet = hour < 6 ? '夜深了' : hour < 11 ? '早上好' : hour < 14 ? '中午好' : hour < 18 ? '下午好' : '晚上好';

  const path = PATHS.find(p => p.id === Store.state.profile.pathId);
  const pathProg = path ? Store.pathProgress(path.id) : null;

  const reco = [];
  const seen = new Set();
  const push = l => {
    if (l && !Store.isDone(l.id) && l.id !== next.id && !seen.has(l.id) && reco.length < 3) {
      seen.add(l.id); reco.push(l);
    }
  };
  if (path) path.courses.forEach(slug => getCourseLessons(slug).forEach(push));
  if (reco.length < 3) {
    CATEGORIES.forEach(c => push(ALL_LESSONS.find(x => x.cat === c.id && !Store.isDone(x.id))));
  }
  if (reco.length < 3) ALL_LESSONS.forEach(push);

  const recent = Engine.recentLessons(4);

  view.innerHTML = `
    <div class="page-head">
      <div class="page-head-row">
        <div>
          <h1 class="ph-title">${s.done > 0 ? `${greet}，继续学习` : '从第一节开始'}</h1>
          <p class="ph-sub">已完成 <b>${s.done}/${s.total}</b> 节${s.streak > 1 ? ` · 连续 ${s.streak} 天` : ''}。${s.done > 0 ? '今天学一节，正好接着推进。' : '先花几分钟，把 AI 的基本概念弄清楚。'}</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="btn btn-outline btn-sm" data-search>${ic('search', 15)} 搜索</button>
          ${!Store.state.profile.assessed ? `<a class="btn btn-outline btn-sm" href="#/assessment">能力测评</a>` : ''}
          <a class="btn btn-primary btn-sm" href="${lessonHash(next)}">${ic('play', 14)} 继续学习</a>
        </div>
      </div>
    </div>

    <div class="cont-card">
      <div class="ct-info">
        <div class="ct-k">接下来 · ${esc(next.courseTitle)} · 第 ${next.order + 1} 节</div>
        <div class="ct-t">${esc(next.title)}</div>
        <div class="ct-s">${esc(next.summary)}</div>
      </div>
      <div class="cont-foot">
        <div class="progress"><i style="width:${cs.pct}%"></i></div>
        <span class="cont-note">${next.courseTitle} ${cs.pct}%</span>
        <a class="btn btn-primary" href="${lessonHash(next)}">${Store.isDone(next.id) ? '复习本节' : '开始本节'}</a>
      </div>
    </div>

    <div class="block">
      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-top"><span class="l">已完成课时</span></div>
          <div class="kpi-v">${s.done}<small>/ ${s.total}</small></div>
          <div class="kpi-s">整体完成 ${s.pct}%</div>
        </div>
        <div class="kpi">
          <div class="kpi-top"><span class="l">累计学习</span></div>
          <div class="kpi-v">${(s.mins / 60).toFixed(1)}<small>小时</small></div>
          <div class="kpi-s">按课时标注时长估算</div>
        </div>
        <div class="kpi">
          <div class="kpi-top"><span class="l">连续学习</span></div>
          <div class="kpi-v">${s.streak}<small>天</small></div>
          <div class="kpi-s">累计 ${s.days} 天有学习记录</div>
        </div>
        <div class="kpi">
          <div class="kpi-top"><span class="l">测验正确率</span></div>
          <div class="kpi-v">${s.quizDone ? s.accuracy : '—'}<small>${s.quizDone ? '%' : ''}</small></div>
          <div class="kpi-s">已完成 ${s.quizDone} 节测验</div>
        </div>
      </div>
    </div>

    ${path ? `
    <div class="block">
      <div class="card" style="padding:16px 20px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
        ${ringBox(pathProg.pct, 48, 5, '#0f5f5c', '', '')}
        <div style="flex:1;min-width:200px;">
          <div class="code-no" style="color:var(--brand);">我的学习路径</div>
          <div style="font-size:15px;font-weight:700;margin-top:3px;">${esc(path.name)}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px;">${pathProg.done}/${pathProg.total} 节 · 建议 ${path.weeks} 周完成</div>
        </div>
        <a class="btn btn-outline btn-sm" href="#/paths">查看路径</a>
      </div>
    </div>` : ''}

    <div class="block">
      <div class="block-head">
        <h2>按主题浏览</h2>
        <a class="link" href="#/courses">全部课程 ${ic('right', 14)}</a>
      </div>
      <div class="cat-tiles">
        ${CATEGORIES.map((c, i) => `
          <a class="cat-tile" href="#/courses?cat=${c.id}">
            <span class="no">${String(i + 1).padStart(2, '0')}</span>
            <div class="ct-main">
              <div class="t">${c.name}</div>
              <div class="d">${c.desc}</div>
            </div>
            <span class="arrow">→</span>
          </a>`).join('')}
      </div>
    </div>

    ${reco.length ? `
    <div class="block">
      <div class="block-head"><h2>${s.done === 0 ? '从这些主题开始' : '为你推荐'}</h2><span class="result-count">${s.done === 0 ? '每个主题的第一课' : '基于你的学习进度'}</span></div>
      <div class="course-grid">
        ${reco.map(l => miniLessonCard(l)).join('')}
      </div>
    </div>` : ''}

    ${recent.length ? `
    <div class="block">
      <div class="block-head"><h2>最近学习</h2><a class="link" href="#/progress">查看进度 ${ic('right', 14)}</a></div>
      <div class="card" style="overflow:hidden;">
        ${recent.map(({ lesson, rec }) => `
          <a class="lrow" href="${lessonHash(lesson)}">
            <span class="lr-ic">${String(lesson.order + 1).padStart(2, '0')}</span>
            <div class="lr-main">
              <div class="lr-t">${esc(lesson.title)}</div>
              <div class="lr-s">${esc(lesson.courseTitle)} · ${lesson.mins} 分钟${rec.total ? ` · 测验 ${rec.score}/${rec.total}` : ''}</div>
            </div>
            <div class="lr-right"><span class="lr-dur">${rec.at ? rec.at.slice(5, 10).replace('-', '/') : ''}</span></div>
          </a>`).join('')}
      </div>
    </div>` : ''}
  `;

  view.querySelectorAll('[data-search]').forEach(b => b.addEventListener('click', openSearch));
}

function miniLessonCard(l) {
  const c = COURSE_MAP[l.courseSlug];
  return `<a class="course-card" href="${lessonHash(l)}" style="border-top-color:${l.catColor};">
    <div class="cc-top">
      <span class="no">${c ? c.no : ''}</span>
      <span class="cat"><i class="cdot" style="background:${l.catColor}"></i>${l.catName}</span>
      <span class="lvl">${l.mins} 分钟</span>
    </div>
    <div class="cc-body">
      <h3>${esc(l.title)}</h3>
      <div class="sub">${esc(l.summary)}</div>
      <div class="cc-meta"><span>${esc(l.courseTitle)}</span></div>
    </div>
  </a>`;
}

/* ============================================================
 * 2. 课程库
 * ============================================================ */
const CourseFilter = { cat: 'all', level: 'all', q: '' };

function renderCourses(view, query) {
  const cat = query && query.cat && CATEGORY_MAP[query.cat] ? query.cat : 'all';
  CourseFilter.cat = cat;
  CourseFilter.level = 'all';
  CourseFilter.q = '';

  view.innerHTML = `
    <div class="page-head">
      <h1 class="ph-title">课程库</h1>
      <p class="ph-sub">12 门课程、${TOTAL_LESSONS} 节课，覆盖从概念到落地的完整链路。按分类与难度筛选，或直接搜索关键词。</p>
    </div>

    <div class="filter-bar">
      <div class="filter-row">
        <span class="fl">分类</span>
        <div class="chips" id="catChips">
          <button class="chip sm ${CourseFilter.cat === 'all' ? 'active' : ''}" data-cat="all">全部</button>
          ${CATEGORIES.map(c => `<button class="chip sm ${CourseFilter.cat === c.id ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`).join('')}
        </div>
      </div>
      <div class="filter-row">
        <span class="fl">难度</span>
        <div class="chips" id="lvlChips">
          ${['all', '入门', '进阶', '高级'].map(l => `<button class="chip sm ${CourseFilter.level === l ? 'active' : ''}" data-lvl="${l}">${l === 'all' ? '全部' : l}</button>`).join('')}
        </div>
        <div class="search-inline" style="max-width:300px;margin-left:auto;">
          ${ic('search', 15, '#9aa2ab')}
          <input id="courseSearch" type="search" placeholder="搜索课程、标签…" value="${esc(CourseFilter.q)}">
        </div>
      </div>
    </div>

    <div class="block-head" style="margin-top:22px;">
      <h2 style="font-size:14px;color:var(--muted);font-weight:700;" id="courseCount"></h2>
    </div>
    <div class="course-grid" id="courseGrid"></div>
  `;

  const grid = document.getElementById('courseGrid');

  function refresh() {
    const list = COURSES.filter(c => {
      if (CourseFilter.cat !== 'all' && c.cat !== CourseFilter.cat) return false;
      if (CourseFilter.level !== 'all' && c.level !== CourseFilter.level) return false;
      if (CourseFilter.q) {
        const q = CourseFilter.q.toLowerCase();
        const hay = [c.title, c.sub, c.level, CATEGORY_MAP[c.cat].name, ...c.tags].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const countEl = document.getElementById('courseCount');
    if (countEl) countEl.textContent = `共 ${list.length} 门课程`;

    grid.innerHTML = list.length ? list.map(c => courseCard(c)).join('') : `
      <div class="empty" style="grid-column:1/-1;">
        <div class="e-ic">${ic('search', 24)}</div>
        <h3>没有匹配的课程</h3>
        <p>换个关键词，或清除分类与难度筛选试试。</p>
        <button class="btn btn-outline btn-sm" style="margin-top:14px;" id="clearFilters">清除筛选</button>
      </div>`;

    const clearBtn = grid.querySelector('#clearFilters');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      CourseFilter.cat = 'all';
      CourseFilter.level = 'all';
      CourseFilter.q = '';
      renderCourses(view, {});
    });
  }

  document.getElementById('catChips').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    CourseFilter.cat = b.dataset.cat;
    [...document.querySelectorAll('#catChips .chip')].forEach(x => x.classList.toggle('active', x === b));
    refresh();
  });
  document.getElementById('lvlChips').addEventListener('click', e => {
    const b = e.target.closest('[data-lvl]');
    if (!b) return;
    CourseFilter.level = b.dataset.lvl;
    [...document.querySelectorAll('#lvlChips .chip')].forEach(x => x.classList.toggle('active', x === b));
    refresh();
  });
  document.getElementById('courseSearch').addEventListener('input', e => {
    CourseFilter.q = e.target.value;
    refresh();
  });

  refresh();
}

function courseCard(c) {
  const p = Store.courseStats(c.slug);
  const cat = CATEGORY_MAP[c.cat];
  return `<a class="course-card" href="#/course/${c.slug}" style="border-top-color:${cat.color};">
    <div class="cc-top">
      <span class="no">${c.no}</span>
      <span class="cat"><i class="cdot" style="background:${cat.color}"></i>${cat.name}</span>
      <span class="lvl">${c.level}</span>
    </div>
    <div class="cc-body">
      <h3>${esc(c.title)}</h3>
      <div class="sub">${esc(c.sub)}</div>
      <div class="cc-meta"><span>${c.lessonCount} 节 · ${c.hours} 小时</span></div>
      <div class="cc-prog">
        <div class="pl"><span>${p.done ? `已学 ${p.done}/${p.total}` : '尚未开始'}</span><b>${p.pct}%</b></div>
        <div class="progress thin"><i style="width:${p.pct}%"></i></div>
      </div>
    </div>
  </a>`;
}

/* ============================================================
 * 3. 课程详情（章节导航）
 * ============================================================ */
function renderCourse(view, slug) {
  const c = COURSE_MAP[slug];
  if (!c) { notFound(view, '没有找到这门课程'); return; }
  const cat = CATEGORY_MAP[c.cat];
  const p = Store.courseStats(c.slug);
  const exam = Store.getExam(c.slug);
  const all = getCourseLessons(c.slug);
  const firstUndone = all.find(l => !Store.isDone(l.id)) || all[0];
  document.getElementById('pageTitle').textContent = c.title;

  view.innerHTML = `
    <div class="breadcrumb">
      <a href="#/courses">课程库</a><span class="sep">/</span>
      <a href="#/courses?cat=${c.cat}">${cat.name}</a><span class="sep">/</span>
      <span>${esc(c.title)}</span>
    </div>

    <div class="course-hero" style="border-top-color:${cat.color};">
      <div class="ch-in">
        <span class="ch-cat"><i class="cdot" style="background:${cat.color}"></i>${c.no} · ${cat.name} · ${c.level}</span>
        <h1>${esc(c.title)}</h1>
        <p>${esc(c.sub)}</p>
        <div class="ch-meta">
          <span>${c.lessonCount} 节课</span>
          <span>${c.hours} 小时</span>
          <span>${c.chapters.length} 个章节</span>
          <span>已完成 ${p.done}/${p.total}</span>
        </div>
        <div class="ch-foot">
          <a class="btn btn-primary" href="${lessonHash(firstUndone)}">${p.pct === 100 ? '复习课程' : p.done ? '继续学习' : '开始学习'}</a>
          <a class="btn btn-outline" href="#/practice?exam=${c.slug}">${exam ? `重考结课测验（${exam.score}/${exam.total}）` : '结课测验'}</a>
        </div>
      </div>
    </div>

    <div class="block detail-grid">
      <div>
        ${c.chapters.map((ch, ci) => `
          <div class="chapter">
            <div class="ch-head">
              <span class="no">${String(ci + 1).padStart(2, '0')}</span>
              <div>
                <div class="t">${esc(ch.title)}</div>
                <div style="font-size:11.5px;color:var(--faint);margin-top:1px;">${esc(ch.summary)}</div>
              </div>
              <span class="s">${ch.lessons.length} 节</span>
            </div>
            ${ch.lessons.map((raw, li) => {
              const l = LESSON_MAP[raw.id] || raw;
              const done = Store.isDone(l.id);
              return `<a class="lrow ${done ? 'done' : ''}" href="${lessonHash(l)}">
                <span class="lr-ic">${String(li + 1).padStart(2, '0')}</span>
                <div class="lr-main">
                  <div class="lr-t">${esc(l.title)}</div>
                  <div class="lr-s">${l.type} · ${esc(l.summary.slice(0, 42))}${l.summary.length > 42 ? '…' : ''}</div>
                </div>
                <div class="lr-right">
                  <span class="lr-dur">${l.mins} 分钟</span>
                  <span class="lr-go">${done ? '复习' : '学习'}</span>
                </div>
              </a>`;
            }).join('')}
          </div>`).join('')}
      </div>

      <aside>
        <div class="aside-card">
          <h4>课程进度</h4>
          <div style="display:flex;align-items:center;gap:16px;">
            ${ringBox(p.pct, 76, 7, cat.color, '', '')}
            <div style="font-size:12.5px;color:var(--muted);line-height:1.9;">
              已完成 <b style="color:var(--ink);">${p.done}</b> 节<br>
              剩余 <b style="color:var(--ink);">${p.total - p.done}</b> 节<br>
              共 ${c.lessonCount} 节
            </div>
          </div>
        </div>

        <div class="aside-card">
          <h4>学完你能做到</h4>
          <ul class="ol">
            ${c.outcomes.map((o, i) => `<li><span class="n">${i + 1}</span><span>${esc(o)}</span></li>`).join('')}
          </ul>
        </div>

        <div class="aside-card">
          <h4>课程信息</h4>
          <div class="kv"><span class="k">难度</span><span class="v">${c.level}</span></div>
          <div class="kv"><span class="k">分类</span><span class="v">${cat.name}</span></div>
          <div class="kv"><span class="k">章节 / 课时</span><span class="v">${c.chapters.length} / ${c.lessonCount}</span></div>
          <div class="kv"><span class="k">建议时长</span><span class="v">${c.hours} 小时</span></div>
          <div class="kv"><span class="k">结课测验</span><span class="v">${exam ? `${exam.score}/${exam.total}` : '未参加'}</span></div>
        </div>

        ${pathHasCourse(c.slug) ? `
        <div class="aside-card">
          <h4>属于学习路径</h4>
          <div style="font-size:12.5px;color:var(--ink-2);line-height:1.9;">
            ${PATHS.filter(pp => pp.courses.includes(c.slug)).map(pp => `<div>· ${pp.name}</div>`).join('')}
          </div>
          <a class="btn btn-outline btn-sm btn-block" style="margin-top:10px;" href="#/paths">查看路径</a>
        </div>` : ''}
      </aside>
    </div>
  `;
}

function pathHasCourse(slug) {
  return PATHS.some(p => p.courses.includes(slug));
}

/* ============================================================
 * 4. 课时页
 * ============================================================ */
function renderLesson(view, slug, lessonId) {
  const l = LESSON_MAP[lessonId];
  if (!l || (slug && l.courseSlug !== slug)) { notFound(view, '没有找到这节课'); return; }
  const course = COURSE_MAP[l.courseSlug];
  const adj = getAdjacent(l.courseSlug, l.id);
  const rec = Store.rec(l.id) || {};
  const bookmarked = Store.isBookmarked(l.id);
  const related = Engine.related(l, 3);
  document.getElementById('pageTitle').textContent = l.title;

  view.innerHTML = `
    <div class="breadcrumb">
      <a href="#/courses">课程库</a><span class="sep">/</span>
      <a href="#/course/${course.slug}">${esc(course.title)}</a><span class="sep">/</span>
      <span>${esc(l.chapterTitle)}</span>
    </div>

    <div class="lesson-layout">
      <article>
        <header class="lesson-head">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
            <span class="tag"><i class="cdot" style="background:${l.catColor}"></i>${l.catName}</span>
            <span class="tag">${l.type}</span>
            <span class="tag" id="doneTag" style="color:#1c7a4d;${rec.done ? '' : 'display:none;'}">已完成</span>
          </div>
          <h1>${esc(l.title)}</h1>
          <div class="lesson-meta">
            <span>${l.mins} 分钟</span>
            <span>${esc(l.chapterTitle)}</span>
            <span>${l.quiz.length} 道测验</span>
          </div>
          <div style="display:flex;gap:8px;margin-top:14px;">
            <button class="icon-btn ${bookmarked ? 'on' : ''}" id="bookmarkBtn" title="收藏本课" aria-label="收藏本课" aria-pressed="${bookmarked}">${ic('bookmark', 17)}</button>
            <button class="btn btn-outline btn-sm" id="doneBtn">${rec.done ? '标记为未完成' : '标记为已完成'}</button>
          </div>
        </header>

        <div class="sec">
          <p style="font-size:15px;color:var(--muted);line-height:1.9;">${esc(l.summary)}</p>
        </div>

        ${l.sections.map(sec => sectionHTML(sec)).join('')}

        <div class="points">
          <h4>本节要点</h4>
          <ul>
            ${l.points.map(p => `<li>${ic('check', 14, '#1c7a4d')}<span>${esc(p)}</span></li>`).join('')}
          </ul>
        </div>

        <section class="quiz" id="lessonQuiz">
          <div class="quiz-head"><h3>${ic('practice', 17, '#0f5f5c')} 随堂测验</h3><span class="qn">${l.quiz.length} 题</span></div>
          <div class="quiz-sub">选择后立即判分，答错的题会自动进入错题本。</div>
          <div id="quizMount"></div>
        </section>

        <nav class="lesson-nav">
          ${adj.prev ? `<a href="${lessonHash(adj.prev)}"><div class="d">${ic('left', 12)} 上一节</div><div class="t">${esc(adj.prev.title)}</div></a>` : '<span style="flex:1"></span>'}
          ${adj.next ? `<a class="next" href="${lessonHash(adj.next)}"><div class="d">下一节 ${ic('right', 12)}</div><div class="t">${esc(adj.next.title)}</div></a>` : ''}
        </nav>

        ${related.length ? `
        <div class="block">
          <div class="block-head"><h2>相关课时</h2></div>
          <div class="card" style="overflow:hidden;">
            ${related.map((r, ri) => `
              <a class="lrow" href="${lessonHash(r)}">
                <span class="lr-ic">${ri + 1}</span>
                <div class="lr-main"><div class="lr-t">${esc(r.title)}</div><div class="lr-s">${esc(r.courseTitle)}</div></div>
                <div class="lr-right"><span class="lr-go">去学习</span></div>
              </a>`).join('')}
          </div>
        </div>` : ''}
      </article>

      <aside class="lesson-aside">
        <div class="aside-card toc">
          <h4>课程目录</h4>
          <div class="toc-list">
            ${getCourseLessons(course.slug).map(x => `
              <a class="toc-item ${x.id === l.id ? 'active' : ''}" href="${lessonHash(x)}">
                <span class="ti-dot"></span><span>${esc(x.title)}</span>
                ${x.id === l.id
                  ? `<span id="tocCheck" style="margin-left:auto;color:#1c7a4d;display:${Store.isDone(x.id) ? 'inline' : 'none'};">${ic('check', 11)}</span>`
                  : Store.isDone(x.id) ? `<span style="margin-left:auto;color:#1c7a4d;">${ic('check', 11)}</span>` : ''}
              </a>`).join('')}
          </div>
        </div>

        <div class="aside-card">
          <h4>我的笔记</h4>
          <textarea class="notes-area" id="noteArea" placeholder="记下你的理解、疑问或可落地的做法…">${esc(rec.note || '')}</textarea>
          <div class="notes-saved" id="noteSaved"></div>
        </div>

        <div class="aside-card">
          <h4>本课数据</h4>
          <div class="kv"><span class="k">状态</span><span class="v" id="recStatus">${rec.done ? '已完成' : '未完成'}</span></div>
          <div class="kv"><span class="k">测验成绩</span><span class="v" id="recScore">${rec.total ? `${rec.score}/${rec.total}` : '—'}</span></div>
          <div class="kv"><span class="k">收藏</span><span class="v" id="recBookmark">${bookmarked ? '已收藏' : '未收藏'}</span></div>
        </div>
      </aside>
    </div>
  `;

  /* 完成 / 收藏 / 成绩的统一状态同步（原地更新，不打断答题与滚动位置） */
  function syncLessonState() {
    const r = Store.rec(l.id) || {};
    const done = !!r.done;
    const doneTag = document.getElementById('doneTag');
    if (doneTag) doneTag.style.display = done ? '' : 'none';
    document.getElementById('doneBtn').textContent = done ? '标记为未完成' : '标记为已完成';
    document.getElementById('recStatus').textContent = done ? '已完成' : '未完成';
    document.getElementById('recScore').textContent = r.total ? `${r.score}/${r.total}` : '—';
    document.getElementById('recBookmark').textContent = Store.isBookmarked(l.id) ? '已收藏' : '未收藏';
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    bookmarkBtn.setAttribute('aria-pressed', Store.isBookmarked(l.id));
    const tocCheck = document.getElementById('tocCheck');
    if (tocCheck) tocCheck.style.display = done ? 'inline' : 'none';
  }

  /* 收藏 */
  document.getElementById('bookmarkBtn').addEventListener('click', e => {
    const on = Store.toggleBookmark(l.id);
    e.currentTarget.classList.toggle('on', on);
    syncLessonState();
    toast(on ? '已加入收藏' : '已取消收藏');
    renderSidebar('courses');
  });

  /* 完成状态 */
  document.getElementById('doneBtn').addEventListener('click', () => {
    if (Store.isDone(l.id)) {
      const r = Store.ensure(l.id);
      r.done = false;
      Store.save();
      toast('已取消完成标记');
    } else {
      Store.completeLesson(l.id);
      toast('已完成本节');
    }
    syncLessonState();
    renderSidebar('courses');
  });

  /* 笔记 */
  const noteArea = document.getElementById('noteArea');
  const savedTip = document.getElementById('noteSaved');
  let noteTimer = null;
  const commitNote = () => {
    clearTimeout(noteTimer);
    Store.setNote(l.id, noteArea.value);
  };
  noteArea.addEventListener('input', () => {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => {
      Store.setNote(l.id, noteArea.value);
      savedTip.textContent = '已自动保存';
      setTimeout(() => { savedTip.textContent = ''; }, 1600);
    }, 500);
  });
  noteArea.addEventListener('blur', commitNote);

  /* 测验 */
  mountQuiz(document.getElementById('quizMount'), l.quiz.map((q, qi) => ({
    qid: `${l.id}#${qi}`,
    question: q.q,
    options: q.options,
    answer: q.answer,
    explain: q.explain,
    lessonId: l.id,
    lessonTitle: l.title,
    cat: l.cat,
    catName: l.catName
  })), {
    title: '随堂测验',
    onFinish: (score, total, wrong) => {
      Store.recordQuiz(l.id, score, total);
      if (!Store.isDone(l.id)) Store.completeLesson(l.id);
      wrong.forEach(w => Store.addMistake({
        qid: w.qid, lessonId: l.id, lessonTitle: l.title,
        question: w.question, chosen: w.chosen, answer: w.answer,
        explain: w.explain, catName: l.catName
      }));
      syncLessonState();
      renderSidebar('courses');
    },
    onExit: () => {
      if (adj.next) location.hash = lessonHash(adj.next);
      else location.hash = `#/course/${course.slug}`;
    },
    exitLabel: adj.next ? '下一节' : '返回课程'
  });
}

function sectionHTML(sec) {
  let html = '<div class="sec">';
  if (sec.h) html += `<h3>${esc(sec.h)}</h3>`;
  if (sec.img) html += `<figure class="lesson-fig"><img src="${esc(sec.img)}" alt="${esc(sec.cap || sec.h || '课程配图')}" loading="lazy">${sec.cap ? `<figcaption>${esc(sec.cap)}</figcaption>` : ''}</figure>`;
  if (sec.p) html += `<p>${esc(sec.p)}</p>`;
  if (sec.list) html += `<ul>${sec.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (sec.code) html += `<pre><code>${esc(sec.code)}</code></pre>`;
  if (sec.formula) html += `<div class="formula">${esc(sec.formula)}</div>`;
  if (sec.tip) html += `<div class="callout">${ic('info', 16)}<div><b>提示 · </b>${esc(sec.tip)}</div></div>`;
  if (sec.warn) html += `<div class="callout warn">${ic('info', 16)}<div><b>注意 · </b>${esc(sec.warn)}</div></div>`;
  html += '</div>';
  return html;
}

/* ============================================================
 * 5. 通用测验组件
 * ============================================================ */
function mountQuiz(mount, questions, opts = {}) {
  let idx = 0;
  let score = 0;
  let wrong = [];
  let answered = false;

  function draw() {
    const q = questions[idx];
    answered = false;
    mount.innerHTML = `
      <div class="progress thin" style="margin-bottom:12px;"><i style="width:${Math.round((idx + 1) / questions.length * 100)}%"></i></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:12px;font-weight:700;color:var(--brand);">第 ${idx + 1} / ${questions.length} 题</span>
        <span style="font-size:11.5px;color:var(--faint);" id="qScore">已答对 ${score} 题</span>
      </div>
      <div class="q-text">${esc(q.question)}</div>
      <div class="q-opts">
        ${q.options.map((o, i) => `<button class="q-opt" data-i="${i}"><span class="key">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}
      </div>
      <div id="qExtra"></div>
      <div class="q-foot">
        <span class="q-hint">选择后立即判分</span>
        <button class="btn btn-primary btn-sm" id="qNext" disabled>${idx === questions.length - 1 ? '查看结果' : '下一题'}</button>
      </div>`;

    const optsEls = [...mount.querySelectorAll('.q-opt')];
    const nextBtn = mount.querySelector('#qNext');

    optsEls.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = Number(btn.dataset.i);
        const ok = chosen === q.answer;
        if (ok) score++;
        else {
          wrong.push({ ...q, chosen });
        }
        const scoreEl = mount.querySelector('#qScore');
        if (scoreEl) scoreEl.textContent = `已答对 ${score} 题`;
        optsEls.forEach((b, i) => {
          b.disabled = true;
          if (i === q.answer) b.classList.add('correct');
          else if (i === chosen) b.classList.add('wrong');
        });
        mount.querySelector('#qExtra').innerHTML = `
          <div class="q-explain">
            <b>${ok ? '回答正确' : '回答错误'} · </b>${esc(q.explain)}
            ${!ok ? `<div style="margin-top:6px;color:var(--faint);font-size:12.5px;">正确答案：${'ABCD'[q.answer]}. ${esc(q.options[q.answer])} · 本题将收入错题本</div>` : ''}
          </div>`;
        nextBtn.disabled = false;
        nextBtn.focus();
      });
    });

    nextBtn.addEventListener('click', () => {
      if (!answered) return;
      if (idx < questions.length - 1) { idx++; draw(); }
      else finish();
    });
  }

  function finish() {
    const total = questions.length;
    const g = Engine.gradeText(score, total);
    if (opts.onFinish) opts.onFinish(score, total, wrong);
    mount.innerHTML = `
      <div class="quiz-done">
        <div class="sc">${score}<small>/${total}</small></div>
        <div class="txt">
          <b>${g.label}</b><br>
          正确率 ${Math.round(score / total * 100)}%${wrong.length ? ` · ${wrong.length} 道题已进入错题本` : ' · 全部答对'}
        </div>
        <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" id="qRetry">再测一次</button>
          ${opts.onExit ? `<button class="btn btn-primary btn-sm" id="qExit">${opts.exitLabel || '继续'}</button>` : ''}
        </div>
      </div>
      ${wrong.length ? `<div style="margin-top:14px;font-size:12.5px;color:var(--muted);line-height:1.8;">
        ${wrong.map(w => `<div>· ${esc(w.question)} <span style="color:var(--ok);">正确答案：${'ABCD'[w.answer]}. ${esc(w.options[w.answer])}</span></div>`).join('')}
      </div>` : ''}`;

    const retry = mount.querySelector('#qRetry');
    if (retry) retry.addEventListener('click', () => {
      idx = 0; score = 0; wrong = []; draw();
    });
    const exit = mount.querySelector('#qExit');
    if (exit) exit.addEventListener('click', () => opts.onExit());
  }

  draw();
}

/* ---------------- 未找到 ---------------- */
function notFound(view, msg) {
  view.innerHTML = `
    <div class="empty" style="padding-top:80px;">
      <div class="e-ic">${ic('search', 26)}</div>
      <h3>${esc(msg)}</h3>
      <p>它可能已被移动，或者链接有误。</p>
      <a class="btn btn-primary btn-sm" style="margin-top:16px;" href="#/courses">返回课程库</a>
    </div>`;
}

/* ============================================================
 * 6. 学习路径
 * ============================================================ */
function renderPaths(view) {
  const cur = Store.state.profile.pathId;
  const hasAssess = Store.state.profile.assessed;

  view.innerHTML = `
    <div class="page-head">
      <div class="page-head-row">
        <div>          <h1 class="ph-title">学习路径</h1>
          <p class="ph-sub">四条按目标设计的路线，把零散课程串成有顺序的计划。不确定选哪条？先做一次 6 题能力测评。</p>
        </div>
        <a class="btn ${hasAssess ? 'btn-outline' : 'btn-primary'} btn-sm" href="#/assessment">
          ${hasAssess ? '重新测评' : '帮我选路径'}
        </a>
      </div>
    </div>

    <div class="path-list">
      ${PATHS.map(p => {
        const prog = Store.pathProgress(p.id);
        const isCur = cur === p.id;
        return `<div class="path-item ${isCur ? 'current' : ''}">
          <div class="pi-top">
            <div>
              <h3>${esc(p.name)}
                ${isCur ? `<span class="tag" style="background:var(--brand-soft);color:var(--brand-deep);">当前路径</span>` : ''}
              </h3>
              <div class="pi-desc">${esc(p.desc)}</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${isCur
                ? `<a class="btn btn-primary btn-sm" href="${lessonHash(firstUndoneOfPath(p))}">继续学习</a>`
                : `<button class="btn btn-outline btn-sm" data-setpath="${p.id}">设为我的路径</button>`}
            </div>
          </div>

          <div class="pi-pills">
            <span>建议 ${p.weeks} 周</span>
            <span>${p.level}</span>
            <span>${p.audience}</span>
          </div>

          <div class="pi-steps">
            ${p.courses.map((slug, i) => {
              const c = COURSE_MAP[slug];
              const cs = Store.courseStats(slug);
              return `<a class="pi-step ${cs.pct === 100 ? 'done' : ''}" href="#/course/${slug}">
                <div class="n">STEP ${i + 1}</div>
                <div class="t">${esc(c.title)}</div>
                <div class="s">${cs.done}/${cs.total} 节 · ${cs.pct}%</div>
              </a>`;
            }).join('')}
          </div>

          <div class="pi-prog">
            <div class="progress"><i style="width:${prog.pct}%"></i></div>
            <span style="font-size:12.5px;font-weight:700;color:var(--brand);">${prog.pct}%</span>
          </div>

          <div style="margin-top:12px;font-size:12px;color:var(--faint);">
            学完能做到：${p.outcomes.map(o => esc(o)).join(' · ')}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  view.querySelectorAll('[data-setpath]').forEach(b => {
    b.addEventListener('click', () => {
      Store.setPath(b.dataset.setpath);
      toast('已设为你的学习路径');
      renderPaths(view);
      renderSidebar('paths');
    });
  });
}

function firstUndoneOfPath(p) {
  for (const slug of p.courses) {
    const l = getCourseLessons(slug).find(x => !Store.isDone(x.id));
    if (l) return l;
  }
  return getCourseLessons(p.courses[0])[0];
}

/* ============================================================
 * 7. 能力测评
 * ============================================================ */
const AS = { idx: 0, answers: new Array(ASSESSMENT.length).fill(null) };

function renderAssessment(view) {
  const prof = Store.state.profile;
  if (prof.assessed && prof.answers && prof.answers.length === ASSESSMENT.length) {
    drawAssessResult(view, Engine.recommend(prof.answers));
    return;
  }
  drawAssessQuestion(view);
}

function drawAssessQuestion(view) {
  const q = ASSESSMENT[AS.idx];
  const sel = AS.answers[AS.idx];

  view.innerHTML = `
    <div class="page-head" style="text-align:center;">      <h1 class="ph-title">能力测评</h1>
      <p class="ph-sub" style="margin-left:auto;margin-right:auto;">6 个问题判断你的起点与目标，推荐一条真正适合你的路径。没有标准答案，凭直觉选即可。</p>
    </div>

    <div class="assess-card">
      <div class="assess-prog">
        ${ASSESSMENT.map((_, i) => `<i class="${i <= AS.idx ? 'on' : ''}"></i>`).join('')}
      </div>
      <div class="assess-top">
        <span style="font-weight:700;color:var(--brand);">第 ${AS.idx + 1} / ${ASSESSMENT.length} 题</span>
        <span>${esc(q.note)}</span>
      </div>
      <div class="assess-q">${esc(q.q)}</div>
      <div class="assess-note">选择最接近你现状的一项</div>

      <div class="q-opts" id="assessOpts">
        ${q.options.map((o, i) => `
          <button class="q-opt ${sel === i ? 'selected' : ''}" data-i="${i}">
            <span class="key">${'ABCD'[i]}</span><span>${esc(o.text)}</span>
          </button>`).join('')}
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:22px;gap:10px;">
        <button class="btn btn-outline btn-sm ${AS.idx === 0 ? 'is-disabled' : ''}" id="asPrev" ${AS.idx === 0 ? 'disabled' : ''}>← 上一题</button>
        <button class="btn btn-primary btn-sm ${sel === null ? 'is-disabled' : ''}" id="asNext" ${sel === null ? 'disabled' : ''}>
          ${AS.idx === ASSESSMENT.length - 1 ? '生成推荐结果' : '下一题'}
        </button>
      </div>
    </div>
  `;

  view.querySelectorAll('#assessOpts .q-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      AS.answers[AS.idx] = Number(btn.dataset.i);
      drawAssessQuestion(view);
    });
  });

  const prev = view.querySelector('#asPrev');
  if (prev) prev.addEventListener('click', () => {
    if (AS.idx > 0) { AS.idx--; drawAssessQuestion(view); }
  });

  const next = view.querySelector('#asNext');
  if (next) next.addEventListener('click', () => {
    if (AS.answers[AS.idx] === null) return;
    if (AS.idx < ASSESSMENT.length - 1) { AS.idx++; drawAssessQuestion(view); }
    else {
      const result = Engine.recommend(AS.answers);
      Store.applyAssessment(AS.answers, result);
      Store.setPath(result.pathId);
      drawAssessResult(view, result);
      renderSidebar('paths');
    }
  });
}

function drawAssessResult(view, res) {
  const p = res.path;
  const lv = Store.level();
  view.innerHTML = `
    <div class="page-head" style="text-align:center;">      <h1 class="ph-title">推荐结果</h1>
      <p class="ph-sub" style="margin-left:auto;margin-right:auto;">基于你的经验、基础与目标，这是最省力的起点。</p>
    </div>

    <div class="assess-card assess-result">
      <div class="ar-lv">${lv.level}</div>
      <div class="ar-nm">${lv.name}</div>
      <p style="font-size:13px;color:var(--muted);margin-top:6px;">当前能力等级（后续会随学习进度自动提升）</p>

      <div class="ar-res">
        <div><div class="v" style="font-size:15px;">${esc(p.name)}</div><div class="k">推荐路径</div></div>
        <div><div class="v">${res.weeks} 周</div><div class="k">建议完成周期</div></div>
        <div><div class="v">${p.courses.length} 门</div><div class="k">包含课程</div></div>
      </div>

      <div class="next-action" style="text-align:left;">
        <b>为什么是这条路径：</b>${esc(res.advice)}
      </div>

      <div style="text-align:left;margin-top:18px;">
        <div style="font-size:12.5px;font-weight:700;margin-bottom:10px;">路径安排</div>
        ${p.courses.map((slug, i) => {
          const c = COURSE_MAP[slug];
          return `<a class="lrow" style="border:1px solid var(--line);border-radius:10px;margin-bottom:8px;padding:12px 14px;" href="#/course/${slug}">
            <span class="lr-ic">${i + 1}</span>
            <div class="lr-main">
              <div class="lr-t">${esc(c.title)}</div>
              <div class="lr-s">${c.lessonCount} 节 · ${c.hours} 小时 · ${c.level}</div>
            </div>
            <span class="lr-go">查看</span>
          </a>`;
        }).join('')}
      </div>

      <div style="display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap;">
        <a class="btn btn-primary" href="${lessonHash(firstUndoneOfPath(p))}">开始学习</a>
        <a class="btn btn-outline" href="#/paths">查看全部路径</a>
        <button class="btn btn-outline" id="asRestart">重新测评</button>
      </div>
    </div>
  `;

  const restart = view.querySelector('#asRestart');
  if (restart) restart.addEventListener('click', () => {
    AS.idx = 0;
    AS.answers = new Array(ASSESSMENT.length).fill(null);
    Store.state.profile.assessed = false;
    Store.save();
    drawAssessQuestion(view);
  });
}

/* ============================================================
 * 8. 练习与测验
 * ============================================================ */
const PR = { mode: null, questions: [], title: '', cat: 'all', count: 10, courseSlug: null };

function findQuestion(qid) {
  const [lid, qi] = qid.split('#');
  const l = LESSON_MAP[lid];
  if (!l) return null;
  const q = l.quiz[Number(qi)];
  if (!q) return null;
  return {
    qid, lessonId: l.id, lessonTitle: l.title, cat: l.cat, catName: l.catName,
    question: q.q, options: q.options, answer: q.answer, explain: q.explain
  };
}

function renderPractice(view, query) {
  /* 通过路由进入练习中心：只有带 exam 参数才进入测验，其余一律回到中心，
     避免上一轮测验 / 练习的会话状态残留 */
  if (query && query.exam) {
    const c = COURSE_MAP[query.exam];
    if (c) {
      PR.mode = 'exam';
      PR.courseSlug = c.slug;
      PR.title = `${c.title} · 结课测验`;
      PR.questions = Engine.buildExam(c.slug, 8);
      renderPracticeSession(view);
      return;
    }
  }
  PR.mode = null;
  PR.questions = [];
  renderPracticeHome(view);
}

function renderPracticeHome(view) {
  const s = Store.overall();
  const open = Store.openMistakes();
  const totalQ = TOTAL_QUIZ;

  view.innerHTML = `
    <div class="page-head">      <h1 class="ph-title">练习与测验</h1>
      <p class="ph-sub">从 ${totalQ} 道题库中随机组卷，选择题即时判分并给出解析。答错的题会自动收进错题本。</p>
    </div>

    <div class="practice-setup">
      <div class="setup-card">
        <h3>开始一组练习</h3>
        <div class="s">选择范围与题量，随机抽题</div>

        <div style="font-size:12px;font-weight:700;color:var(--faint);margin-bottom:8px;">范围</div>
        <div class="opt-grid" id="catPick">
          <button class="opt-btn wide ${PR.cat === 'all' ? 'active' : ''}" data-cat="all">
            <div class="t">全部题库</div><div class="d">${totalQ} 道题</div></button>
          ${CATEGORIES.map(c => `<button class="opt-btn ${PR.cat === c.id ? 'active' : ''}" data-cat="${c.id}">
            <div class="t">${c.name}</div><div class="d">${c.lessons} 节课 · 约 ${c.lessons * 2} 道题</div></button>`).join('')}
        </div>

        <div style="font-size:12px;font-weight:700;color:var(--faint);margin:16px 0 8px;">题量</div>
        <div class="chips" id="countPick">
          ${[5, 10, 15, 20].map(n => `<button class="chip sm ${PR.count === n ? 'active' : ''}" data-n="${n}">${n} 题</button>`).join('')}
        </div>

        <button class="btn btn-primary btn-block" style="margin-top:18px;" id="startPractice">开始练习</button>
      </div>

      <div class="setup-card">
        <h3>我的练习数据</h3>
        <div class="s">基于已完成课时的测验成绩</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:13px;">
            <div style="font-size:11.5px;color:var(--faint);">平均正确率</div>
            <div class="num" style="font-size:23px;font-weight:600;">${s.quizDone ? `${s.accuracy}<small style="font-size:12px;color:var(--faint);">%</small>` : '—'}</div>
          </div>
          <div style="background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:13px;">
            <div style="font-size:11.5px;color:var(--faint);">已完成测验</div>
            <div class="num" style="font-size:23px;font-weight:600;">${s.quizDone}<small style="font-size:12px;color:var(--faint);">节</small></div>
          </div>
          <div style="background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);padding:13px;">
            <div style="font-size:11.5px;color:var(--faint);">待订正错题</div>
            <div class="num" style="font-size:23px;font-weight:600;color:var(--err);">${open.length}</div>
          </div>
          <div style="background:var(--paper);border:1px solid var(--line);border-radius:var(--r-sm);padding:13px;">
            <div style="font-size:11.5px;color:var(--faint);">已掌握错题</div>
            <div class="num" style="font-size:23px;font-weight:600;color:var(--ok);">${Store.state.mistakes.length - open.length}</div>
          </div>
        </div>
        ${open.length ? `<button class="btn btn-outline btn-block" style="margin-top:14px;" id="redoMistakes">重练 ${Math.min(open.length, 10)} 道错题</button>` : `
          <div style="margin-top:14px;font-size:12.5px;color:var(--faint);display:flex;gap:6px;align-items:center;">${ic('checkCircle', 15, '#1c7a4d')} 暂无待订正错题</div>`}
      </div>
    </div>

    <div class="block">
      <div class="block-head">
        <h2>错题本 ${open.length ? `<span style="color:var(--err);font-size:13px;">(${open.length})</span>` : ''}</h2>
        ${open.length ? '<button class="link" style="font-size:12.5px;font-weight:700;color:var(--brand);" id="redoAll">全部重练</button>' : ''}
      </div>
      ${open.length ? `<div class="mistake-list">
        ${open.map(m => {
          const q = findQuestion(m.qid);
          return `<div class="mistake-item">
            <div class="mi-main">
              <div class="mi-t">${esc(m.question)}</div>
              <div class="mi-s">
                <span>${esc(m.lessonTitle)}</span>
                <span>错 ${m.count || 1} 次</span>
                ${q ? `<span>正确答案：${'ABCD'[q.answer]}. ${esc(q.options[q.answer])}</span>` : ''}
              </div>
              ${q ? `<div class="mi-ans">解析：${esc(q.explain)}</div>` : ''}
              <div style="display:flex;gap:8px;margin-top:10px;">
                ${q && LESSON_MAP[m.lessonId] ? `<a class="btn btn-outline btn-sm" href="${lessonHash(LESSON_MAP[m.lessonId])}">回看课时</a>` : ''}
                <button class="btn btn-soft btn-sm" data-master="${m.qid}">标记已掌握</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>` : `
        <div class="empty" style="padding:34px 20px;">
          <div class="e-ic">${ic('checkCircle', 24)}</div>
          <h3>错题本是空的</h3>
          <p>做几组练习，答错的题会自动收集到这里。</p>
        </div>`}
    </div>
  `;

  view.querySelectorAll('#catPick .opt-btn').forEach(b => b.addEventListener('click', () => {
    PR.cat = b.dataset.cat;
    view.querySelectorAll('#catPick .opt-btn').forEach(x => x.classList.toggle('active', x === b));
  }));
  view.querySelectorAll('#countPick .chip').forEach(b => b.addEventListener('click', () => {
    PR.count = Number(b.dataset.n);
    view.querySelectorAll('#countPick .chip').forEach(x => x.classList.toggle('active', x === b));
  }));

  view.querySelector('#startPractice').addEventListener('click', () => {
    const label = PR.cat === 'all' ? '全部题库' : CATEGORY_MAP[PR.cat].name;
    const qs = Engine.buildPractice(PR.cat, PR.count);
    if (!qs.length) { toast('这个范围暂时没有题目'); return; }
    if (qs.length < PR.count) toast(`该范围共 ${qs.length} 道题`);
    startPractice(`练习 · ${label}`, qs, 'practice');
    renderPracticeSession(view);
  });

  const redo = view.querySelector('#redoMistakes');
  if (redo) redo.addEventListener('click', () => { startMistakePractice(view); });
  const redoAll = view.querySelector('#redoAll');
  if (redoAll) redoAll.addEventListener('click', () => { startMistakePractice(view); });

  view.querySelectorAll('[data-master]').forEach(b => b.addEventListener('click', () => {
    Store.resolveMistake(b.dataset.master);
    toast('已标记为掌握');
    renderPracticeHome(view);
    renderSidebar('practice');
  }));
}

function startPractice(title, questions, mode) {
  if (!questions.length) { toast('这个范围暂时没有题目'); return; }
  PR.mode = mode;
  PR.title = title;
  PR.questions = questions;
  PR.courseSlug = null;
}

function startMistakePractice(view) {
  const open = Store.openMistakes();
  const qs = open.map(m => findQuestion(m.qid)).filter(Boolean);
  if (!qs.length) { toast('暂无待订正错题'); return; }
  startPractice(`错题重练 · ${qs.length} 题`, Engine.shuffle(qs).slice(0, 10), 'mistakes');
  renderPracticeSession(view);
}

function renderPracticeSession(view) {
  const isExam = PR.mode === 'exam';
  view.innerHTML = `
    <div class="breadcrumb">
      <a href="#/practice" id="backPractice">练习与测验</a><span class="sep">/</span>
      <span>${esc(PR.title)}</span>
    </div>
    <div class="page-head">
      <div class="page-head-row">
        <div>          <h1 class="ph-title">${esc(PR.title)}</h1>
          <p class="ph-sub">共 ${PR.questions.length} 题${isExam ? '，答完后记录成绩，可重复参加' : '，即时判分并给出解析'}。</p>
        </div>
        <button class="btn btn-outline btn-sm" id="quitSession">退出本次</button>
      </div>
    </div>
    <div class="card" style="padding:24px;">
      <div id="practiceMount"></div>
    </div>
  `;

  const quit = () => {
    PR.mode = null;
    PR.questions = [];
    if (location.hash.includes('exam=')) location.hash = '#/practice';
    else renderPracticeHome(view);
  };
  view.querySelector('#quitSession').addEventListener('click', quit);
  view.querySelector('#backPractice').addEventListener('click', e => {
    e.preventDefault();
    quit();
  });
  /* 练习进行中再次点击侧栏「练习测验」时，退出会话回到中心 */
  const sbPractice = document.querySelector('.sb-link[href="#/practice"]');
  if (sbPractice) sbPractice.addEventListener('click', e => {
    if (location.hash === '#/practice') { e.preventDefault(); quit(); }
  });

  mountQuiz(view.querySelector('#practiceMount'), PR.questions, {
    title: PR.title,
    onFinish: (score, total, wrong) => {
      wrong.forEach(w => Store.addMistake({
        qid: w.qid, lessonId: w.lessonId, lessonTitle: w.lessonTitle,
        question: w.question, chosen: w.chosen, answer: w.answer, explain: w.explain
      }));
      if (isExam && PR.courseSlug) Store.saveExam(PR.courseSlug, score, total);
      if (wrong.length === 0 && PR.mode === 'mistakes') {
        // 错题全对，标记这些题为已掌握
        PR.questions.forEach(q => Store.resolveMistake(q.qid));
      }
      renderSidebar('practice');
    },
    onExit: quit,
    exitLabel: isExam ? '返回练习中心' : '完成'
  });
}

/* ============================================================
 * 9. 学习进度
 * ============================================================ */
function renderProgress(view) {
  const s = Store.overall();
  const power = Engine.categoryMastery();
  const lv = Store.level();
  const hmWeeks = window.innerWidth <= 640 ? 14 : 26;
  const hm = Engine.heatmap(hmWeeks);
  const monthCols = [];
  let prevMonth = 0;
  for (let i = 0; i < hm.days.length; i += 7) {
    const week = hm.days.slice(i, i + 7);
    const m = Number(week[0].date.slice(5, 7));
    if (m !== prevMonth) { monthCols.push(`${m}月`); prevMonth = m; }
    else monthCols.push('');
  }
  const recent = Engine.recentLessons(5);
  const exams = Object.entries(Store.state.exams);

  view.innerHTML = `
    <div class="page-head">      <h1 class="ph-title">学习进度</h1>
      <p class="ph-sub">所有数据保存在本机浏览器，无需登录。完成课时、做测验都会自动记录。</p>
    </div>

    <div class="progress-hero">
      <div class="ring-stack">
        ${ringBox(s.pct, 132, 11, '#0f5f5c', '总进度', '')}
      </div>
      <div>
        <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">
          <div style="font-size:18px;font-weight:700;">${s.done} / ${s.total} 节已完成</div>
          <span class="tag" style="border:1px solid var(--brand-line);color:var(--brand-deep);">${lv.level} ${lv.name}</span>
        </div>
        <div style="font-size:13px;color:var(--muted);margin-top:6px;">
          ${lv.next ? `再完成 ${lv.toNext} 节即可升级为 ${lv.next.level} ${lv.next.name}。` : '已达到最高等级，可以尝试结课测验检验掌握度。'}
        </div>
        <div class="kpi-grid" style="margin-top:16px;grid-template-columns:repeat(3,1fr);">
          <div style="background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px 14px;">
            <div style="font-size:11.5px;color:var(--faint);">累计学习</div>
            <div class="num" style="font-size:19px;font-weight:600;">${(s.mins / 60).toFixed(1)}<small style="font-size:11px;color:var(--faint);">小时</small></div>
          </div>
          <div style="background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px 14px;">
            <div style="font-size:11.5px;color:var(--faint);">连续学习</div>
            <div class="num" style="font-size:19px;font-weight:600;">${s.streak}<small style="font-size:11px;color:var(--faint);">天</small></div>
          </div>
          <div style="background:var(--paper-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:12px 14px;">
            <div style="font-size:11.5px;color:var(--faint);">测验正确率</div>
            <div class="num" style="font-size:19px;font-weight:600;">${s.quizDone ? `${s.accuracy}<small style="font-size:11px;color:var(--faint);">%</small>` : '—'}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="block heatmap-card">
      <div class="block-head" style="margin-bottom:12px;">
        <h2 style="font-size:15px;">近 ${hmWeeks} 周学习活跃度</h2>
        <span class="result-count">共 ${s.days} 天有记录</span>
      </div>
      <div class="hm-scroll"><div class="hm-inner">
        <div class="hm-months" style="grid-template-columns:repeat(${hm.weeks},1fr)">${monthCols.map(m => `<span>${m}</span>`).join('')}</div>
        <div class="hm-grid" style="grid-template-columns:repeat(${hm.weeks},1fr);aspect-ratio:${hm.weeks}/7">
          ${hm.days.map(d => `<div class="hm-cell l${d.level} ${d.date === todayStr() ? 'today' : ''} ${d.isFuture ? 'future' : ''}" title="${d.date} · ${d.count} 节"></div>`).join('')}
        </div>
      </div></div>
      <div class="hm-legend">
        <span>少</span>
        <i style="background:#f1f3f3"></i><i style="background:#d9e6e3"></i><i style="background:#a9c8c2"></i><i style="background:#5f948c"></i><i style="background:#0f5f5c"></i>
        <span>多</span>
      </div>
    </div>

    <div class="two-col" style="margin-top:18px;">
      <div class="card" style="padding:20px;">
        <div class="block-head" style="margin-bottom:14px;"><h2 style="font-size:15px;">分类掌握度</h2></div>
        <div class="cat-bars">
          ${power.map(c => `
            <div class="cat-bar">
              <div class="cb-top"><span>${c.name}</span><b style="color:${c.color}">${c.mastery}%</b></div>
              <div class="progress thin"><i style="width:${c.mastery}%;background:${c.color}"></i></div>
              <div style="font-size:11px;color:var(--faint);margin-top:4px;">${c.done}/${c.total} 节 · ${c.quizCount ? `测验正确率 ${c.accuracy}%` : '暂无测验数据'}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="radar-wrap">
        <h3>能力雷达</h3>
        <div style="font-size:11.5px;color:var(--faint);text-align:left;margin-bottom:4px;">掌握度 = 完成率 + 测验正确率</div>
        <canvas id="radar" width="360" height="300" role="img" aria-label="能力掌握度雷达图"></canvas>
      </div>
    </div>

    <div class="two-col" style="margin-top:18px;">
      <div class="card" style="padding:20px;">
        <div class="block-head" style="margin-bottom:12px;"><h2 style="font-size:15px;">最近学习</h2></div>
        ${recent.length ? recent.map(({ lesson, rec }) => `
          <a class="lrow" style="padding-left:0;padding-right:0;" href="${lessonHash(lesson)}">
            <span class="lr-ic">${String(lesson.order + 1).padStart(2, '0')}</span>
            <div class="lr-main"><div class="lr-t">${esc(lesson.title)}</div>
            <div class="lr-s">${esc(lesson.courseTitle)}${rec.total ? ` · 测验 ${rec.score}/${rec.total}` : ''}</div></div>
            <span class="lr-dur">${fmtDate(rec.at)}</span>
          </a>`).join('') : `<div style="font-size:13px;color:var(--faint);padding:10px 0;">还没有学习记录，去课程库挑一节开始。</div>`}
      </div>

      <div class="card" style="padding:20px;">
        <div class="block-head" style="margin-bottom:12px;"><h2 style="font-size:15px;">结课测验记录</h2></div>
        ${exams.length ? exams.map(([slug, e]) => {
          const c = COURSE_MAP[slug];
          if (!c) return '';
          const pct = e.total ? Math.round(e.score / e.total * 100) : 0;
          return `<a class="lrow" style="padding-left:0;padding-right:0;" href="#/practice?exam=${slug}">
            <span class="lr-ic">${c.no}</span>
            <div class="lr-main"><div class="lr-t">${esc(c.title)}</div>
            <div class="lr-s">${fmtFullDate(e.at)} · ${pct}%</div></div>
            <span class="lr-go">${e.score}/${e.total}</span>
          </a>`;
        }).join('') : `<div style="font-size:13px;color:var(--faint);padding:10px 0;">完成一门课程后可以做结课测验。</div>`}
      </div>
    </div>

    ${s.done === TOTAL_LESSONS ? `
    <div class="block">
      <div class="certificate">
        <div class="c-kicker">CERTIFICATE OF COMPLETION</div>
        <div class="c-title">结 业 证 书</div>
        <div class="c-name">智学 AI · 全课程通关学员</div>
        <div class="c-line">
          已完成 <b>12 门课程、${TOTAL_LESSONS} 节课、${TOTAL_QUIZ} 道测验</b> 的全部学习与练习，<br>
          经随堂测验与结课测验校验，达到 <b>${lv.level} ${lv.name}</b> 能力等级。
        </div>
        <div class="c-date">${todayStr()} · 智学 AI LEARNING HUB</div>
        <svg class="c-seal" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#b08a3e" stroke-width="3"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#b08a3e" stroke-width="1.4"/>
          <path d="M30 50l14 14 26-28" fill="none" stroke="#b08a3e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>` : ''}
  `;

  requestAnimationFrame(() => {
    const cv = document.getElementById('radar');
    if (cv) drawRadar(cv, power);
  });
}

function drawRadar(canvas, data) {
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2 + 4, R = Math.min(W, H) / 2 - 46;
  const N = data.length;
  const ang = i => -Math.PI / 2 + i * 2 * Math.PI / N;

  for (let ring = 1; ring <= 4; ring++) {
    const rr = R * ring / 4;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const x = cx + rr * Math.cos(ang(i)), y = cy + rr * Math.sin(ang(i));
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#e6e8ea'; ctx.lineWidth = 1; ctx.stroke();
  }

  for (let i = 0; i < N; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(ang(i)), cy + R * Math.sin(ang(i)));
    ctx.strokeStyle = '#e6e8ea'; ctx.stroke();
  }

  ctx.beginPath();
  data.forEach((d, i) => {
    const rr = R * Math.max(0.02, d.mastery / 100);
    const x = cx + rr * Math.cos(ang(i)), y = cy + rr * Math.sin(ang(i));
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(15,95,92,.14)';
  ctx.strokeStyle = '#0f5f5c'; ctx.lineWidth = 2;
  ctx.fill(); ctx.stroke();

  data.forEach((d, i) => {
    const rr = R * Math.max(0.02, d.mastery / 100);
    ctx.beginPath();
    ctx.arc(cx + rr * Math.cos(ang(i)), cy + rr * Math.sin(ang(i)), 3.2, 0, 7);
    ctx.fillStyle = '#0f5f5c'; ctx.fill();
  });

  ctx.font = '11.5px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillStyle = '#6a727c';
  data.forEach((d, i) => {
    const lx = cx + (R + 22) * Math.cos(ang(i));
    const ly = cy + (R + 22) * Math.sin(ang(i)) + 4;
    ctx.textAlign = Math.abs(Math.cos(ang(i))) < 0.25 ? 'center' : (Math.cos(ang(i)) > 0 ? 'left' : 'right');
    ctx.fillText(d.name, lx, ly);
  });
}

/* ============================================================
 * 10. 收藏与笔记
 * ============================================================ */
function renderBookmarks(view) {
  const marked = ALL_LESSONS.filter(l => Store.isBookmarked(l.id));
  const noted = ALL_LESSONS.filter(l => {
    const r = Store.rec(l.id);
    return r && r.note && r.note.trim();
  });

  view.innerHTML = `
    <div class="page-head">
      <h1 class="ph-title">收藏与笔记</h1>
      <p class="ph-sub">收藏想复习的课时，把理解写进笔记。所有内容只保存在本机。</p>
      <div class="ph-actions">
        <span class="pill" style="background:var(--paper-2);color:var(--muted);border:1px solid var(--line);">收藏 ${marked.length}</span>
        <span class="pill" style="background:var(--paper-2);color:var(--muted);border:1px solid var(--line);">笔记 ${noted.length}</span>
      </div>
    </div>

    <div class="block">
      <div class="block-head"><h2>收藏的课时</h2></div>
      ${marked.length ? `<div class="card" style="overflow:hidden;">
        ${marked.map((l, i) => `
          <a class="lrow" href="${lessonHash(l)}">
            <span class="lr-ic">${String(i + 1).padStart(2, '0')}</span>
            <div class="lr-main">
              <div class="lr-t">${esc(l.title)}</div>
              <div class="lr-s">${esc(l.courseTitle)} · ${l.mins} 分钟</div>
            </div>
            <div class="lr-right">${Store.isDone(l.id) ? `<span class="tag" style="color:#1c7a4d;">已学</span>` : '<span class="lr-go">去学习</span>'}</div>
          </a>`).join('')}
      </div>` : `
        <div class="empty">
          <div class="e-ic">${ic('bookmark', 24)}</div>
          <h3>还没有收藏</h3>
          <p>在课时页点击书签图标，就能把内容收在这里。</p>
          <a class="btn btn-primary btn-sm" style="margin-top:14px;" href="#/courses">去逛课程库</a>
        </div>`}
    </div>

    <div class="block">
      <div class="block-head"><h2>我的笔记</h2></div>
      ${noted.length ? `<div class="notes-grid">
        ${noted.map(l => {
          const r = Store.rec(l.id);
          return `<a class="card note-card" href="${lessonHash(l)}">
            <div class="code-no">${esc(l.courseTitle)}</div>
            <div class="note-title">${esc(l.title)}</div>
            <div class="note-body">${esc(r.note)}</div>
            <div class="note-date">${fmtFullDate(r.at)}</div>
          </a>`;
        }).join('')}
      </div>` : `
        <div class="empty">
          <div class="e-ic">${ic('note', 24)}</div>
          <h3>还没有笔记</h3>
          <p>课时页右侧有笔记区，输入后会自动保存。</p>
          <a class="btn btn-outline btn-sm" style="margin-top:14px;" href="#/course/ai-basics">去第一节写笔记</a>
        </div>`}
    </div>
  `;
}

/* ============================================================
 * 11. 全局搜索
 * ============================================================ */
let searchEl = null;
let searchResults = { courses: [], lessons: [] };
let searchSel = 0;
let flatResults = [];

function openSearch() {
  if (searchEl) return;
  searchEl = document.createElement('div');
  searchEl.className = 'search-overlay';
  searchEl.innerHTML = `
    <div class="search-panel" role="dialog" aria-modal="true" aria-label="全站搜索">
      <div class="search-field">
        ${ic('search', 18, '#9aa2ab')}
        <input id="searchInput" type="text" placeholder="搜索课程、课时、关键词…" autocomplete="off" aria-label="搜索关键词">
        <span class="esc">ESC</span>
      </div>
      <div class="search-body" id="searchBody"></div>
      <div class="search-foot">
        <span><b>↑</b><b>↓</b> 选择</span><span><b>Enter</b> 打开</span><span><b>Esc</b> 关闭</span>
        <span style="margin-left:auto;">共 ${TOTAL_LESSONS} 节课</span>
      </div>
    </div>`;
  document.body.appendChild(searchEl);
  const input = searchEl.querySelector('#searchInput');
  input.focus();

  input.addEventListener('input', () => {
    searchResults = Engine.search(input.value, 8);
    searchSel = 0;
    drawSearchResults(input.value);
  });

  searchEl.addEventListener('click', e => { if (e.target === searchEl) closeSearch(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatResults[searchSel];
      if (item) { closeSearch(); location.hash = item.hash; }
    }
  });

  drawSearchResults('');
}

function closeSearch() {
  if (!searchEl) return;
  searchEl.remove();
  searchEl = null;
}

function moveSel(d) {
  if (!flatResults.length) return;
  searchSel = (searchSel + d + flatResults.length) % flatResults.length;
  searchEl.querySelectorAll('.sr-item').forEach((el, i) => el.classList.toggle('sel', i === searchSel));
  const cur = searchEl.querySelectorAll('.sr-item')[searchSel];
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}

function drawSearchResults(q) {
  const body = searchEl.querySelector('#searchBody');
  flatResults = [];
  if (!q.trim()) {
    // 默认展示热门分类与推荐入口
    body.innerHTML = `
      <div class="sr-group">快速开始</div>
      ${CATEGORIES.slice(0, 4).map(c => {
        flatResults.push({ hash: `#/courses?cat=${c.id}`, title: c.name, sub: `${c.courses} 门课程 · ${c.lessons} 节课`, icon: c.icon, color: c.color });
        return `<div class="sr-item" data-i="${flatResults.length - 1}">
          <span class="cdot" style="background:${c.color}"></span>
          <div><div class="t">${c.name}</div><div class="s">${c.courses} 门课程 · ${c.lessons} 节课</div></div>
        </div>`;
      }).join('')}
      <div class="sr-group">继续学习</div>
      ${[Engine.nextLesson()].map(l => {
        const cn = COURSE_MAP[l.courseSlug] ? COURSE_MAP[l.courseSlug].no : '';
        flatResults.push({ hash: lessonHash(l), title: l.title, sub: l.courseTitle, icon: 'play', color: l.catColor });
        return `<div class="sr-item" data-i="${flatResults.length - 1}">
          <span class="cdot" style="background:${l.catColor}"></span>
          <div><div class="t">${esc(l.title)}</div><div class="s">${cn} · ${esc(l.courseTitle)}</div></div>
        </div>`;
      }).join('')}`;
  } else {
    const { courses, lessons } = searchResults;
    if (!courses.length && !lessons.length) {
      body.innerHTML = `<div class="sr-empty">没有找到「${esc(q)}」相关的内容<br><span style="font-size:12px;">试试「Transformer」「RAG」「提示词」</span></div>`;
      return;
    }
    let html = '';
    if (courses.length) {
      html += '<div class="sr-group">课程</div>';
      courses.forEach(c => {
        flatResults.push({ hash: `#/course/${c.slug}`, title: c.title, sub: c.sub, icon: 'library', color: catColor(c.cat) });
        html += `<div class="sr-item" data-i="${flatResults.length - 1}">
          <span class="cdot" style="background:${catColor(c.cat)}"></span>
          <div><div class="t">${highlight(c.title, q)}</div><div class="s">${c.no} · ${esc(c.level)} · ${c.lessonCount} 节课</div></div>
        </div>`;
      });
    }
    if (lessons.length) {
      html += '<div class="sr-group">课时</div>';
      lessons.forEach(l => {
        const cn = COURSE_MAP[l.courseSlug] ? COURSE_MAP[l.courseSlug].no : '';
        flatResults.push({ hash: lessonHash(l), title: l.title, sub: l.courseTitle, icon: 'book', color: l.catColor });
        html += `<div class="sr-item" data-i="${flatResults.length - 1}">
          <span class="cdot" style="background:${l.catColor}"></span>
          <div><div class="t">${highlight(l.title, q)}</div><div class="s">${cn} · ${esc(l.courseTitle)}</div></div>
        </div>`;
      });
    }
    body.innerHTML = html;
  }

  body.querySelectorAll('.sr-item').forEach(el => {
    el.classList.toggle('sel', Number(el.dataset.i) === searchSel);
    el.addEventListener('click', () => {
      const item = flatResults[Number(el.dataset.i)];
      if (item) { closeSearch(); location.hash = item.hash; }
    });
  });
}

/* ============================================================
 * 12. 启动与全局交互
 * ============================================================ */
document.getElementById('menuBtn').addEventListener('click', () => {
  const open = appEl.classList.toggle('nav-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', open);
  document.getElementById('menuBtn').setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
});
document.getElementById('sideScrim').addEventListener('click', () => {
  appEl.classList.remove('nav-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
  document.getElementById('menuBtn').setAttribute('aria-label', '打开菜单');
});
document.querySelectorAll('[data-open-search]').forEach(b => b.addEventListener('click', openSearch));

document.getElementById('sbReset').addEventListener('click', () => {
  if (confirm('确定重置全部学习进度吗？课时记录、测验成绩、笔记、收藏与错题都会被清空，且无法恢复。')) {
    Store.reset();
    PR.mode = null;
    PR.questions = [];
    AS.idx = 0;
    AS.answers = new Array(ASSESSMENT.length).fill(null);
    CourseFilter.cat = 'all';
    CourseFilter.level = 'all';
    CourseFilter.q = '';
    toast('进度已重置');
    location.hash = '#/home';
    router();
  }
});

/* 快捷键：⌘/Ctrl + K 或 / 唤起搜索 */
document.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearch();
  } else if (e.key === '/' && !typing && !searchEl) {
    e.preventDefault();
    openSearch();
  } else if (e.key === 'Escape') {
    if (searchEl) closeSearch();
    if (appEl.classList.contains('nav-open')) {
      appEl.classList.remove('nav-open');
      document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
      document.getElementById('menuBtn').setAttribute('aria-label', '打开菜单');
    }
  }
});

/* 按平台显示快捷键提示 */
const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || '');
document.querySelectorAll('.search-trigger .k').forEach(el => {
  el.textContent = isMac ? '⌘K' : 'Ctrl K';
});

/* 跨越移动/桌面断点时，热力图需要重新计算周数；只在进度页处理，
   并保留当前滚动位置 */
let hmWide = window.innerWidth > 640;
window.addEventListener('resize', () => {
  const wide = window.innerWidth > 640;
  if (wide === hmWide) return;
  hmWide = wide;
  if (parseHash().name !== 'progress') return;
  const view = contentEl();
  const top = view.scrollTop;
  renderProgress(view);
  view.scrollTop = top;
});

/* 启动 */
if (!location.hash) location.hash = '#/home';
router();

