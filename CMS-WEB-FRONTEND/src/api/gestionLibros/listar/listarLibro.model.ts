/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroListarRequest{
  id?: number
}

/**
 * Datos retornados por el backend
 */
export type LibroListarResponse = LibroListarData[]

export interface LibroListarData{
    id: number,
    titulo: string,
    fecha: string,
    contenido: string,
    author: number,
    categoria: number,
    categoriaNombre: string,
    autorNombre: string
}