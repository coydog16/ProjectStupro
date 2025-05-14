FROM node:22-alpine

# フロントエンドディレクトリをワークスペースに設定
WORKDIR /app

# 開発サーバー起動 (package.jsonはホストからマウント)
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
