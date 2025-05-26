import React from 'react';

interface GlassmorphicBackgroundProps {
    isSignupMode: boolean;
    animationClass: string;
}

const GlassmorphicBackground: React.FC<GlassmorphicBackgroundProps> = ({ isSignupMode, animationClass }) => {
    return (
        <>
            {/* グラスモーフィズム背景 - 条件付きレンダリングで背景を完全に切り替え */}
            {isSignupMode ? (
                <span
                    className={`absolute inset-[5px] overflow-hidden rounded-[15px] z-[5] ${animationClass}
                        before:content-[''] before:absolute before:inset-[5px]
                        before:bg-[url('/img/lightForest.jpg')] before:bg-fixed before:bg-cover before:bg-center before:blur-[10px]
                        after:content-[''] after:absolute after:inset-[5px]
                        after:bg-[url('/img/lightForest.jpg')] after:bg-fixed after:bg-cover after:bg-center after:blur-[15px]`}
                ></span>
            ) : (
                <span
                    className={`absolute inset-[5px] overflow-hidden rounded-[15px] z-[5] ${animationClass}
                        before:content-[''] before:absolute before:inset-[5px]
                        before:bg-[url('/img/nightForest.jpg')] before:bg-fixed before:bg-cover before:bg-center before:blur-[7px] before:brightness-125
                        after:content-[''] after:absolute after:inset-[5px]
                        after:bg-[url('/img/nightForest.jpg')] after:bg-fixed after:bg-cover after:bg-center after:blur-[10px] after:brightness-110`}
                ></span>
            )}
            {/* ガラス板本体 */}
            <div className="absolute inset-[6px] bg-black/20 rounded-[14px] z-[10] pointer-events-none backdrop-blur-md shadow-[0_4px_24px_0_rgba(0,0,0,0.22),0_1.5px_4px_0_rgba(0,0,0,0.13)] before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:bg-gradient-to-t before:from-white/40 before:to-transparent before:opacity-40 before:blur-[2px] before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:rounded-[14px] after:bg-gradient-to-b after:from-transparent after:to-black/30 after:opacity-25 after:blur-[2px] after:pointer-events-none"></div>
        </>
    );
};

export default GlassmorphicBackground;
