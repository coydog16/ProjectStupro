import { useState, useEffect } from "react";

const DevHome = () => {
    const [count, setCount] = useState(0);
    const [apiStatus, setApiStatus] = useState<{
        status?: string;
        message?: string;
        error?: string;
        version?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkApiHealth();
    }, []);

    const checkApiHealth = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/health");
            if (response.ok) {
                const data = await response.json();
                setApiStatus(data);
            } else {
                setApiStatus({
                    error: `エラー: ${response.status} ${response.statusText}`,
                });
            }
        } catch (error) {
            setApiStatus({
                error: `接続エラー: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[url('/img/nightForest.jpg')] bg-cover bg-center overflow-hidden">
            <div className="relative z-10 w-full max-w-md mx-auto p-6 rounded-[18px] shadow-xl bg-black/30 backdrop-blur-lg border border-white/20">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow font-sans tracking-tight">
                        NavStupro Project
                    </h1>
                    <p className="text-base text-white/80 font-sans">
                        ようこそ！フロントエンド開発環境へ
                    </p>
                </header>
                <div className="flex flex-col gap-6 items-center w-full">
                    <div className="flex justify-center w-full">
                        <div className="w-[70%]">
                            <button
                                onClick={() => setCount((count) => count + 1)}
                                className="px-4 py-2 bg-indigo-600/60 text-white font-semibold rounded-lg shadow hover:bg-indigo-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors backdrop-blur-md border border-white/30 font-sans w-full"
                            >
                                カウント: {count}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="w-[70%]">
                            <h2 className="text-lg font-bold text-white mb-2 text-center font-sans">
                                開発環境情報
                            </h2>
                            <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm text-left font-sans">
                                <li>React + TypeScript</li>
                                <li>Tailwind CSS v4</li>
                                <li>Vite - 高速な開発体験</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="w-[70%]">
                            <h2 className="text-lg font-bold text-white mb-2 text-center font-sans">
                                API接続チェック
                            </h2>
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={checkApiHealth}
                                    disabled={loading}
                                    className="px-4 py-2 bg-green-400/30 text-white font-semibold rounded-lg shadow hover:bg-green-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200 transition-colors disabled:opacity-50 backdrop-blur-md text-center font-sans w-full"
                                    style={{
                                        minWidth: "120px",
                                        maxWidth: "320px",
                                        boxShadow:
                                            "0 4px 24px 0 rgba(34,197,94,0.18), 0 1.5px 4px 0 rgba(34,197,94,0.13)",
                                    }}
                                >
                                    {loading
                                        ? "チェック中..."
                                        : "API接続チェック"}
                                </button>
                                {apiStatus.status && (
                                    <div className="mt-3 p-3 text-white text-sm text-left font-sans w-full">
                                        <p>
                                            <strong>ステータス:</strong>{" "}
                                            {apiStatus.status}
                                        </p>
                                        {apiStatus.message && (
                                            <p>
                                                <strong>メッセージ:</strong>{" "}
                                                {apiStatus.message}
                                            </p>
                                        )}
                                        {apiStatus.version && (
                                            <p>
                                                <strong>バージョン:</strong>{" "}
                                                {apiStatus.version}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {apiStatus.error && (
                                    <div className="mt-3 p-3 text-white rounded-lg text-sm text-left font-sans w-full">
                                        {apiStatus.error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white/70 text-xs mt-6 text-center font-sans">
                    <p>フロントエンド環境が正常に動作しています！</p>
                </div>
            </div>
        </div>
    );
};

export default DevHome;
