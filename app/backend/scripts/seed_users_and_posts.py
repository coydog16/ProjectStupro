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

fake = Faker('ja_JP')

# 設定
USER_COUNT = 5
POSTS_PER_USER = 10
POST_TYPES = ['feed', 'article', 'task']
JST = ZoneInfo('Asia/Tokyo')


def create_users():
    users = []
    for _ in range(USER_COUNT):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            password=fake.password(length=12),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            is_active=True,
            role='user',
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()
    return users


def create_posts(users):
    for user in users:
        for _ in range(POSTS_PER_USER):
            post_type = choice(POST_TYPES)
            is_task = post_type == 'task'
            is_article = post_type == 'article'
            now = datetime.now(tz=JST)
            post = Post(
                user_id=user.id,
                content=fake.text(max_nb_chars=200) if not is_article else fake.text(max_nb_chars=800),
                is_pinned=fake.boolean(chance_of_getting_true=10),
                pin_date=now if fake.boolean(chance_of_getting_true=10) else None,
                is_task=is_task,
                task_due_date=now + timedelta(days=randint(1, 30)) if is_task else None,
                task_completed=fake.boolean(chance_of_getting_true=30) if is_task else False,
                task_completed_at=now + timedelta(days=randint(1, 30)) if is_task and fake.boolean(chance_of_getting_true=30) else None,
                is_deleted=False,
                post_type=post_type,
                created_at=now - timedelta(days=randint(0, 30)),
                updated_at=now,
            )
            db.session.add(post)
    db.session.commit()


def main():
    print('--- Seeding users and posts ---')
    users = create_users()
    create_posts(users)
    print('--- Done! ---')

if __name__ == '__main__':
    from src.core.database import db
    with db.session.begin():
        main()
