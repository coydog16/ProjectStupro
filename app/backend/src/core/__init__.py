"""
アプリケーションのcore機能のブループリント管理

このファイルではcore機能のFlaskブループリントを集約し、
アプリケーションへの登録を容易にします。
"""

from src.core.routes.auth_routes import auth_bp
from src.core.routes.user_routes import user_bp
from src.core.routes.admin_routes import admin_bp

# すべての使用可能なブループリントのリスト
BLUEPRINTS = [
    auth_bp,
    user_bp,
    admin_bp,  # 管理者APIを追加
    # 他のcoreモジュールが追加されたら、ここにそのブループリントを追加する
]
