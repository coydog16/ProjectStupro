# ルートディレクトリでのコンテナ開発環境

このプロジェクトでは、VSCodeのDevContainer機能を使って、プロジェクトのルートディレクトリ全体をコンテナ内で開発できる環境を用意しています。これにより、フロントエンドとバックエンドの両方のコードを1つのエディタで編集しながら、TypeScriptとPythonの両方の言語サポートを最大限に活用できます。

## ルート開発環境の利点

1. **プロジェクト全体が見える**
   - プロジェクトのルートディレクトリがVSCodeで開かれるため、ディレクトリ構造全体を把握しやすい
   - 設定ファイル（docker-compose.yml、README.mdなど）も含めて一度に編集可能

2. **開発体験の向上**
   - コンテナ内でTypeScriptとPythonの両方の開発環境が整っている
   - VSCodeの言語サポート機能（補完、リンティング、型チェックなど）が正常に動作

3. **node_modules問題の解決**
   - コンテナ内でnode_modulesを管理することで、VSCodeの赤線エラーがなくなる
   - Dockerボリュームによりパフォーマンスも確保

## セットアップ方法

### 1. 前提条件
- Docker
- Visual Studio Code
- Remote Development拡張機能パック

### 2. ルート開発環境の起動方法

**VSCodeでの起動方法**:
1. VSCodeでProjectStupro（ルートディレクトリ）を開く
2. 左下の「><」アイコンをクリックし、「Reopen in Container」を選択
3. コンテナのビルドが完了すると、開発環境が準備完了

## 開発フロー

### フロントエンド開発

```bash
cd app/frontend
npm run dev
```

開発サーバーが起動し、http://localhost:3000 でアクセス可能になります。

### バックエンド開発

```bash
cd app/backend
flask run --host=0.0.0.0
```

Flaskサーバーが起動し、http://localhost:5000 でアクセス可能になります。

### データベース操作

```bash
# PostgreSQLへの接続
psql -h postgres -U navStupro -d navstupro
```

または、ブラウザでAdminerにアクセス: http://localhost:8080

## 設定ファイル解説

このルート開発環境は以下のファイルによって定義されています：

- `.devcontainer/devcontainer.json` - VSCode DevContainerの設定
- `docker/devcontainer/Dockerfile` - Node.js + Python環境を含むDockerfile
- `docker-compose.dev.yml` - 開発サービスの構成

## よくある質問

### Q: コンテナ内でのファイル権限はどうなりますか？
A: developerユーザー（UID=1000）を使用しており、通常のLinuxユーザー権限と同等です。

### Q: TypeScriptの型定義が見つからないというエラーが出る場合は？
A: `app/frontend`ディレクトリで`npm install`を実行してください。

### Q: バックエンドの依存関係を更新するには？
A: `app/backend`ディレクトリで`pip install -r requirements.txt`を実行してください。

### Q: 削除したはずのファイルがコンテナ内やローカルに復活する場合は？
A: 最も確実な方法は、コンテナを完全に再作成することです。以下のコマンドで実行できます：
```bash
# VSCodeのDevContainerを終了してから
cd /path/to/ProjectStupro
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build --no-cache rootdev
```
その後、VSCodeでプロジェクトを開き直し、「Reopen in Container」を選択してください。
