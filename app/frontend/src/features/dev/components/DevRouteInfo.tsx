import React from 'react';
// routes.tsxからlabelもimportして自動化
import routes from '../../../routes';

const DevRouteInfo: React.FC = () => {
    return (
        <>
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow font-sans tracking-tight">SPA Routing</h1>
                <p className="text-base text-white/80 font-sans">Main routes list</p>
            </header>
            <ul className="mx-auto space-y-1 w-[60%] text-lg md:text-2xl text-white">
                {routes.map((route) => (
                    <li key={route.path} className="w-full">
                        <a
                            href={route.path || '#'}
                            className="block px-4 py-0 font-sans text-left font-mono border-l-4 border-blue-400/60 hover:bg-blue-400/10 transition-colors rounded-none shadow-none bg-transparent border-none text-lg md:text-2xl"
                            style={{
                                boxShadow: 'none',
                                background: 'none',
                            }}
                        >
                            {route.path}
                            <span className="ml-2 text-xs text-white/60 font-sans">{route.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="text-white/70 text-xs mt-6 text-center font-sans">
                <p>Route information is updated automatically</p>
            </div>
        </>
    );
};

export default DevRouteInfo;
