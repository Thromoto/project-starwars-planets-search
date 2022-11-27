import React, { useEffect, useState } from 'react';
import requestApi from '../services/RequestAPI';

export default function Table() {
  const [nameInput, setNameInput] = useState('');
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    requestApi().then((results) => setData(results));
    // console.log(results);
  }, [setData]);

  const filterData = (linha) => {
    const bools = [];
    selectedFilter.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(linha[filter.column] > parseFloat(filter.value));
        break;
      case 'menor que':
        bools.push(linha[filter.column] < parseFloat(filter.value));
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.value);
        break;
      default:
        break;
      }
    });
    return bools.every((el) => el);
  };

  return (
    <main>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          type="text"
          name="nameInput"
          value={ nameInput }
          onChange={ ({ target }) => setNameInput(target.value) }
        />
      </label>

      <div>
        <label htmlFor="column-filter">
          Coluna:
          <select
            data-testid="column-filter"
            value={ selected.column }
            onChange={ ({ target }) => setSelected(
              (prev) => ({ ...prev, column: target.value }),
            ) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            data-testid="comparison-filter"
            value={ selected.comparison }
            onChange={ ({ target }) => setSelected(
              (prev) => ({ ...prev, comparison: target.value }),
            ) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ ({ target }) => setSelected(
            (prev) => ({ ...prev, value: target.value }),
          ) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setSelectedFilter((prev) => ([
              ...prev,
              selected,
            ]));
            // setSelected({
            //   column: '',
            //   comparison: '',
            //   value: 0,
            // });
          } }
        >
          Filtrar
        </button>
        <label htmlFor="name">
          Ordenar:
          <select>
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="name">
          <input
            type="radio"
          />
          Ascendente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
          />
          Descendente
        </label>
        <button
          type="button"
        >
          Ordenar
        </button>
      </div>

      {selectedFilter.map((filters, index) => (
        <div key={ index }>
          <span>
            {filters.column}
            {' '}
            {filters.comparison}
            {' '}
            {filters.value}
          </span>
        </div>
      ))}

      <table className="row">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data
              .filter((linha) => (
                linha.name.toUpperCase().includes(nameInput.toUpperCase())
              ))
              .filter(filterData)
              .map((el) => (
                <tr key={ el.name }>
                  <td>{el.name}</td>
                  <td>{el.rotation_period}</td>
                  <td>{el.orbital_period}</td>
                  <td>{el.diameter}</td>
                  <td>{el.climate}</td>
                  <td>{el.gravity}</td>
                  <td>{el.terrain}</td>
                  <td>{el.surface_water}</td>
                  <td>{el.population}</td>
                  <td>{el.films}</td>
                  <td>{el.created}</td>
                  <td>{el.edited}</td>
                  <td>{el.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </main>
  );
}
