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
                className="focus:outline-none"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                {buttonContent}
            </button>
            {open && (
                <div
                    className={`absolute mt-2 min-w-[8rem] rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/10 z-50 ${
                        align === 'right' ? 'right-0' : 'left-0'
                    } animate-fade-in`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
