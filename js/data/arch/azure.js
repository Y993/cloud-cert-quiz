// js/data/arch/azure.js — 構成図ビルダー用 Azure コンポーネント台帳
// UTF-8 BOMなし / learn は js/data/services/azure.js の slug（learn/<slug>.html に解説ページがある）
window.CERT_ARCH = window.CERT_ARCH || {};
window.CERT_ARCH.azure = {
  provider: "azure",

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
    { id: "gha",      name: "GitHub Actions",  abbr: "GHA",  cat: "external", learn: null, desc: "GitHub の CI/CD（Azure へは OIDC 連携）" },

    // ---- コンピューティング ----
    { id: "vm",            name: "Virtual Machines", abbr: "VM",   cat: "compute", learn: "azure-virtual-machines", desc: "仮想マシン（IaaS）" },
    { id: "vmss",          name: "VM Scale Sets",    abbr: "VMSS", cat: "compute", learn: "azure-vmss",             desc: "VM の自動スケール" },
    { id: "appservice",    name: "App Service",      abbr: "APP",  cat: "compute", learn: "azure-app-service",      desc: "Web アプリの PaaS",
      scopeHint: "（App Service は既定で VNet の外で動く PaaS。VNet 内のリソースへは VNet 統合、受信の閉域化はプライベートエンドポイント）" },
    { id: "functions",     name: "Azure Functions",  abbr: "FN",   cat: "compute", learn: "azure-functions",        desc: "サーバーレス関数" },
    { id: "aks",           name: "AKS",              abbr: "AKS",  cat: "compute", learn: "aks",                    desc: "マネージド Kubernetes" },
    { id: "containerapps", name: "Container Apps",   abbr: "ACA",  cat: "compute", learn: "azure-container-apps",   desc: "コンテナのサーバーレス実行" },
    { id: "acr",           name: "Container Registry", abbr: "ACR", cat: "compute", learn: null,                    desc: "コンテナイメージのレジストリ" },

    // ---- ストレージ ----
    { id: "storage", name: "Blob Storage",  abbr: "BLOB", cat: "storage", learn: "azure-blob-storage", desc: "オブジェクトストレージ" },
    { id: "disk",    name: "Managed Disk",  abbr: "DISK", cat: "storage", learn: null,                 desc: "VM 用ブロックストレージ" },
    { id: "files",   name: "Azure Files",   abbr: "FILE", cat: "storage", learn: "azure-files",        desc: "共有ファイルストレージ（SMB/NFS）" },

    // ---- データベース ----
    { id: "sqldb",  name: "Azure SQL Database", abbr: "SQL", cat: "database", learn: "azure-sql-database", desc: "マネージドRDB（PaaS）",
      scopeHint: "（Azure SQL は VNet の中に置く IaaS ではなく PaaS。閉域化したい場合はプライベートエンドポイントを VNet 側に作る）" },
    { id: "cosmos", name: "Cosmos DB",          abbr: "COS", cat: "database", learn: "azure-cosmos-db",    desc: "グローバル分散NoSQL" },
    { id: "redis",  name: "Cache for Redis",    abbr: "RED", cat: "database", learn: null,                 desc: "インメモリキャッシュ" },

    // ---- ネットワーク / 配信 ----
    { id: "lb",          name: "Load Balancer",       abbr: "LB",  cat: "network", learn: "azure-load-balancer",       desc: "L4ロードバランサー" },
    { id: "appgw",       name: "Application Gateway", abbr: "AGW", cat: "network", learn: "azure-application-gateway", desc: "L7ロードバランサー（WAF対応）" },
    { id: "frontdoor",   name: "Front Door",          abbr: "AFD", cat: "network", learn: null,                        desc: "グローバルCDN + L7ルーティング" },
    { id: "dns",         name: "Azure DNS",           abbr: "DNS", cat: "network", learn: "azure-dns",                 desc: "DNSゾーン管理" },
    { id: "apim",        name: "API Management",      abbr: "APIM", cat: "network", learn: null,                       desc: "APIの公開・ポリシー管理" },
    { id: "natgw",       name: "NAT Gateway",         abbr: "NAT", cat: "network", learn: null,                        desc: "サブネットの外向き通信" },
    { id: "vnetgw",      name: "VPN Gateway",         abbr: "VGW", cat: "network", learn: "azure-vpn-gateway",         desc: "オンプレとの VPN / ER 接続点" },
    { id: "er",          name: "ExpressRoute",        abbr: "ER",  cat: "network", learn: "azure-expressroute",        desc: "オンプレとの専用線接続" },
    { id: "bastion",     name: "Azure Bastion",       abbr: "BAS", cat: "network", learn: "azure-bastion",             desc: "ブラウザ経由の安全な VM 接続" },
    { id: "privatelink", name: "プライベートエンドポイント", abbr: "PE", cat: "network", learn: "azure-private-endpoint", desc: "PaaS への閉域接続点（NIC）" },
    { id: "firewall",    name: "Azure Firewall",      abbr: "AFW", cat: "network", learn: "azure-firewall",            desc: "マネージドFW（L3〜L7）" },

    // ---- アプリケーション統合 ----
    { id: "servicebus", name: "Service Bus", abbr: "SB", cat: "integration", learn: null, desc: "メッセージキュー（順序・DLQ対応）" },
    { id: "eventgrid",  name: "Event Grid",  abbr: "EG", cat: "integration", learn: null, desc: "イベントルーティング（push型）" },
    { id: "eventhubs",  name: "Event Hubs",  abbr: "EH", cat: "integration", learn: null, desc: "大量イベントのストリーミング受信" },
    { id: "logicapps",  name: "Logic Apps",  abbr: "LA", cat: "integration", learn: null, desc: "ローコードのワークフロー連携" },

    // ---- セキュリティ / 認証 ----
    { id: "entraid",  name: "Microsoft Entra ID",  abbr: "ENT", cat: "security", learn: "microsoft-entra-id",            desc: "ID・認証基盤（旧 Azure AD）" },
    { id: "keyvault", name: "Key Vault",           abbr: "KV",  cat: "security", learn: "azure-key-vault",               desc: "シークレット・鍵・証明書の保管" },
    { id: "defender", name: "Defender for Cloud",  abbr: "DFC", cat: "security", learn: "microsoft-defender-for-cloud",  desc: "CSPM・サーバー脅威保護" },
    { id: "sentinel", name: "Microsoft Sentinel",  abbr: "SEN", cat: "security", learn: "microsoft-sentinel",            desc: "クラウドネイティブ SIEM/SOAR" },

    // ---- 管理 / 監視 ----
    { id: "monitor",      name: "Azure Monitor",         abbr: "MON", cat: "monitoring", learn: "azure-monitor",  desc: "メトリクス・アラート" },
    { id: "loganalytics", name: "Log Analytics",         abbr: "LAW", cat: "monitoring", learn: "log-analytics",  desc: "ログの集約・KQL分析" },
    { id: "appinsights",  name: "Application Insights",  abbr: "AI",  cat: "monitoring", learn: null,             desc: "APM・分散トレース" },
    { id: "policy",       name: "Azure Policy",          abbr: "POL", cat: "monitoring", learn: "azure-policy",   desc: "ガバナンス（準拠評価・強制）" },
    { id: "backup",       name: "Azure Backup",          abbr: "BAK", cat: "monitoring", learn: "azure-backup",   desc: "VM・DB・ファイルのバックアップ" },

    // ---- 分析 ----
    { id: "synapse",         name: "Synapse Analytics", abbr: "SYN", cat: "analytics", learn: "azure-synapse",          desc: "DWH・統合分析基盤" },
    { id: "adf",             name: "Data Factory",      abbr: "ADF", cat: "analytics", learn: "azure-data-factory",     desc: "ETL/ELT パイプライン" },
    { id: "streamanalytics", name: "Stream Analytics",  abbr: "ASA", cat: "analytics", learn: "azure-stream-analytics", desc: "ストリーム処理（SQLライク）" },

    // ---- 機械学習 / AI ----
    { id: "openai", name: "Azure OpenAI",      abbr: "AOAI", cat: "ml", learn: "azure-openai",           desc: "GPT系モデルのAPI（AI Foundry）" },
    { id: "aml",    name: "Machine Learning",  abbr: "AML",  cat: "ml", learn: "azure-machine-learning", desc: "ML の構築・学習・推論" },

    // ---- 開発者ツール / IaC ----
    { id: "devops", name: "Azure DevOps", abbr: "ADO", cat: "devtools", learn: null, desc: "Repos / Pipelines（CI/CD）" },
    { id: "bicep",  name: "ARM / Bicep",  abbr: "IaC", cat: "devtools", learn: null, desc: "IaC（テンプレートで構築）" }
  ],

  // グループ枠（クラウド境界・リソースグループ・VNet などの「囲い」）
  groupKinds: [
    { id: "azure",  label: "Azure クラウド",        color: "#3da8ff" },
    { id: "region", label: "リージョン",            color: "#8c96ad" },
    { id: "rg",     label: "リソースグループ",      color: "#ffd166" },
    { id: "vnet",   label: "VNet（仮想ネットワーク）", color: "#a78bfa" },
    { id: "subnet", label: "サブネット",            color: "#86c352" },
    { id: "az",     label: "可用性ゾーン",          color: "#25c6f2" }
  ],

  // ---- 配置スコープ ----
  // vpcScoped: VNet内のサブネットに置くリソース / anyScope: どちらでも不自然でないもの
  // Azure は AGW・Bastion・Firewall・VPN GW が「専用サブネットを要求する VNet 内リソース」で、
  // 一方 App Service や SQL Database は VNet の外で動く PaaS。この対比が AZ-104 の頻出論点。
  vpcScoped: ["vm", "vmss", "aks", "appgw", "bastion", "vnetgw", "privatelink", "firewall"],
  anyScope:  ["disk", "lb", "natgw", "er"],

  // ---- 配置トポロジ ----
  topology: {
    cloud: "azure", network: "vnet", public: null, private: null,
    subnets: ["subnet"],
    cloudName: "Azure",
    cloudFrame: "「Azure クラウド」枠",
    networkFrame: "VNet",
    regionHint: "（VNet から閉域で使う場合はプライベートエンドポイント経由）"
  },
  externalIngressIds: ["user", "internet"],

  nodeRules: [
    { c: "natgw", inKinds: ["subnet"], msg: "NAT Gateway はサブネットの中に置くのではなく、サブネットに「関連付ける」リソース。VNet 内・サブネットの外に描くのが通例。" }
  ],

  groupNesting: [
    { child: ["subnet"], parent: "vnet", msg: "サブネットは VNet の内側に描く。VNet 枠の中へ移動しよう。" },
    { child: ["vnet"], parent: "azure", msg: "VNet は「Azure クラウド」枠の内側に描こう。" },
    { child: ["rg"], parent: "azure", msg: "リソースグループは「Azure クラウド」枠の内側に描こう。" }
  ],

  edgeRules: [
    { type: "peerOnly", c: "disk", allow: ["vm", "vmss"], msg: "この接続はできない。Managed Disk は VM にアタッチして使うブロックストレージで、他のサービスや外部から直接アクセスする手段がない。共有が必要なら Azure Files か Blob Storage を使う。" },
    { type: "noExternal", c: "natgw", msg: "この接続はできない。NAT Gateway は「中から外へ」の送信専用で、外部からの着信の入口にはならない。受信の入口は Load Balancer か Application Gateway にする。" }
  ],

  // ---- 線種（接続タイプ）----
  edgeTypes: {
    net:    { label: "ネットワーク経路",        color: "rgba(150,165,200,0.6)", png: "rgba(150,165,200,0.7)", dash: null },
    iam:    { label: "RBAC / マネージドID",     color: "#3fe0a4",               png: "rgba(63,224,164,0.8)",   dash: [6, 4] },
    attach: { label: "関連付け / 設定",          color: "#a78bfa",               png: "rgba(167,139,250,0.8)",  dash: [2, 4] }
  },

  // 接続ナレッジベース。キーは "from>to"。
  // l = 線上に出す短いラベル / d = インスペクタに出す解説 / t = 線種（net | iam | attach）
  links: {
    // ---- 入口（ユーザー → 配信層）----
    "user>dns":       { t: "net", l: "名前解決", d: "Azure DNS のゾーンにレコードを置き、独自ドメインを Front Door や Application Gateway に向ける。Zone Apex はエイリアスレコードで対応する。" },
    "user>frontdoor": { t: "net", l: "HTTPS", d: "世界中の POP で TLS を終端するグローバル入口。CDN キャッシュ・WAF ポリシー・複数リージョンへの振り分けをここに集約する。リージョナルな Application Gateway との層の違いが AZ-104/305 で問われる。" },
    "user>appgw":     { t: "net", l: "HTTPS", d: "リージョン内の L7 入口。WAF v2 SKU なら OWASP ルールセットで SQLi/XSS を遮断できる。証明書はリスナーに紐づけ、Key Vault 参照で管理するのが定石。" },
    "user>apim":      { t: "net", l: "API呼び出し", d: "サブスクリプションキーや JWT 検証、レート制限などのポリシーを API の手前で一括適用する。開発者ポータルで API を配布できるのも APIM の価値。" },
    "user>entraid":   { t: "net", l: "サインイン", d: "Entra ID で OIDC サインインし、ID トークン / アクセストークンを受け取る。条件付きアクセスで MFA や場所の制御を効かせるのが Microsoft 流のゼロトラスト入口。" },
    "user>appservice": { t: "net", l: "HTTPS", d: "App Service は *.azurewebsites.net で直接公開できる。本番はカスタムドメイン + マネージド証明書を設定し、グローバル展開や WAF が要るなら手前に Front Door を置く。" },
    "user>bastion":   { t: "net", l: "ブラウザSSH/RDP", d: "Azure ポータルから TLS 経由で VM に入る管理用の入口。VM に公開 IP も NSG の 22/3389 開放も不要になる。「VM に安全に接続するには？」の答えとして AZ-900/104 频出。" },
    "user>storage":   { t: "net", l: "SASトークン", d: "クライアントに直接アップロード/ダウンロードさせるなら、期限と権限を絞った SAS トークンを渡す。アカウントキーをアプリに配るのはアンチパターン。" },

    // ---- DNS / 配信層の連携 ----
    "dns>frontdoor": { t: "attach", l: "エイリアス/CNAME", d: "カスタムドメインを Front Door のエンドポイントに向ける。ドメイン検証は TXT レコードで行い、証明書はマネージドで自動更新させる。" },
    "dns>appgw":     { t: "attach", l: "Aレコード", d: "Application Gateway のパブリック IP に A レコード（またはエイリアス）を向ける。IP は Standard SKU なら静的に固定できる。" },
    "frontdoor>appservice": { t: "net", l: "オリジン", d: "Front Door のオリジンに App Service を指定する。Private Link オリジンにすれば、App Service 側のパブリック公開を閉じたまま Front Door 経由だけに絞れる。" },
    "frontdoor>storage":    { t: "net", l: "オリジン（静的サイト）", d: "Blob の静的 Web サイトをオリジンにして、エッジキャッシュ + 独自ドメイン + WAF を Front Door で被せる。旧 Azure CDN（クラシック）は廃止の流れで、現行解は Front Door。" },
    "frontdoor>appgw":      { t: "net", l: "多層構成", d: "グローバル層（Front Door）→ リージョン層（AGW）の 2 段構成。リージョン内でパスベースルーティングや VNet 内バックエンドへの振り分けが必要な大規模構成で使う。" },

    // ---- LB → バックエンド ----
    "appgw>vm":   { t: "net", l: "バックエンドプール", d: "バックエンドプールに VM（の NIC/IP）を登録し、ヘルスプローブに応答するものへだけ振り分ける。AGW は専用サブネットを要求する点が構成上の特徴。" },
    "appgw>vmss": { t: "net", l: "バックエンドプール", d: "スケールセットをバックエンドにすると、増減した VM が自動でプールに反映される。Web 層の標準構成。" },
    "appgw>aks":  { t: "net", l: "AGIC/Ingress", d: "Application Gateway Ingress Controller（AGIC）で、AKS の Ingress リソースから AGW のルールを自動構成する。WAF を Pod の手前で効かせられる。" },
    "lb>vm":      { t: "net", l: "バックエンドプール", d: "L4（TCP/UDP）の振り分け。Standard SKU + 可用性ゾーン分散が現行の基本。L7 の判断（パス・ホスト名）が要るなら AGW を選ぶ、の使い分けが試験頻出。" },
    "lb>vmss":    { t: "net", l: "バックエンドプール", d: "スケールセットの前段に置く L4 分散。内部 LB にすれば VNet 内部向けの中間層にも使える。" },

    // ---- APIM → バックエンド ----
    "apim>functions":  { t: "net", l: "バックエンド", d: "Functions を APIM の背後に置き、認証・レート制限・変換ポリシーを通してから関数に渡す。関数キーは Named Value（Key Vault 参照）で管理する。" },
    "apim>appservice": { t: "net", l: "バックエンド", d: "App Service の API を APIM 経由で公開する。バックエンドへの直接アクセスはアクセス制限（APIM の IP のみ許可）で閉じておく。" },
    "apim>entraid":    { t: "attach", l: "validate-jwt", d: "APIM の validate-jwt ポリシーで Entra ID 発行のトークンを検証する。バックエンド側に認証コードを書かずに、入口で弾ける。" },

    // ---- VM まわり ----
    "vm>sqldb":    { t: "net", l: "接続（PE推奨）", d: "Azure SQL は PaaS なので、既定はパブリックエンドポイント + ファイアウォール規則。本番はプライベートエンドポイントで VNet 内に閉じ、認証は Entra ID + マネージド ID のパスワードレスが推奨。" },
    "vm>storage":  { t: "iam", l: "マネージドID", d: "VM のシステム割り当てマネージド ID に「ストレージ BLOB データ共同作成者」等の RBAC を付与してアクセスする。接続文字列やキーをコードに置かないのが現行の基本。" },
    "vm>disk":     { t: "attach", l: "アタッチ", d: "Managed Disk は VM にアタッチして使う。SKU（Premium SSD v2 / Standard）はディスク単位で選び、スナップショットでバックアップする。" },
    "vm>files":    { t: "net", l: "SMBマウント", d: "Azure Files を SMB（ポート445）でマウントして複数 VM から共有する。オンプレ側 ISP が 445 を塞いでいる場合は VPN/ER 経由か Azure File Sync を使う。" },
    "vm>keyvault": { t: "iam", l: "マネージドID", d: "シークレット・証明書はマネージド ID + RBAC で Key Vault から実行時に取得する。「資格情報をどこにも保存せずに認証するには？」の答えがマネージド ID。" },
    "vm>redis":    { t: "net", l: "キャッシュ接続", d: "セッションや参照頻度の高いデータをキャッシュして SQL の負荷を下げる。本番 SKU では VNet 統合やプライベートエンドポイントで閉域化する。" },
    "vm>natgw":    { t: "net", l: "外向き既定ルート", d: "サブネットに NAT Gateway を関連付けると、外向き通信が固定のパブリック IP 群から出る。既定の送信アクセスは廃止方向なので、新規構成では NAT GW の明示が推奨。" },
    "vm>monitor":  { t: "iam", l: "AMAエージェント", d: "Azure Monitor Agent（AMA）とデータ収集ルール（DCR）でゲスト内のログ・メトリクスを収集する。旧 Log Analytics エージェントは廃止済み。" },
    "vm>privatelink": { t: "net", l: "私設IPへ接続", d: "VNet 内からは PaaS のプライベートエンドポイント（私設 IP の NIC）宛てに接続する。名前解決はプライベート DNS ゾーンが PaaS の FQDN を私設 IP に上書きする仕組み。ここが PE 理解の核心。" },
    "natgw>internet": { t: "net", l: "送信", d: "NAT Gateway 経由の送信は固定 IP から出るため、外部 SaaS の IP 許可リストに登録しやすい。受信には使えない（送信専用）。" },
    "bastion>vm":  { t: "net", l: "SSH/RDP", d: "Bastion が踏み台となり、VM のプライベート IP へ SSH/RDP する。VM 側に公開 IP は不要で、NSG は Bastion のサブネットからの着信だけ許可すればよい。" },
    "vm>firewall": { t: "net", l: "UDRで強制経由", d: "ユーザー定義ルート（UDR）で 0.0.0.0/0 を Azure Firewall に向け、サブネットからの外向き通信を一元検査する。ハブ&スポーク構成のハブに置くのが定番。" },
    "firewall>internet": { t: "net", l: "検査済み送信", d: "FQDN フィルタやネットワークルールで許可した通信だけが Firewall を抜けて外に出る。送信先を統制したい規制業種の必須構成。" },

    // ---- プライベートエンドポイント ----
    "privatelink>sqldb":   { t: "attach", l: "プライベートエンドポイント", d: "サブネット内に SQL Database 用の PE（NIC）を作り、パブリックアクセスを無効化する。以降、VNet 内・ピアリング先・オンプレ（VPN/ER 越し）から私設 IP で届く。" },
    "privatelink>storage": { t: "attach", l: "プライベートエンドポイント", d: "ストレージへの経路を VNet 内に閉じる。サブリソース（blob / file 等）ごとに PE を分けて作る点が地味なハマりどころ。" },
    "privatelink>keyvault": { t: "attach", l: "プライベートエンドポイント", d: "Key Vault のファイアウォールでパブリックを拒否し、PE 経由だけに絞る。シークレットの経路まで閉域化する高セキュリティ構成。" },
    "privatelink>cosmos":  { t: "attach", l: "プライベートエンドポイント", d: "Cosmos DB も PE で閉域化できる。グローバル分散アカウントではリージョンごとに PE を構成する。" },

    // ---- App Service / Functions ----
    "appservice>sqldb":    { t: "iam", l: "マネージドID接続", d: "接続文字列のパスワードを捨て、マネージド ID + Entra 認証で SQL に繋ぐのが現行推奨。接続情報は「接続文字列」設定ではなくマネージド ID で済むのが理想形。" },
    "appservice>storage":  { t: "iam", l: "マネージドID", d: "アプリから Blob への読み書きはマネージド ID + RBAC で。画像アップロードはクライアント直接（SAS）とサーバー経由のどちらに寄せるかを設計で決める。" },
    "appservice>keyvault": { t: "iam", l: "Key Vault参照", d: "アプリ設定に @Microsoft.KeyVault(SecretUri=...) と書くと、起動時に Key Vault から値が解決される。コードも設定画面にもシークレットの実体が残らない。" },
    "appservice>redis":    { t: "net", l: "セッション外部化", d: "スケールアウトした App Service 間でセッションやキャッシュを共有する。インスタンス内メモリに状態を持たせない、が PaaS スケールの前提。" },
    "appservice>entraid":  { t: "attach", l: "Easy Auth", d: "App Service 認証（Easy Auth）を有効にすると、コードを書かずに Entra ID サインインを前段に挟める。社内向けアプリの最短の認証実装。" },
    "appservice>appinsights": { t: "attach", l: "自動計装", d: "Application Insights を有効化すると、リクエスト・依存関係・例外が自動収集される。分散トレースで「どの依存先が遅いか」まで追える。" },
    "appservice>openai":   { t: "iam", l: "マネージドID呼び出し", d: "Azure OpenAI へはキーではなくマネージド ID + RBAC（Cognitive Services OpenAI User）で呼ぶのが推奨。キーの漏えいリスクとローテーション運用が消える。" },
    "functions>storage":   { t: "iam", l: "バインディング", d: "Functions はランタイム自体が Storage アカウントを必要とする（AzureWebJobsStorage）。Blob トリガーや出力バインディングも宣言的に書けるのが Functions の個性。" },
    "functions>keyvault":  { t: "iam", l: "Key Vault参照", d: "App Service と同じく、アプリ設定の @Microsoft.KeyVault(...) 参照が使える。API キーや接続文字列は Key Vault に置き、関数のマネージド ID で読む。" },
    "functions>cosmos":    { t: "iam", l: "出力バインディング", d: "出力バインディングで Cosmos DB へ書き込む。接続をコードで管理せず、関数の定義に寄せられる。マネージド ID ベースの接続が現行推奨。" },
    "functions>servicebus": { t: "iam", l: "出力バインディング", d: "受け付けた処理をキューに積んで応答を即返す非同期化の定番。ピーク時の負荷をキューが吸収する（ロードレベリング）。" },
    "functions>openai":    { t: "iam", l: "マネージドID呼び出し", d: "イベント駆動で Azure OpenAI を呼ぶ生成 AI パイプライン。トークン消費が大きい処理はキューを挟んで流量を制御する。" },

    // ---- イベント駆動・メッセージング ----
    "storage>eventgrid":   { t: "attach", l: "イベント発行", d: "BlobCreated / BlobDeleted などのイベントを Event Grid が受けて配送する。「Blob にファイルが置かれたら処理を起動」は Event Grid 経由が現行の正解（旧来のポーリングは不要）。" },
    "eventgrid>functions": { t: "attach", l: "イベント配送", d: "Event Grid は push 型でサブスクライバーに配る。リトライとデッドレター（Storage に退避）を備え、ポーリング不要でレイテンシも低い。" },
    "eventgrid>logicapps": { t: "attach", l: "イベント配送", d: "イベントを起点にローコードのワークフロー（承認メール・Teams 通知・SaaS 連携）を動かす。コードを書くほどでもない統合は Logic Apps に寄せる。" },
    "servicebus>functions": { t: "attach", l: "トリガー", d: "キュー/トピックのメッセージで関数が起動する。処理失敗が続いたメッセージは DLQ に隔離。順序保証が要るならセッション有効化、の使い分けまで聞かれる。" },
    "eventhubs>streamanalytics": { t: "attach", l: "ストリーム入力", d: "IoT・テレメトリの大量イベントを Event Hubs で受け、Stream Analytics が SQL ライクなクエリで集計する。Azure ストリーミングの王道パイプライン。" },
    "eventhubs>functions": { t: "attach", l: "トリガー", d: "Event Hubs をトリガーに関数でストリームを処理する。パーティション単位で並列実行され、チェックポイントは Storage に記録される。" },
    "streamanalytics>storage": { t: "iam", l: "出力", d: "集計結果を Blob（Parquet）へ出力してデータレイクに蓄積する。出力先は SQL Database や Power BI も選べる。" },
    "streamanalytics>sqldb":   { t: "iam", l: "出力", d: "ウィンドウ集計の結果をそのまま SQL Database のテーブルへ書く。ダッシュボードの裏側でよく使う構成。" },
    "cosmos>functions": { t: "attach", l: "変更フィード", d: "Cosmos DB の変更フィードを Functions トリガーで購読し、書き込みをリアルタイムに後続処理へ流す。マテリアライズドビューの構築やイベントソーシングの土台。" },

    // ---- 分析パイプライン ----
    "adf>storage":     { t: "iam", l: "コピー元/先", d: "Data Factory のコピーアクティビティで Blob / ADLS Gen2 を読み書きする。接続はリンクされたサービスに定義し、認証はマネージド ID に寄せる。" },
    "adf>sqldb":       { t: "iam", l: "リンクされたサービス", d: "オンプレや SaaS から SQL Database へのデータ移送を ADF が担う。オンプレ接続にはセルフホステッド統合ランタイムを立てる点が試験頻出。" },
    "adf>synapse":     { t: "iam", l: "ロード", d: "整形したデータを Synapse の専用 SQL プールへロードする。大量ロードは COPY INTO / PolyBase 経由が高速。" },
    "storage>synapse": { t: "iam", l: "外部テーブル", d: "ADLS Gen2 のファイルをサーバーレス SQL プールで直接クエリできる。ロード不要でアドホック分析、が Synapse サーバーレスの売り。" },
    "aml>storage":     { t: "iam", l: "データストア", d: "学習データもモデル成果物も Storage（Blob/ADLS）に置く。ワークスペースのデータストアとして登録し、コンピューティングからマネージド ID でアクセスする。" },

    // ---- ID・セキュリティ・監視 ----
    "monitor>vmss":        { t: "attach", l: "自動スケール規則", d: "CPU やキュー長のメトリクスをトリガーに VMSS のインスタンス数を増減させる。スケールイン時のクールダウンを忘れると振動（フラッピング）する。" },
    "monitor>loganalytics": { t: "attach", l: "ログ送信先", d: "診断設定で各リソースのログ・メトリクスを Log Analytics ワークスペースへ集約する。KQL で横断クエリを書くのが Azure 運用の共通言語。" },
    "appinsights>loganalytics": { t: "attach", l: "ワークスペースベース", d: "Application Insights のデータ実体は Log Analytics ワークスペースに入る（ワークスペースベース化）。アプリと基盤のログを同じ KQL で突き合わせられる。" },
    "sentinel>loganalytics": { t: "attach", l: "ワークスペース上で動作", d: "Sentinel は Log Analytics ワークスペースの上に乗る SIEM。コネクタで Entra ID・M365・AWS のログまで取り込み、分析ルールでインシデントを起こす。" },
    "defender>vm":   { t: "attach", l: "脅威保護", d: "Defender for Cloud が VM の構成評価（セキュアスコア）と脅威検出を行う。有効化はサブスクリプション/ワークスペース単位で、エージェントレススキャンも併用される。" },
    "aks>acr":       { t: "iam", l: "イメージpull", d: "AKS の kubelet マネージド ID に AcrPull ロールを付けてイメージを取得する（az aks update --attach-acr）。イメージプルシークレットを手で配らないのが Azure 流。" },
    "backup>vm":     { t: "attach", l: "バックアップポリシー", d: "Recovery Services コンテナーのポリシーで VM を定期バックアップする。リテンションと RPO の要件をポリシーに落とすのが設計の仕事。" },
    "policy>vm":     { t: "attach", l: "準拠評価/強制", d: "「許可するリージョン」「必須タグ」「特定 SKU の禁止」などをポリシーで強制する。リソース単位ではなくスコープ（管理グループ/サブスクリプション/RG）への割り当てで効く。" },

    // ---- ハイブリッド接続 ----
    "onprem>er":     { t: "net", l: "専用線", d: "ExpressRoute 回線でオンプレと Microsoft ネットワークを接続する。インターネットを経由しないため帯域・遅延が安定し、SLA も付く。プライベートピアリングで VNet に届く。" },
    "er>vnetgw":     { t: "net", l: "ERゲートウェイ", d: "VNet 側は GatewaySubnet に ExpressRoute ゲートウェイを置いて回線と接続する。VPN Gateway と同居もできる（ER をメイン、VPN をバックアップに）。" },
    "onprem>vnetgw": { t: "net", l: "S2S VPN", d: "IPsec のサイト間 VPN。ER 導入前のつなぎや、ER 障害時のバックアップ経路として定番。アクティブ/アクティブ構成で可用性を上げられる。" },
    "vnetgw>vm":     { t: "net", l: "経路", d: "ゲートウェイが学習したオンプレ経路は VNet 内に伝搬し、VM へ追加設定なしで届く。逆方向（VM→オンプレ）も同じ経路を使う。" },

    // ---- CI/CD ----
    "gha>appservice": { t: "iam", l: "OIDCデプロイ", d: "GitHub Actions から OIDC のフェデレーション資格情報で Azure にログインしてデプロイする。シークレット（SPのパスワード）を GitHub に保存しない、が現行のベストプラクティス。" },
    "gha>acr":        { t: "iam", l: "イメージpush", d: "ビルドしたイメージを ACR へ push する。認証は OIDC + RBAC（AcrPush）で、admin アカウントの有効化は避ける。" },
    "gha>aks":        { t: "iam", l: "デプロイ", d: "kubelogin + OIDC で AKS へ kubectl/helm デプロイ。クラスタを Entra ID 統合にしておくと、人もパイプラインも同じ RBAC で統制できる。" },
    "devops>appservice": { t: "iam", l: "Pipelinesデプロイ", d: "Azure DevOps のサービス接続（ワークロード ID 連携）でデプロイする。承認ゲートや環境ごとの変数管理は Pipelines の Environments で行う。" },
    "devops>acr":     { t: "iam", l: "イメージpush", d: "Pipelines からビルドイメージを ACR に push する。Trivy 等の脆弱性スキャンをビルド段に挟むのが現行の標準。" },
    "bicep>vm":       { t: "attach", l: "プロビジョニング", d: "Bicep（ARM テンプレートの新記法）でリソースを宣言的にデプロイする。what-if で差分を確認してから適用、がIaC運用の基本動作。" }
  },

  // links に無い組み合わせのフォールバック（カテゴリで判定）
  fallbackHints: [
    { cat: "monitoring", t: "attach", l: "監視/記録", d: "監視系サービスとの接続。Azure は「診断設定で Log Analytics へ送る」が共通パターンで、リソース側に細かな設定は要らないことが多い。" },
    { cat: "security",   t: "iam", l: "認証/権限", d: "セキュリティ系サービスとの接続。Azure では「どの ID（マネージド ID / サービスプリンシパル）に、どのスコープで、どの RBAC ロールを割り当てるか」が答えの型。" }
  ],
  fallbackGeneric: { t: null, l: "", d: "この組み合わせの代表パターンはまだ未収録。実際に繋ぐ場合は、PaaS への接続ならマネージド ID + RBAC か プライベートエンドポイント、VNet 内の通信なら NSG とルートテーブル、のどれが必要かをまず切り分ける。" },

  // テンプレート（nodes の x,y はキャンバス座標 / edges は nodes 配列の index ペア）
  templates: [
    {
      id: "3tier",
      name: "3層Webアプリ（App GW + VM + SQL Database）",
      groups: [
        { k: "azure",  x: 220, y: 30,  w: 1360, h: 680 },
        { k: "vnet",   x: 460, y: 170, w: 740,  h: 500 },
        { k: "subnet", x: 500, y: 230, w: 280,  h: 400 },
        { k: "subnet", x: 840, y: 230, w: 320,  h: 400 }
      ],
      nodes: [
        { c: "user",        x: 60,   y: 290 },
        { c: "dns",         x: 260,  y: 80  },
        { c: "appgw",       x: 560,  y: 290 },
        { c: "vm",          x: 900,  y: 290 },
        { c: "privatelink", x: 900,  y: 480 },
        { c: "sqldb",       x: 1320, y: 480 },
        { c: "keyvault",    x: 1320, y: 290 },
        { c: "monitor",     x: 1320, y: 90  }
      ],
      edges: [[0,1],[1,2],[0,2],[2,3],[3,4],[4,5],[3,6],[3,7]]
    },
    {
      id: "serverless",
      name: "サーバーレスAPI（APIM + Functions + Cosmos DB）",
      groups: [
        { k: "azure", x: 230, y: 60, w: 1120, h: 500 }
      ],
      nodes: [
        { c: "user",       x: 60,   y: 280 },
        { c: "entraid",    x: 290,  y: 440 },
        { c: "apim",       x: 290,  y: 280 },
        { c: "functions",  x: 540,  y: 280 },
        { c: "cosmos",     x: 790,  y: 160 },
        { c: "servicebus", x: 790,  y: 400 },
        { c: "functions",  x: 1020, y: 400 },
        { c: "keyvault",   x: 540,  y: 110 }
      ],
      edges: [[0,1],[0,2],[2,1],[2,3],[3,7],[3,4],[3,5],[5,6],[6,4]]
    },
    {
      id: "static-site",
      name: "静的サイト配信（Blob + Front Door）",
      groups: [
        { k: "azure", x: 240, y: 40, w: 980, h: 520 }
      ],
      nodes: [
        { c: "user",      x: 60,  y: 250 },
        { c: "dns",       x: 300, y: 90  },
        { c: "frontdoor", x: 560, y: 250 },
        { c: "storage",   x: 860, y: 250 }
      ],
      edges: [[0,1],[0,2],[1,2],[2,3]]
    },
    {
      id: "eventdriven",
      name: "イベント駆動（Event Grid + Functions）",
      groups: [
        { k: "azure", x: 250, y: 40, w: 1310, h: 620 }
      ],
      nodes: [
        { c: "user",      x: 60,   y: 300 },
        { c: "storage",   x: 310,  y: 300 },
        { c: "eventgrid", x: 570,  y: 300 },
        { c: "functions", x: 830,  y: 180 },
        { c: "logicapps", x: 830,  y: 440 },
        { c: "cosmos",    x: 1090, y: 180 },
        { c: "openai",    x: 1090, y: 440 },
        { c: "functions", x: 1360, y: 300 }
      ],
      edges: [[0,1],[1,2],[2,3],[2,4],[3,5],[3,6],[5,7]]
    },
    {
      id: "hybrid",
      name: "ハイブリッド接続（ExpressRoute + Bastion）",
      groups: [
        { k: "azure",  x: 340, y: 40,  w: 1140, h: 680 },
        { k: "vnet",   x: 660, y: 100, w: 760,  h: 560 },
        { k: "subnet", x: 980, y: 160, w: 400,  h: 440 }
      ],
      nodes: [
        { c: "user",    x: 60,   y: 120 },
        { c: "onprem",  x: 60,   y: 460 },
        { c: "er",      x: 420,  y: 460 },
        { c: "vnetgw",  x: 720,  y: 460 },
        { c: "bastion", x: 720,  y: 200 },
        { c: "vm",      x: 1040, y: 250 },
        { c: "vm",      x: 1040, y: 460 }
      ],
      edges: [[1,2],[2,3],[1,3],[3,6],[0,4],[4,5]]
    },
    {
      id: "cicd",
      name: "CI/CD（GitHub Actions + AKS）",
      groups: [
        { k: "azure",  x: 360,  y: 40,  w: 1180, h: 640 },
        { k: "vnet",   x: 1080, y: 280, w: 420,  h: 380 },
        { k: "subnet", x: 1110, y: 340, w: 360,  h: 290 }
      ],
      nodes: [
        { c: "gha",        x: 80,   y: 300 },
        { c: "acr",        x: 460,  y: 140 },
        { c: "appservice", x: 460,  y: 480 },
        { c: "aks",        x: 1180, y: 440 },
        { c: "appinsights", x: 800, y: 480 }
      ],
      edges: [[0,1],[0,3],[0,2],[3,1],[2,4]]
    }
  ]
};
