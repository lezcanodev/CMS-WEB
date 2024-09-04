import Api from '@/api/core/base.api';


/**
 */
export default class ApiBorrarCategoria extends Api<any, any>{

    protected async handle(datos: any){
        const response = await this.api.delete<any>('borrar-categoria', datos);
        return this.data(response.data);
    }
}

export const apiBorrarCategoria = new ApiBorrarCategoria();