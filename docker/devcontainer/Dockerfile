FROM node:24

# Python環境のセットアップ
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl \
    sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# navユーザーをホストと同じUID/GID(1000)で作成
# Nodeイメージにはすでにnode(uid=1000)が存在するため、nodeユーザーをnavにリネーム
RUN usermod -l nav -d /home/nav -m node && \
    groupmod -n nav node && \
    echo "nav ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/nav && \
    chmod 0440 /etc/sudoers.d/nav

# Python仮想環境のセットアップ
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# pythonの基本ツールをインストール
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir pylint autopep8 flake8

# Flaskとその関連パッケージをインストール（バックエンド用・マイナーアップデート許可）
RUN pip install --no-cache-dir \
    flask~=2.2.0 \
    flask-cors~=3.0.0 \
    flask-sqlalchemy~=3.0.0 \
    flask-migrate~=4.0.0 \
    flask-jwt-extended~=4.4.0 \
    werkzeug~=2.2.0 \
    jinja2~=3.1.0 \
    pytest~=7.3.0 \
    psycopg2-binary~=2.9.0 \
    gunicorn~=20.1.0 \
    python-dotenv~=1.0.0

# 必要なnpmパッケージをグローバルにインストール（マイナーアップデート許可）
RUN npm install -g npm@^10.5.0 vite@^5.4.0 typescript@^5.4.0 \
    tailwindcss@^4.0.0 @tailwindcss/forms@^0.5.7 @tailwindcss/typography@^0.5.10 

# 開発用ディレクトリを設定
WORKDIR /workspace

# フロントエンドのディレクトリ構造を事前作成して権限を設定
RUN mkdir -p /workspace/app/frontend/node_modules && \
    chown -R nav:nav /workspace /opt/venv /home/nav /workspace/app/frontend

USER nav

# コンテナが起動し続けるためのダミーコマンド
CMD ["sh", "-c", "while sleep 1000; do :; done"]
