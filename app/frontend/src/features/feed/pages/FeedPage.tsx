import React, { useEffect, useState } from "react";
import { fetchFeed } from "../../../api/feed";
import FeedList from "../components/FeedList";
import SwitchNav from "../components/SwitchNav";
import UserInfo from "../components/UserInfo";
import NewPostButton from "../components/NewPostButton";
import { FeedPost } from "../types";

const FeedPage: React.FC = () => {
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<"all" | "self">("self");

    // 自分の投稿が1件でもあれば、そのuser_idを使う（暫定）
    const selfPost = posts.find((p) => p.user_id && p.user);
    const user = selfPost?.user || null;
    // 自分のタスクのみ抽出し、期限が新しい順で3件
    const tasks = posts
        .filter((p) => p.is_task && p.user_id === user?.id)
        .sort((a, b) =>
            b.task_due_date && a.task_due_date
                ? new Date(b.task_due_date).getTime() -
                  new Date(a.task_due_date).getTime()
                : 0
        )
        .slice(0, 3);

    useEffect(() => {
        fetchFeed()
            .then((data) => setPosts(data as FeedPost[]))
            .catch((e: any) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
            {/* ユーザー情報＆タスク（画面上部） */}
            <div className="w-full flex flex-col items-center">
                {user && <UserInfo user={user} tasks={tasks} />}
            </div>
            {/* タイムライン切り替えナビ */}
            <SwitchNav value={view} onChange={setView} />
            <div className="w-full flex flex-col items-center">
                {loading && <p className="text-gray-400">読み込み中…</p>}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && posts.length === 0 && (
                    <p className="text-gray-500">投稿がありません</p>
                )}
                <FeedList
                    posts={posts}
                    filterType={view === "all" ? "all" : "self"}
                    userId={user?.id}
                />
            </div>
            <NewPostButton
                onClick={() => alert("新規投稿ボタンが押されました！")}
            />
        </div>
    );
};

export default FeedPage;
