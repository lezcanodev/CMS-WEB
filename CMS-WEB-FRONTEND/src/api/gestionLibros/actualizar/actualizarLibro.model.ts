/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroActualizarRequest{
    id: number;
    titulo: string;
    categoria: number;
    estado: string;
    likes?: number;
    vistas?: number;
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