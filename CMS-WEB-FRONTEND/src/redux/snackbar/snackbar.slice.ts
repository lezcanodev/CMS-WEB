import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SnackbarState{
    message: string,
    open: boolean,
    autoHideDuration?: number,
    type?: 'error' | 'success'
}

const initialState: SnackbarState ={
    message: '',
    open: false,
    autoHideDuration: 7000,
    type: 'success'
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action: PayloadAction<Omit<SnackbarState, 'open'>>){
            state.message = action.payload.message;
            state.open = true;
            state.autoHideDuration = action.payload?.autoHideDuration || initialState.autoHideDuration;
            state.type = action.payload?.type || initialState.type;
        },
        closeSnackbar(state){
            state.message = '';
            state.open = false;
            state.autoHideDuration = initialState.autoHideDuration;
            state.type= 'success'
        }
    }
})

export const snackbarActions = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;