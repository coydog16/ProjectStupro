interface NewPostButtonProps {
    onClick?: () => void;
}

const NewPostButton: React.FC<NewPostButtonProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-2xl hover:scale-110 transition-all duration-200 focus:outline-none bg-accent text-accent-on hover:bg-accent-hover"
        aria-label="新規投稿"
    >
        {/* プラスアイコン */}
        <span className="select-none">＋</span>
    </button>
);

export default NewPostButton;
