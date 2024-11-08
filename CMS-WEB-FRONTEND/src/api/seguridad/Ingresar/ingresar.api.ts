import { LocalStorageServices } from '@/services';
import { LoginRequest, LoginResponse } from './Ingresar.model';
import { AxiosError } from 'axios';
import Api from '@/api/core/base.api';
import { jwtDecode } from 'jwt-decode';
import { UserUtils } from '@/utils/User/User.utils';


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
            
            const users = localStorage.getItem('baneados') ? JSON.parse(localStorage.getItem('baneados') ?? '[]') : [];
            const estaBaneado = users?.some((x: any) => x == decodeToken.user_id);
            
            if(estaBaneado){
                return this.error(Api.HttpStatusCode.Unauthorized('Has sido bloqueado del sistema'));
            }

            this.params.localStorage.set('token', data.access);
            this.params.localStorage.set('refresh', data.refresh);
            UserUtils.setUser({
                userId: decodeToken.user_id, 
                username: datos.username,
                role: data.role
            });

            return this.data(response.data);
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