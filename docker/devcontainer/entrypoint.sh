#!/bin/bash
set -e

# WSL2などのホスト側と権限を合わせるための処理
if [ -n "$HOST_UID" ] && [ -n "$HOST_GID" ]; then
    echo "🔄 Setting up user permissions with UID: $HOST_UID, GID: $HOST_GID"
    if [ "$HOST_UID" != "1000" ] || [ "$HOST_GID" != "1000" ]; then
        groupmod -g "$HOST_GID" nav
        usermod -u "$HOST_UID" nav
        
        # 所有権を修正
        find /workspace -user 1000 -exec chown -h $HOST_UID:$HOST_GID {} \; 2>/dev/null || true
        chown -R $HOST_UID:$HOST_GID /home/nav
    fi
fi

echo "🚀 Executing command: $@"
exec "$@"
