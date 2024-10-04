export interface IVerLibroPage{
    idLibro: string;
    loading: boolean;
    isEmpty: boolean;
    titulo: string;
    categoria: string;
    autorNombre: string;
    fechaPublicacion: string;
    contenido: React.ReactNode;
    crearComentario: {
        loading: boolean,
        onCrearComentario: (p:{ contenido: string  }) => Promise<{error: string | null}>
    },
    comentarios: {
        loading: boolean,
        totalItems: number,
        items: {
            nombreUsuario: string,
            contenido: string,
            fechaPublicacion: string
        }[]
    }
}