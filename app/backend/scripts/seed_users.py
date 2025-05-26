"""
ユーザー初期データ投入用シードスクリプト
管理者1名＋一般ユーザー5名を作成します
"""

from src.core.database import db
from src.core.models.user_model import User
from src.core.security import get_password_hash
import sys
from pathlib import Path


def seed_users():
    # 既存ユーザーを全削除
    from src.core.models.post_model import Post
    db.session.query(Post).delete()  # 投稿も一緒に消す（外部キー制約のため）
    db.session.query(User).delete()
    db.session.commit()
    users = [
        # 管理者
        User(
            username="coydog16",
            email="shimizu@example.com",
            password_hash=get_password_hash("adminpass123"),
            first_name="清水",
            last_name="祐太",
            is_active=True,
            role="admin",
        ),
        # 一般ユーザー
        User(
            username="kome",
            email="kina@example.com",
            password_hash=get_password_hash("userpass1"),
            first_name="喜納",
            last_name="一輝",
            is_active=True,
            role="user",
        ),
        User(
            username="user2",
            email="isobe@example.com",
            password_hash=get_password_hash("userpass2"),
            first_name="磯部",
            last_name="佑太",
            is_active=True,
            role="user",
        ),
        User(
            username="ozawa",
            email="ozawa@example.com",
            password_hash=get_password_hash("userpass3"),
            first_name="小澤",
            last_name="祐介",
            is_active=True,
            role="user",
        ),
        User(
            username="yabuki",
            email="yabuki@example.com",
            password_hash=get_password_hash("userpass4"),
            first_name="矢吹",
            last_name="風香",
            is_active=True,
            role="user",
        ),
        User(
            username="matsui",
            email="matsui@example.com",
            password_hash=get_password_hash("userpass5"),
            first_name="松井",
            last_name="悠",
            is_active=True,
            role="user",
        ),
    ]
    db.session.bulk_save_objects(users)
    db.session.commit()
    print("✅ 管理者1名＋一般ユーザー5名を作成しました（既存データは初期化済み）")


if __name__ == "__main__":
    # プロジェクトルートから実行してもパスが通るように調整
    current_dir = Path(__file__).resolve().parent
    sys.path.append(str(current_dir.parent))
    sys.path.append(str(current_dir.parent.parent))
    from src.core.database import db
    from app import app

    with app.app_context():
        seed_users()
