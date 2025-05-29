import { FeedPost } from '../types';
import FeedMenu from './FeedMenu';

export type FeedFilterType = 'all' | 'self';

// 全投稿を返すフィルタ関数
export function filterAllFeed(posts: FeedPost[]): FeedPost[] {
    return posts;
}

// 指定ユーザーの投稿のみ返すフィルタ関数
export function filterSelfFeed(posts: FeedPost[], userId?: number): FeedPost[] {
    if (!userId) return [];
    return posts.filter((post) => post.user_id === userId);
}

interface FeedListProps {
    posts: FeedPost[];
    filterType: FeedFilterType;
    userId?: number;
    handleEdit: (post: FeedPost) => void;
    handleDelete: (post: FeedPost) => void;
}

const getMyUserId = () => {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : undefined;
};

const FeedList: React.FC<FeedListProps> = ({ posts, filterType, userId: _userId, handleEdit, handleDelete }) => {
    // ログイン中の自分のIDを常に参照
    const userId = getMyUserId();
    // 投稿リストをフィルタリング
    const filteredPosts = filterType === 'self' ? filterSelfFeed(posts, userId) : filterAllFeed(posts);

    if (filteredPosts.length === 0) {
        return (
            <p className="text-gray-500 text-center py-8">
                {filterType === 'self' ? '自分の投稿はありません' : '投稿はありません'}
            </p>
        );
    }

    return (
        <div className="w-full flex flex-col items-center" style={{ background: '#232225', color: '#e0e0e0' }}>
            {filteredPosts.map((post) => (
                <div
                    key={post.id}
                    className="relative w-full max-w-xl border-b border-gray-700/60 flex flex-row gap-6 py-7 px-4 hover:bg-gray-800/60 transition group"
                >
                    {/* すべての投稿で、filterTypeが'all'のときのみアイコン・名前・ユーザーネームを表示 */}
                    {filterType === 'all' && (
                        <div className="flex flex-col items-center min-w-[56px]">
                            <div className="w-12 h-12 rounded-[18px] flex items-center justify-center overflow-hidden shadow-md bg-gray-700">
                                {post.user?.avatar_image_id ? (
                                    <img
                                        src={`/api/images/${post.user.avatar_image_id}`}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-gray-100">
                                        {post.user?.full_name?.[0] || post.user?.username?.[0] || '?'}
                                    </span>
                                )}
                            </div>
                            <div className="mt-1 text-xs font-semibold text-gray-200 max-w-[72px] truncate text-center">
                                {post.user?.last_name || ''}{' '}
                                {post.user?.first_name || post.user?.username || '匿名ユーザー'}
                            </div>
                            <div className="text-[10px] text-gray-400 max-w-[72px] truncate text-center">
                                @{post.user?.username}
                            </div>
                        </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                        {/* 左上端に投稿日時を本文と揃えて表示 */}
                        <span className="text-gray-600 text-xs whitespace-nowrap mb-1 px-4">
                            {new Date(post.created_at).toLocaleString()}
                        </span>
                        <div className="text-gray-200 text-sm mb-3 break-words whitespace-pre-line leading-relaxed px-2 py-2 w-full">
                            {post.content}
                        </div>
                    </div>
                    {/* 自分の投稿だけFeedMenuを表示 */}
                    {String(post.user_id) === String(userId) && (
                        <div className="absolute top-2 right-2">
                            <FeedMenu onEdit={() => handleEdit(post)} onDelete={() => handleDelete(post)} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FeedList;
