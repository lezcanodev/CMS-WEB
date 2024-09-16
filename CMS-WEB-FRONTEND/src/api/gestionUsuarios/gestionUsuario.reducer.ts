import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { usuarioListarApiThunk } from './listar/listarUsuario.thunk';
import { UsuarioListarResponse } from './listar/listartUsuario.model';
import { usuarioCrearApiThunk } from './crear/crearUsuario.thunk';
import { UsuarioCrearResponse } from './crear/crearUsuario.model';


const listarSlice = createSlice({
    name: 'usuarioListar',
    initialState: generateBaseState<BaseResponse<UsuarioListarResponse, void>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(usuarioListarApiThunk, builder);
    }
});

const crearSlice = createSlice({
    name: 'usuarioCrear',
    initialState: generateBaseState<BaseResponse<UsuarioCrearResponse, void>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(usuarioCrearApiThunk, builder);
    }
});


const usuarioReducer = combineReducers({
    listar: listarSlice.reducer,
    crear:  crearSlice.reducer
});

export default usuarioReducer;

export const usuarioApi = {
    usuarioListarApiThunk,
    usuarioCrearApiThunk
}