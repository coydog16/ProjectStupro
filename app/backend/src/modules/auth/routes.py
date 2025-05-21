"""
認証関連のルートハンドラ
ログイン、ユーザー登録、トークンリフレッシュなどのエンドポイントを提供
"""

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from src.core.database import db
from src.core.models.user_models import User
from src.core.schemas.user_schema import UserCreate, UserLogin, UserResponse
from src.core.services.auth_service import AuthService

# 認証関連のブループリント作成
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """ユーザーログイン
    ユーザー名またはメールアドレスとパスワードを受け取り、認証成功時はJWTトークンを発行する
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "無効なリクエストデータ"}), 400

    username_or_email = data.get('username') or data.get('email')
    password = data.get('password')
    if not username_or_email or not password:
        return jsonify({"error": "ユーザー名とパスワードは必須です"}), 400

    # ユーザー認証
    user = AuthService.auth_user(username_or_email, password)
    if not user:
        return jsonify({"error": "認証に失敗しました。ユーザー名またはパスワードが正しくありません"}), 401

    # トークン生成
    token_data = AuthService.create_token(user)
    user_info = UserResponse.from_orm(user).model_dump()
    response = {
        "message": "ログイン成功",
        "user": user_info,
        "access_token": token_data["access_token"],
        "refresh_token": token_data["refresh_token"],
        "expires_at": token_data["expires_at"].isoformat()
    }
    return jsonify(response), 200


@auth_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    """新規ユーザー登録
    管理者のみが新規ユーザーを登録できる
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user or not getattr(user, 'is_admin', False):
        return jsonify({"error": "管理者のみ登録可能です"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "無効なリクエストデータ"}), 400

    # 必須フィールドのチェック
    required_fields = ['email', 'username', 'password', 'first_name', 'last_name']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": "必須フィールドが不足しています", "missing_fields": missing_fields}), 400

    # メールアドレスとユーザー名の重複確認
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "このメールアドレスは既に登録されています"}), 409
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "このユーザー名は既に登録されています"}), 409

    try:
        # 新規ユーザー登録
        new_user = AuthService.register_user(
            email=data['email'],
            username=data['username'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )
        db.session.add(new_user)
        db.session.commit()
        user_info = UserResponse.from_orm(new_user).model_dump()
        return user_info, 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "ユーザー登録に失敗しました。\nおそらくメールアドレスまたはユーザー名が重複しています"}), 409
    except Exception as e:
        current_app.logger.error(f"Registration error: {e}")
        return jsonify({"message": "An unexpected error occurred"}), 500


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """リフレッシュトークンを使って新しいアクセストークンを生成"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "無効なユーザー"}), 401
    access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": access_token, "message": "アクセストークンを更新しました"}), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_info():
    """現在認証されているユーザーの情報を取得"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    user_info = UserResponse.from_orm(user).model_dump()
    return jsonify({"user": user_info}), 200
