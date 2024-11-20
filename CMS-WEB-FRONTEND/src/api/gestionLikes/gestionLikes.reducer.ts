import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { checkLikeApiThunk } from './check/checkLike.thunk';
import { checkLikeResponse } from './check/checkLike.model';
import { GuardarLikeApiThunk } from './guardar/GuardarLike.thunk';
import { likeBorrarApiThunk } from './borrar/borrarLike.thunk';
import { LikeBorrarResponse } from './borrar/borrarLike.model';
import { GuardarLikeResponse } from './guardar/GuardarLike.model';

const checkLike = createSlice({
    name: 'checkLike',
    initialState: generateBaseState<BaseResponse<checkLikeResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(checkLikeApiThunk, builder);
    }
});

const GuardarLike = createSlice({
    name: 'GuardarLike',
    initialState: generateBaseState<BaseResponse<GuardarLikeResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(GuardarLikeApiThunk, builder);
    }
});

const likeBorrar = createSlice({
    name: 'likeBorrar',
    initialState: generateBaseState<BaseResponse<LikeBorrarResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(likeBorrarApiThunk, builder);
    }
});

const likeReducer = combineReducers({
    check: checkLike.reducer,
    crear: GuardarLike.reducer,
    borrar: likeBorrar.reducer
});

export default likeReducer;

export const likeApi = {
    checkLikeApiThunk,
    GuardarLikeApiThunk,
    likeBorrarApiThunk
}