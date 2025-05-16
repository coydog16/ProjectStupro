# Python の「とりあえず入れとけ」系モジュール解説

このドキュメントでは、Python 開発でよく使われる基本的かつ重要なモジュールについて解説します。これらのモジュールは多くのプロジェクトで「とりあえず入れておく」価値のある便利なツールです。

## 標準ライブラリの便利モジュール

### sys - システム特有のパラメータと関数

```python
import sys
```

**主な機能:**

- `sys.path`: Python がモジュールを検索するパスのリスト（モジュールの検索パスを追加/変更できる）
- `sys.argv`: コマンドライン引数を取得
- `sys.exit()`: プログラムを終了
- `sys.version`: 使用中の Python バージョン情報を取得
- `sys.platform`: 実行中のプラットフォーム情報を取得

**使用例:**

```python
# モジュール検索パスに新しいディレクトリを追加
sys.path.insert(0, '/path/to/my/modules')

# コマンドライン引数の取得
args = sys.argv[1:]  # 最初の引数（スクリプト名）を除く

# エラーコード付きでプログラム終了
if error:
    sys.exit(1)
```

### os - オペレーティングシステムとの対話

```python
import os
```

**主な機能:**

- ファイルシステム操作（ファイルの作成、削除、リネームなど）
- 環境変数へのアクセス
- プロセス管理
- OS に依存するパス操作（古い方法、新しいプロジェクトでは`pathlib`推奨）

**使用例:**

```python
# 環境変数の取得
database_url = os.environ.get('DATABASE_URL', 'default_connection_string')

# ディレクトリ作成
os.makedirs('data/processed', exist_ok=True)

# カレントディレクトリの変更
os.chdir('/path/to/working/directory')
```

### pathlib - オブジェクト指向のファイルシステムパス

```python
from pathlib import Path
```

**主な機能:**

- パスの操作と結合をオブジェクト指向的に行う（`os.path`の現代版）
- ファイル・ディレクトリの存在確認、作成、削除などの操作
- パターンマッチングによるファイル検索
- クロスプラットフォーム対応（Windows/Linux/Mac でパスの違いを意識しなくて良い）

**使用例:**

```python
# カレントディレクトリからの相対パス
data_dir = Path('data')
output_file = data_dir / 'output' / 'results.csv'  # パスの結合

# ホームディレクトリからの絶対パス
config_file = Path.home() / '.config' / 'myapp'

# ディレクトリ作成（親ディレクトリも含め）
output_file.parent.mkdir(parents=True, exist_ok=True)

# ファイル書き込み（文字列）
output_file.write_text('Hello, World!')
```

### datetime - 日付と時刻の操作

```python
from datetime import datetime, timedelta
```

**主な機能:**

- 日付と時刻の生成、操作、フォーマット
- タイムゾーンの処理
- 日付の計算（日数の加算・減算など）
- 文字列と日付の相互変換

**使用例:**

```python
# 現在日時の取得
now = datetime.now()

# 日付のフォーマット
formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')

# 日付の計算
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(days=7)
```

### json - JSON データの処理

```python
import json
```

**主な機能:**

- Python オブジェクトと JSON 文字列の相互変換
- JSON ファイルの読み書き
- API 通信のデータ処理

**使用例:**

```python
# Pythonオブジェクト→JSON文字列
data = {'name': 'Alice', 'age': 30, 'is_active': True}
json_str = json.dumps(data, indent=4)

# JSON文字列→Pythonオブジェクト
parsed_data = json.loads('{"name": "Bob", "age": 25}')

# JSONファイル読み込み
with open('config.json', 'r') as f:
    config = json.load(f)

# JSONファイル書き込み
with open('output.json', 'w') as f:
    json.dump(data, f, indent=4)
```

### logging - ログ記録

```python
import logging
```

**主な機能:**

- 異なるレベル（DEBUG, INFO, WARNING, ERROR, CRITICAL）によるログ記録
- ログのフォーマット設定
- ログの出力先設定（ファイル、コンソールなど）
- ログローテーションの設定

**使用例:**

```python
# 基本設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

# 各レベルでのログ記録
logging.debug('デバッグ情報')
logging.info('通常の情報')
logging.warning('警告')
logging.error('エラー')
logging.critical('致命的なエラー')
```

### re - 正規表現

```python
import re
```

**主な機能:**

- パターンマッチング
- 文字列の検索と置換
- 文字列の分割と抽出

**使用例:**

```python
# パターンマッチング
if re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
    print('有効なメールアドレスです')

# 文字列の置換
phone = re.sub(r'(\d{3})(\d{4})(\d{4})', r'\1-\2-\3', '09012345678')

# グループの抽出
match = re.search(r'Version: (\d+\.\d+\.\d+)', text)
if match:
    version = match.group(1)
```

## よく使われる標準外モジュール

### requests - HTTP リクエスト

```python
import requests  # pipでのインストールが必要
```

**主な機能:**

- HTTP/HTTPS 通信（GET, POST, PUT, DELETE など）
- API との連携
- 認証、ヘッダー、クッキーの処理
- ファイルのアップロード・ダウンロード

**使用例:**

```python
# GETリクエスト
response = requests.get('https://api.example.com/data')
data = response.json()

# パラメータ付きGET
params = {'q': 'python', 'sort': 'stars'}
response = requests.get('https://api.github.com/search/repositories', params=params)

# POSTリクエスト
payload = {'username': 'user', 'password': 'pass'}
response = requests.post('https://api.example.com/login', json=payload)
```

### pandas - データ分析

```python
import pandas as pd  # pipでのインストールが必要
```

**主な機能:**

- 表形式データ（CSV, Excel, SQL など）の読み書き
- データの操作、フィルタリング、変換
- 集計、統計分析
- データの可視化（matplotlib/seaborn との連携）

**使用例:**

```python
# CSVファイル読み込み
df = pd.read_csv('data.csv')

# データのフィルタリング
active_users = df[df['status'] == 'active']

# 集計
summary = df.groupby('category').agg({'amount': 'sum', 'user_id': 'count'})

# 保存
df.to_excel('output.xlsx', index=False)
```

## Web アプリケーション開発向けモジュール

### flask - 軽量 Web フレームワーク

```python
from flask import Flask, request, jsonify  # pipでのインストールが必要
```

**主な機能:**

- RESTful API 作成
- ルーティング
- リクエスト・レスポンス処理
- テンプレートエンジン（Jinja2）
- 拡張機能（SQLAlchemy, JWT, Cors など）

**使用例:**

```python
app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def get_users():
    # ユーザー一覧を返すAPIエンドポイント
    return jsonify(users_list)

@app.route('/api/users', methods=['POST'])
def create_user():
    # 新規ユーザー作成
    data = request.json
    # データ処理...
    return jsonify({'id': new_user_id}), 201
```

## まとめ

これらのモジュールは多くの Python プロジェクトで頻繁に使われる基盤となるモジュールです。初期段階から適切に組み込むことで、効率的な開発が可能になります。特に`sys`、`os`、`pathlib`、`datetime`、`json`、`logging`の標準ライブラリは、ほぼすべてのプロジェクトで「とりあえず入れておく」価値があるでしょう。

プロジェクトの要件に応じて、これらのモジュールを組み合わせることで、堅牢で保守性の高い Python アプリケーションを構築できます。
