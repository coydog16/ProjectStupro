import apiClient from './axios';
import { UserType } from '../types';

// ユーザー一覧取得API（管理画面用）
export const fetchUsers = async (): Promise<UserType[]> => {
    const res = await apiClient.get('/admin/users');
    return res.data;
};

// ユーザー削除API（管理画面用）
export const deleteUser = async (userId: number): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
};

// 今後、管理画面で使うユーザー管理・権限管理・削除などのAPIもここにまとめて追加していくと良いよ！
