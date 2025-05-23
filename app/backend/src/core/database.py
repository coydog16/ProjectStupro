"""
データベース接続モジュール
"""
# ここにデータベース接続設定を追加します

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# SQLAlchemyインスタンス作成
db = SQLAlchemy()

# Migrateインスタンスを作成
migrate = Migrate()

def init_db(app):
    """
    FlaskアプリにSQLAlchemyとMigrateを初期化する関数
    """
    db.init_app(app)
    migrate.init_app(app, db)

    # モデルクラスをインポートして、マイグレーション時に検出されるように
    # ※循環インポートを避けてここでモデルをインポートする

    from src.core.models.user_model import User
