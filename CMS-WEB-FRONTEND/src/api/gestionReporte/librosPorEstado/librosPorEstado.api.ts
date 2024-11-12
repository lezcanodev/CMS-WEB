import Api from '@/api/core/base.api';
import { ApiReporteLibroPorEstadoResponse } from './librosPorEstado.model';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';

/** 
* Esta clase prepara el reporte de libros por estado. Los datos retornados incluyen el total
* de libros y para cada estado, proporciona el color representativo, la cantidad 
* de libros en dicho estado y el porcentaje que representan del total.
* 
* @example
* Ejemplo de los datos 
* ```tsx
* {
*   "totalLibros": 0
*   "cantidadLibrosPorEstado": {
*        'Guardado': { // nombre del estado
*            cantidad: 0, // cantidad de libros en este estado
*            porcentaje: 0, // representación en porcentaje
*            color:"#51a5f9" // color representativo
*        },
*        'En Revision': {
*            cantidad: 0,
*            porcentaje: 0,
*            color:"#ef9433"
*        },
*        'Rechazado': {
*            cantidad: 0,
*            porcentaje: 0,
*            color:"#f12b2b"
*        },
*        'Publicado': {
*            cantidad: 0,
*            porcentaje: 0,
*            color:"#31ba20"
*        }
*   }
* }
* ```
*/
export default class ApiReporteLibroPorEstado extends Api<void, ApiReporteLibroPorEstadoResponse>{

    /**
     * Constructor de la clase ApiReporteLibroPorEstado
     * @param listarLibro Recibe una instancia de listarLibro
     */
    constructor(
        private listarLibro: ApiListarLibro
    ){
        super();
    }

    /**
     * Prepara el reporte de libros por estado
     * 
     * @returns {Promise<Object>} Objeto con la estructura de datos del reporte de libros:
     *  - `totalLibros`: número total de libros.
     *  - `cantidadLibrosPorEstado`: diccionario donde cada clave es un nombre del estado y su valor 
     *    es un objeto con las propiedades `cantidad`, `color`, y `porcentaje` que 
     *    representa ese estado del total de libros.
     */
    protected async handle(){
        // Obtenemos los libros
        const libros = (await this.listarLibro.execute({})).data;

        // Inicializa todos los estados de un libro con su color y cantidad en cero
        let initialCantidadLibrosPorEstado: ApiReporteLibroPorEstadoResponse['cantidadLibrosPorEstado'] = {
            'Guardado': { // nombre del estado, debe coincidir con el nombre que viene de la api
                cantidad: 0,
                porcentaje: 0,
                color:"#51a5f9"
            },
            'En Revision': {
                cantidad: 0,
                porcentaje: 0,
                color:"#ef9433"
            },
            'Rechazado': {
                cantidad: 0,
                porcentaje: 0,
                color:"#f12b2b"
            },
            'Publicado': {
                cantidad: 0,
                porcentaje: 0,
                color:"#31ba20"
            }
        };

        // Si  no hay libros retornamos valores por defecto
        if(!libros?.length){
            return this.data({
                totalLibros: 0, cantidadLibrosPorEstado: initialCantidadLibrosPorEstado
            })
        }

        // total de libros
        const totalLibros = libros?.length;

        // Hacemos el conteo de libros por estado
        libros?.map((libro) => {
            initialCantidadLibrosPorEstado[libro?.estado].cantidad++;
            initialCantidadLibrosPorEstado[libro?.estado].porcentaje = initialCantidadLibrosPorEstado[libro?.estado].cantidad/totalLibros;
        })

        return this.data({
            totalLibros: totalLibros,
            cantidadLibrosPorEstado: initialCantidadLibrosPorEstado
        });
    }
}
