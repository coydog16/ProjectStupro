import { useEffect, useRef, useState } from 'react';

/**
 * ヘッダーのスライド制御用フック
 * スクロール方向に応じてヘッダーをスライドイン/アウトさせる
 * - 下方向スクロールで隠す
 * - 上方向スクロールで表示
 */
export function useHeaderSlideOut(): boolean {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(window.scrollY);

    useEffect(() => {
        lastScroll.current = window.scrollY; // 初期値リセット
        const handleScroll = () => {
            const y = window.scrollY;
            if (y > lastScroll.current && y > 40) {
                setHidden(true); // 下方向→隠す
            } else if (y < lastScroll.current) {
                setHidden(false); // 上方向→必ず表示
            }
            lastScroll.current = y;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return hidden;
}
