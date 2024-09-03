/**
 * Datos necesarios para hacer una request a login del backend
 */
export interface RegisterRequest{
    username: string,
    password: string;
}

/**
 * Datos retornados por el backend
 */
export interface RegisterResponse{
    token: string,
    refresh: string;
}