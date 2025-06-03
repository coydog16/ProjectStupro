# 管理者用ハンドラ（コントローラ）
from flask import jsonify, request
from src.core.models.user_model import User
from ..schemas.admin_schema import AdminUserListResponse
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from src.core.database import db
from src.modules.post.post_model import Post

# 管理者権限チェック用デコレータ
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': '管理者権限が必要です'}), 403
        return fn(*args, **kwargs)
    return wrapper

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

@jwt_required()
@admin_required
def get_admin_stats():
    user_count = User.query.count()
    post_count = Post.query.count()
    return jsonify({
        'user_count': user_count,
        'post_count': post_count,
    })

# 今後、ユーザー削除・権限管理・統計などもここに追加
