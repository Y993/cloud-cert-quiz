const test = require("node:test");
const assert = require("node:assert");
const { esc, truncate, pageShell } = require("../lib/render");

test("esc escapes html", () => {
  assert.strictEqual(esc('<a b="c">&'), "&lt;a b=&quot;c&quot;&gt;&amp;");
});

test("truncate collapses whitespace and adds ellipsis", () => {
  assert.strictEqual(truncate("abc", 10), "abc");
  assert.strictEqual(truncate("あ".repeat(50), 45), "あ".repeat(45) + "…");
  assert.strictEqual(truncate("a  b\n c", 10), "a b c");
});

test("pageShell renders canonical, title, ga4 absent when unset", () => {
  const html = pageShell({
    config: { origin: "https://example.com/base", siteName: "CLOUDCERT_", ga4MeasurementId: "", searchConsoleVerification: "" },
    title: "T", description: "D", canonicalPath: "/q/x/q001.html",
    relRoot: "../../", body: "<p>B</p>", liveExamLinks: []
  });
  assert.ok(html.includes('<link rel="canonical" href="https://example.com/base/q/x/q001.html">'));
  assert.ok(html.includes("<title>T</title>"));
  assert.ok(!html.includes("googletagmanager"));
  assert.ok(html.includes('href="../../css/style.css"'));
});

test("pageShell injects ga4 and verification when set", () => {
  const html = pageShell({
    config: { origin: "https://example.com", siteName: "S", ga4MeasurementId: "G-TEST1", searchConsoleVerification: "tok" },
    title: "T", description: "D", canonicalPath: "/", relRoot: "", body: "", liveExamLinks: []
  });
  assert.ok(html.includes("G-TEST1"));
  assert.ok(html.includes('name="google-site-verification" content="tok"'));
});
