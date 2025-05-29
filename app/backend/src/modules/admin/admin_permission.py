# 管理者権限チェック用デコレータ
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from src.core.models.user_model import User
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': '管理者権限が必要です'}), 403
        return fn(*args, **kwargs)
    return wrapper
