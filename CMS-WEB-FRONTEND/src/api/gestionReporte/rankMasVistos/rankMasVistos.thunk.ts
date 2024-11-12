import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import ApiReportMasVistos from './rankMasVistos.api';


const listarLibroInstance = new ApiListarLibro();
const instance = new ApiReportMasVistos(listarLibroInstance);

export const reportMasVistosThunk = createAsyncThunk(
    'reportes/ApiReportMasVistos', baseApiThunk<void>( async () => await instance.execute())
)