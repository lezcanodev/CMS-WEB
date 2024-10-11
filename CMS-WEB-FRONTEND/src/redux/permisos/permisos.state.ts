export interface BasePermisos{
    puedoAcceder: boolean;
    CREAR: boolean,
    ELIMINAR: boolean,
    EDITAR: boolean,
    PUBLICAR:boolean
}

export interface PermisoPaginas{
    CATEGORIA_PAGINA: BasePermisos
    LIBRO_PAGINA: BasePermisos & { 
        KANBAN_ACCESO: boolean,
        KANBAN_ESTADOS: {
            GUARDADO: { 
                PUEDO_VER: boolean, //  para saber si puede ver ese estado en la tabla
                PUEDO_CAMBIAR: boolean // para saber si puede mover los libros  a este estado
            },
            REVISION: { 
                PUEDO_VER: boolean, //  para saber si puede ver ese estado en la tabla
                PUEDO_CAMBIAR: boolean // para saber si puede mover los libros  a este estado
            },
            RECHAZADO: { 
                PUEDO_VER: boolean, //  para saber si puede ver ese estado en la tabla
                PUEDO_CAMBIAR: boolean // para saber si puede mover los libros  a este estado
            },
            PUBLICADO: { 
                PUEDO_VER: boolean, //  para saber si puede ver ese estado en la tabla
                PUEDO_CAMBIAR: boolean // para saber si puede mover los libros  a este estado
            }
        }
    },
    USUARIO_PAGINA: BasePermisos
}