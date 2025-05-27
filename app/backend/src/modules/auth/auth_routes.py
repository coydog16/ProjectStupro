"""
Authentication-related route handlers
Provides endpoints for login, user registration, token refresh, etc.
"""

from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.core.models.user_model import User
from src.core.schemas.user_schema import UserResponse
from .auth_handlers import (
    login_handler,
    register_handler,
    refresh_token_handler,
    get_user_info_handler,
)

# Create a blueprint for authentication-related routes
auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# ログイン
@auth_bp.route("/login", methods=["POST"])
def login():
    return login_handler()


# ユーザー登録
@auth_bp.route("/register", methods=["POST"])
def register():
    return register_handler()


# トークンリフレッシュ
@auth_bp.route("/refresh", methods=["POST"])
def refresh():
    return refresh_token_handler()


# ユーザー情報取得
@auth_bp.route("/me", methods=["GET"])
def get_me():
    return get_user_info_handler()
