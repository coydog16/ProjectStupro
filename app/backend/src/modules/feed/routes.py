"""
Feed（投稿一覧）APIルート定義
--------------------------
投稿の取得・作成・編集・削除エンドポイントを提供。
"""

from flask import Blueprint
from .handlers import (
    get_feed_handler,
    create_post_handler,
    update_post_handler,
    delete_post_handler,
)

feed_bp = Blueprint("feed", __name__, url_prefix="/api/feed")

# 投稿一覧取得
feed_bp.route("/", methods=["GET"])(get_feed_handler)
# 新規投稿
feed_bp.route("/", methods=["POST"])(create_post_handler)
# 投稿編集
feed_bp.route("/<int:post_id>", methods=["PUT"])(update_post_handler)
# 投稿削除
feed_bp.route("/<int:post_id>", methods=["DELETE"])(delete_post_handler)
