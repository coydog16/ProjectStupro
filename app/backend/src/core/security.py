"""
セキュリティ関連の機能を提供するモジュール

パスワードハッシュ化、認証トークン生成などの
アプリケーション全体で使用するセキュリティ機能を集約します。
"""

from werkzeug.security import generate_password_hash, check_password_hash


def get_password_hash(password: str) -> str:
    """
    パスワードをハッシュ化する

    Args:
        password (str): ハッシュ化する生のパスワード

    Returns:
        str: ハッシュ化されたパスワード文字列
    """
    return generate_password_hash(password)


def verify_password(hashed_password: str, plain_password: str) -> bool:
    """
    ハッシュ化されたパスワードと平文パスワードを比較検証する

    Args:
        hashed_password (str): 保存されているハッシュ化パスワード
        plain_password (str): 検証する平文パスワード

    Returns:
        bool: パスワードが一致する場合はTrue
    """
    return check_password_hash(hashed_password, plain_password)
