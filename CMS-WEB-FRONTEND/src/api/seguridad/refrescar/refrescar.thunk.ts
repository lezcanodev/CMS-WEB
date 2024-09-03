import { createAsyncThunk } from '@reduxjs/toolkit';
import { localStorageServices } from '@/services';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiRefrescar from './refrescar.api';

/**
 * Creamos una instancia y inyectamos todas las dependencias necesarias
 */
const seguridadApi = new ApiRefrescar({
    localStorage: localStorageServices
});

export const seguridadRefrescarThunk = createAsyncThunk(
    'seguridad/refrescar', baseApiThunk<any>( async () => await seguridadApi.execute())
)