import { GetThunkAPI } from '@reduxjs/toolkit';
import { BaseResponse } from './base.api.model';

/**
 * Añade la funcionalidad común para manejar solicitudes a la api
 * con redux Thunk (@link https://redux.js.org/usage/writing-logic-thunks#thunk-overview).
 * Ejecuta la función asíncrona requestApi y procesa la respeta manejando los casos
 * de existo y fallo. 
 *
 * @template T - El tipo de dato que recibe la request de la api
 * @param requestApi - La función que realiza la solicitud a la api y retorna `BaseResponse`.
 * @returns Una función thunk que maneja la respuesta y solicitud de la api
 *
 * @example
 * // este ejemplo corresponde a api/gestionReporte/rankMasGustados/rankMasGustados.thunk.ts
 * const listarLibroInstance = new ApiListarLibro();
 * const instance = new ApiReportMasGustados(listarLibroInstance);
 * 
 * export const reportMasGustadosThunk = createAsyncThunk(
 *     'reportes/ApiReportMasGustados', baseApiThunk<void>( async () => await instance.execute())
 * )
 */
export function baseApiThunk<T>(requestApi: (data: T) => Promise<BaseResponse<any>>){
    return async (data: T, thunkApi: GetThunkAPI<any>) => {
        try{
            const response = await requestApi(data);
            // Si ocurre un error eliminamos los atributos data y extraData
            // y solo devolvemos el error
            if(response.error){
                delete response.data;
                delete response.extraData;
                return thunkApi.rejectWithValue(response.error);
            }else{
                // si tuvo exito quitamos el atributo error y solo retornamos los datos
                delete response.error;
                return response;
            }
        }catch(error){
            // Entra aquí en caso de que haya ocurrido un error desconocido
            return thunkApi?.rejectWithValue('Ocurrió un error');
        }
    }
}