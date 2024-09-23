import Api from '@/api/core/base.api';
import { UsuarioCrearRequest, UsuarioCrearResponse } from './crearUsuario.model';


export default class ApiCrearUsuario extends Api<UsuarioCrearRequest, UsuarioCrearResponse>{

    protected async handle(datos: UsuarioCrearRequest){
        const response = await this.api.post<UsuarioCrearResponse>('crear-usuario', datos);
        return this.data(response.data);
    }
}
