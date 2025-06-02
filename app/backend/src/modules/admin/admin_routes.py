# 管理者APIルート定義
from flask import Blueprint
from .admin_handlers import *

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

# 例: ユーザー一覧取得
admin_bp.add_url_rule('/users', view_func=get_admin_users, methods=['GET'])
# ユーザー削除API
admin_bp.add_url_rule('/users/<int:user_id>', view_func=delete_admin_user, methods=['DELETE'])
# 今後、他の管理APIもここに追加
