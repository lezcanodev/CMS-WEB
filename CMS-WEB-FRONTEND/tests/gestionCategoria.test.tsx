import React, { act } from 'react';
import { expect, it, describe, beforeEach, beforeAll } from 'vitest'
import {  render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest';
import GestionCategorias from '../src/pages/dashboard/gestionCategorias/index';
import { TestComponent } from './utils/TestComponent';


describe('CRUD Categoría', async () => {

  beforeAll(() => {
      
  })

  beforeEach(async () => {
      render (<TestComponent> <GestionCategorias /> </TestComponent>);
  })

  it('Debería crear una nueva categoría correctamente', async () => {
    // Abrimos el modal de creación de categoría haciendo clic en el botón correspondiente
    const btnArrirModalCrearCategoria = await screen.findByRole('button', { name: /Crear/i });
    expect(btnArrirModalCrearCategoria, "Button crear no esta en el documento").toBeInTheDocument();
    await userEvent.click(btnArrirModalCrearCategoria);

    // Obtenemos el botón para confirmar la creación de la categoría
    const btnConfirmarConfermacion = await screen.findByRole('button', { name: /Confirmar/i });
    expect(btnConfirmarConfermacion, "Button confirmar no esta en el documento").toBeInTheDocument();
    
    // Localizamos el campo de texto donde se ingresa el nombre de la categoría
    const nombreCategoria = screen.getByRole('textbox', { name: /nombre/i });
    expect(nombreCategoria).toBeDefined();
    await userEvent.type(nombreCategoria, 'Categoria test');

    // creamos la categoría
    await userEvent.click(btnConfirmarConfermacion);

    // Esperamos que el mensaje de confirmación aparezca en el modal
    
    //await waitFor(async () => {
    //  expect(await screen.findByText(/Se ha realizado la operación correctamente/i)).toBeInTheDocument()
    //});
    //act(async () => {
    //  const mensajeConfirmacion = await screen.findByText(/Se ha realizado la operación correctamente/i);
    //  expect(mensajeConfirmacion, "No se mostró mensaje de confirmación").toBeInTheDocument();
    //})

  });

  it('Debería mostrar un error si nombre categoría esta vacía', async () => {

    // Abrimos el modal de creación de categoría haciendo clic en el botón correspondiente
    const btnArrirModalCrearCategoria = await screen.findByRole('button', { name: /Crear/i });
    expect(btnArrirModalCrearCategoria, "Button crear no esta en el documento").toBeInTheDocument();
    await userEvent.click(btnArrirModalCrearCategoria);

    // Obtenemos el botón para confirmar la creación de la categoría
    const btnConfirmarConfermacion = await screen.findByRole('button', { name: /Confirmar/i });
    expect(btnConfirmarConfermacion, "Button confirmar no esta en el documento").toBeInTheDocument();
    
    // Localizamos el campo de texto donde se ingresa el nombre de la categoría
    const nombreCategoria = screen.getByRole('textbox', { name: /nombre/i });
    expect(nombreCategoria).toBeDefined();

    // Intentamos crear la categoría
    await userEvent.click(btnConfirmarConfermacion);

    // Verificamos que se muestra un mensaje de error 
    const mensajeError = screen.getByText(/El campo es obligatorio/i);
    expect(mensajeError, "No se mostró mensaje de error para nombre vacío").toBeInTheDocument();

  });

});
