import { PostType } from '../../../types';
import FeedListItem from './FeedListItem';

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
    allPosts: PostType[];
    selfPosts: PostType[];
    active: 'all' | 'self';
    userId?: number;
    handleEdit: (post: PostType) => void;
    handleDelete: (post: PostType) => void;
}

const getMyUserId = () => {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : undefined;
};

const FeedList: React.FC<FeedListProps> = ({
    allPosts,
    selfPosts,
    active,
    userId: _userId,
    handleEdit,
    handleDelete,
}) => {
    // ローカルストレージからユーザーIDを取得
    const userId = getMyUserId();

    // デバッグ用ログ（開発時のみ有効化すると良い）
    // console.log('FeedList debug', { allPosts, selfPosts, active, userId });

    // 横並びスライドでALL/SELFリストを切り替え
    return (
        <div className="relative w-full max-w-xl mx-auto overflow-x-hidden">
            <div
                className="flex transition-transform duration-300"
                style={{
                    transform: active === 'all' ? 'translateX(0%)' : 'translateX(-100%)',
                }}
            >
                {/* ALLリスト */}
                <div className="w-full shrink-0">
                    {allPosts.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">投稿はありません</p>
                    ) : (
                        allPosts.map((post, idx) => (
                            <FeedListItem
                                key={post.id}
                                post={post}
                                isLast={idx === allPosts.length - 1}
                                userId={userId}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
                {/* SELFリスト */}
                <div className="w-full shrink-0">
                    {selfPosts.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">自分の投稿はありません</p>
                    ) : (
                        selfPosts.map((post, idx) => (
                            <FeedListItem
                                key={post.id}
                                post={post}
                                isLast={idx === selfPosts.length - 1}
                                userId={userId}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedList;
