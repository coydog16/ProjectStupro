import apiClient from './axios';
import { UserType } from '../types';

// ユーザー名からユーザー情報を取得
export const fetchUserByUsername = async (username: string): Promise<UserType | null> => {
    try {
        const res = await apiClient.get(`/users/${username}`);
        return res.data;
    } catch {
        return null;
    }
};
