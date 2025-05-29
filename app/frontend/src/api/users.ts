import apiClient from './axios';
import { UserType } from '../types';

// ユーザー一覧取得API
export const fetchUsers = async (): Promise<UserType> => {
    const res = await apiClient.get('/users/');
    return res.data;
};

// 必要に応じて他のユーザー関連APIもここに追加できます
