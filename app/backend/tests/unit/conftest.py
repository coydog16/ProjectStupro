"""
ユニットテスト用のconftest.py
テスト実行時の共通フィクスチャや設定を提供します
"""
import pytest
from unittest.mock import MagicMock, patch

from flask import Flask
from flask_jwt_extended import JWTManager


@pytest.fixture
def app_context():
    """モックのアプリケーションコンテキストを提供"""
    # Flaskアプリのモック
    app = Flask("test_app")
    app.config.update({
        "TESTING": True,
        "JWT_SECRET_KEY": "test-secret-key"
    })

    # JWTマネージャーの初期化
    JWTManager(app)

    # アプリケーションコンテキスト
    with app.app_context():
        yield
