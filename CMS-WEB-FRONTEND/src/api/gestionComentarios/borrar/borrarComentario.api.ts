import Api from '@/api/core/base.api';
import { ComentarioBorrarRequest, ComentarioBorrarResponse } from './borrarComentario.model';


/**
 * Clase para gestionar el borrado de una comentario
 */
export default class ApiBorrarComentario extends Api<ComentarioBorrarRequest, ComentarioBorrarResponse>{
    /**
     * Maneja la eliminación de un comentario
     * 
     * @param datos - Objeto que contiene la id del comentario a eliminar
     * @returns - Datos de la respuesta de la API
     */
    protected async handle(datos: ComentarioBorrarRequest){
        const response = await this.api.delete<any>(`borrar-comentario/${datos.id}`);
        return this.data(response.data);
    }
}
