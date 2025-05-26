from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import or_
from flask_jwt_extended import create_access_token, create_refresh_token

# 必要なモデルとスキーマをインポート
from src.core.models.user_model import User
from src.core.security import get_password_hash, verify_password


class AuthService:
    """認証関連のサービスクラス"""

    @staticmethod
    def auth_user(username_or_email: str, password: str) -> Optional[User]:
        """ユーザー認証を行い、認証成功時にUserオブジェクトを返す"""
        # ユーザーをユーザーネームかメールアドレスで検索
        user = User.query.filter(or_(User.username == username_or_email, User.email == username_or_email)).first()

        # ユーザーが存在し、パスワードが正しければユーザーを返す
        if user and verify_password(user.password_hash, password):
            return user

        # 認証失敗
        return None

    @staticmethod
    def create_token(user: User) -> dict:
        """JWTアクセストークンとリフレッシュトークンを作成"""
        # アクセストークンの有効期限（1時間）
        access_expires = timedelta(hours=1)
        # リフレッシュトークンの有効期限（7日）
        refresh_expires = timedelta(days=7)

        # JWTトークンの追加情報（クレーム）
        additional_claims = {
            "user_id": user.id,
            "email": user.email,
            # 必要があればrole情報を追加
            # "roles": [role.name for role in user.roles]
        }

        # トークン生成
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims=additional_claims,  # dict型のまま渡す
            expires_delta=access_expires,  # timedelta型のまま渡す
        )

        refresh_token = create_refresh_token(
            identity=str(user.id),
            additional_claims=additional_claims,
            expires_delta=refresh_expires,
        )

        # JWTトークン情報をまとめて返す
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_at": datetime.now() + access_expires,
        }

    @staticmethod
    def register_user(
        email: str,
        password: str,
        username: str,
        first_name: str,
        last_name: str,
        **kwargs,
    ) -> User:
        """新規ユーザー登録（必須フィールド明示）"""
        # パスワードのハッシュ化
        password_hash = get_password_hash(password)

        # 新規ユーザー作成
        new_user = User(
            email=email,
            username=username,
            password_hash=password_hash,
            first_name=first_name,
            last_name=last_name,
            **kwargs,  # その他のオプションフィールド
        )

        # データベースに保存
        from src.core.database import db

        db.session.add(new_user)
        db.session.commit()

        return new_user
