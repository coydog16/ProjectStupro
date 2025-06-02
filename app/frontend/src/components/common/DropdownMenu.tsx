import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
    buttonContent: ReactNode; // トリガーとなるボタンやアイコン
    children: ReactNode; // メニューの中身
    align?: 'left' | 'right'; // メニューの表示位置
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonContent, children, align = 'right' }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 外側クリックで閉じる
    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                type="button"
                className="focus:outline-none flex items-center justify-start w-8 h-8 p-0 text-accent/70 hover:text-accent"
                style={{ minWidth: '1.5rem', minHeight: '1.5rem' }}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <span className="w-4 h-4 flex items-center justify-center">{buttonContent}</span>
            </button>
            {open && (
                <div
                    className={`absolute mt-2 min-w-[8rem] rounded-lg bg-[var(--color-bg)] text-theme z-50 shadow-dropdown-menu ${
                        align === 'right' ? 'right-0' : 'left-0'
                    } animate-fade-in`}
                    style={{ border: 'none' }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
