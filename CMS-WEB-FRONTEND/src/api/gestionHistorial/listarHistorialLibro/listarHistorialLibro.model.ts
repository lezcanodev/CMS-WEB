/**
* Contiene la estructura de los datos recibidos y retornados
* por la api
*/

/**
 * Datos para obtener el listado del historial de un libro
 */
export interface ApiListarHistorialLibroRequest{
    /**
     * Id del libro a obtener su historial
     */
    libroId: number
}

/**
 * Son los datos devueltos por la api, es un array de {@link HistorialLibroData}
 */
export type ApiListarHistorialLibroResponse = HistorialLibroData[];

/**
 * Estructura de los datos de las respuesta de la api {@link ApiListarHistorialLibroResponse}
 */
export interface HistorialLibroData{
    /**
     *  Descripción de la acción realizada sobre el libro.
     */
    accion: string,

    /**
     * Fecha en la que se realizó la acción, en formato ISO
     * ejemplo: 2024-11-16T18:25:43.586Z
     */
    fecha: string,

    /**
     * Identificador único del registro del historial
     */
    id: number,

    /**
     * Identificador del libro asociado al historial.
     */
    id_libro: string

    /**
     * Nombre del usuario que realizó la acción.
     */
    usuarioNombre: string
}

