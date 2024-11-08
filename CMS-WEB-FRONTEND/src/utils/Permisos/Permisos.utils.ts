import { BasePermisos,  PermisoPaginas } from '@/redux/permisos/permisos.state';
import { UserUtils } from '../User/User.utils';


export class PermisoUtils{

    public static getPermisosPorPagina(): PermisoPaginas{
        const rol = UserUtils.getUser()?.role || 'Suscriptor';

        // Inicializamos todo los permisos en true
        const defaultPermisos: PermisoPaginas = {
            CATEGORIA_PAGINA: PermisoUtils.all(true),
            REPORTES: PermisoUtils.all(true),
            LIBRO_PAGINA: {...PermisoUtils.all(true), KANBAN_ACCESO: true,
                KANBAN_ESTADOS: {
                    GUARDADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                    REVISION: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                    PUBLICADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                    RECHAZADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true }
                }
            },
            USUARIO_PAGINA: PermisoUtils.all(true)
        } 

        if(rol === 'Administrador'){
            return defaultPermisos;
        }

        defaultPermisos['REPORTES'] = PermisoUtils.all(false);
        defaultPermisos['CATEGORIA_PAGINA'] = PermisoUtils.all(false);
        defaultPermisos['LIBRO_PAGINA'] = {...defaultPermisos['LIBRO_PAGINA'] , ...PermisoUtils.all(false), KANBAN_ACCESO: false};
        defaultPermisos['USUARIO_PAGINA'] = PermisoUtils.all(false);

        if(rol === 'Editor'){
            defaultPermisos['CATEGORIA_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].CREAR = true;
            defaultPermisos['LIBRO_PAGINA'].ELIMINAR = true;
            defaultPermisos['LIBRO_PAGINA'].KANBAN_ACCESO = true;
            defaultPermisos['LIBRO_PAGINA'].KANBAN_ESTADOS = {
                GUARDADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                REVISION: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                PUBLICADO: { PUEDO_CAMBIAR: false, PUEDO_VER: true },
                RECHAZADO: { PUEDO_CAMBIAR: false, PUEDO_VER: true }
            };
        }
        if(rol == 'Publicador'){
            defaultPermisos['CATEGORIA_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].KANBAN_ACCESO = true;
            defaultPermisos['LIBRO_PAGINA'].KANBAN_ESTADOS = {
                GUARDADO: { PUEDO_CAMBIAR: false, PUEDO_VER: false },
                REVISION: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                PUBLICADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true },
                RECHAZADO: { PUEDO_CAMBIAR: true, PUEDO_VER: true }
            };
        }


        return defaultPermisos;
    }


    private static all(value: boolean): BasePermisos{
        return {
            CREAR: value,
            EDITAR: value,
            ELIMINAR: value,
            PUBLICAR: value,
            puedoAcceder: value
        }
    }

}