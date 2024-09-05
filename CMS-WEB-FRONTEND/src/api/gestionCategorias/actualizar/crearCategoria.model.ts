/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface CategoriaRequest{
    nombre: string;
}

/**
 * Datos retornados por el backend
 */
export interface CategoriaResponse{
    token: string,
    refresh: string;
}