import { Button as HeadlessButton } from '@headlessui/react';
import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import React from 'react';

interface ButtonProps extends Omit<HeadlessButtonProps<'button'>, 'className'> {
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
    <HeadlessButton
        {...props}
        className={`rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500 disabled:opacity-50 ${className}`}
    >
        {children}
    </HeadlessButton>
);
