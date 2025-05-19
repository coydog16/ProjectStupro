from datetime import datetime, timezone, timedelta
import pytz
from werkzeug.security import generate_password_hash, check_password_hash
from src.core.database import db

# グローバルな環境変数を設定する（コード内で実行）
import os
os.environ["LC_ALL"] = "C.UTF-8"
os.environ["LANG"] = "C.UTF-8"

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

    # 最新のSQLAlchemy推奨アプローチを使用した静的メソッド
    @staticmethod
    def find_by_username(session, username):
        """
        ユーザー名からユーザーを検索する。

        新しいSQLAlchemy構文（session.execute + select）を使用。

        Args:
            session: データベースセッション
            username (str): 検索するユーザー名

        Returns:
            User: 見つかったユーザーオブジェクト、または None
        """
        from sqlalchemy import select
        stmt = select(User).where(User.username == username)
        result = session.execute(stmt).scalars().first()
        return result

    @staticmethod
    def find_by_email(session, email):
        """
        メールアドレスからユーザーを検索する。

        新しいSQLAlchemy構文（session.execute + select）を使用。

        Args:
            session: データベースセッション
            email (str): 検索するメールアドレス

        Returns:
            User: 見つかったユーザーオブジェクト、または None
        """
        from sqlalchemy import select
        stmt = select(User).where(User.email == email)
        result = session.execute(stmt).scalars().first()
        return result

    def has_role(self, role_name):
        return self.role == role_name

    @property
    def is_admin(self):
        """
        ユーザーが管理者権限を持っているかどうかを確認する。

        このプロパティは単にユーザーのロールが'admin'かどうかをチェックします。
        引数は不要で、プロパティとして直接アクセスできます。

        Returns:
            bool: ユーザーが管理者の場合はTrue、そうでない場合はFalse

        Example:
            user = User.find_by_username(db.session, "yamada")
            if user.is_admin:
                # 管理者向け処理
            else:
                # 一般ユーザー向け処理
        """
        return self.role == 'admin'
