
export interface IInicioPage{
    title: string,
    isAdmin: boolean,
    goToLogin: () => void,
    goToRegister: () => void,
    goToDashboard: () => void, 
    logout: () => void,
    goToPageVerLibro: (libroId: number) => void,
    applyFilters: (filters: Partial<{categoriaId: number, buscarPorTexto: string}>, opts?: {resetFilters: boolean}) => void,
    currentFilters: Partial<{categoriaId: number, buscarPorTexto: string}>,
    auth: {
        isAuth: boolean,
        userData: {
            username: string
        } | null
    },
    categorias: {
        loading: boolean,
        data: {
            id: number,
            nombre: string
        }[]
    },
    libros: {
        loading: boolean,
        data:  {
            id: number,
            titulo: string,
            fecha: string,
            categoria: number,
            categoriaNombre: string,
            autorNombre: string
        }[]
    }
}