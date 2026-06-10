// =============================================================
// CLOUDCERT_ 演習エンジン（ページ遷移型）
// -------------------------------------------------------------
// URL:
//   exam.html?exam=<exam-id>                — スタート画面
//   exam.html?exam=<exam-id>&q=<n>          — n問目（1始まり）
//   exam.html?exam=<exam-id>&view=result    — 結果画面
//
// ★ 1問ごとに「実ページ遷移」する設計（広告対応）
//   SPA内の差し替えではなく location.href による本物のナビゲーションで
//   問題を進める。これによりページビューが問題ごとに発生し、将来
//   広告（AdSense等）を入れたとき自然にインプレッションが増える。
//   ※ JSで広告だけをリロードする方式はポリシー違反になるため不可。
//   詳細: docs/ADS.md
//
// セッション (sessionStorage: cloudcert:session:<exam-id>):
//   { mode, source, order:[qid...], answers:{qid:{picked:[],correct}},
//     finalized, ts }
//   - タブを閉じると消える（中断＝未保存、の従来仕様を踏襲）
//   - finalized フラグで結果画面のリロード時に履歴・苦手プールの
//     二重書き込みを防ぐ
//
// モード:
//   practice — 1問ごとに正誤判定＋解説を表示
//   mock     — 全問回答後にまとめて採点（本番形式）
// 出題範囲:
//   all   — 全問題から出題
//   wrong — 過去に間違えた問題（苦手プール）のみ。正解するとプールから外れる
// 永続化 (localStorage):
//   cloudcert:history:<exam-id> — 挑戦履歴 [{ts,mode,source,correct,total,pct}] 最新順・最大30件
//   cloudcert:wrong:<exam-id>   — 苦手プール（間違えた問題idの配列）
// =============================================================
(function () {
  "use strict";

  const root = document.getElementById("quizRoot");
  const params = new URLSearchParams(location.search);
  const examId = params.get("exam");

  // ---- ユーティリティ ----
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const s = new Set(b);
    return a.every(x => s.has(x));
  }
  const KEYS = "ABCDEF";

  // ---- 永続化 ----
  const HIST_KEY = id => `cloudcert:history:${id}`;
  const WRONG_KEY = id => `cloudcert:wrong:${id}`;
  const SESS_KEY = id => `cloudcert:session:${id}`;
  function loadJSON(storage, key, fallback) {
    try {
      const v = JSON.parse(storage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function saveJSON(storage, key, val) {
    try { storage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function loadSession() { return loadJSON(sessionStorage, SESS_KEY(examId), null); }
  function saveSession(s) { saveJSON(sessionStorage, SESS_KEY(examId), s); }
  function clearSession() { try { sessionStorage.removeItem(SESS_KEY(examId)); } catch (e) {} }

  // 苦手プール（現存する問題idのみに絞って返す）
  function loadWrongPool() {
    const ids = new Set(loadJSON(localStorage, WRONG_KEY(examId), []));
    return allQuestions.filter(q => ids.has(q.id));
  }

  // URL生成（実ページ遷移用）
  function urlStart() { return `exam.html?exam=${encodeURIComponent(examId)}`; }
  function urlQ(n) { return `${urlStart()}&q=${n}`; }
  function urlResult() { return `${urlStart()}&view=result`; }

  function showError(msg) {
    root.innerHTML = `
      <div class="error-panel">
        <div class="code">404</div>
        <p>${esc(msg)}</p>
        <p style="margin-top:20px"><a class="btn btn-ghost" href="index.html">← トップへ戻る</a></p>
      </div>`;
  }

  // ---- 試験をマニフェストから解決 ----
  let examMeta = null;
  let providerId = null;
  outer:
  for (const p of (window.CERT_CATALOG ? window.CERT_CATALOG.providers : [])) {
    for (const ex of p.exams) {
      if (ex.id === examId) { examMeta = ex; providerId = p.id; break outer; }
    }
  }
  if (!examMeta) { showError("指定された試験が見つかりません。"); return; }
  if (examMeta.status !== "available" || !examMeta.dataFile) {
    showError(`${examMeta.code} は現在準備中です。公開までお待ちください。`);
    return;
  }

  let allQuestions = [];
  let qById = {};

  // ---- 問題データを script 注入で読込 → URLに応じてルーティング ----
  const scr = document.createElement("script");
  scr.src = examMeta.dataFile;
  scr.onload = () => {
    const data = window.CERT_EXAMS && window.CERT_EXAMS[examId];
    if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
      showError("問題データの読み込みに失敗しました。");
      return;
    }
    allQuestions = data.questions;
    allQuestions.forEach(q => { qById[q.id] = q; });
    route();
  };
  scr.onerror = () => showError("問題データの読み込みに失敗しました。");
  document.head.appendChild(scr);

  // =========================================================
  // ルーティング
  // =========================================================
  function route() {
    const view = params.get("view");
    const qn = parseInt(params.get("q"), 10);

    if (view === "result") { renderResult(); return; }
    if (Number.isInteger(qn) && qn >= 1) { renderQuestion(qn); return; }
    renderStart();
  }

  // セッションの整合性チェック（壊れた/古いセッションは捨てる）
  function validSession(sess) {
    return sess
      && Array.isArray(sess.order) && sess.order.length > 0
      && sess.order.every(id => qById[id])
      && sess.answers && typeof sess.answers === "object";
  }
  // 最初の未回答問題の番号（1始まり）。全問回答済みなら 0
  function firstUnanswered(sess) {
    for (let i = 0; i < sess.order.length; i++) {
      if (!sess.answers[sess.order[i]]) return i + 1;
    }
    return 0;
  }

  // 新しいセッションを作って1問目へ実遷移
  function startNewSession(mode, source, count) {
    const pool = source === "wrong" ? loadWrongPool() : allQuestions;
    if (pool.length === 0) { location.href = urlStart(); return; }
    const order = shuffle(pool).slice(0, Math.min(count, pool.length)).map(q => q.id);
    saveSession({ mode, source, order, answers: {}, finalized: false, ts: Date.now() });
    location.href = urlQ(1);
  }

  // =========================================================
  // スタート画面
  // =========================================================
  function renderStart() {
    const total = allQuestions.length;
    const wrongPool = loadWrongPool();
    const history = loadJSON(localStorage, HIST_KEY(examId), []);

    // 未完了セッションがあれば再開を提案（完了済みは破棄）
    let resumeSess = loadSession();
    if (resumeSess && (!validSession(resumeSess) || resumeSess.finalized)) {
      clearSession();
      resumeSess = null;
    }
    const resumeAt = resumeSess ? firstUnanswered(resumeSess) : 0;
    const answeredCount = resumeSess ? Object.keys(resumeSess.answers).length : 0;

    root.innerHTML = `
      <div class="start-panel reveal">
        <span class="exam-code mono">${esc(examMeta.code)} · ${esc(providerId.toUpperCase())}</span>
        <h1>${esc(examMeta.titleJa)}</h1>
        <p class="sub">${esc(examMeta.title)} — 収録 ${total}問 / 合格ライン ${examMeta.passLine}%</p>

        ${resumeSess && resumeAt > 0 ? `
        <div class="resume-banner">
          <p>前回の続きがあります（${answeredCount}/${resumeSess.order.length}問 回答済み・${resumeSess.mode === "mock" ? "模試" : "練習"}${resumeSess.source === "wrong" ? "・復習" : ""}）</p>
          <div class="opt-row">
            <a class="btn btn-primary" href="${urlQ(resumeAt)}">▸ 続きから再開</a>
            <button class="btn btn-ghost" id="discardSessBtn">破棄して最初から</button>
          </div>
        </div>` : ""}

        <div class="opt-group">
          <span class="opt-label">MODE — 演習モード</span>
          <div class="opt-row" id="modeRow">
            <button class="opt-btn selected" data-mode="practice">練習（1問ごとに解説）</button>
            <button class="opt-btn" data-mode="mock">模試（最後にまとめて採点）</button>
          </div>
        </div>

        <div class="opt-group">
          <span class="opt-label">RANGE — 出題範囲</span>
          <div class="opt-row" id="sourceRow">
            <button class="opt-btn selected" data-source="all">全問題（${total}問）</button>
            <button class="opt-btn ${wrongPool.length === 0 ? "disabled" : ""}" data-source="wrong" ${wrongPool.length === 0 ? "disabled" : ""}>
              ✗ 間違えた問題のみ（${wrongPool.length}問）
            </button>
          </div>
          ${wrongPool.length === 0 ? `<p class="opt-hint">間違えた問題は自動で記録され、ここから復習できます。正解すると一覧から外れます。</p>` : `<p class="opt-hint">正解した問題は復習リストから自動で外れます。</p>`}
        </div>

        <div class="opt-group">
          <span class="opt-label">QUESTIONS — 出題数</span>
          <div class="opt-row" id="countRow"></div>
        </div>

        <button class="btn btn-primary" id="startBtn" style="width:100%; justify-content:center; padding:15px 0;">▸ 演習を開始する</button>

        ${history.length > 0 ? `
        <div class="opt-group" style="margin-top:30px; margin-bottom:0;">
          <span class="opt-label">HISTORY — 挑戦履歴（直近${Math.min(history.length, 5)}件）</span>
          <ul class="history-list">
            ${history.slice(0, 5).map(h => `
              <li class="history-item">
                <span class="h-date mono">${esc(fmtDate(h.ts))}</span>
                <span class="h-tag mono">${h.mode === "mock" ? "模試" : "練習"}</span>
                ${h.source === "wrong" ? `<span class="h-tag wrong mono">復習</span>` : ""}
                <span class="h-frac mono">${h.correct}/${h.total}</span>
                <span class="h-score mono ${h.pct >= examMeta.passLine ? "pass" : "fail"}">${h.pct}%</span>
              </li>`).join("")}
          </ul>
          <button class="text-btn" id="clearHistBtn">履歴と復習データをリセット</button>
        </div>` : ""}
      </div>`;

    const sel = { mode: "practice", source: "all", count: 0 };

    // 出題数ボタンは出題範囲に応じて再生成（大型試験向け: 10/25/50/全問）
    function rebuildCountRow() {
      const poolSize = sel.source === "wrong" ? wrongPool.length : total;
      const base = poolSize > 50 ? [10, 25, 50] : [5, 10];
      const opts = [...new Set(base.filter(n => n < poolSize).concat(poolSize))].filter(n => n > 0);
      const row = document.getElementById("countRow");
      // 既定: 大型試験は25問、それ以外は全問
      const def = poolSize > 50 ? 25 : poolSize;
      row.innerHTML = opts.map(n =>
        `<button class="opt-btn ${n === def ? "selected" : ""}" data-count="${n}">${n === poolSize ? `全${n}問` : `${n}問`}</button>`
      ).join("");
      sel.count = def;
      row.querySelectorAll(".opt-btn").forEach(b => {
        b.addEventListener("click", () => {
          row.querySelectorAll(".opt-btn").forEach(x => x.classList.remove("selected"));
          b.classList.add("selected");
          sel.count = Number(b.dataset.count);
        });
      });
    }
    rebuildCountRow();

    root.querySelectorAll("#modeRow .opt-btn").forEach(b => {
      b.addEventListener("click", () => {
        root.querySelectorAll("#modeRow .opt-btn").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        sel.mode = b.dataset.mode;
      });
    });
    root.querySelectorAll("#sourceRow .opt-btn:not(.disabled)").forEach(b => {
      b.addEventListener("click", () => {
        root.querySelectorAll("#sourceRow .opt-btn").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        sel.source = b.dataset.source;
        rebuildCountRow();
      });
    });
    document.getElementById("startBtn").addEventListener("click", () => {
      startNewSession(sel.mode, sel.source, sel.count);
    });

    const discardBtn = document.getElementById("discardSessBtn");
    if (discardBtn) {
      discardBtn.addEventListener("click", () => {
        clearSession();
        location.href = urlStart();
      });
    }

    const clearBtn = document.getElementById("clearHistBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("この試験の挑戦履歴と復習データをすべて削除しますか？")) {
          try {
            localStorage.removeItem(HIST_KEY(examId));
            localStorage.removeItem(WRONG_KEY(examId));
          } catch (e) {}
          clearSession();
          location.href = urlStart();
        }
      });
    }
  }

  function fmtDate(ts) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  // =========================================================
  // 問題画面（1問 = 1ページ）
  // =========================================================
  function renderQuestion(qn) {
    const sess = loadSession();
    if (!validSession(sess)) { location.replace(urlStart()); return; }
    if (sess.finalized) { location.replace(urlResult()); return; }
    const total = sess.order.length;
    if (qn > total) { location.replace(urlResult()); return; }

    const qid = sess.order[qn - 1];
    const q = qById[qid];
    const prevAnswer = sess.answers[qid] || null; // 戻る/リロードで再訪した回答済み問題
    const isLast = qn === total;

    // 模試モードで回答済みの問題に戻った場合は、次の未回答へ自動転送
    // （解説を見せないため・二重回答防止）
    if (prevAnswer && sess.mode === "mock") {
      const next = firstUnanswered(sess);
      location.replace(next === 0 ? urlResult() : urlQ(next));
      return;
    }

    let picked = prevAnswer ? prevAnswer.picked.slice() : [];
    let answered = !!prevAnswer;

    root.innerHTML = `
      <div class="quiz-topbar">
        <button class="exit" id="exitBtn">✕ 中断</button>
        ${sess.source === "wrong" ? `<span class="chip wrong-chip mono">復習モード</span>` : ""}
        <span class="qcount mono"><b>${qn}</b> / ${total}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${((qn - 1) / total) * 100}%"></div></div>

      <div class="q-card">
        <div class="q-meta">
          <span class="chip mono">${esc(examMeta.code)}</span>
          <span class="chip domain mono">${esc(q.domain)}</span>
          ${q.type === "multiple" ? `<span class="chip multi mono">複数選択（${q.answer.length}つ）</span>` : ""}
        </div>
        <p class="q-text">${esc(q.question)}</p>
        <div class="choices" id="choices">
          ${q.choices.map((c, i) => `
            <button class="choice" data-i="${i}">
              <span class="key mono">${KEYS[i]}</span>
              <span>${esc(c)}</span>
            </button>`).join("")}
        </div>
        <div id="explainSlot"></div>
        <div class="q-actions">
          <button class="btn btn-primary" id="submitBtn" disabled style="opacity:.45">回答する</button>
        </div>
      </div>`;

    // 進捗バーをアニメーション
    requestAnimationFrame(() => {
      const fill = root.querySelector(".progress-fill");
      if (fill) fill.style.width = `${(qn / total) * 100}%`;
    });

    document.getElementById("exitBtn").addEventListener("click", () => {
      if (confirm("演習を中断してトップに戻りますか？（このタブを開いている間は、再開できます）")) location.href = "index.html";
    });

    const submitBtn = document.getElementById("submitBtn");

    // 回答済み表示（practice で戻る/リロードした場合）
    function showFeedback(correct) {
      root.querySelectorAll(".choice").forEach(btn => {
        const i = Number(btn.dataset.i);
        btn.disabled = true;
        if (q.answer.includes(i)) btn.classList.add("correct");
        else if (picked.includes(i)) btn.classList.add("wrong");
      });
      const slot = document.getElementById("explainSlot");
      slot.innerHTML = `
        <div class="explain-box ${correct ? "" : "ng"}">
          <div class="verdict mono">${correct ? "✔ CORRECT — 正解" : "✕ INCORRECT — 不正解"}</div>
          <p>${esc(q.explanation)}</p>
        </div>`;
      const actions = root.querySelector(".q-actions");
      // ★ 実ページ遷移（aタグ）。広告のインプレッションが問題ごとに発生する
      actions.innerHTML = `
        <a class="btn btn-primary" id="nextBtn" href="${isLast ? urlResult() : urlQ(qn + 1)}">${isLast ? "結果を見る ▸" : "次の問題 ▸"}</a>`;
      document.getElementById("nextBtn").focus();
    }

    if (answered) {
      // practice で回答済み再訪: フィードバックを復元
      showFeedback(prevAnswer.correct);
    } else {
      root.querySelectorAll(".choice").forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          const i = Number(btn.dataset.i);
          if (q.type === "multiple") {
            // トグル選択
            if (picked.includes(i)) {
              picked = picked.filter(x => x !== i);
              btn.classList.remove("selected");
            } else {
              picked.push(i);
              btn.classList.add("selected");
            }
          } else {
            picked = [i];
            root.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
          }
          const ok = q.type === "multiple"
            ? picked.length === q.answer.length
            : picked.length === 1;
          submitBtn.disabled = !ok;
          submitBtn.style.opacity = ok ? "1" : ".45";
        });
      });

      submitBtn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const correct = sameSet(picked, q.answer);

        // セッションへ回答を保存（リロード・戻る対応の要）
        const cur = loadSession();
        if (!validSession(cur)) { location.replace(urlStart()); return; }
        cur.answers[qid] = { picked: picked.slice(), correct };
        saveSession(cur);

        if (sess.mode === "practice") {
          showFeedback(correct);
        } else {
          // 模試: 即次ページへ実遷移
          location.href = isLast ? urlResult() : urlQ(qn + 1);
        }
      });
    }
  }

  // =========================================================
  // 結果画面
  // =========================================================
  function renderResult() {
    const sess = loadSession();
    if (!validSession(sess)) { location.replace(urlStart()); return; }

    // 未回答が残っていたら結果は出さず、そこへ転送
    if (!sess.finalized) {
      const next = firstUnanswered(sess);
      if (next !== 0) { location.replace(urlQ(next)); return; }
    }

    const questions = sess.order.map(id => qById[id]);
    const answers = sess.order.map(id => sess.answers[id]);
    const total = questions.length;
    const correct = answers.filter(a => a.correct).length;
    const pct = Math.round((correct / total) * 100);
    const pass = pct >= examMeta.passLine;

    // ドメイン別集計
    const domains = {};
    questions.forEach((q, i) => {
      const d = domains[q.domain] || (domains[q.domain] = { total: 0, correct: 0 });
      d.total++;
      if (answers[i].correct) d.correct++;
    });

    // ---- 永続化（初回確定時のみ。リロードでは二重書き込みしない） ----
    if (!sess.finalized) {
      // 苦手プール更新（正解→除外 / 不正解→追加）
      const wrongSet = new Set(loadJSON(localStorage, WRONG_KEY(examId), []));
      questions.forEach((q, i) => {
        if (answers[i].correct) wrongSet.delete(q.id);
        else wrongSet.add(q.id);
      });
      saveJSON(localStorage, WRONG_KEY(examId), [...wrongSet]);

      // 挑戦履歴（最新順・最大30件）
      const history = loadJSON(localStorage, HIST_KEY(examId), []);
      history.unshift({
        ts: Date.now(),
        mode: sess.mode,
        source: sess.source,
        correct, total, pct
      });
      saveJSON(localStorage, HIST_KEY(examId), history.slice(0, 30));

      sess.finalized = true;
      saveSession(sess);
    }

    const wrongCount = new Set(loadJSON(localStorage, WRONG_KEY(examId), [])).size;

    root.innerHTML = `
      <div class="result-panel">
        <span class="exam-code mono" style="color:var(--accent); font-weight:800; letter-spacing:.08em;">${esc(examMeta.code)} — RESULT</span>
        <div class="score-ring" id="scoreRing" style="--ring:${pass ? "var(--accent)" : "var(--red)"}">
          <div class="inner">
            <div class="pct mono">${pct}<span style="font-size:1.1rem">%</span></div>
            <div class="frac">${correct} / ${total}</div>
          </div>
        </div>
        <div class="result-verdict ${pass ? "pass" : "fail"} mono">${pass ? "PASS LINE CLEARED" : "KEEP PRACTICING"}</div>
        <p class="result-note">合格ライン ${examMeta.passLine}% に対して ${pct}% でした。${pass ? "この調子で全ドメインを固めましょう。" : "下の弱点ドメインから復習しましょう。"}${wrongCount > 0 ? `<br>復習リストに <b class="mono" style="color:var(--red)">${wrongCount}問</b> 残っています。` : (sess.source === "wrong" ? "<br>🎉 復習リストの問題をすべてクリアしました！" : "")}</p>

        <div class="domain-breakdown">
          <h3>DOMAIN BREAKDOWN — ドメイン別正答率</h3>
          ${Object.entries(domains).map(([name, d]) => {
            const p = Math.round((d.correct / d.total) * 100);
            const cls = p >= 70 ? "" : p >= 40 ? "mid" : "low";
            return `
              <div class="dom-row">
                <div class="dom-label"><span>${esc(name)}</span><span class="pct">${d.correct}/${d.total} · ${p}%</span></div>
                <div class="dom-bar"><div class="fill ${cls}" data-w="${p}"></div></div>
              </div>`;
          }).join("")}
        </div>

        <div class="cta-row" style="justify-content:center">
          ${wrongCount > 0 ? `<button class="btn btn-primary" id="reviewWrongBtn">✗ 間違えた問題を復習（${wrongCount}問）</button>` : ""}
          <button class="btn ${wrongCount > 0 ? "btn-ghost" : "btn-primary"}" id="retryBtn">▸ もう一度挑戦</button>
          <a class="btn btn-ghost" href="index.html#exams">他の試験を見る</a>
        </div>

        <div class="review-list">
          <h3>REVIEW — 全問の解説</h3>
          ${questions.map((q, i) => {
            const a = answers[i];
            return `
              <details class="review-item">
                <summary>
                  <span class="mark ${a.correct ? "ok" : "ng"} mono">${a.correct ? "✔" : "✕"}</span>
                  <span class="rq">Q${i + 1}. ${esc(q.question)}</span>
                </summary>
                <div class="review-body">
                  <p class="rb-q">${esc(q.question)}</p>
                  ${q.choices.map((c, j) => {
                    const cls = [
                      "rb-choice",
                      q.answer.includes(j) ? "is-answer" : "",
                      a.picked.includes(j) ? "is-yours" : ""
                    ].join(" ");
                    const tag = q.answer.includes(j) ? " ← 正解" : (a.picked.includes(j) ? " ← あなたの回答" : "");
                    return `<div class="${cls}"><span class="mono">${KEYS[j]}.</span> ${esc(c)}<b>${tag}</b></div>`;
                  }).join("")}
                  <div class="rb-exp">${esc(q.explanation)}</div>
                </div>
              </details>`;
          }).join("")}
        </div>
      </div>`;

    // リングとバーをアニメーション
    requestAnimationFrame(() => {
      setTimeout(() => {
        const ring = document.getElementById("scoreRing");
        let cur = 0;
        const t = setInterval(() => {
          cur += Math.max(1, Math.round(pct / 30));
          if (cur >= pct) { cur = pct; clearInterval(t); }
          ring.style.setProperty("--pct", cur);
        }, 18);
        root.querySelectorAll(".dom-bar .fill").forEach(f => {
          f.style.width = f.dataset.w + "%";
        });
      }, 150);
    });

    document.getElementById("retryBtn").addEventListener("click", () => {
      clearSession();
      location.href = urlStart();
    });
    const rw = document.getElementById("reviewWrongBtn");
    if (rw) {
      rw.addEventListener("click", () => {
        // 苦手プールを練習モードで全問復習（新しいセッションを開始）
        startNewSession("practice", "wrong", wrongCount);
      });
    }
  }
})();
