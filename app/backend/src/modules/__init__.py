"""
アプリケーションのモジュール管理

このファイルではすべてのFlaskブループリントを集約し、
アプリケーションへの登録を容易にします。
"""

from src.modules.post.post_routes import post_bp
from src.modules.users_profile.employee_routes import employee_bp

# すべての使用可能なブループリントのリスト
BLUEPRINTS = [
    post_bp,
    employee_bp,
    # 他のモジュールが追加されたら、ここにそのブループリントを追加する
]
