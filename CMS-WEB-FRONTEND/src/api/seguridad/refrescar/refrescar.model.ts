
/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface RefrescarRequest{
    refresh: string
}

/**
 * Datos retornados por el backend
 */
export interface RefrescarResponse{
    access: string
}