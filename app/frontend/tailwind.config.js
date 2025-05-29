/** @type {import('tailwindcss').Config} */
import typographyPlugin from '@tailwindcss/typography';
import formsPlugin from '@tailwindcss/forms';

export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            // Tailwind CSS v4では色が変更されたため、v3の色を互換性のために追加
            colors: {
                gray: {
                    50: 'oklch(98.5% 0.002 247.839)',
                    100: 'oklch(96.7% 0.003 264.542)',
                    200: 'oklch(92.8% 0.006 264.531)',
                    300: 'oklch(87.2% 0.01 258.338)',
                    400: 'oklch(70.7% 0.022 261.325)',
                    500: 'oklch(55.1% 0.027 264.364)',
                    600: 'oklch(44.6% 0.03 256.802)',
                    700: 'oklch(37.3% 0.034 259.733)',
                    800: 'oklch(27.8% 0.033 256.848)',
                    900: 'oklch(21% 0.034 264.665)',
                    950: 'oklch(13% 0.028 261.692)',
                },
                // ログインページ用の背景モード
                'dark-mode': '#121212',
                'light-mode': '#f8f8f8',
                neutral: {
                    50: 'oklch(98.5% 0 0)',
                    100: 'oklch(97% 0 0)',
                    200: 'oklch(92.2% 0 0)',
                    300: 'oklch(87% 0 0)',
                    400: 'oklch(70.8% 0 0)',
                    500: 'oklch(55.6% 0 0)',
                    600: 'oklch(43.9% 0 0)',
                    700: 'oklch(37.1% 0 0)',
                    800: 'oklch(26.9% 0 0)',
                    900: 'oklch(20.5% 0 0)',
                    950: 'oklch(14.5% 0 0)',
                },
            },
            // グラスモーフィズム用のアニメーション
            keyframes: {
                spinGlow: {
                    '0%': { '--a': '0deg' },
                    '100%': { '--a': '360deg' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-60%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(60%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
            animation: {
                spinGlow: 'spinGlow 1.2s linear infinite',
                'slide-in-left': 'slideInLeft 0.4s cubic-bezier(0.4,0,0.2,1)',
                'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.4,0,0.2,1)',
            },
        },
    },
    plugins: [typographyPlugin, formsPlugin],
};
