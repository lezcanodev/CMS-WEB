import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { IdActualCrearApiThunk } from './crear/crearIdActual.thunk';
import { IdActualCrearResponse } from './crear/crearIdActual.model';


const IdActualCrear = createSlice({
    name: 'IdActualCrear',
    initialState: generateBaseState<BaseResponse<IdActualCrearResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(IdActualCrearApiThunk, builder);
    }
});


const IdActualReducer = combineReducers({
    crearIdActual: IdActualCrear.reducer
})
export default IdActualReducer;

export const IdActualApi = {
    IdActualCrearApiThunk
}