# ADS.md — 広告を導入するときの手順

サイトは**広告対応済みの構造**になっている。広告を入れるときにコードの仕様変更は不要で、
用意済みのスロットにタグを貼るだけでよい。

## なぜ「1問 = 1ページ遷移」なのか（重要・変更禁止）

`js/quiz.js` は SPA 的な画面差し替えではなく、**問題ごとに実ページ遷移**する設計
（`exam.html?exam=<id>&q=<n>` → `&q=<n+1>` → `&view=result`）。

- 広告（AdSense 等）はページビューごとに新しいインプレッションが発生する。
  1回の演習（例: 25問）で 25+2 ページビューになり、広告表示回数が自然に増える。
- **JSで広告ユニットだけをリロードする・クリックを誘導する等の小細工は
  AdSense ポリシー違反**（アカウント停止リスク）。実ナビゲーションなら正当。
- 演習の途中状態は `sessionStorage`（`cloudcert:session:<exam-id>`）が持っているため、
  ページ遷移しても回答状況は失われない。`finalized` フラグにより結果画面を
  リロードしても履歴・苦手プールが二重記録されない。

この設計を SPA に戻すと広告収益とポリシー適合性の両方が壊れる。**戻さないこと。**

## 用意済みスロット

| スロット | 場所 | 想定サイズ | 表示条件 |
|---|---|---|---|
| `#adRailLeft` / `#adRailRight` | `index.html` / `exam.html`（`<aside class="ad-rail">`） | 160×600 スカイスクレイパー | 画面幅 ≥1320px **かつ** 中身があるとき（`:empty` で自動制御） |
| `#adInline` | `exam.html` の問題カード直下 | レスポンシブ横長 | 中身があるとき |

中身が空のうちは CSS（`:empty`）で完全に消えるため、**現状のままで見た目への影響はゼロ**。

## 導入手順（AdSense の例）

1. AdSense 審査に通す（独自ドメイン推奨。GitHub Pages なら `CNAME` 設定）。
2. サイトルートに `ads.txt` を置く:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. `index.html` と `exam.html` の `<head>` に AdSense スクリプトタグを追加。
4. 各スロットの中に広告ユニットタグを貼る:
   ```html
   <aside class="ad-rail left" id="adRailLeft">
     <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-…"
          data-ad-slot="…" data-ad-format="vertical"></ins>
   </aside>
   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   ```
   `aria-hidden="true"` はタグを入れるときに外すこと。
5. `.ad-rail` の表示閾値（1320px）やサイズを変えたい場合は `css/style.css` の
   「広告スロット」セクションだけを触る。

## ポリシー上の注意

- 広告と問題の選択肢が誤クリックされる距離に置かない（`#adInline` は
  カードの外・下にあるので現状の位置なら安全）。
- 「広告を見たら解説表示」のようなインセンティブ付与は禁止。
- 1ページの広告量はコンテンツ量を超えないこと（問題1問＋解説なら
  レール2枠＋インライン1枠が上限目安）。
