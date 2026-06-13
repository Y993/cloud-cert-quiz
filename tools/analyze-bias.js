// tools/analyze-bias.js — 正解位置の偏りと、解説内の選択肢レター参照を全試験で計測する（読み取り専用）
const { liveExams, loadExam } = require("./lib/load-data");

const rows = [];
for (const info of liveExams()) {
  const exam = loadExam(info.id);
  const dist = {};
  let refQs = 0;          // 「選択肢A」形式の参照を含む問題数
  let bareQs = 0;         // 「。Aは」「、Bが」等の裸レター参照を含む問題数
  const bareIds = [];
  for (const q of exam.questions) {
    if (q.answer.length === 1) dist[q.answer[0]] = (dist[q.answer[0]] || 0) + 1;
    const text = q.explanation || "";
    if (/選択肢[A-F]/.test(text)) refQs++;
    if (/(^|[、。\s（(「])([A-F])(は|が|も|を|と|なら|だけ|のみ|:|：)/.test(text)) {
      bareQs++;
      if (bareIds.length < 5) bareIds.push(q.id);
    }
  }
  const singles = Object.values(dist).reduce((a, b) => a + b, 0);
  const top = Object.entries(dist).sort((a, b) => b[1] - a[1])[0];
  rows.push({
    exam: info.id,
    singles,
    topIdx: top ? top[0] : "-",
    topPct: top ? Math.round(top[1] / singles * 100) : 0,
    dist: JSON.stringify(dist),
    refQs, bareQs,
    bareSample: bareIds.join(",")
  });
}
console.table(rows);
