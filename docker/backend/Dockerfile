FROM python:3.11-slim

ARG USER_ID=1000
ARG GROUP_ID=1000

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# 非rootユーザーを作成（UID/GIDをホストと合わせる）
RUN groupadd -g ${GROUP_ID} appuser && \
    useradd -u ${USER_ID} -g appuser -s /bin/bash -m appuser

# 作業ディレクトリを作成
WORKDIR /app

# 必要なファイルをコピー
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Pythonの環境変数を設定
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/app/backend/.venv/bin:$PATH"

# ユーザー権限を変更
RUN mkdir -p /app/app/backend
RUN chown -R appuser:appuser /app

# ユーザー切り替え
USER appuser

# 仮想環境を作成
RUN python -m venv /app/app/backend/.venv

# エントリーポイントの設定
ENTRYPOINT ["/entrypoint.sh"]

# デフォルトのコマンド
CMD ["python", "--version"]
