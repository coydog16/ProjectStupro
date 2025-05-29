import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-theme rounded-xl p-6 w-full max-w-md shadow-xl relative">
                {/* 右上の×ボタン */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-accent text-2xl font-bold focus:outline-none"
                    aria-label="閉じる"
                    type="button"
                >
                    ×
                </button>
                {title && <h2 className="text-lg font-bold text-theme mb-4">{title}</h2>}
                {children}
                {/* キャンセルボタンは削除 */}
            </div>
        </div>
    );
};
