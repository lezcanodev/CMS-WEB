/**
 * Este modulo contiene la clase encargada de gestionar la generación del reporte
 * de libros mas gustados
 * 
 * @module ApiReportMasGustados
 */
import Api from '@/api/core/base.api';
import { ApiReportMasGustadosResponse } from './rankMasGustados.model';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

/**
* Prepara el reporte de libros mas gustados, incluye el total de me gustas,
* un array que contiene los 3 primeros libros mas gustados ordenados según
* un podio, es decir [ 2° lugar, 1° lugar, 3° lugar ], y a parte incluye
* el resto de libros listados de forma descendente por likes
* 
* @example
* Ejemplo de los datos 
* ```tsx
* {
*     "totalLikes": 11,
*     "reporte": [
*         {
*             "id": 6,
*             "likes": 1,
*             ...
*         },
*         {
*             "id": 10,
*             "likes": 1,
*             ...
*         },
*         {
*             "id": 16,
*             "likes": 0,
*             ...
*         },
*         {
*             "id": 5,
*             "likes": 0,
*             ...
*         },
*         {
*             "id": 12,
*             "likes": 0,
*             ...
*         },
*     ],
*     "podio": [
*         {
*             "id": 14,
*             "likes": 4,
*             ...
*         },
*         {
*             "id": 15,
*             "likes": 4,
*             ...
*         },
*         {
*             "id": 3,
*             "likes": 1,
*             ...
*         }
*     ]
* }
*```
*/
export default class ApiReportMasGustados extends Api<void, ApiReportMasGustadosResponse>{

    /**
     * Constructor de la clase ApiReportMasGustados
     * @param listarLibro Recibe una instancia de listarLibro
     */
    constructor(
        private listarLibro: ApiListarLibro
    ){
        super();
    }

    /** 
     * Prepara el reporte de libros mas gustados, incluye el total de me gustas,
     * un array que contiene los 3 primeros libros mas gustados ordenados según
     * un podio, es decir [ 2° lugar, 1° lugar, 3° lugar ], y a parte incluye
     * el resto de libros listados de forma descendente por likes
     * 
     * @returns {Promise<Object>} Objeto con la estructura de datos del reporte de libros:
     *  - `totalLikes`: Sumatoria de todos los likes 
     *  - `podio`: podio de los 3 libros mas gustados,
     *  - `reporte`: el resto de libros ordenados de forma descendente por likes
     */
    protected async handle(){
        // Obtenemos los libros
        const libros = (await this.listarLibro.execute({})).data;
        
        // Si  no hay libros retornamos valores por defecto
        if(!libros?.length){
            return this.data({
                podio: [], reporte: [], totalLikes: 0
            })
        }

        // Ordenamos los libros de forma descendente por likes
        libros.sort((a, b) => (b?.likes || 0) - (a?.likes || 0) );

        // Hacemos la sumatoria del total de likes
        const totalLikes: number = (libros?.reduce((acc, libro) => {
            return libro?.likes + acc
        }, 0)) ?? 0;

        return this.data({
            totalLikes,
            
            // tomamos las posiciones de la 3° hasta el final
            reporte: libros?.slice(3, libros?.length),

            // toma las 3 primas posiciones y las ordena en forma de podio
            podio: this.generarPodio(libros)
        });
    }

    /**
     * Recibe el listado de libros ya ordenado de forma descendente por likes y toma
     * los 3 primos elementos y lo posiciona en un array con un orden de "podio", es
     * decir  [ 2° lugar , 1° lugar , 3° lugar ]
     * 
     * @param libros listado de libros
     * @returns ApiReportMasGustadosResponse['podio']
     */
    private generarPodio(libros: LibroListarData[]): ApiReportMasGustadosResponse['podio']{
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
