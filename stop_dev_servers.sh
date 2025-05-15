#!/bin/bash

# ProjectStupro開発サーバー停止スクリプト
# 使用法: ./stop_dev_servers.sh

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}開発サーバーを停止しています...${NC}"

# プロジェクトルートを検出
if [ -d "/workspace/app/backend" ]; then
  PROJECT_ROOT="/workspace"
elif [ -d "./app/backend" ]; then
  PROJECT_ROOT="."
else
  echo -e "${YELLOW}エラー: ProjectStuproのルートディレクトリで実行されていないようです${NC}"
  exit 1
fi

# PIDファイルの確認
FRONTEND_PID_FILE="$PROJECT_ROOT/.frontend.pid"
BACKEND_PID_FILE="$PROJECT_ROOT/.backend.pid"

# フロントエンドプロセスの停止
if [ -f "$FRONTEND_PID_FILE" ]; then
  FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
  if ps -p $FRONTEND_PID > /dev/null; then
    kill $FRONTEND_PID
    echo "フロントエンド開発サーバーを停止しました (PID: $FRONTEND_PID)"
  else
    echo "フロントエンド開発サーバーは既に停止しています"
  fi
  rm -f "$FRONTEND_PID_FILE"
else
  echo "フロントエンドPIDファイルが見つかりません"
fi

# バックエンドプロセスの停止
if [ -f "$BACKEND_PID_FILE" ]; then
  BACKEND_PID=$(cat "$BACKEND_PID_FILE")
  if ps -p $BACKEND_PID > /dev/null; then
    kill $BACKEND_PID
    echo "バックエンド開発サーバーを停止しました (PID: $BACKEND_PID)"
  else
    echo "バックエンド開発サーバーは既に停止しています"
  fi
  rm -f "$BACKEND_PID_FILE"
else
  echo "バックエンドPIDファイルが見つかりません"
fi

echo -e "${GREEN}すべての開発サーバーが停止しました${NC}"
