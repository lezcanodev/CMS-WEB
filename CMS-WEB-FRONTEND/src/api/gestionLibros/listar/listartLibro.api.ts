import Api from '@/api/core/base.api';
import { LibroListarRequest, LibroListarResponse } from './listarLibro.model';



export default class ApiListarLibro extends Api<LibroListarRequest, LibroListarResponse>{

    protected async handle(){
        const response = await this.api.get<LibroListarResponse>('listar-libro');
        return this.data(response.data.map((libro) => ({
            ...libro,   
            fecha: new Date(libro.fecha).toLocaleDateString() 
        })));
    }
}
