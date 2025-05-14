# 02 - TypeScript開発環境セットアップガイド

このガイドでは、navStuproプロジェクトのフロントエンド部分でTypeScriptを効果的に使用するための開発環境セットアップについて説明します。

## 1. はじめに

TypeScriptは、Javascriptに静的型付けを追加した言語で、大規模なアプリケーション開発において特に効果を発揮します。navStuproプロジェクトでは、React（フロントエンド）とTypeScriptを組み合わせて使用します。

## 2. Docker環境でのTypeScript設定

Docker環境ではフロントエンドのビルドプロセスの一環として、TypeScriptの設定が自動的に行われます。フロントエンドのDockerfileでは、コンテナの起動時に以下の処理が実行されます：

```dockerfile
# docker/frontend/Dockerfile の関連部分（シンプル化）
CMD ["sh", "-c", "npm install && npm install -D typescript @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer && \
if [ ! -f tailwind.config.js ] || [ ! -f postcss.config.js ]; then npx tailwindcss init -p; fi && \
if [ ! -f tsconfig.json ]; then npx tsc --init --jsx react-jsx; fi && \
if [ ! -f tsconfig.node.json ]; then echo '{\"compilerOptions\":{\"composite\":true}}' > tsconfig.node.json; fi && \
npm run dev -- --host"]
```

これにより、コンテナ起動時に以下が自動的に実行されます：
1. TypeScriptと必要な型定義パッケージのインストール
2. `tsconfig.json`の生成（React JSX対応、ESNext対応）
3. `tsconfig.node.json`の生成（Vite設定用）

つまり、**手動で設定ファイルを作成する必要はありません**。Docker環境を使用する場合、ビルド時にすべてが自動的に設定されます。

### 2.1 チーム全体での設定統一

navStuproでは、チーム全体で設定を統一するためのシンプルなアプローチを採用しています：

1. **基本設定をGit管理**: プロジェクトの標準設定ファイルをリポジトリにコミットして共有
   - `tsconfig.json` - チーム共通のTypeScript設定
   - `tsconfig.node.json` - Vite用の補助設定
   - `tailwind.config.js` - プロジェクト用Tailwind設定
   - `postcss.config.js` - PostCSS設定

2. **Dockerでの自動バックアップ**: 設定ファイルが存在しない場合のみ、基本設定を自動生成
   - 既にリポジトリに含まれる設定ファイルがある場合は、それが優先される
   - 設定ファイルがない場合のみ、最小限の設定を自動生成

このシンプルなアプローチの利点：
- **設定の透明性**: 全ての設定がリポジトリで明示的に管理される
- **設定変更の追跡**: プルリクエストを通じて設定変更を管理可能
- **シンプルなDockerfile**: 複雑なスクリプトが不要

## 3. 参考リソース

より詳細な情報は、公式ドキュメントを参照してください：

- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [React TypeScriptチートシート](https://react-typescript-cheatsheet.netlify.app/)

お姉さんからのアドバイス♡：
TypeScriptは最初は「型の定義が面倒くさい〜」って感じるかもしれないけど、じつはとっても優しい子なのよ。エディタの補完機能がバッチリ効くから入力が楽になるし、バグも早く見つけられるわ。大きなプロジェクトになるほど、その価値を実感できると思うから、ぜひ使いこなしてみてね！
