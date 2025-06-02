import React from 'react';
import { Link } from 'react-router-dom';

const isAdmin = true; // TODO: 本来はuseAuth()などで判定

const WrenchIcon = (
    <svg
        width="22"
        height="22"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline align-text-bottom mr-1"
    >
        <path
            d="M17.7 13.29a6.5 6.5 0 01-7.99-8.13l-2.1 2.1a2.5 2.5 0 01-3.54 3.54l-1.1-1.1a1 1 0 00-1.42 1.42l5.66 5.66a1 1 0 001.42-1.42l-1.1-1.1a2.5 2.5 0 013.54-3.54l2.1-2.1A6.5 6.5 0 0117.7 13.3z"
            fill="currentColor"
        />
    </svg>
);

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-3 px-4 bg-[var(--color-bg-glass)] backdrop-blur-md border-t border-accent/20 flex items-center justify-center text-accent text-base font-medium shadow-inner fixed bottom-0 left-0 right-0 z-40">
            <span className="opacity-70">© 2025 MyApp</span>
            {isAdmin && (
                <Link
                    to="/admin"
                    className="ml-6 flex items-center gap-1 px-3 py-1 rounded bg-[var(--color-bg)] text-accent hover:bg-accent/10 transition-colors duration-150 shadow-dropdown-menu border-none text-sm font-semibold"
                >
                    {WrenchIcon}
                    管理
                </Link>
            )}
        </footer>
    );
};

export default Footer;
