import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react';


interface ModalProps{
    title: string,
    open: boolean,
    setOpen: (newOpen: boolean) => void,
    Actions: React.ReactElement,
    children: React.ReactElement
}
export function Modal({
    title, open, setOpen, children, Actions
}: ModalProps){

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    return <>
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            <DialogContent>
                    {children}
            </DialogContent>
            <DialogActions>
                {Actions}
            </DialogActions>
        </Dialog>
    </>
}