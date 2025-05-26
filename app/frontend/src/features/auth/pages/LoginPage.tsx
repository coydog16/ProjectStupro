import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import GlassmorphicBackground from '../components/GlassmorphicBackground';
import GlassmorphicToaster from '../components/GlassmorphicToaster';
import { useLoginForm } from '../hooks/useLoginForm';
import { useRegistrationForm } from '../hooks/useRegistrationForm';

// グラスモーフィズム風ログインページ
const LoginPage: React.FC = () => {
    // サインアップモードの状態
    const [isSignupMode, setIsSignupMode] = useState<boolean>(false);

    // ログインフォーム用カスタムフック
    const { loginData, handleLoginInputChange, handleLoginSubmit, accessToken } = useLoginForm();

    // 登録フォーム用カスタムフック
    const { registrationData, handleRegistrationInputChange, handleRegistrationSubmit } =
        useRegistrationForm(accessToken);

    // サインアップモード切り替え時にbodyクラスを変更
    useEffect(() => {
        if (isSignupMode) {
            document.body.classList.add('signup');
        } else {
            document.body.classList.remove('signup');
        }
        return () => {
            document.body.classList.remove('signup');
        };
    }, [isSignupMode]);

    // モード切り替え関数
    const モード切替 = (isSignup: boolean) => {
        setIsSignupMode(isSignup);
    };

    // デバッグ用: モードとフォームの表示状態を出力
    useEffect(() => {
        console.log('現在のモード:', isSignupMode ? '登録モード' : 'ログインモード');
        const signupForm = document.getElementById('signupForm');
        const loginForm = document.getElementById('signinForm');
        console.log('フォームの表示状態:', {
            signup: {
                exists: !!signupForm,
                opacity: signupForm ? window.getComputedStyle(signupForm).opacity : null,
                transform: signupForm ? window.getComputedStyle(signupForm).transform : null,
                zIndex: signupForm ? window.getComputedStyle(signupForm).zIndex : null,
            },
            login: {
                exists: !!loginForm,
                opacity: loginForm ? window.getComputedStyle(loginForm).opacity : null,
                transform: loginForm ? window.getComputedStyle(loginForm).transform : null,
            },
        });
    }, [isSignupMode]);

    // Tailwind v4アニメーション用クラス
    const animationClass = 'animate-[spinGlow_2.5s_linear_infinite]';

    return (
        <div
            className={`
                flex justify-center items-center min-h-screen w-full overflow-hidden
                ${isSignupMode ? 'bg-light-mode' : 'bg-dark-mode'}
                transition-all duration-500
                before:content-[''] before:absolute before:inset-0 before:bg-[url('/img/nightForest.jpg')]
                before:bg-fixed before:bg-cover before:bg-center before:z-0
                after:content-[''] after:absolute after:inset-0 after:bg-[url('/img/lightForest.jpg')]
                after:bg-fixed after:bg-cover after:bg-center after:opacity-0 after:transition-opacity after:duration-500 after:z-0
                ${isSignupMode ? 'after:opacity-100' : ''}
            `}
        >
            {/* グラスモーフィズムコンテナ */}
            <div
                className={`
                    relative w-[350px] ${isSignupMode ? 'h-[450px]' : 'h-[340px]'}
                    rounded-[15px] shadow-lg flex justify-center items-center z-[1000]
                    transition-all duration-500 overflow-visible
                    before:content-[''] before:absolute before:w-full before:h-full
                    before:bg-[repeating-conic-gradient(from_var(--a),#45f3ff_0%,#45f3ff_10%,transparent_10%,transparent_80%,#45f3ff_100%)]
                    before:rounded-[20px] ${animationClass}
                    ${isSignupMode ? 'before:filter before:hue-rotate-[140deg]' : ''}
                `}
            >
                <GlassmorphicBackground isSignupMode={isSignupMode} animationClass={animationClass} />
                {/* ログインフォーム */}
                <LoginForm
                    formData={loginData}
                    onChange={handleLoginInputChange}
                    onSubmit={handleLoginSubmit}
                    onToggleMode={モード切替}
                    isSignupMode={isSignupMode}
                />
                <GlassmorphicToaster />
                {/* 登録フォーム */}
                <RegistrationForm
                    registrationData={registrationData}
                    handleRegistrationSubmit={handleRegistrationSubmit}
                    handleRegistrationInputChange={handleRegistrationInputChange}
                    toggleSignupMode={モード切替}
                    isSignupMode={isSignupMode}
                />
            </div>
        </div>
    );
};

export default LoginPage;
