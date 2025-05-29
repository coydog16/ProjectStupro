import React, { useCallback } from 'react';

/**
 * テーマ切り替え用トグルボタン（ダーク/ライト）
 * - クリックで[data-theme]属性を切り替え
 * - アイコンはシンプルな太陽/月
 */
const ThemeToggle: React.FC = () => {
    // 現在のテーマを取得
    const getCurrentTheme = () => {
        if (typeof document === 'undefined') return 'light';
        return document.documentElement.getAttribute('data-theme') || 'light';
    };
    const setTheme = (theme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    const toggleTheme = useCallback(() => {
        const current = getCurrentTheme();
        setTheme(current === 'dark' ? 'light' : 'dark');
    }, []);

    // 初期化時にlocalStorageのテーマを反映
    React.useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            setTheme(saved);
        }
    }, []);

    const isDark = getCurrentTheme() === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            className="p-2 rounded-full bg-theme border border-accent/30 hover:bg-accent/10 transition text-accent text-xl shadow fixed top-4 right-6 z-50"
        >
            {isDark ? (
                // 月アイコン
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
                </svg>
            ) : (
                // 太陽アイコン
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path
                        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
