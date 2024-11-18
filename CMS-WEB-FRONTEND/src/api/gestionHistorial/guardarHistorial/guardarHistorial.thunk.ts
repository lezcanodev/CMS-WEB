import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiGuardarHistorialLibro from './guardarHistorial.api';
import { ApiGuardarHistorialLibroRequest } from './guardarHistorial.model';



const instance = new ApiGuardarHistorialLibro();

export const guardarHistorialLibroThunk = createAsyncThunk(
    'historial/ApiGuardarHistorialLibro', baseApiThunk<ApiGuardarHistorialLibroRequest>( async (data) => await instance.execute(data))
)