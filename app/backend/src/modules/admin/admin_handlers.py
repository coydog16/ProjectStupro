# 管理者用ハンドラ（コントローラ）
from flask import jsonify, request
from src.core.models.user_model import User
from .admin_schema import AdminUserListResponse
from flask_jwt_extended import jwt_required
from .admin_permission import admin_required
from src.core.database import db

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

@jwt_required()
@admin_required
def delete_admin_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # 論理削除（is_activeをFalseにする）
    user.is_active = False
    db.session.commit()
    return jsonify({'message': 'User deleted'})

# 今後、ユーザー削除・権限管理・統計などもここに追加
