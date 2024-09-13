/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroActualizarRequest{
    id: number;
    titulo: string;
    categoria: number;
}

/**
 * Datos retornados por el backend
 */
export interface LibroActualizarResponse{}