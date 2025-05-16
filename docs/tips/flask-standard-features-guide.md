# Flask フレームワーク 標準機能ガイド

Flask は軽量で柔軟な Python Web フレームワークです。「マイクロフレームワーク」と呼ばれますが、これは機能が少ないという意味ではなく、コアは最小限に保ちながら必要に応じて拡張できることを意味します。このガイドでは、Flask の主要な標準機能について解説します。

## 目次

1. [コア機能](#コア機能)
2. [ルーティング](#ルーティング)
3. [テンプレートエンジン](#テンプレートエンジン)
4. [リクエストとレスポンスの処理](#リクエストとレスポンスの処理)
5. [セッション管理](#セッション管理)
6. [エラー処理](#エラー処理)
7. [コンテキスト管理](#コンテキスト管理)
8. [設定管理](#設定管理)
9. [シグナル](#シグナル)
10. [CLI インターフェース](#cliインターフェース)

## コア機能

### Flask アプリケーション

```python
from flask import Flask

app = Flask(__name__)
```

**主な機能:**

- アプリケーション全体の管理
- ルート登録
- 設定の管理
- WSGI アプリケーションの提供
- ミドルウェアの管理

**重要な属性とメソッド:**

- `app.config` - アプリケーション設定の辞書
- `app.run()` - 開発用サーバーの起動
- `app.test_client()` - テスト用クライアント
- `app.url_map` - 登録されたすべてのルートの表示

## ルーティング

```python
@app.route('/users/<user_id>', methods=['GET', 'POST'])
def get_user(user_id):
    return f"User ID: {user_id}"
```

**主な機能:**

- URL パターンの登録
- HTTP メソッドの指定
- 動的なルートパラメータ
- エンドポイント名の管理

**高度なルーティング:**

```python
# 複数のメソッドを指定
@app.route('/api/resource', methods=['GET', 'POST'])

# 動的型変換
@app.route('/orders/<int:order_id>')
def get_order(order_id):  # order_id は整数に変換される
    pass

# カスタムコンバーター
@app.route('/products/<path:product_path>')
def get_product(product_path):
    pass
```

## テンプレートエンジン

Flask は Jinja2 をテンプレートエンジンとして使用します。

```python
from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

**主な機能:**

- HTML テンプレートのレンダリング
- 変数の埋め込み
- テンプレートの継承
- マクロと再利用可能なコンポーネント

**テンプレート例 (hello.html):**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>こんにちは</title>
  </head>
  <body>
    <h1>こんにちは、{{ name }}さん！</h1>
  </body>
</html>
```

## リクエストとレスポンスの処理

### リクエストデータの取得

```python
from flask import request

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    # ログイン処理
```

**`request` オブジェクトの主なプロパティ:**

- `request.args` - URL パラメータ (GET)
- `request.form` - フォームデータ (POST)
- `request.json` - JSON リクエストボディ
- `request.files` - アップロードされたファイル
- `request.cookies` - クッキー
- `request.headers` - HTTP ヘッダー
- `request.method` - HTTP メソッド (GET, POST など)
- `request.url` - 完全な URL
- `request.remote_addr` - クライアントの IP アドレス

### レスポンスの作成

```python
from flask import jsonify, make_response, redirect, url_for

# JSON レスポンス
@app.route('/api/users/<int:user_id>')
def get_user_data(user_id):
    user = {"id": user_id, "name": "田中太郎"}
    return jsonify(user)

# カスタムレスポンス
@app.route('/download')
def download_file():
    response = make_response("ファイルの内容")
    response.headers['Content-Disposition'] = 'attachment; filename=file.txt'
    response.mimetype = 'text/plain'
    return response

# リダイレクト
@app.route('/old-page')
def old_page():
    return redirect(url_for('new_page'))
```

## セッション管理

```python
from flask import session

app.secret_key = 'your_secret_key'  # 必須設定

@app.route('/set-session')
def set_session():
    session['username'] = 'user123'
    return "セッション設定完了"

@app.route('/get-session')
def get_session():
    username = session.get('username', 'Guest')
    return f"こんにちは、{username}さん"
```

**主な機能:**

- ユーザーセッションの保存と取得
- クッキーベースのセッション (デフォルト)
- 永続的なセッションデータの管理

## エラー処理

```python
from flask import abort

# エラーの発生
@app.route('/private')
def private_area():
    if not user_authenticated:
        abort(401)  # 未認証エラー
    return "認証済みコンテンツ"

# エラーハンドラーの登録
@app.errorhandler(404)
def page_not_found(e):
    return "ページが見つかりません", 404

@app.errorhandler(500)
def server_error(e):
    return "サーバーエラーが発生しました", 500
```

**主なエラーハンドリング機能:**

- 特定のステータスコードのカスタム処理
- エラーページのカスタマイズ
- 例外のキャッチと処理

## コンテキスト管理

Flask のコンテキストは、リクエスト処理中に必要な情報へのアクセスを提供します。

```python
from flask import g, current_app, request_started, request_finished

# リクエストコンテキストでのグローバル変数
@app.before_request
def before_request():
    g.user = get_current_user()  # リクエスト中にユーザー情報を保存

@app.route('/profile')
def profile():
    user = g.user  # g からユーザー情報を取得
    return f"プロフィール: {user.name}"

# アプリケーションコンテキスト
def background_task():
    with app.app_context():
        # app コンテキスト内で処理
        db = current_app.extensions['sqlalchemy'].db
        db.create_all()
```

**主なコンテキスト機能:**

- `g` - リクエスト内でのグローバル変数
- `current_app` - 現在のアプリケーションへのプロキシ
- `request` - 現在のリクエストオブジェクト
- `session` - 現在のセッションオブジェクト

## 設定管理

```python
# 基本設定
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'dev-key'

# 設定ファイルからの読み込み
app.config.from_object('config.DevConfig')
app.config.from_pyfile('config.py')
app.config.from_envvar('APP_CONFIG_FILE')
app.config.from_json('config.json')
```

**重要な設定オプション:**

- `DEBUG` - デバッグモードを有効化
- `TESTING` - テストモードを有効化
- `SECRET_KEY` - セッションやその他のセキュリティ機能の暗号化キー
- `PERMANENT_SESSION_LIFETIME` - 永続セッションの有効期限
- `SERVER_NAME` - アプリケーションのドメイン名

## シグナル

シグナルを使用すると、アプリケーションの様々なイベントに反応できます。

```python
from flask import request_started, request_finished

@request_started.connect
def log_request(sender, **extra):
    app.logger.info("リクエスト開始")

@request_finished.connect
def log_response(sender, response, **extra):
    app.logger.info(f"リクエスト完了 - ステータス: {response.status_code}")
```

**主なシグナル:**

- `request_started` - リクエスト処理開始時
- `request_finished` - リクエスト処理完了時
- `got_request_exception` - リクエスト処理中に例外発生時
- `template_rendered` - テンプレートがレンダリングされた時
- `before_render_template` - テンプレートレンダリング前

## CLI インターフェース

Flask 2.0 以降、組み込みの CLI が強化されており、カスタムコマンドも作成できます。

```python
# app.py
import click
from flask import Flask
from flask.cli import with_appcontext

app = Flask(__name__)

@app.cli.command("init-db")
@click.option("--drop", is_flag=True, help="既存のテーブルを削除する")
def init_db_command(drop):
    """データベースを初期化します。"""
    if drop:
        click.echo("テーブルを削除して再作成します")
    else:
        click.echo("データベースを初期化します")
    # DB初期化処理
```

**使用方法:**

```bash
$ flask init-db
データベースを初期化します

$ flask init-db --drop
テーブルを削除して再作成します
```

**標準 CLI 機能:**

- `flask run` - 開発サーバー起動
- `flask shell` - アプリケーションコンテキストでのシェル起動
- `flask routes` - 登録されているすべてのルートを表示
- `flask db` - Flask-Migrate（拡張機能）使用時のマイグレーションコマンド

## まとめ

Flask はコア部分はシンプルですが、Web アプリケーション開発に必要な一通りの機能を備えています。必要に応じて Flask 拡張機能を使うことで、より高度な機能（ORM、認証、管理画面など）を追加できます。

Flask の設計哲学は「必要なものだけを選んで使う」という考え方に基づいています。シンプルな API とピンポイントなドキュメントにより、必要な機能を必要な時に学べるようになっています。

## 人気のある Flask 拡張機能

Flask のエコシステムには多数の拡張機能が存在します。代表的なものとして：

- **Flask-SQLAlchemy** - データベース ORM
- **Flask-Migrate** - データベースマイグレーション
- **Flask-WTF** - フォーム処理
- **Flask-Login** - ユーザー認証
- **Flask-RESTful** - RESTful API 作成
- **Flask-JWT-Extended** - JWT 認証
- **Flask-Admin** - 管理画面
- **Flask-CORS** - クロスオリジン対応

上記の拡張機能を組み合わせることで、フルスタックの Web アプリケーションを開発することができます。
