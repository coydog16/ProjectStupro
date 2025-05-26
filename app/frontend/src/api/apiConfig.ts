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
        Accept: 'application/json',
    },
};

// APIリトライ設定
export const API_RETRY_CONFIG = {
    retries: 3, // 最大リトライ回数
    retryDelay: (retryCount: number) => retryCount * 1000, // リトライ間隔（例: 1秒, 2秒, 3秒）
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
    SERVER_ERROR: 500,
};

// エラーメッセージのマッピング
export const ERROR_MESSAGES = {
    [HTTP_STATUS.BAD_REQUEST]: 'リクエストが不正です。',
    [HTTP_STATUS.UNAUTHORIZED]: '認証が必要です。ログインしてください。',
    [HTTP_STATUS.FORBIDDEN]: 'この操作は許可されていません。',
    [HTTP_STATUS.NOT_FOUND]: 'リソースが見つかりません。',
    [HTTP_STATUS.SERVER_ERROR]: 'サーバーでエラーが発生しました。しばらくしてから再試行してください。',
};

// ページネーション設定
export const PAGINATION_CONFIG = {
    defaultPageSize: 20, // 1ページあたりのデフォルト件数
    pageParam: 'page', // ページ番号のパラメータ名
    sizeParam: 'size', // ページサイズのパラメータ名
};

export const LOGGING_CONFIG = {
    enableRequestLogging: true, // リクエストログを有効化
    enableResponseLogging: true, // レスポンスログを有効化
};
