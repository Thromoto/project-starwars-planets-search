import PropTypes from 'prop-types';
import starWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  return (
    <starWarsContext.Provider value="algo">
      {children}
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = ({
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
});
