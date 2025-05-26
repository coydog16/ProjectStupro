import React from 'react';
import { Toaster, toast, Toast } from 'react-hot-toast';

// グラスモーフィズム風カスタムトースト本体
export function glassmorphicToast(
    message: string | ((t: Toast) => React.ReactNode),
    opts?: Parameters<typeof toast.custom>[1] & {
        variant?: 'success' | 'error';
    }
) {
    // duration: 3000ms（3秒）をデフォルトに
    const mergedOpts = { duration: 3000, ...opts };
    return toast.custom((t) => {
        // variant: 'success' | 'error' | undefined で色分岐
        const variant = (opts as any)?.variant;
        let bgClass = 'bg-black/30';
        let background: string = 'rgba(0,0,0,0.3)';
        if (variant === 'success') {
            bgClass = 'bg-green-500/60';
            background = 'rgba(34,197,94,0.55)'; // より鮮やかな緑
        } else if (variant === 'error') {
            bgClass = 'bg-red-500/60';
            background = 'rgba(239,68,68,0.55)'; // より鮮やかな赤
        }
        return (
            <>
                {/* CSS-in-JSでkeyframesを定義 */}
                <style>{`
                        @keyframes glassmorphic-fadeup-in {
                            0% { transform: translateY(30px); opacity: 0; }
                            80% { opacity: 1; }
                            100% { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes glassmorphic-fadeup-out {
                            0% { opacity: 1; transform: translateY(0); }
                            100% { opacity: 0; transform: translateY(-24px); }
                        }
                        .glassmorphic-fadeup-in {
                            animation: glassmorphic-fadeup-in 0.7s cubic-bezier(0.33,1,0.68,1) both;
                        }
                        .glassmorphic-fadeup-out {
                            animation: glassmorphic-fadeup-out 0.5s cubic-bezier(0.33,1,0.68,1) both;
                        }
                    `}</style>
                <div
                    className={`relative flex-1 w-full max-w-md mx-auto rounded-[14px] z-50 ${bgClass} shadow-[0_4px_24px_0_rgba(0,0,0,0.22),0_1.5px_4px_0_rgba(0,0,0,0.13)] backdrop-blur-md pointer-events-auto glassmorphic-fadeup-in`}
                    style={{
                        minWidth: 240,
                        maxWidth: '90vw',
                        padding: '1.1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        fontWeight: 400,
                        color: '#fff',
                        fontFamily:
                            "'Montserrat', 'Noto Sans JP', 'Zen Kaku Gothic New', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', 'Inter', 'sans-serif'",
                        fontSize: '0.88em',
                        letterSpacing: 0.5,
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        background,
                    }}
                >
                    {/* before: 上部グラデ・ハイライト */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 14,
                            background: 'linear-gradient(to top, rgba(255,255,255,0.25), transparent)',
                            opacity: 0.25,
                            filter: 'blur(2px)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                    {/* after: 下部影 */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 14,
                            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
                            opacity: 0.25,
                            filter: 'blur(2px)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                    {/* テキストのみ中央寄せ */}
                    <span
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {typeof message === 'function' ? message(t) : message}
                    </span>
                </div>
            </>
        );
    }, mergedOpts);
}

// Toaster本体は最低限だけ設置
const GlassmorphicToaster: React.FC = () => <Toaster position="top-center" />;

export default GlassmorphicToaster;
