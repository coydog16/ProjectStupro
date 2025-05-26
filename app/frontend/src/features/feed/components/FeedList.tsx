import React from 'react';
import { FeedPost } from '../types';
import { getDisplayName } from './utils';

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
}

const FeedList: React.FC<FeedListProps> = ({ posts, filterType, userId }) => {
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
                    className="w-full max-w-xl border-b border-gray-700/60 flex flex-row gap-6 py-7 px-4 hover:bg-gray-800/60 transition group"
                >
                    {/* アバター */}
                    <div className="flex-shrink-0">
                        {post.user?.avatar_image_id ? (
                            <img
                                src={`/api/images/${post.user.avatar_image_id}`}
                                alt="avatar"
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition"
                            />
                        ) : (
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                                style={{
                                    background: '#556a8b',
                                    color: '#fffde7',
                                }}
                            >
                                {post.user?.full_name?.[0] || post.user?.username?.[0] || '?'}
                            </div>
                        )}
                    </div>
                    {/* 本文・ユーザー情報 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-row items-start justify-between mb-3">
                            {/* 名前・ユーザー名を縦並びに */}
                            <div className="flex flex-col items-start gap-0.5">
                                <span
                                    className="font-bold text-gray-100 text-sm group-hover:text-blue-400 transition max-w-[8rem] truncate"
                                    title={getDisplayName(post.user)}
                                >
                                    {getDisplayName(post.user)}
                                </span>
                                <span
                                    className="text-gray-500 text-xs max-w-[10rem] truncate"
                                    title={post.user?.username}
                                >
                                    @{post.user?.username}
                                </span>
                            </div>
                            {/* 投稿日を右上・フルネームの高さに */}
                            <span className="text-gray-600 text-xs ml-4 mt-0.5 whitespace-nowrap self-start">
                                {new Date(post.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="text-gray-200 text-sm mt-4 mb-3 break-words whitespace-pre-line leading-relaxed">
                            {post.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedList;
