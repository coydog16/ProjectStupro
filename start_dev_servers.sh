#!/bin/bash

# ProjectStupro開発サーバー起動スクリプト
# 使用法: ./start_dev_servers.sh

# 色の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}     ProjectStupro 開発サーバー起動     ${NC}"
echo -e "${GREEN}========================================${NC}"

# 必要なディレクトリの存在確認
if [ ! -d "/workspace/app/backend" ] || [ ! -d "/workspace/app/frontend" ]; then
  echo -e "${YELLOW}注意: このスクリプトはdevcontainer内で実行してください${NC}"
  echo -e "現在のディレクトリ: $(pwd)"
  
  # プロジェクトルートを検出
  if [ -d "./app/backend" ] && [ -d "./app/frontend" ]; then
    PROJECT_ROOT="."
  else
    echo -e "${YELLOW}エラー: ProjectStuproのルートディレクトリで実行されていないようです${NC}"
    exit 1
  fi
else
  PROJECT_ROOT="/workspace"
fi

# バックグラウンドでフロントエンドサーバーを起動
echo -e "\n${BLUE}フロントエンドの開発サーバーを起動しています...${NC}"
cd $PROJECT_ROOT/app/frontend
npm run dev &
FRONTEND_PID=$!

# バックグラウンドでバックエンドサーバーを起動
echo -e "\n${BLUE}バックエンドの開発サーバーを起動しています...${NC}"
cd $PROJECT_ROOT/app/backend
export FLASK_APP=app.py
export FLASK_DEBUG=1
flask run --host=0.0.0.0 &
BACKEND_PID=$!

# PIDを記録
echo $FRONTEND_PID > $PROJECT_ROOT/.frontend.pid
echo $BACKEND_PID > $PROJECT_ROOT/.backend.pid

echo -e "\n${GREEN}開発サーバーが起動しました！${NC}"
echo -e "${BLUE}フロントエンド:${NC} http://localhost:3000"
echo -e "${BLUE}バックエンド  :${NC} http://localhost:5000"
echo -e "\n${YELLOW}サーバーを停止するには stop_dev_servers.sh を実行するか、Ctrl+C を押してください${NC}"

# トラップを設定してプロセスをクリーンアップ
trap "kill $FRONTEND_PID $BACKEND_PID; rm -f $PROJECT_ROOT/.frontend.pid $PROJECT_ROOT/.backend.pid; echo -e '\n${GREEN}開発サーバーを停止しました${NC}'" EXIT

# スクリプトを終了させないようにする
wait
