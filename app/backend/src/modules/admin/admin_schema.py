# 管理API用スキーマ
from pydantic import BaseModel
from typing import Optional

class AdminUserListResponse(BaseModel):
    id: int
    username: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    is_active: Optional[bool]
    role: Optional[str]
    avatar_image_id: Optional[int]

    class Config:
        orm_mode = True

# 今後、管理API用のリクエスト・レスポンススキーマをここに追加
