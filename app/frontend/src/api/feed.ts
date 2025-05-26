import apiClient from './axios';

// 投稿一覧取得API（全件 or ユーザー指定）
export const fetchFeed = async (username?: string) => {
    try {
        const url = username ? `/feed/${username}` : '/feed/';
        const res = await apiClient.get(url);
        return res.data;
    } catch (error) {
        throw new Error('Feed取得に失敗しました');
    }
};

export const createPost = async (content: string) => {
    try {
        const res = await apiClient.post('/feed/', { content });
        return res.data;
    } catch (error) {
        throw new Error('投稿に失敗しました');
    }
};
