import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiIngresar from './ingresar.api';
import { LoginRequest } from './Ingresar.model';
import { localStorageServices } from '@/services';
import { baseApiThunk } from '@/api/core/base.api.thunk';

/**
 * Creamos una instancia y inyectamos todas las dependencias necesarias
 */
const seguridadApi = new ApiIngresar({
    localStorage: localStorageServices
});

/**
 * Se encarga de manejar el estado para la request de ingresar, es decir
 * mantiene un estado para saber si la request esta en curso y cuando finaliza
 * guarda la respuesta en el estado
 */
export const seguridadIngresarThunk = createAsyncThunk(
    'seguridad/ingresar', baseApiThunk<LoginRequest>( async (loginData) => await seguridadApi.execute(loginData))
)