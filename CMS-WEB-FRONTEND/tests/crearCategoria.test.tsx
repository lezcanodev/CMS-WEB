import React from 'react';
import { beforeAll, expect, it, test, describe, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { vi } from 'vitest';


import {FormCrearCategoria} from '@/pages/dashboard/gestionCategorias';

let inputNombreDeCategoria: any = null;
let btnSubmitFormCrearCategoria: any = null;
let mockSubmitFormCategoria = vi.fn();
const mockCategoria = {
  nombre: 'test'
}
vi.mock('formik', () => ({
  useFormik: vi.fn()
}));

describe('Proceso de creación de categoría', async () => {

  beforeEach(() => {
      mockSubmitFormCategoria = vi.fn();
      // Mock the implementation of useFormik
      //useFormik.mockImplementation(() => ({
      //    submitForm: mockSubmitFormCategoria,
      //    values: { nombre: 'test' }, // Set initial values as needed
      //    resetForm: vi.fn(), // Mock resetForm if needed
      //    handleChange: vi.fn(),
      //    handleBlur: vi.fn(),
      //    touched: {},
      //    errors: {}
      //}));

      render(
          <FormCrearCategoria 
            openForm={true}
            setOpenForm={(s: any) => null}
            setEditCategory={(s: any) => null}
            editCategory={""}
            formikCategory={{
              resetForm: vi.fn(),
              submitForm: mockSubmitFormCategoria,
              handleChange: vi.fn(),
              handleBlur: vi.fn(),
              values: mockCategoria,
              touched: {
                nombre: "test"
              },
              errors: {
                nombre: "error_t"
              }
            }}
          />
      )
      //screen.debug();
      inputNombreDeCategoria = screen.getByRole('textbox', { name: /nombre/i });
  })

  //it('Debería renderizar el input de nombre de categoría', async () => {
  //  expect(inputNombreDeCategoria, "Input no se encuentra en el documento").toBeInTheDocument();
  //  expect(inputNombreDeCategoria, "Input debería se un tipo Object").toBeTypeOf('object');
  //})
  
  it('Debería tener el valor "test" el input de nombre de categoría', async () => {
    expect(inputNombreDeCategoria, "Input esta en el documento").toBeInTheDocument();
    expect(inputNombreDeCategoria, "Input debería tener el valor 'test'").toHaveValue('test');
  })

  it('Debería realizar el envio del formulario', async () => {
    //expect(btnSubmitFormCrearCategoria, "Botón para crear categoría no esta en el documento").toBeInTheDocument();
    btnSubmitFormCrearCategoria = await screen.findByRole('button', { name: /Confirmar/i });
    expect(btnSubmitFormCrearCategoria, "Button confirmar no esta en el documento").toBeInTheDocument();
    await userEvent.click(btnSubmitFormCrearCategoria);
    await waitFor(() =>
      expect(mockSubmitFormCategoria).toHaveBeenCalledWith() //mockCategoria
    )
  })
})