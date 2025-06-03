"""
Post（投稿）APIハンドラ
--------------------------
投稿の取得・作成・編集・削除のロジックを実装。
"""

from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.modules.post.post_model import Post
from src.core.models.user_model import User
from src.modules.post.post_schema import (
    PostCreate, PostUpdate, PostResponse
)
from src.core.database import db

# 投稿一覧取得
@jwt_required(optional=True)
def get_post_handler(username=None):
    """
    投稿一覧を取得。
    - username指定時: 指定ユーザーの投稿のみ返す
    - 指定なし: 全ユーザーの投稿を返す
    """
    query = Post.query.filter(
        Post.is_deleted == False,
        Post.post_type.in_(["feed", "task"])
    )
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
                "avatar_image_file_path": user.avatar_image.file_path if user.avatar_image else None,  # 追加
            }
            if user else None
        )
        result.append(post_dict)
    return jsonify(result), 200

# 新規投稿
@jwt_required()
def create_post_handler():
    """
    新規投稿を作成。
    """
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
            "avatar_image_file_path": user.avatar_image.file_path if user.avatar_image else None,  # 追加
        }
        if user else None
    )
    return jsonify(post_dict), 201

# 投稿編集
@jwt_required()
def update_post_handler(post_id):
    """
    投稿を編集。
    - 自分の投稿のみ編集可能
    """
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()
    # 型を揃えて比較（int型に統一）
    try:
        if int(post.user_id) != int(user_id):
            return jsonify({"error": "Permission denied"}), 403
    except Exception:
        return jsonify({"error": "Invalid user_id type"}), 403
    data = request.get_json()
    schema = PostUpdate(**data)
    for field, value in schema.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    db.session.commit()
    # Pydantic v2対応: from_ormの代わりにmodel_validateを使用
    return jsonify(PostResponse.model_validate(post).model_dump()), 200

# 投稿削除
@jwt_required()
def delete_post_handler(post_id):
    """
    投稿を論理削除。
    - 自分の投稿のみ削除可能
    """
    post = Post.query.get_or_404(post_id)
    user_id = get_jwt_identity()
    # 型を揃えて比較（int型に統一）
    try:
        if int(post.user_id) != int(user_id):
            return jsonify({"error": "Permission denied"}), 403
    except Exception:
        return jsonify({"error": "Invalid user_id type"}), 403
    post.is_deleted = True
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
