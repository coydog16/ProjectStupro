import React from "react";

const FeedPage: React.FC = () => {
    // 投稿データのstateやAPI呼び出しはここで
    // 例: const [posts, setPosts] = useState<PostType[]>([]);

    // useEffectでAPIから投稿一覧を取得する処理を書く

    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            {/* 投稿リストをmapで表示 */}
            {/* posts.map(post => <PostCard key={post.id} post={post} />) */}
            <div>
                {/* ここに投稿カードやローディング・エラー表示など */}
                <p>ここに投稿が並びます</p>
            </div>
        </div>
    );
};
