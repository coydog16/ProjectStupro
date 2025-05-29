import apiClient from './axios';
import { FeedUser } from '../features/feed/types';

// ユーザー一覧取得API
export const fetchUsers = async (): Promise<FeedUser[]> => {
    const res = await apiClient.get('/users/');
    return res.data;
};

// 必要に応じて他のユーザー関連APIもここに追加できます
