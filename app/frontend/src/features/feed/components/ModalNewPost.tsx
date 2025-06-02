import { useState } from 'react';
import { Modal } from '../../../components/common/Modal';
import { Button } from '../../../components/common/Button';

interface ModalCreatePostProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => Promise<void>;
}

export const ModalNewPost: React.FC<ModalCreatePostProps> = ({ isOpen, onClose, onSubmit }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!content.trim()) {
            setError('投稿内容を入力してください');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await onSubmit(content);
            setContent('');
            onClose();
        } catch (e) {
            setError('投稿に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center justify-between w-full mb-4">
                {/* 左上：キャンセル */}
                <Button
                    onClick={onClose}
                    className="text-accent text-lg font-bold px-2 py-1 bg-transparent shadow-none border-none hover:bg-accent/10"
                    aria-label="キャンセル"
                    type="button"
                >
                    キャンセル
                </Button>
                {/* 右上：NOTE投稿 */}
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="text-accent text-lg font-bold px-2 py-1 bg-transparent shadow-none border-none hover:bg-accent/10 disabled:opacity-50"
                    type="button"
                >
                    NOTE
                </Button>
            </div>
            <textarea
                className="w-full h-40 md:h-60 flex-1 p-4 bg-theme text-theme text-lg resize-none outline-none border-none rounded-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you think now..."
                style={{ minHeight: '40vh', maxHeight: '60vh' }}
            />
            {error && <div className="text-error text-xs mt-2">{error}</div>}
        </Modal>
    );
};
