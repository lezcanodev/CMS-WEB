import { combineSlices } from '@reduxjs/toolkit';
import seguridadReducer from './seguridad/seguridad.reducer';
import categoriaReducer, { categoriaApi } from './gestionCategorias/gestionCategoria.reducer';
import libroReducer, { libroApi } from './gestionLibros/gestionLibros.reducer';

/**
 * Combina todos los slices de los distintos recursos que secuestran
 * en la carpeta api (ej: seguridad), los slices son para manejar
 * el estado de las peticiones al backend
 *
 * @constant {Reducer} apiReducer  para comunicarnos con la api a traves de les paginas
 * @type {Reducer}
 *
 * @property {seguridadReducer} seguridad - Maneja peticiones al backend del recurso seguridad
 */
export const apiReducer = combineSlices({
    seguridad: seguridadReducer,
    categoria: categoriaReducer,
    libro: libroReducer
});


export const api = {
    categoria: categoriaApi,
    libro: libroApi
}