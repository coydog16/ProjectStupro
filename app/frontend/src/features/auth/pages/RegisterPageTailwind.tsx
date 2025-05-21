import React, { useState } from "react";
import apiClient from "../../../api/axios";

const RegisterPageTailwind: React.FC = () => {
    // フォームの初期値
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 入力値変更時のハンドラ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // フォーム送信時のハンドラ
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        // localStorageからトークンを取得
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError("管理者でログインしてから新規登録してください");
            return;
        }
        const data = {
            username: form.username,
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
        };
        console.log("送信データ", data);
        try {
            await apiClient.post("/auth/register", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("ユーザー登録に成功しました！");
        } catch (err: any) {
            const apiError =
                err.response?.data?.error ||
                err.response?.data?.msg ||
                err.response?.data?.detail ||
                (Array.isArray(err.response?.data) &&
                    err.response?.data[0]?.msg) ||
                "登録に失敗しました";
            setError(apiError);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                    ユーザー新規登録
                </h2>
                {message && (
                    <div className="mb-4 text-green-600">{message}</div>
                )}
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        name="username"
                        placeholder="ユーザー名"
                        value={form.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        name="email"
                        placeholder="メールアドレス"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        name="password"
                        placeholder="パスワード"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        name="firstName"
                        placeholder="名"
                        value={form.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />

                    <input
                        className="form-input rounded-lg border-blue-200 focus:border-indigo-400"
                        name="lastName"
                        placeholder="姓"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                    />

                    {/* 登録ボタン */}
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
