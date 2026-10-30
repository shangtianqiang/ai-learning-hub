/* ============================================================
 * store.js — 本地状态管理（localStorage 持久化）
 * 负责：课时进度 / 测验成绩 / 收藏 / 笔记 / 错题 / 活跃度 / 测评结果
 * ============================================================ */

const STORAGE_KEY = 'ai_learning_hub_v1';

const DEFAULT_STATE = {
  version: 1,
  profile: {
    assessed: false,
    level: 'L1',
    levelName: '初探者',
    pathId: null,
    answers: [],
    assessedAt: null
  },
  lessons: {},        // lessonId -> { done, score, total, bookmark, note, at }
  activity: {},       // 'YYYY-MM-DD' -> 完成的课时数
  mistakes: [],       // 错题记录
  exams: {},          // courseSlug -> { score, total, at }
  lastLesson: null
};

/* 等级阈值（按已完成课时数） */
const LEVEL_RULES = [
  { min: 0,  level: 'L1', name: '初探者' },
  { min: 4,  level: 'L2', name: '学习者' },
  { min: 12, level: 'L3', name: '实践者' },
  { min: 24, level: 'L4', name: '进阶者' },
  { min: 38, level: 'L5', name: '精通者' }
];

function todayStr(d) {
  const dt = d || new Date();
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const Store = {
  state: null,

  load() {
    let saved = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch (e) { saved = null; }

    const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
    const isArr = v => Array.isArray(v);
    this.state = isObj(saved)
      ? {
          ...structuredClone(DEFAULT_STATE),
          ...saved,
          profile: { ...DEFAULT_STATE.profile, ...(isObj(saved.profile) ? saved.profile : {}) },
          lessons: isObj(saved.lessons) ? saved.lessons : {},
          activity: isObj(saved.activity) ? saved.activity : {},
          mistakes: isArr(saved.mistakes) ? saved.mistakes : [],
          exams: isObj(saved.exams) ? saved.exams : {}
        }
      : structuredClone(DEFAULT_STATE);
    return this.state;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('进度保存失败（可能是存储空间已满）', e);
    }
  },

  reset() {
    this.state = structuredClone(DEFAULT_STATE);
    this.save();
  },

  /* ---------------- 课时记录 ---------------- */
  rec(id) {
    return this.state.lessons[id] || null;
  },

  isDone(id) {
    const r = this.rec(id);
    return !!(r && r.done);
  },

  isBookmarked(id) {
    const r = this.rec(id);
    return !!(r && r.bookmark);
  },

  ensure(id) {
    if (!this.state.lessons[id]) {
      this.state.lessons[id] = { done: false, score: 0, total: 0, bookmark: false, note: '', at: null };
    }
    return this.state.lessons[id];
  },

  toggleBookmark(id) {
    const r = this.ensure(id);
    r.bookmark = !r.bookmark;
    this.save();
    return r.bookmark;
  },

  setNote(id, note) {
    const r = this.ensure(id);
    r.note = note;
    this.save();
  },

  /* 完成课时（可重复调用，重复不重复计活跃） */
  completeLesson(id) {
    const wasDone = this.isDone(id);
    const r = this.ensure(id);
    r.done = true;
    r.at = new Date().toISOString();
    this.state.lastLesson = id;
    if (!wasDone) this.touchActivity(1);
    this.save();
    return !wasDone;
  },

  /* 记录测验成绩 */
  recordQuiz(id, score, total) {
    const r = this.ensure(id);
    r.score = score;
    r.total = total;
    r.at = new Date().toISOString();
    this.save();
  },

  /* ---------------- 活跃度 / 连续天数 ---------------- */
  touchActivity(n) {
    const k = todayStr();
    this.state.activity[k] = (this.state.activity[k] || 0) + (n || 1);
    this.save();
  },

  totalDays() {
    return Object.keys(this.state.activity).length;
  },

  streak() {
    const act = this.state.activity;
    const cursor = new Date();
    // 今天没学不算断，从昨天开始回溯
    if (!act[todayStr(cursor)]) cursor.setDate(cursor.getDate() - 1);
    let n = 0;
    while (act[todayStr(cursor)]) {
      n++;
      cursor.setDate(cursor.getDate() - 1);
      if (n > 3650) break;
    }
    return n;
  },

  /* ---------------- 统计 ---------------- */
  courseStats(slug) {
    const list = getCourseLessons(slug);
    const done = list.filter(l => this.isDone(l.id)).length;
    return { done, total: list.length, pct: list.length ? Math.round(done / list.length * 100) : 0 };
  },

  overall() {
    let done = 0;
    const scores = [];
    ALL_LESSONS.forEach(l => {
      const r = this.rec(l.id);
      if (r && r.done) {
        done++;
        if (r.total) scores.push(r.score / r.total);
      }
    });
    const quizDone = ALL_LESSONS.filter(l => {
      const r = this.rec(l.id);
      return r && r.total > 0;
    }).length;
    const accuracy = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) : 0;
    const mins = ALL_LESSONS.reduce((a, l) => a + (this.isDone(l.id) ? l.mins : 0), 0);
    return {
      done,
      total: TOTAL_LESSONS,
      pct: TOTAL_LESSONS ? Math.round(done / TOTAL_LESSONS * 100) : 0,
      quizDone,
      accuracy,
      mins,
      streak: this.streak(),
      days: this.totalDays()
    };
  },

  level() {
    const done = this.overall().done;
    let idx = 0;
    LEVEL_RULES.forEach((r, i) => { if (done >= r.min) idx = i; });
    // 测评认定的起点等级作为下限，避免刚测完等级又掉回 L1
    if (this.state.profile.assessed) {
      const pi = LEVEL_RULES.findIndex(r => r.level === this.state.profile.level);
      if (pi > idx) idx = pi;
    }
    const cur = LEVEL_RULES[idx];
    const next = LEVEL_RULES[idx + 1] || null;
    return { ...cur, next, toNext: next ? Math.max(0, next.min - done) : 0 };
  },

  /* ---------------- 错题 ---------------- */
  addMistake(item) {
    const exist = this.state.mistakes.find(m => m.qid === item.qid);
    if (exist) {
      exist.chosen = item.chosen;
      exist.count = (exist.count || 1) + 1;
      exist.resolved = false;
      exist.at = new Date().toISOString();
    } else {
      this.state.mistakes.push({ ...item, count: 1, resolved: false, at: new Date().toISOString() });
    }
    this.save();
  },

  resolveMistake(qid) {
    this.state.mistakes.forEach(m => {
      if (m.qid === qid) m.resolved = true;
    });
    this.save();
  },

  openMistakes() {
    return this.state.mistakes.filter(m => !m.resolved);
  },

  /* ---------------- 测评 / 路径 ---------------- */
  applyAssessment(answers, result) {
    const p = this.state.profile;
    p.assessed = true;
    p.answers = answers;
    p.level = result.level;
    p.levelName = result.levelName;
    p.pathId = result.pathId;
    p.assessedAt = new Date().toISOString();
    this.save();
  },

  setPath(pathId) {
    this.state.profile.pathId = pathId;
    this.save();
  },

  pathProgress(pathId) {
    const path = PATHS.find(p => p.id === pathId);
    if (!path) return { done: 0, total: 0, pct: 0 };
    let done = 0, total = 0;
    path.courses.forEach(slug => {
      const s = this.courseStats(slug);
      done += s.done;
      total += s.total;
    });
    return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
  },

  /* ---------------- 课程测验 ---------------- */
  saveExam(slug, score, total) {
    this.state.exams[slug] = { score, total, at: new Date().toISOString() };
    this.save();
  },

  getExam(slug) {
    return this.state.exams[slug] || null;
  },

  /* ---------------- 导出 ---------------- */
  exportSummary() {
    return {
      done: this.overall().done,
      total: TOTAL_LESSONS,
      streak: this.streak(),
      level: this.level().level,
      path: this.state.profile.pathId,
      bookmarks: ALL_LESSONS.filter(l => this.isBookmarked(l.id)).length,
      mistakes: this.openMistakes().length
    };
  }
};
