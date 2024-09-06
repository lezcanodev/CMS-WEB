import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { LibroListarRequest } from './listarLibro.model';
import ApiListarLibro from './listartLibro.api';

const libroListarApi = new ApiListarLibro();

export const libroListarApiThunk = createAsyncThunk(
    'libro/listar', baseApiThunk<LibroListarRequest | undefined>( async () => await libroListarApi.execute({}))
)