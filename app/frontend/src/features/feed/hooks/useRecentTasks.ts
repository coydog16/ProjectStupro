import { useMemo } from 'react';
import { PostType } from '../../../types';

/**
 * 投稿リストから直近のタスクのみを抽出するカスタムフック
 * @param posts 投稿リスト
 * @param limit 取得する件数（デフォルト3件）
 */
export function useRecentTasks(posts: PostType[], limit = 3) {
    return useMemo(
        () =>
            posts
                .filter((post) => post.is_task)
                .sort((a, b) => {
                    if (!a.task_due_date || !b.task_due_date) return 0;
                    return new Date(b.task_due_date).getTime() - new Date(a.task_due_date).getTime();
                })
                .slice(0, limit),
        [posts, limit]
    );
}
