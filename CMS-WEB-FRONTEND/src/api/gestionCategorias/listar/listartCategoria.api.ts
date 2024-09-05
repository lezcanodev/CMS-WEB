import Api from '@/api/core/base.api';
import { CategoriaListarRequest, CategoriaListarResponse } from './listartCategoria.model';


export default class ApiListarCategoria extends Api<CategoriaListarRequest, CategoriaListarResponse[]>{

    protected async handle(){
        const response = await this.api.get<any>('listar-categoria');
        return this.data(response.data);
    }
}
