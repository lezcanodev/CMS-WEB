import Api from '@/api/core/base.api';
import { LibroBorrarRequest, LibroBorrarResponse } from './borrarLibro.model';


/**
 * Clase para gestionar el borrado de una categoría
 */
export default class ApiBorrarLibro extends Api<LibroBorrarRequest, LibroBorrarResponse>{
    /**
     * Maneja la eliminación de una categoría
     * 
     * @param datos - Objeto que contiene la id de la categoría a eliminar
     * @returns - Datos de la respuesta de la API
     */
    protected async handle(datos: LibroBorrarRequest){
        const response = await this.api.delete<any>(`borrar-libro/${datos.id}`);
        return this.data(response.data);
    }
}
