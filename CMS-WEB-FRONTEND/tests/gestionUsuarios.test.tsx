import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestComponent } from './utils/TestComponent';
import GestionUsuarios from '../src/pages/dashboard/gestionUsuarios/index';
import userEvent from '@testing-library/user-event';

test.skip('renderiza el nombre del usuario', async () => {
    // Renderizamos el componente con propiedades de prueba
    render(<TestComponent><GestionUsuarios /></TestComponent>);

    let btnAbrirModalCrearUsuario;
    try {
        // Localizamos el botón para abrir el modal de creación de usuario
        btnAbrirModalCrearUsuario = await screen.findByRole('button', { name: /Crear/i });
    } catch (error) {
        console.error('Error localizando el botón Crear:', error);
    }
    expect(btnAbrirModalCrearUsuario).toBeInTheDocument();

    // Simulamos un clic para abrir la creación de usuario
    await userEvent.click(btnAbrirModalCrearUsuario);

    let btnConfirmarConfirmacion;
    try {
        // Localizamos el botón para confirmar la creación del usuario
        btnConfirmarConfirmacion = await screen.findByRole('button', { name: /Confirmar/i });
    } catch (error) {
        console.error('Error localizando el botón Confirmar:', error);
    }
    expect(btnConfirmarConfirmacion).toBeInTheDocument();

    let nombreUsuario;
    try {
        // Localizamos el campo de texto donde se ingresa el nombre del usuario
        nombreUsuario = await screen.findByRole('textbox', { name: /nombre/i });
    } catch (error) {
        console.error('Error localizando el campo Nombre:', error);
    }
    expect(nombreUsuario).toBeInTheDocument();
    
    // Escribimos el nombre del usuario
    await userEvent.type(nombreUsuario, "Usuario_Prueba");

    let rolSeleccionado;
    try {
        // Localizamos el seleccionador de roles
        rolSeleccionado = await screen.findByRole('combobox', { name: /rol/i });
    } catch (error) {
        console.error('Error localizando el combobox de roles:', error);
    }
    expect(rolSeleccionado).toBeInTheDocument();

    let contraseña;
    try {
        // Localizamos el campo de texto donde se ingresa la contraseña
        contraseña = await screen.findByLabelText(/contraseña/i);
    } catch (error) {
        console.error('Error localizando el campo Contraseña:', error);
    }
    expect(contraseña).toBeInTheDocument();
    
    // Escribimos la contraseña
    await userEvent.type(contraseña, "Contraseña_Prueba");

    // Confirmamos la creación del usuario
    await userEvent.click(btnConfirmarConfirmacion);
});


  test('')