import { useState } from 'react';

interface NewPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => Promise<void>;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
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

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#232225] rounded-xl p-6 w-full max-w-md shadow-xl">
                <textarea
                    className="w-full h-32 p-2 rounded bg-gray-800 text-gray-100"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="いま何してる？"
                />
                {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-1 rounded bg-gray-600 text-gray-100">
                        キャンセル
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? '投稿中...' : '投稿する'}
                    </button>
                </div>
            </div>
        </div>
    );
};
