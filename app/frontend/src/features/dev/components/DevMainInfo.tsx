import React from 'react';
import DevApiCheck from './DevApiCheck';

interface DevMainInfoProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    apiStatus: {
        status?: string;
        message?: string;
        error?: string;
        version?: string;
    };
    loading: boolean;
    checkApiHealth: () => void;
}

const DevMainInfo: React.FC<DevMainInfoProps> = ({ count, setCount, apiStatus, loading, checkApiHealth }) => {
    return (
        <>
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow font-sans tracking-tight">
                    NavStupro Project
                </h1>
                <p className="text-base text-white/80 font-sans">Welcome to the front-end dev environment!</p>
            </header>
            <div className="flex flex-col gap-6 items-center w-full">
                <div className="flex justify-center w-full">
                    <div className="w-[70%]">
                        <button
                            onClick={() => setCount((count) => count + 1)}
                            className="px-4 py-2 bg-indigo-600/30 text-white font-semibold rounded-lg shadow hover:bg-indigo-700/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors backdrop-blur-md border-none font-sans w-full"
                            style={{
                                backdropFilter: 'blur(8px)',
                                background: 'rgba(99,102,241,0.22)',
                                boxShadow: '0 4px 24px 0 rgba(99,102,241,0.18), 0 1.5px 4px 0 rgba(99,102,241,0.13)',
                            }}
                        >
                            Count: {count}
                        </button>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-[70%]">
                        <h2 className="text-lg font-bold text-white mb-2 text-center font-sans">dev env info</h2>
                        <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm text-left font-sans">
                            <li>React + TypeScript</li>
                            <li>Tailwind CSS v4</li>
                            <li>Vite</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-[70%]">
                        <DevApiCheck apiStatus={apiStatus} loading={loading} checkApiHealth={checkApiHealth} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevMainInfo;
