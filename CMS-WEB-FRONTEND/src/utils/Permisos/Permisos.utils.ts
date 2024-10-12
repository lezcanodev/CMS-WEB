import { BasePermisos,  PermisoPaginas } from '@/redux/permisos/permisos.state';
import { UserUtils } from '../User/User.utils';


export class PermisoUtils{

    public static getPermisosPorPagina(): PermisoPaginas{
        const rol = UserUtils.getUser()?.role || 'Suscriptor';

        // Inicializamos todos los permisos en true
        const defaultPermisos: PermisoPaginas = {
            CATEGORIA_PAGINA: PermisoUtils.all(true),
            LIBRO_PAGINA: {...PermisoUtils.all(true), KANBAN_ACCESO: true},
            USUARIO_PAGINA: PermisoUtils.all(true)
        } 

        if(rol === 'Administrador'){
            return defaultPermisos;
        }

        // Restablecemos todos los permisos a False para los demas roles.-
        defaultPermisos['CATEGORIA_PAGINA'] = PermisoUtils.all(false);
        defaultPermisos['LIBRO_PAGINA'] = {...PermisoUtils.all(false), KANBAN_ACCESO: false};
        defaultPermisos['USUARIO_PAGINA'] = PermisoUtils.all(false);

        if(rol === 'Editor'){
            defaultPermisos['CATEGORIA_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].CREAR = true;
            defaultPermisos['LIBRO_PAGINA'].ELIMINAR = true;
            defaultPermisos['LIBRO_PAGINA'].EDITAR = true;
        }
        
        if(rol == 'Publicador'){
            defaultPermisos['CATEGORIA_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].puedoAcceder = true;
            defaultPermisos['LIBRO_PAGINA'].PUBLICAR = (rol === 'Publicador');
            defaultPermisos['LIBRO_PAGINA'].KANBAN_ACCESO = rol === 'Publicador';
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