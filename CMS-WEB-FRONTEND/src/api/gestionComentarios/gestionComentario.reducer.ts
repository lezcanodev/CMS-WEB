import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { comentarioCrearApiThunk } from './crear/crearComentario.thunk';
import { ComentarioCrearResponse } from './crear/crearComentario.model';
import { comentarioListarApiThunk } from './listar/listartComentario';
import { ComentarioListarResponse } from './listar/listartComentario.model';


const comentarioCrear = createSlice({
    name: 'comentarioCrear',
    initialState: generateBaseState<BaseResponse<ComentarioCrearResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(comentarioCrearApiThunk, builder);
    }
});

const comentarioListar = createSlice({
    name: 'comentarioListar',
    initialState: generateBaseState<BaseResponse<ComentarioListarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(comentarioListarApiThunk, builder);
    }
});


const comentarioReducer = combineReducers({
    crearComentario: comentarioCrear.reducer,
    listarComentario: comentarioListar.reducer
})
export default comentarioReducer;

export const comentarioApi = {
    comentarioCrearApiThunk,
    comentarioListarApiThunk
}