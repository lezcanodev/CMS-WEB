import React, { act } from 'react';
import { expect, it, describe, beforeEach, beforeAll, afterEach } from 'vitest'
import {  render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest';

import { TestComponent } from '../../utils/TestComponent';
import {v7} from 'uuid';

import {
    applySearch, 
    HistorialLibro
} from '@/pages/dashboard/gestionLibros/ListarHistoriaLibro';
import { ApiListarHistorialLibroResponse } from '@/api/gestionHistorial/listarHistorialLibro/listarHistorialLibro.model';
import { workerFakeApi } from '@tests/utils/server.fake';
import { HISTORIAL_ENDPOINTS } from '@tests/utils/historial.mock';
import { http, HttpResponse } from 'msw';
import { useAppDispatch, useAppSelector } from '@/redux';
import { useDispatch } from 'react-redux';


// Preparamos los datos
let mockLibroId = 1;
let mockTitulo = "MOCK_TITULO";
let mockHistorial: ApiListarHistorialLibroResponse = [
    { id: 1, id_libro: "1", usuarioNombre: "user1",  fecha: new Date('2024-11-17T00:00:00').toISOString() , accion: "accion1" },
    { id: 2, id_libro: "1", usuarioNombre: "user2",  fecha: new Date('2024-11-18T00:00:00').toISOString()  , accion: "accion2" },
    { id: 3, id_libro: "1", usuarioNombre: "user3",  fecha: new Date('2024-11-19T00:00:00').toISOString()  , accion: "accion3" }
];
let mockHistorialPorLibro = {
    [mockLibroId]: mockHistorial 
}

describe('GUI - Listar Historial Libro', async () => {


    beforeEach(async () => {
        // Interceptamos la request y retornamos los datos falseados anteriormente
        workerFakeApi.use(
            http.get(HISTORIAL_ENDPOINTS.listarHistorial, async ({ request }) => {
                const libroId = request.url.split('?libro=')?.[1];
                return HttpResponse.json(mockHistorialPorLibro?.[libroId], {status: 200}) ;
            })
        );

        render (
          <TestComponent>
              <HistorialLibro
                  libroId={mockLibroId}
                  libroNombre={mockTitulo}
              />
          </TestComponent>
        );
    })

    afterEach(() => {
       workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que todos las modificaciones del libro estén presentes en 
     * el documento
     */
    it('Verificamos que los datos estén presentes en el documento', async () => {
        // verificamos que el titulo del libro este presente
        let textoEncontrado = await screen.findByText(new RegExp( mockTitulo , 'i'));
        expect(textoEncontrado, `No fue encontrado el titulo del libro ${mockTitulo}`).toBeInTheDocument();

        // verificamos que el titulo sea correcto
        for(let i=0; i<mockHistorial.length; i++){
            const modificacion = mockHistorial[i];

            // verificamos que la descripción de la accion esta presente
            let textoEncontrado = await screen.findByText(new RegExp( modificacion.accion , 'i'));
            expect(textoEncontrado, `No fue encontrado la accion ${modificacion.accion}`).toBeInTheDocument();

            // verificamos que el nombre del autor de la accion esta presente
            textoEncontrado = await screen.findByText(new RegExp( modificacion.usuarioNombre , 'i'));
            expect(textoEncontrado, `No fue encontrado el autor ${modificacion.usuarioNombre}`).toBeInTheDocument();

            // verificamos que la fecha de la accion esta presente
            textoEncontrado = await screen.findByText(new RegExp( modificacion.fecha.split("T")[0].split("-").reverse().join("/") , 'i'));
            expect(textoEncontrado, `No fue encontrado la fecha ${modificacion.fecha.split("T")[0].split("-").reverse().join("/")}`).toBeInTheDocument();
        }
    });

    /**
     * Verificamos que el buscador de accion, cuando se busca una cadena no vacia
     */
    it('La búsqueda por accion debería se correcta', async () => {
        let mockHistorial: ApiListarHistorialLibroResponse = [
            { id: 1, id_libro: "1", usuarioNombre: "user1",  fecha: new Date('2024-11-17T00:00:00').toISOString() , accion: "accion1" },
            { id: 2, id_libro: "1", usuarioNombre: "user2",  fecha: new Date('2024-11-18T00:00:00').toISOString()  , accion: "accion2" },
            { id: 3, id_libro: "1", usuarioNombre: "user3",  fecha: new Date('2024-11-19T00:00:00').toISOString()  , accion: "accion3" }
        ];
        const mockBusqueda = "accion2";

        // id de las modificaciones que deberían estar en el resultado
        const resultadoEsperado = [2]; 

        const resultado = applySearch(mockBusqueda, mockHistorial);

        let resultadoEsCorrecto = true;

        // verificamos que sea lo esperado
        for(let i=0; i < resultado.length; i++){
            if(resultado[i].id != resultadoEsperado[i]){
                resultadoEsCorrecto = false;
                break;
            }
        }

        expect(resultadoEsCorrecto, 'La búsqueda fue incorrecta').toBe(true);
    })

        
    /**
     * Verificamos que el buscador de accion, cuando se busca cadena vacia
     */
    it('Una búsqueda vacía debería retornar el mismo estado', async () => {
        let mockHistorial: ApiListarHistorialLibroResponse = [
            { id: 1, id_libro: "1", usuarioNombre: "user1",  fecha: new Date('2024-11-17T00:00:00').toISOString() , accion: "accion1" },
            { id: 2, id_libro: "1", usuarioNombre: "user2",  fecha: new Date('2024-11-18T00:00:00').toISOString()  , accion: "accion2" },
            { id: 3, id_libro: "1", usuarioNombre: "user3",  fecha: new Date('2024-11-19T00:00:00').toISOString()  , accion: "accion3" }
        ];
        const mockBusqueda = "";

        // id de las modificaciones que deberían estar en el resultado
        const resultadoEsperado = [1,2,3]; 

        const resultado = applySearch(mockBusqueda, mockHistorial);

        let resultadoEsCorrecto = true;

        // verificamos que sea lo esperado
        for(let i=0; i < resultado.length; i++){
            if(resultado[i].id != resultadoEsperado[i]){
                resultadoEsCorrecto = false;
                break;
            }
        }

        expect(resultadoEsCorrecto, 'La búsqueda fue incorrecta').toBe(true);
    })
});
