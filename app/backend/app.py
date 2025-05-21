#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Application - NavStupro Project
基本的なFlaskアプリケーション設定と初期化

このモジュールは、Flaskアプリケーションのメインエントリポイントです。
"""
# バージョン情報
__version__ = "0.1.0"

# 必要なモジュールのインポート
import sys
from dotenv import load_dotenv; load_dotenv()
from pathlib import Path

# Pythonのパスを設定して、直下のsrcディレクトリを見つけられるようにする
src_path = Path(__file__).parent / "src"
if str(src_path) not in sys.path:
    sys.path.insert(0, str(src_path))

# すべてのインポートをここにまとめる
from flask import Flask, jsonify
from flask_cors import CORS
from config import get_config  # type: ignore #
from src.core.database import init_db  # データベース初期化関数


def create_app(config_name="dev"):
    """アプリケーションファクトリー関数"""
    app = Flask(__name__)

    # 設定の読み込み
    app.config.from_object(get_config(config_name))

    # CORSの設定
    CORS(app)

    # データベースの初期化
    init_db(app)

    # ヘルスチェックエンドポイント（フロントエンドからの接続確認用）
    @app.route("/api/health")
    def health_check():
        return jsonify(
            {"status": "ok", "message": "API is running", "version": __version__}
        )

    # ルートエンドポイント
    @app.route("/")
    def index():
        return jsonify({"message": "Welcome to NavStupro API"})

    # ブループリントの登録
    register_blueprints(app)

    # エラーハンドラーの登録
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Server error"}), 500

    return app


# ブループリント登録関数
def register_blueprints(app):
    """アプリケーションにブループリントを登録する関数"""
    try:
        # モジュール群からすべてのブループリントをインポート
        from src.modules import BLUEPRINTS

        # すべてのブループリントを登録
        for blueprint in BLUEPRINTS:
            app.register_blueprint(blueprint)
            app.logger.info(f"ブループリント {blueprint.name} を登録しました。URLプレフィックス: {blueprint.url_prefix}")
    except ImportError as e:
        app.logger.error(f"ブループリントの登録中にエラーが発生しました: {str(e)}")
        raise


# アプリケーションインスタンスを作成
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
