import Api from '@/api/core/base.api';
import { LibroCrearRequest, LibroCrearResponse } from './crearLibro.model';


export default class ApiCrearLibro extends Api<LibroCrearRequest, LibroCrearResponse>{

    protected async handle(datos: LibroCrearRequest){
        const response = await this.api.post<LibroCrearResponse>('crear-libro', datos);
        return this.data(response.data);
    }
}
