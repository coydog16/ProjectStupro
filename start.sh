#!/bin/bash

# 色の定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ヘッダーの表示
echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}🚀 navStupro Docker 開発環境スタートアップ 🚀${NC}"
echo -e "${BLUE}====================================================${NC}"

# 現在のユーザーのUID/GIDを取得
export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

echo -e "${YELLOW}ホスト情報:${NC}"
echo -e "👤 UID: ${USER_ID}"
echo -e "👥 GID: ${GROUP_ID}"
echo -e "${BLUE}---------------------------------------------------${NC}"

# コマンドライン引数の処理
if [ "$1" = "down" ]; then
    echo -e "${YELLOW}🛑 開発環境を停止します...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ 開発環境を停止しました！${NC}"
    exit 0
elif [ "$1" = "rebuild" ]; then
    echo -e "${YELLOW}🔄 開発環境を再ビルドします...${NC}"
    docker-compose build --no-cache
    docker-compose up -d
elif [ "$1" = "logs" ]; then
    echo -e "${YELLOW}📋 ログを表示します...${NC}"
    docker-compose logs -f
    exit 0
else
    echo -e "${YELLOW}🚀 開発環境を起動します...${NC}"
    docker-compose up -d
fi

# 起動後のサービス情報表示
echo -e "${BLUE}---------------------------------------------------${NC}"
echo -e "${YELLOW}🔍 起動したコンテナ:${NC}"
docker-compose ps
echo -e "${BLUE}---------------------------------------------------${NC}"

# アクセス情報
echo -e "${YELLOW}📡 アクセス情報:${NC}"
echo -e "🌐 フロントエンド: ${GREEN}http://localhost:3000${NC}"
echo -e "🌐 バックエンドAPI: ${GREEN}http://localhost:5000/api${NC}"
echo -e "🌐 データベース: ${GREEN}postgresql://postgres:postgres@localhost:5432/navstupro${NC}"
echo -e "${BLUE}====================================================${NC}"

# 使い方のヒント
echo -e "${YELLOW}💡 便利なコマンド:${NC}"
echo -e "📋 ログを見る: ${GREEN}./start.sh logs${NC}"
echo -e "🛑 停止する: ${GREEN}./start.sh down${NC}"
echo -e "🔄 再ビルド: ${GREEN}./start.sh rebuild${NC}"
echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}🎉 開発環境の準備ができました！楽しくコーディングしてね！🎉${NC}"
