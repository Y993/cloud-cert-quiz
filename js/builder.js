// js/builder.js — クラウド構成図ビルダー（AWS / GCP / Azure）
// 依存: js/builder-core.js (CERT_BUILDER_CORE), js/data/arch/<provider>.js (CERT_ARCH.<provider>),
//       js/data/services/<provider>.js (CERT_SERVICES, 任意)
// プロバイダは URL の ?p=gcp / ?p=azure で切り替える（無指定は aws）。
(function () {
  "use strict";

  var PROVIDER = (location.search.match(/[?&]p=(gcp|azure)/) || [])[1] || "aws";
  var PNAME = { aws: "AWS", gcp: "Google Cloud", azure: "Azure" }[PROVIDER];
  var ARCH = window.CERT_ARCH && window.CERT_ARCH[PROVIDER];
  var CORE = window.CERT_BUILDER_CORE;
  if (!ARCH || !CORE) return;

  var NODE_W = CORE.NODE_W, NODE_H = CORE.NODE_H;
  var CW = 2000, CH = 1400;
  // プロバイダごとに作業を分けて保存（aws は従来キーのまま＝既存ユーザーの作業を引き継ぐ）
  var LS_KEY = "cloudcert-builder-" + PROVIDER;

  document.title = PNAME + " 構成図ビルダー | CLOUDCERT_ — サービスを繋いで構成を理解する";
  // プロバイダタブの選択状態
  document.querySelectorAll(".ptab").forEach(function (t) {
    t.classList.toggle("active", t.dataset.p === PROVIDER);
  });

  // ---- DOM ----
  var canvas = document.getElementById("canvas");
  var canvasWrap = document.getElementById("canvasWrap");
  var canvasSizer = document.getElementById("canvasSizer");
  var groupLayer = document.getElementById("groupLayer");
  var nodeLayer = document.getElementById("nodeLayer");
  var edgeLayer = document.getElementById("edgeLayer");
  var inspector = document.getElementById("inspector");
  var palRoot = document.getElementById("palRoot");
  var palSearch = document.getElementById("palSearch");
  var tplSelect = document.getElementById("tplSelect");
  var saveState = document.getElementById("saveState");

  // ---- 台帳ルックアップ ----
  var COMPS = {};
  ARCH.components.forEach(function (c) { COMPS[c.id] = c; });
  var CATS = {};
  ARCH.categories.forEach(function (c) { CATS[c.id] = c; });
  var GKINDS = {};
  ARCH.groupKinds.forEach(function (g) { GKINDS[g.id] = g; });

  // ---- 状態 ----
  var state = { nodes: [], groups: [], edges: [], seq: 1 };
  var sel = null; // {type:"node"|"edge"|"group", uid}

  function uid(prefix) { return prefix + (state.seq++); }
  function nodeOf(u) { return state.nodes.find(function (n) { return n.uid === u; }); }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  // ---- 接続の意味・線種を引く（ロジックは builder-core.js）----
  function linkInfo(fromC, toC) { return CORE.linkInfo(ARCH, fromC, toC); }

  // ---- 設計チェックの結果（render() で更新）----
  var warns = [];                 // [{target:{type,uid}, msg, level}]
  var warnByUid = {};             // uid → [{msg, level}, ...]
  function computeWarns() {
    warns = CORE.validate(ARCH, state);
    warnByUid = {};
    warns.forEach(function (w) {
      (warnByUid[w.target.uid] = warnByUid[w.target.uid] || []).push(w);
    });
  }
  function hasError(uidKey) {
    return (warnByUid[uidKey] || []).some(function (w) { return w.level === "error"; });
  }
  // ノード/グループに付ける「!」バッジ（error は赤、warn は黄）
  function badgeHtml(uidKey, extra) {
    var list = warnByUid[uidKey];
    if (!list) return "";
    return '<span class="warn-badge' + (hasError(uidKey) ? " err" : "") + (extra ? " " + extra : "") +
      '" title="' + esc(list.map(function (w) { return w.msg; }).join(" / ")) + '">!</span>';
  }

  // =====================================================
  // 履歴（Undo / Redo）
  // =====================================================
  var undoStack = [], redoStack = [];
  var btnUndo = document.getElementById("btnUndo");
  var btnRedo = document.getElementById("btnRedo");
  function snap() { return JSON.stringify(state); }
  function updateHistBtns() {
    btnUndo.disabled = !undoStack.length;
    btnRedo.disabled = !redoStack.length;
  }
  // 変更を加える「前」に呼ぶ。s を渡すとそのスナップショットを積む（ドラッグ開始時用）
  function pushHist(s) {
    undoStack.push(s || snap());
    if (undoStack.length > 60) undoStack.shift();
    redoStack.length = 0;
    updateHistBtns();
  }
  function undo() {
    if (!undoStack.length) return;
    redoStack.push(snap());
    state = JSON.parse(undoStack.pop());
    sel = null;
    render(); save(); updateHistBtns();
  }
  function redo() {
    if (!redoStack.length) return;
    undoStack.push(snap());
    state = JSON.parse(redoStack.pop());
    sel = null;
    render(); save(); updateHistBtns();
  }
  btnUndo.addEventListener("click", undo);
  btnRedo.addEventListener("click", redo);

  // =====================================================
  // 永続化
  // =====================================================
  var saveTimer = null;
  function save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ v: 1, state: state }));
      saveState.textContent = "saved ✓";
      saveState.classList.add("flash");
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () { saveState.classList.remove("flash"); }, 900);
    } catch (e) { /* localStorage不可でも動作は継続 */ }
  }
  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data || data.v !== 1 || !data.state) return false;
      state = data.state;
      // 台帳から消えたコンポーネントのノードを除去
      state.nodes = state.nodes.filter(function (n) { return COMPS[n.c]; });
      var alive = {};
      state.nodes.forEach(function (n) { alive[n.uid] = 1; });
      state.edges = state.edges.filter(function (e) { return alive[e.from] && alive[e.to]; });
      return state.nodes.length > 0 || state.groups.length > 0;
    } catch (e) { return false; }
  }

  // =====================================================
  // テンプレート
  // =====================================================
  function loadTemplate(tpl, opts) {
    if (!opts || !opts.initial) pushHist();
    state = { nodes: [], groups: [], edges: [], seq: 1 };
    tpl.groups.forEach(function (g) {
      state.groups.push({ uid: uid("g"), k: g.k, x: g.x, y: g.y, w: g.w, h: g.h });
    });
    var uids = tpl.nodes.map(function (n) {
      var u = uid("n");
      state.nodes.push({ uid: u, c: n.c, x: n.x, y: n.y });
      return u;
    });
    tpl.edges.forEach(function (pair) {
      state.edges.push({ uid: uid("e"), from: uids[pair[0]], to: uids[pair[1]] });
    });
    sel = null;
    render();
    save();
  }

  // =====================================================
  // パレット
  // =====================================================
  function buildPalette() {
    var html = "";
    ARCH.categories.forEach(function (cat) {
      var items = ARCH.components.filter(function (c) { return c.cat === cat.id; });
      if (!items.length) return;
      html += '<details open><summary><span class="cat-dot" style="background:' + cat.color + '"></span>' + esc(cat.label) + "</summary>";
      items.forEach(function (c) {
        html += '<div class="pal-item" draggable="true" data-comp="' + c.id + '" data-search="' +
          esc((c.name + " " + c.abbr + " " + c.desc).toLowerCase()) + '" title="' + esc(c.desc) + '">' +
          '<span class="pal-abbr" style="color:' + cat.color + '">' + esc(c.abbr) + "</span>" +
          "<span>" + esc(c.name) + "</span></div>";
      });
      html += "</details>";
    });
    // グループ枠
    html += '<details open><summary><span class="cat-dot" style="background:#5b6478"></span>グループ枠（囲い）</summary>';
    ARCH.groupKinds.forEach(function (g) {
      html += '<div class="pal-item" draggable="true" data-group="' + g.id + '" data-search="' + esc(g.label.toLowerCase()) + '">' +
        '<span class="pal-abbr" style="color:' + g.color + '">▢</span><span>' + esc(g.label) + "</span></div>";
    });
    html += "</details>";
    palRoot.innerHTML = html;
  }

  palSearch.addEventListener("input", function () {
    var q = palSearch.value.trim().toLowerCase();
    palRoot.querySelectorAll(".pal-item").forEach(function (el) {
      el.classList.toggle("is-hidden", !!q && el.getAttribute("data-search").indexOf(q) === -1);
    });
    palRoot.querySelectorAll("details").forEach(function (d) { if (q) d.open = true; });
  });

  // ドラッグ＆ドロップ（HTML5 DnD）
  palRoot.addEventListener("dragstart", function (e) {
    var item = e.target.closest(".pal-item");
    if (!item) return;
    e.dataTransfer.setData("text/plain",
      item.dataset.comp ? "c:" + item.dataset.comp : "g:" + item.dataset.group);
    e.dataTransfer.effectAllowed = "copy";
  });
  canvas.addEventListener("dragover", function (e) { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; });
  canvas.addEventListener("drop", function (e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    var pt = canvasPoint(e);
    if (data.indexOf("c:") === 0) addNode(data.slice(2), pt.x - NODE_W / 2, pt.y - NODE_H / 2);
    else if (data.indexOf("g:") === 0) addGroup(data.slice(2), pt.x - 160, pt.y - 110);
  });
  // クリックでも追加（ビューポート中央へ）
  palRoot.addEventListener("click", function (e) {
    var item = e.target.closest(".pal-item");
    if (!item) return;
    var cx = (canvasWrap.scrollLeft + canvasWrap.clientWidth / 2) / zoom;
    var cy = (canvasWrap.scrollTop + canvasWrap.clientHeight / 2) / zoom;
    if (item.dataset.comp) addNode(item.dataset.comp, cx - NODE_W / 2 + jitter(), cy - NODE_H / 2 + jitter());
    else addGroup(item.dataset.group, cx - 160, cy - 110);
  });
  function jitter() { return Math.floor(Math.random() * 60) - 30; }

  function addNode(compId, x, y) {
    pushHist();
    var n = { uid: uid("n"), c: compId, x: clamp(Math.round(x), 0, CW - NODE_W), y: clamp(Math.round(y), 0, CH - NODE_H) };
    state.nodes.push(n);
    sel = { type: "node", uid: n.uid };
    render();
    save();
  }
  function addGroup(kind, x, y) {
    pushHist();
    var g = { uid: uid("g"), k: kind, x: clamp(Math.round(x), 0, CW - 320), y: clamp(Math.round(y), 0, CH - 220), w: 320, h: 220 };
    state.groups.push(g);
    sel = { type: "group", uid: g.uid };
    render();
    save();
  }

  // 選択中のノード/枠を複製（Ctrl+D）
  function duplicateSelection() {
    if (!sel) return;
    if (sel.type === "node") {
      var src = nodeOf(sel.uid);
      if (!src) return;
      pushHist();
      var n = { uid: uid("n"), c: src.c, x: clamp(src.x + 28, 0, CW - NODE_W), y: clamp(src.y + 28, 0, CH - NODE_H) };
      if (src.label) n.label = src.label;
      state.nodes.push(n);
      sel = { type: "node", uid: n.uid };
    } else if (sel.type === "group") {
      var sg = state.groups.find(function (x) { return x.uid === sel.uid; });
      if (!sg) return;
      pushHist();
      var g = { uid: uid("g"), k: sg.k, x: clamp(sg.x + 28, 0, CW - sg.w), y: clamp(sg.y + 28, 0, CH - sg.h), w: sg.w, h: sg.h };
      state.groups.push(g);
      sel = { type: "group", uid: g.uid };
    } else return;
    render();
    save();
  }

  // ノードの表示名（「Webサーバー」等）を付ける
  function editLabel(n) {
    var v = prompt("このノードの表示名（空にすると解除）", n.label || "");
    if (v === null) return;
    pushHist();
    v = v.trim().slice(0, 40);
    if (v) n.label = v; else delete n.label;
    render();
    save();
  }

  // =====================================================
  // ズーム & パン
  // =====================================================
  var zoom = 1;
  var btnZoomReset = document.getElementById("btnZoomReset");
  function setZoom(z, cx, cy) {
    z = clamp(z, 0.4, 2);
    if (Math.abs(z - 1) < 0.05) z = 1; // 100% 付近に吸着
    var keep = null;
    if (cx !== undefined) {
      var wr = canvasWrap.getBoundingClientRect();
      keep = {
        px: (canvasWrap.scrollLeft + cx - wr.left) / zoom,
        py: (canvasWrap.scrollTop + cy - wr.top) / zoom,
        ox: cx - wr.left, oy: cy - wr.top
      };
    }
    zoom = z;
    canvas.style.transform = "scale(" + z + ")";
    canvasSizer.style.width = (CW * z) + "px";
    canvasSizer.style.height = (CH * z) + "px";
    btnZoomReset.textContent = Math.round(z * 100) + "%";
    if (keep) {
      canvasWrap.scrollLeft = keep.px * z - keep.ox;
      canvasWrap.scrollTop = keep.py * z - keep.oy;
    }
  }
  function zoomFit() {
    if (!state.nodes.length && !state.groups.length) { setZoom(1); return; }
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.nodes.forEach(function (n) {
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + NODE_W); maxY = Math.max(maxY, n.y + NODE_H);
    });
    state.groups.forEach(function (g) {
      minX = Math.min(minX, g.x); minY = Math.min(minY, g.y);
      maxX = Math.max(maxX, g.x + g.w); maxY = Math.max(maxY, g.y + g.h);
    });
    var pad = 40;
    var z = Math.min(
      (canvasWrap.clientWidth - pad) / (maxX - minX + pad),
      (canvasWrap.clientHeight - pad) / (maxY - minY + pad), 1.5);
    setZoom(z);
    canvasWrap.scrollLeft = ((minX + maxX) / 2) * zoom - canvasWrap.clientWidth / 2;
    canvasWrap.scrollTop = ((minY + maxY) / 2) * zoom - canvasWrap.clientHeight / 2;
  }
  document.getElementById("btnZoomIn").addEventListener("click", function () { setZoom(zoom * 1.2); });
  document.getElementById("btnZoomOut").addEventListener("click", function () { setZoom(zoom / 1.2); });
  document.getElementById("btnZoomFit").addEventListener("click", zoomFit);
  btnZoomReset.addEventListener("click", function () { setZoom(1); });
  canvasWrap.addEventListener("wheel", function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom(zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12), e.clientX, e.clientY);
  }, { passive: false });

  var spaceHeld = false;
  var panning = null; // {sx, sy, sl, st}

  // =====================================================
  // 座標ユーティリティ
  // =====================================================
  function canvasPoint(e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / zoom, y: (e.clientY - r.top) / zoom };
  }
  function nodeCenter(n) { return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 }; }
  // 中心同士を結ぶ直線が矩形の枠を抜ける点
  function anchor(n, toward) {
    var c = nodeCenter(n);
    var dx = toward.x - c.x, dy = toward.y - c.y;
    if (dx === 0 && dy === 0) return c;
    var tx = dx !== 0 ? (NODE_W / 2 + 5) / Math.abs(dx) : Infinity;
    var ty = dy !== 0 ? (NODE_H / 2 + 5) / Math.abs(dy) : Infinity;
    var t = Math.min(tx, ty, 1);
    return { x: c.x + dx * t, y: c.y + dy * t };
  }

  // =====================================================
  // 描画
  // =====================================================
  function render() {
    computeWarns();
    renderGroups();
    renderNodes();
    renderEdges();
    renderInspector();
  }

  function renderGroups() {
    var html = "";
    state.groups.forEach(function (g) {
      var kind = GKINDS[g.k] || { label: g.k, color: "#8c96ad" };
      html += '<div class="group' + (sel && sel.type === "group" && sel.uid === g.uid ? " selected" : "") +
        '" data-uid="' + g.uid + '" style="left:' + g.x + "px;top:" + g.y + "px;width:" + g.w + "px;height:" + g.h +
        "px;border-color:" + kind.color + '">' +
        '<span class="g-label" style="background:' + kind.color + '">' + esc(kind.label) + "</span>" +
        badgeHtml(g.uid, "g-warn") +
        '<span class="g-resize"></span></div>';
    });
    groupLayer.innerHTML = html;
  }

  function renderNodes() {
    var html = "";
    state.nodes.forEach(function (n) {
      var c = COMPS[n.c];
      var color = (CATS[c.cat] || {}).color || "#8c96ad";
      html += '<div class="node' + (sel && sel.type === "node" && sel.uid === n.uid ? " selected" : "") +
        (c.cat === "external" ? " n-ext" : "") +
        '" data-uid="' + n.uid + '" style="left:' + n.x + "px;top:" + n.y + 'px" title="' +
        esc(n.label ? n.label + " (" + c.name + ")" : c.name + " — ダブルクリックで表示名を変更") + '">' +
        '<span class="n-abbr" style="color:' + color + '">' + esc(c.abbr) + "</span>" +
        (n.label
          ? '<span class="n-name">' + esc(n.label) + '</span><span class="n-sub">' + esc(c.name) + "</span>"
          : '<span class="n-name">' + esc(c.name) + "</span>") +
        badgeHtml(n.uid) +
        '<span class="port p-t"></span><span class="port p-r"></span>' +
        '<span class="port p-b"></span><span class="port p-l"></span></div>';
    });
    nodeLayer.innerHTML = html;
  }

  function renderEdges() {
    function marker(id, fill) {
      return '<marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="' + fill + '"/></marker>';
    }
    var svg = "<defs>" +
      marker("arr", "rgba(150,165,200,0.8)") +
      marker("arrIam", "#3fe0a4") +
      marker("arrAttach", "#a78bfa") +
      marker("arrWarn", "#ffd166") +
      marker("arrErr", "#ff5d6c") +
      marker("arrSel", "#3fe0a4") +
      "</defs>";
    state.edges.forEach(function (e) {
      var a = nodeOf(e.from), b = nodeOf(e.to);
      if (!a || !b) return;
      var p1 = anchor(a, nodeCenter(b));
      var p2 = anchor(b, nodeCenter(a));
      var d = "M" + p1.x.toFixed(1) + "," + p1.y.toFixed(1) + " L" + p2.x.toFixed(1) + "," + p2.y.toFixed(1);
      var isSel = sel && sel.type === "edge" && sel.uid === e.uid;
      var hasWarn = !!warnByUid[e.uid];
      var hasErr = hasError(e.uid);
      var info = linkInfo(a.c, b.c);
      var mk = isSel ? "arrSel" : hasErr ? "arrErr" : hasWarn ? "arrWarn" :
        info.t === "iam" ? "arrIam" : info.t === "attach" ? "arrAttach" : "arr";
      var mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
      svg += '<g class="edge' + (isSel ? " selected" : "") + (hasErr ? " has-error" : hasWarn ? " has-warn" : "") +
        (info.t ? " t-" + info.t : "") + '" data-uid="' + e.uid + '">' +
        '<path class="edge-hit" d="' + d + '"/>' +
        '<path class="edge-line" d="' + d + '" marker-end="url(#' + mk + ')"/>' +
        (info.l ? '<text class="edge-label" x="' + mx.toFixed(1) + '" y="' + (my - 7).toFixed(1) +
          '" text-anchor="middle">' + esc(info.l) + "</text>" : "") +
        "</g>";
    });
    edgeLayer.innerHTML = svg;
  }

  // =====================================================
  // インスペクタ
  // =====================================================
  // 設計チェックのボックス（uid 単位 / error=赤・warn=黄）
  function warnBoxHtml(uidKey) {
    var list = warnByUid[uidKey];
    if (!list) return "";
    return '<div class="insp-sec warn">// 設計チェック</div>' +
      list.map(function (w) {
        return '<div class="insp-warn' + (w.level === "error" ? " err" : "") + '">' +
          (w.level === "error" ? "⛔ NG: " : "⚠ ") + esc(w.msg) + "</div>";
      }).join("");
  }

  // ノードの所属枠を「VPC ▸ プライベートサブネット」形式で
  function placementHtml(n) {
    var chain = CORE.membership(state, n);
    if (!chain.length) return "";
    var labels = chain.map(function (g) { return esc((GKINDS[g.k] || { label: g.k }).label); });
    return '<div class="insp-place">配置: ' + labels.join(" ▸ ") + "</div>";
  }

  function renderInspector() {
    if (!sel) {
      var html0 =
        "<h2>// INSPECTOR</h2>" +
        '<div class="insp-empty">' +
        "<p>クラウドの構成図を組み立てて、「どこ と どこ が繋がっているのか」を体で覚えるための画面です。</p>" +
        "<ol>" +
        "<li>左のパレットからサービスをキャンバスへドラッグ</li>" +
        "<li>ノードの端に出る <kbd>●</kbd> を別のノードへドラッグして接続</li>" +
        "<li>線を選択すると、その接続が「実際には何の設定なのか」をここに表示</li>" +
        "</ol>" +
        "<p>ノード・線は <kbd>Delete</kbd> で削除、<kbd>Ctrl+Z</kbd> で元に戻せます。作業内容はこのブラウザに自動保存。" +
        "「共有リンク」を押すと、いま描いている構成図をそのまま開けるURLを共有できます。" +
        "ショートカット一覧は <kbd>?</kbd> キーから。</p>" +
        "</div>";
      if (warns.length) {
        html0 += '<div class="insp-sec warn">// 設計チェック (' + warns.length + ")</div>";
        warns.forEach(function (w) {
          html0 += '<button class="insp-warn warn-item' + (w.level === "error" ? " err" : "") +
            '" data-wtype="' + w.target.type + '" data-wuid="' + w.target.uid + '">' +
            (w.level === "error" ? "⛔ NG: " : "⚠ ") + esc(w.msg) + "</button>";
        });
      } else if (state.nodes.length) {
        html0 += '<div class="insp-sec">// 設計チェック</div><p class="insp-ok">✓ 指摘はありません</p>';
      }
      inspector.innerHTML = html0;
      return;
    }
    if (sel.type === "node") {
      var n = nodeOf(sel.uid);
      if (!n) { sel = null; renderInspector(); return; }
      var c = COMPS[n.c];
      var cat = CATS[c.cat] || {};
      var html = "<h2>// SERVICE</h2>" +
        '<div class="insp-node-head"><span class="insp-abbr" style="color:' + cat.color + '">' + esc(c.abbr) +
        '</span><span class="insp-name">' + esc(n.label || c.name) + "</span></div>" +
        (n.label ? '<span class="insp-cat">' + esc(c.name) + "</span>" : "") +
        '<span class="insp-cat">' + esc(cat.label || "") + "</span>" +
        placementHtml(n) +
        '<p class="insp-desc">' + esc(c.desc) + "</p>" +
        warnBoxHtml(n.uid);
      var svc = c.learn && window.CERT_SERVICES && window.CERT_SERVICES[c.learn];
      if (svc && svc.summary && svc.summary[0]) {
        html += '<div class="insp-summary">' + esc(svc.summary[0]) + "</div>";
      }
      if (c.learn) {
        html += '<a class="insp-learn" href="learn/' + esc(c.learn) + '.html" target="_blank" rel="noopener">▸ 詳しい解説と頻出ポイントを見る</a>';
      }
      // 接続一覧
      var outs = state.edges.filter(function (e) { return e.from === n.uid; });
      var ins = state.edges.filter(function (e) { return e.to === n.uid; });
      html += '<div class="insp-sec">// CONNECTIONS (' + (outs.length + ins.length) + ")</div>";
      if (!outs.length && !ins.length) {
        html += '<p class="insp-empty">まだ接続がありません。ノード端の ● を相手のノードへドラッグしてみてください。</p>';
      }
      outs.forEach(function (e) {
        var other = nodeOf(e.to);
        if (!other) return;
        var info = linkInfo(n.c, other.c);
        html += '<button class="conn-item" data-edge="' + e.uid + '"><span class="c-dir out">OUT →</span>' +
          esc(COMPS[other.c].name) + (info.l ? '<br><span class="c-label">' + esc(info.l) + "</span>" : "") + "</button>";
      });
      ins.forEach(function (e) {
        var other = nodeOf(e.from);
        if (!other) return;
        var info = linkInfo(other.c, n.c);
        html += '<button class="conn-item" data-edge="' + e.uid + '"><span class="c-dir in">IN ←</span>' +
          esc(COMPS[other.c].name) + (info.l ? '<br><span class="c-label">' + esc(info.l) + "</span>" : "") + "</button>";
      });
      html += '<div class="insp-actions">' +
        '<button class="insp-act" id="inspLabel">表示名を変更</button>' +
        '<button class="insp-act" id="inspDup">複製 (Ctrl+D)</button>' +
        "</div>" +
        '<button class="insp-del" id="inspDel">このノードを削除 (Delete)</button>';
      inspector.innerHTML = html;
      return;
    }
    if (sel.type === "edge") {
      var e = state.edges.find(function (x) { return x.uid === sel.uid; });
      if (!e) { sel = null; renderInspector(); return; }
      var a = nodeOf(e.from), b = nodeOf(e.to);
      var info = linkInfo(a.c, b.c);
      var et = info.t && ARCH.edgeTypes[info.t];
      var html2 = "<h2>// CONNECTION</h2>" +
        '<div class="insp-edge-route">' + esc(COMPS[a.c].name) + '<span class="arrow">→</span>' + esc(COMPS[b.c].name) + "</div>" +
        (info.l ? '<span class="insp-edge-label">' + esc(info.l) + "</span>" : "") +
        (et ? '<span class="insp-edge-type t-' + info.t + '">' + esc(et.label) + "</span>" : "") +
        warnBoxHtml(e.uid) +
        '<div class="insp-sec">// この接続の正体</div>' +
        '<p>' + esc(info.d) + "</p>";
      var la = COMPS[a.c].learn, lb = COMPS[b.c].learn;
      if (la || lb) {
        html2 += '<div class="insp-sec">// 関連サービスの解説</div>';
        if (la) html2 += '<a class="insp-learn" href="learn/' + esc(la) + '.html" target="_blank" rel="noopener">▸ ' + esc(COMPS[a.c].name) + "</a><br>";
        if (lb) html2 += '<a class="insp-learn" href="learn/' + esc(lb) + '.html" target="_blank" rel="noopener">▸ ' + esc(COMPS[b.c].name) + "</a>";
      }
      html2 += '<div class="insp-actions">' +
        '<button class="insp-act" id="inspRev">⇄ 向きを反転</button>' +
        "</div>" +
        '<button class="insp-del" id="inspDel">この接続を削除 (Delete)</button>';
      inspector.innerHTML = html2;
      return;
    }
    if (sel.type === "group") {
      var g = state.groups.find(function (x) { return x.uid === sel.uid; });
      if (!g) { sel = null; renderInspector(); return; }
      var kind = GKINDS[g.k] || { label: g.k };
      inspector.innerHTML = "<h2>// GROUP</h2>" +
        '<div class="insp-name" style="margin-bottom:10px">' + esc(kind.label) + "</div>" +
        '<p class="insp-desc">論理的なまとまりを表す囲いです。右下の角をドラッグするとサイズを変更できます。中に置いたノードは枠に所属しているとみなされ、配置のチェック対象になります。</p>' +
        warnBoxHtml(g.uid) +
        '<button class="insp-del" id="inspDel">この枠を削除 (Delete)</button>';
    }
  }

  inspector.addEventListener("click", function (e) {
    var del = e.target.closest("#inspDel");
    if (del) { deleteSelection(); return; }
    if (e.target.closest("#inspDup")) { duplicateSelection(); return; }
    if (e.target.closest("#inspLabel")) {
      var ln = sel && sel.type === "node" && nodeOf(sel.uid);
      if (ln) editLabel(ln);
      return;
    }
    if (e.target.closest("#inspRev")) {
      var re = sel && sel.type === "edge" && state.edges.find(function (x) { return x.uid === sel.uid; });
      if (re) {
        // 反転先が既存エッジと同じ2ノードを結ぶ場合は二重線になるので抑止
        var clash = state.edges.some(function (x) {
          return x.uid !== re.uid &&
            ((x.from === re.from && x.to === re.to) || (x.from === re.to && x.to === re.from));
        });
        if (clash) { flashSave("反転すると既存の接続と重なります"); return; }
        pushHist();
        var tmp = re.from; re.from = re.to; re.to = tmp;
        render(); save();
      }
      return;
    }
    var conn = e.target.closest(".conn-item");
    if (conn) { sel = { type: "edge", uid: conn.dataset.edge }; render(); return; }
    var wi = e.target.closest(".warn-item");
    if (wi) { sel = { type: wi.dataset.wtype, uid: wi.dataset.wuid }; render(); }
  });

  // =====================================================
  // 削除
  // =====================================================
  function deleteSelection() {
    if (!sel) return;
    pushHist();
    if (sel.type === "node") {
      state.nodes = state.nodes.filter(function (n) { return n.uid !== sel.uid; });
      state.edges = state.edges.filter(function (e) { return e.from !== sel.uid && e.to !== sel.uid; });
    } else if (sel.type === "edge") {
      state.edges = state.edges.filter(function (e) { return e.uid !== sel.uid; });
    } else if (sel.type === "group") {
      state.groups = state.groups.filter(function (g) { return g.uid !== sel.uid; });
    }
    sel = null;
    render();
    save();
  }

  // 矢印キーの微移動は連打されるので、履歴は800ms間隔でまとめて積む
  var lastNudge = { at: 0, uid: null };
  function nudgeSelection(dx, dy) {
    if (!sel || sel.type === "edge") return false;
    var now = Date.now();
    if (now - lastNudge.at > 800 || lastNudge.uid !== sel.uid) pushHist();
    lastNudge = { at: now, uid: sel.uid };
    if (sel.type === "node") {
      var n = nodeOf(sel.uid);
      if (!n) return false;
      n.x = clamp(n.x + dx, 0, CW - NODE_W);
      n.y = clamp(n.y + dy, 0, CH - NODE_H);
    } else {
      var g = state.groups.find(function (x) { return x.uid === sel.uid; });
      if (!g) return false;
      g.x = clamp(g.x + dx, 0, CW - g.w);
      g.y = clamp(g.y + dy, 0, CH - g.h);
    }
    render();
    save();
    return true;
  }

  var kbdHelp = document.getElementById("kbdHelp");
  function toggleHelp(show) {
    kbdHelp.hidden = show === undefined ? !kbdHelp.hidden : !show;
  }
  document.getElementById("btnHelp").addEventListener("click", function () { toggleHelp(); });
  document.getElementById("kbdClose").addEventListener("click", function () { toggleHelp(false); });
  kbdHelp.addEventListener("click", function (e) { if (e.target === kbdHelp) toggleHelp(false); });

  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === " ") { spaceHeld = true; canvasWrap.classList.add("pan-ready"); e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y")) { e.preventDefault(); redo(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "D")) { e.preventDefault(); duplicateSelection(); return; }
    if (e.key === "?") { toggleHelp(); return; }
    var step = e.shiftKey ? 1 : 8;
    if (e.key === "ArrowUp" && nudgeSelection(0, -step)) { e.preventDefault(); return; }
    if (e.key === "ArrowDown" && nudgeSelection(0, step)) { e.preventDefault(); return; }
    if (e.key === "ArrowLeft" && nudgeSelection(-step, 0)) { e.preventDefault(); return; }
    if (e.key === "ArrowRight" && nudgeSelection(step, 0)) { e.preventDefault(); return; }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); deleteSelection(); }
    if (e.key === "Escape") {
      if (!kbdHelp.hidden) { toggleHelp(false); return; }
      sel = null; connecting = null; removeTempEdge(); render();
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === " ") { spaceHeld = false; canvasWrap.classList.remove("pan-ready"); }
  });

  // =====================================================
  // ポインタ操作（移動・接続・リサイズ・選択）
  // =====================================================
  var drag = null;       // {kind:"node"|"group"|"resize", uid, dx, dy, moved}
  var connecting = null; // {fromUid}

  canvas.addEventListener("pointerdown", function (e) {
    // パン: Space 押下中の左ドラッグ、または中ボタンドラッグ
    if (spaceHeld || e.button === 1) {
      panning = { sx: e.clientX, sy: e.clientY, sl: canvasWrap.scrollLeft, st: canvasWrap.scrollTop };
      canvasWrap.classList.add("panning");
      e.preventDefault();
      return;
    }
    if (e.button !== 0) return;
    var portEl = e.target.closest(".port");
    if (portEl) {
      var nodeEl = portEl.closest(".node");
      connecting = { fromUid: nodeEl.dataset.uid };
      e.preventDefault();
      return;
    }
    var nEl = e.target.closest(".node");
    if (nEl) {
      var n = nodeOf(nEl.dataset.uid);
      var pt = canvasPoint(e);
      drag = { kind: "node", uid: n.uid, dx: pt.x - n.x, dy: pt.y - n.y, moved: false, before: snap() };
      e.preventDefault();
      return;
    }
    var rEl = e.target.closest(".g-resize");
    if (rEl) {
      var gEl0 = rEl.closest(".group");
      var g0 = state.groups.find(function (x) { return x.uid === gEl0.dataset.uid; });
      drag = { kind: "resize", uid: g0.uid, moved: false, before: snap() };
      e.preventDefault();
      return;
    }
    var gEl = e.target.closest(".group");
    if (gEl) {
      var g = state.groups.find(function (x) { return x.uid === gEl.dataset.uid; });
      var pt2 = canvasPoint(e);
      drag = { kind: "group", uid: g.uid, dx: pt2.x - g.x, dy: pt2.y - g.y, moved: false, before: snap() };
      e.preventDefault();
      return;
    }
    var edgeG = e.target.closest("g.edge");
    if (edgeG) {
      sel = { type: "edge", uid: edgeG.dataset.uid };
      render();
      return;
    }
    // 余白クリック → 選択解除
    sel = null;
    render();
  });

  window.addEventListener("pointermove", function (e) {
    if (panning) {
      canvasWrap.scrollLeft = panning.sl - (e.clientX - panning.sx);
      canvasWrap.scrollTop = panning.st - (e.clientY - panning.sy);
      return;
    }
    if (connecting) {
      var from = nodeOf(connecting.fromUid);
      if (!from) { connecting = null; return; }
      var pt = canvasPoint(e);
      drawTempEdge(anchor(from, pt), pt);
      // ホバー先のハイライト
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var target = el && el.closest && el.closest(".node");
      nodeLayer.querySelectorAll(".node.connect-target").forEach(function (x) { x.classList.remove("connect-target"); });
      if (target && target.dataset.uid !== connecting.fromUid) target.classList.add("connect-target");
      return;
    }
    if (!drag) return;
    var pt2 = canvasPoint(e);
    drag.moved = true;
    if (drag.kind === "node") {
      var n = nodeOf(drag.uid);
      n.x = clamp(Math.round(pt2.x - drag.dx), 0, CW - NODE_W);
      n.y = clamp(Math.round(pt2.y - drag.dy), 0, CH - NODE_H);
      var el2 = nodeLayer.querySelector('.node[data-uid="' + n.uid + '"]');
      if (el2) { el2.style.left = n.x + "px"; el2.style.top = n.y + "px"; }
      renderEdges();
    } else if (drag.kind === "group") {
      var g = state.groups.find(function (x) { return x.uid === drag.uid; });
      g.x = clamp(Math.round(pt2.x - drag.dx), 0, CW - g.w);
      g.y = clamp(Math.round(pt2.y - drag.dy), 0, CH - g.h);
      var gEl = groupLayer.querySelector('.group[data-uid="' + g.uid + '"]');
      if (gEl) { gEl.style.left = g.x + "px"; gEl.style.top = g.y + "px"; }
    } else if (drag.kind === "resize") {
      var g2 = state.groups.find(function (x) { return x.uid === drag.uid; });
      g2.w = clamp(Math.round(pt2.x - g2.x), 160, CW - g2.x);
      g2.h = clamp(Math.round(pt2.y - g2.y), 110, CH - g2.y);
      var gEl2 = groupLayer.querySelector('.group[data-uid="' + g2.uid + '"]');
      if (gEl2) { gEl2.style.width = g2.w + "px"; gEl2.style.height = g2.h + "px"; }
    }
  });

  window.addEventListener("pointerup", function (e) {
    if (panning) {
      panning = null;
      canvasWrap.classList.remove("panning");
      return;
    }
    if (connecting) {
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var targetEl = el && el.closest && el.closest(".node");
      var fromUid = connecting.fromUid;
      connecting = null;
      removeTempEdge();
      nodeLayer.querySelectorAll(".node.connect-target").forEach(function (x) { x.classList.remove("connect-target"); });
      if (targetEl) {
        var toUid = targetEl.dataset.uid;
        if (toUid === fromUid) {
          flashSave("同じノード同士は接続できません");
        } else {
          // 重複判定は無向（A→B がある状態で B→A を引いても二重線にしない）
          var existing = state.edges.find(function (x) {
            return (x.from === fromUid && x.to === toUid) || (x.from === toUid && x.to === fromUid);
          });
          if (existing) {
            sel = { type: "edge", uid: existing.uid };
            flashSave("すでに接続済みです");
            render();
            return;
          }
          pushHist();
          var edge = { uid: uid("e"), from: fromUid, to: toUid };
          state.edges.push(edge);
          sel = { type: "edge", uid: edge.uid };
          render();
          save();
          return;
        }
      }
      render();
      return;
    }
    if (drag) {
      if (!drag.moved) {
        // クリック扱い → 選択
        sel = { type: drag.kind === "node" ? "node" : "group", uid: drag.uid };
      }
      var wasMoved = drag.moved;
      var before = drag.before;
      drag = null;
      render();
      if (wasMoved) {
        if (before) pushHist(before);  // 移動前の状態を履歴に積む
        save();
      }
    }
  });

  // ダブルクリックで表示名を編集
  canvas.addEventListener("dblclick", function (e) {
    var nEl = e.target.closest(".node");
    if (!nEl) return;
    var n = nodeOf(nEl.dataset.uid);
    if (n) editLabel(n);
  });

  // 接続中の仮ライン
  var tempPath = null;
  function drawTempEdge(p1, p2) {
    if (!tempPath) {
      tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempPath.setAttribute("class", "edge-temp");
      edgeLayer.appendChild(tempPath);
    }
    tempPath.setAttribute("d", "M" + p1.x + "," + p1.y + " L" + p2.x + "," + p2.y);
  }
  function removeTempEdge() {
    if (tempPath && tempPath.parentNode) tempPath.parentNode.removeChild(tempPath);
    tempPath = null;
  }

  // =====================================================
  // ツールバー
  // =====================================================
  ARCH.templates.forEach(function (t) {
    var opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.name;
    tplSelect.appendChild(opt);
  });
  tplSelect.addEventListener("change", function () {
    var t = ARCH.templates.find(function (x) { return x.id === tplSelect.value; });
    tplSelect.value = "";
    if (!t) return;
    if (state.nodes.length && !confirm("現在の構成図を破棄してテンプレートを読み込みますか？")) return;
    loadTemplate(t);
  });

  document.getElementById("btnClear").addEventListener("click", function () {
    if (!state.nodes.length && !state.groups.length) return;
    if (!confirm("すべてのノード・接続・枠を削除しますか？（Ctrl+Z で戻せます）")) return;
    pushHist();
    state = { nodes: [], groups: [], edges: [], seq: 1 };
    sel = null;
    render();
    save();
  });

  // ---- 自動整列（接続の流れに沿って並べ替え。枠の所属は保たれる）----
  document.getElementById("btnTidy").addEventListener("click", function () {
    if (!state.nodes.length && !state.groups.length) { flashSave("整える対象がありません"); return; }
    pushHist();
    CORE.tidyLayout(ARCH, state);
    sel = null;
    render();
    save();
    zoomFit();
    flashSave("レイアウトを整えました ✓");
  });

  // ---- 共有リンク / X 共有 ----
  function providerQuery() { return PROVIDER === "aws" ? "" : "?p=" + PROVIDER; }
  function shareUrl() {
    return location.origin + location.pathname + providerQuery() + "#d=" + CORE.shareEncode(state, PROVIDER);
  }
  function flashSave(msg) {
    saveState.textContent = msg;
    saveState.classList.add("flash");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { saveState.classList.remove("flash"); }, 1600);
  }
  document.getElementById("btnShare").addEventListener("click", function () {
    if (!state.nodes.length) { alert("共有する構成図がありません。"); return; }
    var url = shareUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { flashSave("共有リンクをコピーしました ✓"); },
        function () { prompt("このURLをコピーしてください", url); }
      );
    } else {
      prompt("このURLをコピーしてください", url);
    }
  });
  document.getElementById("btnX").addEventListener("click", function () {
    if (!state.nodes.length) { alert("共有する構成図がありません。"); return; }
    // 共有＝広告。ブランド・無料訴求・プロバイダ別タグを載せ、リンク先のOGPカードで拡散を狙う
    var tag = { aws: "AWS", gcp: "GoogleCloud", azure: "Azure" }[PROVIDER] || "クラウド";
    var text = PNAME + " の構成図を無料ツールで描いてみた🌥 リンク先でそのまま開いて編集できます（登録不要・CLOUDCERT_）";
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) +
      "&url=" + encodeURIComponent(shareUrl()) +
      "&hashtags=" + encodeURIComponent(tag + ",クラウド構成図"), "_blank", "noopener");
  });

  // ---- PNG 書き出し ----
  document.getElementById("btnPng").addEventListener("click", exportPng);
  function exportPng() {
    if (!state.nodes.length && !state.groups.length) { alert("書き出す構成図がありません。"); return; }
    var pad = 60;
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    state.nodes.forEach(function (n) {
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + NODE_W); maxY = Math.max(maxY, n.y + NODE_H);
    });
    state.groups.forEach(function (g) {
      minX = Math.min(minX, g.x); minY = Math.min(minY, g.y);
      maxX = Math.max(maxX, g.x + g.w); maxY = Math.max(maxY, g.y + g.h);
    });
    var w = maxX - minX + pad * 2, h = maxY - minY + pad * 2;
    var scale = 2;
    var cv = document.createElement("canvas");
    cv.width = w * scale; cv.height = h * scale;
    var ctx = cv.getContext("2d");
    ctx.scale(scale, scale);
    ctx.translate(-minX + pad, -minY + pad);

    // 背景
    ctx.fillStyle = "#070a12";
    ctx.fillRect(minX - pad, minY - pad, w, h);
    ctx.strokeStyle = "rgba(150,165,200,0.06)";
    ctx.lineWidth = 1;
    for (var gx = Math.floor((minX - pad) / 46) * 46; gx < maxX + pad; gx += 46) {
      ctx.beginPath(); ctx.moveTo(gx, minY - pad); ctx.lineTo(gx, maxY + pad); ctx.stroke();
    }
    for (var gy = Math.floor((minY - pad) / 46) * 46; gy < maxY + pad; gy += 46) {
      ctx.beginPath(); ctx.moveTo(minX - pad, gy); ctx.lineTo(maxX + pad, gy); ctx.stroke();
    }

    function rr(x, y, ww, hh, r) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r);
      else ctx.rect(x, y, ww, hh);
    }

    // グループ
    state.groups.forEach(function (g) {
      var kind = GKINDS[g.k] || { label: g.k, color: "#8c96ad" };
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = kind.color;
      ctx.lineWidth = 1.5;
      rr(g.x, g.y, g.w, g.h, 12); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = kind.color;
      ctx.font = "700 11px 'JetBrains Mono', monospace";
      var tw = ctx.measureText(kind.label).width;
      rr(g.x, g.y, tw + 20, 20, [12, 0, 8, 0]); ctx.fill();
      ctx.fillStyle = "#070a12";
      ctx.fillText(kind.label, g.x + 10, g.y + 14);
    });

    // エッジ
    ctx.font = "600 10.5px 'JetBrains Mono', monospace";
    state.edges.forEach(function (e) {
      var a = nodeOf(e.from), b = nodeOf(e.to);
      if (!a || !b) return;
      var p1 = anchor(a, nodeCenter(b)), p2 = anchor(b, nodeCenter(a));
      var info0 = linkInfo(a.c, b.c);
      var et = (info0.t && ARCH.edgeTypes[info0.t]) || ARCH.edgeTypes.net;
      var lineColor = hasError(e.uid) ? "#ff5d6c" : warnByUid[e.uid] ? "#ffd166" : et.png;
      ctx.strokeStyle = lineColor;
      ctx.setLineDash(et.dash || []);
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      ctx.setLineDash([]);
      // 矢印
      var ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(p2.x - 9 * Math.cos(ang - 0.45), p2.y - 9 * Math.sin(ang - 0.45));
      ctx.lineTo(p2.x - 9 * Math.cos(ang + 0.45), p2.y - 9 * Math.sin(ang + 0.45));
      ctx.closePath(); ctx.fill();
      // ラベル
      var info = info0;
      if (info.l) {
        var mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2 - 7;
        var tw2 = ctx.measureText(info.l).width;
        ctx.fillStyle = "#070a12";
        ctx.fillRect(mx - tw2 / 2 - 4, my - 10, tw2 + 8, 14);
        ctx.fillStyle = "#8c96ad";
        ctx.textAlign = "center";
        ctx.fillText(info.l, mx, my);
        ctx.textAlign = "left";
      }
    });

    // ノード
    state.nodes.forEach(function (n) {
      var c = COMPS[n.c];
      var color = (CATS[c.cat] || {}).color || "#8c96ad";
      ctx.fillStyle = "#0f1422";
      ctx.strokeStyle = "rgba(150,165,200,0.35)";
      ctx.lineWidth = 1;
      rr(n.x, n.y, NODE_W, NODE_H, 10); ctx.fill(); ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = color;
      ctx.font = "800 12px 'JetBrains Mono', monospace";
      ctx.fillText(c.abbr, n.x + NODE_W / 2, n.y + 34);
      ctx.strokeStyle = color;
      var aw = ctx.measureText(c.abbr).width;
      rr(n.x + NODE_W / 2 - aw / 2 - 9, n.y + 21, aw + 18, 19, 5); ctx.stroke();
      if (n.label) {
        ctx.fillStyle = "#e8edf8";
        ctx.font = "700 10px 'IBM Plex Sans JP', sans-serif";
        ctx.fillText(n.label, n.x + NODE_W / 2, n.y + 54, NODE_W - 12);
        ctx.fillStyle = "#8c96ad";
        ctx.font = "8.5px 'IBM Plex Sans JP', sans-serif";
        ctx.fillText(c.name, n.x + NODE_W / 2, n.y + 67, NODE_W - 12);
      } else {
        ctx.fillStyle = "#e8edf8";
        ctx.font = "10px 'IBM Plex Sans JP', sans-serif";
        ctx.fillText(c.name, n.x + NODE_W / 2, n.y + 58, NODE_W - 12);
      }
      ctx.textAlign = "left";
    });

    // クレジット（共有された画像がそのまま導線になるよう URL を入れる）
    ctx.fillStyle = "#5b6478";
    ctx.font = "600 10px 'JetBrains Mono', monospace";
    ctx.fillText("CLOUDCERT_ arch builder", minX - pad + 12, maxY + pad - 12);
    ctx.textAlign = "right";
    ctx.fillStyle = "#3fe0a4";
    ctx.font = "800 12px 'JetBrains Mono', monospace";
    ctx.fillText("cloudcert.app/builder.html", maxX + pad - 12, maxY + pad - 12);
    ctx.textAlign = "left";

    var link = document.createElement("a");
    link.download = "cloudcert-arch-" + PROVIDER + "-" + new Date().toISOString().slice(0, 10) + ".png";
    link.href = cv.toDataURL("image/png");
    link.click();
  }

  // =====================================================
  // 起動・共有リンクの取り込み
  // =====================================================
  // #d=... をデコードして、台帳に無いコンポーネント等を除いた state を返す（不正なら null）
  function decodeShareHash() {
    var m = location.hash.match(/[#&]d=([A-Za-z0-9_-]+)/);
    if (!m) return null;
    var st = CORE.shareDecode(m[1]);
    // 別プロバイダの図なら、正しいプロバイダの画面で開き直す（ハッシュは引き継ぐ）
    if (st && st.provider && st.provider !== PROVIDER &&
        ["aws", "gcp", "azure"].indexOf(st.provider) !== -1) {
      location.replace(location.pathname + (st.provider === "aws" ? "" : "?p=" + st.provider) + "#d=" + m[1]);
      return null;
    }
    if (st) delete st.provider;
    // 取り込み後はハッシュを消す（以後はこのブラウザの自動保存で管理）
    history.replaceState(null, "", location.pathname + location.search);
    if (!st) return null;
    st.nodes = st.nodes.filter(function (n) { return COMPS[n.c]; });
    st.groups = st.groups.filter(function (g) { return GKINDS[g.k]; });
    var ok = {};
    st.nodes.forEach(function (n) { ok[n.uid] = 1; });
    st.edges = st.edges.filter(function (e) { return ok[e.from] && ok[e.to]; });
    return st.nodes.length ? st : null;
  }
  function applyShared(st) {
    // 直前の作業があれば履歴に積む（Ctrl+Z で取り込み前に戻せる）
    if (state.nodes.length || state.groups.length) pushHist();
    state = st;
    sel = null;
    render();
    save();
    flashSave("共有された構成図を読み込みました ✓");
  }
  // ページを開いたまま共有リンクを貼られた場合（ハッシュだけの遷移は再読込されない）
  window.addEventListener("hashchange", function () {
    var st = decodeShareHash();
    if (st) applyShared(st);
  });

  // 凡例（線種ラベルはプロバイダごとに台帳から生成）
  function buildLegend() {
    var el = document.getElementById("canvasLegend");
    if (!el) return;
    var html = "";
    ["net", "iam", "attach"].forEach(function (key) {
      var et = ARCH.edgeTypes[key];
      if (!et) return;
      html += '<span class="lg-item"><svg width="26" height="6"><line x1="0" y1="3" x2="26" y2="3" stroke="' +
        et.png + '" stroke-width="1.6"' +
        (et.dash ? ' stroke-dasharray="' + et.dash.join(" ") + '"' : "") + '/></svg>' + esc(et.label) + "</span>";
    });
    html += '<span class="lg-item"><span class="lg-warn">!</span>注意</span>' +
      '<span class="lg-item"><span class="lg-warn lg-err">!</span>NG（できない接続/配置）</span>';
    el.innerHTML = html;
  }

  buildPalette();
  buildLegend();
  // 共有リンク（#d=...）からの読み込みを最優先。無ければ前回の作業 → 初期テンプレート
  var shared = decodeShareHash();
  if (shared) {
    load(); // 旧作業があれば state に読んでから applyShared が履歴に積む
    applyShared(shared);
  } else if (!load()) {
    loadTemplate(ARCH.templates[0], { initial: true });
  } else {
    render();
  }
  updateHistBtns();
})();
