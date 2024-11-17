/**
 * Este modulo contiene la clase para obtener el listado de modificaciones o historial de un
 * libro
 * @packageDocumentation GestionHistorial
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
* Ejemplo de uso
* ```tsx
*   const instance = new ApiListarHistorialLibro();
*   const { data: historial } = instance.execute({
*      // El id del libro que queremos recuperar su historial 
*      libroId: 1
*   })
*   
*   // historial contiene un array de los cambios, ejemplo:
*   // [
*   //     {
*   //         "id": 1,
*   //         "fecha": "12/11/2024",
*   //         "accion": "Nombre de la modificacion",
*   //         "usuarioNombre": "admin2",
*   //         "id_libro": "1"
*   //     }
*   // ]
*```
*/
export default class ApiListarHistorialLibro extends Api<ApiListarHistorialLibroRequest, ApiListarHistorialLibroResponse>{

    /**
     * Obtiene el historial de un libro y lo ordena de forma descendente por fecha.
     * 
     * @param data Objeto que contiene el id del libro.
     * 
     * @returns devuelve un array con todas las modificaciones hechas al libro
     */
    protected async handle(data: ApiListarHistorialLibroRequest){
        const { libroId } = data;

        // Hacemos la solicitud y obtenemos el historial del libro
        const response =  await this.api.get(`listar-historial?libro=${libroId}`);
        let historial: ApiListarHistorialLibroResponse = response.data;

        // Ordenamos de forma decreciente por fecha
        historial.sort((x1, x2) => new Date(x2.fecha).getTime() - new Date(x1.fecha).getTime())

        // Adaptamos la fecha que se encuentra en ISO a una mas legible para el usuario
        historial = historial.map(libro => {
            return {
                ...libro,
                fecha: new Date(libro.fecha).toLocaleDateString()
            }
        });

        return this.data(historial);
    }

}
