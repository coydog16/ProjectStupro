import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFeed, createPost, deletePostApi, updatePostApi } from '../../../api/feed';
import FeedList from '../components/FeedList';
import SwitchNav from '../components/SwitchNav';
import UserInfo from '../components/UserInfo';
import NewPostButton from '../components/NewPostButton';
import { ModalNewPost } from '../components/ModalNewPost';
import { ModalEditPost } from '../components/ModalEditPost';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import FeedBackground from '../components/FeedBackground';
import { PostType } from '../../../types';
import Loading from '../../../components/common/Loading';
import clsx from 'clsx';
import { useFeedSwitchNav } from '../hooks/useFeedSwitchNav';
import { useRecentTasks } from '../hooks/useRecentTasks';

/**
 * 投稿フィードページ
 * - ALL/SELF切り替え
 * - 新規投稿モーダル
 * - エラー・ローディング・空データUI
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
    const { active, pending, animating, handleSwitchNav } = useFeedSwitchNav();

    // userPostsはselfPostsのエイリアスなので、userPosts自体を削除しuserの取得もselfPostsから直接取得
    // const userPosts = useMemo(() => selfPosts, [selfPosts]);
    // const user = userPosts[0]?.user ?? null;
    const user = selfPosts[0]?.user ?? null;

    // recentTasksもselfPostsから直接取得
    const recentTasks = useRecentTasks(selfPosts, 3);

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

    // 削除APIを呼んで、成功したらsetPostsでリストから除外
    const handleDelete = (post: PostType) => {
        setDeletingPost(post);
        setDeleteModalOpen(true);
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

    useEffect(() => {
        if (error && user?.username) {
            navigate(`/feed/${user.username}`);
        }
    }, [error, user, navigate]);

    if (error) {
        // リダイレクト中は何も表示しない
        return null;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
            <FeedBackground>
                <div className="w-full flex flex-col items-center justify-end pb-0 mb-0">
                    {user && <UserInfo user={user} tasks={recentTasks} />}
                    <SwitchNav value={active} onChange={handleSwitchNav} />
                </div>
            </FeedBackground>

            <div className="w-full flex flex-col items-center">
                {initialLoading ? (
                    <Loading message="フィードを読み込み中..." />
                ) : (
                    <div className="w-full flex flex-col items-center overflow-x-hidden relative min-h-screen">
                        {/* MyPostフィード（左側に初期配置） */}
                        <div
                            className={clsx(
                                'absolute w-full flex flex-col items-center top-0 left-0 will-change-transform',
                                active === 'self' && !animating && 'translate-x-0 z-20',
                                pending === 'self' && animating && 'animate-slide-in-left z-30',
                                active === 'all' && !animating && '-translate-x-full z-10',
                                pending === 'all' && animating && 'animate-slide-out-left z-10',
                                'transition-transform duration-400'
                            )}
                        >
                            <FeedList
                                posts={selfPosts}
                                filterType={'self'}
                                userId={user?.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        </div>
                        {/* ALLフィード（右側に初期配置） */}
                        <div
                            className={clsx(
                                'absolute w-full flex flex-col items-center top-0 left-0 will-change-transform',
                                active === 'all' && !animating && 'translate-x-0 z-20',
                                pending === 'all' && animating && 'animate-slide-in-right z-30',
                                active === 'self' && !animating && 'translate-x-full z-10',
                                pending === 'self' && animating && 'animate-slide-out-right z-10',
                                'transition-transform duration-400'
                            )}
                        >
                            <FeedList
                                posts={allPosts}
                                filterType={'all'}
                                userId={user?.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        </div>
                    </div>
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
    );
};

export default FeedPage;
