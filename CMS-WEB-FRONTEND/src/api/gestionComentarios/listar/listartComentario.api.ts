import Api from '@/api/core/base.api';
import { ComentarioListarRequest, ComentarioListarResponse } from './listartComentario.model';

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

    protected async handle(data: ComentarioListarRequest){
        const r: any = await mockResponse(data.libroId);
        console.log("sdsd= ",{r})
        return this.data(r);

        let comentarios = localStorage.getItem('comentarios') ? JSON.parse(localStorage.getItem('comentarios') || "{}") : null;
        if(!comentarios || !comentarios?.[data.libroId]){
            return this.data({
                comentarios: [],
                paginaActual: 0,
                totalItems: 0,
                totalPaginas: 0
            })
        }
        return this.data({
            comentarios: comentarios?.[data.libroId],
            paginaActual: 1,
            totalItems: comentarios?.[data.libroId]?.length || 0,
            totalPaginas: 10
        })
    }
}
