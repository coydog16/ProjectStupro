# Python 開発ツールのバージョン固定と`--no-cache-dir`運用について

## バージョン固定している開発ツール一覧（2025 年 5 月時点）

Dockerfile 内で以下の Python 開発ツールを**バージョン固定**しています。
これにより、CI/CD やチーム開発での「再現性」「安定性」「予期せぬビルドエラー防止」を実現しています。

## `--no-cache-dir`を使う理由

-   **常にクリーンな状態でパッケージをインストールするため**
    -   古いキャッシュや壊れたキャッシュによるインストール失敗を防ぐ
    -   Docker や CI/CD など「再現性・クリーンさ」が重要な環境で特に有効
-   **デメリット**
    -   ネットワークから毎回ダウンロードするため、ビルドがやや遅くなることがある
    -   ただし、安定性・再現性を優先する場合は推奨される運用

---

## 開発用 requirements-dev.txt での一元管理

-   開発ツールのバージョンは `app/backend/requirements-dev.txt` で一元管理しています。
-   Dockerfile でもこのファイルを使って開発ツールをインストールしています。
-   本番依存パッケージは `requirements.txt`、開発ツールは `requirements-dev.txt` で分離管理することで、運用・CI/CD の切り替えやすさ・再現性が向上します。

---

## requirements.txt（本番用パッケージリスト）

```
Flask==2.2.3
flask-cors==3.0.10
flask-sqlalchemy==3.0.3
flask-migrate==4.0.4
flask-jwt-extended==4.4.4
flask-login==0.6.2
psycopg2-binary==2.9.5
python-dotenv==1.0.0
gunicorn==20.1.0
celery==5.3.0
redis==4.5.5
email-validator==2.0.0
Werkzeug==2.2.3
Jinja2==3.1.2
itsdangerous==2.1.2
Flask-RESTx
pydantic
flask-caching
flask-compress
structlog
Faker==25.2.0
```

---

## requirements-dev.txt（開発用パッケージリスト）

```
black==25.1.0
isort==5.13.2
flake8==7.0.0
mypy==1.10.0
pytest==8.2.0
sphinx==7.3.7
sphinx-rtd-theme==2.0.0
sphinx-autodoc-typehints==2.1.0
sphinx-autobuild==2024.4.16
pexpect==4.9.0
```

---

## まとめ

-   開発ツールのバージョンを固定することで、環境差分や予期せぬエラーを防止
-   `--no-cache-dir`でクリーンなインストールを維持
-   本番依存パッケージ（Flask, SQLAlchemy 等）は`requirements.txt`で管理
