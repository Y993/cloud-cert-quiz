// スマホ使用感テスト用プレビュー版ビルド
// 本番(150問)を一切変更せず、SAAのみ10問のスリム版を別フォルダに生成する。
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..");
const OUT = path.resolve(SRC, "..", "cloud-cert-quiz-preview");

// ---- 出力フォルダ準備（中身をクリーンにして作り直す。.git は温存）----
function rimrafExceptGit(dir) {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); return; }
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git") continue;
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}
rimrafExceptGit(OUT);

// ---- そのままコピーする静的ファイル ----
function copy(rel) {
  const from = path.join(SRC, rel);
  const to = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}
["index.html", "exam.html", "css", "js/main.js", "js/quiz.js"].forEach(copy);

// ---- SAA を10問に絞って生成（公式ドメイン比率で配分）----
global.window = {};
require(path.join(SRC, "js/data/exams/aws-saa-c03.js"));
const saa = global.window.CERT_EXAMS["aws-saa-c03"];

const plan = [
  ["セキュアなアーキテクチャの設計", 3],
  ["弾力性に優れたアーキテクチャの設計", 3],
  ["高パフォーマンスなアーキテクチャの設計", 2],
  ["コストを最適化したアーキテクチャの設計", 2],
];
const picked = [];
for (const [domain, n] of plan) {
  const inDomain = saa.questions.filter(q => q.domain === domain).slice(0, n);
  picked.push(...inDomain);
}
// 念のため10問に満たなければ先頭から補完
if (picked.length < 10) {
  for (const q of saa.questions) {
    if (picked.length >= 10) break;
    if (!picked.includes(q)) picked.push(q);
  }
}
const tenQ = picked.slice(0, 10);

const previewExam = {
  meta: saa.meta,
  questions: tenQ,
};
const saaOut =
  "// AWS Certified Solutions Architect – Associate (SAA-C03) — プレビュー版(10問・使用感テスト用)\n" +
  "window.CERT_EXAMS = window.CERT_EXAMS || {};\n" +
  'window.CERT_EXAMS["aws-saa-c03"] = ' +
  JSON.stringify(previewExam, null, 2) + ";\n";
fs.mkdirSync(path.join(OUT, "js/data/exams"), { recursive: true });
fs.writeFileSync(path.join(OUT, "js/data/exams/aws-saa-c03.js"), saaOut, "utf8");

// ---- マニフェストを AWS×SAA のみに ----
const manifest = {
  providers: [
    {
      id: "aws",
      short: "AWS",
      name: "Amazon Web Services",
      tagline: "スマホ使用感テスト用プレビュー（SAA 10問のお試し版）。",
      exams: [
        {
          id: "aws-saa-c03",
          code: "SAA-C03",
          title: "Solutions Architect – Associate",
          titleJa: "ソリューションアーキテクト アソシエイト",
          level: "Associate",
          status: "available",
          questionCount: tenQ.length,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "js/data/exams/aws-saa-c03.js",
          description: "お試し版：本試験レベルのシナリオ問題を10問だけ収録。",
        },
      ],
    },
  ],
};
const manifestOut =
  "// CLOUDCERT_ プレビュー版マニフェスト（SAAのみ・10問）\n" +
  "window.CERT_CATALOG = " + JSON.stringify(manifest, null, 2) + ";\n";
fs.mkdirSync(path.join(OUT, "js/data"), { recursive: true });
fs.writeFileSync(path.join(OUT, "js/data/manifest.js"), manifestOut, "utf8");

// GitHub Pages が Jekyll 処理をしないように
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

// ---- 検証 ----
const dist = {};
for (const q of tenQ) dist[q.domain] = (dist[q.domain] || 0) + 1;
console.log("OUT:", OUT);
console.log("questions:", tenQ.length);
console.log("domains:", JSON.stringify(dist, null, 0));
console.log("ids:", tenQ.map(q => q.id).join(","));
