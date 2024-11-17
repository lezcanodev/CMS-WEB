import { LibroListarData } from '../listar/listarLibro.model';

/**
 * Datos necesarios para hacer una actualización de estado a un libro
 */
export interface LibroActualizarEstadoRequest{
    id: number;
    titulo: string;
    categoria: number;
    estado: string;
    likes?: number;
    vistas?: number;

    // Sirve para identificar la modificación realizada
    estadoAnterior: LibroActualizarEstadoRequest
}
/**
 * Datos retornados por el backend
 */
export interface LibroActualizarEstadoResponse{}


export interface LibroActualizarRequest{
    id: number;
    titulo: string;
    categoria: number;
    estado: string;
    contenido: string;
    nuevaCategoriaNombre: string;

    // Sirve para identificar la modificación realizada
    estadoAnterior: LibroListarData
}
export interface LibroActualizarResponse{}


export interface DarLikeRequest{
    id: number;
    likes?: number;
}

export interface AumentarVisitasRequest{
    id: number;
    vistas?: number;
}

