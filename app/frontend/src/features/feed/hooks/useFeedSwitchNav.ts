import { useState } from 'react';

/**
 * フィードのALL/SELF切り替えアニメーション用カスタムフック
 */
export function useFeedSwitchNav(initial: 'all' | 'self' = 'self') {
    const [active, setActive] = useState<'all' | 'self'>(initial);
    const [pending, setPending] = useState<'all' | 'self' | null>(null);
    const [animating, setAnimating] = useState(false);

    const handleSwitchNav = (next: 'all' | 'self') => {
        if (active === next || animating) return;
        setActive(next); // 先に切り替え
        setPending(next);
        setAnimating(true);
        setTimeout(() => {
            setPending(null);
            setAnimating(false);
        }, 400); // アニメーション時間
    };

    return { active, pending, animating, handleSwitchNav };
}
