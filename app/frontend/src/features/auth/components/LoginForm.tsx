import React from "react";

interface LoginFormProps {
    formData: {
        username: string;
        password: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onToggleMode: (isSignup: boolean) => void;
    isSignupMode: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    onChange,
    onSubmit,
    onToggleMode,
    isSignupMode,
}) => {
    return (
        <form
            id="signinForm"
            onSubmit={onSubmit}
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
                    value={formData.username}
                    onChange={onChange}
                    className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                />
            </div>

            <div className="relative w-[70%] flex justify-between">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChange}
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
                        onToggleMode(true);
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
    );
};

export default LoginForm;
