# ユーザーAPIルート定義
from flask import Blueprint, jsonify
from src.core.models.user_model import User

user_bp = Blueprint('user', __name__, url_prefix='/api/users')

@user_bp.route('/<username>', methods=['GET'])
def get_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'Not found'}), 404
    data = user.to_dict()
    data['avatar_image_file_path'] = user.avatar_image.file_path if user.avatar_image else None
    return jsonify(data)
