FROM node:24-alpine

# デバッグ情報：最初の状態を確認
RUN echo "イメージ内のユーザー一覧（初期状態）:" && cat /etc/passwd

RUN apk add --no-cache \
    python3 \
    py3-pip \
    py3-virtualenv \
    python3-dev \
    build-base \
    libffi-dev \
    libpq \
    libpq-dev \
    git \
    curl \
    sudo \
    ca-certificates \
    tzdata \
    zlib-dev \
    jpeg-dev \
    freetype-dev \
    lcms2-dev \
    openjpeg-dev \
    tiff-dev \
    bzip2-dev \
    xz-dev \
    brotli-dev \
    libzip-dev \
    redis \
    # su-execはAlpineでのgosuのようなもの（権限エスカレーション用）
    su-exec

# 開発ユーザーを作成（UIDを固定せず柔軟に）
# 実行時に--user フラグでホストのUID:GIDを渡せるようにする
# 最小権限の原則に従い、sudoは不要（必要なディレクトリには777権限を付与するため）
RUN adduser -D nav

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir pylint autopep8 flake8

# requirements.txtをコピーしてFlask系ライブラリを一括インストール
COPY ./app/backend/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN npm install -g \
    npm@^10.5.0 \
    vite@^5.4.0 \
    tailwindcss@^4.0.0 \
    typescript@^5.4.0

# 作業ディレクトリなどの準備
RUN mkdir -p /home/nav && \
    mkdir -p /workspace/app/frontend/node_modules

# エントリポイントスクリプトをコピーして実行権限を付与
COPY docker/devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /workspace

# UIDをコンテナ起動時に動的に変更するためにentrypoint.shを使用
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# デフォルトコマンド（これはentrypointに渡される）
CMD ["sh", "-c", "while sleep 1000; do :; done"]
