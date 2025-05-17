#!/bin/sh

# ホストから渡されたUID、GIDを取得（デフォルト値は1000）
USER_ID=${HOST_UID:-1000}
GROUP_ID=${HOST_GID:-1000}

echo "Starting container with UID:$USER_ID, GID:$GROUP_ID"

# navユーザーのUID/GIDを変更（既存ファイル所有権も自動的に更新される）
# -o オプションで重複するUIDを許可
if [ "$USER_ID" != "$(id -u nav)" ]; then
    echo "Changing nav user UID from $(id -u nav) to $USER_ID"
    usermod -u $USER_ID -o nav
fi

if [ "$GROUP_ID" != "$(id -g nav)" ]; then
    echo "Changing nav group GID from $(id -g nav) to $GROUP_ID"
    groupmod -g $GROUP_ID nav
fi

# ホームディレクトリの権限を確認（念のため）
chown -R $USER_ID:$GROUP_ID /home/nav

# 作業ディレクトリの権限も確認
if [ -d "/workspace" ]; then
    mkdir -p /workspace/app/frontend/node_modules
    chown -R $USER_ID:$GROUP_ID /workspace
fi

# 仮想環境の権限も確認
if [ -d "/opt/venv" ]; then
    chown -R $USER_ID:$GROUP_ID /opt/venv
fi

# navユーザーとして渡されたコマンドを実行
# $@ は全ての引数を意味する
exec su-exec nav "$@"
