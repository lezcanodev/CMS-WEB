import {
    afterEach,
    describe,
    expect,
    it
} from 'vitest';
import { http, HttpResponse } from 'msw';
import { workerFakeApi } from '@tests/utils/server.fake';
import { HISTORIAL_ENDPOINTS } from '@tests/utils/historial.mock';
import ApiListarHistorialLibro from '@/api/gestionHistorial/listarHistorialLibro/listarHistorialLibro.api';

describe('Api Listar Historial Libro' , async  () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que el listado sea correcto y este ordenado por fecha de forma descendente
     */
    it('Debería listar correctamente el historial', async () => {
        // id de libro de prueba
        const mockLibroId = 1;
        const mockListaHistorial =  [
            { "id": 1, "fecha": "2024-11-16T19:02:34.760Z" },
            { "id": 2, "fecha": "2024-11-16T18:02:34.760Z" },
            { "id": 3, "fecha": "2024-11-16T19:02:35.760Z" },
            { "id": 4, "fecha": "2024-11-16T20:02:34.760Z" },
            { "id": 5, "fecha": "2024-11-20T19:02:34.760Z" }
        ];
        // array del id de los libros con el orden que se espera (ordenado por fecha de forma descendente)
        const ordenEsperado = [5,4,3,1,2];

        // asociamos el id del libro a un listado de historial falso
        const mockHistorial = {
            [mockLibroId]: mockListaHistorial
        }

        // Interceptamos la request y retornamos los datos falseados anteriormente
        workerFakeApi.use(
            http.get(HISTORIAL_ENDPOINTS.listarHistorial, async ({ request }) => {
                const libroId = request.url.split('?libro=')?.[1];
                return HttpResponse.json(mockHistorial?.[libroId], {status: 200}) ;
            })
        );

        // realizamos la solicitud para obtener el historial del libro
        const instance = new ApiListarHistorialLibro();
        const {data} = await instance.execute({
            libroId: mockLibroId
        })

        // verificamos que los datos sean los esperados
        expect(data, 'Data debería estar definido').toBeDefined();
        expect(Array.isArray(data), 'Data debería ser un array').toBe(true);
        expect(data?.length, 'No se encuentran todos los datos').toBe(mockListaHistorial.length);

        let estaOrdenadoPorFechaDescendente = true;

        // verificamos que el array este ordenado de forma descendente por fecha
        for(let i=0; i < data!.length; i++){
            if(ordenEsperado[i] != data![i].id){
                estaOrdenadoPorFechaDescendente = false;
                break;
            }
        }

        // verificamos que este ordenado
        expect(estaOrdenadoPorFechaDescendente, 'Los datos no se encuentran ordenado por fecha descendente').toBe(true)
    });
    
})

