"""
ユーザーモデルおよび関連機能を提供するモジュール。
認証、権限管理などのユーザー関連処理を実装します。
"""

from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy import select

from src.core.database import db
from src.core.security import get_password_hash, verify_password

# タイムゾーン定数
JST = ZoneInfo("Asia/Tokyo")


def get_jst_now():
    """現在の日本時間を返します。"""
    return datetime.now(tz=ZoneInfo("UTC")).astimezone(JST)


class User(db.Model):
    """ユーザーモデル - 認証・権限管理を担当"""

    __tablename__ = "users"
    # 基本属性
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    role = db.Column(db.String(20), default="user")
    # タイムスタンプ
    created_at = db.Column(db.DateTime, default=get_jst_now)
    updated_at = db.Column(db.DateTime, default=get_jst_now, onupdate=get_jst_now)
    # リレーションシップ
    # profile = db.relationship(
    #     'UserProfile', backref='user', uselist=False, lazy='joined')
    # avatar_image_id = db.Column(db.Integer, db.ForeignKey('images.id'))
    # avatar_image = db.relationship('Image', backref='users')

    # パスワードは読み取り不可
    @property
    def password(self):
        raise AttributeError("password is not a readable attribute")

    # パスワード設定時はハッシュ化
    @password.setter
    def password(self, password):
        self.password_hash = get_password_hash(password)

    # パスワード検証
    def verify_password(self, password):
        return verify_password(self.password_hash, password)

    def __repr__(self):
        """
        Userインスタンスのデバッグ用文字列表現。
        """
        return f"<User id={self.id} username={self.username} email={self.email}>"

    # 氏名のフルネーム取得
    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def to_dict(self):
        """
        Userインスタンスを辞書型に変換して返す。
        日付・時刻系はISO8601文字列で返却。
        """
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": self.full_name,
            "is_active": self.is_active,
            "role": self.role,
            "avatar_image_id": getattr(self, "avatar_image_id", None),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    @staticmethod
    def find_by_username(session, username):
        stmt = select(User).where(User.username == username)
        result = session.execute(stmt).scalars().first()
        return result

    @staticmethod
    def find_by_email(session, email):
        stmt = select(User).where(User.email == email)
        result = session.execute(stmt).scalars().first()
        return result

    def has_role(self, role_name):
        return self.role == role_name

    @property
    def is_admin(self):
        return self.role == "admin"
