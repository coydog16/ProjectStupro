# 管理者用統計・分析ロジック（例）
from src.core.models.user_model import User
from src.core.models.post_model import Post
from flask import jsonify
from flask_jwt_extended import jwt_required
from .admin_permission import admin_required

@jwt_required()
@admin_required
def get_admin_stats():
    user_count = User.query.count()
    post_count = Post.query.count()
    # 必要に応じて他の統計も追加
    return jsonify({
        'user_count': user_count,
        'post_count': post_count,
    })
