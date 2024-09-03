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
    token: string,
    refresh: string;
}

/**
 * Datos del usuario autenticado
 */
export interface UserData{
    username: string
}