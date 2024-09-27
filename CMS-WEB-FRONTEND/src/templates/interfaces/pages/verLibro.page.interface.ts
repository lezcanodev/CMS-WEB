export interface IVerLibroPage{
    idLibro: string;
    loading: boolean;
    isEmpty: boolean;
    titulo: string;
    categoria: string;
    autorNombre: string;
    fechaPublicacion: string;
    contenido: React.ReactNode;
}