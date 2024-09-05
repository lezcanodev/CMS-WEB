/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface CategoriaListarRequest{}

/**
 * Datos retornados por el backend
 */
export type CategoriaListarResponse = CategoriaListarData[]

export interface CategoriaListarData{
    id: number,
    nombre: string;
}