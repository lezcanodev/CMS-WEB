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
import ApiReporteLibroPorEstado from '@/api/gestionReporte/librosPorEstado/librosPorEstado.api';


describe('Api Reporte Libros Por Estado' , async  () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que la generación del reporte libros por estado sea correcto
     */
    it('Debería generar el reporte correctamente', async () => {
        // Preparamos los datos falseados para la prueba
        const mockLibros: Partial<LibroListarData>[] = [
            { id: 1, estado: 'Guardado'  }, 
            { id: 4, estado: 'Guardado' },
            { id: 2, estado: 'En Revision' },
            { id: 5, estado: 'Rechazado' },
            { id: 3, estado: 'Publicado' },
        ]
        const cantidadPorEstado = {
            'Guardado': 2,
            'En Revision': 1,
            'Rechazado': 1,
            'Publicado': 1
        }

        const totalLibros = mockLibros.length;

        // Falseamos las respuesta de listar libro con los datos anteriores
        workerFakeApi.use(
            http.get(LIBRO_ENDPOINTS.listarLibros, () => {
              return HttpResponse.json(mockLibros, {status: 200}) ;
            })
        );

        // Realizamos la generación de reporte
        const listarLibro = new ApiListarLibro();
        const instance = new ApiReporteLibroPorEstado(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de libros sea el correcto
        expect(data?.totalLibros, 'El valor del total de libros es incorrecto').toBe(totalLibros);

        // Verificamos que cantidadLibrosPorEstado esta definido
        expect(data?.cantidadLibrosPorEstado, "cantidadLibrosPorEstado no esta definido").toBeDefined();

        // Verificamos que todos los estados tenga el porcentaje y cantidad de libros correcto
        let porcentajesSonCorrectos = true; // para asegurar que los porcentajes son correctos
        let cantidadesSonCorrectos = true; // para asegurar que las cantidades son correctas
        let nombreEstadoSonCorrectos = true; // para asegurar que los nombres de estado de los libros son los esperados

        // recorremos el objeto para verificar que los atributos sean los correctos
        Object.keys(data!.cantidadLibrosPorEstado).map(nombreEstado => {
            if(
                !porcentajesSonCorrectos || 
                !cantidadesSonCorrectos || 
                !nombreEstadoSonCorrectos
            ) return;

            const estado = data!.cantidadLibrosPorEstado[nombreEstado];

            // verificamos que el nombre estado exista
            if(typeof cantidadPorEstado?.[nombreEstado] === 'undefined'){
                nombreEstadoSonCorrectos = false;
            }else{

                // verificamos que cantidad sea la esperada
                cantidadesSonCorrectos = estado.cantidad === cantidadPorEstado?.[nombreEstado];
                // verificamos que porcentaje sea el esperada
                porcentajesSonCorrectos = estado.porcentaje === (cantidadPorEstado?.[nombreEstado]/totalLibros);
            }
        })

        expect(nombreEstadoSonCorrectos, 'Hay un nombre de estado no contemplado').toBe(true);
        expect(cantidadesSonCorrectos, 'Hay una cantidad de libros por estado incorrecto').toBe(true);
        expect(porcentajesSonCorrectos, 'Hay un porcentaje de libros por estado que es incorrecto').toBe(true);

    });


    /**
     * Verificamos que los datos por defecto sean correcto cuando no hay libros
     */
    it('Debería retornar los datos por defecto cuando no hay libros', async () => {

        const cantidadPorEstado = {
            'Guardado': 0,
            'En Revision': 0,
            'Rechazado': 0,
            'Publicado': 0
        }

        // Falseamos las respuesta de listar libro con los datos anteriores
        workerFakeApi.use(
            http.get(LIBRO_ENDPOINTS.listarLibros, () => {
              return HttpResponse.json([], {status: 200}) ;
            })
        );

        // Realizamos la generación de reporte
        const listarLibro = new ApiListarLibro();
        const instance = new ApiReporteLibroPorEstado(listarLibro);
        const {data} = await instance.execute();

        // verificamos que el total de libros sea el correcto
        expect(data?.totalLibros, 'El valor del total de libros es incorrecto').toBe(0);

        // Verificamos que cantidadLibrosPorEstado esta definido
        expect(data?.cantidadLibrosPorEstado, "cantidadLibrosPorEstado no esta definido").toBeDefined();

        // Verificamos que todos los estados tenga el porcentaje y cantidad de libros correcto
        let porcentajesSonCorrectos = true; // para asegurar que los porcentajes son correctos
        let cantidadesSonCorrectos = true; // para asegurar que las cantidades son correctas
        let nombreEstadoSonCorrectos = true; // para asegurar que los nombres de estado de los libros son los esperados

        // recorremos el objeto para verificar que los atributos sean los correctos
        Object.keys(data!.cantidadLibrosPorEstado).map(nombreEstado => {
            if(
                !porcentajesSonCorrectos || 
                !cantidadesSonCorrectos || 
                !nombreEstadoSonCorrectos
            ) return;

            const estado = data!.cantidadLibrosPorEstado[nombreEstado];

            // verificamos que el nombre estado exista
            if(typeof cantidadPorEstado?.[nombreEstado] === 'undefined'){
                nombreEstadoSonCorrectos = false;
            }else{

                // verificamos que cantidad sea la esperada
                cantidadesSonCorrectos = estado.cantidad === cantidadPorEstado?.[nombreEstado];
                // verificamos que porcentaje sea el esperada
                porcentajesSonCorrectos = estado.porcentaje === 0;
            }
        })

        expect(nombreEstadoSonCorrectos, 'Hay un nombre de estado no contemplado').toBe(true);
        expect(cantidadesSonCorrectos, 'Hay un cantidad de libros por estado incorrecto').toBe(true);
        expect(porcentajesSonCorrectos, 'Hay un porcentaje de libros por estado que es incorrecto').toBe(true);
    });

})

