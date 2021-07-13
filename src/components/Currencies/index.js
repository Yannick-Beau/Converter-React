import React from 'react';
import PropTypes from 'prop-types';

import './currencies.scss';


const Currencies = ({currencies}) => (
  <select className="currencies" name="currencies" id="currency-select" size="6">
    <option className="currency" value="">Currencies</option>
    {currencies.map((item) => (
      <option key={item.name} className="currency" value={item.rate}>{item.name}</option>
    ))}
  </select>
);

Currencies.propTypes = {
  /* tableau d'objets : on indique la forme des objets (les propriétés avec leur type) */
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired, // obligatoire que rate soit un nombre
    }).isRequired, // obligatoire de respecter le format
  ).isRequired, // la prop ingredients est obligatoire
};

export default Currencies;
