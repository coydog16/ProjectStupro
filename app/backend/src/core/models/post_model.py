"""
Post（投稿）モデル
------------------
タスク・記事・通常投稿などを柔軟に扱える基盤モデル。
- 投稿者（user_id）・内容（content）・ピン止め・タスク・論理削除・記事区分（post_type）など多用途に対応。
- created_at/updated_atはJST（日本時間）で自動記録。
- Article（記事）やTask（タスク）などの拡張もこのモデルをベースに実装可能。
"""

from datetime import datetime
from zoneinfo import ZoneInfo

from src.core.database import db


# タイムゾーン定数
JST = ZoneInfo("Asia/Tokyo")


def get_jst_now():
    """現在の日本時間を返します。"""
    return datetime.now(tz=ZoneInfo("UTC")).astimezone(JST)


class Post(db.Model):
    """投稿（Post）モデル：タスク・記事・通常投稿などを柔軟に扱える基盤モデル"""

    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_pinned = db.Column(db.Boolean, default=False)
    pin_date = db.Column(db.DateTime)
    is_task = db.Column(db.Boolean, default=False)
    task_due_date = db.Column(db.DateTime)
    task_completed = db.Column(db.Boolean, default=False)
    task_completed_at = db.Column(db.DateTime)
    is_deleted = db.Column(db.Boolean, default=False)
    post_type = db.Column(db.String(20), default="feed")  # 'feed', 'article', 'task' など
    created_at = db.Column(db.DateTime, default=get_jst_now)
    updated_at = db.Column(db.DateTime, default=get_jst_now, onupdate=get_jst_now)

    user = db.relationship("User", backref="posts")

    def to_dict(self):
        """
        Postインスタンスを辞書型に変換して返す。
        日付・時刻系はISO8601文字列で返却。
        """
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "is_pinned": self.is_pinned,
            "pin_date": self.pin_date.isoformat() if self.pin_date else None,
            "is_task": self.is_task,
            "task_due_date": (self.task_due_date.isoformat() if self.task_due_date else None),
            "task_completed": self.task_completed,
            "task_completed_at": (self.task_completed_at.isoformat() if self.task_completed_at else None),
            "is_deleted": self.is_deleted,
            "post_type": self.post_type,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        """
        Postインスタンスのデバッグ用文字列表現。
        """
        return f"<Post id={self.id} user_id={self.user_id} type={self.post_type}>"
