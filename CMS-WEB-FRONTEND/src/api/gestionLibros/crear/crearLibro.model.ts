/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LibroCrearRequest{
    titulo: string;
    categoria: number;
    author: number;
    contenido: string;
    estado:string;
}

/**
 * Datos retornados por el backend
 */
export interface LibroCrearResponse{
    id: number,
    titulo: string,
    fecha: string,
    author: number,
    likes: number,
    vistas: number,
    categoria: number,
    estado: string,
    contenido: string,
    categoriaNombre: string,
    autorNombre: string
}
