import React, { useEffect, useState } from 'react';
import requestApi from '../services/RequestAPI';

export default function Table() {
  const [nameInput, setNameInput] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    requestApi().then((results) => setData(results));
    // console.log(results);
  }, [setData]);

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
        <label htmlFor="name">
          Coluna:
          <select>
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="name">
          Operador:
          <select>
            <option>menor que</option>
            <option>maior que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          type="number"
        />
        <button
          type="button"
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
