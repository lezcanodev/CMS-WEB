import { LocalStorageServices } from '@/services';
import { RefrescarRequest, RefrescarResponse } from './refrescar.model';
import Api from '@/api/core/base.api';


/**
 * Dependencias que se necesita para la clase ApiRefrescar
 */
interface ApiIngresarParams{
    readonly localStorage: LocalStorageServices
}

/**
 * Esta clase se encarga unicamente de autenticar al usuario, comunicarse con la API
 * y devolver la respuesta
 */
export default class ApiRefrescar extends Api<void, RefrescarResponse | null>{

    constructor(
        private readonly params: ApiIngresarParams
    ){
        super();
    }

    protected async handle(){
        const refresh =  this.params.localStorage.get('refresh');
        if(!refresh){
            return this.data(null);
        }
        const datos: RefrescarRequest = { refresh };
        const response = await this.api.post<RefrescarResponse>('token/refresh/', datos);
        const data = response.data;
        this.params.localStorage.set('token', data.access);
        return this.data(response.data, {
            token: data.access,
            userData:  JSON.parse(this.params.localStorage.get('user') as any)
        });
    }
}