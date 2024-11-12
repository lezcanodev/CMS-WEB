import {
    afterEach,
    describe,
    expect,
    it
} from 'vitest';
import { http, HttpResponse } from 'msw';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import { workerFakeApi } from '@tests/utils/server.fake';
import { LIBRO_ENDPOINTS } from '@tests/utils/libros.mock';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';
import ApiReportMasVistos from '@/api/gestionReporte/rankMasVistos/rankMasVistos.api';


describe('Api Reporte Libros Mas Vistos' , async  () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que la generación del reporte libros mas gustados sea correcto
     */
    it('Debería generar el reporte correctamente', async () => {
        // Preparamos los datos falseados para la prueba
        const mockLibros: Partial<LibroListarData>[] = [
            { id: 1, vistas: 10 }, 
            { id: 4, vistas: 2 },
            { id: 2, vistas: 8 },
            { id: 5, vistas: 3 },
            { id: 3, vistas: 4 },
        ]
        const libroConMasVistasId = 1;
        const segundoLibroConMasMeVistasId = 2;
        const tercerLibroConMasMeVistasId = 3;

        // Calculamos el total de vistas sobre los datos falseados
        const mockTotalVistas = mockLibros.reduce((acc, {vistas}) => acc + (vistas || 0), 0);

        // Falseamos las respuesta de listar libro con los datos anteriores
        workerFakeApi.use(
            http.get(LIBRO_ENDPOINTS.listarLibros, () => {
              return HttpResponse.json(mockLibros, {status: 200}) ;
            })
        );

        // Realizamos la generación de reporte
        const listarLibro = new ApiListarLibro();
        const instance = new ApiReportMasVistos(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de vistas sea el correcto
        expect(data?.totalVistas, 'El valor del total de vistas es incorrecto').toBe(mockTotalVistas);

        // verificamos que el podio este correctamente ordenado
        // 2° Lugar
        expect(data?.podio?.[0]?.id, 'Posición 0 del podio es incorrecto').toBe(segundoLibroConMasMeVistasId);
        // 1° Lugar
        expect(data?.podio?.[1]?.id, 'Posición 1 del podio es incorrecto').toBe(libroConMasVistasId);
        // 3° Lugar
        expect(data?.podio?.[2]?.id, 'Posición 2 del podio es incorrecto').toBe(tercerLibroConMasMeVistasId);

        // verificamos que el listado este correctamente ordenado
        let estaOrdenadoDeFormaDescentePorVistas: boolean = true;
        data?.reporte?.map((x, index) => {
            if(index == data?.reporte?.length-1 || !estaOrdenadoDeFormaDescentePorVistas ) return;
            if(data?.reporte[index].vistas < data?.reporte[index+1].vistas){
                estaOrdenadoDeFormaDescentePorVistas = false; 
            }
        })
        expect(estaOrdenadoDeFormaDescentePorVistas, 'El listado de los libros no esta ordenado de forma descendente por vistas').toBe(true);
    });


    /**
     * Verificamos que los datos por defecto sean correcto cuando no hay libros
     */
    it('Debería retornar los datos por defecto cuando no hay libros', async () => {

        // Falseamos las respuesta de listar libro con un array vació
        workerFakeApi.use(
            http.get(LIBRO_ENDPOINTS.listarLibros, () => {
              return HttpResponse.json([], {status: 200}) ;
            })
        );

        // Realizamos la generación de reporte
        const listarLibro = new ApiListarLibro();
        const instance = new ApiReportMasVistos(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de likes sea el correcto
        expect(data?.totalVistas, 'El valor del total de likes es incorrecto').toBe(0);

        // verificamos que el podio sea un array vació
        expect(Array.isArray(data?.podio) , 'El podio debería ser un array').toBe(true);
        expect(data?.podio?.length, 'El podio debería estar vació, no hay libros').toBe(0);

        // verificamos que el listado sea un array vació
        expect(Array.isArray(data?.reporte) , 'El reporte debería ser un array').toBe(true);
        expect(data?.reporte?.length, 'El reporte debería estar vació, no hay libros').toBe(0);
    });

})

