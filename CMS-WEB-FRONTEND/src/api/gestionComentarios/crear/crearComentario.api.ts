import Api from '@/api/core/base.api';
import { ComentarioCrearRequest, ComentarioCrearResponse } from './crearComentario.model';
import { UserUtils } from '@/utils/User/User.utils';

export default class ApiCrearComentario extends Api<ComentarioCrearRequest, ComentarioCrearResponse>{

    protected async handle(datos: ComentarioCrearRequest){
        let comentarios: any = localStorage.getItem('comentarios');

        if(!comentarios){
            localStorage.setItem('comentarios', JSON.stringify({
                [datos.libroId]: [{
                    ...datos,
                    usuarioNombre: UserUtils.getUser()?.username || '',
                    publicado: new Date().toLocaleDateString()
                }]
            }));
        }else{
            comentarios = JSON.parse(comentarios);
            if(comentarios?.[datos.libroId]){
                comentarios[datos.libroId] = [
                    {
                        ...datos,
                        usuarioNombre: UserUtils.getUser()?.username || '',
                        publicado: new Date().toLocaleDateString()
                    },
                    ...comentarios[datos.libroId]
                ]
            }else{
                comentarios[datos.libroId] = [{
                    ...datos,
                    usuarioNombre: UserUtils.getUser()?.username || '',
                    publicado: new Date().toLocaleDateString()
                }];
            }
            localStorage.setItem('comentarios', JSON.stringify(comentarios));
        }
        //const response = await this.api.post<ComentarioCrearResponse>('crear-comentario', nuevoComentario);
        //return this.data(response.data);

        return this.data({})
    }
}
