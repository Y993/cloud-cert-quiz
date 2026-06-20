// Associate Cloud Engineer (ACE) 問題データ — tools/build-exam.js により生成
// choices-shuffled: 2026-06-11 (tools/shuffle-choices.js)
window.CERT_EXAMS = window.CERT_EXAMS || {};
window.CERT_EXAMS["gcp-ace"] = {
  "meta": {
    "id": "gcp-ace",
    "title": "Associate Cloud Engineer",
    "code": "ACE",
    "provider": "gcp"
  },
  "questions": [
    {
      "id": "q001",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "あなたの会社は Google Cloud プロジェクトを新規作成する予定です。プロジェクトを作成する際に必ず一意である必要があるものはどれですか？",
      "choices": [
        "プロジェクト番号",
        "プロジェクト ID",
        "プロジェクト名",
        "請求先アカウント ID"
      ],
      "answer": [
        1
      ],
      "explanation": "プロジェクト ID はグローバルに一意であり、作成後に変更できません。プロジェクト名は一意である必要はなく、同じ組織内でも重複可能です。プロジェクト番号は Google Cloud が自動採番する値で、ユーザーが指定するものではありません。請求先アカウント ID は複数プロジェクトで共用されるため、一意性の要件はプロジェクトスコープには当たりません。したがって、作成時に一意性を確保しなければならないのはプロジェクト ID のみです。"
    },
    {
      "id": "q002",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたの会社は複数の部門が別々の Google Cloud プロジェクトを持っており、一元的な請求管理と予算制御が必要です。コードの変更を最小限に抑えながら、最も効率的に実現する方法はどれですか？",
      "choices": [
        "Cloud Billing API を使って各プロジェクトのコストを手動で集計する",
        "1 つの請求先アカウントを作成し、すべてのプロジェクトを紐付ける",
        "各プロジェクトに対して個別の請求先アカウントを作成する",
        "組織リソースを作成し、フォルダーで部門を分けてプロジェクトを管理する"
      ],
      "answer": [
        1
      ],
      "explanation": "1 つの請求先アカウントに複数のプロジェクトを紐付けることで、一元的な請求管理と予算アラート設定が可能になります。個別の請求先アカウントを作成すると管理オーバーヘッドが増大し、横断的な予算管理が困難になります。組織リソースとフォルダーはリソース階層の整理には有効ですが、それ自体は請求の一元化を担うものではありません。Cloud Billing API を使った手動集計は運用負荷が高く、リアルタイム予算制御には不向きです。"
    },
    {
      "id": "q003",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "開発チームは Google Cloud Console へのアクセスに個人の Google アカウントを使用しています。社内の IT ポリシーにより、会社のドメイン（example.com）のアカウントのみでアクセスを制限したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "Cloud Identity を使って個人アカウントを会社アカウントへ移行する",
        "組織ポリシーの iam.allowedPolicyMemberDomains 制約を設定する",
        "VPC Service Controls でコンソールアクセスを制限する",
        "各プロジェクトで IAM ポリシーを手動で更新し、個人アカウントを削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "組織ポリシーの iam.allowedPolicyMemberDomains 制約（旧 constraints/iam.allowedPolicyMemberDomains）を設定することで、特定のドメインのアカウントのみに IAM バインディングを許可し、組織全体に一括適用できます。IAM ポリシーの手動更新は数が多くなると管理が困難で、新しいプロジェクト追加のたびに対応が必要です。Cloud Identity への移行は中長期的には有効ですが、アクセス制限そのものの即時手段ではありません。VPC Service Controls はサービス境界によるデータ保護が目的であり、コンソールログインのドメイン制限には使用しません。"
    },
    {
      "id": "q004",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "あなたは gcloud CLI を新しい開発マシンにインストールしました。複数の Google Cloud プロジェクトを切り替えて作業するための設定を効率的に管理する方法として最も適切なものはどれですか？",
      "choices": [
        "各プロジェクト用のサービスアカウントキーを手動で切り替える",
        "gcloud config configurations create コマンドで複数の設定プロファイルを作成し切り替える",
        "環境変数 GOOGLE_CLOUD_PROJECT に毎回プロジェクト ID をセットする",
        "作業のたびに gcloud config set project <PROJECT_ID> を実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "gcloud config configurations create で名前付き設定プロファイルを作成し、gcloud config configurations activate で切り替えることで、プロジェクト・アカウント・リージョンなどをセットとして管理できます。毎回 gcloud config set を実行する方法は手間がかかり、ミスの原因になります。環境変数 GOOGLE_CLOUD_PROJECT はシェルセッション固有であり、アカウントやリージョン設定との整合が取りにくいです。サービスアカウントキーの手動切り替えはセキュリティリスクが高く、運用負荷も大きいため推奨されません。"
    },
    {
      "id": "q005",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたのチームは月の Cloud Run 費用が 500 ドルを超えたときにアラートを受け取りたいと考えています。最も少ない手順で設定する方法はどれですか？",
      "choices": [
        "Cloud Functions を作成して請求 API を定期的にポーリングし、500 ドル超過で通知する",
        "Cloud Monitoring でカスタムメトリクスを作成し、課金データをエクスポートして監視する",
        "Cloud Billing で予算を作成し、500 ドルのしきい値でメール通知を設定する",
        "BigQuery に請求データをエクスポートし、スケジュールクエリでアラートを送る"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Billing の予算アラート機能を使えば、請求先アカウントまたはプロジェクトに対して予算を設定し、複数のしきい値（50%、90%、100% など）でメールや Pub/Sub 経由の通知を設定できます。コードを一切書かずに数分で設定可能です。Cloud Monitoring でのカスタムメトリクス作成は複雑で、請求データのエクスポート設定が別途必要です。BigQuery エクスポートはコスト分析に有効ですが、リアルタイムアラートには遅延が生じます。Cloud Functions によるポーリングは実装コストが高く、予算アラートで代替できる場合は不要です。"
    },
    {
      "id": "q006",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "大企業が Google Cloud の導入を開始します。各部門が独立してプロジェクトを管理しながらも、会社全体のセキュリティポリシーと請求の一元管理を実現したいと考えています。最も適切なリソース階層の設計はどれですか？",
      "choices": [
        "組織ノードの下に部門ごとのフォルダーを作成し、その下にプロジェクトを配置する",
        "部門ごとに請求先アカウントを作成し、各部門が独立してプロジェクトを管理する",
        "1 つのプロジェクト内でラベルを使って部門を区分けする",
        "各部門に Google Workspace のドメインを割り当て、そのドメイン配下でプロジェクトを管理する"
      ],
      "answer": [
        0
      ],
      "explanation": "組織ノードをルートに、部門ごとのフォルダーを作成し、その下にプロジェクトを配置する設計が最適です。組織レベルで IAM ポリシーと組織ポリシーを設定することで会社全体に統一したセキュリティポリシーを適用できます。また、1 つの請求先アカウントにすべてのプロジェクトを紐付けることで一元請求管理も実現できます。部門ごとに請求先アカウントを分けると一元管理が困難になります。1 つのプロジェクト内でラベル分けする方法は IAM 境界を設けられず、部門間のアクセス分離ができません。複数の Google Workspace ドメインを使う方法は管理が複雑になり、組織ポリシーの統一が難しくなります。"
    },
    {
      "id": "q007",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "開発者が Cloud Shell を使って Google Cloud リソースを操作しています。Cloud Shell セッションが終了した後も保持されるストレージはどれですか？",
      "choices": [
        "Cloud Shell インスタンスの /tmp ディレクトリ",
        "セッション中に作成した環境変数",
        "インストールした追加の apt パッケージ",
        "Cloud Shell のホームディレクトリ（~/ 以下）"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Shell のホームディレクトリ（$HOME、つまり ~/）は 5GB の永続ディスクに保存されており、セッションが終了しても保持されます。/tmp ディレクトリはセッションごとに初期化されます。環境変数はシェルプロセスに紐づくため、セッション終了と同時に消えます（.bashrc や .bash_profile に書けば再現できますが、変数値自体は保持されません）。apt でインストールしたパッケージは Cloud Shell インスタンスの非永続領域に存在するため、新しいセッションでは初期状態に戻ります。"
    },
    {
      "id": "q008",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたの会社は Google Cloud プロジェクトの費用増加を監視したいと考えています。特定のプロジェクトの予算の 80% を超えた時点で、Pub/Sub トピックへの通知を自動的に送信したい場合、どの設定が必要ですか？",
      "choices": [
        "Cloud Monitoring のアラートポリシーを設定し、請求メトリクスに閾値を設定する",
        "Cloud Scheduler で定期的に予算チェックジョブを実行し、Pub/Sub に通知する",
        "Cloud Billing の予算に Pub/Sub トピックを通知チャネルとして設定する",
        "Cloud Functions で請求 API を定期実行し、80% 超過時に Pub/Sub に publish する"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Billing の予算機能には、しきい値超過時に Pub/Sub トピックへ自動通知するネイティブ機能があります。予算設定画面で「Pub/Sub トピックに通知する」を有効にし、接続するトピックを指定するだけで設定完了です。これにより Cloud Functions や他の自動化ツールと連携したコスト制御の自動化が可能になります。Cloud Monitoring は課金メトリクスをサポートしますが、Pub/Sub への直接通知設定は予算アラートほどシンプルではありません。Cloud Functions や Cloud Scheduler を使ったポーリング方式は実装コストが高く、ネイティブ機能で代替できます。"
    },
    {
      "id": "q009",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "セキュリティチームは、本番環境の Google Cloud プロジェクトにおいて、特定のリージョン（asia-northeast1）以外にリソースを作成できないようにしたいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "すべての IAM ロールに対してリージョン条件付きポリシーを設定する",
        "VPC ネットワークを asia-northeast1 のみに作成し、他のリージョンへの接続を拒否するファイアウォールルールを追加する",
        "Cloud Armor ポリシーを設定して他のリージョンからのリクエストをブロックする",
        "組織ポリシーの constraints/gcp.resourceLocations を設定してリージョンを制限する"
      ],
      "answer": [
        3
      ],
      "explanation": "組織ポリシーの constraints/gcp.resourceLocations を使うと、プロジェクトまたはフォルダーレベルで許可するリージョンを限定できます。この制約を設定すると、指定リージョン外でのリソース作成が API レベルで拒否されます。IAM 条件付きポリシーはリソース属性に基づくアクセス制御ですが、全ロール・全サービスに設定するのは現実的ではありません。VPC のファイアウォールルールはネットワークトラフィックを制御するものであり、リソースの作成場所を制限しません。Cloud Armor は HTTP(S) トラフィックの保護に使用するものであり、リソース作成の制限には使えません。"
    },
    {
      "id": "q010",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "新入りエンジニアが初めて gcloud CLI を設定します。認証を完了するための最も適切なコマンドはどれですか？",
      "choices": [
        "gcloud config set account",
        "gcloud init",
        "gcloud auth login",
        "gcloud auth application-default login"
      ],
      "answer": [
        2
      ],
      "explanation": "gcloud auth login は、ブラウザを通じて Google アカウントで認証し、gcloud CLI が使えるようにするためのコマンドです。gcloud init は初期設定ウィザード全体（認証＋プロジェクト設定＋リージョン設定）を一括で行いますが、認証のみを目的とするなら gcloud auth login の方が直接的です。gcloud config set account はすでに認証済みのアカウントを切り替えるコマンドで、未認証状態では使用できません。gcloud auth application-default login はアプリケーションデフォルト認証情報（ADC）の設定に使用するコマンドで、SDK の個人認証とは別の目的です。"
    },
    {
      "id": "q011",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたの会社は複数の環境（開発・ステージング・本番）を Google Cloud 上で管理しています。環境間のアクセス分離とコスト追跡を最小限の管理負荷で実現する最適な構成はどれですか？",
      "choices": [
        "VPC ネットワークを環境ごとに分けてファイアウォールで分離する",
        "1 つのプロジェクト内でリソースにラベルを付けて環境を区別する",
        "環境ごとに別個のプロジェクトを作成し、フォルダーで管理する",
        "各環境で別個のサービスアカウントを作成してアクセスを分離する"
      ],
      "answer": [
        2
      ],
      "explanation": "環境ごとに別個のプロジェクトを作成することで、IAM の境界による強固なアクセス分離、プロジェクト単位のコスト追跡、誤操作による本番環境への影響の防止が実現できます。フォルダーで管理すれば共通ポリシーの適用も効率化できます。1 つのプロジェクト内でのラベル管理はコスト追跡には役立ちますが、IAM レベルの分離ができず、誤って本番リソースを削除するリスクがあります。サービスアカウントによる分離は IAM 設計として有効ですが、ネットワークやリソース境界を設けるものではありません。VPC の分離はネットワーク境界には有効ですが、同一プロジェクト内ではリソース全体の IAM 分離は実現できません。"
    },
    {
      "id": "q012",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたはプロジェクトを新規作成しようとしていますが、「リソースクォータを超えています」というエラーが発生しました。この問題を解決するために最初に確認・実施すべきことはどれですか？",
      "choices": [
        "新しい Google アカウントを作成して再度試みる",
        "Cloud Console の [IAM と管理] > [クォータ] で現在の使用量を確認し、必要に応じて増加申請する",
        "既存のプロジェクトをすべて削除してから再度作成する",
        "Google Cloud サポートにクォータの増加をリクエストする"
      ],
      "answer": [
        1
      ],
      "explanation": "まず [IAM と管理] > [クォータ] ページで現在のプロジェクト数と上限を確認します。Google Cloud では 1 つのアカウントが作成できるプロジェクト数にデフォルト上限（通常 10〜25 件程度）があります。確認後、上限に達している場合は同ページからクォータ増加を申請できます。新しい Google アカウントを作成するのは問題の根本解決ではなく、管理が分散します。サポートに直接連絡する前に、セルフサービスのクォータ増加申請を試みるべきです。既存プロジェクトの削除は業務影響があり、最後の手段です。"
    },
    {
      "id": "q013",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "あなたの会社は Google Cloud の Assured Workloads を使用する必要があります。これが必要となる最も典型的なユースケースはどれですか？",
      "choices": [
        "カスタムドメインを使った Cloud Run サービスを公開する場合",
        "複数リージョンにまたがる高可用性アーキテクチャを構築する場合",
        "FedRAMP や ITAR などのコンプライアンス要件を満たすリソース配置を保証する場合",
        "Google Cloud のサービスクォータを組織全体で管理する場合"
      ],
      "answer": [
        2
      ],
      "explanation": "Assured Workloads は、FedRAMP High、ITAR、IL4/IL5 などの厳格なコンプライアンス・規制要件を満たすためにデータの保存場所・アクセス制御・サポートを制限するサービスです。政府機関や金融機関などで特定の規制に準拠する必要がある場合に使用します。高可用性アーキテクチャの構築は Assured Workloads ではなく、マルチリージョン構成やロードバランサーで実現します。クォータ管理は [IAM と管理] > [クォータ] で行います。カスタムドメインの Cloud Run 公開は Assured Workloads とは無関係です。"
    },
    {
      "id": "q014",
      "type": "multiple",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "Google Cloud の請求先アカウントに関して正しい記述を 2 つ選択してください。",
      "choices": [
        "1 つの請求先アカウントは 1 つのプロジェクトにのみ紐付けられる",
        "1 つの請求先アカウントは複数のプロジェクトに紐付けることができる",
        "請求先アカウントは組織に紐付けることができ、組織管理者が管理できる",
        "プロジェクトは複数の請求先アカウントに同時に紐付けることができる"
      ],
      "answer": [
        1,
        2
      ],
      "explanation": "請求先アカウントは複数のプロジェクトに紐付け可能であり（選択肢B）、これにより一元的なコスト管理が実現します。また、請求先アカウントは Google Cloud 組織に関連付けることができ、roles/billing.admin を持つ組織管理者が管理できます（選択肢C）。選択肢Aは誤りで、1 つの請求先アカウントで多数のプロジェクトを管理できます。選択肢Dは誤りで、1 つのプロジェクトが同時に複数の請求先アカウントに紐付けることはできません。プロジェクトは常に 1 つの請求先アカウントにのみ紐付けられます。"
    },
    {
      "id": "q015",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "Google Cloud Console で現在アクティブなプロジェクトを確認・切り替える最も簡単な方法はどれですか？",
      "choices": [
        "IAM と管理 > 設定ページを開く",
        "Cloud Shell で gcloud config list を実行する",
        "コンソール上部のプロジェクトセレクターをクリックする",
        "gcloud projects list を実行して表示されたプロジェクトから選ぶ"
      ],
      "answer": [
        2
      ],
      "explanation": "Google Cloud Console の上部にあるプロジェクトセレクター（ドロップダウン）をクリックすると、アクセス可能なプロジェクト一覧が表示され、ワンクリックで切り替えられます。これが最も迅速で視覚的な方法です。Cloud Shell での gcloud config list は CLI での確認方法ですが、コンソールを使っている場合は不要な手順です。IAM と管理 > 設定ページはプロジェクトの詳細情報確認には使えますが、素早い切り替えには適しません。gcloud projects list はすべてのプロジェクト一覧表示には有用ですが、コンソール操作と比べて手順が多くなります。"
    },
    {
      "id": "q016",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "スタートアップ企業が Google Cloud を初めて利用します。まず無料枠の範囲で試験的にサービスを検証したいと考えています。最初に確認・実施すべき最適な手順はどれですか？",
      "choices": [
        "Google Cloud の無料枠（Always Free）プロダクトのみを使用してアーキテクチャを組む",
        "Cloud Billing で請求アラートを $1 に設定してから本番サービスを構築する",
        "Google Cloud に登録して 90 日間の無料トライアル（$300 クレジット）を利用する",
        "Google Cloud パートナーを通じてエンタープライズ契約を結ぶ"
      ],
      "answer": [
        2
      ],
      "explanation": "Google Cloud の無料トライアルは新規登録時に 90 日間で $300 のクレジットが付与され、主要サービスを自由に試験できます。この期間中はクレジット内での利用が可能で、クレジット終了後に請求が発生するため、安全に検証を行えます。Always Free 枠のみに制限すると使用できるサービスや容量が非常に限定的で、実際のアーキテクチャ検証には不十分な場合があります。請求アラートを $1 に設定しても、サービス自体の費用制限にはなりません（アラートは通知のみ）。スタートアップの初期段階でエンタープライズ契約を結ぶのはコスト的に適切ではありません。"
    },
    {
      "id": "q017",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "あなたの組織は Google Cloud リソースを作成する際に、特定のタグ（environment=production など）が必須要件となるようにしたいと考えています。タグが付いていないリソースの作成を拒否する最適な方法はどれですか？",
      "choices": [
        "組織ポリシーカスタム制約を作成し、特定タグなしのリソース作成を拒否する",
        "IAM Conditions でタグを条件に加えてリソース作成権限を制限する",
        "Cloud Asset Inventory を使って定期的にタグなしリソースをスキャンして削除する",
        "Cloud Functions のトリガーでリソース作成イベントを検知し、タグなしリソースを自動削除する"
      ],
      "answer": [
        0
      ],
      "explanation": "組織ポリシーのカスタム制約（Custom Constraints）を使うと、DENY ルールでリソース作成リクエスト内の属性（タグなど）を検査し、条件を満たさないリクエストを API レベルで拒否できます。リソースが実際に作成される前に防止できる点がポイントです。Cloud Asset Inventory のスキャンは事後検知であり、タグなしリソースが一時的に存在してしまいます。IAM Conditions はリソース操作の権限制御であり、タグの強制付与には直接使用できません。Cloud Functions による事後削除も事後対応であり、リソースが作成されてしまう問題は残ります。"
    },
    {
      "id": "q018",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたは gcloud CLI を使ってデフォルトのリージョンとゾーンを設定したいと考えています。正しいコマンドの組み合わせはどれですか？",
      "choices": [
        "gcloud compute config set region=asia-northeast1 と gcloud compute config set zone=asia-northeast1-a",
        "gcloud config region asia-northeast1 と gcloud config zone asia-northeast1-a",
        "gcloud config set compute/region asia-northeast1 と gcloud config set compute/zone asia-northeast1-a",
        "gcloud set region asia-northeast1 と gcloud set zone asia-northeast1-a"
      ],
      "answer": [
        2
      ],
      "explanation": "gcloud config set compute/region <REGION> および gcloud config set compute/zone <ZONE> が正しいコマンドです。これらを設定することで、compute リソースを作成する際に --region や --zone フラグを毎回指定する手間を省けます。選択肢D の gcloud set は存在しないコマンドです。選択肢B の gcloud config region も不正なサブコマンドです。選択肢A の gcloud compute config set も存在しないコマンドで、gcloud compute コマンドのプロパティは gcloud config set compute/ プレフィックスで設定します。"
    },
    {
      "id": "q019",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "大規模エンタープライズが Google Cloud を導入する際、Cloud Identity を使うことの主なメリットとして最も適切な説明はどれですか？",
      "choices": [
        "社員が個人の Gmail アカウントではなく会社管理のアカウントで Google Cloud を利用できる",
        "Google Cloud のサービスクォータが自動的に増加する",
        "Google Cloud の請求コストを削減できる",
        "Google Cloud リソースの処理性能が向上する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Identity は、Google Workspace（G Suite）の有償ライセンスなしに、会社のドメインでユーザーアカウントとグループを管理できるサービスです。社員が個人の Google アカウントではなく、会社管理のアカウント（例: user@example.com）で Google Cloud にアクセスできるようになり、アカウント管理・セキュリティポリシー・SSO との統合が可能になります。Cloud Identity は請求コストや処理性能に直接影響しません。サービスクォータは Cloud Identity の設定とは独立して管理されます。"
    },
    {
      "id": "q020",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "Google Cloud で既存プロジェクトの請求先アカウントを別のアカウントに変更したい場合、必要な権限はどれですか？",
      "choices": [
        "組織に対する roles/resourcemanager.organizationAdmin",
        "プロジェクトに対する roles/owner",
        "プロジェクトに対する roles/billing.projectManager と、変更先請求先アカウントに対する roles/billing.user",
        "変更元・変更先の両方の請求先アカウントに対する roles/billing.admin"
      ],
      "answer": [
        2
      ],
      "explanation": "請求先アカウントの変更には、プロジェクトに対して roles/billing.projectManager（または roles/owner）を持つことに加え、変更先の請求先アカウントに対して roles/billing.user が必要です。roles/owner のみでは請求先アカウントへの紐付け変更権限がない場合があります。roles/billing.admin は請求先アカウント全体の管理権限で、変更元・変更先両方に必要なわけではありません。roles/resourcemanager.organizationAdmin は組織構造の管理に使用しますが、請求先アカウントの変更には直接必要ありません。"
    },
    {
      "id": "q021",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "Google Cloud の組織ポリシーサービスを使って、すべての新規 GCS バケットで公開アクセスを強制的に無効化したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "バケット作成時に Uniform Bucket-Level Access を有効にするよう開発者に指示する",
        "すべての GCS バケットに対して IAM ポリシーで allUsers/allAuthenticatedUsers へのアクセスを明示的に拒否する",
        "Cloud Asset Inventory で定期的に公開バケットをスキャンしてアクセスを削除する",
        "組織ポリシーの constraints/storage.publicAccessPrevention を Enforced に設定する"
      ],
      "answer": [
        3
      ],
      "explanation": "constraints/storage.publicAccessPrevention を Enforced に設定すると、組織・フォルダー・プロジェクト以下のすべての Cloud Storage バケットで、allUsers または allAuthenticatedUsers へのアクセス付与が API レベルで自動的にブロックされます。既存バケットを含め強制的に適用されます。Cloud Asset Inventory によるスキャンは事後検知です。各バケットへの IAM ポリシー設定は手動作業が多く、新規バケット作成時の自動適用がされません。開発者への指示はヒューマンエラーの余地があり、強制力がありません。"
    },
    {
      "id": "q022",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "あなたの組織では Google Cloud 組織ポリシーの継承を理解することが重要です。フォルダー A に constraints/compute.disableSerialPortAccess を True で設定し、その子プロジェクト B では False に上書きしました。プロジェクト B での動作として正しいものはどれですか？",
      "choices": [
        "フォルダー A の設定が優先され、プロジェクト B でもシリアルポートアクセスは無効になる",
        "プロジェクト B の設定が優先され、プロジェクト B ではシリアルポートアクセスが有効になる",
        "両方の設定が競合するため、デフォルト動作（False）が適用される",
        "フォルダー A で constraints を設定すると子リソースでの上書きは一切できない"
      ],
      "answer": [
        1
      ],
      "explanation": "組織ポリシーはデフォルトで子ノードに継承されますが、inheritFromParent を False に設定するか、子ノードで明示的に上書きすることで親の設定を無効化できます。プロジェクト B で False（または同等のポリシー）を明示設定した場合、プロジェクト B では子ノードの設定が優先されます。ただし、組織管理者が inheritFromParent を強制させるか、constraints の DENY を強制的に設定している場合は例外です。デフォルトでは子ノードの明示的な上書きが優先されます。選択肢C と D は組織ポリシーの仕様として誤りです。"
    },
    {
      "id": "q023",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "あなたのチームは Google Cloud プロジェクトのリソースをエクスポートして、変更履歴を追跡したいと考えています。プロジェクト内のすべてのリソースとその構成のスナップショットを取得するために最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Asset Inventory",
        "Deployment Manager",
        "Cloud Logging のエクスポートシンク",
        "Cloud Monitoring のカスタムダッシュボード"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Asset Inventory は Google Cloud のリソースとポリシーを一元的にインベントリ化するサービスです。gcloud asset export コマンドや API を使って、特定時点のリソーススナップショットを Cloud Storage または BigQuery にエクスポートできます。変更履歴の追跡には Cloud Asset Inventory の変更フィード機能も活用できます。Cloud Logging のエクスポートシンクはログデータの転送に使用するもので、リソース構成のスナップショットには使いません。Cloud Monitoring はメトリクスの可視化が目的です。Deployment Manager はリソースのプロビジョニングツールであり、既存リソースのインベントリ取得には使いません。"
    },
    {
      "id": "q024",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "easy",
      "question": "Google Cloud プロジェクトを削除しようとしたところ、lien（保護ロック）が設定されていてエラーになりました。このプロジェクトを削除するために最初に実施すべき手順はどれですか？",
      "choices": [
        "Cloud Billing の請求先アカウントをプロジェクトから切り離してから再試行する",
        "gcloud projects undelete コマンドでプロジェクトを一度復元してから削除する",
        "組織管理者に連絡してプロジェクトを強制削除してもらう",
        "resourcemanager.projects.deleteLien 権限を持つアカウントで lien を削除してから再試行する"
      ],
      "answer": [
        3
      ],
      "explanation": "lien（保護ロック）はプロジェクトの誤削除を防ぐための仕組みです。削除するには、まず resourcemanager.projects.deleteLien 権限（roles/resourcemanager.lienModifier など）を持つアカウントで gcloud alpha resource-manager liens list で lien を確認し、gcloud alpha resource-manager liens delete で削除してからプロジェクトを削除します。組織管理者への依頼は権限がない場合の最後の手段です。gcloud projects undelete は削除後に復元するコマンドで、削除前の手順ではありません。請求先アカウントの切り離しはプロジェクト削除に必須ではなく、lien の解除とは別の操作です。"
    },
    {
      "id": "q025",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "あなたの会社は Google Cloud で多くのプロジェクトを管理しており、各チームが作成したリソースの所有権を明示的に追跡したいと考えています。最もスケーラブルなアプローチはどれですか？",
      "choices": [
        "各プロジェクトに README ドキュメントを作成して所有チームを記載する",
        "プロジェクトに対する roles/owner を担当チームに付与してオーナーシップを示す",
        "各リソースに team と owner のラベルを付与するポリシーを組織ポリシーで強制する",
        "Cloud Asset Inventory の変更フィードを使って各リソース変更者を追跡する"
      ],
      "answer": [
        2
      ],
      "explanation": "ラベル（Labels）は Google Cloud リソースに key-value 形式で付与できるメタデータで、組織ポリシーのカスタム制約と組み合わせることで特定ラベルの付与を必須にできます。これによりリソース作成時にチームや所有者情報が必ず記録され、Cloud Billing エクスポートや Cloud Asset Inventory とも組み合わせてコストや所有権の追跡が可能になります。README ドキュメントはスケールしにくく、自動的な追跡ができません。Cloud Asset Inventory の変更フィードは誰がリソースを変更したかを追跡できますが、所有権の明示的な管理には不十分です。roles/owner の付与はアクセス権の付与であって、所有権の表明には間接的な方法です。"
    },
    {
      "id": "q026",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたのチームはウェブアプリケーションのバックエンド API を Google Cloud にデプロイする予定です。コンテナ化されたアプリで、トラフィックの変動が大きく、アイドル時のコストを最小限にしたいと考えています。最も適切なサービスはどれですか？",
      "choices": [
        "App Engine スタンダード環境",
        "Cloud Run",
        "Compute Engine（VM インスタンス）",
        "Google Kubernetes Engine（GKE）"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Run はコンテナをサーバーレスで実行するサービスで、リクエスト数に応じて自動スケールし、リクエストがない場合はインスタンス数がゼロになります（最小インスタンス数 0 設定時）。これにより、アイドル時のコストを最小化できます。Compute Engine は VM を常時稼働させる必要があり、アイドル時もコストが発生します。GKE はコンテナ管理に強力ですが、クラスターのノードプールを管理する必要があり、アイドル時でも最低限のインフラコストが発生します。App Engine スタンダード環境も自動スケーリングとゼロへのスケールダウンをサポートしますが、特定の言語ランタイムに限定されており、任意のコンテナを使用する今回の要件には Cloud Run が最適です。"
    },
    {
      "id": "q027",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "機械学習の推論処理を行う CPU 集約型のバッチジョブがあります。実行は 1 日 1 回、深夜に 2〜3 時間かかります。コストを最小化しながら必要なコンピューティング能力を確保するための最適な構成はどれですか？",
      "choices": [
        "プリエンプティブル VM（Spot VM）を使ったバッチ処理基盤を構築する",
        "高スペックの Compute Engine インスタンスを常時稼働させる",
        "App Engine フレキシブル環境でバッチ処理を実行する",
        "Cloud Run Jobs を使ってジョブ実行時のみインスタンスを起動する"
      ],
      "answer": [
        0
      ],
      "explanation": "Spot VM（旧プリエンプティブル VM）は通常の VM と比べて最大 90% 安く利用できます。バッチジョブはいつ中断されても再試行できるよう設計することが一般的で、深夜 2〜3 時間の処理であれば Spot VM が中断されても再実行で対応可能です。コスト最小化の観点で最も有効な選択肢です。常時稼働の Compute Engine インスタンスは深夜のみ使用するジョブに対してコスト効率が悪いです。Cloud Run Jobs も有効ですが、CPU 集約型の長時間処理（最大 24 時間）では Spot VM より柔軟性が低い場合があります。App Engine フレキシブル環境はバッチ処理向けではなく、自動スケーリングが不要な定期バッチには過剰な構成です。"
    },
    {
      "id": "q028",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "e コマースサービスで、セッションデータを高速に読み書きしたいと考えています。データは数分から数時間で有効期限が切れ、ミリ秒以下のレイテンシが求められます。最も適切なデータストアはどれですか？",
      "choices": [
        "Memorystore（Redis）",
        "Cloud Firestore",
        "Cloud Spanner",
        "Cloud Bigtable"
      ],
      "answer": [
        0
      ],
      "explanation": "Memorystore の Redis は完全マネージドのインメモリデータストアで、マイクロ秒〜ミリ秒以下のレイテンシを実現し、TTL（有効期限）設定も標準機能として備えています。セッションデータのような短命で高速アクセスが必要なデータに最適です。Cloud Spanner はグローバルに分散したリレーショナルデータベースで、強整合性と高スループットが強みですが、インメモリキャッシュのレイテンシは実現できません。Cloud Bigtable は大量の構造化データのスケーラブルな処理に適していますが、セッションデータのような小さなデータの TTL 管理は Memorystore の方が簡単です。Cloud Firestore はドキュメントデータベースで、レイテンシも数十ミリ秒程度のため、ミリ秒以下の要件には適しません。"
    },
    {
      "id": "q029",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたの会社はオンプレミスから Google Cloud への移行を計画しています。既存のワークロードを変更せずに移行し、その後段階的にクラウドネイティブ化したい場合、最初のステップとして最も適切なアプローチはどれですか？",
      "choices": [
        "オンプレミスの VM をそのまま Compute Engine に Lift & Shift する",
        "アプリケーションをマイクロサービスに分解して Cloud Run にデプロイする",
        "アプリケーションをすべてコンテナ化して GKE に移行する",
        "すべてのデータを BigQuery に移行してデータドリブンなアーキテクチャを構築する"
      ],
      "answer": [
        0
      ],
      "explanation": "Lift & Shift（リフトアンドシフト）はオンプレミスの VM をほぼそのまま Compute Engine に移行する手法で、アプリケーションの変更が最小限で済みます。Google Cloud Migrate for Compute Engine（旧 Velostrata）などのツールを活用することで移行を迅速化できます。移行後に段階的にコンテナ化やマネージドサービスへの移行を進めるアプローチが一般的です。全アプリのコンテナ化は時間とコストがかかります。マイクロサービス化は大規模なリファクタリングが必要です。BigQuery への移行はデータ分析基盤の話であり、アプリケーション全体の移行戦略としては不完全です。"
    },
    {
      "id": "q030",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "easy",
      "question": "Google Cloud で小規模な Web アプリケーションをデプロイしたいと考えています。アプリケーションは Python で書かれており、インフラ管理を最小限にしたいです。最も適切なサービスはどれですか？",
      "choices": [
        "Compute Engine",
        "App Engine スタンダード環境",
        "Cloud Bare Metal Solution",
        "Google Kubernetes Engine"
      ],
      "answer": [
        1
      ],
      "explanation": "App Engine スタンダード環境は Python を含む複数のランタイムをサポートするサーバーレス PaaS サービスです。インフラ管理が不要で、自動スケーリング・デプロイ・HTTPS 対応が組み込まれており、小規模アプリに最適です。Compute Engine はインフラ管理が必要で、OS のパッチ適用やスケーリング設定も自分で行う必要があります。GKE はコンテナオーケストレーションが必要で、クラスター管理の運用負荷があります。Cloud Bare Metal Solution は高性能な物理サーバーを提供するサービスで、小規模 Web アプリには過剰です。"
    },
    {
      "id": "q031",
      "type": "multiple",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "Google Cloud のストレージサービスを選択する際の考慮事項に関して正しい記述を 2 つ選択してください。",
      "choices": [
        "Cloud Bigtable は小規模なデータセット（GB 以下）のストレージに最適である",
        "Cloud Spanner は水平スケール可能なグローバル分散リレーショナルデータベースである",
        "Firestore はサーバーレスのドキュメントデータベースでリアルタイム同期をサポートする",
        "Cloud Storage は構造化データのリレーショナルクエリに最適化されている"
      ],
      "answer": [
        1,
        2
      ],
      "explanation": "Cloud Spanner（選択肢B）はグローバルに分散しながら強整合性を維持できる唯一のリレーショナルデータベースサービスで、水平スケーリングが可能です。Firestore（選択肢C）はサーバーレスのドキュメントデータベースで、リアルタイムリスナーによるデータ同期をネイティブでサポートしています。Cloud Storage（選択肢D）はオブジェクトストレージで、構造化データのリレーショナルクエリには使用しません。Cloud Bigtable（選択肢A）はペタバイトスケールの大量データ処理に最適化されており、数百ギガバイト以上のデータで真価を発揮します。小規模データセットには Firestore や Cloud SQL の方が適しています。"
    },
    {
      "id": "q032",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "グローバルに展開するゲームアプリのバックエンドを Google Cloud で構築しています。世界中のユーザーが低レイテンシでアクセスでき、データの強整合性も必要です。最も適切なデータベースはどれですか？",
      "choices": [
        "Cloud Firestore をマルチリージョン構成で利用する",
        "Cloud SQL（MySQL）をマルチリージョン構成で利用する",
        "Cloud Spanner をマルチリージョン構成で利用する",
        "Cloud Bigtable をシングルリージョン構成で利用する"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Spanner のマルチリージョン構成は、グローバルに分散したノードに対して外部整合性（Serializable Isolation）を保ちながら、地理的に近いリージョンから低レイテンシでデータにアクセスできます。ゲームのスコアランキングやアイテム所持情報のような強整合性が必要なグローバルデータに最適です。Cloud SQL のマルチリージョン構成はリードレプリカには対応していますが、書き込みのグローバル分散と強整合性は Cloud Spanner ほど優れていません。Cloud Bigtable はシングルリージョンではグローバル低レイテンシを実現できません。Cloud Firestore もマルチリージョン対応ですが、ドキュメントモデルに限定されます。"
    },
    {
      "id": "q033",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "easy",
      "question": "あなたのチームは Google Cloud で静的 Web サイト（HTML/CSS/JS のみ）を公開したいと考えています。最もコスト効率の高い方法はどれですか？",
      "choices": [
        "Cloud Storage バケットで静的 Web サイトホスティングを有効にする",
        "Compute Engine の VM 上に Nginx をセットアップして配信する",
        "App Engine スタンダード環境にデプロイする",
        "Cloud Run コンテナで Nginx を実行する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Storage の静的ウェブサイトホスティング機能を使うと、バケットを公開設定にしてメインページと 404 ページを設定するだけで静的サイトを公開できます。コンピュートリソースが不要なため、ストレージとアウトバウンドの帯域費用のみが発生し、非常にコスト効率が高いです。Compute Engine の VM は常時稼働コストが発生します。App Engine は動的アプリ向けで静的サイトには過剰です。Cloud Run も同様にコンテナ実行のオーバーヘッドがあり、静的コンテンツには最適ではありません。"
    },
    {
      "id": "q034",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "あなたのアーキテクチャでは、Cloud Pub/Sub でメッセージを受信し、受信ごとに処理を実行する必要があります。処理は数秒で完了し、トラフィックは不規則で急増することがあります。最もコスト効率の高い実装はどれですか？",
      "choices": [
        "Cloud Run に Pub/Sub プッシュサブスクリプションのエンドポイントを設定する",
        "GKE クラスター上に Pub/Sub サブスクライバーを常時稼働させる",
        "App Engine フレキシブル環境でサブスクライバーを実行する",
        "Compute Engine インスタンスで Pub/Sub ポーリングを常時実行する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Run に Pub/Sub のプッシュサブスクリプションを設定すると、メッセージが届いたときだけ Cloud Run インスタンスが起動します。リクエストがなければゼロにスケールダウンし、急増時も自動スケールします。処理が数秒で完了する短時間ジョブに最適です。GKE の常時稼働クラスターはアイドル時もノードコストが発生します。Compute Engine のポーリングは常時稼働コストに加え、ポーリング頻度の調整も必要です。App Engine フレキシブル環境はコンテナベースですが、最小インスタンス数が 1 以上のためゼロスケールができません。"
    },
    {
      "id": "q035",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたの会社は既存の Oracle データベースを Google Cloud に移行したいと考えています。アプリケーションコードの変更を最小限にしながら、マネージドサービスを利用したいです。最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Bigtable",
        "Bare Metal Solution 上に Oracle DB をインストールする",
        "Cloud Spanner",
        "Cloud SQL for PostgreSQL（pgcompatible モードで移行）"
      ],
      "answer": [
        1
      ],
      "explanation": "Oracle データベースのライセンス・機能・SQL 方言に依存したアプリケーションを変更なしに移行するには、Bare Metal Solution 上で Oracle DB をそのまま実行するのが最も確実です。Google Cloud の Bare Metal Solution は物理サーバーを提供し、Oracle のライセンス条件（ハードウェアパーティション要件など）を満たしながらクラウドのメリット（ネットワーク・サポート）も享受できます。Cloud Spanner は独自の ACID トランザクションをサポートしますが、Oracle 特有の SQL 構文やストアドプロシージャとは互換性がありません。Cloud SQL for PostgreSQL は Oracle 互換性が限定的で、アプリコードの修正が必要になります。Cloud Bigtable は NoSQL で Oracle の代替にはなりません。"
    },
    {
      "id": "q036",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "IoT デバイスから毎秒数百万件のイベントデータを受信し、リアルタイム分析に使いたいと考えています。データは一時的に蓄積してストリーム処理パイプラインに流す必要があります。最も適切なサービスの組み合わせはどれですか？",
      "choices": [
        "Cloud Bigtable → BigQuery",
        "Cloud Storage → Cloud Dataflow",
        "Cloud SQL → Cloud Dataproc",
        "Cloud Pub/Sub → Cloud Dataflow"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Pub/Sub は大量のリアルタイムメッセージを低レイテンシで受信・バッファリングするメッセージングサービスで、IoT イベントの取り込みに最適です。Cloud Dataflow はストリーム処理（および バッチ処理）のマネージドサービスで、Pub/Sub からのデータをリアルタイムに処理・変換できます。Cloud Storage は永続ストレージですが、リアルタイムのイベントストリーム受信には適しません。Cloud SQL はリレーショナル DB で、毎秒数百万件のイベント取り込みのスループットには向いていません。Cloud Bigtable → BigQuery の組み合わせはデータ分析フローとして有効ですが、リアルタイムイベント受信のバッファリングには Pub/Sub の方が適しています。"
    },
    {
      "id": "q037",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "easy",
      "question": "Google Cloud で Compute Engine の VM インスタンスを特定のゾーンで起動するための gcloud コマンドとして正しいものはどれですか？",
      "choices": [
        "gcloud vm create my-vm --machine-type=e2-medium --zone=asia-northeast1-a",
        "gcloud instances create my-vm --type=e2-medium --zone=asia-northeast1-a",
        "gcloud compute create instance my-vm --machine-type=e2-medium --region=asia-northeast1",
        "gcloud compute instances create my-vm --machine-type=e2-medium --zone=asia-northeast1-a"
      ],
      "answer": [
        3
      ],
      "explanation": "正しいコマンドは gcloud compute instances create <NAME> --machine-type=<TYPE> --zone=<ZONE> です。gcloud compute が Compute Engine のサブコマンドグループで、instances create が操作です。選択肢B の gcloud instances create は存在しません（compute サブコマンドが必要）。選択肢C の gcloud compute create instance は引数の順序が誤りで、正しくは gcloud compute instances create です。また、VM はゾーンリソースのため --zone で指定します（--region は使いません）。選択肢A の gcloud vm create も存在しないコマンドです。"
    },
    {
      "id": "q038",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたのチームは GKE クラスターのノードプールを選定しています。ワークロードはバースト的で、短時間に大量の Pod が起動し、処理完了後に削減されます。コストを最小化しながらこの要件を満たすための最適な構成はどれですか？",
      "choices": [
        "Cluster Autoscaler を有効にした標準ノードプールを使用する",
        "大きな VM タイプで固定ノード数のノードプールを使用する",
        "Spot VM ノードプールと Cluster Autoscaler を組み合わせる",
        "Autopilot モードの GKE クラスターを使用する"
      ],
      "answer": [
        2
      ],
      "explanation": "Spot VM（スポット VM）はオンデマンド VM と比べて最大 90% 安く、Cluster Autoscaler と組み合わせることでバースト時のみノードを追加・削減できます。短時間で完了する再試行可能なバッチワークロードには Spot VM が最適です。固定ノード数のノードプールはアイドル時にもコストが発生します。標準ノードプールの Cluster Autoscaler は有効ですが、オンデマンド VM のコストがかかります。GKE Autopilot は Pod 単位の課金でコスト効率が高いですが、Spot VM との組み合わせは Autopilot では選択できません（Autopilot 自体がスポット Pod をサポートする設定もありますが、通常の構成としては Spot VM ノードプールの方が明示的にコスト最小化できます）。"
    },
    {
      "id": "q039",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "あなたの会社はオンプレミスのデータセンターと Google Cloud を接続したいと考えています。帯域幅 10Gbps 以上が必要で、インターネットを経由せずに安定した接続が求められます。最も適切な接続方法はどれですか？",
      "choices": [
        "Partner Interconnect",
        "Cloud VPN（IPsec）",
        "Cloud Interconnect（Dedicated Interconnect）",
        "Direct Peering"
      ],
      "answer": [
        2
      ],
      "explanation": "Dedicated Interconnect は Google のネットワークと顧客のオンプレミスネットワークを物理的に接続する専用線サービスです。10Gbps または 100Gbps の回線を提供し、インターネットを経由しないため低レイテンシ・高帯域で安定した接続が可能です。Cloud VPN は IPsec でインターネット経由の暗号化接続を提供しますが、帯域幅は最大 3Gbps 程度で安定性もインターネットに依存します。Partner Interconnect は通信キャリアを経由した接続で、コロケーション施設への直接アクセスがない場合に使用しますが、Google との直接接続ではありません。Direct Peering は Google のエッジノードとのピアリングで、Google Cloud のプライベートネットワークには接続しません。"
    },
    {
      "id": "q040",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "マイクロサービスアーキテクチャで各サービスが Cloud SQL インスタンスを別々に持っています。データベース間でトランザクションをまたいだ整合性が必要になりました。コード変更を最小限にした解決策として最も適切なものはどれですか？",
      "choices": [
        "Saga パターンを実装してサービス間の整合性を管理する",
        "各サービスの Cloud SQL を同一 VPC に配置してデータベースリンクを設定する",
        "すべてのサービスで 1 つの共有 Cloud SQL インスタンスを使用する",
        "Cloud Spanner に移行してグローバルトランザクションを使用する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Spanner は複数のデータベースをまたいだ分散トランザクションをネイティブにサポートしており、強整合性（外部整合性）を保証します。Cloud SQL から Cloud Spanner への移行はスキーマの変更は必要ですが、アプリのビジネスロジック（トランザクション処理コード）の大幅な変更なしに整合性を確保できます。共有 Cloud SQL インスタンスへの集約はスケーラビリティを損ない、マイクロサービスの独立性を破壊します。Saga パターンは補償トランザクションでの最終的整合性を実現しますが、実装が複雑でコードの大幅変更が必要です。Cloud SQL にはデータベースリンク機能がなく、クロスインスタンストランザクションはサポートしていません。"
    },
    {
      "id": "q041",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "easy",
      "question": "ユーザーから大量の画像をアップロードしてもらい、長期間保存する必要があります。アクセス頻度は低く（月に数回程度）、コストを最小限に抑えたいと考えています。最も適切な Cloud Storage クラスはどれですか？",
      "choices": [
        "Coldline",
        "Nearline",
        "Standard",
        "Archive"
      ],
      "answer": [
        0
      ],
      "explanation": "Coldline ストレージは年に 1〜4 回程度のアクセスを想定したクラスで、月に数回のアクセスに適しています。Standard より大幅にストレージコストが低く、取り出し時に料金が発生しますが、アクセス頻度が低いため全体コストは抑えられます。Standard は頻繁なアクセスに最適化されており、長期低頻度アクセスには不向きです。Nearline は月 1 回以上のアクセスを想定しています。Archive は年 1 回未満のアクセスで最安ですが、取り出しに数時間かかる場合があり、月数回アクセスするユースケースには向きません（取り出し料金が高くなります）。"
    },
    {
      "id": "q042",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたの会社は Cloud Run サービスを複数リージョンに展開し、グローバルに分散したユーザーに低レイテンシでサービスを提供したいと考えています。最も適切なロードバランシング構成はどれですか？",
      "choices": [
        "Cloud DNS のジオロケーションルーティングで地域ごとに転送先を変える",
        "Global External HTTP(S) Load Balancer（Cloud Load Balancing）でマルチリージョンの Cloud Run をバックエンドとして設定する",
        "Cloud CDN のみを使ってグローバル配信を実現する",
        "各リージョンに Regional Internal HTTP(S) Load Balancer を配置する"
      ],
      "answer": [
        1
      ],
      "explanation": "Global External HTTP(S) Load Balancer はエニーキャスト IP を使ってユーザーを地理的に最も近いリージョンの Cloud Run バックエンドにルーティングします。バックエンドに Serverless NEG（Network Endpoint Group）を設定することで Cloud Run を直接バックエンドとして使用できます。Regional Internal Load Balancer は内部トラフィックのみを処理し、インターネットからのグローバルアクセスには使えません。Cloud CDN は静的コンテンツのキャッシュに特化しており、動的 API レスポンスのグローバルルーティングには不十分です。Cloud DNS のジオロケーションルーティングは DNS ベースの転送で、フェイルオーバーのレイテンシや柔軟性がロードバランサーより劣ります。"
    },
    {
      "id": "q043",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "あなたのチームは GCP 上で Kubernetes を使ってアプリをデプロイしていますが、インフラ管理の負荷を下げたいと考えています。GKE Standard と GKE Autopilot の主な違いとして最も正確な説明はどれですか？",
      "choices": [
        "GKE Autopilot はノードのプロビジョニング・スケーリング・アップグレードを Google が管理し、Pod 単位で課金される",
        "GKE Autopilot は Standard よりも常にコストが低くなる",
        "GKE Autopilot ではカスタムノードプールを自由に設定できる",
        "GKE Standard では Pod の自動スケーリングができない"
      ],
      "answer": [
        0
      ],
      "explanation": "GKE Autopilot はノードレベルのインフラ管理（プロビジョニング・パッチ適用・スケーリング・アップグレード）をすべて Google が担当し、ユーザーは Pod の定義に集中できます。課金も Pod が要求する CPU/メモリに基づく Pod 単位課金になります。選択肢C は誤りで、Autopilot ではカスタムノードプールの設定はできません（ノード管理は Google に委ねられます）。選択肢D は誤りで、GKE Standard でも Horizontal Pod Autoscaler（HPA）と Cluster Autoscaler で自動スケーリングできます。選択肢B は誤りで、常時高稼働の本番ワークロードでは GKE Standard の方がコスト効率が高い場合もあります。"
    },
    {
      "id": "q044",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "ビジネス要件として、Google Cloud 上のアプリケーションのデータを特定のリージョン（日本）にのみ保存することが求められています。Compute Engine と Cloud Storage を使用する予定です。最も確実に要件を満たす方法はどれですか？",
      "choices": [
        "組織ポリシーの constraints/gcp.resourceLocations で asia-northeast1 のみを許可する",
        "Cloud CDN のキャッシュロケーションを東京のみに設定する",
        "リソース作成時に毎回 --region=asia-northeast1 を指定するよう開発者に指示する",
        "Cloud Armor でアジア以外からのリクエストをブロックする"
      ],
      "answer": [
        0
      ],
      "explanation": "constraints/gcp.resourceLocations を使って許可するロケーションを asia-northeast1 に制限することで、その組織・フォルダー・プロジェクト配下では指定外のリージョンにリソースを作成しようとすると API レベルで拒否されます。これにより確実にデータ保存場所を制限できます。開発者への指示はヒューマンエラーの可能性があります。Cloud Armor はリクエストのフィルタリングであり、データの保存場所制御とは無関係です。Cloud CDN のキャッシュロケーション設定はコンテンツ配信の最適化であり、データ保存場所とは別の概念です。"
    },
    {
      "id": "q045",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたのチームは Google Cloud Functions（第 2 世代）を使ってイベントドリブンな処理を実装する予定です。Pub/Sub メッセージをトリガーとして 30 分かかる処理を実行する必要がある場合、考慮すべき制限として最も重要なものはどれですか？",
      "choices": [
        "Cloud Functions 第 2 世代の最大タイムアウトは 60 分（HTTP トリガーは 60 分、イベントトリガーは 10 分）である",
        "Cloud Functions 第 2 世代の最大タイムアウトは 60 分で、すべてのトリガータイプに適用される",
        "Cloud Functions 第 2 世代の最大タイムアウトは 9 分である",
        "Cloud Functions にタイムアウト制限はない"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Functions 第 2 世代の最大タイムアウトは 60 分で、HTTP トリガーおよびイベントトリガー（Pub/Sub を含む）の両方に適用されます。30 分の処理であれば Cloud Functions 第 2 世代のタイムアウト内に収まります。第 1 世代の最大タイムアウトは 9 分であり、30 分の処理には不十分でした。選択肢A はトリガータイプ別の誤った情報です。Cloud Functions にはタイムアウト制限があります（選択肢D は誤り）。なお、60 分を超える長時間処理が必要な場合は Cloud Run Jobs（最大 24 時間）の使用を検討すべきです。"
    },
    {
      "id": "q046",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "高トラフィックの e コマースサイトで、フラッシュセール時に急激なアクセス増加があります。通常時は 100 RPS、フラッシュセール時は 10,000 RPS に達します。バックエンドデータベースを守りながらスケールするアーキテクチャとして最も適切なものはどれですか？",
      "choices": [
        "複数の Cloud SQL リードレプリカを配置してすべての読み取りをリードレプリカに振り向ける",
        "Cloud Spanner をプライマリデータベースとして採用し、ノード数を増やす",
        "Memorystore（Redis）をキャッシュとして活用し、Cloud SQL の読み取り負荷を低減する",
        "Cloud SQL の CPU とメモリを最大値にアップグレードして対処する"
      ],
      "answer": [
        2
      ],
      "explanation": "Memorystore（Redis）を商品情報・カート情報などの読み取りキャッシュとして活用することで、フラッシュセール時のデータベース読み取り負荷を大幅に削減できます。キャッシュヒット率が高ければ、DB へのアクセスは一部の書き込みと キャッシュミス分のみになります。Cloud SQL の垂直スケールアップは上限があり、100x のトラフィック増加を吸収するには限界があります。Cloud Spanner は高トラフィックに対応できますが、移行コストが高く、キャッシュと組み合わせた方がより効果的です。リードレプリカのみでは 100x のスケールに対応しきれない場合があり、レプリカ追加にも遅延が生じます。"
    },
    {
      "id": "q047",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたのチームはアプリケーションのログデータを長期間（7 年間）保存して監査要件を満たす必要があります。コストを最小化するストレージ設計として最も適切なものはどれですか？",
      "choices": [
        "Cloud Storage の Archive クラスにログをエクスポートする",
        "BigQuery にログをエクスポートして長期保存する（デフォルトの保持期間設定）",
        "Cloud SQL データベースにログデータを挿入して管理する",
        "Cloud Logging のデフォルトバケットにログを保持する（デフォルトの保持期間を延長）"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Storage の Archive クラスは年 1 回以下のアクセスを想定した最安ストレージクラスです。監査ログはほとんどアクセスしないが長期保存が必要なユースケースに最適です。Cloud Logging のデフォルトバケットは保持期間の延長が可能ですが、コストが Archive より高くなります。Cloud SQL にログを保存するのはリレーショナルデータベースの用途として不適切で、スケーラビリティも低く、コストも高くなります。BigQuery へのエクスポートは分析には優れていますが、7 年間のストレージコストは Cloud Storage Archive より高くなります。"
    },
    {
      "id": "q048",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "あなたはコンテナイメージを Cloud Run にデプロイしたいと考えています。イメージは Artifact Registry に保存されています。正しいデプロイコマンドはどれですか？",
      "choices": [
        "gcloud cloud-run deploy my-service --image=asia-northeast1-docker.pkg.dev/my-project/my-repo/my-image:latest",
        "gcloud container run my-service --image=asia-northeast1-docker.pkg.dev/my-project/my-repo/my-image:latest --region=asia-northeast1",
        "gcloud run create my-service --image=asia-northeast1-docker.pkg.dev/my-project/my-repo/my-image:latest --region=asia-northeast1",
        "gcloud run deploy my-service --image=asia-northeast1-docker.pkg.dev/my-project/my-repo/my-image:latest --region=asia-northeast1"
      ],
      "answer": [
        3
      ],
      "explanation": "正しいコマンドは gcloud run deploy <SERVICE_NAME> --image=<IMAGE_URL> --region=<REGION> です。Artifact Registry のイメージ URL は <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO>/<IMAGE>:<TAG> の形式になります。選択肢A の gcloud cloud-run は存在しないコマンドグループです（gcloud run が正しいです）。選択肢B の gcloud container run も存在しません（container は GKE 関連のサブコマンドで、run とは別グループです）。選択肢C の gcloud run create は Cloud Run のサービス作成とは異なります（create サブコマンドは Cloud Run では使いません、deploy を使います）。"
    },
    {
      "id": "q049",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "あなたは GKE クラスターに新しいアプリケーションをデプロイするために Kubernetes Deployment YAML を作成しました。このファイルをクラスターに適用するコマンドはどれですか？",
      "choices": [
        "gcloud container apply -f deployment.yaml",
        "kubectl apply -f deployment.yaml",
        "kubectl deploy -f deployment.yaml",
        "kubectl create -f deployment.yaml"
      ],
      "answer": [
        1
      ],
      "explanation": "kubectl apply -f <FILE> はリソースの作成と更新の両方に対応する宣言的なコマンドです。ファイルに記述された状態にリソースを収束させます。kubectl create -f もリソースを作成しますが、既存リソースへの更新には対応していません（重複作成エラーが発生します）。apply の方が冪等性があり CI/CD パイプラインでも一般的に使用されます。kubectl deploy というサブコマンドは存在しません。gcloud container は GKE クラスター自体の管理コマンドで、Kubernetes リソースの適用には使いません。"
    },
    {
      "id": "q050",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "App Engine スタンダード環境にアプリをデプロイしたいと考えています。デプロイコマンドとして正しいものはどれですか？",
      "choices": [
        "gcloud deploy app --config=app.yaml",
        "gcloud appengine deploy app.yaml",
        "gcloud run deploy --config=app.yaml",
        "gcloud app deploy app.yaml"
      ],
      "answer": [
        3
      ],
      "explanation": "gcloud app deploy app.yaml が App Engine へのデプロイコマンドです。app.yaml はサービスのランタイム・スケーリング設定・環境変数などを定義するファイルです。gcloud appengine というサブコマンドグループは存在しません（gcloud app が正しいサブグループです）。gcloud deploy は Cloud Deploy（デプロイパイプライン）サービスのコマンドで、App Engine への直接デプロイには使いません。gcloud run deploy は Cloud Run へのデプロイコマンドであり、App Engine とは別サービスです。"
    },
    {
      "id": "q051",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Functions（第 1 世代）を Cloud Storage バケットへのファイルアップロードをトリガーとして Python 3.9 でデプロイしたいと考えています。正しいコマンドはどれですか？",
      "choices": [
        "gcloud run deploy my-function --trigger-bucket=my-bucket --runtime=python39",
        "gcloud functions deploy my-function --runtime=python39 --trigger-event=google.storage.object.finalize --trigger-resource=my-bucket --entry-point=process_file",
        "gcloud functions create my-function --runtime=python39 --trigger-bucket=my-bucket",
        "gcloud functions deploy my-function --runtime=python39 --trigger-bucket=my-bucket --entry-point=process_file"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Functions でストレージトリガーを設定するには、--trigger-event と --trigger-resource を組み合わせます。google.storage.object.finalize はオブジェクトのアップロード（作成・上書き）をトリガーするイベントです。--trigger-bucket は第 1 世代で使用できる省略記法ですが、より明示的な --trigger-event + --trigger-resource が確実です。選択肢D の --trigger-bucket 構文自体は動作しますが、--entry-point との組み合わせが現行の正式な形式ではありません。選択肢C は deploy ではなく create と誤っています（正しくは deploy）。選択肢A は Cloud Run のコマンドで、Cloud Functions には使えません。"
    },
    {
      "id": "q052",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "GKE クラスターでデプロイしたアプリの Pod が CrashLoopBackOff 状態になっています。原因を調査するために最初に実行すべきコマンドはどれですか？",
      "choices": [
        "kubectl exec -it <POD_NAME> -- /bin/sh",
        "kubectl get pod <POD_NAME> -o wide",
        "kubectl logs <POD_NAME> --previous",
        "kubectl describe pod <POD_NAME>"
      ],
      "answer": [
        2
      ],
      "explanation": "CrashLoopBackOff は Pod が起動直後にクラッシュして再起動を繰り返す状態です。最初にすべきことはクラッシュした直前のコンテナのログを確認することで、kubectl logs <POD_NAME> --previous（または -p）で前回のコンテナ起動時のログを取得できます。kubectl describe pod はイベント情報や設定の詳細を見るのに有効ですが、アプリのクラッシュ原因はログで確認します。kubectl get pod -o wide はノード情報などを表示しますが、クラッシュ原因の特定には不十分です。kubectl exec は Pod が正常に起動していないと実行できません。"
    },
    {
      "id": "q053",
      "type": "multiple",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "GKE に Node.js アプリをデプロイする際に必要な手順を 2 つ選択してください。",
      "choices": [
        "Deployment と Service の Kubernetes マニフェスト YAML を作成して kubectl apply で適用する",
        "Node.js を GKE のすべてのノードに直接インストールする",
        "GKE クラスターに App Engine のランタイムをインストールする",
        "Dockerfile を作成してコンテナイメージをビルドし、Artifact Registry にプッシュする"
      ],
      "answer": [
        0,
        3
      ],
      "explanation": "GKE への Node.js アプリデプロイには、まず Dockerfile でコンテナイメージをビルドして Artifact Registry（または Container Registry）にプッシュし（手順1）、次に Deployment マニフェスト（Pod のテンプレート・レプリカ数等）と Service マニフェスト（ロードバランサーや ClusterIP）を YAML で定義して kubectl apply で適用します（手順2）。ノードへの Node.js の直接インストールは不要で、コンテナ内にすべての依存関係が含まれます。GKE は Kubernetes エンジンであり、App Engine のランタイムとは独立したサービスです。"
    },
    {
      "id": "q054",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Terraform を使って Google Cloud リソースを管理しています。既存の Compute Engine インスタンスの設定を変更した後、実際に変更を適用する前に何が変わるかを確認したいと考えています。最も適切なコマンドはどれですか？",
      "choices": [
        "terraform check",
        "terraform validate",
        "terraform plan",
        "terraform apply --dry-run"
      ],
      "answer": [
        2
      ],
      "explanation": "terraform plan は現在の Terraform 設定と実際のインフラの状態を比較し、実際に変更を適用することなく、追加・変更・削除されるリソースの一覧を表示します。CI/CD パイプラインや本番変更前の確認に必須のコマンドです。terraform validate は設定ファイルの構文チェックを行いますが、実際のリソース状態との差分は表示しません。terraform apply --dry-run オプションは存在しません（terraform plan が相当します）。terraform check は存在しないコマンドです。"
    },
    {
      "id": "q055",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "本番 GKE クラスターで実行中のアプリを停止なしにアップデートしたいと考えています。新バージョンを段階的にロールアウトし、問題があればすぐに前バージョンに戻せるようにしたいです。最も適切なデプロイ戦略はどれですか？",
      "choices": [
        "Recreate デプロイ（全 Pod を一度削除して新バージョンを起動）",
        "RollingUpdate デプロイ（Kubernetes のデフォルト戦略）",
        "Canary デプロイ（新バージョンの Pod を少数起動し、段階的にトラフィックを移行）",
        "Blue/Green デプロイ（新バージョンを別クラスターに立てて DNS を切り替え）"
      ],
      "answer": [
        2
      ],
      "explanation": "Canary デプロイは新バージョンの Pod を少数（例：5〜10%）だけ起動し、問題がなければ段階的にトラフィックを増やしていく手法です。問題が発生した場合はすぐに新バージョンの Pod を削除して旧バージョンに戻せます。「段階的なロールアウト＋素早いロールバック」の両方を実現できます。Recreate デプロイは全 Pod を一度削除するためダウンタイムが発生します。RollingUpdate はダウンタイムなしで更新できますが、問題発生時のロールバックは Canary ほど素早くありません。Blue/Green は別クラスターが必要でリソースコストが高く、DNS 切り替えには伝播遅延が生じます。"
    },
    {
      "id": "q056",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Compute Engine インスタンスに Docker コンテナをデプロイしたいと考えています。インスタンスの起動時に自動的にコンテナを実行させる最も簡単な方法はどれですか？",
      "choices": [
        "Compute Engine インスタンスに Cloud Run をインストールして実行する",
        "VM 内に Kubernetes をマニュアルインストールして Pod を起動する",
        "Container-Optimized OS を使用してコンテナイメージを指定するインスタンスを作成する",
        "起動スクリプトで docker run コマンドを実行する"
      ],
      "answer": [
        2
      ],
      "explanation": "Container-Optimized OS（COS）はコンテナワークロード向けに最適化された Google のマネージド OS で、インスタンス作成時に --container フラグでコンテナイメージを指定するだけで自動的にコンテナが起動します。起動スクリプトで docker run を書く方法も動作しますが、COS の方が設定が簡単で OS の管理も最小限です。Cloud Run は Compute Engine とは独立したサーバーレスサービスで、VM にインストールするものではありません。Kubernetes のマニュアルインストールは複雑で、単純なコンテナ実行のためには過剰な作業です。"
    },
    {
      "id": "q057",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "Google Cloud で Deployment Manager を使ってリソースをプロビジョニングする際の説明として正しいものはどれですか？",
      "choices": [
        "Deployment Manager は Google Cloud 以外のクラウドプロバイダーにもリソースを作成できる",
        "Deployment Manager は Terraform と同様に YAML/Jinja2 または Python テンプレートで Google Cloud リソースを宣言的に管理する",
        "Deployment Manager はコンテナのデプロイのみに対応している",
        "Deployment Manager を使うと Cloud Console でのリソース変更が自動的に無効化される"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Deployment Manager は YAML、Jinja2、または Python を使って Google Cloud リソースを宣言的に定義・デプロイ・管理するサービスです。Terraform に相当するが Google Cloud 専用の IaC ツールです。Deployment Manager は Compute Engine・GKE・Cloud Storage・Networking など多数の Google Cloud リソースに対応しており、コンテナデプロイに限定されません。他のクラウドプロバイダーへのデプロイはサポートされていません（それは Terraform の強みです）。Deployment Manager を使ってもコンソールでのリソース変更は引き続き可能ですが、テンプレート外で変更するとドリフト（設定の乖離）が発生します。"
    },
    {
      "id": "q058",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "あなたのチームは Cloud Run にデプロイした API のバージョン管理を行いたいと考えています。新バージョンをデプロイしつつ、既存のトラフィックの 10% だけを新バージョンに向けてテストするためのコマンドはどれですか？",
      "choices": [
        "gcloud run revisions update my-service --split-traffic=10",
        "gcloud run services set-iam-policy my-service --traffic-percent=10",
        "gcloud run services update-traffic my-service --to-revisions=NEW_REVISION=10",
        "gcloud run deploy my-service --traffic=10%"
      ],
      "answer": [
        2
      ],
      "explanation": "gcloud run services update-traffic <SERVICE> --to-revisions=<REVISION>=<PERCENT> コマンドで Cloud Run サービスのリビジョンごとのトラフィック分割を設定できます。例えば --to-revisions=my-service-v2=10,my-service-v1=90 とすると、新バージョンに 10%、旧バージョンに 90% のトラフィックを振り分けられます。これが Canary リリースの実装に使用します。選択肢D は gcloud run deploy にトラフィック比率を直接指定する構文で、デプロイとトラフィック割り当てを同時に行う場合の方法ですが、既存のリビジョンへの配分変更には update-traffic を使います。選択肢A の gcloud run revisions update、選択肢B の set-iam-policy はトラフィック制御には使いません。"
    },
    {
      "id": "q059",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Source Repositories にコードがあります。コードが更新されるたびに自動的にビルドして GKE にデプロイするパイプラインを最も少ない設定で構築したいと考えています。最適なサービスの組み合わせはどれですか？",
      "choices": [
        "GitHub Actions → Cloud Run → GKE",
        "Jenkins（GCE 上）→ Artifact Registry → GKE",
        "Cloud Scheduler → Cloud Functions → GKE",
        "Cloud Build（トリガー設定）→ Artifact Registry → GKE"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Build はフルマネージドの CI/CD ビルドサービスで、Cloud Source Repositories（または GitHub/Bitbucket）のブランチやタグへのプッシュをトリガーに自動ビルドを実行できます。cloudbuild.yaml にビルド→コンテナイメージ作成→Artifact Registry プッシュ→GKE へのデプロイ（kubectl apply）のステップを定義するだけで完結します。Jenkins は自分でインスタンスを管理する必要があり、設定コストが高いです。GitHub Actions と Cloud Run の組み合わせは Cloud Source Repositories を使っている場合には余計なサービスを介します。Cloud Scheduler + Cloud Functions はイベントドリブンなデプロイには不向きです。"
    },
    {
      "id": "q060",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Compute Engine で GPU を使用する機械学習ワークロードを実行したいと考えています。GPU インスタンスを作成するための gcloud コマンドで正しいものはどれですか？",
      "choices": [
        "gcloud compute instances create gpu-vm --accelerator=nvidia-t4 --restart-on-failure=false",
        "gcloud compute instances create gpu-vm --add-gpu=nvidia-tesla-t4:1",
        "gcloud compute instances create gpu-vm --gpu-type=nvidia-tesla-t4 --gpu-count=1",
        "gcloud compute instances create gpu-vm --machine-type=n1-standard-4 --accelerator=type=nvidia-tesla-t4,count=1 --maintenance-policy=TERMINATE"
      ],
      "answer": [
        3
      ],
      "explanation": "GPU を使用する Compute Engine インスタンスの作成には --accelerator=type=<GPU_TYPE>,count=<N> フラグを使います。また、GPU を使用するインスタンスは --maintenance-policy=TERMINATE の設定が必要です（ライブマイグレーション非対応のため）。インスタンスの再起動が必要な場合は --restart-on-failure=true（デフォルト）を設定します。選択肢C の --gpu-type と --gpu-count フラグは存在しません。選択肢A の --accelerator=nvidia-t4 は GPU タイプの指定形式が誤りで、nvidia-tesla-t4 が正しい識別子です。選択肢B の --add-gpu フラグも存在しません。"
    },
    {
      "id": "q061",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE クラスターで動作するアプリケーションが Cloud SQL に接続する必要があります。最も安全にデータベース認証情報を提供する方法はどれですか？",
      "choices": [
        "データベースの認証情報をコンテナイメージに埋め込む",
        "データベースの認証情報を ConfigMap に保存して Pod からマウントする",
        "データベースのパスワードを環境変数として Pod の spec に直接記述する",
        "Cloud SQL Auth Proxy をサイドカーコンテナとして使用し、Workload Identity でサービスアカウントを紐付ける"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud SQL Auth Proxy を Pod のサイドカーコンテナとして実行し、Workload Identity を使って GKE の Kubernetes Service Account と Google Cloud の Service Account を紐付ける方法が最もセキュアです。アプリはサイドカー経由でデータベースに接続し、パスワード不要で IAM 認証が使用されます。秘密情報がコードやマニフェストに残りません。環境変数への直接記述は Kubernetes API を読める人が全員パスワードを確認できてしまいます。ConfigMap は暗号化されておらず認証情報の保存に不適切です（Secret を使うべきですが、それでも Workload Identity の方が安全です）。コンテナイメージへの埋め込みはセキュリティ上の最悪の選択です。"
    },
    {
      "id": "q062",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "あなたは Cloud Run サービスを VPC 内のプライベートリソース（Cloud SQL、Memorystore など）にアクセスさせたいと考えています。最も適切な設定はどれですか？",
      "choices": [
        "Cloud Run に Cloud Armor ポリシーを設定してプライベートアクセスを許可する",
        "Cloud Run のエグレスを Cloud NAT 経由にする",
        "Cloud Run に VPC コネクター（Serverless VPC Access）を設定する",
        "Cloud Run のサービスアカウントに roles/compute.networkUser を付与する"
      ],
      "answer": [
        2
      ],
      "explanation": "Serverless VPC Access（VPC コネクター）を設定することで、Cloud Run サービスからプライベート VPC ネットワーク内のリソース（Cloud SQL プライベート IP、Memorystore、GCE VM など）にアクセスできます。--vpc-connector フラグでコネクターを指定します。roles/compute.networkUser は Compute Engine のネットワークへのアクセス権限設定で、Cloud Run の VPC 接続を直接制御するものではありません。Cloud Armor はウェブアプリの DDoS 保護・WAF 機能を提供するもので、プライベートリソースへのアクセス設定とは無関係です。Cloud NAT はプライベート VM からインターネットへの外部通信に使用するもので、VPC 内リソースへのアクセスには不要です。"
    },
    {
      "id": "q063",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "Google Cloud で Compute Engine インスタンスのスナップショットを取得するためのコマンドはどれですか？",
      "choices": [
        "gcloud compute instances snapshot my-instance --zone=asia-northeast1-a",
        "gcloud compute disks snapshot my-disk --snapshot-names=my-snapshot --zone=asia-northeast1-a",
        "gcloud storage snapshots create my-snapshot --disk=my-disk",
        "gcloud compute snapshots create my-snapshot --source-disk=my-disk --zone=asia-northeast1-a"
      ],
      "answer": [
        1
      ],
      "explanation": "Compute Engine のスナップショットはディスクに対して作成します。gcloud compute disks snapshot <DISK_NAME> --snapshot-names=<SNAPSHOT_NAME> --zone=<ZONE> が正しい構文です。選択肢D の gcloud compute snapshots create も有効な代替コマンドですが、--source-disk と --zone が必要で、選択肢B の形式の方が一般的に使用されます。選択肢A の gcloud compute instances snapshot は存在しないサブコマンドです（スナップショットはインスタンスではなくディスクに対して行います）。選択肢C の gcloud storage snapshots は Cloud Storage のコマンドグループで、Compute Engine ディスクとは無関係です。"
    },
    {
      "id": "q064",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "GKE クラスターで複数のチームが同じクラスターを共有しています。各チームのリソース使用量を制限し、他チームのリソースを使い切らないようにしたいと考えています。最も適切なアプローチはどれですか？",
      "choices": [
        "Namespace を使ってチームを分離し、ResourceQuota と LimitRange を設定する",
        "各チームに別個の GKE クラスターを作成する",
        "GKE Node Auto Provisioning で自動的にリソースを調整する",
        "各 Pod に Resource Requests と Limits を手動で設定するよう開発者に指示する"
      ],
      "answer": [
        0
      ],
      "explanation": "Kubernetes の Namespace はチームやプロジェクト間の論理的な分離に使用します。ResourceQuota でネームスペース全体の CPU・メモリ・Pod 数などの上限を設定し、LimitRange で個別コンテナのデフォルト値と上限を設定することで、1 チームがクラスター全体のリソースを使い切ることを防げます。別個クラスターの作成はリソース効率が低下しコストが増加します。開発者への手動設定指示はヒューマンエラーの余地があります。Node Auto Provisioning はリソース需要に応じたノード自動追加で、リソース制限ではありません。"
    },
    {
      "id": "q065",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "Cloud Build で CI/CD パイプラインを実装しています。ビルド中に Artifact Registry への Docker イメージプッシュが必要ですが、認証情報の管理を最もセキュアに行う方法はどれですか？",
      "choices": [
        "Docker Hub の認証情報を Cloud Build のビルドステップの環境変数に設定する",
        "cloudbuild.yaml 内に docker login コマンドとパスワードを記述する",
        "Secret Manager に認証情報を保存して Cloud Build からアクセスする",
        "Cloud Build のサービスアカウントに roles/artifactregistry.writer を付与する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Build はデフォルトのサービスアカウント（[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com）を使用します。このサービスアカウントに roles/artifactregistry.writer を付与することで、docker login なしに Artifact Registry へのプッシュが可能です。Cloud Build のビルドステップは自動的に gcloud の認証を引き継ぐため、明示的な認証情報の管理が不要です。Docker Hub の認証情報を環境変数に設定すると、ログに漏洩するリスクがあります。cloudbuild.yaml にパスワードを記述するのは最悪のセキュリティプラクティスです。Secret Manager の使用は有効ですが、サービスアカウントへのロール付与の方がより簡潔でセキュアです。"
    },
    {
      "id": "q066",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "App Engine にデプロイしたアプリの新バージョンをテストした後、すべてのトラフィックを新バージョンに移行したいと考えています。コマンドとして正しいものはどれですか？",
      "choices": [
        "gcloud app versions migrate <VERSION>",
        "gcloud app services set-traffic default --splits <VERSION>=1",
        "gcloud app deploy --promote --version=<VERSION>",
        "gcloud app update --traffic-split=<VERSION>:100"
      ],
      "answer": [
        1
      ],
      "explanation": "gcloud app services set-traffic <SERVICE> --splits <VERSION>=1 コマンドで指定サービス（デフォルトは default）のトラフィックを特定バージョンに 100% 移行できます。複数バージョンに分割する場合は --splits v1=0.9,v2=0.1 のように指定します。gcloud app versions migrate も有効なコマンドで特定バージョンへのトラフィック移行を行いますが、--splits を使う方法がより一般的です。gcloud app deploy --promote は新規デプロイ時に同時にトラフィックを移行するオプションで、既存バージョンへの切り替えには使いません。gcloud app update は存在しないコマンドです。"
    },
    {
      "id": "q067",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE クラスターで HorizontalPodAutoscaler（HPA）を設定したアプリが、CPU 使用率が低いにもかかわらずスケールダウンしません。考えられる原因として最も可能性の高いものはどれですか？",
      "choices": [
        "HPA が Metrics Server と接続できていない",
        "Pod の minReplicas 設定の値まで既にスケールダウンされている",
        "Deployment の replicas の値が HPA の maxReplicas より大きい",
        "HPA に cooldown/stabilization 期間が設定されており、その期間内である"
      ],
      "answer": [
        1
      ],
      "explanation": "HPA の minReplicas で設定した最小 Pod 数以下にはスケールダウンできません。CPU 使用率が低くても minReplicas の値まで削減されたらそれ以上は減りません。これが最も一般的な「スケールダウンしない」原因です。Metrics Server との接続問題は HPA がメトリクスを取得できなくなり、エラーイベントが発生します。cooldown/stabilization 期間は一時的なスケールダウン遅延で、期間が過ぎれば解消します。Deployment の replicas が HPA の maxReplicas より大きい場合は、HPA が管理を引き継いだ時点で maxReplicas に削減されます（スケールダウンしない理由にはなりません）。"
    },
    {
      "id": "q068",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Functions でサードパーティ API のキーを安全に使用したいと考えています。最も安全な方法はどれですか？",
      "choices": [
        "API キーを Cloud Functions のソースコードにハードコードする",
        "API キーを Cloud Storage バケットのプライベートファイルに保存し、Cloud Functions が読み取る",
        "API キーを環境変数として Cloud Functions の設定に設定する",
        "API キーを Secret Manager に保存し、Cloud Functions から実行時に取得する"
      ],
      "answer": [
        3
      ],
      "explanation": "Secret Manager を使うと、API キーなどの秘密情報をバージョン管理された暗号化ストレージに保存でき、Cloud Functions の実行時に IAM 権限を使って安全に取得できます。アクセスログが記録されるため、誰がいつシークレットを取得したかも追跡できます。ソースコードへのハードコードは最悪のプラクティスでリポジトリに漏洩するリスクがあります。環境変数への設定は Cloud Console から確認できてしまうため、Secret Manager より安全性が低いです。Cloud Storage のファイルは IAM 権限で保護できますが、バージョン管理やローテーション機能、監査ログが Secret Manager ほど充実していません。"
    },
    {
      "id": "q069",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "Cloud Run サービスに環境変数を設定してデプロイするコマンドとして正しいものはどれですか？",
      "choices": [
        "gcloud run deploy my-service --image=gcr.io/my-project/my-image --config=KEY=VALUE",
        "gcloud run services update my-service --environment=KEY=VALUE",
        "gcloud run deploy my-service --image=gcr.io/my-project/my-image --set-env-vars=KEY=VALUE",
        "gcloud run deploy my-service --image=gcr.io/my-project/my-image --env=KEY=VALUE"
      ],
      "answer": [
        2
      ],
      "explanation": "gcloud run deploy における環境変数の設定フラグは --set-env-vars=KEY=VALUE です。複数設定する場合は --set-env-vars=KEY1=VAL1,KEY2=VAL2 のようにカンマ区切りで指定します。--env というフラグは Cloud Run のデプロイコマンドには存在しません。gcloud run services update コマンドで更新する場合は --set-env-vars または --update-env-vars フラグを使います（--environment は誤りです）。--config フラグも Cloud Run では使用しません。"
    },
    {
      "id": "q070",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE クラスターにデプロイしたアプリが特定の Node Pool 上でのみ実行されるよう制御したいと考えています。最も適切な Kubernetes の機能はどれですか？",
      "choices": [
        "Node Selector または Node Affinity でラベルが付いた特定ノードにのみスケジュールするよう設定する",
        "Kubernetes NetworkPolicy で特定ノードへの通信を制限する",
        "DaemonSet を使って各ノードに 1 つの Pod を配置する",
        "Pod Affinity ルールで同じ Node Pool の Pod に近づけるように設定する"
      ],
      "answer": [
        0
      ],
      "explanation": "Node Selector は Pod の spec に nodeSelector フィールドで特定のノードラベルを指定し、そのラベルを持つノードにのみ Pod をスケジュールします。GKE ではノードプールに自動的にラベルが付与されるため、cloud.google.com/gke-nodepool: <POOL_NAME> を nodeSelector に指定することで特定ノードプールに制限できます。Node Affinity はより柔軟な条件指定が可能で、required/preferred の区別もできます。Pod Affinity は他の Pod との位置関係を制御するもので、特定ノードへの制限には使いません。NetworkPolicy はネットワーク通信の制御でスケジューリングとは無関係です。DaemonSet は全ノードに Pod を配置するオブジェクトで、特定ノードへの制限とは逆方向の設定です。"
    },
    {
      "id": "q071",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Storage バケットにファイルが追加されるたびに Cloud Functions を自動的にトリガーしたいと考えています。Cloud Functions 第 2 世代を使った場合の設定として正しいものはどれですか？",
      "choices": [
        "Cloud Storage バケットの変更通知を手動でポーリングするコードを Cloud Functions に書く",
        "Cloud Pub/Sub で Cloud Storage の通知を受け取り、Cloud Functions のプッシュサブスクリプションとして接続する",
        "Cloud Storage のトリガーを直接設定し、google.cloud.storage.object.v1.finalized イベントタイプを使用する",
        "Cloud Scheduler を使って定期的に Cloud Storage を確認するジョブを設定する"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Functions 第 2 世代では、Eventarc を通じてCloud Storage のイベントを直接トリガーとして設定できます。google.cloud.storage.object.v1.finalized はオブジェクトの作成・確定完了イベントです（第 1 世代の google.storage.object.finalize に相当）。Cloud Scheduler を使ったポーリングは常時の変更検知には遅延が生じます。手動ポーリングはポーリングコストと実装の複雑さが増します。Cloud Pub/Sub 経由の設定（選択肢B）も動作しますが、第 2 世代では Eventarc から直接トリガー設定できるためより簡潔です。"
    },
    {
      "id": "q072",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "あなたの会社は Google Cloud Marketplace から Bitnami の WordPress をデプロイしました。デプロイ後に問題が発生し、デプロイを削除したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "gcloud deployment-manager deployments delete <DEPLOYMENT_NAME> コマンドを実行する",
        "各リソース（VM・ディスク・ネットワーク）を個別に Cloud Console から手動削除する",
        "プロジェクト全体を削除して再作成する",
        "Cloud Console の Deployment Manager でデプロイを削除する"
      ],
      "answer": [
        0
      ],
      "explanation": "Google Cloud Marketplace からのデプロイは Deployment Manager によって管理されています。gcloud deployment-manager deployments delete <DEPLOYMENT_NAME> コマンドで関連するすべてのリソース（VM・ディスク・ネットワーク・ファイアウォールルールなど）を一括削除できます。これが最も確実で完全な方法です。Cloud Console の Deployment Manager UI からも同様の操作ができます（選択肢D）が、コマンドの方が確実で自動化しやすいです。個別リソースの手動削除は見落としが発生しやすく、依存関係のエラーが出る場合があります。プロジェクト削除は他のリソースも含めて削除されてしまいます。"
    },
    {
      "id": "q073",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "GKE クラスター上のアプリが断続的にクラッシュしています。Cloud Logging でアプリのエラーログを確認したいと考えています。特定のサービス名（my-service）のログのみをフィルタリングするクエリとして正しいものはどれですか？",
      "choices": [
        "service.name=\"my-service\" AND log.level=\"error\"",
        "logName=\"my-service\" AND severity=\"ERROR\"",
        "resource.type=\"k8s_container\" AND resource.labels.container_name=\"my-service\"",
        "container.name=\"my-service\" AND error=true"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Logging の GKE コンテナログは resource.type=\"k8s_container\" で識別され、resource.labels.container_name、resource.labels.pod_name、resource.labels.namespace_name などのラベルでフィルタリングできます。エラーに絞る場合は AND severity>=\"ERROR\" を追加します。logName はログバケットやログシンクのパスを指定するフィールドで、サービス名ではありません。service.name は Cloud Logging のクエリ言語では標準的なフィールドとして機能しません。container.name や error=true という構文は Cloud Logging のフィルタ構文として存在しません。"
    },
    {
      "id": "q074",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "easy",
      "question": "Cloud Monitoring で GCE インスタンスの CPU 使用率が 80% を超えた場合に通知を受け取りたいと考えています。設定する必要があるリソースとして正しいものはどれですか？",
      "choices": [
        "Cloud Profiler のプロファイルアラート",
        "Cloud Logging のシンクとアラートポリシー",
        "Cloud Trace のレイテンシしきい値と通知",
        "Cloud Monitoring のアラートポリシーと通知チャネル"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Monitoring でアラートを設定するには、アラートポリシー（条件：CPU 使用率 > 80% が N 分間継続）と通知チャネル（メール・PagerDuty・Slack・Pub/Sub など）を設定します。Cloud Logging のシンクはログのエクスポートに使用するもので、メトリクスベースのアラートには使いません（ただしログベースのメトリクスを作成してアラートする方法はあります）。Cloud Trace はアプリのリクエストトレース・レイテンシ分析ツールで、インフラのCPU監視には使いません。Cloud Profiler はアプリのパフォーマンスプロファイリングで、CPU 使用率しきい値の通知機能はありません。"
    },
    {
      "id": "q075",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "本番環境の GKE クラスターで動作しているアプリの応答遅延が発生しています。アプリのどのコードパスで時間がかかっているかを調査するために最も適切なツールはどれですか？",
      "choices": [
        "Cloud Monitoring",
        "Cloud Profiler",
        "Cloud Trace",
        "Cloud Logging"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Trace は分散トレーシングサービスで、リクエストがアプリの各コンポーネント（サービス・データベース・外部 API など）をどれだけの時間をかけて通過したかを可視化します。レイテンシのボトルネックを特定するのに最適です。Cloud Logging はログデータの収集・検索に使用しますが、リクエストのトレースには向いていません。Cloud Monitoring はメトリクスの監視・アラートに使用し、コードパスの詳細分析はできません。Cloud Profiler は CPU やメモリの使用パターンをコードレベルで分析しますが、特定リクエストのレイテンシパスを追跡するのは Cloud Trace の役割です。"
    },
    {
      "id": "q076",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Logging のログを BigQuery にエクスポートして長期保存と分析を行いたいと考えています。設定すべきリソースはどれですか？",
      "choices": [
        "Cloud Logging のログシンク（Log Sink）を BigQuery データセットに向けて設定する",
        "Cloud Functions でログストリームを受信して BigQuery に挿入する",
        "Dataflow パイプラインで Logging のログを BigQuery に転送する",
        "Cloud Scheduler で定期的に Logging API を呼び出して BigQuery に書き込む"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Logging のログシンク機能を使うと、フィルター条件に一致するログを BigQuery・Cloud Storage・Cloud Pub/Sub・Splunk などの宛先にリアルタイムでエクスポートできます。設定は Cloud Console の Logging > ログルーターから数クリックで完了し、継続的なエクスポートが自動化されます。Cloud Scheduler + Logging API でのバッチエクスポートは遅延が生じ、設定が複雑です。Cloud Functions でのストリーム処理は技術的には可能ですが、ログシンクの方が圧倒的に簡単です。Dataflow パイプラインも可能ですが、シンプルなログエクスポートには過剰な構成です。"
    },
    {
      "id": "q077",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "本番環境の GKE クラスターで特定の Pod が OOMKilled（メモリ不足でカーネルにより強制終了）されています。再発防止のために最初に設定すべきことはどれですか？",
      "choices": [
        "Pod の Deployment に resources.limits.memory を適切な値に設定する",
        "Pod の Deployment に resources.requests.memory のみを設定する",
        "ノードのマシンタイプを大きくして総メモリ量を増やす",
        "GKE Autopilot に移行してメモリ管理を自動化する"
      ],
      "answer": [
        0
      ],
      "explanation": "OOMKilled はコンテナが設定した memory limit を超えたためカーネルに強制終了された状態です。resources.limits.memory を現在の実際のメモリ使用量に対して適切な余裕を持った値に設定（または修正）することで、予期しない OOM を防ぐか、または設定値を増やすことで正常に動作させられます。まず Cloud Monitoring でコンテナの実際のメモリ使用量を確認して適切な limit 値を判断します。ノードのマシンタイプ変更は根本原因の特定前に行う処置として適切ではありません。GKE Autopilot への移行は大きな変更で、まず limit の設定が先です。requests のみの設定では limit が設定されないため OOMKilled の防止になりません。"
    },
    {
      "id": "q078",
      "type": "multiple",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Monitoring を使ってアプリケーションの SLI（サービスレベル指標）を設定する際に推奨されるメトリクスを 2 つ選択してください。",
      "choices": [
        "HTTP リクエストの成功率（4xx/5xx エラー以外のレスポンス割合）",
        "VM インスタンスの起動回数",
        "Cloud Billing の 1 ヶ月の合計費用",
        "リクエストのレイテンシ（p99 応答時間）"
      ],
      "answer": [
        0,
        3
      ],
      "explanation": "可用性 SLI として HTTP 成功率（エラー率の逆数）は最も基本的な指標で、ユーザーが正常にサービスを利用できているかを測ります（選択肢A）。レイテンシ SLI としてリクエストの p99 応答時間はユーザー体験を反映する重要な指標です（選択肢D）。Cloud Billing の費用（選択肢C）はビジネス指標ではありますが、SLI（サービスの品質指標）としては使いません。VM の起動回数（選択肢B）は運用イベントの記録ですが、ユーザーが体験するサービス品質の指標ではありません。"
    },
    {
      "id": "q079",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "GKE クラスターのノードが定期的にアップグレードされるようにしたいと考えています。Google がノードのアップグレードを自動的に管理するための最も適切な設定はどれですか？",
      "choices": [
        "Cloud Scheduler で定期的にノードプールを削除・再作成するスクリプトを実行する",
        "手動で kubectl drain を実行して古いノードを削除し、新しいノードを追加する",
        "GKE のノードプールでリリースチャンネル（Release Channel）を設定し、自動アップグレードを有効にする",
        "Terraform で定期的にクラスターを再作成する"
      ],
      "answer": [
        2
      ],
      "explanation": "GKE のリリースチャンネル（Rapid/Regular/Stable）に登録し、ノードプールの自動アップグレードを有効にすることで、Google が自動的にノードのバージョンアップとローリングアップグレードを管理します。手動での drain/削除/追加は作業コストが高く、ヒューマンエラーのリスクがあります。Cloud Scheduler でノードプールを定期削除・再作成するのはサービスへの影響が大きく、推奨されません。Terraform での再作成も同様に運用負荷が高く、GKE の組み込み機能を活用する方が効率的です。"
    },
    {
      "id": "q080",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "本番環境の Cloud SQL for MySQL インスタンスで、定期バックアップと障害時の復旧 RTO を最小化したいと考えています。最も適切な構成はどれですか？",
      "choices": [
        "Cloud SQL のリードレプリカを複数リージョンに設定する",
        "Cloud SQL の自動バックアップを有効にし、高可用性（HA）構成でフェイルオーバーレプリカを設定する",
        "Cloud SQL インスタンスのマシンタイプを最大スペックにアップグレードする",
        "毎日手動でデータをエクスポートして Cloud Storage に保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud SQL の自動バックアップを有効にすると、日次のスナップショットと継続的なバイナリログが保存されます。高可用性（HA）構成では、同一リージョン内の別ゾーンにフェイルオーバーレプリカが自動作成され、プライマリ障害時に 60 秒以内（目安）でフェイルオーバーが完了します。RTO を最小化するには自動バックアップ+HAの組み合わせが最適です。手動エクスポートは運用負荷が高く、障害発生時の RPO（データ消失許容時間）も長くなります。リードレプリカは読み取りのスケールアウトとクロスリージョン災害対策には有効ですが、単独では自動フェイルオーバーはしません。マシンタイプのアップグレードは可用性向上とは無関係です。"
    },
    {
      "id": "q081",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "開発チームが Cloud Monitoring でカスタムダッシュボードを作成しました。このダッシュボードをチーム全員が閲覧できるようにしたいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "ダッシュボードの URL を Slack でシェアする",
        "ダッシュボードを共有設定（share）してリンクを公開する",
        "ダッシュボードをスクリーンショットして毎日メールで送る",
        "チームメンバーに roles/monitoring.viewer を付与してダッシュボードへのアクセスを許可する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Monitoring のダッシュボードはプロジェクトレベルのリソースで、IAM でアクセス制御されています。チームメンバーに roles/monitoring.viewer を付与することで、ダッシュボードの閲覧権限を適切に管理できます。ダッシュボードの URL シェアはアクセス権がなければ閲覧できません。Cloud Monitoring に「パブリックシェア」機能はなく、ダッシュボードリンクを公開する選択肢は存在しません。スクリーンショットのメール送信は最新情報が反映されず、運用として非現実的です。"
    },
    {
      "id": "q082",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Run サービスに外部からのヘルスチェックリクエストが届いていることを確認したいと考えています。また、アプリの問題を検知した際に自動的に再起動させたいです。最も適切な設定はどれですか？",
      "choices": [
        "Compute Engine インスタンスからヘルスチェックスクリプトを実行する",
        "Cloud Monitoring のアップタイムチェックを設定し、サービスの HTTP エンドポイントを監視する",
        "Cloud Run の Liveness Probe を設定して異常を検知した際に自動再起動する",
        "Cloud Scheduler でヘルスチェックエンドポイントを定期的に呼び出す"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Run は Startup Probe・Liveness Probe・Readiness Probe をサポートしています。Liveness Probe は実行中のコンテナが正常に動作しているかチェックし、失敗した場合にコンテナを自動的に再起動します。アプリのデッドロックや無限ループなどの異常を検知して自動回復する際に有効です。Cloud Monitoring のアップタイムチェックは外部からのエンドポイント監視でアラートは発行できますが、自動再起動はできません。Cloud Scheduler はイベントトリガーのジョブスケジューリングで、コンテナのヘルス管理には使いません。Compute Engine からのヘルスチェックは構成が複雑で不要です。"
    },
    {
      "id": "q083",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "Cloud Logging で特定のエラーパターンが検出されたときに自動的にインシデントチケットを作成したいと考えています。最もアーキテクチャがシンプルな構成はどれですか？",
      "choices": [
        "Cloud Monitoring でログベースのアラートを作成し、アラート通知を webhook で外部システムに送信する",
        "Cloud Logging のログシンクで Pub/Sub に転送 → Cloud Functions でチケット作成 API を呼び出す",
        "Cloud Scheduler で定期的に Logging API からログをフェッチして処理する",
        "BigQuery にログをエクスポートして定期スキャンでエラーを検出する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Monitoring でログベースのメトリクスを作成し、そのメトリクスに対してアラートポリシーを設定すると、条件達成時に通知チャネル（PagerDuty・Webhook・Pub/Sub など）に自動通知できます。多くのインシデント管理ツール（PagerDuty・Opsgenie など）はこの Webhook を直接受け取ってチケットを作成できます。ログシンク → Pub/Sub → Cloud Functions の構成も動作しますが、コンポーネント数が多くなります。Cloud Scheduler によるポーリングはリアルタイム性が低いです。BigQuery エクスポートは分析向けであり、リアルタイムのインシデント検知には遅延があります。"
    },
    {
      "id": "q084",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "GKE クラスターのワークロードをアップグレードしたところ、新バージョンで問題が発生しました。Kubernetes Deployment を前のバージョンに素早く戻すコマンドはどれですか？",
      "choices": [
        "kubectl update deployment my-deployment --revert",
        "kubectl deployment rollback my-deployment",
        "kubectl apply -f previous-deployment.yaml",
        "kubectl rollout undo deployment my-deployment"
      ],
      "answer": [
        3
      ],
      "explanation": "kubectl rollout undo deployment <DEPLOYMENT_NAME> で Deployment を直前のリビジョンに素早くロールバックできます。--to-revision=<N> オプションで特定のリビジョンに戻すこともできます。kubectl rollout history deployment <NAME> でリビジョン履歴を確認できます。kubectl deployment rollback は存在しないコマンドです。kubectl apply -f で以前のマニフェストを再適用する方法も動作しますが、以前のマニフェストファイルが必要で、rollout undo より手順が多くなります。kubectl update deployment は存在しないコマンドです。"
    },
    {
      "id": "q085",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "easy",
      "question": "Compute Engine インスタンスのカスタムメトリクスを Cloud Monitoring に送信したいと考えています。最も推奨される方法はどれですか？",
      "choices": [
        "Cloud Monitoring の REST API を直接呼び出して timeSeries.create で書き込む",
        "BigQuery にデータを書き込み、Looker Studio でグラフ化する",
        "Cloud Monitoring エージェント（または Ops エージェント）をインストールして設定する",
        "Cloud Logging にメトリクス値をテキストでログに記録し、ログベースメトリクスに変換する"
      ],
      "answer": [
        2
      ],
      "explanation": "Google Cloud の Ops エージェント（旧 Cloud Monitoring エージェントと Cloud Logging エージェントを統合したもの）をインスタンスにインストールすると、OS レベルのメトリクス（メモリ・ディスク・プロセス等）が自動収集されます。カスタムアプリメトリクスは Prometheus エクスポーターや OpenTelemetry との統合で収集できます。REST API 直接呼び出しも可能ですが、エージェントを使う方が標準的で設定が容易です。ログベースメトリクスへの変換は数値データのカスタム収集には間接的すぎます。BigQuery + Looker Studio はリアルタイム監視には不向きです。"
    },
    {
      "id": "q086",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "あなたの会社は本番 Cloud Run サービスで突発的に発生する 500 エラーの原因を特定したいと考えています。エラー発生時のコードのどの行で問題が起きているか特定するために最も効果的なツールの組み合わせはどれですか？",
      "choices": [
        "Cloud Billing の費用レポートでリソース使用状況を確認する",
        "Cloud Logging でエラーログを確認し、Cloud Trace でリクエストトレースを分析する",
        "Cloud Monitoring のアップタイムチェックとアラートポリシーを確認する",
        "Compute Engine インスタンスに SSH して直接プロセスを調査する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Logging でアプリケーションのエラーログ（スタックトレースなど）を確認することで何が起きているかを把握し、Cloud Trace でそのリクエストがどのコンポーネントを通過してどこで時間がかかっているか（または失敗しているか）を特定できます。さらに Cloud Error Reporting で例外パターンを自動集計することも有効です。Cloud Monitoring のアップタイムチェックはエンドポイントの可用性確認で、コードレベルの原因特定には使いません。Cloud Run はサーバーレスでインフラへの SSH アクセスはできません。Cloud Billing はコスト管理のサービスで、エラー原因の特定には無関係です。"
    },
    {
      "id": "q087",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "GKE クラスターのノードをアップグレードする前に、現在のノードにスケジュールされている Pod を安全に退避させるコマンドはどれですか？",
      "choices": [
        "kubectl delete node <NODE_NAME>",
        "kubectl cordon <NODE_NAME>",
        "kubectl taint node <NODE_NAME> NoSchedule",
        "kubectl drain <NODE_NAME> --ignore-daemonsets --delete-emptydir-data"
      ],
      "answer": [
        3
      ],
      "explanation": "kubectl drain <NODE_NAME> は指定ノードを cordoned（新規 Pod のスケジューリング不可）にした上で、実行中の Pod を安全に他のノードに退避させます。--ignore-daemonsets は DaemonSet Pod を無視し（DaemonSet は全ノードに存在するため）、--delete-emptydir-data は emptyDir ボリュームを持つ Pod も退避できます。kubectl delete node はノード自体を削除してしまいます。kubectl taint でも NoSchedule を追加できますが、既存 Pod の退避は行いません。kubectl cordon はノードを新規スケジューリング不可にしますが、既存 Pod の退避は行いません（drain は cordon + evict をセットで行います）。"
    },
    {
      "id": "q088",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Logging でアプリが出力するログの中から、特定の JSON フィールド（例: user_id が \"abc123\"）を含むログのみをフィルタリングするクエリとして正しいものはどれですか？",
      "choices": [
        "log.user_id=\"abc123\"",
        "jsonPayload.user_id=\"abc123\"",
        "labels.user_id=\"abc123\"",
        "resource.labels.user_id=\"abc123\""
      ],
      "answer": [
        1
      ],
      "explanation": "アプリが JSON 形式でログを出力している場合、Cloud Logging は JSON フィールドを jsonPayload 以下のパスでアクセスできます。jsonPayload.user_id=\"abc123\" と記述することで、JSON 本文内の user_id フィールドが abc123 のログのみをフィルタリングできます。log.user_id は Cloud Logging のクエリ構文として存在しません。labels はログエントリに付与されたラベルフィールドで、JSON ペイロードの内容とは別です。resource.labels はリソース（GCE インスタンス・GKE Pod など）のメタデータラベルで、アプリが出力する JSON の内容ではありません。"
    },
    {
      "id": "q089",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "あなたのチームは Compute Engine インスタンスのマネージドインスタンスグループ（MIG）を使っています。特定のインスタンスが不健全状態になった場合に自動的に再作成されるようにしたいと考えています。最も適切な設定はどれですか？",
      "choices": [
        "外部ロードバランサーのヘルスチェックでインスタンスを監視してエラー時に通知する",
        "MIG のオートヒーリングポリシーとヘルスチェックを設定する",
        "インスタンスに systemd サービスを設定してアプリクラッシュ時に VM を再起動する",
        "Cloud Monitoring のアラートポリシーで CPU 100% を検知したら Cloud Functions でインスタンスを削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "MIG（マネージドインスタンスグループ）のオートヒーリング機能を使うと、アタッチしたヘルスチェック（HTTP/HTTPS/TCP）で不健全と判定されたインスタンスを自動的に削除して再作成します。gcloud compute instance-groups managed update <GROUP> --health-checks=<HEALTH_CHECK> --initial-delay=300 で設定できます。Cloud Functions でのインスタンス削除は複雑で遅延があり、MIG の組み込み機能より劣ります。ロードバランサーのヘルスチェックは負荷分散のルーティングには影響しますが、MIG のオートヒーリングとは別の設定です（ただし両方設定することが多い）。systemd による VM 再起動はアプリプロセスの再起動はできますが、インスタンス自体の再作成（例：ディスク破損時）には対応できません。"
    },
    {
      "id": "q090",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "easy",
      "question": "Cloud Monitoring で特定のプロジェクトの全リソースのメトリクスを単一のダッシュボードで確認したいと考えています。まず最初に作成すべきものはどれですか？",
      "choices": [
        "Cloud Monitoring のスコーピングプロジェクト（旧称: ワークスペース）",
        "Cloud Logging のログシンク",
        "Cloud Asset Inventory のエクスポート",
        "Cloud Trace のサービス設定"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Monitoring でメトリクスを一元管理するには、スコーピングプロジェクト（旧称：Workspace）を設定します。1 つのスコーピングプロジェクトに複数の Google Cloud プロジェクトを追加することで、それら全プロジェクトのメトリクスを単一のダッシュボード・アラートポリシーで横断的に管理できます。Cloud Logging のログシンクはログのエクスポートに使用します。Cloud Trace はリクエストトレースで、インフラメトリクスダッシュボードとは異なる目的です。Cloud Asset Inventory はリソースのインベントリ管理でメトリクス監視ではありません。"
    },
    {
      "id": "q091",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "あなたのチームは Compute Engine インスタンスのフリートに対してパッチ適用を自動化したいと考えています。最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Scheduler で gcloud compute ssh コマンドを定期実行する",
        "GKE に移行してコンテナイメージを更新することでパッチを適用する",
        "Cloud Functions で定期的に SSH してパッチを実行する",
        "VM Manager の OS パッチ管理機能を使用する"
      ],
      "answer": [
        3
      ],
      "explanation": "VM Manager の OS パッチ管理機能では、パッチジョブを作成してインスタンスフィルター（ラベル・ゾーン・インスタンス名）で対象を絞り、スケジュールを設定することで、大量の Compute Engine インスタンスへのパッチ適用を一元管理できます。OS Config エージェントがインスタンス上で動作してパッチを適用します。Cloud Functions での SSH は認証設定が複雑で、大量インスタンスへの並列適用が難しいです。gcloud compute ssh のスケジュール実行は同様の問題があります。GKE への移行はアプリをコンテナ化する場合の選択肢で、パッチ自動化を目的とした移行は過剰な対応です。"
    },
    {
      "id": "q092",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "本番環境の Cloud Spanner データベースで、定期的に重いクエリが実行されてパフォーマンスが低下しています。問題のあるクエリを特定するための最も適切なアプローチはどれですか？",
      "choices": [
        "Cloud Spanner の Query Insights とロック統計を使って高負荷なクエリを特定する",
        "Cloud Trace でリクエストのトレースを確認する",
        "Cloud Monitoring の CPU 使用率メトリクスを確認する",
        "Cloud Logging でデータベースのアクセスログを確認する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Spanner の Query Insights は実行されたクエリのパフォーマンス統計（実行時間・CPU 使用率・スキャン行数など）を可視化し、遅いクエリや CPU を多く消費するクエリを特定できます。また、Lock Stats でロック競合の原因となっているクエリも確認できます。Cloud Logging には一部の Spanner ログが記録されますが、クエリレベルの詳細パフォーマンス分析には不十分です。Cloud Trace はアプリレベルのリクエストトレースで、Spanner の内部クエリ実行統計は含みません。Cloud Monitoring の CPU メトリクスは問題の存在を示しますが、どのクエリが原因かは特定できません。"
    },
    {
      "id": "q093",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "easy",
      "question": "開発者が特定の Cloud Storage バケットにオブジェクトをアップロードできるようにしたいと考えています。必要最小限の権限を付与するために最も適切な事前定義 IAM ロールはどれですか？",
      "choices": [
        "roles/storage.admin",
        "roles/storage.objectCreator",
        "roles/storage.legacyBucketOwner",
        "roles/storage.objectViewer"
      ],
      "answer": [
        1
      ],
      "explanation": "roles/storage.objectCreator はオブジェクトの作成（アップロード）のみを許可する最小権限のロールです。オブジェクトの読み取りや削除、バケット設定の変更は含まれません。最小権限の原則に従って必要な操作のみを許可します。roles/storage.admin はバケットとオブジェクトのすべての操作が可能な管理者ロールで、アップロードのみの目的には過剰です。roles/storage.objectViewer はオブジェクトの一覧表示と読み取りのみで、書き込みができません。roles/storage.legacyBucketOwner はバケットメタデータの読み書きとオブジェクトの操作が可能なレガシーロールで、必要最小限ではありません。"
    },
    {
      "id": "q094",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では、本番プロジェクトの Compute Engine リソースを管理する必要があります。インスタンスの起動・停止・削除はできるが、ファイアウォールルールやネットワーク設定の変更はできないようにしたいです。最も適切なロールはどれですか？",
      "choices": [
        "roles/compute.networkAdmin",
        "roles/compute.instanceAdmin.v1",
        "roles/editor",
        "roles/compute.admin"
      ],
      "answer": [
        1
      ],
      "explanation": "roles/compute.instanceAdmin.v1 は Compute Engine インスタンスの作成・削除・設定変更・起動・停止などのインスタンス管理操作を許可しますが、ネットワーク（VPC・ファイアウォール・サブネット）の変更権限は含まれていません。roles/compute.admin はコンピュートリソース全体（ネットワークを含む）の管理が可能で過剰です。roles/compute.networkAdmin はネットワーク設定の管理が可能ですが、インスタンスの管理は含まれず、要件とは逆の権限セットです。roles/editor はプロジェクトレベルの広範な編集権限で最小権限の原則に反します。"
    },
    {
      "id": "q095",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Cloud Run サービスを外部に公開していますが、特定の社内 IP アドレス範囲（203.0.113.0/24）からのみアクセスを許可したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "Cloud Armor のセキュリティポリシーで許可する送信元 IP を設定し、ロードバランサーにアタッチする",
        "VPC ファイアウォールルールで特定 IP からのアクセスのみを許可する",
        "Cloud Run サービスの IAM で allUsers への権限を削除する",
        "Cloud Run のサービス設定で ingress を \"internal\" に変更する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Armor のセキュリティポリシーでは、許可/拒否する送信元 IP・IP レンジを細かく設定できます。Global External HTTP(S) Load Balancer の前段に設定することで、特定の IP レンジのみからのアクセスを許可し、それ以外を拒否できます。IAM で allUsers への権限削除だけでは IP ベースのアクセス制限はできません（認証は要求されますが、IP 制限ではない）。Cloud Run の ingress を internal にすると VPC 内部や Cloud Load Balancing からのみアクセス可能になりますが、特定の外部 IP を許可する細かい制御はできません。VPC ファイアウォールルールは GCE などのインスタンスレベルのトラフィック制御であり、サーバーレスの Cloud Run には直接適用できません。"
    },
    {
      "id": "q096",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "GKE クラスターのワークロードが Cloud Storage と BigQuery に安全にアクセスする必要があります。サービスアカウントキーファイルを使用せずに認証を行う最もセキュアな方法はどれですか？",
      "choices": [
        "Kubernetes Secret にサービスアカウントキー JSON を保存してマウントする",
        "GKE ノードプールのデフォルトサービスアカウントに必要な権限を付与する",
        "Cloud Storage と BigQuery の API キーを環境変数に設定する",
        "Workload Identity を設定して Kubernetes Service Account と Google Service Account を紐付ける"
      ],
      "answer": [
        3
      ],
      "explanation": "Workload Identity は GKE の推奨認証方式で、Kubernetes Service Account と Google Cloud Service Account を IAM 設定で紐付けます。Pod が Cloud API を呼び出す際に自動的に適切なサービスアカウントとして認証され、キーファイルが不要です。キーのローテーションも不要で、漏洩リスクがありません。Kubernetes Secret にキー JSON を保存する方法はキーを管理・ローテーションする必要があり、Secret が漏洩するとキーも危険にさらされます。ノードプールのデフォルトサービスアカウントへの権限付与は、そのノード上のすべての Pod が同じ権限を持つことになり過剰な権限付与になります。API キーは Google Cloud の IAM ベースのサービス（Storage・BigQuery）には使用しません。"
    },
    {
      "id": "q097",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では、Compute Engine インスタンスに SSH でアクセスする際に、デフォルトの SSH キーを使用せず、より安全な方法でアクセス管理をしたいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "IAP（Identity-Aware Proxy）TCP 転送を使用して SSH アクセスを IAM で制御する",
        "各 VM に静的な SSH パブリックキーをメタデータに登録して管理する",
        "OS Login を有効にして Google アカウントの IAM で SSH アクセスを管理する",
        "VPN 経由でのみ SSH を許可するファイアウォールルールを設定する"
      ],
      "answer": [
        2
      ],
      "explanation": "OS Login を有効にすると、VM へのSSHアクセスが Google アカウントの IAM（roles/compute.osLogin または roles/compute.osAdminLogin）で管理されます。手動での SSH キー管理が不要になり、ユーザーが組織を離れた際もすぐにアクセスを無効化できます。2FA との統合も可能です。静的 SSH キーのメタデータ管理は鍵の配布・ローテーション・失効管理が煩雑です。VPN 経由の制限はネットワーク経路の制限であり、認証管理とは別の概念です。IAP TCP 転送（選択肢A）も安全なアクセス方法ですが、OS Login と組み合わせて使うことが一般的です。OS Login が IAM ベースの鍵管理として最も直接的な回答です。"
    },
    {
      "id": "q098",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "プロジェクトに新しいエンジニアが加わりました。このエンジニアは Cloud Storage バケットのオブジェクトを読み取り専用でアクセスできる必要があります。最小権限の原則に従って最も適切なロールはどれですか？",
      "choices": [
        "対象バケットに roles/storage.objectViewer を付与する",
        "対象バケットに roles/storage.admin を付与する",
        "プロジェクトレベルで roles/viewer を付与する",
        "プロジェクトレベルで roles/storage.objectViewer を付与する"
      ],
      "answer": [
        0
      ],
      "explanation": "最小権限の原則では、必要なリソース（バケット）に必要な権限（読み取り）のみを付与します。roles/storage.objectViewer を特定のバケットにのみ付与することで、そのバケットのオブジェクト一覧表示と読み取りだけが可能になります。プロジェクトレベルでの roles/viewer はプロジェクト内のほぼすべてのリソースへの読み取りアクセスを与え、過剰な権限になります。roles/storage.admin は書き込みや削除も含む管理権限で読み取りのみの用途には不適切です。プロジェクトレベルでの roles/storage.objectViewer はプロジェクト内のすべてのバケットへの読み取りアクセスを与えてしまいます。"
    },
    {
      "id": "q099",
      "type": "multiple",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "Google Cloud のサービスアカウントに関するベストプラクティスとして正しいものを 2 つ選択してください。",
      "choices": [
        "各サービスやコンポーネントに専用のサービスアカウントを作成し、必要最小限の権限のみを付与する",
        "アプリケーションに roles/owner を付与して、すべての操作を一つのサービスアカウントで実行する",
        "サービスアカウントキーを作成せず、Workload Identity や ADC（Application Default Credentials）を優先して使用する",
        "複数のアプリケーションで同一のサービスアカウントを共用してキー管理を簡略化する"
      ],
      "answer": [
        0,
        2
      ],
      "explanation": "サービスアカウントキーを使用しない（Workload Identity・ADC を活用する）ことで、キーの漏洩リスクとローテーション管理の負担を排除できます（選択肢C）。また、コンポーネントごとに専用のサービスアカウントを作成して最小権限を付与すると、1 つのサービスアカウントが侵害されても他への影響を最小化できます（選択肢A）。roles/owner を付与するのは最小権限の原則に完全に反します（選択肢B）。複数アプリでのサービスアカウント共用はどのアプリがどのリソースにアクセスしているか追跡できなくなり、1 つのアプリの侵害が他のアプリにも影響します（選択肢D）。"
    },
    {
      "id": "q100",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Cloud Storage バケットに保存された機密データへのアクセスを特定の VPC ネットワークからのみに制限したいと考えています。データが VPC 外部に漏洩しないようにするための最も適切な方法はどれですか？",
      "choices": [
        "Cloud Armor でバケットへのアクセスをフィルタリングする",
        "VPC Service Controls でサービス境界を設定する",
        "バケットに IAM ポリシーで特定のサービスアカウントのみアクセスを許可する",
        "バケットを非公開にして HTTPS アクセスのみを許可する"
      ],
      "answer": [
        1
      ],
      "explanation": "VPC Service Controls（VPC-SC）を使うと、Cloud Storage・BigQuery などのマネージドサービスの周囲に「サービス境界」を設定できます。境界内のリソースへのアクセスは、指定した VPC ネットワーク内またはアクセスポリシーで許可したアクセスレベルからのみ可能になります。インターネット経由（VPC 外）からのアクセスは拒否されます。IAM ポリシーでのサービスアカウント制限はユーザー/アカウント単位の制御で、ネットワーク経路の制限はできません。バケットを非公開にするのは公開アクセスの防止ですが、VPC 外からの認証済みアクセスは防げません。Cloud Armor は HTTP(S) ロードバランサーへの保護で、Cloud Storage バケットへの直接アクセスには適用されません。"
    },
    {
      "id": "q101",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "easy",
      "question": "新しいプロジェクトでは、外部からのすべてのインバウンドトラフィックをデフォルトでブロックして必要なポートのみを開放したいと考えています。Google Cloud VPC のデフォルトファイアウォールルールの動作として正しいのはどれですか？",
      "choices": [
        "デフォルトでは HTTP（ポート80）と HTTPS（ポート443）のみが許可される",
        "デフォルトでは VPC 外からのすべてのインバウンドトラフィックがブロックされる",
        "デフォルトでは VPC 外からのすべてのインバウンドトラフィックが許可される",
        "デフォルトでは内部トラフィックのみブロックされ外部トラフィックは許可される"
      ],
      "answer": [
        1
      ],
      "explanation": "Google Cloud VPC のデフォルトの暗黙ルールでは、外部からのすべてのインバウンドトラフィック（ingress）が優先度 65534 でブロックされます（deny all ingress）。内部（同一 VPC）からのトラフィックは別のルールで許可されます。新規作成プロジェクトの「default」VPC ネットワークには、SSH・RDP・ICMP などを許可するデフォルトファイアウォールルールがプリセットされていますが、これはプリセットルールで、暗黙のデフォルトはすべてブロックです。選択肢C・A・D はすべて誤りで、VPC のデフォルト動作はインバウンドをすべてブロックすることです。"
    },
    {
      "id": "q102",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では、Cloud Run サービスを社内ユーザーのみがアクセスできるように制限したいと考えています。Google Workspace のグループ（group@example.com）に所属するユーザーのみアクセスを許可するための IAM 設定として正しいものはどれですか？",
      "choices": [
        "Cloud Run サービスのエグレス設定でドメインを制限する",
        "Cloud Armor でグループメンバーの IP アドレスリストを管理して許可する",
        "Cloud Run サービスの IAM で domain:example.com に roles/run.admin を付与する",
        "Cloud Run サービスの IAM で group:group@example.com に roles/run.invoker を付与する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Run サービスの IAM ポリシーで group:group@example.com に roles/run.invoker を付与すると、そのグループに所属するすべてのユーザーが Cloud Run サービスを呼び出せるようになります。グループメンバーの変更が自動的に IAM の権限に反映されます。domain:example.com は指定ドメインのすべてのユーザーに権限を付与しますが、特定のグループに限定することはできません（また roles/run.admin は過剰な権限です）。Cloud Armor によるグループメンバーの IP 管理はメンバーが変わるたびに IP リストを更新する必要があり、現実的ではありません。Cloud Run のエグレス設定は送信トラフィックの制御であり、受信アクセス制限ではありません。"
    },
    {
      "id": "q103",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "GKE クラスターの Pod 間の通信を制御し、フロントエンド Pod がバックエンド Pod にのみ通信でき、それ以外の Pod 間通信を拒否したいと考えています。最も適切なアプローチはどれですか？",
      "choices": [
        "Cloud Armor ポリシーを GKE クラスターに適用する",
        "Kubernetes NetworkPolicy でラベルベースの通信ルールを設定する",
        "GCE のファイアウォールルールでノード間の通信を制限する",
        "各 Pod に異なる IAM サービスアカウントを紐付けて通信を制御する"
      ],
      "answer": [
        1
      ],
      "explanation": "Kubernetes NetworkPolicy を使うと、Pod のラベルセレクターを使って Pod 間の Ingress/Egress 通信を細かく制御できます。例えば、バックエンド Pod に NetworkPolicy を設定してフロントエンドラベルを持つ Pod からの通信のみを許可し、その他の Pod からの通信を拒否できます。GCE のファイアウォールルールはノードレベルの制御で、同一ノード上の Pod 間通信を制御することはできません。IAM サービスアカウントは Google Cloud API へのアクセス制御であり、Pod 間のネットワーク通信制御には使いません。Cloud Armor は HTTP(S) ロードバランサーへのトラフィック保護で、クラスター内部の Pod 間通信制御には適用できません。"
    },
    {
      "id": "q104",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Cloud SQL インスタンスへのデータベース接続において、IP 許可リスト（Authorized Networks）に依存せず、よりセキュアな接続方法を実装したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "Cloud SQL に SSL 証明書を設定して HTTPS 接続を強制する",
        "Cloud SQL のパブリック IP を無効化してプライベート IP のみを使用する",
        "Cloud SQL Auth Proxy を使用してサービスアカウントで認証する",
        "Cloud SQL の外部 IP をファイアウォールルールで制限する"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud SQL Auth Proxy はサービスアカウント（または Workload Identity）の IAM 認証を使って Cloud SQL への安全な接続を確立します。接続は自動的に暗号化され、IP 許可リストの管理が不要になります。アプリはローカルの Unix ソケットや TCP ポートに接続するだけで、Auth Proxy が暗号化と認証を担当します。ファイアウォールルールによる制限は IP の管理が必要です。SSL 証明書の設定は暗号化を強化しますが、認証は別途必要で証明書管理の負担があります。プライベート IP への変更は有効なセキュリティ強化ですが、VPC 外からのアクセスが必要な場合に対応できず、Auth Proxy と組み合わせて使うことも多いです。"
    },
    {
      "id": "q105",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "あなたの組織では Google Cloud での操作の監査証跡を維持する必要があります。誰がいつどのリソースに対してどのような操作を行ったかを追跡するために最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Monitoring のメトリクス探索ページ",
        "Cloud Asset Inventory の変更履歴",
        "Cloud Audit Logs（管理アクティビティログ・データアクセスログ）",
        "Cloud Trace のスパン一覧"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Audit Logs は Google Cloud サービスへのすべての管理操作と（設定した場合）データアクセスを記録する監査証跡サービスです。管理アクティビティログ（Admin Activity）はデフォルトで有効で、リソースの作成・削除・設定変更などを記録します。データアクセスログは明示的な有効化が必要で、データの読み取り・書き込みを記録します。プリンシパル（誰が）・タイムスタンプ（いつ）・メソッド（何をしたか）・リソース（どのリソースに）が記録されます。Cloud Monitoring はメトリクス監視で、操作ログの記録には使いません。Cloud Trace はリクエストのレイテンシトレースです。Cloud Asset Inventory の変更履歴はリソース設定の変更を追跡しますが、操作者の詳細は Audit Logs ほど充実していません。"
    },
    {
      "id": "q106",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Compute Engine インスタンスが起動時に Cloud Storage バケットからデータを読み込む必要があります。インスタンスには適切なサービスアカウントが設定されています。このサービスアカウントに付与すべき最小限の権限はどれですか？",
      "choices": [
        "プロジェクトレベルで roles/viewer を付与する",
        "対象バケットに roles/storage.objectViewer を付与する",
        "対象バケットに roles/storage.legacyBucketReader を付与する",
        "プロジェクトレベルで roles/storage.admin を付与する"
      ],
      "answer": [
        1
      ],
      "explanation": "最小権限の原則に従い、読み取りのみが必要な場合は対象バケットに roles/storage.objectViewer を付与します。このロールはオブジェクトの一覧表示（storage.objects.list）と読み取り（storage.objects.get）のみを許可します。プロジェクトレベルでの roles/storage.admin はプロジェクト内のすべてのバケットへの完全な管理権限で過剰です。プロジェクトレベルでの roles/viewer はプロジェクト内の多くのリソースへの読み取りアクセスを与えてしまいます。roles/storage.legacyBucketReader はバケットのメタデータ読み取りとオブジェクト一覧は含みますが、オブジェクトのデータ読み取り（storage.objects.get）には roles/storage.objectViewer が必要です。"
    },
    {
      "id": "q107",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "easy",
      "question": "あなたはプロジェクトの IAM ポリシーを確認したいと考えています。正しい gcloud コマンドはどれですか？",
      "choices": [
        "gcloud iam roles list --project=<PROJECT_ID>",
        "gcloud iam policies list --project=<PROJECT_ID>",
        "gcloud projects describe <PROJECT_ID> --format=iam",
        "gcloud projects get-iam-policy <PROJECT_ID>"
      ],
      "answer": [
        3
      ],
      "explanation": "gcloud projects get-iam-policy <PROJECT_ID> がプロジェクトの IAM ポリシー（バインディング一覧）を取得するコマンドです。--format=json や --format=yaml オプションで出力形式を変更できます。gcloud iam policies list は存在しないコマンドです（IAM ポリシーはリソースレベルで確認します）。gcloud projects describe はプロジェクトのメタデータを表示しますが、IAM ポリシーの詳細は含まれません。gcloud iam roles list はプロジェクトのカスタムロール一覧を表示するコマンドで、バインディング（誰にどのロールが付与されているか）は表示しません。"
    },
    {
      "id": "q108",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "会社の VPC ネットワーク内の Compute Engine インスタンスが外部インターネットへの通信を必要とします。セキュリティ上、インスタンスには外部 IP アドレスを持たせたくないと考えています。最も適切な方法はどれですか？",
      "choices": [
        "Cloud NAT を設定してプライベート IP のみのインスタンスからインターネットへの通信を可能にする",
        "すべてのインスタンスに外部 IP アドレスを付与してファイアウォールで制限する",
        "外部 IP なしではインターネット通信が不可能なため、外部 IP の付与が必須",
        "プロキシ VM を 1 台作成し、他の VM のトラフィックをプロキシ経由でルーティングする"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud NAT（Network Address Translation）を使うと、外部 IP アドレスを持たないプライベートのインスタンスからインターネットへのアウトバウンド通信が可能になります。インスタンスの内部 IP が Cloud NAT の外部 IP に変換されてインターネットに送信されます。インターネットから内部インスタンスへのインバウンド接続は拒否されます。すべてのインスタンスへの外部 IP 付与はセキュリティリスクを増やします。プロキシ VM の構築も機能しますが、プロキシ VM の管理コストがかかり Cloud NAT より複雑です。選択肢C は誤りで、Cloud NAT で外部 IP なしにインターネット通信ができます。"
    },
    {
      "id": "q109",
      "type": "multiple",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Google Cloud の IAM 条件（IAM Conditions）を使って実現できることを 2 つ選択してください。",
      "choices": [
        "特定のリソースタグ（resource.name など）を持つリソースへのアクセスのみを許可する",
        "特定の時間帯（業務時間内）のみリソースへのアクセスを許可する",
        "サービスアカウントに付与できるロールの種類を制限する",
        "IAM ロールの権限（permissions）セットを変更する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "IAM 条件は CEL（Common Expression Language）を使ってアクセスに条件を追加します。時間ベースの条件（request.time < timestamp('2024-12-31T23:59:59Z') など）で特定時間帯のみアクセスを許可できます（選択肢B）。また、resource.name や resource.type などのリソース属性に基づいて、特定のリソースへのアクセスのみを許可できます（選択肢A）。サービスアカウントへのロールの種類の制限は IAM 条件ではなく組織ポリシーで管理します（選択肢C）。IAM ロールの権限セット変更はカスタムロールの作成・編集で行うもので、IAM 条件の機能ではありません（選択肢D）。"
    },
    {
      "id": "q110",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "Cloud KMS（Key Management Service）を使ってデータを暗号化しています。最も安全にキーを管理するための設定として最も適切なものはどれですか？",
      "choices": [
        "Cloud KMS のキーを 1 つ作成し、すべてのサービスで共用する",
        "Cloud KMS のキーリングとキーをサービスごとに分けて作成し、自動ローテーションを設定する",
        "CMEK（顧客管理の暗号化キー）は使わず、Google のデフォルト暗号化に委ねる",
        "KMS キーをローカルにエクスポートしてバックアップとして保管する"
      ],
      "answer": [
        1
      ],
      "explanation": "キーをサービスごとに分けて作成すると、1 つのキーが侵害された場合の影響範囲を限定できます。自動ローテーションを設定することでキーの露出リスクを低減できます。Cloud KMS はキーのバージョン管理・ローテーション・監査ログをネイティブにサポートしています。すべてのサービスで 1 つのキーを共用すると、キーの侵害がすべてのデータに影響します。Google のデフォルト暗号化は有効ですが、コンプライアンス要件やキー管理の制御が必要な場合は CMEK が推奨されます。KMS キーのエクスポートはセキュリティモデルを弱体化させます（Cloud KMS はキーが外に出ないことが設計の核心です）。"
    },
    {
      "id": "q111",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "GKE クラスターをデプロイする際に、インターネットからコントロールプレーンへのアクセスを制限したいと考えています。承認済みネットワーク（Authorized Networks）機能の説明として正しいものはどれですか？",
      "choices": [
        "承認済みネットワークを設定すると、Pod 間の通信も指定したネットワークに制限される",
        "承認済みネットワークを設定すると、クラスターの Worker ノードが指定した IP からのみ通信できるようになる",
        "承認済みネットワークはプライベートクラスターでのみ使用できる",
        "承認済みネットワークを設定すると、Kubernetes API サーバー（コントロールプレーン）へのアクセスを指定した IP 範囲のみに制限できる"
      ],
      "answer": [
        3
      ],
      "explanation": "GKE の承認済みネットワーク機能を使うと、Kubernetes API サーバー（コントロールプレーン）への外部アクセスを、指定した CIDR ブロックに限定できます。これにより、kubectl や Google Cloud Console からのクラスター管理を特定のオフィス IP や VPN の IP からのみ許可できます。Worker ノードの通信制限ではなく、コントロールプレーンへのアクセス制限です（選択肢B は誤り）。承認済みネットワークはパブリッククラスターでも使用できます（選択肢C は誤り）。Pod 間の通信制限は Kubernetes NetworkPolicy で行います（選択肢A は誤り）。"
    },
    {
      "id": "q112",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "あなたの会社は Google Cloud 上の本番環境リソースへの変更を承認ワークフローを経由させたいと考えています。特定のユーザーが roles/compute.admin を持っていても、本番フォルダーのリソースを直接変更できないようにしたい場合、最も適切な方法はどれですか？",
      "choices": [
        "Access Approval を有効化して本番リソースへのアクセスに明示的な承認を要求する",
        "Cloud Armor で本番リソースへのリクエストを承認まで保留する",
        "本番フォルダーの IAM ポリシーから roles/compute.admin を削除する",
        "二段階認証（2FA）を組織全体で必須化する"
      ],
      "answer": [
        0
      ],
      "explanation": "Access Approval を有効にすると、Google Cloud のサポートスタッフや自動システムが本番リソースにアクセスする場合に、承認者（roles/accessapproval.approver を持つ人）の明示的な承認が必要になります。また、Privileged Access Management（PAM）と組み合わせることで、特定ロールを持つ内部ユーザーの高権限操作にも承認フローを追加できます。IAM ポリシーからロールを削除すると通常の管理業務もできなくなります。2FA は認証強化ですが、承認ワークフローとは異なります。Cloud Armor は HTTP(S) トラフィックのフィルタリングで、IAM 操作の承認制御には使いません。"
    },
    {
      "id": "q113",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "Cloud Storage バケットに保存された顧客データを特定のサービスアカウントのみが読み取れるようにしたいと考えています。また、誰かが公開アクセス設定を誤って有効にしてしまった場合にすぐに検知したいです。最も適切なアプローチはどれですか？",
      "choices": [
        "バケットに IAM ポリシーで特定サービスアカウントのみ roles/storage.objectViewer を付与し、組織ポリシーで publicAccessPrevention を Enforced に設定する",
        "Cloud Asset Inventory で毎日バケットのアクセス設定をスキャンしてメール通知する",
        "Cloud KMS でバケットを暗号化して特定のサービスアカウントのみキーを使用できるようにする",
        "バケットに HTTPS のみのアクセスを設定して暗号化を強制する"
      ],
      "answer": [
        0
      ],
      "explanation": "バケットへの IAM 制限（特定サービスアカウントのみへのアクセス付与）と、組織ポリシーの constraints/storage.publicAccessPrevention を Enforced にする組み合わせが最も確実です。IAM でアクセスを制限し、組織ポリシーで allUsers/allAuthenticatedUsers への付与を API レベルで永続的に防止します。HTTPS のみのアクセス強制は転送の暗号化であり、アクセス制御とは別の話です。Cloud Asset Inventory のスキャンは日次のため、誤設定を即時検知できません。KMS 暗号化はデータ保護の追加レイヤーとして有効ですが、IAM ポリシーと組織ポリシーの代替にはなりません。"
    },
    {
      "id": "q114",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "あなたのチームは Compute Engine インスタンスグループを使って Web アプリを運用しています。HTTP(S) ロードバランサーのバックエンドとして設定しましたが、ヘルスチェックが失敗しています。最初に確認すべきことはどれですか？",
      "choices": [
        "ヘルスチェックが使用するポートとパスへのトラフィックを許可するファイアウォールルールが存在するか確認する",
        "ロードバランサーを削除して再作成する",
        "Cloud CDN を無効にしてキャッシュの問題を解消する",
        "インスタンスのマシンタイプが小さすぎないか確認する"
      ],
      "answer": [
        0
      ],
      "explanation": "HTTP(S) ロードバランサーのヘルスチェックは Google のヘルスチェックシステム（130.211.0.0/22、35.191.0.0/16）から行われます。ファイアウォールルールでこれらの送信元 IP からのヘルスチェックポートへのトラフィックが許可されていない場合、ヘルスチェックは失敗します。マシンタイプはヘルスチェック失敗の一般的な原因ではありません。ロードバランサーを削除・再作成するのはデバッグの最後の手段で、まず原因特定が必要です。Cloud CDN はコンテンツキャッシュで、バックエンドのヘルスチェックには直接関係しません。"
    },
    {
      "id": "q115",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE クラスターにデプロイしたマイクロサービスで、特定のサービスのメモリ使用量が急増してノードのリソースが枯渇しています。この問題を防ぐために最初に設定すべきことはどれですか？",
      "choices": [
        "GKE Autopilot に移行してリソース管理を自動化する",
        "GKE クラスターのノード数を増やす",
        "クラスターを再作成して問題のある Pod を削除する",
        "問題のあるサービスの Deployment に resources.requests と resources.limits を設定する"
      ],
      "answer": [
        3
      ],
      "explanation": "resources.requests は Kubernetes スケジューラーがノードへの Pod 配置決定に使用し、resources.limits はコンテナが使用できる最大リソース量を設定します。memory の limits を設定することで、特定のコンテナがノードのメモリを使い尽くすことを防ぎます（limits を超えると OOMKilled されます）。ノード数の増加は問題を先送りするだけで根本解決になりません。クラスターの再作成は過剰な対応です。GKE Autopilot への移行は長期的には有効ですが、まず既存の問題を適切な limits 設定で解決するべきです。"
    },
    {
      "id": "q116",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Build で Docker イメージをビルドして Artifact Registry にプッシュし、その後 GKE にデプロイするパイプラインを設定しています。cloudbuild.yaml の各ステップで正しい形式はどれですか？",
      "choices": [
        "steps:\\n  - name: 'gcr.io/cloud-builders/docker'\\n    args: ['build', '-t', 'IMAGE_URL', '.']",
        "steps:\\n  - command: 'docker build -t IMAGE_URL .'",
        "build:\\n  - run: docker build -t IMAGE_URL .",
        "pipeline:\\n  - step: docker_build\\n    image: IMAGE_URL"
      ],
      "answer": [
        0
      ],
      "explanation": "cloudbuild.yaml の正しい形式は steps に name（使用するビルダーイメージ）と args（コマンド引数）を配列で指定します。gcr.io/cloud-builders/docker は Cloud Build 提供のビルダーイメージです。steps 内の command フィールドは存在しません（選択肢B）。pipeline・step という構造は cloudbuild.yaml の仕様にはありません（選択肢D）。build・run という構造も cloudbuild.yaml には存在しません（選択肢C）。正しい形式は steps[].name（ビルダーイメージ）と steps[].args（引数リスト）の組み合わせです。"
    },
    {
      "id": "q117",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "Cloud SQL for PostgreSQL インスタンスを作成するコマンドとして正しいものはどれですか？",
      "choices": [
        "gcloud databases create my-db --type=postgresql --version=15 --region=asia-northeast1",
        "gcloud sql create instance my-db --database=postgres --tier=db-f1-micro",
        "gcloud cloud-sql instances create my-db --engine=postgres15 --region=asia-northeast1",
        "gcloud sql instances create my-db --database-version=POSTGRES_15 --tier=db-f1-micro --region=asia-northeast1"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud SQL インスタンスの作成コマンドは gcloud sql instances create <NAME> で、--database-version で POSTGRES_15 などのバージョンを指定し、--tier でマシンタイプ（db-f1-micro、db-n1-standard-2 など）を指定します。--region でリージョンを指定します。gcloud databases create は存在しないコマンドです。gcloud sql create instance は引数の順序が誤りです（正しくは gcloud sql instances create）。gcloud cloud-sql は存在しないサブコマンドグループです（gcloud sql が正しいグループです）。"
    },
    {
      "id": "q118",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Functions を使ってファイルアップロード後に自動的に画像をリサイズして別のバケットに保存する処理を実装したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Compute Engine の常時稼働インスタンスで Cloud Storage を監視して処理する",
        "ユーザーのブラウザで JavaScript でリサイズして Cloud Storage に保存する",
        "Cloud Scheduler で 1 分ごとに Cloud Storage をポーリングして新規ファイルを処理する",
        "Cloud Storage の finalize イベントをトリガーに Cloud Functions を起動してリサイズ処理を実行する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Storage のオブジェクト finalize イベント（オブジェクト作成・上書き完了）をトリガーとして Cloud Functions を設定すると、ファイルがアップロードされた直後に自動的に処理が起動します。イベントドリブンなサーバーレス処理で、ファイルがないときはコストが発生しません。Cloud Scheduler によるポーリングはリアルタイム性が低く、処理遅延が生じます。ブラウザでのリサイズはクライアント負荷が高く、処理の信頼性が低く、サーバー側では制御できません。常時稼働インスタンスはアイドル時もコストが発生し、サーバーレスの利点がありません。"
    },
    {
      "id": "q119",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "hard",
      "question": "グローバルな Web アプリケーションで、静的アセット（画像・CSS・JS）をエッジキャッシュして世界中のユーザーに低レイテンシで配信したいと考えています。最も適切な構成はどれですか？",
      "choices": [
        "各リージョンに Cloud Storage バケットを作成して Cloud DNS でジオルーティングする",
        "Global External HTTP(S) Load Balancer + Cloud CDN を使ってアセットをキャッシュする",
        "Cloud Run のマルチリージョンデプロイでアセットをサーブする",
        "Cloud Storage マルチリージョンバケットにアセットを保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud CDN は Global External HTTP(S) Load Balancer と統合されており、Google のエッジノード（世界100以上のロケーション）でコンテンツをキャッシュします。ユーザーは地理的に最も近いエッジからコンテンツを受け取るため、オリジンサーバーへのリクエストが減り、低レイテンシが実現されます。Cloud Storage のマルチリージョンはデータの耐久性・可用性には優れますが、エッジキャッシュ機能は持ちません。Cloud Run のマルチリージョンは動的コンテンツに有効ですが、静的アセットのキャッシュには CDN が最適です。リージョンごとのバケット+ジオルーティングは管理が複雑で、CDN のようなエッジキャッシュ効果はありません。"
    },
    {
      "id": "q120",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたのチームは Google Cloud でメッセージキューを使った非同期処理を実装したいと考えています。メッセージの配信が保証（at-least-once）され、処理が失敗した場合にデッドレターキューに転送できるサービスはどれですか？",
      "choices": [
        "Eventarc",
        "Cloud Tasks",
        "Cloud Scheduler",
        "Cloud Pub/Sub"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Pub/Sub は at-least-once の配信保証を持つメッセージキューサービスで、サブスクリプションにデッドレタートピックを設定することで、一定回数処理に失敗したメッセージを別のトピックに転送できます。Cloud Scheduler は定期的なジョブのスケジューリングで、メッセージキューではありません。Cloud Tasks は HTTP または App Engine タスクキューへのタスク配信サービスで、Pub/Sub と異なりプルモデルが主体ではありません（ただしデッドレター機能はありません）。Eventarc はイベントのルーティングサービスで、メッセージのバッファリングや再試行制御は Pub/Sub ほど充実していません。"
    },
    {
      "id": "q121",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Compute Engine インスタンスグループのスケーリングを自動化しています。CPU 使用率が 70% を超えたらスケールアウト、40% を下回ったらスケールインしたいと考えています。最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Scheduler で定期的にインスタンス数を変更するスクリプトを実行する",
        "マネージドインスタンスグループの Autoscaler を設定する",
        "GKE Autopilot に移行してノードの自動スケーリングを利用する",
        "Cloud Monitoring のアラートポリシーで通知を送り、手動でインスタンスを追加・削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "マネージドインスタンスグループ（MIG）の Autoscaler を設定すると、CPU 使用率・カスタムメトリクス・ロードバランサーのキャパシティなどに基づいてインスタンス数を自動的に増減できます。最小・最大インスタンス数とスケールイン/アウトのしきい値を設定するだけで自動化できます。手動での追加・削除は応答が遅くオペレーター負荷が高いです。Cloud Scheduler でのスクリプト実行は時刻ベースのスケーリングで、負荷に応じたリアルタイムなスケーリングには不向きです。GKE Autopilot は Kubernetes ワークロード向けで、MIG の代替にはなりません。"
    },
    {
      "id": "q122",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "Cloud Run サービスのリクエストが急増したため、コンテナのコールドスタートレイテンシが問題になっています。コールドスタートを最小化するための最も効果的な設定はどれですか？",
      "choices": [
        "Cloud Run の concurrency（最大同時リクエスト数）を 1 に設定する",
        "Cloud Run のメモリを最大値（32GB）に設定する",
        "Cloud Run のリクエストタイムアウトを短くする",
        "Cloud Run の最小インスタンス数（min-instances）を 1 以上に設定する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Run の最小インスタンス数（min-instances）を 1 以上に設定すると、トラフィックがない時間帯でも最低指定数のインスタンスがウォームな状態で待機し、コールドスタートが発生しません。ただし、アイドル中のインスタンスにも最小インスタンス料金が発生します。メモリの増加はコールドスタート時間を若干短縮できる場合がありますが、最小インスタンス設定ほど効果的ではありません。リクエストタイムアウトを短くすることはコールドスタートの解決とは無関係です（むしろ短すぎるとタイムアウトします）。concurrency を 1 にすると 1 つのインスタンスが 1 リクエストしか処理しないためスケールアウトが増加し、コールドスタートが悪化する可能性があります。"
    },
    {
      "id": "q123",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "開発チームは Cloud Storage バケットに一時的なアクセスを外部パートナーに提供したいと考えています。パートナーは Google アカウントを持っていません。24 時間だけオブジェクトをダウンロードできるようにしたい場合、最も適切な方法はどれですか？",
      "choices": [
        "バケットを一時的に公開（allUsers に読み取り権限）して 24 時間後に非公開に戻す",
        "署名付き URL（Signed URL）を作成して 24 時間の有効期限を設定する",
        "パートナーのために一時的な Google アカウントを作成して IAM 権限を付与する",
        "Cloud Run エンドポイントを作成してパートナーにダウンロード API を提供する"
      ],
      "answer": [
        1
      ],
      "explanation": "署名付き URL（Signed URL）はサービスアカウントの秘密鍵または IAM で署名された、時間制限付きのアクセス URL です。Google アカウントを持たないユーザーにも特定オブジェクトへの一時的なアクセスを提供できます。有効期限（最大 7 日間）を設定でき、期限後は自動的に無効になります。バケットを公開にすると 24 時間の間、すべてのユーザーがアクセスできてしまいます。一時的な Google アカウント作成は管理が煩雑で、IAM権限の削除忘れのリスクがあります。Cloud Run エンドポイントの作成は必要以上に複雑で、署名付き URL で十分です。"
    },
    {
      "id": "q124",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では、本番プロジェクトへの特権操作（インスタンス削除など）を行う場合に、承認なしに直接実行できないようにしたいと考えています。Just-in-Time (JIT) アクセスを実現するための最も適切な方法はどれですか？",
      "choices": [
        "Privileged Access Manager（PAM）を使って期間限定・承認付きの一時的な権限昇格を設定する",
        "Cloud Audit Logs でアクセスを監視して事後に問題を検知する",
        "本番プロジェクトを read-only モードに設定する",
        "本番プロジェクトへの全アクセスを禁止して都度 IAM を付与・削除する"
      ],
      "answer": [
        0
      ],
      "explanation": "Privileged Access Manager（PAM）は Google Cloud の JIT（Just-in-Time）アクセス管理サービスで、ユーザーが一時的な権限昇格を申請し、承認者がリクエストを承認・拒否できます。承認された場合のみ指定期間に限り高権限が付与されます。常時高権限を保持するリスクを排除できます。毎回 IAM を付与・削除する方法は手動作業が多く、運用コストが高いです。Cloud Audit Logs による監視は事後検知であり、不正操作を事前に防止できません。プロジェクトの read-only モードは Google Cloud の標準機能として存在しません。"
    },
    {
      "id": "q125",
      "type": "multiple",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Monitoring でアップタイムチェックを設定する際に設定すべき項目を 2 つ選択してください。",
      "choices": [
        "エンドポイントで実行するプログラムのソースコード",
        "チェック対象のエンドポイント（URL または IP アドレス）",
        "エンドポイントのコンテナイメージ",
        "チェックの間隔（頻度）と通知チャネル"
      ],
      "answer": [
        1,
        3
      ],
      "explanation": "Cloud Monitoring のアップタイムチェックでは、監視対象のエンドポイント（URL・IP・GCE インスタンス・App Engine サービスなど）の指定（選択肢B）と、チェック間隔（1分・5分等）および失敗時の通知チャネル（メール・PagerDuty等）の設定（選択肢D）が必須です。アップタイムチェックはエンドポイントへの HTTP/HTTPS/TCP 接続を行うシンプルな外形監視であり、プログラムのソースコードを必要とせず（選択肢A）、コンテナイメージも不要です（選択肢C）。コンテナ管理は GKE や Cloud Run の設定で行います。"
    },
    {
      "id": "q126",
      "type": "single",
      "domain": "クラウドソリューションの計画と構成",
      "difficulty": "medium",
      "question": "あなたの会社はオンプレミスの Active Directory と Google Cloud の IAM を統合し、社員が会社のドメインアカウントで Google Cloud にシングルサインオンしたいと考えています。最も適切な構成はどれですか？",
      "choices": [
        "Google Cloud Directory Sync（GCDS）と SAML/OIDC フェデレーションを使って AD と Cloud Identity を同期・統合する",
        "VPN でオンプレミスと Google Cloud を接続して AD の認証をそのまま使う",
        "社員全員に個人の Gmail アカウントを使わせて Google Cloud にアクセスさせる",
        "各社員のオンプレミス AD アカウントを手動で Cloud Identity アカウントに複製する"
      ],
      "answer": [
        0
      ],
      "explanation": "Google Cloud Directory Sync（GCDS）はオンプレミスの LDAP/Active Directory のユーザー・グループを Cloud Identity または Google Workspace に同期するツールです。さらに SAML 2.0 または OIDC を使ったフェデレーション設定を行うことで、社員はオンプレミスの AD アカウントで SSO して Google Cloud にアクセスできます。パスワードはオンプレミス AD で管理されるため、Google 側にパスワードを保存しません。手動での複製は管理負荷が高く、AD 変更の追従が困難です。個人 Gmail アカウントの使用は企業管理ができません。VPN 接続だけでは IAM フェデレーションを実現しません。"
    },
    {
      "id": "q127",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "easy",
      "question": "Cloud Run サービスの過去 1 時間のリクエスト数とエラー率をリアルタイムで確認したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "Cloud Trace のサービス詳細ページを開く",
        "Cloud Run コンソールの [メトリクス] タブを確認する",
        "BigQuery で Cloud Logging のデータをクエリする",
        "gcloud run services logs --service=my-service コマンドを実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud Run の [メトリクス] タブには、リクエスト数・レイテンシ（p50/p95/p99）・エラー率・インスタンス数・CPU・メモリなどの主要メトリクスがリアルタイムで表示されます。追加設定不要で確認できる最も簡単な方法です。gcloud run services logs は Cloud Run サービスに紐づくログのサブコマンドですが、このコマンドはリクエストメトリクスではなくログを表示します（かつ正確な構文は gcloud run services logs read）。Cloud Trace はリクエストトレースの詳細分析ツールで、リクエスト数やエラー率の集計表示ではありません。BigQuery でのクエリはほぼリアルタイムとは言えず、簡単な確認には過剰な手順です。"
    },
    {
      "id": "q128",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "CI/CD パイプラインで Google Cloud リソースを Terraform でプロビジョニングしています。Terraform の state ファイルを安全にチームで共有する最も適切な方法はどれですか？",
      "choices": [
        "Terraform を実行するたびに既存の state を削除して再作成する",
        "各開発者がローカルに state ファイルのコピーを保持して変更前に手動マージする",
        "Terraform の Cloud Storage バックエンドを設定して state を GCS バケットに保存し、state ロックに Cloud Firestore/Spanner を使う",
        "state ファイルをコードリポジトリ（Git）にコミットして管理する"
      ],
      "answer": [
        2
      ],
      "explanation": "Terraform の remote state として Cloud Storage バックエンドを使うと、state ファイルが一元管理されてチームで安全に共有できます。GCS の Versioning を有効にすると state の変更履歴も保持されます。State ロック（同時実行防止）には Cloud Firestore の Terraform provider が対応しています。Git への state ファイルのコミットは機密情報（APIキー・パスワードなど）が含まれる可能性があり、セキュリティリスクがあります。各開発者がローカルに保持する方法は競合が発生しやすく非現実的です。毎回 state を削除すると既存リソースとの整合が取れなくなり、重大な問題を引き起こします。"
    },
    {
      "id": "q129",
      "type": "multiple",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE で Pod が Pending 状態から抜け出せない場合に確認すべき原因として正しいものを 2 つ選択してください。",
      "choices": [
        "Pod の Liveness Probe が失敗している",
        "Service の ClusterIP が割り当てられていない",
        "クラスターに Pod のリソースリクエスト（CPU/メモリ）を満たすノードがない",
        "Pod のコンテナイメージが Artifact Registry から pull できない（認証エラーや存在しないタグ）"
      ],
      "answer": [
        2,
        3
      ],
      "explanation": "Pod が Pending 状態になる主な原因は、スケジューリング失敗とイメージ pull 失敗の 2 種類です。ノードにリソースが不足している場合（CPU/メモリの requests がノードの空きを超える）、Kubernetes スケジューラーが Pod を配置できず Pending が続きます（選択肢C）。また、コンテナイメージが存在しない・タグが誤っている・認証エラーで pull できない場合も ImagePullBackOff → Pending になります（選択肢D）。Liveness Probe の失敗は Running 状態の Pod を再起動させるもので、Pending の原因ではありません（選択肢A）。Service の ClusterIP は Pod のスケジューリングと無関係であり、Service がなくても Pod は Running になります（選択肢B）。"
    },
    {
      "id": "q130",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では Security Command Center を使用して Google Cloud 環境のセキュリティリスクを一元管理したいと考えています。Security Command Center が検出できる脅威として正しいものはどれですか？",
      "choices": [
        "GKE クラスターの CPU 使用率の急上昇",
        "Google Cloud の請求コストの異常増加",
        "Cloud SQL のクエリ実行時間の増加",
        "公開されている Cloud Storage バケット・脆弱なファイアウォールルール・IAM ポリシーの誤設定など"
      ],
      "answer": [
        3
      ],
      "explanation": "Security Command Center（SCC）はセキュリティおよびリスク管理プラットフォームで、公開アクセスのある Cloud Storage バケット・過剰な権限の IAM ポリシー・開放されたファイアウォールポート・脆弱な TLS 設定・マルウェア検出・異常な認証アクティビティなどのセキュリティリスクを検出して集約します。Cloud Billing の費用異常は Billing のアラートで管理します（選択肢B）。CPU 使用率の監視は Cloud Monitoring（選択肢A）。Cloud SQL のクエリ性能は Query Insights（選択肢C）でそれぞれ確認します。SCC はセキュリティとコンプライアンスに特化したサービスです。"
    },
    {
      "id": "q131",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "Google Cloud の組織で、新規プロジェクトが作成される際に自動的に特定のラベル（cost-center タグなど）が付与されるようにしたいと考えています。最も適切なアプローチはどれですか？",
      "choices": [
        "組織ポリシーカスタム制約でラベルなしのプロジェクト作成を拒否し、ラベル付きのプロジェクトのみ作成できるようにする",
        "Pub/Sub と Cloud Functions を使って Cloud Audit Logs からプロジェクト作成イベントを受け取りラベルを設定する",
        "Cloud Functions でプロジェクト作成イベントを検知して自動的にラベルを付与する",
        "組織の全プロジェクト管理者に作成時にラベルを付けるよう指示する"
      ],
      "answer": [
        0
      ],
      "explanation": "組織ポリシーのカスタム制約（Custom Constraints）を使ってプロジェクト作成リクエストに必須ラベルが含まれていない場合を DENY することで、ラベルのないプロジェクトの作成を API レベルで防止できます。これにより、すべての新規プロジェクトに必ずコストセンタータグが付与されることが保証されます。人手への依存（選択肢D）はヒューマンエラーがあります。Cloud Functions でのイベント検知（選択肢C・B）は事後処理であり、ラベルなしプロジェクトが一時的に存在してしまいます。カスタム制約は作成前に強制できるため最も確実です。"
    },
    {
      "id": "q132",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "hard",
      "question": "あなたの会社は Google Cloud に移行後、複数チームが共通の Shared VPC を使用する構成を検討しています。Shared VPC の説明として最も正確なものはどれですか？",
      "choices": [
        "Shared VPC は複数の組織間でネットワークを共有する仕組みである",
        "Shared VPC はホストプロジェクトのネットワークリソースをサービスプロジェクトと共有する仕組みで、各チームが独立したプロジェクトを持ちながら共通ネットワークを使用できる",
        "Shared VPC は Cloud Interconnect 専用の機能である",
        "Shared VPC を使うと、サービスプロジェクトはホストプロジェクトの IAM ポリシーを継承する"
      ],
      "answer": [
        1
      ],
      "explanation": "Shared VPC は 1 つのホストプロジェクトに VPC ネットワーク・サブネット・ファイアウォールルールを集中管理し、承認されたサービスプロジェクト内のリソース（VM・GKE ノードなど）がホストプロジェクトのサブネットを使用できる仕組みです。各チームが独自のサービスプロジェクトで IAM・課金・デプロイを管理しながら、ネットワーク設計は一元管理できます。Shared VPC は同一組織内の複数プロジェクト間での共有で、異なる組織間の共有ではありません（選択肢A）。IAM ポリシーはプロジェクトごとに独立しており、サービスプロジェクトはホストプロジェクトの IAM を継承しません（選択肢D）。Cloud Interconnect とは無関係です（選択肢C）。"
    },
    {
      "id": "q133",
      "type": "multiple",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "Binary Authorization に関する説明として正しいものを 2 つ選択してください。",
      "choices": [
        "Binary Authorization は Cloud Armor の一部として提供される",
        "Binary Authorization のポリシーで、特定の Attestor が署名したイメージのみのデプロイを許可できる",
        "Binary Authorization は Compute Engine の VM イメージの署名を管理する",
        "Binary Authorization は GKE と Cloud Run へのコンテナイメージのデプロイを、署名と証明書ベースのポリシーで制御する"
      ],
      "answer": [
        1,
        3
      ],
      "explanation": "Binary Authorization は GKE と Cloud Run（一部のモード）へのコンテナデプロイを、イメージに付与された署名（Attestation）のポリシーに基づいて制御します（選択肢D）。ポリシーで特定の Attestor（例: 脆弱性スキャン合格・CI/CD パイプラインの署名）が証明したイメージのみデプロイを許可することで、未承認イメージの本番デプロイを防止できます（選択肢B）。Binary Authorization は Compute Engine の VM イメージではなく、コンテナイメージを対象としています（選択肢C は誤り）。Binary Authorization は Cloud Armor とは独立したサービスです（選択肢A は誤り）。"
    },
    {
      "id": "q134",
      "type": "single",
      "domain": "クラウドソリューション環境の設定",
      "difficulty": "medium",
      "question": "Google Cloud のプロジェクトでリソースが意図せず削除されるリスクを低減したいと考えています。最も効果的な 1 つの対策はどれですか？",
      "choices": [
        "重要なリソース（Cloud SQL インスタンス・GKE クラスターなど）に削除保護（Deletion Protection）を有効にする",
        "Cloud Armor でプロジェクトへのアクセスを IP 制限する",
        "プロジェクトを定期的にスナップショットで保存する",
        "すべての開発者に roles/viewer のみ付与して変更を禁止する"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud SQL・GKE・Compute Engine などの多くのサービスには削除保護（Deletion Protection）機能があります。有効にすると、明示的に削除保護を無効化しない限りリソースを削除できなくなります。二段階の操作が必要なため、誤操作や自動化スクリプトによる意図しない削除を防げます。全開発者を viewer にするとデプロイや設定変更もできなくなり業務に支障が出ます。プロジェクトのスナップショットという機能は Google Cloud には存在しません。Cloud Armor はリクエストトラフィックのフィルタリングで、API 経由のリソース削除を防げません。"
    },
    {
      "id": "q135",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "GKE クラスターで Ingress リソースを使って複数のサービスへのトラフィックをパスベースでルーティングしたいと考えています。/api/* は backend-service に、/* は frontend-service にルーティングする設定として最も適切なものはどれですか？",
      "choices": [
        "Cloud DNS で /api と / の 2 つのレコードセットを作成してルーティングする",
        "GKE の Ingress リソースに rules とパスベースのバックエンド設定を YAML で記述する",
        "GCE のファイアウォールルールでパスごとにトラフィックを振り分ける",
        "Cloud Functions でリクエストパスを判定して各サービスにリクエストを転送する"
      ],
      "answer": [
        1
      ],
      "explanation": "Kubernetes Ingress リソースを使うと HTTP/HTTPS トラフィックをパス（/api/*、/* など）やホスト名ベースで複数のバックエンドサービスにルーティングできます。GKE では Ingress を作成すると自動的に Google Cloud HTTP(S) ロードバランサーがプロビジョニングされます。ファイアウォールルールはポートやプロトコルベースの制御であり、HTTP パスのルーティングはできません。Cloud DNS は DNS レイヤーでの名前解決に使用し、同一ドメイン内のパスルーティングには使えません。Cloud Functions でのプロキシは追加のレイテンシが生じ、Ingress で十分な要件に対しては過剰な構成です。"
    },
    {
      "id": "q136",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "本番環境の GKE クラスターにブルー/グリーンデプロイを実施したいと考えています。現在のバージョン（ブルー）と新バージョン（グリーン）を並行稼働させ、切り替えをゼロダウンタイムで行う方法として最も適切なものはどれですか？",
      "choices": [
        "ブルーとグリーンの Deployment を別の Namespace に作成し、gcloud コマンドで Namespace を切り替える",
        "Kubernetes の StatefulSet を使ってブルーとグリーンのローリング更新を管理する",
        "ブルーとグリーンに異なるラベルを付与した Deployment を同一クラスターに作成し、Service のセレクターを切り替えてトラフィックを移行する",
        "GKE のノードプールをブルーとグリーンに分けて、Cloud DNS でトラフィックを切り替える"
      ],
      "answer": [
        2
      ],
      "explanation": "ブルー/グリーンデプロイの標準的な実装は、ブルー（app: my-app, version: blue）とグリーン（app: my-app, version: green）のラベルを持つ Deployment を並行稼働させ、Service のセレクターを version: blue から version: green に変更することでトラフィックを瞬時に切り替えます。問題があれば version: blue に戻すだけです。Namespace の切り替えでは Service のエンドポイントが変わるため、クライアント側の設定変更が必要になります。StatefulSet はデータを持つステートフルなアプリ向けで、ブルー/グリーンデプロイの一般的な手法ではありません。ノードプールの分割と Cloud DNS 切り替えは大きな構成変更が必要で、Service セレクター変更より複雑です。"
    },
    {
      "id": "q137",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Artifact Registry に保存したコンテナイメージに対して、プッシュされるたびに自動的に脆弱性スキャンを実行したいと考えています。最も適切なサービスはどれですか？",
      "choices": [
        "Cloud Run のデプロイ時にスキャンオプションを設定する",
        "Cloud Build でスキャンステップを cloudbuild.yaml に追加する",
        "Cloud Scheduler で定期的に trivy スキャンを実行する Cloud Functions をトリガーする",
        "Artifact Registry の自動スキャン機能（Container Analysis）を有効にする"
      ],
      "answer": [
        3
      ],
      "explanation": "Artifact Registry では Container Analysis（Container Scanning API）を有効にすると、コンテナイメージがプッシュされるたびに自動的に OS パッケージとコードの脆弱性がスキャンされます。脆弱性の結果は Artifact Registry コンソールや API で確認できます。Cloud Build でのスキャンは有効ですが、Artifact Registry のネイティブ機能を使う方が設定が簡単で確実です。Cloud Run のデプロイ時スキャンオプションは標準機能として提供されていません。Cloud Scheduler + Cloud Functions によるスキャンは定期的なスキャンであり、プッシュごとのリアルタイムスキャンを実現するにはイベントドリブンな設定が必要です。"
    },
    {
      "id": "q138",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "easy",
      "question": "GKE クラスターで現在実行中の Deployment の Pod 数（レプリカ数）を 3 から 5 に変更するコマンドはどれですか？",
      "choices": [
        "kubectl update deployment my-deployment --replicas=5",
        "kubectl set replicas my-deployment 5",
        "kubectl deployment scale my-deployment 5",
        "kubectl scale deployment my-deployment --replicas=5"
      ],
      "answer": [
        3
      ],
      "explanation": "kubectl scale deployment <NAME> --replicas=<N> が Deployment のレプリカ数を変更するコマンドです。即座に反映され、Pod が追加または削除されます。CI/CD での自動化にも使用できます。kubectl update deployment は存在しないサブコマンドで、設定変更には kubectl edit または kubectl set が使われます。kubectl set replicas はコマンドとして存在しません（kubectl set image など特定のサブコマンドは存在しますが replicas はありません）。kubectl deployment scale も存在しないコマンドです（kubectl scale deployment が正しい順序です）。"
    },
    {
      "id": "q139",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "medium",
      "question": "Cloud Functions（第 2 世代）をデプロイした後、アクセスしようとしても「403 Forbidden」エラーが発生します。最も可能性の高い原因はどれですか？",
      "choices": [
        "Cloud Functions のリージョンが正しく設定されていない",
        "Cloud Functions のメモリが不足している",
        "Cloud Functions の IAM ポリシーで allUsers または呼び出し元サービスアカウントに roles/run.invoker が付与されていない",
        "Cloud Functions のタイムアウトが短すぎる"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Functions 第 2 世代は Cloud Run の上に構築されており、デフォルトでは未認証の呼び出しが禁止されています。403 エラーは認証・認可の失敗を示します。公開アクセスには allUsers に roles/run.invoker を付与し、サービス間連携には呼び出し元サービスアカウントに roles/run.invoker を付与します。リージョンの設定ミスはデプロイエラーや接続先の問題を起こしますが、403 エラーの主原因ではありません。タイムアウトは 504 Gateway Timeout が発生します。メモリ不足は 500 Internal Server Error か OOM によるクラッシュを引き起こします。"
    },
    {
      "id": "q140",
      "type": "single",
      "domain": "クラウドソリューションのデプロイと実装",
      "difficulty": "hard",
      "question": "GKE クラスターに複数の環境（dev・staging・prod）を同一クラスター内で管理しています。各環境のリソースを分離しつつ、本番環境には追加のセキュリティポリシーを適用したいと考えています。最も効率的な構成はどれですか？",
      "choices": [
        "環境ごとにラベルを付けたノードプールを作成して Pod を配置する",
        "環境ごとに別個の GKE クラスターを作成する",
        "Cloud Armor ポリシーを環境ごとに設定して通信を制限する",
        "Namespace で環境を分離し、NetworkPolicy と ResourceQuota で分離を強化する"
      ],
      "answer": [
        3
      ],
      "explanation": "Kubernetes Namespace で dev・staging・prod を分離し、NetworkPolicy でネームスペース間通信を制限、ResourceQuota でリソース使用量を制限、PodSecurityAdmission（PSA）で本番のみ Restricted ポリシーを適用するアプローチが効率的です。単一クラスターなのでインフラコストを抑えながら論理分離を実現できます。環境ごとの別クラスターはコストが高く管理負荷も増えます。ノードプールの分離はコンピュートリソースの分離には有効ですが、Namespace によるセキュリティポリシー適用と組み合わせる必要があります。Cloud Armor はインターネットからのトラフィック制御で、クラスター内の Namespace 間の分離には使えません。"
    },
    {
      "id": "q141",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud Monitoring で GKE クラスターの Pod 数とノード CPU 使用率を単一のダッシュボードで監視したいと考えています。設定方法として最も適切なものはどれですか？",
      "choices": [
        "GKE コンソールのワークロードページを参照する",
        "Cloud Logging のログエクスポートで BigQuery に転送してダッシュボードを作成する",
        "kubectl top pods と kubectl top nodes の出力を定期的にファイルに保存する",
        "Cloud Monitoring のダッシュボードに kubernetes.io のシステムメトリクスチャートを追加する"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Monitoring には GKE のシステムメトリクス（kubernetes.io/container/cpu/request_utilization・kubernetes.io/node/cpu/allocatable_utilization など）が自動的に収集されます。Cloud Monitoring コンソールでダッシュボードを作成し、これらのメトリクスを使ったチャート（Pod 数・ノード CPU 等）を追加することで単一の監視画面を作れます。BigQuery への転送は長期分析には有効ですが、リアルタイムダッシュボードには向いていません。GKE コンソールのワークロードページはリソース別の詳細確認には使えますが、カスタムダッシュボードは Cloud Monitoring で作成します。kubectl top の出力をファイル保存する方法はリアルタイム性がなく、運用監視には不適切です。"
    },
    {
      "id": "q142",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "本番の Cloud Run サービスで週に 1〜2 回、ランダムに高レイテンシが発生しています。問題を再現する前に発生時の詳細情報を収集したいと考えています。最も効果的なアプローチはどれですか？",
      "choices": [
        "Cloud Monitoring のアップタイムチェックでレイテンシしきい値アラートを設定し、発生時に通知を受けてログを手動確認する",
        "問題が発生するまで毎日ログを手動でスキャンする",
        "Cloud Trace のサンプリングレートを 100% に設定し、Cloud Monitoring でレイテンシ p99 アラートを設定して Pub/Sub 通知で自動的にスナップショットを取得する",
        "Cloud Run のリビジョンをすべて削除して再デプロイする"
      ],
      "answer": [
        0
      ],
      "explanation": "Cloud Monitoring のアップタイムチェックとカスタムアラートポリシーでレイテンシのしきい値（例: p99 > 5秒）を設定し、アラート発生時に通知を受け取ります。その後 Cloud Logging でその時間帯のエラーログ・リクエストログを確認し、Cloud Trace でリクエストのトレースを分析することで問題箇所を特定できます。この組み合わせが最も実践的で費用対効果が高いです。サンプリングレート 100% は本番トレースのコストが高くなりすぎるため非現実的です。毎日の手動スキャンはランダム発生のバグに対して非効率です。再デプロイは問題の根本原因を特定せずに行う行為で、再発の可能性があります。"
    },
    {
      "id": "q143",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "Cloud SQL for MySQL インスタンスで特定のクエリが遅いと報告されています。クエリのパフォーマンスを分析するための最初のステップとして最も適切なものはどれですか？",
      "choices": [
        "Cloud SQL インスタンスのマシンタイプをすぐにアップグレードする",
        "Cloud SQL の Query Insights でスロークエリログと実行計画を確認する",
        "Cloud Logging でエラーログを確認する",
        "Cloud Monitoring でインスタンスの CPU メトリクスを確認する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cloud SQL の Query Insights は、スロークエリを可視化してクエリの実行時間・ロック待ち時間・スキャン行数などの統計を提供します。問題のあるクエリとその実行計画（EXPLAIN）を確認することで、インデックスの欠如・フルテーブルスキャン・非効率な結合などの原因を特定できます。マシンタイプのアップグレードは根本原因の特定なしに行う場合、一時的な改善に過ぎない場合があります。Cloud Logging のエラーログはクエリエラーの確認には有効ですが、スロークエリの実行計画分析には Query Insights の方が適しています。CPU メトリクスの確認は負荷の存在を確認できますが、どのクエリが原因かは判断できません。"
    },
    {
      "id": "q144",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "easy",
      "question": "Cloud Logging に出力されたアプリログから、特定のユーザー ID（user_id: U001）が関与したすべてのエラーを調査したいと考えています。効率的にログを絞り込む方法はどれですか？",
      "choices": [
        "Cloud Monitoring でカスタムメトリクスを作成してダッシュボードで確認する",
        "Cloud Trace でユーザー U001 のリクエストを検索する",
        "ログエクスプローラーで jsonPayload.user_id=\"U001\" AND severity>=\"ERROR\" のフィルターを使用する",
        "Cloud Logging の全ログをダウンロードしてローカルで grep する"
      ],
      "answer": [
        2
      ],
      "explanation": "Cloud Logging のログエクスプローラーでは、jsonPayload.user_id=\"U001\" で JSON ペイロード内の特定フィールド値によるフィルタリングができ、AND severity>=\"ERROR\" を追加することでエラー以上のログのみに絞り込めます。リアルタイムで大量のログからピンポイントで条件を絞り込める最も効率的な方法です。全ログのダウンロードはデータ量が膨大で非効率です。Cloud Monitoring のカスタムメトリクスはログベースのメトリクスを作成できますが、特定ユーザーのログ調査には不向きです。Cloud Trace はリクエストのトレース分析で、ユーザー ID によるログ検索とは異なる目的のツールです。"
    },
    {
      "id": "q145",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "medium",
      "question": "GKE クラスターのコントロールプレーンとノードのバージョンが乖離してきたため、ノードをアップグレードしたいと考えています。ノードプールのアップグレードを最もダウンタイムを短くして行う方法はどれですか？",
      "choices": [
        "GKE マスター（コントロールプレーン）だけをアップグレードしてノードはそのままにする",
        "ノードプールを削除して新しいバージョンで再作成する",
        "kubectl drain で全ノードを手動で退避させてからアップグレードする",
        "gcloud container clusters upgrade コマンドでノードプールのサージアップグレードを使用する"
      ],
      "answer": [
        3
      ],
      "explanation": "gcloud container clusters upgrade <CLUSTER> --node-pool=<POOL> コマンドを使い、サージアップグレード設定（max-surge=1 などで同時にアップグレードする追加ノード数を指定）を適用することで、ローリング方式でノードを 1 台ずつ（または数台ずつ）アップグレードしてダウンタイムを最小化できます。ノードプールの削除・再作成は全 Pod が一時的に他ノードに移動するため影響が大きいです。手動 drain は手順が多くヒューマンエラーのリスクがあります。コントロールプレーンのみのアップグレードはバージョン乖離が継続してサポート外になる可能性があります。"
    },
    {
      "id": "q146",
      "type": "single",
      "domain": "クラウドソリューションの正常な運用の確保",
      "difficulty": "hard",
      "question": "あなたのチームは Cloud Error Reporting を使っています。Cloud Run サービスで Python の例外が発生した場合に Error Reporting が自動的に検知するための条件はどれですか？",
      "choices": [
        "Cloud Run のログに severity=ERROR で構造化ログを出力する必要がある",
        "Error Reporting の SDK を Python アプリに明示的にインストールして設定する必要がある",
        "Cloud Monitoring のアラートポリシーを先に作成する必要がある",
        "例外のスタックトレースが Cloud Logging に出力されていれば自動的に検知される"
      ],
      "answer": [
        3
      ],
      "explanation": "Cloud Error Reporting は Cloud Logging に出力された例外スタックトレース（Python の Traceback を含む）を自動的に検知してエラーグループとして集約します。Cloud Run や App Engine などのサービスは Cloud Logging に標準で接続されているため、アプリが例外をログ出力（標準エラーや構造化ログ）するだけで自動的に Error Reporting に表示されます。SDKのインストールは任意でより詳細な制御が必要な場合に使用しますが、必須ではありません。severity=ERROR の設定も推奨ですが、スタックトレースの自動検知には必須ではありません。Cloud Monitoring のアラートポリシーは Error Reporting と独立した設定です。"
    },
    {
      "id": "q147",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたの会社では Google Cloud の特定のサービス（Cloud Storage と BigQuery）へのアクセスを会社の管理する特定のデバイスからのみに制限したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "IAM Conditions に時間帯条件を追加して業務時間外のアクセスを禁止する",
        "Cloud Armor ポリシーで会社のオフィス IP のみを許可する",
        "VPC Service Controls のアクセスレベルで会社所有デバイスの IP 範囲を設定して制限する",
        "Cloud SQL Auth Proxy を使ってデバイス認証を行う"
      ],
      "answer": [
        2
      ],
      "explanation": "VPC Service Controls のアクセスレベル（Access Levels）では、送信元 IP アドレス・デバイスポリシー（会社管理デバイスかどうかなど）を条件として設定できます。アクセスレベルを VPC Service Controls の境界ポリシーに組み込むことで、指定条件を満たすアクセスのみ Cloud Storage・BigQuery などのサービスへのアクセスを許可できます。Cloud Armor は HTTP(S) ロードバランサーのトラフィックフィルタリングで、直接の Cloud Storage/BigQuery API アクセスには適用されません。IAM Conditions の時間帯制限はデバイス識別とは別の条件で、デバイスの管理状態を確認する機能はありません。Cloud SQL Auth Proxy は Cloud SQL 専用の接続プロキシです。"
    },
    {
      "id": "q148",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "easy",
      "question": "Google Cloud の IAM でユーザーに付与されているロールを確認するためのコマンドはどれですか？",
      "choices": [
        "gcloud projects list-roles --member=<USER_EMAIL>",
        "gcloud iam check-access <USER_EMAIL> --project=<PROJECT_ID>",
        "gcloud iam users get-roles <USER_EMAIL>",
        "gcloud projects get-iam-policy <PROJECT_ID> --flatten=bindings[].members --format=table --filter=bindings.members:<USER_EMAIL>"
      ],
      "answer": [
        3
      ],
      "explanation": "gcloud projects get-iam-policy にフィルターを組み合わせることで、特定ユーザーに付与されているロールのバインディングを確認できます。--flatten=bindings[].members でバインディングを展開し、--filter=bindings.members:<EMAIL> で特定メンバーに絞り込みます。また、gcloud projects get-iam-policy の出力を jq でパースする方法も一般的です。gcloud iam users get-roles は存在しないコマンドです。gcloud projects list-roles も存在しません。gcloud iam check-access は存在しないサブコマンドです（アクセス確認には Policy Analyzer か gcloud beta iam analyze-policies を使います）。"
    },
    {
      "id": "q149",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "hard",
      "question": "マルチテナントの SaaS アプリケーションで、テナントごとに異なる Cloud KMS キーを使ってデータを暗号化しています。テナント C のデータにテナント D のキーを使った暗号化が行われないよう保証するための最も適切な設計はどれですか？",
      "choices": [
        "Cloud KMS の代わりに Google のデフォルト暗号化を使いテナント間の分離をアプリ層で管理する",
        "全テナントで共通のキーを使用してアプリ内の論理分離でテナントを区別する",
        "1 つのキーリングに全テナントのキーを作成し、アプリが正しいキーを選択するロジックを実装する",
        "テナントごとにキーリングを分け、テナントのサービスアカウントにはそのテナントのキーリングのみへのアクセスを IAM で制限する"
      ],
      "answer": [
        3
      ],
      "explanation": "テナントごとにキーリングを分け、テナント固有のサービスアカウントに当該キーリングのみへの roles/cloudkms.cryptoKeyEncrypterDecrypter を IAM で付与することで、テナント間のキーアクセスを IAM レベルで強制的に分離できます。誤ったキーを使う可能性をアプリロジックではなくインフラ（IAM）レベルで排除できます。1 つのキーリングに全テナントのキーをまとめる場合、サービスアカウントが他テナントのキーにアクセスできる可能性があり、アプリロジックのバグが情報漏洩につながります。デフォルト暗号化はテナント分離を保証しません。全テナントでの共通キーはテナント分離の観点で最も危険な設計です。"
    },
    {
      "id": "q150",
      "type": "single",
      "domain": "アクセスとセキュリティの構成",
      "difficulty": "medium",
      "question": "あなたのチームは Cloud Storage バケットに保存された PII（個人情報）データが他のサービスに誤って転送されないようにしたいと考えています。データの流出を防ぐための最も包括的な対策はどれですか？",
      "choices": [
        "Cloud Storage バケットのロギングを有効にして不審なアクセスを監査する",
        "VPC Service Controls のサービス境界を設定して Cloud Storage への社外アクセスを制限する",
        "Cloud DLP（Data Loss Prevention）でバケットの定期スキャンを実行する",
        "Cloud Storage バケットの ACL をプライベートに設定する"
      ],
      "answer": [
        1
      ],
      "explanation": "VPC Service Controls のサービス境界（Service Perimeter）は Cloud Storage などのサービスの周囲に論理的な境界を設定し、境界外への意図しないデータ転送（データ流出経路）を遮断します。たとえば、管理者が誤って gsutil cp でバケット内のデータを外部プロジェクトにコピーしようとしても VPC-SC によって拒否されます。ACL のプライベート設定は公開アクセスの防止に有効ですが、認証済みユーザーによる流出は防げません。Cloud DLP のスキャンは既存データの PII 検出に有効ですが、リアルタイムの転送防止ではありません。ロギングは事後監査には有効ですが、事前予防ではありません。"
    }
  ]
};
