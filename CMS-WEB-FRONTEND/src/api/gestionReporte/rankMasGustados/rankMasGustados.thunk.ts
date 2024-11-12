import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiReportMasGustados from './rankMasGustados.api';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';


const listarLibroInstance = new ApiListarLibro();
const instance = new ApiReportMasGustados(listarLibroInstance);

export const reportMasGustadosThunk = createAsyncThunk(
    'reportes/ApiReportMasGustados', baseApiThunk<void>( async () => await instance.execute())
)