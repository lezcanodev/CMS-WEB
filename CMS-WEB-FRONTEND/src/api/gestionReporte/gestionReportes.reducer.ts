import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { buildCommonCases,  generateBaseState } from '@/redux/base.slice';
import { BaseResponse } from '../core/base.api.model';
import { ApiReportMasGustadosResponse } from './rankMasGustados/rankMasGustados.model';
import { reportMasGustadosThunk } from './rankMasGustados/rankMasGustados.thunk';
import { reportMasVistosThunk } from './rankMasVistos/rankMasVistos.thunk';
import { ApiReportMasVistosResponse } from './rankMasVistos/rankMasVistos.model';
import { reporteLibroPorEstadoThunk } from './librosPorEstado/librosPorEstado.thunk';
import { ApiReporteLibroPorEstadoResponse } from './librosPorEstado/librosPorEstado.model';

const reportMasGustadosSlice = createSlice({
    name: 'reportMasGustados',
    initialState: generateBaseState<BaseResponse<ApiReportMasGustadosResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(reportMasGustadosThunk, builder);
    }
});

const reportMasVistosSlice = createSlice({
    name: 'reportMasVistosSlice',
    initialState: generateBaseState<BaseResponse<ApiReportMasVistosResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(reportMasVistosThunk, builder);
    }
});

const reporteLibroPorEstadoSlice = createSlice({
    name: 'reporteLibroPorEstadoSlice',
    initialState: generateBaseState<BaseResponse<ApiReporteLibroPorEstadoResponse>>(),
    reducers: {},
    extraReducers: (builder) => {
        buildCommonCases(reporteLibroPorEstadoThunk, builder);
    }
});

const reporteReducer = combineReducers({
    reporteMasGustado: reportMasGustadosSlice.reducer,
    reportMasVistos: reportMasVistosSlice.reducer,
    reporteLibroPorEstado: reporteLibroPorEstadoSlice.reducer
});

export default reporteReducer;

export const reporteApi = {
    reportMasGustadosThunk,
    reportMasVistosThunk,
    reporteLibroPorEstadoThunk
}