import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApiThunk } from '@/api/core/base.api.thunk';
import ApiRegistrarse from './register.api';
import { RegisterRequest } from './register.model';

/**
 * Creamos una instancia y inyectamos todas las dependencias necesarias
 */
const seguridadApi = new ApiRegistrarse();

/**
 * Se encarga de manejar el estado para la request de ingresar, es decir
 * mantiene un estado para saber si la request esta en curso y cuando finaliza
 * guarda la respuesta en el estado
 */
export const seguridadRegistrarseThunk = createAsyncThunk(
    'seguridad/registrarse', baseApiThunk<RegisterRequest>( async (registerData) => await seguridadApi.execute(registerData))
)