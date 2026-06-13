const test = require("node:test");
const assert = require("node:assert");

// builder-core.js と arch/aws.js を window シム経由で読み込む
function load() {
  const prev = global.window;
  global.window = {};
  delete require.cache[require.resolve("../../js/builder-core.js")];
  delete require.cache[require.resolve("../../js/data/arch/aws.js")];
  require("../../js/data/arch/aws.js");
  require("../../js/builder-core.js");
  const arch = global.window.CERT_ARCH.aws;
  const core = global.window.CERT_BUILDER_CORE;
  global.window = prev;
  return { arch, core };
}

const { arch, core } = load();
const W = core.NODE_W, H = core.NODE_H;

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

test("linkInfo: 完全一致（線種つき）", () => {
  const info = core.linkInfo(arch, "cloudfront", "s3");
  assert.strictEqual(info.known, true);
  assert.strictEqual(info.t, "net");
  assert.match(info.l, /オリジン/);
});

test("linkInfo: IAM系の接続は t=iam", () => {
  assert.strictEqual(core.linkInfo(arch, "lambda", "dynamodb").t, "iam");
  assert.strictEqual(core.linkInfo(arch, "ec2", "s3").t, "iam");
});

test("linkInfo: 関連付け系は t=attach", () => {
  assert.strictEqual(core.linkInfo(arch, "waf", "cloudfront").t, "attach");
  assert.strictEqual(core.linkInfo(arch, "route53", "alb").t, "attach");
});

test("linkInfo: 逆向きでも照合され、注記が付く", () => {
  const info = core.linkInfo(arch, "s3", "cloudfront");
  assert.strictEqual(info.known, true);
  assert.match(info.d, /逆向き/);
});

test("linkInfo: フォールバック（security → iam / 未収録 → generic）", () => {
  const sec = core.linkInfo(arch, "ec2", "iam");
  assert.strictEqual(sec.known, false);
  assert.strictEqual(sec.t, "iam");
  const gen = core.linkInfo(arch, "ec2", "bedrock");
  assert.strictEqual(gen.known, false);
  assert.strictEqual(gen.t, null);
});

test("links の全エントリが有効な t とコンポーネントIDを持つ", () => {
  const ids = new Set(arch.components.map(c => c.id));
  for (const [key, v] of Object.entries(arch.links)) {
    const [a, b] = key.split(">");
    assert.ok(ids.has(a), `unknown component in key: ${key}`);
    assert.ok(ids.has(b), `unknown component in key: ${key}`);
    assert.ok(["net", "iam", "attach"].includes(v.t), `bad t in ${key}: ${v.t}`);
    assert.ok(v.d && v.d.length > 10, `desc too short: ${key}`);
  }
});

test("membership: 外側→内側の順で枠を返す", () => {
  const state = {
    groups: [
      { uid: "g1", k: "vpc", x: 0, y: 0, w: 800, h: 600 },
      { uid: "g2", k: "private", x: 100, y: 100, w: 300, h: 300 }
    ],
    nodes: [], edges: []
  };
  const chain = core.membership(state, { x: 150, y: 150 });
  assert.deepStrictEqual(chain.map(g => g.k), ["vpc", "private"]);
});

test("validate: リージョンサービスを VPC 内に置くと指摘（S3・ユーザー）", () => {
  const state = {
    groups: [{ uid: "g1", k: "vpc", x: 0, y: 0, w: 800, h: 600 }],
    nodes: [
      { uid: "n1", c: "s3", x: 100, y: 100 },
      { uid: "n2", c: "user", x: 300, y: 100 }
    ],
    edges: []
  };
  const warns = core.validate(arch, state);
  assert.strictEqual(warns.length, 2);
  assert.match(warns.find(w => w.target.uid === "n1").msg, /VPC の中には存在しない/);
  assert.match(warns.find(w => w.target.uid === "n2").msg, /AWS の外側/);
});

test("validate: VPC があるのに EC2 が外 → 指摘 / VPC が無ければ指摘なし", () => {
  const withVpc = {
    groups: [{ uid: "g1", k: "vpc", x: 0, y: 0, w: 400, h: 300 }],
    nodes: [{ uid: "n1", c: "ec2", x: 600, y: 100 }],
    edges: []
  };
  assert.match(core.validate(arch, withVpc)[0].msg, /VPC 内のサブネットに配置/);
  const noVpc = { groups: [], nodes: [{ uid: "n1", c: "ec2", x: 600, y: 100 }], edges: [] };
  assert.deepStrictEqual(core.validate(arch, noVpc), []);
});

test("validate: RDS をパブリックサブネットに置くとアンチパターン指摘", () => {
  const state = {
    groups: [
      { uid: "g1", k: "vpc", x: 0, y: 0, w: 800, h: 600 },
      { uid: "g2", k: "public", x: 50, y: 50, w: 400, h: 400 }
    ],
    nodes: [{ uid: "n1", c: "rds", x: 100, y: 100 }],
    edges: []
  };
  const warns = core.validate(arch, state);
  assert.strictEqual(warns.length, 1);
  assert.match(warns[0].msg, /アンチパターン/);
});

test("validate: NAT をプライベートに置くと指摘", () => {
  const state = {
    groups: [
      { uid: "g1", k: "vpc", x: 0, y: 0, w: 800, h: 600 },
      { uid: "g2", k: "private", x: 50, y: 50, w: 400, h: 400 }
    ],
    nodes: [{ uid: "n1", c: "natgw", x: 100, y: 100 }],
    edges: []
  };
  assert.match(core.validate(arch, state)[0].msg, /パブリックサブネット側に置く/);
});

test("validate: サブネット枠が VPC の外 → 指摘", () => {
  const state = {
    groups: [
      { uid: "g1", k: "vpc", x: 0, y: 0, w: 300, h: 300 },
      { uid: "g2", k: "private", x: 500, y: 50, w: 300, h: 200 }
    ],
    nodes: [], edges: []
  };
  const warns = core.validate(arch, state);
  assert.strictEqual(warns[0].target.type, "group");
  assert.match(warns[0].msg, /VPC の内側/);
});

test("validate: ユーザー → プライベートサブネット内のEC2 直結は NG（error・向きも両方）", () => {
  const base = {
    groups: [
      { uid: "g1", k: "vpc", x: 200, y: 0, w: 800, h: 600 },
      { uid: "g2", k: "private", x: 250, y: 50, w: 400, h: 400 }
    ],
    nodes: [
      { uid: "n1", c: "user", x: 0, y: 100 },
      { uid: "n2", c: "ec2", x: 300, y: 100 }
    ]
  };
  const w1 = core.validate(arch, { ...base, edges: [{ uid: "e1", from: "n1", to: "n2" }] });
  const edgeWarn = w1.find(w => w.target.type === "edge");
  assert.ok(edgeWarn);
  assert.strictEqual(edgeWarn.level, "error");
  assert.match(edgeWarn.msg, /この接続はできない/);
  const w2 = core.validate(arch, { ...base, edges: [{ uid: "e1", from: "n2", to: "n1" }] });
  assert.strictEqual(w2.find(w => w.target.type === "edge").level, "error");
});

test("validate: 配置系の指摘は level=warn", () => {
  const state = {
    groups: [
      { uid: "g1", k: "vpc", x: 0, y: 0, w: 800, h: 600 },
      { uid: "g2", k: "public", x: 50, y: 50, w: 400, h: 400 }
    ],
    nodes: [{ uid: "n1", c: "rds", x: 100, y: 100 }],
    edges: []
  };
  assert.strictEqual(core.validate(arch, state)[0].level, "warn");
});

test("validate: AWSクラウド枠 — ユーザーは外・AWSサービスは中", () => {
  const state = {
    groups: [{ uid: "g1", k: "aws", x: 200, y: 0, w: 800, h: 600 }],
    nodes: [
      { uid: "n1", c: "user", x: 300, y: 100 },  // 枠の中（NG: 外側の存在）
      { uid: "n2", c: "s3", x: 1100, y: 100 }    // 枠の外（AWSのサービスなのに）
    ],
    edges: []
  };
  const warns = core.validate(arch, state);
  assert.match(warns.find(w => w.target.uid === "n1").msg, /AWS クラウド枠の外/);
  assert.match(warns.find(w => w.target.uid === "n2").msg, /AWS クラウド枠の中/);
});

test("validate: VPC枠は AWSクラウド枠の内側に", () => {
  const state = {
    groups: [
      { uid: "g1", k: "aws", x: 0, y: 0, w: 400, h: 300 },
      { uid: "g2", k: "vpc", x: 600, y: 0, w: 300, h: 200 }
    ],
    nodes: [], edges: []
  };
  const warns = core.validate(arch, state);
  assert.match(warns.find(w => w.target.uid === "g2").msg, /AWS クラウド枠の内側/);
});

test("validate: NGな接続 — ユーザー→NAT / ユーザー→EFS / Lambda→EBS", () => {
  function edgeWarnOf(compA, compB) {
    const state = {
      groups: [],
      nodes: [
        { uid: "n1", c: compA, x: 0, y: 0 },
        { uid: "n2", c: compB, x: 400, y: 0 }
      ],
      edges: [{ uid: "e1", from: "n1", to: "n2" }]
    };
    return core.validate(arch, state).find(w => w.target.type === "edge");
  }
  assert.strictEqual(edgeWarnOf("user", "natgw").level, "error");
  assert.match(edgeWarnOf("user", "natgw").msg, /送信専用/);
  assert.strictEqual(edgeWarnOf("user", "efs").level, "error");
  assert.strictEqual(edgeWarnOf("lambda", "ebs").level, "error");
  assert.match(edgeWarnOf("lambda", "ebs").msg, /EC2 にアタッチ/);
  assert.strictEqual(edgeWarnOf("ec2", "ebs"), undefined);  // EC2→EBS は正当
});

test("shareEncode/shareDecode: ラベル・枠・接続込みで round-trip できる", () => {
  const src = {
    nodes: [
      { uid: "n9", c: "ec2", x: 100, y: 200, label: "Webサーバー" },
      { uid: "n3", c: "rds", x: 400, y: 200 }
    ],
    groups: [{ uid: "g7", k: "vpc", x: 50, y: 50, w: 600, h: 400 }],
    edges: [{ uid: "e1", from: "n9", to: "n3" }],
    seq: 10
  };
  const enc = core.shareEncode(src);
  assert.match(enc, /^[A-Za-z0-9_-]+$/);          // base64url（URLセーフ）
  const dec = core.shareDecode(enc);
  assert.strictEqual(dec.nodes.length, 2);
  assert.strictEqual(dec.nodes[0].c, "ec2");
  assert.strictEqual(dec.nodes[0].label, "Webサーバー");
  assert.strictEqual(dec.nodes[1].label, undefined);
  assert.deepStrictEqual([dec.groups[0].k, dec.groups[0].w], ["vpc", 600]);
  assert.strictEqual(dec.edges.length, 1);
  assert.strictEqual(dec.edges[0].from, dec.nodes[0].uid);
  assert.strictEqual(dec.edges[0].to, dec.nodes[1].uid);
});

test("shareDecode: 壊れた入力は null（例外を出さない）", () => {
  assert.strictEqual(core.shareDecode("!!!not-base64!!!"), null);
  assert.strictEqual(core.shareDecode(Buffer.from('{"v":9}').toString("base64")), null);
});

test("validate: 同梱テンプレートは指摘ゼロ（手本が警告を出さないこと）", () => {
  for (const tpl of arch.templates) {
    const warns = core.validate(arch, tplToState(tpl));
    assert.deepStrictEqual(warns, [], `template ${tpl.id} has warnings: ${JSON.stringify(warns)}`);
  }
});

// =============================================================
// tidyLayout — 接続の流れに沿った自動整列（枠の所属を壊さない）
// =============================================================
const overlaps = (a, b) => a.x < b.x + W && b.x < a.x + W && a.y < b.y + H && b.y < a.y + H;
const centerIn = (n, g) => {
  const cx = n.x + W / 2, cy = n.y + H / 2;
  return cx >= g.x && cx <= g.x + g.w && cy >= g.y && cy <= g.y + g.h;
};

test("tidyLayout: 直列フローは左→右に x が単調増加する", () => {
  const state = {
    nodes: [
      { uid: "n1", c: "user", x: 500, y: 500 },
      { uid: "n2", c: "alb", x: 100, y: 100 },
      { uid: "n3", c: "ec2", x: 300, y: 900 }
    ],
    groups: [],
    edges: [
      { uid: "e1", from: "n1", to: "n2" },
      { uid: "e2", from: "n2", to: "n3" }
    ],
    seq: 10
  };
  core.tidyLayout(arch, state);
  const x = u => state.nodes.find(n => n.uid === u).x;
  assert.ok(x("n1") < x("n2"), "user は alb の左に並ぶ");
  assert.ok(x("n2") < x("n3"), "alb は ec2 の左に並ぶ");
});

test("tidyLayout: 枠の中のノードは整列後も枠の中に収まる", () => {
  const state = {
    nodes: [
      { uid: "n1", c: "ec2", x: 60, y: 60 },
      { uid: "n2", c: "rds", x: 260, y: 60 }
    ],
    groups: [{ uid: "g1", k: "vpc", x: 0, y: 0, w: 600, h: 400 }],
    edges: [{ uid: "e1", from: "n1", to: "n2" }],
    seq: 10
  };
  core.tidyLayout(arch, state);
  const g = state.groups[0];
  state.nodes.forEach(n => assert.ok(centerIn(n, g), `${n.c} の中心が vpc 枠の外`));
});

test("tidyLayout: 同一コンテナ内のノードは重ならない", () => {
  const state = {
    nodes: [
      { uid: "n1", c: "user", x: 0, y: 0 },
      { uid: "n2", c: "alb", x: 0, y: 0 },
      { uid: "n3", c: "ec2", x: 0, y: 0 },
      { uid: "n4", c: "rds", x: 0, y: 0 }
    ],
    groups: [],
    edges: [
      { uid: "e1", from: "n1", to: "n2" },
      { uid: "e2", from: "n2", to: "n3" },
      { uid: "e3", from: "n2", to: "n4" }
    ],
    seq: 10
  };
  core.tidyLayout(arch, state);
  for (let i = 0; i < state.nodes.length; i++)
    for (let j = i + 1; j < state.nodes.length; j++)
      assert.ok(!overlaps(state.nodes[i], state.nodes[j]),
        `${state.nodes[i].c} と ${state.nodes[j].c} が重なっている`);
});

test("tidyLayout: ノード/枠/接続の集合は不変（座標だけ変える）", () => {
  const state = tplToState(arch.templates[0]);
  const ids = s => ({
    n: s.nodes.map(n => n.uid).sort(),
    g: s.groups.map(g => g.uid).sort(),
    e: s.edges.map(e => e.uid).sort()
  });
  const before = ids(state);
  core.tidyLayout(arch, state);
  assert.deepStrictEqual(ids(state), before);
});

test("tidyLayout: 全テンプレートは整列後も validate 指摘ゼロ（枠の所属を壊さない）", () => {
  for (const tpl of arch.templates) {
    const state = tplToState(tpl);
    core.tidyLayout(arch, state);
    const warns = core.validate(arch, state);
    assert.deepStrictEqual(warns, [], `template ${tpl.id} after tidy: ${JSON.stringify(warns)}`);
  }
});

test("tidyLayout: 枠の中心が子サブネットに重なっても入れ子(cloud>vpc>subnet)が保たれる", () => {
  // vpc の中心(450,350)がちょうど子サブネット private の矩形内に来る配置。
  // 親枠検出が「より小さいサブネット」を親と誤れば vpc が cloud の外へ外れてしまう。
  const state = {
    groups: [
      { uid: "gc", k: "aws",     x: 0,   y: 0,   w: 1000, h: 700 },
      { uid: "gv", k: "vpc",     x: 100, y: 100, w: 700,  h: 500 },
      { uid: "gs", k: "private", x: 380, y: 200, w: 300,  h: 300 }
    ],
    nodes: [{ uid: "n1", c: "ec2", x: 420, y: 300 }],
    edges: [],
    seq: 10
  };
  core.tidyLayout(arch, state);
  const byk = k => state.groups.find(g => g.k === k);
  const inside = (inner, outer) => {
    const cx = inner.x + inner.w / 2, cy = inner.y + inner.h / 2;
    return cx >= outer.x && cx <= outer.x + outer.w && cy >= outer.y && cy <= outer.y + outer.h;
  };
  assert.ok(inside(byk("vpc"), byk("aws")), "vpc は cloud 枠の中に収まる");
  assert.ok(inside(byk("private"), byk("vpc")), "subnet は vpc 枠の中に収まる");
  assert.deepStrictEqual(core.validate(arch, state).filter(w => w.target.type === "group"), [],
    "入れ子崩れの指摘が出ない");
});

test("tidyLayout: 空の構成図でも例外を出さない", () => {
  const state = { nodes: [], groups: [], edges: [], seq: 1 };
  assert.doesNotThrow(() => core.tidyLayout(arch, state));
});
