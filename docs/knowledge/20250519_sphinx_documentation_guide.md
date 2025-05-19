# Sphinx ドキュメント生成ガイド

## 概要

このドキュメントでは、プロジェクトに追加した [Sphinx](https://www.sphinx-doc.org/ja/master/) ドキュメント生成ツールについて説明します。Sphinx は高品質なドキュメントを作成するための Python ツールで、特に API リファレンスやコードドキュメントの自動生成に優れています。

## Dockerfile への追加内容

プロジェクトの Dockerfile に以下の Sphinx 関連パッケージを追加しました：

```dockerfile
# Pythonの開発ツール
RUN pip install --no-cache-dir \
    black \
    isort \
    flake8 \
    mypy \
    pytest \
    sphinx \
    sphinx-rtd-theme \
    sphinx-autodoc-typehints \
    sphinx-autobuild
```

追加したパッケージ：

-   `sphinx`: ドキュメント生成ツール本体
-   `sphinx-rtd-theme`: Read the Docs 風のテーマ（見やすく整理されたスタイル）
-   `sphinx-autodoc-typehints`: Python 型ヒントを自動的にドキュメントに反映させるプラグイン
-   `sphinx-autobuild`: ドキュメントの変更をリアルタイムでプレビューするツール

## セットアップスクリプト

ドキュメント生成のサポートとして、2 つの Python スクリプトを作成しました：

### 1. setup_sphinx.py

`app/backend/docs/setup_sphinx.py` は Sphinx の初期設定を自動化するスクリプトです。プロジェクト名、著者名などの基本設定を行い、`sphinx-quickstart` コマンドの対話プロンプトに自動で回答します。

⚠️ **注意: このスクリプトはプロジェクト初期設定時に一度だけ実行済みです。再実行は不要です。** ⚠️

```python
# 使い方（⚠️すでに実行済みのため、実行しないでください⚠️）
python setup_sphinx.py
```

このスクリプトは以下の処理を行います：

-   プロジェクト名、著者名の設定
-   ソースディレクトリとビルドディレクトリを分けない設定
-   日本語を選択
-   `pexpect` を使用して対話的なプロセスを自動化

このスクリプトは初期設定の記録として保持していますが、**新規メンバーも含め、現在は使用しません**。

### 2. setup_make.py

`app/backend/docs/setup_make.py` はドキュメントのビルドを簡単に行うためのスクリプトです。

```python
# 使い方（HTMLドキュメントを生成）
python setup_make.py html

# その他のビルドタイプを指定することも可能
python setup_make.py latex  # LaTeXドキュメントを生成
```

このスクリプトは、引数で指定されたビルドタイプ（デフォルトは `html`）を使用して `make` コマンドを実行します。

## 使い方ガイド

### 初期セットアップ

1. ~~Sphinx 設定の初期化:~~

    ```bash
    # ⚠️ このコマンドは実行しないでください ⚠️
    # cd app/backend/docs
    # python setup_sphinx.py
    ```

    ⚠️ **この手順はスキップしてください** ⚠️

    このスクリプトは Sphinx の初期設定を一度だけ行うためのもので、すでにプロジェクト開始時に実行済みです。`conf.py`、`index.rst`、`Makefile`などの基本ファイルは既にリポジトリに含まれているため、**新しく参画したメンバーも含め、実行する必要はありません**。再実行すると、既存の設定ファイルが上書きされる可能性があります。

2. ドキュメントの構成編集:
    - `conf.py`: Sphinx の設定ファイル
    - `index.rst`: ドキュメントのルートファイル
    - 必要に応じて追加の `.rst` ファイルを作成

### ドキュメントのビルド

HTML 形式のドキュメントを生成:

```bash
cd app/backend/docs
python setup_make.py html
```

生成されたドキュメントは `_build/html/` ディレクトリに出力されます。

### リアルタイムプレビュー

`sphinx-autobuild` を使用すると、変更をリアルタイムでプレビューできます:

```bash
cd app/backend/docs
sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000
```

ブラウザで `http://localhost:8000` にアクセスするとドキュメントが表示され、ファイルの変更が自動的に更新されます。

## 推奨事項

1. **Python コードのドキュメンテーション**:

    - docstring には Google 形式か Numpy スタイルの形式を使用
    - 型ヒントを適切に記述すると、`sphinx-autodoc-typehints` によって自動的にドキュメントに反映

2. **拡張機能の活用**:

    - 必要に応じて追加の Sphinx 拡張機能をインストール
    - `conf.py` の `extensions` リストに追加することで有効化

3. **ドキュメントの更新**:
    - コードの重要な変更がある場合は、ドキュメントも更新
    - CI パイプラインでドキュメントの自動ビルドを検討

## 参考リンク

-   [Sphinx 公式ドキュメント](https://www.sphinx-doc.org/ja/master/)
-   [reStructuredText 入門](https://www.sphinx-doc.org/ja/master/usage/restructuredtext/basics.html)
-   [sphinx-autodoc-typehints](https://github.com/tox-dev/sphinx-autodoc-typehints)
-   [sphinx-rtd-theme](https://sphinx-rtd-theme.readthedocs.io/en/stable/)
