// tools/lib/load-data.js — ブラウザ用データファイルを Node で読むローダ
const path = require("path");
const fs = require("fs");
const ROOT = path.resolve(__dirname, "..", "..");

function freshRequire(rel) {
  const abs = path.join(ROOT, rel);
  delete require.cache[abs];
  global.window = {};
  require(abs);
  return global.window;
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
  return freshRequire(`js/data/exams/${examId}.js`).CERT_EXAMS[examId];
}

function loadGuide(examId) {
  const rel = `js/data/guides/${examId}.js`;
  if (!fs.existsSync(path.join(ROOT, rel))) return null;
  return freshRequire(rel).CERT_GUIDES[examId] || null;
}

module.exports = { ROOT, loadCatalog, liveExams, loadExam, loadGuide };
