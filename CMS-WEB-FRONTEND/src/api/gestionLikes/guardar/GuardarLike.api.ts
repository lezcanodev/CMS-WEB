import Api from '@/api/core/base.api';
import { GuardarLikeRequest, GuardarLikeResponse } from './GuardarLike.model';


export default class ApiGuardarLike extends Api<GuardarLikeRequest, GuardarLikeResponse>{

    protected async handle(datos: GuardarLikeRequest){
        // creamos el like
        const response = await this.api.post<GuardarLikeResponse>('guardar-like',datos);
        return this.data(response.data);
    }
}
