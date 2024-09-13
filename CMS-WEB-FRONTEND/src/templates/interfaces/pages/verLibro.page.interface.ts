export interface IVerLibroPage{
    idLibro: string;
    loading: boolean;
    isEmpty: boolean;
    titulo: string;
    categoria: string;
    fechaPublicacion: string;
    contenido: React.ReactNode;
}