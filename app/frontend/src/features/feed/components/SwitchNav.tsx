interface SwitchNavProps {
    value: 'all' | 'self';
    onChange: (v: 'all' | 'self') => void;
}

const SwitchNav: React.FC<SwitchNavProps> = ({ value, onChange }) => {
    // インジケーター位置（self:左, all:右）
    const indicatorPosition = value === 'self' ? 'left-0' : 'left-1/2';

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative flex w-full h-12 bg-transparent overflow-hidden shadow-inner">
                {/* スライドインジケーター（ぼかし＋青グラデ） */}
                <span
                    className={`absolute bottom-[-1px] left-0 h-[90%] w-1/2 transition-all duration-300 ease-in-out z-0 ${indicatorPosition} pointer-events-none`}
                    style={{
                        background: 'linear-gradient(90deg, rgba(37,99,235,0.55) 0%, rgba(59,130,246,0.55) 100%)',
                        backdropFilter: 'blur(10px) saturate(1.3)',
                        WebkitBackdropFilter: 'blur(10px) saturate(1.3)',
                        boxShadow: '0 2px 16px 0 #2563eb55',
                    }}
                />
                {/* MyPostボタン */}
                <button
                    type="button"
                    className={`relative z-10 w-1/2 h-full flex items-center justify-center font-semibold text-base transition-colors duration-200 outline-none ${
                        value === 'self'
                            ? 'bg-white/20 backdrop-blur-md text-white shadow-lg'
                            : 'bg-transparent text-gray-300 hover:text-white'
                    }`}
                    aria-pressed={value === 'self'}
                    onClick={() => onChange('self')}
                >
                    MyPost
                </button>
                {/* ALLボタン */}
                <button
                    type="button"
                    className={`relative z-10 w-1/2 h-full flex items-center justify-center font-semibold text-base transition-colors duration-200 outline-none ${
                        value === 'all'
                            ? 'bg-white/20 backdrop-blur-md text-white shadow-lg'
                            : 'bg-transparent text-gray-300 hover:text-white'
                    }`}
                    aria-pressed={value === 'all'}
                    onClick={() => onChange('all')}
                >
                    ALL
                </button>
            </div>
        </div>
    );
};

export default SwitchNav;
