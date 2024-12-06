/**
 * Este modulo contiene clases relacionadas a la actualización de un libro
 * @module Api-Actualizar-Libro
 */
import Api from '@/api/core/base.api';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';
import { 
    AumentarVisitasRequest,
    DarLikeRequest,
    LibroActualizarEstadoRequest,
    LibroActualizarEstadoResponse,
    LibroActualizarRequest,
    LibroActualizarResponse 
} from './actualizarLibro.model';


/**
 * Esta clase se encarga de actualizar el estado de un libro  y registrar en el historial de libro los cambios , por ejemplo
 * de "En revision"  a "Publicado" 
 */
export default class ApiActualizarLibroEstado extends Api<LibroActualizarEstadoRequest, LibroActualizarEstadoResponse>{

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
    protected async handle(datos: LibroActualizarEstadoRequest){
        const {id: libroId, estadoAnterior} = datos;

        // los datos que se van actualizar de libro
        const datosActualizados: Partial<LibroActualizarEstadoRequest> = {
            categoria: datos.categoria,
            titulo: datos.titulo,
            estado: datos.estado
        }

        // Guardamos esta modificación en el historial de este libro
        await this.guardarHistorialLibro.execute({
            libro: libroId,
            accion: `Estado cambiado de "${estadoAnterior.estado}" a "${datos.estado}"`
        })

        // realizamos la actualización de libro
        const response = await this.api.put<LibroActualizarEstadoResponse>(`update-libro/${libroId}`, datosActualizados);
        return this.data(response.data);
    }
}

/**
 * Esta clase se encarga de actualizar los atributos principales de un libro categoría, contenido y titulo,
 * y registrar en el historial de libro los cambios 
 */
export class ApiActualizarLibro extends Api<LibroActualizarRequest, LibroActualizarResponse>{

    /**
     * Constructor de la clase ApiActualizarLibroEstado
     * @param guardarHistorialLibro dependencia para registrar el cambio de estado del libro
     */
    constructor(
        private guardarHistorialLibro: ApiGuardarHistorialLibro
    ){ super(); }

    /**
     */
    protected async handle(datos: LibroActualizarRequest){

        // obtenemos los datos
        const { 
            id: libroId, // id de libro a editar
            estadoAnterior, // estado anterior del libro
            nuevaCategoriaNombre, // nueva categoría nombre
            ...datosActualizados // nuevo estado del libro
        } = datos;

        // mensaje de descripción de lo que se realizo
        let accionRealizada: string = '';

        // verificamos si el titulo ha cambiado y lo registramos
        if(estadoAnterior?.titulo != datos?.titulo){
            accionRealizada =  `Titulo cambiado de "${estadoAnterior?.titulo}" a "${datos.titulo}"`;  
        }

        // verificamos si la categoría ha cambiado y lo registramos
        if(estadoAnterior?.categoria != datos?.categoria){
            // agregamos salto de linea en caso de que haya habado una acciona antes
            if(accionRealizada?.length) accionRealizada+="\\n";


            accionRealizada+=`Categoría cambiada de "${estadoAnterior?.categoriaNombre}" a "${datos.nuevaCategoriaNombre}"`
        }

        // verificamos si el contenido ha cambiado y lo registramos
        if(estadoAnterior?.contenido != datos?.contenido){
            // cantidad de caracteres del contenido en el estado anterior del libro
            const contenidoAnteriorTamano = estadoAnterior?.contenido?.length;  

            // cantidad de caracteres del contenido en el nuevo estado del libro
            const contenidoNuevoTamano = datos?.contenido?.length;

            // diferencia de caracteres entre el nuevo estado y el viejo
            const diferencia = contenidoNuevoTamano - contenidoAnteriorTamano;

            // agregamos salto de linea en caso de que haya habido una accion antes
            if(accionRealizada?.length) accionRealizada+="\\n";

            if(diferencia == 0){
                // si es cero la cantidad de caracteres es la misma, pero no necesariamente el contenido
                accionRealizada+=`Contenido se ha modificado`;
            }else if(diferencia > 0){
                // se agregaron mas caracteres mas contenido
                accionRealizada+=`Contenido se ha modificado, se ha agregado +${diferencia} caracteres`;
            }else{
                // se removieron caracteres menos contenido
                accionRealizada+=`Contenido se ha modificado, se ha removido ${diferencia} caracteres`;
            }
        }

        // guardamos el registro en el historial
        await this.guardarHistorialLibro.execute({
            libro: libroId,
            accion: accionRealizada
        })  

        // realizamos la actualización de libro
        const response = await this.api.put<LibroActualizarEstadoResponse>(`update-libro/${libroId}`, datosActualizados);
        
        // retornamos el nuevo estado del libro
        return this.data(response.data);
    }
}

/**
 * 
 */
export class AumentarCantidadVistaLibro extends Api<AumentarVisitasRequest, LibroActualizarEstadoResponse>{

    protected async handle(datos: AumentarVisitasRequest){
        const { id, vistas } = datos;
        const datosActualizados: Partial<LibroActualizarEstadoRequest> = {
            vistas: vistas ?  vistas + 1 : 1,
        }
        const response = await this.api.put<LibroActualizarEstadoResponse>(`update-libro/${id}`, datosActualizados);
        return this.data(response.data);
    }
}

/**
 * 
 */
export class DarLikeLibro extends Api<DarLikeRequest, LibroActualizarEstadoResponse>{

    protected async handle(datos: DarLikeRequest){
        const { id, likes } = datos;
        const datosActualizados: Partial<LibroActualizarEstadoRequest> = {
            likes: likes ?  likes+1 : 1,
        }
        const response = await this.api.put<LibroActualizarEstadoResponse>(`update-libro/${id}`, datosActualizados);
        return this.data(response.data);
    }
}