/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface GuardarLikeRequest{
    /**
     * Identificador único del usuario
     */
    user: number,

    /**
     * Identificador del libro asociado
     */
    libro: number
}

/**
 * Datos retornados por el backend
 */
export interface GuardarLikeResponse{}
