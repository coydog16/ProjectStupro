import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Button } from './Button';
import React from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title = '確認',
    message,
    confirmLabel = 'OK',
    cancelLabel = 'キャンセル',
    onConfirm,
    onCancel,
}) => (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40">
            <DialogPanel className="max-w-lg w-full space-y-4 border bg-[#232225] p-8 rounded-xl shadow-xl">
                <DialogTitle className="font-bold text-lg text-white">{title}</DialogTitle>
                <Description>
                    <div className="text-red-300 text-center mb-2">{message}</div>
                </Description>
                <div className="flex justify-end gap-4 mt-6">
                    <Button onClick={onCancel} className="bg-gray-600 text-gray-100">
                        {cancelLabel}
                    </Button>
                    <Button onClick={onConfirm} className="bg-red-600 text-white">
                        {confirmLabel}
                    </Button>
                </div>
            </DialogPanel>
        </div>
    </Dialog>
);
