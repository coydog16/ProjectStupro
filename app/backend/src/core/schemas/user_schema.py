"""
ユーザーモデルのMarshmallowスキーマ定義

APIレスポンス用のシリアライズ/デシリアライズルールを定義します。
"""
from marshmallow import Schema, fields


class UserSchema(Schema):
    """ユーザーモデルのシリアライズ/デシリアライズ用スキーマ"""
    id = fields.Integer(dump_only=True)  # 読み取り専用
    username = fields.String(required=True)
    email = fields.Email(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    is_active = fields.Boolean()
    role = fields.String()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # パスワードは返却しない
    # password_hash = fields.String(load_only=True)  # 書き込み専用
