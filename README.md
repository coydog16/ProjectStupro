# ProjectStupro (プロジェクトスタプロ)

社内 SNS として社員の学習進捗や知見を共有するためのプラットフォームです。

![ProjectStupro Screenshot]

## 📱 主な機能

-   **つぶやき機能** - 学習の進捗報告や日々の気づきを共有
-   **ユーザープロフィール** - 社員のプロフィールや得意技術を表示
-   **認証管理** - ユーザー認証と権限管理

## 🏗️ アーキテクチャ概要

ProjectStupro は**垂直スライス型モジュラーモノリス**アーキテクチャを採用しています。機能ごとにモジュールを分割し、各モジュールは独立したコードベースを持ちます。

### 技術スタック

-   **バックエンド**: Flask 2.2.3 (Python 3.11)
-   **フロントエンド**: React + TypeScript + Vite
-   **CSS**: Tailwind CSS v4
-   **データベース**: PostgreSQL
-   **開発環境**: Docker Compose

### プロジェクト構成

```
app/
├── backend/              # Flaskバックエンド
│   └── src/
│       ├── core/         # 共通コア機能
│       ├── common/       # 汎用ユーティリティ
│       └── modules/      # 機能モジュール
│           ├── auth/     # 認証モジュール
│           ├── feed/     # つぶやき機能モジュール
│           └── users/    # ユーザー管理モジュール
│
└── frontend/             # Reactフロントエンド
    └── src/
        ├── api/          # APIクライアント
        ├── components/   # 共通コンポーネント
        └── features/     # 機能モジュール
            ├── auth/     # 認証機能
            ├── feed/     # つぶやき機能
            └── users/    # ユーザー管理機能
```

## 🚀 環境構築手順

### 前提条件

-   Docker と Docker Compose （DockerDesktop）がインストールされていること。
-   Git クライアントがインストールされていること。
-   Mac/Windowsの場合はLinux仮想環境が用意されていること。

### 初回セットアップ

1. **リポジトリをクローンする**

    ```bash
    git clone https://github.com/yourusername/ProjectStupro.git
    cd ProjectStupro
    ```

2. **環境設定ファイルを作成する**

    ```bash
    # ルートの環境設定ファイルの準備
    cp .env.example .env

    # バックエンド設定ファイルの準備
    cp app/backend/src/config/dev.py.example app/backend/src/config/dev.py
    ```

    ※ 必要に応じて設定ファイルを編集してください

3. **Docker コンテナを起動する**

    ```bash
    # 開発環境の起動
    docker compose up -d
    ```

    > **Note**: コンテナはホストのUID/GIDを自動検出して、権限を自動調整します！特別な設定は必要ありません。
    >
    > 自動検出に問題がある場合のみ、明示的に環境変数を渡してください：
    > ```bash
    > HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose up -d
    > ```

4. **開発サーバーを起動する**

    Dockerコンテナが起動したら、開発サーバー（フロントエンドとバックエンド）を起動します。
    スクリプトランチャーを使うのが便利です：

    ```bash
    # スクリプトランチャーを起動
    ./run_script.sh
    # [メニューから「3. 開発サーバーを起動」を選択]
    ```

    または直接スクリプトを実行：

    ```bash
    ./scripts/start_dev_servers.sh
    ```

    詳しくは[スクリプトランチャーガイド](docs/tips/script-launcher-guide.md)を参照してください。

5. **マイグレーションを実行する**

    ```bash
    # コンテナ内でマイグレーションを実行
    docker compose exec backend flask db upgrade
    ```

6. **アプリケーションにアクセスする**
    - バックエンド API: http://localhost:5000
    - フロントエンド: http://localhost:3000

## 📚 詳細なドキュメント

より詳細な情報は、以下のドキュメントを参照してください：

### プロジェクト概要

-   [プロジェクト概要](docs/Overview/README.md)
-   [アーキテクチャ概要](docs/Overview/architecture.md)
-   [データベース設計](docs/Overview/database_design.md)
-   [モジュール概要](docs/Overview/modules.md)
-   [開発ガイド](docs/Overview/developer_guide.md)

### 開発ツール

-   [Sphinx ドキュメント生成ガイド](docs/knowledge/20250519_sphinx_documentation_guide.md)

## 💻 開発ワークフロー

### コーディングスタイル

-   **Python (Flask)**: PEP 8 に準拠
-   **TypeScript/React**: ESLint と Prettier の設定に従う
-   **コメント**: 複雑なロジックには必ずコメントを追加

### Git ワークフロー

1. **ブランチ命名規則**

    ```
    feature/[機能名]  # 新機能追加
    fix/[バグ名]      # バグ修正
    refactor/[対象]   # リファクタリング
    docs/[対象]       # ドキュメント更新
    ```

2. **コミットメッセージ**
    ```
    [タイプ] 簡潔な説明
    ```
    タイプの例: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🛠️ スクリプト

プロジェクトには便利なスクリプトランチャーと各種スクリプトが用意されています：

```bash
# スクリプトランチャーを起動する（推奨）
./run_script.sh

# または個別のスクリプトを直接実行
./scripts/start_dev_servers.sh  # 開発サーバーを起動
./scripts/stop_dev_servers.sh   # 開発サーバーを停止
./scripts/format_code.sh        # コードのフォーマット
./scripts/build_sphinx_docs.sh  # Sphinxドキュメントをビルド
```

詳しい使い方は[スクリプトランチャーガイド](docs/tips/script-launcher-guide.md)を参照してください。

## 🔧 よくあるトラブルと解決法

### Docker 関連の問題

#### コンテナが起動しない場合

以下のコマンドでキャッシュをクリアし、再ビルドしてください。

```bash
docker compose down --volumes --remove-orphans
docker builder prune -af
docker compose build --no-cache
```

その後、VSCode で「Rebuild and Reopen in Container」を選択してください。

#### ファイルの権限問題が発生する場合

通常は自動権限調整機能によってホストとコンテナの権限が同期されますが、問題が発生した場合は：

```bash
# コンテナを再起動
docker compose down && docker compose up -d

# それでも解決しない場合は明示的に環境変数を指定
HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose up -d
```

詳しくは [Docker自動権限調整機能](docs/tips/docker-auto-permissions.md) を参照してください。

### セキュリティ対策

ProjectStupro 開発環境は、セキュリティを考慮した設計になっています：

1. **ホストの UID/GID の自動マッチング**:

    - コンテナはホストのユーザー ID を使用して実行されます
    - 権限問題を防ぎ、ファイルの所有権を正しく保持します

2. **最小権限の原則**:

    - コンテナ内のユーザーは必要最小限の権限のみ持っています
    - root ユーザーは使用せず、一般ユーザーで実行します

3. **ボリュームマウントの権限管理**:
    - node_modules などの特殊ディレクトリは名前付きボリュームで管理し、パフォーマンス向上と権限問題を回避

## 👥 貢献者

-   開発チーム

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で提供されています。
