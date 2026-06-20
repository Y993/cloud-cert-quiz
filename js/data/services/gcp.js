window.CERT_SERVICES = window.CERT_SERVICES || {};

window.CERT_SERVICES["compute-engine"] = {
  slug: "compute-engine",
  name: "Compute Engine",
  provider: "gcp",
  category: "コンピューティング",
  aliases: ["Compute Engine", "マネージド インスタンス グループ", "MIG"],
  officialUrl: "https://cloud.google.com/compute/docs?hl=ja",
  summary: [
    "Google Cloud の IaaS 型 VM サービス。カスタム CPU・メモリ構成のマシンタイプや、プリエンプティブル VM・スポット VM による低コスト運用が可能。",
    "マネージド インスタンス グループ（MIG）を使うと、同一テンプレートから複数 VM を自動デプロイ・自動修復・オートスケーリングできる。ゾーン MIG とリージョン MIG で可用性の粒度が異なる。",
    "ライブマイグレーションにより、ホストのメンテナンス中も VM を停止させずに稼働させ続けられる点が他クラウドとの差別化要素の一つ。"
  ],
  examPoints: [
    "CDL/ACE ではスポット VM とプリエンプティブル VM の違い（スポットは最大実行時間制限なし）、カスタムマシンタイプのユースケース、MIG によるオートスケーリング設定が頻出。",
    "ゾーン MIG とリージョン MIG の選択基準（単一ゾーン障害への耐性が必要かどうか）、ヘルスチェックと自動修復の組み合わせも問われやすい。引っかけとして、Preemptible VM は 24 時間以内に強制終了されるという制限を忘れないこと。"
  ]
};

window.CERT_SERVICES["cloud-run"] = {
  slug: "cloud-run",
  name: "Cloud Run",
  provider: "gcp",
  category: "コンピューティング",
  aliases: ["Cloud Run"],
  officialUrl: "https://cloud.google.com/run/docs?hl=ja",
  summary: [
    "コンテナイメージをデプロイするだけで HTTP リクエスト・イベントを処理できるフルマネージドのサービス実行基盤。インフラ管理は不要でリクエスト数に応じてゼロへスケールダウンする。",
    "Cloud Run サービスと Cloud Run ジョブの 2 モードがある。サービスはリクエスト駆動の常時稼働、ジョブはバッチ処理向けの一回限り実行。",
    "VPC への接続には Serverless VPC Access コネクタを使い、プライベートなバックエンドや Cloud SQL へアクセスできる。リクエスト単位の課金で、アイドル時はコストゼロになる。"
  ],
  examPoints: [
    "Cloud Run vs Cloud Functions vs GKE の選択基準が頻出。カスタムコンテナが必要なら Cloud Run、単純なイベント処理関数なら Cloud Functions、長期稼働やクラスタ管理が必要なら GKE という基本軸を押さえる。",
    "ACE では最小インスタンス数設定によるコールドスタート回避と、コンカレンシー設定（1 コンテナが同時処理できるリクエスト数）がよく問われる。Knative ベースのため既存知識は流用できる。"
  ]
};

window.CERT_SERVICES["cloud-functions"] = {
  slug: "cloud-functions",
  name: "Cloud Functions",
  provider: "gcp",
  category: "コンピューティング",
  aliases: ["Cloud Functions", "Cloud Run functions"],
  officialUrl: "https://cloud.google.com/functions/docs?hl=ja",
  summary: [
    "関数単位でコードをデプロイするサーバーレス実行環境。Pub/Sub・Cloud Storage・HTTP トリガーなど多様なイベントソースに対応し、Node.js・Python・Go など主要ランタイムをサポートする。",
    "第 2 世代（Gen 2）は内部的に Cloud Run を基盤とし、長い実行時間（最大 60 分）・大きな同時実行数・複数のトリガーを 1 関数に設定できる。コンソールでは「Cloud Run functions」と表示される名称に変更されている。",
    "コードと依存パッケージのみ管理すればよく、サーバーのプロビジョニングやスケーリングは完全に自動。実行時間とリクエスト数に基づく従量課金。"
  ],
  examPoints: [
    "Cloud Functions は軽量イベント処理向け。コンテナ化が不要でコード量が少ない場合に選ぶ。Cloud Run はカスタムランタイム・長時間処理・複雑な依存関係がある場合に選ぶ。この使い分けは CDL・ACE 両方で頻出。",
    "Gen 1 と Gen 2 の違い（タイムアウト上限・同時実行・Pub/Sub push 設定）は ACE 向け。引っかけとして、Gen 2 は Cloud Run として動作するが Cloud Functions の API・デプロイ方法を使い続けられる点に注意。"
  ]
};

window.CERT_SERVICES["app-engine"] = {
  slug: "app-engine",
  name: "App Engine",
  provider: "gcp",
  category: "コンピューティング",
  aliases: ["App Engine"],
  officialUrl: "https://cloud.google.com/appengine/docs?hl=ja",
  summary: [
    "Google 最初の PaaS。コードをデプロイするだけで HTTP アプリを稼働できる。スタンダード環境とフレキシブル環境の 2 種類があり、スタンダードはサンドボックス上の高速スケーリング、フレキシブルは Docker コンテナで任意ランタイムを使える。",
    "プロジェクト内に 1 つしか作れない（App Engine アプリ）ため、複数の独立サービスは「サービス」（旧称: モジュール）として同一 App Engine 内に共存させる設計になる。",
    "トラフィック分割機能でバージョン間の A/B テストやカナリアリリースが可能。Cloud Tasks や Cloud Scheduler との統合も公式サポートされている。"
  ],
  examPoints: [
    "CDL では「コードだけデプロイしたい・インフラ不要」のシナリオで App Engine が選択肢に入る。ただし Cloud Run との差別化ポイントは、App Engine がプロジェクト単位の PaaS であり長年の実績ある統合サービス群を持つ点。",
    "ACE では スタンダード vs フレキシブルの選択（スタンダードは特定ランタイムのみ・ゼロインスタンスまでスケール、フレキシブルは常時 1 インスタンス以上）とトラフィック分割の設定手順が問われやすい。"
  ]
};

window.CERT_SERVICES["gke"] = {
  slug: "gke",
  name: "Google Kubernetes Engine（GKE）",
  provider: "gcp",
  category: "コンテナ",
  aliases: ["Google Kubernetes Engine", "GKE", "Autopilot"],
  officialUrl: "https://cloud.google.com/kubernetes-engine/docs?hl=ja",
  summary: [
    "Kubernetes クラスタをマネージドで提供するサービス。ノードの OS アップグレード・セキュリティパッチ・ヘルスチェックを自動化し、マルチゾーン・リージョンクラスタによる高可用性構成も標準サポート。",
    "モードは Standard と Autopilot の 2 種類。Standard はノードの設定を細かく制御でき、Autopilot は Pod スペックだけ指定すれば Google がノードを自動管理しリソース単位で課金する。",
    "Google Cloud サービス（Cloud Load Balancing・Artifact Registry・Cloud Monitoring など）と深く統合されており、Workload Identity を使うと Pod から GCP サービスへ安全にアクセスできる。"
  ],
  examPoints: [
    "Cloud Run・Cloud Functions・GKE の三択では、マイクロサービスを長期稼働させる・複雑なオーケストレーションが必要・Kubernetes のポータビリティが欲しいなら GKE を選ぶ。",
    "ACE では Autopilot vs Standard の違い（ノード管理の有無・コスト粒度）、Cluster Autoscaler と HPA（Horizontal Pod Autoscaler）の役割分担、Node Pool の使い分けが頻出。引っかけとして、Autopilot は特権コンテナを必要とする DaemonSet を実行できず、通常の DaemonSet も制約が多い（Standard では制限なく使える）という点に注意。"
  ]
};

window.CERT_SERVICES["artifact-registry"] = {
  slug: "artifact-registry",
  name: "Artifact Registry",
  provider: "gcp",
  category: "開発者ツール",
  aliases: ["Artifact Registry"],
  officialUrl: "https://cloud.google.com/artifact-registry/docs?hl=ja",
  summary: [
    "Docker コンテナイメージだけでなく Maven・npm・PyPI・Helm チャートなど多様なアーティファクト形式を一元管理するリポジトリサービス。Container Registry の後継として推奨される。",
    "リポジトリはリージョン単位で作成し、IAM ポリシーでアクセス制御する。VPC Service Controls と組み合わせればプライベートネットワーク境界内に限定できる。",
    "脆弱性スキャン（Container Analysis）を有効化すると、プッシュされたコンテナイメージの CVE を自動検出してアラートを出せる。"
  ],
  examPoints: [
    "ACE では Container Registry（gcr.io）との違いと、Artifact Registry への移行推奨が問われる。Artifact Registry は複数形式対応・リポジトリごとの IAM・リージョン選択の自由度が利点。",
    "Cloud Build との連携（ビルド後にイメージをプッシュ）や Binary Authorization（信頼済みイメージのみデプロイ許可）との組み合わせも出題されやすい。"
  ]
};

window.CERT_SERVICES["cloud-build"] = {
  slug: "cloud-build",
  name: "Cloud Build",
  provider: "gcp",
  category: "開発者ツール",
  aliases: ["Cloud Build"],
  officialUrl: "https://cloud.google.com/build/docs?hl=ja",
  summary: [
    "Google Cloud 上でコードのビルド・テスト・デプロイを自動化するマネージド CI/CD サービス。ビルド手順を cloudbuild.yaml に定義し、各ステップを Docker コンテナとして実行する。",
    "Cloud Source Repositories・GitHub・Bitbucket などと連携してトリガーを設定でき、プッシュやプルリクエストに応じて自動ビルドを開始できる。ビルドログは Cloud Logging に自動保存される。",
    "ワーカープールをプライベート VPC 内に配置することで、インターネット非公開のリソースへアクセスするビルドも実行できる。"
  ],
  examPoints: [
    "ACE では cloudbuild.yaml のステップ定義と、Cloud Run・GKE・App Engine へのデプロイ自動化パターンが問われる。各ステップが独立したコンテナで動く点（ステップ間の成果物受け渡しには /workspace を使う）を押さえる。",
    "引っかけとして、Cloud Build はサーバーレスのビルド基盤でありビルド時間課金のため、常時稼働の CI サーバーより安価になるケースが多い。ただし、長時間ビルドにはタイムアウト設定が必要。"
  ]
};

window.CERT_SERVICES["cloud-storage"] = {
  slug: "cloud-storage",
  name: "Cloud Storage",
  provider: "gcp",
  category: "ストレージ",
  aliases: ["Cloud Storage", "Nearline", "Coldline"],
  officialUrl: "https://cloud.google.com/storage/docs?hl=ja",
  summary: [
    "無制限スケールのオブジェクトストレージ。Standard・Nearline（30 日以上保存）・Coldline（90 日以上）・Archive（365 日以上）の 4 ストレージクラスで、アクセス頻度に応じたコスト最適化ができる。",
    "バケットはグローバルに一意の名前を持ち、リージョン・デュアルリージョン・マルチリージョンの配置を選択できる。Object Lifecycle Management でクラス自動移行や自動削除のルールを設定できる。",
    "Signed URL を使えば認証なしで一時的なアクセスを許可でき、静的ウェブサイトのホスティングにも使える。Cloud CDN との統合でエッジキャッシュも構成可能。"
  ],
  examPoints: [
    "CDL/ACE 共通で最重要のストレージトピック。ストレージクラスの選択基準（アクセス頻度・最低保存期間・取得コスト）は確実に押さえる。Nearline は月 1 回程度、Coldline は年 1〜2 回、Archive はほぼアクセスしないデータが目安。",
    "引っかけとして、ストレージクラスを変更してもバケット名・オブジェクト名は変わらない点、またマルチリージョン間のデータ転送コストに注意。Uniform bucket-level access と ACL の違いも出題される。"
  ]
};

window.CERT_SERVICES["persistent-disk"] = {
  slug: "persistent-disk",
  name: "Persistent Disk",
  provider: "gcp",
  category: "ストレージ",
  aliases: ["Persistent Disk", "永続ディスク"],
  officialUrl: "https://cloud.google.com/compute/docs/disks/persistent-disks?hl=ja",
  summary: [
    "Compute Engine VM にアタッチするネットワーク型ブロックストレージ。Standard HDD・Balanced SSD・SSD PD・Hyperdisk Extreme など用途別に複数タイプがある。",
    "単一ゾーンに限定されるゾーナルディスクと、2 つのゾーン間でデータを同期レプリケーションするリージョナルディスクがある。リージョナルは VM フェイルオーバー時のデータ保護に有効。",
    "スナップショットにより増分バックアップが可能。スナップショットはマルチリージョンに保存でき、別リージョンで新しいディスクを復元するのにも使える。"
  ],
  examPoints: [
    "ACE では PD タイプのパフォーマンス特性（IOPS・スループットがディスクサイズと vCPU 数で決まる）とユースケース（Standard は低コスト大容量、SSD は高 IOPS が必要なデータベース）が頻出。",
    "引っかけとして、ゾーナル PD は同一ゾーン内の VM にしかアタッチできない（リージョン PD は例外として 2 ゾーン間で共有）。また読み取り専用モードで複数 VM に同時アタッチは可能だが、読み書きでの複数アタッチは不可。"
  ]
};

window.CERT_SERVICES["cloud-sql"] = {
  slug: "cloud-sql",
  name: "Cloud SQL",
  provider: "gcp",
  category: "データベース",
  aliases: ["Cloud SQL"],
  officialUrl: "https://cloud.google.com/sql/docs?hl=ja",
  summary: [
    "MySQL・PostgreSQL・SQL Server のマネージドリレーショナルデータベースサービス。パッチ・バックアップ・フェイルオーバー・レプリケーションを自動管理し、単一リージョンに閉じた RDBMS ワークロードに適する。",
    "High Availability 構成を選ぶと、同一リージョン内の別ゾーンにスタンバイインスタンスが用意され、プライマリ障害時に自動フェイルオーバーする（RPO ほぼゼロ・RTO 約 60 秒）。",
    "読み取りレプリカを複数リージョンに配置してクロスリージョン読み取り分散もできる。接続は Cloud SQL Auth Proxy が推奨で、IAM 認証と組み合わせると認証情報の管理が不要になる。"
  ],
  examPoints: [
    "CDL/ACE では Cloud SQL vs Cloud Spanner の使い分けが最重要。Cloud SQL は単一リージョン・既存 MySQL/PostgreSQL ワークロードの移行向け。グローバルスケール・水平書き込みが必要なら Spanner を選ぶ。",
    "ACE では Cloud SQL Auth Proxy の役割（SSL 暗号化・IAM 認証の自動ハンドリング）、リードレプリカとフェイルオーバーレプリカの違い（フェイルオーバーレプリカは HA 構成のスタンバイで昇格可能）がよく問われる。"
  ]
};

window.CERT_SERVICES["cloud-spanner"] = {
  slug: "cloud-spanner",
  name: "Cloud Spanner",
  provider: "gcp",
  category: "データベース",
  aliases: ["Cloud Spanner", "Spanner"],
  officialUrl: "https://cloud.google.com/spanner/docs?hl=ja",
  summary: [
    "グローバル分散型のフルマネージドリレーショナルデータベース。強整合性トランザクションと SQL を維持しながら、水平スケールアウトと 99.999%（リージョン構成 99.99%）の SLA を同時に実現する。",
    "TrueTime API による外部整合性でグローバルに一貫したトランザクションを提供し、従来の NoSQL 的なトレードオフ（結果整合性）を不要にする。",
    "インスタンスは処理ノード数（コンピューティングキャパシティ）で課金。マルチリージョン構成では複数地域へ自動レプリケーションされ、地域障害に耐えられる。"
  ],
  examPoints: [
    "Cloud SQL との比較は必須。Spanner を選ぶ基準は「水平書き込みスケール」「グローバル整合性」「99.999% SLA」のいずれかが必要なケース。コストは Cloud SQL より高い。",
    "ACE 向けには、Spanner のインターリーブテーブル（親子関係テーブルを同一ノードに配置する最適化）と、プライマリキー設計（ホットスポット回避のためにシーケンシャルキーを避ける）が引っかけになりやすい。"
  ]
};

window.CERT_SERVICES["firestore"] = {
  slug: "firestore",
  name: "Firestore",
  provider: "gcp",
  category: "データベース",
  aliases: ["Firestore"],
  officialUrl: "https://cloud.google.com/firestore/docs?hl=ja",
  summary: [
    "ドキュメント指向のフルマネージド NoSQL データベース。ネイティブモード（新世代・リアルタイムリスナー対応）と Datastore モード（旧 Cloud Datastore との互換）の 2 モードが存在する。",
    "コレクション→ドキュメント→サブコレクションの階層構造でデータを管理。クライアント SDK（iOS・Android・Web）からダイレクト接続でき、オフライン同期機能を持つためモバイルアプリのバックエンドに広く使われる。",
    "ACID トランザクション・複合クエリ・自動スケールをサポート。ドキュメント数・読み書き回数・転送量による従量課金。"
  ],
  examPoints: [
    "CDL では「スキーマレスな柔軟なデータ構造」「モバイル・Webアプリのリアルタイムデータ同期」のシナリオで Firestore が正解になる。Bigtable との違いは、Firestore が ACID トランザクションと豊富なクエリを備えることでスケールは Bigtable より小さい点。",
    "ACE では ネイティブモード vs Datastore モードの選択（ネイティブのみリアルタイムリスナーと Mobile SDK が使える）と、Firestore のインデックス設計（デフォルト自動インデックスと複合インデックスの違い）が問われやすい。"
  ]
};

window.CERT_SERVICES["bigtable"] = {
  slug: "bigtable",
  name: "Bigtable",
  provider: "gcp",
  category: "データベース",
  aliases: ["Bigtable"],
  officialUrl: "https://cloud.google.com/bigtable/docs?hl=ja",
  summary: [
    "Google 内部で検索インデックスや Gmail などに使われてきた大規模ワイドカラム NoSQL データベース。ペタバイト級・超低レイテンシ（読み取り数 ms）・毎秒数百万 QPS のワークロード向け。",
    "行キーによる単一次元のソートアクセスが基本で、複合クエリはサポートしない。時系列データ・IoT ストリーム・広告ターゲティングなど、時間順・行キー順で大量に書き込むパターンに最適。",
    "HBase API と互換性があり、既存 HBase ワークロードを比較的容易に移行できる。クラスタノード数の変更はオンラインで実施でき、ダウンタイムなしにスケールアップ・ダウンが可能。"
  ],
  examPoints: [
    "Firestore・BigQuery・Cloud SQL との使い分けが頻出。Bigtable は「大量書き込み・超低レイテンシ・時系列 or IoT」のキーワードで選ぶ。ACID トランザクションや SQL クエリが不要な点が前提。",
    "引っかけとして、Bigtable の行キー設計がホットスポットを生む（例: タイムスタンプをそのまま行キー先頭に使うと直近の書き込みが 1 ノードに集中）。行キーにハッシュプレフィックスを付けることでデータを均一分散させるパターンが ACE で問われやすい。"
  ]
};

window.CERT_SERVICES["bigquery"] = {
  slug: "bigquery",
  name: "BigQuery",
  provider: "gcp",
  category: "分析",
  aliases: ["BigQuery"],
  officialUrl: "https://cloud.google.com/bigquery/docs?hl=ja",
  summary: [
    "サーバーレスのフルマネージドデータウェアハウス。標準 SQL でペタバイト規模のデータを数秒でスキャンでき、インフラ管理やインデックス設計が不要。列指向ストレージにより集計クエリが高速。",
    "オンデマンド（スキャンデータ量課金）とフラットレート（スロット予約）の 2 種類の料金体系がある。BigQuery ML を使うと SQL だけで機械学習モデルを作成・予測できる。",
    "外部テーブル（BigQuery Omni・Biglake）でデータを Cloud Storage に置いたままクエリを実行でき、データ移動なしの分析が可能。Looker Studio との統合で可視化も容易。"
  ],
  examPoints: [
    "CDL では DWH 構築・BI 連携のシナリオで必ず BigQuery が答えになる。バッチ分析向けであり、OLTP（高頻度の行単位更新）には向かないという点を常に意識する。",
    "ACE では パーティションテーブル（日付や整数列でデータを分割しスキャン量を削減）とクラスタリング（特定列でデータを物理ソートし絞り込みを高速化）の違い、オンデマンド vs 予約スロットのコスト設計が頻出。引っかけとして、BigQuery はクエリ実行時にのみスロットを消費し、ストレージと演算は別課金。"
  ]
};

window.CERT_SERVICES["dataflow"] = {
  slug: "dataflow",
  name: "Dataflow",
  provider: "gcp",
  category: "分析",
  aliases: ["Dataflow"],
  officialUrl: "https://cloud.google.com/dataflow/docs?hl=ja",
  summary: [
    "Apache Beam を実行エンジンとするフルマネージドのストリーミング・バッチデータ処理サービス。同一コード（Beam パイプライン）でバッチとストリームを処理できるのが特徴で、サーバー管理は不要。",
    "Pub/Sub からのリアルタイムデータ取り込み・変換・BigQuery への書き出しというパターンが典型的な使い方。ウィンドウ関数とトリガーで遅延データや順序不同イベントを柔軟に処理できる。",
    "ワーカー数のオートスケーリングと Dynamic Work Rebalancing で効率的なリソース利用が可能。Flex テンプレートを使うとパイプラインをコンテナ化して再利用・配布できる。"
  ],
  examPoints: [
    "Dataflow vs Dataproc の選択は頻出。Dataflow はサーバーレス・Apache Beam 専用・ストリームとバッチ統合。Dataproc は Spark/Hadoop エコシステムの既存ジョブ移行や Spark ML が必要なケース向け。",
    "CDL では「リアルタイムストリーミング ETL」のシナリオで Dataflow＋Pub/Sub の組み合わせが定番。ACE では Beam の PCollection・PTransform の概念と、ウィンドウ（タンブリング・スライディング・セッション）の選択基準が問われる。"
  ]
};

window.CERT_SERVICES["dataproc"] = {
  slug: "dataproc",
  name: "Dataproc",
  provider: "gcp",
  category: "分析",
  aliases: ["Dataproc"],
  officialUrl: "https://cloud.google.com/dataproc/docs?hl=ja",
  summary: [
    "Apache Spark・Hadoop・Hive・Flink などを動かすマネージドクラスタサービス。クラスタをオンデマンドで起動してジョブを実行し終了後に削除するエフェメラルクラスタパターンが低コスト運用の基本。",
    "既存の Spark/Hadoop ジョブをほぼそのまま移行でき、オンプレミスからクラウドへのリフトアンドシフトに向く。Cloud Storage を HDFS 互換のストレージとして使うことでクラスタ終了後もデータを保持できる。",
    "Dataproc Serverless では Spark ジョブをクラスタ管理なしに実行でき、ワーカーのプロビジョニングを意識せずに済む。"
  ],
  examPoints: [
    "Dataflow との使い分けは必須理解。Dataproc は「既存 Spark ジョブの移行」「Spark ML の活用」「Hadoop エコシステムの維持」が選択基準。新規にパイプラインを設計するならサーバーレスの Dataflow が推奨。",
    "ACE では Preemptible VM をワーカーノードに使ってコストを削減するパターンと、クラスタをジョブ単位に起動・終了するエフェメラル運用、Custom Image を使った初期化スクリプト不要の高速起動が問われやすい。"
  ]
};

window.CERT_SERVICES["pubsub"] = {
  slug: "pubsub",
  name: "Pub/Sub",
  provider: "gcp",
  category: "アプリケーション統合",
  aliases: ["Pub/Sub"],
  officialUrl: "https://cloud.google.com/pubsub/docs?hl=ja",
  summary: [
    "グローバルスケールの非同期メッセージングサービス。Publisher がトピックにメッセージを送り、Subscriber がサブスクリプション経由で受け取るパブリッシュ・サブスクライブモデル。",
    "プッシュ型（Pub/Sub から HTTP エンドポイントへ配信）とプル型（Subscriber 側がポーリング）の 2 種類のサブスクリプションがある。少なくとも 1 回の配信（at-least-once）が保証され、順序保証は順序付きキーを使って有効化できる。",
    "Dataflow・Cloud Functions・Cloud Run との組み合わせでイベント駆動アーキテクチャの中核を担う。メッセージ保持期間は最大 7 日で、Lite 版はより低コストなゾーナル配信オプション。"
  ],
  examPoints: [
    "CDL/ACE で「マイクロサービス間の疎結合」「ストリーミングデータの取り込みバッファ」のシナリオでは Pub/Sub が鉄板の選択肢。キューイング（単一コンシューマ）ではなくファンアウト（複数サブスクライバ）ができる点を押さえる。",
    "引っかけとして at-least-once 配信のため重複受信が起こりうる（冪等な処理設計が必要）。Cloud Tasks との違いも頻出で、Cloud Tasks はタスクのスケジューリング・再試行制御が細かくできる一方、Pub/Sub はファンアウト・高スループット向けと覚える。"
  ]
};

window.CERT_SERVICES["gcp-iam"] = {
  slug: "gcp-iam",
  name: "Cloud IAM",
  provider: "gcp",
  category: "セキュリティ",
  aliases: ["Cloud IAM", "IAM"],
  officialUrl: "https://cloud.google.com/iam/docs?hl=ja",
  summary: [
    "Google Cloud リソースへのアクセス制御を管理するサービス。「誰が（プリンシパル）」「何を（ロール）」「どのリソースに対して」できるかを定義するポリシーベースの認可システム。",
    "ロールには基本ロール（Owner・Editor・Viewer）・事前定義ロール・カスタムロールの 3 種類があり、最小権限の原則に従い事前定義ロールかカスタムロールを使うことが推奨される。",
    "プリンシパルには Google アカウント・グループ・サービスアカウント・ドメインなどがある。サービスアカウントは VM や Cloud Run などのワークロードがリソースにアクセスする際の ID として機能する。"
  ],
  examPoints: [
    "CDL/ACE 最重要トピックの一つ。最小権限の原則の適用（Owner ロールを業務ユーザーに付与しない）、サービスアカウントキーの代わりに Workload Identity や Application Default Credentials を使う設計が問われる。",
    "ACE では ポリシーの継承（組織→フォルダ→プロジェクト→リソース）と deny ポリシー（拒否が優先する）の仕組み、サービスアカウントの権限借用（Impersonation）と直接鍵ファイルの使用リスクの違いが引っかけになりやすい。"
  ]
};

window.CERT_SERVICES["cloud-kms"] = {
  slug: "cloud-kms",
  name: "Cloud KMS",
  provider: "gcp",
  category: "セキュリティ",
  aliases: ["Cloud KMS"],
  officialUrl: "https://cloud.google.com/kms/docs?hl=ja",
  summary: [
    "暗号鍵の生成・保管・ローテーション・廃棄を一元管理するクラウド鍵管理サービス。AES-256・RSA・楕円曲線など主要な鍵タイプをサポートし、FIPS 140-2 Level 3 準拠の HSM バックエンド（Cloud HSM）も選択できる。",
    "鍵リングと鍵バージョンの階層でライフサイクルを管理。鍵を直接エクスポートする操作はできず、暗号化・復号操作は KMS API 経由で行う（エンベロープ暗号化パターン）。",
    "顧客管理暗号鍵（CMEK）として BigQuery・Cloud Storage・Compute Engine などのサービスと統合し、Google のデフォルト暗号化から独自の鍵管理へ切り替えられる。"
  ],
  examPoints: [
    "CMEK・CSEK（顧客提供暗号鍵）・Google 管理暗号鍵の 3 種類の違いを整理する。CMEK は KMS に鍵を保管して自分で管理、CSEK は鍵をリクエスト時に毎回提供（KMS 不要）、Google 管理は最も手軽だが制御不可。",
    "ACE では鍵ローテーションの自動化設定と、ローテーション後に古い鍵バージョンで暗号化されたデータの再暗号化は自動では行われない（明示的な再暗号化が必要）点が引っかけになる。"
  ]
};

window.CERT_SERVICES["secret-manager"] = {
  slug: "secret-manager",
  name: "Secret Manager",
  provider: "gcp",
  category: "セキュリティ",
  aliases: ["Secret Manager"],
  officialUrl: "https://cloud.google.com/secret-manager/docs?hl=ja",
  summary: [
    "API キー・パスワード・証明書などの機密情報をバージョン管理しながら安全に保管するサービス。アプリケーションコードや環境変数にシークレットをハードコードせず、実行時に API で取得できる。",
    "シークレットにはバージョンが付き、新しいバージョンを追加しても古いバージョンにアクセスでき、ロールバックが容易。IAM で誰がどのシークレットを読めるか細かく制御できる。",
    "Cloud Run・Cloud Functions・GKE などから直接マウント（ボリュームやマウント）またはランタイムで取得するパターンが一般的。Pub/Sub 通知でシークレット変更イベントをトリガーにもできる。"
  ],
  examPoints: [
    "Cloud KMS との違いを明確にする。Secret Manager はシークレット（値そのもの）を保管するサービスで、Cloud KMS は暗号鍵を管理するサービス。両者は組み合わせて使う（Secret Manager のシークレットを CMEK で暗号化するなど）。",
    "ACE では環境変数でシークレットを渡す設計の問題点（ログに漏れる・プロセスから参照可能）と、Secret Manager を使うメリット（バージョン管理・アクセスログ・自動ローテーション）が問われる。"
  ]
};

window.CERT_SERVICES["gcp-vpc"] = {
  slug: "gcp-vpc",
  name: "VPC ネットワーク",
  provider: "gcp",
  category: "ネットワーキング",
  aliases: ["VPC ネットワーク", "VPC", "共有 VPC"],
  officialUrl: "https://cloud.google.com/vpc/docs?hl=ja",
  summary: [
    "Google Cloud 上の論理的な仮想プライベートネットワーク。VPC はグローバルリソースで、サブネットをリージョンごとに定義する。VM はリージョン内のサブネットに配置され、グローバル VPC 内で通信できる。",
    "共有 VPC（Shared VPC）を使うと、1 つのホストプロジェクトの VPC を複数のサービスプロジェクトで共有でき、ネットワーク管理を一元化できる。VPC ピアリングは異なる組織の VPC 間を接続する手段。",
    "Cloud NAT でプライベートサブネット内の VM がインターネットへ送信専用でアクセスでき、VM に外部 IP を割り当てる必要がない。ファイアウォールルールは VPC レベルで定義し、タグやサービスアカウントで対象を絞り込める。"
  ],
  examPoints: [
    "共有 VPC vs VPC ピアリング の選択基準は頻出。共有 VPC は同一組織内の複数プロジェクトで VPC を共有、VPC ピアリングは異なる組織や VPC 間で IP レベルの接続を確立。ピアリングは推移的（A-B-C の場合 A と C は自動接続されない）な点に注意。",
    "ACE では サブネットの IP アドレス範囲変更（拡張は可能、縮小は不可）、ファイアウォールルールの優先度（数値が小さいほど優先）と ingress/egress の方向、Private Google Access（外部 IP なしで Google サービスへ到達）が問われやすい。"
  ]
};

window.CERT_SERVICES["cloud-load-balancing"] = {
  slug: "cloud-load-balancing",
  name: "Cloud Load Balancing",
  provider: "gcp",
  category: "ネットワーキング",
  aliases: ["Cloud Load Balancing"],
  officialUrl: "https://cloud.google.com/load-balancing/docs?hl=ja",
  summary: [
    "グローバル・リージョン・内部など多様な構成をサポートするソフトウェア定義ロードバランサー。グローバル外部 HTTP(S) ロードバランサーは単一 Anycast IP で世界中のトラフィックを最も近い Google エッジで受け取り分散する。",
    "ロードバランサーの種類は Application Load Balancer（HTTP/HTTPS・レイヤー 7）と Network Load Balancer（TCP/UDP・レイヤー 4）に大別される。内部ロードバランサーを使うと VPC 内部でのサービス間通信を分散できる。",
    "Cloud Armor と統合して DDoS 防御・WAF ルール・IP 許可拒否リストを適用できる。URL マップを使ったパスベースルーティングやヘッダーベースルーティングも設定可能。"
  ],
  examPoints: [
    "CDL/ACE でロードバランサーの種類選択は頻出。グローバルユーザー向け HTTPS なら Global External ALB、特定リージョンのみなら Regional External ALB、内部サービス間なら Internal ALB または Internal NLB を選ぶ。",
    "引っかけとして、グローバル LB は Premium ネットワークティアが前提で Standard ティアではグローバル分散されない点、ヘルスチェックが失敗したバックエンドは自動的に除外される仕組みを理解しておく。ACE では バックエンドサービスと URL マップの関係も問われる。"
  ]
};

window.CERT_SERVICES["cloud-cdn"] = {
  slug: "cloud-cdn",
  name: "Cloud CDN",
  provider: "gcp",
  category: "ネットワーキング",
  aliases: ["Cloud CDN"],
  officialUrl: "https://cloud.google.com/cdn/docs?hl=ja",
  summary: [
    "Google のグローバルエッジネットワーク（100 以上の PoP）を使って静的・動的コンテンツをエッジキャッシュするコンテンツ配信サービス。Cloud Load Balancing に統合されており、バックエンドサービスかバックエンドバケット（Cloud Storage）に対して有効化するだけで使える。",
    "キャッシュキーをカスタマイズして、クエリパラメータやヘッダーを含めるか除外するかを制御できる。署名付き URL・署名付き Cookie を使えば認証済みコンテンツのキャッシュ配信も可能。",
    "Signed URL Invalidation でキャッシュを即座に無効化でき、CDN の状態は Cloud Monitoring で監視できる。"
  ],
  examPoints: [
    "ACE ではグローバルロードバランサーと Cloud CDN の連携構成、キャッシュヒット率の向上方法（Cache-Control ヘッダーの設定・キャッシュキーの最適化）が問われる。",
    "引っかけとして、Cloud CDN は Cloud Load Balancing の上に乗る機能であり単独では使えない点、動的コンテンツもバイパスせず条件付きキャッシュ（Stale-While-Revalidate など）できる点を押さえる。バックエンドが Cloud Storage の場合は「バックエンドバケット」として構成する。"
  ]
};

window.CERT_SERVICES["cloud-monitoring"] = {
  slug: "cloud-monitoring",
  name: "Cloud Monitoring",
  provider: "gcp",
  category: "運用",
  aliases: ["Cloud Monitoring"],
  officialUrl: "https://cloud.google.com/monitoring/docs?hl=ja",
  summary: [
    "Google Cloud リソースとアプリケーションのメトリクスを収集・可視化・アラート通知するフルマネージドの監視サービス。VM・GKE・Cloud Run・Cloud SQL など主要サービスのメトリクスをエージェントなしで自動収集する。",
    "カスタムメトリクスを OpenTelemetry または Monitoring API で送信でき、ダッシュボードで時系列グラフとして可視化できる。アラートポリシーで閾値超過時に PagerDuty・Slack・メールへ通知を送れる。",
    "Cloud Monitoring は Cloud Logging・Cloud Trace・Cloud Profiler とセットで Google Cloud Observability スイートを構成し、統合されたオブザーバビリティ基盤として機能する。"
  ],
  examPoints: [
    "ACE では アラートポリシーの設定（条件・通知チャネル・インシデント自動クローズ）と、稼働時間チェック（Uptime Check）によるエンドポイント死活監視の構成が問われやすい。",
    "引っかけとして、VM のメモリ・ディスク使用率は デフォルトでは収集されず Ops Agent（旧 Monitoring Agent）のインストールが必要。GKE は Managed Service for Prometheus が標準統合されておりエージェント設定不要でクラスタメトリクスを取得できる。"
  ]
};

window.CERT_SERVICES["cloud-logging"] = {
  slug: "cloud-logging",
  name: "Cloud Logging",
  provider: "gcp",
  category: "運用",
  aliases: ["Cloud Logging"],
  officialUrl: "https://cloud.google.com/logging/docs?hl=ja",
  summary: [
    "Google Cloud サービスとアプリケーションからのログを一元収集・保管・検索するマネージドロギングサービス。GKE・Cloud Run・App Engine などのログはデフォルトで自動送信され、VM は Ops Agent 経由で収集する。",
    "ログバケットでデータ保持期間をカスタマイズでき、デフォルト _Default バケットは 30 日間保持。長期保管が必要なら Cloud Storage へエクスポート（シンク）設定する。BigQuery へのシンクで分析クエリも可能。",
    "ログベースのメトリクスを作成し Cloud Monitoring のアラートと連携することで、特定ログパターン出現時に通知を送るパターンが実践でよく使われる。"
  ],
  examPoints: [
    "ACE では ログシンクの設定（Cloud Storage・BigQuery・Pub/Sub への転送フィルタ）と、監査ログの種類（管理アクティビティログは無料・常時有効、データアクセスログは有料・明示的に有効化）が頻出。",
    "引っかけとして、デフォルトの保持期間は 30 日で長期保管には明示的なシンク設定が必要な点、管理アクティビティログは無効化できない（セキュリティのため）点を押さえる。ログエクスプローラーの Logging Query Language（LQL）の基本構文も ACE で問われる。"
  ]
};

window.CERT_SERVICES["vertex-ai"] = {
  slug: "vertex-ai",
  name: "Vertex AI",
  provider: "gcp",
  category: "AI・機械学習",
  aliases: ["Vertex AI", "Gemini"],
  officialUrl: "https://cloud.google.com/vertex-ai?hl=ja",
  summary: [
    "Google Cloud の統合 ML・生成 AI プラットフォーム。データ準備・モデル学習・評価・デプロイ・モニタリングまでの ML ライフサイクル全体を一つのプラットフォームで管理できる。Vertex AI 上で Gemini などの基盤モデルを利用でき、Agent Builder を使えば検索や会話に応答するエージェントの開発までカバーできる。",
    "Gemini をはじめとする Google の基盤モデルを API 経由で呼び出せる Model Garden と、AutoML（ノーコードで分類・回帰・物体検出モデルを作成）を統合。カスタムモデルは Vertex AI Training で学習し Vertex AI Prediction でホスティングする。",
    "Vertex AI Pipelines（Kubeflow ベース）で ML ワークフローをオーケストレーション、Feature Store で特徴量を管理、Vertex Explainability でモデルの予測根拠を説明できる。"
  ],
  examPoints: [
    "CDL では生成 AI ユースケース（テキスト生成・画像生成・RAG）に Vertex AI（Gemini API）を使うシナリオが頻出。AutoML vs カスタムモデルの選択基準（データ量・カスタマイズ度・コスト）も問われる。",
    "ACE では Vertex AI Workbench（マネージド Jupyter 環境）・Vertex AI Training のカスタムコンテナ学習・エンドポイントのデプロイ設定（スプリットトラフィックによる A/B テスト）が出題範囲。引っかけとして、Vertex AI の Prediction エンドポイントは常時稼働課金なので、低頻度推論には Batch Prediction の利用が推奨される。"
  ]
};
