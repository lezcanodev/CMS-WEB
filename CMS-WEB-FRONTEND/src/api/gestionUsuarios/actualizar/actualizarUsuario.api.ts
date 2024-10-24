import Api from '@/api/core/base.api';
import { UsuarioActualizarRequest, UsuarioActualizarResponse } from './actualizarUsuario.model';
import { Password } from '@mui/icons-material';


export default class ApiActualizarUsuario extends Api<UsuarioActualizarRequest, UsuarioActualizarResponse>{

    //Datos enviamos al backend
    protected async handle(datos: UsuarioActualizarRequest){
        const User_id = datos.id;
        const datosActualizados = {
            username: datos.username,
            role: datos.role
        }
        const response = await this.api.put<UsuarioActualizarResponse>(`update-usuario/${User_id}`, datosActualizados);
        return this.data(response.data);
    }
}
