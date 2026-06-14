// tools/build-site.js — dist/ に公開サイト一式を生成する
const fs = require("fs");
const path = require("path");
const { ROOT, liveExams, loadExam, loadGuide, loadServices, loadCatalog } = require("./lib/load-data");
const { esc, ga4Snippet, pageShell, renderQuestionPage, renderHubPage, renderLearnPage, renderLearnIndex, renderGuideIndex } = require("./lib/render");

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
for (const rel of ["index.html", "exam.html", "builder.html", "css", "js", "assets"]) {
  fs.cpSync(path.join(ROOT, rel), path.join(DIST, rel), { recursive: true });
}
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
// 独自ドメイン用 CNAME（gh-pages へ force-push してもドメインが外れないよう毎回出力する）。
// origin が github.io サブパスのときは出さない（プロジェクトページのまま）
{
  const host = new URL(config.origin).hostname;
  if (!host.endsWith("github.io")) fs.writeFileSync(path.join(DIST, "CNAME"), host + "\n");
}

// 既存LP/プレイヤーにGA4・検証タグ・canonicalを注入
function injectHead(file, canonicalPath) {
  const p = path.join(DIST, file);
  let html = fs.readFileSync(p, "utf8");
  const origin = config.origin.replace(/\/$/, "");
  const canonical = origin + canonicalPath;
  const verify = config.searchConsoleVerification
    ? `<meta name="google-site-verification" content="${esc(config.searchConsoleVerification)}">` : "";
  // 既存の <title>/<meta description> から OGP を組み立てる（値はHTML上ですでにエスケープ済み）
  const ogTitle = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || esc(config.siteName);
  const ogDesc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const og = `<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(config.siteName)}">
<meta property="og:image" content="${esc(origin)}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">`;
  html = html.replace("</head>",
    `<link rel="canonical" href="${esc(canonical)}">${og}${verify}${ga4Snippet(config.ga4MeasurementId)}</head>`);
  fs.writeFileSync(p, html);
}
injectHead("index.html", "/");
injectHead("exam.html", "/exam.html");
injectHead("builder.html", "/builder.html");

// ---- generate pages ----
function write(relPath, html) {
  const p = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
}

const exams = liveExams();
const urls = ["/", "/exam.html", "/builder.html"];
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

// ---- キャリア記事（career）= 高単価（転職/スクール）の受け皿 ----
{
  const careerArticles = require("./content/career");
  const careerLinks = exams.map(e => ({ href: `../exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
  const DISCLOSURE = `<p class="aff-disclosure">本ページには広告（アフィリエイトプログラムによる紹介）を含みます。掲載内容は運営者の調査と方針に基づくもので、紹介報酬の有無で評価を変えていません。</p>`;
  for (const a of careerArticles) {
    const body = `<nav class="breadcrumb"><a href="../index.html">HOME</a> › <a href="./">キャリア</a> › ${esc(a.title)}</nav>
${DISCLOSURE}
${a.body}
${DISCLOSURE}`;
    write(`career/${a.slug}.html`, pageShell({
      config, title: a.title, description: a.description,
      canonicalPath: `/career/${a.slug}.html`, relRoot: "../", body, liveExamLinks: careerLinks
    }));
    urls.push(`/career/${a.slug}.html`);
  }
  const items = careerArticles.map(a => `<li><a href="${esc(a.slug)}.html">${esc(a.title)}</a></li>`).join("\n");
  const list = careerArticles.length ? `<ul class="career-index">\n${items}\n</ul>` : `<p>記事は準備中です。</p>`;
  const idxBody = `<nav class="breadcrumb"><a href="../index.html">HOME</a> › キャリア</nav>
<h1>キャリア</h1>
<p>クラウド/AI資格を取った"後"の話。未経験からの転職や、学習の進め方を、運営者の調査と実体験をもとにまとめています。</p>
${list}`;
  write("career/index.html", pageShell({
    config, title: "キャリア｜クラウド資格を取った後の転職・学習 | CLOUDCERT_",
    description: "クラウド/AI資格取得後のキャリア。未経験からの転職や学習の進め方を、運営者の調査と実体験をもとにまとめます。",
    canonicalPath: "/career/", relRoot: "../", body: idxBody, liveExamLinks: careerLinks
  }));
  urls.push("/career/");
}

// ---- 資格ガイド（guide）= 上位流入ピラー（全試験ハブへ内部リンク）----
{
  const catalog = loadCatalog();
  const guideLinks = exams.map(e => ({ href: `../exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
  const g = renderGuideIndex({ config, catalog, liveExamLinks: guideLinks });
  write(g.path, g.html);
  urls.push("/guide/");
}

// ---- 必須ページ（privacy / about / contact）----
const topLinks = exams.map(e => ({ href: `exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
const staticPages = [
  {
    file: "about.html", title: "運営者情報 | CLOUDCERT_ — クラウド資格の無料演習サイト",
    desc: "クラウド資格を独学で取得しながら学習ツールを作る個人「黒眼鏡」が運営する CLOUDCERT_ の運営者情報。本試験レベルの無料演習サイトを作った理由と、問題作成・プライバシーの方針を掲載しています。",
    body: `<h1>運営者情報</h1>
<p>CLOUDCERT_（クラウドサート）は、AWS・Google Cloud・Azure のクラウド認定資格を、本試験レベルのオリジナル演習問題で学習できる無料サイトです。運営しているのは <strong>黒眼鏡（くろめがね）</strong> という個人で、クラウドの資格を独学で取得しながら、自分のための学習ツールを作っています。</p>
<h2>このサイトを作った理由</h2>
<p>資格の勉強をしていて、ずっと不満だったことがあります。「本番と同じレベルで、何度でも演習できる無料の場所」がどこにも見つからなかったことです。市販の問題集は本番より易しかったり、無料のものは選択肢ごとの解説が薄かったりで、肝心の「なぜ間違えたのか」が分からない。だったら自分が欲しかったものを作ろうと、本試験のシナリオに寄せたオリジナル問題を作って、このサイトにしました。</p>
<h2>大切にしていること</h2>
<ul>
<li><strong>本試験レベル</strong>：用語の暗記ではなく、実際の試験で問われる「状況に対する判断」を問う問題にしています。全選択肢に解説をつけています。</li>
<li><strong>全問無料・登録不要</strong>：メールアドレスもログインも要りません。学習履歴はお使いのブラウザ内（localStorage）にのみ保存され、当サイトのサーバーには送信されません。</li>
<li><strong>間違いから復習できる</strong>：不正解になった問題は自動で苦手プールに記録され、そこだけを選んで復習できます。</li>
</ul>
<h2>問題の作成について</h2>
<p>収録している問題は、すべて運営者が独自に作成したオリジナル問題です。実際の試験問題の転載・複製ではありません。各認定試験の名称は各社の商標であり、当サイトは各ベンダーの公式サイトではありません。内容には正確を期していますが、試験範囲は随時更新されるため、最終的なご確認は各公式ドキュメントをお願いします。</p>
<h2>お問い合わせ</h2>
<p>問題の誤りのご指摘・ご要望は <a href="contact.html">お問い合わせ</a> からお寄せください。</p>`
  },
  {
    file: "privacy.html", title: "プライバシーポリシー | CLOUDCERT_ — クラウド資格の無料演習サイト",
    desc: "CLOUDCERT_ のプライバシーポリシー。アクセス解析・広告配信での Cookie の利用方針と、演習履歴がブラウザ内（localStorage）にのみ保存されサーバーに送信されないことを説明しています。",
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
    file: "contact.html", title: "お問い合わせ | CLOUDCERT_ — クラウド資格の無料演習サイト",
    desc: "CLOUDCERT_ へのお問い合わせ方法。収録問題の誤りのご指摘・機能のご要望・掲載に関するご連絡は GitHub Issues からお寄せください。",
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

// ---- 404 ページ（GitHub Pages は任意の深さのURLで 404.html を返すため、リンクは絶対URLにする）----
{
  const o = config.origin.replace(/\/$/, "");
  const links404 = exams.map(e => ({ href: `${o}/exams/${e.id}/`, label: `${e.code} 試験ガイド` }));
  write("404.html", pageShell({
    config, title: "404 Not Found | CLOUDCERT_",
    description: "お探しのページは見つかりませんでした。",
    canonicalPath: "/404.html", relRoot: o + "/", liveExamLinks: links404, noindex: true,
    body: `<h1><span style="color:var(--accent,#3fe0a4)">404</span> — NOT FOUND</h1>
<p>お探しのページは見つかりませんでした。URLが変更されたか、削除された可能性があります。</p>
<p><a href="${o}/">トップページ</a> から演習したい試験を選ぶか、<a href="${o}/learn/">サービス解説一覧</a> をご覧ください。</p>`
  }));
  // 404.html は sitemap に載せない
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
