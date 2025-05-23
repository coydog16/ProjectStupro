import React, { useEffect, useState } from "react";
import { fetchFeed } from "../../../api/feed";

const PostCard = ({ post }: { post: any }) => (
    <div className="rounded bg-white/90 shadow p-4 mb-4 w-full max-w-xl border border-gray-200">
        <div className="font-bold text-lg mb-1">
            {post.user?.full_name || post.user?.username || "匿名"}
        </div>
        <div className="text-gray-700 mb-2">{post.content}</div>
        <div className="text-xs text-gray-400 flex gap-2">
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {post.post_type}
            </span>
        </div>
    </div>
);

const FeedPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFeed()
            .then(setPosts)
            .catch((e: any) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            <div className="w-full flex flex-col items-center">
                {loading && <p className="text-gray-400">読み込み中…</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && posts.length === 0 && (
                    <p className="text-gray-400">投稿がありません</p>
                )}
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default FeedPage;
