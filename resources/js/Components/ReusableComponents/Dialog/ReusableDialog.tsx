import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogProps,
} from '@mui/material';

interface ReusableDialogProps extends Omit<DialogProps, 'open'> {
    open: boolean;
    title: string;
    onClose: () => void;
    onConfirm?: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

export default function ReusableDialog({
    open,
    title,
    onClose,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    children,
    maxWidth = 'sm',
    fullWidth = true,
    ...props
}: ReusableDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            {...props}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>
                    {cancelText}
                </Button>
                {onConfirm && (
                    <Button
                        onClick={onConfirm}
                        variant="contained"
                        disabled={isLoading}
                    >
                        {confirmText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
