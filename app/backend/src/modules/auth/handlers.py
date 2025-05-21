from flask import request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from sqlalchemy.exc import IntegrityError
from src.core.database import db
from src.core.models.user_models import User
from src.core.schemas.user_schema import UserResponse
from src.core.services.auth_service import AuthService
from .validators import validate_register_data

# --- LOGIN HANDLER ---
def login_handler():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request data"}), 400
    username_or_email = data.get('username') or data.get('email')
    password = data.get('password')
    if not username_or_email or not password:
        return jsonify({"error": "Username and password are required"}), 400
    user = AuthService.auth_user(username_or_email, password)
    if not user:
        return jsonify({"error": "Authentication failed. Invalid username or password."}), 401
    token_data = AuthService.create_token(user)
    user_info = UserResponse.model_validate(user).model_dump()
    response = {
        "message": "Login successful",
        "user": user_info,
        "access_token": token_data["access_token"],
        "refresh_token": token_data["refresh_token"],
        "expires_at": token_data["expires_at"].isoformat()
    }
    return jsonify(response), 200

# --- REGISTER HANDLER ---
@jwt_required()
def register_handler():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not getattr(user, 'is_admin', False):
        return jsonify({"error": "Only administrators can register users"}), 403
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request data"}), 400
    errors = validate_register_data(data)
    if errors:
        # detailsに必ず全てのエラー内容を含める
        return jsonify({"error": "Validation error", "details": errors}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "This email address is already registered"}), 409
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "This username is already taken"}), 409
    try:
        new_user = AuthService.register_user(
            email=data['email'],
            username=data['username'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        db.session.add(new_user)
        db.session.commit()
        user_info = UserResponse.model_validate(new_user).model_dump()
        return user_info, 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "User registration failed. Email or username may already exist."}), 409
    except Exception as e:
        current_app.logger.error(f"Registration error: {e}")
        return jsonify({"message": "An unexpected error occurred"}), 500

# --- REFRESH TOKEN HANDLER ---
@jwt_required(refresh=True)
def refresh_token_handler():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Invalid user"}), 401
    access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": access_token, "message": "Access token refreshed"}), 200

# --- GET USER INFO HANDLER ---
@jwt_required()
def get_user_info_handler():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user_info = UserResponse.model_validate(user).model_dump()
    return jsonify({"user": user_info}), 200
