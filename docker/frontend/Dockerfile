FROM node:24-slim

ARG USER_ID=1000
ARG GROUP_ID=1000

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# 非rootユーザーを作成（UID/GIDをホストと合わせる）
RUN groupadd -g ${GROUP_ID} nav && \
    useradd -u ${USER_ID} -g nav -s /bin/bash -m nav

# 作業ディレクトリを作成
WORKDIR /app

# 必要なファイルをコピー
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# npmのデフォルト設定
ENV NPM_CONFIG_PREFIX=/home/nav/.npm-global
ENV PATH="/home/nav/.npm-global/bin:$PATH"

# ユーザー権限を変更
RUN mkdir -p /app/app/frontend
RUN chown -R nav:nav /app

# ユーザー切り替え
USER nav

# エントリーポイントの設定
ENTRYPOINT ["/entrypoint.sh"]

# デフォルトのコマンド
CMD ["node", "--version"]
