"""認証関連の処理を行うサービスクラス"""

from datetime import datetime, timedelta
from typing import Optional

from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import check_password_hash

from src.core.database import db
from src.core.models.user import User


class AuthService:
    """ユーザー認証に関するサービスクラス"""
    
    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[User]:
        """
        ユーザーの認証を行い、認証成功時にユーザーオブジェクトを返す
        
        Args:
            email: ユーザーのメールアドレス
            password: ユーザーのパスワード
            
        Returns:
            認証成功時はUserオブジェクト、失敗時はNone
        """
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            return user
        
        return None
    
    @staticmethod
    def create_tokens(user_id: int) -> dict:
        """
        ユーザーIDからJWTトークンを生成する
        
        Args:
            user_id: ユーザーID
            
        Returns:
            アクセストークンとリフレッシュトークンを含む辞書
        """
        # JWTクレーム（ペイロード）の作成
        identity = {"user_id": user_id}
        
        # トークンの有効期限を設定
        expires_delta = timedelta(hours=1)
        refresh_expires_delta = timedelta(days=30)
        
        # トークン作成
        access_token = create_access_token(
            identity=identity,
            expires_delta=expires_delta
        )
        refresh_token = create_refresh_token(
            identity=identity,
            expires_delta=refresh_expires_delta
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_in": int(expires_delta.total_seconds())
        }
    
    @staticmethod
    def update_last_login(user_id: int) -> None:
        """
        最終ログイン日時を更新する
        
        Args:
            user_id: ユーザーID
        """
        user = User.query.get(user_id)
        if user:
            user.last_login_at = datetime.utcnow()
            db.session.commit()
