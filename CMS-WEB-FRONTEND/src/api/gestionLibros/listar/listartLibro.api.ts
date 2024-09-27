import Api from '@/api/core/base.api';
import { LibroListarRequest, LibroListarResponse } from './listarLibro.model';



export default class ApiListarLibro extends Api<LibroListarRequest, LibroListarResponse>{

    protected async handle(query: LibroListarRequest){
        const queries = this.buildQuery(query);
        const response = await this.api.get<LibroListarResponse>(`listar-libro${queries}`);
        return this.data(response.data.map((libro) => ({
            ...libro,   
            fecha: new Date(libro.fecha).toLocaleDateString(),
            estado: 'Publicado'
        })));
    }
}
