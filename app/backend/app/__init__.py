from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import os

# データベースとログインマネージャの初期化
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    """Flaskアプリケーションを作成して設定します"""
    app = Flask(__name__)
    
    # 設定
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///navstupro.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # 拡張機能の初期化
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'このページにアクセスするには、ログインしてくださいね'
    
    # サンプルルート
    @app.route('/')
    def index():
        return '<h1>Welcome to navStupro Flask!</h1><p>アプリケーション構築中です！</p>'
    
    return app
