// tools/lib/render.js — 静的ページレンダラ（純関数のみ・I/Oなし）
const esc = s => String(s).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

const truncate = (s, n) => {
  const t = String(s).replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n) + "…";
};

function ga4Snippet(id) {
  if (!id) return "";
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(id)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(id)}');</script>`;
}

// liveExamLinks: [{href, label}] — フッターの静的内部リンク（全ハブ）
function pageShell({ config, title, description, canonicalPath, relRoot, body, jsonLd, liveExamLinks }) {
  const canonical = config.origin.replace(/\/$/, "") + canonicalPath;
  const verify = config.searchConsoleVerification
    ? `<meta name="google-site-verification" content="${esc(config.searchConsoleVerification)}">` : "";
  const ld = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/<\//g, "<\\/")}</script>`
    : "";
  const hubNav = (liveExamLinks || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(config.siteName)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80' fill='%233fe0a4' font-family='monospace'>▸</text></svg>">
${verify}
<link rel="stylesheet" href="${esc(relRoot)}css/style.css">
<link rel="stylesheet" href="${esc(relRoot)}css/page.css">
${ga4Snippet(config.ga4MeasurementId)}
${ld}
</head>
<body class="page-body">
<header class="page-header"><a class="page-logo" href="${esc(relRoot)}index.html">&gt; CLOUDCERT_</a></header>
<main class="page-main">
${body}
</main>
<footer class="page-footer">
<nav class="hub-nav">${hubNav}</nav>
<nav class="site-nav"><a href="${esc(relRoot)}about.html">運営者情報</a><a href="${esc(relRoot)}privacy.html">プライバシーポリシー</a><a href="${esc(relRoot)}contact.html">お問い合わせ</a></nav>
<p class="copy">© CLOUDCERT_ — 本サイトは各認定試験の公式試験ではなく、収録問題はすべてオリジナルの演習問題です。</p>
</footer>
</body>
</html>`;
}

const LETTERS = "ABCDEF";

// 同一ドメインの近傍から最大4問の関連リンクを選ぶ
function relatedQuestions(exam, index, max = 4) {
  const me = exam.questions[index];
  const out = [];
  for (let d = 1; d < exam.questions.length && out.length < max; d++) {
    for (const i of [index - d, index + d]) {
      if (out.length >= max) break;
      const q = exam.questions[i];
      if (q && q.domain === me.domain) out.push(q);
    }
  }
  return out;
}

function questionJsonLd(exam, q) {
  return {
    "@context": "https://schema.org/",
    "@type": "Quiz",
    "about": { "@type": "Thing", "name": exam.meta.title },
    "hasPart": [{
      "@type": "Question",
      "eduQuestionType": q.type === "multiple" ? "Checkbox" : "Multiple choice",
      "learningResourceType": "Practice problem",
      "text": q.question,
      "suggestedAnswer": q.choices.map((c, i) => ({ "@type": "Answer", "position": i, "text": c }))
        .filter((_, i) => !q.answer.includes(i)),
      "acceptedAnswer": (() => {
        const accepted = q.answer.map(i => ({
          "@type": "Answer", "position": i, "text": q.choices[i],
          "comment": { "@type": "Comment", "text": q.explanation }
        }));
        return accepted.length === 1 ? accepted[0] : accepted;
      })()
    }]
  };
}

function renderQuestionPage({ config, exam, index, liveExamLinks }) {
  const q = exam.questions[index];
  const prev = exam.questions[index - 1];
  const next = exam.questions[index + 1];
  const examId = exam.meta.id;
  const title = `【${exam.meta.code} 演習問題】${truncate(q.question, 45)}`;
  const description = truncate(`${exam.meta.code}の本試験レベル演習問題。${q.question}`, 110) + " 全選択肢の解説つき。";
  const answerLabel = q.answer.map(i => LETTERS[i]).join(", ");
  const rel = relatedQuestions(exam, index);
  const diffLabel = { easy: "EASY", medium: "MEDIUM", hard: "HARD" }[q.difficulty] || q.difficulty;

  const body = `
<nav class="breadcrumb"><a href="../../index.html">HOME</a> › <a href="../../exams/${esc(examId)}/">${esc(exam.meta.code)} 試験ガイド</a> › ${esc(q.id)}</nav>
<div class="q-meta"><span>${esc(exam.meta.code)}</span><span>${esc(q.domain)}</span><span>${esc(diffLabel)}</span><span>${q.type === "multiple" ? "複数選択" : "単一選択"}</span></div>
<h1>${esc(q.question)}</h1>
<ol class="q-choices">
${q.choices.map((c, i) => `<li><b>${LETTERS[i]}.</b> ${esc(c)}</li>`).join("\n")}
</ol>
<details class="q-answer">
<summary>解答と解説を見る</summary>
<div class="inner">
<p><b>正解: ${answerLabel}</b></p>
<p>${esc(q.explanation)}</p>
</div>
</details>
<div class="cta-box"><a class="btn btn-primary" href="../../exam.html?exam=${encodeURIComponent(examId)}">▸ この試験を本気で演習する（全${exam.questions.length}問・無料）</a></div>
<nav class="q-nav">
<span>${prev ? `<a href="${esc(prev.id)}.html">← 前の問題</a>` : ""}</span>
<span>${next ? `<a href="${esc(next.id)}.html">次の問題 →</a>` : ""}</span>
</nav>
${rel.length ? `<section class="related"><h2>同じ分野の関連問題</h2><ul class="q-list">
${rel.map(r => `<li><a href="${esc(r.id)}.html">${esc(truncate(r.question, 60))}</a></li>`).join("\n")}
</ul></section>` : ""}`;

  const html = pageShell({
    config, title, description,
    canonicalPath: `/q/${examId}/${q.id}.html`,
    relRoot: "../../", body,
    jsonLd: questionJsonLd(exam, q),
    liveExamLinks
  });
  return { path: `q/${examId}/${q.id}.html`, html };
}

const paras = arr => (arr || []).map(t => `<p>${esc(t)}</p>`).join("\n");

function renderHubPage({ config, exam, examInfo, guide, liveExamLinks }) {
  const examId = exam.meta.id;
  const n = exam.questions.length;
  // ドメイン構成は収録問題から実測（公式比率の近似として表示）
  const counts = {};
  for (const q of exam.questions) counts[q.domain] = (counts[q.domain] || 0) + 1;
  const domainRows = Object.entries(counts)
    .map(([d, c]) => `<tr><td>${esc(d)}</td><td>${c}問（${Math.round(c / n * 100)}%）</td></tr>`).join("\n");

  const title = `${exam.meta.code}（${examInfo.titleJa}）の難易度・勉強法と演習問題${n}問【無料】`;
  const description = truncate(
    `${exam.meta.title}（${exam.meta.code}）の難易度・出題ドメイン・勉強法を解説。本試験レベルのオリジナル演習問題${n}問を無料公開、全問に詳細解説つき。`, 130);

  const guideSections = guide ? `
<h2>試験概要</h2>${paras(guide.overview)}
<h2>難易度</h2>${paras(guide.difficulty)}
<h2>勉強法</h2>${paras(guide.studyPlan)}
${guide.faq && guide.faq.length ? `<h2>よくある質問</h2>` + guide.faq.map(f =>
    `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n") : ""}` : "";

  const body = `
<nav class="breadcrumb"><a href="../../index.html">HOME</a> › ${esc(exam.meta.code)}</nav>
<h1>${esc(title)}</h1>
<p>合格ライン ${examInfo.passLine}% ／ 制限時間 ${examInfo.timeLimitMin}分 ／ 収録 ${n}問（すべて無料・登録不要）</p>
<div class="cta-box"><a class="btn btn-primary" href="../../exam.html?exam=${encodeURIComponent(examId)}">▸ いますぐ演習をはじめる</a></div>
${guideSections}
<h2>出題ドメイン構成（収録問題の内訳）</h2>
<table class="domain-table"><tr><th>ドメイン</th><th>収録数</th></tr>${domainRows}</table>
<h2>収録問題一覧（全${n}問・解説つき）</h2>
<ol class="q-list">
${exam.questions.map(q => `<li><a href="../../q/${esc(examId)}/${esc(q.id)}.html">${esc(truncate(q.question, 60))}</a></li>`).join("\n")}
</ol>`;

  const jsonLd = guide && guide.faq && guide.faq.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faq.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null;

  const html = pageShell({
    config, title, description,
    canonicalPath: `/exams/${examId}/`,
    relRoot: "../../", body, jsonLd, liveExamLinks
  });
  return { path: `exams/${examId}/index.html`, html };
}

module.exports = { esc, truncate, ga4Snippet, pageShell, renderQuestionPage, relatedQuestions, renderHubPage };
