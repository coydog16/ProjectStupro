import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFeed, createPost, deletePostApi, updatePostApi } from '../../../api/feed';
import FeedList from '../components/FeedList';
import NewPostButton from '../components/NewPostButton';
import { ModalNewPost } from '../components/ModalNewPost';
import { ModalEditPost } from '../components/ModalEditPost';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { PostType } from '../../../types';
import Loading from '../../../components/common/Loading';
import { useFeedSwitchNav } from '../hooks/useFeedSwitchNav';
import BaseLayout from '../../../components/layout/BaseLayout';
import { useHeaderSlideOut } from '../components/FeedList';

/**
 * 投稿フィードページ
 * - ALL/SELF切り替え
 * - 新規投稿モーダル
 */
const FeedPage: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<PostType | null>(null);
    const [deletingPost, setDeletingPost] = useState<PostType | null>(null);

    // 投稿一覧取得（ALL, MyPost両方を最初に取得してキャッシュ）
    const [allPosts, setAllPosts] = useState<PostType[]>([]);
    const [selfPosts, setSelfPosts] = useState<PostType[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 初回のみ両方取得
    useEffect(() => {
        let isMounted = true;
        (async () => {
            setInitialLoading(true);
            setError(null);
            try {
                const [all, self] = await Promise.all([fetchFeed(), fetchFeed(username)]);
                if (isMounted) {
                    setAllPosts(Array.isArray(all) ? all : []);
                    setSelfPosts(Array.isArray(self) ? self : []);
                }
            } catch (e: any) {
                setError(e.message ?? '投稿の取得に失敗しました');
            } finally {
                if (isMounted) setInitialLoading(false);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [username]);

    // スライドアニメーションの状態
    const { active, handleSwitchNav } = useFeedSwitchNav();

    // user情報
    const rawUser = selfPosts[0]?.user ?? null;
    // デバッグ用ログ
    console.log('FeedPage debug', { allPosts, selfPosts, active, rawUser });
    const user = rawUser
        ? {
              username: rawUser.username,
              fullName: rawUser.full_name,
              avatarUrl: rawUser.avatar_image_file_path || undefined,
          }
        : undefined;

    // 新規投稿
    const handleNewPost = async (content: string) => {
        try {
            const res = await createPost(content);
            if (!res || !res.id) {
                setError('投稿データが不正です');
                return;
            }
            setAllPosts((prev) => [res, ...prev]);
            setSelfPosts((prev) => [res, ...prev]);
        } catch (e: any) {
            setError(e.message || '投稿に失敗しました');
        }
    };

    // 投稿編集
    const handleEdit = (post: PostType) => {
        setEditingPost(post);
        setEditModalOpen(true);
    };

    // 編集モーダルの保存時に両方のリストを更新
    const handleEditSubmit = async (content: string) => {
        if (!editingPost) return;
        try {
            const updated = await updatePostApi(editingPost.id, content);
            setAllPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, content: updated.content } : p)));
            setSelfPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, content: updated.content } : p)));
            setEditModalOpen(false);
        } catch (e: any) {
            setError(e.message || '投稿の更新に失敗しました');
        }
    };

    // 削除APIを呼んで、成功したら両方のリストから除外
    const handleDelete = (post: PostType) => {
        setDeletingPost(post);
        setDeleteModalOpen(true);
    };
    const handleDeleteConfirm = async () => {
        if (!deletingPost) return;
        try {
            await deletePostApi(deletingPost.id);
            setAllPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
            setSelfPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
            setDeleteModalOpen(false);
        } catch (e: any) {
            setError(e.message || '削除に失敗しました');
        }
    };

    // ヘッダーのスライドアウト状態を取得
    const isHeaderHidden = useHeaderSlideOut();

    // エラー時はユーザーのフィードにリダイレクト
    useEffect(() => {
        if (error && user?.username) {
            navigate(`/feed/${user.username}`);
        }
    }, [error, user, navigate]);

    // エラー時は何も表示しない
    if (error) return null;

    return (
        <BaseLayout
            user={user}
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
                            userId={rawUser?.id}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )}
                </div>
                <NewPostButton onClick={() => setModalOpen(true)} />
                <ModalNewPost isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNewPost} />
                <ModalEditPost
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                    initialContent={editingPost?.content || ''}
                />
                <ConfirmDialog
                    isOpen={deleteModalOpen}
                    title="投稿の削除確認"
                    message="本当にこの投稿を削除しますか？この操作は取り消せません。"
                    confirmLabel="削除"
                    cancelLabel="キャンセル"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteModalOpen(false)}
                />
            </div>
        </BaseLayout>
    );
};

export default FeedPage;
