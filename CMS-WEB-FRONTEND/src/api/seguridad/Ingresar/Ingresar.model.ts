import { UserRol } from '@/api/core/base.api.model';

/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface LoginRequest{
    username: string,
    password: string;
}

/**
 * Datos retornados por el backend
 */
export interface LoginResponse{
    access: string,
    refresh: string;
    role: UserRol;
}