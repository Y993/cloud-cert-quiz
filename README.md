# CLOUDCERT_ — クラウド資格 演習ターミナル

AWS / GCP / Azure のクラウド資格を**本試験レベルのシナリオ問題**で演習できる静的サイト。

## 特徴

- 完全静的（HTML/CSS/JS のみ）。ビルド不要、`index.html` をブラウザで開くだけで動作（`file://` 対応）
- GitHub Pages 等にそのまま配置してホスト可能
- スマホ / PC レスポンシブ対応
- 練習モード（1問ごとに解説）と模試モード（一括採点）
- ドメイン別正答率の可視化、全問解説レビュー
- **挑戦履歴の保存**（試験ごとに最新30件、スタート画面に表示）
- **間違えた問題の復習**（不正解は自動で苦手プールに記録。出題範囲「間違えた問題のみ」で復習でき、正解すると自動でプールから外れる）
- 永続化はすべて localStorage（`cloudcert:history:<exam-id>` / `cloudcert:wrong:<exam-id>`）。サーバー不要
- **1問 = 1ページ遷移**（`exam.html?exam=<id>&q=<n>`）。途中状態は sessionStorage に保持され、リロード・戻る・中断再開に対応。広告導入時にPVが問題ごとに発生する設計（→ [docs/ADS.md](docs/ADS.md)）
- 広告スロット実装済み（空の間は自動非表示。タグを貼るだけで有効化）

## ファイル構成

| パス | 役割 |
|---|---|
| `index.html` | LP（試験カタログ） |
| `exam.html` | 演習プレイヤー（`?exam=<exam-id>`） |
| `css/style.css` | 全スタイル |
| `js/main.js` | LP描画・フィルター・演出 |
| `js/quiz.js` | 演習エンジン |
| `js/data/manifest.js` | 試験カタログ（試験の追加はここ） |
| `js/data/exams/*.js` | 問題データ（1試験1ファイル） |
| `docs/ADDING_EXAMS.md` | **問題・試験の追加手順と品質基準（必読）** |

## 試験・問題の追加方法

→ [docs/ADDING_EXAMS.md](docs/ADDING_EXAMS.md) を参照。コード変更不要、データファイル追加＋マニフェスト1エントリで完了。

## 現在の収録状況

- ✅ **LIVE 6試験・計900問**（各150問・本試験レベルのシナリオ問題）
  - AWS: CLF-C02 / SAA-C03 / SAP-C02
  - GCP: CDL / ACE
  - Azure: AZ-900
- 🔜 残り39試験をカタログ登録済み（COMING SOON表示）
  - AWS: AIF / DVA / SOA / DEA / MLA / DOP / ANS / SCS / MLS
  - GCP: GenAI Leader / ADP / PCA / PDE / PCD / DevOps / Security / Network / MLE / Database / Workspace
  - Azure: AI-900 / DP-900 / SC-900 / AZ-104 / AZ-204 / AZ-500 / AZ-700 / AZ-140 / AZ-800 / AI-102 / DP-100 / DP-300 / DP-600 / DP-700 / SC-200 / SC-300 / AZ-305 / AZ-400 / SC-100

## 広告について

広告スロット（左右レール＋問題下インライン）は実装済みで、空の間は自動的に非表示。
導入手順と「1問=1ページ遷移」設計の理由は [docs/ADS.md](docs/ADS.md) を参照。
