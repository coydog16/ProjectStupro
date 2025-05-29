"""
ユーザー初期データ投入用シードスクリプト
管理者1名＋一般ユーザー5名を作成します
"""

from src.core.database import db
from src.core.models.user_model import User
from src.core.models.image_model import Image
from src.core.security import get_password_hash
import sys
from pathlib import Path


def seed_users():
    # 既存ユーザーを全削除
    from src.core.models.post_model import Post
    db.session.query(Post).delete()  # 投稿も一緒に消す（外部キー制約のため）
    db.session.query(User).delete()
    db.session.query(Image).delete()  # 画像も初期化
    db.session.commit()
    images = []
    for i in range(6):
        img = Image(
            file_path=f"https://picsum.photos/seed/avatar{i+1}/100/100",
        )
        db.session.add(img)
        images.append(img)
    db.session.commit()
    users = [
        # 管理者
        User(
            username="coydog16",
            email="shimizu@example.com",
            password_hash=get_password_hash("adminpass123"),
            first_name="祐太",
            last_name="清水",
            is_active=True,
            role="admin",
            avatar_image_id=images[0].id,
        ),
        # 一般ユーザー
        User(
            username="kome",
            email="kina@example.com",
            password_hash=get_password_hash("userpass1"),
            first_name="一輝",
            last_name="喜納",
            is_active=True,
            role="user",
            avatar_image_id=images[1].id,
        ),
        User(
            username="user2",
            email="isobe@example.com",
            password_hash=get_password_hash("userpass2"),
            first_name="佑太",
            last_name="磯部",
            is_active=True,
            role="user",
            avatar_image_id=images[2].id,
        ),
        User(
            username="ozawa",
            email="ozawa@example.com",
            password_hash=get_password_hash("userpass3"),
            first_name="祐介",
            last_name="小澤",
            is_active=True,
            role="user",
            avatar_image_id=images[3].id,
        ),
        User(
            username="yabuki",
            email="yabuki@example.com",
            password_hash=get_password_hash("userpass4"),
            first_name="風香",
            last_name="矢吹",
            is_active=True,
            role="user",
            avatar_image_id=images[4].id,
        ),
        User(
            username="matsui",
            email="matsui@example.com",
            password_hash=get_password_hash("userpass5"),
            first_name="悠",
            last_name="松井",
            is_active=True,
            role="user",
            avatar_image_id=images[5].id,
        ),
    ]
    db.session.bulk_save_objects(users)
    db.session.commit()
    print("✅ 管理者1名＋一般ユーザー5名を作成しました（既存データは初期化済み・ダミー画像も登録）")


if __name__ == "__main__":
    # プロジェクトルートから実行してもパスが通るように調整
    current_dir = Path(__file__).resolve().parent
    sys.path.append(str(current_dir.parent))
    sys.path.append(str(current_dir.parent.parent))
    from src.core.database import db
    from app import app

    with app.app_context():
        seed_users()
