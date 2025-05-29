import React from 'react';

interface UserAvatarProps {
    src?: string | null;
    alt?: string;
    size?: number; // px
    name?: string;
    className?: string;
}

/**
 * ユーザーアイコン（アバター画像 or イニシャル）
 * - 角丸はやや弱め（rounded-xl）
 * - サイズ・枠線・背景色・イニシャル色はテーマ変数で統一
 */
const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = 48, name, className = '' }) => {
    const initials = name?.[0] || '?';
    return (
        <div
            className={`rounded-xl bg-accent/10 flex items-center justify-center overflow-hidden shadow ${className}`}
            style={{ width: size, height: size }}
        >
            {src ? (
                <img src={src} alt={alt || initials} className="w-full h-full object-cover rounded-xl" />
            ) : (
                <span className="text-accent font-bold text-xl select-none">{initials}</span>
            )}
        </div>
    );
};

export default UserAvatar;
