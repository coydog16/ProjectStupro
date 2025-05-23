import React from "react";
import { FeedPost } from "../types";
import { getDisplayName } from "./utils";

export type FeedFilterType = "all" | "self";

export function filterAllFeed(posts: FeedPost[]): FeedPost[] {
    return posts;
}

export function filterSelfFeed(posts: FeedPost[], userId?: number): FeedPost[] {
    if (!userId) return [];
    return posts.filter((p) => p.user_id === userId);
}

interface FeedListProps {
    posts: FeedPost[];
    filterType: FeedFilterType;
    userId?: number;
}

const FeedList: React.FC<FeedListProps> = ({ posts, filterType, userId }) => {
    const filtered =
        filterType === "self"
            ? filterSelfFeed(posts, userId)
            : filterAllFeed(posts);
    if (filtered.length === 0) {
        return (
            <p className="text-gray-500 text-center py-8">
                {filterType === "self"
                    ? "自分の投稿はありません"
                    : "投稿はありません"}
            </p>
        );
    }
    return (
        <div className="w-full flex flex-col items-center">
            {filtered.map((post) => (
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
                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-400 border-2 border-gray-700 group-hover:border-blue-500 transition">
                                {post.user?.full_name?.[0] ||
                                    post.user?.username?.[0] ||
                                    "?"}
                            </div>
                        )}
                    </div>
                    {/* 本文・ユーザー情報 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-row items-center gap-3 mb-1">
                            <span className="font-bold text-gray-100 text-sm group-hover:text-blue-400 transition">
                                {getDisplayName(post.user)}
                            </span>
                            <span className="text-gray-500 text-xs">
                                @{post.user?.username}
                            </span>
                            <span className="text-gray-600 text-xs ml-auto">
                                {new Date(post.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="text-gray-200 text-sm mt-2 mb-3 break-words whitespace-pre-line leading-relaxed">
                            {post.content}
                        </div>
                        <div className="flex flex-row gap-3 mt-2">
                            {/* タスクの場合のみpost_typeをTASKバッジで表示、それ以外はpost_typeバッジのみ */}
                            {post.is_task ? (
                                <span className="px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-100 text-xs font-mono border border-gray-600/40">
                                    TASK
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-300 text-xs font-mono border border-gray-600/40">
                                    {post.post_type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedList;
