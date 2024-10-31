import React from 'react';
import { expect, it, describe, beforeEach, beforeAll } from 'vitest'
import {  render, screen,  within } from '@testing-library/react'
import GestionReportes from '../src/pages/dashboard/gestionReportes/index';
import { TestComponent } from './utils/TestComponent';
import { mockLibros } from './utils/libros.mock';

describe('Gestión de reportes', async () => {

  describe('Reporte "Estado de los libros"', async () => {
    let tituloSeccionEstadoDeLosLibros: any = null;
    let contenedorEstadoDeLosLibros: any = null;

    beforeEach(async () => {
        render (<TestComponent> <GestionReportes /> </TestComponent>);

        // Buscamos la sección de Estado de los libros
        tituloSeccionEstadoDeLosLibros = await screen.findByText(/Estado de los libros/i);;
        // Obtenemos el contenedor
        contenedorEstadoDeLosLibros = tituloSeccionEstadoDeLosLibros.parentElement;

        // Nos aseguramos que esta definido
        if(!contenedorEstadoDeLosLibros){
          throw new Error(`No se ha encontrado la sección "Estado de los libros" `);
          return;
        }
    })

    it('Debería mostrar el total de libros correctamente', async () => {
        // Nos aseguramos que el label total de libros muestre lo esperado
        let texto = `Total de libros:${mockLibros().cantidad}`;
        let elementoEnContenedor = await within(contenedorEstadoDeLosLibros).findByText(new RegExp(texto, 'i'), { exact: false });
        expect(elementoEnContenedor).toBeInTheDocument();
    })

    it('Debería mostrar el total de libros "Guardados" correctamente', async () => {
        // Nos aseguramos que la cantidad de libro con estado "Guardado" sea correcta
        let elementoEnContenedor = await within(contenedorEstadoDeLosLibros).findByText((content, element) => {
            return content.startsWith('Guardado') && content.includes(`(${mockLibros().cantidadGuardados})`);
        }, { exact: false });
        expect(elementoEnContenedor).toBeInTheDocument();
    })

    it('Debería mostrar el total de libros "En revision" correctamente', async () => {
      // Nos aseguramos que la cantidad de libro con estado "En revision" sea correcta
      let elementoEnContenedor = await within(contenedorEstadoDeLosLibros).findByText((content, element) => {
          return content.startsWith('En Revision') && content.includes(`(${mockLibros().cantidadEnRevision})`);
      }, { exact: false });
      expect(elementoEnContenedor).toBeInTheDocument();
    })

    it('Debería mostrar el total de libros "Rechazados" correctamente', async () => {
      // Nos aseguramos que la cantidad de libro con estado "Rechazados" sea correcta
      let elementoEnContenedor = await within(contenedorEstadoDeLosLibros).findByText((content, element) => {
          return content.startsWith('Rechazado') && content.includes(`(${mockLibros().cantidadRechazados})`);
      }, { exact: false });
      expect(elementoEnContenedor).toBeInTheDocument();
    })

    it('Debería mostrar el total de libros "Publicados" correctamente', async () => {
      // Nos aseguramos que la cantidad de libro con estado "Publicados" sea correcta
      let elementoEnContenedor = await within(contenedorEstadoDeLosLibros).findByText((content, element) => {
          return content.startsWith('Publicado') && content.includes(`(${mockLibros().cantidadPublicados})`);
      }, { exact: false });
      expect(elementoEnContenedor).toBeInTheDocument();
    })

  });
});
/*
const longitud = getSlidesCount(seccionMasGustadosContainer);
        console.log({longitud})
*/