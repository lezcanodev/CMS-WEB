import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { ComentarioListarRequest } from './listartComentario.model';
import ApiListarComentario from './listartComentario.api';

const comentarioListarApi = new ApiListarComentario();

export const comentarioListarApiThunk = createAsyncThunk(
    'comentario/listar', baseApiThunk<ComentarioListarRequest>( async (data) => await comentarioListarApi.execute(data))
)