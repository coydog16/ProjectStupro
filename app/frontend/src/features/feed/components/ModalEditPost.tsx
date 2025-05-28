import { useState, useEffect } from 'react';
import { Modal } from '../../../components/common/Modal';
import { Button } from '../../../components/common/Button';

interface ModalEditPostProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => Promise<void>;
    initialContent: string;
}

export const ModalEditPost: React.FC<ModalEditPostProps> = ({ isOpen, onClose, onSubmit, initialContent }) => {
    const [content, setContent] = useState(initialContent);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setContent(initialContent);
        setError('');
    }, [initialContent, isOpen]);

    const handleSubmit = async () => {
        if (!content.trim()) {
            setError('投稿内容を入力してください');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await onSubmit(content);
            onClose();
        } catch (e) {
            setError('投稿の更新に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="投稿を編集">
            <textarea
                className="w-full h-32 p-2 rounded bg-gray-800 text-gray-100"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="投稿内容を編集..."
            />
            {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
                <Button onClick={handleSubmit} className="bg-blue-600 text-white" disabled={loading}>
                    {loading ? '更新中...' : '更新する'}
                </Button>
            </div>
        </Modal>
    );
};
