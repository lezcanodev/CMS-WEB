export interface IVerLibroPage{
    idLibro: string;
    titulo: string;
    categoria: string;
    autorNombre: string;
    contenido: React.ReactNode;
    fechaPublicacion: string;
    likes: number,
    visitas: number,
    
    loading: boolean;
    isEmpty: boolean;
    crearComentario: {
        loading: boolean,
        onCrearComentario: (p:{ contenido: string  }) => Promise<{error: string | null}>
    },
    yaDioMeGusta: boolean,
    darMeGusta: () => void,
    cargarVista: () => void,
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