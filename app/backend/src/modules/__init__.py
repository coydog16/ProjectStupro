"""
アプリケーションのモジュール管理

このファイルではすべてのFlaskブループリントを集約し、
アプリケーションへの登録を容易にします。
"""

from src.modules.auth.auth_routes import auth_bp
from src.modules.feed.feed_routes import feed_bp  # feed_bpのインポートを修正
from src.modules.admin.admin_routes import admin_bp
from src.modules.users_profile.user_routes import user_bp

# すべての使用可能なブループリントのリスト
BLUEPRINTS = [
    auth_bp,
    feed_bp,  # feed_bpをブループリントのリストに追加
    admin_bp,  # 管理者APIを追加
    user_bp,  # ユーザーAPIを追加
    # 他のモジュールが追加されたら、ここにそのブループリントを追加する
]


def register_all_blueprints(app):
    """すべてのブループリントをFlaskアプリケーションに登録する

    Args:
        app: Flaskアプリケーションインスタンス
    """
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)
