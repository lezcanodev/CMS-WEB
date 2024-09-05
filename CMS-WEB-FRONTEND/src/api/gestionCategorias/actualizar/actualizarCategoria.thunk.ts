import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiActualizarCategoria from './actualizarCategoria.api';
import { CategoriaActualizarRequest } from './actualizarCategoria.model';


const categoriaActualizar = new ApiActualizarCategoria();


export const categoriaActualizarApiThunk = createAsyncThunk(
    'categoria/actualizar', baseApiThunk<CategoriaActualizarRequest>( async (newData) => await categoriaActualizar.execute(newData))
)