import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiListarHistorialLibro from './listarHistorialLibro.api';
import { ApiListarHistorialLibroRequest } from './listarHistorialLibro.model';


const instance = new ApiListarHistorialLibro();

export const listarHistorialLibroThunk = createAsyncThunk(
    'historialLibro/ApiListarHistorialLibro', baseApiThunk<ApiListarHistorialLibroRequest>( async (data) => await instance.execute(data))
)