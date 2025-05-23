"""
アプリケーションのモジュール管理

このファイルではすべてのFlaskブループリントを集約し、
アプリケーションへの登録を容易にします。
"""
from src.modules.auth.routes import auth_bp
from src.modules.feed.routes import feed_bp  # feed_bpのインポートを追加

# すべての使用可能なブループリントのリスト
BLUEPRINTS = [
    auth_bp,
    feed_bp,  # feed_bpをブループリントのリストに追加
    # 他のモジュールが追加されたら、ここにそのブループリントを追加する
]


def register_all_blueprints(app):
    """すべてのブループリントをFlaskアプリケーションに登録する

    Args:
        app: Flaskアプリケーションインスタンス
    """
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)
