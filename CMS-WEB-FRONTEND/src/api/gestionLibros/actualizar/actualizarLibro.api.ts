import Api from '@/api/core/base.api';
import { AumentarVisitasRequest, DarLikeRequest, LibroActualizarRequest, LibroActualizarResponse } from './actualizarLibro.model';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';
import { UserUtils } from '@/utils/User/User.utils';

/**
 * Esta clase se encarga de actualizar el estado de un libro, por ejemplo
 * de "En revision"  a "Publicado"
 */
export default class ApiActualizarLibroEstado extends Api<LibroActualizarRequest, LibroActualizarResponse>{

    /**
     * Constructor de la clase ApiActualizarLibroEstado
     * @param guardarHistorialLibro dependencia para registrar el cambio de estado del libro
     */
    constructor(
        private guardarHistorialLibro: ApiGuardarHistorialLibro
    ){ super(); }

    /**
     * Actualiza los datos de un libro y guarda el historial de la modificación realizada.
     * 
     * Este método actualiza el libro especificado por su ID, guarda un registro en el historial con la acción de cambio de estado.
     * 
     * @param datos Objeto que contiene los datos del libro a actualizar, incluyendo su estado anterior.
     * @param datos.id El ID del libro que se va a actualizar.
     * @param datos.titulo El título del libro.
     * @param datos.categoria El ID de la categoría del libro.
     * @param datos.estado El nuevo estado del libro.
     * @param datos.estadoAnterior El estado anterior del libro, utilizado para registrar la modificación en el historial.
     * @param datos.likes (opcional) El número de "me gusta" del libro.
     * @param datos.vistas (opcional) El número de vistas del libro.
     */
    protected async handle(datos: LibroActualizarRequest){
        const {id: libroId, estadoAnterior} = datos;

        // los datos que se van actualizar de libro
        const datosActualizados: Partial<LibroActualizarRequest> = {
            categoria: datos.categoria,
            titulo: datos.titulo,
            estado: datos.estado
        }

        // Guardamos esta modificación en el historial de este libro
        await this.guardarHistorialLibro.execute({
            libro: libroId,
            accion: `Estado cambiado de "${estadoAnterior.estado}" a "${datos.estado}"`,
            fecha: new Date().toLocaleDateString(),
            usuario: UserUtils.getUser()!.userId
        })

        // realizamos la actualización de libro
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