import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedList from '../components/FeedList';
import NewPostButton from '../components/NewPostButton';
import { ModalNewPost } from '../components/ModalNewPost';
import { ModalEditPost } from '../components/ModalEditPost';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import Loading from '../../../components/common/Loading';
import { useFeedSwitchNav } from '../hooks/useFeedSwitchNav';
import BaseLayout from '../../../components/layout/BaseLayout';
import { useHeaderSlideOut } from '../../../hooks/useHeaderSlideOut';
import { useFeedData } from '../hooks/useFeedData';
import { useModal } from '../../../hooks/useModal';
import { useUserByUsername } from '../../../hooks/useUserByUsername';

/**
 * 投稿フィードページ
 * - ALL/SELF切り替え
 * - 新規投稿モーダル
 */
const FeedPage: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const { active, handleSwitchNav } = useFeedSwitchNav();
    const isHeaderHidden = useHeaderSlideOut();

    // ユーザー情報を独立して取得
    const { user: userInfo } = useUserByUsername(username);

    // フィードデータ・CRUD・モーダル管理をカスタムフックで一括管理
    const {
        allPosts,
        selfPosts,
        initialLoading,
        error,
        editModalOpen,
        setEditModalOpen,
        editingPost,
        handleNewPost,
        handleEdit,
        handleEditSubmit,
        handleDelete,
        handleDeleteConfirm,
        deleteModalOpen,
        setDeleteModalOpen,
    } = useFeedData(username);

    // 全モーダル状態をuseModalで一元管理
    const newPostModal = useModal();
    const editPostModal = useModal();
    const deletePostModal = useModal();

    // モーダル開閉状態をuseFeedDataと同期
    React.useEffect(() => {
        if (editModalOpen) editPostModal.open();
        else editPostModal.close();
    }, [editModalOpen]);
    React.useEffect(() => {
        if (deleteModalOpen) deletePostModal.open();
        else deletePostModal.close();
    }, [deleteModalOpen]);

    // エラー時はユーザーのフィードにリダイレクト
    React.useEffect(() => {
        if (error && userInfo?.username) {
            navigate(`/feed/${userInfo.username}`);
        }
    }, [error, userInfo, navigate]);

    // エラー時は何も表示しない
    if (error) return null;

    return (
        <BaseLayout
            user={
                userInfo
                    ? {
                          username: userInfo.username,
                          fullName: userInfo.full_name || userInfo.username,
                          avatarUrl: userInfo.avatar_image_file_path || undefined,
                      }
                    : undefined
            }
            showSwitchNav={true}
            switchNavValue={active}
            onSwitchNavChange={handleSwitchNav}
            isHeaderHidden={isHeaderHidden}
        >
            <div className="flex flex-col items-center min-h-screen bg-theme relative">
                <div className="w-full flex flex-col items-center">
                    {initialLoading ? (
                        <Loading message="フィードを読み込み中..." />
                    ) : (
                        <FeedList
                            allPosts={allPosts}
                            selfPosts={selfPosts}
                            active={active}
                            userId={undefined}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )}
                </div>
                <NewPostButton onClick={newPostModal.open} />
                <ModalNewPost isOpen={newPostModal.isOpen} onClose={newPostModal.close} onSubmit={handleNewPost} />
                <ModalEditPost
                    isOpen={editPostModal.isOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        editPostModal.close();
                    }}
                    onSubmit={handleEditSubmit}
                    initialContent={editingPost?.content || ''}
                />
                <ConfirmDialog
                    isOpen={deletePostModal.isOpen}
                    title="投稿の削除確認"
                    message="本当にこの投稿を削除しますか？この操作は取り消せません。"
                    confirmLabel="削除"
                    cancelLabel="キャンセル"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => {
                        setDeleteModalOpen(false);
                        deletePostModal.close();
                    }}
                />
            </div>
        </BaseLayout>
    );
};

export default FeedPage;
