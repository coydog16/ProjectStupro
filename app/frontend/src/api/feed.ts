import apiClient from './axios';

// 投稿一覧取得API（postAPIを利用）
export const fetchFeed = async (username?: string) => {
    try {
        const url = username ? `/post/${username}` : '/post/'; // postAPI
        const res = await apiClient.get(url);
        return res.data;
    } catch (error) {
        throw new Error('Feed取得に失敗しました');
    }
};

// 新規投稿API（postAPIを利用）
export const createPost = async (content: string) => {
    try {
        const res = await apiClient.post('/post/', { content }); // postAPI
        return res.data;
    } catch (error) {
        throw new Error('投稿に失敗しました');
    }
};

// 投稿削除API（postAPIを利用）
export const deletePostApi = async (postId: number) => {
    try{
        const res = await apiClient.delete(`/post/${postId}`); // postAPI
        return res.data;
    } catch(error) {
        throw new Error('投稿の削除に失敗しました');
    }
};

// 投稿更新API（postAPIを利用）
export const updatePostApi = async (postId: number, content: string) => {
    try {
        const res = await apiClient.put(`/post/${postId}`, { content }); // postAPI
        return res.data;
    } catch (error) {
        throw new Error('投稿の更新に失敗しました');
    }
};
