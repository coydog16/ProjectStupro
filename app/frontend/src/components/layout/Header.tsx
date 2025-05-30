import React from 'react';
import ThemeToggle from '../common/ThemeToggle';
import UserAvatar from '../common/UserAvatar';
import SwitchNav from '../common/SwitchNav';

// Stuproで生成した仮ロゴSVG
const LOGO_SVG = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#6366F1" />
        <path d="M10 24C10 17 26 17 26 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="14" cy="15" r="2" fill="#fff" />
        <circle cx="22" cy="15" r="2" fill="#fff" />
    </svg>
);

interface HeaderProps {
    user?: {
        username: string;
        fullName?: string;
        avatarUrl?: string;
    };
    showSwitchNav?: boolean;
    switchNavValue?: 'all' | 'self';
    onSwitchNavChange?: (v: 'all' | 'self') => void;
    isHidden?: boolean; // ヘッダーのスライドアウト制御用
}

const Header: React.FC<HeaderProps> = ({ user, showSwitchNav, switchNavValue, onSwitchNavChange, isHidden }) => {
    return (
        <header
            className={[
                'w-full flex flex-col bg-theme sticky top-0 z-40 transition-transform duration-300',
                isHidden ? '-translate-y-full' : 'translate-y-0',
            ].join(' ')}
        >
            <div className="flex items-center justify-between px-4 py-2">
                {/* 左：ユーザーアイコン */}
                <div className="flex items-center min-w-[40px]">
                    <UserAvatar
                        src={user?.avatarUrl || undefined}
                        alt={user?.username || ''}
                        name={user?.fullName || user?.username || ''}
                        size={32}
                    />
                </div>
                {/* 中央：ロゴ */}
                <div className="flex-1 flex justify-center items-center">{LOGO_SVG}</div>
                {/* 右：操作系 */}
                <div className="flex items-center gap-2 min-w-[40px] justify-end">
                    {/* テーマ切り替えボタン（サイズ統一） */}
                    <div className="w-8 h-8 flex items-center justify-center">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
            {/* SwitchNav（FeedPageなどでのみ表示） */}
            {showSwitchNav && switchNavValue && onSwitchNavChange && (
                <div className="w-full border-b border-neutral-200 dark:border-accent/10 bg-theme">
                    <SwitchNav value={switchNavValue} onChange={onSwitchNavChange} />
                </div>
            )}
        </header>
    );
};

export default Header;
