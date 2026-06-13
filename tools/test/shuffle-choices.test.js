const test = require("node:test");
const assert = require("node:assert");
const { seededPerm, mulberry32, xfnv1a, analyzeRefs, applyShuffle } = require("../shuffle-choices");

// perm[newPos] = oldIndex。テストでは固定 perm を直接渡す
const REV = [3, 2, 1, 0]; // 逆順: 旧A(0)→新D / 旧B(1)→新C / 旧C(2)→新B / 旧D(3)→新A

function q(over) {
  return {
    id: "q001", type: "single",
    question: "正しいものはどれか。",
    choices: ["あ", "い", "う", "え"],
    answer: [1],
    explanation: "いが最適です。",
    ...over
  };
}

test("applyShuffle: choices と answer が perm どおりに並び替わる", () => {
  const r = applyShuffle(q(), REV);
  assert.strictEqual(r.ok, true);
  assert.deepStrictEqual(r.choices, ["え", "う", "い", "あ"]);
  assert.deepStrictEqual(r.answer, [2]); // 旧1 → perm.indexOf(1) = 2
});

test("applyShuffle: 複数選択の answer も再マップ＋昇順", () => {
  const r = applyShuffle(q({ type: "multiple", answer: [0, 2] }), REV);
  assert.deepStrictEqual(r.answer, [1, 3]); // 旧0→3, 旧2→1 → sort
});

test("applyShuffle: 「選択肢B」形式の参照が新レターに再マップされる", () => {
  const r = applyShuffle(q({ explanation: "選択肢Bが正解。選択肢Aは誤り、選択肢Dも誤りです。" }), REV);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.explanation, "選択肢Cが正解。選択肢Dは誤り、選択肢Aも誤りです。");
});

test("applyShuffle: 裸レター参照（。Aは／、BとCが）も再マップされる", () => {
  const r = applyShuffle(q({ explanation: "ロールが最適。Aは鍵管理の負担、CとDは論外です。" }), REV);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.explanation, "ロールが最適。Dは鍵管理の負担、BとAは論外です。");
});

test("analyzeRefs: C# や AZ-104 のような語中レターは参照扱いしない", () => {
  const a = analyzeRefs("C#で開発し、AZ-104を受験する。");
  assert.strictEqual(a.ok, true);
  assert.strictEqual(a.refs.length, 0);
});

test("applyShuffle: 再マップできない裸レター（Aレコード等）が残る問題はスキップ", () => {
  const r = applyShuffle(q({ explanation: "Route 53 の Aレコードを作成します。" }), REV);
  assert.strictEqual(r.ok, false);
  assert.match(r.reason, /裸レター/);
});

test("applyShuffle: 丸数字参照も再マップされる（①=旧index0 → 新位置の丸数字）", () => {
  const r = applyShuffle(q({ explanation: "①は誤り、③も誤りです。" }), REV);
  assert.strictEqual(r.ok, true);
  // 旧0→新3(④)、旧2→新1(②)
  assert.strictEqual(r.explanation, "④は誤り、②も誤りです。");
});

test("applyShuffle: 丸数字が選択肢数を超えるならスキップ", () => {
  const r = applyShuffle(q({ explanation: "⑤は誤りです。" }), REV);
  assert.strictEqual(r.ok, false);
});

test("applyShuffle: 「N番目の選択肢」参照はスキップ", () => {
  const r = applyShuffle(q({ explanation: "2番目の選択肢が正解です。" }), REV);
  assert.strictEqual(r.ok, false);
});

test("applyShuffle: 選択肢テキストの相互参照（上記すべて）はスキップ", () => {
  const r = applyShuffle(q({ choices: ["あ", "い", "う", "上記すべて"] }), REV);
  assert.strictEqual(r.ok, false);
});

test("applyShuffle: 空白入り・括弧前・へ格の参照も再マップ（。A は／はA（…）／Dへ）", () => {
  const r = applyShuffle(q({ explanation: "安全です。A は露出リスクがあり、主要機能はC（検出）で、Dへの変換は大改修です。" }), REV);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.explanation, "安全です。D は露出リスクがあり、主要機能はB（検出）で、Aへの変換は大改修です。");
});

test("analyzeRefs: B-ツリーは語中扱いで参照にも裸レターにもならない", () => {
  const a = analyzeRefs("インデックス構造（B-ツリーなど）を使う。");
  assert.strictEqual(a.ok, true);
  assert.strictEqual(a.refs.length, 0);
});

test("applyShuffle: Eコマース等のカタカナ前レターは依然スキップ（誤マップ防止）", () => {
  const r = applyShuffle(q({ question: "あるEコマース企業がSQSを使う。正しいものはどれか。" }), REV);
  assert.strictEqual(r.ok, false);
});

test("seededPerm: 同一シードで決定的", () => {
  const p1 = seededPerm(4, mulberry32(xfnv1a("exam:q001")));
  const p2 = seededPerm(4, mulberry32(xfnv1a("exam:q001")));
  assert.deepStrictEqual(p1, p2);
  assert.deepStrictEqual([...p1].sort(), [0, 1, 2, 3]);
});
