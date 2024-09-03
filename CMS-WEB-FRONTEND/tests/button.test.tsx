import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Button } from './button';


test('Retornar un botón con el label y evento click correctos', () => {
  const handleClick = jest.fn();

  render(<Button label="Label" onClick={handleClick} />);

  // verificamos el correcto renderizado del elemento  
  const buttonElement = screen.getByText('Label');
  expect(buttonElement).toBeInTheDocument();

  // probamos el evento click
  fireEvent.click(buttonElement);

  // verificamos que el resultado del click sea el esperado
  expect(handleClick).toHaveBeenCalledTimes(1);
});