import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * テーマに応じてアクセントカラーが自動で適用される共通ボタン
 * 例: <Button>保存</Button>
 */
export const Button = ({
    className = '',
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => (
    <button
        type="button"
        className={`bg-accent text-accent-on px-4 py-2 rounded font-bold transition-colors duration-200 shadow-sm hover:bg-accent-hover disabled:opacity-60 disabled:pointer-events-none ${className}`.trim()}
        {...props}
    >
        {children}
    </button>
);
