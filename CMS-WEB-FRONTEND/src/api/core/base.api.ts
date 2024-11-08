import axios, { AxiosError, AxiosInstance } from 'axios';
import { HttpStatusCode } from './httpStatus.helper';
import { BaseResponse } from './base.api.model';
import { ApiErrorRequest } from './base.api.error';

/**
 * Clase encargada de proporcionar la configuración y métodos comunes para la comunicación
 * con la api del backend
 */
export default abstract class Api<RequestData, ResponseData>{
    /**
     * Instancia de Axios para realizar las solicitudes HTTP
     * @protected
     * @readonly
     */
    protected readonly api: AxiosInstance;
    
    /**
     * Helper que tiene mensajes comunes a respuestas de códigos de respuestas http
     * @protected
     * @readonly
     */
    protected static readonly HttpStatusCode = HttpStatusCode;

    /**
    * Crea una nueva instancia de la clase Api.
    * Configura la instancia de Axios con la URL base desde las variables de entorno.
    */
    constructor(){
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
        // Añadimos el token access en caso que existe
        this.api.interceptors.request.use((config) => {
            const tokenAccess = localStorage.getItem('token');
            if(tokenAccess){
                config.headers.Authorization = `Bearer ${tokenAccess}`;
            }
            return config;
        })
    }

    /**
     * Si la api falla se puede utilizar este método para lanzar un error con algún
     * mensaje personalizado
     * @param error - error personalizado
     */
    protected error(error: BaseResponse<ResponseData>['error']): BaseResponse<ResponseData>{
        throw new ApiErrorRequest(error);
    }

    /**
     * 
     * @param data 
     * @param extraData 
     * @returns 
     */
    protected data<TDataExtra = any>(data: ResponseData, extraData?: TDataExtra): BaseResponse<ResponseData>{
        return { data, extraData };
    }

    /**
     * Construye la query para pasarla por ulr al endpoint, ejemplo: {id: 1} -> id=1
     * @param queries 
     */
    protected buildQuery(queries: {[query: string]: any }){
        const result = new URLSearchParams();
        Object.keys(queries).forEach(query => {
            result.append(query, queries[query]);
        })
        const queryString = result.toString();
        if(queryString.length) return '?'+queryString;
        return '';
    }

    /**
     * Método que se encarga de hacer la solicitud a la api
     * @param data - datos que dependen de la endpoint 
     * @returns response - respuesta de la api
     */
    protected abstract handle(data: RequestData): Promise<BaseResponse<ResponseData>>;

    /**
     * Método que llama a handle para realizar la solicitud y manejar
     * operaciones y errores comunes entre todas las endpoints
     * @param data - datos que dependen de la endpoint 
     * @returns response - respuesta de la api
     */
    public async execute(data: RequestData): Promise<BaseResponse<ResponseData>>{
        try{
            const response = await this.handle(data);
            return response;
        }catch(error){
            
            if(error instanceof ApiErrorRequest){
                return {error: error.getError()};
            }

            if(error instanceof AxiosError){
                if(error.status === 400 && error?.response?.data){
                    return {error: HttpStatusCode.BadRequest(error?.response?.data)};
                }else{
                    return {error: HttpStatusCode.responseTo(error.status ?? 500)}
                }
            }

            return {error: HttpStatusCode.InternalServerError()};
        }
    }
}