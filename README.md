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
└── docker-compose.yml  # Docker Compose設定
```

## 開発環境のセットアップ

### 前提条件

- Docker
- Docker Compose

### インストール・実行

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/navStupro.git
cd navStupro

# Docker環境の起動
docker compose up -d

# 開発サーバーへのアクセス
# フロントエンド: http://localhost:3000
# バックエンドAPI: http://localhost/api
# Adminer (DB管理): http://localhost:8080
```

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
