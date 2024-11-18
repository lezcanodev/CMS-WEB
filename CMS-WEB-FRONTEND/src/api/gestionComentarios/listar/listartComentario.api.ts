import Api from '@/api/core/base.api';
import { ComentarioListarData, ComentarioListarRequest, ComentarioListarResponse } from './listartComentario.model';

export default class ApiListarComentario extends Api<ComentarioListarRequest, ComentarioListarResponse>{
   
    protected async handle(query: ComentarioListarRequest){
        const queries = this.buildQuery(query);
        const response = await this.api.get<ComentarioListarData[]>(`listar-comentarios${queries}`);
        let comentarios = response.data
        
        if(!comentarios){
            return this.data({
                comentarios: [],
                paginaActual: 0,
                totalItems: 0,
                totalPaginas: 0
            })
        }

        return this.data({
            comentarios: comentarios,
            paginaActual: 1,
            totalItems: comentarios?.length || 0,
            totalPaginas: 10
        })
    }
}
