import { useState } from "react";
import { Modal } from "../../../components/common/Modal";

interface ModalCreatePostProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => Promise<void>;
}

export const ModalNewPost: React.FC<ModalCreatePostProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!content.trim()) {
            setError("投稿内容を入力してください");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await onSubmit(content);
            setContent("");
            onClose();
        } catch (e) {
            setError("投稿に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="新規投稿">
            <textarea
                className="w-full h-32 p-2 rounded bg-gray-800 text-gray-100"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="いま何してる？"
            />
            {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "投稿中..." : "投稿する"}
                </button>
            </div>
        </Modal>
    );
};
