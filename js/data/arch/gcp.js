// js/data/arch/gcp.js — 構成図ビルダー用 Google Cloud コンポーネント台帳
// UTF-8 BOMなし / learn は js/data/services/gcp.js の slug（learn/<slug>.html に解説ページがある）
window.CERT_ARCH = window.CERT_ARCH || {};
window.CERT_ARCH.gcp = {
  provider: "gcp",

  categories: [
    { id: "external",    label: "外部 / クライアント",     color: "#8c96ad" },
    { id: "compute",     label: "コンピューティング",      color: "#ff9a1f" },
    { id: "storage",     label: "ストレージ",              color: "#86c352" },
    { id: "database",    label: "データベース",            color: "#5e9bff" },
    { id: "network",     label: "ネットワーク / 配信",     color: "#a78bfa" },
    { id: "integration", label: "アプリケーション統合",    color: "#ec6f9c" },
    { id: "security",    label: "セキュリティ / 認証",     color: "#ff5d6c" },
    { id: "monitoring",  label: "管理 / 監視",             color: "#25c6f2" },
    { id: "analytics",   label: "分析",                    color: "#ffd166" },
    { id: "ml",          label: "機械学習 / AI",           color: "#3fe0a4" },
    { id: "devtools",    label: "開発者ツール / IaC",      color: "#b0bac9" }
  ],

  components: [
    // ---- 外部 ----
    { id: "user",     name: "ユーザー",        abbr: "USER", cat: "external", learn: null, desc: "ブラウザやモバイルアプリの利用者" },
    { id: "internet", name: "インターネット",  abbr: "NET",  cat: "external", learn: null, desc: "パブリックネットワーク" },
    { id: "onprem",   name: "オンプレミス",    abbr: "DC",   cat: "external", learn: null, desc: "自社データセンター・社内NW" },

    // ---- コンピューティング ----
    { id: "gce",       name: "Compute Engine",       abbr: "GCE", cat: "compute", learn: "compute-engine", desc: "仮想マシン（IaaS）" },
    { id: "mig",       name: "インスタンスグループ",  abbr: "MIG", cat: "compute", learn: "compute-engine", desc: "VM の自動増減・自動修復（MIG）" },
    { id: "gke",       name: "GKE",                  abbr: "GKE", cat: "compute", learn: "gke",            desc: "マネージド Kubernetes" },
    { id: "cloudrun",  name: "Cloud Run",            abbr: "RUN", cat: "compute", learn: "cloud-run",      desc: "コンテナのサーバーレス実行",
      scopeHint: "（Cloud Run はリージョンのサーバーレス基盤で動く。VPC 内のリソースへはダイレクト VPC 下り（egress）で届く）" },
    { id: "functions", name: "Cloud Run functions",  abbr: "FN",  cat: "compute", learn: "cloud-functions", desc: "サーバーレス関数（旧 Cloud Functions）" },
    { id: "appengine", name: "App Engine",           abbr: "GAE", cat: "compute", learn: "app-engine",     desc: "フルマネージドのアプリ実行基盤（PaaS）" },

    // ---- ストレージ ----
    { id: "gcs",       name: "Cloud Storage",  abbr: "GCS", cat: "storage", learn: "cloud-storage",   desc: "オブジェクトストレージ" },
    { id: "pd",        name: "Persistent Disk", abbr: "PD", cat: "storage", learn: "persistent-disk", desc: "VM 用ブロックストレージ" },
    { id: "filestore", name: "Filestore",      abbr: "FS",  cat: "storage", learn: null,              desc: "共有ファイルストレージ（NFS）",
      scopeHint: "（Filestore インスタンスは Google 管理側のネットワークにあり、VPC とはピアリングで繋がる。サブネットの中には描かない）" },

    // ---- データベース ----
    { id: "cloudsql",    name: "Cloud SQL",   abbr: "SQL", cat: "database", learn: "cloud-sql",     desc: "マネージドRDB（MySQL/PostgreSQL等）",
      scopeHint: "（Cloud SQL はユーザーの VPC 内ではなく Google 管理側にあり、プライベート サービス アクセスで VPC と繋ぐ。ここが AWS の RDS との大きな違い）" },
    { id: "spanner",     name: "Cloud Spanner", abbr: "SPN", cat: "database", learn: "cloud-spanner", desc: "グローバル分散RDB" },
    { id: "firestore",   name: "Firestore",   abbr: "FST", cat: "database", learn: "firestore",     desc: "サーバーレスNoSQL（ドキュメント）" },
    { id: "bigtable",    name: "Bigtable",    abbr: "BT",  cat: "database", learn: "bigtable",      desc: "ワイドカラムNoSQL（大規模・低遅延）" },
    { id: "memorystore", name: "Memorystore", abbr: "MEM", cat: "database", learn: null,            desc: "インメモリキャッシュ（Redis等）",
      scopeHint: "（Memorystore も Google 管理側にあり、プライベート サービス アクセス等で VPC から内部 IP 接続する）" },

    // ---- ネットワーク / 配信 ----
    { id: "glb",          name: "Cloud Load Balancing", abbr: "GLB", cat: "network", learn: "cloud-load-balancing", desc: "外部ロードバランサ（グローバル）",
      scopeHint: "（外部 ALB は VPC 内のリソースではなく、Google のグローバルフロントエンドで動く。VPC 内向けには「内部ロードバランサ」を使う）" },
    { id: "ilb",          name: "内部ロードバランサ",    abbr: "ILB", cat: "network", learn: "cloud-load-balancing", desc: "VPC 内部向けロードバランサ" },
    { id: "cdn",          name: "Cloud CDN",            abbr: "CDN", cat: "network", learn: "cloud-cdn",            desc: "CDN（エッジキャッシュ）" },
    { id: "dns",          name: "Cloud DNS",            abbr: "DNS", cat: "network", learn: null,                   desc: "DNS・ドメイン管理" },
    { id: "apigw",        name: "API Gateway",          abbr: "APIG", cat: "network", learn: null,                  desc: "API の公開・認証・管理" },
    { id: "cloudnat",     name: "Cloud NAT",            abbr: "NAT", cat: "network", learn: null,                   desc: "プライベート VM の外向き通信" },
    { id: "router",       name: "Cloud Router",         abbr: "CR",  cat: "network", learn: null,                   desc: "BGP 経路交換（VPN/Interconnect/NAT の土台）" },
    { id: "interconnect", name: "Cloud Interconnect",   abbr: "IC",  cat: "network", learn: null,                   desc: "オンプレとの専用線接続" },
    { id: "vpn",          name: "Cloud VPN",            abbr: "VPN", cat: "network", learn: null,                   desc: "オンプレとの IPsec VPN（HA VPN）" },
    { id: "psc",          name: "Private Service Connect", abbr: "PSC", cat: "network", learn: null,                desc: "マネージドサービスへの閉域接続点" },

    // ---- アプリケーション統合 ----
    { id: "pubsub",    name: "Pub/Sub",         abbr: "P/S", cat: "integration", learn: "pubsub", desc: "グローバルなメッセージング" },
    { id: "tasks",     name: "Cloud Tasks",     abbr: "TSK", cat: "integration", learn: null,     desc: "タスクキュー（HTTP ターゲット）" },
    { id: "scheduler", name: "Cloud Scheduler", abbr: "SCH", cat: "integration", learn: null,     desc: "cron スケジューラ" },
    { id: "workflows", name: "Workflows",       abbr: "WF",  cat: "integration", learn: null,     desc: "サーバーレスのワークフロー制御" },
    { id: "eventarc",  name: "Eventarc",        abbr: "EA",  cat: "integration", learn: null,     desc: "イベントルーティング（→ Cloud Run 等）" },

    // ---- セキュリティ / 認証 ----
    { id: "iam",              name: "Cloud IAM",          abbr: "IAM", cat: "security", learn: "gcp-iam",        desc: "権限・サービスアカウント管理" },
    { id: "identityplatform", name: "Identity Platform",  abbr: "IDP", cat: "security", learn: null,             desc: "アプリのユーザー認証（CIAM）" },
    { id: "kms",              name: "Cloud KMS",          abbr: "KMS", cat: "security", learn: "cloud-kms",      desc: "暗号鍵の管理" },
    { id: "secretmanager",    name: "Secret Manager",     abbr: "SCM", cat: "security", learn: "secret-manager", desc: "シークレットの保管・バージョン管理" },
    { id: "armor",            name: "Cloud Armor",        abbr: "ARM", cat: "security", learn: null,             desc: "WAF・DDoS 防御" },
    { id: "scc",              name: "Security Command Center", abbr: "SCC", cat: "security", learn: null,        desc: "脅威・脆弱性の一元監視" },

    // ---- 管理 / 監視 ----
    { id: "monitoring", name: "Cloud Monitoring", abbr: "MON", cat: "monitoring", learn: "cloud-monitoring", desc: "メトリクス・アラート" },
    { id: "logging",    name: "Cloud Logging",    abbr: "LOG", cat: "monitoring", learn: "cloud-logging",    desc: "ログ収集・保管・シンク" },
    { id: "trace",      name: "Cloud Trace",      abbr: "TRC", cat: "monitoring", learn: null,               desc: "分散トレーシング" },

    // ---- 分析 ----
    { id: "bigquery", name: "BigQuery", abbr: "BQ", cat: "analytics", learn: "bigquery", desc: "サーバーレスDWH（SQL分析）" },
    { id: "dataflow", name: "Dataflow", abbr: "DF", cat: "analytics", learn: "dataflow", desc: "ストリーム/バッチ処理（Apache Beam）" },
    { id: "dataproc", name: "Dataproc", abbr: "DP", cat: "analytics", learn: "dataproc", desc: "マネージド Spark/Hadoop" },

    // ---- 機械学習 / AI ----
    { id: "vertexai", name: "Vertex AI", abbr: "VAI", cat: "ml", learn: "vertex-ai", desc: "ML 構築・学習・推論（Gemini API 含む）" },

    // ---- 開発者ツール / IaC ----
    { id: "cloudbuild",       name: "Cloud Build",            abbr: "CB", cat: "devtools", learn: "cloud-build",       desc: "CI（ビルド・テスト）" },
    { id: "clouddeploy",      name: "Cloud Deploy",           abbr: "CD", cat: "devtools", learn: null,                desc: "CD（GKE/Cloud Run への継続的デリバリー）" },
    { id: "artifactregistry", name: "Artifact Registry",      abbr: "AR", cat: "devtools", learn: "artifact-registry", desc: "コンテナ/パッケージのレジストリ" },
    { id: "inframanager",     name: "Infrastructure Manager", abbr: "IM", cat: "devtools", learn: null,                desc: "IaC（Terraform ベースの構築）" }
  ],

  // グループ枠（クラウド境界・プロジェクト・VPC などの「囲い」）
  groupKinds: [
    { id: "gcp",     label: "Google Cloud",    color: "#5b8def" },
    { id: "project", label: "プロジェクト",    color: "#8c96ad" },
    { id: "region",  label: "リージョン",      color: "#25c6f2" },
    { id: "vpc",     label: "VPC ネットワーク", color: "#a78bfa" },
    { id: "subnet",  label: "サブネット",      color: "#86c352" },
    { id: "zone",    label: "ゾーン",          color: "#ffd166" }
  ],

  // ---- 配置スコープ ----
  // vpcScoped: VPC内のサブネットに置くリソース / anyScope: どちらでも不自然でないもの
  // それ以外は「リージョン/グローバル」扱い。GCP はマネージドサービスの大半が VPC の外にいる
  //（Cloud SQL すら別ネットワーク）点が AWS との最大の違いで、ここを指摘で学ばせる。
  vpcScoped: ["gce", "gke", "ilb"],
  anyScope:  ["mig", "pd", "cloudnat", "router", "vpn", "interconnect", "psc"],

  // ---- 配置トポロジ ----
  topology: {
    cloud: "gcp", network: "vpc", public: null, private: null,
    subnets: ["subnet"],
    cloudName: "Google Cloud",
    cloudFrame: "「Google Cloud」枠",
    networkFrame: "VPC",
    regionHint: "（VPC から閉域で使う場合は限定公開の Google アクセスか Private Service Connect 経由）"
  },
  externalIngressIds: ["user", "internet"],

  nodeRules: [
    { c: "cloudnat", inKinds: ["subnet"], msg: "Cloud NAT はサブネットの中に置くリソースではなく、Cloud Router に紐づくリージョナルな機能。サブネットの外（VPC 内）に描くのが正確。" }
  ],

  groupNesting: [
    { child: ["subnet"], parent: "vpc", msg: "サブネットは VPC ネットワークの内側に描く。VPC 枠の中へ移動しよう。" },
    { child: ["vpc"], parent: "gcp", msg: "VPC ネットワークは「Google Cloud」枠の内側に描こう。" },
    { child: ["project"], parent: "gcp", msg: "プロジェクトは「Google Cloud」枠の内側に描こう。" }
  ],

  edgeRules: [
    { type: "peerOnly", c: "pd", allow: ["gce", "gke"], msg: "この接続はできない。Persistent Disk は VM（Compute Engine / GKE ノード）にアタッチして使うブロックストレージで、他のサービスや外部から直接アクセスする手段がない。共有が必要なら Filestore か Cloud Storage を使う。" },
    { type: "noExternal", c: "filestore", msg: "この接続はできない。Filestore は VPC から内部 IP で NFS マウントするストレージで、インターネットから直接マウントできない。" },
    { type: "noExternal", c: "cloudnat", msg: "この接続はできない。Cloud NAT は「中から外へ」の送信専用で、外部からの着信の入口にはならない。受信の入口は Cloud Load Balancing にする。" }
  ],

  // ---- 線種（接続タイプ）----
  edgeTypes: {
    net:    { label: "ネットワーク経路",       color: "rgba(150,165,200,0.6)", png: "rgba(150,165,200,0.7)", dash: null },
    iam:    { label: "IAM / サービスアカウント", color: "#3fe0a4",             png: "rgba(63,224,164,0.8)",   dash: [6, 4] },
    attach: { label: "関連付け / 設定",         color: "#a78bfa",              png: "rgba(167,139,250,0.8)",  dash: [2, 4] }
  },

  // 接続ナレッジベース。キーは "from>to"。
  // l = 線上に出す短いラベル / d = インスペクタに出す解説 / t = 線種（net | iam | attach）
  links: {
    // ---- 入口（ユーザー → 配信層）----
    "user>dns":      { t: "net", l: "名前解決", d: "Cloud DNS の公開ゾーンにレコードを置き、独自ドメインをロードバランサの IP に向ける。100% SLA を掲げる数少ないサービスという小ネタも試験で出る。" },
    "user>glb":      { t: "net", l: "HTTPS", d: "外部アプリケーション LB はグローバルのエニーキャスト IP を 1 つ持ち、世界中どこからでも最寄りの Google フロントエンドで TLS を終端する。リージョンごとに LB を並べてDNSで振り分ける AWS 型と違い、1 つの IP で済むのが GCP らしさ。" },
    "user>apigw":    { t: "net", l: "API呼び出し", d: "API Gateway が API キー検証・JWT 認証・レート制限を入口で済ませ、バックエンド（Cloud Run / functions）に渡す。OpenAPI 定義で構成する。" },
    "user>cloudrun": { t: "net", l: "HTTPS", d: "Cloud Run はデプロイ直後から *.run.app の公開 URL を持つ。未認証アクセスを許可するか、IAM（roles/run.invoker）で呼び出し元を制限するかを選ぶ。本番では手前に LB + Cloud Armor を置くことが多い。" },
    "user>appengine": { t: "net", l: "HTTPS", d: "App Engine は *.appspot.com で公開される PaaS。トラフィック分割でカナリアリリースができるのが古参サービスながらの強み。" },
    "user>identityplatform": { t: "net", l: "サインイン", d: "Identity Platform（Firebase Auth の企業版）でサインインし、ID トークンを受け取る。以降の API 呼び出しにトークンを添え、API Gateway や Cloud Run 側で検証する。" },
    "user>gcs":      { t: "net", l: "署名付きURL", d: "バケットを公開するのは原則避け、期限付きの署名付き URL でオブジェクト単位のアクセスを渡す。サイト配信なら LB のバックエンドバケット + Cloud CDN が王道。" },

    // ---- DNS / CDN / WAF と LB の関係 ----
    "dns>glb":   { t: "attach", l: "Aレコード", d: "ロードバランサの静的 IP に A レコードを向ける。グローバル LB は IP が 1 つなので、リージョンごとの使い分けやフェイルオーバー用の DNS 設定が要らない。" },
    "cdn>glb":   { t: "attach", l: "バックエンドで有効化", d: "Cloud CDN は独立したエンドポイントを持たず、外部 LB のバックエンドサービス／バックエンドバケットの設定で「CDN を有効にする」として動く。CloudFront のような別ドメインが生えない点が AWS との違い。" },
    "armor>glb": { t: "attach", l: "セキュリティポリシー", d: "Cloud Armor のセキュリティポリシーを LB のバックエンドサービスに関連付ける。SQLi/XSS の WAF ルール、IP 許可拒否、レートベース制限をエッジで効かせる。" },

    // ---- LB → バックエンド ----
    "glb>gcs":      { t: "net", l: "バックエンドバケット", d: "静的サイト配信の王道。LB のバックエンドバケットに GCS を指定し、Cloud CDN を有効化する。バケットを直接公開せず LB 経由に揃えると、独自ドメイン・HTTPS・WAF をまとめて管理できる。" },
    "glb>mig":      { t: "net", l: "バックエンドサービス", d: "マネージドインスタンスグループをバックエンドサービスに登録し、ヘルスチェックに通った VM にだけ振り分ける。ヘルスチェックの送信元 IP レンジ（35.191.0.0/16 等）をファイアウォールで許可するのが定番のハマりどころ。" },
    "glb>gce":      { t: "net", l: "バックエンド", d: "単体 VM を直接バックエンドにもできるが、本番はインスタンスグループ（MIG）経由が基本。自動修復もスケールも MIG が面倒を見る。" },
    "glb>cloudrun": { t: "net", l: "サーバーレスNEG", d: "サーバーレス NEG を作って Cloud Run を LB のバックエンドにする。これで独自ドメイン・Cloud Armor・Cloud CDN・複数リージョン分散を Cloud Run に被せられる。試験頻出の構成。" },
    "glb>gke":      { t: "net", l: "Ingress/Gateway", d: "GKE の Ingress（または Gateway API）リソースを作ると、背後でこの外部 LB が自動構成される。コンテナネイティブ負荷分散なら Pod へ直接振り分けられる。" },
    "ilb>gce":      { t: "net", l: "内部転送ルール", d: "VPC 内部の RFC1918 アドレスで受ける内部 LB。マイクロサービス間や、オンプレから Interconnect 越しに呼ぶ社内 API の入口に使う。" },
    "ilb>mig":      { t: "net", l: "バックエンドサービス", d: "内部 LB のバックエンドも MIG が基本。3層構成の Web 層→アプリ層の間に置いて、内部通信にもヘルスチェックと分散を効かせる。" },

    // ---- API Gateway → バックエンド ----
    "apigw>cloudrun":  { t: "iam", l: "バックエンド", d: "API Gateway がゲートウェイ用サービスアカウントで Cloud Run を呼び出す。Cloud Run 側は未認証を閉じて run.invoker をこの SA にだけ付与すると、入口を API Gateway に一本化できる。" },
    "apigw>functions": { t: "iam", l: "バックエンド", d: "OpenAPI 定義の x-google-backend で関数を指定する。認証・レート制限・API キー管理をゲートウェイに寄せ、関数本体をシンプルに保つ。" },
    "apigw>identityplatform": { t: "attach", l: "JWT検証", d: "Identity Platform が発行した ID トークンを API Gateway の securityDefinitions で検証する。バックエンドに認証コードを書かずに済む。" },

    // ---- コンピューティング → データ ----
    "gce>cloudsql":    { t: "net", l: "プライベートIP接続", d: "プライベート サービス アクセスを構成し、内部 IP で Cloud SQL に繋ぐのが定石。パブリック IP 経由なら Cloud SQL Auth Proxy を使い、IP 許可リスト直開放は避ける。Cloud SQL が VPC の「中」ではなく「隣」にいる感覚が GCP 理解の肝。" },
    "gce>gcs":         { t: "iam", l: "サービスアカウント", d: "VM にサービスアカウントを付け、IAM ロール（storage.objectViewer 等）でアクセスする。SA キーファイルを VM に置くのはアンチパターンとして頻出。" },
    "gce>memorystore": { t: "net", l: "内部IP接続", d: "セッションや頻繁に読むデータをキャッシュして DB の負荷を下げる。Memorystore は内部 IP のみで、同じリージョン・承認されたネットワークからアクセスする。" },
    "gce>pd":          { t: "attach", l: "アタッチ", d: "Persistent Disk はゾーンリソースで、基本は同一ゾーンの VM にアタッチする。スナップショットでバックアップ、リージョナル PD で 2 ゾーン同期レプリケーションもできる。" },
    "gce>filestore":   { t: "net", l: "NFSマウント", d: "複数の VM から同じ Filestore を NFS マウントして共有する。内部 IP 経由なので、同じ VPC（またはピアリング先）からしか届かない。" },
    "gce>secretmanager": { t: "iam", l: "シークレット取得", d: "DB パスワードや API キーは Secret Manager から実行時に取得する。コードや環境変数に平文で置かず、SA に secretAccessor を付与して取りに行く。" },
    "gce>cloudnat":    { t: "net", l: "外向き通信", d: "外部 IP を持たない VM の送信は Cloud NAT を経由して外に出る。AWS の NAT Gateway と違いサブネットに「置く」実体ではなく、リージョン単位の構成として効く。戻り方向の着信はできない。" },
    "gce>logging":     { t: "iam", l: "Opsエージェント", d: "Ops エージェントを入れるとアプリログとメモリ等の詳細メトリクスが Cloud Logging / Monitoring に送られる。エージェントは VM のサービスアカウント権限で書き込む。" },
    "gce>bigquery":    { t: "iam", l: "クエリ実行", d: "VM のサービスアカウントに BigQuery のジョブ実行とデータ参照のロールを付けてクエリする。アプリから直接叩くより、ジョブはバッチに寄せてスロット消費を平準化するのが運用の知恵。" },
    "gke>artifactregistry": { t: "iam", l: "イメージpull", d: "ノードのサービスアカウントに artifactregistry.reader を付けてイメージを取得する。gcr.io（Container Registry）は廃止済みで、現行は Artifact Registry 一択。" },
    "gke>cloudsql":    { t: "net", l: "プライベートIP接続", d: "考え方は GCE と同じ。Pod からは Cloud SQL Auth Proxy をサイドカーにするか、プライベート サービス アクセスの内部 IP に直接繋ぐ。" },
    "mig>gce":         { t: "attach", l: "インスタンステンプレート", d: "MIG はインスタンステンプレートを元に VM を増減させる。ヘルスチェック失敗時の自動再作成（自動修復）と、負荷に応じたオートスケールが基本機能。" },

    // ---- サーバーレス → データ ----
    "cloudrun>cloudsql":      { t: "net", l: "Cloud SQL接続", d: "Cloud Run には Cloud SQL 接続の組み込み設定があり、Unix ソケット経由で安全に繋がる。プライベート IP で繋ぐならダイレクト VPC 下り（egress）を構成する。" },
    "cloudrun>firestore":     { t: "iam", l: "SA権限", d: "Cloud Run のサービスアカウントに datastore.user を付けてアクセスする。サーバーレス + Firestore は接続プールの心配が無い組み合わせとして定番。" },
    "cloudrun>pubsub":        { t: "iam", l: "発行", d: "リクエストを受けたらメッセージを Pub/Sub に積んで即応答を返し、重い処理は後続に任せる非同期化の第一歩。SA に pubsub.publisher が必要。" },
    "cloudrun>secretmanager": { t: "iam", l: "シークレット参照", d: "Secret Manager のシークレットを環境変数またはボリュームとして Cloud Run にマウントできる。リビジョン単位でバージョンを固定できるのが運用上の利点。" },
    "cloudrun>vertexai":      { t: "iam", l: "API呼び出し", d: "Cloud Run のバックエンドから Vertex AI の Gemini API を呼ぶ生成 AI 構成。SA に aiplatform.user を付与し、API キーをコードに埋め込まない。" },
    "functions>gcs":          { t: "iam", l: "SA権限", d: "関数のサービスアカウントに必要最小限のストレージロールを付けて読み書きする。処理結果を同じバケットに書き戻すと再トリガーの無限ループになるので、出力先は分ける。" },
    "functions>firestore":    { t: "iam", l: "SA権限", d: "軽い CRUD やイベント処理の定番ペア。Firestore はコネクションレスなので、関数の同時実行が跳ねても接続枯渇の心配がない。" },
    "functions>pubsub":       { t: "iam", l: "発行", d: "関数から次のトピックへ発行してイベントチェーンを作る。やり過ぎると追跡が難しくなるので、フローが複雑になってきたら Workflows に乗せ替える。" },
    "appengine>firestore":    { t: "iam", l: "SA権限", d: "App Engine + Firestore（旧 Datastore）は GCP 最古参のサーバーレス組み合わせ。デフォルト SA が広い権限を持ちがちなので、本番では最小権限の専用 SA に替える。" },

    // ---- イベント駆動 ----
    "gcs>functions":    { t: "attach", l: "イベントトリガー", d: "オブジェクトの finalize（作成完了）等をトリガーに関数を起動する。実体は Eventarc 経由の配送。画像のサムネイル生成が定番例。" },
    "gcs>eventarc":     { t: "attach", l: "イベント発火", d: "GCS のオブジェクトイベントを Eventarc が受けて、Cloud Run などへルーティングする。トリガーにフィルタ（バケット・イベント種別）を定義する。" },
    "pubsub>functions": { t: "attach", l: "push起動", d: "トピックへの発行をトリガーに関数が起動する。少なくとも 1 回（at-least-once）配信なので、処理は冪等に書くのが鉄則。" },
    "pubsub>cloudrun":  { t: "attach", l: "pushサブスクリプション", d: "push サブスクリプションのエンドポイントに Cloud Run の URL を指定する。OIDC トークン付き push にして、Cloud Run 側で Pub/Sub からの呼び出しだけを許可するのがセキュアな形。" },
    "pubsub>dataflow":  { t: "attach", l: "サブスクライブ", d: "Dataflow のストリーミングジョブがサブスクリプションから読み続ける。Pub/Sub → Dataflow → BigQuery は GCP ストリーミング処理の代名詞的パイプライン。" },
    "pubsub>bigquery":  { t: "attach", l: "BigQueryサブスクリプション", d: "変換が不要なら Dataflow を挟まず、BigQuery サブスクリプションでトピックから直接テーブルに書ける。コストも運用もこちらが軽い。「変換が要るか」で Dataflow 経由と使い分けるのが試験ポイント。" },
    "eventarc>cloudrun": { t: "attach", l: "イベント配送", d: "監査ログ・GCS・Pub/Sub など 90 以上のソースのイベントを Cloud Run に届ける統一レイヤー。「○○が起きたら Cloud Run を動かす」はまず Eventarc を疑う。" },
    "scheduler>pubsub":  { t: "attach", l: "定期発行", d: "cron 式のスケジュールでトピックにメッセージを発行する。Scheduler → Pub/Sub → 処理系、が GCP の夜間バッチ起動の定番形。" },
    "scheduler>functions": { t: "attach", l: "定期HTTP起動", d: "スケジュールで関数の HTTP エンドポイントを直接叩く。OIDC トークン認証を付けて、外部からの不正な起動と区別する。" },
    "scheduler>cloudrun": { t: "attach", l: "定期HTTP起動", d: "Cloud Run のジョブやサービスを定時起動する。コンテナで重めのバッチを回すなら Cloud Run jobs + Scheduler の組み合わせが現行の推奨。" },
    "tasks>cloudrun":    { t: "attach", l: "HTTPタスク", d: "Cloud Tasks はレート制御・リトライ・実行時刻指定つきの HTTP タスクキュー。Pub/Sub との違い（個別タスクの制御 vs ファンアウト配信）が試験で問われる。" },
    "workflows>cloudrun": { t: "iam", l: "ステップ呼び出し", d: "Workflows の各ステップから Cloud Run を HTTP 呼び出しする。リトライ・条件分岐・並列をYAML定義で書け、サービス間の糊コードを減らせる。" },
    "workflows>functions": { t: "iam", l: "ステップ呼び出し", d: "複数の関数を順序立てて呼ぶならイベントチェーンより Workflows が見通しやすい。実行状態が可視化され、失敗ステップからの再開もできる。" },

    // ---- 分析パイプライン ----
    "dataflow>bigquery": { t: "iam", l: "ストリーミング挿入", d: "Dataflow が Storage Write API で BigQuery へ書き込む。Pub/Sub からの読み・変換・BQ への書き、で一つの典型パイプラインが完成する。ワーカーのSAに bigquery.dataEditor が必要。" },
    "dataflow>gcs":      { t: "iam", l: "読み書き", d: "バッチジョブの入出力や一時ファイル置き場として GCS を使う。ストリーミングの失敗レコードを GCS に退避させるデッドレター構成も定番。" },
    "gcs>bigquery":      { t: "iam", l: "ロード/外部テーブル", d: "GCS から BigQuery へはロードジョブ（無料）か、外部テーブルとして直接クエリ。頻繁に読むならロードして列指向ストレージに乗せた方が速くて安い。" },
    "gcs>dataproc":      { t: "iam", l: "GCSコネクタ", d: "Dataproc は HDFS の代わりに GCS をストレージにする（ストレージとコンピュートの分離）。これでクラスタをジョブごとに使い捨てでき、費用を大きく削れる。" },
    "bigquery>vertexai": { t: "iam", l: "学習データ", d: "BigQuery のテーブルを Vertex AI の学習データソースとして直接指定できる。BigQuery ML でSQLだけでモデルを作る選択肢との使い分けが試験で問われる。" },
    "vertexai>gcs":      { t: "iam", l: "データ/モデル", d: "学習データの読み込みもモデル成果物の保存も GCS。学習ジョブには GCS への権限を持つサービスアカウントを渡す。" },

    // ---- ハイブリッド接続 ----
    "onprem>interconnect": { t: "net", l: "専用線", d: "Dedicated（10/100Gbps 直結）か Partner（50Mbps〜）の専用線でオンプレと接続する。インターネットを通らず帯域が安定。SLA を求める本番ハイブリッドの第一候補。" },
    "onprem>vpn":          { t: "net", l: "IPsecトンネル", d: "HA VPN なら 2 トンネル構成で 99.99% SLA。帯域は太くないので、Interconnect 導入前のつなぎや、専用線のバックアップ経路として使うのが定石。" },
    "interconnect>router": { t: "net", l: "BGPピアリング", d: "Cloud Router がオンプレのルーターと BGP で経路を交換する。静的ルートを手で書かずに済み、ネットワーク追加が双方に自動伝搬する。" },
    "vpn>router":          { t: "net", l: "BGPピアリング", d: "HA VPN は Cloud Router との BGP が必須。トンネル障害時の経路切り替えも BGP が面倒を見る。" },
    "router>cloudnat":     { t: "attach", l: "NAT構成", d: "Cloud NAT は Cloud Router 上に定義するリージョナルな構成。NAT 用の IP プールの払い出しとログ記録もここで設定する。" },
    "router>gce":          { t: "net", l: "経路広報", d: "Cloud Router が学習したオンプレ経路は VPC のルートとして配られ、VM に追加設定なしで届くようになる。VM 個別の設定は不要。" },
    "psc>cloudsql":        { t: "attach", l: "閉域接続", d: "Private Service Connect 経由で Cloud SQL に繋ぐ現行推奨の閉域構成。プライベート サービス アクセスと違って IP レンジの事前予約が不要で、VPC ピアリングの上限も食わない。" },
    "gce>psc":             { t: "net", l: "PSCエンドポイント", d: "VPC 内に作った PSC エンドポイント（内部 IP）宛てに接続すると、Google API やマネージドサービスへ閉域で届く。外部 IP なしの VM から Google サービスを使う時の現行解。" },

    // ---- CI/CD ----
    "cloudbuild>artifactregistry": { t: "iam", l: "イメージpush", d: "Cloud Build がビルドしたコンテナイメージを Artifact Registry に push する。ビルド用 SA に artifactregistry.writer を付与。脆弱性スキャンもレジストリ側で有効化できる。" },
    "cloudbuild>cloudrun":  { t: "iam", l: "デプロイ", d: "ビルド成功後に gcloud run deploy を実行する典型 CI/CD。トリガーは GitHub 連携の push/PR。デプロイ権限（run.developer + SA ユーザー）の付与漏れが最初のハマりどころ。" },
    "cloudbuild>gke":       { t: "iam", l: "デプロイ", d: "Cloud Build から kubectl/skaffold で GKE に直接適用する小規模構成。環境昇格や承認を挟みたくなったら Cloud Deploy に移行する。" },
    "cloudbuild>clouddeploy": { t: "attach", l: "リリース作成", d: "CI（Cloud Build）が成果物からリリースを作成し、CD（Cloud Deploy）に引き渡す。ビルドとデリバリーの責務を分けるのが現行のベストプラクティス。" },
    "clouddeploy>gke":      { t: "attach", l: "段階的デリバリー", d: "dev→staging→prod のターゲットを定義し、承認ゲートやカナリアを挟みながら GKE へ昇格デプロイする。ロールバックもリリース単位で一発。" },
    "clouddeploy>cloudrun": { t: "attach", l: "段階的デリバリー", d: "Cloud Run へも同じパイプラインで段階デプロイできる。トラフィック分割と組み合わせたカナリアリリースが定番。" },
    "inframanager>gce":     { t: "attach", l: "プロビジョニング", d: "Terraform 構成から Google マネージドでリソースを作成・更新する IaC サービス。Deployment Manager は廃止済みで、試験でも IaC の答えは Terraform / Infrastructure Manager になった。" },

    // ---- 監視・運用 ----
    "monitoring>mig":    { t: "attach", l: "指標→オートスケール", d: "MIG のオートスケールは CPU 使用率のほか、Cloud Monitoring のカスタム指標（キュー長など）でも駆動できる。スケールイン時の安定化期間も忘れずに設定する。" },
    "monitoring>pubsub": { t: "attach", l: "アラート通知", d: "アラートポリシーの通知チャネルに Pub/Sub を指定し、インシデント情報を後続（Chat 通知や自動修復の関数）へ流す。" },
    "logging>bigquery":  { t: "attach", l: "ログシンク", d: "ログルーターのシンクで対象ログを BigQuery にエクスポートし、SQL で分析する。組織単位の集約シンクで全プロジェクトの監査ログを一箇所に集めるのが試験頻出。" },
    "logging>gcs":       { t: "attach", l: "ログシンク（長期保管）", d: "監査やコンプライアンス用の長期保管は GCS シンクへ。Coldline/Archive クラスとライフサイクルルールで保管コストを最小化する。" },
    "logging>pubsub":    { t: "attach", l: "ログシンク（外部連携）", d: "Splunk 等の外部 SIEM へログを流すときは Pub/Sub シンクが受け渡し点になる。リアルタイム性が要る連携はこの経路。" }
  },

  // links に無い組み合わせのフォールバック（カテゴリで判定）
  fallbackHints: [
    { cat: "monitoring", t: "attach", l: "監視/記録", d: "監視系サービスとの接続。GCP は多くのサービスが Cloud Logging / Monitoring に標準で計装済みで、明示的な設定なしにログ・メトリクスが流れることが多い。" },
    { cat: "security",   t: "iam", l: "認証/権限", d: "セキュリティ系サービスとの接続。GCP では「どのサービスアカウントに、どの IAM ロールを付けるか」がほぼすべての答えになる。" }
  ],
  fallbackGeneric: { t: null, l: "", d: "この組み合わせの代表パターンはまだ未収録。実際に繋ぐ場合は、API 系サービスならサービスアカウントの IAM ロール、VPC 内の通信ならファイアウォールルール、のどちらが必要かをまず切り分ける。" },

  // テンプレート（nodes の x,y はキャンバス座標 / edges は nodes 配列の index ペア）
  templates: [
    {
      id: "3tier",
      name: "3層Webアプリ（GLB + MIG + Cloud SQL）",
      groups: [
        { k: "gcp",    x: 220, y: 30,  w: 1340, h: 660 },
        { k: "vpc",    x: 640, y: 180, w: 560,  h: 460 },
        { k: "subnet", x: 680, y: 240, w: 480,  h: 360 }
      ],
      nodes: [
        { c: "user",       x: 60,   y: 280 },
        { c: "dns",        x: 260,  y: 80  },
        { c: "armor",      x: 260,  y: 480 },
        { c: "glb",        x: 420,  y: 280 },
        { c: "mig",        x: 720,  y: 280 },
        { c: "gce",        x: 940,  y: 280 },
        { c: "gce",        x: 940,  y: 460 },
        { c: "cloudsql",   x: 1300, y: 280 },
        { c: "memorystore", x: 1300, y: 460 },
        { c: "logging",    x: 1300, y: 90  }
      ],
      edges: [[0,1],[1,3],[0,3],[2,3],[3,4],[4,5],[4,6],[5,7],[5,8],[5,9]]
    },
    {
      id: "serverless",
      name: "サーバーレスAPI（API Gateway + Cloud Run + Firestore）",
      groups: [
        { k: "gcp", x: 230, y: 60, w: 1100, h: 500 }
      ],
      nodes: [
        { c: "user",             x: 60,   y: 280 },
        { c: "identityplatform", x: 280,  y: 440 },
        { c: "apigw",            x: 280,  y: 280 },
        { c: "cloudrun",         x: 520,  y: 280 },
        { c: "firestore",        x: 760,  y: 160 },
        { c: "pubsub",           x: 760,  y: 400 },
        { c: "cloudrun",         x: 990,  y: 400 },
        { c: "secretmanager",    x: 520,  y: 110 }
      ],
      edges: [[0,1],[0,2],[2,1],[2,3],[3,7],[3,4],[3,5],[5,6],[6,4]]
    },
    {
      id: "static-site",
      name: "静的サイト配信（GCS + Cloud CDN）",
      groups: [
        { k: "gcp", x: 240, y: 40, w: 1000, h: 520 }
      ],
      nodes: [
        { c: "user",  x: 60,  y: 250 },
        { c: "dns",   x: 300, y: 90  },
        { c: "armor", x: 300, y: 420 },
        { c: "cdn",   x: 560, y: 90  },
        { c: "glb",   x: 560, y: 250 },
        { c: "gcs",   x: 880, y: 250 }
      ],
      edges: [[0,1],[0,4],[1,4],[3,4],[2,4],[4,5]]
    },
    {
      id: "streaming",
      name: "ストリーミング分析（Pub/Sub + Dataflow + BigQuery）",
      groups: [
        { k: "gcp", x: 250, y: 40, w: 1330, h: 600 }
      ],
      nodes: [
        { c: "user",     x: 60,   y: 280 },
        { c: "cloudrun", x: 300,  y: 280 },
        { c: "pubsub",   x: 560,  y: 280 },
        { c: "dataflow", x: 820,  y: 180 },
        { c: "bigquery", x: 1110, y: 180 },
        { c: "gcs",      x: 1110, y: 420 },
        { c: "vertexai", x: 1380, y: 180 }
      ],
      edges: [[0,1],[1,2],[2,3],[3,4],[3,5],[2,4],[4,6]]
    },
    {
      id: "hybrid",
      name: "ハイブリッド接続（Interconnect + Cloud Router）",
      groups: [
        { k: "gcp",    x: 340, y: 40,  w: 1140, h: 680 },
        { k: "vpc",    x: 720, y: 100, w: 700,  h: 560 },
        { k: "subnet", x: 980, y: 160, w: 400,  h: 440 }
      ],
      nodes: [
        { c: "onprem",       x: 60,   y: 340 },
        { c: "interconnect", x: 400,  y: 220 },
        { c: "vpn",          x: 400,  y: 480 },
        { c: "router",       x: 770,  y: 340 },
        { c: "cloudnat",     x: 770,  y: 540 },
        { c: "gce",          x: 1040, y: 250 },
        { c: "gce",          x: 1040, y: 460 }
      ],
      edges: [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[3,6]]
    },
    {
      id: "cicd",
      name: "CI/CD（Cloud Build + Cloud Deploy）",
      groups: [
        { k: "gcp",    x: 240,  y: 40,  w: 1280, h: 640 },
        { k: "vpc",    x: 1080, y: 300, w: 400,  h: 340 },
        { k: "subnet", x: 1110, y: 360, w: 340,  h: 250 }
      ],
      nodes: [
        { c: "cloudbuild",       x: 300,  y: 300 },
        { c: "artifactregistry", x: 560,  y: 140 },
        { c: "clouddeploy",      x: 560,  y: 460 },
        { c: "cloudrun",         x: 850,  y: 300 },
        { c: "gke",              x: 1180, y: 440 }
      ],
      edges: [[0,1],[0,2],[2,3],[2,4],[4,1]]
    }
  ]
};
