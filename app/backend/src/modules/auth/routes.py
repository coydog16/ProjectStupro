"""
認証関連のルートハンドラ
ログイン、ユーザー登録、トークンリフレッシュなどのエンドポイントを提供
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from src.core.services.auth_service import AuthService  # 認証サービス
from src.core.models.user import User  # Userモデルをインポート
from src.core.schemas.user import UserSchema

# 認証関連のブループリント作成
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# ユーザースキーマ（シリアライズ用）
user_schema = UserSchema()

@auth_bp.route('/login', methods=['POST'])
def login():
    """ユーザーログイン

    ユーザー名またはメールアドレスとパスワードを受け取り、
    認証成功時はJWTトークンを発行する
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "無効なリクエストデータ"}), 400

    username_or_email = data.get('username') or data.get('email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({"error": "ユーザー名とパスワードは必須です"}), 400

    # ここにAuthServiceを使った認証ロジックを書く...

    # 成功した場合のレスポンス
    return jsonify({
        "message": "ログイン成功",
        "token": "発行されたトークン"
    }), 200

@auth_bp.route('/register',methods=['POST'])
def register():
    """新規ユーザー登録

    ユーザー情報を受け取り、新しいユーザーを作成する
    """
    # 登録ロジック
    pass

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True) # リフレッシュトークン必須
def refresh_token():
    """リフレッシュトークンを使って新しいアクセストークンを生成"""
    # トークン更新ロジック
    pass

@auth_bp.route('/me', methods=['GET'])
@jwt_required() # リフレッシュトークン必須
def get_user_info():
    """現在認証されているユーザーの情報を取得"""
    # ユーザー情報取得ロジック
    pass
