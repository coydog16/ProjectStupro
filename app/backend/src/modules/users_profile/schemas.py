from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime


class UserProfileResponse(BaseModel):
    """ユーザープロフィール詳細情報スキーマ

    ユーザーの追加情報（職業詳細、SNSリンクなど）を含むプロフィール情報を
    API応答として返すためのスキーマです。
    """

    user_id: int
    job_title: Optional[str] = None
    department: Optional[str] = None
    years_experience: Optional[int] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    linkedin_url: Optional[str] = None

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "user_id": 1,
                "job_title": "シニアエンジニア",
                "department": "開発部",
                "years_experience": 5,
                "github_url": "https://github.com/yamada-taro",
                "twitter_url": "https://twitter.com/yamada_taro",
                "linkedin_url": "https://linkedin.com/in/yamada-taro",
            }
        },
    }


class UserProfileUpdate(BaseModel):
    """ユーザープロフィール更新スキーマ

    ユーザーの追加プロフィール情報を更新する際に使用します。
    すべてのフィールドはオプショナルで、指定されたフィールドのみが更新されます。
    """

    job_title: Optional[str] = Field(None, max_length=100, description="役職名")
    department: Optional[str] = Field(None, max_length=100, description="部署名")
    years_experience: Optional[int] = Field(None, ge=0, le=100, description="経験年数")
    github_url: Optional[str] = Field(None, max_length=255, description="GitHubプロフィールURL")
    twitter_url: Optional[str] = Field(None, max_length=255, description="TwitterプロフィールURL")
    linkedin_url: Optional[str] = Field(None, max_length=255, description="LinkedInプロフィールURL")

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "job_title": "リードエンジニア",
                "years_experience": 7,
                "github_url": "https://github.com/yamada-taro-new",
            }
        },
    }
