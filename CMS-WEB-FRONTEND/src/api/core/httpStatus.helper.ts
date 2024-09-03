import { BaseResponse } from './base.api.model';

/**
 * Clase encargada de proporcionas los mensajes comunes a respuestas HTTP
 */
export class HttpStatusCode{

    /**
    * Devuelve una respuesta de error basada en el código de estado HTTP proporcionado.
    * 
    * @param httpCode - El código de estado HTTP para el que se debe generar una respuesta de error.
    * @returns Un objeto de error que sigue la estructura definida en `BaseResponse<any>['error']`.
    */
    public static responseTo(httpCode: number): BaseResponse<any>['error']{
        const response: {[code: number]: () => BaseResponse<any>['error'] } = {
            400: HttpStatusCode.BadRequest,
            401: HttpStatusCode.Unauthorized,
            500: HttpStatusCode.InternalServerError
        };

        return response?.[httpCode]() || HttpStatusCode.InternalServerError();
    }

    /**
    * Genera una respuesta de error para el código de estado HTTP 401 (No autorizado).
    * 
    * @param msg - Mensaje de error personalizado. Si no se proporciona, se usa el mensaje por defecto.
    * @returns Un objeto de error que sigue la estructura definida en `BaseResponse<any>['error']`.
    */
    public static Unauthorized(msg?: string): BaseResponse<any>['error']{
        return {
            httpCode: 401,
            general: msg || 'No tienes accesos a este recurso'
        };
    }

    /**
    * Genera una respuesta de error para el código de estado HTTP 400 (Bad request).
    * 
    * @param fieldsError - mapea el campo con su mensaje de error
    * @returns Un objeto de error que sigue la estructura definida en `BaseResponse<any>['error']`.
    */
    public static BadRequest(fieldsError?: {[field: string]: string}): BaseResponse<any>['error']{
        let response: BaseResponse<any>['error'] = {
            httpCode: 401,
            ...fieldsError
        };
        if(!fieldsError){
            response.general = 'Los datos son inválidos';
        }
        return response;
    }

    /**
    * Genera una respuesta de error para el código de estado HTTP 500 (Error interno del servidor).
    * 
    * @param msg - Mensaje de error personalizado. Si no se proporciona, se usa el mensaje por defecto.
    * @returns Un objeto de error que sigue la estructura definida en `BaseResponse<any>['error']`.
    */
    public static InternalServerError(msg?: string): BaseResponse<any>['error']{
        return {
            httpCode: 500,
            general: msg || 'Ocurrió un error, inténtalo mas tarde'
        };
    }
}