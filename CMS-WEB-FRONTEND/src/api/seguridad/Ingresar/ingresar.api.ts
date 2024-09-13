import { LocalStorageServices } from '@/services';
import { LoginRequest, LoginResponse, UserData } from './Ingresar.model';
import { AxiosError } from 'axios';
import Api from '@/api/core/base.api';
import { jwtDecode } from 'jwt-decode';


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
            const decodeToken = jwtDecode<{user_id: number}>(data.refresh);
            const userData: UserData = {
                userId: decodeToken.user_id, 
                username: datos.username
            };
            this.params.localStorage.set('token', data.access);
            this.params.localStorage.set('refresh', data.refresh);
            this.params.localStorage.set('user',  JSON.stringify(userData));

            return this.data<UserData>(response.data, userData);

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