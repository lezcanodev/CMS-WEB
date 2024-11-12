/**
 * Este modulo contiene la clase encargada de guardar las modificaciones hechas a un libro
 * 
 * @module ApiGuardarHistorialLibro
 */
import Api from '@/api/core/base.api';
import { 
    ApiGuardarHistorialLibroRequest, 
    ApiGuardarHistorialLibroResponse
} from './guardarHistorial.model';

/** 
*  Esta clase se encarga de guardar una modificación hecha a un libro
* 
* @example
* se le pasa por parámetro los siguientes datos
* ```tsx
*   {
*       "libro": 1, // id del libro
*       "accion": "Estado cambiado de \"En Revision\" a \"Guardado\"", //  descripción de la modificaron hecha
*       "fecha": "11/11/2024", // fecha de la modificacion
*       "usuario": 2 // usuario que lo hizo
*   }
* ```
*/
export default class ApiGuardarHistorialLibro extends Api<ApiGuardarHistorialLibroRequest, ApiGuardarHistorialLibroResponse>{

    /**
     * Prepara el reporte de libros por estado y guarda el historial del libro.
     * Realiza una solicitud para guardar el historial del libro.
     * 
     * @param data Objeto que contiene la información necesaria para guardar el historial del libro.
     * @property {string} data.fecha La fecha de la acción realizada en el historial del libro.
     * @property {number} data.usuario El id del usuario que realiza la acción.
     * @property {number} data.libro El id del libro al que se le guarda el historial.
     * @property {string} data.accion La acción realizada con respecto al libro.
     * 
     * @returns {} retorna un objeto vació
     */
    protected async handle(data: ApiGuardarHistorialLibroRequest){
        await this.api.post(`guardar-historial`, data);
        return this.data({});
    }
}
