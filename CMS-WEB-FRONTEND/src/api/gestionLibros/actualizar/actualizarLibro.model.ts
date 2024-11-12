/**
 * Datos necesarios para hacer una actualización de estado a un libro
 */
export interface LibroActualizarRequest{
    id: number;
    titulo: string;
    categoria: number;
    estado: string;
    likes?: number;
    vistas?: number;

    // Sirve para identificar la modificación realizada
    estadoAnterior: LibroActualizarRequest
}

export interface DarLikeRequest{
    id: number;
    likes?: number;
}

export interface AumentarVisitasRequest{
    id: number;
    vistas?: number;
}

/**
 * Datos retornados por el backend
 */
export interface LibroActualizarResponse{}