# navStupro

Flask + React + PostgreSQL を使った学習支援アプリケーション

## プロジェクト構成

```
.
├── app/
│   ├── backend/  # Flaskアプリケーション
│   └── frontend/ # Reactアプリケーション
├── db/
│   └── pgsql/    # PostgreSQLデータ
├── docker/
│   ├── backend/  # Flask Dockerファイル
│   ├── frontend/ # React Dockerファイル
│   ├── postgres/ # PostgreSQL Dockerファイル
│   └── nginx/    # Nginx設定
├── docker-compose.yml  # Docker Compose設定
└── docs/
    └── dev_env/   # 開発環境セットアップドキュメント
```

## 環境構築手順

### 前提条件

- Docker
- Docker Compose

### 初回セットアップ

1. リポジトリをクローンする
   ```bash
   git clone https://github.com/yourusername/navStupro.git
   cd navStupro
   ```

2. 環境変数ファイルを作成する
   ```bash
   cp .env.example .env
   ```
   ※ `.env`ファイルの内容を必要に応じて編集してください

3. バックエンド設定ファイルをコピーする
   ```bash
   # 開発環境用設定ファイル
   cp app/backend/app/config/dev.py.example app/backend/app/config/dev.py
   
   # 本番環境用設定ファイル（必要な場合）
   # cp app/backend/app/config/prod.py.example app/backend/app/config/prod.py
   ```
   ※ 設定ファイルの内容を必要に応じて編集してください

4. Dockerコンテナを起動する
   ```bash
   docker-compose up -d
   ```

4. アプリケーションにアクセスする
   - フロントエンド: http://localhost:3000
   - バックエンドAPI: http://localhost/api
   - データベース管理: http://localhost:8080 (Adminer)



## 詳細なセットアップガイド

開発環境のセットアップに関する詳細なガイドは、`docs/dev_env/` ディレクトリにあります：

1. [Docker環境構築](docs/dev_env/01_docker_setup.md)
2. [TypeScriptセットアップ](docs/dev_env/02_typescript_setup.md)
3. [Tailwind CSSセットアップ](docs/dev_env/03_tailwind_setup.md)
4. [Flaskセットアップ](docs/dev_env/04_flask_setup.md)

全体の概要は[こちら](docs/dev_env/00_index.md)で確認できます。

## 使用技術

- **フロントエンド**: React, Beer CSS
- **バックエンド**: Flask, SQLAlchemy
- **データベース**: PostgreSQL
- **サーバー**: Nginx, Gunicorn
- **コンテナ化**: Docker, Docker Compose

## 開発者

- あなたの名前

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。
