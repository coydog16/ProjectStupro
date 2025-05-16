# Black フォーマッターの使い方

Black は、Python コードを自動で整形してくれるフォーマッターツールです。コーディングスタイルに関する議論を減らし、一貫性のある Python コードベースを維持するためのツールです。このドキュメントでは、当プロジェクトでの Black の使い方について説明します。

## 目次

1. [Black とは](#blackとは)
2. [設定方法](#設定方法)
3. [使い方](#使い方)
   - [VSCode での使用方法](#vscodeでの使用方法)
   - [コマンドラインでの使用方法](#コマンドラインでの使用方法)
4. [プロジェクト全体のフォーマット](#プロジェクト全体のフォーマット)
5. [カスタム設定](#カスタム設定)
6. [トラブルシューティング](#トラブルシューティング)

## Black とは

Black は「意見の余地がない（The Uncompromising）」Python コードフォーマッターです。PEP 8 に準拠したコードを自動生成し、コーディングスタイルの一貫性を保ちます。コードレビューの際のスタイルに関する議論を減らし、開発者が実際のコードロジックに集中できるようにします。

Black の特徴：

- 一貫したコードスタイル
- 自動フォーマット
- 読みやすい差分
- チーム全体での統一されたコーディングスタイル

## 設定方法

当プロジェクトでは、Black はすでに devcontainer 環境に設定済みです。新しい環境を構築する場合は、以下の手順で自動的にインストールされます：

1. devcontainer が起動すると、`postCreateCommand` によって自動的に Black がインストールされます
2. VSCode の設定ファイル（`.vscode/settings.json`）により、Python ファイル保存時に自動フォーマットが有効になります
3. プロジェクトルートの `pyproject.toml` ファイルに Black の設定が定義されています

## 使い方

### VSCode での使用方法

VSCode で Black を使用する方法はいくつかあります：

1. **自動フォーマット**：

   - ファイルを保存すると自動的にフォーマットが適用されます（設定済み）

2. **手動フォーマット**：

   - キーボードショートカット: `Shift+Alt+F`（Windows/Linux）または `Shift+Option+F`（Mac）
   - 右クリックメニューから「ドキュメントのフォーマット」を選択
   - コマンドパレット（`Ctrl+Shift+P`）から「Format Document」を実行

3. **フォーマッターの選択**：
   - ステータスバーの右下に表示される「Select Formatter」から Black を選択できます
   - すでに「Black Formatter」が選択されている場合は、そのまま使用できます

### コマンドラインでの使用方法

ターミナルから Black を直接実行することも可能です：

```bash
# 単一ファイルをフォーマット
black path/to/file.py

# ディレクトリ内のすべての Python ファイルをフォーマット
black path/to/directory/

# 変更内容のプレビュー（実際には変更しない）
black --check path/to/file.py

# 詳細な出力を表示
black --verbose path/to/file.py
```

## プロジェクト全体のフォーマット

プロジェクト全体を一括でフォーマットするには、プロジェクトルートにある `format_code.sh` スクリプトを使用します：

```bash
# プロジェクトルートから実行
./format_code.sh
```

または、直接 Black コマンドを使用することもできます：

```bash
# バックエンドコード全体をフォーマット
black /workspace/app/backend
```

## カスタム設定

プロジェクトの Black 設定は `pyproject.toml` ファイルで管理しています：

```toml
[tool.black]
line-length = 88                # 1行の最大長
target-version = ['py311']      # ターゲットPythonバージョン
include = '\.pyi?$'            # フォーマット対象ファイル
exclude = '''                   # 除外対象ファイル
/(
    \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
  | __pycache__
)/
'''
```

設定を変更する場合は、このファイルを編集してください。

## トラブルシューティング

### よくある問題と解決方法

1. **Black がインストールされていない**

   ```bash
   pip install black==23.3.0
   ```

2. **VSCode が自動フォーマットしない**

   - 以下の設定が `.vscode/settings.json` にあることを確認：

   ```json
   {
     "editor.formatOnSave": true,
     "[python]": {
       "editor.defaultFormatter": "ms-python.black-formatter",
       "editor.formatOnSave": true
     }
   }
   ```

   - Black 拡張機能がインストールされていることを確認

3. **フォーマットエラーが発生する**

   - 構文エラーのあるコードは Black でフォーマットできません
   - まずは Python コードの構文エラーを修正してください

4. **特定のコードブロックをフォーマットから除外したい**
   - 以下のコメントを使用して Black によるフォーマットを無効にできます：
   ```python
   # fmt: off
   特別にフォーマットしたくないコード
   # fmt: on
   ```

---

お姉さんより一言：綺麗なコードは読みやすいだけじゃなくて、バグも見つけやすいよ～！ Black を使って、チーム全員が同じスタイルでコーディングすれば、みんな幸せになれるね ♪ 困ったことがあったらいつでも声かけてね～
