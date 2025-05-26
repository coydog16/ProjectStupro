# Config module
"""
アプリケーション設定モジュール
開発環境と本番環境の設定を管理します
"""
import os
import importlib.util
import sys

"""設定パッケージ"""
from .dev import Config as DevConfig


def get_config(config_name="dev"):
    """
    設定を取得する関数
    デフォルトでは開発環境（dev）の設定を返します
    """
    # 環境変数からの設定名を優先
    config_name = os.environ.get("FLASK_CONFIG", config_name)

    # 設定ファイルのパス
    config_path = os.path.join(os.path.dirname(__file__), f"{config_name}.py")

    # ファイルの存在確認
    if not os.path.exists(config_path) and config_name != "test":
        # dev.py.exampleからコピー作成
        example_path = os.path.join(os.path.dirname(__file__), f"{config_name}.py.example")
        if os.path.exists(example_path):
            import shutil

            shutil.copy(example_path, config_path)
            print(f"Info: Created {config_name}.py from {config_name}.py.example")
        else:
            print(f"Warning: Config file {config_name}.py or {config_name}.py.example not found.")
            print("Using default development configuration.")
            config_name = "dev"
            config_path = os.path.join(os.path.dirname(__file__), f"{config_name}.py")
            example_path = os.path.join(os.path.dirname(__file__), f"{config_name}.py.example")
            if os.path.exists(example_path):
                import shutil

                shutil.copy(example_path, config_path)
                print(f"Info: Created {config_name}.py from {config_name}.py.example")

    # 設定モジュールをロード
    try:
        spec = importlib.util.spec_from_file_location(f"config.{config_name}", config_path)
        config_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(config_module)
        return config_module.Config
    except Exception as e:
        print(f"Error loading configuration: {str(e)}")
        sys.exit(1)


def get_config_by_name(config_name=None):
    """設定を取得する関数（旧関数名、互換性のため維持）"""
    return get_config(config_name)  # メインの関数にリダイレクト
