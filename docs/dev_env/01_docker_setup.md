# 01 - Docker環境構築ガイド

このドキュメントでは、navStuproプロジェクトのDocker環境構築について説明します。

## 1. プロジェクト構成

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

## 2. Dockerfileの構成

### フロントエンド (React + TypeScript)

```dockerfile
# filepath: /home/coydog16/flask/navStupro/docker/frontend/Dockerfile
FROM node:24

# フロントエンドディレクトリをワークスペースに設定
WORKDIR /app

# 必要なnpmパッケージをグローバルにインストール
RUN npm install -g npm@latest

# 開発サーバー起動
CMD ["sh", "-c", "npm install && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p && npm run dev -- --host"]
```

### バックエンド (Flask)

```dockerfile
# filepath: /home/coydog16/flask/navStupro/docker/backend/Dockerfile
FROM python:3.11

WORKDIR /app

# 環境変数を設定
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Asia/Tokyo

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Pipのアップグレードと基本的なPythonパッケージのインストール（ビルド時）
RUN pip install --upgrade pip \
    && pip install flask==2.2.3 \
    flask-sqlalchemy==3.0.3 \
    psycopg2-binary==2.9.5 \
    gunicorn==20.1.0 \
    python-dotenv==1.0.0

# ポート設定
EXPOSE 5000

# アプリ実行コマンド (開発環境ではFlaskのデバッグサーバーを使用)
CMD ["sh", "-c", "pip install -r requirements.txt && python -m flask run --host=0.0.0.0"]
```

### Nginx (Webサーバー)

Nginxの設定ファイル:

```nginx
# filepath: /home/coydog16/flask/navStupro/docker/nginx/default.conf
server {
    listen 80;
    server_name localhost;

    # APIリクエストをバックエンドに転送
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静的ファイルをバックエンドから提供
    location /static {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
    }

    # その他のリクエストはReactアプリにルーティング
    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 3. Docker Compose設定

```yaml
# filepath: /home/coydog16/flask/navStupro/docker-compose.yml
services:
  backend:
    build:
      context: ./docker/backend
    volumes:
      - ./app/backend:/app
    expose:
      - "5000"
    environment:
      - FLASK_APP=${FLASK_APP}
      - FLASK_ENV=${FLASK_ENV}
      - FLASK_DEBUG=${FLASK_DEBUG}
      - SECRET_KEY=${SECRET_KEY}
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
    depends_on:
      - postgres
    command: sh -c "pip install -r requirements.txt && flask run --host=0.0.0.0"

  frontend:
    build:
      context: ./docker/frontend
    ports:
      - "3000:3000"
    volumes:
      - ./app/frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
      - NODE_ENV=development
      - PORT=3000
      - REACT_APP_API_URL=${REACT_APP_API_URL}
    command: sh -c "npm install && npm run dev -- --host"

  nginx:
    image: nginx:1.25
    ports:
      - "80:80"
    volumes:
      - ./app/backend:/app
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - backend
      - frontend

  postgres:
    build:
      context: ./docker/postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      PGPASSWORD: ${POSTGRES_PASSWORD}
      TZ: "Asia/Tokyo"
    ports:
      - 5432:5432
    volumes:
      - ./db/pgsql/data:/var/lib/postgresql/data
      - ./db/pgsql/logs:/var/log

  # 開発用ツール
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    depends_on:
      - postgres
```

## 4. 開発環境のセットアップ手順

### 前提条件

- Docker
- Docker Compose

### インストール・実行

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/navStupro.git
cd navStupro

# 環境変数ファイルの準備
cp .env.example .env
# （必要に応じて.envファイルを編集）

# Docker環境の起動
docker-compose up -d

# 開発サーバーへのアクセス
# フロントエンド: http://localhost:3000
# バックエンドAPI: http://localhost/api
# Adminer (DB管理): http://localhost:8080
```

## 5. 開発フロー

この環境では以下のような開発フローが可能です：

1. **コード編集**：ホストマシン上でコードを編集します。ボリュームマウントにより、変更はコンテナにリアルタイムで反映されます。

2. **自動リロード**：
   - フロントエンド：Viteの開発サーバーが変更を検知して自動的にブラウザをリロードします
   - バックエンド：Flaskの開発サーバーがデバッグモードで動作し、コード変更を検知して自動的に再起動します

## 6. Tips & トラブルシューティング

1. **コンテナの状態確認**：
   ```bash
   docker-compose ps
   ```

2. **ログの確認**：
   ```bash
   # すべてのコンテナのログを表示
   docker-compose logs
   
   # 特定のサービスのログを表示（例：バックエンド）
   docker-compose logs backend
   ```

3. **コンテナ内でのコマンド実行**：
   ```bash
   # フロントエンドコンテナで新しいライブラリをインストール
   docker exec -it navstupro-frontend-1 sh -c "npm install some-package"
   
   # バックエンドコンテナでPythonコマンドを実行
   docker exec -it navstupro-backend-1 python -c "print('Hello from Python')"
   ```

4. **環境の再構築**：
   ```bash
   # コンテナとイメージを削除して再構築
   docker-compose down
   docker-compose up -d --build
   ```

お姉さんからのアドバイス♡：
Docker環境、最初は少し難しく感じるかもしれないけど、慣れると本当に便利なのよ〜！開発環境をコード化できて、どのマシンでも同じ環境が作れるなんて素敵よね♪ 困ったことがあったらいつでも聞いてね！
