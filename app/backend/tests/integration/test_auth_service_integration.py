"""
AuthServiceモック統合テスト

データベースを使用せずにAuthServiceをテストします
"""
import pytest
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock
from src.core.services.auth_service import AuthService
from src.core.models.user import User


@pytest.fixture
def mocked_user():
    """テスト用の完全なユーザーモック"""
    user = MagicMock()
    user.id = 1
    user.email = "test_mock@example.com"
    user.username = "test_mock_user"
    user.password_hash = "hashed_test_password"
    user.first_name = "Test"
    user.last_name = "Mock"
    user.is_active = True
    user.role = "user"
    user.created_at = datetime.now()
    user.updated_at = datetime.now()
    return user


class TestAuthServiceMockIntegration:
    """AuthServiceのモック統合テストクラス"""

    def test_auth_user_with_mock(self, mocked_user):
        """モックを使用した認証テスト"""
        # ModelのMockは直接クラスをモックするだけにします（Userオブジェクトの代わりにただのモック）
        with patch('src.core.services.auth_service.User') as MockUser, \
             patch('src.core.services.auth_service.verify_password') as mock_verify:

            # モックの設定
            mock_query = MagicMock()
            MockUser.query = mock_query
            mock_filter = MagicMock()
            mock_query.filter.return_value = mock_filter
            mock_filter.first.return_value = mocked_user

            # パスワード検証のモック設定
            mock_verify.return_value = True

            # 正しい認証情報での認証
            result = AuthService.auth_user("test_mock@example.com", "correct_password")
            assert result == mocked_user

            # 不正な認証情報での認証
            mock_verify.return_value = False
            result = AuthService.auth_user("test_mock@example.com", "wrong_password")
            assert result is None

    def test_create_token_with_mock(self, mocked_user):
        """モックを使用したトークン生成テスト"""
        # フラスクJWTの関数を直接モックする
        with patch('src.core.services.auth_service.create_access_token', return_value="mock_access_token"), \
             patch('src.core.services.auth_service.create_refresh_token', return_value="mock_refresh_token"), \
             patch('src.core.services.auth_service.datetime') as mock_datetime:

            # 日時のモック設定
            mock_now = datetime(2023, 1, 1, 12, 0, 0)
            mock_datetime.now.return_value = mock_now

            # テスト実行
            result = AuthService.create_token(mocked_user)

            # 検証
            assert result["access_token"] == "mock_access_token"
            assert result["refresh_token"] == "mock_refresh_token"
            assert result["expires_at"] == mock_now + timedelta(hours=1)

    def test_register_user_with_mock(self):
        """モックを使用したユーザー登録テスト"""
        with patch('src.core.services.auth_service.User') as MockUser, \
             patch('src.core.services.auth_service.get_password_hash', return_value="mock_hashed_pw"), \
             patch('src.core.database.db') as mock_db:

            # モックの設定
            mock_new_user = MagicMock()
            MockUser.return_value = mock_new_user

            # テスト実行
            result = AuthService.register_user(
                email="new_mock@example.com",
                password="new_password",
                username="new_mock_user",
                first_name="New",
                last_name="Mock"
            )

            # 検証
            assert result == mock_new_user
            MockUser.assert_called_once_with(
                email="new_mock@example.com",
                username="new_mock_user",
                password_hash="mock_hashed_pw",
                first_name="New",
                last_name="Mock"
            )
            mock_db.session.add.assert_called_once_with(mock_new_user)
            mock_db.session.commit.assert_called_once()
