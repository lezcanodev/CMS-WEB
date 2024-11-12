import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';


export interface ApiGuardarHistorialLibroRequest{
    fecha: string,
    usuario: number,
    libro: number,
    accion: string
}

export interface ApiGuardarHistorialLibroResponse{}
