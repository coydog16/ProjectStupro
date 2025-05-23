import React from "react";

interface NewPostButtonProps {
    onClick?: () => void;
}

const NewPostButton: React.FC<NewPostButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-2xl flex items-center justify-center text-4xl font-bold hover:scale-110 hover:shadow-blue-700/60 transition-all duration-200 focus:outline-none border-2 border-blue-900/60"
        aria-label="新規投稿"
    >
        <span className="select-none">＋</span>
    </button>
);

export default NewPostButton;
