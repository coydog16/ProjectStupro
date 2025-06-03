import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserByUsername } from '../../hooks/useUserByUsername';
import UserAvatar from '../../components/common/UserAvatar';
import BaseLayout from '../../components/layout/BaseLayout';
import { useAuth } from '../../hooks/useAuth';

const UsersPage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user, loading, error } = useUserByUsername(username);
    const { isAdmin, loading: authLoading } = useAuth();

    if (authLoading || loading) return <div className="text-center py-8">ユーザー情報を読み込み中...</div>;
    if (!isAdmin) return <div className="text-center py-8 text-red-500">管理者のみ閲覧可能です</div>;
    if (error || !user) return <div className="text-center py-8 text-red-500">ユーザー情報が見つかりません</div>;

    return (
        <BaseLayout
            user={{
                username: user.username,
                fullName: user.full_name || user.username,
                avatarUrl: user.avatar_image_file_path || undefined,
            }}
        >
            <div className="max-w-xl mx-auto p-6 bg-theme rounded-xl shadow mt-8">
                <div className="flex items-center gap-4 mb-6">
                    <UserAvatar
                        src={user.avatar_image_file_path || undefined}
                        name={user.full_name || user.username}
                        size={80}
                        className="shadow bg-accent/10"
                    />
                    <div>
                        <div className="text-xl font-bold text-accent">{user.full_name || user.username}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                    </div>
                </div>
                <div className="space-y-2 text-theme/90">
                    <div>
                        <span className="font-semibold">ユーザーID:</span> {user.id}
                    </div>
                    <div>
                        <span className="font-semibold">ユーザー名:</span> {user.username}
                    </div>
                    <div>
                        <span className="font-semibold">メール:</span> {user.email || '未登録'}
                    </div>
                    <div>
                        <span className="font-semibold">姓:</span> {user.last_name || '-'}
                    </div>
                    <div>
                        <span className="font-semibold">名:</span> {user.first_name || '-'}
                    </div>
                    <div>
                        <span className="font-semibold">権限:</span> {user.role || '-'}
                    </div>
                    <div>
                        <span className="font-semibold">アクティブ:</span>{' '}
                        {user.is_active !== undefined ? (user.is_active ? '有効' : '無効') : '-'}
                    </div>
                    <div>
                        <span className="font-semibold">プロフィール画像ID:</span> {user.avatar_image_id ?? '-'}
                    </div>
                    <div>
                        <span className="font-semibold">自己紹介:</span> {user.bio ?? '-'}
                    </div>
                    <div>
                        <span className="font-semibold">作成日:</span>{' '}
                        {user.created_at ? new Date(user.created_at).toLocaleString() : '-'}
                    </div>
                    <div>
                        <span className="font-semibold">更新日:</span>{' '}
                        {user.updated_at ? new Date(user.updated_at).toLocaleString() : '-'}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default UsersPage;
