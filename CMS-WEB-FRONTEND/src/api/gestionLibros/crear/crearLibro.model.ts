/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroCrearRequest{
    titulo: string;
    categoria: number;
    author: number
}

/**
 * Datos retornados por el backend
 */
export interface LibroCrearResponse{}
