"""
画像（アバター等）モデル
"""
from src.core.database import db
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    # 必要に応じて他のメタ情報も追加可能
