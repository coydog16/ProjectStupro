# 開発サーバー起動スクリプト

ProjectStuproの開発環境では、以下のスクリプトを使用してバックエンドとフロントエンドの開発サーバーを簡単に起動・停止できます。

## セットアップ手順

1. まず、devcontainerが起動していることを確認してください：
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. VS Codeを使用している場合は、「Reopen in Container」または「コンテナーで再度開く」を選択してdevcontainer内で作業することをお勧めします。

## スクリプトの使用方法

### 開発サーバーの起動

```bash
./start_dev_servers.sh
```

このスクリプトは以下のサーバーを起動します：
- フロントエンド (React): http://localhost:3000
- バックエンド (Flask): http://localhost:5000

### 開発サーバーの停止

```bash
./stop_dev_servers.sh
```

または、開始スクリプト実行中のターミナルで `Ctrl+C` を押すこともできます。

## 注意事項

- これらのスクリプトはdevcontainer内またはプロジェクトのルートディレクトリで実行する必要があります。
- フロントエンド側の変更は自動的に反映されます。
- バックエンド側もFLASK_DEBUGモードが有効なため、ほとんどの変更は自動的に反映されます。

## トラブルシューティング

1. **スクリプトが実行できない場合：**
   ```bash
   chmod +x start_dev_servers.sh stop_dev_servers.sh
   ```

2. **ポートが既に使用されている場合：**
   ```bash
   # 使用中のポートを確認
   lsof -i :3000
   lsof -i :5000
   
   # または既存のプロセスをすべて停止
   ./stop_dev_servers.sh
   ```

3. **デバッグログを確認したい場合：**
   - フロントエンドログ: `npm run dev`を別ターミナルで実行
   - バックエンドログ: `cd app/backend && flask run --debug --host=0.0.0.0`を別ターミナルで実行
