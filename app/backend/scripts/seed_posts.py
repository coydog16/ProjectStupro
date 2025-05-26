"""
投稿タイムライン用のテストデータ(seed)投入スクリプト
Fakerでダミーユーザー＆投稿データを生成してDBに投入します。
"""

from faker import Faker
from random import randint, choice
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from src.core.database import db
from src.core.models.user_model import User
from src.core.models.post_model import Post

fake = Faker("ja_JP")

# 設定
USER_COUNT = 5
POSTS_PER_USER = 10
POST_TYPES = ["feed", "article", "task"]
JST = ZoneInfo("Asia/Tokyo")


def create_posts(users):
    for user in users:
        for _ in range(POSTS_PER_USER):
            post_type = choice(POST_TYPES)
            is_task = post_type == "task"
            is_article = post_type == "article"
            now = datetime.now(tz=JST)
            # 作成日を5〜20日前、期限日を作成日+1〜5日後に
            created_at = now - timedelta(days=randint(5, 20))
            task_due_date = created_at + timedelta(days=randint(1, 5)) if is_task else None
            post = Post(
                user_id=user.id,
                content=(fake.text(max_nb_chars=200) if not is_article else fake.text(max_nb_chars=800)),
                is_pinned=fake.boolean(chance_of_getting_true=10),
                pin_date=now if fake.boolean(chance_of_getting_true=10) else None,
                is_task=is_task,
                task_due_date=task_due_date,
                task_completed=(fake.boolean(chance_of_getting_true=30) if is_task else False),
                task_completed_at=(
                    now + timedelta(days=randint(1, 30))
                    if is_task and fake.boolean(chance_of_getting_true=30)
                    else None
                ),
                is_deleted=False,
                post_type=post_type,
                created_at=created_at,
                updated_at=now,
            )
            db.session.add(post)
    db.session.commit()


def main():
    print("--- Seeding posts only ---")
    users = User.query.all()
    if not users:
        print("ユーザーが存在しないため、先にseed_users.pyを実行してください。")
        return
    # 投稿データも初期化
    db.session.query(Post).delete()
    db.session.commit()
    create_posts(users)
    print("--- Done! ---")


if __name__ == "__main__":
    from src.core.database import db
    from app import app  # Flaskアプリをimport

    with app.app_context():  # アプリケーションコンテキストでラップ
        main()
