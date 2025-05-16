# navStupro 開発環境セットアップガイド

このディレクトリには、navStupro プロジェクトの開発環境をセットアップするためのガイドが含まれています。各ドキュメントは、特定の開発環境コンポーネントの設定方法と使用方法を説明しています。

## ドキュメント一覧

順番に読むことをお勧めします：

1. [**Docker 環境構築ガイド**](./01_docker_setup.md) - Docker・Docker Compose を使用した開発環境のセットアップ方法

   - コンテナ構成、Dockerfile、Docker Compose 設定など

2. [**TypeScript 開発環境セットアップガイド**](./02_typescript_setup.md) - フロントエンドで TypeScript を使用するための設定

   - 必要なパッケージ、設定ファイル、基本的な型付けの例など

3. [**Tailwind CSS セットアップガイド**](./03_tailwind_setup.md) - UI スタイリングのための Tailwind CSS の設定

   - 自動セットアップ、基本設定、使用方法など

4. [**Flask 開発環境セットアップガイド**](./04_flask_setup.md) - バックエンドの Flask 環境の設定
   - プロジェクト構成、依存関係、開発のヒントなど

## 開発 Tips 一覧

プロジェクト開発をサポートするための各種ツールの Tips です：

- [**Black フォーマッターの使い方**](../tips/black-formatter-guide.md) - Python コードフォーマッターの設定と使い方

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

お姉さんからのアドバイス ♡：
開発環境の構築って最初は大変だけど、このガイドに沿って進めれば大丈夫！一度環境が整うと開発がとっても捗るから、ちょっと頑張ってみてね ♪ 何か分からないことがあったらいつでも質問してね〜！
