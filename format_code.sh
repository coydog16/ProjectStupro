#!/bin/bash
# format_code.sh
# プロジェクト全体のPythonコードをフォーマットするスクリプト

echo "🔍 Pythonファイルをフォーマットしています..."
black /workspace/app/backend

echo "✅ フォーマットが完了しました！"
