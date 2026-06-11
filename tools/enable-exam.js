// manifest.js の指定試験を available に切り替える小ツール
// usage: node tools/enable-exam.js <exam-id> <questionCount>
const fs = require("fs");
const path = require("path");
const [id, count] = process.argv.slice(2);
if (!id || !count) { console.error("usage: node tools/enable-exam.js <exam-id> <questionCount>"); process.exit(1); }

const p = path.join(__dirname, "..", "js", "data", "manifest.js");
let s = fs.readFileSync(p, "utf8");
const re = new RegExp(
  '(\\{\\s*id: "' + id + '",[\\s\\S]*?status: )"coming-soon"([\\s\\S]*?questionCount: )0([\\s\\S]*?dataFile: )""'
);
if (!re.test(s)) { console.error("entry not found or already available: " + id); process.exit(1); }
s = s.replace(re, '$1"available"$2' + count + '$3"js/data/exams/' + id + '.js"');
fs.writeFileSync(p, s);

global.window = {};
require(p);
const e = global.window.CERT_CATALOG.providers.flatMap(pr => pr.exams).find(x => x.id === id);
console.log(id, e.status, e.questionCount, e.dataFile);
