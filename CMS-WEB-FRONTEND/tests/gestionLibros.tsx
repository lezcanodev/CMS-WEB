import React, { act } from 'react';
import { expect, it, describe, beforeEach, beforeAll } from 'vitest'
import {  render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest';
import GestionLibros from '../src/pages/dashboard/gestionLibros/index';
import { TestComponent } from './utils/TestComponent';
import {v7} from 'uuid';

let nombreTestCategoria = v7();
let nombreTestLibro = v7();
let mockContenidoLibro = 'Contenido Test Libro';

describe('Libro', async () => {

  // Inicializamos todos los datos de prueba
  beforeAll(() => {
    // generamos un nombre para testear creación de  libro
    nombreTestLibro = v7();
    nombreTestCategoria = v7();  
  })

  beforeEach(async () => {
      render (<TestComponent> <GestionLibros /> </TestComponent>);
  })

  it('Debería crear un libro correctamente', async () => {
    // Abrimos el modal de creación de libro haciendo clic en el botón correspondiente
    const btnArrirModalCrearLibro = await screen.findByRole('button', { name: /Crear/i });
    expect(btnArrirModalCrearLibro, "Button crear no esta en el documento").toBeInTheDocument();
    await userEvent.click(btnArrirModalCrearLibro);

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
  });

});
