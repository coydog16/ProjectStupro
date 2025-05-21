import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import GlassmorphicBackground from "../components/GlassmorphicBackground";
import apiClient from "../../../api/axios";
import GlassmorphicToaster, {
    glassmorphicToast,
} from "../components/GlassmorphicToaster";

// Tailwindを使用したグラスモーフィズム風ログインページ
const LoginPage: React.FC = () => {
    // サインアップモード管理
    const [isSignupMode, setIsSignupMode] = useState<boolean>(false);

    // サインアップモードが変更されたときにbodyのクラスを変更するエフェクト
    useEffect(() => {
        // bodyタグにクラスを追加/削除して背景切り替え
        if (isSignupMode) {
            document.body.classList.add("signup");
        } else {
            document.body.classList.remove("signup");
        }

        // クリーンアップ関数（コンポーネントがアンマウントされるとき）
        return () => {
            document.body.classList.remove("signup");
        };
    }, [isSignupMode]); // isSignupModeが変わるたびに実行

    // フォーム入力データの状態管理
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
    });

    // アクセストークン
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // フォーム送信ハンドラ
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await apiClient.post("/auth/login", {
                username: loginData.username,
                password: loginData.password,
            });
            const token = res.data.access_token;
            setAccessToken(token);
            glassmorphicToast("Login successful!");
            localStorage.setItem("access_token", token);
        } catch (err: any) {
            glassmorphicToast(err.response?.data?.error || "Login failed");
        }
    };

    // 入力変更ハンドラ - ログインフォーム
    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    // 登録フォーム送信ハンドラ
    const handleRegistrationSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const token = accessToken || localStorage.getItem("access_token");
        if (!token) {
            glassmorphicToast(
                "Please log in as admin before registering a new user."
            );
            return;
        }
        try {
            await apiClient.post(
                "/auth/register",
                {
                    username: registrationData.username,
                    email: registrationData.email,
                    password: registrationData.password,
                    first_name: "管理者登録用",
                    last_name: "テスト",
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            glassmorphicToast("User registration successful!");
        } catch (err: any) {
            glassmorphicToast(
                err.response?.data?.error || "User registration failed"
            );
        }
    };

    // 入力変更ハンドラ - 登録フォーム
    const handleRegistrationInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value,
        });
    };

    // モード切り替え
    const toggleSignupMode = (isSignup: boolean) => {
        console.log("モード切替:", isSignup ? "登録モード" : "ログインモード");
        setIsSignupMode(isSignup);
    };

    // useEffectをデバッグ
    useEffect(() => {
        console.log(
            "現在のモード:",
            isSignupMode ? "登録モード" : "ログインモード"
        );

        // 登録フォームの表示状態をデバッグ用に記録
        const signupForm = document.getElementById("signupForm");
        const loginForm = document.getElementById("signinForm");
        console.log("フォームの表示状態:", {
            signup: {
                exists: !!signupForm,
                style: signupForm ? window.getComputedStyle(signupForm) : null,
                opacity: signupForm
                    ? window.getComputedStyle(signupForm).opacity
                    : null,
                transform: signupForm
                    ? window.getComputedStyle(signupForm).transform
                    : null,
                zIndex: signupForm
                    ? window.getComputedStyle(signupForm).zIndex
                    : null,
            },
            login: {
                exists: !!loginForm,
                opacity: loginForm
                    ? window.getComputedStyle(loginForm).opacity
                    : null,
                transform: loginForm
                    ? window.getComputedStyle(loginForm).transform
                    : null,
            },
        });
    }, [isSignupMode]);

    // Tailwind v4のアニメーション定義
    const animationClass = "animate-[spinGlow_2.5s_linear_infinite]";

    return (
        <div
            className={`
      flex justify-center items-center min-h-screen w-full overflow-hidden
      ${isSignupMode ? "bg-light-mode" : "bg-dark-mode"}
      transition-all duration-500
      before:content-[''] before:absolute before:inset-0 before:bg-[url('/img/nightForest.jpg')] before:bg-fixed before:bg-cover before:bg-center before:z-0
      after:content-[''] after:absolute after:inset-0 after:bg-[url('/img/lightForest.jpg')] after:bg-fixed after:bg-cover after:bg-center after:opacity-0 after:transition-opacity after:duration-500 after:z-0
      ${isSignupMode ? "after:opacity-100" : ""}
    `}
        >
            {/* グラスモーフィズムコンテナ */}
            <div
                className={`
        relative w-[350px] ${isSignupMode ? "h-[450px]" : "h-[340px]"}
        rounded-[15px] shadow-lg flex justify-center items-center z-[1000]
        transition-all duration-500 overflow-visible
        before:content-[''] before:absolute before:w-full before:h-full
        before:bg-[repeating-conic-gradient(from_var(--a),#45f3ff_0%,#45f3ff_10%,transparent_10%,transparent_80%,#45f3ff_100%)]
        before:rounded-[20px] ${animationClass}
        ${isSignupMode ? "before:filter before:hue-rotate-[140deg]" : ""}
      `}
            >
                <GlassmorphicBackground
                    isSignupMode={isSignupMode}
                    animationClass={animationClass}
                />

                {/* ログインフォーム */}
                <LoginForm
                    formData={loginData}
                    onChange={handleLoginInputChange}
                    onSubmit={handleLoginSubmit}
                    onToggleMode={toggleSignupMode}
                    isSignupMode={isSignupMode}
                />
                <GlassmorphicToaster />

                {/* 登録フォーム */}
                <RegistrationForm
                    registrationData={registrationData}
                    handleRegistrationSubmit={handleRegistrationSubmit}
                    handleRegistrationInputChange={
                        handleRegistrationInputChange
                    }
                    toggleSignupMode={toggleSignupMode}
                    isSignupMode={isSignupMode}
                />
            </div>
        </div>
    );
};

export default LoginPage;
