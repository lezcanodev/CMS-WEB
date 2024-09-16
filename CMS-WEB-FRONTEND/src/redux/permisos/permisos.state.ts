export interface BasePermisos{
    puedoAcceder: boolean;
    CREAR: boolean,
    ELIMINAR: boolean,
    EDITAR: boolean
}

export interface PermisoPaginas{
    CATEGORIA_PAGINA: BasePermisos
    LIBRO_PAGINA: BasePermisos,
    USUARIO_PAGINA: BasePermisos
}