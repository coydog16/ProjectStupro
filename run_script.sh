#!/bin/bash
# filepath: /home/coydog16/flask/navStupro/run_script.sh

# スクリプトが存在するディレクトリを基準にする
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# seed_all.py を直接実行できるように追加
if [[ "$1" == "seed_all" ]]; then
    python3 "$SCRIPT_DIR/app/backend/scripts/seed_all.py"
    exit $?
fi

# スクリプトランチャーに転送（相対パスではなく絶対パスを使用）
"${SCRIPT_DIR}/scripts/run_scripts.sh" "$@"
