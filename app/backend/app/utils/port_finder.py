#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ポート関連のユーティリティ関数

ポートの空き状況をチェックしたり、利用可能なポートを見つけたりするための機能を提供します。
"""
import socket
import logging
from typing import List, Optional

# ロガーの設定
logger = logging.getLogger(__name__)


def is_port_in_use(port: int) -> bool:
    """
    指定されたポートが使用中かどうかを確認します。

    Args:
        port: チェックするポート番号

    Returns:
        bool: ポートが使用中の場合はTrue、そうでなければFalse
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(("localhost", port))
            return False  # バインドできたので使用されていない
        except socket.error:
            return True  # 既に使用中


def find_available_port(
    start_port: int = 5000, max_attempts: int = 10
) -> Optional[int]:
    """
    利用可能なポートを見つけます。指定されたポートから順番にチェックします。

    Args:
        start_port: チェックを開始するポート番号
        max_attempts: チェックする最大の試行回数

    Returns:
        int or None: 利用可能なポート番号。見つからない場合はNone
    """
    for port_offset in range(max_attempts):
        port = start_port + port_offset
        if not is_port_in_use(port):
            return port

    logger.warning(
        f"利用可能なポートが見つかりません (試行範囲: {start_port}-{start_port + max_attempts - 1})"
    )
    return None


def get_port_suggestions(preferred_port: int = 5000) -> List[int]:
    """
    推奨ポートのリストを取得します。優先ポートが使用できない場合の代替案を提供します。

    Args:
        preferred_port: 優先的に使用したいポート番号

    Returns:
        List[int]: 推奨ポートのリスト
    """
    suggestions = []

    # 優先ポートが利用可能ならそれを追加
    if not is_port_in_use(preferred_port):
        suggestions.append(preferred_port)

    # 他の一般的なポートも候補として追加
    other_ports = [5001, 8000, 8080, 3000, 3001]
    for port in other_ports:
        if port != preferred_port and not is_port_in_use(port):
            suggestions.append(port)

    return suggestions
