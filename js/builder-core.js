// js/builder-core.js — 構成図ビルダーのロジック層（ブラウザ/Node両用・DOM非依存）
// 接続情報の解決（linkInfo）、グループ枠への所属判定（membership）、設計チェック（validate）
(function () {
  "use strict";

  var NODE_W = 132, NODE_H = 78;

  function compMap(arch) {
    var m = {};
    arch.components.forEach(function (c) { m[c.id] = c; });
    return m;
  }

  // 接続の意味・線種を引く。"from>to" → 逆向き → カテゴリフォールバック の順
  function linkInfo(arch, fromC, toC) {
    var hit = arch.links[fromC + ">" + toC];
    if (hit) return { l: hit.l, d: hit.d, t: hit.t || null, known: true };
    hit = arch.links[toC + ">" + fromC];
    if (hit) return { l: hit.l, d: hit.d + "（登録パターンとは逆向きに引かれています）", t: hit.t || null, known: true };
    var comps = compMap(arch);
    var ca = comps[fromC] && comps[fromC].cat, cb = comps[toC] && comps[toC].cat;
    for (var i = 0; i < arch.fallbackHints.length; i++) {
      var f = arch.fallbackHints[i];
      if (ca === f.cat || cb === f.cat) return { l: f.l, d: f.d, t: f.t || null, known: false };
    }
    var g = arch.fallbackGeneric;
    return { l: g.l, d: g.d, t: g.t || null, known: false };
  }

  // 配置スコープ: "vpc"（ネットワーク枠内に置くもの）/ "any"（どちらでも）/ "region"（枠外）
  function scopeOf(arch, compId) {
    if (arch.vpcScoped.indexOf(compId) !== -1) return "vpc";
    if (arch.anyScope.indexOf(compId) !== -1) return "any";
    return "region";
  }

  function rectContains(g, x, y) {
    return x >= g.x && x <= g.x + g.w && y >= g.y && y <= g.y + g.h;
  }

  // ノード中心を含むグループ枠を、外側→内側（面積の大きい順）で返す
  function membership(state, node) {
    var cx = node.x + NODE_W / 2, cy = node.y + NODE_H / 2;
    return state.groups
      .filter(function (g) { return rectContains(g, cx, cy); })
      .sort(function (a, b) { return b.w * b.h - a.w * a.h; });
  }

  // 設計チェック。[{target:{type:"node"|"group"|"edge", uid}, msg, level:"warn"|"error"}] を返す
  // level: "warn" = 設計の注意（動くが定石に反する） / "error" = NG（そもそもできない接続・配置）
  // ロジックは汎用で、何を NG とするかは台帳側のデータが決める:
  //   arch.topology     … クラウド枠/ネットワーク枠/サブネット枠の groupKind と文言
  //   arch.nodeRules    … ノード個別の配置ルール（NAT をプライベートに置くな 等）
  //   arch.groupNesting … 枠の入れ子ルール（サブネットは VPC の中 等）
  //   arch.edgeRules    … できない接続（peerOnly / noExternal）
  function validate(arch, state) {
    var comps = compMap(arch);
    var topo = arch.topology;
    var warns = [];
    var subnetKinds = topo.subnets || [];
    var hasNet = state.groups.some(function (g) { return g.k === topo.network; });
    var hasCloud = state.groups.some(function (g) { return g.k === topo.cloud; });
    var chains = {}; // nodeUid → membership

    state.nodes.forEach(function (n) {
      var c = comps[n.c];
      if (!c) return;
      var chain = membership(state, n);
      chains[n.uid] = chain;
      var kinds = chain.map(function (g) { return g.k; });
      var inCloud = kinds.indexOf(topo.cloud) !== -1;
      var inNet = kinds.indexOf(topo.network) !== -1;
      var inSubnet = kinds.some(function (k) { return subnetKinds.indexOf(k) !== -1; });
      var inPub = topo.public ? kinds.indexOf(topo.public) !== -1 : false;
      var scope = scopeOf(arch, n.c);

      function warn(msg, level) {
        warns.push({ target: { type: "node", uid: n.uid }, msg: msg, level: level || "warn" });
      }

      // クラウド枠との内外関係
      if (c.cat === "external" && inCloud) {
        warn("「" + c.name + "」は " + topo.cloudName + " の外側の存在。" + topo.cloudFrame + "の外に描くのが正確。");
      }
      if (c.cat !== "external" && hasCloud && !inCloud) {
        warn("「" + c.name + "」は " + topo.cloudName + " のサービス。" + topo.cloudFrame + "の中に描こう。");
      }

      if (scope === "region" && (inNet || inSubnet)) {
        warn(c.cat === "external"
          ? "「" + c.name + "」は " + topo.cloudName + " の外側の存在。" + topo.networkFrame + " やサブネットの枠の外に描くのが正確。"
          : "「" + c.name + "」はリージョン/グローバルのサービスで、" + topo.networkFrame + " の中には存在しない。枠の外に出すのが正確" + (c.scopeHint || topo.regionHint || "") + "。");
      }
      if (scope === "vpc" && !inNet && hasNet) {
        warn("「" + c.name + "」は " + topo.networkFrame + " 内のサブネットに配置するリソース。" + topo.networkFrame + " 枠の中に移動しよう。");
      }
      if (c.cat === "database" && scope === "vpc" && inPub) {
        warn("データベース/キャッシュをパブリックサブネットに置くのはアンチパターン。プライベートサブネットに移して、アプリ層の SG からだけ接続を許可する。");
      }

      // ノード個別の配置ルール
      (arch.nodeRules || []).forEach(function (r) {
        if (r.c !== n.c) return;
        if (kinds.some(function (k) { return r.inKinds.indexOf(k) !== -1; })) warn(r.msg);
      });
    });

    // 枠どうしの入れ子チェック（親種の枠が存在するときだけ判定）
    state.groups.forEach(function (g) {
      var cx = g.x + g.w / 2, cy = g.y + g.h / 2;
      (arch.groupNesting || []).forEach(function (rule) {
        if (rule.child.indexOf(g.k) === -1) return;
        if (!state.groups.some(function (h) { return h.k === rule.parent; })) return;
        var inside = state.groups.some(function (h) {
          return h.k === rule.parent && h.uid !== g.uid && rectContains(h, cx, cy);
        });
        if (!inside) warns.push({ target: { type: "group", uid: g.uid }, msg: rule.msg, level: "warn" });
      });
    });

    // 接続の NG 判定（できない接続は error）
    var EXT = {};
    (arch.externalIngressIds || []).forEach(function (id) { EXT[id] = 1; });
    var edgeRules = arch.edgeRules || [];
    state.edges.forEach(function (e) {
      var a = state.nodes.find(function (n) { return n.uid === e.from; });
      var b = state.nodes.find(function (n) { return n.uid === e.to; });
      if (!a || !b) return;

      function err(msg) { warns.push({ target: { type: "edge", uid: e.uid }, msg: msg, level: "error" }); }

      for (var i = 0; i < edgeRules.length; i++) {
        var r = edgeRules[i];
        // peerOnly: そのコンポーネントは allow に挙げた相手としか繋げない（EBS→EC2 等）
        if (r.type === "peerOnly" && (a.c === r.c || b.c === r.c)) {
          var peer = a.c === r.c ? b : a;
          if (peer.c !== r.c && r.allow.indexOf(peer.c) === -1) { err(r.msg); return; }
        }
        // noExternal: 外部（ユーザー/インターネット）から直接届かないもの（EFS・NAT 等）
        if (r.type === "noExternal") {
          var exts = r.externals || ["user", "internet"];
          var pairs = [[a, b], [b, a]];
          for (var j = 0; j < pairs.length; j++) {
            if (exts.indexOf(pairs[j][0].c) !== -1 && pairs[j][1].c === r.c) { err(r.msg); return; }
          }
        }
      }

      // NG: インターネット側からプライベートサブネット内のリソースへ直接
      if (topo.private) {
        var pairs2 = [[a, b], [b, a]];
        for (var k = 0; k < pairs2.length; k++) {
          var ext2 = pairs2[k][0], inner2 = pairs2[k][1];
          if (!EXT[ext2.c]) continue;
          var chain2 = chains[inner2.uid] || membership(state, inner2);
          if (chain2.some(function (g) { return g.k === topo.private; })) {
            err(topo.privateIngressMsg);
            return;
          }
        }
      }
    });

    return warns;
  }

  // ---- 自動整列（フロー配置・枠の所属を保ったまま）----
  // 接続(edge)の向きに沿ってノードを左→右の層に並べる。枠(group)は所属する子要素を
  // 内包する箱として扱い、内部を再帰的に整列してから中身にフィットさせる。これにより
  // 「どのノードがどの枠に属するか」という構造を一切壊さずに見た目だけ整える。
  // state を破壊的に更新して返す。ロジックは汎用で provider 非依存。
  var LAY = { COL_GAP: 60, ROW_GAP: 30, PAD: 22, PAD_TOP: 34, MARGIN: 60 };

  function tidyLayout(arch, state) {
    if (!state.nodes.length && !state.groups.length) return state;

    // 1) 現在座標から所属ツリーを作る（親 = 中心を含む最小面積の枠。minArea 超のものに限る）
    function innermost(cx, cy, selfUid, minArea) {
      var best = null;
      state.groups.forEach(function (g) {
        var area = g.w * g.h;
        if (g.uid === selfUid || area <= minArea) return;
        if (cx >= g.x && cx <= g.x + g.w && cy >= g.y && cy <= g.y + g.h &&
            (!best || area < best.w * best.h)) best = g;
      });
      return best;
    }
    var parentOf = {};   // uid -> 親グループ uid（ルート直下は null）
    state.nodes.forEach(function (n) {
      var p = innermost(n.x + NODE_W / 2, n.y + NODE_H / 2, null, 0);
      parentOf[n.uid] = p ? p.uid : null;
    });
    state.groups.forEach(function (g) {
      // 枠の親は「自分より大きい枠」に限る。中心がたまたま子サブネットに重なっても
      // 小さい枠を親に誤判定して入れ子(cloud>vpc>subnet)が壊れないようにする。
      var p = innermost(g.x + g.w / 2, g.y + g.h / 2, g.uid, g.w * g.h);
      parentOf[g.uid] = p ? p.uid : null;
    });

    var childrenOf = {}; // コンテナ uid（ルートは "" ）-> 直下の要素 uid 配列
    function key(u) { return u == null ? "" : u; }
    function pushChild(parent, uid) {
      (childrenOf[key(parent)] = childrenOf[key(parent)] || []).push(uid);
    }
    state.nodes.forEach(function (n) { pushChild(parentOf[n.uid], n.uid); });
    state.groups.forEach(function (g) { pushChild(parentOf[g.uid], g.uid); });

    var nodeByUid = {}, groupByUid = {};
    state.nodes.forEach(function (n) { nodeByUid[n.uid] = n; });
    state.groups.forEach(function (g) { groupByUid[g.uid] = g; });
    function isGroup(uid) { return !!groupByUid[uid]; }

    // 要素 uid が属する「コンテナ container（null=ルート）の直下の子」を返す（祖先を辿る）
    function resolveChild(uid, container) {
      var cur = uid, guard = 0;
      while (cur != null && parentOf[cur] !== container && guard++ < 9999) cur = parentOf[cur];
      return parentOf[cur] === container ? cur : null;
    }

    var origX = {}, origY = {}; // 層内の並び順を元の位置で安定化するため控える
    state.nodes.forEach(function (n) { origX[n.uid] = n.x; origY[n.uid] = n.y; });
    state.groups.forEach(function (g) { origX[g.uid] = g.x; origY[g.uid] = g.y; });

    // 2) コンテナ単位の再帰レイアウト。{ w, h, place(x,y) } を返す。
    var inProgress = {};
    function layoutContainer(container) {
      var ck = key(container);
      if (inProgress[ck]) return { w: 0, h: 0, place: function () {} }; // 異常な入れ子の保険
      inProgress[ck] = 1;
      var kids = childrenOf[ck] || [];

      var block = {}; // uid -> { w, h, place }
      kids.forEach(function (uid) {
        if (isGroup(uid)) {
          var inner = layoutContainer(uid);
          var g = groupByUid[uid];
          var w = inner.w + LAY.PAD * 2, h = inner.h + LAY.PAD_TOP + LAY.PAD;
          block[uid] = { w: w, h: h, place: function (x, y) {
            g.x = Math.round(x); g.y = Math.round(y); g.w = Math.round(w); g.h = Math.round(h);
            inner.place(x + LAY.PAD, y + LAY.PAD_TOP);
          } };
        } else {
          var n = nodeByUid[uid];
          block[uid] = { w: NODE_W, h: NODE_H, place: function (x, y) {
            n.x = Math.round(x); n.y = Math.round(y);
          } };
        }
      });

      inProgress[ck] = 0;
      if (!kids.length) return { w: 0, h: 0, place: function () {} };

      // この階層の局所有向辺（端点を直下の子に解決し、別々の子に繋がるものだけ）
      var succ = {}, pred = {};
      kids.forEach(function (u) { succ[u] = {}; pred[u] = {}; });
      state.edges.forEach(function (e) {
        var a = resolveChild(e.from, container), b = resolveChild(e.to, container);
        if (a == null || b == null || a === b) return;
        succ[a][b] = 1; pred[b][a] = 1;
      });

      // 層割り当て（最長経路法・循環は打ち切り）
      var layer = {}, visiting = {};
      function depth(u) {
        if (layer[u] !== undefined) return layer[u];
        if (visiting[u]) return 0;
        visiting[u] = 1;
        var d = 0;
        Object.keys(pred[u]).forEach(function (p) { d = Math.max(d, depth(p) + 1); });
        visiting[u] = 0;
        return (layer[u] = d);
      }
      var connected = {}, maxL = 0;
      kids.forEach(function (u) {
        if (Object.keys(succ[u]).length || Object.keys(pred[u]).length) connected[u] = 1;
      });
      kids.forEach(function (u) { if (connected[u]) maxL = Math.max(maxL, depth(u)); });
      kids.forEach(function (u) { if (!connected[u]) layer[u] = maxL + 1; }); // 孤立要素は末尾の層へ

      // 層ごとにまとめ、層内は元の縦位置で安定ソート
      var cols = {};
      kids.forEach(function (u) { (cols[layer[u]] = cols[layer[u]] || []).push(u); });
      var keys = Object.keys(cols).map(Number).sort(function (a, b) { return a - b; });
      keys.forEach(function (L) {
        cols[L].sort(function (a, b) { return (origY[a] - origY[b]) || (origX[a] - origX[b]); });
      });

      var colW = {}, colH = {}, totalH = 0, totalW = 0;
      keys.forEach(function (L, i) {
        var w = 0, h = 0;
        cols[L].forEach(function (u, j) { w = Math.max(w, block[u].w); h += block[u].h + (j ? LAY.ROW_GAP : 0); });
        colW[L] = w; colH[L] = h;
        totalH = Math.max(totalH, h);
        totalW += w + (i ? LAY.COL_GAP : 0);
      });

      var rel = {}, cx = 0;
      keys.forEach(function (L) {
        var cy = (totalH - colH[L]) / 2; // 列を縦センタリング
        cols[L].forEach(function (u) { rel[u] = { x: cx, y: cy }; cy += block[u].h + LAY.ROW_GAP; });
        cx += colW[L] + LAY.COL_GAP;
      });

      return { w: totalW, h: totalH, place: function (x, y) {
        kids.forEach(function (u) { block[u].place(x + rel[u].x, y + rel[u].y); });
      } };
    }

    layoutContainer(null).place(LAY.MARGIN, LAY.MARGIN);
    state.nodes.forEach(function (n) { n.x = Math.max(0, n.x); n.y = Math.max(0, n.y); });
    state.groups.forEach(function (g) { g.x = Math.max(0, g.x); g.y = Math.max(0, g.y); });
    return state;
  }

  // ---- 共有リンク用のシリアライズ ----
  // state を URL ハッシュに収まるコンパクト形式（base64url）へ。
  // 形式: {v:1, n:[[comp,x,y,label?]...], g:[[kind,x,y,w,h]...], e:[[fromIdx,toIdx]...]}
  function b64urlEncode(json) {
    var b64 = (typeof btoa !== "undefined")
      ? btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, "utf8").toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function b64urlDecode(str) {
    var b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    return (typeof atob !== "undefined")
      ? decodeURIComponent(escape(atob(b64)))
      : Buffer.from(b64, "base64").toString("utf8");
  }
  function shareEncode(state, provider) {
    var idx = {};
    state.nodes.forEach(function (n, i) { idx[n.uid] = i; });
    var payload = {
      v: 1,
      p: provider || undefined,
      n: state.nodes.map(function (n) {
        var a = [n.c, n.x, n.y];
        if (n.label) a.push(n.label);
        return a;
      }),
      g: state.groups.map(function (g) { return [g.k, g.x, g.y, g.w, g.h]; }),
      e: state.edges
        .filter(function (e) { return idx[e.from] !== undefined && idx[e.to] !== undefined; })
        .map(function (e) { return [idx[e.from], idx[e.to]]; })
    };
    return b64urlEncode(JSON.stringify(payload));
  }
  function shareDecode(str) {
    try {
      var p = JSON.parse(b64urlDecode(str));
      if (!p || p.v !== 1 || !Array.isArray(p.n)) return null;
      var state = { nodes: [], groups: [], edges: [], seq: 1 };
      if (p.p) state.provider = String(p.p); // どのプロバイダの図か（v1初期のリンクには無い）
      p.n.forEach(function (a) {
        var n = { uid: "n" + (state.seq++), c: String(a[0]), x: +a[1] || 0, y: +a[2] || 0 };
        if (a[3]) n.label = String(a[3]).slice(0, 40);
        state.nodes.push(n);
      });
      (p.g || []).forEach(function (a) {
        state.groups.push({ uid: "g" + (state.seq++), k: String(a[0]), x: +a[1] || 0, y: +a[2] || 0, w: +a[3] || 320, h: +a[4] || 220 });
      });
      (p.e || []).forEach(function (a) {
        var from = state.nodes[a[0]], to = state.nodes[a[1]];
        if (from && to && from !== to) state.edges.push({ uid: "e" + (state.seq++), from: from.uid, to: to.uid });
      });
      return state;
    } catch (e) { return null; }
  }

  var api = { NODE_W: NODE_W, NODE_H: NODE_H, linkInfo: linkInfo, scopeOf: scopeOf, membership: membership, validate: validate, tidyLayout: tidyLayout, shareEncode: shareEncode, shareDecode: shareDecode };
  (typeof window !== "undefined" ? window : globalThis).CERT_BUILDER_CORE = api;
})();
