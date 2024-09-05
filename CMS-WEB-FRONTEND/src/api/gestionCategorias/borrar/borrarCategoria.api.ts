import Api from '@/api/core/base.api';
import { CategoriaBorrarRequest, CategoriaBorrarResponse } from './crearCategoria.model';


/**
 * Clase para gestionar el borrado de una categoría
 */
export default class ApiBorrarCategoria extends Api<CategoriaBorrarRequest, CategoriaBorrarResponse>{
    /**
     * Maneja la eliminación de una categoría
     * 
     * @param datos - Objeto que contiene la id de la categoría a eliminar
     * @returns - Datos de la respuesta de la API
     */
    protected async handle(datos: CategoriaBorrarRequest){
        const response = await this.api.delete<any>(`borrar-categoria/${datos.id}`);
        return this.data(response.data);
    }
}