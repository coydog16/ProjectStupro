"""
ユーザー関連のPydanticスキーマ定義

ユーザーの作成、認証、レスポンス形式を定義するモジュールです。
フォーム入力のバリデーションやAPIレスポンスの一貫性を保証します。
"""

from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=50, description="ユーザー名（英数字のみ）")
    email: EmailStr = Field(..., description="メールアドレス")
    password: str = Field(..., min_length=8, description="パスワード（大文字・小文字・数字を含む）")
    first_name: str = Field(..., max_length=50, description="名")
    last_name: str = Field(..., max_length=50, description="姓")

    @field_validator('username')
    @classmethod
    def validate_user_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('ユーザー名は英数字のみ使用可能です')
        return v

    @field_validator('username', 'email', 'password', 'first_name', 'last_name')
    @classmethod
    def validate_not_empty(cls, v, info):
        if not str(v).strip():
            field_name = info.field_name
            field_labels = {
                'username': 'ユーザー名',
                'email': 'メールアドレス',
                'password': 'パスワード',
                'first_name': '名',
                'last_name': '姓'
            }
            label = field_labels.get(field_name, field_name)
            raise ValueError(f'{label}は必須です')
        return v

    @field_validator('password')
    @classmethod
    def validate_password_strength(cls, v):
        conditions = [
            any(c.isupper() for c in v),
            any(c.islower() for c in v),
            any(c.isdigit() for c in v)
        ]
        if not all(conditions):
            raise ValueError('パスワードは大文字、小文字、数字をそれぞれ１つ以上含めてください')
        return v

class UserLogin(BaseModel):
    username: str = Field(..., min_length=1, max_length=50, description="ログイン用ユーザー名")
    password: str = Field(..., min_length=1, description="ログイン用パスワード")

    @field_validator('username', 'password')
    @classmethod
    def validate_not_empty(cls, v, info):
        if not v.strip():
            field_labels = {
                'username': 'ユーザー名',
                'password': 'パスワード'
            }
            label = field_labels.get(info.field_name, '入力')
            raise ValueError(f'{label}は必須です')
        return v

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    is_active: bool
    role: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": 1,
                "username": "yamada_taro",
                "email": "yamada@example.com",
                "first_name": "太郎",
                "last_name": "山田",
                "is_active": True,
                "role": "user",
                "created_at": "2025-05-20T09:00:00+09:00",
                "updated_at": "2025-05-20T10:00:00+09:00"
            }
        }
    }
