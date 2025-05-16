#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Application - NavStupro Project
基本的なFlaskアプリケーション設定と初期化

このモジュールは、Flaskアプリケーションのメインエントリポイントです。
app/app.pyにあるアプリケーションファクトリと実装を利用します。
"""
# 必要なモジュールのインポート
import sys
import os

# パスを設定してappサブパッケージへのアクセスを保証する
backend_dir = os.path.dirname(os.path.abspath(__file__))
app_module_dir = os.path.join(backend_dir, 'app')
sys.path.insert(0, backend_dir)

# appサブパッケージからアプリケーションインスタンスとファクトリ関数をインポート
# __init__.pyで定義された公開インターフェースを使用
from app.app import app, create_app

def create_app(config_name="dev"):
    """アプリケーションファクトリー関数"""
    app = Flask(__name__)
    
    # 設定の読み込み
    app.config.from_object(get_config(config_name))
    
    # CORSの設定
    CORS(app)
    
    # ルートエンドポイント
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to NavStupro API"})
    
    # ブループリントの登録
    # from app.routes.auth import auth_bp
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # エラーハンドラーの登録
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Server error"}), 500
    
    return app
