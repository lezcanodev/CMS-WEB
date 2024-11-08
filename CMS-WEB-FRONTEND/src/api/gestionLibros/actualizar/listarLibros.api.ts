import Api from '@/api/core/base.api';
import { AumentarVisitasRequest, DarLikeRequest, LibroActualizarRequest, LibroActualizarResponse } from './actualizarLibro.model';


export default class ApiActualizarLibro extends Api<LibroActualizarRequest, LibroActualizarResponse>{

    protected async handle(datos: LibroActualizarRequest){
        const {id: libroId} = datos;
        const datosActualizados: Partial<LibroActualizarRequest> = {
            categoria: datos.categoria,
            titulo: datos.titulo,
            estado: datos.estado
        }
        const response = await this.api.put<LibroActualizarResponse>(`update-libro/${libroId}`, datosActualizados);
        return this.data(response.data);
    }
}


export class AumentarCantidadVistaLibro extends Api<AumentarVisitasRequest, LibroActualizarResponse>{

    protected async handle(datos: AumentarVisitasRequest){
        const { id, vistas } = datos;
        const datosActualizados: Partial<LibroActualizarRequest> = {
            vistas: vistas ?  vistas + 1 : 1,
        }
        const response = await this.api.put<LibroActualizarResponse>(`update-libro/${id}`, datosActualizados);
        return this.data(response.data);
    }
}

export class DarLikeLibro extends Api<DarLikeRequest, LibroActualizarResponse>{

    protected async handle(datos: DarLikeRequest){
        const { id, likes } = datos;
        const datosActualizados: Partial<LibroActualizarRequest> = {
            likes: likes ?  likes+1 : 1,
        }
        const response = await this.api.put<LibroActualizarResponse>(`update-libro/${id}`, datosActualizados);
        return this.data(response.data);
    }
}