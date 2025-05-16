#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Application - NavStupro Project
基本的なFlaskアプリケーション設定と初期化

このモジュールは、Flaskアプリケーションのメインエントリポイントです。
"""
# バージョン情報
__version__ = '0.1.0'

# 必要なモジュールのインポート
import sys
import os
from flask import Flask, jsonify
from flask_cors import CORS

# Pythonのパスを設定して、appサブパッケージを見つけられるようにする
backend_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(backend_dir, 'app')
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

# 設定モジュールをインポート (パスを修正)
try:
    from app.config import get_config_by_name as get_config
except ImportError:
    from config import get_config_by_name as get_config

def create_app(config_name="dev"):
    """アプリケーションファクトリー関数"""
    app = Flask(__name__)
    
    # 設定の読み込み
    app.config.from_object(get_config(config_name))
    
    # CORSの設定
    CORS(app)
    
    # ヘルスチェックエンドポイント（フロントエンドからの接続確認用）
    @app.route('/api/health')
    def health_check():
        return jsonify({"status": "ok", "message": "API is running", "version": __version__})
    
    # ルートエンドポイント
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to NavStupro API"})
    
    # ブループリントの登録 (コメントアウトしておく)
    # register_blueprints(app)
    
    # エラーハンドラーの登録
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Server error"}), 500
    
    return app

# ブループリント登録関数 (後で有効化する)
def register_blueprints(app):
    """アプリケーションにブループリントを登録する関数"""
    # ここではまずコメントアウトしておく
    # あとでモジュールが完成したら追加してね
    pass

# アプリケーションインスタンスを作成
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
