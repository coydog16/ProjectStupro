# app/config/dev.py
# 開発環境用設定ファイル（サンプル）
# このファイルをdev.pyにコピーして使用してください
import os
from datetime import timedelta


class Config:
    # 基本設定
    DEBUG = True
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    # データベース設定
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "postgresql://postgres:postgres@postgres:5432/navstupro_dev"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT設定
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-secret-key-dev")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # CORS設定
    CORS_ORIGINS = "*"
