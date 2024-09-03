import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { seguridadIngresarThunk } from './Ingresar/ingresar.thunk';
import { LoginResponse, UserData } from './Ingresar/Ingresar.model';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { localStorageServices } from '@/services';
import { seguridadRefrescarThunk } from './refrescar/refrescar.thunk';
import { seguridadRegistrarseThunk } from './register/register.thunk';
import { RegisterResponse } from './register/register.model';

/**
 * Controlador de estado para la autenticación del usuario
 * maneja ingreso al sistema, refrescar token y salir del sistema
 */
const seguridadIngresar = createSlice({
    name: 'seguridadIngresar',
    initialState: generateBaseState<BaseResponse<LoginResponse, UserData>>(),
    reducers: {
        logout: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
            localStorageServices.delete('token');
            localStorageServices.delete('refresh');
        }
    },
    extraReducers: (builder) => {
        buildCommonCases(seguridadIngresarThunk, builder);
        builder
            .addCase(seguridadRefrescarThunk.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload.data){
                    state.data = {
                        data: {
                            refresh: action.payload.data.access,
                            token: action.payload.extraData.token
                        },
                        extraData: action.payload.extraData.userData
                    };
                }else{
                    state.data = null;
                    state.error = null;
                    state.loading = false;
                }
            })
            .addCase(seguridadRefrescarThunk.pending, (state) => {
                state.data = null;
                state.error = null;
                state.loading = true;
            })
            .addCase(seguridadRefrescarThunk.rejected, (state) => {
                state.data = null;
                state.loading = false;
                state.error = null;
            })
    }
});
export const { logout } = seguridadIngresar.actions;


/**
 * Controlador de estado para el registro de usuario
*/
const seguridadRegistrarse = createSlice({
    name: 'seguridadRegistrarse',
    initialState: generateBaseState<BaseResponse<RegisterResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(seguridadRegistrarseThunk, builder);
    }
});

const seguridadReducer = combineReducers({
    ingresar: seguridadIngresar.reducer,
    registrarse: seguridadRegistrarse.reducer
});

export default seguridadReducer;