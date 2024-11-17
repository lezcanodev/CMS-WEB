import Api from '@/api/core/base.api';
import { LibroCrearRequest, LibroCrearResponse } from './crearLibro.model';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';


export default class ApiCrearLibro extends Api<LibroCrearRequest, LibroCrearResponse>{

    constructor(
        protected guardarHistorial: ApiGuardarHistorialLibro
    ){
        super();
    }

    protected async handle(datos: LibroCrearRequest){
        // creamos el libro
        const response = await this.api.post<LibroCrearResponse>('crear-libro', {
            ...datos,
            likes:0,
            vistas: 0
        });

        // guardamos en el historial la creación del libro
        await this.guardarHistorial.execute({
            libro: response.data.id,
            accion: `Se ha creado el libro "${datos.titulo}"`
        })
        
        return this.data(response.data);
    }
}
