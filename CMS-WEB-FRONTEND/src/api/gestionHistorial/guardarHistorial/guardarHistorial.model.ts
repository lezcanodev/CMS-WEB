/**
 * Contiene la estructura de los datos recibidos y retornados
 * por la api
 */

/**
 * Datos para guardar el historial de un libro
 */
export interface ApiGuardarHistorialLibroRequest{
    /**
     *  id del libro afectado
     */
    libro: number,
    
    /** 
     * descripción de la acción realizada 
     **/
    accion: string,
    
    /** 
     * Fecha que se realizo la acción, es opcional y por defecto
     * se usara el momento actual en el que se realizo.
     * 
     * Debe tener el formato ISO, ejemplo: 2024-11-16T18:25:43.586Z
     * */

    fecha?: string,
    
    /** 
     * Id del usuario que realizo la acción, es opcional y por defecto
     * tendrá el usuario actual
     */
    usuario?: number,
}

/**
 * Datos retornados luego de realizar el guardado correctamente
 */
export interface ApiGuardarHistorialLibroResponse{
    /**
     * Id del nuevo registro histórico del libro
     */
    id: number
}
