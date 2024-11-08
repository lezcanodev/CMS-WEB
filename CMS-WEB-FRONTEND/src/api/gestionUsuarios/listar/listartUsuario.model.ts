import { UserRol } from '@/api/core/base.api.model'

/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface UsuarioListarRequest{}

/**
 * Datos retornados por el backend
 */
export type UsuarioListarResponse = UsuarioListarData[]

export interface user{
    id:number,
    username:string,
    password:string
}

//dejamos lo mas parecido al back para evitar inconsistencias.-
export interface UsuarioListarData{
    user: user,
    role: UserRol
}