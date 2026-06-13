// arch-ledgers.test.js — 構成図ビルダー台帳（aws / gcp / azure）の整合性検証
// 台帳はデータ量が多く手書きなので、参照切れ・タイポをここで機械的に塞ぐ。
const test = require("node:test");
const assert = require("node:assert");

const PROVIDERS = ["aws", "gcp", "azure"];

// window シム経由で services / arch / core を読み込む
function load(provider) {
  const prev = global.window;
  global.window = {};
  for (const mod of [
    `../../js/data/services/${provider}.js`,
    `../../js/data/arch/${provider}.js`,
    "../../js/builder-core.js"
  ]) {
    delete require.cache[require.resolve(mod)];
    require(mod);
  }
  const arch = global.window.CERT_ARCH[provider];
  const services = global.window.CERT_SERVICES;
  const core = global.window.CERT_BUILDER_CORE;
  global.window = prev;
  return { arch, services, core };
}

// テンプレート定義を builder.js と同じ要領で state に変換する
function tplToState(tpl) {
  let seq = 1;
  const state = { nodes: [], groups: [], edges: [] };
  tpl.groups.forEach(g => state.groups.push({ uid: "g" + seq++, k: g.k, x: g.x, y: g.y, w: g.w, h: g.h }));
  const uids = tpl.nodes.map(n => {
    const u = "n" + seq++;
    state.nodes.push({ uid: u, c: n.c, x: n.x, y: n.y });
    return u;
  });
  tpl.edges.forEach(p => state.edges.push({ uid: "e" + seq++, from: uids[p[0]], to: uids[p[1]] }));
  return state;
}

for (const provider of PROVIDERS) {
  const { arch, services, core } = load(provider);
  const compIds = new Set(arch.components.map(c => c.id));
  const catIds = new Set(arch.categories.map(c => c.id));
  const kindIds = new Set(arch.groupKinds.map(g => g.id));

  test(`[${provider}] components: id 重複なし・cat 有効・learn スラッグが services 台帳に実在`, () => {
    assert.strictEqual(compIds.size, arch.components.length, "duplicate component id");
    for (const c of arch.components) {
      assert.ok(catIds.has(c.cat), `unknown cat for ${c.id}: ${c.cat}`);
      if (c.learn) assert.ok(services[c.learn], `learn slug not in services: ${c.id} -> ${c.learn}`);
      assert.ok(c.name && c.abbr && c.desc, `missing name/abbr/desc: ${c.id}`);
    }
  });

  test(`[${provider}] links: 全キーが有効なコンポーネント・有効な線種・解説つき`, () => {
    for (const [key, v] of Object.entries(arch.links)) {
      const [a, b] = key.split(">");
      assert.ok(compIds.has(a), `unknown component in key: ${key}`);
      assert.ok(compIds.has(b), `unknown component in key: ${key}`);
      assert.ok(["net", "iam", "attach"].includes(v.t), `bad t in ${key}: ${v.t}`);
      assert.ok(v.d && v.d.length > 30, `desc too short: ${key}`);
    }
  });

  test(`[${provider}] 配置スコープ: vpcScoped / anyScope の ID が実在し重複しない`, () => {
    for (const id of [...arch.vpcScoped, ...arch.anyScope]) {
      assert.ok(compIds.has(id), `unknown component in scope lists: ${id}`);
    }
    const overlap = arch.vpcScoped.filter(id => arch.anyScope.includes(id));
    assert.deepStrictEqual(overlap, [], "component in both scope lists");
  });

  test(`[${provider}] topology / nodeRules / groupNesting / edgeRules の参照整合`, () => {
    const t = arch.topology;
    assert.ok(kindIds.has(t.cloud), `topology.cloud not in groupKinds: ${t.cloud}`);
    assert.ok(kindIds.has(t.network), `topology.network not in groupKinds: ${t.network}`);
    if (t.public) assert.ok(kindIds.has(t.public));
    if (t.private) {
      assert.ok(kindIds.has(t.private));
      assert.ok(t.privateIngressMsg, "private kind needs privateIngressMsg");
    }
    for (const k of t.subnets || []) assert.ok(kindIds.has(k), `topology.subnets unknown kind: ${k}`);
    assert.ok(t.cloudName && t.cloudFrame && t.networkFrame, "topology message fragments missing");

    for (const r of arch.nodeRules || []) {
      assert.ok(compIds.has(r.c), `nodeRule unknown component: ${r.c}`);
      for (const k of r.inKinds) assert.ok(kindIds.has(k), `nodeRule unknown kind: ${k}`);
      assert.ok(r.msg && r.msg.length > 10);
    }
    for (const r of arch.groupNesting || []) {
      for (const k of r.child) assert.ok(kindIds.has(k), `groupNesting unknown child: ${k}`);
      assert.ok(kindIds.has(r.parent), `groupNesting unknown parent: ${r.parent}`);
    }
    for (const r of arch.edgeRules || []) {
      assert.ok(compIds.has(r.c), `edgeRule unknown component: ${r.c}`);
      assert.ok(["peerOnly", "noExternal"].includes(r.type), `edgeRule bad type: ${r.type}`);
      for (const id of r.allow || []) assert.ok(compIds.has(id), `edgeRule unknown allow: ${id}`);
      assert.ok(r.msg && r.msg.length > 10);
    }
    for (const id of arch.externalIngressIds || []) {
      assert.ok(compIds.has(id), `externalIngressIds unknown: ${id}`);
    }
  });

  test(`[${provider}] templates: 参照が有効・全テンプレートが指摘ゼロ（手本が警告を出さない）`, () => {
    assert.ok(arch.templates.length >= 6, `want >=6 templates, got ${arch.templates.length}`);
    for (const tpl of arch.templates) {
      for (const g of tpl.groups) assert.ok(kindIds.has(g.k), `template ${tpl.id}: unknown group kind ${g.k}`);
      for (const n of tpl.nodes) assert.ok(compIds.has(n.c), `template ${tpl.id}: unknown component ${n.c}`);
      for (const [a, b] of tpl.edges) {
        assert.ok(a >= 0 && a < tpl.nodes.length && b >= 0 && b < tpl.nodes.length,
          `template ${tpl.id}: edge index out of range [${a},${b}]`);
      }
      const warns = core.validate(arch, tplToState(tpl));
      assert.deepStrictEqual(warns, [], `template ${tpl.id} has warnings: ${JSON.stringify(warns)}`);
    }
  });

  test(`[${provider}] テンプレートの接続は原則ナレッジ収録済み（known）`, () => {
    // 手本の線が「未収録の組み合わせ」だと解説が出ず、見栄えの良さが台無しになる
    for (const tpl of arch.templates) {
      for (const [ai, bi] of tpl.edges) {
        const a = tpl.nodes[ai].c, b = tpl.nodes[bi].c;
        const info = core.linkInfo(arch, a, b);
        assert.ok(info.known, `template ${tpl.id}: link not in knowledge base: ${a}>${b}`);
      }
    }
  });

  test(`[${provider}] shareEncode/shareDecode: provider 込みで round-trip`, () => {
    const comp = arch.components.find(c => c.cat !== "external").id;
    const src = {
      nodes: [{ uid: "n1", c: comp, x: 10, y: 20 }],
      groups: [], edges: [], seq: 2
    };
    const enc = core.shareEncode(src, provider);
    const dec = core.shareDecode(enc);
    assert.strictEqual(dec.provider, provider);
    assert.strictEqual(dec.nodes[0].c, comp);
  });
}
