"""
Feed（投稿一覧）APIハンドラ
--------------------------
投稿の取得・作成・編集・削除のロジックを実装。
"""

from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.core.models.post_model import Post
from src.core.models.user_model import User
from src.core.schemas.post_schema import PostResponse, PostCreate, PostUpdate
from src.core.database import db


# 投稿一覧取得
@jwt_required(optional=True)
def get_feed_handler():
    posts = (
        Post.query.filter(Post.is_deleted == False, Post.post_type.in_(["feed", "task"]))
        .order_by(Post.created_at.desc())
        .all()
    )
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
@jwt_required()
def create_post_handler():
    data = request.get_json()
    user_id = get_jwt_identity()
    schema = PostCreate(**data)
    post = Post(
        user_id=user_id,
        content=schema.content,
        is_task=schema.is_task,
        task_due_date=schema.task_due_date,
    )
    db.session.add(post)
    db.session.commit()
    # user情報を付与して返す
    user = User.query.get(user_id)
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
        if user else None
    )
    return jsonify(post_dict), 201


# 投稿編集
@jwt_required()
def update_post_handler(post_id):
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return jsonify({"error": "Permission denied"}), 403
    data = request.get_json()
    schema = PostUpdate(**data)
    for field, value in schema.dict(exclude_unset=True).items():
        setattr(post, field, value)
    db.session.commit()
    return jsonify(PostResponse.from_orm(post).dict()), 200


# 投稿削除
@jwt_required()
def delete_post_handler(post_id):
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return jsonify({"error": "Permission denied"}), 403
    post.is_deleted = True
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
