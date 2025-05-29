# 管理者用ハンドラ（コントローラ）
from flask import jsonify
from src.core.models.user_model import User
from .admin_schema import AdminUserListResponse
from flask_jwt_extended import jwt_required
from .admin_permission import admin_required

@jwt_required()
@admin_required
def get_admin_users():
    users = User.query.all()
    # 必要な情報だけ返す
    # Pydantic v2対応: model_validateを使う
    result = [AdminUserListResponse.model_validate(u).model_dump() for u in users]
    return jsonify(result)

# 今後、ユーザー削除・権限管理・統計などもここに追加
