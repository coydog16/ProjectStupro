import re
from email.utils import parseaddr


def validate_register_data(data):
    """
    ユーザー登録データのバリデーション。
    エラーがあればdictで返し、なければ空dictを返す。
    """
    errors = {}
    required_fields = [
        "email", "username", "password", "first_name", "last_name"
    ]
    # None, 空文字、スペースのみはmissing扱い
    missing_fields = [
        field for field in required_fields
        if field not in data or not str(data.get(field)).strip()
    ]
    if missing_fields:
        errors["missing_fields"] = missing_fields

    # Email形式チェック
    email = data.get("email", "")
    email_regex = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    if email and not re.match(email_regex, email):
        errors["email"] = "Invalid email format"

    # ユーザー名: 英数字・アンダースコア3-32文字
    username = data.get("username", "")
    if username and not re.match(r"^[A-Za-z0-9_]{3,32}$", username):
        errors["username"] = (
            "Username must be 3-32 characters, "
            "alphanumeric or underscore only"
        )

    # パスワード: 8文字以上、大文字・小文字・数字を含む
    password = data.get("password", "")
    if password:
        if len(password) < 8:
            errors["password"] = (
                "Password must be at least 8 characters long"
            )
        elif not (
            re.search(r"[A-Z]", password)
            and re.search(r"[a-z]", password)
            and re.search(r"\d", password)
        ):
            errors["password"] = (
                "Password must contain at least one uppercase letter, "
                "one lowercase letter, and one digit."
            )

    # 氏名: 1-32文字、制御文字禁止
    for field in ["first_name", "last_name"]:
        value = data.get(field, "")
        if value and str(value).strip():
            if not (1 <= len(value) <= 32):
                errors[field] = (
                    f"{field.replace('_',' ').title()} must be 1-32 characters"
                )
            elif re.search(r"[\x00-\x1F\x7F]", value):
                errors[field] = (
                    f"{field.replace('_',' ').title()} contains invalid characters"
                )
    return errors
