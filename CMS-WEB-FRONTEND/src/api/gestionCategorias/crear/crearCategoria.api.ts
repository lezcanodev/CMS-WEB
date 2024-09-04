import Api from '@/api/core/base.api';
import { CategoriaRequest, CategoriaResponse } from './crearCategoria.model';


/**
 */
export default class ApiCrearCategoria extends Api<CategoriaRequest, CategoriaResponse>{

    protected async handle(datos: CategoriaRequest){
        const response = await this.api.post<CategoriaResponse>('crear-categoria', datos);
        return this.data(response.data);
    }
}

export const apiCrearCategoria = new ApiCrearCategoria();