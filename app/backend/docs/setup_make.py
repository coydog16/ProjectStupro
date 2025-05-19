import os
import subprocess
import sys

# 環境変数を設定
os.environ["LC_ALL"] = "C.UTF-8"
os.environ["LANG"] = "C.UTF-8"
os.environ["TZ"] = "Asia/Tokyo"

print("ロケール設定を C.UTF-8 に設定しました")

# コマンドライン引数を取得（デフォルトは'html'）
builder = 'html'
if len(sys.argv) > 1:
    builder = sys.argv[1]

# makeコマンドを実行
try:
    print(f"make {builder} を実行します...")
    result = subprocess.run(['make', builder], check=True)
    print(f"ビルドが完了しました！")
except subprocess.CalledProcessError as e:
    print(f"ビルド中にエラーが発生しました: {e}")
    sys.exit(1)
