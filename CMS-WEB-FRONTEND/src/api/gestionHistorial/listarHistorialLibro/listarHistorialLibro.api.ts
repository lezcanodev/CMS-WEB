/**
 * Este modulo contiene la clase para obtener el listado de modificaciones o historial de un
 * libro
 * @module ApiListarHistorialLibro
 */
import Api from '@/api/core/base.api';
import { 
    ApiListarHistorialLibroRequest,
    ApiListarHistorialLibroResponse
 } from './listarHistorialLibro.model';

/**
* Se encarga de consultar a la api acerca del listado de historial o modificaciones de un libro,
* devolviendo un array con todas las modificaciones ordenadas de forma descendente por fecha de modificación.
* 
* @example
* Ejemplo de los datos devueltos
* ```tsx
* [
*     {
*         "id": 1,
*         "fecha": "12/11/2024",
*         "accion": "Nombre de la modificacion",
*         "usuarioNombre": "admin2",
*         "id_libro": "1"
*     }
* ]
*```
*/
export default class ApiListarHistorialLibro extends Api<ApiListarHistorialLibroRequest, ApiListarHistorialLibroResponse>{

    /**
     * Obtiene el historial de un libro y lo ordena de forma descendente por fecha.
     * 
     * @param data Objeto que contiene el id del libro.
     * @property {number} data.libroId El id del libro cuyo historial se desea obtener.
     * @returns {Array} El historial del libro ordenado de manera descendente por fecha.
     */
    protected async handle(data: ApiListarHistorialLibroRequest){
        const { libroId } = data;

        // Hacemos la solicitud y obtenemos el historial del libro
        const response =  await this.api.get(`listar-historial?libro=${libroId}`);
        const historial: ApiListarHistorialLibroResponse = response.data;

        // Ordenamos de forma decreciente por fecha
        historial.sort((x1, x2) => new Date(x2.fecha).getTime() - new Date(x1.fecha).getTime())

        return this.data(historial);
    }

}
