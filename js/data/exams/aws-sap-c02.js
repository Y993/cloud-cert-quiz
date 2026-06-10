// AWS Certified Solutions Architect - Professional (SAP-C02) 問題データ — tools/build-exam.js により生成
window.CERT_EXAMS = window.CERT_EXAMS || {};
window.CERT_EXAMS["aws-sap-c02"] = {
  "meta": {
    "id": "aws-sap-c02",
    "title": "AWS Certified Solutions Architect - Professional",
    "code": "SAP-C02",
    "provider": "aws"
  },
  "questions": [
    {
      "id": "q001",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "グローバルに展開する金融機関が AWS Organizations を使用して 80 以上の AWS アカウントを管理しています。セキュリティチームは、すべての本番アカウントで Amazon S3 のパブリックアクセスブロックを強制的に有効化し、かつ開発アカウントでは IAM ユーザーの作成を禁止したいと考えています。本番 OU と開発 OU はそれぞれ別の OU に整理されています。最小限の運用負荷でこれらのポリシーを適用するには、どの方法が最も適切ですか？",
      "choices": [
        "各アカウントの管理者に AWS Config ルールを手動でデプロイするよう依頼し、非準拠リソースを自動修復する Lambda 関数を設定する",
        "Organizations の SCP（サービスコントロールポリシー）を作成し、本番 OU には S3 パブリックアクセスブロックの無効化を拒否する SCP を、開発 OU には IAM ユーザー作成を拒否する SCP をそれぞれアタッチする",
        "AWS Control Tower のガードレールを使用して、全アカウントに同一ポリシーを適用し、後から例外設定で開発アカウントを除外する",
        "IAM アクセスアナライザーを管理アカウントで有効化し、全メンバーアカウントのポリシー違反を検出して SNS 通知を送信する"
      ],
      "answer": [
        1
      ],
      "explanation": "SCP は Organizations の OU 単位でアタッチでき、配下のすべてのアカウントに継承されます。本番 OU に S3 パブリックアクセスブロック無効化の Deny SCP を、開発 OU に IAM ユーザー作成の Deny SCP をアタッチすることで、最小限の運用で要件を満たせます。\n\nA: Config ルールは検出と修復を行いますが、アクション自体を事前に防止する予防的ガードレールではなく、運用負荷も高くなります。\n\nC: Control Tower のガードレールは OU レベルで適用されますが、異なる OU に異なる要件を持つ場合は SCP を直接使う方がシンプルで柔軟です。また Control Tower の初期セットアップには追加の運用負荷が伴います。\n\nD: IAM アクセスアナライザーは外部エンティティへのアクセスを検出するサービスであり、ポリシー強制（予防）ではなく検出（発見）が主目的です。"
    },
    {
      "id": "q002",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業は AWS Organizations で複数のアカウントを管理しており、中央のネットワークアカウントから全アカウントに共有 VPC サブネットを提供したいと考えています。各ビジネスユニットは独自のアカウントを持ち、リソースをその共有サブネットにデプロイする必要があります。最小限のネットワーク管理負荷で実現するアーキテクチャはどれですか？",
      "choices": [
        "各ビジネスユニットのアカウントに VPC を作成し、VPC ピアリングでネットワークアカウントの中央 VPC に接続する",
        "AWS Resource Access Manager（RAM）を使用して、ネットワークアカウントの VPC サブネットを Organizations または特定 OU と共有し、各アカウントのリソースを共有サブネットにデプロイする",
        "Transit Gateway をネットワークアカウントに作成し、各ビジネスユニットのアカウントの VPC をアタッチする。それぞれの VPC に個別のサブネットを作成する",
        "AWS PrivateLink を使用して、ネットワークアカウントのサービスエンドポイントを全アカウントに公開する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS RAM を使った VPC 共有（Shared VPC）は、ネットワークアカウントが VPC サブネットを他アカウントと共有し、各アカウントがそのサブネットにリソースをデプロイできる仕組みです。VPC は1つで済むため管理が集中化でき、運用負荷を最小化できます。\n\nA: VPC ピアリングは推移的ルーティングをサポートしないため、アカウント数が増えると管理が複雑になります。各アカウントに VPC を作成する必要があるため共有サブネットの要件を直接満たしません。\n\nC: Transit Gateway はルーティングハブとして有用ですが、各アカウントに VPC とサブネットを別途作成する必要があり、「共有サブネット」への直接デプロイとはなりません。\n\nD: AWS PrivateLink はサービスエンドポイントの共有に使うもので、サブネットリソースの共有には対応していません。"
    },
    {
      "id": "q003",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある大企業が AWS Control Tower を使って Landing Zone を構築しています。新しいアカウントが自動的にプロビジョニングされる際に、必ず CloudTrail の組織レベルのトレイルが有効になり、ログが中央のセキュリティアカウントの S3 バケットに集約される必要があります。さらに、CloudTrail の無効化は管理者でも禁止したいと考えています。最も適切な実装方法はどれですか？",
      "choices": [
        "各アカウントのプロビジョニング後に Lambda 関数を呼び出して CloudTrail を有効化し、S3 バケットポリシーで外部からの無効化を拒否する",
        "Organizations の管理アカウントで組織レベルのトレイルを作成し、全メンバーアカウントのイベントを中央 S3 バケットに集約する。SCP で cloudtrail:DeleteTrail および cloudtrail:StopLogging を Deny する",
        "AWS Config の管理者アカウントから CloudTrail 有効化ルールをデプロイし、非準拠アカウントを自動修復する Systems Manager Automation を設定する",
        "Control Tower の必須ガードレール（Mandatory guardrail）として CloudTrail 強制を有効化するだけで、SCP は不要"
      ],
      "answer": [
        1
      ],
      "explanation": "Organizations の組織レベルトレイルは管理アカウントから作成することで全メンバーアカウントのイベントを自動集約できます。SCP で cloudtrail:DeleteTrail と cloudtrail:StopLogging を Deny することで、メンバーアカウントの管理者が CloudTrail を無効化できなくなります。これが最も確実な予防的制御です。\n\nA: Lambda による事後有効化は自動化できますが、有効化と無効化の間にギャップが生まれる可能性があり、完全な予防にはなりません。S3 バケットポリシーで CloudTrail の無効化を防ぐことはできません。\n\nC: Config は検出・修復が主目的で、無効化の防止（予防的制御）ではありません。修復の間に監査ギャップが発生します。\n\nD: Control Tower の必須ガードレールは CloudTrail の基本設定を行いますが、外部からの明示的な無効化防止に SCP が必要なケースもあります。「SCP は不要」という断言は不正確です。"
    },
    {
      "id": "q004",
      "type": "multiple",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "グローバル企業が AWS Organizations でマルチアカウント環境を管理しています。セキュリティ要件として、①全アカウントで GuardDuty を強制的に有効化する、②GuardDuty の検出結果を中央のセキュリティアカウントに集約する、という2点を最小限の運用負荷で実現したいと考えています。実現するために必要な設定を2つ選択してください。",
      "choices": [
        "各アカウントで手動で GuardDuty を有効化し、SNS トピックに検出結果を送信する設定を行う",
        "GuardDuty の委任管理者（Delegated Administrator）として中央のセキュリティアカウントを Organizations に登録する",
        "GuardDuty の委任管理者アカウントから「自動有効化（Auto-enable）」を設定し、新しいアカウントも含めて全アカウントで GuardDuty を自動的に有効化する",
        "SCP で GuardDuty の無効化を禁止し、各アカウントの GuardDuty から個別に EventBridge ルールで中央アカウントに転送する",
        "GuardDuty の組織機能を使わず、各アカウントにて AWS Security Hub へのエクスポートを設定し中央集約する"
      ],
      "answer": [
        1,
        2
      ],
      "explanation": "GuardDuty の Organizations 統合では、委任管理者アカウントを指定すること（B）で中央管理が可能になります。委任管理者から「自動有効化」を設定すること（C）で、既存・新規メンバーアカウントの GuardDuty が自動的に有効化され、検出結果も委任管理者アカウントに自動集約されます。この2つの設定だけで両要件を満たせます。\n\nA: 手動での有効化は新アカウント追加時に手作業が発生し、運用負荷が高くなります。\n\nD: SCP による禁止は有効ですが、検出結果の集約には別途設定が必要で、自動有効化の代替にはなりません。\n\nE: Security Hub は GuardDuty の検出結果を集約できますが、GuardDuty 自体の有効化を自動化する機能ではなく、要件①を満たしません。"
    },
    {
      "id": "q005",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業は既存のオンプレミス Active Directory をアイデンティティプロバイダーとして使用しており、AWS の複数アカウントに対して SSO でアクセスしたいと考えています。社員は既存の AD 資格情報を使い、アカウントと権限を選択してマネジメントコンソールや CLI にアクセスする必要があります。また将来的には新しい SaaS アプリケーションへの SSO も検討しています。最も適切な構成はどれですか？",
      "choices": [
        "各 AWS アカウントに IAM ユーザーを作成し、オンプレミス AD のグループと対応するポリシーを手動で割り当てる",
        "AWS IAM Identity Center（旧 AWS SSO）を有効化し、オンプレミス AD と AD Connector または Managed AD でフェデレーションを設定する。Organizations 内の全アカウントと権限セットを IAM Identity Center から一元管理する",
        "各アカウントに IAM Identity Provider を設定し、SAML 2.0 フェデレーションをオンプレミス AD FS で構成する",
        "AWS Cognito User Pool を作成し、オンプレミス AD をフェデレーション先として設定する。アカウントアクセスは Cognito のトークンを使って IAM AssumeRole で実現する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS IAM Identity Center は Organizations と統合しており、1か所で複数アカウントへの SSO と権限セット管理が可能です。オンプレミス AD とは AD Connector（既存 AD に直接接続）または AWS Managed Microsoft AD（信頼関係設定）でフェデレーションできます。将来の SaaS アプリへの SSO も IAM Identity Center から設定できます。\n\nA: 各アカウントへの IAM ユーザー作成は、アカウント数が増えると管理が指数的に複雑になり、SSO の要件を満たしません。\n\nC: アカウントごとに SAML フェデレーションを設定する方法は可能ですが、80 アカウントなどの大規模環境では設定と管理が非常に煩雑です。IAM Identity Center はこの課題を解決するために設計されています。\n\nD: Cognito は主にエンドユーザー向け Web/モバイルアプリの認証に使うサービスであり、社員の AWS マネジメントコンソールアクセス管理には適していません。"
    },
    {
      "id": "q006",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "medium",
      "question": "ある企業が AWS Organizations の管理アカウントから複数のメンバーアカウントにコスト配分タグを強制適用したいと考えています。すべてのリソースに「CostCenter」タグが付いていない場合はリソース作成を拒否し、タグ付けポリシーを Organizations の OU レベルで管理したいと考えています。最も適切な方法はどれですか？",
      "choices": [
        "AWS Config のマネージドルール「required-tags」を全アカウントにデプロイし、タグなしリソースを自動削除する Lambda 関数を設定する",
        "Organizations でタグポリシー（Tag Policies）を有効化し、CostCenter タグを必須とするタグポリシーを該当 OU にアタッチする。さらに SCP で aws:RequestTag 条件を使ってタグなしリソース作成を Deny する",
        "IAM パーミッションバウンダリーを全アカウントに設定し、CostCenter タグが含まれないリクエストを拒否する条件を追加する",
        "AWS Service Catalog を使って全リソースをカタログ化し、製品テンプレートにタグを埋め込む。Service Catalog 外でのリソース作成を SCP で禁止する"
      ],
      "answer": [
        1
      ],
      "explanation": "Organizations のタグポリシーはタグのキーと値の形式を標準化しますが、単独では強制的な拒否はできません。SCP で aws:RequestTag 条件キーを使って CostCenter タグがないリクエストを Deny することで、タグなしリソース作成を事前に防止できます。この組み合わせが最も直接的かつ効果的です。\n\nA: Config ルールは検出・修復が目的であり、リソース作成を事前に防止（予防的制御）する機能ではありません。自動削除は誤削除のリスクを生じます。\n\nC: パーミッションバウンダリーは IAM エンティティの権限の上限を設定するものであり、全アカウントのすべてのリソース作成に対してタグ条件を適用するには SCP の方が適切です。\n\nD: Service Catalog は標準化されたプロビジョニングに有効ですが、すべてのリソースを Service Catalog 経由に制限するのは現実的な運用制約が大きく、柔軟性が損なわれます。"
    },
    {
      "id": "q007",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "多国籍企業が AWS に移行を進めており、欧州のデータ主権規制（GDPR）により欧州顧客のデータは EU リージョン外に出てはならないという要件があります。組織は AWS Organizations で管理されており、EU 向けのアカウントが特定の OU に集約されています。誤って EU 以外のリージョンにリソースがデプロイされることを防ぐ最も適切な方法はどれですか？",
      "choices": [
        "各アカウントの IAM ユーザーに対して、EU リージョン以外でのリソース作成を拒否する IAM ポリシーを追加する",
        "EU OU に対して SCP を作成し、aws:RequestedRegion 条件でアクセス許可するリージョンを eu-west-1、eu-central-1 などの EU リージョンのみに制限する Deny ルールを設定する",
        "AWS Config ルールを使って EU 以外のリージョンで作成されたリソースを検出し、自動的に削除する Lambda 関数を設定する",
        "IAM アクセスアナライザーのポリシー検証機能を使って、EU 以外のリージョンを参照するポリシーを定期的にスキャンして削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "SCP の aws:RequestedRegion グローバル条件キーを使うと、許可するリージョンをホワイトリスト方式で指定できます。EU OU にこの SCP をアタッチすることで、配下のすべてのアカウントで EU 以外のリージョンへの API 呼び出しが拒否され、誤ったリージョンへのデプロイを予防的に防止できます。\n\nA: IAM ユーザー単位のポリシーは管理が複雑で、IAM ロールや新規ユーザーへの適用漏れが生じるリスクがあります。SCP は全プリンシパルに適用されるため確実性が高いです。\n\nC: Config は事後検出であり、データが EU 外に一時的にでも書き込まれる可能性があります。データ主権規制への対応には事前防止が必要です。\n\nD: IAM アクセスアナライザーはポリシーの論理的な問題を検出するツールであり、リージョン制御やリソースデプロイの防止機能はありません。"
    },
    {
      "id": "q008",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations 内の複数アカウントで Reserved Instances と Savings Plans のコスト最適化を行いたいと考えています。購入は財務チームが管理する専用の購買アカウントで一元化し、RI と Savings Plans の割引を全メンバーアカウントに適用したいと考えています。また、メンバーアカウントが独自に RI を購入することは禁止したいと考えています。最も適切な設定はどれですか？",
      "choices": [
        "各メンバーアカウントで RI を購入し、Cost Explorer のリソース最適化レコメンデーションを定期的に確認する",
        "Organizations の一括請求（Consolidated Billing）を有効化して割引を共有し、購買アカウントで RI と Savings Plans を購入する。SCP でメンバーアカウントの ec2:PurchaseReservedInstancesOffering および aws-marketplace:Subscribe を Deny する",
        "AWS Cost and Usage Report（CUR）を S3 に出力し、Athena でクロスアカウントの RI 使用率を分析して手動で配分する",
        "Organizations の管理アカウントで RI を購入し、Resource Access Manager で各メンバーアカウントに RI を共有する"
      ],
      "answer": [
        1
      ],
      "explanation": "Organizations の一括請求では、購買アカウントで購入した RI と Savings Plans の割引が、同一 Organizations 内の他アカウントのマッチするリソース使用量に自動適用されます。SCP でメンバーアカウントの RI 購入 API を Deny することで、独自購入を防止し購買の一元管理を実現できます。\n\nA: 各メンバーが個別購入すると購買が分散し、ボリュームディスカウントや一元管理の恩恵を受けられません。\n\nC: CUR と Athena は分析・可視化に有効ですが、RI の共有や購入制限の実装には対応していません。\n\nD: RAM は特定の AWS リソース（VPC サブネット、Transit Gateway など）を共有するサービスであり、RI は RAM の共有対象ではありません。RI の割引共有は一括請求の機能です。"
    },
    {
      "id": "q009",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "グローバルな製造企業が AWS で事業継続計画（BCP）を策定しています。プライマリリージョンは ap-northeast-1（東京）で、DR サイトは ap-southeast-1（シンガポール）です。RTO は 1 時間、RPO は 15 分です。コストを最小化しながらこの要件を満たすアーキテクチャはどれですか？",
      "choices": [
        "アクティブ-アクティブのマルチリージョン構成を構築し、Route 53 レイテンシールーティングで両リージョンに常時トラフィックを分散する",
        "ウォームスタンバイ構成を採用し、DR リージョンに縮小スケールのリソースを常時稼働させる。Aurora Global Database と S3 クロスリージョンレプリケーションで RPO 15 分を確保し、フェイルオーバー時に Auto Scaling でキャパシティを拡張する",
        "コールドスタンバイ（パイロットライト）構成を採用し、DR リージョンには最小限のコアコンポーネントのみを起動状態に保つ。フェイルオーバー時に CloudFormation で完全なインフラをデプロイする",
        "バックアップ＆リストア戦略を採用し、1 時間ごとに AMI と RDS スナップショットを DR リージョンにコピーする"
      ],
      "answer": [
        1
      ],
      "explanation": "ウォームスタンバイはコストを抑えつつ RTO 1 時間・RPO 15 分を達成できる最適な選択です。Aurora Global Database のレプリケーション遅延は通常 1 秒未満で RPO 15 分は容易に達成できます。縮小スケールのリソースが稼働しているため、フェイルオーバー時は Auto Scaling でスケールアップするだけで RTO 1 時間を達成できます。\n\nA: アクティブ-アクティブは最高の可用性を提供しますが、DR 要件以上のコストがかかり「コスト最小化」要件に反します。\n\nC: パイロットライトはウォームスタンバイよりコストは低いですが、CloudFormation での完全デプロイには通常 1 時間以上かかる場合があり、RTO 1 時間の達成が難しくなります。\n\nD: バックアップ＆リストアは 1 時間ごとのスナップショットでは RPO 15 分を満たせません。またリストア時間も RTO 1 時間の達成が困難です。"
    },
    {
      "id": "q010",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある大手保険会社が AWS Organizations で管理するマルチアカウント環境に、新たにパートナー企業のアカウントをゲストとして参加させる必要があります。パートナーは特定の共有サービス（S3 バケット、API Gateway）にのみアクセス可能とし、他のリソースへのアクセスは一切禁止する必要があります。また、パートナーアカウントを完全に制御下に置くことなく、最小権限を確保したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "パートナー企業を Organizations のメンバーアカウントとして招待し、SCP で許可するサービスを制限する",
        "パートナーアカウントを Organizations に招待せず、クロスアカウント IAM ロールを作成して特定の S3 バケットと API Gateway のみへのアクセスを許可する。リソースベースポリシーでパートナーのアカウント ID を明示的に許可する",
        "パートナー企業の担当者に IAM ユーザーを自社アカウントに作成し、必要なリソースへの IAM ポリシーを付与する",
        "AWS PrivateLink を使用して S3 バケットと API Gateway のエンドポイントをパートナーの VPC に公開し、ネットワークレベルでアクセスを制限する"
      ],
      "answer": [
        1
      ],
      "explanation": "パートナー企業を Organizations のメンバーとして招待することなく、クロスアカウント IAM ロールとリソースベースポリシーを使う方法が最も適切です。これにより Organizations のガバナンス構造を変更せずに最小権限アクセスを提供でき、パートナーアカウントへの制御権も不要です。\n\nA: パートナーを Organizations のメンバーとして招待すると、SCP の管理対象となり、自社の組織ポリシーがパートナーアカウント全体に適用されます。これはパートナーの独立性を侵害し、双方のガバナンスに問題が生じます。\n\nC: 自社アカウントに IAM ユーザーを作成することはセキュリティリスクが高く、パートナーの認証情報管理の責任が自社に生じます。AWS のベストプラクティスはクロスアカウントロールの利用を推奨しています。\n\nD: PrivateLink はネットワーク接続の提供には有効ですが、IAM 認証・認可の代替にはなりません。アクセス制御はリソースポリシーと IAM で行う必要があります。"
    },
    {
      "id": "q011",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "medium",
      "question": "ある企業が AWS Organizations の一括請求を使って 30 以上のアカウントのコストを管理しています。財務チームは各アカウントのコストと、プロジェクト・部門別のコスト配分をリアルタイムに近い粒度で把握したいと考えています。また、月次の予算を超過しそうな場合は自動でアラートを送信したいと考えています。最小限の開発負荷で実現するアーキテクチャはどれですか？",
      "choices": [
        "全アカウントの CloudWatch メトリクスを集約し、カスタムメトリクスでコストを追跡するダッシュボードを構築する",
        "AWS Cost and Usage Report を管理アカウントの S3 バケットに出力し、Athena と QuickSight でクロスアカウントのコスト分析ダッシュボードを構築する。AWS Budgets でアカウントおよびタグ別の予算アラートを設定する",
        "各アカウントに Cost Explorer を有効化し、月次レポートを財務チームのメールアドレスに自動送信するスケジュール設定を行う",
        "Lambda 関数を毎日実行して各アカウントの Cost Explorer API を呼び出し、DynamoDB にデータを蓄積して社内ポータルサイトに表示する"
      ],
      "answer": [
        1
      ],
      "explanation": "CUR（Cost and Usage Report）は組織全体の最も詳細なコストデータを提供し、管理アカウントの S3 に集約されます。Athena でクエリし QuickSight でビジュアライズすることで、部門・プロジェクトタグ別の詳細分析が可能です。AWS Budgets はアカウント別・タグ別の予算設定と SNS/メール アラートを低コードで実現できます。\n\nA: CloudWatch はインフラメトリクス向けであり、AWS コストデータを直接追跡する機能はありません。カスタムメトリクスの構築は開発負荷が高くなります。\n\nC: Cost Explorer の月次レポートは粒度が低く、部門・プロジェクト別の細かい分析や予算超過の自動アラートには対応していません。\n\nD: Lambda を使ったカスタム集計は可能ですが、開発・運用負荷が高く、CUR + Athena + QuickSight の組み合わせより手間がかかります。"
    },
    {
      "id": "q012",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS に移行しており、セキュリティチームはすべての VPC で VPC Flow Logs を有効化し、ログを中央のセキュリティアカウントの CloudWatch Logs に集約することを義務付けています。現在 Organizations 内に 50 のアカウントがあり、将来さらに増加する予定です。新規アカウントにも自動的に適用される最も効率的な方法はどれですか？",
      "choices": [
        "AWS Systems Manager Automation を使って、全アカウントの全 VPC に Flow Logs を手動で有効化するランブックを定期実行する",
        "CloudFormation StackSets を Organizations の管理アカウントから展開し、全アカウント・全リージョンに VPC Flow Logs 設定のスタックをデプロイする。Organizations の自動展開（Automatic Deployments）を有効にすることで新規アカウントにも自動適用される",
        "AWS Config のマネージドルール「vpc-flow-logs-enabled」を全アカウントにデプロイし、非準拠の VPC を自動修復する Config リメディエーションを設定する",
        "各アカウントの担当者に Terraform スクリプトを配布し、全 VPC への Flow Logs 設定を義務付ける運用ガイドラインを策定する"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudFormation StackSets の Organizations 統合では、OU またはアカウント全体にスタックを展開でき、Automatic Deployments 機能により新規メンバーアカウントへも自動展開されます。これにより継続的なガバナンスが実現でき、人手での対応が不要になります。\n\nA: Systems Manager Automation の定期実行では、Flow Logs が一時的に無効化される期間が生じる可能性があり、完全な継続的準拠を保証できません。\n\nC: Config リメディエーションは有効ですが、Flow Logs の「作成」には既存 VPC に対する修復のみ対応しており、中央 CloudWatch Logs へのクロスアカウント送信設定には追加の構成が必要です。StackSets の方が包括的です。\n\nD: 運用ガイドラインと手動スクリプト配布は人的エラーのリスクが高く、規模が拡大するにつれ管理が困難になります。自動化された強制的な適用には対応できません。"
    },
    {
      "id": "q013",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある製造業企業が AWS Organizations で 100 以上の AWS アカウントを管理しています。IT セキュリティポリシーにより、すべての EBS ボリュームは AWS KMS カスタマー管理キー（CMK）で暗号化する必要があります。また、CMK のキーローテーションは年次で自動的に行われる必要があり、キーの削除には 30 日間の待機期間が必要です。これをすべてのアカウントに強制適用する最も効率的な方法はどれですか？",
      "choices": [
        "各アカウントで EC2 の EBS 暗号化デフォルト設定を有効化し、KMS CMK を使用するように設定する。キーポリシーでローテーションと削除待機を設定する",
        "CloudFormation StackSets を使って全アカウントに EC2 EBS デフォルト暗号化（CMK 指定）と KMS キーポリシー（自動ローテーション有効、削除待機 30 日）の設定スタックを展開する。SCP で kms:DisableKeyRotation と kms:ScheduleKeyDeletion（PendingWindowInDays < 30 の場合）を Deny する",
        "AWS Config のカスタムルールを作成して暗号化されていない EBS ボリュームを検出し、Systems Manager Automation で自動暗号化する",
        "AWS Security Hub の暗号化管理機能を使って全アカウントの EBS 暗号化ステータスを監視し、週次レポートを生成して手動対応する"
      ],
      "answer": [
        1
      ],
      "explanation": "StackSets で EBS デフォルト暗号化と KMS キーポリシーを展開し、SCP で kms:DisableKeyRotation と短い削除待機での ScheduleKeyDeletion を Deny することで、予防的かつ自動化された強制が実現できます。StackSets の自動展開により新規アカウントにも適用されます。\n\nA: 各アカウントで手動設定する方法はスケールしません。100 以上のアカウントでは管理が困難で、設定漏れが生じるリスクがあります。\n\nC: Config による事後検出と自動修復では、未暗号化の EBS ボリュームが一時的に存在する期間が生じます。また新規作成時の暗号化強制には「デフォルト暗号化」の有効化が必要で Config だけでは不十分です。\n\nD: Security Hub による監視と週次レポートは完全な検出と報告が目的であり、暗号化の強制的な適用（予防的制御）ではありません。手動対応は運用負荷が高く、コンプライアンスギャップが生じます。"
    },
    {
      "id": "q014",
      "type": "multiple",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境において、全アカウントのセキュリティイベントを一元的に可視化・対応できる体制を構築したいと考えています。GuardDuty、Security Hub、および Config のすべてのデータを中央のセキュリティアカウントに集約し、コンプライアンス状態をダッシュボードで確認できるようにしたいと考えています。実現するために必要な設定を3つ選択してください。",
      "choices": [
        "GuardDuty の委任管理者としてセキュリティアカウントを登録し、Organizations の自動有効化で全アカウントの検出結果を集約する",
        "Security Hub の委任管理者としてセキュリティアカウントを登録し、Organizations の統合でメンバーアカウントの検出結果を中央に集約する",
        "AWS Config の集約設定（Aggregator）でセキュリティアカウントをアグリゲーターとして設定し、全メンバーアカウントのリソース設定とコンプライアンス状態を集約する",
        "CloudTrail を全アカウントで個別に有効化し、各アカウントのログをセキュリティアカウントの S3 バケットに手動でエクスポートする",
        "Amazon Detective をセキュリティアカウントで有効化し、GuardDuty の検出結果の根本原因分析を自動化する"
      ],
      "answer": [
        0,
        1,
        2
      ],
      "explanation": "GuardDuty の委任管理者設定（A）、Security Hub の委任管理者設定（B）、Config Aggregator の設定（C）の3つがそれぞれ必要です。これらを組み合わせることで、脅威検出・セキュリティ標準準拠・リソース設定コンプライアンスをすべて中央から管理できます。\n\nD: CloudTrail の手動エクスポートは組織レベルのトレイルを使えば自動化できます。手動での各アカウントへの設定は非効率で管理負荷が高く、必須要件ではありません。\n\nE: Amazon Detective は GuardDuty と統合した調査ツールとして有用ですが、今回の要件（集約・ダッシュボード）の「必要な設定」ではなく、オプションの追加機能です。3つの選択肢は A・B・C の設定が核心部分です。"
    },
    {
      "id": "q015",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "あるエンタープライズ企業が AWS Direct Connect を使用してオンプレミスデータセンターと AWS を接続しています。冗長性確保のため、2 本の Direct Connect 回線（異なる Direct Connect ロケーション）を使用しており、両方の回線が切断された場合のフェイルオーバーとして Site-to-Site VPN を構成する必要があります。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "2 本の Direct Connect 接続を Transit Gateway にアタッチし、Transit Gateway に Site-to-Site VPN 接続も設定する。BGP のメトリックを調整して Direct Connect を優先ルートとし、VPN をバックアップとして設定する",
        "2 本の Direct Connect 接続を異なる仮想プライベートゲートウェイ（VGW）にアタッチし、各 VGW に Site-to-Site VPN を設定する",
        "1 本の Direct Connect を プライマリとして仮想プライベートゲートウェイに接続し、もう 1 本を別 VPC の VGW に接続する。VPN は最初の VGW にのみ設定する",
        "Direct Connect Gateway を使用して複数リージョンの VPC に接続し、VPN は使用せずに Direct Connect の冗長性のみで要件を満たす"
      ],
      "answer": [
        0
      ],
      "explanation": "Transit Gateway を中心とした構成では、複数の Direct Connect 接続（異なる DX ロケーション）と Site-to-Site VPN を単一の Transit Gateway に集約できます。BGP の AS-PATH プリペンドやコミュニティを使って Direct Connect を優先ルートとし、両 DX 回線が切断された場合に自動で VPN にフェイルオーバーする設計が実現できます。\n\nB: 複数の VGW に分割すると、VPC ごとに異なるルーティングが必要になり管理が複雑化します。Transit Gateway を使うことで複数 VPC への接続も一元管理できます。\n\nC: VPN を1本の VGW にのみ設定すると、もう一方の DX ロケーションへの接続失敗時にフェイルオーバーパスが不完全になります。\n\nD: DX の冗長性だけでは「両回線切断時の VPN フェイルオーバー」要件を満たしません。自然災害や広域障害時に両 DX ロケーションが同時に影響を受けるリスクがあります。"
    },
    {
      "id": "q016",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある大手小売企業が急成長しており、AWS Organizations で管理するマルチアカウント環境で、全アカウントにわたるセキュリティ体制を強化したいと考えています。現在、各チームが独自の IAM ポリシーを管理しており、過剰な権限付与が蔓延しています。IAM Access Analyzer と AWS IAM Identity Center を組み合わせて最小権限を実現する最も効果的なアプローチはどれですか？",
      "choices": [
        "各アカウントの IAM ユーザーと、直接アタッチされたポリシーをすべて棚卸しし、未使用の権限を手動で削除する四半期レビューを実施する",
        "IAM Access Analyzer を Organizations レベルで有効化し、未使用アクセス分析とポリシー生成機能を使って最小権限ポリシーを生成する。IAM Identity Center の権限セットをこれらのポリシーに基づいて更新し、IAM ユーザーを廃止して Identity Center 経由のフェデレーションに移行する",
        "AWS Trusted Advisor のセキュリティチェックを有効化して過剰な IAM 権限を検出し、チームリーダーに週次レポートを送信する",
        "全アカウントに SCP を追加して危険な IAM アクション（iam:*、s3:*、ec2:*）を一括 Deny し、必要な場合は例外申請フローを構築する"
      ],
      "answer": [
        1
      ],
      "explanation": "IAM Access Analyzer の未使用アクセス分析は、実際に使用されているアクションのみを特定し、最小権限ポリシーの生成を自動化します。これを Organizations レベルで有効化することで全アカウントをスキャンできます。Identity Center に統合して IAM ユーザーを排除することで、認証情報の集中管理と権限の一元管理が実現します。\n\nA: 手動の四半期レビューは規模が大きくなると非現実的で、継続的な最小権限の維持には不十分です。\n\nC: Trusted Advisor は過剰な権限の一部を検出しますが、未使用アクション分析の精度と網羅性は IAM Access Analyzer に劣り、IAM Identity Center への移行を促進しません。\n\nD: 危険なアクションの一括 Deny は迅速な対処には見えますが、例外が増え管理が複雑になります。正確な最小権限ポリシーの作成には実際の使用データに基づくアプローチが必要です。"
    },
    {
      "id": "q017",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "medium",
      "question": "ある企業が AWS Organizations でマルチアカウント環境を構築し、中央の Networking アカウントから全アカウントにインターネットアクセスを提供する集中型インターネットゲートウェイアーキテクチャを実装したいと考えています。各スポークアカウントのプライベートサブネットにある EC2 インスタンスが、中央の NAT Gateway 経由でインターネットにアクセスする構成を最小限の管理負荷で実現するには、どのアーキテクチャが最も適切ですか？",
      "choices": [
        "各スポークアカウントの VPC に NAT Gateway を個別に作成し、インターネットゲートウェイも各 VPC に設置する",
        "Networking アカウントに Transit Gateway と集中型 NAT Gateway を配置し、スポーク VPC を Transit Gateway にアタッチする。スポーク VPC のルートテーブルでデフォルトルートを Transit Gateway 経由に設定し、Networking アカウントの VPC で NAT Gateway を経由してインターネットに出る集中型 Egress 構成を実装する",
        "AWS PrivateLink を使用して各スポーク VPC からインターネットへのアクセスを提供する",
        "Networking アカウントの VPC をすべてのスポーク VPC と VPC ピアリングで接続し、各ピアリング接続を経由してインターネットにアクセスする"
      ],
      "answer": [
        1
      ],
      "explanation": "Transit Gateway を使った集中型 Egress 構成（Centralized Egress）は AWS が推奨するマルチアカウントのインターネットアクセス管理パターンです。NAT Gateway を1か所（Networking アカウント）に集約することで、IP アドレス管理、コスト削減、トラフィック制御が一元化されます。\n\nA: 各 VPC に NAT Gateway を個別作成すると、コストが増加し、管理が分散してセキュリティポリシーの適用も複雑になります。\n\nC: PrivateLink は AWS サービスやプライベートサービスへの接続を提供するものであり、インターネットへのアクセスを提供する機能はありません。\n\nD: VPC ピアリングは推移的ルーティングをサポートしないため、スポーク VPC から Networking VPC を経由してさらにインターネットへ出るルーティングは標準的な VPC ピアリングでは実現できません。"
    },
    {
      "id": "q018",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で 200 以上のアカウントを管理しています。財務チームは毎月末に全アカウントの S3 ストレージコストを詳細に把握したいと考えており、各バケットの種類（ストレージクラス別）、データ転送量、リクエスト数を含む月次レポートを自動生成したいと考えています。また、ストレージが急増した場合はリアルタイムでアラートを受け取りたいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各アカウントで S3 Storage Lens を有効化し、月次レポートを各担当者のメールに自動送信する",
        "Organizations の管理アカウントで S3 Storage Lens 組織レベルダッシュボードを設定し、全アカウントの詳細メトリクスを S3 に日次エクスポートする。Athena で月次集計クエリを実行し、CloudWatch メトリクスでストレージ急増の CloudWatch Alarm を設定する",
        "各アカウントに Cost and Usage Report（CUR）をデプロイし、S3 コストのフィルターを Athena で実行する Lambda 関数を毎月実行する",
        "AWS Billing and Cost Management コンソールで手動でコストエクスプローラーを確認し、毎月末に財務チームがスクリーンショットを保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 Storage Lens の組織レベルダッシュボードは Organizations と統合し、全アカウント・全バケットのストレージクラス別使用量、データ転送、リクエスト数を詳細に把握できます。日次エクスポートを S3 に出力して Athena で集計すれば月次レポートが自動化できます。CloudWatch でストレージ急増を検知するアラームも構成できます。\n\nA: 各アカウントで個別に設定すると管理が分散し、組織全体の統合ビューが得られません。\n\nC: CUR は総コストを把握するには有用ですが、S3 のストレージクラス別の詳細メトリクスや使用量分析には S3 Storage Lens の方が適しています。また Lambda を使う方法は開発負荷が高くなります。\n\nD: 手動でのコンソール確認は自動化されておらず、200 以上のアカウントでは現実的ではありません。レポートの精度と一貫性も保証できません。"
    },
    {
      "id": "q019",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある大手メディア企業が AWS Organizations でマルチアカウント環境を管理しており、開発・テスト・本番の各環境がそれぞれ異なる OU に整理されています。開発環境では Lambda のデプロイと S3 バケットの作成を自由に行えるようにしたいが、本番環境では承認ワークフローなしにこれらの変更を行えないようにしたいと考えています。また、本番環境での変更はすべて CloudTrail に記録し変更管理システムと統合する必要があります。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "本番 OU に SCP を設定して Lambda と S3 の作成/更新を全面的に Deny し、変更が必要な場合は管理アカウントの管理者が直接対応する",
        "AWS Service Catalog と AWS Config の組み合わせで変更管理を実装し、本番 OU では承認済みの Service Catalog 製品のみデプロイを許可する SCP を設定する。Lambda と S3 の変更は EventBridge と Step Functions を使った承認ワークフローに統合し、承認後に Systems Manager Automation で変更を適用する",
        "CloudFormation Stack ポリシーを本番環境のすべてのスタックに設定し、特定のリソースタイプの更新を制限する",
        "IAM パーミッションバウンダリーを本番アカウントの全ロールに設定し、Lambda と S3 の変更 API をバウンダリーから除外する"
      ],
      "answer": [
        1
      ],
      "explanation": "承認ワークフローを含む変更管理には、Service Catalog と Step Functions を組み合わせた承認フロー統合が適切です。Service Catalog を使って承認済みテンプレートのみデプロイを許可し、SCP でカタログ外のデプロイを防止します。EventBridge で変更イベントを捕捉し Step Functions で承認フローを管理、Systems Manager Automation で承認後に変更を適用する構成が変更管理システムとの統合にも対応できます。\n\nA: 全面的な Deny は業務を停止させてしまい、必要な変更も管理者を介する必要があるため運用負荷が非常に高くなります。\n\nC: CloudFormation スタックポリシーはスタック内のリソース更新を保護しますが、スタック外での直接 API 呼び出しには対応できず、承認ワークフローの機能もありません。\n\nD: パーミッションバウンダリーはロールの権限上限を制御しますが、承認ワークフローの実装や変更管理システムとの統合には対応していません。"
    },
    {
      "id": "q020",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "あるグローバル企業が AWS Organizations で管理するマルチアカウント環境において、すべての EC2 インスタンスへの SSH/RDP アクセスをセキュアに管理したいと考えています。SSH キーペアの管理をなくし、監査ログを残し、踏み台サーバー（Bastion Host）を廃止したいと考えています。また、アクセスは IAM Identity Center で管理されるユーザーの役割に基づく必要があります。最も適切な実装はどれですか？",
      "choices": [
        "全アカウントで踏み台サーバーを AWS Managed Microsoft AD に統合し、AD グループでアクセスを管理する",
        "AWS Systems Manager Session Manager を全アカウントで有効化し、EC2 インスタンスに SSM Agent をインストールする。IAM Identity Center の権限セットに Session Manager の実行権限を付与し、CloudTrail と Session Manager のセッションログを S3 と CloudWatch Logs に記録する",
        "AWS EC2 Instance Connect エンドポイントを各 VPC に作成し、SSH キーをプッシュして一時的なアクセスを提供する",
        "VPN と IAM ユーザーの組み合わせで接続を管理し、キーペアを AWS Secrets Manager に保存して定期ローテーションする"
      ],
      "answer": [
        1
      ],
      "explanation": "Systems Manager Session Manager は SSH キーペアや踏み台サーバーを一切不要にし、IAM ポリシーでアクセスを制御します。IAM Identity Center と統合することで役割ベースのアクセス管理が実現でき、セッションの開始・終了・コマンド実行が CloudTrail と Session Manager ログに完全記録されます。ポート 22/3389 の開放も不要でセキュリティが向上します。\n\nA: Managed AD との踏み台統合では SSH キーの問題は解決されず、踏み台サーバーの管理負荷も残ります。要件の「踏み台サーバーの廃止」を満たしません。\n\nC: EC2 Instance Connect エンドポイントは SSH キーをプッシュする方式であり、キーペア管理をなくす要件を完全には満たしません。また役割ベースのアクセス制御との統合も限定的です。\n\nD: VPN と IAM ユーザーの組み合わせでは SSH キーの管理が依然必要で、IAM ユーザーの管理負荷も生じます。Identity Center との役割ベース統合も実現できません。"
    },
    {
      "id": "q021",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS で SAP システムを運用しており、SAP HANA データベースは Amazon EC2 X インスタンス（メモリ最適化型）で動作しています。SAP システムは月末の決算処理時に CPU・メモリの負荷が平常時の 5 倍に達し、この期間（月 2 〜 3 日間）だけスケールアップが必要です。年間を通じた総コストを最小化しながら可用性を確保するには、どの構成が最も適切ですか？",
      "choices": [
        "常に大きいインスタンスタイプの On-Demand インスタンスで稼働させ、月末ピーク時は追加の EC2 インスタンスを起動してクラスタリングする",
        "平常時は適切なサイズの Reserved Instance（1 年コンバーティブル）で稼働させ、月末ピーク時は On-Demand または Scheduled Reserved Instances でスケールアップ用インスタンスを追加起動する。SAP HANA は垂直スケールよりシャードやスケールアウトよりは単体での大型インスタンス利用が一般的なため、ピーク時に一時的に大きいインスタンスへの変更を計画する",
        "月末ピーク時のみ Spot インスタンスを使ってコストを削減し、Spot の中断が発生した場合は SAP システムが自動で再起動するよう設定する",
        "EC2 Auto Scaling グループを使用して SAP HANA を水平スケールさせ、負荷に応じてインスタンスを自動追加/削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "SAP HANA のような大規模インメモリデータベースには Reserved Instance によるコスト最適化が基本です。平常時に適切なサイズの RI を使用し、月 2〜3 日のピーク時には一時的に On-Demand でスケールアップ用インスタンスを追加することで、年間コストを最小化しながらピーク対応が可能です。コンバーティブル RI はインスタンスタイプの変更も可能です。\n\nA: 常に大きいインスタンスを稼働させることは平常時のコストが過大になり、年間総コストの最小化に反します。\n\nC: SAP HANA は中断耐性がなく、Spot インスタンスの中断によりデータ損失やシステム停止が発生します。ミッションクリティカルな SAP ワークロードに Spot は不適切です。\n\nD: SAP HANA は水平スケール（Scale-out）に対応していますが、複数ノード構成は設定が複雑でライセンスコストも増加します。月 2〜3 日のピーク対応としては過剰な複雑性を持ちます。"
    },
    {
      "id": "q022",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "medium",
      "question": "ある企業がオンプレミスの Microsoft Active Directory をそのまま維持しながら、AWS 上の EC2 Windows インスタンスをドメイン参加させ、既存の AD ユーザーと AD グループによるアクセス管理を実現したいと考えています。AD の管理は引き続きオンプレミスのチームが行う予定です。最もシンプルなアーキテクチャはどれですか？",
      "choices": [
        "AWS Managed Microsoft AD を新規に作成し、オンプレミス AD との双方向フォレストトラストを設定する",
        "AD Connector を使用してオンプレミスの AD にプロキシ接続し、EC2 インスタンスを既存の AD ドメインに直接参加させる",
        "AWS Managed Microsoft AD を作成し、オンプレミス AD からすべてのユーザーとグループを手動で移行する",
        "Amazon Cognito User Pool にオンプレミス AD のユーザーをフェデレーションし、EC2 インスタンスへのアクセスを Cognito トークンで管理する"
      ],
      "answer": [
        1
      ],
      "explanation": "AD Connector は AWS がオンプレミス AD への認証リクエストをプロキシする軽量なディレクトリゲートウェイです。ユーザーやグループのコピーや同期は不要で、EC2 インスタンスは既存の AD ドメインに直接参加できます。AD の管理もオンプレミスのチームが継続できます。\n\nA: Managed Microsoft AD との双方向フォレストトラストは機能しますが、AWS 側に新しい AD を作成・管理するコストと負荷が生じます。「AD 管理はオンプレミスのチームが継続」という要件に対してオーバーエンジニアリングです。\n\nC: ユーザーとグループを手動移行すると、オンプレミス AD との二重管理が発生し、同期の問題が生じます。要件に反します。\n\nD: Cognito は Web/モバイルアプリのエンドユーザー向け認証サービスであり、EC2 インスタンスのドメイン参加や AD グループベースのアクセス管理には対応していません。"
    },
    {
      "id": "q023",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある金融機関が AWS Organizations を使用して本番環境と開発環境を分離管理しています。コンプライアンス要件により、本番環境のすべての API 呼び出しは暗号化された CloudTrail ログとして最低 7 年間保存し、ログの改ざんを検出できる整合性検証を有効にする必要があります。また、ログへのアクセスは特定のセキュリティチームのみに制限する必要があります。最も適切な実装はどれですか？",
      "choices": [
        "各本番アカウントで個別に CloudTrail を設定し、S3 バケットにログを保存する。S3 Lifecycle ポリシーで 7 年後に自動削除する",
        "Organizations で組織レベルのトレイルを作成し、中央のセキュリティアカウントの S3 バケットにログを送信する。CloudTrail ログファイルの整合性検証を有効化し、S3 バケットに Object Lock（COMPLIANCE モード、7 年間の保持期間）を設定する。バケットポリシーでセキュリティチームのみにアクセスを制限し、KMS CMK で暗号化する",
        "CloudWatch Logs にログを送信し、CloudWatch Logs Archive で 7 年間保存する。CloudWatch Logs の暗号化とアクセス制御で要件を満たす",
        "AWS Backup を使って CloudTrail ログを毎日バックアップし、バックアップコピーを別リージョンにも保存する。バックアッププランで 7 年間の保持期間を設定する"
      ],
      "answer": [
        1
      ],
      "explanation": "組織レベルの CloudTrail により全本番アカウントのログを中央集約できます。S3 Object Lock の COMPLIANCE モードは保持期間中のオブジェクト削除・変更をルートユーザーを含むすべてのユーザーから防止し、改ざん防止に最適です。CloudTrail ログファイル整合性検証により改ざん検出が可能です。KMS CMK 暗号化でデータの機密性を確保し、バケットポリシーでセキュリティチームのみのアクセスを実現します。\n\nA: 各アカウントでの個別設定は管理が分散し、S3 Lifecycle は削除を制御しますが WORM（Write Once Read Many）による改ざん防止は提供しません。\n\nC: CloudWatch Logs は CloudTrail の長期保存に設計されておらず、7 年間の WORM 保存には Object Lock を持つ S3 が適切です。また整合性検証機能も CloudWatch Logs には組み込まれていません。\n\nD: AWS Backup は EC2/EBS/RDS などのバックアップが主目的であり、CloudTrail ログの WORM 保護には対応していません。S3 Object Lock と CloudTrail 整合性検証の組み合わせが金融規制要件には最適です。"
    },
    {
      "id": "q024",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "あるスタートアップ企業が、モバイルアプリのバックエンドを AWS 上にゼロから構築しています。1 日のトラフィックは非常に変動が激しく、深夜はほぼゼロ、ピーク時は毎秒 10,000 リクエストに達します。ユーザーデータの読み取りが書き込みの 80% を占め、レイテンシーは P99 で 100ms 以下が要件です。データはリレーショナルモデルで、複雑な JOIN クエリが必要です。インフラ運用負荷を最小化しながらコスト効率よく設計するには、どのアーキテクチャが最適ですか？",
      "choices": [
        "Amazon EC2 Auto Scaling グループにアプリケーションサーバーをデプロイし、Amazon RDS Multi-AZ PostgreSQL をバックエンドデータベースとして使用する。ElastiCache Redis で読み取りキャッシュを構成する",
        "Amazon API Gateway + AWS Lambda でサーバーレスアーキテクチャを構築し、Amazon Aurora Serverless v2 をデータベースとして使用する。Aurora のリードレプリカと ElastiCache for Redis で読み取りの 80% をキャッシュし、P99 レイテンシーを確保する",
        "AWS Fargate で ECS タスクを実行し、Amazon DynamoDB をデータベースとして使用する。DAX（DynamoDB Accelerator）で読み取りキャッシュを実現する",
        "Amazon EC2 スポットインスタンスのフリートでアプリケーションを実行し、Amazon Aurora PostgreSQL プロビジョニングタイプで Multi-AZ + リードレプリカを構成する"
      ],
      "answer": [
        1
      ],
      "explanation": "API Gateway + Lambda のサーバーレス構成はゼロから無制限のスケールに自動対応し、深夜のアイドル時はほぼコストがかかりません。Aurora Serverless v2 は需要に応じてキャパシティを自動スケールし、リレーショナルモデルと複雑な JOIN をサポートします。ElastiCache Redis で読み取り 80% をキャッシュすることで P99 100ms の要件を達成できます。\n\nA: EC2 Auto Scaling + RDS Multi-AZ は機能しますが、深夜のアイドル時もインスタンスコストが発生し、コスト効率が低下します。インフラ管理の運用負荷も Lambda より高くなります。\n\nC: DynamoDB はリレーショナルモデルと複雑な JOIN クエリには不向きです。JOIN が必要なデータモデルには RDS/Aurora が適しています。\n\nD: スポットインスタンスはコスト削減に有効ですが、中断リスクがあり、P99 レイテンシー 100ms の要件への影響や運用の複雑性が増します。深夜のトラフィックゼロ時のコスト最適化もサーバーレスほど効果的ではありません。"
    },
    {
      "id": "q025",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある動画配信サービスが、毎日数千の動画ファイル（平均 2GB）をユーザーからアップロードされ、それを自動的にトランスコードして複数の解像度（4K、1080p、720p、480p）で配信できるようにするパイプラインを設計しています。トランスコード処理には動画 1 本あたり平均 30 分かかります。処理コストを最小化しながら、アップロードから配信可能になるまでの時間を最大 2 時間に収めたいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "EC2 On-Demand インスタンス（c5.4xlarge）のフリートを 24 時間稼働させ、SQS キューからトランスコードジョブを取得して処理する",
        "S3 にアップロードされた動画ファイルをトリガーに EventBridge ルールを起動し、AWS Elemental MediaConvert ジョブを作成する。トランスコード結果を S3 に保存し、CloudFront で配信する。MediaConvert の Reserved Transcode（予約済みキャパシティ）を日次処理量に合わせて購入してコストを削減する",
        "AWS Batch でトランスコードジョブを管理し、Spot インスタンスを使用してコストを削減する。S3 に結果を保存して CloudFront で配信する",
        "Lambda 関数でトランスコードを直接実行し、Step Functions でワークフローを管理する。処理完了後に S3 に保存し CloudFront で配信する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Elemental MediaConvert はマネージドの動画トランスコードサービスで、インフラ管理不要です。S3 イベントで自動的にジョブを開始でき、複数解像度への同時変換、30 分の処理時間、2 時間以内の完了要件を満たせます。CloudFront との統合で配信も最適化されます。Reserved Transcode により日次処理量が多い場合はコスト削減できます。\n\nA: 24 時間稼働の EC2 フリートは処理がない時間もコストがかかり、コスト最小化に反します。独自トランスコードコードのメンテナンスも必要です。\n\nC: AWS Batch + Spot も有効ですが、Spot インスタンスの中断が発生すると 2 時間の SLA を超えるリスクがあります。また独自トランスコードコードが必要です。\n\nD: Lambda の最大実行時間は 15 分であり、平均 30 分のトランスコードには対応できません。"
    },
    {
      "id": "q026",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある金融サービス会社が、リアルタイムの不正取引検知システムを AWS 上に構築しています。毎秒 50,000 件の取引データがストリームとして流れ込み、各取引に対して機械学習モデルで 100ms 以内にスコアリングを完了する必要があります。スコアが閾値を超えた場合は即座にアラートを送信し、全データを 90 日間保持して後の分析に使用します。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon Kinesis Data Streams で取引データを受信し、Kinesis Data Analytics（Apache Flink）でリアルタイム処理を行い、SageMaker のリアルタイム推論エンドポイントで不正スコアリングを実施する。アラートは SNS で送信し、データは S3 に Kinesis Data Firehose で保存する",
        "Amazon SQS でメッセージを受信し、Lambda 関数で ML 推論を呼び出す。DynamoDB に結果を保存し、Lambda から SNS でアラートを送信する",
        "AWS IoT Core でデータを受信し、IoT ルールで Lambda を起動して ML 推論を実行する",
        "Amazon MSK（Kafka）でデータを受信し、ECS Fargate のコンシューマーアプリで処理し、RDS Aurora で結果を保存する"
      ],
      "answer": [
        0
      ],
      "explanation": "Kinesis Data Streams は毎秒数万件のストリームデータ取り込みに最適化されています。Kinesis Data Analytics（Flink）でリアルタイムのウィンドウ処理と前処理を行い、SageMaker リアルタイム推論で P99 100ms のスコアリングが実現できます。Kinesis Data Firehose で S3 への自動保存と 90 日保持が実現でき、SNS でアラートを即時送信できます。\n\nB: SQS + Lambda は高スループットのリアルタイムストリーミングよりもキューベースの非同期処理に向いており、毎秒 50,000 件の処理と 100ms レイテンシーの達成が困難です。Lambda のコールドスタートもレイテンシーに影響します。\n\nC: IoT Core は IoT デバイスからのデータ収集を主目的としており、金融取引データの高スループット処理には Kinesis が適しています。\n\nD: MSK + ECS Fargate + Aurora の構成は機能しますが、インフラの管理負荷が高く、100ms のレイテンシー要件の達成にはチューニングが必要です。Kinesis のフルマネージドな解決策より運用負荷が増します。"
    },
    {
      "id": "q027",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある e コマース企業が、毎年 11 月のセール期間（ブラックフライデー・サイバーマンデー）に平常時の 20 倍のトラフィックが発生することが分かっています。通常はシングルリージョンで稼働していますが、セール期間は高可用性も求められます。セール期間の 2 週間だけ追加コストを抑えながら可用性を高め、その後は通常コストに戻す構成として最も適切なものはどれですか？",
      "choices": [
        "2 つ目の AWS リージョンにアクティブ-アクティブ構成を常時稼働させ、Route 53 で負荷分散する",
        "セール期間前に、プライマリリージョンで Auto Scaling の最大スケールアウト上限を引き上げ、EC2 Auto Scaling グループにスケジュールされたスケーリングアクションを設定する。プロビジョニングドコンカレンシーで Lambda のコールドスタートを排除し、ElastiCache と CloudFront でキャッシュヒット率を向上させる。Aurora リードレプリカを 1 台追加し、セール後に削除する",
        "AWS Outposts を購入してオンプレミスに設置し、セール期間はオンプレミスとクラウドでハイブリッド負荷分散を行う",
        "セール期間のみ 2 番目のリージョンにパイロットライト（最小構成）を起動し、Route 53 フェイルオーバーでスタンバイ構成を追加する"
      ],
      "answer": [
        1
      ],
      "explanation": "シングルリージョンの適切なスケールアップが最もコスト効率の高い選択肢です。Auto Scaling のスケジュールアクションでセール前にキャパシティを事前に確保し、Lambda のプロビジョニングドコンカレンシーでコールドスタートを排除します。ElastiCache と CloudFront のキャッシュ強化で読み取り負荷を軽減し、Aurora リードレプリカ追加でデータベース負荷を分散します。セール後にリードレプリカを削除してコストを戻せます。\n\nA: 常時アクティブ-アクティブのマルチリージョン構成は最高の可用性を提供しますが、「セール期間だけ追加コストを抑える」要件に反し、通年で約2倍のコストがかかります。\n\nC: AWS Outposts の購入は大きな初期投資と設置工事が必要で、2週間のセール対応には過剰な投資です。\n\nD: パイロットライト構成は DR 目的には有効ですが、「20 倍のトラフィックへの対応」要件を満たすには起動後にスケールアウトが必要で、シングルリージョンの強化よりコストが高くなります。"
    },
    {
      "id": "q028",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が新しいマイクロサービスアーキテクチャを AWS 上に設計しています。10 個のマイクロサービスが相互に通信し、一部は同期 REST API、一部は非同期イベントドリブンで連携します。サービス間の依存を疎結合に保ち、一つのサービスが障害になっても他のサービスに影響が波及しないよう設計する必要があります。また、イベントのスキーマ管理と後方互換性の確保が重要です。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "すべてのマイクロサービス間通信を Amazon SQS と SNS の組み合わせ（SNS fanout pattern）で非同期化し、サービスメッシュを廃止する",
        "同期通信には Amazon API Gateway と AWS Lambda、非同期通信には Amazon EventBridge を使用する。EventBridge Schema Registry でイベントスキーマを管理し、後方互換性を確保する。Circuit breaker パターンには AWS App Mesh またはサービス側での実装を使用する",
        "すべての通信を Amazon Kinesis Data Streams に統一し、すべてのサービスをコンシューマーとしてストリームを購読させる",
        "Direct VPC 間通信（PrivateLink なし）でマイクロサービスを直接接続し、Elastic Load Balancer を各サービスの前段に配置する"
      ],
      "answer": [
        1
      ],
      "explanation": "同期 REST API には API Gateway + Lambda、非同期イベントドリブンには EventBridge の組み合わせが AWS のベストプラクティスです。EventBridge Schema Registry によりイベントのスキーマを中央管理し、スキーマバージョン管理で後方互換性を確保できます。App Mesh によるサービスメッシュでサーキットブレーカーパターンを実装し、障害の波及を防止します。\n\nA: SQS + SNS はメッセージングには有効ですが、スキーマ管理機能がなく、後方互換性の確保が課題になります。また、EventBridge の方がイベント駆動アーキテクチャに適した機能（フィルタリング、スキーマレジストリ等）を持ちます。\n\nC: すべての通信を Kinesis に統一することは、リクエスト-レスポンス型の同期 REST API パターンに適していません。シンプルな同期通信をストリームで実装することはオーバーエンジニアリングです。\n\nD: サービス間の直接 VPC 通信は疎結合の原則に反し、サービスが互いの IP アドレスやエンドポイントを直接知っている必要があり、依存が強まります。"
    },
    {
      "id": "q029",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でデータレイクを構築しています。様々なソース（オンプレミス DB、SaaS アプリ、IoT センサー、ストリームデータ）から毎日テラバイト規模のデータを取り込み、データサイエンティストと SQL アナリストが独立してアクセスできる環境を提供する必要があります。データカタログ管理と列レベルのアクセス制御が必要で、コストを最小化したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon Redshift クラスターをデータウェアハウスとして構築し、すべてのソースデータを Redshift に ETL で取り込む。Redshift の列レベルセキュリティでアクセス制御を行う",
        "Amazon S3 をデータレイクのストレージとして使用し、AWS Glue でデータカタログを管理する。Lake Formation で列レベルのきめ細かいアクセス制御を設定し、データサイエンティストは SageMaker Studio から、SQL アナリストは Amazon Athena からアクセスする。データ取り込みは Glue ETL ジョブ、Kinesis Data Firehose（ストリーム）、AWS DMS（DB）で自動化する",
        "Amazon EMR クラスターに Hive メタストアを構築し、HDFS にデータを保存する。Hive と Spark で分析を行い、列レベルのアクセス制御は Apache Ranger で実装する",
        "Oracle データベースをオンプレミスに維持し、S3 に Parquet 形式でエクスポートしたデータを Athena でクエリする。アクセス制御は S3 バケットポリシーで管理する"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 + Glue Data Catalog + Lake Formation は AWS が推奨するサーバーレスデータレイクの標準パターンです。Lake Formation の列レベル・行レベルのきめ細かいアクセス制御（Cell-level security）により要件を満たし、SageMaker Studio と Athena からのアクセスも一元管理できます。Glue ETL、Kinesis Firehose、DMS を組み合わせることで多様なソースからの取り込みを自動化できます。S3 のストレージコストは Redshift より大幅に安く、クエリ従量課金の Athena は使わない時間のコストが発生しません。\n\nA: Redshift への全データ取り込みは柔軟性が低く、テラバイル規模のデータのストレージコストと ETL 処理コストが高くなります。また Redshift はデータウェアハウスで構造化データ向けであり、IoT センサーや非構造化データには不向きです。\n\nC: EMR + Hive + Apache Ranger は機能的ですが、クラスターの管理運用負荷が高く、24/7 稼働させるとコストが増加します。サーバーレスの S3 + Athena より運用コストが高くなります。\n\nD: Oracle をオンプレミスで維持することはクラウド移行の恩恵を得られず、列レベルアクセス制御も S3 バケットポリシーでは実現できません。"
    },
    {
      "id": "q030",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある SaaS プロバイダーが、複数のテナント（企業顧客）向けにマルチテナントアーキテクチャを AWS で設計しています。テナントごとにデータの完全な分離が必要で、あるテナントのデータが別のテナントに漏洩することは絶対に許されません。一方で、各テナントに独立したインフラを持つことはコスト的に非現実的です。最も適切なデータ分離戦略はどれですか？",
      "choices": [
        "すべてのテナントデータを単一の Amazon RDS データベースに保存し、テナント ID カラムでフィルタリングする。アプリケーション層でテナント分離を実装する",
        "Amazon DynamoDB でテナント ID をパーティションキーとして使用し、IAM ポリシーの DynamoDB 条件（LeadingKeys）で各テナントが自分のパーティションのみアクセスできるように制限する。重要データには AWS KMS のテナント別 CMK で暗号化する",
        "テナントごとに独立した AWS アカウントを作成し、AWS Organizations で管理する",
        "Amazon S3 の単一バケットにテナント ID のプレフィックスでデータを分けて保存し、S3 バケットポリシーで全テナントにバケット全体へのアクセスを許可する"
      ],
      "answer": [
        1
      ],
      "explanation": "DynamoDB の LeadingKeys 条件付き IAM ポリシーは、各テナントが自分のパーティションキー（テナント ID）に対応するデータのみアクセスできることを IAM レベルで保証します。アプリケーション層のバグによる情報漏洩を防ぐため、インフラレベルでの分離が実現できます。テナント別 CMK による暗号化で、万一のデータアクセスにも対応できます。\n\nA: 単一 DB でのテナント ID フィルタリングはアプリケーション層に分離の責任を集中させており、SQLインジェクションやバグで別テナントのデータにアクセスされるリスクがあります。強力なデータ分離保証には不十分です。\n\nC: テナントごとの AWS アカウント分離は最も強力な分離を提供しますが、コスト的に非現実的という要件に反します。数百〜数千テナントでは運用が困難です。\n\nD: 単一バケットへの全テナントアクセスを許可することは、アクセス制御をアプリケーション層のみに依存しており、設定ミスで全テナントのデータが漏洩するリスクがあります。"
    },
    {
      "id": "q031",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で IoT プラットフォームを構築しており、世界中に分散する 100 万台のデバイスから毎秒 100 万件のメッセージを受信します。各メッセージは 1KB 以下で、リアルタイムでの異常検知とデバイスへのコマンド送信が必要です。データは後の機械学習トレーニングに使用するため全量保存が必要です。最もスケーラブルかつコスト効率の良いアーキテクチャはどれですか？",
      "choices": [
        "Amazon SQS に全デバイスメッセージを送信し、Lambda 関数でポーリングして処理し、RDS PostgreSQL に保存する",
        "AWS IoT Core でデバイス接続を管理し、IoT ルールエンジンで Kinesis Data Streams にメッセージを転送する。Kinesis Data Analytics で異常検知、Kinesis Data Firehose で S3 への全量保存を行う。デバイスへのコマンドは IoT Core のデバイスシャドウ経由で双方向通信を実現する",
        "Amazon MQ（ActiveMQ）でブローカーを構築し、全デバイスを MQTT で接続する。EC2 クラスターで処理し、Amazon EFS にデータを保存する",
        "ALB の WebSocket サポートで全デバイスを接続し、ECS コンテナクラスターで処理する。DynamoDB に全データを保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS IoT Core は数十億のデバイス接続と毎秒数兆件のメッセージを処理できるマネージドサービスです。IoT ルールエンジンで Kinesis に転送し、Kinesis Analytics で低レイテンシーの異常検知、Kinesis Firehose で S3 への自動保存が実現できます。IoT Core のデバイスシャドウで双方向通信（コマンド送信）も提供されます。\n\nA: SQS + Lambda は高スループットの IoT ワークロードには適しておらず、毎秒 100 万件のメッセージ処理には Lambda の並列実行コストが膨大になります。RDS PostgreSQL は書き込みスケールに限界があります。\n\nC: Amazon MQ は中規模の既存 MQTT ワークロードの移行に適しており、100 万台規模のデバイス接続には設計されていません。スケーラビリティに限界があり、マネージドの IoT Core に比べて運用負荷が高くなります。\n\nD: ALB の WebSocket を IoT デバイスの接続管理に使うことは、IoT ワークロードの特性（デバイス認証、MQTT プロトコル、デバイスシャドウ等）を無視しており、100 万台規模への対応も困難です。"
    },
    {
      "id": "q032",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "medium",
      "question": "ある企業が AWS 上でウェブアプリケーションのグローバル展開を計画しています。エンドユーザーは北米・欧州・アジアに分散しており、すべてのユーザーに低レイテンシーなレスポンスを提供する必要があります。アプリケーションは動的コンテンツ（API レスポンス）と静的コンテンツ（HTML/JS/CSS/画像）が混在しており、DDoS 攻撃からの保護も必要です。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各リージョンに独立したアプリケーションスタックを構築し、地理的に最も近いリージョンにユーザーをルーティングする Geolocation DNS を設定する",
        "Amazon CloudFront をグローバルの CDN として展開し、静的コンテンツを CloudFront エッジにキャッシュする。動的 API は CloudFront のキャッシュ無効化設定でオリジンの Application Load Balancer に転送する。AWS WAF を CloudFront にアタッチして DDoS 対策と AWS Shield Standard の保護を組み合わせる",
        "Route 53 のレイテンシーベースルーティングで複数リージョンの ALB にルーティングし、各リージョンに独立したデータベースを持つアクティブ-アクティブ構成を構築する",
        "AWS Global Accelerator を使用して全トラフィックを単一リージョンのアプリケーションに転送し、AWS Shield Advanced でDDoS 対策を行う"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudFront は世界 400 以上のエッジロケーションで静的コンテンツをキャッシュし、世界中のユーザーに低レイテンシーを提供します。動的コンテンツは CloudFront の Origins 経由で ALB に転送されます。AWS WAF + Shield Standard の組み合わせで DDoS 対策が実現でき、追加コストも最小化できます。\n\nA: 各リージョンに独立したスタックを構築すると、データ同期・デプロイ管理・コストがすべて増大します。静的コンテンツのキャッシュ効果も得られません。\n\nC: マルチリージョンのアクティブ-アクティブ構成は高可用性を提供しますが、データベース同期の複雑性とコストが大幅に増加します。静的コンテンツの配信最適化には CDN の方が効果的です。\n\nD: Global Accelerator はネットワーク経路の最適化に有効ですが、コンテンツキャッシュ機能がなく、静的コンテンツの配信には CloudFront の方が適しています。Shield Advanced は追加コストが高く、標準的な DDoS 対策には Shield Standard + WAF で十分な場合が多いです。"
    },
    {
      "id": "q033",
      "type": "multiple",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が完全サーバーレスのデータ処理パイプラインを設計しています。オンプレミスのシステムから毎日 100GB のデータを S3 に転送し、データのクレンジング・変換処理を行って、最終的に Amazon Redshift にロードします。処理には複数のステップがあり、各ステップの成功/失敗を追跡し、失敗した場合は自動的に再試行する必要があります。インフラの管理を完全に排除したいと考えています。実現するために使用するべきサービスを2つ選択してください。",
      "choices": [
        "AWS Glue ETL ジョブでデータのクレンジング・変換を実行する",
        "Amazon EMR でデータ処理クラスターを管理し、Spark ジョブを実行する",
        "AWS Step Functions でパイプラインの各ステップのワークフローを管理し、失敗時の自動再試行と状態管理を実装する",
        "Amazon EC2 Auto Scaling グループで処理サーバーを管理し、SQS キューからジョブを取得する",
        "AWS Data Pipeline でジョブスケジューリングを管理する"
      ],
      "answer": [
        0,
        2
      ],
      "explanation": "AWS Glue（A）はサーバーレスの ETL サービスで、インフラ管理なしでデータのクレンジング・変換ができます。Glue の Spark エンジンは大規模データ処理に対応しており、Redshift へのロードも Glue Connector で実現できます。Step Functions（C）はサーバーレスのワークフローオーケストレーターで、各ステップの成功/失敗の追跡、失敗時の自動再試行（Retry）、エラーハンドリング（Catch）を設定ファイルで定義できます。\n\nB: Amazon EMR はサーバーレスではなく、クラスターの管理が必要です（EMR Serverless を使えば変わりますが、選択肢には EMR クラスターと記載されています）。\n\nD: EC2 Auto Scaling は完全にインフラ管理を排除できないため、「インフラ管理を完全に排除」という要件に反します。\n\nE: AWS Data Pipeline はレガシーサービスで、Step Functions に比べて機能が限定的です。複雑なワークフロー管理には Step Functions が適しています。"
    },
    {
      "id": "q034",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が Amazon EKS で Kubernetes クラスターを運用しており、数百のマイクロサービスをデプロイしています。サービス間のトラフィック暗号化（mTLS）、サービスディスカバリー、カナリアデプロイ、分散トレーシングを実装したいと考えています。既存の Kubernetes のデプロイメント定義を変更せずに、インフラレベルでこれらを実現したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "AWS App Mesh をサービスメッシュとして EKS クラスターに統合し、各 Pod に Envoy プロキシをサイドカーとして自動注入する。App Mesh と AWS X-Ray の統合で分散トレーシングを実現し、仮想ノードとルーターで mTLS とカナリアデプロイを設定する",
        "各マイクロサービスのコードに gRPC インターセプターを追加して mTLS を実装し、Kubernetes の Service オブジェクトでサービスディスカバリーを管理する",
        "ALB Ingress Controller を EKS にデプロイし、カナリアデプロイは ALB のターゲットグループ重み付けで実装する。mTLS は各コンテナ内で証明書を管理する",
        "ECS Fargate に移行してサービスメッシュ機能を活用し、ECS の App Mesh 統合でカナリアデプロイと mTLS を実現する"
      ],
      "answer": [
        0
      ],
      "explanation": "AWS App Mesh はサービスメッシュのコントロールプレーンとして、既存の Kubernetes デプロイメントを変更せずにサイドカーコンテナ（Envoy）を自動注入できます。App Mesh で mTLS、サービスディスカバリー（仮想ノード）、カナリアデプロイ（仮想ルーター+ルート重み付け）を設定し、X-Ray 統合で分散トレーシングが実現できます。\n\nB: アプリケーションコードへの gRPC インターセプター追加は「既存のデプロイメント定義を変更せず」という要件に反します。また、カナリアデプロイや分散トレーシングの統合も課題が生じます。\n\nC: ALB Ingress Controller はクラスター外からのトラフィック管理に有効ですが、サービス間（東西）トラフィックの mTLS やサービスメッシュ機能は提供しません。各コンテナでの証明書管理は複雑で管理負荷が高くなります。\n\nD: ECS への移行は既存の EKS/Kubernetes 投資を無駄にし、要件と大きく乖離しています。EKS のまま App Mesh を統合する方が適切です。"
    },
    {
      "id": "q035",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある製薬企業が医薬品の研究データ（ゲノム解析データ）を AWS で処理するシステムを設計しています。データセットは数百テラバイトで、処理は週 1 〜 2 回の大規模バッチとして実行されます。処理には高い CPU とメモリのリソースが必要で（1 ジョブあたり数千コア）、処理完了後はリソースを解放してコストをゼロにしたいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "EC2 On-Demand インスタンスの大型クラスターを 24 時間稼働させ、ジョブが来たら処理を開始する",
        "AWS Batch のコンピューティング環境でスポットインスタンスを使用し、ジョブキューからゲノム解析ジョブを処理する。Spot 中断に備えてチェックポイント機能を実装し、Spot Fleet で複数のインスタンスタイプを指定して可用性を高める。S3 にデータを保存し処理後はクラスターが自動的にゼロにスケールする",
        "Amazon EMR クラスターを常時稼働させ、Spark でゲノム解析を実行する。処理がない時間は最小ノード数で待機させる",
        "AWS Lambda で並列処理を実装し、数千の Lambda 関数を同時実行してゲノム解析を行う"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Batch はバッチコンピューティングに最適化されたマネージドサービスで、ジョブが来た時だけリソースを起動し、完了後は自動的にゼロにスケールします。スポットインスタンスにより On-Demand 比 60〜90% のコスト削減が可能で、Spot Fleetで複数インスタンスタイプを使うことで中断リスクを軽減します。チェックポイント機能で中断耐性を持たせれば長時間ジョブも安全に実行できます。\n\nA: On-Demand クラスターの 24 時間稼働はジョブがない時間のコストが膨大になり「処理後にコストをゼロに」という要件に反します。\n\nC: EMR の常時稼働も同様に、ジョブがない時間のコストが発生します。最小ノードの維持費用も積み重なります。\n\nD: Lambda の最大実行時間は 15 分であり、大規模ゲノム解析バッチには不適切です。またメモリは最大 10GB で「高い CPU とメモリ」要件に対応できません。"
    },
    {
      "id": "q036",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS で新しいアプリケーションのデータベース層を設計しています。要件は以下の通りです。①トランザクション整合性（ACID）が必要、②地理的に離れた 2 リージョンにまたがる書き込みが必要（マルチリージョン書き込み）、③自動フェイルオーバーによる高可用性、④1 秒未満のレプリケーション遅延。これらすべてを満たすマネージドサービスの組み合わせはどれですか？",
      "choices": [
        "Amazon RDS for MySQL Multi-AZ 構成（プライマリリージョン） + RDS リードレプリカ（セカンダリリージョン）",
        "Amazon Aurora Global Database（グローバルデータベース）で 2 リージョンに展開し、Managed Planned Failover でのリージョン切り替えを設定する。ただし Aurora Global は通常ライト-ワン構成のため、マルチリージョン書き込みには Amazon DynamoDB Global Tables に移行する",
        "Amazon DynamoDB Global Tables を使用し、2 リージョンでのマルチアクティブ書き込みを有効化する。DynamoDB は ACID トランザクション（TransactWriteItems）をサポートし、グローバルテーブルでの自動フェイルオーバーも提供される",
        "Amazon DocumentDB をプライマリリージョンに展開し、AWS Database Migration Service で継続的レプリケーションを設定する"
      ],
      "answer": [
        2
      ],
      "explanation": "DynamoDB Global Tables はマルチリージョンのアクティブ-アクティブ書き込みをサポートし（要件②）、TransactWriteItems API で ACID トランザクション（要件①）を提供します。また、グローバルテーブルは自動的にリージョン間でデータを同期し（通常1秒未満のレプリケーション遅延）、リージョン障害時の自動フェイルオーバーも提供されます（要件③④）。\n\nA: RDS Multi-AZ + クロスリージョンリードレプリカは読み取りのみリードレプリカへの転送ができますが、マルチリージョンへの書き込みは単一の書き込みエンドポイントからのみで、要件②を満たしません。\n\nB: Aurora Global Database は通常、1 リージョンのプライマリにのみ書き込み可能で、マルチリージョン書き込み（アクティブ-アクティブ書き込み）には対応していません（ライト-ワン構成）。選択肢も最終的に DynamoDB への移行を提案しており、Aurora Global Database 単独では要件を満たせません。\n\nD: DocumentDB は MongoDB API 互換のドキュメントデータベースで、グローバルテーブルのようなマルチリージョンのアクティブ-アクティブ書き込みはサポートしていません。"
    },
    {
      "id": "q037",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で大規模な検索システムを構築しています。製品カタログ（3 億件のドキュメント）に対して、全文検索、ファセット検索、地理空間検索が必要です。検索レイテンシーは P99 で 200ms 以下、書き込みは毎秒 1,000 件のリアルタイム更新が必要です。管理負荷を最小化したいと考えています。最も適切なサービスはどれですか？",
      "choices": [
        "Amazon RDS PostgreSQL で pg_trgm 拡張を使って全文検索を実装し、PostGIS で地理空間検索を処理する",
        "Amazon OpenSearch Service（旧 Elasticsearch Service）をマネージドクラスターとして展開し、インデックスシャーディング戦略を最適化する。OpenSearch の地理空間クエリと全文検索・ファセット集計をネイティブにサポートし、Auto-Tune 機能でパフォーマンスを自動最適化する",
        "Amazon CloudSearch を使って検索機能を実装し、ドメインを作成してインデックスを構成する",
        "Amazon DynamoDB に全製品データを格納し、GSI（グローバルセカンダリインデックス）で検索機能を実装する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon OpenSearch Service は大規模な全文検索、ファセット検索、地理空間検索をネイティブにサポートするマネージドサービスです。3 億件のドキュメントに対して適切なシャーディングを設定することで P99 200ms の達成が可能で、毎秒 1,000 件の書き込みも処理できます。Auto-Tune によるパフォーマンス自動最適化で管理負荷も軽減されます。\n\nA: RDS PostgreSQL の pg_trgm は中小規模の全文検索に有効ですが、3 億件のドキュメントへの全文検索・ファセット・地理空間クエリに P99 200ms を達成することは非常に困難です。\n\nC: Amazon CloudSearch は OpenSearch Service に比べて機能が限定的で、大規模な3億件のドキュメントや高度なファセット検索・地理空間検索への対応に制約があります。\n\nD: DynamoDB の GSI は全文検索には対応しておらず、テキストの部分一致・全文検索・ファセット検索・地理空間クエリを直接実装することはできません。"
    },
    {
      "id": "q038",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で機械学習パイプラインを構築しており、毎日新しいトレーニングデータが S3 に追加されます。データエンジニアは特徴量エンジニアリングを Jupyter Notebook で実験し、本番パイプラインは毎日自動的にモデルを再トレーニングして Canary デプロイで本番 API に反映させたいと考えています。MLOps の最善のプラクティスに従った、最も包括的な AWS アーキテクチャはどれですか？",
      "choices": [
        "Amazon SageMaker Studio でデータ探索と実験を行い、SageMaker Pipelines で自動化された ML ワークフローを定義する。SageMaker Model Registry でモデルのバージョン管理と承認フローを管理し、SageMaker Endpoints でのデプロイに Blue/Green デプロイメント（カナリア重み付け）を使用する",
        "EC2 インスタンスで Jupyter Notebook を実行し、cron ジョブでトレーニングスクリプトを毎日実行する。モデルを S3 に保存し、Lambda 関数で推論を実行する",
        "AWS Glue で特徴量エンジニアリングを行い、EMR で ML トレーニングを実行する。ECS コンテナで推論 API をホストし、CodeDeploy でカナリアデプロイを実装する",
        "Google Colab でノートブックを実行し、モデルを S3 にアップロードして Lambda で推論する"
      ],
      "answer": [
        0
      ],
      "explanation": "SageMaker Studio は統合 ML 開発環境として Jupyter Notebook を提供します。SageMaker Pipelines は ML ワークフローの自動化（データ前処理→トレーニング→評価→デプロイ）を定義でき、EventBridge でスケジュールトリガーが可能です。Model Registry でモデルのバージョン管理と本番承認フローを管理し、SageMaker Endpoint の Blue/Green デプロイでカナリアデプロイが実現できます。完全な MLOps ライフサイクルを一つのサービスファミリーで完結できます。\n\nB: cron ジョブと手動管理は MLOps のベストプラクティスに反し、実験管理、再現性、モデルのバージョン管理、カナリアデプロイが困難です。\n\nC: Glue + EMR + ECS + CodeDeploy の組み合わせは機能しますが、ML に特化した機能（実験トラッキング、モデルレジストリ、モデルモニタリング）が欠けており、複数サービスの統合管理の運用負荷が高くなります。\n\nD: Google Colab は AWS 環境外のサービスであり、AWS の MLOps ベストプラクティスに従う要件に反します。"
    },
    {
      "id": "q039",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "medium",
      "question": "ある企業が AWS Lambda を使ったサーバーレスアプリケーションを構築しており、Lambda 関数が Amazon RDS for PostgreSQL に接続する必要があります。Lambda の同時実行数は最大 1,000 で、各 Lambda の実行時間は平均 5 秒です。RDS の接続数上限（max_connections）を超えてエラーが発生する問題が起きています。コードを最小限に変更して最もコスト効率よく解決するには、どの方法が適切ですか？",
      "choices": [
        "RDS のインスタンスタイプをより大きなサイズにアップグレードして max_connections の上限を増やす",
        "Amazon RDS Proxy を RDS の前段に設置し、Lambda から RDS Proxy エンドポイントに接続する。RDS Proxy がコネクションプーリングを管理し、実際の RDS への接続数を削減する",
        "Lambda の同時実行数の上限（Reserved Concurrency）を 50 に制限し、RDS の接続数超過を防ぐ",
        "RDS を Amazon DynamoDB に移行し、接続数の問題を根本的に解決する"
      ],
      "answer": [
        1
      ],
      "explanation": "RDS Proxy は Lambda と RDS の間でコネクションプーリングを管理し、Lambda の同時実行が 1,000 であっても RDS への実際の接続数を数十に削減できます。Lambda 側はコネクション文字列を RDS エンドポイントから RDS Proxy エンドポイントに変更するだけで対応でき、コードの変更は最小限です。\n\nA: インスタンスのアップグレードでmax_connections は増えますが、Lambda の同時実行が増加するにつれ再度上限に達します。根本的な解決にはなりません。\n\nC: 同時実行数を 50 に制限すると、ピーク時に多数のリクエストがキューイングまたはエラーになり、アプリケーションのパフォーマンスが大幅に低下します。\n\nD: DynamoDB への移行は PostgreSQL が必要なリレーショナルモデルの場合に適用できず、大規模なデータモデルの変更とアプリケーションの書き直しが必要です。「コードを最小限に変更」という要件に反します。"
    },
    {
      "id": "q040",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でリアルタイムチャットアプリケーションを構築しています。ユーザーは WebSocket 接続でチャットルームに参加し、メッセージはリアルタイムで全参加者に配信される必要があります。接続ユーザー数は最大 100 万人が想定され、メッセージの永続化と 1 年間の履歴検索も必要です。サーバーレスアーキテクチャで実装したいと考えています。最も適切な設計はどれですか？",
      "choices": [
        "EC2 インスタンスで Node.js の Socket.io サーバーを実行し、Redis Pub/Sub でスケールアウトする。RDS に履歴を保存する",
        "Amazon API Gateway WebSocket API でリアルタイム双方向通信を実装し、Lambda でメッセージを処理する。接続情報は DynamoDB に管理し、メッセージはルームメンバーの接続 ID に対して API Gateway の PostToConnection API で配信する。履歴は DynamoDB に保存し、Athena で検索可能にする",
        "AWS AppSync の GraphQL サブスクリプション機能でリアルタイム通信を実装し、DynamoDB をデータソースとする。1 年間の履歴は DynamoDB TTL で古いデータを S3 に移行して Athena で検索する",
        "Amazon Kinesis Data Streams でメッセージを受信し、Lambda でファンアウト配信を行う"
      ],
      "answer": [
        1
      ],
      "explanation": "API Gateway WebSocket API はサーバーレスのリアルタイム双方向通信を提供し、Lambda と統合することでインフラ管理不要でスケールします。接続 ID を DynamoDB に管理し、PostToConnection API でルームの全メンバーにメッセージをプッシュできます。DynamoDB は 100 万接続の状態管理に適しており、Athena との組み合わせで大量の履歴データの検索も可能です。\n\nA: EC2 + Socket.io は機能しますが、サーバーレスではなくインフラ管理が必要です。100 万ユーザーへのスケールにはクラスター管理の複雑性が増します。\n\nC: AWS AppSync は有効な選択肢ですが、DynamoDB の TTL でデータを S3 に移行する機能は標準では提供されておらず（TTL は削除のみ）、追加の実装が必要です。また 1 年分の履歴を DynamoDB に保持するとコストが高くなります。\n\nD: Kinesis は高スループットのデータ処理に向いていますが、WebSocket の接続管理（接続確立・切断の追跡）や特定ユーザーへのプッシュ配信には API Gateway WebSocket API の方が適しています。"
    },
    {
      "id": "q041",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある小売企業が商品推薦システムを AWS 上に構築しています。ユーザーの購買履歴・閲覧履歴をリアルタイムで取り込み、個人化された商品推薦を 50ms 以内に API レスポンスとして返す必要があります。新しい商品の追加や在庫状況の変更は推薦結果にリアルタイムで反映される必要があり、システムは毎秒 10,000 リクエストを処理する必要があります。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon SageMaker のリアルタイム推論エンドポイントで推薦モデルをホストし、Lambda 経由で推薦 API を提供する。ユーザー行動データは Kinesis で収集し、日次バッチでモデルを再トレーニングする",
        "Amazon Personalize でリアルタイム推薦システムを構築し、PutEvents API でリアルタイムのユーザーインタラクションを取り込む。推薦 API は Personalize のキャンペーンエンドポイント経由で提供し、商品カタログの更新は Personalize のデータセットを継続的に同期する",
        "Amazon Elasticsearch（OpenSearch）で全商品データをインデックス化し、ユーザーの購買履歴からルールベースの推薦を実装する",
        "AWS Lambda で協調フィルタリングアルゴリズムをゼロから実装し、ElastiCache Redis にユーザーごとの推薦リストをキャッシュする"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon Personalize はリアルタイム個人化推薦を提供するフルマネージドサービスです。PutEvents API でユーザーインタラクションをリアルタイムに取り込み、推薦に即時反映できます。キャンペーンエンドポイントは自動スケールで毎秒 10,000 リクエストに対応し、50ms 以内のレイテンシーも達成可能です。商品カタログの継続同期で在庫変更も反映できます。\n\nA: SageMaker + Lambda も機能しますが、日次バッチのモデル再トレーニングでは新商品や在庫変更をリアルタイムに反映する要件を満たせません。Amazon Personalize の方が推薦システムに特化した機能を持ちます。\n\nC: OpenSearch のルールベース推薦は個人化 ML 推薦ではなく、ユーザーごとの個人化された推薦品質が大幅に低下します。\n\nD: Lambda でのゼロ実装は高い開発コストがかかり、50ms のレイテンシーと毎秒 10,000 リクエストをキャッシュだけで実現するには複雑な設計が必要です。Amazon Personalize の利用がより効率的です。"
    },
    {
      "id": "q042",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスから AWS へのリフト＆シフト移行を完了しており、次のフェーズとしてコンテナ化を進めています。現在 EC2 で稼働している 50 個のアプリケーションをコンテナに移行したいと考えています。チームは Kubernetes の経験がなく、Docker は使い慣れています。長期的にはオートスケーリング、ローリングアップデート、ヘルスチェックが必要です。運用の複雑性を最小化しながら移行するには、どのサービスを選択しますか？",
      "choices": [
        "Amazon EKS（Elastic Kubernetes Service）でKubernetes クラスターを構築し、Helm チャートでアプリケーションをデプロイする",
        "Amazon ECS（Elastic Container Service）+ AWS Fargate でサーバーレスコンテナを実行する。ECS タスク定義で Docker イメージを定義し、ECS サービスでオートスケーリング、ローリングアップデート、ヘルスチェックを管理する",
        "AWS Elastic Beanstalk のマルチコンテナ Docker 環境で全 50 アプリを管理する",
        "Amazon Lightsail Containers を使用し、シンプルなコンテナデプロイ環境で管理負荷を最小化する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon ECS + Fargate はサーバーレスコンテナプラットフォームとして、Kubernetes の知識なしに Docker コンテナを直接実行できます。ECS サービスはオートスケーリング（Application Auto Scaling）、ローリングデプロイ、ヘルスチェックをネイティブにサポートし、Fargate でインスタンス管理が完全に不要になります。Docker に慣れたチームが最短で移行できます。\n\nA: EKS は機能が豊富ですが、Kubernetes の経験がないチームには学習曲線が急で、管理の複雑性が大幅に増します。長期的には検討できますが、「運用の複雑性を最小化」の現段階では適切ではありません。\n\nC: Elastic Beanstalk は使いやすいですが、50 個の独立したアプリケーションの細かいオーケストレーション管理には ECS の方が柔軟性が高く、長期的な管理に適しています。\n\nD: Lightsail Containers はシンプルなユースケースに適していますが、50 個のアプリケーションの管理、高度なオートスケーリング、本番レベルの運用には機能が不足します。"
    },
    {
      "id": "q043",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "あるゲーム会社がグローバルなオンラインゲームのバックエンドを AWS に構築しています。ゲームのセッションデータ（プレイヤーの位置、スコア、ゲーム状態）はミリ秒単位で更新され、同じゲームルームの全プレイヤー間でリアルタイムに同期する必要があります。1 ゲームルームあたり最大 100 プレイヤー、同時進行するゲームルーム数は最大 10 万室です。最もこの要件に適したデータベース設計はどれですか？",
      "choices": [
        "Amazon RDS Aurora Multi-AZ でゲームセッションデータを管理し、ElastiCache Redis クラスターで最新状態をキャッシュする",
        "Amazon ElastiCache for Redis をゲームセッション状態の主データストアとして使用し、Redis Pub/Sub でルームメンバーへのリアルタイム更新配信を実現する。ゲーム終了後に最終スコアを DynamoDB に永続化する",
        "Amazon DynamoDB でゲームセッションデータを管理し、DynamoDB Streams で変更を検知して Lambda でプレイヤーに通知する",
        "Amazon DocumentDB でゲームセッションを JSON ドキュメントとして管理し、Change Streams でリアルタイム同期を実現する"
      ],
      "answer": [
        1
      ],
      "explanation": "ElastiCache Redis はインメモリデータストアとしてミリ秒以下のレイテンシーを提供し、10 万ルームの 100 万プレイヤーのリアルタイム状態更新に対応できます。Redis Pub/Sub でルームチャネルに参加するプレイヤーに即座にゲーム状態変更を配信できます。ゲームが一時的なデータであるためインメモリストアが適切で、ゲーム終了後のみ DynamoDB に永続化することでコストも最適化できます。\n\nA: Aurora Multi-AZ + ElastiCache は機能しますが、Aurora への書き込みはミリ秒以下のゲームセッション更新には不要なオーバーヘッドです。Redis が主データストアである方が設計がシンプルです。\n\nC: DynamoDB Streams + Lambda はミリ秒単位のリアルタイム同期には遅延が大きくなる可能性があります。Lambda のオーバーヘッドとコールドスタートがゲームの応答性に影響します。\n\nD: DocumentDB は MongoDB API 互換のドキュメントデータベースで、ミリ秒単位の高頻度更新とリアルタイム Pub/Sub 配信には ElastiCache Redis の方が適しています。"
    },
    {
      "id": "q044",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する EC2 + ALB + RDS Aurora PostgreSQL のアーキテクチャを運用しています。最近、トラフィックの急増によりデータベースの CPU 使用率が慢性的に 80% 以上になり、レスポンスタイムが悪化しています。調査の結果、読み取りクエリが全体の 85% を占めており、多くは同じクエリが繰り返されていることが判明しました。アプリケーションコードの変更を最小限にして最もコスト効率よくパフォーマンスを改善するには、どの方法が適切ですか？",
      "choices": [
        "Aurora DB クラスターのインスタンスタイプをより大きなサイズにスケールアップする",
        "Aurora のリードレプリカを 2 〜 3 台追加し、アプリケーションのデータベース接続をライターエンドポイントとリーダーエンドポイントに分離する。さらに ElastiCache for Redis または Memcached をキャッシュ層として追加し、繰り返しクエリの結果をキャッシュする",
        "Aurora をシャーディングして複数のクラスターに分散し、アプリケーション側でシャーディングロジックを実装する",
        "RDS Proxy を追加してコネクションプーリングを改善し、Aurora Performance Insights で遅いクエリを特定して最適化する"
      ],
      "answer": [
        1
      ],
      "explanation": "読み取り 85% のワークロードにはリードレプリカの追加とリーダーエンドポイントへの接続分離が効果的です。さらに同一クエリの繰り返しが多いため、ElastiCache でクエリ結果をキャッシュすることで DB への読み取り負荷を大幅に削減できます。Aurora のリーダーエンドポイントはコード側での最小限の変更（接続文字列の切り替え）で対応できます。\n\nA: スケールアップは即効性がありますが、読み取り 85% の根本原因に対処せず、コストも高くなります。いずれ再びボトルネックに達します。\n\nC: シャーディングは複雑な実装と大規模なコード変更が必要で、現状の読み取り負荷問題への解決策として過剰です。\n\nD: RDS Proxy はコネクション数の最適化に有効ですが、CPU 使用率 80% の根本原因である大量の読み取りクエリ負荷そのものを軽減しません。パフォーマンス改善の主要手段にはなりません。"
    },
    {
      "id": "q045",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業の AWS 環境において、S3 に保存されたデータの合計が 500TB を超え、S3 ストレージコストが急増しています。S3 バケットを調査したところ、オブジェクトの 70% は作成後 90 日以上アクセスされていない「コールドデータ」であることが分かりました。また、30 日以内は頻繁にアクセスされるが、それ以降は急速にアクセス頻度が低下するパターンが確認されました。アクセスパターンが不明なデータについても最適なストレージクラスに自動的に移行させたいと考えています。最もコスト効率の良い対策はどれですか？",
      "choices": [
        "すべてのオブジェクトを S3 Glacier Deep Archive に移行し、アクセスが必要な場合は都度リストアする",
        "S3 Lifecycle ポリシーを設定し、オブジェクト作成から 30 日後に S3 Standard-IA に移行、90 日後に S3 Glacier Instant Retrieval に移行するルールを設定する。アクセスパターンが不明なオブジェクトには S3 Intelligent-Tiering を適用し、アクセス頻度に基づいて自動的にティアを変更させる",
        "S3 バケットのバージョニングを有効化し、古いバージョンを S3 One Zone-IA に移行する Lifecycle ポリシーを設定する",
        "全データを EFS に移行して EFS ライフサイクル管理を使用し、14 日間アクセスのないファイルを EFS IA に自動移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 Lifecycle ポリシーは既知のアクセスパターン（30 日→IA、90 日→Glacier）への自動移行に対応します。S3 Intelligent-Tiering はアクセスパターンが不明なデータを監視し、アクセス頻度に応じて自動でストレージティアを移動し、追加の Lifecycle ルール設定なしにコスト最適化を実現します。両方を組み合わせることで最大のコスト削減が期待できます。\n\nA: Glacier Deep Archive は最も低コストですが、データアクセスに最大 48 時間かかり、30 日以内に頻繁にアクセスされるデータには不適切です。\n\nC: バージョニングの有効化と古いバージョンの移行は、コスト削減の一部にはなりますが、現在のオブジェクト（最新バージョン）の最適化には直接対応していません。\n\nD: S3 から EFS への移行はコスト面で逆効果です。EFS は EC2 などのファイルシステムアクセスが必要な場合に適しており、大容量のオブジェクトストレージの代替にはなりません。EFS のコストは S3 より高くなります。"
    },
    {
      "id": "q046",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS CodePipeline と CodeBuild を使ったデプロイパイプラインを運用していますが、本番デプロイ後に障害が発生した場合の復旧時間（MTTR）が長いという問題があります。現在のデプロイはすべてのインスタンスを同時に更新するローリングデプロイで、問題が検出された時点では既に全インスタンスが更新されています。デプロイリスクを軽減し、問題発生時の即時ロールバックを実現するためのアーキテクチャ改善はどれですか？",
      "choices": [
        "デプロイ前に必ずステージング環境でテストを実施し、テスト合格後のみ本番デプロイを許可するゲートを CodePipeline に追加する",
        "AWS CodeDeploy を使って Blue/Green デプロイメントに切り替える。新バージョン（Green 環境）を ALB の別ターゲットグループにデプロイし、CloudWatch Alarm でエラー率や P99 レイテンシーを監視して、アラームが発火した場合は自動的に Blue 環境（旧バージョン）に即時ロールバックする",
        "AWS Elastic Beanstalk に移行し、Beanstalk の組み込みデプロイ戦略（Rolling with additional batch）を使用する",
        "AMI ゴールデンイメージを毎リリースで作成し、Auto Scaling グループの起動テンプレートを更新して新しい AMI に切り替える"
      ],
      "answer": [
        1
      ],
      "explanation": "Blue/Green デプロイメントはゼロダウンタイムのデプロイと即時ロールバックを実現する最も効果的な方法です。CodeDeploy の Blue/Green では新バージョン（Green）を完全にデプロイした後、ALB のルーティングを切り替えます。CloudWatch Alarm との統合でエラー率や P99 レイテンシーの悪化を自動検出し、ALB のルーティングを瞬時に Blue（旧バージョン）に戻すロールバックが実現できます。\n\nA: ステージング環境のテストゲートはデプロイ前の品質確保に有効ですが、本番特有の問題（本番トラフィックパターン、データ量など）への対応や、本番デプロイ後の即時ロールバック要件を満たしません。\n\nC: Elastic Beanstalk への移行は大きなアーキテクチャ変更を要し、「Rolling with additional batch」も部分的なロールバックには複雑な手順が必要で、即時ロールバックを保証しません。\n\nD: AMI ゴールデンイメージへの切り替えは時間がかかり（新インスタンスの起動・ウォームアップ）、即時ロールバックの要件を満たしません。"
    },
    {
      "id": "q047",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業の AWS 環境で、開発チームが Lambda 関数を頻繁にデプロイしています。最近、デプロイ後に特定のリージョンでコールドスタートが急増し、エンドユーザーへのレイテンシーが悪化するという問題が発生しています。調査の結果、コールドスタートは最初のリクエストで最大 3 秒かかることが判明しました。アプリケーションは Java で実装されており、メモリサイズは 512MB です。最小限のコスト増加でコールドスタートを最も効果的に削減するには、どの方法が適切ですか？",
      "choices": [
        "Lambda のメモリサイズを 3,008MB に増やし、CPU 性能を向上させてコールドスタート時間を短縮する",
        "Lambda のプロビジョニングドコンカレンシーを設定し、常に一定数の実行環境を事前にウォームアップしておく。Application Auto Scaling でピーク時間帯に合わせてプロビジョニングドコンカレンシーをスケジュールし、オフピーク時はゼロに設定してコストを節約する",
        "Lambda のランタイムを Java から Node.js または Python に変更し、コールドスタート時間を短縮する",
        "CloudWatch Events（EventBridge）でウォーマー関数を 5 分ごとに実行し、Lambda 関数を定期的に呼び出してウォームな状態を維持する"
      ],
      "answer": [
        1
      ],
      "explanation": "プロビジョニングドコンカレンシーは指定した数の Lambda 実行環境を常に初期化済み状態に保ち、コールドスタートをほぼゼロにします。Application Auto Scaling でスケジュールを設定することで、ピーク時間帯のみプロビジョニングドコンカレンシーを確保し、オフピーク時はゼロにすることでコストを最小化できます。\n\nA: メモリ増加は CPU リソースが増えコールドスタートが若干改善される場合がありますが、Java のコールドスタートの主な原因はJVMの起動とクラスローディングであり、メモリ増加だけでは根本的な解決にはなりません。また 3,008MB への増加はコストが約 6 倍になります。\n\nC: Java から Python/Node.js への変更は確かにコールドスタートを短縮できますが、アプリケーション全体の書き直しが必要で、「最小限のコスト増加」の前に大きな開発コストが生じます。\n\nD: 定期的な呼び出しによるウォームアップは一般的な手法ですが、Lambda はアイドル後に実行環境が廃棄されるため、5 分より短い間隔でもコールドスタートが発生する可能性があります。プロビジョニングドコンカレンシーほど確実ではありません。"
    },
    {
      "id": "q048",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon EKS クラスターを運用しています。クラスターには数百のマイクロサービスがデプロイされており、障害発生時に原因特定に時間がかかるという問題があります。現在は各マイクロサービスのログが CloudWatch Logs に個別に送られていますが、サービス間のリクエスト追跡（分散トレーシング）ができておらず、ボトルネックのサービスを特定することが困難です。最も効果的な可観測性改善策はどれですか？",
      "choices": [
        "各マイクロサービスにカスタムロギングコードを追加し、相関 ID を手動でリクエストヘッダーに伝播させる",
        "AWS X-Ray を EKS クラスターに統合し、X-Ray デーモンを DaemonSet としてデプロイする。Amazon CloudWatch Container Insights を有効化してコンテナレベルのメトリクスを収集し、CloudWatch Logs Insights でログの横断検索を行う。AWS Distro for OpenTelemetry（ADOT）コレクターを使ってトレースとメトリクスを標準化する",
        "Kubernetes の kubectl top コマンドでリソース使用率を定期的に確認し、問題のあるノードを手動で再起動する",
        "すべてのマイクロサービスのログを Kinesis Data Firehose で S3 に保存し、Athena で後からログを分析する"
      ],
      "answer": [
        1
      ],
      "explanation": "X-Ray は分散トレーシングを提供し、マイクロサービス間のリクエストフローを可視化します。X-Ray デーモンの DaemonSet デプロイにより、コードの最小限の変更でトレース収集が可能です。CloudWatch Container Insights はコンテナとポッドレベルのメトリクスを提供し、ADOT でのメトリクスとトレースの標準化で OpenTelemetry エコシステムとの互換性も確保できます。\n\nA: 手動での相関 ID 伝播は開発負荷が高く、すべてのサービスに実装するには時間がかかります。標準化されたトレーシングフレームワークを使う方がはるかに効率的です。\n\nC: kubectl top は基本的なリソース確認に有効ですが、分散トレーシングやアプリケーションレベルのボトルネック特定には不十分です。手動での再起動は根本原因の解決になりません。\n\nD: S3 + Athena でのログ分析は事後分析に有効ですが、リアルタイムの障害診断や分散トレーシングには対応しておらず、原因特定の時間短縮には効果が限定的です。"
    },
    {
      "id": "q049",
      "type": "multiple",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働するアプリケーションのセキュリティポスチャを改善しています。Security Hub の調査で、以下の問題が発見されました。①EC2 インスタンスのパッチ適用が不定期、②S3 バケットの一部でサーバーサイド暗号化が有効になっていない、③IAM ユーザーに MFA が設定されていない。これらの問題を自動化された方法で継続的に修正するために適切な AWS サービスを2つ選択してください。",
      "choices": [
        "AWS Systems Manager Patch Manager でパッチベースラインを定義し、Maintenance Window でスケジュールに従って EC2 インスタンスへのパッチ適用を自動化する",
        "AWS Config のマネージドルール（s3-bucket-server-side-encryption-enabled）でS3 暗号化を検出し、Config リメディエーション（自動修復）で非準拠バケットに暗号化を有効化する Lambda 関数を自動実行する",
        "AWS Trusted Advisor で定期的にセキュリティチェックを実行し、結果を週次で IT チームにメール送信する",
        "IAM ユーザーへの MFA 強制は Organizations の SCP で全アカウントに適用する",
        "Amazon Inspector でEC2 の CVE スキャンを実施し、重大な脆弱性を検出したら SNS 通知を送信する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "Systems Manager Patch Manager（A）はパッチベースラインと Maintenance Window の組み合わせで EC2 への自動パッチ適用を実現し、問題①を継続的に解決します。AWS Config のリメディエーション（B）は非準拠の S3 バケットを自動検出して Lambda で修復することで問題②を継続的に解決します。この2つが「自動化された継続的な修正」の要件に最も合致します。\n\nC: Trusted Advisor の週次メール送信は手動対応を促すもので、「自動修正」ではありません。\n\nD: SCP で MFA 強制は有効ですが、これは「既存の IAM ユーザーに MFA を設定する」修正ではなく、MFA なしのアクセスを拒否する予防的制御です。既存ユーザーへの MFA 設定は自動化できません。\n\nE: Amazon Inspector は脆弱性の検出に有効ですが、パッチ適用の自動化は Inspector 単独では実現できず、Systems Manager との連携が別途必要です。"
    },
    {
      "id": "q050",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で複数の Lambda 関数を運用しており、月次のコスト分析で Lambda のコストが予想を大幅に上回っていることが判明しました。CloudWatch のメトリクスを確認すると、多くの関数でメモリ使用率が設定の 10〜20% 程度しか使われていないにもかかわらず、1,500MB や 3,008MB の高いメモリサイズが設定されていることが分かりました。また、実行時間が非常に長い関数もいくつかあります。最もコスト効率よく Lambda を最適化するにはどの方法が適切ですか？",
      "choices": [
        "すべての Lambda 関数のメモリを一律 128MB に設定し、タイムアウトを最大の 15 分に設定する",
        "AWS Lambda Power Tuning ツール（Step Functions ベースのオープンソースツール）を使って各関数の最適メモリサイズを測定し、コスト-パフォーマンストレードオフの最適点を特定する。AWS Compute Optimizer の Lambda レコメンデーションも活用して、過剰プロビジョニングの関数を特定してメモリを削減する",
        "Lambda 関数をすべて AWS Fargate に移行し、コンテナで必要なメモリを正確に指定する",
        "Lambda の予約済み同時実行数を削減して関数の並列実行を制限し、トータルコストを削減する"
      ],
      "answer": [
        1
      ],
      "explanation": "Lambda Power Tuning は異なるメモリサイズで関数をテスト実行し、実行時間とコストのトレードオフグラフを生成します。多くの場合、メモリを増やすことで実行時間が短縮されコスト的に最適な点が見つかります。Compute Optimizer は本番の実際の使用状況からメモリの過剰プロビジョニングを検出し、具体的な削減量を推薦します。この2つの組み合わせがデータ駆動型の最適化として最も効果的です。\n\nA: 一律 128MB への設定は多くの関数でパフォーマンス低下や実行時間増加によるコスト増を招く可能性があります。最適メモリは関数によって異なります。\n\nC: Fargate への移行は大きなアーキテクチャ変更と開発コストが発生し、Lambda のコスト問題への解決策としては過剰です。\n\nD: 同時実行数の削減はスロットリングを引き起こし、リクエストの失敗やレイテンシー増加につながります。コスト削減の適切な方法ではありません。"
    },
    {
      "id": "q051",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS WAF を ALB の前段に設置してウェブアプリケーションを保護していますが、セキュリティチームから「WAF のルールが実際にどのようなトラフィックをブロックしているか把握できておらず、誤検知（正当なトラフィックのブロック）が疑われる」との報告があります。また、新しいルールのテストを本番に影響なく実施したいと考えています。最も適切な改善策はどれですか？",
      "choices": [
        "WAF のすべてのルールを一時的に無効化し、正当なトラフィックが通過することを確認してから再度有効化する",
        "WAF のロギングを有効化して、Kinesis Data Firehose 経由でログを S3 に保存する。Athena と QuickSight で WAF ログを分析してブロックされたリクエストのパターンを把握する。新しいルールや変更は「カウントモード」（Count モード）でまずテストし、誤検知がないことを確認してから「ブロックモード」に切り替える",
        "AWS Shield Advanced に移行して高度な DDoS 保護と詳細な可視性を確保する",
        "WAF ルールをすべて削除し、ALB アクセスログのみで不審なトラフィックを監視する"
      ],
      "answer": [
        1
      ],
      "explanation": "WAF ロギングの有効化により、ブロックされた/許可されたリクエストの詳細（IP、URI、マッチしたルール等）を完全に把握できます。Athena + QuickSight でのログ分析でパターンの可視化が可能です。新ルールのカウントモードテストは本番トラフィックに影響なく誤検知率を測定し、安全確認後にブロックモードに切り替えることで段階的な展開が実現できます。\n\nA: WAF ルールの一時無効化は本番セキュリティの空白期間を作り、攻撃に対して無防備になります。\n\nC: Shield Advanced はDDoS 保護の強化に有効ですが、WAF の誤検知問題や可視性の改善には直接対応しません。WAF ロギングは Shield Advanced なしでも設定できます。\n\nD: WAF ルールの全削除は論外であり、アプリケーションを攻撃に対して完全に無防備にします。"
    },
    {
      "id": "q052",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "medium",
      "question": "ある企業が Amazon CloudFront を使ってウェブサイトを配信していますが、ユーザーから「ページの読み込みが遅い」との苦情が増えています。CloudFront のモニタリングを確認したところ、キャッシュヒット率が 25% と非常に低く、ほとんどのリクエストがオリジンサーバー（ALB + EC2）に到達していることが分かりました。アプリケーションの変更を最小限に抑えながら CloudFront のキャッシュヒット率を向上させる方法として最も適切なものはどれですか？",
      "choices": [
        "CloudFront のディストリビューションを削除して Route 53 で直接オリジンに接続し、ALB の性能を改善する",
        "CloudFront キャッシュポリシーを見直し、不要なクエリパラメーターや Cookie をキャッシュキーから除外する。Cache-Control ヘッダーをオリジンで適切に設定し、静的コンテンツの TTL を延ばす。CloudFront の Origin Shield を有効化して、オリジンへのリクエスト数をさらに削減する",
        "Lambda@Edge を追加してすべてのリクエストをオリジンに転送し、レスポンスをキャッシュする前に動的に加工する",
        "ALB の前段に ElastiCache を追加してアプリケーション層のキャッシュを実装し、オリジンの応答速度を改善する"
      ],
      "answer": [
        1
      ],
      "explanation": "キャッシュヒット率の低下の主な原因は、不必要なクエリパラメーターや Cookie がキャッシュキーに含まれていることです。これにより同じコンテンツが異なるキャッシュエントリとして扱われます。不要なキャッシュキーを除外し、Cache-Control ヘッダーで適切な TTL を設定することでヒット率が大幅に向上します。Origin Shield はキャッシュの中間層として追加のキャッシュ効果を提供します。\n\nA: CloudFront を削除することはパフォーマンスをさらに悪化させ、CDN の恩恵を失います。\n\nC: Lambda@Edge でリクエストをオリジンに転送することはキャッシュヒット率の改善に逆効果で、処理コストも増加します。\n\nD: ElastiCache はアプリケーション層のキャッシュを改善しますが、CloudFront のキャッシュヒット率（エッジでの命中）の問題には直接対応しません。CloudFront の設定変更なしでは改善が限定的です。"
    },
    {
      "id": "q053",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon Redshift クラスターを運用しており、毎日数十のバッチクエリが実行されています。最近、特定の大規模クエリの実行時間が急増しており、クエリのキューイングが発生してダッシュボードの更新が遅延しています。ワークロードを調査したところ、ETL バッチクエリ（長時間・大量データスキャン）とダッシュボードクエリ（短時間・低レイテンシー要件）が同じキューで競合していることが判明しました。最もコスト効率よくパフォーマンスを改善するには、どの方法が適切ですか？",
      "choices": [
        "Redshift クラスターのノード数を増加させてコンピューティングキャパシティを追加する",
        "Redshift の WLM（ワークロード管理）を設定し、ETL バッチクエリ用のキューとダッシュボード用の低レイテンシークエリキューを分離する。Redshift Serverless または Concurrency Scaling を有効化して、ピーク時のクエリコンカレンシーを自動スケールで処理する",
        "ダッシュボードクエリを Amazon Athena に移行し、S3 のデータに直接クエリする",
        "Redshift クラスターを Amazon EMR Spark クラスターに移行し、Spark SQL でクエリを処理する"
      ],
      "answer": [
        1
      ],
      "explanation": "Redshift WLM のキュー分離は、ETL バッチ（高スロット数・低優先度）とダッシュボード（低スロット数・高優先度）を別キューに配置し、リソース競合を排除します。Concurrency Scaling は同時実行数が増加した際に追加のクラスターキャパシティを一時的に提供し、コストはクレジット単位で課金されます（毎日 1 時間のクレジットが無料で付与）。\n\nA: ノード数増加はキャパシティを増やしますが、キュー競合の根本原因を解決せず、常時コストが増加します。WLM の設定変更はコスト増加なしで実現できます。\n\nC: ダッシュボードクエリを Athena に移行することは有効ですが、Redshift に最適化されたデータを再度 S3 に移行するか、Redshift Spectrum を使う設計変更が必要で、アーキテクチャの複雑性が増します。\n\nD: EMR Spark への全移行は大規模なアーキテクチャ変更と移行コストが生じ、「コスト効率よく改善」の要件には過剰な対応です。"
    },
    {
      "id": "q054",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS のインフラコストを削減するため、コスト最適化プロジェクトを開始しました。AWS Cost Explorer のレコメンデーションを確認すると、本番環境の EC2 インスタンスの 40% が過去 3 か月間で CPU 使用率の平均が 5% 以下であることが分かりました。また、未使用の EBS ボリューム（デタッチ済み）が 200 以上あります。組織のコンプライアンス要件として、本番リソースの削除前に 2 段階の承認が必要です。最もコスト効率よく安全にリソースを最適化するには、どのプロセスが適切ですか？",
      "choices": [
        "すぐに低使用率の EC2 インスタンスを停止し、デタッチされた EBS ボリュームを削除する",
        "AWS Compute Optimizer の推奨事項をエクスポートし、低使用率 EC2 インスタンスの詳細な使用状況レポートを作成する。承認ワークフロー（ServiceNow や JIRA など変更管理システム）に変更申請を提出し、2 段階の承認後に AWS Systems Manager Automation でインスタンスタイプのダウンサイジングまたは停止を実行する。未使用 EBS ボリュームは AWS Config ルールとリメディエーションで検出・スナップショット作成後に削除する",
        "Reserved Instance への切り替えで低使用率インスタンスのコストを削減し、EBS ボリュームは現状維持する",
        "全 EC2 インスタンスを Spot インスタンスに変更してコストを削減し、EBS ボリュームはライフサイクルポリシーで自動スナップショット後に削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "Compute Optimizer のエクスポートで詳細なデータをチームと共有し、変更管理システムとの統合で 2 段階承認を実現します。承認後の Systems Manager Automation で安全にダウンサイジングを実行し、Config リメディエーションで EBS ボリュームを自動的にスナップショット後に削除することで、データ保護と運用コンプライアンスを両立できます。\n\nA: 承認なしの即時削除は 2 段階承認のコンプライアンス要件に反し、本番システムに影響を与えるリスクがあります。\n\nC: Reserved Instance への切り替えはコスト削減に有効ですが、実際に低使用率のインスタンスへの投資はコスト最適化の観点では非効率です。ダウンサイジングの方が長期的に効果的です。\n\nD: 本番インスタンスを Spot に変更することは、Spot の中断リスクにより本番システムの安定性を損なう可能性があり、一般的に本番ワークロードには推奨されません。"
    },
    {
      "id": "q055",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon Aurora MySQL を使ったアプリケーションを運用しています。Aurora フェイルオーバー後にアプリケーションが新しいプライマリエンドポイントへの接続を確立するのに数分かかり、その間サービスが停止するという問題があります。現在のアプリケーションはドライバーレベルでのフェイルオーバーサポートがなく、接続文字列に Aurora クラスターエンドポイントをハードコードしています。最小限のアプリケーション変更でフェイルオーバー時間を最小化するには、どの方法が適切ですか？",
      "choices": [
        "Aurora のフェイルオーバー優先度を高いレプリカに設定し、フェイルオーバー時間を短縮する",
        "Amazon RDS Proxy を Aurora クラスターの前段に設置し、アプリケーションの接続文字列を RDS Proxy エンドポイントに変更する。RDS Proxy はフェイルオーバーを内部的に処理し、アプリケーションへの接続を維持するため、フェイルオーバー時のサービス停止時間が大幅に短縮される",
        "Route 53 のヘルスチェックと DNS フェイルオーバーを設定し、Aurora フェイルオーバー時に DNS を新しいエンドポイントに向ける",
        "アプリケーションに Aurora フェイルオーバーを検知する再試行ロジックを実装し、新しいエンドポイントに自動で接続する"
      ],
      "answer": [
        1
      ],
      "explanation": "RDS Proxy は Aurora のフェイルオーバーをプロキシ層で処理します。フェイルオーバー時にアプリケーションは RDS Proxy エンドポイントへの接続を維持したまま、Proxy が内部的に新しいプライマリへの接続を確立します。アプリケーション側の変更は接続文字列をクラスターエンドポイントから RDS Proxy エンドポイントに変更するだけで、フェイルオーバー時間を数秒程度に短縮できます。\n\nA: フェイルオーバー優先度の設定はどのレプリカが新プライマリになるかに影響しますが、フェイルオーバー後のアプリケーション接続時間の問題を解決しません。\n\nC: Aurora クラスターエンドポイントは既にフェイルオーバー後の新プライマリを指すよう DNS が更新されますが、DNS の TTL（通常 5 秒）と接続プールの古い接続が問題です。Route 53 ヘルスチェックを追加しても根本的な接続プールの問題は残ります。\n\nD: アプリケーションへの再試行ロジック追加は有効ですが、既存ドライバーのフェイルオーバーサポートがない場合は実装が複雑になります。「最小限のアプリケーション変更」という要件に対して RDS Proxy の方が少ない変更で対応できます。"
    },
    {
      "id": "q056",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する SQS + Lambda のイベント処理システムを運用しています。最近、一部の SQS メッセージが繰り返し処理に失敗し、Lambda 関数が「毒矢（Poison Pill）」メッセージによって繰り返し呼び出され、関数の同時実行数の上限に達してしまう問題が発生しています。また、失敗したメッセージの内容を後で分析する必要があります。最も適切な解決策はどれですか？",
      "choices": [
        "Lambda 関数のタイムアウトを延ばし、エラーハンドリングコードを追加してすべての例外をキャッチする",
        "SQS キューのデッドレターキュー（DLQ）を設定し、最大受信回数（maxReceiveCount）を超えたメッセージを DLQ に移動する。Lambda の最大バッチウィンドウと最大バッチサイズを調整し、バッチ内の一部失敗でメッセージを個別に DLQ に移動できるよう Lambda イベントソースマッピングの「失敗時の報告」機能を有効化する",
        "SQS の可視性タイムアウトをゼロに設定して失敗したメッセージを即座に再処理できるようにし、Lambda の予約済み同時実行数を増やす",
        "Lambda 関数をスケジュール実行に変更し、1 時間ごとに SQS キューをポーリングして全メッセージを一括処理する"
      ],
      "answer": [
        1
      ],
      "explanation": "SQS の DLQ と maxReceiveCount の設定により、一定回数失敗したメッセージが自動的に DLQ に移動し、メインキューとの無限ループを防ぎます。Lambda イベントソースマッピングの「失敗時の報告（Report batch item failures）」機能を有効化することで、バッチ内の一部のメッセージのみが失敗した場合、その失敗したメッセージだけを SQS の可視性タイムアウト外にし、成功したメッセージは削除されます。DLQ に移動したメッセージは後で分析できます。\n\nA: タイムアウトの延長と例外キャッチだけでは Poison Pill メッセージの無限再試行ループを防止できず、DLQ の設定がなければメッセージは永続的にメインキューに残り続けます。\n\nC: 可視性タイムアウトをゼロにすると失敗メッセージが即座に再表示され、より多くの Lambda 呼び出しを引き起こします。同時実行数の増加も問題を悪化させます。\n\nD: スケジュール実行への変更はイベント駆動アーキテクチャの利点を失い、1 時間ごとの処理では遅延が大幅に増加します。"
    },
    {
      "id": "q057",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "medium",
      "question": "ある企業が AWS Direct Connect を使ってオンプレミスと AWS を接続しており、この接続を介して S3 へのアクセスも行っています。しかし、現在の S3 アクセスはパブリックインターネットを経由しており、Direct Connect 回線の帯域幅を有効活用できていません。また、セキュリティチームは S3 トラフィックがインターネットを経由することを懸念しています。最もシンプルな解決策はどれですか？",
      "choices": [
        "オンプレミスに HTTP プロキシサーバーを設置し、S3 へのリクエストを Direct Connect 経由にルーティングする",
        "VPC に S3 のゲートウェイ型 VPC エンドポイントを作成し、VPC のルートテーブルに S3 のプレフィックスリストへのルートを追加する。Direct Connect 経由のオンプレミストラフィックが VPC を通過してエンドポイント経由で S3 にプライベートアクセスするよう設定する",
        "S3 バケットポリシーで Direct Connect の IP アドレスからのアクセスのみを許可し、インターネット経由のアクセスを拒否する",
        "CloudFront を S3 の前段に配置し、Direct Connect 経由のオリジンアクセスを設定する"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 のゲートウェイ型 VPC エンドポイントを VPC に作成し、ルートテーブルにエンドポイントルートを追加することで、VPC を経由するすべてのトラフィック（Direct Connect 経由のオンプレミスを含む）がプライベートに S3 にアクセスできます。Direct Connect からのトラフィックは仮想プライベートゲートウェイ経由で VPC に入り、VPC エンドポイント経由でインターネットを経由せずに S3 に到達します。\n\nA: HTTP プロキシサーバーの設置は追加インフラと運用負荷が必要で、設定と管理が複雑になります。\n\nC: バケットポリシーで IP を制限することは追加のセキュリティ層として有効ですが、それだけではトラフィック経路はインターネット経由のままで、帯域幅の有効活用とセキュリティ要件を満たしません。\n\nD: CloudFront を経由することはインターネット経由のアクセスであり、Direct Connect 経由のプライベートアクセスの要件を満たしません。"
    },
    {
      "id": "q058",
      "type": "multiple",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する EC2 フリートに対して、セキュリティとコンプライアンスの要件として以下を継続的に維持したいと考えています。①インスタンスへのパッチ適用状況を一元的に確認できる、②インスタンス内部のソフトウェアインベントリ（インストール済みアプリケーション一覧）を収集して可視化する。最小限の運用負荷でこれらを実現するために必要な設定を2つ選択してください。",
      "choices": [
        "AWS Systems Manager Patch Manager でパッチコンプライアンスレポートを有効化し、Systems Manager コンソールのパッチコンプライアンスダッシュボードで全インスタンスのパッチ状態を確認する",
        "AWS Systems Manager Inventory を有効化し、EC2 インスタンスのソフトウェアインベントリ（インストール済みアプリ、ネットワーク設定等）を自動収集する。結果を Systems Manager コンソールまたは S3 + Athena でクエリできるよう設定する",
        "各 EC2 インスタンスに cron ジョブを設定して rpm -qa または dpkg -l の出力を S3 に定期アップロードする",
        "Amazon Inspector で CVE スキャンを実行し、パッチ不足の脆弱性を検出する",
        "AWS Trusted Advisor のセキュリティチェックでパッチ適用状態を確認する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "Systems Manager Patch Manager（A）のコンプライアンスレポートは、全インスタンスのパッチ適用状況（準拠/非準拠）を一元的なダッシュボードで確認でき、要件①を満たします。Systems Manager Inventory（B）はエージェント経由でインストール済みアプリケーション、サービス、ネットワーク設定等を自動収集し、要件②を満たします。両方とも SSM Agent がインストールされている EC2 インスタンスに対して最小限の設定で有効化できます。\n\nC: cron ジョブによる手動収集は自動化されておらず、管理負荷が高く、一元管理もできません。\n\nD: Amazon Inspector は CVE の脆弱性スキャンに特化しており、パッチコンプライアンスの一元ダッシュボードとしての機能や、インベントリ収集は Patch Manager と Inventory の方が直接対応しています。\n\nE: Trusted Advisor のセキュリティチェックは一部のセキュリティ設定を確認しますが、EC2 のパッチコンプライアンス詳細レポートやインベントリ収集は提供していません。"
    },
    {
      "id": "q059",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でマイクロサービスアーキテクチャを運用しており、複数の API が Amazon API Gateway 経由で公開されています。最近、一部の API エンドポイントが外部からの過剰なリクエストにより負荷が増大し、他の正常なエンドポイントの性能にも影響を与えるという問題が発生しています。また、特定のユーザーグループへのレート制限も実装したいと考えています。最も適切な解決策はどれですか？",
      "choices": [
        "API Gateway の WAF を有効化して不正なリクエストをブロックし、Lambda 関数でリクエスト数をカウントして DynamoDB に保存してレート制限を実装する",
        "API Gateway の使用量プラン（Usage Plan）と API キーを設定し、クライアントまたはユーザーグループごとにスロットリングレート（リクエスト/秒）とクォータ（リクエスト/月）を定義する。API Gateway のデフォルトのスロットリング設定でアカウントおよびステージレベルのレート制限も設定する",
        "CloudFront を API Gateway の前段に設置し、CloudFront のオリジンシールドでオリジンへのリクエスト数を削減する",
        "Lambda 関数の予約済み同時実行数を増やして過剰なリクエストをさばけるよう処理能力を増強する"
      ],
      "answer": [
        1
      ],
      "explanation": "API Gateway の使用量プランは特定の API キー（ユーザーまたはグループに発行）に対して、スロットリング（秒あたりのリクエスト数）とクォータ（月あたりの総リクエスト数）を細かく設定できます。アカウントレベルとステージレベルのデフォルトスロットリングと組み合わせることで、多層的なレート制限が実現できます。設定は AWS マネジメントコンソールから行えます。\n\nA: Lambda を使ったカスタムレート制限の実装は高い開発コストがかかり、DynamoDB への書き込みレイテンシーがリクエスト処理に影響します。API Gateway のネイティブ機能を使う方がはるかに効率的です。\n\nC: CloudFront はキャッシュによるオリジンへのリクエスト削減に有効ですが、ユーザーグループごとの細かいレート制限設定は API Gateway の使用量プランが適しています。\n\nD: 同時実行数の増加は過剰なリクエストをさばく容量を増やしますが、過剰なリクエストそのものを制限するレート制限の要件を解決しておらず、コストも増大します。"
    },
    {
      "id": "q060",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が Amazon ECS on Fargate でマイクロサービスを運用しており、本番デプロイ後に特定のサービスでメモリリークが発生することが判明しています。デプロイ後 24 時間経過するとメモリ使用率が徐々に増加し、48 時間後に OOM（メモリ不足）でコンテナがクラッシュします。このパターンを事前に検知して、クラッシュが発生する前に自動的にコンテナを再起動する仕組みを構築したいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "ECS サービスの desired count を増やして常に複数のタスクが稼働するようにし、1 つがクラッシュしても他が対応できるようにする",
        "CloudWatch Container Insights でコンテナレベルのメモリ使用率メトリクスを収集し、使用率が 80% を超えたときに CloudWatch Alarm を発火させる。Alarm のアクションとして EventBridge ルール + Lambda 関数を設定し、Lambda から ECS API（StopTask）を呼び出して該当タスクを停止する（ECS サービスが自動的に新タスクを起動する）",
        "ECS タスク定義の memoryReservation を低く設定して ECS の OOM キラーが早めに動作するようにする",
        "毎朝 12 時に EventBridge スケジュールで Lambda を実行し、全 ECS タスクを強制的に再起動することでメモリリークをリセットする"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudWatch Container Insights はコンテナレベルのメモリ使用率をリアルタイムで収集します。メモリ使用率 80% でアラームを設定し、EventBridge + Lambda で ECS タスクを停止させることで、ECS サービスが自動的に新しいタスクを起動します。これによりクラッシュ前に予防的な再起動が実現できます。\n\nA: desired count の増加は高可用性を提供しますが、全タスクがメモリリークの影響を受けるため根本的な解決にはなりません。すべてのタスクが 48 時間後にクラッシュします。\n\nC: memoryReservation の低設定は ECS が OOM キラーを早期に動作させますが、OOM はタスクのクラッシュを意味し、「クラッシュが発生する前に」という要件を満たしません。\n\nD: 毎日強制再起動は定期的な対処策ですが、24 時間以内にメモリ使用率が 80% を超える可能性があり、スケジュールが問題のパターンに合わない場合があります。動的なアラームベースの対応の方が適切です。"
    },
    {
      "id": "q061",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS KMS でカスタマー管理キー（CMK）を使って S3 バケット内のデータを暗号化しています。コンプライアンス要件として、CMK の使用状況を監査し、誰がいつどのキーを使ってデータを暗号化・復号したかを証明できる必要があります。また、KMS キーの不正使用（通常とは異なる時間帯や異常なボリュームでの使用）を自動で検知してアラートを送信したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "KMS キーポリシーを定期的にレビューし、月次で使用状況レポートを手動で作成する",
        "CloudTrail で KMS API コール（Decrypt、Encrypt、GenerateDataKey 等）をログに記録し、S3 に保存する。CloudWatch Logs Insights で KMS の使用パターンを分析する。Amazon GuardDuty の KMS 検出機能を有効化して、KMS キーの異常な使用（不審な IP からのアクセス、通常とは異なる時間帯の大量使用等）を自動的に検出してアラートを送信する",
        "S3 バケットのアクセスログを有効化して、暗号化・復号に関連するリクエストを記録する",
        "AWS Config ルールで KMS キーの設定変更を監視し、キーポリシーの変更を検出して SNS で通知する"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudTrail はすべての KMS API 呼び出し（誰が、いつ、どのキーを、何の目的で使用したか）を詳細に記録し、監査証跡として使用できます。CloudWatch Logs Insights で使用パターンを分析・可視化できます。GuardDuty の KMS 検出機能は機械学習を使って異常なアクセスパターン（認証情報が侵害された際の異常な使用等）を自動検出し、セキュリティ担当者にアラートを送信します。\n\nA: 手動での月次レビューは監査証跡として不十分で、リアルタイムの異常検知要件を満たしません。\n\nC: S3 アクセスログは HTTP リクエストレベルの情報を記録しますが、どの KMS キーが使われたかなど、KMS の詳細な監査情報は記録されません。CloudTrail の KMS ログが必要です。\n\nD: Config ルールはキーポリシーの設定変更を監視しますが、実際のキー使用状況（Encrypt/Decrypt 呼び出し）の監査や異常使用の検知には対応していません。"
    },
    {
      "id": "q062",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する EC2 ベースの Web アプリケーションについて、ユーザーから「特定の地域でサイトにアクセスできない」という苦情が寄せられています。調査チームは障害が発生している地域からのアクセス状況を再現し、問題を特定したいと考えています。また、将来の障害を事前に検知するための継続的な監視も必要です。最も適切な実装はどれですか？",
      "choices": [
        "CloudWatch の EC2 メトリクス（CPU、ネットワーク）を監視し、閾値を超えたらアラームを発火する",
        "Amazon CloudWatch Synthetics でカナリア（Canary）を作成し、問題が報告されている地域のユーザーのアクセスシミュレーションを実行する。Canary のスクリプトでログイン→商品検索→購入フローを模倣し、エラーや高レイテンシーを検知した場合に CloudWatch Alarm で SNS アラートを送信する",
        "Route 53 ヘルスチェックを設定して EC2 インスタンスの HTTP ステータスを監視し、500 エラーが発生したらフェイルオーバーを実行する",
        "ALB アクセスログを S3 に保存し、週次で Athena を使って問題のある地域からのリクエストを分析する"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudWatch Synthetics のカナリアは特定の地域（Lambda 関数のリージョンを指定）から実際のユーザーと同じブラウザ操作をシミュレートし、エンドツーエンドの可用性と性能を継続的に監視します。ログインから購入までのビジネスフローを含むテストにより、特定地域での問題を早期に検知できます。問題の再現と継続的な監視の両方を一つのサービスで実現できます。\n\nA: EC2 メトリクスのモニタリングはサーバー側のリソースを監視しますが、特定の地域ユーザーの体験や end-to-end の機能テストはできません。\n\nC: Route 53 ヘルスチェックはエンドポイントの基本的な疎通確認に有効ですが、複数ステップのユーザーフローのシミュレーションや特定地域からのアクセステストには対応していません。\n\nD: ALB ログの週次分析は事後分析であり、リアルタイムの検知と継続的な監視要件を満たしません。"
    },
    {
      "id": "q063",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある製造企業が 200 台のオンプレミスの Windows Server を AWS に移行する計画を立てています。サーバーは複数のアプリケーション層（Web、アプリケーション、データベース）で構成されており、まず各サーバーの依存関係とネットワーク通信パターンを把握したいと考えています。移行前の詳細な依存関係マッピングを最小限の手動作業で実現するには、どのサービスを使用しますか？",
      "choices": [
        "AWS Migration Hub で各アプリケーションを手動で登録し、依存関係を手動でマッピングする",
        "AWS Application Discovery Service のエージェントレスモード（Discovery Connector）または エージェントモード（Discovery Agent）を各オンプレミスサーバーにデプロイし、サーバーのスペック、実行中のプロセス、ネットワーク接続を自動収集する。データは AWS Migration Hub に自動的に送信され、Application Dependency Mapping で依存関係を可視化できる",
        "AWS Server Migration Service（SMS）で各サーバーのレプリケーションを開始し、移行後に依存関係を本番環境で確認する",
        "Nmap や Wireshark などのサードパーティツールを使って手動でネットワークスキャンを実行し、結果を Excel にまとめる"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Application Discovery Service はオンプレミスのサーバー情報を自動収集するサービスです。Discovery Agent はサーバー上で動作し、CPU/メモリ/ディスク使用量、実行中のプロセス、インバウンド/アウトバウンドのネットワーク接続を詳細に収集します。Migration Hub との統合で収集したデータから自動的に依存関係マップが生成され、移行グループの計画が立てやすくなります。\n\nA: 手動登録と依存関係マッピングは 200 台のサーバーでは膨大な作業量になり、ヒューマンエラーのリスクも高くなります。\n\nC: SMS は移行ツールであり、移行前の依存関係調査には設計されていません。また移行後に依存関係を確認するアプローチは、移行計画の精度を大幅に低下させます。\n\nD: サードパーティツールによる手動スキャンは Application Discovery Service のような自動化された継続的な監視ができず、200 台のサーバーでは作業量が膨大になります。"
    },
    {
      "id": "q064",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が Oracle データベース（100TB、オンプレミス）を AWS に移行しようとしています。ダウンタイムは最大 4 時間に制限されており、移行期間中もデータベースへの書き込みが継続します。移行先は Amazon Aurora PostgreSQL です。Oracle から PostgreSQL への変換も必要です。このシナリオで最も適切な移行アーキテクチャはどれですか？",
      "choices": [
        "週末の深夜に Oracle を停止し、AWS Database Migration Service（DMS）で全データを Aurora PostgreSQL に一括移行する。4 時間で完了するよう最大の DMS インスタンスを使用する",
        "AWS Schema Conversion Tool（SCT）で Oracle のスキーマと SQL を PostgreSQL に変換する。AWS DMS の継続的レプリケーション（CDC：Change Data Capture）を使って Oracle から Aurora PostgreSQL に変更差分を継続的にレプリケートする。全データの初期ロード完了後、アプリケーションの切り替えタイミングで 4 時間以内のカットオーバー作業（差分同期+接続切り替え）を実施する",
        "AWS Snowball Edge で 100TB のデータを物理的に AWS に転送し、Aurora PostgreSQL に直接インポートする",
        "Oracle RDS on AWS に先にリフト＆シフトし、その後 RDS Oracle から Aurora PostgreSQL へ DMS で段階的に移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "SCT + DMS の組み合わせが Oracle→Aurora PostgreSQL 移行の標準的なアプローチです。SCT でスキーマ・ストアドプロシージャ・ビューを PostgreSQL 互換の SQL に変換します。DMS の CDC（Change Data Capture）により、移行中も継続する書き込みを差分として継続的にレプリケートします。全データの初期ロード後、差分が小さくなったタイミングで 4 時間以内にカットオーバーできます。\n\nA: 週末に一括移行する場合、100TB の移行に 4 時間で完了する保証がありません。DMS の実際のスループットはデータの複雑さに依存します。また移行中の書き込みが失われます。\n\nC: Snowball は大容量データ転送に有効ですが、移行期間中の書き込みデータ（CDC）の取り込みには対応していません。\n\nD: Oracle RDS への中間ステップは追加コストと時間が発生し、最終的に Aurora PostgreSQL に移行するなら直接移行の方が効率的です。"
    },
    {
      "id": "q065",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が 500TB のデータをオンプレミスの HDFS クラスターから Amazon S3 に移行したいと考えています。利用可能な Direct Connect 回線の帯域幅は 1Gbps です。移行期間中もデータは頻繁に更新されており、最終カットオーバーまでのデータ差分を同期する必要があります。また、移行は 4 週間以内に完了させたいと考えています。最も適切な移行アプローチはどれですか？",
      "choices": [
        "AWS CLI の s3 cp コマンドを使って Direct Connect 経由で 500TB を転送する。1Gbps で 500TB の転送には約 55 時間かかる計算になる",
        "AWS DataSync エージェントをオンプレミスに設置し、DataSync でオンプレミスの HDFS から S3 への継続的なデータ同期を設定する。DataSync は 1Gbps の帯域幅を効率的に使用し、転送の高速化、データ整合性検証、差分同期を自動化する",
        "AWS Snowball Edge Storage Optimized デバイス（80TB 容量）を複数台注文し、データをデバイスにコピーして AWS に物理的に返送する",
        "Amazon EMR クラスターをオンプレミスの Hadoop に接続して S3 EMRFS にデータを書き込み、移行後に HDFS クラスターを廃止する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS DataSync はオンプレミスの HDFS、NFS、SMB などのストレージから S3 への自動化されたデータ転送サービスです。エージェントをオンプレミスにインストールし、Direct Connect 経由で最大帯域幅を使用します。マルチスレッドのデータ転送と自動整合性チェック、差分同期機能により、更新が続くデータの移行に最適です。DataSync は AWS CLI よりも高速（最大 10Gbps）で転送の監視も容易です。\n\nA: AWS CLI の s3 cp は基本的な転送ツールであり、並列転送の最適化や差分同期、整合性検証の自動化がなく、500TB の本格的な移行には非効率です。\n\nC: Snowball はオフライン転送に適していますが、500TB を 4 台以上のデバイスで送る必要があり、移行期間中の継続的な差分同期ができません。Direct Connect がある場合はオンライン転送の方が適しています。\n\nD: EMR クラスターの接続は可能ですが、単純なデータ移行のためだけにクラスターを設定・管理するのは不必要な複雑性をもたらします。DataSync の方がはるかシンプルです。"
    },
    {
      "id": "q066",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある金融機関がオンプレミスの VMware vSphere 環境（50 台の VM）を AWS に移行しようとしています。移行の制約として、①アプリケーションへの変更は一切不可、②ダウンタイムは各アプリケーションで最大 30 分以内、③移行後も 3 か月間はオンプレミスへのロールバックができる必要があります。これらの要件を満たす最も適切な移行戦略はどれですか？",
      "choices": [
        "AWS Server Migration Service（SMS）を使って VM をレプリケートし、完全に準備ができてからカットオーバーする",
        "AWS Application Migration Service（MGN）を使って VM のブロックレベルの継続的レプリケーションを行う。テスト完了後、カットオーバーウィンドウ（30 分以内）でのカットオーバーを実施する。MGN はオリジナルの VM を変更せず、3 か月後に MGN のソースサーバーを削除するまでロールバックが可能な期間を維持できる",
        "オンプレミスの VM から AMI を作成し、一括でインポートする（AWS VM Import/Export）。3 か月後に古い VM を廃止する",
        "Terraform でオンプレミスと同等のインフラをコードとして AWS に再構築し、アプリケーションを再デプロイする"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS MGN はブロックレベルの継続的レプリケーション（CDC）でオンプレミス VM のデータを AWS に継続的に同期します。カットオーバー時は最後の差分のみ同期するため数分〜30 分でカットオーバーが完了します。アプリケーションへの変更は一切不要です（リフト＆シフト）。ソースサーバーを保持したままにすることで、ロールバックが必要な場合はオンプレミスの VM を再開できます。\n\nA: SMS は MGN の前世代のサービスで、現在は MGN の使用が推奨されています。SMS はサーバー単位のイメージ（AMI）ベースのレプリケーションで、継続的なブロックレベル同期ではありません。\n\nC: VM Import/Export は一時点のスナップショットをインポートするもので、継続的な差分同期ができず、30 分以内のカットオーバーの保証が困難です。\n\nD: インフラの再構築とアプリケーションの再デプロイは「アプリケーションへの変更は一切不可」という要件に反します。"
    },
    {
      "id": "q067",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が大規模なモノリシックアプリケーションをマイクロサービスに分解（モダナイゼーション）しています。現在のモノリスは EC2 で稼働しており、徐々にサービスを切り出す「ストラングラーフィグパターン」を採用することにしました。最初は認証サービスのみを切り出してコンテナ化し、段階的に他のサービスも移行する予定です。この段階的な移行を実現するための最も適切なアーキテクチャはどれですか？",
      "choices": [
        "モノリス全体を一気に停止し、すべてのサービスを同時にコンテナ化して ECS に移行する",
        "Amazon API Gateway をフロントエンドに配置し、ルールベースのルーティングで切り出したマイクロサービス（ECS Fargate）とモノリス（EC2 + ALB）に振り分ける。認証サービスを最初に ECS にデプロイし、API Gateway で認証エンドポイントのみをマイクロサービスに転送する。他のリクエストは引き続きモノリスに転送し、段階的に切り出すサービスごとにルーティングを変更する",
        "モノリスのコードベースをリポジトリごとに分割し、各チームが独立してコンテナ化する。完成したサービスから順次 ECS にデプロイし、モノリスとの接続は REST API で行う",
        "AWS Lambda でモノリスのビジネスロジックをすべてサーバーレス関数として書き直し、全機能を一度に移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "ストラングラーフィグパターンでは、既存のモノリスを稼働させたまま、段階的にサービスを切り出します。API Gateway をルーターとして使用し、切り出したサービス（ECS）と既存のモノリス（EC2/ALB）を並行して稼働させます。ルーティングルールを変更するだけで切り替えができ、ロールバックも容易です。\n\nA: 全機能の同時移行は「ビッグバン」アプローチで、リスクが非常に高く、移行期間中のサービス停止が必要になります。段階的移行の要件に反します。\n\nC: アーキテクチャを決めずにコードを分割するだけでは、段階的なトラフィック切り替えの仕組みがなく、ストラングラーフィグパターンを実装できません。\n\nD: Lambda への全機能の書き直しは大規模なリファクタリングが必要で、「段階的なモダナイゼーション」のアプローチではありません。"
    },
    {
      "id": "q068",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が 10PB 規模のデータをオンプレミスのデータセンターから AWS の S3 に移行する計画を立てています。データセンターには 100Mbps のインターネット接続しかなく、移行期間は 6 か月以内を目標としています。移行コストを最小化しながら期間内に完了させるには、どのアプローチが最適ですか？",
      "choices": [
        "100Mbps の回線で 10PB を転送すると約 9 年かかるため、まず Direct Connect 1Gbps 回線を敷設してから転送する",
        "AWS Snowball Edge Storage Optimized（80TB/台）を複数台注文し、データを並行してコピーして AWS に返送する。必要台数は 10PB ÷ 80TB ≒ 125 台程度（複数ロットに分けて発注）で、6 か月以内の移行が可能。差分データは最終ロットの Snowball 返送後に Direct Connect または AWS DataSync で同期する",
        "AWS Snowmobile（100PB 対応の輸送コンテナ）を手配し、1 回のトラック輸送で 10PB を移行する",
        "データの重複排除と圧縮を実施して転送量を削減し、100Mbps 回線で段階的に転送する"
      ],
      "answer": [
        1
      ],
      "explanation": "10PB を 100Mbps の回線で転送すると約 9 年かかります（10PB = 10,000TB、100Mbps = 约 1TB/日）。Snowball Edge は 80TB/台で物理輸送できるため、125 台を複数バッチで使用することで 6 か月以内の移行が可能です。最終バッチの後に DataSync で差分データを同期することで移行を完結させます。AWS は複数台を同時に貸し出すことが可能です。\n\nA: Direct Connect の敷設は敷設工事に数か月かかり、1Gbps でも 10PB の転送に約 90 日かかります（1Gbps ≒ 10TB/日）。合計すると 6 か月の期間内に完了できない可能性があります。また敷設コストが発生します。\n\nC: AWS Snowmobile は 100PB 対応ですが、10PB には過剰であり、リードタイム（輸送コンテナのセットアップ）も長く、複数の Snowball Edge デバイスの方が柔軟に対応できます。\n\nD: 重複排除・圧縮後でも 10PB の大部分は 100Mbps 回線では期間内に転送できません。"
    },
    {
      "id": "q069",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスで稼働する MySQL データベース（30TB）をダウンタイムなしで Amazon Aurora MySQL に移行したいと考えています。現在、毎秒数百件の書き込みトランザクションが発生しており、移行期間中もアプリケーションの継続稼働が必要です。移行後、しばらくはオンプレミスと Aurora の両方を並行稼働させてデータ整合性を確認したいと考えています。最も適切な移行アプローチはどれですか？",
      "choices": [
        "Aurora の標準的なインポート機能で mysqldump を使って全データをエクスポートし、Aurora に一括インポートする",
        "AWS DMS（Database Migration Service）で継続的レプリケーション（CDC）を設定し、オンプレミス MySQL を ソース、Aurora MySQL を ターゲットとして全データの初期ロードと差分の継続的同期を並行して実行する。アプリケーションの切り替え後も一定期間、DMS のレプリケーションを維持して双方のデータ整合性を監視する",
        "オンプレミス MySQL に Aurora の外部レプリカを作成し、Aurora をスタンバイとして設定する",
        "AWS Database Migration Service の「データ検証」モードのみを使用して移行前のデータ品質を確認し、その後手動でデータを移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS DMS の CDC 機能はソースデータベースのバイナリログを読み取り、継続的に変更差分をターゲットに反映します。初期ロード中も発生する変更はキャプチャされ、ロード完了後に追いつく形で適用されます。アプリケーション切り替え後も DMS を稼働させることで、オンプレミスと Aurora のデータ整合性をリアルタイムで監視できます。\n\nA: mysqldump による一括エクスポートには長時間かかり、エクスポート中の書き込みデータが失われるため、ダウンタイムなしの移行要件を満たせません。\n\nC: Aurora の外部レプリカ（Read Replica）は Aurora から外部 MySQL への一方向のレプリケーションで、オンプレミス MySQL から Aurora への移行方向とは逆です。\n\nD: DMS のデータ検証のみでは実際のデータ移行が行われず、その後の手動移行ではダウンタイムなしの要件を満たせません。"
    },
    {
      "id": "q070",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が長年の歴史を持つ COBOL ベースのレガシーシステムをモダナイズしようとしています。システムは月次の請求処理に使われており、毎月 2〜3 日間だけ集中的に使用されます。COBOL コードを完全に書き直す予算はなく、段階的なモダナイズを希望しています。COBOL コードを AWS 上で継続稼働させながら、新しい Web API からアクセスできるようにするには、どのアプローチが最適ですか？",
      "choices": [
        "COBOL コードをすべて Python に書き直し、Lambda 関数として AWS にデプロイする",
        "AWS Mainframe Modernization サービスを使用してメインフレームの COBOL アプリケーションをリホスト（Rehost）する。AWS 上のマネージドランタイムで COBOL コードを実行し、API Gateway で RESTful API を公開してレガシーシステムへの新しいアクセスポイントを提供する",
        "COBOL システムをそのままオンプレミスに残し、API Gateway の HTTP 統合でオンプレミスエンドポイントに接続する",
        "Amazon AppFlow で COBOL システムのデータを S3 に自動転送し、Lambda で請求処理を実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Mainframe Modernization サービスは COBOL、PL/I などのメインフレームアプリケーションをコード変更なし（Rehost）または自動変換（Refactor）で AWS に移行できます。リホスト方式では COBOL コードをそのまま AWS マネージド環境で実行し、月次の集中処理時にのみスケールさせることでコスト最適化もできます。API Gateway の統合でモダンな RESTful API としての公開も可能です。\n\nA: COBOL からの完全な書き直しは要件に反する（予算がない）。また COBOL の複雑な業務ロジックを完全に再現することは困難なリスクがあります。\n\nC: オンプレミスに残してクラウドから接続する方法は、ネットワーク遅延、可用性、クラウドインフラとのコスト効率化の観点で不完全なモダナイゼーションです。\n\nD: AppFlow は SaaS との統合に使うサービスであり、COBOL システムのデータ連携には設計されていません。"
    },
    {
      "id": "q071",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が複数のオンプレミスアプリケーションを AWS に移行する計画を立てており、AWS Migration Hub を使って移行プロジェクト全体の進捗を一元管理したいと考えています。各アプリケーションの移行状況（Not Started、In Progress、Completed）を追跡し、どのアプリケーションが AWS SMS、AWS MGN、AWS DMS のどのツールで移行されているかを可視化したいと考えています。最も適切な設定はどれですか？",
      "choices": [
        "各移行ツール（SMS、MGN、DMS）を個別に管理し、それぞれのコンソールで進捗を確認する",
        "AWS Migration Hub でホームリージョンを設定し、SMS、MGN、DMS などの移行ツールを Migration Hub に統合する。各ツールは移行の進捗状況を自動的に Migration Hub に報告し、単一ダッシュボードで全アプリケーションの移行状況を追跡できる",
        "AWS CloudTrail で各移行ツールの API コールを記録し、Lambda 関数で進捗レポートを自動生成する",
        "AWS Systems Manager OpsCenter を使って移行タスクをオペレーションアイテムとして管理し、チームメンバーに割り当てる"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Migration Hub は複数の移行ツールの進捗を単一のダッシュボードで追跡します。ホームリージョンを設定することで、SMS、MGN、DMS などの AWS 移行ツールが自動的に Migration Hub に進捗状況を報告します。アプリケーション単位で移行状況を集約し、どのツールで何を移行しているかが一元的に把握できます。\n\nA: 各ツールのコンソールを個別に確認することは、複数アプリケーションの大規模移行では管理の分散につながり、全体の進捗把握が困難です。\n\nC: CloudTrail は監査ログとして有用ですが、移行進捗のリアルタイムな可視化やアプリケーション単位での状態管理には設計されていません。カスタム実装の開発負荷が高くなります。\n\nD: OpsCenter はインシデント管理や運用タスク管理に適していますが、Migration Hub のような移行ツール統合と進捗の自動追跡機能はありません。"
    },
    {
      "id": "q072",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある小売企業がオンプレミスの EC システム（Spring Boot + MySQL）を AWS にモダナイズする計画を立てています。現在のシステムはモノリシックで、将来的にはマイクロサービス化も視野に入れています。初期フェーズとしてリフト＆シフトで AWS に移行し、安定稼働を確認後にコンテナ化、さらにマイクロサービス化という 3 段階のアプローチを採用します。各フェーズで最適な AWS サービスの組み合わせはどれですか？",
      "choices": [
        "フェーズ1: EC2 + RDS MySQL → フェーズ2: ECS + RDS MySQL → フェーズ3: ECS/EKS + Aurora + API Gateway + EventBridge",
        "フェーズ1: Lambda + DynamoDB → フェーズ2: ECS + RDS → フェーズ3: EKS + Aurora",
        "フェーズ1: Elastic Beanstalk + RDS → フェーズ2: Elastic Beanstalk Docker + RDS → フェーズ3: EKS + Aurora",
        "フェーズ1: EC2 + RDS → フェーズ2: Lambda + DynamoDB → フェーズ3: AppSync + DynamoDB"
      ],
      "answer": [
        0
      ],
      "explanation": "フェーズ1: EC2 + RDS MySQL は最もシンプルなリフト＆シフトで、既存のアーキテクチャをほぼそのまま移行できます。フェーズ2: ECS（Fargate）でコンテナ化し、アプリを変更せずにコンテナで実行します。フェーズ3: マイクロサービス化では ECS/EKS で各サービスを独立したコンテナに分割し、Aurora でパフォーマンスを向上させ、API Gateway でサービス間通信を管理、EventBridge でイベント駆動の非同期連携を実現します。\n\nB: フェーズ1 で Lambda + DynamoDB に移行することは、Spring Boot の全書き直しが必要で「リフト＆シフト」ではありません。最初のフェーズとして不適切です。\n\nC: Elastic Beanstalk はアプリデプロイの管理を簡素化しますが、フェーズ3 のマイクロサービス化には ECS/EKS の方が適しており、Elastic Beanstalk からの移行が改めて必要になります。\n\nD: フェーズ2 で Lambda + DynamoDB への移行は Spring Boot + MySQL の全書き直しが必要で、段階的なアプローチの流れに合いません。"
    },
    {
      "id": "q073",
      "type": "multiple",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が複数のオンプレミスデータベース（Oracle、SQL Server、MySQL、PostgreSQL）を AWS に移行する大規模プロジェクトを開始しています。移行の前評価フェーズとして、データベースのスキーマ複雑度、互換性、移行工数の見積もりを自動化したいと考えています。また、一部のデータベースはエンジンの変更（Oracle → Aurora PostgreSQL）が必要です。この前評価フェーズに使用するべき AWS サービスを2つ選択してください。",
      "choices": [
        "AWS Schema Conversion Tool（SCT）を使ってソースデータベースのスキーマをスキャンし、ターゲットデータベースエンジンへの変換の複雑度レポートと移行工数の見積もりを生成する",
        "AWS Database Migration Service（DMS）フリートアドバイザーを使って、複数のデータベースをスキャンし、最適な移行戦略（エンジン変更 vs. 同種移行）のレコメンデーションと TCO 比較を提供する",
        "各データベースに直接接続して手動でスキーマを調査し、Excel スプレッドシートに互換性問題を記録する",
        "AWS Trusted Advisor でデータベースの利用状況を確認し、移行候補のリストを作成する",
        "Amazon Detective でデータベースへのアクセスパターンを分析する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "SCT（A）はスキーマ変換ツールとして、Oracle/SQL Server などからターゲット（Aurora/MySQL/PostgreSQL）への変換の複雑度を「自動変換可能」「手動対応必要」に分類してレポートします。移行工数の見積もりに直接役立ちます。DMS フリートアドバイザー（B）は複数データベースに接続して利用状況（サイズ、接続数、活動度）をスキャンし、どのエンジンに移行すべきか、TCO の比較を提供します。この2つが前評価フェーズの自動化に最適です。\n\nC: 手動調査は正確性が低く、大規模なデータベース群の前評価には非現実的です。\n\nD: Trusted Advisor はデータベースの利用状況（Idle RDS インスタンスなど）の確認には有用ですが、スキーマ複雑度の評価や移行戦略のレコメンデーションは提供しません。\n\nE: Detective はセキュリティ調査ツールであり、データベース移行の前評価には関係ありません。"
    },
    {
      "id": "q074",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS で稼働するアプリケーションのデプロイを自動化したいと考えています。現在は開発者が手動で EC2 インスタンスにアプリケーションをデプロイしており、環境間（開発、テスト、本番）での設定の差異が問題になっています。インフラをコードとして管理し、Git のコードプッシュから本番デプロイまでを完全自動化したいと考えています。最も包括的な CI/CD パイプラインの設計はどれですか？",
      "choices": [
        "Jenkins を EC2 にインストールし、Git リポジトリからコードをプルして手動でデプロイスクリプトを実行する",
        "AWS CodeCommit でソースコードを管理し、コードプッシュをトリガーに CodePipeline が起動する。CodeBuild でユニットテスト・セキュリティスキャン・Docker イメージのビルドを自動実行し、CodeDeploy で Blue/Green デプロイを実施する。インフラは CloudFormation または Terraform でコード管理し、各環境のパラメーターを環境変数とパラメーターストアで管理する",
        "GitHub Actions で CI を実装し、本番デプロイは手動承認後に AWS CLI で実行する",
        "AWS Elastic Beanstalk のデプロイ機能を使い、.ebextensions フォルダーでインフラ設定をコード管理する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS ネイティブの CI/CD スタック（CodeCommit + CodePipeline + CodeBuild + CodeDeploy）は完全に統合されており、ソースコードから本番デプロイまでのパイプラインを構成できます。CodeBuild でテストとビルドを自動化し、CodeDeploy の Blue/Green でリスクを最小化します。CloudFormation/Terraform でインフラをコードとして管理し、Systems Manager パラメーターストアで環境ごとの設定を管理することで、環境間の差異問題を解決します。\n\nA: Jenkins の EC2 インストールはサーバーの管理負荷が生じ、手動デプロイスクリプトは「完全自動化」の要件を満たしません。\n\nC: GitHub Actions は CI として有効ですが、本番デプロイに手動承認と AWS CLI を使う方法は完全自動化ではなく、環境設定のコード管理も部分的な対応です。\n\nD: Elastic Beanstalk は有効ですが、複雑なマルチ環境の CI/CD パイプラインや高度なデプロイ戦略（Blue/Green）の管理には CodePipeline の方が柔軟性が高いです。"
    },
    {
      "id": "q075",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS Transfer Family を使ってオンプレミスの SFTP サーバーを AWS に移行しようとしています。社外のパートナー企業が既存の SFTP クライアントを使ってファイルを転送しており、ホスト名・ユーザー名・パスワード・ホストキーをすべて維持したまま移行する必要があります。パートナー企業には移行の事実を知らせずに透過的に移行したいと考えています。最も適切な移行手順はどれですか？",
      "choices": [
        "AWS Transfer Family の新しい SFTP サーバーを作成し、新しいホスト名とユーザー認証情報を全パートナーに通知して切り替えを依頼する",
        "AWS Transfer Family の SFTP サーバーを作成し、既存の SFTP サーバーのホストキーを Transfer Family にインポートする。パートナーの既存ユーザー名・パスワード認証は Secrets Manager または IAM Identity Provider で維持する。DNS（Route 53）で既存のホスト名を Transfer Family のエンドポイントに切り替えることで、パートナーのクライアント設定変更なしに透過的に移行できる",
        "既存の SFTP サーバーをオンプレミスに残し、AWS Transfer Family を新規ユーザー用にのみ使用する",
        "Amazon S3 の静的 Web サイトホスティングでファイル転送用のポータルを構築し、パートナーに URL を通知して SFTP からの移行を依頼する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Transfer Family の SFTP サーバーでは、既存 SFTP サーバーのホストキーをインポートできます。これにより「ホストキーが変わった」という SSH の警告が出ず、透過的な移行が可能です。Route 53 でホスト名を同じに保ち、ユーザー認証情報を Secrets Manager または IAM で再現することで、パートナーはクライアント設定を一切変更することなく AWS Transfer Family の SFTP サーバーに接続できます。\n\nA: 新しいホスト名とユーザー認証情報の通知は、パートナー全員の設定変更が必要で「透過的な移行」要件に反します。\n\nC: オンプレミスサーバーを残す方法は移行の目的を達成しておらず、デュアル管理の負荷が続きます。\n\nD: HTTP ポータルへの移行は SFTP プロトコルを廃止することであり、パートナーのシステム変更が必要になります。"
    },
    {
      "id": "q076",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "medium",
      "question": "ある企業がオンプレミスのファイルサーバー（Windows File Server、50TB）を AWS に移行しようとしています。ユーザーは SMB プロトコルで既存のファイル共有にアクセスしており、Active Directory との統合によるアクセス制御も維持する必要があります。移行後も SMB プロトコルで同じように使えることが必須要件です。最も適切な移行先サービスはどれですか？",
      "choices": [
        "Amazon S3 に全ファイルを移行し、S3 File Gateway を使って既存のユーザーが SMB でアクセスできるようにする",
        "Amazon FSx for Windows File Server を使用し、Active Directory に参加させる。AWS DataSync でオンプレミスのファイルサーバーから FSx for Windows File Server にデータを移行し、DNS を切り替えてユーザーのアクセス先を変更する",
        "Amazon EFS（Elastic File System）を作成し、SMB マウントで使用する",
        "Amazon S3 を作成し、S3 Sync コマンドで全ファイルを移行してユーザーに AWS Console 経由でアクセスさせる"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon FSx for Windows File Server は Windows ネイティブの SMB プロトコル、NTFS、Active Directory との統合をネイティブサポートするマネージドサービスです。既存の Windows ファイルサーバーとほぼ同じ操作性で使用でき、AD ベースのアクセス制御もそのまま維持できます。DataSync による移行後、DNS の切り替えだけでユーザーには透過的に移行できます。\n\nA: S3 + S3 File Gateway は有効ですが、SMB ゲートウェイの管理が必要で、ネイティブの FSx for Windows File Server より機能が限定的です（特に AD 統合や Windows ACL の完全サポート）。\n\nC: Amazon EFS は Linux/NFS プロトコル向けのマネージドファイルシステムであり、SMB プロトコルはサポートしていません。\n\nD: S3 は オブジェクトストレージであり、SMB プロトコルでの直接アクセスには対応していません。ユーザーが同じようにアクセスできるという要件を満たしません。"
    },
    {
      "id": "q077",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が VMware vSphere 環境をクラウドに移行する際、「クラウドへの移行」ではなく「クラウドへの拡張」として、オンプレミスの VMware ワークロードを AWS 上の VMware 環境でそのまま稼働させたいと考えています。VMware の管理ツール（vCenter、vSphere、vSAN）を使い続け、クラウドとオンプレミスを統一した管理インターフェースで操作したいと考えています。最も適切なソリューションはどれですか？",
      "choices": [
        "AWS の EC2 に VMware ESXi をインストールしてプライベートクラウドを再現する",
        "VMware Cloud on AWS（VMware on AWS）を使用し、AWS のベアメタルインフラ上で VMware SDDC（Software-Defined Data Center）を稼働させる。既存の vCenter、vSphere、vSAN の管理インターフェースをそのまま使い、HCX で既存 VM をライブマイグレーションで AWS に移行する",
        "AWS Outposts を購入してオンプレミスに設置し、VMware 環境を Outposts で稼働させる",
        "AWS Application Migration Service（MGN）でVMware VM を EC2 に変換し、VMware の管理ツールから AWS マネジメントコンソールに移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "VMware Cloud on AWS は AWS のベアメタル EC2 インスタンス上に VMware SDDC を展開し、vCenter、vSphere、NSX-T、vSAN などの VMware ツールをそのまま使えます。VMware HCX によりオンプレミスの VM をダウンタイムなしでライブマイグレーションできます。VMware チームのスキルと既存の管理ツールを維持したまま AWS のインフラを活用できます。\n\nA: EC2 に ESXi をインストールすることは、AWS のポリシー上許可されておらず、技術的に困難です。VMware Cloud on AWS はベアメタルハードウェア上で ESXi を稼働させます。\n\nC: AWS Outposts は AWS マネージドサービスをオンプレミスに持ち込むソリューションであり、VMware の管理スタックはサポートしていません。\n\nD: AWS MGN で VM を EC2 に変換することは、VMware 環境からの移行（脱 VMware）であり、「VMware ツールをそのまま使い続ける」要件に反します。"
    },
    {
      "id": "q078",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でアプリケーションのコンテナ化を進めており、Docker イメージを Amazon ECR に格納して ECS でデプロイしています。セキュリティチームから「ECR に格納されている Docker イメージに既知の脆弱性（CVE）が含まれていないか自動的にスキャンし、高深刻度の脆弱性が検出された場合はデプロイをブロックしたい」という要件が出ています。最も適切な実装はどれですか？",
      "choices": [
        "定期的に Trivy などのオープンソースのスキャナーを EC2 インスタンスで実行し、結果をメールで送信する",
        "ECR の拡張スキャン（Amazon Inspector 統合）を有効化し、イメージプッシュ時に自動的にスキャンを実行する。Inspector の検出結果を EventBridge で受信し、高深刻度（HIGH/CRITICAL）の CVE が含まれる場合は Lambda 関数で CodePipeline の承認ステージをリジェクトしてデプロイをブロックする",
        "DockerHub に ECR を連携させ、DockerHub の自動スキャン機能を使用する",
        "ECS タスクの起動時にカスタムスクリプトでイメージをスキャンし、問題があればタスクを終了する"
      ],
      "answer": [
        1
      ],
      "explanation": "ECR の拡張スキャン（Amazon Inspector 統合）はイメージプッシュ時に自動で CVE スキャンを実行し、OS パッケージとプログラミング言語のパッケージ両方の脆弱性を検出します。検出結果は EventBridge に自動配信されるため、Lambda で高深刻度の CVE を検出した場合に CodePipeline の承認ステージを「リジェクト」するアクションを実装することで、デプロイの自動ブロックが実現できます。\n\nA: サードパーティのスキャナーによる定期実行はリアルタイム性がなく、イメージプッシュ直後のスキャンやデプロイブロックへの自動統合が困難です。\n\nC: DockerHub の機能を使うことは、ECR からの移行が必要で、AWS ネイティブのセキュリティポスチャ管理が分断されます。\n\nD: ECS タスク起動時のスキャンはタスクが一度起動されてから検出するため、デプロイのブロックには適していません。起動前にスキャンする必要があります。"
    },
    {
      "id": "q079",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS への移行を進めており、移行後のコストを事前に見積もりたいと考えています。オンプレミスでは物理サーバー 100 台（CPU 使用率、メモリ使用率、ストレージ使用量のデータあり）が稼働しており、AWS への移行後の EC2、RDS、S3 などの予想コストを計算したいと考えています。また、Reserved Instances と Savings Plans の適用による割引後の総コストも知りたいと考えています。最も適切なアプローチはどれですか？",
      "choices": [
        "AWS 料金計算ツール（AWS Pricing Calculator）で各サービスを個別に入力して概算コストを計算する",
        "AWS Migration Evaluator（旧 TSO Logic）を使用して、オンプレミスの実際のリソース使用状況（CPU、メモリ、ストレージ）を収集・分析し、最適な AWS インスタンスタイプへのマッピングと、RI/Savings Plans 適用後の総 TCO 見積もりを生成する",
        "競合他社のクラウドコスト計算ツール（CloudHealth など）を使って AWS コストを見積もる",
        "AWS Trusted Advisor で現在の AWS コストを確認し、オンプレミスと比較する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Migration Evaluator（旧 TSO Logic）は、オンプレミスサーバーの実際のリソース使用データ（CPU、メモリ、ストレージの時系列データ）を分析し、適切な AWS インスタンスタイプへの最適なマッピングを行います。RI と Savings Plans の適用シミュレーションにより、移行後の実際のコストに近い TCO レポートを生成できます。AWS が提供する無償の移行評価ツールです。\n\nA: AWS Pricing Calculator は個別サービスのコスト計算に有用ですが、100 台のサーバーを個別に手動入力するのは非効率で、実際の使用状況を反映した精度の高い見積もりが困難です。\n\nC: サードパーティツールは機能的ですが、AWS Migration Evaluator のような AWS の実際のプロビジョニングデータベースと RI/Savings Plans の詳細な割引計算への完全なアクセスはありません。\n\nD: Trusted Advisor は現在の AWS リソースの最適化を提案するものであり、オンプレミスから AWS への移行コスト見積もりには対応していません。"
    },
    {
      "id": "q080",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある金融機関が AWS への移行を計画しており、コンプライアンス要件として移行対象のすべてのシステムについて「詳細なビジネスケース（コスト削減額、リスク評価、技術的依存関係）」を作成し、経営陣と規制当局への提出が必要です。AWS の移行フレームワーク（CAF）を活用しながら、このビジネスケース作成を支援する AWS のプログラムとサービスを組み合わせた最も包括的なアプローチはどれですか？",
      "choices": [
        "AWS Pricing Calculator でコスト見積もりを行い、社内の IT チームがビジネスケースを手動で作成する",
        "AWS Migration Evaluator でオンプレミスリソースの実際の使用状況を分析して TCO と節約額を計算する。AWS Cloud Adoption Framework（CAF）の 6 つの視点（ビジネス、人員、ガバナンス、プラットフォーム、セキュリティ、オペレーション）でギャップ分析を実施する。AWS の移行専門チーム（AWS Professional Services または AWS Partner）の支援を活用してビジネスケースドキュメントを作成する",
        "AWS Cost Explorer で既存の AWS コストと予測を表示し、これをビジネスケースとして使用する",
        "Microsoft Excel で手動によるコスト計算を実施し、AWS ドキュメントの価格表を参照してビジネスケースを作成する"
      ],
      "answer": [
        1
      ],
      "explanation": "大規模移行の包括的なビジネスケース作成には複数の要素が必要です。Migration Evaluator でオンプレミスの実際のデータに基づく正確な TCO を算出し、AWS CAF でビジネス・人員・ガバナンス・技術の 6 つの視点からのギャップと準備状況を評価します。AWS Professional Services や認定パートナーの専門知識を活用することで、経営陣や規制当局が求める品質のビジネスケースドキュメントを作成できます。\n\nA: Pricing Calculator と内部チームによる手動作成は精度と網羅性に限界があり、コンプライアンス要件を満たす詳細なビジネスケースの作成が困難です。\n\nC: Cost Explorer は既存の AWS コストを分析するツールであり、オンプレミスシステムの移行ビジネスケースの作成には対応していません。\n\nD: Excel による手動計算は時間がかかり、100 台のサーバーに対して正確なデータを収集・分析することは困難で、ビジネスケースの品質と信頼性が低くなります。"
    },
    {
      "id": "q081",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が複数の AWS アカウントにまたがるセキュアなネットワークアーキテクチャを設計しています。各アカウントのワークロードは、プライベートなサービスとして他のアカウントのワークロードから利用されますが、VPC ピアリングを使いたくないと考えています。また、各サービスのコンシューマーはサービスのプロバイダーのネットワーク構成を知らなくてもアクセスできる設計にしたいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各アカウント間で VPC ピアリングを設定し、セキュリティグループでトラフィックを制御する",
        "AWS PrivateLink（VPC エンドポイントサービス）を使用して、プロバイダー側のサービス（NLB ベース）をエンドポイントサービスとして登録し、コンシューマー側のアカウントからインターフェース型 VPC エンドポイントを作成してプライベートにアクセスする",
        "Transit Gateway でアカウント間の VPC を接続し、ルートテーブルで通信を制御する",
        "インターネット経由で HTTPS で通信し、IAM 認証と TLS で保護する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS PrivateLink によるエンドポイントサービスは、プロバイダーの VPC ネットワーク情報をコンシューマーに公開せずにサービスを提供できます。コンシューマーは VPC エンドポイントの DNS 名でサービスにアクセスするだけで、VPC のアドレス重複の問題も発生しません。アカウント単位でのアクセス制御も可能です。\n\nA: VPC ピアリングを使いたくないという要件に反します。また、ピアリングは推移的ルーティングをサポートせず、多数のアカウント間では管理が複雑です。\n\nC: Transit Gateway はルーティングハブとして有効ですが、ネットワーク構成の公開（CIDR 範囲の共有）が必要で「ネットワーク構成を知らなくてもアクセスできる」要件と合いません。\n\nD: インターネット経由の通信はプライベートネットワーク要件を満たさず、セキュリティリスクが高くなります。"
    },
    {
      "id": "q082",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で高頻度取引（HFT）システムのバックテストプラットフォームを構築しています。10 年分の市場データ（数十テラバイトの Parquet ファイル）を S3 に格納し、クアンツアナリストが複雑な SQL クエリで任意の期間・銘柄のデータを対話的に分析します。クエリレイテンシーは数秒以内が要件で、使わない時間のコストは最小化したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon Redshift のプロビジョニングクラスターに全データをロードし、常時稼働させる",
        "Amazon Athena と AWS Glue Data Catalog を使用する。Parquet ファイルをパーティション（年月日・銘柄）で整理し、Athena の SQL クエリでクエリ時課金の従量制で分析する。頻出クエリパターンには Athena の結果キャッシュを活用し、Parquet + Snappy 圧縮でスキャンデータ量を最小化する",
        "Amazon EMR クラスターを常時稼働させ、Spark SQL でクエリを処理する",
        "全データを DynamoDB にロードし、パーティションキーとソートキーで高速クエリを実現する"
      ],
      "answer": [
        1
      ],
      "explanation": "Athena はサーバーレスでスキャンデータ量に対する従量課金のため、使わない時間のコストが完全にゼロです。Parquet 形式と Snappy 圧縮でデータサイズを削減しスキャンコストを最小化できます。Glue Data Catalog でメタデータ管理、パーティションプルーニングで対象データのみをスキャンすることで数秒以内のレイテンシーも達成可能です。\n\nA: Redshift の常時稼働はクエリ性能には優れますが、使用しない時間もクラスターコストが発生し「コスト最小化」要件に反します。Redshift Serverless を使えば改善しますが、Athena よりコストが高くなります。\n\nC: EMR の常時稼働も同様に、アイドル時のクラスターコストが発生します。\n\nD: DynamoDB はリレーショナルな複雑な SQL クエリや大量の Parquet データのフルスキャン分析には設計されていません。"
    },
    {
      "id": "q083",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "medium",
      "question": "ある企業が AWS 上でウェブアプリケーションを構築しており、ユーザー認証・認可の機能を最小限の開発負荷で実装したいと考えています。要件は以下の通りです。①メール/パスワードによるサインアップ・サインイン、②ソーシャルログイン（Google、Facebook）、③JWT トークンによる API 認可、④多要素認証（MFA）のサポート。これらをすべて満たす最もシンプルな AWS サービスはどれですか？",
      "choices": [
        "IAM ユーザーを作成してアプリケーションに統合し、Cognito なしでカスタムの認証ロジックを実装する",
        "Amazon Cognito User Pool を作成し、ユーザープールの組み込み UI またはカスタム UI でサインアップ/サインイン、Google/Facebook フェデレーションの設定、MFA の有効化を設定する。JWT（ID トークン・アクセストークン）で API Gateway の Cognito オーソライザーによる認可を実装する",
        "AWS Directory Service を作成してユーザーを管理し、LDAP プロトコルでアプリケーションと統合する",
        "Auth0 などのサードパーティ IdP を使用し、AWS には認証・認可の機能を持たせない"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon Cognito User Pool はユーザー認証と認可に必要なすべての機能をマネージドサービスとして提供します。メール/パスワード認証、ソーシャルログイン（OIDC/SAML フェデレーション）、MFA（SMS/TOTP）、JWT トークン発行（ID/Access/Refresh）をすべて組み込みでサポートし、API Gateway の Cognito オーソライザーと直接統合できます。\n\nA: IAM ユーザーはアプリケーションユーザーの管理には設計されておらず、ソーシャルログインや MFA の統合が複雑になります。\n\nC: AWS Directory Service は企業の AD/LDAP 環境との統合に適しており、コンシューマー向けアプリのユーザー認証要件（ソーシャルログイン等）には設計されていません。\n\nD: サードパーティ IdP の使用は機能的ですが、「最小限の開発負荷で AWS サービスを使う」要件に対して、追加のベンダー管理コストと統合の複雑さが生じます。"
    },
    {
      "id": "q084",
      "type": "multiple",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で地理分散したマルチリージョンのアクティブ-アクティブ構成を設計しています。北米（us-east-1）と欧州（eu-west-1）の両リージョンでアプリケーションが稼働し、データは両リージョンで読み書き可能である必要があります。また、リージョン障害時には自動的にもう一方のリージョンにフェイルオーバーする必要があります。このアーキテクチャを実現するために必要な設定を2つ選択してください。",
      "choices": [
        "Amazon DynamoDB Global Tables を設定し、us-east-1 と eu-west-1 の両リージョンで読み書き可能なグローバルテーブルを作成する",
        "Amazon Route 53 のヘルスチェックとレイテンシーベースルーティングポリシーを設定し、障害リージョンの ALB/API Gateway エンドポイントを自動的にヘルスチェックから除外する",
        "Amazon RDS Multi-AZ を us-east-1 に設定し、クロスリージョンリードレプリカを eu-west-1 に作成する",
        "Amazon CloudFront を北米と欧州のユーザー向けに設定し、地理的にルーティングする",
        "Amazon S3 クロスリージョンレプリケーションを設定して、両リージョン間でオブジェクトを双方向に同期する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "DynamoDB Global Tables（A）は両リージョンでの書き込みを可能にするアクティブ-アクティブデータベース構成を提供します。リージョン間のデータレプリケーションは自動で行われ、ACID トランザクションをサポートします。Route 53 ヘルスチェック + レイテンシーベースルーティング（B）により、ユーザーは通常時は最も近いリージョンにルーティングされ、障害時はヘルスチェック失敗のリージョンを自動的に除外して正常なリージョンにフェイルオーバーします。\n\nC: RDS のクロスリージョンリードレプリカは読み取り専用であり、eu-west-1 での書き込みができないため、アクティブ-アクティブ構成には対応していません。\n\nD: CloudFront は CDN として静的コンテンツの配信に有用ですが、アクティブ-アクティブの設計要素（データの双方向書き込み、自動フェイルオーバー）には対応していません。\n\nE: S3 の双方向レプリケーションはオブジェクトストレージには有効ですが、アプリケーションデータのアクティブ-アクティブ書き込みの主要コンポーネントではありません。"
    },
    {
      "id": "q085",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する複数のアカウントにわたる EC2 インスタンスのセキュリティパッチ状況を確認したところ、深刻な脆弱性（CVE）が多数存在することが判明しました。セキュリティチームは、新たに検出された CVE に対してパッチが適用されるまでの時間（MTTR）を短縮し、パッチ適用の自動化を実現したいと考えています。また、パッチ適用後のコンプライアンス状態を継続的に報告書として提出できる仕組みも必要です。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各 EC2 インスタンスに cron ジョブで weekly パッチスクリプトを設定し、月次でパッチ状態を手動確認する",
        "AWS Systems Manager Patch Manager でパッチベースライン（CVE の深刻度に応じた自動承認ルール）を定義し、Maintenance Window でスケジュールに従って自動パッチ適用を設定する。Patch Manager のコンプライアンスレポートを AWS Config と統合し、非準拠インスタンスを継続的に検出して Security Hub に集約する。Critical/High CVE には Auto-Remediation で即時パッチ適用をトリガーする",
        "Amazon Inspector で CVE を検出し、検出結果を Security Hub に送信して手動でパッチを適用する",
        "AWS Trusted Advisor のセキュリティチェックでパッチ状態を確認し、推奨事項に従って手動対応する"
      ],
      "answer": [
        1
      ],
      "explanation": "Patch Manager のパッチベースラインで CVE の深刻度に基づいた自動承認ルール（例：Critical は即日承認）を設定し、Maintenance Window で定期的な自動適用を行います。コンプライアンスレポートは Config と統合することで継続的な状態確認が可能です。Inspector と Security Hub との統合でクロスアカウントの脆弱性管理が実現します。\n\nA: cron ジョブは管理が分散し、パッチの承認管理や依存関係の考慮がなく、コンプライアンスレポートの自動生成もできません。\n\nC: Inspector は CVE 検出に優れますが、パッチ適用の自動化機能自体は提供しません。Patch Manager との組み合わせは有効ですが、Inspector 単独では自動パッチ適用とコンプライアンスレポートを完結できません。\n\nD: Trusted Advisor のセキュリティチェックは一部のセキュリティ設定を確認しますが、EC2 のパッチ詳細管理や自動パッチ適用には対応していません。"
    },
    {
      "id": "q086",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境において、特定の機密データを含む S3 バケットへのアクセスを厳密に制御したいと考えています。機密データへのアクセスは特定の IAM ロールからのみ許可し、かつ MFA 認証を経由した場合のみアクセスを許可する必要があります。また、このポリシーは SCP で強制的に適用し、バケット所有者でさえもポリシーを迂回できないようにしたいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "S3 バケットポリシーで特定の IAM ロールと MFA 条件を設定し、バケット所有者は AdministratorAccess 権限でアクセスできるようにする",
        "S3 バケットポリシーで aws:MultiFactorAuthPresent 条件と特定のロール ARN の条件を組み合わせた Deny ポリシーを設定する。SCP では s3:PutBucketPolicy と s3:DeleteBucketPolicy を Deny することで、メンバーアカウントがバケットポリシーを変更・削除できないようにする",
        "AWS Macie を有効化して機密データを自動検出し、検出されたデータへのアクセスを Macie が自動的にブロックする",
        "S3 オブジェクトロックを有効化して機密データを保護し、誰もデータを削除できないようにする"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 バケットポリシーで MFA 認証要件（aws:MultiFactorAuthPresent: false の場合に Deny）と特定ロールのみ許可する条件を設定します。SCP で s3:PutBucketPolicy と s3:DeleteBucketPolicy を Deny することで、バケット所有者を含むメンバーアカウントのすべてのプリンシパルがバケットポリシーを変更できなくなり、ポリシーの迂回を防止できます。SCP は管理アカウントのみが変更できるため、最も強固な制御になります。\n\nA: バケット所有者に AdministratorAccess を許可することは、MFA 迂回防止の要件に反します。バケット所有者でさえもポリシーを変更できないよう SCP で制限する必要があります。\n\nC: Macie は機密データの検出と分類に優れますが、アクセスの自動ブロック機能はありません。Macie はアクセス制御ではなくデータ分類のサービスです。\n\nD: S3 オブジェクトロックはデータの改ざん・削除防止（WORM）に使うものであり、アクセス認証要件（MFA）や特定ロールのみへのアクセス制限には対応していません。"
    },
    {
      "id": "q087",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations を使って管理しているマルチアカウント環境で、各開発チームが自律的に AWS リソースを作成できるよう「セルフサービス型のアカウント払い出し」を実装したいと考えています。新しいアカウントが払い出される際には、自動的に企業標準のセキュリティ設定（CloudTrail 有効化、GuardDuty 有効化、デフォルト VPC の削除、ベースライン IAM ロールの作成）が適用される必要があります。最も適切な実装はどれですか？",
      "choices": [
        "開発チームがアカウントを作成したら、セキュリティチームが手動で標準設定を適用する手順書を配布する",
        "AWS Control Tower Account Factory または Account Factory for Terraform（AFT）を使用し、新しいアカウントのプロビジョニング時に標準設定を自動適用するカスタマイズ（Account Factory Customization: AFC）を定義する。CloudTrail、GuardDuty、VPC、IAM ロールのカスタマイズを AFT のカスタマイズパイプラインとして定義する",
        "AWS Service Catalog でアカウントプロビジョニング製品を作成し、承認フローを経て新アカウントを作成する。CloudFormation で標準設定を手動デプロイする",
        "開発チームが Organizations のコンソールから直接アカウントを作成し、CloudFormation StackSets で標準設定を後から展開する"
      ],
      "answer": [
        1
      ],
      "explanation": "Control Tower Account Factory は新しいアカウントのプロビジョニングを標準化し、VPC/IAM/CloudTrail/GuardDuty などの設定を自動的に適用します。Account Factory for Terraform（AFT）を使うと、Terraform でカスタマイズを定義し、新アカウント作成時に自動的にパイプラインが実行されてすべての標準設定が適用されます。既存の Control Tower ガードレールとも統合されます。\n\nA: 手動での設定適用は時間がかかり、設定漏れのリスクがあります。大規模なマルチアカウント環境では自動化が必須です。\n\nC: Service Catalog + CloudFormation の手動デプロイは自動化が不完全です。アカウント作成後に CloudFormation を手動実行する必要があり、セルフサービスの自動化要件を満たしません。\n\nD: StackSets での「後から」展開はアカウント作成から設定適用までの時間差が生じ、その間にセキュリティ設定なしのアカウントが存在することになります。"
    },
    {
      "id": "q088",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上の Amazon RDS Aurora PostgreSQL クラスターのコストを削減したいと考えています。本番クラスターは現在 db.r6g.4xlarge（128GB RAM）を使用していますが、CloudWatch メトリクスを確認すると、平日夜間と週末にはデータベース接続数がほぼゼロで、CPU 使用率も 2% 以下であることが分かりました。アプリケーションの可用性に影響を与えずにコストを削減する最も適切な方法はどれですか？",
      "choices": [
        "本番 Aurora クラスターを Aurora Serverless v2 に移行し、最小 ACU（Aurora Capacity Units）を低く設定する。夜間・週末の低使用時には自動的に最小 ACU にスケールダウンし、ピーク時に自動スケールアップする",
        "インスタンスを db.r6g.large にダウンサイズして年間コストを削減する",
        "Aurora クラスターを夜間と週末に停止し、朝に再起動する自動化スクリプトを実装する",
        "読み取り負荷をリードレプリカに転送し、プライマリインスタンスのサイズを小さくする"
      ],
      "answer": [
        0
      ],
      "explanation": "Aurora Serverless v2 はキャパシティを ACU 単位で 0.5 から最大値まで自動スケールします。最小 ACU を低く（例: 0.5 ACU）設定することで、夜間・週末のほぼゼロ負荷時のコストを大幅に削減できます。ピーク時は自動でスケールアップするため、可用性への影響はありません。既存の Aurora クラスターから Aurora Serverless v2 への移行はダウンタイムを最小化して実施できます。\n\nB: db.r6g.large にダウンサイズするとピーク時のパフォーマンスが大幅に低下するリスクがあります。現在 4xlarge を使用しているのにはピーク時の理由があると考えられます。\n\nC: 本番データベースの停止は可用性に直接影響し、停止中はサービスが利用できなくなります。「可用性に影響を与えない」要件に反します。\n\nD: リードレプリカ追加はコスト削減ではなく増加につながります。プライマリのダウンサイズは C と同様にピーク時の性能影響があります。"
    },
    {
      "id": "q089",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が複数の社内システムから生成されるイベントを処理するイベントバスアーキテクチャを AWS 上に構築しています。各システムは異なるイベント形式（JSON スキーマが異なる）を使っており、それぞれのイベントを適切なコンシューマーにルーティングする必要があります。また、将来的に新しいイベントタイプやコンシューマーを追加する際に、既存のコードを変更せずに対応できる拡張性が必要です。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon Kinesis Data Streams に全イベントを送信し、Lambda がすべてのイベントを受信してソースシステムと種別に応じてルーティングロジックを実装する",
        "Amazon EventBridge をイベントバスとして使用し、各ソースシステムからのイベントをカスタムイベントバスに送信する。EventBridge ルールでイベントパターン（source、detail-type、detail の属性）に基づいてイベントをフィルタリングし、適切なターゲット（Lambda、SQS、SNS、Step Functions）に自動ルーティングする。EventBridge Schema Registry でスキーマを管理する",
        "Amazon SNS でトピックを作成し、各コンシューマーが必要なトピックを購読する。各ソースシステムが適切なトピックにメッセージを送信する",
        "すべてのイベントを SQS FIFO キューに送信し、Lambda ポーリングで順序付き処理を実装する"
      ],
      "answer": [
        1
      ],
      "explanation": "EventBridge はサーバーレスのイベントバスで、イベントパターンマッチング（source、detail-type、任意の detail フィールド）に基づく細かなルーティングが可能です。新しいルールを追加するだけで既存コードを変更せずに新しいイベントタイプやコンシューマーを追加できます。Schema Registry でスキーマを管理し、イベント駆動アーキテクチャのドキュメントとして活用できます。\n\nA: Kinesis + Lambda でのカスタムルーティングは、新しいイベントタイプ追加のたびにコード変更が必要で、拡張性の要件に反します。\n\nC: SNS は有効ですが、複数の属性を組み合わせた複雑なフィルタリング（メッセージフィルタリングポリシー）は EventBridge のイベントパターンマッチングほど柔軟ではありません。\n\nD: SQS FIFO は順序付き処理に有効ですが、イベントのルーティング（異なるコンシューマーへの振り分け）機能がなく、単一のコンシューマーへの配信のみです。"
    },
    {
      "id": "q090",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスの NetApp ONTAP ストレージシステムを AWS に移行したいと考えています。既存のアプリケーションは NFS と SMB の両方のプロトコルでストレージにアクセスしており、NetApp SnapMirror を使ったデータ保護と、NetApp SnapVault を使ったバックアップも利用しています。これらのワークロードを最小限の変更で AWS に移行するために最も適切なサービスはどれですか？",
      "choices": [
        "Amazon EFS を作成し、NFS マウントでアプリケーションを接続する。SMB アクセスには別途 FSx for Windows File Server を作成する",
        "Amazon FSx for NetApp ONTAP を使用し、マルチプロトコル（NFS、SMB、iSCSI）アクセスをサポートする ONTAP ファイルシステムを作成する。SnapMirror を使ってオンプレミスから FSx for NetApp ONTAP へのデータ移行と継続的なレプリケーションを実施し、SnapVault も AWS 上で継続利用する",
        "AWS Storage Gateway（ファイルゲートウェイ）をオンプレミスに設置し、S3 に NFS キャッシュとして接続する",
        "全データを Amazon S3 に移行し、S3 File Gateway で NFS/SMB アクセスを提供する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon FSx for NetApp ONTAP は AWS マネージドの ONTAP ファイルシステムで、NFS（v3/v4.1）、SMB（Kerberos 認証対応）、iSCSI のマルチプロトコルアクセスをネイティブサポートします。NetApp ONTAP の全機能（SnapMirror、SnapVault、FlexVol、thin provisioning、deduplication、compression）が AWS 上でそのまま使えます。SnapMirror でオンプレミスから AWS への移行とその後の DR レプリケーションが実現できます。\n\nA: EFS + FSx for Windows File Server の組み合わせは2つのサービスを管理する必要があり、NetApp 固有の機能（SnapMirror/SnapVault）が使えません。\n\nC: Storage Gateway はオンプレミスのキャッシュゲートウェイとして有効ですが、クラウドへの完全移行ではなく、NetApp の機能も利用できません。\n\nD: S3 File Gateway はオブジェクトストレージへの NFS/SMB アクセスを提供しますが、NetApp の高度な機能（SnapMirror、SnapVault）は利用できません。"
    },
    {
      "id": "q091",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon EKS クラスターを運用しており、Kubernetes ノードのコスト最適化を検討しています。現在は固定サイズのノードグループ（m5.xlarge、常時 20 台）で稼働していますが、夜間と週末は Pod 数が平常時の 20% 程度に減少します。ピーク時には 20 台では不足することもあります。コストを最小化しながら、ピーク時のキャパシティも自動的に確保できる最も適切な構成はどれですか？",
      "choices": [
        "ノードグループのサイズを固定で 30 台に増やし、ピーク時に備える",
        "Kubernetes Cluster Autoscaler を設定し、Pod の需要に応じて EKS ノードグループを自動スケール（スケールアウト/スケールイン）する。オンデマンドインスタンスとスポットインスタンスを混在させたマネージドノードグループ（または Karpenter）を設定し、夜間・週末には不要なノードを自動削除してコストを削減する",
        "EKS から ECS Fargate に移行し、Pod のリソース要件に応じた従量課金に変更する",
        "夜間と週末に EventBridge スケジュールで Lambda を実行してノードグループのサイズを手動で変更する"
      ],
      "answer": [
        1
      ],
      "explanation": "Cluster Autoscaler（またはより新しい Karpenter）は Kubernetes の Pod スケジューリングに基づいて自動的にノードを追加・削除します。スポットインスタンスとオンデマンドの混在（Spot Fleet / Managed Node Group）により、夜間・週末の削減コストを最大化できます。Karpenter はノードプロビジョニングの最適化（最小コストのインスタンスタイプ選択）も自動化します。\n\nA: 固定 30 台への増加は常時コストが増大し、コスト最小化の要件に反します。夜間・週末の余剰キャパシティに対してもコストが発生します。\n\nC: ECS への移行は大きなアーキテクチャ変更で、EKS の既存投資（Kubernetes マニフェスト、ツール）が無駄になります。コスト最適化のためだけにプラットフォーム移行することは過剰です。\n\nD: 手動によるスケジュールスケーリングは、実際の負荷パターンの変動に対応できず、ピーク時の突発的な負荷増加に対応できません。"
    },
    {
      "id": "q092",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が複数の事業部門のためにセキュリティと自律性のバランスを取ったマルチアカウント設計を策定しています。各事業部門はそれぞれ独自の AWS アカウントを持ち、独立して操作できますが、中央の IT チームはセキュリティ基準への準拠を強制し、一部の共有サービス（DNS、ネットワーク、セキュリティ監視）を提供する必要があります。最も適切な AWS Landing Zone 設計はどれですか？",
      "choices": [
        "すべての事業部門が単一の AWS アカウントを共有し、IAM ポリシーで部門ごとのアクセスを制御する",
        "Organizations に Management、Security、Shared Services、Log Archive、各事業部門の OU 構造を設計する。Management アカウントは Organizations の管理のみ使用し、Security アカウントに GuardDuty/Security Hub の委任管理者を設定し、Shared Services アカウントで DNS/VPC/Transit Gateway などの共有インフラを提供する。各事業部門アカウントには SCP で最低限のセキュリティ基準を強制しながら、日々のリソース管理は自律して実施できるようにする",
        "すべての事業部門を同一の OU に入れ、すべて同一の SCP を適用する",
        "各事業部門が独自の Organizations を持ち、中央の IT が各 Organizations を個別に管理する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS のベストプラクティスである Landing Zone 設計では、Management（管理）、Security（セキュリティ）、Shared Services（共有サービス）、Log Archive（ログ集約）の各機能用アカウントを分離します。Management アカウントは組織管理に専念し、Security アカウントで中央セキュリティ監視を行い、Shared Services アカウントで DNS/ネットワークを一元提供します。各事業部門 OU に SCP を適用しながら自律性を確保するバランスが実現できます。\n\nA: 単一アカウント共有はセキュリティの分離がなく、事業部門間のリソース誤削除や権限エスカレーションのリスクが高く、スケールしません。\n\nC: すべての OU への同一 SCP 適用は、事業部門ごとの異なる要件（本番/開発の差異など）に対応できません。\n\nD: 複数の Organizations は AWS の設計に反し、Organizations の一括請求、セキュリティ委任、CloudTrail 組織トレイルなどの機能が使えなくなります。"
    },
    {
      "id": "q093",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある小売チェーンが 500 店舗に分散した POS システム（Windows Server 2016 + SQL Server 2014）を AWS に移行する計画を立てています。各店舗のサーバーは独立して稼働しており、本社のデータセンターとは VPN で接続されています。本社のデータセンターを廃止し、各店舗のデータを中央の AWS リージョンで集約・分析したいと考えています。各店舗のサーバーは廃止してエッジデバイスに置き換え、店舗内の処理は AWS との接続がない場合でも継続できる必要があります。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各店舗に EC2 インスタンスを設置し、AWS のインフラを各店舗に拡張する",
        "AWS IoT Greengrass を各店舗のエッジデバイスにデプロイし、店舗内の POS データ処理をローカルで実行する。接続が回復した際に売上データを AWS IoT Core 経由で中央の S3/DynamoDB に同期する。中央では Amazon Kinesis/Redshift で全店舗データを集約・分析し、Greengrass コンポーネントのアップデートは OTA（Over-The-Air）で一元管理する",
        "各店舗に Site-to-Site VPN を設置し、クラウドの中央 RDS SQL Server に直接書き込む",
        "AWS Outposts を 500 店舗に設置し、各店舗でフルの AWS サービスを稼働させる"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS IoT Greengrass はエッジデバイスで Lambda 関数やコンテナを実行できる IoT フレームワークです。オフライン時でもローカル処理を継続し（ローカル実行ランタイム）、接続回復時に自動でクラウドと同期します。Greengrass のコンポーネントは OTA アップデートで一元管理できます。500 店舗への展開もクラウドから一元的に管理できます。\n\nA: 各店舗に EC2 を設置することはクラウドの意味がなく、ハードウェア管理が必要で AWS 移行の目的に反します。\n\nC: クラウドの中央 RDS への直接書き込みは、店舗の接続断時に POS が使えなくなるため「接続なしでも継続できる」要件を満たしません。\n\nD: AWS Outposts は AWS マネージドハードウェアで高コストです。500 店舗への展開は非常に高コストで、POS システムのようなユースケースには Greengrass の方が適切です。"
    },
    {
      "id": "q094",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "medium",
      "question": "ある企業が AWS 上で稼働する複数のマイクロサービスのログを Amazon CloudWatch Logs で管理しています。現在、数百のロググループがあり、ログの保持期間が設定されておらず（無期限）、月次のコストが予想を大幅に超えています。また、セキュリティチームはすべてのログを 1 年間保持することを要求していますが、1 年以降は削除して構わないと言っています。コストを削減しながら要件を満たす最も適切な方法はどれですか？",
      "choices": [
        "CloudWatch Logs の全ロググループを削除し、必要なログのみ再作成する",
        "すべてのロググループの保持期間を 365 日（1 年）に設定する。1 年以降のアーカイブが必要な場合は、Lambda と CloudWatch Logs サブスクリプションフィルターで Kinesis Data Firehose 経由で S3 に安価に保存する",
        "CloudWatch Logs の Metric Filter を使ってログデータを CloudWatch メトリクスに変換し、元のログを削除する",
        "すべてのログを S3 に手動でエクスポートし、CloudWatch Logs からは削除する"
      ],
      "answer": [
        1
      ],
      "explanation": "CloudWatch Logs の保持期間を 365 日に設定することで、1 年後に自動的にログが削除され、ストレージコストが削減されます。この設定はロググループ単位で行い、多数のロググループには AWS CLI や Lambda で一括設定できます。長期アーカイブが必要な場合は Kinesis Firehose 経由で S3 Glacier に保存することでさらにコストを削減できます。\n\nA: ロググループの削除は稼働中のシステムのログ収集を停止させ、セキュリティ要件（1 年間保持）を満たせません。\n\nC: Metric Filter はログからメトリクスを生成するもので、ログの保持コスト削減には直接対応していません。元のログを削除すると監査要件を満たせなくなります。\n\nD: S3 への手動エクスポートは作業負荷が高く、継続的なログの転送と管理の自動化が不完全です。保持期間の自動設定の方がシンプルです。"
    },
    {
      "id": "q095",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でマルチテナントの SaaS アプリケーションを構築しており、テナントごとに独立したデータ暗号化キーが必要です。各テナントのデータは AWS KMS の CMK で暗号化され、テナントが解約した際にはそのテナントのデータを「暗号学的消去（Crypto Shredding）」できる必要があります。暗号学的消去とは、KMS キーを削除することで、そのキーで暗号化されたすべてのデータを復号不可能にする手法です。最も適切な実装はどれですか？",
      "choices": [
        "すべてのテナントデータを単一の AWS マネージドキー（aws/s3 等）で暗号化し、テナント ID をメタデータとして保存する",
        "テナントごとに AWS KMS CMK（カスタマーマネージドキー）を作成し、テナントのデータを各テナントの CMK で暗号化する。テナント解約時には KMS の ScheduleKeyDeletion API でキーの削除をスケジュールし（最短 7 日後）、削除後はそのキーで暗号化されたデータへのアクセスが永続的に不可能になる",
        "テナントのデータを S3 Object Lock（WORM）で保護し、解約時にオブジェクトを手動で削除する",
        "テナントごとに独立した AWS アカウントを作成し、解約時にアカウントを削除してデータを消去する"
      ],
      "answer": [
        1
      ],
      "explanation": "テナントごとに CMK を作成することで、暗号化の分離と暗号学的消去が実現できます。ScheduleKeyDeletion でキーを削除すると、そのキーで暗号化されたすべてのデータ（S3、RDS、DynamoDB など）は物理的に削除しなくても永続的に復号不可能になります。これが「暗号学的消去」の本質です。テナント間の鍵の分離も保証されます。\n\nA: 単一のマネージドキーでの暗号化はテナント間の暗号化分離がなく、暗号学的消去も実現できません。すべてのテナントデータが同じキーで暗号化されているため、特定テナントのデータのみを消去できません。\n\nC: S3 Object Lock は WORM（Write Once Read Many）で削除防止に使うものであり、暗号学的消去とは逆の目的です。解約時のデータ消去要件に反します。\n\nD: テナントごとのアカウント分離は強力ですが、コスト的に非現実的で、アカウント削除には AWS の正式なプロセスが必要です。また「暗号学的消去」ではなく物理的削除になります。"
    },
    {
      "id": "q096",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で 150 以上のアカウントを管理しており、定期的に AWS のサービスクォータ（Service Quotas）の引き上げが必要です。現在は各チームが個別にクォータ引き上げリクエストを送っており、管理が煩雑です。また、特定のサービスのクォータが使用率の 80% を超えた場合に自動でアラートを送信し、必要に応じて自動でクォータ引き上げをリクエストできる仕組みを構築したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各アカウントのチームが手動で AWS コンソールからクォータ引き上げリクエストを送信し、週次で一覧をまとめる",
        "AWS Service Quotas の CloudWatch 統合を使って使用量アラームを設定し、クォータ使用率が 80% を超えたら EventBridge ルールを発火させる。Lambda 関数で AWS Service Quotas API（RequestServiceQuotaIncrease）を自動呼び出してクォータ引き上げをリクエストする。AWS Trusted Advisor のサービスクォータチェックと組み合わせて、Organizations の全アカウントのクォータ状態を一元的に可視化する",
        "各アカウントに IAM ポリシーを追加して、チームメンバーが個別にクォータを変更できるようにする",
        "Quotas の引き上げは必要ないよう、すべてのサービスを低クォータ環境でも動作するように再設計する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Service Quotas はクォータの使用量を CloudWatch メトリクスとして提供し、アラームを設定できます。80% 超過時に EventBridge で Lambda を起動し、RequestServiceQuotaIncrease API で自動リクエストが可能です。Trusted Advisor のサービスクォータチェックは複数アカウントにわたるクォータの可視化に役立ちます。AWS Organizations の全アカウントに対して CloudFormation StackSets でアラームを一括展開できます。\n\nA: 手動リクエストは管理負荷が高く、クォータ超過を事前に防止できません。150 以上のアカウントでは現実的ではありません。\n\nC: IAM ポリシーでクォータを変更できるようにするだけでは、自動化や一元的なアラート・可視化の要件を満たしません。\n\nD: サービスの再設計はビジネス要件を無視しており、クォータ管理の問題への現実的な解決策ではありません。"
    },
    {
      "id": "q097",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でサーバーレスアプリケーションを構築しており、Lambda 関数が複数のダウンストリームサービス（外部 API、データベース、メッセージキュー）と連携します。ある Lambda 関数が外部 API の呼び出しに失敗した場合、他の Lambda 関数の呼び出しやデータベースへの書き込みが部分的に成功してしまい、データの整合性が失われる問題が発生しています。分散トランザクションの整合性を確保するには、どのアーキテクチャが最も適切ですか？",
      "choices": [
        "Lambda 関数のタイムアウトを延ばして外部 API の応答を長時間待機し、失敗した場合は Lambda を手動で再実行する",
        "AWS Step Functions を使ってワークフローを定義し、各ステップの成功/失敗を State Machine で管理する。外部 API 呼び出しの失敗時はステートマシンが自動的にリトライロジックを実行し、最終的な失敗時には補償トランザクション（ロールバック用の Step）を実行してデータベースへの書き込みを取り消す（Saga パターン）",
        "すべての Lambda 関数を単一の大きな Lambda 関数に統合し、コード内でトランザクション管理を実装する",
        "Amazon SQS の FIFO キューを使って全操作をシリアル化し、一つの操作が完了してから次の操作を実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "Step Functions の Saga パターンは分散システムでの整合性確保のベストプラクティスです。各ステップが Step Function のステートとして定義され、失敗時に自動リトライを実行します。すべてのリトライが失敗した場合、補償トランザクション（既に成功したステップを取り消す逆操作）を実行してシステムを一貫した状態に戻します。\n\nA: タイムアウトの延長は根本的な解決にならず、長時間の待機はコスト増加とリソースの無駄遣いです。手動再実行は自動化されておらず、部分的な成功の問題も解決しません。\n\nC: 単一の大きな Lambda 関数への統合はサーバーレスの分散設計原則に反し、テスタビリティとスケーラビリティが低下します。\n\nD: SQS FIFO のシリアル化は順序付きメッセージ配信を保証しますが、複数のダウンストリームサービス間のトランザクション整合性（成功/失敗の補償）には対応していません。"
    },
    {
      "id": "q098",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上の本番環境でコスト削減を行うため、Amazon EC2 の使用状況を分析しました。分析の結果、本番の Auto Scaling グループ（On-Demand）とは別に、追加の処理ジョブ（バッチ処理、データ変換など）を実行する EC2 フリートに月額 100 万円以上のコストが発生していることが分かりました。これらのジョブは処理時間が 2〜8 時間で、中断が発生しても再開できる設計になっています（チェックポイントあり）。最もコスト効率よくこれらのジョブを実行するには、どの方法が適切ですか？",
      "choices": [
        "バッチ処理用に Reserved Instances（1 年）を購入し、常時利用することでコストを削減する",
        "Amazon EC2 スポットインスタンスを使用してバッチジョブを実行する。スポットインスタンスはオンデマンドに比べて最大 90% コスト削減が可能で、チェックポイントがあるため中断耐性がある。AWS Batch または EC2 スポットフリート（多様なインスタンスタイプ指定）で Spot 中断リスクを分散し、2 分前の中断通知（Spot Instance Interruption Notice）で状態を保存する",
        "AWS Lambda でバッチジョブを実行し、処理をマイクロバッチに分割して 15 分以内で完了するように再設計する",
        "処理ジョブを On-Demand インスタンスで継続し、Savings Plans を購入してコストを削減する"
      ],
      "answer": [
        1
      ],
      "explanation": "EC2 スポットインスタンスはオンデマンド比最大 90% のコスト削減が可能で、チェックポイントがある中断耐性のバッチジョブには最適な選択です。Spot Instance Interruption Notice の 2 分前通知をインスタンスメタデータから取得し、状態をチェックポイントとして保存することで、中断後の再開が可能です。複数のインスタンスタイプとアベイラビリティゾーンを指定することで、Spot の可用性を高めることができます。\n\nA: Reserved Instances の購入はバッチジョブが断続的に実行される場合（24 時間365日でない）に非効率です。使わない時間も料金が発生します。\n\nC: Lambda の最大実行時間は 15 分で、2〜8 時間のバッチジョブには直接対応できません。処理の分割と再設計には大きな開発コストが必要です。\n\nD: Savings Plans はコンピューティングコストを削減しますが、スポットインスタンスほどの大幅な削減（最大 90%）は達成できません。Savings Plans での最大削減は約 66% です。"
    },
    {
      "id": "q099",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS への移行を進めており、移行後にアプリケーションのパフォーマンスを最適化したいと考えています。現在、オンプレミスのアプリケーションは Oracle 19c データベース（100TB）で稼働しており、移行先として Amazon Aurora PostgreSQL を検討しています。Oracle 固有の機能（パッケージ、シノニム、CONNECT BY 句）を多用しており、自動変換できないコードがどの程度あるかを事前に把握したいと考えています。最も適切なアプローチはどれですか？",
      "choices": [
        "開発チームが Oracle のコードを手動で PostgreSQL に変換し、変換工数を見積もる",
        "AWS Schema Conversion Tool（SCT）を Oracle 19c データベースに接続し、スキーマとコードの変換評価レポートを生成する。SCT は自動変換可能なオブジェクトと手動変換が必要なオブジェクト（ストアドプロシージャ、パッケージ、トリガー等）を識別し、難易度スコアと変換工数の推定を提供する",
        "Aurora PostgreSQL の評価版を作成し、実際に Oracle からデータを移行してエラーを確認する",
        "PostgreSQL の互換性リストを確認し、使用している Oracle 機能が対応しているかを手動でチェックする"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS SCT は移行前の評価フェーズに設計されており、ソースデータベースのスキーマとコードをスキャンして、ターゲットエンジン（Aurora PostgreSQL）への変換可能性を詳細にレポートします。自動変換率、手動変換が必要なオブジェクトのリスト、変換複雑度のスコアを生成し、プロジェクト計画の精度を大幅に向上させます。Oracle 固有の構文（CONNECT BY、パッケージ等）の評価も含まれます。\n\nA: 手動評価は時間がかかり、網羅性と精度がツールに劣ります。100TB の大規模データベースでの手動評価は非現実的です。\n\nC: 実際に移行を試みてエラーを確認する方法は、移行プロジェクトのリスクを高め、コストも発生します。評価フェーズでは SCT のような非破壊的なアセスメントが適切です。\n\nD: PostgreSQL の互換性リストの手動確認は概要の把握には有用ですが、実際のコードの変換可能性の詳細評価には不十分です。"
    },
    {
      "id": "q100",
      "type": "multiple",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境で、ネットワークセキュリティを強化したいと考えています。すべてのアカウントのアウトバウンドインターネットトラフィックを中央の検査ポイントを経由させ、悪意のある通信を検知・ブロックしたいと考えています。また、許可された通信パターンのみを通過させる FQDN（完全修飾ドメイン名）ベースのフィルタリングが必要です。この要件を満たすために使用するべきサービスを2つ選択してください。",
      "choices": [
        "AWS Network Firewall を集中型 Egress VPC に配置し、ステートフルルール（FQDN フィルタリング、侵入防止システム）でアウトバウンドトラフィックを検査する",
        "Transit Gateway を使って全アカウントの VPC を集中型 Egress VPC に接続し、アウトバウンドトラフィックを Network Firewall 経由にルーティングする",
        "各アカウントに個別にセキュリティグループを設定し、許可する送信先 IP アドレスをホワイトリスト化する",
        "Amazon GuardDuty でアウトバウンドトラフィックを監視し、不審な通信を検出したら SNS でアラートを送信する",
        "AWS WAF を全アカウントの ALB に設定し、悪意のあるリクエストをブロックする"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "AWS Network Firewall（A）はステートフルな深いパケット検査（DPI）、侵入防止システム（IPS）、FQDN ベースのフィルタリング（ドメイン名での許可/拒否リスト）を提供します。集中型 Egress VPC に配置することで、全アカウントのアウトバウンドトラフィックを一元的に検査できます。Transit Gateway（B）は全アカウントの VPC を集中型 Egress VPC に接続するルーティングハブとして機能し、アウトバウンドトラフィックを Network Firewall 経由に強制するルートテーブル設計が実現できます。\n\nC: セキュリティグループの IP ホワイトリストは FQDN ベースのフィルタリングに対応しておらず、ドメイン名での制御は直接できません。また各アカウントへの個別設定は管理が分散します。\n\nD: GuardDuty は脅威検出と通知が目的であり、リアルタイムのトラフィックブロック（防止）機能はありません。\n\nE: WAF は Web アプリケーション（HTTP/HTTPS）への受信トラフィックの制御に特化しており、アウトバウンドの FQDN フィルタリングには対応していません。"
    },
    {
      "id": "q101",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon DynamoDB を使ったアプリケーションを運用しており、読み取りパフォーマンスが問題になっています。現在の DynamoDB テーブルは 1 億件のアイテムがあり、ホットパーティション（特定のパーティションキーへのアクセスが集中）が発生しています。同一パーティションキーへの読み取りが毎秒 1 万件に達し、DynamoDB の ProvisionedThroughputExceededException が多発しています。最もコスト効率よくこの問題を解決するには、どの方法が適切ですか？",
      "choices": [
        "DynamoDB のプロビジョニングキャパシティを大幅に増加し、ホットパーティションでも処理できるようにする",
        "Amazon DynamoDB Accelerator（DAX）クラスターを DynamoDB の前段に配置し、マイクロ秒レベルの読み取りキャッシュを提供する。ホットパーティションへの繰り返し読み取りは DAX キャッシュから応答し、DynamoDB への実際の読み取りを大幅に削減する",
        "テーブルのパーティションキーを変更して書き込みシャーディングを実装し、ランダムサフィックスでキーを分散させる",
        "DynamoDB テーブルを Amazon Aurora PostgreSQL に移行し、リードレプリカで読み取り負荷を分散する"
      ],
      "answer": [
        1
      ],
      "explanation": "DynamoDB Accelerator（DAX）はインメモリキャッシュクラスターで、繰り返しの読み取りをマイクロ秒レベルでキャッシュから応答します。ホットパーティションへの毎秒 1 万件の読み取りが同一データの繰り返しであれば、DAX のキャッシュヒット率は非常に高くなり、DynamoDB への読み取りを大幅に削減できます。DAX は DynamoDB の API と完全互換で、アプリケーションのコード変更も最小限です。\n\nA: プロビジョニングキャパシティの増加は問題を解決しますが、ホットパーティションの制限（1 パーティションあたりの上限: 1,000 RCU）により、キャパシティを増やしてもパーティションの上限に達する可能性があります。またコストも増加します。\n\nC: パーティションキーのシャーディングは書き込み分散には有効ですが、読み取り時に複数のパーティションを結合する処理が必要になり、アプリケーションの大幅な変更が必要です。\n\nD: DynamoDB から Aurora への移行はデータモデルの全面的な変更が必要で、ホットパーティションという具体的な問題に対して過剰な対応です。"
    },
    {
      "id": "q102",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が既存のオンプレミスの Hadoop/Spark クラスター（100 ノード）を AWS に移行しています。現在のクラスターは毎日 12 時間稼働し、夜間のデータ処理バッチを実行しています。チームは Spark の知識があり、コードの変更を最小限に抑えたいと考えています。また、移行後はクラスターを使わない時間はゼロコストにしたいと考えています。最も適切な移行先はどれですか？",
      "choices": [
        "Amazon EC2 クラスターに Hadoop と Spark を手動インストールし、24 時間稼働させる",
        "AWS Glue for Spark（AWS Glue のスパークエンジン）を使用し、既存の PySpark/Scala Spark コードをほぼそのままで実行する。Glue ジョブはオンデマンドで起動し、処理完了後はリソースが解放されるため、使わない時間のコストはゼロになる。Glue ETL の DPU（Data Processing Unit）で従量課金",
        "Amazon EMR の常時稼働クラスターに移行し、コスト削減のために Reserved Instance を購入する",
        "Amazon SageMaker Processing ジョブとして Spark コードを実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Glue for Spark はサーバーレスの Spark 実行環境で、PySpark と Scala Spark コードを最小限の変更（一部 Glue コンテキストの追加が必要な場合あり）で実行できます。ジョブ実行時のみ課金され、待機時間のコストは完全にゼロです。毎日 12 時間のバッチ処理に最適で、スケジュールトリガー（EventBridge）での自動起動も可能です。\n\nA: EC2 に手動インストールすると 24 時間のインフラ管理が必要で、使わない時間もコストがかかります。クラスター管理の運用負荷も高くなります。\n\nC: EMR の常時稼働は 12 時間しか使わないのに 24 時間のコストが発生します。Reserved Instance を購入してもゼロコストにはなりません。EMR はクラスター起動と管理の負荷も生じます。\n\nD: SageMaker Processing は ML の前処理に主に使われ、汎用的な Spark バッチ処理には Glue の方が適切でシンプルです。"
    },
    {
      "id": "q103",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でグローバルな API サービスを提供しており、北米・欧州・アジアのユーザーに低レイテンシーな API アクセスを提供したいと考えています。API はステートレスで、Lambda 関数として実装されています。バックエンドのデータベース（Aurora Global Database）はプライマリリージョン（us-east-1）のみに書き込み可能です。また、DDoS 攻撃への対策も必要です。最も適切なグローバル API アーキテクチャはどれですか？",
      "choices": [
        "各リージョンに独立した API Gateway + Lambda + Aurora クラスターを構築し、アクティブ-アクティブで稼働させる",
        "AWS Global Accelerator で API エンドポイントをグローバルに高速化し、各リージョン（us-east-1、eu-west-1、ap-northeast-1）に API Gateway + Lambda をデプロイする。読み取り API は各リージョンの Aurora リードレプリカから応答し、書き込み API はプライマリリージョンに転送する。AWS Shield Advanced と WAF を Global Accelerator エンドポイントに統合してDDoS 防護を実現する",
        "CloudFront ディストリビューションを API Gateway の前段に配置し、Lambda@Edge で軽量な認証と地域ルーティングを実装する",
        "Route 53 ジオロケーションルーティングで最も近いリージョンの ALB に転送し、Lambda 関数で API を実装する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Global Accelerator は AWS のグローバルネットワークを使って世界中のエンドユーザーを最も近い AWS エッジロケーション（エニーキャスト IP）に接続し、バックボーンで各リージョンのエンドポイントに転送します。Route 53 の DNS 解決より低いレイテンシーでグローバル接続が改善されます。読み取りは各リージョンの Aurora リードレプリカ、書き込みはプライマリリージョンに分離することでレプリケーション遅延を考慮した設計になります。Shield Advanced + WAF で DDoS 対策が完結します。\n\nA: 各リージョンに独立した書き込み可能な Aurora クラスターを作成するとデータ整合性の問題が生じます。Aurora Global Database のプライマリへの書き込みは必須です。\n\nC: CloudFront は静的コンテンツとキャッシュ可能な API に最適ですが、API キャッシュができない動的 API の全レスポンスをオリジンに転送する場合、Global Accelerator の方がレイテンシーが低くなります。\n\nD: Route 53 のジオロケーションルーティングは DNS ベースのルーティングで切り替えに時間がかかり、Global Accelerator のリアルタイムな障害検知と切り替えには劣ります。また DDoS 対策の統合も別途必要です。"
    },
    {
      "id": "q104",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある大手メディア企業が複数のサービス（動画配信、音楽配信、ゲーム）を個別の AWS アカウントで運用しており、これらの間で同一ユーザーのサブスクリプション状態を共有する必要があります。現在は各サービスが個別にユーザーデータベースを持っており、データが重複しています。最小限の変更でデータの単一ソースを確立したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "全サービスを同一の AWS アカウントに統合し、単一の RDS データベースにユーザーデータを集約する",
        "専用の「ユーザーサービス」アカウントに Amazon DynamoDB（ユーザーデータの単一ソース）を配置し、AWS PrivateLink でエンドポイントサービスを公開する。各サービスアカウント（動画、音楽、ゲーム）から PrivateLink 経由で ユーザーサービスの API（API Gateway + Lambda + DynamoDB）にアクセスし、サブスクリプション状態を取得する",
        "各サービスアカウントに DynamoDB グローバルテーブルをデプロイし、複数リージョンのアカウント間でユーザーデータを双方向同期する",
        "Amazon Cognito User Pool を全サービスで共有し、カスタム属性にサブスクリプション状態を保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "専用の「ユーザーサービス」アカウントにデータの単一ソースを確立し、PrivateLink でプライベートかつセキュアな API アクセスを提供するアーキテクチャが最適です。各サービスはユーザーデータを持たず、ユーザーサービスの API を呼び出すだけです。PrivateLink はアカウント間のネットワーク設定を最小化し、サービスのネットワーク詳細を公開せずに API アクセスを提供できます。\n\nA: 全サービスを単一アカウントに統合することは、独立したチームと製品ラインの運営に支障をきたし、セキュリティと可用性の分離も失われます。\n\nC: DynamoDB グローバルテーブルのアカウント間複製は標準的な機能では対応していません（グローバルテーブルはリージョン間のみ）。また双方向同期は競合状態の管理が複雑になります。\n\nD: Cognito のカスタム属性はユーザー認証情報に付随するデータに適していますが、複雑なサブスクリプション状態（複数サービスの組み合わせ、履歴、請求情報等）の管理には機能が限定的です。"
    },
    {
      "id": "q105",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でリアルタイムの広告入札システム（Real-Time Bidding: RTB）を構築しています。広告インプレッションが発生するたびに 100ms 以内に入札決定を返す必要があり、毎秒 500,000 件の入札リクエストが想定されます。入札ロジックには各広告主の予算残高（リアルタイム更新）、ターゲティングルール（複雑な属性マッチング）、機械学習モデルによる CTR 予測が含まれます。最もスケーラブルかつ低レイテンシーなアーキテクチャはどれですか？",
      "choices": [
        "Amazon API Gateway + Lambda で入札 API を構築し、Aurora PostgreSQL でリアルタイムの予算残高を管理する",
        "Amazon API Gateway（REST API）+ EC2 Auto Scaling フリート（ゲームインスタンスタイプ z1d.large 等の高クロック）で入札エンジンを実装し、ElastiCache for Redis で予算残高と頻出ターゲティングルールをキャッシュする。SageMaker のリアルタイム推論エンドポイントは事前計算スコアを Redis にプリロードして 100ms を確保する",
        "Amazon Kinesis Data Streams で入札リクエストを受信し、非同期でバッチ処理して入札応答を S3 に保存する",
        "AWS Lambda@Edge で CloudFront エッジにロジックをデプロイし、エッジで入札決定を行う"
      ],
      "answer": [
        1
      ],
      "explanation": "RTB システムには極めて低いレイテンシー（100ms）と高スループット（毎秒 50 万件）が必要です。EC2 Auto Scaling フリートで入札エンジンを水平スケールし、ElastiCache Redis（インメモリ）で予算残高（カウンタ）とターゲティングルールを管理することで、マイクロ秒レベルのデータアクセスが可能です。ML スコアも Redis にプリコンピュートすることで推論のオーバーヘッドを排除します。\n\nA: Lambda + Aurora の組み合わせでは、Lambda のコールドスタートとAurora の接続レイテンシーが100ms の SLA を達成することが困難です。毎秒 50 万件の処理には Lambda の同時実行コストも非常に高くなります。\n\nC: Kinesis は非同期バッチ処理向けで、RTB の同期的な 100ms 以内の入札応答要件を満たせません。\n\nD: Lambda@Edge は JavaScript/Python のみで複雑な ML ロジックの実装に制約があり、メモリ（10GB まで）と実行時間（5 秒）の制限も RTB の要件には不十分です。"
    },
    {
      "id": "q106",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスのデータウェアハウス（Teradata）から Amazon Redshift に移行する計画を立てています。Teradata には数千のテーブルと数百のストアドプロシージャ、マクロ（Teradata 固有の機能）があります。一部の Teradata 固有の SQL 構文（QUALIFY、RESET WHEN、NORMALIZE 等）が使われており、直接 Redshift では動作しません。段階的な移行を最小限の開発コストで実現するには、どのアプローチが最適ですか？",
      "choices": [
        "全てのストアドプロシージャとクエリを手動で Redshift SQL に書き直す",
        "AWS Schema Conversion Tool（SCT）で Teradata から Redshift へのスキーマとコードの変換評価を行い、自動変換できるオブジェクトは SCT で変換する。自動変換できない Teradata 固有のコード（Teradata マクロ等）は SCT の変換レポートを参考に手動変換を優先度付けして対応する。AWS DMS でデータを Redshift にロードし、段階的にワークロードを移行する",
        "Teradata から Amazon S3 にデータを全量エクスポートし、Athena でクエリして段階的に移行する",
        "Amazon EMR で Teradata のジョブを Hive/Spark に書き直し、S3 をストレージとして使用する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS SCT は Teradata から Redshift への変換に対応しており、自動変換可能なオブジェクトと手動変換が必要なオブジェクトを識別します。変換レポートにより手動作業の優先度付けと工数見積もりが可能です。SCT + DMS の組み合わせは Teradata→Redshift の標準的な移行パターンです。段階的に高優先度のテーブルとクエリから移行し、リスクを分散できます。\n\nA: 数千のテーブルと数百のストアドプロシージャを全て手動変換することは、莫大な開発コストと時間がかかります。SCT の自動変換を活用する方が効率的です。\n\nC: Athena は S3 上のデータの分析には有用ですが、Teradata のストアドプロシージャや複雑な ETL ロジックの移行先としては機能が不足しており、Redshift への段階的移行には対応しません。\n\nD: EMR への移行は Teradata のリレーショナル・データウェアハウスのワークロードを Hive/Spark に全面書き直すことになり、開発コストが非常に高くなります。"
    },
    {
      "id": "q107",
      "type": "multiple",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する本番アプリケーションに対して、SRE（サイトリライアビリティエンジニアリング）の観点から信頼性を向上させたいと考えています。現在のアーキテクチャは ALB + EC2 Auto Scaling + RDS Aurora Multi-AZ です。以下の改善を行いたいと考えています。①定期的なリカバリテストを自動化する、②アプリケーションの実際のユーザー体験（エンドツーエンド）を継続的に監視する。これらを実現するために使用するべきサービスを2つ選択してください。",
      "choices": [
        "AWS Fault Injection Simulator（FIS）でカオスエンジニアリング実験（EC2 インスタンスのシャットダウン、Aurora フェイルオーバー等）を定期スケジュールで自動実行し、システムの回復力を検証する",
        "Amazon CloudWatch Synthetics でカナリアスクリプトを作成し、定期的にアプリケーションのエンドツーエンドフロー（ログイン→商品検索→カート→決済）をシミュレートしてユーザー体験を継続的に監視する",
        "AWS Backup で毎日スナップショットを取得し、四半期に一度のリカバリテストを手動で実施する",
        "Amazon CloudWatch アラームでシステムメトリクス（CPU、メモリ）を監視し、閾値超過時に SNS で通知する",
        "AWS Config でアーキテクチャの設定変更を監視し、非準拠リソースを検出する"
      ],
      "answer": [
        0,
        1
      ],
      "explanation": "AWS FIS（A）はカオスエンジニアリング実験を設定ファイルで定義し、EventBridge でスケジュール実行できます。EC2 のシャットダウン、Aurora のフェイルオーバー強制などのインジェクションを自動化し、システムの回復力（Resilience）を定期的に検証します。CloudWatch Synthetics（B）はエンドユーザーのアクション（Headless Chrome ベースの実際のブラウザ操作）をシミュレートし、エンドツーエンドのユーザー体験を継続的に監視します。SRE の観点での①と②の要件に完全に対応しています。\n\nC: AWS Backup による手動リカバリテストは自動化されていなく、四半期に一度では頻度も不十分です。FIS の自動化されたリカバリテストの方がSRE の要件に合います。\n\nD: CloudWatch アラームはインフラメトリクスの監視に有用ですが、エンドツーエンドのユーザー体験の監視はできません。\n\nE: Config は設定管理と監査に適していますが、信頼性テストや実際のユーザー体験監視には対応していません。"
    },
    {
      "id": "q108",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でマイクロサービスアーキテクチャへの移行を進めており、既存のモノリシックアプリケーションの一部機能をサーバーレスの Lambda 関数として切り出しました。Lambda 関数は VPC 内に配置されており、既存の RDS データベースにアクセスします。移行後、Lambda 関数のデプロイ頻度が高くなり、デプロイごとに設定値（データベース接続文字列、API キー、環境設定）を安全に更新する必要があります。また、シークレット（DB パスワード、API キー）は定期的に自動ローテーションする必要があります。最も適切な設定管理アーキテクチャはどれですか？",
      "choices": [
        "すべての設定値と シークレットを Lambda 関数の環境変数にハードコードし、デプロイのたびに更新する",
        "非機密の設定値は AWS Systems Manager Parameter Store（SecureString または String パラメーター）に格納し、Lambda 関数の起動時に取得する。機密情報（DB パスワード、API キー）は AWS Secrets Manager に格納し、自動ローテーション機能を有効化する。Lambda の IAM ロールにパラメーターとシークレットへのアクセス権限を付与し、コードから安全に取得する",
        "設定値をすべて S3 バケットに JSON ファイルとして保存し、Lambda 関数の起動時に S3 から読み取る",
        "設定値を Git リポジトリで管理し、デプロイパイプラインで環境変数として Lambda に注入する"
      ],
      "answer": [
        1
      ],
      "explanation": "Systems Manager Parameter Store は設定値の一元管理に適しており、更新時に Lambda を再デプロイせずに設定を変更できます。Secrets Manager はパスワードの自動ローテーション（Lambda 関数による自動更新）を組み込みでサポートし、RDS、Redshift、DocumentDB との統合ローテーションも提供します。IAM ロールベースのアクセスで最小権限を実現します。\n\nA: 環境変数へのハードコードはデプロイのたびに手動更新が必要で、シークレットが Lambda の設定として平文で露出するセキュリティリスクがあります。\n\nC: S3 への JSON ファイル保存は可能ですが、バージョン管理・アクセス制御・自動ローテーション機能がなく、シークレット管理に適していません。\n\nD: Git リポジトリへのシークレット保存はセキュリティ上の大きなリスクです。パスワードなどの機密情報を Git に含めることは厳禁です。"
    },
    {
      "id": "q109",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で大規模な B2B SaaS アプリケーションを構築しており、顧客企業（テナント）ごとにカスタムドメイン（例: tenant-a.example.com、tenant-b.example.com）でアクセスできるようにしたいと考えています。各テナントのドメインは顧客が管理する独自ドメインで、HTTPS 接続が必須です。SSL 証明書の管理と更新を自動化し、テナント数が増えても手動作業なしに対応できるアーキテクチャを設計したいと考えています。最も適切な設計はどれですか？",
      "choices": [
        "各テナントのドメインに対してワイルドカード証明書（*.example.com）を購入し、ALB に登録する",
        "Amazon CloudFront の Alternate Domain Names（CNAME）機能と AWS Certificate Manager（ACM）のカスタムドメイン証明書を使用する。各テナントのドメインを CloudFront ディストリビューションの CNAME に追加し、ACM で各テナントドメインの証明書を DNS 検証で自動発行・自動更新する。API Gateway または ALB をオリジンとして設定する",
        "各テナントごとに独立した EC2 インスタンスを起動し、Let's Encrypt で証明書を取得して nginx で SSL 終端を行う",
        "テナントのカスタムドメインを受け付けるリバースプロキシ（nginx）を EC2 クラスターに構築し、AWS Certificate Manager Private CA でプライベート証明書を発行する"
      ],
      "answer": [
        1
      ],
      "explanation": "ACM は DNS 検証を使った証明書の自動発行と自動更新を提供します。CloudFront の Alternate Domain Names に各テナントのドメインを追加し、ACM の証明書を関連付けることで、テナントごとのカスタム HTTPS ドメインが実現できます。テナントが増えても API 経由で自動的にドメインと証明書を追加できます。ACM の証明書は無料で 90 日ごとに自動更新されます。\n\nA: ワイルドカード証明書はサブドメイン（*.example.com）には有効ですが、顧客の独自ドメイン（tenant-a.customdomain.com）には使用できません。\n\nC: テナントごとの EC2 インスタンスは管理が煩雑でコストが高く、テナント数に比例してインフラが増大します。スケーラビリティに欠けます。\n\nD: AWS Certificate Manager Private CA のプライベート証明書は内部通信用であり、パブリックの HTTPS 接続（インターネットからのアクセス）には使用できません。ブラウザは信頼できないプライベート CA の証明書に警告を表示します。"
    },
    {
      "id": "q110",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations の管理アカウントから、特定のメンバーアカウントへの意図しないアクセスを防止したいと考えています。Organizations の管理アカウントが持つ特権的なアクセス（管理アカウントからはどのメンバーアカウントにも AssumeRole できる）を制限したいと考えています。しかし、Organizations の SCP は管理アカウント自体には適用されません。管理アカウントから特定のメンバーアカウントへのアクセスをアクセス制御するには、どの方法が最も適切ですか？",
      "choices": [
        "管理アカウントから SCP を使って管理アカウント自身のアクセスを制限する",
        "メンバーアカウントの IAM ロールの信頼ポリシーを変更し、管理アカウントのプリンシパルを明示的に拒否する条件（aws:PrincipalOrgPaths や明示的な Deny）を追加することで、管理アカウントからのアクセスをリソースレベルで制限する",
        "AWS Control Tower のドリフト検出機能で管理アカウントのアクセスを監視する",
        "CloudTrail で管理アカウントの AssumeRole をモニタリングし、不審なアクセスを手動で対応する"
      ],
      "answer": [
        1
      ],
      "explanation": "SCP は管理アカウント（Management Account）には適用されません。そのため、管理アカウントからのアクセスを制限するには、メンバーアカウント側の IAM ロール信頼ポリシーでアクセスを明示的に拒否するか、aws:PrincipalOrgPaths 条件を使って特定の OU からのアクセスを制限する必要があります。これはリソースベースのアクセス制御として最も直接的な方法です。\n\nA: SCP は管理アカウント自体には適用されないため、管理アカウントから自分自身の SCP で制限することはできません。\n\nC: Control Tower のドリフト検出は設定の変更を検出しますが、アクセス制御そのものを提供しません。\n\nD: CloudTrail によるモニタリングは事後検知であり、事前防止のアクセス制御には対応していません。"
    },
    {
      "id": "q111",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で分散システムを構築しており、複数のマイクロサービスが並行して同じリソース（在庫数、残席数）を更新する競合状態の問題が発生しています。リソースの更新を原子的（Atomic）に行い、オーバーセル（在庫が 0 なのに売れてしまう）を防止したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon RDS PostgreSQL のトランザクションと SELECT FOR UPDATE を使用してロックを取得し、競合を防ぐ",
        "Amazon DynamoDB の条件付き書き込み（ConditionExpression）と atomic counter（UpdateItem の ADD 操作）を使用する。在庫減算時に ConditionExpression で現在値 > 0 を確認し、条件を満たす場合のみ atomic にデクリメントする。DynamoDB の楽観的ロックでオーバーセルを防止する",
        "Amazon SQS FIFO キューに全ての更新リクエストをキューイングし、単一の Lambda 関数でシリアルに処理する",
        "Amazon ElastiCache Redis の DECR コマンド（原子的なデクリメント）で在庫を管理し、0 未満にならないよう Lua スクリプトで条件付きデクリメントを実装する"
      ],
      "answer": [
        3
      ],
      "explanation": "Redis の DECR/DECRBY は原子的なオペレーションで、Lua スクリプトを使うことで「現在値 > 0 の場合のみデクリメント」という条件付き原子操作を実現できます。Redis はシングルスレッドで Lua スクリプトを実行するため、完全な原子性が保証されます。ElastiCache Redis はマイクロ秒レベルの応答性能を持ち、高スループットの在庫管理に最適です。\n\nA: PostgreSQL の SELECT FOR UPDATE は有効ですが、高並列の分散マイクロサービス環境では RDS の接続数上限とロック待機が性能ボトルネックになります。\n\nB: DynamoDB の条件付き書き込みは有効なアプローチです。ただし、高い競合率では多数の ConditionalCheckFailedException が発生し、リトライ処理が必要になります。ElastiCache Redis の Lua スクリプトは競合時のパフォーマンスが高く、在庫カウンターのユースケースに特に適しています。\n\nC: SQS FIFO + シリアル処理は確実な順序保証がありますが、高スループット要件ではボトルネックになります。"
    },
    {
      "id": "q112",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でマルチリージョンのアプリケーションを運用しており、各リージョンのアプリケーションが独自の設定（フィーチャーフラグ、設定値）を持つ必要があります。設定変更は各リージョンに即座に反映される必要があり、設定ストアへの書き込みはグローバルに一元化したいと考えています。また、設定変更の監査ログも必要です。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各リージョンに独立した Systems Manager Parameter Store を作成し、デプロイパイプラインで設定変更を各リージョンに手動配布する",
        "AWS AppConfig を使用して設定プロファイルを一元管理し、マルチリージョンへの設定デプロイを AppConfig のデプロイ戦略（段階的なロールアウト）で制御する。AppConfig の変更は CloudTrail で監査ログが記録され、Lambda エクステンション経由でアプリケーションが設定の変更を自動検知できる",
        "Amazon DynamoDB Global Tables に設定を保存し、各リージョンのアプリケーションが直接読み取る",
        "GitHub リポジトリで設定ファイルを管理し、CodePipeline でマルチリージョンに自動デプロイする"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS AppConfig はアプリケーション設定の管理・デプロイに特化したサービスです。設定プロファイルを一元管理し、段階的なロールアウト（全体の 10% → 50% → 100% など）で安全にデプロイできます。AppConfig Lambda エクステンションにより、アプリケーションが設定変更を自動的にポーリングして取得できます。CloudTrail との統合で変更監査ログが自動的に記録されます。\n\nA: Parameter Store への手動配布は設定変更の即時反映が保証できず、リージョン間の設定不整合が生じるリスクがあります。\n\nC: DynamoDB Global Tables は有効ですが、設定管理のための段階的ロールアウト、バリデーション、ロールバック機能がありません。AppConfig の方が設定管理の専用機能が充実しています。\n\nD: Git + CodePipeline はコード管理には有効ですが、フィーチャーフラグのような動的な設定変更（デプロイなしの変更）には AppConfig の方が適しています。"
    },
    {
      "id": "q113",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する Lambda 関数が Amazon S3 の特定バケットにアクセスするための IAM ロールを持っています。セキュリティ審査で「この Lambda 関数の IAM ロールは必要以上に広い権限を持っている（S3 の全操作が許可されている）」との指摘を受けました。実際に Lambda が使用している S3 API アクションのみに権限を絞り込みたいと考えています。最もデータドリブンなアプローチはどれですか？",
      "choices": [
        "S3 の一般的なベストプラクティスポリシーを検索してそのまま適用する",
        "AWS IAM Access Analyzer の「未使用アクセス」分析機能を使って Lambda のロールが過去 90 日間に実際に使用した API アクションを確認し、未使用のアクションを削除して最小権限ポリシーを生成する。Access Analyzer のポリシー生成機能（Generate policy based on access activity）でアクティビティに基づく最小権限ポリシーを自動生成する",
        "Lambda のコードを手動でレビューして使用している S3 API を特定し、そのアクションのみを許可する IAM ポリシーを作成する",
        "S3 バケットに対して GetObject と PutObject のみを許可するポリシーをすべての Lambda に一律適用する"
      ],
      "answer": [
        1
      ],
      "explanation": "IAM Access Analyzer のポリシー生成機能は CloudTrail ログを分析し、ロールが実際に使用した API アクションと条件を基にした最小権限ポリシーを自動生成します。手動レビューより正確で、Lambda が実際に呼び出している S3 API のみを反映したポリシーが得られます。これがデータドリブンな最小権限実現の AWS 推奨アプローチです。\n\nA: 一般的なベストプラクティスポリシーは過剰な権限を含む可能性があり、特定の Lambda の実際の使用パターンを反映していません。\n\nC: コードの手動レビューは有効ですが、ライブラリや SDK が内部で呼び出す API コールが漏れるリスクがあります。Access Analyzer の実際のアクティビティ分析の方が正確です。\n\nD: 一律の GetObject と PutObject 適用は、他の S3 アクション（ListBucket など）が必要な Lambda で機能障害を引き起こす可能性があります。"
    },
    {
      "id": "q114",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスの SQL Server データベースを Amazon RDS for SQL Server に移行しようとしています。データベースは 20TB で、週次のフルバックアップと日次の差分バックアップを取得しています。移行後は RTO 4 時間、RPO 1 時間の要件を満たす必要があります。最も適切な移行および DR 構成はどれですか？",
      "choices": [
        "AWS DMS で SQL Server から RDS for SQL Server に継続的レプリケーションを設定し、移行後は RDS の自動バックアップ（1 時間ごとのトランザクションログバックアップ）と Multi-AZ 配置で RPO 1 時間・RTO 4 時間を達成する",
        "AWS Backup で週次フルスナップショットを S3 に保存し、障害時に RDS を手動でリストアする",
        "RDS for SQL Server のスナップショットを 4 時間ごとに取得し、別リージョンにコピーして DR 対応とする",
        "オンプレミスの SQL Server をそのまま維持し、RDS for SQL Server とリアルタイムで双方向レプリケーションを設定する"
      ],
      "answer": [
        0
      ],
      "explanation": "AWS DMS での継続的レプリケーション（CDC）により、移行中もオンプレミスの SQL Server への変更差分を RDS に継続的に同期します。移行後は RDS for SQL Server の Multi-AZ 配置で同一リージョン内の自動フェイルオーバー（RTO 数分）を実現し、自動バックアップのトランザクションログバックアップ（最小 5 分間隔）で RPO 1 時間以内を達成します。\n\nB: 週次フルスナップショットからのリストアは RPO が最大 7 日になり、RPO 1 時間の要件を満たしません。\n\nC: 4 時間ごとのスナップショットは RPO が最大 4 時間になり、RPO 1 時間の要件を満たしません。\n\nD: オンプレミスの SQL Server を維持しながら双方向レプリケーションすることは移行の目的に反し、SQL Server の標準機能には双方向同期の制限があります。"
    },
    {
      "id": "q115",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で機密性の高い財務データを処理するアプリケーションを設計しています。データは処理中（メモリ上）でも暗号化されたままにする必要があり、データを処理するアプリケーションコードが悪意ある内部者や侵害されたインスタンスからアクセスできないようにしたいと考えています。いわゆる「Confidential Computing（機密コンピューティング）」の要件です。AWS でこれを実現するには、どのサービスが最も適切ですか？",
      "choices": [
        "AWS KMS でデータを暗号化し、KMS キーポリシーでアクセスを制限する",
        "AWS Nitro Enclaves を使用して、メインの EC2 インスタンスからも分離された独立したコンピューティング環境（Enclave）でデータ処理を実行する。Nitro Enclave にはネットワーク接続がなく、永続ストレージもなく、外部からのアクセスが不可能なため、機密データの処理をメインインスタンスや他のプロセスから完全に隔離できる",
        "VPC のプライベートサブネットで処理を実行し、セキュリティグループで外部アクセスを遮断する",
        "AWS CloudHSM でハードウェアセキュリティモジュールを使用し、データを HSM 内で処理する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Nitro Enclaves は EC2 インスタンスから独立した隔離されたコンピューティング環境（TEE: Trusted Execution Environment）を提供します。Enclave はネットワークインターフェース、永続ストレージ、対話型アクセス（SSH）がなく、親インスタンスからも内部のプロセスやデータにアクセスできません。機密データを Enclave に送り込み、処理結果のみを外部に返すことで、処理中のデータを完全に保護します。\n\nA: KMS は暗号化・復号のキー管理に優れますが、復号されたデータが EC2 のメモリ上にある状態では、メモリへのアクセス権を持つ内部者から保護できません。\n\nC: VPC のプライベートサブネットはネットワークレベルの分離を提供しますが、同一インスタンス上の他のプロセスや権限を持つ内部者からのメモリアクセスを防ぐことはできません。\n\nD: CloudHSM はキー管理と暗号処理の HSM としては優れていますが、汎用的なアプリケーションデータ処理（財務計算等）を HSM 内で実行するためには設計されていません。"
    },
    {
      "id": "q116",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働するアプリケーションについて、AWS Well-Architected Framework のレビューを実施したところ、「信頼性の柱」において「単一障害点（SPOF）が存在する」との指摘を受けました。具体的には、RDS for MySQL の Single-AZ 配置が SPOF であることが判明しました。また、「パフォーマンス効率の柱」では「読み取り重視のワークロードにもかかわらずリードレプリカがない」という指摘もありました。これらの問題を同時に解決する最も適切なアーキテクチャ変更はどれですか？",
      "choices": [
        "RDS for MySQL を Amazon DynamoDB に移行し、自動的なマルチリージョン対応を実現する",
        "RDS for MySQL を Amazon Aurora MySQL に移行する。Aurora は自動的にマルチ AZ 対応のストレージを提供し（6 つの AZ に 2 コピーずつ保存）、Aurora リードレプリカを 1 〜 2 台追加してリーダーエンドポイントに接続することで、SPOF 解消と読み取りパフォーマンスの両方を改善する",
        "RDS for MySQL の Single-AZ を Multi-AZ に変更し、リードレプリカを追加する",
        "RDS for MySQL のスナップショットを毎時取得し、障害時は最新スナップショットから復元する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon Aurora MySQL は RDS MySQL と互換性があり、移行は比較的容易です。Aurora のストレージは自動的に 3 つの AZ に 6 コピーが分散されており、単一の AZ 障害に対して透過的に対応します。Aurora リードレプリカはリーダーエンドポイント経由でロードバランスされ、読み取りパフォーマンスを向上させます。また RDS MySQL の Multi-AZ よりフェイルオーバー時間が短く（通常 30 秒未満）、両方の問題を効率的に解決できます。\n\nA: DynamoDB への移行はリレーショナルモデルが必要な場合に適さず、大規模なアプリケーション変更が必要です。\n\nC: RDS MySQL の Multi-AZ 化とリードレプリカ追加は機能しますが、Aurora MySQL の方がストレージの耐久性（6 コピー）、フェイルオーバー速度、リードレプリカの数（最大 15 台）で優れています。\n\nD: スナップショットからの復元は RTO が長く（GB/時間のリストア速度）、SPOF 問題の根本的な解決にはなりません。"
    },
    {
      "id": "q117",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "medium",
      "question": "ある企業が AWS への移行前に、オンプレミスのアプリケーションのコードを AWS 上で動作するよう最小限の変更で移行したいと考えています。現在のアプリケーションは Windows Server 2019 上で .NET Framework 4.8 で動作しています。コンテナ化も将来の選択肢として検討していますが、まず最もシンプルにクラウドへ移行したいと考えています。AWS に最もシンプルにデプロイする方法はどれですか？",
      "choices": [
        "アプリケーションを Linux に移植して EC2 Linux インスタンスにデプロイする",
        "EC2 Windows Server インスタンスにアプリケーションをそのままデプロイする。Windows Server AMI は AWS が提供しており、.NET Framework もプリインストール済みまたは追加インストール可能。アプリケーションの変更なしにリフト＆シフトが実現できる",
        "すぐに .NET Core（.NET 8）に書き直し、Linux コンテナで ECS にデプロイする",
        "AWS Elastic Beanstalk で .NET Framework アプリケーションをデプロイし、Windows Server プラットフォームを選択する"
      ],
      "answer": [
        1
      ],
      "explanation": "EC2 Windows Server への直接デプロイが最もシンプルなリフト＆シフト方法です。AWS は Windows Server の AMI を提供しており、.NET Framework 4.8 をインストールして既存のアプリケーションをそのままデプロイできます。コードの変更が最小限で、既存の Windows 管理スキルを活用できます。\n\nA: Linux への移植は .NET Framework から .NET Core への書き直しが必要で、「最小限の変更」要件に反します。\n\nC: .NET Core への書き直しは大規模なアプリケーション変更であり、「最小限の変更」要件に大きく反します。\n\nD: Elastic Beanstalk は有効ですが、Windows Server プラットフォームは利用可能なものの、EC2 への直接デプロイよりも Elastic Beanstalk の概念を学ぶ必要があります。最もシンプルという観点では EC2 直接デプロイが最も分かりやすいです。"
    },
    {
      "id": "q118",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でゼロトラストセキュリティモデルを実装しています。「ネットワークの境界を信頼しない」原則に基づき、VPC 内のリソース間の通信も認証・認可を必須にしたいと考えています。特に、EC2 インスタンスとデータベース（RDS）間の通信を、インスタンスの IAM ロールで認証・認可したいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "セキュリティグループのルールで EC2 インスタンスの IP アドレスのみ RDS へのアクセスを許可する",
        "Amazon RDS の IAM データベース認証を有効化し、EC2 インスタンスの IAM ロールに rds-db:connect 権限を付与する。EC2 インスタンスは IAM 認証トークン（有効期限 15 分）を生成してデータベースに接続し、パスワード管理が不要になる。接続のたびに IAM による認証が行われるため、ゼロトラストの「継続的な検証」要件を満たす",
        "RDS のマスターパスワードを AWS Secrets Manager に格納し、EC2 インスタンスが Secrets Manager から取得して接続する",
        "VPC ピアリングを使用せず、RDS を EC2 と同一サブネットに配置してローカル通信のみを許可する"
      ],
      "answer": [
        1
      ],
      "explanation": "RDS IAM 認証は IAM ロールベースの認証により、パスワードなしでデータベースに接続できます。IAM トークンの有効期限は 15 分で、接続のたびに IAM による認証が必要なため「継続的な検証」のゼロトラスト原則を満たします。EC2 の IAM ロールが侵害されても、IAM ポリシーの変更で即座にアクセスを取り消せます。\n\nA: セキュリティグループは IP ベースのネットワーク制御であり、ゼロトラストの「アイデンティティベースの認証」ではありません。IP は偽装される可能性があります。\n\nC: Secrets Manager からのパスワード取得は認証情報管理を改善しますが、IAM 認証トークンによる継続的な検証（接続ごとの認証）ではなく、パスワード型認証が残ります。\n\nD: 同一サブネットへの配置はネットワーク分離を弱め、セキュリティを向上させません。ゼロトラストはネットワーク境界ではなくアイデンティティ認証を重視します。"
    },
    {
      "id": "q119",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理する複数の本番アカウントで、コスト最適化の一環としてアイドル状態の EC2 インスタンス（過去 2 週間の CPU 使用率が平均 5% 未満）を自動的に特定して担当チームに通知したいと考えています。また、特定されたインスタンスに自動でタグを付けて管理しやすくしたいと考えています。最小限の開発負荷で実現するには、どの方法が最適ですか？",
      "choices": [
        "CloudWatch メトリクスをエクスポートし、EC2 インスタンスごとに CPU 使用率を手動で確認する",
        "AWS Compute Optimizer を Organizations の全アカウントで有効化し、低使用率インスタンスのレコメンデーションを取得する。EventBridge スケジュールで Lambda 関数を起動し、Compute Optimizer API から低使用率インスタンスのリストを取得して担当チームに SNS 通知を送信し、Systems Manager Automation で自動タグ付けを実行する",
        "Cost Explorer のリソース最適化レコメンデーションを毎月手動で確認し、担当チームに PDF で送付する",
        "各アカウントに CloudWatch アラームを手動で設定し、CPU が 5% 未満の場合に SNS で通知する"
      ],
      "answer": [
        1
      ],
      "explanation": "Compute Optimizer は Organizations と統合して全アカウントのリソース使用状況を自動分析し、低使用率インスタンスのリストを提供します。EventBridge スケジュール + Lambda で定期的に API から結果を取得し、SNS で通知、Systems Manager で自動タグ付けすることで、開発負荷を最小化しながら要件を完全に自動化できます。\n\nA: 手動確認は大規模な組織では非現実的で、自動化の要件を満たしません。\n\nC: Cost Explorer の手動確認は自動化されておらず、毎月の作業負荷が発生します。また自動タグ付けの要件も満たしません。\n\nD: 各アカウントへの手動 CloudWatch アラーム設定は、多数のインスタンスと複数アカウントでは管理が煩雑になり、Compute Optimizer の自動分析機能を活用する方がより効率的です。"
    },
    {
      "id": "q120",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働するアプリケーションのレイテンシーを改善したいと考えています。アプリケーションは Amazon SQS + Lambda のサーバーレスアーキテクチャで、Lambda が SQS から 10 件ずつメッセージをバッチ取得して処理しています。調査の結果、SQS キューにメッセージが来てから Lambda が処理を開始するまでの遅延（Lag）が平均 10 秒あることが判明しました。Lambda 自体の処理時間は問題ありません。レイテンシーを改善するには、どの設定が最も効果的ですか？",
      "choices": [
        "Lambda 関数のメモリを 3,008MB に増加して処理速度を上げる",
        "SQS イベントソースマッピングの MaximumBatchingWindowInSeconds を 0（または最小値）に設定し、メッセージが到着したらできる限り素早く Lambda を起動する。また Lambda の予約済み同時実行数を適切な値に設定してスケールを確保する",
        "SQS の可視性タイムアウトを短くしてメッセージを早く再表示させる",
        "Lambda 関数を EventBridge スケジュール（5 分ごと）でポーリングして SQS から手動でメッセージを取得する"
      ],
      "answer": [
        1
      ],
      "explanation": "SQS イベントソースマッピングの MaximumBatchingWindowInSeconds はメッセージをバッチにまとめるために待機する最大時間です。デフォルトは 0 ですが、設定によっては数秒の待機が発生します。この値を 0 に設定することで、メッセージが到着したらすぐに Lambda 起動が試みられます。また、同時実行数の設定でスケールアウト速度も最適化できます。\n\nA: Lambda のメモリ増加は処理速度の改善には有効ですが、SQS からの取得遅延（Lag）の問題は Lambda の処理速度ではなくポーリングタイミングにあります。\n\nC: 可視性タイムアウトを短くすると、処理中のメッセージが他の Lambda にも表示され、二重処理のリスクが高まります。\n\nD: 手動ポーリングに変更すると、最大 5 分のレイテンシーが発生し、問題を悪化させます。"
    },
    {
      "id": "q121",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスのエンタープライズアプリケーション（SAP、Oracle E-Business Suite）を AWS に移行する際、アプリケーションのライセンス最適化も同時に行いたいと考えています。Oracle データベースのライセンスは CPU コア数に基づいており、AWS への移行後もオンプレミスのライセンスを持ち込む（BYOL: Bring Your Own License）予定です。Oracle ライセンスコストを最小化するには、どのインスタンス設定が最適ですか？",
      "choices": [
        "最も多くの vCPU を持つ EC2 インスタンスを選択して処理性能を最大化する",
        "Oracle SE（Standard Edition）ライセンスを使用し、Amazon EC2 Dedicated Host を利用する。Dedicated Host は物理サーバー全体を占有し、ソケット数（vCPU 数ではなく物理コア数）に基づくライセンス計算が可能。Intel Broadwell などの 18 コアソケットの Dedicated Host を選択し、ライセンスコストを最小化しながら Dedicated Host 全体のキャパシティを活用する",
        "AWS が提供する Oracle ライセンス込み（License Included）の RDS for Oracle を使用する",
        "Spot インスタンスで Oracle データベースを稼働させ、コストを削減する"
      ],
      "answer": [
        1
      ],
      "explanation": "Oracle の BYOL では、Amazon EC2 Dedicated Host を使用することで物理コア数に基づくライセンス計算が可能です（仮想 vCPU 数ではなく物理コア数でカウント）。Dedicated Host はお客様専用の物理サーバーを占有するため、Oracle のハードパーティション（Hard Partitioning）要件を満たします。適切なコア数の Dedicated Host を選択することでライセンスコストを最適化できます。\n\nA: 多くの vCPU を持つインスタンスはライセンスコストを増加させます。Oracle ライセンスは使用するコア数に基づくため、必要最小限のコア数が重要です。\n\nC: ライセンス込みの RDS for Oracle は Oracle が管理するライセンスを使用するため、BYOL（既存ライセンスの持ち込み）には対応していません。既存のオンプレミスライセンスを活用できません。\n\nD: Spot インスタンスは中断リスクがあり、Oracle データベースのような本番ミッションクリティカルなワークロードには適していません。また Oracle の Hard Partitioning 要件も満たしません。"
    },
    {
      "id": "q122",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "medium",
      "question": "ある企業が AWS 上で複数のチームが共同開発するアプリケーションを管理しています。各チームは独自の開発環境（Feature Branch）を毎日作成・削除しており、環境ごとのコストを追跡したいと考えています。現在、Feature Branch 環境のコストが合算されており、どの開発環境がどれだけコストをかけているかが把握できません。最小限の作業でコストの可視性を高めるには、どの方法が適切ですか？",
      "choices": [
        "各 Feature Branch 環境のリソースに環境名（feature-branch-id、team-name）のコスト配分タグを付与し、AWS Cost Explorer でタグ別のコスト分析を有効化する",
        "各 Feature Branch ごとに独立した AWS アカウントを作成してコストを分離する",
        "CloudFormation スタックごとのコストを CloudWatch で追跡するカスタムメトリクスを実装する",
        "毎日のコストレポートを Athena で分析し、リソース ARN から環境を特定するカスタムロジックを実装する"
      ],
      "answer": [
        0
      ],
      "explanation": "コスト配分タグは AWS の組み込み機能で、リソースにタグを付けてコスト配分を追跡できます。feature-branch-id や team-name タグを全リソースに付与し、Cost Explorer でタグ別のコスト分析を有効化するだけで、環境ごとのコストが可視化されます。CI/CD パイプラインでタグを自動付与することで運用負荷を最小化できます。\n\nB: Feature Branch ごとにアカウントを作成することは、毎日大量の新規アカウントが必要になり（Feature Branch は毎日作成・削除）、Organizations の管理が複雑になります。\n\nC: CloudWatch カスタムメトリクスでのコスト追跡は開発負荷が高く、Cost Explorer の組み込み機能を使うより非効率です。\n\nD: Athena での ARN からの環境特定は複雑なカスタム実装が必要で、コスト配分タグの方がはるかにシンプルです。"
    },
    {
      "id": "q123",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でイベント駆動のデータ処理パイプラインを設計しており、処理の冪等性（Idempotency）を保証する必要があります。同じメッセージが複数回処理された場合でも、結果が同一になることが必要です。Lambda 関数が SQS からメッセージを受信して DynamoDB にデータを書き込む処理で、ネットワーク障害によるリトライ時に重複書き込みが発生しています。最もエレガントに冪等性を実装するには、どの方法が適切ですか？",
      "choices": [
        "SQS の可視性タイムアウトを長くして、同じメッセージが複数の Lambda に同時処理されないようにする",
        "AWS Lambda の冪等性サポート（Powertools for Lambda の Idempotency モジュール）または DynamoDB の条件付き書き込み（attribute_not_exists）を使用する。メッセージの一意識別子（MessageId）を DynamoDB のキーとして使用し、条件付き書き込みで既に処理済みのメッセージをスキップする",
        "SQS FIFO キューを使用してメッセージの順序を保証し、重複を防ぐ",
        "Lambda 関数をシングルトンとして実行し、同時実行数を 1 に制限する"
      ],
      "answer": [
        1
      ],
      "explanation": "DynamoDB の条件付き書き込み（attribute_not_exists(pk)）はアイテムが存在しない場合のみ書き込みを成功させ、既に処理済みの場合はエラー（ConditionalCheckFailedException）を返します。SQS MessageId を冪等性キーとして使用することで、同じメッセージが再処理されても重複書き込みを防げます。AWS Powertools for Lambda の Idempotency モジュールはこのパターンを実装するライブラリを提供します。\n\nA: 可視性タイムアウトを長くすると同時処理は減りますが、タイムアウト後に再度表示されるため根本的な重複処理を防ぎません。\n\nC: SQS FIFO のメッセージ重複排除（MessageDeduplicationId）は 5 分のウィンドウ内での重複のみを防ぎます。5 分以降や Lambda のリトライには対応していません。\n\nD: 同時実行数 1 への制限はスケーラビリティを完全に失い、高スループット要件を持つシステムには適していません。"
    },
    {
      "id": "q124",
      "type": "multiple",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon EKS（Kubernetes）を使ってマイクロサービスを運用しており、セキュリティ強化のために以下を実装したいと考えています。①Pod が必要な AWS リソース（S3、DynamoDB）にアクセスする際に、IAM ロールを使用する（インスタンスプロファイルではなく Pod レベルで）、②ネットワークポリシーで Pod 間の通信を制御する。これらを実現するために使用するべき技術を2つ選択してください。",
      "choices": [
        "EKS の IAM Roles for Service Accounts（IRSA）を設定し、Kubernetes ServiceAccount に IAM ロールをアノテーションで関連付ける。Pod は OIDC フェデレーション経由でそのロールの認証情報を自動取得する",
        "EC2 ノードの IAM インスタンスプロファイルに全 Pod が必要な権限をまとめて付与する",
        "Amazon VPC CNI プラグインのネットワークポリシー機能または Calico などのネットワークポリシーエンジンを EKS にデプロイし、Kubernetes NetworkPolicy リソースで Pod 間通信を制御する",
        "セキュリティグループのみを使ってすべての Pod 間通信を制御する",
        "すべての Pod に同一の IAM ロールを付与し、S3 と DynamoDB への全権限を付与する"
      ],
      "answer": [
        0,
        2
      ],
      "explanation": "IRSA（A）は Kubernetes ServiceAccount と IAM ロールを OIDC フェデレーションで紐付けることで、Pod レベルの最小権限 IAM アクセスを実現します。インスタンスプロファイルと異なり、同一ノード上の異なる Pod に異なる IAM 権限を付与できます。Amazon VPC CNI のネットワークポリシー機能または Calico（C）は Kubernetes の NetworkPolicy リソースを実装し、Pod 間通信のラベルセレクターベースの細かいアクセス制御を実現します。\n\nB: インスタンスプロファイルに全権限をまとめることは最小権限原則に反し、全 Pod が全リソースにアクセスできてしまいます。\n\nD: セキュリティグループは IP/ポートレベルの制御で、Kubernetes の Pod ラベルベースの動的なネットワークポリシーには対応していません（EKS の SG for Pods は使えますが、NetworkPolicy の代替には限定的）。\n\nE: 全 Pod に同一の広い権限を付与することは最小権限原則に大きく反します。"
    },
    {
      "id": "q125",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスの IBM MQ メッセージングインフラ（エンタープライズメッセージブローカー）を AWS に移行しようとしています。既存のアプリケーションは JMS（Java Message Service）プロトコルを使って IBM MQ と通信しており、アプリケーションコードの変更を最小限に抑えたいと考えています。最も適切な移行先はどれですか？",
      "choices": [
        "Amazon SQS に移行し、既存の JMS クライアントを AWS SDK に書き直す",
        "Amazon MQ（ActiveMQ または RabbitMQ ブローカー）に移行する。Amazon MQ はマネージドのメッセージブローカーサービスで、JMS、AMQP、STOMP、MQTT、OpenWire などの標準プロトコルをサポートする。既存の JMS クライアントコードをほぼ変更せずに接続先エンドポイントの変更のみで移行できる",
        "Amazon Kinesis Data Streams に移行し、ストリーミングアーキテクチャに刷新する",
        "Amazon EventBridge に移行し、イベント駆動アーキテクチャに移行する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon MQ はマネージドのメッセージブローカーサービスで、ActiveMQ と RabbitMQ をサポートします。JMS プロトコルに完全対応しているため、既存の JMS クライアントコードを最小限の変更（接続先エンドポイントのみ変更）で Amazon MQ に接続できます。IBM MQ から JMS 互換のブローカーへの移行として最も自然なパスです。\n\nA: SQS は AWS 独自の API で、JMS のような標準プロトコルをネイティブサポートしておらず、アプリケーションコードの書き直しが必要です。\n\nC: Kinesis はストリーミングデータの高スループット取り込みに特化しており、JMS のリクエスト-レスポンスパターンや双方向メッセージングには設計されていません。\n\nD: EventBridge はイベント駆動アーキテクチャのルーティングに有効ですが、既存の JMS インターフェースとは互換性がなく、アプリケーションの大幅な書き直しが必要です。"
    },
    {
      "id": "q126",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理する複数のアカウントで、AWS Config を使ってリソースのコンプライアンスを管理しています。現在、各アカウントで個別に Config ルールが設定されており、ルールの統一性がなく管理が煩雑です。今後は中央アカウントから組織全体に統一した Config ルールを展開・管理し、全アカウントのコンプライアンス状態を一元的に確認できる体制にしたいと考えています。最も適切な設定はどれですか？",
      "choices": [
        "AWS CloudFormation StackSets で Config ルールの CloudFormation テンプレートを全アカウントに展開し、各アカウントで独立して管理する",
        "AWS Config の委任管理者（Delegated Administrator）をセキュリティアカウントに設定し、AWS Organizations の Config ルール（組織の Config ルール）を管理アカウントまたは委任管理者から全メンバーアカウントに一元展開する。AWS Config Aggregator を使用して全アカウントのコンプライアンス状態を委任管理者アカウントに集約する",
        "各アカウントの Config コンソールにアクセスして手動でルールを確認し、週次でコンプライアンスレポートを作成する",
        "AWS Security Hub を有効化して Config の代わりに中央集約されたセキュリティチェックを実施する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Config の Organizations 統合では、管理アカウントまたは委任管理者から「組織の Config ルール」を作成し、Organizations 内の全メンバーアカウントに自動展開できます。新しいアカウントが Organizations に追加されると、自動的にルールが適用されます。Config Aggregator を委任管理者アカウントに設定することで、全アカウントのリソース設定とコンプライアンス状態を一元的に確認できます。\n\nA: StackSets を使った個別展開も有効ですが、Config Organizations ルールよりも手順が多く、新規アカウントへの自動適用も追加設定が必要です。\n\nC: 手動確認は大規模な組織では非現実的で、自動化の要件を満たしません。\n\nD: Security Hub は Config と統合して有用ですが、Config ルールの一元展開・管理の機能は Config Organizations ルールが提供します。Security Hub は Config の代替ではありません。"
    },
    {
      "id": "q127",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でコンテンツ管理システム（CMS）を構築しており、大量の画像・動画ファイルをユーザーが直接 S3 にアップロードできる機能が必要です。セキュリティ上の理由から、アップロードリクエストはサーバーを経由させずにクライアントから直接 S3 にアップロードさせたいと考えています。ただし、誰でも任意のファイルをアップロードできてはならず、認証されたユーザーのみが特定のプレフィックス（ユーザー ID）に対してのみアップロードできる必要があります。最も適切な実装はどれですか？",
      "choices": [
        "S3 バケットをパブリック書き込み可能にし、CloudFront で認証済みユーザーのみアクセスできるよう制限する",
        "Lambda または API Gateway でバックエンドが認証済みユーザーの確認後に S3 の署名付き URL（Pre-signed URL）を生成し、クライアントに返す。クライアントはその Pre-signed URL を使って指定されたプレフィックス（ユーザー ID）に対してのみ直接 S3 にアップロードする。Pre-signed URL には有効期限（例: 15 分）を設定する",
        "S3 の CORS 設定でアップロード元ドメインを許可し、フロントエンドの JavaScript で直接アップロードする",
        "Amazon Cognito Identity Pool を使用して、認証済みユーザーに一時的な IAM 認証情報を発行し、クライアントが AWS SDK で直接 S3 に書き込む"
      ],
      "answer": [
        1
      ],
      "explanation": "Pre-signed URL は特定の S3 オブジェクトキー（プレフィックス/ファイル名）に対して有効期限付きのアップロード権限を付与します。バックエンドで認証確認後に、ユーザー ID をプレフィックスに含む PUT URL を生成して返すことで、認証済みユーザーのみが自分専用のプレフィックスにアップロードできます。S3 クレデンシャルをクライアントに公開せずにセキュアなダイレクトアップロードが実現できます。\n\nA: S3 をパブリック書き込み可能にすることは重大なセキュリティリスクで、CloudFront だけでは書き込みを完全に制御できません。\n\nC: CORS 設定はオリジンドメインの制限に使いますが、認証されたユーザーのみへのアクセス制限や特定プレフィックスへの制限はできません。\n\nD: Cognito Identity Pool も有効な方法ですが、一時的 IAM 認証情報をクライアントに発行することはクライアント側で追加の AWS SDK 設定が必要です。Pre-signed URL の方がよりシンプルなアプローチです。"
    },
    {
      "id": "q128",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS への全社的な移行を完了させようとしていますが、一部の古いアプリケーションがオンプレミスのネットワークファイルシステム（NFS）ストレージに依存しており、クラウドへの移行が困難な状況です。これらのアプリケーションは変更できませんが、データだけは AWS に移行して S3 に保存したいと考えています。また、オンプレミスのアプリケーションからは既存の NFS インターフェースでアクセスできる必要があります。最も適切なソリューションはどれですか？",
      "choices": [
        "オンプレミスのアプリケーションから NFS 依存をなくすためにコードを書き直す",
        "AWS Storage Gateway のファイルゲートウェイをオンプレミスに設置する。ファイルゲートウェイは NFS（および SMB）インターフェースを提供し、書き込まれたファイルをローカルキャッシュに保持しながら非同期で S3 に同期する。アプリケーションは既存の NFS マウントポイントのままアクセスでき、データは S3 に保存される",
        "Amazon EFS を Direct Connect 経由でオンプレミスからマウントする",
        "S3 の NFS マウント機能（S3 Mount）を使ってオンプレミスサーバーに直接マウントする"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Storage Gateway のファイルゲートウェイはオンプレミスに設置する仮想アプライアンス（または物理アプライアンス）で、NFS と SMB のファイルインターフェースを提供します。アプリケーションは既存の NFS プロトコルでアクセスし、ファイルゲートウェイがローカルキャッシュを管理しながらバックグラウンドで S3 にデータを保存・同期します。アプリケーションの変更なしにデータを AWS S3 に保存できます。\n\nA: アプリケーションの書き直しは「変更できない」という制約に反します。\n\nC: Amazon EFS は Direct Connect 経由でマウント可能ですが、NFS プロトコルを使ってオンプレミスから直接アクセスするには特別な設定が必要で、EFS のデータは S3 ではなく EFS に保存されます。S3 への保存要件を満たしません。\n\nD: Amazon S3 はオブジェクトストレージで、直接 NFS マウントする標準機能はありません（AWS が公開している NFS マウント機能は存在しません）。"
    },
    {
      "id": "q129",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でコンテナ化されたアプリケーションを Amazon ECS Fargate で運用しており、アプリケーションの起動時間が遅いという問題があります。コンテナイメージのサイズが 3GB あり、ECR からのプル時間が起動の大部分を占めています。コンテナの起動時間を短縮するには、どの方法が最も効果的ですか？",
      "choices": [
        "コンテナイメージを圧縮して S3 に保存し、起動時に展開する",
        "Amazon ECR のイメージレイヤーキャッシュを活用するよう Dockerfile を最適化し、頻繁に変更されるレイヤーを最後に配置する。さらに、Amazon ECR に保存するイメージを OCI インデックスと Lazy Loading（SOCI: Seek-Optimized Container Image）を使用することで、イメージ全体のダウンロード完了前にコンテナを起動する",
        "コンテナを事前に大量に起動しておき、リクエストが来たら既存のコンテナを使用する",
        "Fargate から EC2 のオートスケーリングに移行し、AMI にコンテナイメージを焼き込む"
      ],
      "answer": [
        1
      ],
      "explanation": "Dockerfile の最適化（変更頻度の低いレイヤーを先に配置）でレイヤーキャッシュを活用できます。AWS は ECS Fargate で SOCI（Seek-Optimized Container Image）インデックスをサポートしており、イメージ全体のダウンロードを待たずにコンテナを起動（Lazy Loading）できます。3GB のイメージでも数秒以内の起動が可能になります。またマルチステージビルドでイメージサイズそのものを削減することも重要です。\n\nA: S3 への保存と展開は ECR より遅く、コンテナ起動のフローを複雑にします。\n\nC: 事前起動は高い待機コストが発生します。Fargate のサーバーレスの特性を失うことになります。\n\nD: EC2 への移行は AMI への焼き込みは可能ですが、Fargate のマネージドな特性を失い、EC2 クラスターの管理負荷が生じます。"
    },
    {
      "id": "q130",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働するアプリケーションについて、セキュリティチームから「GitHub リポジトリに AWS のアクセスキーやシークレットが含まれたコードがコミットされた」という報告を受けました。現在の AWS アクセスキーを即座に無効化し、将来の情報漏洩を防ぐための対策を講じたいと考えています。最も包括的な対応策はどれですか？",
      "choices": [
        "GitHub のリポジトリを Private に変更し、アクセスを制限する",
        "漏洩したアクセスキーを即座に AWS コンソールで無効化（または削除）し、IAM アクセスアドバイザーで不審なアクセスがなかったか確認する。CloudTrail で漏洩期間中の API アクティビティを調査する。将来の防止策として、AWS Secrets Manager と AWS IAM Identity Center（EC2 には IAM ロール）を使い、アクセスキーを廃止する。GitHub の Secret Scanning と Amazon CodeGuru Reviewer でコード内のシークレット検出を自動化する",
        "GitHub のコミット履歴からアクセスキーを削除し、リポジトリを再プッシュする",
        "アクセスキーのローテーションを毎月実施するよう IAM パスワードポリシーを変更する"
      ],
      "answer": [
        1
      ],
      "explanation": "漏洩したアクセスキーへの対応は多層的なアプローチが必要です。①即時無効化でリスクを排除、②CloudTrail での調査で被害範囲を特定、③IAM ロールへの移行でアクセスキー廃止、④自動スキャンツールで再発防止というプロセスが包括的な対応です。GitHubでのSecret Scanning（GitHub の機能）や Amazon CodeGuru Reviewer でコードのシークレット漏洩を事前に検出する仕組みも重要です。\n\nA: リポジトリを Private にするだけではアクセスキーはまだ有効であり、既に不正使用されている可能性があります。即時の無効化が最優先です。\n\nC: Git の歴史からシークレットを削除することは重要ですが、漏洩期間中の不正アクセスの調査と現在のキーの無効化を先に行う必要があります。また Git の歴史の書き換えは単純ではありません。\n\nD: IAM パスワードポリシーはコンソールサインインに関するもので、アクセスキーのローテーションには直接対応していません。"
    },
    {
      "id": "q131",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS への移行計画を検討しており、まず業務に支障のない非本番アプリケーションから移行し、その後に本番システムを移行する「Wave（ウェーブ）移行」アプローチを採用しています。AWS Migration Hub を使って移行の進捗を追跡していますが、各 Wave のサーバー群の依存関係に基づいて移行グループを整理したいと考えています。最も効率的な方法はどれですか？",
      "choices": [
        "すべてのサーバーを一度に Migration Hub に登録し、手動で Wave ごとにグループを作成する",
        "AWS Application Discovery Service のエージェントで収集した依存関係データを Migration Hub にインポートし、Migration Hub の「グループ」機能でサーバーを依存関係に基づいて自動的にグループ化する。各グループ（アプリケーション）を Wave に割り当て、Migration Hub でステータスを追跡する",
        "Excel スプレッドシートで依存関係マトリクスを手動で作成し、Wave の計画を立てる",
        "移行を開始し、依存関係の問題が発生した時点で対処する"
      ],
      "answer": [
        1
      ],
      "explanation": "Application Discovery Service が収集したネットワーク接続データを Migration Hub に統合すると、サーバー間の依存関係グラフが可視化されます。Migration Hub のアプリケーショングループ機能を使って依存するサーバーをグループ化し、各グループを Wave に割り当てることで、依存関係が崩れない順序での移行計画が立てられます。\n\nA: 手動グループ作成は可能ですが、依存関係データが自動収集されているならそれを活用するべきです。大量のサーバーを手動グループ化するのは非効率です。\n\nC: Excel での手動作成は正確性が低く、大量のサーバーでは現実的ではありません。Discovery Service の自動収集データを活用する方が効率的です。\n\nD: 依存関係を事前に把握せずに移行することは、本番環境での障害リスクを大幅に高めます。計画フェーズでの依存関係分析は必須です。"
    },
    {
      "id": "q132",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で高可用性のメッセージキューシステムを構築しています。プロデューサーアプリケーションが大量のジョブを送信し、複数のコンシューマーが並行して処理します。一部のジョブは優先度が高く、他のジョブより先に処理される必要があります。また、ジョブの処理順序は同一優先度内では保証する必要があります。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "単一の Amazon SQS Standard キューを使い、すべてのジョブを送信する。コンシューマー側でジョブのメタデータを確認し、優先度に基づいてスキップする",
        "優先度ごとに複数の Amazon SQS FIFO キューを作成する（例: high-priority.fifo、normal-priority.fifo）。コンシューマーは高優先度キューを先にポーリングし、空の場合は低優先度キューをポーリングする。FIFO キューで同一優先度内の処理順序を保証する",
        "Amazon Kinesis Data Streams でパーティションキーを使って優先度を分離する",
        "Amazon EventBridge でルールを使って優先度の高いイベントを先に処理する"
      ],
      "answer": [
        1
      ],
      "explanation": "優先度キューパターン（Priority Queue Pattern）では、優先度ごとに別のキューを作成し、コンシューマーが高優先度キューから先に消費します。SQS FIFO キューは同一メッセージグループ内の順序を保証するため、同一優先度内の処理順序も確保できます。このパターンは AWS の Well-Architected Framework でも推奨されています。\n\nA: 単一 SQS Standard キューでのコンシューマー側フィルタリングは非効率で、高優先度ジョブが大量の低優先度メッセージの後ろに埋もれる可能性があります。また SQS Standard は順序保証がありません。\n\nC: Kinesis はストリーム処理向けで、ジョブキューとしての優先度管理や処理の可視性タイムアウトなどの機能は SQS に劣ります。\n\nD: EventBridge はイベントルーティングに優れますが、優先度付きキューの機能（順序保証、可視性タイムアウト、DLQ）は SQS の方が適しています。"
    },
    {
      "id": "q133",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境において、AWS Lambda 関数の実行ロールに付与される権限の上限を組織レベルで制限したいと考えています。特定のサービス（例: ec2:TerminateInstances）は Lambda からは絶対に呼び出せないようにし、たとえ開発者が Lambda の実行ロールにその権限を付与しても効果がないようにしたいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "AWS Lambda のリソースベースのポリシーで ec2:TerminateInstances を Deny する",
        "Organizations の SCP で ec2:TerminateInstances を Deny する際に、aws:CalledVia 条件キーで Lambda サービスからの呼び出しに限定して Deny する。または、SCP で Lambda が引き受けるロールに対してより広い Deny を設定し、実行ロールへの権限付与自体を組織的に制限する",
        "Lambda 関数のコードレビューで ec2:TerminateInstances の呼び出しが含まれていないか確認する",
        "IAM パーミッションバウンダリーを全 Lambda 実行ロールに設定し、ec2:TerminateInstances を含めないようにする"
      ],
      "answer": [
        1
      ],
      "explanation": "SCP は Organizations の OU やアカウントに適用され、配下のすべての IAM プリンシパル（Lambda 実行ロールを含む）の権限の上限を制限します。SCP で ec2:TerminateInstances を Deny すると、たとえ Lambda 実行ロールにその権限が付与されていても実際には呼び出しが拒否されます。aws:CalledVia 条件を使うと Lambda サービスからの呼び出しのみに制限を絞ることも可能です。\n\nA: Lambda のリソースベースポリシーは Lambda を呼び出す権限を制御するものであり、Lambda が他の AWS サービスを呼び出す権限の制限には使えません。\n\nC: コードレビューは人的プロセスで、確実性がなく、デプロイ後の変更には対応できません。\n\nD: パーミッションバウンダリーは有効ですが、全 Lambda 実行ロールに手動で設定するのは管理負荷が高く、設定漏れのリスクがあります。SCP の方が組織全体への強制適用が確実です。"
    },
    {
      "id": "q134",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する Web アプリケーションで、ユーザーがアップロードした画像を Amazon S3 に保存し、CloudFront で配信しています。ユーザーが画像を削除した際に、CloudFront のエッジキャッシュに古い画像が残り続けるという問題が発生しています。削除後にエッジキャッシュを即座に無効化するには、どの方法が最も適切ですか？",
      "choices": [
        "CloudFront の TTL（Time to Live）を 0 秒に設定して、すべてのリクエストをオリジンに転送する",
        "S3 の削除イベントを EventBridge で受信し、Lambda 関数で CloudFront の Invalidation API（CreateInvalidation）を呼び出して該当するオブジェクトパスのキャッシュを無効化する",
        "CloudFront のキャッシュポリシーで Cache-Control: no-cache ヘッダーを設定する",
        "S3 バケットのバージョニングを有効化し、削除されたオブジェクトのバージョンを CloudFront から参照させる"
      ],
      "answer": [
        1
      ],
      "explanation": "S3 の削除イベント（s3:ObjectRemoved:Delete）を EventBridge ルールで受信し、Lambda が CloudFront の CreateInvalidation API で削除されたオブジェクトのキャッシュを無効化します。これにより、ユーザーが削除した画像がキャッシュから即座に除去されます。Invalidation は特定パスを指定してコスト効率よく実行できます。\n\nA: TTL を 0 に設定すると全リクエストがオリジンに転送され、CloudFront のキャッシュの恩恵が失われ、オリジンサーバーへの負荷が大幅に増加します。\n\nC: Cache-Control: no-cache ヘッダーは新しいコンテンツには効果的ですが、既にキャッシュされた古いオブジェクトのキャッシュを即座に除去することはできません。\n\nD: バージョニングは削除されたオブジェクトの復元には使えますが、CloudFront のキャッシュ無効化には関係ありません。"
    },
    {
      "id": "q135",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が大規模なモノリシック Java アプリケーション（Spring Boot）を段階的にマイクロサービス化する計画を立てています。現在のアプリケーションはリレーショナルデータベース（PostgreSQL）に強く依存しており、モノリス内の多数のモジュールが同じテーブルを共有しています。モダナイゼーションの第一ステップとして、新しい機能は独立したマイクロサービスとして開発し、将来的には既存のモノリスの機能も順次切り出す予定です。この「ストラングラーフィグ」アプローチで最も一般的な技術的課題はどれですか？",
      "choices": [
        "マイクロサービスの開発言語はモノリスと同じ Java にする必要がある",
        "モノリスと新しいマイクロサービスが同じデータベーステーブルを共有すると、データの整合性とスキーマ管理が複雑になる。解決策として、新しいマイクロサービスは独自のデータベース（Database per Service パターン）を持ち、モノリスとの同期は非同期イベント（EventBridge、SNS/SQS）または API レイヤー経由で行うことが推奨される",
        "API Gateway は既存のモノリスのエンドポイントと新しいマイクロサービスのエンドポイントを同時に管理できない",
        "コンテナ化されたマイクロサービスは EC2 ベースのモノリスと共存できない"
      ],
      "answer": [
        1
      ],
      "explanation": "ストラングラーフィグパターンで最も一般的な技術的課題は「共有データベース（Shared Database）」問題です。モノリスと新しいマイクロサービスが同じテーブルを共有すると、スキーマ変更の影響範囲が広がり、マイクロサービスの独立したデプロイが困難になります。Database per Service パターン（各サービスが専用 DB を持つ）と非同期イベント連携がこの問題の標準的な解決策です。\n\nA: マイクロサービスは任意の言語で開発できます（多言語アーキテクチャ）。モノリスと同じ言語にする必要はありません。\n\nC: API Gateway はモノリスと新しいマイクロサービスの両方をバックエンドとして設定でき、ルーティングルールで切り替えられます。\n\nD: コンテナ化されたマイクロサービスと EC2 ベースのモノリスは完全に共存できます。ネットワークレベルでの通信が可能です。"
    },
    {
      "id": "q136",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "medium",
      "question": "ある企業が AWS 上でマルチリージョンのアクティブ-アクティブ Webアプリケーションを構築しており、どちらのリージョンのユーザーも最小のレイテンシーでアクセスできるよう設計しています。ユーザーのリクエストは常に最も近い AWS リージョンに転送し、一方のリージョンが完全に障害になった場合は自動的にもう一方のリージョンにフェイルオーバーする必要があります。最も適切なグローバルルーティング設計はどれですか？",
      "choices": [
        "Route 53 のシンプルルーティングで単一のエンドポイントに全トラフィックを転送する",
        "Route 53 のレイテンシーベースルーティングポリシーで各リージョン（us-east-1、eu-west-1）の ALB/API Gateway に Alias レコードを設定し、ヘルスチェックを各エンドポイントに設定する。ヘルスチェックが失敗したリージョンは自動的にルーティングから除外され、正常なリージョンにフェイルオーバーする",
        "CloudFront のオリジングループを設定し、プライマリオリジンが失敗した場合にセカンダリオリジンに自動フェイルオーバーする",
        "各リージョンの IP アドレスをハードコードし、ユーザーが手動でリージョンを選択できる UI を提供する"
      ],
      "answer": [
        1
      ],
      "explanation": "Route 53 のレイテンシーベースルーティングは、DNS クエリの発信元から各リージョンへのレイテンシーを測定し、最も低レイテンシーのリージョンに自動転送します。ヘルスチェックを組み合わせると、障害リージョンは DNS 応答から自動除外され、正常なリージョンにフェイルオーバーします。TTL を短く（30〜60秒）設定することで障害時の切り替え時間を短縮できます。\n\nA: シンプルルーティングは単一エンドポイントのみで、マルチリージョンへのルーティングやフェイルオーバーに対応していません。\n\nC: CloudFront のオリジングループフェイルオーバーは有効ですが、CloudFront はコンテンツキャッシュが主目的であり、動的 API のマルチリージョン分散にはRoute 53 レイテンシーベースルーティングの方が直接的です。\n\nD: ハードコードされた IP と手動リージョン選択は自動フェイルオーバーに対応しておらず、ユーザー体験も低下します。"
    },
    {
      "id": "q137",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で稼働する Amazon ECS コンテナの Secret 管理を改善したいと考えています。現在、データベースのパスワードや API キーなどの機密情報がコンテナの環境変数としてプレーンテキストでタスク定義に埋め込まれています。最も安全で運用しやすい方法に移行するには、どのアプローチが適切ですか？",
      "choices": [
        "環境変数をBase64エンコードしてタスク定義に埋め込む",
        "AWS Secrets Manager または Systems Manager Parameter Store（SecureString）にシークレットを格納し、ECS タスク定義の「secrets」フィールドで参照する。ECS はタスク起動時に自動的にシークレットを取得してコンテナに環境変数として注入する。タスクの IAM ロールに Secrets Manager または SSM への読み取り権限を付与する",
        "シークレットを S3 バケットに保存し、コンテナの起動スクリプトで S3 から取得する",
        "ECS クラスターを暗号化された EFS にマウントし、シークレットをファイルとして保存する"
      ],
      "answer": [
        1
      ],
      "explanation": "ECS タスク定義の secrets フィールドで Secrets Manager または SSM Parameter Store の ARN を参照することで、ECS がタスク起動時に自動的にシークレットを取得してコンテナに注入します。シークレットはタスク定義には保存されず、IAM ロールによるアクセス制御と Secrets Manager の自動ローテーション機能も活用できます。\n\nA: Base64 エンコードは暗号化ではなくエンコードであり、容易にデコードできます。セキュリティの向上にはなりません。\n\nC: S3 からの取得も機能しますが、起動スクリプトのカスタム実装が必要で、ECS ネイティブの secrets 統合より管理が複雑です。また S3 のアクセスポリシーとライフサイクル管理も別途必要です。\n\nD: EFS へのファイル保存は可能ですが、ECS の secrets フィールドのネイティブ統合より複雑で、Secrets Manager の自動ローテーション機能も利用できません。"
    },
    {
      "id": "q138",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境で、AWS のサービスカタログを使って標準化されたインフラパターン（VPC、EC2、RDS の組み合わせ）を開発チームにセルフサービスで提供したいと考えています。中央の IT チームが製品を定義・管理し、開発チームは承認済みの製品のみをデプロイできるようにしたいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各開発チームに CloudFormation の全権限を付与し、自由にインフラを構築させる",
        "AWS Service Catalog で製品（Product）をポートフォリオ（Portfolio）として管理する。中央アカウントで製品（CloudFormation テンプレート）を定義し、RAM または Service Catalog の Portfolio 共有機能でメンバーアカウントのポートフォリオとして公開する。開発チームには Service Catalog からの製品起動権限のみを付与し、SCP で直接の CloudFormation スタック作成を制限する",
        "Git リポジトリで CloudFormation テンプレートを管理し、開発チームがリポジトリをクローンしてデプロイする",
        "AWS Systems Manager Automation ドキュメントで標準インフラパターンを定義し、開発チームが Automation を実行する"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Service Catalog のポートフォリオ共有機能では、中央アカウントで定義した製品（CloudFormation テンプレート）を Organizations のメンバーアカウントに共有できます。開発チームには Service Catalog からの製品起動権限のみを付与し、SCP で直接の CloudFormation 操作を制限することで、承認済みの製品のみデプロイできるセルフサービス環境が実現します。\n\nA: 全権限を付与すると、承認済み製品以外のインフラも自由に構築でき、ガバナンスが機能しません。\n\nC: Git リポジトリからの自由なデプロイは承認済み製品のみに制限する要件を満たしません。テンプレートの変更や追加が容易に行えます。\n\nD: Systems Manager Automation は有効ですが、製品カタログ・バージョン管理・アクセス制御という Service Catalog の特化した機能が利用できません。"
    },
    {
      "id": "q139",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で大規模なデータ処理パイプラインを設計しており、1 日に 10 億件のイベントを処理する必要があります。各イベントは 1KB 以下で、5 分以内にリアルタイム処理と、90 日分の履歴データを分析するバッチ処理の両方が必要です。ストリーム処理とバッチ処理を統合した「ラムダアーキテクチャ」を AWS で実装するには、どの設計が最も適切ですか？",
      "choices": [
        "Amazon SQS で全イベントを受信し、Lambda で処理して RDS に保存する",
        "Amazon Kinesis Data Streams でリアルタイムストリームを受信し、Kinesis Data Analytics（Apache Flink）でストリーム処理（速度層）を行う。Kinesis Data Firehose で全イベントを S3 の Parquet 形式で保存し（バッチ層）、定期的に Glue ETL ジョブで集計・加工して S3 データレイクを構築する。Athena でアドホック分析を提供するラムダアーキテクチャを実装する",
        "Amazon RDS に全イベントを書き込み、リアルタイムクエリとバッチクエリを同一データベースで処理する",
        "全イベントを DynamoDB に書き込み、DynamoDB Streams でバッチ処理をトリガーする"
      ],
      "answer": [
        1
      ],
      "explanation": "ラムダアーキテクチャ（Lambda Architecture）は速度層（Speed Layer）とバッチ層（Batch Layer）で構成されます。Kinesis Data Streams + Flink の速度層は 5 分以内のリアルタイム処理を担当し、S3 + Glue のバッチ層は 90 日分の履歴データの完全処理を担当します。Kinesis Firehose で S3 への自動保存が実現し、1 日 10 億件のイベントにも対応できます。\n\nA: SQS + Lambda + RDS は大規模なイベント処理（10 億件/日）には RDS の書き込みスケールが不十分で、ラムダアーキテクチャのバッチ層も実装されていません。\n\nC: 単一 RDS に全イベントを書き込むことは、1 日 10 億件のスループットに対してストレージとクエリ性能の両面で限界があります。\n\nD: DynamoDB は高スループット書き込みに対応しますが、90 日分の大規模なバッチ分析には Athena のようなサーバーレスクエリエンジンが適しており、DynamoDB の全スキャンは高コストです。"
    },
    {
      "id": "q140",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で ALB + EC2 Auto Scaling グループを使ったウェブアプリケーションを運用しています。Auto Scaling の Scale-out 後、新しいインスタンスが起動してもアプリケーションの初期化（設定読み込み、キャッシュウォームアップ）に 5〜10 分かかるため、起動直後のインスタンスにトラフィックが転送されると高い応答時間が発生しています。この問題を解決するための最も適切な設定はどれですか？",
      "choices": [
        "ALB のヘルスチェック間隔を 60 秒に延長する",
        "Auto Scaling グループのウォームアップ期間（Instance Warm-up）を設定し、新しいインスタンスがウォームアップ期間中はスケーリングメトリクスにカウントされないようにする。ALB のターゲットグループのヘルスチェックパスを、アプリケーションの初期化完了を確認できるエンドポイント（例: /health/ready）に設定し、初期化が完了したインスタンスのみをトラフィック受信可能にする",
        "スポットインスタンスを使って起動時間を短縮する",
        "Auto Scaling の最小インスタンス数を増やして、常にキャパシティを確保する"
      ],
      "answer": [
        1
      ],
      "explanation": "ALB ターゲットグループのヘルスチェックに Readiness チェックエンドポイント（/health/ready）を設定することで、アプリケーションの初期化完了前はヘルスチェックが Healthy にならず、ALB はトラフィックを転送しません。Auto Scaling のウォームアップ期間設定で、起動中のインスタンスを既存のスケーリングメトリクスから除外し、誤ったスケールイン/アウトを防ぎます。\n\nA: ヘルスチェック間隔の延長は検出を遅くするだけで、起動直後のトラフィック問題を解決しません。\n\nC: スポットインスタンスは起動時間の短縮には直接影響しません。アプリケーションの初期化時間は変わりません。\n\nD: 最小インスタンス数の増加はキャパシティを増やしますが、起動直後の高応答時間問題を解決しません。コストも増加します。"
    },
    {
      "id": "q141",
      "type": "multiple",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業がオンプレミスからクラウドへの移行において「6 つの R」（Rehost、Replatform、Repurchase、Refactor、Retire、Retain）の戦略を活用しています。以下のシナリオに最も適した移行戦略（R 戦略）の組み合わせを2つ選択してください。①レガシーの社内 HR システム（パッケージソフト）は、クラウド版の SaaS（Workday）が存在するため移行対象。②10 年物のカスタムCOBOL 基幹システムは現行維持とし、今後 2 年で再評価する予定。",
      "choices": [
        "①HR システム: Repurchase（SaaS への移行）",
        "①HR システム: Rehost（EC2 への単純移行）",
        "②COBOL システム: Retain（現状維持）",
        "②COBOL システム: Retire（廃止）",
        "①HR システム: Refactor（クラウドネイティブに再構築）"
      ],
      "answer": [
        0,
        2
      ],
      "explanation": "Repurchase（A）は既存のシステムを廃止して SaaS 製品（Workday 等）に移行する戦略です。クラウド版の SaaS が存在する場合、カスタム開発・運用のコストを SaaS の利用コストと比較して Repurchase が最もコスト効率的なことが多いです。Retain（C）は現時点では移行せずに現状維持する戦略で、今後 2 年で再評価する予定のシステムに適しています。\n\nB: Rehost は既存システムをそのまま EC2 に移行する戦略で、クラウド版 SaaS が存在するケースではより多くの価値を生む Repurchase の方が適しています。\n\nD: Retire は使用されていないまたは不要なシステムを廃止する戦略です。2 年間維持する予定のシステムには適しません。\n\nE: Refactor はクラウドネイティブに再設計する最も労力のかかる戦略で、既に SaaS が存在する HR システムに適用する必要はありません。"
    },
    {
      "id": "q142",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上でハイブリッドアーキテクチャを設計しており、オンプレミスのデータウェアハウスのデータを AWS の機械学習パイプラインで活用したいと考えています。データは毎日更新され、ML トレーニングのために S3 に取り込む必要があります。オンプレミスのデータウェアハウスは Teradata で、Direct Connect 経由で接続されています。最小限の開発コストで自動化されたデータパイプラインを構築するには、どのアーキテクチャが最適ですか？",
      "choices": [
        "オンプレミスの Teradata から毎日手動でデータをエクスポートし、SFTP で AWS S3 にアップロードする",
        "AWS Glue の JDBC コネクターを使用して Teradata に接続し、毎日スケジュール実行される Glue ETL ジョブでデータを S3 に抽出・変換・ロードする。Glue のジョブブックマーク機能で差分データのみを抽出し、増分ロードを実現する",
        "Amazon Kinesis Data Firehose を Direct Connect 経由でオンプレミスから直接呼び出して S3 にストリーミング取り込みする",
        "AWS Database Migration Service（DMS）を継続的レプリケーションモードで設定し、Teradata の全変更データをリアルタイムで S3 に取り込む"
      ],
      "answer": [
        1
      ],
      "explanation": "AWS Glue は JDBC コネクターで Teradata など多くのデータウェアハウスに接続できます。Glue ETL ジョブをスケジュール実行（EventBridge またはトリガー）で毎日自動化し、ジョブブックマーク機能で前回の実行以降に更新されたデータのみを抽出する増分ロードが可能です。Direct Connect 経由でのオンプレミス接続にも対応しています。\n\nA: 手動エクスポートと SFTP アップロードは自動化されておらず、運用負荷が高くなります。\n\nC: Kinesis Data Firehose は AWS エンドポイントへのデータ取り込みに使いますが、オンプレミスから Direct Connect 経由で Firehose をトリガーするには別途エージェントや Lambda が必要で、バッチデータには Glue の方が適しています。\n\nD: DMS の継続的レプリケーションは MySQL/Oracle/PostgreSQL 等の主要 RDBMS でサポートが充実していますが、Teradata からの CDC（変更データキャプチャ）は制限が多く、毎日のバッチ取り込みには Glue の方が信頼性が高いです。"
    },
    {
      "id": "q143",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "medium",
      "question": "ある企業が AWS 上で Amazon RDS for PostgreSQL を運用しており、定期的に実行される重いクエリがデータベースのパフォーマンスを低下させています。どのクエリが遅く、何が原因かを特定したいと考えています。また、インデックスが適切に使われているかも確認したいと考えています。最小限の設定変更で詳細なクエリ分析を実施するには、どのサービスが最も適切ですか？",
      "choices": [
        "RDS のインスタンスメトリクス（CPU、メモリ）を CloudWatch で確認し、高い時間帯を特定する",
        "Amazon RDS Performance Insights を有効化し、DBLoad メトリクスと待機イベント（Wait Events）を分析する。Performance Insights のトップ SQL ビューで最も負荷の高いクエリを特定し、Explain Plan で実行計画とインデックスの使用状況を確認する",
        "RDS のスロークエリログを有効化し、ログファイルを手動でダウンロードして分析する",
        "RDS の自動スナップショットを確認し、スナップショット作成時間からパフォーマンスの傾向を把握する"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon RDS Performance Insights はリアルタイムおよび過去 7 日間（デフォルト）のデータベース負荷を可視化します。DBLoad（データベースが処理しているアクティブセッション数）、待機イベント（どのリソースを待っているか）、トップ SQL（最も負荷の高いクエリ）を GUI でドリルダウン分析できます。追加のソフトウェアなしに数クリックで有効化でき、RDS の大幅な設定変更も不要です。\n\nA: CloudWatch のインスタンスメトリクスはリソース使用率の確認には有効ですが、どのクエリが原因かを特定する SQL レベルの分析はできません。\n\nC: スロークエリログの有効化は有効ですが、log_min_duration_statement パラメーターの設定が必要で、ログファイルの手動ダウンロードと分析の手間があります。Performance Insights の方がはるかにシンプルです。\n\nD: スナップショットはバックアップ目的であり、クエリパフォーマンス分析には一切使えません。"
    },
    {
      "id": "q144",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations で管理するマルチアカウント環境において、財務チームが全アカウントにわたるコストを正確に把握できるよう、コスト配分タグの統一と Chargeback（チャージバック）レポートの自動化を実現したいと考えています。全アカウントのコストを部門・プロジェクト・環境（本番/開発）別に集計し、月次で各部門に請求書を自動発行したいと考えています。最も適切なアーキテクチャはどれですか？",
      "choices": [
        "各アカウントの担当者が月末に Cost Explorer でコストを確認し、Excel で集計して財務部門に送付する",
        "AWS Organizations の管理アカウントでコスト配分タグ（aws:CostCenter、aws:Project、aws:Environment）を有効化し、全アカウントのリソースに一貫したタグ付けを強制する SCP を設定する。Cost and Usage Report（CUR）を S3 に日次エクスポートし、AWS Glue と Amazon Athena でタグ別のコスト集計クエリを作成する。Amazon QuickSight で部門・プロジェクト・環境別のチャージバックダッシュボードを構築し、月次で自動レポートを各部門のメールアドレスに送信する",
        "AWS Billing and Cost Management コンソールでコスト配分タグを手動で設定し、月末に手動でレポートをダウンロードする",
        "サードパーティのクラウドコスト管理ツール（Cloudability、CloudHealth 等）を導入し、チャージバックレポートを生成する"
      ],
      "answer": [
        1
      ],
      "explanation": "組織全体のチャージバック自動化には複数の要素が必要です。①SCP でタグ付けを強制（コスト配分タグなしのリソース作成を Deny）、②CUR で最も詳細なコストデータを取得、③Athena でタグ別集計クエリを作成、④QuickSight でダッシュボードと自動レポート送信を設定。この組み合わせで、月次の手動作業なしに全部門への正確なチャージバックレポートが自動化されます。\n\nA: 手動集計は不正確で、規模が大きくなるほど作業負荷が増大します。\n\nC: 手動でのタグ設定とレポートダウンロードは自動化されておらず、規模に対応できません。\n\nD: サードパーティツールは機能的ですが、追加コストが発生します。AWS ネイティブのサービス組み合わせで同等の機能を実現できます。"
    },
    {
      "id": "q145",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で毎秒 1 万件のトランザクションを処理するオンラインバンキングシステムを設計しています。すべてのトランザクションは ACID 準拠のデータベースに記録される必要があり、かつリアルタイムで不正取引の検知が必要です。さらに、トランザクション履歴は 7 年間保存が必要です。コスト、性能、コンプライアンスのすべてを満たす最も適切なアーキテクチャはどれですか？",
      "choices": [
        "Amazon RDS Aurora Multi-AZ に全トランザクションを記録し、7 年間のデータを同一クラスターで保持する",
        "Amazon Aurora PostgreSQL（Multi-AZ）でリアルタイムトランザクション処理を行い、不正検知には Amazon Kinesis Data Streams + SageMaker リアルタイム推論エンドポイントを組み合わせる。Amazon DynamoDB Streams から EventBridge 経由でキャッシュを更新する。7 年間の保存は Aurora から Kinesis Data Firehose で S3 に定期エクスポートし、S3 Intelligent-Tiering と Object Lock（COMPLIANCE モード、7 年保持）で長期保存とコスト最適化を実現する",
        "Amazon DynamoDB でトランザクションを処理し、DynamoDB の TTL で 7 年後に自動削除する",
        "単一の Amazon RDS for PostgreSQL インスタンスで全機能を処理する"
      ],
      "answer": [
        1
      ],
      "explanation": "オンラインバンキングの要件は複数の AWS サービスの組み合わせで対応します。Aurora PostgreSQL Multi-AZ は毎秒 1 万件の書き込みと ACID トランザクションに対応し、Kinesis + SageMaker でリアルタイム不正検知を並行処理します。7 年間の長期保存は S3 + Object Lock（COMPLIANCE モード）でコンプライアンスと改ざん防止を実現し、Intelligent-Tiering でコストを最適化します。\n\nA: 7 年間のデータを Aurora に保持すると膨大なストレージコストと性能低下が発生します。Aurora はトランザクション処理に最適化されており、長期アーカイブには S3 が適しています。\n\nC: DynamoDB は ACID トランザクションをサポートしていますが（TransactWriteItems）、複雑なリレーショナルクエリやレポート生成には PostgreSQL が適しています。また DynamoDB の TTL での削除は COMPLIANCE 要件（改ざん防止）を満たしません。\n\nD: 単一 RDS インスタンスは毎秒 1 万件のトランザクションの SPOF となり、高可用性要件も満たしません。"
    },
    {
      "id": "q146",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "hard",
      "question": "ある企業が AWS への移行を進めており、オンプレミスの Web サーバー群（100 台の Apache + Tomcat）を最小限の変更で AWS に移行したいと考えています。移行後は Auto Scaling でトラフィックに応じてインスタンス数を自動調整し、コストを最適化したいと考えています。また、現在の Apache の設定ファイル（バーチャルホスト設定、.htaccess など）をなるべくそのまま使用したいと考えています。最も適切な移行先はどれですか？",
      "choices": [
        "すべてのリクエスト処理を AWS Lambda に移行し、サーバーレスアーキテクチャを実現する",
        "Amazon EC2 Auto Scaling グループに Apache + Tomcat のカスタム AMI を作成し、ALB と組み合わせてデプロイする。AWS Application Migration Service（MGN）でオンプレミスの Web サーバーをリフト＆シフトし、Auto Scaling グループのスケーリングポリシーで CPU 使用率またはリクエスト数に基づいて自動スケールする",
        "AWS Elastic Beanstalk の Tomcat プラットフォームで新しい環境を作成し、WAR ファイルをデプロイする",
        "Amazon CloudFront + S3 の静的ホスティングに移行し、動的コンテンツは API Gateway + Lambda に変更する"
      ],
      "answer": [
        1
      ],
      "explanation": "EC2 Auto Scaling グループへのリフト＆シフトが「最小限の変更」要件に最も適しています。MGN でオンプレミス VM をほぼそのまま EC2 に移行し、カスタム AMI として Auto Scaling グループに登録します。既存の Apache 設定ファイル（バーチャルホスト、.htaccess）もそのまま引き継げます。ALB と Auto Scaling の組み合わせでスケーリングとコスト最適化を実現します。\n\nA: Lambda への移行は Apache/Tomcat のアプリケーションを全面書き直しする必要があり「最小限の変更」要件に大きく反します。\n\nC: Elastic Beanstalk は Tomcat WAR デプロイをサポートしますが、Apache のバーチャルホスト設定や .htaccess をそのまま使うには追加設定が必要で、EC2 への直接移行よりも変更が多くなります。\n\nD: 静的ホスティングへの移行は動的コンテンツ（Tomcat）の処理方法の大幅な変更が必要で「最小限の変更」要件に反します。"
    },
    {
      "id": "q147",
      "type": "single",
      "domain": "既存のソリューションの継続的な改善",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で Amazon S3 バケットを使って機密データを保存しています。セキュリティ監査で「S3 バケットに不審なデータアクセスパターンがある」という報告を受けました。具体的には、通常は発生しない大量のデータのダウンロード（exfiltration の疑い）と、新しい IP アドレスからのアクセスが検出されました。これらの脅威をリアルタイムで継続的に検知・アラートするためのアーキテクチャはどれですか？",
      "choices": [
        "S3 アクセスログを S3 に有効化し、週次で Athena でクエリして不審なアクセスを確認する",
        "Amazon GuardDuty の S3 保護（S3 Protection）を有効化し、S3 データイベント（Object-level API logging）の機械学習ベースの異常検知で大量ダウンロードや新しい IP からのアクセスを自動検出する。GuardDuty の検出結果を Security Hub に集約し、EventBridge で高深刻度の検出時に SNS でリアルタイムアラートを送信する",
        "S3 バケットに AWS WAF を設定して不審なリクエストをブロックする",
        "CloudTrail Data Events を S3 バケットに有効化し、手動でログをレビューする"
      ],
      "answer": [
        1
      ],
      "explanation": "Amazon GuardDuty の S3 Protection は CloudTrail S3 データイベントログを機械学習で分析し、異常なデータアクセスパターン（大量ダウンロード、認証情報が侵害されたと思われる異常な IP からのアクセス等）を自動検知します。Security Hub + EventBridge + SNS の統合でリアルタイムアラートを実現します。GuardDuty の機械学習モデルはベースラインを自動学習するため、ルールの手動定義が不要です。\n\nA: 週次確認は「リアルタイム検知」要件を満たしません。インシデント発生から検知まで最大 1 週間かかる可能性があります。\n\nC: AWS WAF は Web アプリケーション（HTTP/HTTPS）への受信リクエストのフィルタリングに使うものであり、S3 のデータアクセスパターンの異常検知には対応していません。\n\nD: CloudTrail Data Events の手動レビューは検知に時間がかかり、自動化されておらず「リアルタイムアラート」要件を満たしません。"
    },
    {
      "id": "q148",
      "type": "single",
      "domain": "複雑な組織に対応するソリューションの設計",
      "difficulty": "hard",
      "question": "ある企業が AWS Organizations を使って管理するマルチアカウント環境で、本番環境に対するすべての変更（インフラ変更、デプロイ）に対して変更管理プロセスを適用したいと考えています。本番アカウントへの手動変更（コンソールやCLIからの直接操作）を完全に禁止し、すべての変更はコードとして CI/CD パイプライン経由でのみ適用できるようにしたいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "本番アカウントのすべての IAM ユーザーのパスワードを無効化する",
        "IAM Identity Center でユーザーの本番アカウントへの Read Only 権限のみを付与し、実際の変更はデプロイ専用の IAM ロール（PowerUserAccess）のみが持つ。このデプロイロールは CI/CD パイプライン（CodePipeline）のサービスロールのみが引き受けられるよう信頼ポリシーを設定する。SCP で IAM 経由の変更を制限し、コンソール経由の変更を防ぐ",
        "本番アカウントにルートユーザーのみを残し、変更はルートユーザーが手動で実施する",
        "AWS CloudFormation のドリフト検出を有効化して手動変更を検出し、検出後に管理者に通知する"
      ],
      "answer": [
        1
      ],
      "explanation": "手動変更を禁止するには、人間のユーザーには Read Only 権限のみを付与し、変更権限（PowerUserAccess 等）はパイプラインのサービスロールのみに付与します。デプロイロールの信頼ポリシーで CodePipeline サービスのみが引き受け可能にすることで、人間が直接変更ロールを引き受けることを防ぎます。SCP で追加のガードレールを設定します。\n\nA: パスワードを無効化しても、アクセスキーやロール引き受けによる変更は可能です。包括的な制御にはなりません。\n\nC: ルートユーザーは IAM の上位で SCP も適用されないため、セキュリティ上最も危険なアプローチです。ルートユーザーの使用は AWS が強く禁止しています。\n\nD: CloudFormation ドリフト検出は手動変更を事後検知するものであり、変更の予防はできません。"
    },
    {
      "id": "q149",
      "type": "single",
      "domain": "新しいソリューションのための設計",
      "difficulty": "hard",
      "question": "ある企業が AWS 上で構築した API サービスに対して、特定のクライアント（モバイルアプリ、パートナー API、内部サービス）に異なるレート制限とアクセス権限を設定したいと考えています。モバイルアプリクライアントには毎秒 100 リクエスト、パートナーには毎秒 1,000 リクエスト、内部サービスには無制限のアクセスを許可し、各クライアントの使用状況を個別に監視したいと考えています。最も適切な実装はどれですか？",
      "choices": [
        "すべてのクライアントに同一の API キーを発行し、IP アドレスでクライアントを判別してレート制限を実装する",
        "Amazon API Gateway の使用量プラン（Usage Plan）とクライアント種別ごとに異なる API キーを発行する。モバイルアプリ用・パートナー用・内部サービス用の3つの使用量プランを作成し、それぞれのスロットリング設定とクォータを定義する。CloudWatch メトリクスで API キー別の使用状況を監視し、閾値超過時に SNS アラートを設定する",
        "AWS WAF のレート制限ルールを使用して、全クライアントに同一のレート制限を適用する",
        "各クライアントに別々の API Gateway ステージ（dev、partner、internal）を作成し、ステージごとにスロットリングを設定する"
      ],
      "answer": [
        1
      ],
      "explanation": "API Gateway の使用量プランはクライアント種別ごとに異なるスロットリング（RPS）とクォータ（月間リクエスト数）を定義し、API キーに紐付けることで細かいアクセス制御が実現できます。CloudWatch で API キー別の使用量メトリクスを確認できます。内部サービスはレート制限なし（上限なし）の使用量プランを作成することで対応できます。\n\nA: 同一 API キーでは個別クライアントの制御が不可能で、IP アドレスによる判別は NAT ゲートウェイや CDN を経由する場合に機能しません。\n\nC: AWS WAF のレート制限は IP アドレスベースで全体的な DDoS 対策に使うものであり、クライアント種別ごとの細かいレート制限と使用量監視には対応していません。\n\nD: 別ステージへの分割は API の管理を複雑にし、同じ API リソースを複数回維持する必要があります。使用量プランの方がはるかにシンプルです。"
    },
    {
      "id": "q150",
      "type": "single",
      "domain": "ワークロードの移行とモダナイゼーションの加速",
      "difficulty": "medium",
      "question": "ある企業がオンプレミスのデータセンターから AWS への移行後、インフラのコスト最適化レビューを実施しました。現在 30 台の EC2 インスタンス（m5.2xlarge、On-Demand）が稼働しており、本番ワークロードの安定したベースライン需要（最低 20 台は常に稼働）に加えて、ピーク時に最大 30 台まで増加します。年間コストを最適化するための最も効果的なアプローチはどれですか？",
      "choices": [
        "すべての 30 台を 1 年の On-Demand で維持する",
        "ベースラインの 20 台は 1 年または 3 年の Savings Plans（Compute Savings Plans）または Reserved Instances で割引を受け、ピーク時の追加 10 台は On-Demand または Spot インスタンスで補う。Savings Plans はインスタンスタイプやリージョンの変更に柔軟に対応できるため、将来の構成変更にも適している",
        "すべての 30 台を 3 年 Reserved Instances（Full Upfront）で購入し、最大割引を受ける",
        "すべての 30 台を Spot インスタンスに変更して最大 90% のコスト削減を実現する"
      ],
      "answer": [
        1
      ],
      "explanation": "常に稼働するベースライン（20 台）には Reserved Instances または Savings Plans で大幅な割引（約 40〜70% オフ）を受け、変動するピーク需要（最大 10 台）は On-Demand または Spot インスタンスで柔軟に対応するハイブリッドアプローチが最もコスト効率的です。Savings Plans（Compute Savings Plans）はインスタンスファミリー・リージョン・OS に関係なく適用されるため柔軟性が高いです。\n\nA: すべてを On-Demand で維持することは最もコストが高く、コスト最適化の観点では最も非効率です。\n\nC: すべてを 3 年 RI（Full Upfront）で購入すると、ピーク時の 10 台分が過剰投資になります。30 台すべてが常に稼働するわけではないため、20 台分の RI が適切です。\n\nD: 本番ワークロードをすべて Spot に変更することは、Spot の中断リスクにより本番サービスの信頼性を損ないます。ステートフルな本番サービスには適していません。"
    }
  ]
};
