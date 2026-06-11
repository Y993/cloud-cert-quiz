// =============================================================
// CLOUDCERT_ 試験カタログ（マニフェスト）
// -------------------------------------------------------------
// 新しい試験を追加する手順は docs/ADDING_EXAMS.md を参照。
// 1. js/data/exams/<exam-id>.js に問題データを作成
// 2. 下記 exams 配列の該当エントリを更新
//    （status: "available"、questionCount: 実数、dataFile: パス）
// ※ passLine / timeLimitMin は各社公式の目安値（表示用）
// =============================================================
window.CERT_CATALOG = {
  providers: [
    {
      id: "aws",
      short: "AWS",
      name: "Amazon Web Services",
      tagline: "世界シェアNo.1。実務でも転職でも最も需要の高いクラウド資格群。",
      exams: [
        // ---- Foundational ----
        {
          id: "aws-clf-c02",
          code: "CLF-C02",
          title: "Cloud Practitioner",
          titleJa: "クラウドプラクティショナー",
          level: "Foundational",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 90,
          dataFile: "js/data/exams/aws-clf-c02.js",
          description: "AWSの基礎概念・料金・セキュリティを問う入門資格。"
        },
        {
          id: "aws-aif-c01",
          code: "AIF-C01",
          title: "AI Practitioner",
          titleJa: "AIプラクティショナー",
          level: "Foundational",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 90,
          dataFile: "js/data/exams/aws-aif-c01.js",
          description: "生成AI・ML・Bedrockなど、AWSのAIサービス基礎を問う注目資格。"
        },
        // ---- Associate ----
        {
          id: "aws-saa-c03",
          code: "SAA-C03",
          title: "Solutions Architect – Associate",
          titleJa: "ソリューションアーキテクト アソシエイト",
          level: "Associate",
          status: "available",
          questionCount: 150,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "js/data/exams/aws-saa-c03.js",
          description: "可用性・コスト・性能・セキュリティの4ドメインからシナリオベースで出題。"
        },
        {
          id: "aws-dva-c02",
          code: "DVA-C02",
          title: "Developer – Associate",
          titleJa: "デベロッパー アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "",
          description: "Lambda・DynamoDB・CI/CDなど開発者視点の設計と実装。"
        },
        {
          id: "aws-soa-c02",
          code: "SOA-C02",
          title: "SysOps Administrator – Associate",
          titleJa: "SysOpsアドミニストレーター アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "",
          description: "モニタリング・運用自動化・トラブルシューティングの運用者向け資格。"
        },
        {
          id: "aws-dea-c01",
          code: "DEA-C01",
          title: "Data Engineer – Associate",
          titleJa: "データエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "",
          description: "Glue・Redshift・Kinesisなどデータパイプライン設計の専門資格。"
        },
        {
          id: "aws-mla-c01",
          code: "MLA-C01",
          title: "Machine Learning Engineer – Associate",
          titleJa: "機械学習エンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 72,
          timeLimitMin: 130,
          dataFile: "",
          description: "SageMakerを中心としたML運用（MLOps）の実装力を問う資格。"
        },
        // ---- Professional ----
        {
          id: "aws-sap-c02",
          code: "SAP-C02",
          title: "Solutions Architect – Professional",
          titleJa: "ソリューションアーキテクト プロフェッショナル",
          level: "Professional",
          status: "available",
          questionCount: 150,
          passLine: 75,
          timeLimitMin: 180,
          dataFile: "js/data/exams/aws-sap-c02.js",
          description: "複数アカウント・大規模移行・複雑な要件を扱う最難関クラス。"
        },
        {
          id: "aws-dop-c02",
          code: "DOP-C02",
          title: "DevOps Engineer – Professional",
          titleJa: "DevOpsエンジニア プロフェッショナル",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 75,
          timeLimitMin: 180,
          dataFile: "",
          description: "CI/CD・IaC・運用自動化を極めるDevOpsの最上位資格。"
        },
        // ---- Specialty ----
        {
          id: "aws-ans-c01",
          code: "ANS-C01",
          title: "Advanced Networking – Specialty",
          titleJa: "高度なネットワーキング 専門知識",
          level: "Specialty",
          status: "coming-soon",
          questionCount: 0,
          passLine: 75,
          timeLimitMin: 170,
          dataFile: "",
          description: "ハイブリッド接続・Transit Gateway・DNS設計などネットワーク特化。"
        },
        {
          id: "aws-scs-c02",
          code: "SCS-C02",
          title: "Security – Specialty",
          titleJa: "セキュリティ 専門知識",
          level: "Specialty",
          status: "coming-soon",
          questionCount: 0,
          passLine: 75,
          timeLimitMin: 170,
          dataFile: "",
          description: "IAM・KMS・インシデント対応などセキュリティ特化の専門資格。"
        },
        {
          id: "aws-mls-c01",
          code: "MLS-C01",
          title: "Machine Learning – Specialty",
          titleJa: "機械学習 専門知識",
          level: "Specialty",
          status: "coming-soon",
          questionCount: 0,
          passLine: 75,
          timeLimitMin: 180,
          dataFile: "",
          description: "データ前処理からモデリング・運用までML全工程の専門資格。"
        }
      ]
    },
    {
      id: "gcp",
      short: "GCP",
      name: "Google Cloud",
      tagline: "データ基盤・ML領域に強み。エンジニアからの人気が急上昇中。",
      exams: [
        // ---- Foundational ----
        {
          id: "gcp-cdl",
          code: "CDL",
          title: "Cloud Digital Leader",
          titleJa: "クラウドデジタルリーダー",
          level: "Foundational",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 90,
          dataFile: "js/data/exams/gcp-cdl.js",
          description: "ビジネス視点でGoogle Cloudの価値を理解する入門資格。"
        },
        {
          id: "gcp-gail",
          code: "GenAI Leader",
          title: "Generative AI Leader",
          titleJa: "生成AIリーダー",
          level: "Foundational",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 90,
          dataFile: "",
          description: "Gemini・Vertex AIなどGoogleの生成AI活用を問う新資格。"
        },
        // ---- Associate ----
        {
          id: "gcp-ace",
          code: "ACE",
          title: "Associate Cloud Engineer",
          titleJa: "アソシエイト クラウドエンジニア",
          level: "Associate",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "js/data/exams/gcp-ace.js",
          description: "GCEからGKE・IAMまで、Google Cloud運用の基本を網羅。"
        },
        {
          id: "gcp-adp",
          code: "ADP",
          title: "Associate Data Practitioner",
          titleJa: "アソシエイト データプラクティショナー",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "BigQueryを中心としたデータ活用の基礎を問うアソシエイト資格。"
        },
        // ---- Professional ----
        {
          id: "gcp-pca",
          code: "PCA",
          title: "Professional Cloud Architect",
          titleJa: "プロフェッショナル クラウドアーキテクト",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "ケーススタディを元にしたアーキテクチャ設計の最上位資格。"
        },
        {
          id: "gcp-pde",
          code: "PDE",
          title: "Professional Data Engineer",
          titleJa: "プロフェッショナル データエンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "BigQuery・Dataflowなどデータ基盤設計のプロフェッショナル資格。"
        },
        {
          id: "gcp-pcd",
          code: "PCD",
          title: "Professional Cloud Developer",
          titleJa: "プロフェッショナル クラウドデベロッパー",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "クラウドネイティブなアプリ開発・デプロイの専門資格。"
        },
        {
          id: "gcp-pdo",
          code: "PCDOE",
          title: "Professional Cloud DevOps Engineer",
          titleJa: "プロフェッショナル クラウドDevOpsエンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "SRE・CI/CD・モニタリングなど信頼性運用の専門資格。"
        },
        {
          id: "gcp-pcse",
          code: "PCSE",
          title: "Professional Cloud Security Engineer",
          titleJa: "プロフェッショナル クラウドセキュリティエンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "IAM・VPC-SC・データ保護などセキュリティ設計の専門資格。"
        },
        {
          id: "gcp-pcne",
          code: "PCNE",
          title: "Professional Cloud Network Engineer",
          titleJa: "プロフェッショナル クラウドネットワークエンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "VPC・ハイブリッド接続・負荷分散などネットワーク特化資格。"
        },
        {
          id: "gcp-pmle",
          code: "PMLE",
          title: "Professional Machine Learning Engineer",
          titleJa: "プロフェッショナル 機械学習エンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "Vertex AIを中心としたMLシステム設計・運用の専門資格。"
        },
        {
          id: "gcp-pcdbe",
          code: "PCDBE",
          title: "Professional Cloud Database Engineer",
          titleJa: "プロフェッショナル クラウドデータベースエンジニア",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "Cloud SQL・Spanner等のDB設計・移行・運用の専門資格。"
        },
        {
          id: "gcp-pgwa",
          code: "PGWA",
          title: "Professional Google Workspace Administrator",
          titleJa: "プロフェッショナル Google Workspace管理者",
          level: "Professional",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "Workspaceの管理・セキュリティ・運用を問う管理者資格。"
        }
      ]
    },
    {
      id: "azure",
      short: "Azure",
      name: "Microsoft Azure",
      tagline: "エンタープライズ導入実績が豊富。SIer・大企業案件に強い。",
      exams: [
        // ---- Fundamentals ----
        {
          id: "azure-az900",
          code: "AZ-900",
          title: "Azure Fundamentals",
          titleJa: "Azure 基礎",
          level: "Foundational",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 45,
          dataFile: "js/data/exams/azure-az900.js",
          description: "クラウドの概念とAzureの主要サービスを学ぶ最初の一歩。"
        },
        {
          id: "azure-ai900",
          code: "AI-900",
          title: "Azure AI Fundamentals",
          titleJa: "Azure AI 基礎",
          level: "Foundational",
          status: "available",
          questionCount: 150,
          passLine: 70,
          timeLimitMin: 45,
          dataFile: "js/data/exams/azure-ai900.js",
          description: "AI・MLの基本概念とAzure AIサービスの入門資格。"
        },
        {
          id: "azure-dp900",
          code: "DP-900",
          title: "Azure Data Fundamentals",
          titleJa: "Azure データ基礎",
          level: "Foundational",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 45,
          dataFile: "",
          description: "リレーショナル/非リレーショナルデータと分析の基礎資格。"
        },
        {
          id: "azure-sc900",
          code: "SC-900",
          title: "Security, Compliance, and Identity Fundamentals",
          titleJa: "セキュリティ・コンプライアンス・ID 基礎",
          level: "Foundational",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 45,
          dataFile: "",
          description: "Microsoftのセキュリティ・ID管理ソリューションの入門資格。"
        },
        // ---- Associate ----
        {
          id: "azure-az104",
          code: "AZ-104",
          title: "Azure Administrator Associate",
          titleJa: "Azure 管理者 アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "VNet・ストレージ・Entra IDなどAzure運用管理の中核資格。"
        },
        {
          id: "azure-az204",
          code: "AZ-204",
          title: "Azure Developer Associate",
          titleJa: "Azure 開発者 アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "App Service・Functions・Cosmos DBなどAzure開発の中核資格。"
        },
        {
          id: "azure-az500",
          code: "AZ-500",
          title: "Azure Security Engineer Associate",
          titleJa: "Azure セキュリティエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "ID保護・ネットワークセキュリティ・Key Vault等の専門資格。"
        },
        {
          id: "azure-az700",
          code: "AZ-700",
          title: "Azure Network Engineer Associate",
          titleJa: "Azure ネットワークエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "VNet設計・ExpressRoute・負荷分散などネットワーク特化資格。"
        },
        {
          id: "azure-az140",
          code: "AZ-140",
          title: "Azure Virtual Desktop Specialty",
          titleJa: "Azure Virtual Desktop スペシャリティ",
          level: "Specialty",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "仮想デスクトップ基盤の設計・運用を問う専門資格。"
        },
        {
          id: "azure-az800",
          code: "AZ-800/801",
          title: "Windows Server Hybrid Administrator Associate",
          titleJa: "Windows Server ハイブリッド管理者 アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "オンプレ×Azureのハイブリッド環境管理（2試験で認定）。"
        },
        {
          id: "azure-ai102",
          code: "AI-102",
          title: "Azure AI Engineer Associate",
          titleJa: "Azure AIエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Azure OpenAI・Cognitive ServicesによるAIソリューション実装。"
        },
        {
          id: "azure-dp100",
          code: "DP-100",
          title: "Azure Data Scientist Associate",
          titleJa: "Azure データサイエンティスト アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Azure Machine LearningによるMLモデルの構築・運用資格。"
        },
        {
          id: "azure-dp300",
          code: "DP-300",
          title: "Azure Database Administrator Associate",
          titleJa: "Azure データベース管理者 アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "SQL Server / Azure SQLの管理・最適化・HA設計の専門資格。"
        },
        {
          id: "azure-dp600",
          code: "DP-600",
          title: "Fabric Analytics Engineer Associate",
          titleJa: "Fabric アナリティクスエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Microsoft Fabricによる分析基盤構築を問う注目資格。"
        },
        {
          id: "azure-dp700",
          code: "DP-700",
          title: "Fabric Data Engineer Associate",
          titleJa: "Fabric データエンジニア アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Fabricでのデータ取込・変換・管理を問うデータエンジニア資格。"
        },
        {
          id: "azure-sc200",
          code: "SC-200",
          title: "Security Operations Analyst Associate",
          titleJa: "セキュリティオペレーションアナリスト アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Sentinel・Defenderによる脅威検知と対応のSOC向け資格。"
        },
        {
          id: "azure-sc300",
          code: "SC-300",
          title: "Identity and Access Administrator Associate",
          titleJa: "ID・アクセス管理者 アソシエイト",
          level: "Associate",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 100,
          dataFile: "",
          description: "Entra IDによるID管理・認証・ガバナンスの専門資格。"
        },
        // ---- Expert ----
        {
          id: "azure-az305",
          code: "AZ-305",
          title: "Azure Solutions Architect Expert",
          titleJa: "Azure ソリューションアーキテクト エキスパート",
          level: "Expert",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "ガバナンス・データ・インフラを横断する設計力を問うエキスパート資格。"
        },
        {
          id: "azure-az400",
          code: "AZ-400",
          title: "DevOps Engineer Expert",
          titleJa: "DevOpsエンジニア エキスパート",
          level: "Expert",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "Azure DevOps・GitHubによるCI/CDと開発プロセス設計の上位資格。"
        },
        {
          id: "azure-sc100",
          code: "SC-100",
          title: "Cybersecurity Architect Expert",
          titleJa: "サイバーセキュリティアーキテクト エキスパート",
          level: "Expert",
          status: "coming-soon",
          questionCount: 0,
          passLine: 70,
          timeLimitMin: 120,
          dataFile: "",
          description: "ゼロトラスト戦略を含むセキュリティ全体設計の最上位資格。"
        }
      ]
    }
  ]
};
