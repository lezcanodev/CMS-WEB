import { LocalStorageServices } from '@/services';
import { LoginRequest, LoginResponse, UserData } from './Ingresar.model';
import { AxiosError } from 'axios';
import Api from '@/api/core/base.api';


/**
 * Dependencias que se necesita para la clase ApiIngresar
 */
interface ApiIngresarParams{
    readonly localStorage: LocalStorageServices
}

/**
 * Esta clase se encarga unicamente de autenticar al usuario, comunicarse con la API
 * y devolver la respuesta
 */
export default class ApiIngresar extends Api<LoginRequest, LoginResponse>{

    constructor(
        private readonly params: ApiIngresarParams
    ){
        super();
    }

    protected async handle(datos: LoginRequest){
        try{
            const response = await this.api.post<LoginResponse>('token/', datos);
            const data = response.data;

            this.params.localStorage.set('token', data.token);
            this.params.localStorage.set('refresh', data.refresh);

            return this.data<UserData>(response.data, {
                 username: datos.username
            });

        }catch(error){

            if(error instanceof AxiosError){
                if(error.status == 401){
                    this.error(Api.HttpStatusCode.Unauthorized('Credenciales incorrectas'));
                }
            }

            throw error;
        }
    }
}