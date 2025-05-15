# フルスタック開発環境のセットアップ

このプロジェクトでは、フロントエンド (React/TypeScript) とバックエンド (Python/Flask) の両方を一つの開発環境で開発できるように、フルスタック開発環境を用意しています。この文書では、その設定方法と使い方について説明します。

## フルスタック開発環境とは

フルスタック開発環境とは、フロントエンドとバックエンドの開発に必要なツール・ライブラリが全て揃った環境のことです。このプロジェクトでは、Docker と VS Code の DevContainer 機能を使って、以下の環境を一つのコンテナ内に統合しています：

- Node.js/npm (フロントエンド開発用)
- Python/pip (バックエンド開発用)
- PostgreSQL (データベース)

## 設定ファイル

フルスタック開発環境は以下のファイルによって定義されています：

- `.devcontainer/devcontainer.json` - VS Code DevContainer の設定
- `docker/frontend/Dockerfile.fullstack` - フロントエンド＋バックエンドの統合開発環境
- `docker-compose.fullstack.yml` - 開発サービスの構成

## フルスタック開発環境の利点

1. **開発体験の向上**
   - 単一のエディタ内で全てのコードを編集可能
   - 同時にフロントエンドとバックエンドを開発可能
   - コンテキストの切り替えが少なく済む

2. **環境の一貫性**
   - チーム全員が同じ開発環境を使用
   - 「自分の環境では動くのに...」問題の解消
   - 環境構築の手間を削減

3. **node_modules の管理**
   - Docker ボリュームによるnode_modulesの適切な管理
   - パフォーマンスとファイル権限の問題を回避

## ディレクトリ構造の維持

現在のディレクトリ構造（フロントエンドとバックエンドが分離された形）を維持したまま、開発環境だけを統合しています：

```
app/
  frontend/     <- React/TypeScript (フロントエンド)
    node_modules/
    ...
  backend/      <- Flask/Python (バックエンド)
    ...
```

## 開発環境の使い方

### 1. VS Code DevContainer での開発

1. VS Code で ProjectStupro フォルダを開く
2. 左下の「><」アイコンをクリックし「Reopen in Container」を選択
3. コンテナのビルドが完了すると、開発環境が準備完了

### 2. フロントエンドの開発

```bash
cd /app/frontend
npm run dev
```

開発サーバーが起動し、http://localhost:3000 でアクセス可能になります。

### 3. バックエンドの開発

```bash
cd /app/backend
flask run --host=0.0.0.0
```

Flask サーバーが起動し、http://localhost:5000 でアクセス可能になります。

### 4. データベースへのアクセス

- Adminer: http://localhost:8080
  - サーバー: postgres
  - ユーザー: navStupro
  - パスワード: your_very_secure_password_here
  - データベース: navstupro

## 注意点

- コンテナ初回起動時は依存関係のインストールに時間がかかることがあります
- 開発中はフロントエンドとバックエンドのサーバーを別々に起動する必要があります
- node_modules は Docker ボリュームとしてマウントされているため、ホストから直接アクセスすることはできません
