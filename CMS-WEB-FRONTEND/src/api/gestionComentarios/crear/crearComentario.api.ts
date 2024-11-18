import Api from '@/api/core/base.api';
import { ComentarioCrearRequest, ComentarioCrearResponse } from './crearComentario.model';
import { UserUtils } from '@/utils/User/User.utils';
import { localStorageServices } from '@/services';

export default class ApiCrearComentario extends Api<ComentarioCrearRequest, ComentarioCrearResponse>{

    protected async handle(datos: ComentarioCrearRequest){
        let comentarios: any = localStorage.getItem('comentarios');
        
        const response = await this.api.post<any>('guardar-comentario', {
            user: JSON.parse(localStorageServices.get('user') as any).userId as any,
            contenido: (datos.contenido as any).contenido,
            id_libro: parseInt(datos.libroId.toString()),
            fecha: new Date().toLocaleDateString()
        });

        return this.data({})
    }
}
