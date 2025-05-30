import React from 'react';
import { PostType } from '../../../types';
import FeedMenu from './FeedMenu';
import UserAvatar from '../../../components/common/UserAvatar';

interface FeedListItemProps {
    post: PostType;
    isLast: boolean;
    userId?: number;
    handleEdit: (post: PostType) => void;
    handleDelete: (post: PostType) => void;
}

const FeedListItem: React.FC<FeedListItemProps> = ({ post, isLast, userId, handleEdit, handleDelete }) => {
    return (
        <div
            className={[
                'relative w-full flex flex-row gap-6 py-7 px-4 hover:bg-accent/10 transition group',
                !isLast ? 'border-b border-neutral-200 dark:border-accent/10' : '',
            ].join(' ')}
        >
            <div className="flex flex-col items-center min-w-[40px]">
                <UserAvatar
                    src={post.user?.avatar_image_file_path || undefined}
                    name={post.user?.full_name || post.user?.username}
                    size={32}
                    className="shadow"
                />
                <div className="mt-1 text-xs font-semibold text-theme max-w-[72px] truncate text-center">
                    {post.user?.last_name || ''} {post.user?.first_name || post.user?.username || '匿名ユーザー'}
                </div>
                <div className="text-[10px] text-accent max-w-[72px] truncate text-center">@{post.user?.username}</div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-start">
                <span className="text-accent/70 text-xs whitespace-nowrap mb-1 px-4">
                    {new Date(post.created_at).toLocaleString()}
                </span>
                <div className="text-theme text-sm mb-3 break-words whitespace-pre-line leading-relaxed px-2 py-2 w-full">
                    {post.content}
                </div>
            </div>
            {String(post.user_id) === String(userId) && (
                <div className="absolute top-2 right-2">
                    <FeedMenu onEdit={() => handleEdit(post)} onDelete={() => handleDelete(post)} />
                </div>
            )}
        </div>
    );
};

export default FeedListItem;
