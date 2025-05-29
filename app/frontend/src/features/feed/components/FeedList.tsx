import { PostType } from '../../../types';
import FeedMenu from './FeedMenu';
import UserAvatar from '../../../components/common/UserAvatar';

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
        <div className="w-full flex flex-col items-center bg-theme text-theme">
            {filteredPosts.map((post) => (
                <div
                    key={post.id}
                    className="relative w-full max-w-xl flex flex-row gap-6 py-7 px-4 hover:bg-accent/10 transition group"
                >
                    {/* すべての投稿で、filterTypeが'all'のときのみアイコン・名前・ユーザーネームを表示 */}
                    {filterType === 'all' && (
                        <div className="flex flex-col items-center min-w-[56px]">
                            <UserAvatar
                                src={post.user?.avatar_image_file_path}
                                name={post.user?.full_name || post.user?.username}
                                size={48}
                                className="shadow-md border border-accent/30"
                            />
                            <div className="mt-1 text-xs font-semibold text-theme max-w-[72px] truncate text-center">
                                {post.user?.last_name || ''}{' '}
                                {post.user?.first_name || post.user?.username || '匿名ユーザー'}
                            </div>
                            <div className="text-[10px] text-accent max-w-[72px] truncate text-center">
                                @{post.user?.username}
                            </div>
                        </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                        {/* 左上端に投稿日時を本文と揃えて表示 */}
                        <span className="text-accent/70 text-xs whitespace-nowrap mb-1 px-4">
                            {new Date(post.created_at).toLocaleString()}
                        </span>
                        <div className="text-theme text-sm mb-3 break-words whitespace-pre-line leading-relaxed px-2 py-2 w-full">
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
