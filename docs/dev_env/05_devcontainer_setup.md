# VS Code DevContainer の設定

## 概要

VS Code の DevContainer 機能を使うと、開発環境を Docker コンテナ内に構築し、どのマシンでも同じ環境でコードを編集・実行できます。このドキュメントでは、ProjectStupro プロジェクトの DevContainer 設定について説明します。

## 設定ファイル

- `.devcontainer/devcontainer.json` - VS Code が DevContainer として認識するための設定ファイル
- `docker/devcontainer/Dockerfile` - フロントエンドとバックエンド開発のための統合開発環境を定義

## 統合開発コンテナについて

このプロジェクトでは、フロントエンド（React/TypeScript）とバックエンド（Python/Flask）の両方を同じVSCode環境で開発できるように、統合開発コンテナを使用しています。これにより、コードの編集からデバッグまで、すべての開発作業を1つの環境で行うことが可能です。

## devcontainer.json の主要な設定項目の説明

```json
{
  "name": "ProjectStupro Full-Stack Dev Environment", // DevContainerの名前（VS Codeに表示される）
  "dockerFile": "../docker/devcontainer/Dockerfile", // 使用するDockerfileへのパス
  "workspaceFolder": "/workspace", // コンテナ内のワークスペースパス

  // 自動的にポート転送する設定
  "forwardPorts": [3000, 5000, 80, 8080], 

  // VS Code の設定とインストールする拡張機能
  "customizations": {
    "vscode": {
      // 自動的にインストールされる拡張機能
      "extensions": [
        "dbaeumer.vscode-eslint", // ESLintサポート
        "esbenp.prettier-vscode", // Prettierコード整形
        "bradlc.vscode-tailwindcss", // Tailwind CSSサポート
        "ms-python.python", // Pythonサポート
        "ms-python.vscode-pylance" // Python言語サーバー
      ],
      // VS Codeの設定
      "settings": {
        "editor.formatOnSave": true, // 保存時に自動フォーマット
        "editor.defaultFormatter": "esbenp.prettier-vscode", // デフォルトのフォーマッタ
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true // 保存時にESLintの問題を修正
        },
        "python.linting.enabled": true, // Pythonのリンティング有効化
        "python.linting.pylintEnabled": true // Pylintによるリンティング
      }
    }
  },

  // コンテナ作成後に実行されるコマンド（依存関係のインストールなど）
  "postCreateCommand": "npm install && pip install -r app/backend/requirements.txt",

  // コンテナ内で実行するユーザー（権限の問題を防ぐため）
  "remoteUser": "developer"
}
```

## Dockerfile の主な設定内容

```dockerfile
FROM node:24

# Python環境（バックエンド開発用）
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    git \
    curl

# Python仮想環境の作成
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# developerユーザーを作成
RUN groupadd --gid 1000 developer && \
    useradd --uid 1000 --gid developer --shell /bin/bash --create-home developer

# 開発ツールのインストール
RUN pip install --no-cache-dir pylint autopep8 flake8
RUN npm install -g npm@latest eslint prettier
```

## 統合開発コンテナのメリット

- **フロントエンドとバックエンドの同時開発**: 1つのVSCode環境でReactとFlaskの両方を編集・実行できる
- **コンテキストスイッチの削減**: 開発環境を切り替える必要がない
- **チーム全体での環境の統一**: 全員が同じツール、同じバージョンで開発できる
- **快適な開発体験**: TypeScriptとPythonの両方で補完やリンティングが効く

## 統合開発コンテナの使用上の注意

- イメージサイズが大きくなるため、初回のビルドに時間がかかる場合がある
- メモリ消費量が増えるため、開発マシンのリソースに余裕が必要

## DevContainer の使い方

1. VS Code に [Remote Development 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)をインストール
2. VS Code でプロジェクトフォルダを開く
3. 左下の「><」アイコンをクリックし、「Reopen in Container」を選択
4. VS Code が自動的に Docker コンテナをビルドし、その中で開発環境を構築

## 開発時のワークフロー

1. フロントエンド開発（React/TypeScript）
   ```bash
   cd app/frontend
   npm run dev
   ```

2. バックエンド開発（Flask）
   ```bash
   cd app/backend
   flask run --host=0.0.0.0
   ```

3. PostgreSQLへの接続
   - コンテナ内からは `postgres:5432` で接続可能
   - 認証情報は環境変数で設定されている（開発環境では固定値）

## DevContainer のメリット

- チーム全体で同じ開発環境を共有できる
- 「自分の環境では動くのに」問題の解消
- Node.js、Python、PostgreSQL など、すべての依存関係が事前に構成される
- ホストマシンの環境を汚さずに開発可能
