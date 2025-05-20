# app/config/test.py
# テスト環境用設定ファイル
import os
from datetime import timedelta

class Config:
    # 基本設定
    ENV = "testing"
    TESTING = True
    DEBUG = True
    SECRET_KEY = "test-secret-key"

    # データベース設定
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT設定
    JWT_SECRET_KEY = "jwt-test-secret-key-for-testing"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    # CORS設定
    CORS_ORIGINS = "*"
