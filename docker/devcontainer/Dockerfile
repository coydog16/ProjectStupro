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
RUN id -u nav 2>/dev/null || adduser -D -u 1000 nav && \
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
    typescript@^5.4.0 \
    @vitejs/plugin-react@^4.2.0 \
    @tailwindcss/forms@^0.5.7 \
    @tailwindcss/typography@^0.5.10 \
    @tailwindcss/vite@latest@^4.1.7

WORKDIR /workspace
RUN mkdir -p /workspace/app/frontend/node_modules && \
    chown -R nav:nav /workspace /opt/venv /home/nav /workspace/app/frontend

USER nav

CMD ["sh", "-c", "while sleep 1000; do :; done"]
