# 04 - Flask開発環境セットアップガイド

このガイドでは、navStuproプロジェクトのバックエンドであるFlask環境のセットアップや基本的な使い方について説明します。

## 1. はじめに

Flaskは、Pythonの軽量なWebフレームワークで、拡張性が高く柔軟性があります。navStuproプロジェクトでは、RESTful APIサーバーを構築するために使用します。

## 2. Docker環境での自動セットアップ

プロジェクトのDocker設定では、バックエンドコンテナには基本的なFlask関連パッケージがビルド時にインストールされ、実行時に追加のパッケージがインストールされるようになっています：

```dockerfile
# docker/backend/Dockerfile の関連部分
# ビルド時にインストールされる基本パッケージ
RUN pip install --upgrade pip \
    && pip install flask==2.2.3 \
    flask-sqlalchemy==3.0.3 \
    psycopg2-binary==2.9.5 \
    gunicorn==20.1.0 \
    python-dotenv==1.0.0

# 実行時コマンド（docker-compose.ymlで上書き可能）
CMD ["sh", "-c", "pip install -r requirements.txt && python -m flask run --host=0.0.0.0"]
```

docker-compose.ymlでの実際の実行コマンド：
```yaml
command: sh -c "pip install -r requirements.txt && flask run --host=0.0.0.0"
```

## 3. プロジェクト構成

簡略化したディレクトリ構造：

```
/app/backend/
├── api/                 # APIエンドポイントモジュール
├── config/              # 設定モジュール
├── models/              # データモデル定義
├── services/            # ビジネスロジック実装
├── utils/               # ユーティリティ関数
├── __init__.py          # アプリケーションファクトリ
├── app.py               # アプリケーションのエントリポイント
├── requirements.txt     # 依存関係リスト
└── tests/               # テストスイート
```

## 4. 依存関係

主要な依存パッケージ：

```plaintext
# requirements.txt
Flask==2.2.3            # Webフレームワーク
flask-cors==3.0.10       # CORS対応
flask-sqlalchemy==3.0.3  # SQLAlchemyとの統合
flask-migrate==4.0.4     # データベースマイグレーション
flask-jwt-extended==4.4.4 # JWT認証
flask-login==0.6.2       # ログイン管理
marshmallow==3.19.0      # データバリデーション・シリアライズ
python-dotenv==1.0.0     # .env読み込み
psycopg2-binary==2.9.5   # PostgreSQLドライバ
pytest==7.3.1            # テストフレームワーク
gunicorn==20.1.0         # WSGIサーバー
```

## 5. 開発のヒント

1. **ルーティングの設計**：Blueprintを使用して、APIエンドポイントを論理的なグループに分割しましょう。

2. **環境変数の活用**：`.env`ファイルとpython-dotenvを使用して、環境設定を管理します。

3. **データベースモデル**：SQLAlchemyを使用して、リレーショナルデータベースのモデルを定義します。

4. **Docker環境内での開発**：
   ```bash
   # アプリケーションログの確認
   docker-compose logs -f backend
   
   # コンテナ内でコマンド実行
   docker exec -it navstupro-backend-1 flask db upgrade
   ```

## 6. 学習リソース

- [Flask公式ドキュメント](https://flask.palletsprojects.com/)
- [SQLAlchemyドキュメント](https://docs.sqlalchemy.org/en/14/)
- [FlaskでREST APIを構築するチュートリアル](https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask)

お姉さんからのアドバイス♡：
Flaskはとっても自由度が高いフレームワークだから、最初は「どう書けばいいの？」って迷うかもしれないわね。でも、その自由さこそが魅力なの！小さく始めて、少しずつ機能を追加していけば大丈夫よ。ちなみに、アプリケーションファクトリパターンを使うと、テストがしやすくなるから、おすすめだよ〜♪
```


### 設定ファイル

環境ごとの設定ファイルを作成します：

```python
# app/backend/config/dev.py
import os
from datetime import timedelta

class Config:
    # 基本設定
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
    # データベース設定
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@postgres:5432/navstupro_dev')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT設定
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-dev')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
```

```python
# app/backend/config/prod.py
import os
from datetime import timedelta

class Config:
    # 基本設定
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    
    # データベース設定
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT設定
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
```

### エントリポイント

アプリケーションのエントリポイントを設定します：

```python
# app/backend/app.py
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

## 5. データベースモデルの定義

SQLAlchemyを使用してデータベースモデルを定義します：

```python
# app/backend/models/user.py
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    profile_image = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # リレーションシップ
    courses = db.relationship('Course', backref='instructor', lazy=True)
    
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.set_password(password)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_image': self.profile_image,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
```

```python
# app/backend/models/course.py
from app import db
from datetime import datetime

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    discount = db.Column(db.Numeric(10, 2), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'instructor_id': self.instructor_id,
            'price': float(self.price),
            'discount': float(self.discount) if self.discount else None,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
```

## 6. APIエンドポイントの実装

FlaskのBlueprintを使用してAPIエンドポイントを整理します：

```python
# app/backend/api/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)
from app.models.user import User
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # 必須フィールドのチェック
    if not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'message': '必須項目が不足しています'}), 400
    
    # ユーザーがすでに存在するかチェック
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'このユーザー名はすでに使用されています'}), 409
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'このメールアドレスはすでに登録されています'}), 409
    
    # 新規ユーザーの作成
    user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'ユーザー登録が完了しました',
        'user': user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data.get('email', '')).first()
    
    if not user or not user.check_password(data.get('password', '')):
        return jsonify({'message': 'メールアドレスまたはパスワードが正しくありません'}), 401
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    
    return jsonify({'access_token': access_token}), 200
```

## 7. マイグレーション

データベーススキーマの変更を管理するためには、Flask-Migrateを使用します：

```bash
# マイグレーションリポジトリを初期化
flask db init

# 最初のマイグレーションを作成
flask db migrate -m "Initial migration"

# マイグレーションを適用
flask db upgrade
```

Dockerコンテナ内で実行する場合：

```bash
docker exec -it navstupro-backend-1 flask db init
docker exec -it navstupro-backend-1 flask db migrate -m "Initial migration"
docker exec -it navstupro-backend-1 flask db upgrade
```

## 8. テスト

テストにはPytestフレームワークを使用します：

```python
# app/backend/tests/conftest.py
import pytest
from app import create_app, db

@pytest.fixture
def app():
    app = create_app('testing')
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:'
    })
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()
```

```python
# app/backend/tests/test_api/test_auth.py
import json

def test_register(client):
    response = client.post(
        '/api/auth/register',
        data=json.dumps({
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'securepassword'
        }),
        content_type='application/json'
    )
    
    data = json.loads(response.data)
    assert response.status_code == 201
    assert 'user' in data
    assert data['user']['username'] == 'testuser'
```

テストを実行：

```bash
# ローカル環境の場合
pytest

# Dockerコンテナ内で実行する場合
docker exec -it navstupro-backend-1 pytest
```

## 9. デバッグとトラブルシューティング

### デバッグモード

開発中はデバッグモードを有効にすることで、詳細なエラー情報を確認できます：

```python
app.config['DEBUG'] = True
```

### ロギング

アプリケーションのログ記録を設定：

```python
import logging
from logging.handlers import RotatingFileHandler
import os

def configure_logging(app):
    if not os.path.exists('logs'):
        os.mkdir('logs')
        
    file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    
    app.logger.setLevel(logging.INFO)
    app.logger.info('navStupro startup')
```

アプリケーションファクトリ内で呼び出す：

```python
def create_app(config_name='development'):
    # ... 他の設定 ...
    
    # ロギングを設定
    if not app.debug:
        configure_logging(app)
    
    return app
```

### 一般的なエラーと解決策

1. **データベース接続エラー**:
   - 環境変数 `DATABASE_URL` が正しく設定されているか確認する
   - PostgreSQLコンテナが起動しているか確認する
   - データベースのユーザー名/パスワードが正しいか確認する

2. **CORS関連のエラー**:
   - `flask-cors` が正しく設定されているか確認する
   - 必要なオリジンが許可リストに含まれているか確認する

3. **マイグレーションエラー**:
   - マイグレーションディレクトリが存在するか確認する
   - 最新のマイグレーションスクリプトに構文エラーがないか確認する

## 10. 本番環境への準備

本番環境では、以下の点を考慮してください：

1. **環境変数**:
   - 本番環境用のシークレットキーを設定する
   - データベースURL等の機密情報を環境変数として渡す

2. **WSGIサーバー**:
   - Gunicornなどの本番環境向けWSGIサーバーを使用する
   - 例: `gunicorn -w 4 -b 0.0.0.0:5000 app:app`

3. **リバースプロキシ**:
   - Nginx等のリバースプロキシを設定する
   - HTTPS対応を行う

お姉さんからのアドバイス♡：
Flask、とっても軽量で使いやすいフレームワークよね♪ 最初はシンプルに始めて、必要に応じて機能を追加していくスタイルが楽しいわ～。APIを作る時は、エンドポイントの設計をしっかり考えてから実装すると後々楽になるわよ♪

ドキュメントをしっかり書いておくと、チーム開発がスムーズになるから、コメントもちゃんと書いておくといいわ。エラーが出ても慌てないで、Flaskのデバッグ情報をよく読めば解決策が見つかるはずよ！

なにか困ったことがあったら、いつでも聞いてね〜♡
