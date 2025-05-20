"""
AuthServiceのテスト

ユーザー認証、トークン生成、ユーザー登録機能のテスト
"""
import pytest
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock

from src.core.services.auth_service import AuthService


@pytest.fixture
def mock_user():
    """テスト用のユーザーモックを作成"""
    user = MagicMock()
    user.id = 1
    user.username = "test_user"
    user.email = "test@example.com"
    user.password_hash = "hashed_password"
    user.first_name = "Test"
    user.last_name = "User"
    return user


class TestAuthService:
    """AuthServiceのテストクラス"""
    
    def test_auth_user_success(self, mock_user):
        """正しい認証情報でユーザー認証が成功するかテスト"""
        with patch('src.core.services.auth_service.User') as MockUser:
            # モックのセットアップ
            mock_query = MagicMock()
            MockUser.query = mock_query
            mock_filter = MagicMock()
            mock_query.filter.return_value = mock_filter
            mock_filter.first.return_value = mock_user
            
            with patch('src.core.services.auth_service.verify_password', return_value=True):
                # テスト実行
                result = AuthService.auth_user("test_user", "correct_password")
                
                # 検証
                assert result == mock_user
                mock_query.filter.assert_called_once()

    def test_auth_user_invalid_credentials(self, mock_user):
        """不正な認証情報でユーザー認証が失敗するかテスト"""
        with patch('src.core.services.auth_service.User') as MockUser:
            # モックのセットアップ
            mock_query = MagicMock()
            MockUser.query = mock_query
            mock_filter = MagicMock()
            mock_query.filter.return_value = mock_filter
            mock_filter.first.return_value = mock_user
            
            with patch('src.core.services.auth_service.verify_password', return_value=False):
                # テスト実行
                result = AuthService.auth_user("test_user", "wrong_password")
                
                # 検証
                assert result is None

    def test_auth_user_user_not_found(self):
        """存在しないユーザーで認証が失敗するかテスト"""
        with patch('src.core.services.auth_service.User') as MockUser:
            # モックのセットアップ
            mock_query = MagicMock()
            MockUser.query = mock_query
            mock_filter = MagicMock()
            mock_query.filter.return_value = mock_filter
            mock_filter.first.return_value = None
            
            # テスト実行
            result = AuthService.auth_user("nonexistent_user", "any_password")
            
            # 検証
            assert result is None

    def test_create_token(self, mock_user):
        """トークン生成機能のテスト"""
        with patch('src.core.services.auth_service.create_access_token') as mock_access_token, \
             patch('src.core.services.auth_service.create_refresh_token') as mock_refresh_token, \
             patch('src.core.services.auth_service.datetime') as mock_datetime:

            # モックの設定
            mock_access_token.return_value = "fake_access_token"
            mock_refresh_token.return_value = "fake_refresh_token"
            mock_now = datetime(2023, 1, 1, 12, 0, 0)
            mock_datetime.now.return_value = mock_now

            # テスト実行
            result = AuthService.create_token(mock_user)

            # 検証
            assert result["access_token"] == "fake_access_token"
            assert result["refresh_token"] == "fake_refresh_token"
            assert result["expires_at"] == mock_now + timedelta(hours=1)

            # 呼び出し検証
            mock_access_token.assert_called_once()
            mock_refresh_token.assert_called_once()

    def test_register_user(self):
        """ユーザー登録機能のテスト"""
        with patch('src.core.services.auth_service.get_password_hash', return_value="hashed_pw"), \
             patch('src.core.services.auth_service.User') as MockUser, \
             patch('src.core.database.db') as mock_db:

            # モックの設定
            new_user_instance = MockUser.return_value

            # テスト実行
            result = AuthService.register_user(
                email="new@example.com",
                password="password123",
                username="new_user",
                first_name="New",
                last_name="User"
            )

            # 検証
            assert result == new_user_instance
            MockUser.assert_called_once_with(
                email="new@example.com",
                username="new_user",
                password_hash="hashed_pw",
                first_name="New",
                last_name="User"
            )
            mock_db.session.add.assert_called_once_with(new_user_instance)
            mock_db.session.commit.assert_called_once()
