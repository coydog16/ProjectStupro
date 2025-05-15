#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
シンプルFlaskアプリケーション
フロントエンドからのAPI接続テスト用
"""
from flask import Flask, jsonify
from flask_cors import CORS

# Flaskアプリケーションを作成（明示的な名前をつける）
application = Flask(__name__)
CORS(application)  # すべてのドメインからのリクエストを許可

# flaskコマンドで認識できるようにappという変数で公開
app = application

@application.route('/')
def index():
    return jsonify({"message": "Hello from Flask!"})

@application.route('/api/health')
def health():
    return jsonify({
        "status": "healthy", 
        "version": "0.1.0",
        "message": "API is working correctly!"
    })

if __name__ == '__main__':
    application.run(host='0.0.0.0', debug=True, port=5000)
