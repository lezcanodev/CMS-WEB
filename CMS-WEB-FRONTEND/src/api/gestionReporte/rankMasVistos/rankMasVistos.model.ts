import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

/**
 * Estructura de la respuesta del report de libros mas vistos
 */
export interface ApiReportMasVistosResponse{
    /**
     * Sumatoria de la cantidad de likes de todos los libros
     */
    totalVistas: number

    /**
     * Contiene los libros ordenados de forma descendente por likes,
     * contiene los libros a partir del 4° libro
     */
    reporte: LibroListarData[]

    /**
     * Contiene los 3 primeros libros del listado ordenados según un podio, es decir
     * [ 2° Lugar , 1° lugar , 3° Lugar  ]
     */
    podio: LibroListarData[]
}
