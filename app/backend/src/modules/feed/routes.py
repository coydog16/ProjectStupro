"""
Feed（投稿一覧）APIルート定義
--------------------------
投稿の取得・作成・編集・削除エンドポイントを提供。
"""

from flask import Blueprint
from flask_jwt_extended import jwt_required
from .handlers import (
    get_feed_handler as feed_handler_impl,
    create_post_handler,
    update_post_handler,
    delete_post_handler,
)

feed_bp = Blueprint(
    "feed", __name__, url_prefix="/api/feed"
)


# 投稿一覧取得（全ユーザー or 指定ユーザー）
@feed_bp.route("/", methods=["GET"])
@feed_bp.route("/<string:username>", methods=["GET"])
@jwt_required(optional=True)
def get_feed_handler(username=None):
    return feed_handler_impl(username)


# 新規投稿
@feed_bp.route("/", methods=["POST"])
def create_post():
    return create_post_handler()


# 投稿編集
@feed_bp.route("/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    return update_post_handler(post_id)


# 投稿削除
@feed_bp.route("/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    return delete_post_handler(post_id)
