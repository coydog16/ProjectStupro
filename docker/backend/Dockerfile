FROM python:3.11

WORKDIR /app

# 環境変数を設定
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Asia/Tokyo

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Pipのアップグレードと基本的なPythonパッケージのインストール（ビルド時）
RUN pip install --upgrade pip \
    && pip install flask==2.2.3 \
    flask-sqlalchemy==3.0.3 \
    psycopg2-binary==2.9.5 \
    gunicorn==20.1.0 \
    python-dotenv==1.0.0

# ポート設定
EXPOSE 5000

# アプリ実行コマンド (開発環境ではFlaskのデバッグサーバーを使用)
# 注意: 実際のコマンドはdocker-compose.ymlで上書きされます
CMD ["sh", "-c", "pip install -r requirements.txt && python -m flask run --host=0.0.0.0"]

# 本番環境向けのコマンド
# CMD ["sh", "-c", "pip install -r requirements.txt && gunicorn --bind 0.0.0.0:5000 wsgi:app"]
