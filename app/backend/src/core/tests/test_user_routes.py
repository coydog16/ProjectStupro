import pytest
from flask import Flask
from src.core.routes.user_routes import user_bp
from src.core.models.user_model import User
from src.core.database import db

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
    app.register_blueprint(user_bp)
    with app.app_context():
        db.create_all()
        # テスト用ユーザー作成
        user = User(
            username='testuser',
            email='test@example.com',
            first_name='Test',
            last_name='User',
            password_hash='dummyhash',
        )
        db.session.add(user)
        db.session.commit()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_get_user_by_username(client):
    res = client.get('/api/users/testuser')
    assert res.status_code == 200
    data = res.get_json()
    assert data['username'] == 'testuser'
    assert data['email'] == 'test@example.com'
    assert data['first_name'] == 'Test'
    assert data['last_name'] == 'User'
