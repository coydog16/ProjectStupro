"""
Feed（投稿一覧）APIルート定義
--------------------------
投稿の取得・作成・編集・削除エンドポイントを提供。
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.core.models.post_model import Post
from src.core.models.user_model import User
from .handlers import (
    get_feed_handler,
    create_post_handler,
    update_post_handler,
    delete_post_handler,
)

feed_bp = Blueprint("feed", __name__, url_prefix="/api/feed")

# 投稿一覧取得（全ユーザー or 指定ユーザー）
@feed_bp.route("/", methods=["GET"])
@feed_bp.route("/<string:username>", methods=["GET"])
@jwt_required(optional=True)
def get_feed_handler(username=None):
    query = Post.query.filter(Post.is_deleted == False, Post.post_type.in_(["feed", "task"]))
    if username:
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"error": "ユーザーが見つかりません"}), 404
        query = query.filter(Post.user_id == user.id)
    posts = query.order_by(Post.created_at.desc()).all()
    result = []
    for post in posts:
        user = User.query.get(post.user_id)
        post_dict = post.to_dict()
        post_dict["user"] = (
            {
                "id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "avatar_image_id": getattr(user, "avatar_image_id", None),
            }
            if user
            else None
        )
        result.append(post_dict)
    return jsonify(result), 200

# 新規投稿
feed_bp.route("/", methods=["POST"])(create_post_handler)
# 投稿編集
feed_bp.route("/<int:post_id>", methods=["PUT"])(update_post_handler)
# 投稿削除
feed_bp.route("/<int:post_id>", methods=["DELETE"])(delete_post_handler)
