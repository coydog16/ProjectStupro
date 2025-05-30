import { useState, useEffect, useCallback } from 'react';
import { fetchFeed, createPost, deletePostApi, updatePostApi } from '../../../api/feed';
import { PostType } from '../../../types';

/**
 * フィードデータ取得・CRUD操作・ローディング・エラー管理をまとめたカスタムフック
 */
export function useFeedData(username?: string) {
    const [allPosts, setAllPosts] = useState<PostType[]>([]);
    const [selfPosts, setSelfPosts] = useState<PostType[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 編集・削除モーダル管理
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<PostType | null>(null);
    const [deletingPost, setDeletingPost] = useState<PostType | null>(null);

    // 投稿一覧取得（ALL, SELF）
    useEffect(() => {
        let isMounted = true;
        (async () => {
            setInitialLoading(true);
            setError(null);
            try {
                const [all, self] = await Promise.all([
                    fetchFeed(),
                    fetchFeed(username),
                ]);
                if (isMounted) {
                    setAllPosts(Array.isArray(all) ? all : []);
                    setSelfPosts(Array.isArray(self) ? self : []);
                }
            } catch (e: any) {
                setError(e.message ?? '投稿の取得に失敗しました');
            } finally {
                if (isMounted) setInitialLoading(false);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [username]);

    // 新規投稿
    const handleNewPost = useCallback(async (content: string) => {
        try {
            const res = await createPost(content);
            if (!res || !res.id) {
                setError('投稿データが不正です');
                return;
            }
            setAllPosts((prev) => [res, ...prev]);
            setSelfPosts((prev) => [res, ...prev]);
        } catch (e: any) {
            setError(e.message || '投稿に失敗しました');
        }
    }, []);

    // 投稿編集
    const handleEdit = useCallback((post: PostType) => {
        setEditingPost(post);
        setEditModalOpen(true);
    }, []);

    const handleEditSubmit = useCallback(async (content: string) => {
        if (!editingPost) return;
        try {
            const updated = await updatePostApi(editingPost.id, content);
            setAllPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, content: updated.content } : p)));
            setSelfPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, content: updated.content } : p)));
            setEditModalOpen(false);
        } catch (e: any) {
            setError(e.message || '投稿の更新に失敗しました');
        }
    }, [editingPost]);

    // 投稿削除
    const handleDelete = useCallback((post: PostType) => {
        setDeletingPost(post);
        setDeleteModalOpen(true);
    }, []);

    const handleDeleteConfirm = useCallback(async () => {
        if (!deletingPost) return;
        try {
            await deletePostApi(deletingPost.id);
            setAllPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
            setSelfPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
            setDeleteModalOpen(false);
        } catch (e: any) {
            setError(e.message || '削除に失敗しました');
        }
    }, [deletingPost]);

    // user情報（selfPostsの先頭から取得）
    const rawUser = selfPosts[0]?.user ?? null;
    const user = rawUser
        ? {
              username: rawUser.username,
              fullName: rawUser.full_name,
              avatarUrl: rawUser.avatar_image_file_path || undefined,
          }
        : undefined;

    return {
        allPosts,
        selfPosts,
        initialLoading,
        error,
        user,
        // モーダル・編集/削除状態
        editModalOpen,
        setEditModalOpen,
        editingPost,
        setEditingPost,
        deleteModalOpen,
        setDeleteModalOpen,
        deletingPost,
        setDeletingPost,
        // CRUD操作
        handleNewPost,
        handleEdit,
        handleEditSubmit,
        handleDelete,
        handleDeleteConfirm,
    };
}
