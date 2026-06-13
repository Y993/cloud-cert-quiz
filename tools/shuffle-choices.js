// tools/shuffle-choices.js — 正解位置の偏りを是正する一括シャッフルツール
//
// 全問題で正解が2番目（index=1）に偏っている（56〜94%）ため、選択肢を
// 決定的（examId+qid シード）にシャッフルし、answer と本文中の選択肢参照
// （「選択肢B」「。Aは〜」等）を位置ベースで再マップする。
//
// 安全設計: 再マップ対象として確実に特定できない裸レター・丸数字・
// 「N番目の選択肢」等が残る問題はシャッフルせずスキップして報告する。
// （壊すくらいなら偏りを残す）
//
// 使い方:
//   node tools/shuffle-choices.js            ドライラン（統計と skip 一覧のみ）
//   node tools/shuffle-choices.js --write    js/data/exams/*.js を書き換える
//
// 再実行ガード: 書き込んだファイルには "choices-shuffled" マーカーを入れ、
// マーカーがあるファイルはスキップする（再シャッフルで参照が壊れるのを防ぐ）。

const fs = require("fs");
const path = require("path");
const { ROOT, liveExams, loadExam } = require("./lib/load-data");

const LETTERS = "ABCDEF";

// ---- 決定的乱数 ----
function xfnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededPerm(n, rng) {
  const p = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return p;
}

// ---- 選択肢参照の検出 ----
// P1: 「選択肢B」  P2: 「。Aは」「、BとCが」等（句読点/接続助詞のあとに裸レター＋助詞）
// CIRCLE: 「①は誤り」等の丸数字参照（全データで選択肢参照専用と確認済み。手順①等の用法は無い）
const P1 = /選択肢([A-F])/g;
const P2 = /(^|[、。\s（(「【とや・はが])([A-F])(?=\s?(は|が|も|を|と|や|、|。|・|の|なら|だけ|では|でも|で|に|へ|（|\(|:|：|）|\)|$))/g;
const CIRCLE = /([①②③④⑤⑥⑦])/g;
const CIRCLES = "①②③④⑤⑥⑦";
// 走査: 単独で現れる A-F はすべて参照候補とみなす（英数字・#・+・- が隣接する語中レター
// （C#・AZ-104・B-ツリー等）は除外）
const STANDALONE = /(?<![A-Za-z0-9#+-])([A-F])(?![A-Za-z0-9#+-])/g;
// これらが含まれる問題は位置参照の再マップが保証できないのでスキップ
const UNSUPPORTED = /[1-7１-７]\s*(つ目|番目)の選択肢/;

// text 内の参照を {pos, type, value} で列挙。value はレターまたは選択肢index。
// カバレッジ不足なら ok:false
function analyzeRefs(text) {
  if (UNSUPPORTED.test(text)) return { ok: false, refs: [], reason: "N番目参照" };
  const refs = new Map(); // pos -> {type, value}
  let m;
  P1.lastIndex = 0;
  while ((m = P1.exec(text))) refs.set(m.index + "選択肢".length, { type: "letter", value: m[1] });
  P2.lastIndex = 0;
  while ((m = P2.exec(text))) refs.set(m.index + m[1].length, { type: "letter", value: m[2] });
  CIRCLE.lastIndex = 0;
  while ((m = CIRCLE.exec(text))) refs.set(m.index, { type: "circle", value: CIRCLES.indexOf(m[1]) });
  STANDALONE.lastIndex = 0;
  while ((m = STANDALONE.exec(text))) {
    if (!refs.has(m.index)) return { ok: false, refs: [], reason: `裸レター"${m[1]}"(位置${m.index})` };
  }
  return { ok: true, refs: [...refs.entries()].map(([pos, r]) => ({ pos, ...r })) };
}

// 参照位置を permutation に従って置換（位置ベースなので二重置換しない）
function remapText(text, refs, oldToNewLetter, oldIdxToNewIdx) {
  const sorted = [...refs].sort((a, b) => a.pos - b.pos);
  let out = "", last = 0;
  for (const r of sorted) {
    const rep = r.type === "letter" ? oldToNewLetter[r.value] : CIRCLES[oldIdxToNewIdx[r.value]];
    out += text.slice(last, r.pos) + rep;
    last = r.pos + 1;
  }
  return out + text.slice(last);
}

// 1問にシャッフルを適用。perm[newPos] = oldIndex
function applyShuffle(q, perm) {
  // 選択肢テキスト自体が他の選択肢を参照していたら不可（「上記すべて」等）
  for (const c of q.choices) {
    STANDALONE.lastIndex = 0;
    if (STANDALONE.test(c) || /上記|これらすべて|すべて正しい/.test(c)) {
      return { ok: false, reason: "選択肢テキストに相互参照の疑い" };
    }
  }
  const aq = analyzeRefs(q.question || "");
  const ae = analyzeRefs(q.explanation || "");
  if (!aq.ok) return { ok: false, reason: "問題文: " + aq.reason };
  if (!ae.ok) return { ok: false, reason: "解説: " + ae.reason };
  // 丸数字が選択肢数を超えて参照していたら不整合データなのでスキップ
  for (const r of [...aq.refs, ...ae.refs]) {
    if (r.type === "circle" && r.value >= q.choices.length) return { ok: false, reason: "丸数字が選択肢数を超過" };
  }

  const oldToNew = {};      // 旧レター -> 新レター
  const oldIdxToNewIdx = {}; // 旧index -> 新index（丸数字用）
  perm.forEach((oldIdx, newPos) => {
    oldToNew[LETTERS[oldIdx]] = LETTERS[newPos];
    oldIdxToNewIdx[oldIdx] = newPos;
  });

  return {
    ok: true,
    question: remapText(q.question || "", aq.refs, oldToNew, oldIdxToNewIdx),
    explanation: remapText(q.explanation || "", ae.refs, oldToNew, oldIdxToNewIdx),
    choices: perm.map(oldIdx => q.choices[oldIdx]),
    answer: q.answer.map(i => perm.indexOf(i)).sort((a, b) => a - b)
  };
}

function shuffleExam(exam) {
  const skipped = [];
  let shuffled = 0;
  for (const q of exam.questions) {
    const rng = mulberry32(xfnv1a(exam.meta.id + ":" + q.id));
    const perm = seededPerm(q.choices.length, rng);
    const res = applyShuffle(q, perm);
    if (!res.ok) { skipped.push({ id: q.id, reason: res.reason }); continue; }
    q.question = res.question;
    q.explanation = res.explanation;
    q.choices = res.choices;
    q.answer = res.answer;
    shuffled++;
  }
  return { shuffled, skipped };
}

function distOf(exam) {
  const dist = {};
  for (const q of exam.questions) if (q.answer.length === 1) dist[q.answer[0]] = (dist[q.answer[0]] || 0) + 1;
  return dist;
}

function main() {
  const write = process.argv.includes("--write");
  const today = new Date().toISOString().slice(0, 10);
  for (const info of liveExams()) {
    const file = path.join(ROOT, "js", "data", "exams", `${info.id}.js`);
    const src = fs.readFileSync(file, "utf8");
    if (src.includes("choices-shuffled")) {
      console.log(`${info.id}: SKIP（シャッフル適用済みマーカーあり）`);
      continue;
    }
    const exam = loadExam(info.id);
    const before = JSON.stringify(distOf(exam));
    const { shuffled, skipped } = shuffleExam(exam);
    const after = JSON.stringify(distOf(exam));
    console.log(`${info.id}: shuffle=${shuffled} skip=${skipped.length}  dist ${before} -> ${after}`);
    for (const s of skipped) console.log(`    skip ${s.id}: ${s.reason}`);
    if (write) {
      const firstLine = src.startsWith("//") ? src.slice(0, src.indexOf("\n")) : `// ${info.id} 問題データ`;
      const out = `${firstLine}\n// choices-shuffled: ${today} (tools/shuffle-choices.js)\n` +
        `window.CERT_EXAMS = window.CERT_EXAMS || {};\n` +
        `window.CERT_EXAMS[${JSON.stringify(info.id)}] = ${JSON.stringify(exam, null, 2)};\n`;
      fs.writeFileSync(file, out, { encoding: "utf8" });
    }
  }
  console.log(write ? "done (written)" : "dry-run のみ（--write で書き込み）");
}

if (require.main === module) main();
module.exports = { xfnv1a, mulberry32, seededPerm, analyzeRefs, remapText, applyShuffle };
