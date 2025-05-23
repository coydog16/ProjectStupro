import React from "react";

interface SwitchNavProps {
    value: "all" | "self";
    onChange: (v: "all" | "self") => void;
}

const SwitchNav: React.FC<SwitchNavProps> = ({ value, onChange }) => {
    // スライドアニメーション用のインジケーター位置
    const indicatorPos = value === "self" ? "left-0" : "left-1/2";
    return (
        <div className="w-full max-w-xl mx-auto my-6 px-2">
            <div className="relative flex w-full h-12 rounded-xl bg-gray-800 border border-gray-700 overflow-hidden shadow-inner">
                {/* スライドするインジケーター */}
                <span
                    className={`absolute top-0 h-full w-1/2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 ease-in-out z-0 ${indicatorPos}`}
                    style={{ boxShadow: "0 2px 16px 0 #2563eb33" }}
                />
                {/* MyPostボタン */}
                <button
                    type="button"
                    className={`relative z-10 w-1/2 h-full flex items-center justify-center font-semibold text-base transition-colors duration-200 rounded-xl
                        ${
                            value === "self"
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    aria-pressed={value === "self"}
                    onClick={() => onChange("self")}
                >
                    MyPost
                </button>
                {/* ALLボタン */}
                <button
                    type="button"
                    className={`relative z-10 w-1/2 h-full flex items-center justify-center font-semibold text-base transition-colors duration-200 rounded-xl
                        ${
                            value === "all"
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    aria-pressed={value === "all"}
                    onClick={() => onChange("all")}
                >
                    ALL
                </button>
            </div>
        </div>
    );
};

export default SwitchNav;
