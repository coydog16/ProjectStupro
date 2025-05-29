import apiClient from './axios';
import { FeedUser } from '../features/feed/types';

// ユーザー一覧取得API（管理画面用）
export const fetchUsers = async (): Promise<FeedUser[]> => {
    const res = await apiClient.get('/users/');
    return res.data;
};

// 今後、管理画面で使うユーザー管理・権限管理・削除などのAPIもここにまとめて追加していくと良いよ！
