import { localStorageServices } from '@/services';

/**
 * Datos del usuario autenticado
 */
export interface UserData{
    userId: number;
    username: string;
    role: 'Administrador' | 'Editor' | 'Publicador' | 'Suscriptor';
}


export class UserUtils{

    static setUser(user: UserData){
        localStorageServices.set('user',  JSON.stringify(user));
    }

    static getUser(): UserData | null{
        const user = localStorageServices.get('user') as any;
        return JSON.parse(user);
    }

    static deleteUser(){
        localStorageServices.delete('user');
    }

    static isAdmin(){
        return UserUtils.getUser()?.role !== 'Suscriptor'; 
    }

}