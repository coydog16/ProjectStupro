FROM node:24-alpine

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
    redis

# navユーザーを新規作成（既に存在すればスキップ、UID/GID=1000でホストと揃える）
RUN id -u nav 2>/dev/null || (getent passwd 1000 >/dev/null || adduser -D -u 1000 nav) && \
    echo "nav ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/nav && \
    chmod 0440 /etc/sudoers.d/nav

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

# navユーザーのホームディレクトリを明示的に作成し、chown前に存在を保証
RUN id -u nav 2>/dev/null || (getent passwd 1000 >/dev/null || adduser -D -u 1000 nav) && \
    mkdir -p /home/nav && chown -R 1000:1000 /home/nav

WORKDIR /workspace
RUN mkdir -p /workspace/app/frontend/node_modules && \
    chown -R 1000:1000 /workspace /opt/venv /home/nav /workspace/app/frontend

# start_dev_servers.shに実行権限を付与
RUN chmod +x /workspace/start_dev_servers.sh

USER nav

CMD ["sh", "-c", "while sleep 1000; do :; done"]
