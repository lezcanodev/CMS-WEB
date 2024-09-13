import { useAppDispatch, useAppSelector } from '@/redux';
import { snackbarActions } from '@/redux/snackbar/snackbar.slice';
import { IconButton, Snackbar as SnackbarUI, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export function SnackbarGlobal(){
    const dispatch = useAppDispatch();
    const {message, open, autoHideDuration, type} = useAppSelector((state) => state.snackbar);
    
    return <><SnackbarUI
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={() => dispatch(snackbarActions.closeSnackbar())}
        message={<Typography color={type}>{message}</Typography>}
        action={<>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => dispatch(snackbarActions.closeSnackbar())}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>}
    />
</>
}