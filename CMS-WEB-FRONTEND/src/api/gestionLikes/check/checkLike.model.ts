/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface checkLikeRequest{
    /**
   * Identificador único del usuario
   */
    id_user: number,

    /**
     * Identificador del libro asociado
     */
    id_libro: number
}

/**
 * Datos retornados por el backend
 */
export interface checkLikeResponse {
    isLike: boolean
}