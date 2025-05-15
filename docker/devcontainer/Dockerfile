FROM node:24

# Python環境のセットアップ
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python仮想環境のセットアップ
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# pythonの基本ツールをインストール
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir pylint autopep8 flake8

# 必要なnpmパッケージをグローバルにインストール
RUN npm install -g npm@latest

# 開発用ディレクトリを設定
WORKDIR /workspace

# developerユーザーをホストと同じUID/GID(1000)で作成
# Nodeイメージにはすでにnode(uid=1000)が存在するため、それを活用
RUN chown -R node:node /workspace /opt/venv

USER node

# コンテナが起動し続けるためのダミーコマンド
CMD ["sh", "-c", "while sleep 1000; do :; done"]
