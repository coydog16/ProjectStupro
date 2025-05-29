import pytest
from app import app

def test_admin_users(client):
    # 管理者でログインしてユーザー一覧APIを叩くテスト例
    # 実際のテスト実装は認証・DBセットアップに応じて調整
    response = client.get('/api/admin/users', headers={"Authorization": "Bearer <admin_token>"})
    assert response.status_code == 200
    assert isinstance(response.json, list)

# 他の管理APIのテストもここに追加
