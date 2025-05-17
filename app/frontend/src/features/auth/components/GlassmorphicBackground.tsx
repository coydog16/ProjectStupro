import React from "react";

interface GlassmorphicBackgroundProps {
    isSignupMode: boolean;
    animationClass: string;
}

const GlassmorphicBackground: React.FC<GlassmorphicBackgroundProps> = ({
    isSignupMode,
    animationClass,
}) => {
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
            <div className="absolute inset-[6px] bg-black/10 rounded-[14px] z-[10]"></div>
        </>
    );
};

export default GlassmorphicBackground;
