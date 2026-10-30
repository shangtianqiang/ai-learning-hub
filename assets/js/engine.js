/* ============================================================
 * engine.js — 推荐 / 检索 / 练习组卷 / 统计计算
 * ============================================================ */

const Engine = {
  /* ---------------- 全文检索 ---------------- */
  search(query, limit = 8) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return { courses: [], lessons: [] };

    const hit = (text) => (text || '').toLowerCase().includes(q);
    const scored = [];

    ALL_LESSONS.forEach(l => {
      let score = 0;
      if (hit(l.title)) score += 10;
      if (hit(l.summary)) score += 5;
      if (hit(l.courseTitle)) score += 4;
      if (hit(l.chapterTitle)) score += 3;
      if (hit(l.catName)) score += 2;
      if ((l.points || []).some(p => hit(p))) score += 3;
      if ((l.sections || []).some(s => hit(s.h) || hit(s.p) || (s.list || []).some(x => hit(x)))) score += 1;
      if (score > 0) scored.push({ lesson: l, score });
    });

    scored.sort((a, b) => b.score - a.score || a.lesson.order - b.lesson.order);
    const lessons = scored.slice(0, limit).map(x => x.lesson);

    const courses = COURSES.filter(c =>
      hit(c.title) || hit(c.sub) || hit(c.level) ||
      c.tags.some(t => hit(t)) ||
      hit(CATEGORY_MAP[c.cat].name)
    ).slice(0, 4);

    return { courses, lessons };
  },

  /* ---------------- 能力测评 → 路径推荐 ---------------- */
  recommend(answers) {
    const scores = answers.map((optIdx, qi) => {
      const opt = ASSESSMENT[qi] && ASSESSMENT[qi].options[optIdx];
      return opt ? opt.score : 0;
    });
    const maxFirst3 = ASSESSMENT.slice(0, 3).reduce((a, q) => a + Math.max(...q.options.map(o => o.score)), 0);
    const base = scores.slice(0, 3).reduce((a, b) => a + b, 0);
    const ratio = maxFirst3 ? base / maxFirst3 : 0;

    // 学习意图优先（第 4 题）
    const intentOpt = ASSESSMENT[3].options[answers[3]] || ASSESSMENT[3].options[0];
    let pathId = intentOpt.path || 'literacy';

    // 编程与数学基础都很弱时，技术路径先走通识，避免劝退
    const coding = scores[1] || 0;
    const math = scores[2] || 0;
    let advice = '';
    if ((pathId === 'ml' || pathId === 'llm') && coding === 0 && ratio < 0.3) {
      pathId = 'literacy';
      advice = '你的目标偏技术方向，但当前还没有编程基础。建议先用 4 周补齐 AI 通识与提示工程，再进入技术路径，学习曲线会平缓很多。';
    } else if (pathId === 'llm' && coding <= 1) {
      advice = '大模型应用开发需要调用 API 与处理数据，建议同步补一点 Python 基础，遇到代码环节不要跳过。';
    } else if (ratio >= 0.8) {
      advice = '你的基础已经不错，可以跳过入门章节，直接从课程的中后段开始，把时间花在动手与项目复盘上。';
    } else {
      advice = '按推荐路径顺序推进即可，每完成一节课就做一次小测验，比一次性刷完更有效。';
    }

    const levelMap = [
      { max: 0.2, level: 'L1', levelName: '初探者' },
      { max: 0.45, level: 'L2', levelName: '学习者' },
      { max: 0.7, level: 'L3', levelName: '实践者' },
      { max: 0.88, level: 'L4', levelName: '进阶者' },
      { max: 1.01, level: 'L5', levelName: '精通者' }
    ];
    const lv = levelMap.find(x => ratio < x.max) || levelMap[levelMap.length - 1];

    // 每周投入时间影响建议周期
    const pace = (ASSESSMENT[4].options[answers[4]] || {}).pace || 2;
    const path = PATHS.find(p => p.id === pathId) || PATHS[0];
    const factor = pace <= 1 ? 1.6 : pace === 2 ? 1.2 : pace === 3 ? 1 : 0.8;
    const weeks = Math.max(2, Math.round(path.weeks * factor));

    return {
      pathId,
      path,
      level: lv.level,
      levelName: lv.levelName,
      ratio,
      weeks,
      pace,
      advice
    };
  },

  /* ---------------- 练习组卷 ---------------- */
  allQuestions(catId) {
    const pool = [];
    const byCat = catId && catId !== 'all';
    ALL_LESSONS.forEach(l => {
      if (byCat && l.cat !== catId) return;
      l.quiz.forEach((q, qi) => {
        pool.push({
          qid: `${l.id}#${qi}`,
          lessonId: l.id,
          lessonTitle: l.title,
          cat: l.cat,
          catName: l.catName,
          catColor: l.catColor,
          question: q.q,
          options: q.options,
          answer: q.answer,
          explain: q.explain
        });
      });
    });
    return pool;
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  buildPractice(catId, n = 10) {
    return this.shuffle(this.allQuestions(catId)).slice(0, n);
  },

  buildExam(slug, n = 8) {
    const pool = [];
    getCourseLessons(slug).forEach(l => {
      l.quiz.forEach((q, qi) => {
        pool.push({
          qid: `${l.id}#${qi}`,
          lessonId: l.id,
          lessonTitle: l.title,
          cat: l.cat,
          catName: l.catName,
          catColor: l.catColor,
          question: q.q,
          options: q.options,
          answer: q.answer,
          explain: q.explain
        });
      });
    });
    return this.shuffle(pool).slice(0, Math.min(n, pool.length));
  },

  /* ---------------- 统计 ---------------- */
  categoryMastery() {
    return CATEGORIES.map(c => {
      const lessons = ALL_LESSONS.filter(l => l.cat === c.id);
      const done = lessons.filter(l => Store.isDone(l.id)).length;
      const scores = lessons
        .map(l => Store.rec(l.id))
        .filter(r => r && r.total > 0)
        .map(r => r.score / r.total);
      const accuracy = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) : 0;
      const coverage = lessons.length ? done / lessons.length : 0;
      // 掌握度 = 覆盖率 70% + 测验正确率 30%；没有测验数据时按覆盖率计，
      // 避免「全部学完但没有做测验」被压到 70% 上限
      const accuracyPart = scores.length ? accuracy / 100 : coverage;
      const mastery = Math.round((coverage * 0.7 + accuracyPart * 0.3) * 100);
      return { ...c, done, total: lessons.length, accuracy, quizCount: scores.length, mastery };
    });
  },

  recentLessons(n = 5) {
    return ALL_LESSONS
      .map(l => ({ lesson: l, rec: Store.rec(l.id) }))
      .filter(x => x.rec && x.rec.at)
      .sort((a, b) => new Date(b.rec.at) - new Date(a.rec.at))
      .slice(0, n);
  },

  related(lesson, n = 3) {
    return ALL_LESSONS
      .filter(l => l.cat === lesson.cat && l.id !== lesson.id)
      .sort((a, b) => {
        const sa = (a.courseSlug === lesson.courseSlug ? 2 : 0) + (Math.abs(a.order - lesson.order) < 6 ? 1 : 0);
        const sb = (b.courseSlug === lesson.courseSlug ? 2 : 0) + (Math.abs(b.order - lesson.order) < 6 ? 1 : 0);
        return sb - sa;
      })
      .slice(0, n);
  },

  nextLesson() {
    if (Store.state.lastLesson && LESSON_MAP[Store.state.lastLesson]) {
      const last = LESSON_MAP[Store.state.lastLesson];
      const adj = getAdjacent(last.courseSlug, last.id);
      if (adj.next && !Store.isDone(adj.next.id)) return adj.next;
      if (!Store.isDone(last.id)) return last;
    }
    const firstUndone = ALL_LESSONS.find(l => !Store.isDone(l.id));
    return firstUndone || ALL_LESSONS[0];
  },

  /* ---------------- 展示辅助 ---------------- */
  fmtMins(mins) {
    if (mins < 60) return `${mins} 分钟`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h} 小时 ${m} 分` : `${h} 小时`;
  },

  gradeText(score, total) {
    const pct = total ? score / total : 0;
    if (pct === 1) return { label: '全对，掌握扎实', color: '#16a34a' };
    if (pct >= 0.8) return { label: '表现不错，可继续', color: '#16a34a' };
    if (pct >= 0.6) return { label: '基本理解，建议复习', color: '#d97706' };
    return { label: '还需巩固，回看正文', color: '#e11d48' };
  },

  heatmap(weeks = 14) {
    const act = Store.state.activity;
    const days = [];
    const end = new Date();
    // 对齐到本周日
    const endDay = new Date(end);
    const dow = endDay.getDay(); // 0 周日
    endDay.setDate(endDay.getDate() + (6 - dow));
    const start = new Date(endDay);
    start.setDate(start.getDate() - (weeks * 7 - 1));

    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = todayStr(d);
      days.push({ date: key, count: act[key] || 0, isFuture: d > end });
    }
    const max = Math.max(1, ...days.map(d => d.count));
    days.forEach(d => {
      d.level = d.count === 0 ? 0 : Math.min(4, Math.ceil(d.count / max * 4));
    });
    return { days, weeks, max };
  }
};
