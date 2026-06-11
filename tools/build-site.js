// tools/build-site.js — dist/ に公開サイト一式を生成する
const fs = require("fs");
const path = require("path");
const { ROOT, liveExams, loadExam, loadGuide, loadServices } = require("./lib/load-data");
const { esc, ga4Snippet, pageShell, renderQuestionPage, renderHubPage, renderLearnPage, renderLearnIndex } = require("./lib/render");

// マッチャを Node で読み込む
{
  const prev = global.window; global.window = {};
  require(path.join(ROOT, "js", "services-match.js"));
  var svcMatch = global.window.CERT_SERVICES_MATCH;
  global.window = prev;
}
const services = loadServices();

// ---- サービス台帳バリデーション（fail-fast）----
// エイリアス一意性は「同一プロバイダ内」で検証する（IAM/VPC等はプロバイダ間で同名のため、
// マッチングもプロバイダでフィルタして行う）
const seenAliases = new Map(); // key: provider + " " + alias
for (const [slug, s] of Object.entries(services)) {
  if (s.slug !== slug) throw new Error(`services: slug mismatch ${slug}`);
  if (!s.provider || !s.category || !s.name) throw new Error(`services: missing fields ${slug}`);
  if (!s.officialUrl || !/^https:\/\//.test(s.officialUrl)) throw new Error(`services: bad officialUrl ${slug}`);
  for (const a of s.aliases || []) {
    // 2文字は「英大文字+数字」(S3等) のみ許可。汎用略語(AI/ID等)の誤マッチを防ぐ
    if (a.length < 3 && !/^[A-Z][0-9]$/.test(a)) throw new Error(`services: alias too short "${a}" (${slug})`);
    const key = s.provider + " " + a;
    if (seenAliases.has(key)) throw new Error(`services: duplicate alias "${a}" in ${s.provider} (${slug} / ${seenAliases.get(key)})`);
    seenAliases.set(key, slug);
  }
}
// プロバイダ別の辞書（マッチング用）
const servicesByProvider = {};
for (const s of Object.values(services)) {
  (servicesByProvider[s.provider] = servicesByProvider[s.provider] || {})[s.slug] = s;
}
const svcRefs = {};  // slug -> [{examId, examCode, qid, excerpt}]

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "site.config.json"), "utf8"));
const DIST = path.join(ROOT, "dist");
const today = new Date().toISOString().slice(0, 10);

// ---- clean & copy static ----
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const rel of ["index.html", "exam.html", "css", "js"]) {
  fs.cpSync(path.join(ROOT, rel), path.join(DIST, rel), { recursive: true });
}
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");

// 既存LP/プレイヤーにGA4・検証タグ・canonicalを注入
function injectHead(file, canonicalPath) {
  const p = path.join(DIST, file);
  let html = fs.readFileSync(p, "utf8");
  const canonical = config.origin.replace(/\/$/, "") + canonicalPath;
  const verify = config.searchConsoleVerification
    ? `<meta name="google-site-verification" content="${esc(config.searchConsoleVerification)}">` : "";
  html = html.replace("</head>",
    `<link rel="canonical" href="${esc(canonical)}">${verify}${ga4Snippet(config.ga4MeasurementId)}</head>`);
  fs.writeFileSync(p, html);
}
injectHead("index.html", "/");
injectHead("exam.html", "/exam.html");

// ---- generate pages ----
function write(relPath, html) {
  const p = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
}

const exams = liveExams();
const urls = ["/", "/exam.html"];
let qCount = 0;

for (const info of exams) {
  const exam = loadExam(info.id);
  if (!exam.questions.length) throw new Error(`exam data broken: ${info.id}`);
  if (exam.questions.length !== info.questionCount)
    throw new Error(`questionCount mismatch: ${info.id} manifest=${info.questionCount} actual=${exam.questions.length}`);
  const guide = loadGuide(info.id);
  if (!guide) console.warn(`WARN: no guide for ${info.id} (hub page will have no guide sections)`);

  const links = exams.map(e => ({ href: `../../exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
  const hub = renderHubPage({ config, exam, examInfo: info, guide, liveExamLinks: links });
  write(hub.path, hub.html);
  urls.push(`/exams/${info.id}/`);

  exam.questions.forEach((_, i) => {
    const q = exam.questions[i];
    const correctText = q.answer.map(ci => q.choices[ci]).join(" ");
    const svcLinks = svcMatch(correctText, servicesByProvider[info.provider] || {}, 2);
    const qp = renderQuestionPage({ config, exam, index: i, liveExamLinks: links, svcLinks });
    write(qp.path, qp.html);
    urls.push("/" + qp.path);
    qCount++;
    svcLinks.forEach(s => (svcRefs[s.slug] = svcRefs[s.slug] || []).push({
      examId: info.id, examCode: info.code, qid: q.id, excerpt: q.question
    }));
  });
}

// ---- 勉強用ページ（learn）----
if (Object.keys(services).length) {
  const learnLinks = exams.map(e => ({ href: `../exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
  for (const s of Object.values(services)) {
    const refs = svcRefs[s.slug] || [];
    const related = Object.values(services)
      .filter(o => o.slug !== s.slug && o.provider === s.provider && o.category === s.category).slice(0, 5);
    const page = renderLearnPage({ config, service: s, questionRefs: refs.slice(0, 20), totalRefs: refs.length, related, liveExamLinks: learnLinks });
    write(page.path, page.html);
    urls.push("/" + page.path);
  }
  const refCounts = Object.fromEntries(Object.entries(svcRefs).map(([k, v]) => [k, v.length]));
  const idx = renderLearnIndex({ config, services, refCounts, liveExamLinks: learnLinks });
  write(idx.path, idx.html);
  urls.push("/learn/");
}

// ---- 必須ページ（privacy / about / contact）----
const topLinks = exams.map(e => ({ href: `exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
const staticPages = [
  {
    file: "about.html", title: "運営者情報 | CLOUDCERT_",
    desc: "CLOUDCERT_ の運営者情報。",
    body: `<h1>運営者情報</h1>
<p>CLOUDCERT_（クラウドサート）は、AWS・Google Cloud・Azure のクラウド認定資格を本試験レベルのオリジナル演習問題で学習できる無料サイトです。</p>
<p>収録している問題はすべて当サイトが独自に作成したオリジナル問題であり、実際の試験問題の転載・複製ではありません。各認定試験の名称は各社の商標です。当サイトは各ベンダーの公式サイトではありません。</p>`
  },
  {
    file: "privacy.html", title: "プライバシーポリシー | CLOUDCERT_",
    desc: "CLOUDCERT_ のプライバシーポリシー。",
    body: `<h1>プライバシーポリシー</h1>
<h2>アクセス解析について</h2>
<p>当サイトは Google アナリティクスを利用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。詳細は Google のポリシーをご確認ください。</p>
<h2>広告について</h2>
<p>当サイトは第三者配信の広告サービスを利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。</p>
<h2>学習データについて</h2>
<p>演習の履歴・苦手問題リストはお使いのブラウザ内（localStorage）にのみ保存され、当サイトのサーバーに送信されることはありません。</p>
<p>制定日: ${today}</p>`
  },
  {
    file: "contact.html", title: "お問い合わせ | CLOUDCERT_",
    desc: "CLOUDCERT_ へのお問い合わせ方法。",
    body: `<h1>お問い合わせ</h1>
<p>問題の誤りのご指摘・ご要望は、GitHub リポジトリの Issue までお寄せください。</p>
<p><a href="https://github.com/Y993/cloud-cert-quiz/issues" rel="noopener">GitHub Issues を開く</a></p>`
  }
];
for (const sp of staticPages) {
  write(sp.file, pageShell({
    config, title: sp.title, description: sp.desc,
    canonicalPath: "/" + sp.file, relRoot: "", body: sp.body, liveExamLinks: topLinks
  }));
  urls.push("/" + sp.file);
}

// ---- sitemap & robots ----
const origin = config.origin.replace(/\/$/, "");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${origin}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

console.log(`build OK: ${exams.length} exams, ${qCount} question pages, ${Object.keys(services).length} services, ${urls.length} urls`);
