import Api from '@/api/core/base.api';
import { UsuarioListarRequest, UsuarioListarResponse } from './listartUsuario.model';


export default class ApiListarUsuario extends Api<UsuarioListarRequest, UsuarioListarResponse>{

    protected async handle(){
        const response = await this.api.get<any>('listar-usuario');
        return this.data(response.data);
    }
}
