import Api from '@/api/core/base.api';
import { LikeBorrarRequest, LikeBorrarResponse } from './borrarLike.model';


/**
 * Clase para gestionar el borrado de un like
 */
export default class ApiBorrarLike extends Api<LikeBorrarRequest, LikeBorrarResponse>{
    /**
     * Maneja la eliminación de un like
     * 
     * @param datos - Objeto que contiene la id del usuario a eliminar
     * @returns - Datos de la respuesta de la API
     */
    protected async handle(datos: LikeBorrarRequest){
        const response = await this.api.delete<any>(`borrar-like/${datos.id}`);
        return this.data(response.data);
    }
}
