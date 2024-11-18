import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { libroListarApiThunk } from './listar/listarLibro.thunk';
import { LibroListarResponse } from './listar/listarLibro.model';
import { libroCrearApiThunk } from './crear/crearLibro.thunk';
import { libroBorrarApiThunk } from './borrar/borrarLibro.thunk';
import { LibroBorrarResponse } from './borrar/borrarLibro.model';
import { LibroCrearResponse } from './crear/crearLibro.model';
import { libroActualizarApiThunk } from './actualizar/actualizarLibro.thunk';
import { LibroActualizarEstadoResponse } from './actualizar/actualizarLibro.model';


const libroListar = createSlice({
    name: 'libroListar',
    initialState: generateBaseState<BaseResponse<LibroListarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(libroListarApiThunk, builder);
    }
});

const libroCrear = createSlice({
    name: 'libroCrear',
    initialState: generateBaseState<BaseResponse<LibroCrearResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(libroCrearApiThunk, builder);
    }
});

const libroBorrar = createSlice({
    name: 'libroBorrar',
    initialState: generateBaseState<BaseResponse<LibroBorrarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(libroBorrarApiThunk, builder);
    }
});

const libroActualizar = createSlice({
    name: 'libroActualizar',
    initialState: generateBaseState<BaseResponse<LibroActualizarEstadoResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(libroActualizarApiThunk.actualizarEstado, builder);
        buildCommonCases(libroActualizarApiThunk.aumentarCantidadVistaLibroThunk, builder);
        buildCommonCases(libroActualizarApiThunk.darLikeLibroThunk, builder);
        buildCommonCases(libroActualizarApiThunk.actualizarLibroThunk, builder);
    }
});

const libroReducer = combineReducers({
    listar: libroListar.reducer,
    crear: libroCrear.reducer,
    borrar: libroBorrar.reducer,
    actualizar: libroActualizar.reducer
});

export default libroReducer;

export const libroApi = {
    libroListarApiThunk,
    libroCrearApiThunk,
    libroBorrarApiThunk,
    ...libroActualizarApiThunk
}