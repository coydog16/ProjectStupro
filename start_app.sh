#!/bin/bash

# 色の定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ヘッダーの表示
echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}🚀 navStupro アプリケーション起動スクリプト 🚀${NC}"
echo -e "${BLUE}====================================================${NC}"

# コマンド引数に基づいて処理
if [ "$1" = "backend" ] || [ "$1" = "b" ]; then
    echo -e "${YELLOW}🔄 バックエンドアプリケーションを起動します...${NC}"
    docker-compose exec -d backend bash -c "cd /app/app/backend && python -m gunicorn -b 0.0.0.0:5000 --reload 'app:create_app()'"
    echo -e "${GREEN}✨ バックエンド起動完了！ http://localhost:5000/api${NC}"
    
elif [ "$1" = "frontend" ] || [ "$1" = "f" ]; then
    echo -e "${YELLOW}🔄 フロントエンドアプリケーションを起動します...${NC}"
    docker-compose exec -d frontend bash -c "cd /app/app/frontend && npm run dev"
    echo -e "${GREEN}✨ フロントエンド起動完了！ http://localhost:3000${NC}"
    
elif [ "$1" = "all" ] || [ "$1" = "a" ]; then
    echo -e "${YELLOW}🔄 バックエンドとフロントエンドを起動します...${NC}"
    docker-compose exec -d backend bash -c "cd /app/app/backend && python -m gunicorn -b 0.0.0.0:5000 --reload 'app:create_app()'"
    docker-compose exec -d frontend bash -c "cd /app/app/frontend && npm run dev"
    echo -e "${GREEN}✨ 全アプリケーション起動完了！${NC}"
    echo -e "${BLUE}- フロントエンド: http://localhost:3000${NC}"
    echo -e "${BLUE}- バックエンドAPI: http://localhost:5000/api${NC}"
    
else
    echo -e "${YELLOW}使い方:${NC}"
    echo -e "  ${GREEN}./start_app.sh backend${NC} (または ${GREEN}b${NC}): バックエンドのみ起動"
    echo -e "  ${GREEN}./start_app.sh frontend${NC} (または ${GREEN}f${NC}): フロントエンドのみ起動"
    echo -e "  ${GREEN}./start_app.sh all${NC} (または ${GREEN}a${NC}): 両方起動"
fi

echo -e "${BLUE}====================================================${NC}"
