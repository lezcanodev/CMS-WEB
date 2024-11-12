

export interface ApiListarHistorialLibroRequest{
    libroId: number
}

export type ApiListarHistorialLibroResponse = HistorialLibroData[];


type HistorialLibroData = {
    accion: string,
    fecha: string,
    id: number,
    id_libro: string
    usuarioNombre: string
}

