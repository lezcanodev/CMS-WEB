import { combineSlices } from '@reduxjs/toolkit';
import seguridadReducer from './seguridad/seguridad.reducer';

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
    seguridad: seguridadReducer
});