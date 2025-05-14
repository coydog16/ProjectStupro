FROM node:24

# フロントエンドディレクトリをワークスペースに設定
WORKDIR /app

# 必要なnpmパッケージをグローバルにインストール
RUN npm install -g npm@latest

# パッケージをインストールして開発サーバーを起動
# 必要な設定ファイルは単純に自動生成（既存のファイルがあれば上書きしない）
CMD ["sh", "-c", "npm install && npm install -D typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography && \
if [ ! -f tailwind.config.js ] || [ ! -f postcss.config.js ]; then npx tailwindcss init -p && \
  sed -i 's/plugins: \\[\\],/plugins: [require(\"@tailwindcss\\/forms\"), require(\"@tailwindcss\\/typography\")],/' tailwind.config.js; \
fi && \
if [ ! -f tsconfig.json ]; then npx tsc --init --jsx react-jsx; fi && \
if [ ! -f tsconfig.node.json ]; then echo '{\"compilerOptions\":{\"composite\":true,\"module\":\"ESNext\",\"moduleResolution\":\"bundler\"},\"include\":[\"vite.config.ts\"]}' > tsconfig.node.json; fi && \
npm run dev -- --host"]
