// tools/lib/load-data.js — ブラウザ用データファイルを Node で読むローダ
const path = require("path");
const fs = require("fs");
const ROOT = path.resolve(__dirname, "..", "..");

function freshRequire(rel) {
  const abs = path.join(ROOT, rel);
  delete require.cache[abs];
  const prev = global.window;
  global.window = {};
  try {
    require(abs);
    return global.window;
  } finally {
    global.window = prev;
  }
}

function loadCatalog() {
  return freshRequire("js/data/manifest.js").CERT_CATALOG;
}

function liveExams() {
  const out = [];
  for (const p of loadCatalog().providers) {
    for (const ex of p.exams) {
      if (ex.status === "available") out.push({ ...ex, provider: p.id, providerName: p.name });
    }
  }
  return out;
}

function loadExam(examId) {
  const exam = freshRequire(`js/data/exams/${examId}.js`).CERT_EXAMS?.[examId];
  if (!exam) throw new Error(`loadExam: no data for "${examId}"`);
  return exam;
}

function loadGuide(examId) {
  const rel = `js/data/guides/${examId}.js`;
  if (!fs.existsSync(path.join(ROOT, rel))) return null;
  return freshRequire(rel).CERT_GUIDES[examId] || null;
}

function loadServices() {
  const dir = path.join(ROOT, "js", "data", "services");
  if (!fs.existsSync(dir)) return {};
  const out = {};
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".js"))) {
    Object.assign(out, freshRequire(`js/data/services/${f}`).CERT_SERVICES || {});
  }
  return out;
}

module.exports = { ROOT, loadCatalog, liveExams, loadExam, loadGuide, loadServices };
