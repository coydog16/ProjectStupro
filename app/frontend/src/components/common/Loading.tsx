/**
 * フィード全体やページ全体のローディング表示用コンポーネント。
 * Tailwind CSS v4の最新機能を活用。
 */
const Loading: React.FC<{ message?: string }> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-48 w-full py-8 animate-fade-in bg-base-100/80">
            <span className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
            <span className="mt-4 text-base-content/80 text-lg font-medium">{message || '読み込み中...'}</span>
        </div>
    );
};

export default Loading;
