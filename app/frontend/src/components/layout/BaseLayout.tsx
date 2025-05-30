import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * アプリ全体の共通レイアウト
 * - childrenを中央寄せでラップ
 */
interface BaseLayoutProps {
    children: React.ReactNode;
    user?: {
        username: string;
        fullName?: string;
        avatarUrl?: string;
    };
    showSwitchNav?: boolean;
    switchNavValue?: 'all' | 'self';
    onSwitchNavChange?: (v: 'all' | 'self') => void;
    isHeaderHidden?: boolean; // 追加
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    user,
    showSwitchNav,
    switchNavValue,
    onSwitchNavChange,
    isHeaderHidden,
}) => {
    return (
        <div className="min-h-screen bg-theme text-theme flex flex-col">
            <Header
                user={user}
                showSwitchNav={showSwitchNav}
                switchNavValue={switchNavValue}
                onSwitchNavChange={onSwitchNavChange}
                isHidden={isHeaderHidden}
            />
            <main className="flex-1 min-h-screen w-full">{children}</main>
            <Footer />
        </div>
    );
};

export default BaseLayout;
