import { combineSlices } from '@reduxjs/toolkit';
import seguridadReducer from './seguridad/seguridad.reducer';
import categoriaReducer, { categoriaApi } from './gestionCategorias/gestionCategoria.reducer';
import libroReducer, { libroApi } from './gestionLibros/gestionLibros.reducer';
import usuarioReducer, { usuarioApi } from './gestionUsuarios/gestionUsuario.reducer';
import comentarioReducer, { comentarioApi } from './gestionComentarios/gestionComentario.reducer';

/**
 * Combina todos los slices {@link https://redux-toolkit.js.org/api/createSlice} de los distintos recursos que se encuentran
 * en la carpeta api (ej: seguridad), los slices son para manejar
 * el estado de las peticiones al backend
 * 
 * @privateRemarks
 */
export const apiReducer = combineSlices({
    seguridad: seguridadReducer,
    categoria: categoriaReducer,
    libro: libroReducer,
    usuario: usuarioReducer,
    comentario: comentarioReducer
});


/**
 * Combina todos los recursos de las api dentro del objeto api, estos son los que 
 * iniciaran la solicitud 
 * 
 * @privateRemarks
 */
export const api = {
    categoria: categoriaApi,
    libro: libroApi,
    usuario: usuarioApi,
    comentario: comentarioApi
}