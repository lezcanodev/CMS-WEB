import { UserRol } from '@/api/core/base.api.model'

/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface UsuarioListarRequest{}

/**
 * Datos retornados por el backend
 */
export type UsuarioListarResponse = UsuarioListarData[]

export interface UsuarioListarData{
    id: number,
    username: string,
    role: UserRol
}