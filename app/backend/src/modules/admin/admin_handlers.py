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
    result = []
    for u in users:
        data = u.to_dict()
        # 画像URLを追加
        data["avatar_image_file_path"] = u.avatar_image.file_path if u.avatar_image else None
        result.append(AdminUserListResponse.model_validate(data).model_dump())
    return jsonify(result)

# 今後、ユーザー削除・権限管理・統計などもここに追加
