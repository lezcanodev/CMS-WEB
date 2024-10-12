import Api from '@/api/core/base.api';
import { LibroActualizarRequest, LibroActualizarResponse } from './actualizarLibro.model';


export default class ApiActualizarLibro extends Api<LibroActualizarRequest, LibroActualizarResponse>{

    protected async handle(datos: LibroActualizarRequest){
        const libroId = datos.id;
        const datosActualizados: Omit<LibroActualizarRequest, 'id'> = {
            categoria: datos.categoria,
            titulo: datos.titulo,
            estado: datos.estado,
            contenido: datos.contenido
        }
        const response = await this.api.put<LibroActualizarResponse>(`update-libro/${libroId}`, datosActualizados);
        return this.data(response.data);
    }
}
