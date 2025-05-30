import React, { useCallback, useEffect, useState } from 'react';

/**
 * テーマ切り替え用トグルボタン（ダーク/ライト）
 * - クリックで[data-theme]属性を切り替え
 * - アイコンはシンプルな太陽/月
 */
const ThemeToggle: React.FC = () => {
    // 現在のテーマを取得
    const getCurrentTheme = useCallback((): 'light' | 'dark' => {
        if (typeof document === 'undefined') return 'light';
        return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    }, []);

    // テーマをセット
    const setTheme = useCallback((theme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, []);

    // テーマ状態
    const [isDark, setIsDark] = useState(getCurrentTheme() === 'dark');

    // テーマ切り替え
    const handleToggleTheme = useCallback(() => {
        const nextTheme: 'light' | 'dark' = isDark ? 'light' : 'dark';
        setTheme(nextTheme);
        setIsDark(nextTheme === 'dark');
    }, [isDark, setTheme]);

    // 初期化・ストレージ/他タブ同期
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            setTheme(saved);
            setIsDark(saved === 'dark');
        }
        const handleStorage = () => {
            setIsDark(getCurrentTheme() === 'dark');
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [getCurrentTheme, setTheme]);

    return (
        <button
            onClick={handleToggleTheme}
            aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            className="w-8 h-8 flex items-center justify-center p-1 rounded-full bg-theme border border-accent/30 hover:bg-accent/10 transition text-accent text-xl shadow"
        >
            {isDark ? (
                // 月アイコン
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <path d="M25 14.92A11 11 0 1113.21 3a9 9 0 1011.79 11.92z" fill="currentColor" />
                </svg>
            ) : (
                // 太陽アイコン
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="6.5" fill="currentColor" />
                    <path
                        d="M14 2v3M14 23v3M5.64 5.64l2.12 2.12M20.24 20.24l2.12 2.12M2 14h3M23 14h3M5.64 22.36l2.12-2.12M20.24 7.76l2.12-2.12"
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
