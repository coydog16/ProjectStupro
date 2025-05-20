"""
ユーザーモデルおよび関連機能を提供するモジュール。
認証、権限管理などのユーザー関連処理を実装します。
"""
from datetime import datetime
import pytz
from sqlalchemy import select

from src.core.database import db
from src.core.security import get_password_hash, verify_password


# タイムゾーン定数
JST = pytz.timezone('Asia/Tokyo')


def get_jst_now():
    """現在の日本時間を返します。

    Returns:
        datetime: 日本時間の現在時刻
    """
    return datetime.now(pytz.UTC).astimezone(JST)


class User(db.Model):
    """ユーザーモデル - 認証・権限管理を担当"""

    # 基本属性
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    role = db.Column(db.String(20), default='user')

    # タイムスタンプ
    created_at = db.Column(db.DateTime, default=get_jst_now)
    updated_at = db.Column(
        db.DateTime,
        default=get_jst_now,
        onupdate=get_jst_now
    )

    # リレーションシップ
    # 一時的にコメントアウト(マイグレーション用)
    # profile = db.relationship(
    #     'UserProfile',
    #     backref='user',
    #     uselist=False,
    #     lazy='joined'
    # )

    # 一時的にコメントアウト(マイグレーション用)
    # avatar_image_id = db.Column(db.Integer, db.ForeignKey('images.id'))
    # avatar_image = db.relationship('Image', backref='users')

    @property
    def password(self):
        """パスワードへの直接アクセスを禁止するプロパティ。

        Returns:
            AttributeError: 常に例外を発生させ、パスワードへの直接アクセスを防ぎます
        """
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        """パスワードをハッシュ化して保存する。

        Args:
            password (str): 生のパスワード
        """
        self.password_hash = get_password_hash(password)

    def verify_password(self, password):
        """提供されたパスワードが保存されたハッシュと一致するか検証する。

        Args:
            password (str): 検証するパスワード

        Returns:
            bool: パスワードが一致する場合はTrue
        """
        return verify_password(self.password_hash, password)

    def __repr__(self):
        """デバッグ情報のためのオブジェクト表現。"""
        return f'<User {self.username}>'

    @property
    def full_name(self):
        """ユーザーのフルネームを取得する。

        名と姓が両方設定されている場合はそれらを結合し、
        そうでない場合はユーザー名を返します。

        Returns:
            str: フルネームまたはユーザー名
        """
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def to_dict(self):
        """ユーザーオブジェクトをJSON互換の辞書に変換する。

        APIレスポンスなどで使用するためのシリアライズ処理。

        Returns:
            dict: JSONに変換可能なユーザー情報の辞書
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

    # データベースクエリメソッド
    @staticmethod
    def find_by_username(session, username):
        """ユーザー名からユーザーを検索する。

        最新のSQLAlchemy構文（session.execute + select）を使用。

        Args:
            session: データベースセッション
            username (str): 検索するユーザー名

        Returns:
            User: 見つかったユーザーオブジェクト、または None
        """
        stmt = select(User).where(User.username == username)
        result = session.execute(stmt).scalars().first()
        return result

    @staticmethod
    def find_by_email(session, email):
        """メールアドレスからユーザーを検索する。

        最新のSQLAlchemy構文（session.execute + select）を使用。

        Args:
            session: データベースセッション
            email (str): 検索するメールアドレス

        Returns:
            User: 見つかったユーザーオブジェクト、または None
        """
        stmt = select(User).where(User.email == email)
        result = session.execute(stmt).scalars().first()
        return result

    # 権限関連メソッド
    def has_role(self, role_name):
        """指定されたロール名を持っているか確認する。

        Args:
            role_name (str): 確認するロール名

        Returns:
            bool: 指定されたロールを持っている場合はTrue
        """
        return self.role == role_name

    @property
    def is_admin(self):
        """ユーザーが管理者権限を持っているかどうかを確認する。

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
