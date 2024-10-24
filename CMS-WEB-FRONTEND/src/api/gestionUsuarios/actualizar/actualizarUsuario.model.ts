import { UserRol } from '@/api/core/base.api.model';
/**
 * Datos necesarios para hacer una request de actualizacion de usuario en el backend
 */
export interface UsuarioActualizarRequest{
    id: number,
    username: string,
    role: UserRol
}

/**
 * Datos retornados por el backend
 */
export interface UsuarioActualizarResponse{}