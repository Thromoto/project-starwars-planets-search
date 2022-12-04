import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Testando o componente Table', () => {
  render(<App />);
  const labelElement = screen.getByTestId('name-filter');
  expect(labelElement).toBeInTheDocument();
});
