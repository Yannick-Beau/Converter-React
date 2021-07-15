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

class Currencies extends React.Component {
  constructor(props) {
    super(props);

    console.log('   Currencies - constructor');
  }

  // appelé après le premier affichage du composant
  componentDidMount() {
    console.log('   Currencies - componentDidMount');
  }

  // appelé après chaque mise à jour de l'affichage du composant
  componentDidUpdate() {
    console.log('   Currencies - componentDidUpdate');
  }

  render() {
    console.log('   Currencies - render');

    const {
      currencies,
      handleClickCurrency,
      search,
      setSearch,
    } = this.props;

    return (
      <div className="currencies">
        <input
          className="currencies-search"
          type="text"
          placeholder="Rechercher une devise"
          onChange={(event) => {
            // console.log(event.currentTarget.value);
            setSearch(event.currentTarget.value);
          }}
          value={search}
        />
        <ul>
          {currencies.map((item) => (
            <li
              className="currency"
              key={item.name}
              onClick={() => {
                console.log('clic sur une devise');
                // on appelle la fonction fournie en prop
                handleClickCurrency(item.name);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

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
  // paramètre : le nom de la nouvelle devise
  handleClickCurrency: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  // paramètre : la nouvelle valeur
  setSearch: PropTypes.func.isRequired,
};

export default Currencies;
