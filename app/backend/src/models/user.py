from datetime import datetime, timezone, timedelta
import pytz
from werkzeug.security import generate_password_hash, check_password_hash
from src.core.database import db

JST = pytz.timezone('Asia/Tokyo')

def get_jst_now():
    return datetime.noe(pytz.UTC).astimezone(JST)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    create_at = db.Column(db.DateTime, default=get_jst_now)


