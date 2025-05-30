import React from 'react';

interface SwitchNavProps {
    value: 'all' | 'self';
    onChange: (v: 'all' | 'self') => void;
}

const SwitchNav: React.FC<SwitchNavProps> = ({ value, onChange }) => {
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative flex w-full h-12 bg-transparent overflow-hidden">
                <button
                    className={`relative z-10 flex-1 h-full px-4 font-bold text-base rounded-xl transition-colors duration-200
                        text-accent/80 hover:text-accent`}
                    aria-pressed={value === 'self'}
                    onClick={() => onChange('self')}
                    type="button"
                >
                    SELF
                </button>
                <button
                    className={`relative z-10 flex-1 h-full px-4 font-bold text-base rounded-xl transition-colors duration-200
                        text-accent/80 hover:text-accent`}
                    aria-pressed={value === 'all'}
                    onClick={() => onChange('all')}
                    type="button"
                >
                    ALL
                </button>
                {/* アンダーラインインジケーター */}
                <span
                    className={`absolute bottom-0 left-0 h-[3px] w-1/2 bg-accent transition-all duration-300 ease-in-out z-20 rounded-full`}
                    style={{ transform: value === 'self' ? 'translateX(0%)' : 'translateX(100%)' }}
                />
            </div>
        </div>
    );
};

export default SwitchNav;
