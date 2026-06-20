// =============================================================
// CLOUDCERT_ LP — カタログ描画・フィルター・演出
// =============================================================
(function () {
  "use strict";
  const catalog = window.CERT_CATALOG;
  if (!catalog) return;

  const root = document.getElementById("catalogRoot");

  // ---- カタログ描画 ----
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function examCard(p, ex) {
    const live = ex.status === "available";
    const badge = live
      ? '<span class="status-badge live">LIVE</span>'
      : '<span class="status-badge soon">COMING SOON</span>';
    const qmeta = live
      ? `<span>問題数 <b>${ex.questionCount}</b></span><span>合格ライン <b>${ex.passLine}%</b></span>`
      : `<span>準備中</span>`;
    const cta = live
      ? `<a class="btn btn-primary card-cta" href="exam.html?exam=${encodeURIComponent(ex.id)}">▸ 演習を開始</a>
     <a class="guide-link" href="exams/${encodeURIComponent(ex.id)}/">試験ガイド・全問題一覧 →</a>`
      : `<button class="btn card-cta" disabled>準備中…</button>`;
    return `
      <article class="exam-card ${live ? "available" : "coming"} sr" style="--pcolor: var(--${p.id})">
        <div class="row1">
          <span class="code">${esc(ex.code)}</span>
          <span class="level">${esc(ex.level)}</span>
          ${badge}
        </div>
        <h4>${esc(ex.titleJa)}<span class="title-en">${esc(ex.title)}</span></h4>
        <p class="desc">${esc(ex.description)}</p>
        <div class="meta">${qmeta}</div>
        ${cta}
      </article>`;
  }

  function render() {
    root.innerHTML = catalog.providers.map(p => `
      <div class="provider-block sr" data-provider="${p.id}">
        <div class="provider-head">
          <h3>${esc(p.short)}</h3>
          <span class="count">${p.exams.length} exams</span>
        </div>
        <p class="provider-tagline">${esc(p.tagline)}</p>
        <div class="exam-grid">
          ${p.exams.map(ex => examCard(p, ex)).join("")}
        </div>
      </div>`).join("");
  }
  render();

  // ---- 統計 ----
  const allExams = catalog.providers.flatMap(p => p.exams);
  const totalQ = allExams.reduce((s, e) => s + (e.questionCount || 0), 0);
  document.getElementById("statExams").textContent = allExams.length;
  document.getElementById("statQuestions").innerHTML =
    totalQ + '<span class="unit">問</span>';

  // ---- フィルタータブ ----
  const tabs = document.querySelectorAll(".ftab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const f = tab.dataset.filter;
      document.querySelectorAll(".provider-block").forEach(b => {
        b.style.display = (f === "all" || b.dataset.provider === f) ? "" : "none";
      });
    });
  });

  // ---- スクロール表示 ----
  // フェイルセーフ: IntersectionObserver が使える環境でのみ .sr-armed を付けて
  // 非表示化を有効にする。JS失敗時はCSS側で常時表示のまま（コンテンツが消えない）。
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("sr-armed");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".sr").forEach(el => io.observe(el));
    // 保険: 万一 observe 漏れ・描画タイミング問題があっても3秒後に全表示
    setTimeout(() => {
      document.querySelectorAll(".sr:not(.in)").forEach(el => el.classList.add("in"));
    }, 3000);
  }

  // ---- ヒーロー: ターミナルタイプ演出 ----
  const term = document.getElementById("termBody");
  if (term) {
    const lines = [
      { html: '<span class="p">$</span> cloudcert practice <span class="dim">--exam</span> <span class="c-aws">aws-saa-c03</span>', type: true },
      { html: '<span class="dim">loading question bank…</span>', type: false },
      { html: '<span class="ok">✔</span> 本試験レベル・シナリオ問題 <span class="ok">[READY]</span>', type: false },
      { html: '<span class="ok">✔</span> 全問詳細解説              <span class="ok">[READY]</span>', type: false },
      { html: '<span class="ok">✔</span> ドメイン別スコア分析      <span class="ok">[READY]</span>', type: false },
      { html: '&nbsp;', type: false },
      { html: '<span class="dim">supported:</span> <span class="c-aws">AWS</span> / <span class="c-gcp">GCP</span> / <span class="c-azure">Azure</span>', type: false },
      { html: '<span class="p">$</span> <span class="tcursor"></span>', type: false }
    ];
    let i = 0;
    function next() {
      if (i >= lines.length) return;
      const ln = lines[i++];
      const div = document.createElement("div");
      div.className = "tline";
      if (ln.type) {
        // 1行目だけタイプライター風に
        const plain = ln.html.replace(/<[^>]+>/g, "");
        let k = 0;
        const cur = document.createElement("span");
        cur.className = "tcursor";
        div.appendChild(cur);
        term.appendChild(div);
        const t = setInterval(() => {
          k++;
          div.innerHTML = '<span class="p">$</span> ' +
            plain.slice(2, 2 + k).replace(/</g, "&lt;") + '<span class="tcursor"></span>';
          if (k >= plain.length - 2) {
            clearInterval(t);
            div.innerHTML = ln.html;
            setTimeout(next, 350);
          }
        }, 36);
      } else {
        div.innerHTML = ln.html;
        term.appendChild(div);
        setTimeout(next, i < 3 ? 500 : 240);
      }
    }
    setTimeout(next, 600);
  }
})();
