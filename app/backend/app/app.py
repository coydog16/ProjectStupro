#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Application - NavStupro Project
基本的なFlaskアプリケーション設定と初期化
"""
from flask import Flask, jsonify
from flask_cors import CORS
from .config import get_config

def create_app(config_name="dev"):
    """アプリケーションファクトリー関数"""
    app = Flask(__name__)
    
    # 設定の読み込み
    app.config.from_object(get_config(config_name))
    
    # CORSの設定
    CORS(app)
    
    # 基本ルートの設定
    @app.route('/')
    def index():
        return jsonify({
            "message": "Welcome to NavStupro API",
            "status": "running"
        })
    
    # API基本エンドポイント
    @app.route('/api')
    def api_index():
        return jsonify({
            "message": "NavStupro API is running",
            "status": "active"
        })
    
    # APIのヘルスチェック用エンドポイント
    @app.route('/api/health')
    def health():
        return jsonify({
            "status": "healthy",
            "version": "0.1.0"
        })
    
    # 今後のAPI拡張はここに追加
    # 例: from .routes import register_routes
    #     register_routes(app)
    
    return app

# アプリケーションのインスタンス作成
app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)