import Api from '@/api/core/base.api';
import { IdActualCrearRequest, IdActualCrearResponse } from './crearIdActual.model';


/**
 * Esta clase se encarga de actualizar el id_actual que quiere realizar un reporte
 */

export default class ApiIdActual extends Api<IdActualCrearRequest, IdActualCrearResponse>{
    
    protected async handle(datos: IdActualCrearRequest){
        /**
         * @param datos.usuarioId id del usuario a generar el reporte
         */

        // realizamos la actualización de la tabla
        const response = await this.api.put<any>(`guardar-id/${datos.usuarioId}`, {});
        return response.data({})
    }
}
