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

    # ユーザー認証
    user = AuthService.auth_user(username_or_email, password)

    if not user:
        #認証失敗
        return jsonify({"error": "認証に失敗しました。ユーザー名、またはパスワードが正しくありません"}), 401

    token_data = AuthService.create_token(user)

    response = {
        "message": "ログイン成功",
        "user": user_schema.dump(user), # ユーザー情報をシリアライズ
        "access_token": token_data["access_token"],
        "refresh_token": token_data["refresh_token"],
        "expires_at": token_data["expires_at"].isoformat() # ISO形式の文字列に変換
    }

    return jsonify(response), 200

@auth_bp.route('/register',methods=['POST'])
def register():
    """新規ユーザー登録

    ユーザー情報を受け取り、新しいユーザーを作成する
    """

    data = request.get_json()

    if not data:
        return jsonify({"error": "無効なリクエストデータ"}), 400

    required_fields = ['email', 'username', 'password', 'first_name', 'last_name']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({
            "error": "必須フィールドが不足しています",
            "missing_fields": missing_fields
        }), 400

    # メールアドレスとユーザー名の重複確認
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "このメールアドレスは既に登録されています"}),409

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "このユーザー名は既に登録されています"}),409

    try:
        # 新規ユーザー登録
        new_user = AuthService.register_user(
            email=data['email'],
            username=data['username'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name']
        )

        # トークン生成
        token_data = AuthService.create_token(new_user)

        # レスポンス作成
        response = {
            "message": "ユーザー登録に成功しました",
            "user": user_schema.dump(new_user),
            "access_token": token_data["access_token"],
            "refresh_token": token_data["refresh_token"],
            "expires_at": token_data["expires_at"].isoformat()
        }

        return jsonify(response), 201

    except Exception as e:
        return jsonify({"error": f"ユーザー登録に失敗しました: {str(e)}"}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True) # リフレッシュトークン必須
def refresh_token():
    """リフレッシュトークンを使って新しいアクセストークンを生成"""
# リフレッシュトークンからユーザーIDを取得
    current_user_id = get_jwt_identity()

    # ユーザーの存在確認
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "無効なユーザー"}), 401

    # 新しいアクセストークンの生成
    access_token = create_access_token(identity=current_user_id)

    return jsonify({
        "access_token": access_token,
        "message": "アクセストークンを更新しました"
    }), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required() # アクセストークン必須
def get_user_info():
    """現在認証されているユーザーの情報を取得"""
    # トークンからユーザーIDを取得
    current_user_id = get_jwt_identity()

    # データベースからユーザーを検索
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404

    # ユーザー情報を返す (パスワードハッシュなどの機密情報は除外)
    return jsonify({
        "user": user_schema.dump(user)
    }), 200
