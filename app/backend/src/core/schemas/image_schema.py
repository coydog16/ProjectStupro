from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ImageResponse(BaseModel):
    id: int
    file_path: str
    uploaded_at: Optional[datetime]

    class Config:
        orm_mode = True
