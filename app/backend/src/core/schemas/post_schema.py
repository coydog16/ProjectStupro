"""
Post（投稿）スキーマ
------------------
Feed表示・タスク化機能用のシリアライズ/バリデーション用スキーマ。
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    """
    投稿の基本情報（content, is_task, task_due_date）
    """
    content: str = Field(..., description="投稿内容")
    is_task: bool = Field(False, description="タスクフラグ")
    task_due_date: Optional[datetime] = Field(None, description="タスク期限")

class PostCreate(PostBase):
    """
    投稿作成用スキーマ
    """
    pass

class PostUpdate(PostBase):
    """
    投稿更新用スキーマ
    """
    is_pinned: Optional[bool] = Field(None, description="ピン止めフラグ")
    pin_date: Optional[datetime] = Field(None, description="ピン止め日時")
    task_completed: Optional[bool] = Field(None, description="タスク完了フラグ")
    task_completed_at: Optional[datetime] = Field(None, description="タスク完了日時")
    is_deleted: Optional[bool] = Field(None, description="論理削除フラグ")
    post_type: Optional[str] = Field(None, description="投稿タイプ")

class PostResponse(PostBase):
    """
    投稿レスポンス用スキーマ
    """
    id: int
    user_id: int
    is_pinned: bool
    pin_date: Optional[datetime]
    task_completed: bool
    task_completed_at: Optional[datetime]
    is_deleted: bool
    post_type: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
