import axios from 'axios';

// 投稿一覧取得API
export const fetchFeed = async () => {
    try {
        const res = await axios.get('/api/feed/');
        return res.data;
    } catch (error) {
        throw new Error('Feed取得に失敗しました');
    }
};

export const createPost = async (content: string) => {
    try {
        const res = await axios.post('/api/feed/', { content });
        return res.data;
    } catch (error) {
        throw new Error('投稿に失敗しました');
    }
};
