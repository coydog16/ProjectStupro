import React, { useEffect, useState } from 'react';
import { UserType } from '../../types';
import apiClient from '../../api/axios';
import UserAvatar from '../common/UserAvatar';

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

    if (loading) return <div className="py-8 text-theme/60">読み込み中...</div>;
    if (error) return <div className="py-8 text-error">{error}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto py-8 bg-theme text-theme">
            <h2 className="text-xl font-bold mb-6 text-theme">ユーザー一覧</h2>
            <div className="flex flex-col gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center gap-4 bg-theme rounded-xl px-4 py-3 shadow border border-accent/20"
                    >
                        <div className="w-8 h-8 rounded-xl overflow-hidden bg-accent/10 flex items-center justify-center">
                            <UserAvatar
                                src={user.avatar_image_file_path || undefined}
                                name={user.full_name || user.username}
                                size={32}
                                className="shadow"
                            />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-theme text-sm truncate">
                                {user.last_name || ''} {user.first_name || user.username || '匿名ユーザー'}
                            </span>
                            <span className="text-xs text-accent/70 truncate">@{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
