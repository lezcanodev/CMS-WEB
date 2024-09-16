import { UserRol } from '@/api/core/base.api.model';

/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface UsuarioCrearRequest{
    username:string,
    password:string,
    role: UserRol
}

/**
 * Datos retornados por el backend
 */
export interface UsuarioCrearResponse{}
