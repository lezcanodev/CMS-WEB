import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { CategoriaListarRequest } from './listartCategoria.model';
import ApiListarCategoria from './listartCategoria.api';

const categoriaListarApi = new ApiListarCategoria();

export const categoriaListarApiThunk = createAsyncThunk(
    'categoria/listar', baseApiThunk<CategoriaListarRequest | undefined>( async () => await categoriaListarApi.execute({}))
)