"""
コアデータモデル定義

アプリケーション全体で使用するSQLAlchemyモデルを提供します。
"""

# 循環インポートを避けるために、実際の使用時にインポートする形に
# 明示的なインポートとエクスポート
from .user_model import User
from .image_model import Image

# サブモジュールのインポートを簡素化
__all__ = [
    "User",
    "Image",
]
