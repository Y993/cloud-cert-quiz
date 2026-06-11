const test = require("node:test");
const assert = require("node:assert");
const { esc, truncate, pageShell, renderQuestionPage, renderLearnPage, renderLearnIndex } = require("../lib/render");

test("esc escapes html", () => {
  assert.strictEqual(esc('<a b="c">&'), "&lt;a b=&quot;c&quot;&gt;&amp;");
});

test("truncate collapses whitespace and adds ellipsis", () => {
  assert.strictEqual(truncate("abc", 10), "abc");
  assert.strictEqual(truncate("あ".repeat(50), 45), "あ".repeat(45) + "…");
  assert.strictEqual(truncate("a  b\n c", 10), "a b c");
});

test("pageShell renders canonical, title, ga4 absent when unset", () => {
  const html = pageShell({
    config: { origin: "https://example.com/base", siteName: "CLOUDCERT_", ga4MeasurementId: "", searchConsoleVerification: "" },
    title: "T", description: "D", canonicalPath: "/q/x/q001.html",
    relRoot: "../../", body: "<p>B</p>", liveExamLinks: []
  });
  assert.ok(html.includes('<link rel="canonical" href="https://example.com/base/q/x/q001.html">'));
  assert.ok(html.includes("<title>T</title>"));
  assert.ok(!html.includes("googletagmanager"));
  assert.ok(html.includes('href="../../css/style.css"'));
});

test("pageShell injects ga4 and verification when set", () => {
  const html = pageShell({
    config: { origin: "https://example.com", siteName: "S", ga4MeasurementId: "G-TEST1", searchConsoleVerification: "tok" },
    title: "T", description: "D", canonicalPath: "/", relRoot: "", body: "", liveExamLinks: []
  });
  assert.ok(html.includes("G-TEST1"));
  assert.ok(html.includes('name="google-site-verification" content="tok"'));
});

test("pageShell escapes </script> inside jsonLd", () => {
  const html = pageShell({
    config: { origin: "https://example.com", siteName: "S", ga4MeasurementId: "", searchConsoleVerification: "" },
    title: "T", description: "D", canonicalPath: "/", relRoot: "", body: "",
    jsonLd: { name: 'bad </script> value' }, liveExamLinks: []
  });
  assert.ok(!html.includes('</script> value'));
  assert.ok(html.includes('<\\/script> value'));
});

test("pageShell escapes quotes in hub link href", () => {
  const html = pageShell({
    config: { origin: "https://example.com", siteName: "S", ga4MeasurementId: "", searchConsoleVerification: "" },
    title: "T", description: "D", canonicalPath: "/", relRoot: "", body: "",
    liveExamLinks: [{ href: 'x" onmouseover="alert(1)', label: "L" }]
  });
  assert.ok(!html.includes('href="x" onmouseover='));
  assert.ok(html.includes('x&quot; onmouseover'));
});

// ─── Task 4: renderQuestionPage ────────────────────────────────────────────────

const CONFIG = { origin: "https://example.com", siteName: "CLOUDCERT_", ga4MeasurementId: "", searchConsoleVerification: "" };
const EXAM = {
  meta: { id: "aws-saa-c03", title: "AWS Certified Solutions Architect – Associate", code: "SAA-C03", provider: "aws" },
  questions: [
    { id: "q001", type: "single", domain: "セキュアなアーキテクチャの設計", difficulty: "medium",
      question: "ある企業がS3への安全なアクセスを必要としている。最適な方法はどれか。",
      choices: ["IAMユーザーのキーを使う", "IAMロールを使う", "IPで制限する", "公開する"],
      answer: [1], explanation: "ロールが最適。Aは鍵管理の負担、Cは脆弱、Dは論外。" },
    { id: "q002", type: "multiple", domain: "セキュアなアーキテクチャの設計", difficulty: "hard",
      question: "適切なものを2つ選べ。", choices: ["a", "b", "c", "d"], answer: [0, 2], explanation: "AとCが正しい。" }
  ]
};

test("renderQuestionPage: title, choices, details, jsonld, nav", () => {
  const { path: p, html } = renderQuestionPage({ config: CONFIG, exam: EXAM, index: 0, liveExamLinks: [] });
  assert.strictEqual(p, "q/aws-saa-c03/q001.html");
  assert.ok(html.includes("【SAA-C03 演習問題】"));
  assert.ok(html.includes("IAMロールを使う"));
  assert.ok(html.includes("<details"));                          // 解答は折りたたみ
  assert.ok(html.includes("正解: B"));                           // 0始まり→B
  assert.ok(html.includes('"@type":"Quiz"'));                    // 練習問題リッチリザルト
  assert.ok(html.includes("q002.html"));                         // 次の問題リンク
  assert.ok(!html.includes("q000"));                             // 前の問題は無い
  assert.ok(html.includes("exam.html?exam=aws-saa-c03"));        // 演習CTA
});

test("renderQuestionPage: multiple answers render as letters", () => {
  const { html } = renderQuestionPage({ config: CONFIG, exam: EXAM, index: 1, liveExamLinks: [] });
  assert.ok(html.includes("正解: A, C"));
  assert.ok(html.includes("q001.html"));                         // 前の問題リンク
});

test("questionJsonLd via page: multiple answers all present in json-ld", () => {
  const { html } = renderQuestionPage({ config: CONFIG, exam: EXAM, index: 1, liveExamLinks: [] });
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const ld = JSON.parse(m[1].replace(/<\\\//g, "</"));
  const accepted = ld.hasPart[0].acceptedAnswer;
  assert.ok(Array.isArray(accepted));
  assert.strictEqual(accepted.length, 2);
  assert.deepStrictEqual(accepted.map(a => a.position), [0, 2]);
});

test("renderQuestionPage: no related section when domain is unique", () => {
  const exam = { meta: EXAM.meta, questions: [
    { ...EXAM.questions[0], domain: "独自ドメインA" },
    { ...EXAM.questions[1], domain: "独自ドメインB" }
  ]};
  const { html } = renderQuestionPage({ config: CONFIG, exam, index: 0, liveExamLinks: [] });
  assert.ok(!html.includes("同じ分野の関連問題"));
});

// ─── Task 5: renderHubPage ────────────────────────────────────────────────────

const { renderHubPage } = require("../lib/render");

test("renderHubPage: domain table, question list, guide sections, fallback", () => {
  const guide = { overview: ["概要です。"], difficulty: ["難しめ。"], studyPlan: ["順番に。"], faq: [{ q: "Q1", a: "A1" }] };
  const examInfo = { passLine: 72, timeLimitMin: 130, titleJa: "ソリューションアーキテクト アソシエイト" };
  const { path: p, html } = renderHubPage({ config: CONFIG, exam: EXAM, examInfo, guide, liveExamLinks: [] });
  assert.strictEqual(p, "exams/aws-saa-c03/index.html");
  assert.ok(html.includes("セキュアなアーキテクチャの設計"));   // ドメイン表（問題から集計）
  assert.ok(html.includes("q001.html"));                        // 問題一覧リンク
  assert.ok(html.includes("概要です。"));
  assert.ok(html.includes("Q1"));
  assert.ok(html.includes('"@type":"FAQPage"'));               // FAQ JSON-LD
  // ガイドなしでもビルドが落ちない＆FAQ構造化データなし
  const fb = renderHubPage({ config: CONFIG, exam: EXAM, examInfo, guide: null, liveExamLinks: [] });
  assert.ok(fb.html.includes("q001.html"));
  assert.ok(!fb.html.includes("FAQPage"));
});

// ─── Learn-3: renderLearnPage / renderLearnIndex ───────────────────────────────

const SVC = { slug: "aws-lambda", name: "AWS Lambda", provider: "aws", category: "コンピューティング",
  aliases: ["AWS Lambda", "Lambda"], officialUrl: "https://docs.aws.amazon.com/ja_jp/lambda/",
  summary: ["概要段落。"], examPoints: ["問われ方段落。"] };

test("renderLearnPage: 公式リンク・問題一覧・パス・関連サービス", () => {
  const refs = [{ examId: "aws-saa-c03", examCode: "SAA-C03", qid: "q001", excerpt: "ある企業が…" }];
  const rel = [{ slug: "amazon-ec2", name: "Amazon EC2" }];
  const { path: p, html } = renderLearnPage({ config: CONFIG, service: SVC, questionRefs: refs, totalRefs: 12, related: rel, liveExamLinks: [] });
  assert.strictEqual(p, "learn/aws-lambda.html");
  assert.ok(html.includes('href="https://docs.aws.amazon.com/ja_jp/lambda/"'));
  assert.ok(html.includes('target="_blank"'));
  assert.ok(html.includes("../q/aws-saa-c03/q001.html"));
  assert.ok(html.includes("12問"));
  assert.ok(html.includes('href="amazon-ec2.html"'));
  assert.ok(html.includes("概要段落。"));
});

test("renderLearnPage: 問題ゼロ・関連ゼロでもセクションが消えるだけ", () => {
  const { html } = renderLearnPage({ config: CONFIG, service: SVC, questionRefs: [], totalRefs: 0, related: [], liveExamLinks: [] });
  assert.ok(!html.includes("登場する演習問題"));
  assert.ok(!html.includes("関連サービス"));
});

test("renderLearnIndex: プロバイダ・カテゴリ見出しとリンク", () => {
  const { path: p, html } = renderLearnIndex({ config: CONFIG, services: { "aws-lambda": SVC }, refCounts: { "aws-lambda": 12 }, liveExamLinks: [] });
  assert.strictEqual(p, "learn/index.html");
  assert.ok(html.includes('href="aws-lambda.html"'));
  assert.ok(html.includes("コンピューティング"));
  assert.ok(html.includes("演習12問"));
});

test("pageShell: site-nav にサービス解説リンク", () => {
  const html = pageShell({ config: CONFIG, title: "T", description: "D", canonicalPath: "/", relRoot: "", body: "", liveExamLinks: [] });
  assert.ok(html.includes('href="learn/">サービス解説</a>'));
});

// ─── Learn-4: svcLinks in renderQuestionPage ──────────────────────────────────

test("renderQuestionPage: svcLinks renders at bottom of details", () => {
  const links = [{ slug: "aws-lambda", name: "AWS Lambda" }, { slug: "amazon-s3", name: "Amazon S3" }];
  const { html } = renderQuestionPage({ config: CONFIG, exam: EXAM, index: 0, liveExamLinks: [], svcLinks: links });
  assert.ok(html.includes('class="svc-links"'));
  assert.ok(html.includes('href="../../learn/aws-lambda.html"'));
  assert.ok(html.includes('href="../../learn/amazon-s3.html"'));
  const noLinks = renderQuestionPage({ config: CONFIG, exam: EXAM, index: 0, liveExamLinks: [] });
  assert.ok(!noLinks.html.includes("svc-links"));
});
