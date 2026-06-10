#!/usr/bin/env node
// =============================================================
// build-exam.js — 問題パートファイルの結合・検証・最終データ生成
// -------------------------------------------------------------
// 使い方:
//   node tools/build-exam.js <exam-id> <title> <code> <provider>
// 例:
//   node tools/build-exam.js aws-clf-c02 "AWS Certified Cloud Practitioner" "CLF-C02" aws
//
// 入力: js/data/exams/parts/<exam-id>.part*.js
//   各パートは以下の形式で問題を push する（id は不要。本スクリプトが連番を採番する）:
//     window.CERT_EXAM_PARTS = window.CERT_EXAM_PARTS || {};
//     (window.CERT_EXAM_PARTS["<exam-id>"] = window.CERT_EXAM_PARTS["<exam-id>"] || []).push(
//       { type, domain, difficulty, question, choices, answer, explanation }, ...
//     );
// 出力: js/data/exams/<exam-id>.js（サイト本番形式）
// 検証エラーがあれば exit 1 で終了し、最終ファイルは生成しない。
// =============================================================
"use strict";
const fs = require("fs");
const path = require("path");

const [, , examId, title, code, provider] = process.argv;
if (!examId || !title || !code || !provider) {
  console.error('usage: node tools/build-exam.js <exam-id> "<title>" "<code>" <provider>');
  process.exit(1);
}

const ROOT = path.join(__dirname, "..");
const partsDir = path.join(ROOT, "js", "data", "exams", "parts");
const outFile = path.join(ROOT, "js", "data", "exams", `${examId}.js`);

if (!fs.existsSync(partsDir)) {
  console.error(`parts ディレクトリがありません: ${partsDir}`);
  process.exit(1);
}

// パートファイルを番号順に読込
const files = fs.readdirSync(partsDir)
  .filter(f => f.startsWith(examId + ".part") && f.endsWith(".js"))
  .sort((a, b) => {
    const n = f => parseInt((f.match(/\.part(\d+)\.js$/) || [0, 0])[1], 10);
    return n(a) - n(b);
  });
if (files.length === 0) {
  console.error(`パートファイルが見つかりません: ${partsDir}\\${examId}.part*.js`);
  process.exit(1);
}

global.window = {};
for (const f of files) {
  require(path.join(partsDir, f)); // 構文エラーならここで例外
}
const questions = (global.window.CERT_EXAM_PARTS || {})[examId] || [];

// ---- 検証 ----
const errs = [];
const seenText = new Map();
const VALID_TYPE = new Set(["single", "multiple"]);
const VALID_DIFF = new Set(["easy", "medium", "hard"]);

questions.forEach((q, i) => {
  const tag = `[${i + 1}問目]`;
  if (!VALID_TYPE.has(q.type)) errs.push(`${tag} type が不正: ${q.type}`);
  if (!q.domain || typeof q.domain !== "string") errs.push(`${tag} domain がない`);
  if (!VALID_DIFF.has(q.difficulty)) errs.push(`${tag} difficulty が不正: ${q.difficulty}`);
  if (!q.question || q.question.length < 30) errs.push(`${tag} question が短すぎる(30字未満)`);
  if (!Array.isArray(q.choices) || q.choices.length < 4 || q.choices.length > 6)
    errs.push(`${tag} choices は4〜6個必要 (現在${(q.choices || []).length})`);
  else if (new Set(q.choices).size !== q.choices.length)
    errs.push(`${tag} choices に重複がある`);
  if (!Array.isArray(q.answer) || q.answer.length === 0) {
    errs.push(`${tag} answer が配列でないか空`);
  } else {
    if (q.answer.some(a => !Number.isInteger(a) || a < 0 || a >= (q.choices || []).length))
      errs.push(`${tag} answer のインデックスが範囲外: [${q.answer}]`);
    if (new Set(q.answer).size !== q.answer.length) errs.push(`${tag} answer に重複`);
    if (q.type === "single" && q.answer.length !== 1) errs.push(`${tag} single なのに answer が${q.answer.length}個`);
    if (q.type === "multiple" && q.answer.length < 2) errs.push(`${tag} multiple なのに answer が1個`);
  }
  if (!q.explanation || q.explanation.length < 100)
    errs.push(`${tag} explanation が短すぎる(100字未満)。全誤答の理由も書くこと`);
  // 問題文の重複チェック
  if (q.question) {
    if (seenText.has(q.question)) errs.push(`${tag} 問題文が${seenText.get(q.question)}問目と重複`);
    else seenText.set(q.question, i + 1);
  }
});

if (errs.length > 0) {
  console.error(`✕ 検証エラー ${errs.length}件:`);
  errs.slice(0, 40).forEach(e => console.error("  " + e));
  if (errs.length > 40) console.error(`  …他${errs.length - 40}件`);
  process.exit(1);
}

// ---- id を連番で採番（q001〜）して最終ファイル生成 ----
const finalQuestions = questions.map((q, i) => ({
  id: "q" + String(i + 1).padStart(3, "0"),
  type: q.type,
  domain: q.domain,
  difficulty: q.difficulty,
  question: q.question,
  choices: q.choices,
  answer: q.answer,
  explanation: q.explanation
}));

const payload = {
  meta: { id: examId, title, code, provider },
  questions: finalQuestions
};
const out =
  `// ${title} (${code}) 問題データ — tools/build-exam.js により生成\n` +
  `window.CERT_EXAMS = window.CERT_EXAMS || {};\n` +
  `window.CERT_EXAMS[${JSON.stringify(examId)}] = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(outFile, out, { encoding: "utf8" });

// ---- サマリー ----
const by = key => finalQuestions.reduce((m, q) => (m[q[key]] = (m[q[key]] || 0) + 1, m), {});
console.log(`✔ ${outFile}`);
console.log(`  問題数: ${finalQuestions.length}`);
console.log(`  domain: ${JSON.stringify(by("domain"), null, 0)}`);
console.log(`  type:   ${JSON.stringify(by("type"))}`);
console.log(`  diff:   ${JSON.stringify(by("difficulty"))}`);
