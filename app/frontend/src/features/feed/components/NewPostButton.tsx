import React from "react";

interface NewPostButtonProps {
    onClick?: () => void;
}

const NewPostButton: React.FC<NewPostButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl hover:scale-110 transition-all duration-200 focus:outline-none"
        style={{ background: "#556a8b", color: "#fffde7" }}
        aria-label="新規投稿"
    >
        {/* プラスアイコン */}
        <span className="select-none">＋</span>
    </button>
);

export default NewPostButton;
