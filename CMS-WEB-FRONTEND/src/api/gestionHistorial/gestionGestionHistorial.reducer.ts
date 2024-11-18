import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import ApiGuardarHistorialLibro from './guardarHistorial/guardarHistorial.api';
import { guardarHistorialLibroThunk } from './guardarHistorial/guardarHistorial.thunk';
import { listarHistorialLibroThunk } from './listarHistorialLibro/listarHistorialLibro.thunk';
import { ApiListarHistorialLibroResponse } from './listarHistorialLibro/listarHistorialLibro.model';


const guardarHistorialLibroSlice = createSlice({
    name: 'historialGuardarLibroSlice',
    initialState: generateBaseState<BaseResponse<ApiGuardarHistorialLibro>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(guardarHistorialLibroThunk, builder);
    }
});

const listarHistorialLibroSlice = createSlice({
    name: 'listarHistorialLibroSlice',
    initialState: generateBaseState<BaseResponse<ApiListarHistorialLibroResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(listarHistorialLibroThunk, builder);
    }
});


const historialLibroApiReducer = combineReducers({
    guardarHistorialLibro: guardarHistorialLibroSlice.reducer,
    listadoHistorialLibro: listarHistorialLibroSlice.reducer
});

export default historialLibroApiReducer;

export const historialLibroApi = {
    guardarHistorialLibroThunk,
    listarHistorialLibroThunk
}