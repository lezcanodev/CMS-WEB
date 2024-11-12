import Api from '@/api/core/base.api';
import { ApiReportMasVistosResponse } from './rankMasVistos.model';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

/**
 * Prepara el reporte de libros mas vistos, incluye el total de  vistas,
 * un array que contiene los 3 primeros libros mas vistos ordenados según
 * un podio, es decir [ 2° lugar, 1° lugar, 3° lugar ], y a parte incluye
 * el resto de libros listados de forma descendente por vistas
 * 
 * @example
 * Ejemplo de los datos 
 * ```tsx
 * {
 *     "totalVistas": 33,
 *     "reporte": [
 *         {
 *             "id": 3,
 *             "vistas": 1,
 *             ...
 *         },
 *         {
 *             "id": 6,
 *             "vistas": 1,
 *             ...
 *         },
 *         {
 *             "id": 1,
 *             "titulo": "1",
 *             "vistas": 1,
 *              ...
 *         },
 *         {
 *             "id": 10,
 *             "vistas": 0,
 *              ...
 *         }
 *     ],
 *     "podio": [
 *         {
 *             "id": 15,
 *             "vistas": 7,
 *              ...
 *         },
 *         {
 *             "id": 14,
 *             "vistas": 19,
 *              ...
 *         },
 *         {
 *             "id": 9,
 *             "vistas": 3,
 *              ...
 *         }
 *     ]
 * }
 * ```
 */
export default class ApiReportMasVistos extends Api<void, ApiReportMasVistosResponse>{

    /**
     * Constructor de la clase ApiReportMasVistos
     * @param listarLibro Recibe una instancia de listarLibro
     */
    constructor(
        private listarLibro: ApiListarLibro
    ){
        super();
    }

    /** 
     * Prepara el reporte de libros mas vistos, incluye el total de  vistas,
     * un array que contiene los 3 primeros libros mas vistos ordenados según
     * un podio, es decir [ 2° lugar, 1° lugar, 3° lugar ], y a parte incluye
     * el resto de libros listados de forma descendente por vistas
     * 
     * @returns {Promise<Object>} Objeto con la estructura de datos del reporte de libros:
     *  - `totalVistas`: Sumatoria de todos las vistas de todos los libros 
     *  - `podio`: podio de los 3 libros mas vistos,
     *  - `reporte`: el resto de libros ordenados de forma descendente por vistas
     */
    protected async handle(){
        // Obtenemos los libros
        const libros = (await this.listarLibro.execute({})).data;
        
        // Si  no hay libros retornamos valores por defecto
        if(!libros?.length){
            return this.data({
                podio: [], reporte: [], totalVistas: 0
            })
        }

        // Ordenamos los libros de forma descendente por vistas
        libros.sort((a, b) => (b?.vistas || 0) - (a?.vistas || 0) );

        // Hacemos la sumatoria del total de vistas
        const totalVistas: number = (libros?.reduce((acc, libro) => {
            return libro?.vistas + acc
        }, 0)) ?? 0;

        return this.data({
            totalVistas,
            
            // tomamos las posiciones de la 3° hasta el final
            reporte: libros?.slice(3, libros?.length),

            // toma las 3 primas posiciones y las ordena en forma de podio
            podio: this.generarPodio(libros)
        });
    }

    /**
     * Recibe el listado de libros ya ordenado de forma descendente por vistas y toma
     * los 3 primos elementos y lo posiciona en un array con un orden de "podio", es
     * decir  [ 2° lugar , 1° lugar , 3° lugar ]
     * 
     * @param libros listado de libros
     * @returns ApiReportMasVistosResponse['podio']
     */
    private generarPodio(libros: LibroListarData[]): ApiReportMasVistosResponse['podio']{
        const podio: LibroListarData[] = [];

        const top1 = libros?.[0]; // 1° Lugar
        const top2 = libros?.[1]; // 2° Lugar
        const top3 = libros?.[2]; // 3° Lugar

        if(top2) podio.push(top2);
        if(top1) podio.push(top1);
        if(top3) podio.push(top3);

        return podio;
    }

}
