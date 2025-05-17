############################################################
# ビルドステージ - 依存関係のインストールと環境設定
############################################################
FROM ubuntu:22.04 AS builder

# Hadolint指摘対策: DL3008
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND=noninteractive

# 必要なパッケージのインストール
RUN apt-get update && apt-get install --no-install-recommends -y \
    ca-certificates=* \
    curl=* \
    gnupg=* \
    lsb-release=* \
    software-properties-common=* \
    # Python 3.11のセットアップ
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
    python3.11=* \
    python3.11-venv=* \
    python3.11-dev=* \
    python3-pip=* \
    build-essential=* \
    libpq-dev=* \
    # Node.js 24のセットアップ
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install --no-install-recommends -y nodejs=* \
    && npm install -g npm@latest \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    # Pythonの代替設定
    && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1 \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# Python仮想環境をセットアップ
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# バックエンド依存関係のインストール (requirements.txtがある場合)
WORKDIR /tmp/backend
COPY ./app/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# フロントエンド依存関係のインストール (package.jsonがある場合)
WORKDIR /tmp/frontend
COPY ./app/frontend/package*.json ./
# tailwindcssのGitHub経由のインストールを追加
RUN npm install

############################################################
# 開発環境ステージ - 
############################################################
FROM builder AS devenv

# ビルド時の引数
ARG USER_ID=1000
ARG GROUP_ID=1000

# 開発用の追加ツールのみインストール
RUN apt-get update && apt-get install --no-install-recommends -y \
    git=* \
    openssh-client=* \
    vim=* \
    less=* \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ユーザー作成
RUN groupadd -g ${GROUP_ID} nav && \
    useradd -l -u ${USER_ID} -g nav -s /bin/bash -m nav

# 環境変数の設定
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV NPM_CONFIG_PREFIX=/home/nav/.npm-global
ENV PATH="/home/nav/.npm-global/bin:/opt/venv/bin:$PATH"

# 仮想環境のコピー
COPY --from=builder --chown=nav:nav /opt/venv /opt/venv

# ディレクトリ作成と権限設定
RUN mkdir -p /workspace/app/frontend /workspace/app/backend && \
    chown -R nav:nav /workspace

# node_modulesのコピー
COPY --from=builder --chown=nav:nav /tmp/frontend/node_modules /workspace/app/frontend/node_modules

# エントリーポイントスクリプト (権限調整のみ)
COPY ./docker/builder/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# 作業ディレクトリ
WORKDIR /workspace

# ユーザー切り替え
USER nav

# エントリーポイント設定
ENTRYPOINT ["/entrypoint.sh"]

# デフォルトのコマンド
CMD ["tail", "-f", "/dev/null"]
