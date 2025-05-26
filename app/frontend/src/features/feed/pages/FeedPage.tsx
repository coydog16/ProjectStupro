import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFeed, createPost } from '../../../api/feed';
import FeedList from '../components/FeedList';
import SwitchNav from '../components/SwitchNav';
import UserInfo from '../components/UserInfo';
import NewPostButton from '../components/NewPostButton';
import { NewPostModal } from '../components/NewPostModal';
import FeedBackground from '../components/FeedBackground';
import { FeedPost } from '../types';

/**
 * 投稿フィードページ
 * - ALL/SELF切り替え
 * - 新規投稿モーダル
 * - エラー・ローディング・空データUI
 */
const FeedPage: React.FC = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'all' | 'self'>('self');
    const [modalOpen, setModalOpen] = useState(false);

    // 指定ユーザーの投稿のみ抽出
    const userPosts = useMemo(() => posts.filter((post) => post.user?.username === username), [posts, username]);
    // 表示ユーザー情報
    const user = userPosts[0]?.user ?? null;

    // 表示する投稿リスト
    const displayPosts = view === 'all' ? posts : userPosts;

    // 直近3件のタスク（期限降順）
    const recentTasks = useMemo(
        () =>
            userPosts
                .filter((post) => post.is_task)
                .sort((a, b) => {
                    if (!a.task_due_date || !b.task_due_date) return 0;
                    return new Date(b.task_due_date).getTime() - new Date(a.task_due_date).getTime();
                })
                .slice(0, 3),
        [userPosts]
    );

    // 投稿一覧取得
    const loadFeed = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = view === 'all' ? await fetchFeed() : await fetchFeed(username);
            setPosts(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setError(e.message ?? '投稿の取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }, [view, username]);

    useEffect(() => {
        loadFeed();
    }, [loadFeed]);

    // 新規投稿
    const handleNewPost = async (content: string) => {
        try {
            const res = await createPost(content);
            if (!res || !res.id) {
                setError('投稿データが不正です');
                return;
            }
            setPosts((prev) => [res, ...prev]);
        } catch (e: any) {
            setError(e.message || '投稿に失敗しました');
        }
    };

    // エラー表示
    if (error) {
        return (
            <div className="flex flex-col items-center min-h-screen justify-center text-red-500">
                <p>エラーが発生しました: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
            <FeedBackground>
                <div className="w-full flex flex-col items-center justify-end pb-0 mb-0">
                    {user && <UserInfo user={user} tasks={recentTasks} />}
                    <SwitchNav value={view} onChange={setView} />
                </div>
            </FeedBackground>

            <div className="w-full flex flex-col items-center">
                {/* 読み込み中の表示は削除 */}
                {!loading && displayPosts.length === 0 && <p className="text-gray-500">投稿がありません</p>}
                <FeedList posts={Array.isArray(displayPosts) ? displayPosts : []} filterType={view} userId={user?.id} />
            </div>

            <NewPostButton onClick={() => setModalOpen(true)} />
            <NewPostModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNewPost} />
        </div>
    );
};

export default FeedPage;
