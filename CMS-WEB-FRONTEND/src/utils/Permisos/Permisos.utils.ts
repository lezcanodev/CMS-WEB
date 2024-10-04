import { BasePermisos,  PermisoPaginas } from '@/redux/permisos/permisos.state';
import { UserUtils } from '../User/User.utils';


export class PermisoUtils{

    public static getPermisosPorPagina(): PermisoPaginas{
        const rol = UserUtils.getUser()?.role || 'Suscriptor';

        // Inicializamos todo los permisos en true
        const defaultPermisos: PermisoPaginas = {
            CATEGORIA_PAGINA: PermisoUtils.all(true),
            LIBRO_PAGINA: {...PermisoUtils.all(true), KANBAN_ACCESO: true},
            USUARIO_PAGINA: PermisoUtils.all(true)
        } 

        if(rol === 'Administrador'){
            return defaultPermisos;
        }

        defaultPermisos['CATEGORIA_PAGINA'] = PermisoUtils.all(false);
        defaultPermisos['LIBRO_PAGINA'] = {...PermisoUtils.all(false), KANBAN_ACCESO: false};
        defaultPermisos['USUARIO_PAGINA'] = PermisoUtils.all(false);

        if(rol === 'Editor' || rol === 'Publicador'){
            defaultPermisos['CATEGORIA_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].CREAR = true;
            defaultPermisos['LIBRO_PAGINA'].ELIMINAR = true;
        }

        
        defaultPermisos['LIBRO_PAGINA'].KANBAN_ACCESO = rol === 'Publicador';


        return defaultPermisos;
    }


    private static all(value: boolean): BasePermisos{
        return {
            CREAR: value,
            EDITAR: value,
            ELIMINAR: value,
            puedoAcceder: value
        }
    }

}