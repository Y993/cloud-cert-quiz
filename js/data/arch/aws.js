// js/data/arch/aws.js — 構成図ビルダー用 AWS コンポーネント台帳
// UTF-8 BOMなし / learn は js/data/services/aws.js の slug（learn/<slug>.html に解説ページがある）
window.CERT_ARCH = window.CERT_ARCH || {};
window.CERT_ARCH.aws = {
  provider: "aws",

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
    { id: "ec2",         name: "Amazon EC2",        abbr: "EC2", cat: "compute", learn: "amazon-ec2",            desc: "仮想サーバー（IaaS）" },
    { id: "lambda",      name: "AWS Lambda",        abbr: "λ",   cat: "compute", learn: "aws-lambda",            desc: "サーバーレス関数（最大15分）" },
    { id: "ecs",         name: "Amazon ECS",        abbr: "ECS", cat: "compute", learn: "amazon-ecs",            desc: "コンテナ実行（Fargate含む）" },
    { id: "eks",         name: "Amazon EKS",        abbr: "EKS", cat: "compute", learn: "amazon-eks",            desc: "マネージド Kubernetes" },
    { id: "beanstalk",   name: "Elastic Beanstalk", abbr: "EB",  cat: "compute", learn: "aws-elastic-beanstalk", desc: "アプリ実行基盤の自動構築" },
    { id: "autoscaling", name: "Auto Scaling",      abbr: "ASG", cat: "compute", learn: null,                    desc: "EC2 の自動増減" },
    { id: "ecr",         name: "Amazon ECR",        abbr: "ECR", cat: "compute", learn: "amazon-ecr",            desc: "コンテナイメージのレジストリ" },

    // ---- ストレージ ----
    { id: "s3",  name: "Amazon S3",  abbr: "S3",  cat: "storage", learn: "amazon-s3",  desc: "オブジェクトストレージ" },
    { id: "ebs", name: "Amazon EBS", abbr: "EBS", cat: "storage", learn: "amazon-ebs", desc: "EC2 用ブロックストレージ" },
    { id: "efs", name: "Amazon EFS", abbr: "EFS", cat: "storage", learn: "amazon-efs", desc: "共有ファイルストレージ（NFS）" },

    // ---- データベース ----
    { id: "rds",         name: "Amazon RDS",      abbr: "RDS", cat: "database", learn: "amazon-rds",         desc: "マネージドRDB（MySQL等）" },
    { id: "aurora",      name: "Amazon Aurora",   abbr: "AUR", cat: "database", learn: "amazon-aurora",      desc: "クラウド最適化RDB" },
    { id: "dynamodb",    name: "DynamoDB",        abbr: "DDB", cat: "database", learn: "amazon-dynamodb",    desc: "サーバーレスNoSQL" },
    { id: "elasticache", name: "ElastiCache",     abbr: "ELC", cat: "database", learn: "amazon-elasticache", desc: "インメモリキャッシュ" },
    { id: "redshift",    name: "Amazon Redshift", abbr: "RS",  cat: "database", learn: "amazon-redshift",    desc: "データウェアハウス" },

    // ---- ネットワーク / 配信 ----
    { id: "alb",         name: "ALB",             abbr: "ALB",  cat: "network", learn: "elastic-load-balancing", desc: "L7ロードバランサー" },
    { id: "nlb",         name: "NLB",             abbr: "NLB",  cat: "network", learn: "elastic-load-balancing", desc: "L4ロードバランサー" },
    { id: "cloudfront",  name: "CloudFront",      abbr: "CF",   cat: "network", learn: "amazon-cloudfront",      desc: "CDN（エッジ配信）" },
    { id: "route53",     name: "Route 53",        abbr: "R53",  cat: "network", learn: "amazon-route-53",        desc: "DNS・ルーティング" },
    { id: "apigw",       name: "API Gateway",     abbr: "APIG", cat: "network", learn: "amazon-api-gateway",     desc: "APIの公開・管理" },
    { id: "natgw",       name: "NAT Gateway",     abbr: "NAT",  cat: "network", learn: null,                     desc: "プライベート→外部の出口" },
    { id: "igw",         name: "Internet Gateway",abbr: "IGW",  cat: "network", learn: null,                     desc: "VPCとインターネットの境界" },
    { id: "dx",          name: "Direct Connect",  abbr: "DX",   cat: "network", learn: "aws-direct-connect",     desc: "オンプレとの専用線接続" },
    { id: "tgw",         name: "Transit Gateway", abbr: "TGW",  cat: "network", learn: "aws-transit-gateway",    desc: "複数VPC/拠点のハブ" },
    { id: "privatelink", name: "PrivateLink",     abbr: "PL",   cat: "network", learn: "aws-privatelink",        desc: "VPCエンドポイント経由の閉域接続" },

    // ---- アプリケーション統合 ----
    { id: "sqs",           name: "Amazon SQS",     abbr: "SQS", cat: "integration", learn: "amazon-sqs",         desc: "メッセージキュー" },
    { id: "sns",           name: "Amazon SNS",     abbr: "SNS", cat: "integration", learn: "amazon-sns",         desc: "Pub/Sub 通知" },
    { id: "eventbridge",   name: "EventBridge",    abbr: "EVB", cat: "integration", learn: "amazon-eventbridge", desc: "イベントバス・スケジュール" },
    { id: "stepfunctions", name: "Step Functions", abbr: "SFN", cat: "integration", learn: "aws-step-functions", desc: "ワークフロー制御" },

    // ---- セキュリティ / 認証 ----
    { id: "iam",            name: "AWS IAM",         abbr: "IAM", cat: "security", learn: "aws-iam",             desc: "権限・ロールの管理" },
    { id: "cognito",        name: "Amazon Cognito",  abbr: "COG", cat: "security", learn: "amazon-cognito",      desc: "ユーザー認証・IDプール" },
    { id: "kms",            name: "AWS KMS",         abbr: "KMS", cat: "security", learn: "aws-kms",             desc: "暗号鍵の管理" },
    { id: "secretsmanager", name: "Secrets Manager", abbr: "SCM", cat: "security", learn: "aws-secrets-manager", desc: "シークレットの保管・ローテーション" },
    { id: "waf",            name: "AWS WAF",         abbr: "WAF", cat: "security", learn: "aws-waf",             desc: "Webアプリのファイアウォール" },
    { id: "guardduty",      name: "GuardDuty",       abbr: "GD",  cat: "security", learn: "amazon-guardduty",    desc: "脅威検出" },

    // ---- 管理 / 監視 ----
    { id: "cloudwatch", name: "CloudWatch",      abbr: "CW",   cat: "monitoring", learn: "amazon-cloudwatch",   desc: "メトリクス・ログ・アラーム" },
    { id: "cloudtrail", name: "CloudTrail",      abbr: "CT",   cat: "monitoring", learn: "aws-cloudtrail",      desc: "API操作の証跡" },
    { id: "config",     name: "AWS Config",      abbr: "CFG",  cat: "monitoring", learn: "aws-config",          desc: "構成変更の記録・評価" },
    { id: "ssm",        name: "Systems Manager", abbr: "SSM",  cat: "monitoring", learn: "aws-systems-manager", desc: "運用管理（Session Manager等）" },
    { id: "xray",       name: "AWS X-Ray",       abbr: "XRAY", cat: "monitoring", learn: "aws-x-ray",           desc: "分散トレーシング" },

    // ---- 分析 ----
    { id: "kinesis", name: "Amazon Kinesis", abbr: "KDS",  cat: "analytics", learn: "amazon-kinesis", desc: "ストリーミングデータ処理" },
    { id: "athena",  name: "Amazon Athena",  abbr: "ATH",  cat: "analytics", learn: "amazon-athena",  desc: "S3 を直接 SQL クエリ" },
    { id: "glue",    name: "AWS Glue",       abbr: "GLUE", cat: "analytics", learn: "aws-glue",       desc: "ETL・データカタログ" },

    // ---- 機械学習 / AI ----
    { id: "bedrock",   name: "Amazon Bedrock",   abbr: "BR", cat: "ml", learn: "amazon-bedrock",   desc: "基盤モデル（生成AI）API" },
    { id: "sagemaker", name: "SageMaker",        abbr: "SM", cat: "ml", learn: "amazon-sagemaker", desc: "機械学習の構築・学習・推論" },

    // ---- 開発者ツール / IaC ----
    { id: "codepipeline",   name: "CodePipeline",   abbr: "CP",  cat: "devtools", learn: "aws-codepipeline",   desc: "CI/CD パイプライン" },
    { id: "codebuild",      name: "CodeBuild",      abbr: "CB",  cat: "devtools", learn: "aws-codebuild",      desc: "ビルド・テスト実行" },
    { id: "codedeploy",     name: "CodeDeploy",     abbr: "CD",  cat: "devtools", learn: "aws-codedeploy",     desc: "自動デプロイ" },
    { id: "cloudformation", name: "CloudFormation", abbr: "CFN", cat: "devtools", learn: "aws-cloudformation", desc: "IaC（テンプレートで構築）" }
  ],

  // グループ枠（VPC・サブネットなどの「囲い」）
  groupKinds: [
    { id: "aws",     label: "AWS クラウド",            color: "#ff9a1f" },
    { id: "region",  label: "AWS リージョン",          color: "#8c96ad" },
    { id: "vpc",     label: "VPC",                     color: "#a78bfa" },
    { id: "public",  label: "パブリックサブネット",    color: "#86c352" },
    { id: "private", label: "プライベートサブネット",  color: "#5e9bff" },
    { id: "az",      label: "アベイラビリティゾーン",  color: "#25c6f2" }
  ],

  // ---- 配置スコープ（所属判定に使用）----
  // vpcScoped: VPC内のサブネットに置くリソース / anyScope: どちらでも不自然でないもの
  // それ以外のコンポーネントは「リージョン/グローバル」扱いで、VPC枠の中に置くと指摘が出る
  vpcScoped: ["ec2", "ecs", "eks", "rds", "aurora", "elasticache", "redshift", "alb", "nlb", "natgw", "efs"],
  anyScope:  ["lambda", "beanstalk", "autoscaling", "ebs", "igw", "privatelink", "dx", "tgw"],

  // ---- 配置トポロジ（builder-core.js の汎用チェックが参照する枠の定義と文言）----
  topology: {
    cloud: "aws", network: "vpc", public: "public", private: "private",
    subnets: ["public", "private"],
    cloudName: "AWS",
    cloudFrame: "AWS クラウド枠",
    networkFrame: "VPC",
    regionHint: "（VPC 内から閉域で使う場合は VPC エンドポイント経由）",
    privateIngressMsg: "この接続はできない。プライベートサブネットにはインターネット側からの経路（ルート）が無い。受信はパブリックサブネットの ALB/NLB、送信は NAT Gateway を経由させる。"
  },
  // プライベートサブネット直結NGの起点になる「外部側」のコンポーネント
  externalIngressIds: ["user", "internet", "igw"],

  // ノード個別の配置ルール
  nodeRules: [
    { c: "natgw", inKinds: ["private"], msg: "NAT Gateway はパブリックサブネット側に置く。プライベートサブネットからはルートテーブルで NAT に向ける。" },
    { c: "igw", inKinds: ["public", "private"], msg: "Internet Gateway は VPC に 1 つ関連付けるもので、サブネットの中には置かない。VPC 枠の縁に描くのが通例。" }
  ],

  // 枠の入れ子ルール
  groupNesting: [
    { child: ["public", "private"], parent: "vpc", msg: "サブネットは VPC の内側に描く。VPC 枠の中へ移動しよう。" },
    { child: ["vpc"], parent: "aws", msg: "VPC は AWS クラウド枠の内側に描こう。" }
  ],

  // できない接続（level=error）
  edgeRules: [
    { type: "peerOnly", c: "ebs", allow: ["ec2"], msg: "この接続はできない。EBS は EC2 にアタッチして使うブロックストレージで、他のサービスや外部から直接アクセスする手段がない。共有が必要なら EFS か S3 を使う。" },
    { type: "noExternal", c: "efs", msg: "この接続はできない。EFS は VPC 内のマウントターゲット経由で NFS マウントするストレージで、インターネットから直接マウントできない。" },
    { type: "noExternal", c: "natgw", msg: "この接続はできない。NAT Gateway は「中から外へ」の送信専用で、外部からの接続の入口にはならない。受信の入口は ALB/NLB（+ IGW）にする。" }
  ],

  // ---- 線種（接続タイプ）----
  edgeTypes: {
    net:    { label: "ネットワーク経路",  color: "rgba(150,165,200,0.6)", png: "rgba(150,165,200,0.7)", dash: null },
    iam:    { label: "IAM権限",           color: "#3fe0a4",               png: "rgba(63,224,164,0.8)",   dash: [6, 4] },
    attach: { label: "関連付け / 設定",   color: "#a78bfa",               png: "rgba(167,139,250,0.8)",  dash: [2, 4] }
  },

  // 接続ナレッジベース。キーは "from>to"。
  // l = 線上に出す短いラベル / d = インスペクタに出す解説 / t = 線種（net | iam | attach）
  // 逆向きで引かれた場合は builder-core.js 側で from/to を入れ替えて照合する。
  links: {
    "user>route53":     { t: "net", l: "名前解決", d: "ユーザーはまず DNS でドメイン名を解決する。Route 53 のホストゾーンに Alias レコードを置き、CloudFront や ALB に向けるのが定番。" },
    "user>cloudfront":  { t: "net", l: "HTTPS", d: "最寄りのエッジロケーション経由でコンテンツを受け取る。入口を CloudFront に揃えると、キャッシュ・WAF・証明書をまとめて管理できる。" },
    "user>alb":         { t: "net", l: "HTTPS", d: "ALB が公開エンドポイントになるパターン。HTTPS リスナーに ACM の証明書を関連付ける。本番では手前に CloudFront + WAF を置くことが多い。" },
    "user>apigw":       { t: "net", l: "API呼び出し", d: "クライアントから REST / HTTP API を直接叩く構成。スロットリングや API キー、オーソライザーによる認証は API Gateway 側で設定する。" },
    "user>cognito":     { t: "net", l: "サインイン", d: "Cognito ユーザープールでサインインし、ID トークン / アクセストークンを受け取る。以降の API 呼び出しにこのトークンを添える。" },
    "internet>igw":     { t: "net", l: "流入", d: "インターネットからの通信は Internet Gateway を通って VPC に入る。IGW を持たない VPC は外部から直接到達できない。" },
    "igw>internet":     { t: "net", l: "流出", d: "VPC からインターネットへの出口。パブリックサブネットのルートテーブルに 0.0.0.0/0 → IGW のルートが必要。" },

    "route53>cloudfront": { t: "attach", l: "Aliasレコード", d: "Route 53 の Alias レコードで CloudFront ディストリビューションに向ける。Route 53 自体にトラフィックは流れない（DNS の応答で向き先を返すだけ）。CNAME と違い Zone Apex でも使える。" },
    "route53>alb":        { t: "attach", l: "Aliasレコード", d: "Alias レコードで ALB の DNS 名に向ける。加重・レイテンシー・フェイルオーバーなどのルーティングポリシーを組み合わせると、リージョン間の振り分けもできる。" },
    "route53>apigw":      { t: "attach", l: "カスタムドメイン", d: "API Gateway のカスタムドメイン名を作り、Route 53 から Alias で向ける。証明書は ACM で発行しておく。" },

    "cloudfront>s3":    { t: "net", l: "オリジン (OAC)", d: "S3 バケットをオリジンとして配信する王道パターン。OAC（オリジンアクセスコントロール）を設定し、バケットポリシーで CloudFront 以外からの直接アクセスを拒否する。試験でも最頻出。" },
    "cloudfront>alb":   { t: "net", l: "カスタムオリジン", d: "動的コンテンツを ALB から配信するときのカスタムオリジン構成。ALB のセキュリティグループは CloudFront のプレフィックスリストからのみ許可すると、オリジン直叩きを防げる。" },
    "cloudfront>apigw": { t: "net", l: "カスタムオリジン", d: "API を CloudFront 越しに公開する構成。独自のキャッシュ制御や WAF をエッジで効かせたいときに使う。" },

    "waf>cloudfront": { t: "attach", l: "Web ACL", d: "WAF の Web ACL を CloudFront ディストリビューションに関連付ける。SQL インジェクション対策やレートベースルールをエッジで効かせられる。CloudFront 用の Web ACL は us-east-1 で作る点に注意。" },
    "waf>alb":        { t: "attach", l: "Web ACL", d: "Web ACL を ALB に関連付けるリージョナル構成。CloudFront を使わない内部向けアプリの保護はこちら。" },
    "waf>apigw":      { t: "attach", l: "Web ACL", d: "Web ACL を API Gateway のステージに関連付けて、不正リクエストを API の手前で落とす。" },

    "alb>ec2":    { t: "net", l: "ターゲットグループ", d: "ターゲットグループに EC2 を登録し、ヘルスチェックに通ったインスタンスへだけ振り分ける。EC2 側のセキュリティグループは「ALB の SG からのインバウンドのみ許可」にするのが定石。" },
    "alb>ecs":    { t: "net", l: "ターゲットグループ (IP)", d: "ECS サービスと ALB を統合すると、タスクの起動・停止に合わせてターゲットの登録・解除が自動で行われる。Fargate ではターゲットタイプ ip を使う。" },
    "alb>lambda": { t: "net", l: "Lambdaターゲット", d: "ALB のターゲットに Lambda 関数を指定できる。既存の ALB 配下に一部だけサーバーレスを混ぜたいときに便利。" },
    "nlb>ec2":    { t: "net", l: "ターゲットグループ", d: "TCP/UDP を高スループット・低レイテンシーで捌く NLB の構成。固定 IP（Elastic IP）を持てるのは NLB だけ、という点が試験で問われる。" },

    "autoscaling>ec2": { t: "attach", l: "起動テンプレート", d: "Auto Scaling グループが起動テンプレートを元に EC2 を増減させる。CloudWatch アラームと組み合わせた動的スケーリング、複数 AZ への分散配置が基本形。" },

    "apigw>lambda":   { t: "net", l: "プロキシ統合", d: "リクエストをそのまま Lambda に渡すプロキシ統合が最頻出。Lambda 側はステータスコードとボディを含む決まった形式の JSON を返す。" },
    "apigw>cognito":  { t: "attach", l: "オーソライザー", d: "API Gateway のオーソライザーに Cognito ユーザープールを指定。トークンを検証してから後段に通すので、Lambda 側に認証コードを書かなくて済む。" },
    "apigw>dynamodb": { t: "iam", l: "サービス統合", d: "Lambda を挟まず API Gateway から直接 DynamoDB を呼ぶ統合もできる。API Gateway に渡す IAM ロールで権限を制御する。単純な CRUD ならこちらの方が安くて速い。" },
    "apigw>sqs":      { t: "iam", l: "サービス統合", d: "API Gateway から直接 SQS にメッセージを積む構成。受け付けだけ先に返して、処理は後段に任せるバッファリングパターン。" },

    "lambda>dynamodb":       { t: "iam", l: "実行ロールでCRUD", d: "Lambda の実行ロールに DynamoDB への最小権限ポリシーを付けてアクセスする。接続文字列もパスワードも不要なのがサーバーレス構成の強み。" },
    "lambda>s3":             { t: "iam", l: "実行ロール", d: "実行ロールに s3:GetObject / PutObject などを付与してアクセスする。バケットポリシー側でも制御できるが、まず IAM 側で最小権限にするのが基本。" },
    "lambda>rds":            { t: "net", l: "RDS Proxy 推奨", d: "Lambda から直接 RDS に繋ぐと同時実行のたびにコネクションが増えて枯渇しがち。間に RDS Proxy を挟んで接続をプールするのが推奨パターン。VPC 設定も必要になる。" },
    "lambda>sqs":            { t: "iam", l: "メッセージ送信", d: "Lambda から SQS にメッセージを積んで後続処理に渡す。重い処理を切り離して応答を速くする非同期化の第一歩。実行ロールに sqs:SendMessage が必要。" },
    "lambda>sns":            { t: "iam", l: "発行", d: "Lambda からトピックに発行して、複数のサブスクライバーに一斉配信する。実行ロールに sns:Publish が必要。" },
    "lambda>bedrock":        { t: "iam", l: "InvokeModel", d: "Lambda から Bedrock の InvokeModel API で基盤モデルを呼び出す。実行ロールに bedrock:InvokeModel の許可が必要。" },
    "lambda>secretsmanager": { t: "iam", l: "シークレット取得", d: "DB パスワードや API キーは Secrets Manager から実行時に取得する。コードや環境変数に平文で置かない。自動ローテーションも任せられる。" },

    "s3>lambda":  { t: "attach", l: "イベント通知", d: "オブジェクト作成などの S3 イベントで Lambda を起動。画像のサムネイル生成が定番例。出力を同じバケットに書き戻すと無限ループになるので、プレフィックスかバケットを分ける。" },
    "s3>athena":  { t: "iam", l: "クエリ対象", d: "Athena は S3 のデータをそのまま SQL でクエリできる。Parquet 化とパーティション分割でスキャン量（= 料金）を減らすのが頻出ポイント。" },

    "sqs>lambda": { t: "attach", l: "イベントソース", d: "SQS をイベントソースマッピングに設定すると、Lambda がキューをポーリングして自動起動する。処理に失敗し続けたメッセージは DLQ（デッドレターキュー）へ退避させる。" },
    "sns>sqs":    { t: "attach", l: "ファンアウト", d: "SNS トピックに複数の SQS キューをサブスクライブさせるファンアウト構成。1 つのイベントを複数システムが独立に処理でき、片方が落ちてもメッセージはキューに残る。" },
    "sns>lambda": { t: "attach", l: "サブスクライブ", d: "トピックへの発行をトリガーに Lambda を起動する。SQS 経由と違いプッシュ型で、リトライ回数に限りがある点が違い。" },

    "eventbridge>lambda":        { t: "attach", l: "ルールターゲット", d: "イベントパターンやスケジュール（cron）にマッチしたら Lambda を起動。サービス間を疎結合に繋ぐハブとして使う。" },
    "eventbridge>stepfunctions": { t: "attach", l: "ルールターゲット", d: "イベントを起点にステートマシンを開始する。夜間バッチや定期実行ワークフローの定番。" },
    "eventbridge>sqs":           { t: "attach", l: "ルールターゲット", d: "イベントをいったんキューに積んで、消費側のペースで処理させる。" },
    "stepfunctions>lambda":      { t: "iam", l: "タスク実行", d: "ステートマシンの各ステップで Lambda を呼び出す。ステートマシンの IAM ロールに lambda:InvokeFunction が必要。リトライ・エラー分岐・並列実行を定義で書けるのが強み。" },

    "ec2>rds":            { t: "net", l: "SG許可", d: "RDS 側のセキュリティグループで「EC2 の SG からのインバウンドのみ許可」と設定する。IP アドレス指定で許可するのはアンチパターン。RDS はプライベートサブネットに置く。" },
    "ec2>aurora":         { t: "net", l: "SG許可", d: "接続の考え方は RDS と同じ。Aurora はリーダーエンドポイントを使えば読み取りを複数レプリカに分散できる。" },
    "ec2>elasticache":    { t: "net", l: "SG許可", d: "セッション情報や頻繁に読むデータをキャッシュして DB の負荷を下げる。Redis ならレプリケーションやフェイルオーバーにも対応。" },
    "ec2>dynamodb":       { t: "iam", l: "IAMロール", d: "DynamoDB は VPC 内のリソースではなく API。インスタンスプロファイルの IAM 権限で制御し、閉域で繋ぐならゲートウェイ型 VPC エンドポイントを使う。" },
    "ec2>s3":             { t: "iam", l: "インスタンスプロファイル", d: "EC2 に IAM ロール（インスタンスプロファイル）を付けて S3 にアクセスする。アクセスキーを EC2 内に置くのはアンチパターンとして頻出。" },
    "ec2>efs":            { t: "net", l: "NFSマウント", d: "複数の EC2 から同じ EFS を NFS マウントして共有できる。マウントターゲットの SG でポート 2049 を許可する。" },
    "ec2>ebs":            { t: "attach", l: "アタッチ", d: "EBS はネットワーク接続型のブロックストレージ。基本は同一 AZ の EC2 にアタッチして使い、スナップショットで S3 にバックアップする。" },
    "ec2>natgw":          { t: "net", l: "0.0.0.0/0 ルート", d: "プライベートサブネットの EC2 は、ルートテーブルのデフォルトルートを NAT Gateway に向けて外部に出る。NAT Gateway 自体はパブリックサブネットに置く。この配置関係が試験頻出。" },
    "ec2>secretsmanager": { t: "iam", l: "シークレット取得", d: "DB 認証情報などを起動時・実行時に取得する。ハードコードせず、ロールの権限で取りに行くのが基本。" },
    "ec2>cloudwatch":     { t: "iam", l: "メトリクス/ログ", d: "標準メトリクスは自動収集。メモリ使用率やアプリログは CloudWatch エージェントを入れて送る。エージェントはロールの権限で PutMetricData / PutLogEvents を呼ぶ。" },

    "ecs>rds":      { t: "net", l: "SG許可", d: "考え方は EC2 → RDS と同じで、タスクの SG から RDS の SG への許可を設定する。認証情報は Secrets Manager から taskDefinition に注入できる。" },
    "ecs>ecr":      { t: "iam", l: "イメージ取得", d: "タスク実行ロール（execution role）が ECR からイメージをプルする。アプリ自体の権限であるタスクロールとの違いが試験で問われる。" },
    "natgw>igw":    { t: "net", l: "外部へ", d: "NAT Gateway はパブリックサブネットに置かれ、Internet Gateway を通って外に出る。戻りの通信は NAT が変換して返すので、外部から直接プライベートには入れない。" },
    "onprem>dx":    { t: "net", l: "専用線", d: "オンプレと AWS を専用線で繋ぐ。帯域が安定しインターネットを経由しない。冗長化には別ロケーションの DX か、バックアップの Site-to-Site VPN を組み合わせる。" },
    "dx>tgw":       { t: "net", l: "DXゲートウェイ経由", d: "Direct Connect Gateway と Transit Gateway を繋ぎ、オンプレから複数 VPC へまとめて到達させる。VPC が増えるほどメッシュ接続より管理が楽になる。" },
    "onprem>tgw":   { t: "net", l: "VPN/DX接続", d: "オンプレ拠点と複数 VPC をハブ型で繋ぐ。VPC ピアリングの組み合わせ爆発を避けたいときの解。" },

    "tgw>ec2":        { t: "net", l: "TGW経由ルート", d: "正確には Transit Gateway は VPC 単位でアタッチし、各 VPC のルートテーブルに TGW 向けのルートを足すことで EC2 まで到達できるようになる。EC2 個別に何かを設定するわけではない。" },

    "kinesis>lambda": { t: "attach", l: "ストリーム処理", d: "イベントソースマッピングでシャードごとにレコードをバッチで受け取って処理する。順序が保たれるのはシャード内のみ、という点がよく問われる。" },
    "kinesis>s3":     { t: "iam", l: "Firehose配信", d: "Kinesis Data Firehose を使えばストリームをバッファして S3 へ自動配信できる。Firehose に渡す IAM ロールに S3 への書き込み権限を付ける。ニアリアルタイムのデータレイク取り込みの定番。" },
    "glue>s3":        { t: "iam", l: "ETL", d: "Glue ジョブで S3 のデータを変換し、カタログ化して Athena や Redshift から使えるようにする。ジョブの IAM ロールに対象バケットへの権限が必要。" },
    "athena>glue":    { t: "attach", l: "データカタログ", d: "Athena は Glue データカタログのテーブル定義（スキーマ）を参照してクエリする。クローラを回してスキーマを自動更新させる構成が多い。" },
    "sagemaker>s3":   { t: "iam", l: "学習データ/モデル", d: "学習データの読み込み先もモデル成果物の保存先も S3。学習ジョブには S3 への権限を持つ実行ロールを渡す。" },

    "codepipeline>codebuild":  { t: "iam", l: "ビルドステージ", d: "パイプラインのサービスロールがビルドステージとして CodeBuild を起動する。buildspec.yml にビルド手順を書く。" },
    "codepipeline>codedeploy": { t: "iam", l: "デプロイステージ", d: "ビルド成果物を CodeDeploy に渡して展開する。EC2 / ECS / Lambda それぞれにデプロイ戦略（Blue/Green 等）を選べる。" },
    "codebuild>ecr":           { t: "iam", l: "イメージpush", d: "ビルドしたコンテナイメージを ECR にプッシュする。CodeBuild のサービスロールに ECR への push 権限を付ける。ECS へのローリングデプロイの前段。" },
    "codedeploy>ec2":          { t: "attach", l: "エージェント経由", d: "EC2 上の CodeDeploy エージェントが S3 から成果物を取得して配置する。appspec.yml でフックを定義。" },
    "cloudformation>ec2":      { t: "attach", l: "プロビジョニング", d: "テンプレートからスタックとしてリソースを作成・更新・削除する。手作業の構築と違い、同じ構成を何度でも再現できる。" },

    "cloudwatch>autoscaling": { t: "attach", l: "アラーム→スケール", d: "CPU 使用率などのアラームをトリガーに Auto Scaling のスケーリングポリシーを発動させる。閾値ベースよりターゲット追跡の方が設定が簡単。" },
    "cloudwatch>sns":         { t: "attach", l: "アラーム通知", d: "アラーム状態の変化を SNS トピックに発行し、メールや Slack（Lambda 経由）に通知する。" },
    "cognito>apigw":          { t: "attach", l: "トークン検証", d: "Cognito が発行したトークンを API Gateway のオーソライザーが検証する。向きは逆でも意味は同じ（API Gateway 側にオーソライザーを設定する）。" }
  },

  // links に無い組み合わせのフォールバック（カテゴリで判定）
  fallbackHints: [
    { cat: "monitoring", t: "attach", l: "監視/記録", d: "監視系サービスとの接続。メトリクス・ログ・証跡の収集は多くの場合エージェントか標準連携で自動化でき、明示的なネットワーク設定は不要。" },
    { cat: "security",   t: "iam", l: "認証/権限", d: "セキュリティ系サービスとの接続。IAM ポリシーやロールの付与、もしくはサービスへの関連付け（アタッチ）で実現することが多い。" }
  ],
  fallbackGeneric: { t: null, l: "", d: "この組み合わせの代表パターンはまだ未収録。実際に繋ぐ場合は、API 系サービスなら IAM 権限、VPC 内の通信ならセキュリティグループとルートテーブル、の どちらが必要かをまず切り分ける。" },

  // テンプレート（nodes の x,y はキャンバス座標 / edges は nodes 配列の index ペア）
  templates: [
    {
      id: "3tier",
      name: "3層Webアプリ（EC2 + RDS）",
      groups: [
        { k: "aws",     x: 220, y: 30,  w: 1110, h: 630 },
        { k: "vpc",     x: 420, y: 180, w: 660,  h: 440 },
        { k: "public",  x: 445, y: 230, w: 280,  h: 360 },
        { k: "private", x: 760, y: 230, w: 290,  h: 360 }
      ],
      nodes: [
        { c: "user",       x: 60,   y: 260 },
        { c: "route53",    x: 250,  y: 70  },
        { c: "cloudfront", x: 250,  y: 260 },
        { c: "waf",        x: 250,  y: 450 },
        { c: "s3",         x: 455,  y: 70  },
        { c: "alb",        x: 495,  y: 280 },
        { c: "natgw",      x: 495,  y: 460 },
        { c: "ec2",        x: 830,  y: 280 },
        { c: "rds",        x: 830,  y: 460 },
        { c: "cloudwatch", x: 1140, y: 280 }
      ],
      edges: [[0,1],[1,2],[3,2],[2,4],[2,5],[5,7],[7,8],[7,6],[7,9]]
    },
    {
      id: "serverless",
      name: "サーバーレスAPI（API GW + Lambda + DynamoDB）",
      groups: [
        { k: "aws", x: 230, y: 60, w: 1030, h: 480 }
      ],
      nodes: [
        { c: "user",       x: 60,   y: 270 },
        { c: "cloudfront", x: 260,  y: 120 },
        { c: "s3",         x: 470,  y: 120 },
        { c: "cognito",    x: 260,  y: 430 },
        { c: "apigw",      x: 470,  y: 290 },
        { c: "lambda",     x: 680,  y: 290 },
        { c: "dynamodb",   x: 890,  y: 200 },
        { c: "sqs",        x: 890,  y: 380 },
        { c: "lambda",     x: 1090, y: 380 }
      ],
      edges: [[0,1],[1,2],[0,4],[4,3],[4,5],[5,6],[5,7],[7,8],[8,6]]
    },
    {
      id: "static-site",
      name: "静的サイト配信（S3 + CloudFront）",
      groups: [
        { k: "aws", x: 240, y: 40, w: 980, h: 520 }
      ],
      nodes: [
        { c: "user",       x: 60,  y: 250 },
        { c: "route53",    x: 300, y: 90  },
        { c: "waf",        x: 300, y: 420 },
        { c: "cloudfront", x: 560, y: 250 },
        { c: "s3",         x: 860, y: 250 }
      ],
      edges: [[0,1],[0,3],[1,3],[2,3],[3,4]]
    },
    {
      id: "fanout",
      name: "ファンアウト（SNS + SQS 非同期処理）",
      groups: [
        { k: "aws", x: 250, y: 40, w: 1330, h: 640 }
      ],
      nodes: [
        { c: "user",     x: 60,   y: 300 },
        { c: "apigw",    x: 300,  y: 300 },
        { c: "lambda",   x: 520,  y: 300 },
        { c: "sns",      x: 740,  y: 300 },
        { c: "sqs",      x: 980,  y: 150 },
        { c: "sqs",      x: 980,  y: 450 },
        { c: "lambda",   x: 1200, y: 150 },
        { c: "lambda",   x: 1200, y: 450 },
        { c: "dynamodb", x: 1410, y: 150 },
        { c: "s3",       x: 1410, y: 450 }
      ],
      edges: [[0,1],[1,2],[2,3],[3,4],[3,5],[4,6],[5,7],[6,8],[7,9]]
    },
    {
      id: "hybrid",
      name: "ハイブリッド接続（DX + Transit Gateway）",
      groups: [
        { k: "aws", x: 340, y: 40,  w: 1120, h: 720 },
        { k: "vpc", x: 700, y: 90,  w: 420,  h: 300 },
        { k: "vpc", x: 700, y: 430, w: 420,  h: 300 }
      ],
      nodes: [
        { c: "onprem",   x: 60,   y: 350 },
        { c: "dx",       x: 390,  y: 350 },
        { c: "tgw",      x: 545,  y: 350 },
        { c: "ec2",      x: 760,  y: 160 },
        { c: "rds",      x: 950,  y: 260 },
        { c: "ec2",      x: 760,  y: 500 },
        { c: "dynamodb", x: 1240, y: 560 }
      ],
      edges: [[0,1],[1,2],[2,3],[2,5],[3,4],[5,6]]
    },
    {
      id: "cicd",
      name: "CI/CD パイプライン（CodePipeline）",
      groups: [
        { k: "aws", x: 240,  y: 40,  w: 1240, h: 640 },
        { k: "vpc", x: 1040, y: 330, w: 410,  h: 300 }
      ],
      nodes: [
        { c: "codepipeline", x: 290,  y: 300 },
        { c: "codebuild",    x: 540,  y: 150 },
        { c: "ecr",          x: 790,  y: 150 },
        { c: "codedeploy",   x: 540,  y: 460 },
        { c: "ec2",          x: 1090, y: 470 },
        { c: "ecs",          x: 1280, y: 380 }
      ],
      edges: [[0,1],[1,2],[0,3],[3,4],[5,2]]
    }
  ]
};
