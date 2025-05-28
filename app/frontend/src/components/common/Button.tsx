import { Button as HeadlessButton } from '@headlessui/react';
import type { ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import React from 'react';

interface ButtonProps extends Omit<HeadlessButtonProps<'button'>, 'className'> {
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
    <HeadlessButton {...props} className={`rounded px-4 py-2 text-sm font-semibold ${className}`}>
        {children}
    </HeadlessButton>
);
