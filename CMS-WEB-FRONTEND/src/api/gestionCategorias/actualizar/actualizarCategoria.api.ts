import Api from '@/api/core/base.api';


/**
 */
export default class ApiActualizarCategoria extends Api<any, any>{

    protected async handle(datos: any){
        const response = await this.api.post<any>('crear-categoria', datos);
        return this.data(response.data);
    }
}

export const apiActualizarCategoria = new ApiActualizarCategoria();