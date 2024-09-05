import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { CategoriaCrearRequest } from './crearCategoria.model';
import ApiCrearCategoria from './crearCategoria.api';


const categoriaCrear = new ApiCrearCategoria();


export const categoriaCrearApiThunk = createAsyncThunk(
    'categoria/crear', baseApiThunk<CategoriaCrearRequest>( async (registerData) => await categoriaCrear.execute(registerData))
)