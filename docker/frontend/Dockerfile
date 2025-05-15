FROM node:24

# フロントエンドディレクトリをワークスペースに設定
WORKDIR /app

# 必要なnpmパッケージをグローバルにインストール
RUN npm install -g npm@latest

# package.jsonが存在しない場合に備えて、最小限の初期ファイルを作成
RUN echo '{"name":"frontend","version":"0.1.0","private":true,"type":"module","scripts":{"dev":"vite"},"dependencies":{},"devDependencies":{}}' > package.json

# 開発用依存パッケージをインストール（ビルド時に固定）
RUN npm install -D typescript @types/react @types/react-dom @types/node \
    tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography vite

# 初期設定ファイルを手動で作成 - ES Modules構文を使用
RUN echo 'import typographyPlugin from "@tailwindcss/typography"; import formsPlugin from "@tailwindcss/forms"; export default {content: ["./src/**/*.{js,jsx,ts,tsx}"],theme: {extend: {}},plugins: [typographyPlugin, formsPlugin]};' > tailwind.config.js && \
    echo 'export default {plugins: {tailwindcss: {},autoprefixer: {}}};' > postcss.config.js && \
    echo '{"compilerOptions":{"target":"ES2020","useDefineForClassFields":true,"lib":["ES2020","DOM","DOM.Iterable"],"module":"ESNext","skipLibCheck":true,"moduleResolution":"bundler","allowImportingTsExtensions":true,"resolveJsonModule":true,"isolatedModules":true,"noEmit":true,"jsx":"react-jsx","strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noFallthroughCasesInSwitch":true},"include":["src"],"references":[{"path":"./tsconfig.node.json"}]}' > tsconfig.json && \
    echo '{"compilerOptions":{"composite":true,"module":"ESNext","moduleResolution":"bundler"},"include":["vite.config.ts"]}' > tsconfig.node.json

# パッケージのインストールと開発サーバーの起動（コンテナ実行時のコマンド）
CMD ["sh", "-c", "npm install && npm run dev -- --host"]
