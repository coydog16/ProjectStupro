import { PostType } from '../../../types';
import FeedMenu from './FeedMenu';
import UserAvatar from '../../../components/common/UserAvatar';
import { useEffect, useRef, useState } from 'react';

export type FeedFilterType = 'all' | 'self';

// 全投稿を返すフィルタ関数
export function filterAllFeed(posts: PostType[]): PostType[] {
    return posts;
}

// 指定ユーザーの投稿のみ返すフィルタ関数
export function filterSelfFeed(posts: PostType[], userId?: number): PostType[] {
    if (!userId) return [];
    return posts.filter((post) => post.user_id === userId);
}

interface FeedListProps {
    posts: PostType[];
    filterType: FeedFilterType;
    userId?: number;
    handleEdit: (post: PostType) => void;
    handleDelete: (post: PostType) => void;
    active: 'all' | 'self';
}

const getMyUserId = () => {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : undefined;
};

const FeedList: React.FC<FeedListProps> = ({
    posts,
    filterType,
    userId: _userId,
    handleEdit,
    handleDelete,
    active,
}) => {
    const userId = getMyUserId();
    // 受け取ったpostsをそのまま表示
    return (
        <div className="relative w-full max-w-xl mx-auto overflow-x-hidden">
            {posts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    {filterType === 'self' ? '自分の投稿はありません' : '投稿はありません'}
                </p>
            ) : (
                posts.map((post, idx) => (
                    <div
                        key={post.id}
                        className={[
                            'relative w-full flex flex-row gap-6 py-7 px-4 hover:bg-accent/10 transition group',
                            idx !== posts.length - 1 ? 'border-b border-neutral-200 dark:border-accent/10' : '',
                        ].join(' ')}
                    >
                        <div className="flex flex-col items-center min-w-[40px]">
                            {(() => {
                                const avatarUrl = post.user?.avatar_image_file_path || undefined;
                                return (
                                    <UserAvatar
                                        src={avatarUrl}
                                        name={post.user?.full_name || post.user?.username}
                                        size={32}
                                        className="shadow"
                                    />
                                );
                            })()}
                            <div className="mt-1 text-xs font-semibold text-theme max-w-[72px] truncate text-center">
                                {post.user?.last_name || ''}{' '}
                                {post.user?.first_name || post.user?.username || '匿名ユーザー'}
                            </div>
                            <div className="text-[10px] text-accent max-w-[72px] truncate text-center">
                                @{post.user?.username}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col items-start">
                            <span className="text-accent/70 text-xs whitespace-nowrap mb-1 px-4">
                                {new Date(post.created_at).toLocaleString()}
                            </span>
                            <div className="text-theme text-sm mb-3 break-words whitespace-pre-line leading-relaxed px-2 py-2 w-full">
                                {post.content}
                            </div>
                        </div>
                        {String(post.user_id) === String(userId) && (
                            <div className="absolute top-2 right-2">
                                <FeedMenu onEdit={() => handleEdit(post)} onDelete={() => handleDelete(post)} />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

// --- ヘッダーのスライド制御用フック ---
export function useHeaderSlideOut() {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(window.scrollY);

    useEffect(() => {
        lastScroll.current = window.scrollY; // 初期値リセット
        const handleScroll = () => {
            const y = window.scrollY;
            if (y > lastScroll.current && y > 40) {
                setHidden(true); // 下方向→隠す
            } else if (y < lastScroll.current) {
                setHidden(false); // 上方向→必ず表示
            }
            lastScroll.current = y;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return hidden;
}

export default FeedList;
