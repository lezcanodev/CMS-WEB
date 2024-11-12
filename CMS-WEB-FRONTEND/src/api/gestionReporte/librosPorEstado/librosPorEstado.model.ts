import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';

/**
 * Estructura de la respuesta del reporte de libros por estado
 */
export interface ApiReporteLibroPorEstadoResponse{
    /**
     * Sumatoria de la cantidad de likes de todos los libros
     */
    totalLibros: number

    /**
     * Es un diccionario que mapea el nombre del estado de un libro con un objeto
     * que tiene la cantidad de libros que pertenecen a ese estado y el color
     * que se usara para representar ese libro
     * 
     * 
     * @property {Object} cantidadLibrosPorEstado - Objeto de tipo diccionario donde
     * cada clave es el nombre del estado del libro y el valor es un objeto con 
     * propiedades de cantidad, color y porcentaje.
     * @property {number} cantidadLibrosPorEstado.cantidad - Cantidad de libros que 
     * están en el estado específico.
     * @property {string} cantidadLibrosPorEstado.color - Color representativo para 
     * el estado de los libros.
     * @property {number} cantidadLibrosPorEstado.porcentaje - Porcentaje de libros 
     * que están en ese estado.
     */
    cantidadLibrosPorEstado: {
        [nombreEstado: string]: {
            cantidad: number, 
            color: string,
            porcentaje: number
        }
    }
}
