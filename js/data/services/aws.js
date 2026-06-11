// js/data/services/aws.js  — AWS サービス解説データ
// UTF-8 BOMなし / window.CERT_SERVICES に追記する形式
window.CERT_SERVICES = window.CERT_SERVICES || {};

window.CERT_SERVICES["aws-lambda"] = {
  slug: "aws-lambda", name: "AWS Lambda", provider: "aws", category: "コンピューティング",
  aliases: ["AWS Lambda", "Lambda"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/welcome.html",
  summary: [
    "サーバーのプロビジョニングや管理なしにコードを実行できるサーバーレスコンピューティングサービス。イベント駆動で関数が起動し、実行時間と呼び出し回数に対してのみ課金される。",
    "最大15分の実行時間制限があり、同時実行数はデフォルト1,000（リージョン上限）。コールドスタート遅延が発生するため、Provisioned Concurrencyで事前ウォームアップが可能。"
  ],
  examPoints: [
    "SAAでは「サーバー管理不要・短時間処理・イベント駆動」のシナリオでEC2やECSと使い分けが問われる。15分超の処理はLambdaでは実現不可という引っかけに注意。",
    "DVAではデプロイパッケージサイズ上限（50MB zip / 250MB解凍）、環境変数によるシークレット管理（Secrets Managerとの連携）、X-Rayトレースの有効化が頻出。",
    "SAPではステートレス設計・DLQ（デッドレターキュー）設定・EventBridgeやSQSとの組み合わせによるFanoutパターンが問われる。"
  ]
};

window.CERT_SERVICES["amazon-ec2"] = {
  slug: "amazon-ec2", name: "Amazon EC2", provider: "aws", category: "コンピューティング",
  aliases: ["Amazon EC2", "EC2"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/concepts.html",
  summary: [
    "クラウド上で仮想サーバー（インスタンス）をオンデマンドで起動・停止できるIaaSサービス。インスタンスタイプ（汎用・コンピューティング最適化・メモリ最適化など）を用途に応じて選択する。",
    "購入オプションはオンデマンド・リザーブドインスタンス・スポットインスタンス・Savings Plansの4種。Auto ScalingとELBを組み合わせて可用性とコスト効率を両立させる構成が基本。"
  ],
  examPoints: [
    "SAAではオンデマンド／リザーブド／スポットの使い分けが必ず出題される。定常負荷はリザーブド、中断可能なバッチ処理はスポット、突発増加にはAuto Scalingという組み合わせを覚える。",
    "EC2 vs Lambda の使い分けでは「15分超の処理」「ステートフルな常駐処理」「OS操作が必要」ならEC2、という判断軸が引っかけの核心。",
    "インスタンスメタデータのIMDSv2必須化、セキュリティグループ（ステートフル）とNACL（ステートレス）の違いも頻出。"
  ]
};

window.CERT_SERVICES["aws-elastic-beanstalk"] = {
  slug: "aws-elastic-beanstalk", name: "AWS Elastic Beanstalk", provider: "aws", category: "コンピューティング",
  aliases: ["Elastic Beanstalk"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/elasticbeanstalk/latest/dg/Welcome.html",
  summary: [
    "アプリケーションのコードをアップロードするだけで、EC2・ELB・Auto Scaling・RDSのプロビジョニングとデプロイを自動化するPaaSサービス。開発者がインフラ管理を意識せずに済む。",
    "サポート言語はJava・.NET・PHP・Node.js・Python・Ruby・Go・Docker。内部リソースへのアクセス権は保持しており、必要に応じてカスタム設定（.ebextensions）で制御可能。"
  ],
  examPoints: [
    "SAAでは「インフラ管理を最小限にしたい」「コードだけ渡せば動かしたい」というシナリオで選ぶ。ECSやEC2直接構成より運用負荷が低いが、Lambdaとは「常時稼働が必要かどうか」で使い分ける。",
    "Blue/GreenデプロイはElastic Beanstalk環境のURLスワップで実現する点、ローリングアップデート中の稼働インスタンス数に関する設問が頻出。"
  ]
};

window.CERT_SERVICES["amazon-ecs"] = {
  slug: "amazon-ecs", name: "Amazon ECS", provider: "aws", category: "コンテナ",
  aliases: ["Amazon ECS", "ECS", "Fargate"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/Welcome.html",
  summary: [
    "DockerコンテナをAWS上でオーケストレーションするフルマネージドサービス。起動タイプはEC2（ホスト管理あり）とFargate（サーバーレス・ホスト管理不要）の2種類。",
    "タスク定義でCPU・メモリ・コンテナイメージ・IAMロールを定義し、サービスで希望するタスク数を維持する。ELBとの統合でトラフィック分散も可能。"
  ],
  examPoints: [
    "ECS vs EKS の使い分けが頻出。「Kubernetes互換が必要・既存K8sワークロードの移行」ならEKS、「AWSネイティブで簡単にコンテナを動かしたい」ならECS。",
    "Fargateを使うと「EC2インスタンスのパッチ管理が不要」になる点が試験で問われる。EC2起動タイプとFargateの料金モデル・管理責任の違いも確認しておく。",
    "SAPではタスクロール（コンテナがAWSリソースにアクセスする権限）とタスク実行ロール（ECSエージェントがECRからイメージを取得する権限）の区別が問われる。"
  ]
};

window.CERT_SERVICES["amazon-eks"] = {
  slug: "amazon-eks", name: "Amazon EKS", provider: "aws", category: "コンテナ",
  aliases: ["Amazon EKS", "EKS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/eks/latest/userguide/what-is-eks.html",
  summary: [
    "AWS上でKubernetesを実行するためのマネージドサービス。コントロールプレーン（マスターノード）の管理をAWSが担い、ユーザーはワーカーノードのみを管理する。",
    "ノードグループはEC2（セルフマネージド・マネージド）またはFargate（サーバーレス）で構成できる。EKS Anywhereでオンプレミスやエッジでも同じKubernetes環境を動かせる。"
  ],
  examPoints: [
    "「既存のKubernetesワークロードをAWSに移行したい」「Kubernetesの標準APIが必要」というシナリオではEKSを選ぶ。ECSとの最大の違いはKubernetes互換性の有無。",
    "SAPではマルチクラスター管理・EKS Distroとの関係・IAM Roles for Service Accounts（IRSA）によるPodへのIAM権限付与が問われる。"
  ]
};

window.CERT_SERVICES["amazon-ecr"] = {
  slug: "amazon-ecr", name: "Amazon ECR", provider: "aws", category: "コンテナ",
  aliases: ["Amazon ECR", "ECR"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/what-is-ecr.html",
  summary: [
    "DockerコンテナイメージをAWS上でホスティングするフルマネージドのプライベートレジストリサービス。ECSやEKSとシームレスに統合でき、IAMによるアクセス制御が可能。",
    "イメージスキャン機能でOSおよびプログラミング言語パッケージの脆弱性を検出できる。ライフサイクルポリシーで古いイメージを自動削除しストレージコストを管理する。"
  ],
  examPoints: [
    "ECSやEKSと組み合わせるコンテナ構成の問題で「どこにイメージを保存するか」という問いにはECRを選ぶ。DockerHubとの比較ではIAM統合・VPC内通信（PrivateLink）のメリットが引っかけになる。",
    "クロスアカウントでのイメージ共有にはリポジトリポリシーを使う点、パブリックギャラリー（ECR Public）の存在も確認しておく。"
  ]
};

window.CERT_SERVICES["amazon-s3"] = {
  slug: "amazon-s3", name: "Amazon S3", provider: "aws", category: "ストレージ",
  aliases: ["Amazon S3", "S3"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html",
  summary: [
    "オブジェクトストレージサービス。バケット単位でデータを管理し、オブジェクトサイズは最大5TB、ストレージ容量に上限はない。イレブンナインズ（99.999999999%）の耐久性を持つ。",
    "ストレージクラスはStandard・Standard-IA・One Zone-IA・Glacier Instant・Glacier Flexible・Glacier Deep Archiveの6種。ライフサイクルポリシーで自動的にクラスを移行してコスト最適化できる。"
  ],
  examPoints: [
    "SAAではストレージクラスの使い分けが頻出。「アクセス頻度が低い・即時取得不要・長期保存」ならGlacier系を選ぶ。One Zone-IAはAZ障害で失ってもよいデータ向けという引っかけに注意。",
    "静的ウェブサイトホスティング・署名付きURL・バケットポリシーとACLの違い・クロスリージョンレプリケーション（CRR）が問われる。S3 Transfer Accelerationは遠距離の高速アップロードに使う。",
    "SAPではS3 Object LockのWORM設定（Governance/Compliance mode）・S3 Select・マルチパートアップロードの使いどころが出題される。"
  ]
};

window.CERT_SERVICES["amazon-ebs"] = {
  slug: "amazon-ebs", name: "Amazon EBS", provider: "aws", category: "ストレージ",
  aliases: ["Amazon EBS", "EBS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/ebs/latest/userguide/what-is-ebs.html",
  summary: [
    "EC2インスタンスにアタッチするブロックストレージサービス。同一AZ内のインスタンスに排他的にマウントし、OSのルートボリュームやデータベースのデータ領域として使用する。",
    "ボリュームタイプはgp3（汎用SSD）・io2 Block Express（高IOPS SSD）・st1（スループット最適化HDD）・sc1（コールドHDD）などがある。スナップショットでS3にバックアップし、クロスリージョンコピーも可能。"
  ],
  examPoints: [
    "EBS vs EFS vs S3 の使い分けが最頻出。「EC2から単独マウント・ブロックI/O・高IOPS」ならEBS、「複数EC2から同時マウント・NFS」ならEFS、「オブジェクト保存・HTTPアクセス」ならS3。",
    "EBSは同一AZ内でしか使えない（マルチアタッチはio1/io2の一部で同一AZ内のみ）という制約が引っかけになる。スナップショットはAZ非依存でS3に保管される。"
  ]
};

window.CERT_SERVICES["amazon-efs"] = {
  slug: "amazon-efs", name: "Amazon EFS", provider: "aws", category: "ストレージ",
  aliases: ["Amazon EFS", "EFS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/efs/latest/ug/whatisefs.html",
  summary: [
    "NFS v4.1プロトコルで複数のEC2インスタンスから同時にマウントできるフルマネージドのネットワークファイルシステム。容量は自動拡縮し、事前プロビジョニングが不要。",
    "ストレージクラスはStandard（高可用性・マルチAZ）とOne Zone（単一AZ・低コスト）。パフォーマンスモードはGeneral Purpose（低レイテンシ）とMax I/O（高スループット）を選択できる。"
  ],
  examPoints: [
    "「複数EC2が同じファイルシステムを共有したい」「コンテンツ管理システム・ホームディレクトリ」のシナリオではEFSを選ぶ。EBSとの最大の違いは「マルチインスタンス同時接続」の有無。",
    "EFS vs FSx for Windows File ServerはSMBプロトコルが必要かどうかで判断する。Linux/NFSならEFS、WindowsファイルサーバーならFSx for Windowsという使い分けが頻出。"
  ]
};

window.CERT_SERVICES["amazon-rds"] = {
  slug: "amazon-rds", name: "Amazon RDS", provider: "aws", category: "データベース",
  aliases: ["Amazon RDS", "RDS Proxy", "RDS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Welcome.html",
  summary: [
    "MySQL・PostgreSQL・MariaDB・Oracle・SQL Serverなど主要なリレーショナルデータベースをフルマネージドで提供するサービス。パッチ適用・バックアップ・フェイルオーバーをAWSが自動管理する。",
    "マルチAZ配置でスタンバイインスタンスを別AZに自動同期し、障害時に自動フェイルオーバー（通常1〜2分）する。RDS Proxyを使うとLambdaなどの多数の短命な接続でコネクションプールを共有できる。"
  ],
  examPoints: [
    "SAAではマルチAZ（可用性・自動フェイルオーバー）とリードレプリカ（読み取りスケールアウト・クロスリージョン可）の違いが最頻出。マルチAZはスタンバイがアクティブではない点が引っかけ。",
    "LambdaからRDSへの接続はコネクション枯渇が問題になるため、RDS Proxyを挟む構成が問われる。「サーバーレスとRDBの組み合わせ」シナリオで必ず登場する。",
    "自動バックアップの保持期間（最大35日）・スナップショット（手動）の違い、暗号化はインスタンス作成時にのみ有効化できる制約も頻出。"
  ]
};

window.CERT_SERVICES["amazon-aurora"] = {
  slug: "amazon-aurora", name: "Amazon Aurora", provider: "aws", category: "データベース",
  aliases: ["Amazon Aurora", "Aurora"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
  summary: [
    "MySQLおよびPostgreSQL互換のAWS独自設計のリレーショナルデータベース。ストレージは3AZにわたり6コピーで自動レプリケーションされ、RDSの標準エンジンより高い耐久性とパフォーマンスを実現する。",
    "Auroraクラスターは1つのプライマリインスタンスと最大15のリードレプリカで構成され、レプリカはストレージを共有するため同期ラグが非常に小さい。Aurora Serverlessはキャパシティの自動スケーリングに対応する。"
  ],
  examPoints: [
    "「RDSより高性能・高可用性が必要」「MySQL/PostgreSQL互換でサーバーレスDBが欲しい」シナリオではAuroraを選ぶ。通常のRDS Multi-AZとの最大の違いは「ストレージ共有アーキテクチャとレプリカ台数」。",
    "Aurora Global Databaseはリージョン間のレプリケーション遅延が1秒未満で、災害復旧（DR）とグローバル読み取りスケールアウトに使う。SAPで頻出のシナリオ。",
    "Aurora Serverless v2のACU（Aurora Capacity Units）自動スケーリングと、通常Auroraクラスターのスケーリング方法の違いも問われる。"
  ]
};

window.CERT_SERVICES["amazon-dynamodb"] = {
  slug: "amazon-dynamodb", name: "Amazon DynamoDB", provider: "aws", category: "データベース",
  aliases: ["Amazon DynamoDB", "DynamoDB", "DAX"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html",
  summary: [
    "フルマネージドのNoSQLキー・バリュー型およびドキュメント型データベース。一桁ミリ秒のレイテンシを保証し、トラフィックに応じてキャパシティを自動調整するオンデマンドモードと、事前にRCU/WCUを設定するプロビジョンドモードがある。",
    "DynamoDB Accelerator（DAX）はインメモリキャッシュ層で、読み取り負荷が高いワークロードのレイテンシをマイクロ秒単位に短縮する。DynamoDB Streamsでテーブルの変更をリアルタイムにキャプチャできる。"
  ],
  examPoints: [
    "SAAでは「サーバーレス・スキーマレス・大規模キー検索・ゲームのリーダーボード」のシナリオで選ぶ。RDSとの使い分けは「結合や複雑なSQLが必要か否か」が判断軸。",
    "DVAではパーティションキー設計によるホットパーティション回避・GSI（グローバルセカンダリインデックス）とLSI（ローカルセカンダリインデックス）の違い・TTLによる自動期限切れが頻出。",
    "キャパシティ超過時は429エラー（ProvisionedThroughputExceededException）が返ることと、DAXはキャッシュのためのサービスでRDSには使えないという引っかけに注意。"
  ]
};

window.CERT_SERVICES["amazon-elasticache"] = {
  slug: "amazon-elasticache", name: "Amazon ElastiCache", provider: "aws", category: "データベース",
  aliases: ["Amazon ElastiCache", "ElastiCache"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/dg/WhatIs.html",
  summary: [
    "RedisまたはMemcachedのインメモリキャッシュをフルマネージドで提供するサービス。データベースへのクエリ結果やセッションデータをキャッシュし、バックエンドの負荷を大幅に削減する。",
    "RedisモードはElastiCache for Redis（クラスターモード・レプリケーション・永続化・Pub/Sub・Lua対応）とElastiCache Serverlessを選べる。Memcachedはシンプルな水平スケーリングに適する。"
  ],
  examPoints: [
    "「データベースへの読み取り負荷を軽減したい」「セッション管理を外部化したい」シナリオではElastiCacheを選ぶ。DAXはDynamoDB専用のキャッシュであり、RDS用キャッシュはElastiCacheという使い分けを覚える。",
    "RedisとMemcachedの使い分けは試験頻出。「マルチAZ・フェイルオーバー・永続化・ソート済みセット」が必要ならRedis、「シンプルなキャッシュ・マルチスレッド」ならMemcached。"
  ]
};

window.CERT_SERVICES["amazon-redshift"] = {
  slug: "amazon-redshift", name: "Amazon Redshift", provider: "aws", category: "分析",
  aliases: ["Amazon Redshift", "Redshift"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/redshift/latest/mgmt/welcome.html",
  summary: [
    "ペタバイト規模のデータウェアハウスサービス。列指向ストレージとMPP（超並列処理）アーキテクチャにより、大量データへの分析クエリを高速に実行できる。PostgreSQL互換のSQLインターフェースを持つ。",
    "Redshift Spectrumを使うとS3上のデータを直接クエリでき、ウェアハウスにロードせずに分析できる。Redshift Serverlessはキャパシティ管理不要で使用量ベース課金が可能。"
  ],
  examPoints: [
    "「大量の構造化データを分析したい」「ETL後のデータを集計・レポーティングしたい」シナリオではRedshiftを選ぶ。OLTPはRDS、OLAPはRedshiftという使い分けが基本軸。",
    "AthenはS3への即時アドホッククエリ、RedshiftはDWH的な定常的な大規模分析という違いが問われる。Redshift Spectrumを使う場合でも結果はRedshiftクラスター経由となる点に注意。"
  ]
};

window.CERT_SERVICES["amazon-athena"] = {
  slug: "amazon-athena", name: "Amazon Athena", provider: "aws", category: "分析",
  aliases: ["Amazon Athena", "Athena"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/athena/latest/ug/what-is.html",
  summary: [
    "S3上のデータを標準SQLで直接クエリできるサーバーレスのインタラクティブクエリサービス。Presto/Trinoベースでインフラ管理が不要、スキャンしたデータ量に対してのみ課金される。",
    "CSV・JSON・Parquet・ORC・Avroなど多様なフォーマットをサポート。GlueデータカタログをメタデータストアとしてGlue ETLパイプラインと組み合わせるパターンが一般的。"
  ],
  examPoints: [
    "「S3上のログやCSVを即席でSQL分析したい」「サーバーレス・スキーマオンリード」のシナリオではAthenaを選ぶ。事前のデータロードが不要な点がRedshiftとの大きな違い。",
    "コスト削減にはParquet/ORC形式へのデータ変換（スキャン量削減）とパーティション設定が有効。この最適化はSAA・SAPで頻出のベストプラクティス問題として問われる。"
  ]
};

window.CERT_SERVICES["aws-glue"] = {
  slug: "aws-glue", name: "AWS Glue", provider: "aws", category: "分析",
  aliases: ["AWS Glue", "Glue"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/glue/latest/dg/what-is-glue.html",
  summary: [
    "フルマネージドのETL（Extract, Transform, Load）サービス。データカタログによるメタデータ管理と、Apache Sparkベースのサーバーレスジョブ実行環境を提供する。",
    "Glueクローラーがデータソース（S3・RDS等）を自動スキャンしてスキーマを推定しカタログに登録する。Glue Data Qualityでデータ品質ルールを定義して検証できる。"
  ],
  examPoints: [
    "「S3のデータをETLしてRedshiftやAthenaで分析」という定番パターンではGlueが登場する。Glueカタログ＋Athenaの組み合わせはAWS分析スタックの基本として問われる。",
    "Glue vs DMS の使い分けはETL（データ変換・集計）かデータ移行（DB間のレプリケーション）かで判断する。Glue StudioはノーコードのビジュアルETL設計ツール。"
  ]
};

window.CERT_SERVICES["amazon-kinesis"] = {
  slug: "amazon-kinesis", name: "Amazon Kinesis", provider: "aws", category: "分析",
  aliases: ["Kinesis Data Streams", "Kinesis Data Firehose", "Kinesis"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/streams/latest/dev/introduction.html",
  summary: [
    "ストリーミングデータをリアルタイムに収集・処理するサービス群。Kinesis Data Streamsはシャード単位でカスタム処理アプリが消費するデータストリーム、Kinesis Data Firehoseは変換なしでS3/Redshift/OpenSearch等に直接デリバリーするサービス。",
    "Kinesis Data Streamsのデータ保持期間はデフォルト24時間（最大365日）。シャード数でスループットをスケール（1シャード＝1MB/s書き込み・2MB/s読み取り）。"
  ],
  examPoints: [
    "Data Streams（カスタムリアルタイム処理・複数コンシューマー）とFirehose（バッファリングして配信・変換はLambdaのみ）の違いが最頻出。SQSとの比較では「順序保証・時間遡及・複数コンシューマー」のキーワードでKinesisを選ぶ。",
    "SAPでは「IoT/ログのリアルタイム集計」シナリオでKinesis Data Streams＋Lambda＋DynamoDBの構成が問われる。Hot Shard（特定シャードへの偏り）対策としてパーティションキーの分散が重要。"
  ]
};

window.CERT_SERVICES["amazon-vpc"] = {
  slug: "amazon-vpc", name: "Amazon VPC", provider: "aws", category: "ネットワーキング",
  aliases: ["Amazon VPC", "VPC"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/what-is-amazon-vpc.html",
  summary: [
    "AWSクラウド内に論理的に隔離されたプライベートネットワークを作成するサービス。CIDRブロックを指定してサブネット（パブリック・プライベート）、ルートテーブル、インターネットゲートウェイを設計する。",
    "セキュリティグループ（インスタンスレベル・ステートフル）とネットワークACL（サブネットレベル・ステートレス）の2層でトラフィックを制御する。VPCピアリングでVPC間のプライベート通信が可能。"
  ],
  examPoints: [
    "SAAではパブリックサブネット（インターネットGW経由）とプライベートサブネット（NATゲートウェイ経由）の設計、踏み台（Bastion）ホストの配置が頻出。",
    "セキュリティグループはステートフル（戻りトラフィック自動許可）、NACLはステートレス（戻り通信も明示的に許可）という違いが引っかけの核心。ルール評価順序（NACLは番号順）も問われる。",
    "SAPではVPCピアリング（推移的ルーティング不可・オーバーラップCIDR不可）の制約と、Transit Gatewayで解決できる点が問われる。"
  ]
};

window.CERT_SERVICES["elastic-load-balancing"] = {
  slug: "elastic-load-balancing", name: "Elastic Load Balancing（ELB）", provider: "aws", category: "ネットワーキング",
  aliases: ["Application Load Balancer", "Network Load Balancer", "ALB", "NLB"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
  summary: [
    "EC2インスタンス・コンテナ・IPアドレスへのトラフィックを分散するフルマネージドのロードバランサー。ALB（HTTP/HTTPS・L7）・NLB（TCP/UDP・L4・超低レイテンシ）・GLB（サードパーティ仮想アプライアンス透過挿入）の3種がある。",
    "ALBはパスベース・ホストヘッダーベースのルーティングとLambdaターゲットをサポート。NLBは静的IPアドレスとElastic IPを割り当てられ、秒間数百万リクエストを処理できる。"
  ],
  examPoints: [
    "ALB vs NLBの使い分けが頻出。「HTTPSのパスルーティング・マイクロサービス・コンテナ」ならALB、「超低レイテンシ・静的IP・TCP/UDP・ゲーム・IoT」ならNLB。",
    "「ELBのターゲットとしてLambdaを使いたい」はALBのみ可能。NLBはターゲットにLambdaを直接指定できないという引っかけに注意。",
    "スティッキーセッション（ターゲットグループへの固定）・クロスゾーン負荷分散の設定・ヘルスチェック間隔と閾値もSAAで問われる。"
  ]
};

window.CERT_SERVICES["amazon-cloudfront"] = {
  slug: "amazon-cloudfront", name: "Amazon CloudFront", provider: "aws", category: "ネットワーキング",
  aliases: ["Amazon CloudFront", "CloudFront"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
  summary: [
    "世界600以上のエッジロケーションを活用してコンテンツをキャッシュ配信するCDN（Content Delivery Network）サービス。S3・EC2・ALB・Lambda Function URLをオリジンとして設定できる。",
    "CloudFront FunctionsとLambda@Edgeでエッジでのコード実行が可能。OAC（Origin Access Control）でS3バケットへの直接アクセスを遮断し、CloudFront経由のみを許可するセキュリティ構成が標準。"
  ],
  examPoints: [
    "「グローバルユーザーへの低レイテンシ配信」「静的コンテンツのキャッシュ」シナリオではCloudFrontを選ぶ。S3の静的ウェブサイトとの組み合わせはSAAの定番構成。",
    "署名付きURLと署名付きCookieの使い分け（単一ファイルか複数ファイルか）・キャッシュポリシーとオリジンリクエストポリシーの分離・OACとOAI（旧方式）の違いが問われる。",
    "WAFをCloudFrontにアタッチするとグローバルエッジでL7フィルタリングができる。ALBに直接WAFをアタッチする場合との違いも把握しておく。"
  ]
};

window.CERT_SERVICES["amazon-route-53"] = {
  slug: "amazon-route-53", name: "Amazon Route 53", provider: "aws", category: "ネットワーキング",
  aliases: ["Route 53"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/Welcome.html",
  summary: [
    "フルマネージドのDNSサービス。ドメイン登録・DNSルーティング・ヘルスチェックを統合的に提供する。エイリアスレコードでAWS固有リソース（ELB・CloudFront・S3等）をDNSで直接参照できる。",
    "ルーティングポリシーはシンプル・加重・フェイルオーバー・レイテンシベース・地理的・地理的近接性・複数値回答の7種類。ヘルスチェックと組み合わせてアクティブ-アクティブおよびアクティブ-スタンバイDRを実現できる。"
  ],
  examPoints: [
    "SAAではルーティングポリシーの使い分けが必ず出題される。「最もレイテンシが低いリージョンにルーティング」はレイテンシポリシー、「地理的な規制対応」は地理的ポリシー、「Blue/Green」は加重ポリシー。",
    "フェイルオーバールーティングはアクティブ-スタンバイDRの標準手段。ヘルスチェックが失敗するとスタンバイに自動切り替えされる点と、ヘルスチェックのしきい値設定が問われる。",
    "AレコードとエイリアスレコードはどちらもIPアドレス解決に使うが、エイリアスはRoute 53独自でAWSリソースのIPが変わっても自動追従するという引っかけに注意。"
  ]
};

window.CERT_SERVICES["aws-direct-connect"] = {
  slug: "aws-direct-connect", name: "AWS Direct Connect", provider: "aws", category: "ネットワーキング",
  aliases: ["Direct Connect"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/directconnect/latest/UserGuide/Welcome.html",
  summary: [
    "オンプレミスデータセンターからAWSへ専用線（物理回線）で接続するネットワークサービス。インターネットを経由しないため、帯域幅が安定し、低レイテンシ・低コスト（大量データ転送時）・高セキュリティを実現できる。",
    "接続速度は1Gbps・10Gbps・100Gbpsの専用線と、50Mbps〜10Gbpsのホスト型接続がある。仮想インターフェース（パブリック・プライベート・トランジット）でVPCやAWSパブリックサービスへのルーティングを分ける。"
  ],
  examPoints: [
    "「大量データを継続的にAWSに転送したい」「オンプレとAWSを安定した専用回線で接続したい」シナリオではDirect Connectを選ぶ。Site-to-Site VPN（インターネット経由・暗号化）との使い分けが最頻出。",
    "Direct ConnectはSLAで可用性が保証されるがプロビジョニングに数週間かかる。緊急のバックアップ回線としてSite-to-Site VPNを併用するパターンがSAP・SAAで出題される。",
    "Direct Connect Gatewayを使うと単一のDirect Connect接続から複数リージョンのVPCに接続できる。Transit Gatewayとの組み合わせもSAPで問われる。"
  ]
};

window.CERT_SERVICES["aws-transit-gateway"] = {
  slug: "aws-transit-gateway", name: "AWS Transit Gateway", provider: "aws", category: "ネットワーキング",
  aliases: ["Transit Gateway"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/vpc/latest/tgw/what-is-transit-gateway.html",
  summary: [
    "複数のVPCおよびオンプレミスネットワークを単一のハブで相互接続するネットワーク集約サービス。VPCピアリングではN*(N-1)/2本必要な接続をスター型トポロジーで管理し、ルーティングを集中制御できる。",
    "ルートテーブルをアタッチメントごとに設定してネットワークセグメンテーション（共有サービスVPCと本番VPCの分離など）が可能。Direct ConnectやSite-to-Site VPNとも統合される。"
  ],
  examPoints: [
    "「多数のVPCを相互接続したい」「VPCピアリングのメッシュが複雑すぎる」シナリオではTransit Gatewayを選ぶ。VPCピアリングとの違いは「推移的ルーティングが可能か」にある。",
    "SAPではTransit Gateway＋Direct Connect Gatewayによるマルチリージョン・マルチアカウント接続が問われる。AWS Organizationsと組み合わせたResource Access Managerによる共有も頻出。"
  ]
};

window.CERT_SERVICES["aws-privatelink"] = {
  slug: "aws-privatelink", name: "AWS PrivateLink／VPCエンドポイント", provider: "aws", category: "ネットワーキング",
  aliases: ["AWS PrivateLink", "PrivateLink", "VPC エンドポイント", "VPCエンドポイント"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/vpc/latest/privatelink/what-is-privatelink.html",
  summary: [
    "VPCからAWSサービスや他のVPC上のサービスへ、インターネットを経由せずにプライベートに接続する仕組み。ゲートウェイ型エンドポイント（S3・DynamoDB用・無料）とインターフェース型エンドポイント（PrivateLink・ENI経由・有料）の2種類がある。",
    "インターフェース型はVPC内にENI（Elastic Network Interface）を作成し、プライベートIPでAWSサービスにアクセスする。NATゲートウェイを経由しないためコスト削減とセキュリティ向上に寄与する。"
  ],
  examPoints: [
    "「プライベートサブネット内のEC2からS3にアクセスしたいが、インターネットには出たくない」シナリオではゲートウェイ型VPCエンドポイントを選ぶ。NATゲートウェイ不要になる点が重要。",
    "SAPでは「SaaSサービスを自社VPCのサービスとして提供したい」ケースでPrivateLinkのエンドポイントサービス機能を使う構成が問われる。ゲートウェイ型はS3とDynamoDBにしか使えない点が引っかけ。"
  ]
};

window.CERT_SERVICES["amazon-api-gateway"] = {
  slug: "amazon-api-gateway", name: "Amazon API Gateway", provider: "aws", category: "アプリケーション統合",
  aliases: ["Amazon API Gateway", "API Gateway"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/welcome.html",
  summary: [
    "REST API・HTTP API・WebSocket APIをフルマネージドで作成・管理・保護できるサービス。Lambdaや任意のHTTPエンドポイントへのプロキシとして機能し、スロットリング・キャッシング・認証を一元管理する。",
    "APIタイプはREST API（高機能・高コスト）・HTTP API（低レイテンシ・低コスト）・WebSocket APIの3種。CognitoオーソライザーとLambdaオーソライザー（カスタム認証）を使い分ける。"
  ],
  examPoints: [
    "SAAとDVAでは「サーバーレスAPIバックエンド」の定番構成（API Gateway + Lambda + DynamoDB）が頻出。スロットリング（デフォルト10,000 RPS）でバックエンドを保護するシナリオも問われる。",
    "REST APIとHTTP APIの使い分けではコストと機能で判断する。HTTP APIはWAF統合・カスタムドメイン証明書等の一部機能が制限される引っかけに注意。",
    "DVAではデプロイステージ（dev/prod）・カナリアリリース・使用量プランとAPIキーによるレート制限設定が問われる。"
  ]
};

window.CERT_SERVICES["amazon-sqs"] = {
  slug: "amazon-sqs", name: "Amazon SQS", provider: "aws", category: "アプリケーション統合",
  aliases: ["Amazon SQS", "SQS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
  summary: [
    "フルマネージドのメッセージキューサービス。プロデューサーとコンシューマーを疎結合にし、非同期処理とバッファリングを実現する。標準キュー（高スループット・最低1回配信・順序不保証）とFIFOキュー（順序保証・厳密1回配信）の2種がある。",
    "メッセージの可視性タイムアウト（デフォルト30秒）で処理中のメッセージを他のコンシューマーから隠蔽する。デッドレターキュー（DLQ）で処理失敗メッセージを分離して調査できる。"
  ],
  examPoints: [
    "SAAでは「マイクロサービス間の非同期通信」「負荷バッファリング」「ピーク平準化」シナリオでSQSを選ぶ。SNSとの使い分けは「1対1の非同期キュー」か「1対多のファンアウト通知」か。",
    "FIFOキューは順序保証が必要な場合だが、スループットが標準キューより低い（最大300 TPS・バッチで3,000 TPS）という引っかけに注意。",
    "ロングポーリング（最大20秒）によるコスト削減とレイテンシ改善はDVA・SAAで問われるベストプラクティス。SQS + Lambda のイベントソースマッピングでポーリングが自動化される。"
  ]
};

window.CERT_SERVICES["amazon-sns"] = {
  slug: "amazon-sns", name: "Amazon SNS", provider: "aws", category: "アプリケーション統合",
  aliases: ["Amazon SNS", "SNS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/sns/latest/dg/welcome.html",
  summary: [
    "フルマネージドのPub/Sub（発行・購読）メッセージングサービス。1つのトピックに発行したメッセージを、複数のサブスクライバー（Lambda・SQS・HTTP・メール・SMS等）に同時配信するファンアウトを実現する。",
    "SNSフィルタリングポリシーで、サブスクライバーごとに受信するメッセージを属性でフィルタリングできる。FIFO SNSトピックでFIFO SQSへの順序保証ファンアウトも可能。"
  ],
  examPoints: [
    "「1つのイベントを複数の処理系に同時配信したい」シナリオではSNSを選ぶ。SNS→SQS→Lambdaというファンアウトパターン（SNS FanoutアーキテクチャとSQSバッファの組み合わせ）はSAAの定番問題。",
    "SNSは配信先がオフラインの場合メッセージを失う（永続化しない）という引っかけに注意。永続化が必要な場合はSQSをサブスクライバーにする設計で対応する。"
  ]
};

window.CERT_SERVICES["amazon-eventbridge"] = {
  slug: "amazon-eventbridge", name: "Amazon EventBridge", provider: "aws", category: "アプリケーション統合",
  aliases: ["Amazon EventBridge", "EventBridge"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/eventbridge/latest/userguide/eb-what-is.html",
  summary: [
    "AWS サービス・独自アプリ・SaaSアプリから発生するイベントをルールに基づいてターゲット（Lambda・SQS・SNS・Step Functions等）にルーティングするサーバーレスのイベントバス。",
    "スケジュールルール（cron/rate式）でLambdaの定期実行も可能。EventBridge Pipesで点と点のサービスを直接パイプ接続し、マイクロサービスの統合を簡素化できる。"
  ],
  examPoints: [
    "「AWSサービスのイベント（EC2状態変化・S3バケットイベント・CodePipelineの完了）に反応して処理を起動したい」シナリオではEventBridgeを選ぶ。CloudWatch Eventsの後継であることも確認しておく。",
    "SaaSアプリ（Zendesk・Datadog等）のイベントを受け取れるパートナーイベントバス機能はSAPで問われる。SNSとの使い分けは「イベントフィルタリング・複雑なルーティング・スケジューリング」が必要かどうか。"
  ]
};

window.CERT_SERVICES["aws-step-functions"] = {
  slug: "aws-step-functions", name: "AWS Step Functions", provider: "aws", category: "アプリケーション統合",
  aliases: ["Step Functions"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/step-functions/latest/dg/welcome.html",
  summary: [
    "複数のLambda関数やAWSサービスのステップを視覚的なワークフロー（ステートマシン）として定義・実行するオーケストレーションサービス。エラーハンドリング・リトライ・タイムアウトを宣言的に設定できる。",
    "ExpressワークフローとStandardワークフローの2種類があり、前者は高スループット・短時間処理向け、後者は長期実行・厳密な1回実行保証・履歴保存向け。"
  ],
  examPoints: [
    "「複数のLambdaを順次または並列に実行して複雑なビジネスプロセスを管理したい」シナリオではStep Functionsを選ぶ。Lambdaのオーケストレーションをコード（Lambdaチェーン）で書くのは依存関係管理が煩雑になるため、Step Functionsが推奨される。",
    "SAP・DVAでは実行履歴の保持（Standard）・Expressの非同期実行・SDKインテグレーションによるLambda以外のサービス直接呼び出しが問われる。"
  ]
};

window.CERT_SERVICES["aws-iam"] = {
  slug: "aws-iam", name: "AWS IAM", provider: "aws", category: "セキュリティ",
  aliases: ["AWS IAM", "IAM"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/introduction.html",
  summary: [
    "AWSリソースへのアクセスを安全に制御するサービス。ユーザー・グループ・ロール・ポリシーの4つの主要概念で権限を管理する。ポリシーはJSON形式で記述し、Effect・Action・Resource・Conditionで精密なアクセス制御を実現する。",
    "IAMロールは一時的な認証情報（STS AssumeRole）を使い、EC2・Lambda・ECSタスク・クロスアカウントアクセス等に権限を付与する。最小権限の原則（Least Privilege）が設計の基本。"
  ],
  examPoints: [
    "SAAでは「クロスアカウントアクセス」「EC2からS3へのアクセス」「IAMポリシーの評価順序（明示的Denyが最優先）」が頻出。IAMユーザーではなくロールを使う場面の判断が問われる。",
    "境界ポリシー（Permissions Boundary）・SCPとIAMポリシーの評価順序・ロールの信頼ポリシー（Who can assume）と権限ポリシー（What can do）の区別はSAP・SCSの重要トピック。",
    "長期的なアクセスキー（IAMユーザー）の使用を避け、IAMロールと一時認証情報を使うセキュリティベストプラクティスが問われる。MFAの強制もCondition要素で実装する。"
  ]
};

window.CERT_SERVICES["aws-iam-identity-center"] = {
  slug: "aws-iam-identity-center", name: "AWS IAM Identity Center", provider: "aws", category: "セキュリティ",
  aliases: ["IAM Identity Center"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/singlesignon/latest/userguide/what-is.html",
  summary: [
    "複数のAWSアカウントおよびビジネスアプリケーションへのシングルサインオン（SSO）アクセスを一元管理するサービス（旧AWS SSO）。AWS Organizations統合により、組織内の全アカウントへのアクセス権限を一箇所で管理できる。",
    "IDソースはIAM Identity Center内部・Active Directory（AWS Managed AD / 自社AD）・外部IdP（Okta・Azure AD等）から選択。ユーザーはポータルから任意のアカウント・アプリに単一認証でアクセスする。"
  ],
  examPoints: [
    "「複数AWSアカウントへのSSO・一元管理」シナリオではIAM Identity Centerを選ぶ。各アカウントにIAMユーザーを個別作成する方法との比較で運用効率とセキュリティリスクの違いが問われる。",
    "SAPでは外部IdPとのSAML 2.0フェデレーション構成・許可セット（Permission Set）によるアカウントへのロール割り当て・SCIM自動プロビジョニングが出題される。"
  ]
};

window.CERT_SERVICES["amazon-cognito"] = {
  slug: "amazon-cognito", name: "Amazon Cognito", provider: "aws", category: "セキュリティ",
  aliases: ["Amazon Cognito", "Cognito"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/what-is-amazon-cognito.html",
  summary: [
    "モバイル・Webアプリケーションのユーザー認証・認可・ユーザー管理を提供するサービス。ユーザープール（認証・ユーザーディレクトリ）とIDプール（フェデレーテッドID・AWS認証情報の払い出し）の2つのコンポーネントで構成される。",
    "Google・Facebook・Apple等のソーシャルIDPやSAML/OIDCによる企業IdPとのフェデレーションをサポート。JWT（JSON Web Token）を発行し、API GatewayやALBのオーソライザーとして使用できる。"
  ],
  examPoints: [
    "「アプリユーザーのサインアップ・サインインを管理したい」「モバイルアプリからAWSリソースに直接アクセスしたい」シナリオではCognitoを選ぶ。IAMとの使い分けは「社内ユーザー（IAM）」か「エンドユーザー（Cognito）」か。",
    "ユーザープールはJWT発行のみ（AWSへのアクセス権限なし）、IDプールは一時的なAWS認証情報を払い出すという役割の違いが引っかけとして頻出。"
  ]
};

window.CERT_SERVICES["aws-kms"] = {
  slug: "aws-kms", name: "AWS KMS", provider: "aws", category: "セキュリティ",
  aliases: ["AWS KMS", "KMS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/kms/latest/developerguide/overview.html",
  summary: [
    "暗号化キーの作成・管理・利用を制御するフルマネージドのキー管理サービス。AWSサービス（S3・EBS・RDS・DynamoDB等）との統合によりサーバーサイド暗号化を一元管理する。",
    "CMK（Customer Managed Key）はキーポリシー・IAMポリシー・グラントの3つで利用権限を制御する。マルチリージョンキーでクロスリージョンの暗号化・復号が可能。自動キーローテーション（年1回）をサポート。"
  ],
  examPoints: [
    "SAAではS3のSSE-S3（Amazonが管理）・SSE-KMS（KMSキーを使用・CloudTrailで監査可能）・SSE-C（顧客提供キー）の使い分けが頻出。監査証跡が必要な場合はSSE-KMS。",
    "Secrets ManagerやParameter Store（SecureString）もKMSで暗号化する。「KMSキーのアクセスを取り消すとデータが読めなくなる」という特性が引っかけになる。",
    "エンベロープ暗号化（データキーをCMKで暗号化する仕組み）のコンセプトはDVA・SCSで問われる。"
  ]
};

window.CERT_SERVICES["aws-secrets-manager"] = {
  slug: "aws-secrets-manager", name: "AWS Secrets Manager", provider: "aws", category: "セキュリティ",
  aliases: ["AWS Secrets Manager", "Secrets Manager"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/secretsmanager/latest/userguide/intro.html",
  summary: [
    "データベースパスワード・APIキー・OAuth トークンなどのシークレットを安全に保存・管理・ローテーションするサービス。RDS・Redshift・DocumentDBとのネイティブ統合により、Lambdaを使ったパスワードの自動ローテーションが可能。",
    "KMSによる暗号化、CloudTrailによるアクセス監査、クロスアカウント共有をサポート。VPCエンドポイント経由でプライベートにアクセスできる。"
  ],
  examPoints: [
    "「DBパスワードをコードにハードコードせず管理したい」「定期的に自動ローテーションしたい」シナリオではSecrets Managerを選ぶ。Systems Manager Parameter Store（SecureString）との違いはローテーション自動化とコスト（Secrets Managerは有料）。",
    "DVAではLambdaからSecretsManagerにAPIコールしてシークレット取得する実装と、キャッシュしてAPI呼び出し回数を減らす最適化が問われる。"
  ]
};

window.CERT_SERVICES["amazon-guardduty"] = {
  slug: "amazon-guardduty", name: "Amazon GuardDuty", provider: "aws", category: "セキュリティ",
  aliases: ["GuardDuty"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/guardduty/latest/ug/what-is-guardduty.html",
  summary: [
    "機械学習・異常検知・脅威インテリジェンスを組み合わせてAWSアカウントとワークロードを継続的に監視するマネージドな脅威検出サービス。CloudTrailログ・VPCフローログ・DNSログを分析し、不審な挙動を検出する。",
    "エージェント不要で有効化するだけで機能する。検出した脅威はFindingsとして出力され、EventBridge経由でSNSやLambdaに連携して自動対応を実装できる。"
  ],
  examPoints: [
    "「不正なAPIコール検出」「マルウェア感染したEC2の検知」「外部の悪意あるIPとの通信検出」シナリオではGuardDutyを選ぶ。Security Hubと組み合わせてFindings集約、Macieと組み合わせてデータ保護が定番構成。",
    "GuardDutyはあくまで「検出」サービスであり、自動ブロックはしない。自動対応にはEventBridge+Lambdaによる実装が必要という点が引っかけ。"
  ]
};

window.CERT_SERVICES["amazon-macie"] = {
  slug: "amazon-macie", name: "Amazon Macie", provider: "aws", category: "セキュリティ",
  aliases: ["Macie"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/macie/latest/user/what-is-macie.html",
  summary: [
    "機械学習を使ってS3バケット内の機密データ（個人情報・クレジットカード番号・AWSシークレットキー等）を自動検出・分類・保護するデータセキュリティサービス。",
    "バケットの公開設定・暗号化状態・アクセスポリシーを継続的に評価し、リスクのあるバケットを特定する。検出結果はSecurity Hubに統合でき、EventBridgeでアラートを自動化できる。"
  ],
  examPoints: [
    "「S3に格納された個人情報（PII）や機密データを検出したい」「GDPRやPCI DSSのコンプライアンス対応」シナリオではMacieを選ぶ。GuardDutyは脅威検出、MacieはS3データ分類という役割の違いを明確にしておく。",
    "Macieの検出対象はS3のみである点が引っかけ。他のストレージサービスへの対応はない。"
  ]
};

window.CERT_SERVICES["aws-security-hub"] = {
  slug: "aws-security-hub", name: "AWS Security Hub", provider: "aws", category: "セキュリティ",
  aliases: ["Security Hub"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/securityhub/latest/userguide/what-is-securityhub.html",
  summary: [
    "GuardDuty・Macie・Inspector・Firewall Manager等の複数のAWSセキュリティサービスと外部パートナーツールの検出結果（Findings）を一元集約・可視化・優先付けするセキュリティポスチャー管理サービス。",
    "CIS AWS Foundations Benchmark・AWS基礎的セキュリティベストプラクティス・PCI DSS等の標準コンプライアンスチェックを自動実行してスコアを算出する。"
  ],
  examPoints: [
    "「複数のセキュリティサービスの検出結果を1ヵ所で管理したい」「コンプライアンス状況を一元チェックしたい」シナリオではSecurity Hubを選ぶ。GuardDutyやMacieとはインプット（それらの結果を集約する）という位置づけ。",
    "SAPでは複数アカウント・複数リージョンのFindingsをOrganizations統合で集約する構成が問われる。"
  ]
};

window.CERT_SERVICES["aws-waf"] = {
  slug: "aws-waf", name: "AWS WAF", provider: "aws", category: "セキュリティ",
  aliases: ["AWS WAF"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/waf/latest/developerguide/what-is-aws-waf.html",
  summary: [
    "HTTPリクエストをレイヤー7（アプリケーション層）でフィルタリングするWebアプリケーションファイアウォール。SQLインジェクション・クロスサイトスクリプティング（XSS）・悪意あるIPからのアクセスを遮断するWebACLルールを定義する。",
    "CloudFront・ALB・API Gateway・AppSync・Cognito User Poolsにアタッチできる。AWS Managed Rules（マネージドルールグループ）を使うとすぐに主要な攻撃パターンに対応できる。"
  ],
  examPoints: [
    "「DDoS・SQLインジェクション・レート制限・IP許可/拒否リスト」シナリオではWAFを選ぶ。AWS Shieldとの使い分けはWAFがL7アプリケーション攻撃対策、ShieldがL3/L4のDDoS軽減という役割分担が頻出。",
    "WAFはネットワークACLやセキュリティグループと異なりHTTPコンテンツを検査できる点が試験問題の鍵になる。"
  ]
};

window.CERT_SERVICES["aws-cloudtrail"] = {
  slug: "aws-cloudtrail", name: "AWS CloudTrail", provider: "aws", category: "管理・ガバナンス",
  aliases: ["AWS CloudTrail", "CloudTrail"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
  summary: [
    "AWSアカウント内のすべてのAPIコール（管理イベント・データイベント）を記録して監査証跡を提供するサービス。誰が・いつ・どのリソースに・何をしたかをS3に保存し、Athenaで検索・分析できる。",
    "デフォルトで管理イベント（コントロールプレーン操作）を90日間保持する。長期保存にはS3への配信を設定し、CloudWatch Logsへの統合でリアルタイムアラートを実装できる。"
  ],
  examPoints: [
    "SAAでは「誰がEC2を削除したか調査したい」「不審なAPIコールをアラートしたい」シナリオでCloudTrailを選ぶ。CloudWatchとの違いはCloudTrailがAPI監査ログ、CloudWatchがパフォーマンス監視・ログ収集という役割分担。",
    "CloudTrailログのS3保存における整合性検証（ログファイルバリデーション）・KMS暗号化・クロスアカウントへの証跡配信がSCSで問われる。",
    "データイベント（S3オブジェクトレベル操作・Lambda呼び出し）は別途有効化が必要でコストが発生する点が引っかけ。"
  ]
};

window.CERT_SERVICES["amazon-cloudwatch"] = {
  slug: "amazon-cloudwatch", name: "Amazon CloudWatch", provider: "aws", category: "管理・ガバナンス",
  aliases: ["Amazon CloudWatch", "CloudWatch"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
  summary: [
    "AWSリソースとアプリケーションの監視サービス。メトリクス収集・ログ集約（CloudWatch Logs）・アラーム・ダッシュボード・自動アクション（Auto Scalingトリガー等）を一体で提供する。",
    "カスタムメトリクスをSDKやagentでプッシュでき、Logs Insightsでログをアドホックにクエリ分析できる。Container Insightsでコンテナ環境のメトリクス・ログを集約管理できる。"
  ],
  examPoints: [
    "SAAではCloudWatch Alarmsによる自動スケーリングトリガー・SNS通知・EC2自動回復（StatusCheckFailedアラーム）が定番。CloudWatchとCloudTrailの役割の明確な区別は必須。",
    "DVAではカスタムメトリクスの単位（Count・Bytes等）・解像度（1秒〜5分）・Logs Insightsのクエリ構文が問われる。CloudWatch Agentでメモリ使用率やディスク使用率をカスタムメトリクスとして収集する（デフォルトでは収集されない）点が引っかけ。"
  ]
};

window.CERT_SERVICES["aws-config"] = {
  slug: "aws-config", name: "AWS Config", provider: "aws", category: "管理・ガバナンス",
  aliases: ["AWS Config"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/config/latest/developerguide/WhatIsConfig.html",
  summary: [
    "AWSリソースの設定変更を継続的に記録・評価するサービス。Config Rulesで「S3バケットが公開されていないか」「セキュリティグループがSSHを全開放していないか」などのコンプライアンスを自動チェックする。",
    "設定変更の履歴をタイムライン表示し、過去の状態に戻るためのスナップショットを保存する。マネージドルールとカスタムルール（Lambda）の2種類のルールを使い分ける。"
  ],
  examPoints: [
    "「リソース設定のコンプライアンス自動チェック・変更履歴の追跡・ドリフト検出」シナリオではConfig（CloudTrailでなく）を選ぶ。CloudTrailはAPIコールの監査、Configはリソース設定の継続的コンプライアンスという違いが頻出。",
    "SAPではAWS Organizations + Config集約アカウントで複数アカウントのコンプライアンスを一元管理する構成が問われる。自動修復（Systems Manager Automationのトリガー）もConfig Remediation機能で設定できる。"
  ]
};

window.CERT_SERVICES["aws-organizations"] = {
  slug: "aws-organizations", name: "AWS Organizations", provider: "aws", category: "管理・ガバナンス",
  aliases: ["AWS Organizations", "Organizations", "SCP"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html",
  summary: [
    "複数のAWSアカウントを組織単位（OU）のツリー構造で一元管理するサービス。一括請求（コスト集約・ボリュームディスカウント）・アカウント作成の自動化・ポリシーの集中管理を提供する。",
    "サービスコントロールポリシー（SCP）でOU/アカウントレベルで許可するサービス・アクションを制限する。IAMポリシーとSCPの両方を満たす権限のみが実際に許可される。"
  ],
  examPoints: [
    "SAPでは「マルチアカウント管理・SCPによるガードレール・一括請求」が頻出テーマ。SCPとIAMの評価順序（SCPが上位で最大権限を制限する）は引っかけの核心。",
    "SCPはルートアカウントを含む全アカウントに適用できるが、マスターアカウント（管理アカウント）自身にはSCPが効かないという重要な制約を覚えておく。",
    "AWS Control Tower・AWS Config・Security Hubとの統合でマルチアカウントのガバナンス基盤を構築する構成がSAPで問われる。"
  ]
};

window.CERT_SERVICES["aws-cloudformation"] = {
  slug: "aws-cloudformation", name: "AWS CloudFormation", provider: "aws", category: "管理・ガバナンス",
  aliases: ["CloudFormation"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/Welcome.html",
  summary: [
    "AWSインフラをJSON/YAMLテンプレートで記述し、スタックとして一括プロビジョニング・管理するIaC（Infrastructure as Code）サービス。変更セット（Change Set）で実行前に変更内容を確認できる。",
    "スタックセットで複数アカウント・複数リージョンに同一スタックをデプロイできる。ネストされたスタックで大規模テンプレートをモジュール化できる。ドリフト検出でテンプレートと実態のズレを検出する。"
  ],
  examPoints: [
    "SAAとSAPでは「インフラのコード化・反復可能なデプロイ・環境の一貫性確保」シナリオでCloudFormationを選ぶ。TerraformはサードパーティのIaCツールで、CloudFormationはAWSネイティブという使い分け。",
    "スタック更新時にリソースが置換（Replace）されるか更新（Update）されるかの判断・削除ポリシー（DeletionPolicy: Retain/Snapshot）・CloudFormationカスタムリソース（Lambdaで拡張）がDVA・SAPで問われる。"
  ]
};

window.CERT_SERVICES["aws-systems-manager"] = {
  slug: "aws-systems-manager", name: "AWS Systems Manager", provider: "aws", category: "管理・ガバナンス",
  aliases: ["Systems Manager", "Parameter Store", "Session Manager"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/what-is-systems-manager.html",
  summary: [
    "EC2インスタンスやオンプレミスサーバーの運用管理を自動化するサービス群の総称。パッチ管理（Patch Manager）・設定変更の自動化（Automation）・パラメータ管理（Parameter Store）・セッション管理（Session Manager）などを統合する。",
    "Parameter StoreはアプリケーションパラメータとシークレットをKey-Value形式で安全に保管する。Session ManagerはSSHポートを開けずにEC2インスタンスへのセキュアなシェルアクセスを提供する。"
  ],
  examPoints: [
    "DVAとSAAでは「SSHなしでEC2にアクセスしたい」→Session Manager、「設定値・シークレットをコードから参照したい」→Parameter Store（無料）またはSecrets Manager（ローテーション必要な場合）という使い分けが問われる。",
    "Parameter StoreのStandard（無料）とAdvanced（有料・上限緩和）の違い・SecureStringパラメータのKMS暗号化・Run Commandによるインスタンスへのリモートコマンド実行がDVAで頻出。"
  ]
};

window.CERT_SERVICES["aws-x-ray"] = {
  slug: "aws-x-ray", name: "AWS X-Ray", provider: "aws", category: "管理・ガバナンス",
  aliases: ["X-Ray"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/aws-xray.html",
  summary: [
    "分散アプリケーション（マイクロサービス・サーバーレス）のリクエストをトレースして可視化するサービス。サービスマップで各コンポーネント間のレイテンシ・エラー率・スループットをグラフィカルに表示する。",
    "X-Ray SDKをアプリケーションに組み込むか、X-Ray Daemonを通じてトレースデータを収集する。Lambdaではアクティブトレーシングを有効にするだけで計測できる。"
  ],
  examPoints: [
    "DVAでは「マイクロサービスのボトルネックを特定したい」「どのサービスでレイテンシが発生しているか可視化したい」シナリオでX-Rayを選ぶ。CloudWatchはメトリクス監視、X-Rayは分散トレーシングという役割分担を明確にする。",
    "サンプリングルールで収集するトレースの割合を制御してコストを管理する方法・セグメントとサブセグメントの概念がDVAで問われる。"
  ]
};

window.CERT_SERVICES["aws-trusted-advisor"] = {
  slug: "aws-trusted-advisor", name: "AWS Trusted Advisor", provider: "aws", category: "管理・ガバナンス",
  aliases: ["Trusted Advisor"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/awssupport/latest/user/trusted-advisor.html",
  summary: [
    "コスト最適化・パフォーマンス・セキュリティ・耐障害性・サービス制限の5カテゴリでAWSのベストプラクティスに照らしてアカウントの設定を自動チェックするアドバイザリーサービス。",
    "無料のBASICチェック（セキュリティ7項目・サービス制限など）と、ビジネス/エンタープライズサポートプランで利用できるフルチェックがある。"
  ],
  examPoints: [
    "CLFでは「AWSのベストプラクティスへの準拠を確認する」サービスとして登場。コスト削減（使われていないEBSボリューム・RIの利用率）・セキュリティ（MFAなし・公開S3バケット）の自動チェックが主な用途。",
    "フルチェックにはBusinessサポート以上が必要という制約と、Configとの使い分け（Trusted Advisorはベストプラクティス推奨、Configはカスタムコンプライアンスルール）がSAAで問われる。"
  ]
};

window.CERT_SERVICES["aws-cost-explorer"] = {
  slug: "aws-cost-explorer", name: "AWS Cost Explorer", provider: "aws", category: "コスト管理",
  aliases: ["Cost Explorer"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/cost-management/latest/userguide/ce-what-is.html",
  summary: [
    "AWSの使用コストとリソース利用状況を可視化・分析するサービス。過去13ヵ月のコストデータをサービス・タグ・アカウント・リージョン等でフィルタリングしてグラフ表示できる。",
    "コスト予測（最大12ヵ月）とRI/Savings Plansの購入推奨機能により、コスト最適化の意思決定を支援する。Anomaly Detectionで異常なコスト増加を自動検知できる。"
  ],
  examPoints: [
    "CLFでは「AWSの課金を分析・可視化したい」シナリオでCost Explorerを選ぶ。AWS Budgets（予算アラート設定）・Cost and Usage Report（詳細な生データ）との使い分けが問われる。",
    "コスト配分タグを使ってプロジェクト・部門別にコストを分類する仕組みと、タグを有効化しないと集計できないという制約も確認しておく。"
  ]
};

window.CERT_SERVICES["amazon-bedrock"] = {
  slug: "amazon-bedrock", name: "Amazon Bedrock", provider: "aws", category: "AI・機械学習",
  aliases: ["Amazon Bedrock", "Bedrock"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/bedrock/latest/userguide/what-is-bedrock.html",
  summary: [
    "Anthropic（Claude）・Meta（Llama）・Mistral・Stability AI等のサードパーティ基盤モデルとAmazon Titan・Amazon Novaをサーバーレスで利用できるフルマネージドの生成AIプラットフォーム。",
    "Agents for Bedrock（外部APIを呼び出すAIエージェント）・Knowledge Bases（RAG構成）・Model Evaluation・Guardrails（プロンプトフィルタリング）などエンタープライズ向け機能を提供する。"
  ],
  examPoints: [
    "AIFではBedrockの主要コンポーネント（Agents・Knowledge Bases・Guardrails・Model Evaluation）とユースケースが問われる。SageMakerとの使い分けは「既製モデルのAPI利用」か「カスタムモデルの学習・デプロイ」かで判断する。",
    "SAPではRAG（Retrieval Augmented Generation）にKnowledge Bases for Bedrockを使う構成・マルチモーダルモデルの選択・プロンプトキャッシングによるコスト最適化が出題される。",
    "Bedrockのモデルアクセスは事前に各モデルのアクセス申請が必要であり、リージョンによって利用可能モデルが異なる点も引っかけになる。"
  ]
};

window.CERT_SERVICES["amazon-sagemaker"] = {
  slug: "amazon-sagemaker", name: "Amazon SageMaker", provider: "aws", category: "AI・機械学習",
  aliases: ["Amazon SageMaker", "SageMaker"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/sagemaker/latest/dg/whatis.html",
  summary: [
    "機械学習モデルのデータ準備・学習・評価・デプロイ・監視をエンドツーエンドで行うフルマネージドのMLプラットフォーム。Jupyter Notebookベースのインスタンスから分散学習・マネージドエンドポイントまで一体で提供する。",
    "SageMaker Pipelines でMLワークフローを自動化し、Feature StoreでMLフィーチャーの管理・共有ができる。Ground Truthでラベリング作業を効率化し、Model Monitorで本番デプロイ済みモデルのドリフトを検出する。"
  ],
  examPoints: [
    "「カスタムモデルをスクラッチから学習・ファインチューニングしたい」シナリオではSageMakerを選ぶ。Bedrockは既製モデルのAPIコール、SageMakerは独自学習・デプロイという使い分けはAIF・SAPで頻出。",
    "SageMaker Endpointのリアルタイム推論・バッチ変換・非同期推論の使い分け、エンドポイントの自動スケーリング設定がSAP・MLA（機械学習アソシエイト）で問われる。"
  ]
};

window.CERT_SERVICES["amazon-comprehend"] = {
  slug: "amazon-comprehend", name: "Amazon Comprehend", provider: "aws", category: "AI・機械学習",
  aliases: ["Comprehend"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/comprehend/latest/dg/what-is.html",
  summary: [
    "自然言語処理（NLP）を使ってテキストからエンティティ（人名・場所・組織）・キーフレーズ・感情・言語・個人情報（PII）などを抽出するマネージドAIサービス。",
    "カスタム分類器とカスタムエンティティ認識器を独自のトレーニングデータで作成し、業界固有の分類に対応できる。バッチ処理（S3入力）とリアルタイム処理の両方をサポート。"
  ],
  examPoints: [
    "AIFでは「テキスト分析・センチメント分析・PII検出」のユースケースでComprehendを選ぶ。Rekognition（画像・動画）・Textract（ドキュメントOCR）・Transcribe（音声→テキスト）・Translate（翻訳）との役割分担を整理しておく。",
    "PII検出と削除機能はGDPRコンプライアンス対応で問われる。Comprehend Medicalは医療テキスト特化の別サービスである点も確認しておく。"
  ]
};

window.CERT_SERVICES["aws-codepipeline"] = {
  slug: "aws-codepipeline", name: "AWS CodePipeline", provider: "aws", category: "開発者ツール",
  aliases: ["CodePipeline"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/codepipeline/latest/userguide/welcome.html",
  summary: [
    "ソースコードの変更からビルド・テスト・デプロイまでのCI/CDパイプラインをフルマネージドで自動化するサービス。CodeCommit・GitHub・S3をソース、CodeBuildをビルド、CodeDeployをデプロイステージとして連携する。",
    "パイプラインの各ステージに承認アクション（手動承認）を追加し、プロダクションへのデプロイを制御できる。EventBridgeと統合してパイプライン状態の通知が可能。"
  ],
  examPoints: [
    "DVAでは「コードコミットからEC2/Lambda/ECSへの自動デプロイ」のパターンでCodePipeline + CodeBuild + CodeDeployの組み合わせが問われる。各サービスの役割（Orchestration/Build/Deploy）を明確に分けて理解する。",
    "GitHub Actions等のサードパーティCI/CDツールとの使い分けはAWSエコシステムへのネイティブ統合（IAMロール・CloudWatchとの連携）かどうかで判断するシナリオが出題される。"
  ]
};

window.CERT_SERVICES["aws-codebuild"] = {
  slug: "aws-codebuild", name: "AWS CodeBuild", provider: "aws", category: "開発者ツール",
  aliases: ["CodeBuild"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/codebuild/latest/userguide/welcome.html",
  summary: [
    "サーバー管理なしにソースコードのコンパイル・テスト・ビルドアーティファクト生成を実行するフルマネージドのビルドサービス。buildspec.ymlでビルドフェーズとコマンドを定義する。",
    "ビルド環境はAWS提供のマネージドイメージ（Ubuntu・Amazon Linux等）またはカスタムDockerイメージを指定できる。VPC内での実行もサポートし、プライベートリポジトリやデータベースへのアクセスが可能。"
  ],
  examPoints: [
    "DVAではbuildspec.ymlの構造（phases: install/pre_build/build/post_build）・環境変数のSecrets Managerからの注入・キャッシュ設定（S3キャッシュ・ローカルキャッシュ）によるビルド高速化が頻出。",
    "CodeBuildはビルドの実行時間に対して課金（ビルドが走っていないときはコストゼロ）であり、Jenkins等のセルフホストCI環境とのコスト比較で問われることがある。"
  ]
};

window.CERT_SERVICES["aws-codedeploy"] = {
  slug: "aws-codedeploy", name: "AWS CodeDeploy", provider: "aws", category: "開発者ツール",
  aliases: ["CodeDeploy"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/codedeploy/latest/userguide/welcome.html",
  summary: [
    "EC2・オンプレミスサーバー・Lambda・ECSへのアプリケーションデプロイを自動化するサービス。appspec.ymlでデプロイライフサイクルフックとファイル配置を定義する。",
    "デプロイ設定はIn-Place（既存インスタンスを順次更新）・Blue/Green（新環境に切り替え）の2戦略をサポート。ロールバックはデプロイ失敗時またはCloudWatchアラームで自動トリガーできる。"
  ],
  examPoints: [
    "DVAではIn-PlaceとBlue/Greenのトレードオフ（停止時間・コスト・ロールバック速度）が頻出。Lambda向けのデプロイ設定ではLinear（段階的）・Canary（カナリア）・AllAtOnce（一括）の3種類の使い分けを覚える。",
    "「EC2にCodeDeployエージェントをインストールする必要がある」「ECSのBlue/GreenデプロイはCodeDeployとALBを組み合わせる」という仕組みがDVAで問われる。"
  ]
};

window.CERT_SERVICES["aws-dms"] = {
  slug: "aws-dms", name: "AWS DMS", provider: "aws", category: "移行",
  aliases: ["AWS DMS", "DMS"],
  officialUrl: "https://docs.aws.amazon.com/ja_jp/dms/latest/userguide/Welcome.html",
  summary: [
    "オンプレミスやクラウド上のデータベースをAWSのデータベースサービスへ移行するマネージドサービス。同種DB間の移行（ホモジニアス）と異種DB間の移行（ヘテロジニアス）をサポートし、移行中も元DBを稼働させた継続的レプリケーションが可能。",
    "ソースはOracle・SQL Server・MySQL・PostgreSQL・MongoDB等の主要DBをサポート。SCT（Schema Conversion Tool）と組み合わせて異種間のスキーマ変換を行う。"
  ],
  examPoints: [
    "SAPとSAAでは「最小ダウンタイムでのDB移行」シナリオでDMSを選ぶ。Snowball（大量データの物理移送）とDMSは「ネットワーク帯域が制限された大容量データ移行」で組み合わせる手法がある。",
    "異種間DB移行（Oracle→Aurora）にはDMS単独では不十分でSCTによるスキーマ変換が必要という点が引っかけ。ホモジニアス移行（MySQL→RDS MySQL）はSCT不要でDMSのみで対応できる。"
  ]
};
