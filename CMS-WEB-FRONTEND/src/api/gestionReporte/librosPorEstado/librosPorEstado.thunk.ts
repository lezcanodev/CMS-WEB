import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import ApiReporteLibroPorEstado from './librosPorEstado.api';


const listarLibroInstance = new ApiListarLibro();
const instance = new ApiReporteLibroPorEstado(listarLibroInstance);

export const reporteLibroPorEstadoThunk = createAsyncThunk(
    'reportes/ApiReporteLibroPorEstado', baseApiThunk<void>( async () => await instance.execute())
)