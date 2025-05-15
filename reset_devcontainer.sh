#!/bin/bash

# ProjectStupro devcontainerリセットスクリプト
# 使用法: ./reset_devcontainer.sh

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===================================================${NC}"
echo -e "${YELLOW}  ProjectStupro DevContainer リセットユーティリティ  ${NC}"
echo -e "${YELLOW}===================================================${NC}"

# 確認
echo -e "\n${RED}警告: このスクリプトはDocker関連のリソースをクリーンアップします${NC}"
echo -e "実行前に未コミットの変更をコミットまたはバックアップしてください"
read -p "続行しますか？ (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}操作をキャンセルしました${NC}"
    exit 0
fi

# コンテナを停止
echo -e "\n${GREEN}1. Dockerコンテナを停止しています...${NC}"
docker-compose -f docker-compose.dev.yml down
echo -e "${BLUE}コンテナを停止しました${NC}"

# VSCode DevContainer関連ファイルをクリーンアップ
echo -e "\n${GREEN}2. VS Code DevContainer一時ファイルをクリーンアップしています...${NC}"
rm -rf ~/.vscode-server/extensions/*ms-vscode-remote.remote-containers*
echo -e "${BLUE}VS Code DevContainer一時ファイルをクリーンアップしました${NC}"

# volume情報を確認
echo -e "\n${GREEN}3. 関連するDockerボリュームを確認しています...${NC}"
docker volume ls | grep projectstupro
echo

# volume削除の確認
read -p "関連するDockerボリュームも削除しますか？ (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Dockerボリュームを削除しています...${NC}"
    docker volume rm $(docker volume ls -q | grep projectstupro) 2>/dev/null || echo "削除するボリュームがありません"
    echo -e "${BLUE}Dockerボリュームを削除しました${NC}"
fi

# コンテナを再起動
echo -e "\n${GREEN}4. Dockerコンテナを再起動しています...${NC}"
docker-compose -f docker-compose.dev.yml up -d
echo -e "${BLUE}コンテナを再起動しました${NC}"

echo -e "\n${GREEN}==================================================${NC}"
echo -e "${GREEN}  DevContainerのリセットが完了しました！  ${NC}"
echo -e "${GREEN}==================================================${NC}"
echo
echo -e "次のステップ:"
echo -e "1. VS Codeを完全に閉じる"
echo -e "2. VS Codeを再起動する"
echo -e "3. 「コマンドパレット(F1)」→「Dev Containers: Reopen in Container」を選択"
echo
echo -e "${YELLOW}それでも問題が解決しない場合は、VS Codeを再インストールするか、${NC}"
echo -e "${YELLOW}Docker Desktopを再起動してみてください。${NC}"
