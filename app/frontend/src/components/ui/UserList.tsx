import React, { useEffect, useState } from 'react';
import { UserType } from '../../types';
import apiClient from '../../api/axios';

const fetchUsers = async (): Promise<UserType[]> => {
    const res = await apiClient.get('/admin/users');
    return res.data;
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch(() => setError('ユーザー一覧の取得に失敗しました'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-gray-400 py-8">読み込み中...</div>;
    if (error) return <div className="text-red-400 py-8">{error}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto py-8">
            <h2 className="text-xl font-bold mb-6 text-gray-100">ユーザー一覧</h2>
            <div className="flex flex-col gap-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 bg-gray-800 rounded-lg px-4 py-3 shadow">
                        <div className="w-10 h-10 rounded-[14px] overflow-hidden bg-gray-700 flex items-center justify-center">
                            {user.avatar_image_file_path ? (
                                <img
                                    src={user.avatar_image_file_path}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : null}
                            <span
                                className="text-lg font-bold text-gray-100"
                                style={{ display: user.avatar_image_file_path ? 'none' : 'block' }}
                            >
                                {user.last_name?.[0] || user.username?.[0] || '?'}
                            </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-gray-100 text-sm truncate">
                                {user.last_name || ''} {user.first_name || user.username || '匿名ユーザー'}
                            </span>
                            <span className="text-xs text-gray-400 truncate">@{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
