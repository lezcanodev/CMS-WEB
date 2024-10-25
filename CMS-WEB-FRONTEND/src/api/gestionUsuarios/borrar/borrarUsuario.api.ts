import Api from '@/api/core/base.api';
import { UsuarioBorrarRequest, UsuarioBorrarResponse } from './borrarUsuario.model';


/**
 * Clase para gestionar el borrado de un Usuario
 */
export default class ApiBorrarUsuario extends Api<UsuarioBorrarRequest, UsuarioBorrarResponse>{
    static execute(registerData: UsuarioBorrarRequest): import("../../core/base.api.model").BaseResponse<any, any> | PromiseLike<import("../../core/base.api.model").BaseResponse<any, any>> {
        throw new Error('Method not implemented.');
    }
    /**
     * Maneja la eliminación de un Usuario
     * 
     * @param datos - Objeto que contiene la id del Usuario a eliminar
     * @returns - Datos de la respuesta de la API
     */
    protected async handle(datos: UsuarioBorrarRequest){
        const response = await this.api.delete<any>(`borrar-usuario/${datos.id}`);
        return this.data(response.data);
    }
}
