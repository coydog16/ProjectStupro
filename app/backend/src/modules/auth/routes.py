"""
Authentication-related route handlers
Provides endpoints for login, user registration, token refresh, etc.
"""

from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.core.models.user_model import User
from src.core.schemas.user_schema import UserResponse
from .handlers import login_handler, register_handler, refresh_token_handler, get_user_info_handler

# Create a blueprint for authentication-related routes
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


# ルーティングのみ定義

auth_bp.route('/login', methods=['POST'])(login_handler)
auth_bp.route('/register', methods=['POST'])(register_handler)
auth_bp.route('/refresh', methods=['POST'])(refresh_token_handler)
auth_bp.route('/me', methods=['GET'])(get_user_info_handler)
