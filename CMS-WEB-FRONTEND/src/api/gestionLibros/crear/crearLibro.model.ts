/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroCrearRequest{
    titulo: string;
    categoria: number;
    author: number;
    contenido: string;
    estado:String;
}

/**
 * Datos retornados por el backend
 */
export interface LibroCrearResponse{}
