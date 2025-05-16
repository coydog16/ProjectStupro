#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NavStupro Backend Package
------------------------
このファイルはバックエンドパッケージのルート__init__.pyファイルです。
必要なインポートや初期化処理をここで行います。
"""
# バージョン情報
__version__ = '0.1.0'

# このパッケージがインポートされたときに利用可能なものを__all__で定義
__all__ = ['app', 'create_app', '__version__']

# 遅延インポート関数
def _import_app():
    from .app import app, create_app
    return app, create_app

# グローバル変数として公開
app, create_app = _import_app()


