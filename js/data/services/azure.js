window.CERT_SERVICES = window.CERT_SERVICES || {};

window.CERT_SERVICES["microsoft-entra-id"] = {
  slug: "microsoft-entra-id",
  name: "Microsoft Entra ID",
  provider: "azure",
  category: "ID・アクセス管理",
  aliases: ["Microsoft Entra ID", "Entra ID", "Privileged Identity Management", "PIM"],
  officialUrl: "https://learn.microsoft.com/ja-jp/entra/identity/",
  summary: [
    "Microsoft Entra ID（旧称 Azure Active Directory）は、Azureのクラウドベースのアイデンティティおよびアクセス管理サービスだ。ユーザーやグループの管理、アプリケーションへのシングルサインオン（SSO）、多要素認証（MFA）、条件付きアクセスポリシーの適用など、IDに関わる機能を一元的に提供する。改称はすでに浸透しており、試験問題でも現在は旧称（Azure AD）ではなくEntra IDの名称で出題される点に留意したい。",
    "Entra IDはマルチテナント構造を持ち、Microsoft 365やAzureをはじめとするクラウドサービスのほか、SaaSアプリとも統合できる。ディレクトリとして機能するだけでなく、Managed Identityによってアプリやサービスが認証情報をコードに埋め込まずにAzureリソースへアクセスできる仕組みも提供する。",
    "Privileged Identity Management（PIM）はEntra IDの機能の一つで、特権ロール（グローバル管理者など）へのアクセスをジャストインタイムで付与・管理するための機能だ。常時特権を付与せず必要なときだけ昇格させることで、過剰な権限付与によるリスクを低減する。"
  ],
  examPoints: [
    "試験では「認証（誰であるか）」と「認可（何ができるか）」の違いを問う問題が頻出だ。Entra IDは認証基盤であり、実際のリソースアクセス制御はAzure RBACが担う。両者を混同しないこと。条件付きアクセスは「場所・デバイス・ユーザーリスク」などの条件をもとにアクセスを許可・拒否・MFA要求できる機能であり、PIMとは別物として区別する。",
    "PIM絡みの設問では「常時割り当て（Permanent Assignment）」と「資格のある割り当て（Eligible Assignment）」の違いを押さえておく。資格のある割り当ては承認や理由入力を経て一定期間だけ有効化される。AZ-104やSC-900では『最小特権の原則を実現するためにどの機能を使うか』という形で出題されることが多い。"
  ]
};

window.CERT_SERVICES["azure-rbac"] = {
  slug: "azure-rbac",
  name: "Azure RBAC",
  provider: "azure",
  category: "ID・アクセス管理",
  aliases: ["Azure RBAC", "RBAC"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/role-based-access-control/overview",
  summary: [
    "Azure RBAC（ロールベースのアクセス制御）は、Azureリソースへのアクセス権をきめ細かく管理するための仕組みだ。セキュリティプリンシパル（ユーザー・グループ・サービスプリンシパル・マネージドID）にロールを割り当てることで、どのリソースに対して何の操作ができるかを制御する。",
    "RBACのロール割り当ては「セキュリティプリンシパル」「ロール定義」「スコープ」の3要素で構成される。スコープは管理グループ・サブスクリプション・リソースグループ・リソースの4階層があり、上位スコープで割り当てたロールは子スコープに継承される。加算方式のモデルなので、複数のロール割り当てがある場合はそれらの権限の合計が有効な権限になる。"
  ],
  examPoints: [
    "Azure RBACとAzure Policyは混同しやすい。RBACは『誰が何をできるか（アクションのコントロール）』を管理し、Policyは『リソースがどのような状態であるべきか（リソースのコンプライアンス）』を管理する。たとえば「特定のリージョンへのデプロイのみ許可する」のはPolicyの仕事で、「特定のユーザーがVMを作成できる」のはRBACの仕事だ。AZ-104では『最小特権を実現する組み込みロール』や『カスタムロールをいつ使うか』も問われる。"
  ]
};

window.CERT_SERVICES["azure-policy"] = {
  slug: "azure-policy",
  name: "Azure Policy",
  provider: "azure",
  category: "管理・ガバナンス",
  aliases: ["Azure Policy"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/governance/policy/overview",
  summary: [
    "Azure Policyは、組織の標準をAzureリソースに大規模に適用し、コンプライアンス状態を評価・追跡するサービスだ。ポリシー定義（JSON形式のルール）をリソースのスコープに割り当て、リソースがルールに準拠しているかどうかを継続的に評価する。準拠していないリソースに対しては監査・拒否・修復などの効果（Effect）を適用できる。",
    "複数のポリシー定義をまとめたものがイニシアチブ（Initiative）だ。たとえば「セキュリティ基準の強制」といったイニシアチブを作成し、関連する複数のポリシーを一括管理・割り当てできる。Azure Policyはリソースの作成・更新時だけでなく、24時間ごとの定期評価でも実行される。"
  ],
  examPoints: [
    "試験でよく問われるのはEffectの種類と動作の違いだ。Denyはリソース作成・変更をブロックし、Auditは準拠していなくても記録するだけで止めない。DeployIfNotExistsは条件が満たされたときに追加のリソースをデプロイし、ModifyはリソースのプロパティやタグをPolicyが変更する。Denyの前にAuditで実態把握するのが推奨される運用手順でもあり、ここも問われる。"
  ]
};

window.CERT_SERVICES["azure-virtual-machines"] = {
  slug: "azure-virtual-machines",
  name: "Azure Virtual Machines",
  provider: "azure",
  category: "コンピューティング",
  aliases: ["Azure Virtual Machines", "Azure VM", "可用性セット", "可用性ゾーン"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/virtual-machines/overview",
  summary: [
    "Azure Virtual Machines（VM）は、Azureが提供するIaaSコンピューティングリソースだ。物理ハードウェアの購入・管理は不要で、Windows・Linux問わず必要なOSとソフトウェアを自由に構成できる。VMのサイズ（vCPU・メモリ・ストレージ）はワークロードに応じて選択し、後から変更も可能だ。",
    "高可用性を実現するオプションとして、可用性セット（Availability Set）と可用性ゾーン（Availability Zone）がある。可用性セットは同一データセンター内で障害ドメインと更新ドメインを分散させる仕組みで、ハードウェア障害やメンテナンス時のダウンタイムを最小化する。可用性ゾーンはリージョン内の物理的に独立した施設（ゾーン）にVMを分散配置し、データセンター全体の障害にも耐えられる構成だ。SLAはゾーンを使う方が高い（99.99%）。"
  ],
  examPoints: [
    "可用性セットと可用性ゾーンの違いは頻出だ。「同一データセンター内の分散か、データセンター間の分散か」という点で区別する。可用性セットは2VM以上で99.95% SLA、可用性ゾーンは2VM以上を異なるゾーンに配置で99.99% SLAになる。また、スケールアップ（VMサイズ変更）とスケールアウト（VMを増やす）の違いもAZ-900では確認される。VMSSを使う場合はVMSSの問題を参照のこと。"
  ]
};

window.CERT_SERVICES["azure-vmss"] = {
  slug: "azure-vmss",
  name: "仮想マシン スケール セット（VMSS）",
  provider: "azure",
  category: "コンピューティング",
  aliases: ["仮想マシン スケール セット", "VMSS"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/virtual-machine-scale-sets/overview",
  summary: [
    "仮想マシン スケール セット（VMSS）は、同一構成のVMを大量に作成・管理し、負荷に応じて自動でスケールアウト／スケールインできるサービスだ。最大1000インスタンスまでサポートされ、ロードバランサーや自動スケーリングルールと組み合わせることで、トラフィックの増減に応じた柔軟なインフラを構築できる。",
    "VMSSには「フレキシブルオーケストレーション」と「ユニフォームオーケストレーション」の2つのモードがある。フレキシブルは可用性ゾーンや障害ドメインをまたいでVMを分散させる高可用性構成に適しており、新規ワークロードでは推奨される方式だ。VMSSそのものは追加コストなく、使用するVMやネットワーク・ストレージのコストのみ発生する。"
  ],
  examPoints: [
    "VMSSと通常のVMの使い分けがポイントだ。VMSSは「同じ構成のVMを複数管理したい」「自動スケーリングが必要」「高可用性が求められる」ケースに適する。単体VMで足りる開発・テスト環境やユニーク構成が必要なケースは通常VMが向いている。AZ-104では自動スケーリングのルール設定（CPU使用率のしきい値など）も出題範囲に含まれる。"
  ]
};

window.CERT_SERVICES["azure-app-service"] = {
  slug: "azure-app-service",
  name: "Azure App Service",
  provider: "azure",
  category: "コンピューティング",
  aliases: ["App Service", "デプロイ スロット", "デプロイスロット"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/app-service/overview",
  summary: [
    "Azure App Serviceは、Webアプリ・モバイルバックエンド・RESTful APIをインフラ管理不要でホスティングできるPaaSサービスだ。.NET・Java・Node.js・Python・PHPなど複数のランタイムをサポートし、WindowsとLinux両方で動作する。OSやランタイムのパッチ適用はAzureが自動で行う。",
    "App Serviceプランによってスケールとコストが決まる。プランのティア（Free・Basic・Standard・Premium・Isolated）によってカスタムドメイン・SSL・自動スケーリング・デプロイスロットの利用可否が変わる。デプロイスロット（Deployment Slot）はStandard以上で使える機能で、ステージング環境と本番環境を別スロットとして管理し、スワップ操作で無停止デプロイを実現する。"
  ],
  examPoints: [
    "デプロイスロットは頻出トピックだ。「ステージングでテストして本番にスワップ」という流れを理解しておく。スワップはURLを入れ替えるため本番トラフィックが即座にステージングのコードに向く。スワップ時にスティッキーな設定（接続文字列・アプリ設定にスロット固有フラグが付いたもの）はスワップされないという挙動も問われる。IaaSのVMとPaaSのApp Serviceの責任境界の違いもAZ-900の定番問題だ。"
  ]
};

window.CERT_SERVICES["azure-functions"] = {
  slug: "azure-functions",
  name: "Azure Functions",
  provider: "azure",
  category: "コンピューティング",
  aliases: ["Azure Functions"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-overview",
  summary: [
    "Azure Functionsはサーバーレスのコンピューティングサービスで、イベントに応じてコードを実行するFaaS（Function as a Service）だ。インフラのプロビジョニングや管理が不要で、HTTPリクエスト・タイマー・Blobのアップロード・キューメッセージなどをトリガーとして関数を起動できる。",
    "ホスティングプランは複数ある。従量課金プラン（Consumption）は実行した分だけ課金され、アイドル時はゼロにスケールダウンする。Flex従量課金プランは仮想ネットワーク統合と高速スケーリングを備えた新しい推奨プランだ。Premiumプランは常時稼働インスタンスを持ちコールドスタートを回避でき、専用プラン（App Serviceプラン）では既存のApp Serviceプラン上でFunctionsを動かせる。"
  ],
  examPoints: [
    "ServerlessとPaaSの違いを問う問題でFunctionsが取り上げられる。「コードを書くだけでよく、インフラを一切意識しない」のがFunctionsの特徴だ。App Serviceと比較する問題では『常時稼働が必要かどうか』『イベントドリブンかどうか』が判断軸になる。また、Durable Functionsを使うとステートフルなワークフローをオーケストレーションできる点もAI-900やAZ-104の文脈で言及される。"
  ]
};

window.CERT_SERVICES["aks"] = {
  slug: "aks",
  name: "Azure Kubernetes Service（AKS）",
  provider: "azure",
  category: "コンテナ",
  aliases: ["Azure Kubernetes Service", "AKS"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/aks/what-is-aks",
  summary: [
    "Azure Kubernetes Service（AKS）は、Kubernetesクラスターのデプロイ・管理・スケーリングをAzureがマネージドで提供するサービスだ。コントロールプレーン（APIサーバー・etcdなど）はAzureが無料で管理し、ユーザーはワーカーノード（エージェントノード）のコストのみ負担する。",
    "AKSにはAKS AutomaticとAKS Standardの2つのモードがある。Automaticはノード管理・スケーリング・セキュリティ設定・アップグレードを自動化し、ほとんどのワークロードに推奨される。Standardはクラスター構成を細かく制御したい場合に使う。いずれも可用性ゾーンをまたいだノード分散によって高可用性を実現できる。"
  ],
  examPoints: [
    "AKSとAzure Container Appsの使い分けが問われる。AKSはKubernetesの詳細な制御が必要なプラットフォームチーム向け、Container Appsはインフラを意識せずコンテナを動かしたい開発チーム向けというのが基本的な区別だ。AZ-104ではkubectl操作やノードプールの管理、AKSとAzure Container Registryの連携なども範囲に入る。"
  ]
};

window.CERT_SERVICES["azure-container-apps"] = {
  slug: "azure-container-apps",
  name: "Azure Container Apps",
  provider: "azure",
  category: "コンテナ",
  aliases: ["Container Apps"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/container-apps/overview",
  summary: [
    "Azure Container Appsは、Kubernetesを意識せずコンテナ化アプリを実行できるサーバーレスプラットフォームだ。マイクロサービス・APIエンドポイント・バックグラウンドジョブ・イベントドリブン処理などに向いており、HTTP・イベント・CPU／メモリ負荷・KEDA対応スケーラーをトリガーにした自動スケーリングをサポートする。",
    "Container AppsはKEDAを標準搭載し、ゼロスケール（アイドル時にインスタンス数をゼロに）も可能だ（CPU/メモリスケールを除く）。Daprとの統合によりマイクロサービス間通信・状態管理・Pub/Subを簡単に利用できる。下層でKubernetesが動いているが、ユーザーはクラスター管理を意識しない。"
  ],
  examPoints: [
    "Container AppsはAKSよりも抽象度が高い。『Kubernetesを管理したくないが、コンテナ化されたマイクロサービスを動かしたい』という要件に合う選択肢として問題に登場する。FunctionsのContainer Apps対応（Container Apps上でFunctionsを実行）も新しい選択肢として追加されているため、ホスティングオプションの違いを整理しておくこと。"
  ]
};

window.CERT_SERVICES["azure-blob-storage"] = {
  slug: "azure-blob-storage",
  name: "Azure Blob Storage",
  provider: "azure",
  category: "ストレージ",
  aliases: ["Azure Blob Storage", "Blob Storage", "BLOB"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/storage/blobs/storage-blobs-introduction",
  summary: [
    "Azure Blob Storageは、テキスト・画像・動画・ログなどの非構造化データを大規模に格納するためのオブジェクトストレージサービスだ。ストレージアカウント→コンテナ→BLOBという3階層で構成され、インターネット経由でHTTP/HTTPSアクセスができる。",
    "BLOBの種類はブロックBLOB（テキスト・バイナリデータの汎用格納）・追加BLOB（ログ書き込みなど追記に最適）・ページBLOB（VHDファイルなどランダムアクセス用）の3種類がある。アクセス層はHot（頻繁アクセス）・Cool（月1回程度）・Cold・Archiveの4段階があり、アクセス頻度に応じてコストとリトリーバル料金のトレードオフが変わる。"
  ],
  examPoints: [
    "アクセス層の使い分けは頻出だ。Hotは保存コストが高くアクセスコストが低い、Archiveは保存コストが最安だがデータの取り出しに数時間かかる（リハイドレーションが必要）。試験問題でアーカイブデータを取り出す要件がある場合、Archiveのリハイドレート遅延を忘れないこと。Azure Blob Storageがオブジェクトストレージであり、ファイル共有（Azure Files）やブロックストレージ（マネージドディスク）とは異なる点も確認しておく。"
  ]
};

window.CERT_SERVICES["azure-files"] = {
  slug: "azure-files",
  name: "Azure Files",
  provider: "azure",
  category: "ストレージ",
  aliases: ["Azure Files", "Azure File Sync"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/storage/files/storage-files-introduction",
  summary: [
    "Azure Filesは、SMB・NFS・REST APIプロトコルでアクセスできるフルマネージドのクラウドファイル共有サービスだ。Windows・Linux・macOSからマウントでき、オンプレミスのファイルサーバーをクラウドに置き換える用途や、VMへのファイル共有として活用される。",
    "Azure File Syncを使うと、オンプレミスのWindowsサーバーとAzure Filesを同期させ、ローカルにキャッシュを持ちながらクラウドにデータを保管できる。頻繁にアクセスするファイルはサーバーにキャッシュされ、アクセスの少ないファイルはクラウドにのみ保存する「クラウド階層化」機能もある。"
  ],
  examPoints: [
    "Azure Files・Blob Storage・マネージドディスクの3つを区別する問題が出る。Azure FilesはSMBマウントでWindows的なファイルシステムとして使えるもの、Blob Storageはオブジェクトストレージ（フラットなKey-Value的な構造）、マネージドディスクはVMに直接アタッチするブロックストレージだ。Azure File Syncの目的（オンプレミスとクラウドのハイブリッド同期）も定番問題として登場する。"
  ]
};

window.CERT_SERVICES["azure-storage-account"] = {
  slug: "azure-storage-account",
  name: "Azure ストレージ アカウント",
  provider: "azure",
  category: "ストレージ",
  aliases: ["ストレージ アカウント", "ストレージアカウント", "LRS", "GRS", "ZRS"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/storage/common/storage-account-overview",
  summary: [
    "Azureストレージアカウントは、Blob・Files・Queue・Tableなどのストレージサービスをホストする論理コンテナだ。ストレージアカウント名はAzure全体でグローバルに一意でなければならず、データへのエンドポイントURLの一部になる。種類は汎用v2が標準的で、ほとんどのシナリオで推奨される。",
    "冗長性オプションはLRS（ローカル冗長：同一データセンター内3コピー）・ZRS（ゾーン冗長：同一リージョン内の3つのゾーンに分散）・GRS（地理冗長：別リージョンにも3コピー）・GZRS（地理ゾーン冗長）の4種類がある。障害への耐性とコストはLRS＜ZRS＜GRS＜GZRSの順で高くなる。RA-GRS・RA-GZRSは読み取りアクセスをセカンダリリージョンで許可するオプションだ。"
  ],
  examPoints: [
    "冗長性の略称と保護範囲の対応は確実に覚えておく。LRSは単一データセンター障害でデータ損失のリスク、GRSはリージョン全体の障害にも耐えられるがセカンダリへのフェールオーバーは手動かMicrosoftによる。RA-GRSはセカンダリを読み取り専用で利用できるため、読み取り負荷分散にも使える。AZ-900では『どの冗長レベルがリージョン障害に対応するか』が問われる。"
  ]
};

window.CERT_SERVICES["azure-cosmos-db"] = {
  slug: "azure-cosmos-db",
  name: "Azure Cosmos DB",
  provider: "azure",
  category: "データベース",
  aliases: ["Cosmos DB"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/cosmos-db/overview",
  summary: [
    "Azure Cosmos DBは、グローバル分散・マルチモデルに対応したフルマネージドのNoSQLデータベースサービスだ。ドキュメント・キーバリュー・グラフ・テーブルなど複数のデータモデルをサポートし、ボタン操作で世界中の任意のリージョンへのデータレプリケーションが可能だ。",
    "複数リージョン書き込み構成で99.999%、単一リージョン書き込みでは99.99%の可用性SLAを提供し、10ミリ秒未満の読み書きレイテンシを保証する。一貫性レベルは「強整合性」から「結果整合性」まで5段階から選択でき、可用性・レイテンシ・整合性のトレードオフをアプリケーション要件に合わせて調整できる。ChatGPTなど大規模AIサービスでも採用されており、ベクター検索にも対応している。"
  ],
  examPoints: [
    "Cosmos DBはNoSQLなので、正規化されたリレーショナルデータよりもスキーマが柔軟で大規模かつグローバルに分散した読み書きに向く。Azure SQL DatabaseがRDBMSで複雑な結合やACIDトランザクションに強いのに対し、Cosmos DBはスケールアウトとグローバル分散が強み、という使い分けを問われる問題が頻出だ。DP-900では一貫性レベルの概念と各レベルの特徴（Strong・Bounded Staleness・Session・Consistent Prefix・Eventual）も出題される。"
  ]
};

window.CERT_SERVICES["azure-sql-database"] = {
  slug: "azure-sql-database",
  name: "Azure SQL Database",
  provider: "azure",
  category: "データベース",
  aliases: ["Azure SQL Database"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/azure-sql/database/sql-database-paas-overview",
  summary: [
    "Azure SQL Databaseは、SQL Serverエンジンをベースにしたフルマネージドのリレーショナルデータベースサービス（PaaS）だ。パッチ適用・バックアップ・高可用性の維持はAzureが自動で行い、ユーザーはデータベースの設計と利用に集中できる。",
    "購入モデルは仮想コアベースとDTUベースの2種類がある。仮想コアモデルではGeneral Purpose・Business Critical・Hyperspaceの3サービスレベルがあり、要件に応じて選択する。エラスティックプールを使うと複数データベースがリソースを共有でき、使用パターンがバラバラなマルチテナントSaaSに効率的だ。"
  ],
  examPoints: [
    "Azure SQL DatabaseとSQL Managed Instanceの違いは頻出だ。SQL Databaseは完全なPaaSで個別データベース単位の管理に向き、SQL Managed InstanceはオンプレミスのSQL Serverインスタンスをほぼそのまま移行（リフト&シフト）できる互換性の高さが特徴だ。CLR・SQL Server Agent・リンクサーバーなどの機能がSQL Managed Instanceでは使えるが、SQL Databaseでは使えない（または制限される）点が問われる。"
  ]
};

window.CERT_SERVICES["azure-sql-managed-instance"] = {
  slug: "azure-sql-managed-instance",
  name: "Azure SQL Managed Instance",
  provider: "azure",
  category: "データベース",
  aliases: ["SQL Managed Instance"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview",
  summary: [
    "Azure SQL Managed Instanceは、SQL Serverとほぼ100%互換のマネージドデータベースサービスだ。オンプレミスのSQL Serverアプリケーションをコードの変更を最小限にクラウドへ移行したいシナリオに最適で、SQL Server Agent・CLR統合・リンクサーバー・分散トランザクションなどSQL Databaseでは使えない機能も利用できる。",
    "SQL Managed Instanceは常にVNet内にデプロイされ、プライベートIPアドレスでのみアクセス可能だ。これにより、オンプレミス環境からExpressRouteやVPN経由で安全に接続できる。General PurposeとBusiness Criticalの2つのサービスレベルがある。"
  ],
  examPoints: [
    "SQL DatabaseとSQL Managed Instanceのどちらを選ぶかという場面では、SQL Serverとの互換性の高さが判断基準になる。CLRモジュール、クロスデータベースクエリ、SQL Server Agentジョブ、ネイティブバックアップ・リストアなどが必要な場合はManaged Instanceを選ぶ。VNet統合が必須という点も差別化ポイントで、Azure SQL Databaseとは異なりデータベース単体でネットワーク分離が保証される。"
  ]
};

window.CERT_SERVICES["azure-synapse"] = {
  slug: "azure-synapse",
  name: "Azure Synapse Analytics",
  provider: "azure",
  category: "分析",
  aliases: ["Azure Synapse Analytics", "Synapse"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/synapse-analytics/overview-what-is",
  summary: [
    "Azure Synapse Analyticsは、データウェアハウス・ビッグデータ処理・データ統合・分析ダッシュボードを一体化したエンタープライズ分析プラットフォームだ。専用SQLプール（旧SQL DW）・サーバーレスSQLプール・Apache Spark・データパイプラインをSynapse Studioという統合UIで操作できる。",
    "Synapse LinkによってCosmos DBやSQL DatabaseなどのトランザクションDBのデータをETLなしでほぼリアルタイムに分析できる。Azure Data Lake Storage Gen2との親和性が高く、ペタバイト規模のデータを処理するHTPAシナリオに適している。"
  ],
  examPoints: [
    "DP-900ではSynapseが『大規模分析とOLAPワークロードのためのサービス』として位置づけられる。OLTPはAzure SQL DatabaseやCosmos DB、OLAPはSynapseという棲み分けを理解しておく。AZ-900では「データウェアハウスが必要なとき」という設問でSynapseが正解になる。Microsoft FabricはすでにDP-900の正式な出題範囲で、FabricはSynapseを統合・進化させたSaaS型プラットフォームと位置づけられている。新規のデータ分析基盤はSynapse WorkspaceからFabricへ移行が進んでおり、両者の関係（OneLake・各ワークロードの対応）も問われる。"
  ]
};

window.CERT_SERVICES["azure-databricks"] = {
  slug: "azure-databricks",
  name: "Azure Databricks",
  provider: "azure",
  category: "分析",
  aliases: ["Databricks"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/databricks/introduction/",
  summary: [
    "Azure Databricksは、Apache Sparkをベースにしたフルマネージドのビッグデータ分析・機械学習プラットフォームだ。DatabricksとMicrosoftの共同開発で、Azure上で最適化されたSparkクラスターを提供する。データエンジニアリング・機械学習・ストリーミング分析などに広く使われる。",
    "ノートブック形式での対話的な分析やPython・Scala・R・SQLの混在実行が可能だ。MLflowによるモデル実験管理、Delta Lakeによるデータレイクの信頼性向上など、DataOpsとMLOpsの両面をカバーする機能を持つ。"
  ],
  examPoints: [
    "DatabricksとSynapseの使い分けが問われる。Databricksはデータサイエンティストや機械学習エンジニアがSparkを使って大規模処理や機械学習を行うのに向く。SynapseはSQLベースのデータウェアハウス処理やデータ統合パイプライン（Data Factoryとの統合）に強い。AZ-900やDP-900では「機械学習のためのビッグデータ処理基盤」という文脈でDatabricksが選択肢に登場する。"
  ]
};

window.CERT_SERVICES["microsoft-fabric"] = {
  slug: "microsoft-fabric",
  name: "Microsoft Fabric",
  provider: "azure",
  category: "分析",
  aliases: ["Microsoft Fabric", "OneLake"],
  officialUrl: "https://learn.microsoft.com/ja-jp/fabric/fundamentals/microsoft-fabric-overview",
  summary: [
    "Microsoft Fabricは、データエンジニアリング・データ統合・データウェアハウス・リアルタイム分析・機械学習・Power BIを一つのSaaSプラットフォームに統合したエンドツーエンドの分析サービスだ。すべてのデータはOneLakeと呼ばれる単一の論理データレイクに格納され、重複なく各ワークロードがアクセスできる。",
    "FabricはAzure Synapseを進化させた次世代プラットフォームと位置づけられる。Power BIが深く統合されており、分析からレポーティングまでが同一環境で完結する。テナント単位の課金モデル（Fabric容量）で提供される。"
  ],
  examPoints: [
    "DP-900の改訂範囲にMicrosoft Fabricが追加されており、OneLakeの概念（組織全体の単一データレイク）とFabricの各ワークロード（Data Factory・Synapse Data Engineering・Synapse Data Warehouse・Synapse Real-Time Analytics・Data Activator・Power BI）の役割を理解しておく。『どのワークロードがETLか・OLAPか・リアルタイムか』という問い方で出題される。"
  ]
};

window.CERT_SERVICES["azure-data-factory"] = {
  slug: "azure-data-factory",
  name: "Azure Data Factory",
  provider: "azure",
  category: "分析",
  aliases: ["Data Factory"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/data-factory/introduction",
  summary: [
    "Azure Data Factory（ADF）は、クラウドネイティブのETL/ELTおよびデータ統合サービスだ。オンプレミス・クラウド・SaaSなど90以上のソースからデータを取り込み、変換してデータウェアハウスや分析基盤に格納するパイプラインをGUIで構築できる。",
    "セルフホステッド統合ランタイム（IR）を使うと、ファイアウォール内のオンプレミスデータソースにもアクセスできる。Azure SynapseのOrchestration機能にもData Factoryの技術が組み込まれており、実質的に同じパイプライン機能を提供する。"
  ],
  examPoints: [
    "Data Factoryはデータ移動・変換のオーケストレーションツールであり、データの保存先ではない。『どのサービスでデータを動かすか』という問いの正解がADFになる。SynapseやDatabricksとの組み合わせで出題されることも多い。DP-900では『ETLパイプラインを作成するサービス』として問われる。"
  ]
};

window.CERT_SERVICES["azure-stream-analytics"] = {
  slug: "azure-stream-analytics",
  name: "Azure Stream Analytics",
  provider: "azure",
  category: "分析",
  aliases: ["Stream Analytics"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/stream-analytics/stream-analytics-introduction",
  summary: [
    "Azure Stream Analyticsは、IoTデバイス・アプリケーションログ・ソーシャルメディアなどのリアルタイムデータストリームをSQLライクなクエリで分析するサービスだ。Event HubsやIoT Hubからデータをインジェストしてリアルタイムでフィルタリング・集計し、結果をBlobや Power BI・Cosmos DBなどに出力できる。",
    "ウィンドウ関数（タンブリングウィンドウ・ホッピングウィンドウ・スライディングウィンドウ）を使ってストリームデータを時間軸で集計できるのが特徴だ。コードを書かずにパイプラインを構築でき、スケーリングも自動で行われる。"
  ],
  examPoints: [
    "DP-900では『リアルタイム（ストリーム）処理か、バッチ処理か』という文脈でStream Analyticsが登場する。IoTセンサーデータをリアルタイムで異常検知するといったシナリオでは正解になりやすい。Azure Synapse Analytics（バッチ・ウェアハウス）とStream Analytics（リアルタイム）の使い分けを意識しておく。"
  ]
};

window.CERT_SERVICES["power-bi"] = {
  slug: "power-bi",
  name: "Power BI",
  provider: "azure",
  category: "分析",
  aliases: ["Power BI"],
  officialUrl: "https://learn.microsoft.com/ja-jp/power-bi/fundamentals/power-bi-overview",
  summary: [
    "Power BIは、データを可視化・分析するためのビジネスインテリジェンス（BI）ツールだ。Power BI Desktop（Windowsアプリ）でレポートを作成し、Power BI Service（クラウド）で共有・コラボレーションを行う構成が基本だ。Excel・SQL Database・Cosmos DB・SharePointなど多様なデータソースに接続できる。",
    "ダッシュボード・レポート・データセット・ワークスペースという概念で構成される。Power BI Embeddedを使うとカスタムアプリケーションにPower BIのビジュアルを埋め込める。Microsoft Fabricとの統合により、Fabric上のデータに直接アクセスしてレポートを作成する機能も強化されている。"
  ],
  examPoints: [
    "DP-900ではPower BIが『データの可視化・レポーティングツール』として位置づけられる。OLAP・データウェアハウスとセットで出てくることが多い。Power BI Desktop（ローカル作成）とPower BI Service（クラウド共有）の役割の違いも問われる。AZ-900では分析サービスの例として触れられる程度だが、DP-900ではレポートとダッシュボードの違い（レポートはデータセットからページ形式で詳細分析、ダッシュボードは複数レポートのタイルをまとめた概要表示）も確認する。"
  ]
};

window.CERT_SERVICES["azure-vnet"] = {
  slug: "azure-vnet",
  name: "Azure Virtual Network（VNet）",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Azure Virtual Network", "VNet ピアリング", "VNet"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-networks-overview",
  summary: [
    "Azure Virtual Network（VNet）は、Azureにおけるプライベートネットワークの基本単位だ。VMや他のAzureサービスをVNet内に配置することで、インターネットから隔離した閉域ネットワーク環境を構築できる。CIDRブロックで定義したアドレス空間をサブネットに分割して使う。",
    "VNetピアリングを使うと、異なるVNet間（同一リージョン内またはリージョン間）をAzureバックボーン経由でプライベート接続できる。ピアリングされたVNet同士はシームレスに通信できるが、トランジティブルーティング（A→B→CのBを経由してAとCが通信）はデフォルトで無効なため、必要な場合は追加設定が必要だ。"
  ],
  examPoints: [
    "AZ-104ではVNetのサブネット設計・NSGの適用・VNetピアリングの構成が出題される。AZ-900では『VNetはAzureのプライベートネットワーク基盤』という概念理解を問われる程度だ。ピアリングはグローバルに対応しているがトランジティブルーティングは非対応という引っかけが頻出。VPNゲートウェイやExpressRouteとVNetの関係（VNetはそれらの接続終端）も理解しておく。"
  ]
};

window.CERT_SERVICES["azure-nsg"] = {
  slug: "azure-nsg",
  name: "ネットワーク セキュリティ グループ（NSG）",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["ネットワーク セキュリティ グループ", "NSG"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/virtual-network/network-security-groups-overview",
  summary: [
    "ネットワークセキュリティグループ（NSG）は、Azureリソースへのインバウンドおよびアウトバウンドのネットワークトラフィックをフィルタリングするアクセス制御リストだ。送信元IP・宛先IP・プロトコル・ポート番号の組み合わせでルールを定義し、許可または拒否する。",
    "NSGはサブネットまたはネットワークインターフェイス（NIC）に関連付けられる。サブネットに関連付けると、そのサブネット内の全リソースに適用される。NICに関連付けると特定のVMにのみ適用される。デフォルトでは、Azure内部からの通信・インターネットへのアウトバウンドは許可、インターネットからのインバウンドは拒否というルールが組み込まれている。"
  ],
  examPoints: [
    "NSGとAzure Firewallの違いが問われる。NSGはL4（IPアドレス・ポート）レベルのフィルタリングで、VNet内の通信制御に使う。Azure FirewallはステートフルなマネージドファイアウォールでFQDN（ドメイン名）ベースのフィルタリングやアプリケーションルールに対応し、ハブVNetでの集中管理に向く。SC-900やAZ-104では『ポート80を許可するにはNSGかFirewallどちらか』という問いで使い分けを問われる。"
  ]
};

window.CERT_SERVICES["azure-load-balancer"] = {
  slug: "azure-load-balancer",
  name: "Azure Load Balancer",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Azure Load Balancer"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/load-balancer/load-balancer-overview",
  summary: [
    "Azure Load BalancerはL4（トランスポート層）の負荷分散サービスで、TCPおよびUDPトラフィックを複数のバックエンドリソース（VMなど）に分散する。高可用性と高スループットを実現するインフラの基盤となる。",
    "Standard SKUとBasic SKUがあり、Standardは可用性ゾーンをまたいだ構成や、より詳細な診断メトリクスをサポートする。パブリックLBはインターネット向けトラフィックを分散し、内部LBはVNet内部のトラフィックを分散する。"
  ],
  examPoints: [
    "Azure Load Balancer（L4）とApplication Gateway（L7）の使い分けが典型的な問題だ。Load BalancerはHTTPのURLパスやホスト名では振り分けられず、IPアドレス・ポートベースの分散のみ。Application GatewayはHTTPSオフロード・URLルーティング・WAF機能を持つL7ロードバランサーだ。『HTTPSを終端してバックエンドに転送したい』ならApplication Gateway、『TCPトラフィックを分散したい』ならLoad Balancerが正解になる。"
  ]
};

window.CERT_SERVICES["azure-application-gateway"] = {
  slug: "azure-application-gateway",
  name: "Azure Application Gateway",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Application Gateway"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/application-gateway/overview",
  summary: [
    "Azure Application GatewayはL7（アプリケーション層）の負荷分散サービスで、HTTPおよびHTTPSトラフィックをURLパス・ホスト名・HTTPヘッダーなどに基づいて振り分けられる。TLS終端（HTTPSオフロード）機能を持ち、バックエンドへの通信はHTTPに変換して転送できる。",
    "WAF（Web Application Firewall）機能をオプションで有効にすると、OWASP（Open Web Application Security Project）のルールセットに基づいてSQLインジェクション・XSSなどのWebアタックを検知・ブロックできる。ルーティングにはURLパスベースルーティング（例：/api/→APIサーバー群、/images/→イメージサーバー群）も設定可能だ。"
  ],
  examPoints: [
    "Application GatewayとAzure Front Doorの使い分けも問われる。Application Gatewayはリージョン内のトラフィック制御に使い、Front Doorはグローバルなリージョン間のHTTP負荷分散やCDN・WAFを提供する。SC-900ではWAFの概念をApplication Gatewayの文脈で説明する問題が出る。"
  ]
};

window.CERT_SERVICES["azure-firewall"] = {
  slug: "azure-firewall",
  name: "Azure Firewall",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Azure Firewall"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/firewall/overview",
  summary: [
    "Azure Firewallは、クラウドネイティブのステートフルなマネージドファイアウォールサービスだ。NSGがL4のIPアドレス・ポートベースのフィルタリングに留まるのに対し、Azure FirewallはFQDN（完全修飾ドメイン名）ベースのルールやアプリケーションルールを設定でき、より高度なトラフィック制御が可能だ。",
    "ハブ＆スポーク型のネットワーク構成で、ハブVNet内のFirewallを通じてすべてのスポークVNetのトラフィックを集中管理するアーキテクチャが一般的だ。Azure Firewall Premiumは、TLSインスペクション・IDSやIPSによる脅威インテリジェンスフィルタリングをサポートする。"
  ],
  examPoints: [
    "Azure FirewallとNSGの使い分けは頻出だ。NSGはVNet内の細かいポート制御に使い、Azure FirewallはVNet間やインターネット向けトラフィックの集中管理や高度なフィルタリングに使う。AZ-104やSC-900では『FQDNベースのルールを設定したい』『アウトバウンドトラフィックを集中管理したい』という要件でFirewallが正解になる。"
  ]
};

window.CERT_SERVICES["azure-bastion"] = {
  slug: "azure-bastion",
  name: "Azure Bastion",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Azure Bastion", "Bastion"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/bastion/bastion-overview",
  summary: [
    "Azure BastionはブラウザベースのマネージドSSH/RDPサービスで、VMのパブリックIPアドレスを持たずにAzure Portalから安全にVMへアクセスできる。VMに直接パブリックIPを付与しないため、インターネットからの直接攻撃にさらされるリスクを排除できる。",
    "Bastionは専用サブネット（AzureBastionSubnetという名称が必須）にデプロイし、VNet内のVMにプライベート接続する。クライアントへのエージェントインストールが不要で、Webブラウザのみで操作できる。"
  ],
  examPoints: [
    "『VMにパブリックIPが不要でも安全にRDP/SSHできる方法』という問いでBastionが正解になる。AZ-104やSC-900では「ジャストインタイム（JIT）VMアクセス」（Microsoft Defender for Cloudの機能）との組み合わせも出題される。JITはNSGルールを必要時のみ開けるもので、Bastionはパブリックリファレンスを持たずに接続するための別機能という区別が重要だ。"
  ]
};

window.CERT_SERVICES["azure-private-endpoint"] = {
  slug: "azure-private-endpoint",
  name: "プライベート エンドポイント",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Private Endpoint", "プライベート エンドポイント", "プライベートエンドポイント"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/private-link/private-endpoint-overview",
  summary: [
    "プライベートエンドポイントは、Azure PaaSサービス（Blob Storage・SQL Database・Key Vaultなど）への接続をVNet内のプライベートIPアドレス経由で行う機能だ。サービスへのトラフィックがインターネットを経由せず、Azureバックボーン上のプライベート接続で完結する。",
    "Azure Private Linkの機能の一部で、PaaSサービスを仮想的にVNetに引き込むようなイメージで動作する。プライベートエンドポイントを作成するとVNet内にネットワークインターフェイス（NIC）が作られ、DNSにプライベートIPが登録される。"
  ],
  examPoints: [
    "AZ-104やSC-900では『Blob StorageへのアクセスをインターネットなしでVNet内に限定したい』という要件でプライベートエンドポイントが正解になる。サービスエンドポイント（Service Endpoint）との違いも問われる。サービスエンドポイントはVNetからPaaSサービスへの経路最適化だがパブリックIPを使う、プライベートエンドポイントは完全にプライベートIPでアクセスできるという違いを押さえておく。"
  ]
};

window.CERT_SERVICES["azure-vpn-gateway"] = {
  slug: "azure-vpn-gateway",
  name: "Azure VPN Gateway",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["VPN Gateway"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/vpn-gateway/vpn-gateway-about-vpngateways",
  summary: [
    "Azure VPN Gatewayは、オンプレミスネットワークとAzure VNetをIPsecトンネルで暗号化接続するためのゲートウェイサービスだ。サイト間VPN（S2S）でオンプレミスVPN機器とAzureを接続する構成と、ポイント対サイトVPN（P2S）で個人のデバイスからVNetに接続する構成がある。",
    "VPN Gatewayは専用サブネット（GatewaySubnet）にデプロイする必要がある。帯域幅はゲートウェイSKUによって決まり、最大10Gbpsまでスケールアップできる。同一VNetに配置できるVPN GatewayとExpressRoute Gatewayは1つずつだ。"
  ],
  examPoints: [
    "VPN GatewayとExpressRouteの使い分けが頻出だ。VPNはインターネット経由の暗号化接続で低コスト、ExpressRouteはプロバイダー経由の専用回線で高帯域・低レイテンシ・SLA保証という違いを覚えておく。AZ-900では『安全なオンプレミス接続の手段』という問いで両方が選択肢に登場する。コストと帯域・信頼性の要件で使い分けるという判断軸を明確にしておく。"
  ]
};

window.CERT_SERVICES["azure-expressroute"] = {
  slug: "azure-expressroute",
  name: "Azure ExpressRoute",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["ExpressRoute"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/expressroute/expressroute-introduction",
  summary: [
    "Azure ExpressRouteは、オンプレミスネットワークとAzureをインターネットを経由せずに専用回線で接続するサービスだ。通信事業者（プロバイダー）が提供するプライベート接続を通じてAzureのデータセンターに接続するため、インターネットVPNより高帯域・低レイテンシ・安定した接続品質を提供する。",
    "帯域幅は50Mbpsから100Gbpsまで選択でき、99.95%のSLAが保証される。GlobalReachオプションでは、異なる拠点のExpressRoute回線をAzureバックボーン経由で相互接続できる。Microsoft 365やDynamics 365へのアクセスにもExpressRouteを利用できる。"
  ],
  examPoints: [
    "AZ-900では『インターネットを使わない専用線接続』という要件でExpressRouteが正解になる。VPN Gatewayとの比較問題では、ExpressRouteは『帯域保証・低レイテンシ・SLA付き・コスト高』、VPNは『インターネット経由・安価・設定が早い』という整理で覚える。ExpressRoute経由でもAzureリソースへのアクセスはVNet内のゲートウェイ（ExpressRoute Gateway）を経由するという仕組みも押さえておく。"
  ]
};

window.CERT_SERVICES["azure-dns"] = {
  slug: "azure-dns",
  name: "Azure DNS",
  provider: "azure",
  category: "ネットワーキング",
  aliases: ["Azure DNS", "プライベート DNS ゾーン"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/dns/dns-overview",
  summary: [
    "Azure DNSは、Microsoftのグローバルなネットワーク上でDNSドメインをホスティングするサービスだ。ドメインレジストラーで取得したドメインのネームサーバーをAzure DNSに委任することで、DNSレコード（A・CNAME・MXなど）をAzure上で管理できる。",
    "プライベートDNSゾーン（Private DNS Zone）はVNet内のリソース名前解決に使う機能で、VNet内のVMなどがFQDNでプライベートIPにアクセスできるようにする。プライベートエンドポイントと組み合わせて、PaaSサービスのプライベートIPを解決するDNS構成に使われることが多い。"
  ],
  examPoints: [
    "AZ-104ではAzure DNSのゾーン種別（パブリックゾーン vs プライベートゾーン）の使い分けと、プライベートDNSゾーンのVNetへのリンク設定が出題される。プライベートエンドポイントを構成した場合、そのFQDNをプライベートIPに解決するためにプライベートDNSゾーンが必要という連携の仕組みも問われる。"
  ]
};

window.CERT_SERVICES["azure-monitor"] = {
  slug: "azure-monitor",
  name: "Azure Monitor",
  provider: "azure",
  category: "管理・ガバナンス",
  aliases: ["Azure Monitor", "Application Insights", "アクション グループ"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/azure-monitor/overview",
  summary: [
    "Azure Monitorは、Azureリソースとオンプレミスリソースのメトリクスとログを収集・分析・可視化するモニタリングプラットフォームだ。VMのCPU使用率やWebアプリのレスポンス時間など、さまざまなリソースの稼働状況をリアルタイムで監視できる。",
    "Application Insightsはアプリケーションのパフォーマンスと利用状況を監視するAzure Monitorの機能の一つで、リクエスト数・エラー率・依存関係の応答時間などを自動的にトラッキングする。アクショングループ（Action Group）はアラートが発生した際の通知先（メール・SMS・Webhook・Azure Functions呼び出しなど）をまとめたもので、アラートルールに紐付けて使う。"
  ],
  examPoints: [
    "Azure MonitorとLog Analyticsの関係を整理する。Azure Monitorがメトリクスとログのデータソースであるのに対し、Log Analyticsワークスペースはそれらのログデータを蓄積して分析するためのストアだ。AZ-104では診断設定（Diagnostic Settings）でリソースのログをLog Analyticsワークスペースに送る設定や、Application InsightsをApp Serviceに有効化する手順が出題される。"
  ]
};

window.CERT_SERVICES["log-analytics"] = {
  slug: "log-analytics",
  name: "Log Analytics",
  provider: "azure",
  category: "管理・ガバナンス",
  aliases: ["Log Analytics", "KQL"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/azure-monitor/logs/log-analytics-overview",
  summary: [
    "Log Analyticsは、Azure MonitorのログデータをKQL（Kusto Query Language）で検索・分析するためのワークスペースとクエリツールだ。VM・アプリ・Azure Firewallなど各リソースの診断ログをLog Analyticsワークスペースに集約し、統合的に分析できる。",
    "KQLはSQL的な直感的な構文で、テーブルのフィルタリング・集計・結合・時系列グラフ化が可能だ。Microsoft Sentinelのデータ検索や、Defender for Cloudのセキュリティイベント分析にもLog AnalyticsとKQLが使われる。"
  ],
  examPoints: [
    "AZ-104ではLog Analyticsワークスペースへのログ送信設定（診断設定）とKQLの基本的なクエリ構文が出題される。AZ-900では『ログを一元管理して分析するサービス』として問われる。Microsoft SentinelはLog Analyticsワークスペースを基盤にしており、SIEM機能を提供するという関係性も確認しておく。"
  ]
};

window.CERT_SERVICES["azure-backup"] = {
  slug: "azure-backup",
  name: "Azure Backup",
  provider: "azure",
  category: "管理・ガバナンス",
  aliases: ["Azure Backup", "Recovery Services"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/backup/backup-overview",
  summary: [
    "Azure Backupは、VM・ファイル・データベース・オンプレミスサーバーなどのデータをクラウドにバックアップするマネージドサービスだ。エージェントレスでAzure VMのバックアップができ、Recovery Servicesコンテナーにデータを保管する。",
    "Recovery Servicesコンテナーはバックアップデータと管理設定をまとめるリソースで、バックアップポリシー（どの頻度でバックアップし何日間保持するか）をここで定義する。GRS（地理冗長）が既定のストレージ冗長で、別リージョンに保持する設定も可能だ。"
  ],
  examPoints: [
    "Azure BackupとAzure Site Recoveryの違いが頻出だ。Backupは『データの消失・破損からの復元（バックアップ）』、Site Recoveryは『サービス停止時の別リージョンへのフェールオーバー（ディザスターリカバリー）』だという役割の違いを覚えておく。AZ-900では両者がともにRecovery Servicesコンテナーを使うことも混乱のもとになる。"
  ]
};

window.CERT_SERVICES["azure-site-recovery"] = {
  slug: "azure-site-recovery",
  name: "Azure Site Recovery",
  provider: "azure",
  category: "管理・ガバナンス",
  aliases: ["Site Recovery"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/site-recovery/site-recovery-overview",
  summary: [
    "Azure Site Recovery（ASR）は、ビジネス継続性とディザスターリカバリー（BCDR）を実現するためのサービスだ。プライマリリージョンのVMをセカンダリリージョンに継続的にレプリケートし、大規模な障害発生時にフェールオーバーして短時間でサービスを復旧できる。",
    "VMwareやHyper-Vなどオンプレミス環境からAzureへのレプリケーション、AzureリージョンからAzureリージョンへのレプリケーションをサポートする。RPO（目標復旧時点）は数秒〜数分、RTO（目標復旧時間）は数十分程度と短い。"
  ],
  examPoints: [
    "AZ-900では『災害からの迅速な復旧手段』としてSite Recoveryが出題される。Azure BackupとSite Recoveryの違い（バックアップ vs ディザスターリカバリー）は頻出なので確実に区別する。RPO・RTOという概念の理解も問われ、RPOは『どれだけ前のデータまで許容するか』、RTOは『復旧にかけてよい時間』という定義を覚えておく。"
  ]
};

window.CERT_SERVICES["azure-key-vault"] = {
  slug: "azure-key-vault",
  name: "Azure Key Vault",
  provider: "azure",
  category: "セキュリティ",
  aliases: ["Key Vault"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/key-vault/general/overview",
  summary: [
    "Azure Key Vaultは、暗号化キー・シークレット（APIキー・パスワード・接続文字列）・証明書を安全に保管・管理するサービスだ。アプリケーションのコードや設定ファイルに機密情報をハードコードせず、Key Vaultから取得する設計にすることでセキュリティを向上させる。",
    "アクセス制御はアクセスポリシーまたはAzure RBACで管理できる。Key VaultはHSM（ハードウェアセキュリティモジュール）を使ったキー保護（Premium SKU）にも対応しており、金融系など高いセキュリティ要件のシステムでも利用できる。Managed IdentityをアプリケーションやVMに割り当てることで、認証情報なしでKey Vaultにアクセスできる。"
  ],
  examPoints: [
    "AZ-104とSC-900で頻繁に登場する。『接続文字列をコードに埋め込まないためにどのサービスを使うか』という問いでKey Vaultが正解になる。Managed Identityとの組み合わせ（アプリがKey Vaultからシークレットを取得する際にManaged Identityを使って認証する）も出題される。AZ-900では『シークレット管理』の文脈で言及される程度だ。"
  ]
};

window.CERT_SERVICES["microsoft-defender-for-cloud"] = {
  slug: "microsoft-defender-for-cloud",
  name: "Microsoft Defender for Cloud",
  provider: "azure",
  category: "セキュリティ",
  aliases: ["Defender for Cloud", "セキュア スコア", "セキュアスコア"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/defender-for-cloud/defender-for-cloud-introduction",
  summary: [
    "Microsoft Defender for Cloudは、Azureおよびハイブリッドクラウドとマルチクラウド環境（AWS・GCPも含む）のセキュリティ態勢管理（CSPM）と脅威保護（CWPP）を提供するサービスだ。リソースの設定ミス・脆弱性・不審な活動を検出し、推奨事項として提示する。",
    "セキュアスコア（Secure Score）は、Defender for CloudがAzure環境全体のセキュリティ態勢をスコアリングした指標だ。推奨事項を実装するとスコアが上がる仕組みで、改善優先度の判断に使える。Defender for Cloud内のMicrosoft Defender各プラン（Defender for Servers・Defender for Databasesなど）を有効にすると、より高度な脅威検知機能が使える。"
  ],
  examPoints: [
    "SC-900ではDefender for Cloudの役割（CSPM・CWPPの提供）とセキュアスコアの概念が頻出だ。AZ-900では『Azureリソースのセキュリティ状態を評価する』サービスとして問われる。Just-In-Time VMアクセス機能はDefender for Cloudの機能で、NSSGルールを必要時のみ開放する仕組みという点も確認しておく。"
  ]
};

window.CERT_SERVICES["microsoft-defender-xdr"] = {
  slug: "microsoft-defender-xdr",
  name: "Microsoft Defender XDR",
  provider: "azure",
  category: "セキュリティ",
  aliases: ["Defender XDR", "Defender for Endpoint", "Defender for Office 365", "Defender for Identity", "Defender for Cloud Apps"],
  officialUrl: "https://learn.microsoft.com/ja-jp/defender-xdr/microsoft-365-defender",
  summary: [
    "Microsoft Defender XDR（Extended Detection and Response）は、エンドポイント・メール・ID・クラウドアプリにまたがる脅威を横断的に検出・調査・対応するための統合セキュリティプラットフォームだ。Defender for Endpoint（エンドポイント）・Defender for Office 365（メール・コラボレーション）・Defender for Identity（オンプレミスAD）・Defender for Cloud Apps（クラウドアプリ）が統合されている。",
    "複数製品のアラートを相関分析し、インシデントとして一元管理する。自動化された調査・修復機能（AIRおよびAutomatic Remediation）により、SOCチームの対応負担を軽減できる。"
  ],
  examPoints: [
    "SC-900では各Defenderプロダクトが何を守るかを覚える必要がある。Defender for Endpointはデバイス（PC・サーバー）、Defender for Office 365はメール・Teams・SharePoint、Defender for IdentityはオンプレミスのActive Directory、Defender for Cloud AppsはSaaSアプリのシャドーIT検知と保護に対応する。『Officeのフィッシング対策はどのDefender製品か』という形で出題される。"
  ]
};

window.CERT_SERVICES["microsoft-sentinel"] = {
  slug: "microsoft-sentinel",
  name: "Microsoft Sentinel",
  provider: "azure",
  category: "セキュリティ",
  aliases: ["Microsoft Sentinel", "Sentinel"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/sentinel/overview",
  summary: [
    "Microsoft Sentinelは、クラウドネイティブのSIEM（Security Information and Event Management）およびSOAR（Security Orchestration, Automation and Response）サービスだ。Log Analyticsワークスペースを基盤にし、Azure・AWS・オンプレミスなど多様なソースからセキュリティログを集約して脅威を検出・分析する。",
    "組み込みの分析ルール・Workbook・Playbookを使って、セキュリティイベントの可視化・自動対応が可能だ。PlaybookはLogic Appsで実装したフローで、アラート発生時にチケットを自動作成したりデバイスを隔離したりといった自動応答を設定できる。"
  ],
  examPoints: [
    "SC-900ではSentinelが『SIEMとSOARを組み合わせたサービス』として問われる。Defender for Cloud（セキュリティ態勢管理・脅威保護）とSentinel（ログ収集・脅威分析・自動応答）の違いを整理すること。SentinelのデータコネクタでDefender製品のアラートをSentinelに取り込み、一元管理するというアーキテクチャも定番の出題パターンだ。"
  ]
};

window.CERT_SERVICES["microsoft-purview"] = {
  slug: "microsoft-purview",
  name: "Microsoft Purview",
  provider: "azure",
  category: "コンプライアンス",
  aliases: ["Microsoft Purview", "Purview", "秘密度ラベル", "eDiscovery"],
  officialUrl: "https://learn.microsoft.com/ja-jp/purview/purview",
  summary: [
    "Microsoft Purviewは、データガバナンス・情報保護・コンプライアンス管理を統合したプラットフォームだ。組織内の機密データを検出・分類・保護し、規制要件（GDPR・HIPAAなど）へのコンプライアンスを維持するための機能を提供する。",
    "主要機能として、データマップ（Azure・多クラウド・オンプレミスのデータ資産の管理）・情報保護（秘密度ラベル・DLPポリシーでのデータ分類と保護）・コンプライアンス管理（eDiscovery・監査ログ・コミュニケーションコンプライアンス）がある。秘密度ラベルはOffice文書やメールに機密区分（社外秘・極秘など）を付与し、暗号化や権限制限をかける機能だ。"
  ],
  examPoints: [
    "SC-900ではPurviewが情報保護とコンプライアンスのためのサービスとして問われる。秘密度ラベル（Sensitivity Label）はMicrosoft 365の文書やメールに適用するもの、DLP（Data Loss Prevention）ポリシーは機密データの外部送信を防ぐものという区別を覚える。eDiscoveryはHold（法的保全）・検索・エクスポートの機能で、訴訟や調査に対応するためのデータ保全・収集機能だ。"
  ]
};

window.CERT_SERVICES["azure-openai"] = {
  slug: "azure-openai",
  name: "Azure OpenAI Service",
  provider: "azure",
  category: "AI・機械学習",
  aliases: ["Azure OpenAI"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/ai-services/openai/overview",
  summary: [
    "Azure OpenAI Serviceは、OpenAIが開発したGPT-4o・GPT-4・DALL-E・Whisperなどのモデルをエンタープライズ向けセキュリティとコンプライアンスを備えたAzureの環境から利用できるサービスだ。APIを通じてテキスト生成・コード生成・画像生成・音声認識などの機能をアプリケーションに組み込める。",
    "Azureの責任あるAI（Responsible AI）基準を満たしており、入力プロンプトと出力コンテンツはOpenAIのモデルトレーニングに使用されない。コンテンツフィルター機能で有害コンテンツの生成を制限できる。RAG（Retrieval Augmented Generation）パターンでAzure AI Searchと組み合わせて、自社データに基づいた回答生成もできる。"
  ],
  examPoints: [
    "AI-900ではAzure OpenAI ServiceがGenerative AI（生成AI）の文脈で問われる。GPTモデルの用途（テキスト補完・要約・翻訳・コード生成）とDALL-E（画像生成）の違いを理解しておく。AZ-900やAI-900では『OpenAIのモデルをAzureのセキュリティと組み合わせて使うサービス』として説明できれば十分だ。"
  ]
};

window.CERT_SERVICES["azure-ai-language"] = {
  slug: "azure-ai-language",
  name: "Azure AI Language",
  provider: "azure",
  category: "AI・機械学習",
  aliases: ["Azure AI Language", "Azure AI Speech", "Azure AI Translator"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/ai-services/language-service/overview",
  summary: [
    "Azure AI Languageは、テキスト分析・感情分析・キーフレーズ抽出・固有表現認識（NER）・質問応答・テキスト分類などのNLP（自然言語処理）機能を提供するサービスだ。Azure AI Speechは音声認識（STT）・テキスト読み上げ（TTS）・音声翻訳を、Azure AI Translatorはテキスト翻訳をAPI形式で提供する。",
    "これらはAzure AI Services（旧Cognitive Services）ファミリーの一部で、コード不要または少ないコードで高度なAI機能をアプリケーションに統合できる。カスタムモデルのトレーニングにも対応しており、独自のテキスト分類器や固有表現抽出モデルを作成できる。"
  ],
  examPoints: [
    "AI-900ではNLP（自然言語処理）カテゴリとして、テキスト分析・感情分析・言語検出・翻訳のユースケースを問われる。Azure AI LanguageとAzure AI Speechの役割の違い（テキスト系 vs 音声系）、Azure AI TranslatorはLanguageとは別サービスという点も確認する。どのシナリオにどのサービスを使うかという使い分け問題が頻出だ。"
  ]
};

window.CERT_SERVICES["azure-ai-vision"] = {
  slug: "azure-ai-vision",
  name: "Azure AI Vision",
  provider: "azure",
  category: "AI・機械学習",
  aliases: ["Azure AI Vision", "Custom Vision", "Azure AI Face"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/ai-services/computer-vision/overview",
  summary: [
    "Azure AI Visionは、画像・動画の分析に特化したAIサービスだ。物体検出・画像分類・OCR（光学的文字認識）・画像キャプション生成などの機能を提供する。現在の中核はImage Analysis 4.0で、キャプション生成・タグ付け・物体検出・OCRといった機能が単一のAPIに統合されている。Custom Visionを使うと独自の画像分類・物体検出モデルを、ノーコードで作成・デプロイできる。",
    "Azure AI Faceは顔検出・顔認識・感情推定などの顔関連のAI機能を提供するサービスで、Azure AI Visionとは別のサービスとして提供される。責任あるAIの観点から、なりすまし防止のための本人確認（identity verification）など一部の機能は限定的なシナリオのみにアクセス制限（申請制）がかかっている。"
  ],
  examPoints: [
    "AI-900ではコンピュータービジョンのユースケースを問われる。画像の中に何が写っているか（物体検出・画像分類）、画像内のテキストを読み取る（OCR）、顔を検出・識別する（Face）という3つの用途と対応するサービスを整理しておく。Custom Visionで独自データセットを使ってモデルを訓練できるという点も出題される。",
    "Azure AI VisionとDocument Intelligence（旧Form Recognizer）の守備範囲の違いも問われる。Vision/OCRは画像中の文字を「読み取る」までが守備範囲なのに対し、Document Intelligenceは請求書・領収書・身分証・フォームなど構造のある文書から、項目名と値のペアや表をキー・バリューとして「構造化して抽出」することに特化している。『書類から金額や日付を項目として取り出したい』ならDocument Intelligenceが正解になる。"
  ]
};

window.CERT_SERVICES["azure-machine-learning"] = {
  slug: "azure-machine-learning",
  name: "Azure Machine Learning",
  provider: "azure",
  category: "AI・機械学習",
  aliases: ["Azure Machine Learning", "自動機械学習", "AutoML"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/machine-learning/overview-what-is-azure-machine-learning",
  summary: [
    "Azure Machine Learning（Azure ML）は、機械学習モデルのデータ準備・学習・評価・デプロイ・監視のライフサイクル全体を管理するプラットフォームだ。データサイエンティストがPythonコードを使って実験するJupyterノートブック環境から、ローコードでモデルを作成できるデザイナーまで幅広いインターフェイスを提供する。",
    "自動機械学習（AutoML）はデータを与えるだけでアルゴリズムの選定・ハイパーパラメータのチューニングを自動で行い、最適なモデルを探索する機能だ。完成したモデルはAzureのマネージドエンドポイントにデプロイしてAPIとして公開でき、リアルタイム推論やバッチ推論に使える。"
  ],
  examPoints: [
    "AI-900ではAzure MLがエンドツーエンドのMLプラットフォームとして位置づけられる。AutoMLは『コードを書かずに機械学習モデルを作れる』機能として出題される。Azure AI Services（Vision・Language等）は学習済みモデルをAPIで使うもの、Azure MLは独自データでモデルを訓練するものという区別が重要だ。DatabricksとのMLワークロードの比較（Databricksは大規模Spark処理も含む）も押さえておく。"
  ]
};

window.CERT_SERVICES["azure-cost-management"] = {
  slug: "azure-cost-management",
  name: "Microsoft Cost Management",
  provider: "azure",
  category: "コスト管理",
  aliases: ["Azure Cost Management", "Cost Management"],
  officialUrl: "https://learn.microsoft.com/ja-jp/azure/cost-management-billing/costs/overview-cost-management",
  summary: [
    "Microsoft Cost Management（旧Azure Cost Management）は、Azureリソースのコストを可視化・分析・最適化するためのサービスだ。コスト分析ダッシュボードでリソース・サービス・リージョン・タグ別のコスト内訳を確認でき、予算（Budget）を設定してしきい値超過時にアラートを送れる。",
    "推奨事項機能では、使われていないリソースや過剰スペックのリソースを検出してコスト削減の提案を行う。Azure Advisorとも統合されており、コスト・セキュリティ・可用性・パフォーマンスの4観点で推奨事項を提供する。"
  ],
  examPoints: [
    "AZ-900ではAzureのコスト管理の手段としてCost Managementが問われる。予約インスタンス（Reserved Instances）・Azure Hybrid Benefit（オンプレミスのWindowsやSQL ServerライセンスをAzureで使い回す）・スポットインスタンスなど、コスト削減手段との組み合わせ問題も出る。『コストをモニタリングして超過アラートを設定するサービス』という問いではCost Managementが正解だ。"
  ]
};
