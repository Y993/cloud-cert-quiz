const test = require("node:test");
const assert = require("node:assert");

function load() {
  delete require.cache[require.resolve("../../js/services-match.js")];
  const prev = global.window;
  global.window = {};
  require("../../js/services-match.js");
  const fn = global.window.CERT_SERVICES_MATCH;
  global.window = prev;
  return fn;
}
const SVCS = {
  "aws-lambda": { slug: "aws-lambda", name: "AWS Lambda", aliases: ["AWS Lambda", "Lambda"] },
  "amazon-s3": { slug: "amazon-s3", name: "Amazon S3", aliases: ["Amazon S3", "S3"] },
  "s3-glacier": { slug: "s3-glacier", name: "Amazon S3 Glacier", aliases: ["S3 Glacier", "Glacier"] },
  "iam": { slug: "iam", name: "AWS IAM", aliases: ["IAM"] }
};

test("match: 登場順・最大件数・ユニーク", () => {
  const m = load()("IAM ロールを作成して Lambda にアタッチし、Lambda から S3 にアクセスする", SVCS, 2);
  assert.deepStrictEqual(m.map(s => s.slug), ["iam", "aws-lambda"]);
});

test("match: 最長エイリアス優先（S3 Glacier は amazon-s3 に二重マッチしない）", () => {
  const m = load()("S3 Glacier にアーカイブする", SVCS, 5);
  assert.deepStrictEqual(m.map(s => s.slug), ["s3-glacier"]);
});

test("match: ヒットなし・空入力は空配列", () => {
  assert.deepStrictEqual(load()("該当なしのテキスト", SVCS, 2), []);
  assert.deepStrictEqual(load()("", SVCS, 2), []);
  assert.deepStrictEqual(load()("Lambda を使う", null, 2), []);
});
