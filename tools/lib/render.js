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

// パンくずリッチリザルト用 BreadcrumbList（items: [{name, path?}]、最終要素はpath省略可）
function breadcrumbLd(config, items) {
  const origin = config.origin.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem", "position": i + 1, "name": it.name,
      ...(it.path ? { "item": origin + it.path } : {})
    }))
  };
}

// liveExamLinks: [{href, label}] — フッターの静的内部リンク（全ハブ）
function pageShell({ config, title, description, canonicalPath, relRoot, body, jsonLd, liveExamLinks, noindex }) {
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
<meta property="og:image" content="${esc(config.origin.replace(/\/$/, ""))}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80' fill='%233fe0a4' font-family='monospace'>▸</text></svg>">
${noindex ? `<meta name="robots" content="noindex">` : ""}${verify}${config.adsenseAccount ? `\n<meta name="google-adsense-account" content="${esc(config.adsenseAccount)}">` : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet">
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
<nav class="site-nav"><a href="${esc(relRoot)}guide/">資格ガイド</a><a href="${esc(relRoot)}learn/">サービス解説</a><a href="${esc(relRoot)}career/">キャリア</a><a href="${esc(relRoot)}about.html">運営者情報</a><a href="${esc(relRoot)}privacy.html">プライバシーポリシー</a><a href="${esc(relRoot)}contact.html">お問い合わせ</a></nav>
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

function renderQuestionPage({ config, exam, index, liveExamLinks, svcLinks }) {
  const q = exam.questions[index];
  const prev = exam.questions[index - 1];
  const next = exam.questions[index + 1];
  const examId = exam.meta.id;
  // #番号 を含めて全問題ページの title を一意にする（問題文冒頭の截断による重複防止）
  const title = `【${exam.meta.code} 演習問題 #${q.id.replace(/^q0*/, "")}】${truncate(q.question, 45)}`;
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
${svcLinks && svcLinks.length ? `<div class="svc-links">📚 関連サービスの解説: ${svcLinks.map(s =>
  `<a href="../../learn/${esc(s.slug)}.html">${esc(s.name)}</a>`).join(" ・ ")}</div>` : ""}
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
    jsonLd: [questionJsonLd(exam, q), breadcrumbLd(config, [
      { name: "HOME", path: "/" },
      { name: `${exam.meta.code} 試験ガイド`, path: `/exams/${examId}/` },
      { name: q.id }
    ])],
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

  const lds = [];
  if (guide && guide.faq && guide.faq.length) lds.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faq.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  });
  lds.push(breadcrumbLd(config, [
    { name: "HOME", path: "/" },
    { name: `${exam.meta.code} 試験ガイド` }
  ]));
  const jsonLd = lds;

  const html = pageShell({
    config, title, description,
    canonicalPath: `/exams/${examId}/`,
    relRoot: "../../", body, jsonLd, liveExamLinks
  });
  return { path: `exams/${examId}/index.html`, html };
}

const PROVIDER_LABEL = { aws: "AWS", gcp: "Google Cloud", azure: "Microsoft Azure" };

// 一覧カード用の一行説明（summaryの最初の文）
function svcLead(s, n = 72) {
  const first = (Array.isArray(s.summary) ? s.summary[0] : s.summary) || "";
  const head = String(first).split("。")[0];
  return head && head.length <= n ? head + "。" : truncate(first, n);
}

function renderLearnPage({ config, service, questionRefs, totalRefs, related, liveExamLinks }) {
  const s = service;
  const title = `${s.name}とは？試験に出るポイントと演習問題`;
  const descSuffix = totalRefs > 0 ? `登場する演習問題${totalRefs}問と公式ドキュメントへのリンクつき。` : `公式ドキュメントへのリンクつき。`;
  const description = truncate(`${s.name}（${PROVIDER_LABEL[s.provider] || s.provider}）の要点と資格試験での問われ方を解説。${descSuffix}`, 130);
  const summary = Array.isArray(s.summary) ? s.summary : (s.summary ? [s.summary] : []);
  const body = `
<nav class="breadcrumb"><a href="../index.html">HOME</a> › <a href="./">サービス解説</a> › ${esc(s.name)}</nav>
<div class="learn-head">
<div class="badges"><span class="badge" data-provider="${esc(s.provider)}">${esc(PROVIDER_LABEL[s.provider] || s.provider)}</span><span class="badge">${esc(s.category)}</span>${totalRefs > 0 ? `<span class="badge badge-q">演習${totalRefs}問</span>` : ""}</div>
<h1>${esc(s.name)}とは</h1>
</div>
${summary.length ? `<p class="lead">${esc(summary[0])}</p>` : ""}${summary.length > 1 ? "\n" + paras(summary.slice(1)) : ""}
<p><a class="official-btn" href="${esc(s.officialUrl)}" target="_blank" rel="noopener">公式ドキュメント →</a></p>
<h2>試験での問われ方</h2>
${paras(s.examPoints)}
${questionRefs && questionRefs.length ? `<h2>このサービスが登場する演習問題（${totalRefs}問）</h2>
<ul class="q-list">
${questionRefs.map(r => `<li><a href="../q/${esc(r.examId)}/${esc(r.qid)}.html">【${esc(r.examCode)}】${esc(truncate(r.excerpt, 60))}</a></li>`).join("\n")}
</ul>` : ""}
${related && related.length ? `<h2>関連サービス</h2><ul class="q-list">
${related.map(r => `<li><a href="${esc(r.slug)}.html">${esc(r.name)}</a></li>`).join("\n")}</ul>` : ""}`;
  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "inLanguage": "ja",
    "about": { "@type": "Thing", "name": s.name },
    "author": { "@type": "Organization", "name": config.siteName },
    "publisher": { "@type": "Organization", "name": config.siteName },
    "mainEntityOfPage": config.origin.replace(/\/$/, "") + `/learn/${s.slug}.html`
  }, breadcrumbLd(config, [
    { name: "HOME", path: "/" },
    { name: "サービス解説", path: "/learn/" },
    { name: s.name }
  ])];
  const html = pageShell({ config, title, description, canonicalPath: `/learn/${s.slug}.html`, relRoot: "../", body, jsonLd, liveExamLinks });
  return { path: `learn/${s.slug}.html`, html };
}

function renderLearnIndex({ config, services, refCounts, liveExamLinks }) {
  const list = Object.values(services);
  const title = `クラウドサービス解説一覧（${list.length}サービス）`;
  const description = truncate(`AWS・Google Cloud・Azure の頻出${list.length}サービスを試験対策視点で解説。各サービスの要点・公式ドキュメント・登場する演習問題への導線つき。`, 130);
  const byProvider = {};
  for (const s of list) {
    (byProvider[s.provider] = byProvider[s.provider] || {});
    (byProvider[s.provider][s.category] = byProvider[s.provider][s.category] || []).push(s);
  }
  let body = `<nav class="breadcrumb"><a href="../index.html">HOME</a> › サービス解説</nav>\n<h1>クラウドサービス解説</h1>\n<p class="lead">AWS・Google Cloud・Azure の頻出サービスを、ひとことの説明・試験での問われ方・演習問題への導線つきで。知らないサービスもここで当たりがつく。</p>`;
  for (const prov of Object.keys(byProvider)) {
    const provCount = Object.values(byProvider[prov]).reduce((a, c) => a + c.length, 0);
    body += `\n<section class="svc-provider" data-provider="${esc(prov)}">\n<h2 class="provider-head"><span class="provider-name">${esc(PROVIDER_LABEL[prov] || prov)}</span><span class="provider-count">${provCount}サービス</span></h2>`;
    for (const cat of Object.keys(byProvider[prov])) {
      body += `\n<h3 class="cat-head">${esc(cat)}</h3>\n<div class="svc-grid">\n` +
        byProvider[prov][cat].map(s =>
          `<a class="svc-card" data-provider="${esc(s.provider)}" href="${esc(s.slug)}.html"><span class="svc-card-name">${esc(s.name)}</span><span class="svc-card-desc">${esc(svcLead(s))}</span><span class="svc-card-foot"><span>演習${(refCounts && refCounts[s.slug]) || 0}問</span><span class="arrow">→</span></span></a>`).join("\n") + "\n</div>";
    }
    body += `\n</section>`;
  }
  const html = pageShell({ config, title, description, canonicalPath: "/learn/", relRoot: "../", body, liveExamLinks });
  return { path: "learn/index.html", html };
}

// ----- 資格ガイド（上位流入ピラー）-----
const LEVEL_LABEL = {
  Foundational: "入門（Foundational）",
  Associate: "アソシエイト（Associate）",
  Professional: "プロフェッショナル（Professional）",
  Specialty: "専門（Specialty）"
};
const LEVEL_ORDER = ["Foundational", "Associate", "Professional", "Specialty"];

function renderGuideIndex({ config, catalog, liveExamLinks }) {
  const title = "クラウド資格の一覧と難易度・選び方 ― AWS / Azure / GCP";
  const description = truncate("AWS・Azure・GCPのクラウド資格を難易度別に一覧。未経験はどれから取るべきか、各資格の概要と勉強の順番を、本試験レベルの無料演習へのリンクつきで整理。", 130);

  let providerSections = "";
  for (const p of (catalog.providers || [])) {
    const live = (p.exams || []).filter(e => e.status === "available");
    if (!live.length) continue;
    const byLevel = {};
    for (const e of live) (byLevel[e.level] = byLevel[e.level] || []).push(e);
    let inner = `<h2 class="provider-head"><span class="provider-name">${esc(p.name)}</span><span class="provider-count">${live.length}資格</span></h2>`;
    if (p.tagline) inner += `\n<p class="muted-note">${esc(p.tagline)}</p>`;
    for (const lvl of LEVEL_ORDER) {
      const list = byLevel[lvl];
      if (!list || !list.length) continue;
      inner += `\n<h3 class="cat-head">${esc(LEVEL_LABEL[lvl] || lvl)}</h3>
<table class="domain-table">
<tr><th>資格</th><th>概要</th><th>演習</th></tr>
${list.map(e => `<tr><td><a href="../exams/${esc(e.id)}/">${esc(e.code)}</a><br><span class="muted-note">${esc(e.titleJa)}</span></td><td>${esc(e.description || "")}</td><td><a href="../exams/${esc(e.id)}/">${e.questionCount}問 →</a></td></tr>`).join("\n")}
</table>`;
    }
    providerSections += `\n<section class="svc-provider" data-provider="${esc(p.id)}">${inner}\n</section>`;
  }

  const faq = [
    { q: "クラウド資格、未経験はどれから取るべき？", a: "まず入門級を1つ。AWS中心ならCLF-C02、Azure中心ならAZ-900、GCPならCDL（Cloud Digital Leader）。基礎で全体像をつかんでから、アソシエイト級（SAA-C03など）へ進むほうが結局は速い。" },
    { q: "AWS・Azure・GCP、どれを選べばいい？", a: "求人数とシェアが最大のAWSが無難。勤務先がMicrosoft系ならAzure、データ/AI志向ならGCPやAI系資格も選択肢。1つ取れば考え方は他クラウドにも応用が利く。" },
    { q: "資格だけで転職できる？", a: "資格は書類通過を助けるが、決め手は「手を動かした証拠」。資格に加えて小さな構築物と演習で実力を示すのが近道。" }
  ];

  const body = `
<nav class="breadcrumb"><a href="../index.html">HOME</a> › 資格ガイド</nav>
<h1>${esc(title)}</h1>
<p class="lead">AWS・Azure・GCPのクラウド資格を、難易度別に整理しました。「未経験はどれから？」の答えと、各資格の概要・勉強の順番を、本試験レベルの無料演習へのリンクつきでまとめています。</p>
<h2>難易度は3〜4層で考える</h2>
<p>クラウド資格は大きく、入門（Foundational）→ アソシエイト（Associate）→ プロフェッショナル／専門（Professional / Specialty）の順に難しくなります。まずは入門で「全体像と用語」を、アソシエイトで「設計・運用の判断」を身につけるのが王道です。</p>
<h2>未経験はどれから？</h2>
<p>結論、<strong>入門級を1つ取ってから、アソシエイトへ</strong>。AWSで始めるなら CLF-C02 → SAA-C03 が定番。Azure中心なら AZ-900 → AZ-104、GCPなら CDL → ACE。いきなりアソシエイトを狙うより、入門で土台を作るほうが遠回りに見えて速い。転職で評価されやすいのはアソシエイト以上、とくに SAA-C03。</p>
${providerSections}
<div class="cta-box"><a class="btn btn-primary" href="../index.html">▸ 演習する試験を選ぶ</a></div>
<h2>よくある質問</h2>
${faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n")}`;

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
    breadcrumbLd(config, [{ name: "HOME", path: "/" }, { name: "資格ガイド" }])
  ];

  const html = pageShell({ config, title, description, canonicalPath: "/guide/", relRoot: "../", body, jsonLd, liveExamLinks });
  return { path: "guide/index.html", html };
}

module.exports = { esc, truncate, ga4Snippet, pageShell, renderQuestionPage, relatedQuestions, renderHubPage, renderLearnPage, renderLearnIndex, renderGuideIndex };
