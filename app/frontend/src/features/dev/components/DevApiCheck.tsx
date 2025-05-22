import React from "react";

interface DevApiCheckProps {
    apiStatus: {
        status?: string;
        message?: string;
        error?: string;
        version?: string;
    };
    loading: boolean;
    checkApiHealth: () => void;
}

const DevApiCheck: React.FC<DevApiCheckProps> = ({
    apiStatus,
    loading,
    checkApiHealth,
}) => {
    return (
        <div className="w-full">
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
                    {loading ? "チェック中..." : "API接続チェック"}
                </button>
                {apiStatus.status && (
                    <div className="mt-3 p-3 text-white text-sm text-left font-sans w-full">
                        <p>
                            <strong>ステータス:</strong> {apiStatus.status}
                        </p>
                        {apiStatus.message && (
                            <p>
                                <strong>メッセージ:</strong> {apiStatus.message}
                            </p>
                        )}
                        {apiStatus.version && (
                            <p>
                                <strong>バージョン:</strong> {apiStatus.version}
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
    );
};

export default DevApiCheck;
