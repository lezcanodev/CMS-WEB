import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import { CategoriaBorrarRequest } from './crearCategoria.model';
import ApiBorrarCategoria from './borrarCategoria.api';


const categoriaBorrarApi = new ApiBorrarCategoria();

export const categoriaBorrarApiThunk = createAsyncThunk(
    'gestionCategorias/borrar', baseApiThunk<CategoriaBorrarRequest>( async (registerData) => await categoriaBorrarApi.execute(registerData))
)