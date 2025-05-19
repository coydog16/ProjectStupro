from datetime import datetime, timezone, timedelta
import pytz
from werkzeug.security import generate_password_hash, check_password_hash
from src.core.database import db

JST = pytz.timezone('Asia/Tokyo')

def get_jst_now():
    return datetime.now(pytz.UTC).astimezone(JST)

class User(db.Model):
    """ユーザーモデル - 認証・権限管理を担当"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=get_jst_now)
    updated_at = db.Column(db.DateTime, default=get_jst_now, onupdate=get_jst_now)
    role = db.Column(db.String(20), default='user')

    profile = db.relationship('UserProfile', backref='user', uselist=False, lazy='joined')

    avatar_image_id = db.Column(db.Integer, db.ForeignKey('images.id'))
    avatar_image = db.relationship('Image', backref='users')

    @property
    def password(self):
        """
        パスワードへの直接アクセスを禁止するプロパティ。

        Returns:
            AttributeError: 常に例外を発生させ、パスワードへの直接アクセスを防ぎます
        """
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

    @property
    def full_name(self):
        """
        ユーザーのフルネームを取得する。

        名と姓が両方設定されている場合はそれらを結合し、
        そうでない場合はユーザー名を返します。
        """
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def to_dict(self):
        """
        ユーザーオブジェクトをJSON互換の辞書に変換する。
        APIレスポンスなどで使用するためのシリアライズ処理。
        """
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.full_name,
            'is_active': self.is_active,
            'role': self.role,
            'avatar_image_id': self.avatar_image_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def has_role(self, role_name):
        return self.role == role_name

    @property
    def is_admin(self):
        return self.role == 'admin'
