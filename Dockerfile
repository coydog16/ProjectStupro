############################################################
# 統合開発環境 - Ubuntu + Python + Node.js
############################################################
FROM ubuntu:22.04

# Hadolint指摘対策: DL3008
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND=noninteractive

ARG USER_ID=1000
ARG GROUP_ID=1000

# 必要なパッケージのインストール
RUN apt-get update && apt-get install --no-install-recommends -y \
    ca-certificates=* \
    curl=* \
    gnupg=* \
    lsb-release=* \
    software-properties-common=* \
    git=* \
    openssh-client=* \
    vim=* \
    less=* \
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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    # Pythonの代替設定
    && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1 \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# ユーザー作成
RUN groupadd -g ${GROUP_ID} nav && \
    useradd -l -u ${USER_ID} -g nav -s /bin/bash -m nav

# 環境変数の設定
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV NPM_CONFIG_PREFIX=/home/nav/.npm-global
ENV PATH="/home/nav/.npm-global/bin:$PATH"

# 作業ディレクトリを作成
WORKDIR /workspace

# エントリーポイントスクリプト (権限調整のみ)
COPY ./docker/devcontainer/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# ディレクトリ作成と権限設定
RUN mkdir -p /workspace/app/frontend /workspace/app/backend && \
    chown -R nav:nav /workspace

# ユーザー切り替え
USER nav

# エントリーポイント設定
ENTRYPOINT ["/entrypoint.sh"]

# デフォルトのコマンド
CMD ["tail", "-f", "/dev/null"]
