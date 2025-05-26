"""
全てのseedスクリプト（ユーザー・投稿）をまとめて実行するランチャースクリプト
"""
import subprocess
import sys
from pathlib import Path

# スクリプトのパスを取得
BASE_DIR = Path(__file__).resolve().parent
SCRIPTS = [
    BASE_DIR / "seed_users.py",
    BASE_DIR / "seed_posts.py",  # リネーム後のファイル名
]

def run_script(script_path):
    print(f"\n--- Running {script_path.name} ---")
    result = subprocess.run([sys.executable, str(script_path)], capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    print(f"--- Finished {script_path.name} ---\n")

def main():
    for script in SCRIPTS:
        run_script(script)
    print("✅ 全てのseedスクリプトが完了しました")

if __name__ == "__main__":
    main()
