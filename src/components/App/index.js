// == Import npm
import React from 'react';

// == Import
import './styles.scss';

import Converter from 'src/components/Converter';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';

import currencies from 'src/data/currencies';

/* Objectif : pouvoir afficher ou masquer la liste des devises grâce à un bouton
- en fonction d'une variable dans App, ne pas afficher Currencies
- mettre en place un bouton
- gérer un événement clic sur le bouton, et "connecter" le traitement avec la
variable pour modifier l'affichage
*/

// == Composant
class App extends React.Component {
  constructor(props) {
    // fait appel au constructor de React.Component
    super(props);

    // initialisation du state (objet)
    this.state = {
      open: true,
    };
  }
  render() {
    /*
    on voudrait faire quelque chose comme ça :
    if (open === true) <Currencies currencies={currenciesList} />

    if (a > 2 && b < 5) {
      faire quelque chose
    }

    Javascript sait que pour que la condition soit vraie, il faut que
    les deux sous-conditions soient vraies => donc s'il voit que la première
    condition est fausse, il s'arrête là, il n'étudie pas la deuxième condition

    affichage conditionnel de composant en React :
    {open === true && <Currencies currencies={currenciesList} />}
    - si open est faux, on s'arrête là => le composant n'est pas affiché
    - si open est vrai, on "étudie" la suite => le composant est affiché

    Si la variable est un booléen on peut optimiser :
    {open && <Currencies currencies={currenciesList} />}
    */
    const { open } = this.state;
    return(
      <div className="app">
        <Converter />
        <button
            type="button"
            onClick={() => {
              console.log('clic !');
              // négation de la valeur de open : si open est false, !open est true
              this.setState({
                open: !open,
              });
            }}
          >
            Toggle currencies
        </button>
        {open && <Currencies currencies={currencies} />}
        <Result />
      </div>
    );
  }
}


// == Export
export default App;
