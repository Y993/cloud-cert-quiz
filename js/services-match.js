// js/services-match.js — 正解選択肢テキストからサービスを抽出（ブラウザ/Node両用・純関数）
(function () {
  "use strict";
  function match(text, services, max) {
    if (!text || !services) return [];
    var pairs = [];
    Object.keys(services).forEach(function (slug) {
      (services[slug].aliases || []).forEach(function (a) {
        pairs.push({ alias: a, slug: slug });
      });
    });
    pairs.sort(function (a, b) { return b.alias.length - a.alias.length; });  // 最長一致優先
    var masked = String(text);
    var found = {};   // slug -> 初出index
    pairs.forEach(function (p) {
      var idx = masked.indexOf(p.alias);
      while (idx !== -1) {
        if (!(p.slug in found) || idx < found[p.slug]) found[p.slug] = idx;
        masked = masked.slice(0, idx) + new Array(p.alias.length + 1).join(" ") + masked.slice(idx + p.alias.length);
        idx = masked.indexOf(p.alias, idx + p.alias.length);
      }
    });
    return Object.keys(found)
      .sort(function (a, b) { return found[a] - found[b]; })
      .slice(0, max || 2)
      .map(function (slug) { return services[slug]; });
  }
  (typeof window !== "undefined" ? window : globalThis).CERT_SERVICES_MATCH = match;
})();
