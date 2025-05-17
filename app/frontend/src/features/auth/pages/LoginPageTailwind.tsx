import React, { useState, useEffect } from "react";

// Tailwindを使用したグラスモーフィズム風ログインページ
const LoginPageTailwind: React.FC = () => {
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
        password: "",
        confirmPassword: "",
    });

    // フォーム送信ハンドラ
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login submitted:", loginData);
        // ここで認証APIを呼び出す
    };

    const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Registration submitted:", registrationData);
        // ここでユーザー登録APIを呼び出す
    };

    // 入力変更ハンドラ - ログインフォーム
    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
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
                {/* グラスモーフィズム効果のレイヤー */}
                {/* グラスモーフィズム背景 - 条件付きレンダリングで背景を完全に切り替え */}
                {isSignupMode ? (
                    <span
                        className="absolute inset-[5px] overflow-hidden rounded-[15px] z-[5]
                        before:content-[''] before:absolute before:inset-[5px]
                        before:bg-[url('/img/lightForest.jpg')] before:bg-fixed before:bg-cover before:bg-center before:blur-[10px]
                        after:content-[''] after:absolute after:inset-[5px]
                        after:bg-[url('/img/lightForest.jpg')] after:bg-fixed after:bg-cover after:bg-center after:blur-[15px]"
                    ></span>
                ) : (
                    <span
                        className="absolute inset-[5px] overflow-hidden rounded-[15px] z-[5]
                        before:content-[''] before:absolute before:inset-[5px]
                        before:bg-[url('/img/nightForest.jpg')] before:bg-fixed before:bg-cover before:bg-center before:blur-[10px]
                        after:content-[''] after:absolute after:inset-[5px]
                        after:bg-[url('/img/nightForest.jpg')] after:bg-fixed after:bg-cover after:bg-center after:blur-[15px]"
                    ></span>
                )}
                <div className="absolute inset-[6px] bg-black/15 rounded-[14px] z-[10]"></div>

                {/* ログインフォーム */}
                <form
                    id="signinForm"
                    onSubmit={handleLoginSubmit}
                    className={`
            absolute inset-0 flex justify-center items-center flex-col w-full gap-[15px] z-[30]
            transition-all duration-500 ease-in-out transform ${
                isSignupMode
                    ? "opacity-0 pointer-events-none translate-x-[-100%]"
                    : "opacity-100 pointer-events-auto translate-x-0"
            }
          `}
                >
                    <h2 className="relative text-white text-[1.5em] tracking-[0.1em] uppercase font-[500] mb-[10px]">
                        Login
                    </h2>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={loginData.username}
                            onChange={handleLoginInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <a href="#" className="text-white text-[0.85em]">
                            Forgot Password
                        </a>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSignupMode(true);
                            }}
                            className="text-white text-[0.85em] underline"
                        >
                            Signup
                        </a>
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="submit"
                            value="Sign in"
                            className="w-full outline-none border border-white/25 bg-[#2196f3] py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50 font-[500] cursor-pointer"
                        />
                    </div>
                </form>

                {/* 登録フォーム */}
                <form
                    id="signupForm"
                    onSubmit={handleRegistrationSubmit}
                    className={`
            absolute inset-0 flex justify-center items-center flex-col w-full gap-[15px] z-[40]
            transition-all duration-500 ease-in-out transform ${
                isSignupMode
                    ? "opacity-100 pointer-events-auto translate-x-0"
                    : "opacity-0 pointer-events-none translate-x-[100%]"
            }
          `}
                >
                    <h2 className="relative text-white text-[1.5em] tracking-[0.1em] uppercase font-[500] mb-[10px]">
                        Registration
                    </h2>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={registrationData.username}
                            onChange={handleRegistrationInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={registrationData.email}
                            onChange={handleRegistrationInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            value={registrationData.password}
                            onChange={handleRegistrationInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={registrationData.confirmPassword}
                            onChange={handleRegistrationInputChange}
                            className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-between">
                        <input
                            type="submit"
                            value="Register Account"
                            className="w-full outline-none border border-white/25 bg-[#2196f3] py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50 font-[500] cursor-pointer"
                        />
                    </div>

                    <div className="relative w-[70%] flex justify-center">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleSignupMode(false);
                            }}
                            className="text-white text-[0.85em]"
                        >
                            Already Have an Account?&nbsp;&nbsp;&nbsp;&nbsp;
                            <b>Login</b>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPageTailwind;
