import {
    afterEach,
    describe,
    expect,
    it
} from 'vitest';
import { http, HttpResponse } from 'msw';
import ApiReportMasGustados from '@/api/gestionReporte/rankMasGustados/rankMasGustados.api';
import ApiListarLibro from '@/api/gestionLibros/listar/listartLibro.api';
import { workerFakeApi } from '@tests/utils/server.fake';
import { LIBRO_ENDPOINTS } from '@tests/utils/libros.mock';
import { LibroListarData } from '@/api/gestionLibros/listar/listarLibro.model';


describe('Api Reporte Libros Mas Gustados' , async  () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que la generación del reporte libros mas gustados sea correcto
     */
    it('Debería generar el reporte correctamente', async () => {
        // Preparamos los datos falseados para la prueba
        const mockLibros: Partial<LibroListarData>[] = [
            { id: 1, likes: 10 }, 
            { id: 4, likes: 2 },
            { id: 2, likes: 8 },
            { id: 5, likes: 3 },
            { id: 3, likes: 4 },
        ]
        const libroConMasMeGustadasId = 1;
        const segundoLibroConMasMeGustadasId = 2;
        const tercerLibroConMasMeGustadasId = 3;

        // Calculamos el total de like sobre los datos falseados
        const mockTotalLikes = mockLibros.reduce((acc, {likes}) => acc + (likes || 0), 0);

        // Falseamos las respuesta de listar libro con los datos anteriores
        workerFakeApi.use(
            http.get(LIBRO_ENDPOINTS.listarLibros, () => {
              return HttpResponse.json(mockLibros, {status: 200}) ;
            })
        );

        // Realizamos la generación de reporte
        const listarLibro = new ApiListarLibro();
        const instance = new ApiReportMasGustados(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de likes sea el correcto
        expect(data?.totalLikes, 'El valor del total de likes es incorrecto').toBe(mockTotalLikes);

        // verificamos que el podio este correctamente ordenado
        // 2° Lugar
        expect(data?.podio?.[0]?.id, 'Posición 0 del podio es incorrecto').toBe(segundoLibroConMasMeGustadasId);
        // 1° Lugar
        expect(data?.podio?.[1]?.id, 'Posición 1 del podio es incorrecto').toBe(libroConMasMeGustadasId);
        // 3° Lugar
        expect(data?.podio?.[2]?.id, 'Posición 2 del podio es incorrecto').toBe(tercerLibroConMasMeGustadasId);

        // verificamos que el listado este correctamente ordenado
        let estaOrdenadoDeFormaDescentePorLikes: boolean = true;
        data?.reporte?.map((x, index) => {
            if(index == data?.reporte?.length-1 || !estaOrdenadoDeFormaDescentePorLikes ) return;
            if(data?.reporte[index].likes < data?.reporte[index+1].likes){
                estaOrdenadoDeFormaDescentePorLikes = false; 
            }
        })
        expect(estaOrdenadoDeFormaDescentePorLikes, 'El listado de los libros no esta ordenado de forma descendente por likes').toBe(true);
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
        const instance = new ApiReportMasGustados(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de likes sea el correcto
        expect(data?.totalLikes, 'El valor del total de likes es incorrecto').toBe(0);

        // verificamos que el podio sea un array vació
        expect(Array.isArray(data?.podio) , 'El podio debería ser un array').toBe(true);
        expect(data?.podio?.length, 'El podio debería estar vació, no hay libros').toBe(0);

        // verificamos que el listado sea un array vació
        expect(Array.isArray(data?.reporte) , 'El reporte debería ser un array').toBe(true);
        expect(data?.reporte?.length, 'El reporte debería estar vació, no hay libros').toBe(0);
    });

})

