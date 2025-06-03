import React, { useEffect, useState } from 'react';
import { UserType } from '../../types';
import apiClient from '../../api/axios';
import UserAvatar from '../common/UserAvatar';
import FeedMenu from '../../features/feed/components/FeedMenu';
import { deleteUser } from '../../api/admin';
import { ConfirmDialog } from '../common/ConfirmDialog';

const fetchUsers = async (): Promise<UserType[]> => {
    const res = await apiClient.get('/admin/users');
    return res.data;
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetUser, setTargetUser] = useState<UserType | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch(() => setError('ユーザー一覧の取得に失敗しました'))
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (user: UserType) => {
        // TODO: 編集処理（モーダル表示など）
        alert(`${user.username} を編集します`);
    };
    const handleDelete = (user: UserType) => {
        setTargetUser(user);
        setConfirmOpen(true);
    };
    const handleDeleteConfirm = async () => {
        if (!targetUser) return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await deleteUser(targetUser.id);
            setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
            setConfirmOpen(false);
            setTargetUser(null);
        } catch (e: any) {
            setDeleteError('削除に失敗しました');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <div className="py-8 text-theme/60">読み込み中...</div>;
    if (error) return <div className="py-8 text-error">{error}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto py-8 bg-theme text-theme">
            <h2 className="text-xl font-bold mb-6 text-theme">ユーザー一覧</h2>
            {deleteError && <div className="text-error mb-2">{deleteError}</div>}
            <div className="flex flex-col gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center gap-4 bg-theme rounded-xl px-4 py-3 shadow border border-accent/20 cursor-pointer hover:bg-accent/5 transition"
                        onClick={() => window.location.assign(`/users/${user.username}`)}
                    >
                        <div className="w-8 h-8 rounded-xl overflow-hidden bg-accent/10 flex items-center justify-center">
                            <UserAvatar
                                src={user.avatar_image_file_path || undefined}
                                name={user.full_name || user.username}
                                size={32}
                                className="shadow"
                            />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="font-semibold text-theme text-sm truncate">
                                {user.last_name || ''} {user.first_name || user.username || '匿名ユーザー'}
                            </span>
                            <span className="text-xs text-accent/70 truncate">@{user.username}</span>
                        </div>
                        <div className="ml-auto">
                            <FeedMenu onEdit={() => handleEdit(user)} onDelete={() => handleDelete(user)} />
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDialog
                isOpen={confirmOpen}
                message={targetUser ? `本当に「${targetUser.username}」を削除しますか？この操作は取り消せません。` : ''}
                confirmLabel={deleting ? '削除中...' : '削除'}
                cancelLabel="キャンセル"
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    setConfirmOpen(false);
                    setTargetUser(null);
                }}
            />
        </div>
    );
};

export default UserList;
