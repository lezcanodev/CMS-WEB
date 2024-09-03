import Api from '@/api/core/base.api';
import { RegisterRequest, RegisterResponse } from './register.model';


/**
 */
export default class ApiRegistrarse extends Api<RegisterRequest, RegisterResponse>{

    protected async handle(datos: RegisterRequest){
        const response = await this.api.post<RegisterResponse>('user/register/', datos);
        return this.data(response.data);
    }
}