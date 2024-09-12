/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroCrearRequest{
    titulo: string;
    categoria: number;
    author: number;
    contenido: string;
}

/**
 * Datos retornados por el backend
 */
export interface LibroCrearResponse{}
