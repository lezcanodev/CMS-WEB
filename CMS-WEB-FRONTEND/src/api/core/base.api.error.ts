import { BaseResponse } from './base.api.model';


/**
 * Clase para manejar errores de solicitudes API.
 * Extiende la clase `Error` para proporcionar detalles sobre el error específico
 * basado en la estructura de `BaseResponse`.
 */
export class ApiErrorRequest extends Error{

    /**
    * Crea una instancia de `ApiErrorRequest`.
    * 
    * @param error - Un objeto que contiene información sobre el error. Debe
    *   cumplir con la estructura definida en `BaseResponse['error']`.
    */
    constructor(
        private readonly error: BaseResponse<any>['error']
    ){
        super();
    }

    /**
    * Obtiene la información del error.
    * 
    * @returns El objeto de error que contiene detalles específicos del error.
    */
    getError(): BaseResponse<any>['error']{
        return this.error;
    }
}