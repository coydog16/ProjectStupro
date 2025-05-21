/**
 * API共通設定ファイル
 * バックエンドAPIとの接続に関する共通設定を管理します
 */

// バックエンドのベースURL
export const API_BASE_URL = '/api';

// APIリクエスト時のデフォルト設定
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// APIリクエストのタイムアウト設定（ミリ秒）
export const API_TIMEOUT = 30000;

// レスポンスコードの定義
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
