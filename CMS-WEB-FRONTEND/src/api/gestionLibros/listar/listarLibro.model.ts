/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroListarRequest{}

/**
 * Datos retornados por el backend
 */
export type LibroListarResponse = LibroListarData[]

export interface LibroListarData{
    id: number,
    titulo: string,
    fecha: string,
    author: {
      id: number,
      username: string
    },
    categoria: {
      id: number,
      nombre: string
    }
}