# NavStupro API 通信関連ファイル

このドキュメントでは、localhost:3000 を表示するために必要な API 通信に関連するファイルとその役割について説明します。フロントエンドとバックエンドの連携方法、プロキシ設定、主要な API 通信ファイルについて解説します。

## 目次

1. [通信の概要](#通信の概要)
2. [フロントエンド関連ファイル](#フロントエンド関連ファイル)
3. [バックエンド関連ファイル](#バックエンド関連ファイル)
4. [プロキシ設定](#プロキシ設定)
5. [通信フロー](#通信フロー)

## 通信の概要

NavStupro プロジェクトでは、React（フロントエンド）と Flask（バックエンド）間の通信を以下のように実装しています：

- フロントエンド（React）は、localhost:3000 でサービスを提供
- バックエンド（Flask）は、localhost:5000 で API を提供
- 開発環境では、Vite のプロキシ設定を使って CORS 問題を回避
- 本番環境では、Nginx によるリバースプロキシを使用

## フロントエンド関連ファイル

### `/workspace/app/frontend/src/App.tsx`

**役割**: アプリケーションのメインコンポーネント。バックエンドのヘルスチェック API を呼び出し、接続状態を表示する。

```typescript
// APIヘルスチェック関数
const checkApiHealth = async () => {
    setLoading(true);
    try {
        // vite.configのプロキシ設定を使ってバックエンドにアクセス
        const response = await fetch('/api/health');
        if (response.ok) {
            const data = await response.json();
            setApiStatus(data);
        } else {
            setApiStatus({
                error: `エラー: ${response.status} ${response.statusText}`,
            });
        }
    } catch (error) {
        setApiStatus({
            error: `接続エラー: ${error instanceof Error ? error.message : String(error)}`,
        });
    } finally {
        setLoading(false);
    }
};
```

初期表示時に自動的に API ヘルスチェックを実行し、接続状態を UI に表示します。

### `/workspace/app/frontend/src/api/config.ts`

**役割**: API 通信の共通設定を管理。ベース URL、ヘッダー設定、タイムアウト、HTTP ステータスコードなどの定義。

```typescript
// バックエンドのベースURL
export const API_BASE_URL = 'http://localhost:5000';

// APIリクエスト時のデフォルト設定
export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

// APIリクエストのタイムアウト設定（ミリ秒）
export const API_TIMEOUT = 30000;
```

### `/workspace/app/frontend/src/api/auth.ts`, `/workspace/app/frontend/src/api/users.ts`, `/workspace/app/frontend/src/api/feed.ts`

**役割**: 各機能の API 呼び出し関数を提供する予定のファイル。現時点では実装が行われていない（空のファイル）。

将来的にはこれらのファイルに、認証、ユーザー管理、フィード関連の API 呼び出し関数が実装される予定です。

### `/workspace/app/frontend/vite.config.ts`

**役割**: Vite の設定ファイル。開発サーバーの設定とバックエンドへのプロキシ設定を含む。

```typescript
server: {
  host: '0.0.0.0',
  port: 3000,
  watch: {
    usePolling: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
},
```

この設定により、フロントエンドからの `/api/*` へのリクエストが自動的にバックエンドサーバー（localhost:5000）にプロキシされます。これにより、開発環境でも CORS 問題なく API を呼び出せます。

## バックエンド関連ファイル

### `/workspace/app/backend/app.py`

**役割**: Flask アプリケーションのメインエントリポイントと API エンドポイントの定義。

```python
# ヘルスチェックエンドポイント（フロントエンドからの接続確認用）
@app.route("/api/health")
def health_check():
    return jsonify(
        {"status": "ok", "message": "API is running", "version": __version__}
    )

# ルートエンドポイント
@app.route("/")
def index():
    return jsonify({"message": "Welcome to NavStupro API"})
```

現在実装されている API エンドポイント：

- `/api/health`: API サーバーの状態確認（フロントエンドの接続テスト用）
- `/`: ウェルカムメッセージを返す

### `/workspace/app/backend/__init__.py`

**役割**: バックエンドパッケージの初期化ファイル。アプリケーションのバージョン情報とインポート設定を提供。

```python
# バージョン情報
__version__ = "0.1.0"

# サブディレクトリのapp.py（アプリケーションファクトリを含むファイル）からの必要なインポート
from .app import app, create_app

# このパッケージがインポートされたときに利用可能なものを__all__で定義
__all__ = ["app", "create_app", "__version__"]
```

## プロキシ設定

### 開発環境プロキシ（Vite）

開発環境では、Vite の開発サーバーがプロキシとして機能し、`/api/*`へのリクエストを自動的にバックエンドサーバーにリダイレクトします。

#### 開発環境で Nginx を使わない理由

開発環境で Vite のプロキシ機能を使用し、Nginx を使わない主な理由は以下の通りです：

1. **開発の迅速さ**:

    - Vite の開発サーバーはホットリロード機能を備えており、コード変更時に自動的にブラウザを更新します
    - Nginx を経由すると、追加の設定変更やコンテナ再起動が必要になる場合があります

2. **簡素な設定**:

    - Vite のプロキシ設定は`vite.config.ts`ファイル内で簡単に行えます
    - 追加のコンテナやサービスが不要なため、開発環境がシンプルになります

3. **直接的なフィードバック**:

    - フロントエンド開発時のエラーが Vite のコンソールに直接表示されます
    - 中間レイヤーがないため、問題の診断が容易になります

4. **リソース効率**:
    - 開発環境では、不要なサービスを最小限に抑えることでリソース使用を最適化できます
    - 特に個人の開発マシンではこの点が重要です

本番環境では Nginx のようなプロキシサーバーが必要ですが、開発環境では Vite の内蔵プロキシ機能で十分です。

#### モダンなフロントエンド開発の一般的なアプローチ

このアプローチは現代のフロントエンド開発では非常に一般的です：

- **React + Create React App** - webpack-dev-server のプロキシ設定
- **Vue + Vue CLI** - vue-cli-service のプロキシ機能
- **Angular** - Angular CLI の proxy.conf.json によるプロキシ設定
- **Next.js** - rewrites 機能による API リクエストのプロキシ設定
- **React + Vite** - 本プロジェクトと同様の Vite プロキシ設定

これらのツールはすべて、開発時に内蔵開発サーバーでプロキシ機能を提供し、本番環境では Nginx や Apache、Caddy、Cloud Flare などの専用 Web サーバーを使用するパターンが標準的です。

このアプローチのメリットは、開発チームがインフラ（Nginx）の設定に詳しくなくても、フロントエンド開発に集中できる点にあります。

### 本番環境プロキシ（Nginx）

本番環境では、Nginx がリバースプロキシとして機能します。

### `/workspace/docker/nginx/default.conf`

**役割**: Nginx のリバースプロキシ設定。フロントエンドとバックエンドへのリクエストルーティングを定義。

```properties
# APIリクエストをバックエンドに転送
location /api {
    proxy_pass http://backend:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
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
```

この設定により、以下のルーティングが行われます：

- `/api/*`: バックエンドサーバー（Flask）に転送
- その他: フロントエンドサーバー（React）に転送

## 通信フロー

1. **フロントエンド初期化（localhost:3000）**:

    - `App.tsx`で React アプリケーションが起動
    - `useEffect`フックで`checkApiHealth`関数が呼び出される

2. **API 通信**:

    - `fetch('/api/health')`でヘルスチェック API にリクエスト
    - Vite のプロキシ設定により、リクエストが自動的にバックエンドに転送

3. **バックエンド応答（localhost:5000）**:

    - `app.py`の`health_check`関数が API リクエストを処理
    - JSON レスポンスをフロントエンドに返す（ステータス、メッセージ、バージョン情報）

4. **フロントエンド表示**:
    - 受け取ったレスポンスを`apiStatus`ステートに保存
    - UI コンポーネントで接続状態を表示

このように、フロントエンドとバックエンドが連携して動作し、localhost:3000 でアプリケーションが表示されます。
