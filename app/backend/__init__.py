#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NavStupro Backend Package
------------------------
このファイルはバックエンドパッケージのルート__init__.pyファイルです。
必要なインポートや初期化処理をここで行います。
"""
# バージョン情報
__version__ = "0.1.0"

# ルートディレクトリのapp.py（アプリケーションファクトリを含むファイル）からの必要なインポート
from .app import app, create_app

# このパッケージがインポートされたときに利用可能なものを__all__で定義
__all__ = ["app", "create_app", "__version__"]
