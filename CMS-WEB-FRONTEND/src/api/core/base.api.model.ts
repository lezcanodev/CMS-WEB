/**
 * Interfaz base para manejar las diferentes respuesta de la api
 *
 * @template T - Representa la estructura de la respuesta
 */
export interface BaseResponse<DataApi, ExtraData=any>{
    /**
     * Datos retornados por la api, data es opcional y solo
     * esta definido si no ha ocurrido ningún fallo
     */
    data?: DataApi;

    /**
     * Datos extras que no han sido devueltos directamente por la api, extraData es opcional y solo
     * esta definido si no ha ocurrido ningún fallo
     */
    extraData?: ExtraData;

    /**
    * Contiene información acerca del error en caso de que la solicitud falle,
    * este parámetro es opcional
    * 
    * @property {string} general - Un error general ).
    * @property {[field: string]: string} [field] - Error en un campo especifico.
    * 
    * @example
    * // Ejemplo de un error general respuesta 401
    * {
    *   general: "Acceso no autorizado",
    * }
    * // Ejemplo de un error de campo
    * {
    *   username: "El campo es obligatorio",
    *   password: "El campo es obligatorio",
    * }
    */
    error?: {
        httpCode: number
        general?: string;
        [field: string]: string | number | undefined
    }
}