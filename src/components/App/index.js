// == Import npm
import React from 'react';

// == Import
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import CustomButton from 'src/components/CustomButton';

import './styles.scss';

// import des données
import currenciesList from 'src/data/currencies';

/* Objectif : faire la conversion (avoir dans Amount le vrai résultat de la conversion)
*/

/*
state (état) du composant : données qui peuvent changer au fil du temps. Si on
change ces données, React met automatiquement à jour l'affichage du composant.
Deux façons de mettre en place un state dans un composant :
- façon traditionnelle : transformer le composant pour l'écrire sous forme de classe
- façon moderne : avec le hook d'état (et le composant reste une fonction)

Un composant React c'est une fonction, sauf si...
- je veux utiliser un state
=> dans ce cas, on convertit le composant fonction en classe
https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class

Mise en place d'un state :
- transformer le composant en classe
- ajouter l'initalisation du state dans le constructeur
- pour lire le state, 2 façons :
  - this.state.nomInfo
  - destructuring : const { nomInfo } = this.state;
- pour modifier le state, appel à la méthode this.setState
*/

// == Composant
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  constructor(props) {
    // fait appel au constructor de React.Component
    super(props);

    // initialisation du state (objet)
    this.state = {
      // indique si les devises sont affichées
      open: true,
      switchToChangeAmount: false,
      baseAmount: 1,
      currency: 'United States Dollar',
      inputSearch: '',
      inputAmount: '',
    };

    // en Javascript, quand on utilise une méthode en callback (par exemple pour
    // un écouteur d'événement), on perd la valeur de this
    // => on va "attacher" this à notre méthode
    // https://javascript.info/bind

    // on remplace la méthode handleClick par sa version améliorée à laquelle on
    // a attaché this
    this.handleClick = this.handleClick.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.handleClickOnBaseAmount = this.handleClickOnBaseAmount.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  // handler pour quand on clique sur le bouton
  handleClick() {
    console.log('clic !');

    const { open } = this.state;

    // négation de la valeur de open : si open est false, !open est true

    // INTERDIT de modifier directement le state, il faut passer par la
    // méthode setState, sinon React ne voit pas qu'on a mis à jour le state
    // et donc l'affichage n'est pas mis à jour
    // this.state.open = !this.state.open;

    // on décrit les modifications à appliquer sur le state
    // => automatiquement React va refaire le rendu du composant App en
    // utilisant les nouvelles valeurs du state
    this.setState({
      open: !open,
    });

    // en fait, setState PLANIFIE une mise à jour du state
    // => si on fait un console.log juste après, on voit l'ancienne valeur
    // avant la mise à jour
    // console.log(this.state.open);
  }

  handleChangeAmount(newAmount) {
    this.setState({
      baseAmount: parseInt(newAmount, 10),
      inputAmount: newAmount,
    });
  }

  handleClickOnBaseAmount() {
    const { switchToChangeAmount } = this.state;
    console.log(switchToChangeAmount);
    console.log('clic sur baseAmount');
    this.setState({
      switchToChangeAmount: !switchToChangeAmount,
    });
    console.log(switchToChangeAmount);
  }

  setSearch(newValue) {
    this.setState({
      inputSearch: newValue,
    });
  }

  setCurrency(newCurrency) {
    console.log('clic sur une currency !');
    this.setState({
      currency: newCurrency,
    });
  }

  computeAmount() {
    const { baseAmount, currency } = this.state;

    // TODO faire le calcul et retourner le résultat
    // récupérer le taux de conversion (à partir de la devise sélectionnée)
    // on récupère la valeur de "rate" pour la devise qui a pour nom la valeur de "currency"
    const selectedCurrency = currenciesList.find((item) => item.name === currency);
    // eslint-disable-next-line prefer-destructuring
    const rate = selectedCurrency.rate;

    // multiplier le montant de base par le taux de conversion
    const result = (baseAmount * rate).toFixed(2);

    return result;
  }

  // la méthode render d'un composant : retourne le JSX
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

    const {
      open,
      baseAmount,
      currency,
      switchToChangeAmount,
      inputSearch,
      inputAmount,
    } = this.state;
    const result = this.computeAmount();

    const filteredCurrencies = currenciesList;

    return (
      <div className="app">
        <Header
          handle={this.handleClickOnBaseAmount}
          baseAmount={baseAmount}
          switchToChangeAmount={switchToChangeAmount}
          handleChangeAmount={this.handleChangeAmount}
          inputAmount={inputAmount}
        />
       <CustomButton handleClick={this.handleClick} />
        {open && (
          <Currencies
            handleClickCurrency={this.setCurrency}
            currencies={filteredCurrencies}
            search={inputSearch}
            setSearch={this.setState}
          />
        )}
        <Amount amount={result} currency={currency} />
      </div>
    );
  }
}

// == Export
export default App;
