#!/bin/bash
set -e

# WSL2などのホスト側と権限を合わせるための処理
if [ -n "$USER_ID" ] && [ -n "$GROUP_ID" ]; then
    echo "🔄 Setting up user permissions with UID: $USER_ID, GID: $GROUP_ID"
    if [ "$USER_ID" != "1000" ] || [ "$GROUP_ID" != "1000" ]; then
        groupmod -g "$GROUP_ID" nav
        usermod -u "$USER_ID" nav
        
        # 所有権を修正
        find /app -user 1000 -exec chown -h $USER_ID:$GROUP_ID {} \;
    fi
fi

echo "🚀 Executing command: $@"
exec "$@"
