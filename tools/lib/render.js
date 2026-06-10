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
  const ld = jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : "";
  const hubNav = (liveExamLinks || []).map(l => `<a href="${l.href}">${esc(l.label)}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(config.siteName)}">
${verify}
<link rel="stylesheet" href="${relRoot}css/style.css">
<link rel="stylesheet" href="${relRoot}css/page.css">
${ga4Snippet(config.ga4MeasurementId)}
${ld}
</head>
<body class="page-body">
<header class="page-header"><a class="page-logo" href="${relRoot}index.html">&gt; CLOUDCERT_</a></header>
<main class="page-main">
${body}
</main>
<footer class="page-footer">
<nav class="hub-nav">${hubNav}</nav>
<nav class="site-nav"><a href="${relRoot}about.html">運営者情報</a><a href="${relRoot}privacy.html">プライバシーポリシー</a><a href="${relRoot}contact.html">お問い合わせ</a></nav>
<p class="copy">© CLOUDCERT_ — 本サイトは各認定試験の公式試験ではなく、収録問題はすべてオリジナルの演習問題です。</p>
</footer>
</body>
</html>`;
}

module.exports = { esc, truncate, ga4Snippet, pageShell };
