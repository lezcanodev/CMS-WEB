import Api from '@/api/core/base.api';
import { ComentarioListarData, ComentarioListarRequest, ComentarioListarResponse } from './listartComentario.model';

const mockResponse = (libroId: number) => new Promise((resolve) => {
    setTimeout(() => {
        let comentarios = localStorage.getItem('comentarios') ? JSON.parse(localStorage.getItem('comentarios') || "{}") : null;
        if(!comentarios || !comentarios?.[libroId]){
            resolve({
                comentarios: [],
                paginaActual: 0,
                totalItems: 0,
                totalPaginas: 0
            })
        }
        resolve({
            comentarios: comentarios?.[libroId],
            paginaActual: 1,
            totalItems: comentarios?.[libroId]?.length || 0,
            totalPaginas: 10
        })
    }, 0);
})

export default class ApiListarComentario extends Api<ComentarioListarRequest, ComentarioListarResponse>{
   
    protected async handle(query: ComentarioListarRequest){
        const queries = this.buildQuery(query);
        const response = await this.api.get<ComentarioListarData[]>(`listar-comentarios${queries}`);
        let comentarios = response.data
        
        if(!comentarios || !comentarios?.[query.libroId]){
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
