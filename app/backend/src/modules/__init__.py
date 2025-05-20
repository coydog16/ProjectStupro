"""
アプリケーションのモジュール管理

このファイルではすべてのFlaskブループリントを集約し、
アプリケーションへの登録を容易にします。
"""
from src.modules.auth.routes import auth_bp

# すべての使用可能なブループリントのリスト
BLUEPRINTS = [
    auth_bp,
    # 他のモジュールが追加されたら、ここにそのブループリントを追加する
]


def register_all_blueprints(app):
    """すべてのブループリントをFlaskアプリケーションに登録する
    
    Args:
        app: Flaskアプリケーションインスタンス
    """
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)