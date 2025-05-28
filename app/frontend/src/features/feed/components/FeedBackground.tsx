interface FeedBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

const FeedBackground: React.FC<FeedBackgroundProps> = ({ children, className = '' }) => {
    return (
        <div className={`relative w-full aspect-auto ${className}`}>
            {/* 背景画像レイヤー（lightForest） */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <div
                    className="w-full h-full bg-[url('/img/lightForest.jpg')] bg-cover bg-center brightness-110"
                    style={{ minWidth: '100%', minHeight: '100%' }}
                />
                {/* 四隅グラデーション（中心は透明） */}
                <div className="absolute top-0 left-0 w-[10vw] h-[10vw] max-w-[80px] max-h-[80px] bg-gradient-to-br from-gray-900/40 to-transparent pointer-events-none rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-[10vw] h-[10vw] max-w-[80px] max-h-[80px] bg-gradient-to-bl from-gray-900/40 to-transparent pointer-events-none rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-[10vw] h-[10vw] max-w-[80px] max-h-[80px] bg-gradient-to-tr from-gray-900/40 to-transparent pointer-events-none rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-[10vw] h-[10vw] max-w-[80px] max-h-[80px] bg-gradient-to-tl from-gray-900/40 to-transparent pointer-events-none rounded-br-2xl" />
            </div>
            {/* メインコンテンツ */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default FeedBackground;
