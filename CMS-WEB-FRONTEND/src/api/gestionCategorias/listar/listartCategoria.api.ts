import Api from '@/api/core/base.api';

/**
 */
export default class ApiListarCategoria extends Api<any, any>{

    protected async handle(){
        const response = await this.api.get<any>('listar-categoria');
        return this.data(response.data);
    }
}

export const apiListarCategoria = new ApiListarCategoria();