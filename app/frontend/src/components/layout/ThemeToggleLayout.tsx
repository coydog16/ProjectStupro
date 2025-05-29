// ...existing code...
import React from 'react';
import ThemeToggle from '../ThemeToggle';

/**
 * アプリ全体の共通レイアウト
 * - 右上にThemeToggleを常時表示
 * - childrenを中央寄せでラップ
 */
const ThemeToggleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-theme text-theme relative">
            <ThemeToggle />
            <main className="min-h-screen w-full">{children}</main>
        </div>
    );
};

export default ThemeToggleLayout;
