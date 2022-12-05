import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StarWarsProvider from '../context/StarWarsProvider';
import testData from './testData';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando a página Table', () => {
  test('Se todos os inputs estão na tela', () => {

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    const columnInput = screen.getByTestId('column-filter');
    expect(columnInput).toBeInTheDocument();

    const comparisonInput = screen.getByTestId('comparison-filter');
    expect(comparisonInput).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
  });

  test('Se os botões estão na tela', () => {

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const buttonFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(buttonFilter).toBeInTheDocument();

    const btnOrdenar = screen.getByRole('button', { name: /ordenar/i });
    expect(btnOrdenar).toBeInTheDocument();

    const btnRemoveFilter = screen.getByRole('button', { name: /remover todas filtragens/i });
    expect(btnRemoveFilter).toBeInTheDocument();
  });

  test('Verifica filtro POPULATION e MAIOR QUE', async () => {

    global.fetch = jest.fn(async () => ({
      json: async () => testData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const alderaan = await screen.findByText(/Alderaan/i)
    expect(alderaan).toBeInTheDocument();

    const coruscant = await screen.findByText(/coruscant/i)
    expect(coruscant).toBeInTheDocument();

    const comparison = screen.getByTestId('comparison-filter');
    fireEvent.change(comparison, {
      target: { value: 'maior que' }
    })
    const value = screen.getByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '999999999999');
    const btn = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btn);
    
    expect(coruscant).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();
  });

  test('Verifica filtro ROTATION PERIOD e MENOR QUE', async () => {

    global.fetch = jest.fn(async () => ({
      json: async () => testData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const tatooine = await screen.findByText(/Tatooine/i)
    expect(tatooine).toBeInTheDocument();

    const bespin = await screen.findByText(/bespin/i)
    expect(bespin).toBeInTheDocument();

    const column = screen.getByTestId('column-filter');
    fireEvent.change(column, {
      target: { value: 'rotation_period'}
    })
    const comparison = screen.getByTestId('comparison-filter');
    fireEvent.change(comparison, {
      target: { value: 'menor que' }
    })
    const value = screen.getByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '13');
    const btn = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btn);

    expect(bespin).toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();
  });

  test('Verifica filtro DIAMETER e IGUAL A', async () => {

    global.fetch = jest.fn(async () => ({
      json: async () => testData
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const endor = await screen.findByText(/endor/i)
    expect(endor).toBeInTheDocument();

    const diameter = screen.getByTestId('column-filter');
    fireEvent.change(diameter, {
      target: { value: 'diameter'}
    })
    const comparison = screen.getByTestId('comparison-filter');
    fireEvent.change(comparison, {
      target: { value: 'igual a' }
    })
    const value = screen.getByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '4900');
    const btn = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btn);

    expect(endor).toBeInTheDocument();
  });
});
