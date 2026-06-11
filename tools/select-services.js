// tools/select-services.js — 全問題の正解選択肢から英語サービス名らしき句を抽出して頻度集計
// usage: node tools/select-services.js [--all-text]（既定は正解選択肢のみ）
const { liveExams, loadExam } = require("./lib/load-data");

// "Amazon S3" "AWS Lambda" "Azure Key Vault" "Microsoft Entra ID" "Cloud Storage" 等の連語を拾う
const PAT = /(?:Amazon|AWS|Azure|Microsoft|Google Cloud|Google|Cloud|Entra)[ ][A-Z0-9][A-Za-z0-9]*(?:[ ][A-Z0-9][A-Za-z0-9]*){0,4}|[A-Z][A-Za-z0-9]{2,}(?:[ ][A-Z][A-Za-z0-9]+){0,3}/g;

const counts = new Map();
for (const info of liveExams()) {
  const exam = loadExam(info.id);
  for (const q of exam.questions) {
    const text = process.argv.includes("--all-text")
      ? q.question + " " + q.choices.join(" ") + " " + q.explanation
      : q.answer.map(i => q.choices[i]).join(" ");
    const seen = new Set(); // 同一問題内の重複は1カウント
    for (const m of text.matchAll(PAT)) {
      const k = m[0].trim();
      if (k.length < 3 || seen.has(k)) continue;
      seen.add(k);
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  }
}
[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 250)
  .forEach(([k, c]) => console.log(String(c).padStart(4), k));
