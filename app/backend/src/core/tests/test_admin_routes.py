import pytest
from flask import Flask
from src.core.routes.admin_routes import admin_bp
from src.core.routes.auth_routes import auth_bp
from src.core.models.user_model import User
from src.core.database import db
from flask_jwt_extended import JWTManager
from flask_jwt_extended.exceptions import NoAuthorizationError
from src.core.security import get_password_hash

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['JWT_SECRET_KEY'] = 'test-secret-key'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    db.init_app(app)
    JWTManager(app)
    app.register_blueprint(auth_bp)  # 認証用Blueprintも登録
    app.register_blueprint(admin_bp)
    with app.app_context():
        db.create_all()
        # テスト用管理者作成（パスワードは'password123'でハッシュ化）
        admin = User(
            username='admin',
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            password_hash=get_password_hash('password123'),
            role='admin',
        )
        db.session.add(admin)
        db.session.commit()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def get_admin_token(client):
    # 管理者でログインしてアクセストークンを取得
    res = client.post('/api/auth/login', json={
        'username': 'admin', 'password': 'password123'
    })
    assert res.status_code == 200
    return res.get_json()['access_token']

def test_admin_user_list_unauthorized(client):
    # 管理者認証が必要なため、ここでは401/403またはNoAuthorizationErrorを想定
    try:
        res = client.get('/api/admin/users')
        assert res.status_code in (401, 403)
    except NoAuthorizationError:
        # flask_jwt_extendedの仕様で例外がraiseされる場合もOK
        pass

def test_admin_user_list_authorized(client):
    # 管理者トークンでユーザー一覧取得
    token = get_admin_token(client)
    res = client.get('/api/admin/users', headers={
        'Authorization': f'Bearer {token}'
    })
    assert res.status_code == 200
    data = res.get_json()
    assert isinstance(data, list) or 'users' in data
