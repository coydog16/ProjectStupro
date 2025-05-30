import { useState, useCallback } from 'react';

/**
 * 任意のモーダル開閉状態を一元管理するカスタムフック
 * - isOpen: モーダルの開閉状態
 * - open: モーダルを開く関数
 * - close: モーダルを閉じる関数
 * - toggle: モーダルの開閉をトグルする関数
 */
export function useModal(initial: boolean = false) {
    const [isOpen, setIsOpen] = useState(initial);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((v) => !v), []);
    return { isOpen, open, close, toggle };
}
