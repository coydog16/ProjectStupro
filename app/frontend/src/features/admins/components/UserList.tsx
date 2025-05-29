import React, { useEffect, useState } from 'react';
import { UserType } from '../../../types';
import { fetchUsers } from '../../../api/admin';

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
        <section className="text-gray-600 body-font">
            <div className="container mx-auto px-5 py-24">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl sm:text-3xl font-medium title-font mb-4 text-gray-900">ユーザー一覧</h1>
                    <p className="mx-auto lg:w-2/3 leading-relaxed text-base">
                        このサービスに登録されているユーザーの一覧です。
                    </p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {users.map((user) => (
                        <div key={user.id} className="p-2 w-full md:w-1/2 lg:w-1/3">
                            <div className="h-full flex items-center border border-gray-200 p-4 rounded-lg bg-white/80 shadow-sm transition hover:scale-[1.02] hover:shadow-md">
                                <img
                                    alt={user.last_name || user.full_name || user.username || '匿名ユーザー'}
                                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 border border-gray-300"
                                    src={
                                        user.avatar_image_file_path ||
                                        (user.avatar_image_id
                                            ? `/api/images/${user.avatar_image_id}`
                                            : `https://dummyimage.com/80x80`)
                                    }
                                    loading="lazy"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">
                                        {user.last_name || user.full_name || user.username || '匿名ユーザー'}
                                    </h2>
                                    <p className="text-gray-500">Member</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserList;
