/**
 * Métodos necesarias para cualquier implementación que quiera ofrecer servicios
 * para comunicación con el local storage
 */
export interface ILocalStorageServices{
    /**
     * Obtiene los datos del local storage a partir de una key
     * @param key clave que identifica al item guardado
     * @returns valor del item
     */
    get(key: string): string | null;

    /**
     * Guarda un item en el local storage
     * @param key identificador que se usara para el guardado
     * @param value valar que se guardara
     */
    set(key: string, value: string): void;

    /**
    * Elimina un item en del local storage
    * @param key identificador que se usara para el eliminado
    */
    delete(key: string): void;
}

/***
 * Clase que representa un servicio para la comunicación con el local storage del dispositivo/navegador
 */
export class LocalStorageServices implements ILocalStorageServices{
    public get(key: string): string | null{
        return localStorage.getItem(key);
    }
    
    public set(key: string, value: any): void{
        localStorage.setItem(key, value);
    }

    public delete(key: string){
        localStorage.removeItem(key);
    }
    
}