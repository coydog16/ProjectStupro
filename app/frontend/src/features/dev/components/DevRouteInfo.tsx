import React from "react";

const SPA_ROUTES = [
    { path: "/feed", label: "Feed (タイムライン)" },
    { path: "/login", label: "Login (ログイン)" },
    { path: "/register", label: "Register (新規登録)" },
    { path: "/dev", label: "DevHome (このページ)" },
    // 必要に応じて管理者用や設定ページも追加
];

const DevRouteInfo: React.FC = () => {
    return (
        <>
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow font-sans tracking-tight">
                    SPA Routing Info
                </h1>
                <p className="text-base text-white/80 font-sans">
                    主要なルート一覧です
                </p>
            </header>
            <div className="flex flex-col gap-6 items-center w-full">
                <div className="flex justify-center w-full">
                    <div className="w-[70%]">
                        <ul className="space-y-3">
                            {SPA_ROUTES.map((route) => (
                                <li key={route.path}>
                                    <a
                                        href={route.path}
                                        className="block px-4 py-2 rounded-lg bg-white/10 hover:bg-blue-400/20 text-white font-sans transition-colors shadow border border-white/10 text-center"
                                    >
                                        <span className="font-mono text-base">
                                            {route.path}
                                        </span>
                                        <span className="ml-2 text-xs text-white/60">
                                            {route.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-white/70 text-xs mt-6 text-center font-sans">
                <p>ルート情報は随時アップデートされます</p>
            </div>
        </>
    );
};

export default DevRouteInfo;
