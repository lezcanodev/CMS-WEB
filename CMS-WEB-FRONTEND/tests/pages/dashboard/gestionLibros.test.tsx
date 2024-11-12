import React, { act } from 'react';
import GestionLibros from '@/pages/dashboard/gestionLibros/index';

import { expect, it, describe, beforeEach, beforeAll } from 'vitest'
import {  render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest';
import { TestComponent } from '../../utils/TestComponent';
import {v7} from 'uuid';

let nombreTestCategoria = v7();
let nombreTestLibro = v7();
let mockContenidoLibro = 'MOCK_CONTENIDO_TEST_LIBRO';

describe.skip('Libro', async () => {

  // Inicializamos todos los datos de prueba
  beforeAll(() => {
    // generamos un nombre para testear creación de  libro
    nombreTestCategoria = v7();
    nombreTestLibro = v7();
    mockContenidoLibro = 'MOCK_CONTENIDO_TEST_LIBRO';
  })

  beforeEach(async () => {
      render (<TestComponent> <GestionLibros /> </TestComponent>);
  })

  it('Debería crear un libro correctamente', async () => {
    // Abrimos la sección de creación de libro haciendo clic en el botón correspondiente
    const btnArrirModalCrearLibro = await screen.findByRole('button', { name: /Crear/i });
    expect(btnArrirModalCrearLibro, "Button crear no esta en el documento").toBeInTheDocument();
    await userEvent.click(btnArrirModalCrearLibro);


    // Obtenemos el botón para confirmar la creación de la categoría
    const btnConfirmar = await screen.findByRole('button', { name: /Guardar/i });
    expect(btnConfirmar, "El botón para guardar libro no se ha encontrado").toBeInTheDocument();

    // Obtenemos el input del titulo
    const tituloLibros = screen.getByRole('textbox', { name: /titulo/i });
    expect(tituloLibros, 'El input para el titulo del libro no esta presente').toBeDefined();

    // Obtenemos el listado de categorías
    //const categoriaLibros = await screen.findByRole('listbox', { name: /Categoría/i });
    //expect(categoriaLibros, 'El input para el listado de categorias del libro no esta presente').toBeDefined();
//
    //console.log("===> ",categoriaLibros?.length)
    //console.log(categoriaLibros)

    /*
    // Obtenemos el botón para confirmar la creación de la categoría
    const btnConfirmarConfermacion = await screen.findByRole('button', { name: /Confirmar/i });
    expect(btnConfirmarConfermacion, "Button confirmar no esta en el documento").toBeInTheDocument();
    
    // Localizamos el campo de texto donde se ingresa el nombre de la categoría
    const nombreCategoria = screen.getByRole('textbox', { name: /nombre/i });
    expect(nombreCategoria).toBeDefined();

    // Escribimos el nombre de la categoría
    await userEvent.type(nombreCategoria, nombreTestLibro);

    // creamos la categoría
    await userEvent.click(btnConfirmarConfermacion);
    */
  });

});
