import Api from '@/api/core/base.api';
import { CategoriaActualizarRequest, CategoriaActualizarResponse } from './actualizarCategoria.model';


export default class ApiActualizarCategoria extends Api<CategoriaActualizarRequest, CategoriaActualizarResponse>{

    protected async handle(datos: CategoriaActualizarRequest){
        const categoryId = datos.id;
        const datosActualizados = {
            nombre: datos.nombre
        }
        const response = await this.api.put<CategoriaActualizarResponse>(`update-categoria/${categoryId}`, datosActualizados);
        return this.data(response.data);
    }
}
