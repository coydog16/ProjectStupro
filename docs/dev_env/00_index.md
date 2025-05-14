# navStupro 開発環境セットアップガイド

このディレクトリには、navStuproプロジェクトの開発環境をセットアップするためのガイドが含まれています。各ドキュメントは、特定の開発環境コンポーネントの設定方法と使用方法を説明しています。

## ドキュメント一覧

順番に読むことをお勧めします：

1. [**Docker環境構築ガイド**](./01_docker_setup.md) - Docker・Docker Composeを使用した開発環境のセットアップ方法
   * コンテナ構成、Dockerfile、Docker Compose設定など

2. [**TypeScript開発環境セットアップガイド**](./02_typescript_setup.md) - フロントエンドでTypeScriptを使用するための設定
   * 必要なパッケージ、設定ファイル、基本的な型付けの例など

3. [**Tailwind CSSセットアップガイド**](./03_tailwind_setup.md) - UIスタイリングのためのTailwind CSSの設定
   * 自動セットアップ、基本設定、使用方法など

4. [**Flask開発環境セットアップガイド**](./04_flask_setup.md) - バックエンドのFlask環境の設定
   * プロジェクト構成、依存関係、開発のヒントなど

## 開発環境のクイックスタート

プロジェクトを素早く始めるには：

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/navStupro.git
cd navStupro

# 環境変数ファイルの準備
cp .env.example .env

# Docker環境の起動
docker-compose up -d

# 開発サーバーへのアクセス
# フロントエンド: http://localhost:3000
# バックエンドAPI: http://localhost/api
# Adminer (DB管理): http://localhost:8080
```

お姉さんからのアドバイス♡：
開発環境の構築って最初は大変だけど、このガイドに沿って進めれば大丈夫！一度環境が整うと開発がとっても捗るから、ちょっと頑張ってみてね♪ 何か分からないことがあったらいつでも質問してね〜！
