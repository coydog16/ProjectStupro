# Docker 自動権限調整機能

ProjectStuproのDockerコンテナは、特別な設定なしでホストのユーザー権限と自動的に同期するように設計されています。このドキュメントでは、その仕組みと背景について説明します。

## 問題の背景

Dockerコンテナ内で作成されたファイルは、デフォルトでコンテナ内のユーザーID（通常はUID 1000）の所有となります。これにより以下の問題が発生することがあります：

1. ホストマシンのUID/GIDがコンテナと異なる場合、ファイルの所有権の問題が発生する
2. 特にWSL2環境や特殊なLinux設定では、ユーザーIDが1000でない場合がある
3. 結果として、ファイルを編集できない、または `sudo` が必要になるなどの問題が起きる

## 自動権限調整の仕組み

ProjectStuproでは、この問題を解決するために `entrypoint.sh` スクリプトで自動的に権限を調整します：

### 調整プロセス

1. コンテナ起動時、`/workspace` ディレクトリのUID/GIDを自動的に検出
2. コンテナ内のユーザー（`nav`）のUID/GIDを、検出された値に変更
3. 必要に応じて、既存ファイルの所有権も更新

### コード解説

```bash
# /workspaceディレクトリのUID/GIDを取得
WORKSPACE_UID=$(stat -c '%u' /workspace)
WORKSPACE_GID=$(stat -c '%g' /workspace)

# デフォルト値と異なる場合のみ調整
if [ "$WORKSPACE_UID" != "1000" ] || [ "$WORKSPACE_GID" != "1000" ]; then
    # ユーザー/グループIDを変更
    groupmod -g "$WORKSPACE_GID" nav
    usermod -u "$WORKSPACE_UID" nav

    # 所有権を修正
    find /workspace -user 1000 -exec chown -h $WORKSPACE_UID:$WORKSPACE_GID {} \; 2>/dev/null || true
    chown -R $WORKSPACE_UID:$WORKSPACE_GID /home/nav
fi
```

## 明示的に指定する方法

自動検出に問題がある場合は、環境変数を使って明示的に指定することも可能です：

```bash
HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose up -d
```

この場合、指定された値がコンテナ内のユーザー設定に使用されます。

## トラブルシューティング

権限に関する問題が発生した場合：

1. **コンテナを再起動**：`docker compose down && docker compose up -d`
2. **明示的に環境変数を指定して起動**：`HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose up -d`
3. **ログの確認**：`docker compose logs` でentrypointスクリプトのログを確認

それでも問題が解決しない場合は、以下の対処法を試してください：

```bash
# コンテナ内でシェルを起動
docker compose exec -it devenv bash

# 所有者を確認
ls -la /workspace

# 手動で所有権を変更（コンテナ内で）
chown -R nav:nav /workspace
```

## セキュリティ上の注意

この機能はローカル開発環境向けに設計されています。本番環境では、異なるセキュリティ設計を検討すべきです。
