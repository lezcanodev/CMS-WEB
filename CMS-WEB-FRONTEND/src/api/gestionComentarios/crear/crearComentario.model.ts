/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface ComentarioCrearRequest{
    usuarioId: number;
    libroId: number;
    contenido: string;
}

/**
 * Datos retornados por el backend
 */
export interface ComentarioCrearResponse{}
