
/**
 * Contiene la clase encargada de guardar el historial de un libro
 *
 * @packageDocumentation GestionHistorial
 */
import Api from '@/api/core/base.api';
import { 
    ApiGuardarHistorialLibroRequest, 
    ApiGuardarHistorialLibroResponse
} from './guardarHistorial.model';
import { UserUtils } from '@/utils/User/User.utils';

/** 
*  Esta clase se encarga de guardar una modificación hecha a un libro
* 
* @example
* Ejemplo de uso:
* ```tsx
*    // Creamos una instancia del caso de uso 
*    const instancia = new ApiGuardarHistorialLibro();
* 
*    // Ejecutamos el método que realizara el guardado
*    instancia.execute(
*       {
*          // id del libro afectado
*         "libro": 1,
*          
*         //  descripción de la modificaron hecha  
*         "accion": "Estado cambiado de \"En Revision\" a \"Guardado\"",
*   
*         // Tiempo en el que se hizo la modificación 
*         // Debe tener el formato ISO
*         // Es opcional, por defecto sera fecha actual
*         "fecha": "2024-11-16T18:25:43.586Z",
* 
*         // id del usuario que lo realizo 
*         // Es opcional, por defecto usuario actual
*         "usuario": 2
*       }
*   )
* ```
*/
export default class ApiGuardarHistorialLibro extends Api<ApiGuardarHistorialLibroRequest, ApiGuardarHistorialLibroResponse>{

    /**
     * Se encarga de guardar la acción realizada sobre un libro
     * 
     * @param data - Objeto que contiene la información necesaria para guardar en el historial del libro.
     * 
     * @returns retorna el ID del nuevo registro
     */
    protected async handle(data: ApiGuardarHistorialLibroRequest){
      
        // preparamos los datos asignándole los valores por defecto
        const datos = {
            fecha: new Date().toISOString(),
            usuario: UserUtils.getUser()!.userId,
            ...data
        }

        // realizamos la solicitud para guardar historial
        const response = await this.api.post(`guardar-historial`, datos);

        // retornamos los datos
        return this.data({
            id: response?.data?.id
        });
    }

}
