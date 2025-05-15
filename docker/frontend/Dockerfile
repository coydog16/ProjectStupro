FROM node:24

# フロントエンドディレクトリをワークスペースに設定
WORKDIR /app

# 必要なnpmパッケージをグローバルにインストール
RUN npm install -g npm@latest

# package.jsonが存在しない場合に備えて、最小限の初期ファイルを作成
RUN echo '{"name":"frontend","version":"0.1.0","private":true,"scripts":{"dev":"vite"},"dependencies":{},"devDependencies":{}}' > package.json

# 開発用依存パッケージをインストール（ビルド時に固定）
RUN npm install -D typescript @types/react @types/react-dom @types/node \
    tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography vite

# 設定ファイルを生成（コンテナビルド時に一度だけ実行される処理）
# パッケージがインストールされていることを前提としている
RUN npx tailwindcss init -p && \
    sed -i 's/plugins: \\[\\],/plugins: [require("@tailwindcss\/forms"), require("@tailwindcss\/typography")],/' tailwind.config.js && \
    npx tsc --init --jsx react-jsx && \
    echo '{"compilerOptions":{"composite":true,"module":"ESNext","moduleResolution":"bundler"},"include":["vite.config.ts"]}' > tsconfig.node.json

# パッケージのインストールと開発サーバーの起動（コンテナ実行時のコマンド）
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
