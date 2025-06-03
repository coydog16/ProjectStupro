import pytest
from flask import Flask
from flask_jwt_extended import JWTManager
from src.core.routes.auth_routes import auth_bp
from src.core.models.user_model import User
from src.core.database import db
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
    JWTManager(app)  # JWTManagerの初期化を追加
    app.register_blueprint(auth_bp)
    with app.app_context():
        db.create_all()
        # テスト用ユーザー作成（パスワードは'password123'でハッシュ化）
        user = User(
            username='testuser',
            email='test@example.com',
            first_name='Test',
            last_name='User',
            password_hash=get_password_hash('password123'),
        )
        db.session.add(user)
        db.session.commit()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_auth_login_fail(client):
    res = client.post('/api/auth/login', json={
        'username': 'notfound', 'password': 'wrongpass'
    })
    assert res.status_code in (400, 401, 422)
    data = res.get_json()
    assert 'error' in data or 'msg' in data

def test_auth_login_success(client):
    res = client.post('/api/auth/login', json={
        'username': 'testuser', 'password': 'password123'
    })
    assert res.status_code == 200
    data = res.get_json()
    assert 'access_token' in data
    assert 'refresh_token' in data
    assert 'user' in data

def test_auth_me_unauthorized(client):
    res = client.get('/api/auth/me')
    assert res.status_code in (401, 422)

def test_auth_me_authorized(client):
    # まずログインしてトークン取得
    login_res = client.post('/api/auth/login', json={
        'username': 'testuser', 'password': 'password123'
    })
    assert login_res.status_code == 200
    access_token = login_res.get_json()['access_token']
    # トークン付きでユーザー情報取得
    res = client.get('/api/auth/me', headers={
        'Authorization': f'Bearer {access_token}'
    })
    assert res.status_code == 200
    data = res.get_json()
    assert 'user' in data
    assert data['user']['username'] == 'testuser'

def test_auth_me_invalid_token(client):
    res = client.get('/api/auth/me', headers={
        'Authorization': 'Bearer invalidtoken'
    })
    assert res.status_code in (401, 422)

def test_auth_refresh_success(client):
    # まずログインしてリフレッシュトークン取得
    login_res = client.post('/api/auth/login', json={
        'username': 'testuser', 'password': 'password123'
    })
    assert login_res.status_code == 200
    refresh_token = login_res.get_json()['refresh_token']
    # リフレッシュAPI
    res = client.post('/api/auth/refresh', headers={
        'Authorization': f'Bearer {refresh_token}'
    })
    assert res.status_code == 200
    data = res.get_json()
    assert 'access_token' in data
    assert data['message'] == 'Access token refreshed'
