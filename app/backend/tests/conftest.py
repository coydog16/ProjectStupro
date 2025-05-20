"""
pytest用のconftest.py
テスト実行時の共通フィクスチャや設定を提供します
"""
import pytest
from flask import Flask
from flask_jwt_extended import JWTManager

from src.core.database import db
from app import create_app


@pytest.fixture(scope="session")
def app():
    """テスト用のFlaskアプリケーションを作成"""
    app = create_app("test")
    
    # テスト用の設定
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret-key"
    })
    
    # JWTマネージャーの初期化
    JWTManager(app)
    
    # データベースの初期化
    from src.core.database import init_db
    init_db(app)
    
    # コンテキスト内でアプリを渡す
    with app.app_context():
        # 必要なテーブルのみを作成（外部キーの参照を回避）
        from sqlalchemy import MetaData, Table
        import inspect
        from src.core.models.user import User
        
        metadata = MetaData()
        
        # モデルからテーブルを抽出
        for attr in inspect.getmembers(User):
            if attr[0] == '__table__':
                table = attr[1]
                
                # 外部キーを持つカラムをコピーせずにテーブルを再作成
                new_table = Table(
                    table.name,
                    metadata,
                    *(c.copy() for c in table.columns if not c.foreign_keys)
                )
                
                new_table.create(db.engine)
        
        yield app
        
        # テスト後のクリーンアップ
        metadata.drop_all(bind=db.engine)
        db.session.remove()


@pytest.fixture
def client(app):
    """テスト用のクライアントを作成"""
    with app.test_client() as client:
        yield client


@pytest.fixture
def app_context(app):
    """アプリケーションコンテキストを提供"""
    with app.app_context():
        yield
