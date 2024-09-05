import Api from '@/api/core/base.api';
import { CategoriaCrearRequest, CategoriaCrearResponse } from './crearCategoria.model';


export default class ApiCrearCategoria extends Api<CategoriaCrearRequest, CategoriaCrearResponse>{

    protected async handle(datos: CategoriaCrearRequest){
        const response = await this.api.post<CategoriaCrearResponse>('crear-categoria', datos);
        return this.data(response.data);
    }
}