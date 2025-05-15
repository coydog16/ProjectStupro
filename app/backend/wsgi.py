#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Application Starter
NavStupro Project用の起動スクリプト
"""
# アプリケーションのルートファイルからcreate_app関数をインポート
from app_main import create_app

# Flaskのアプリケーションファクトリーを呼び出し
application = create_app()

# FlaskのCLIが認識できるようにappという名前でエクスポート
app = application

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
