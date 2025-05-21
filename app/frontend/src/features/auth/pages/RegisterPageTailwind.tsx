import React from "react";

const RegisterPageTailwind: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                    ユーザー新規登録
                </h2>
                {/* ここにフォームを追加していく予定 */}
                <form className="flex flex-col gap-4">
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        placeholder="ユーザー名"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        placeholder="メールアドレス"
                        type="email"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        placeholder="パスワード"
                        type="password"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        placeholder="名"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        placeholder="姓"
                    />
                    <button
                        type="submit"
                        className="mt-4 py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        登録
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPageTailwind;
