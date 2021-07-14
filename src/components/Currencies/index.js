import React from 'react';
import PropTypes from 'prop-types';


import './currencies.scss';

/*
{currencies.map((item) => {
        return (
          <li className="currency">
            {item.name}
          </li>
        )
      })}
et on simplifie en enlevant return et accolades parce que la seule instuction est
un return
*/

/*
ce qu'on utilise pour key doit être unique et stable dans le temps => pas d'index
*/


const Currencies = ({ currencies, handle }) => (
  <div className="currencies">
    <div className="currencies-title">Currencies</div>
    <ul>
      {currencies.map((item) => (
        <li onClick={handle} className="currency" key={item.name}>
          {item.name}
        </li>
      ))}
    </ul>
  </div>
);

Currencies.propTypes = {
  // nom de la prop : type de la valeur
  // currencies est un tableau qui contient des objets
  currencies: PropTypes.arrayOf(
    // chaque élément est un objet avec une "forme" précise
    PropTypes.shape({
      // chaque objet a les propriétés name (type string) et rate (type number)
      name: PropTypes.string.isRequired, // la propriété name est obligatoire
      rate: PropTypes.number.isRequired,
    }).isRequired, // obligatoire que les éléments aient cette forme
  ).isRequired,
};

export default Currencies;
