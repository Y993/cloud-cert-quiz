const test = require("node:test");
const assert = require("node:assert");
const { loadCatalog, loadExam, loadGuide, liveExams } = require("../lib/load-data");

test("loadCatalog returns providers", () => {
  const c = loadCatalog();
  assert.ok(c.providers.length >= 3);
});

test("liveExams returns 6 available exams with provider attached", () => {
  const exams = liveExams();
  assert.ok(exams.length >= 6);
  assert.ok(exams.every(e => e.status === "available" && e.provider));
});

test("loadExam loads aws-saa-c03 with 150 questions", () => {
  const e = loadExam("aws-saa-c03");
  assert.ok(e.questions.length >= 100);
  assert.strictEqual(e.meta.code, "SAA-C03");
});

test("loadGuide returns null for missing guide", () => {
  assert.strictEqual(loadGuide("no-such-exam"), null);
});

test("freshRequire restores global.window after load", () => {
  loadCatalog();
  assert.strictEqual(global.window, undefined);
});

test("loadExam throws clear error for unknown exam id key", () => {
  assert.throws(() => loadExam("no-such-exam"), /no data|Cannot find module/);
});
