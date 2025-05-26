"""
コアスキーマ定義

アプリケーション全体で使用するPydanticスキーマを提供します。
"""

# ユーザー関連のスキーマをエクスポート
from .user_schema import UserCreate, UserLogin, UserResponse

# 公開するスキーマの一覧
__all__ = [
    "UserCreate",
    "UserLogin",
    "UserResponse",
]
