import { ReactNode, useEffect, useRef, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal: React.FC<Omit<ModalProps, 'onClose' | 'title'> & { isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    children,
}) => {
    const [show, setShow] = useState(isOpen);
    const [animating, setAnimating] = useState<'in' | 'out' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // isOpenがtrueになったら表示＋アニメーションin
    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setAnimating('in');
        } else if (show) {
            // isOpenがfalseになったらアニメーションout
            setAnimating('out');
        }
    }, [isOpen]);

    // アニメーション終了時の処理
    const handleAnimationEnd = () => {
        if (animating === 'out') {
            setShow(false);
            setAnimating(null);
        } else if (animating === 'in') {
            setAnimating(null);
        }
    };

    if (!show) return null;
    return (
        <div className="fixed inset-0 flex items-end justify-center z-50">
            <div
                ref={containerRef}
                className={`bg-[var(--color-bg)] w-screen h-screen max-w-none rounded-none p-2 shadow-xl relative flex flex-col animate-${
                    animating === 'out' ? 'slide-down' : 'slide-up'
                }`}
                style={{
                    minHeight: '100dvh',
                    maxHeight: '100dvh',
                    width: '100dvw',
                    height: '100dvh',
                }}
                onAnimationEnd={handleAnimationEnd}
            >
                {/* 子要素を上詰めに */}
                <div className="flex-1 flex flex-col justify-start w-full">{children}</div>
            </div>
        </div>
    );
};
