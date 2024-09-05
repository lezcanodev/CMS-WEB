import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { CategoriaBorrarResponse } from './borrar/crearCategoria.model';
import { categoriaBorrarApiThunk } from './borrar/crearCategoria.thunk';
import { CategoriaCrearResponse } from './crear/crearCategoria.model';
import { categoriaCrearApiThunk } from './crear/crearCategoria.thunk';
import { CategoriaListarResponse } from './listar/listartCategoria.model';
import { categoriaListarApiThunk } from './listar/listartCategoria.thunk';
import { CategoriaActualizarResponse } from './actualizar/actualizarCategoria.model';
import { categoriaActualizarApiThunk } from './actualizar/actualizarCategoria.thunk';


const categoriaBorrar = createSlice({
    name: 'categoriaBorrar',
    initialState: generateBaseState<BaseResponse<CategoriaBorrarResponse, void>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(categoriaBorrarApiThunk, builder);
    }
});

const categoriaCrear = createSlice({
    name: 'categoriaCrear',
    initialState: generateBaseState<BaseResponse<CategoriaCrearResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(categoriaCrearApiThunk, builder);
    }
});

const categoriaListar = createSlice({
    name: 'categoriaListar',
    initialState: generateBaseState<BaseResponse<CategoriaListarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(categoriaListarApiThunk, builder);
    }
});

const categoriaActualizar = createSlice({
    name: 'categoriaActualizar',
    initialState: generateBaseState<BaseResponse<CategoriaActualizarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(categoriaActualizarApiThunk, builder);
    }
});

const categoriaReducer = combineReducers({
    listar: categoriaListar.reducer, 
    borrar: categoriaBorrar.reducer,
    crear: categoriaCrear.reducer,
    actualizar: categoriaActualizar.reducer
});

export default categoriaReducer;

export const categoriaApi = {
    categoriaBorrarApiThunk,
    categoriaListarApiThunk,
    categoriaCrearApiThunk,
    categoriaActualizarApiThunk
}