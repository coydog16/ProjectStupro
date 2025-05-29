// 投稿データの型定義
export interface FeedUser {
    id: number;
    username: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    avatar_image_id?: number | null;
    avatar_image_file_path?: string | null;
}

export interface FeedPost {
    id: number;
    user_id: number;
    user?: FeedUser;
    content: string;
    is_pinned: boolean;
    pin_date?: string | null;
    is_task: boolean;
    task_due_date?: string | null;
    task_completed: boolean;
    task_completed_at?: string | null;
    is_deleted: boolean;
    post_type: string;
    created_at: string;
    updated_at: string;
}
