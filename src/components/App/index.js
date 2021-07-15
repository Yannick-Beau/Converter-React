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

/* Objectif : ajouter un input permettant de saisir un montant à convertir
x ajouter un input dans Header
- faire en sorte que cet input soit un champ contrôlé
   - avoir un champ dans le state pour stocker la valeur de l'input
   - contrôler le champ en lecture
   - contrôler le champ en écriture
(- la conversion devrait se refaire automatiquement)
*/

/*
Champ contrôlé : pour ne pas risquer d'avoir de différence de valeur entre le
state et l'input, on décide que le state est la seule source de vérité.
Si l'input veut changer sa valeur (saisie utilisateur) : il informe App, qui fera
appel à setState, donc ça provoquera un nouveau rendu, et App enverra en prop la
nouvelle valeur au composant qui contient l'input.
https://fr.reactjs.org/docs/forms.html

Etapes de mise en place d'un champ contrôlé :
- avoir un champ dans le state pour stocker la valeur de l'input
- contrôler le champ en lecture : fournir la valeur du state en prop du composant qui
contient le champ, et l'input utilise cette prop pour son attribut value. A ce stade,
l'input est en read-only, si on saisit des caractères ils n'apparaissent pas.
Pour vérifier : dans le React dev tool (Components), si on saisit une nouvelle
valeur dans le state, alors l'input change de valeur sur l'affichage.
Un warning dans la console "You provided a `value` prop to a form field without
an `onChange` handler" est normal, il disparaitra à l'étape suivante.
- contrôler le champ en écriture : préparer une méthode qui met à jour la valeur
du champ dans le state, fournir cette méthode en prop au composant qui contient
le champ. On appelle cette méthode dans le handler d'événement change du champ, en
fournissant comme argument event.currentTarget.value.
Pour vérifier : quand on saisit des caractères dans le champ, le state est mis à
jour (React dev tool, onglet "components"), et la nouvelle valeur apparaît dans
l'input
*/

/*
state (état) du composant : données qui peuvent changer au fil du temps. Si on
change ces données, React met automatiquement à jour l'affichage du composant.
Deux façons de mettre en place un state dans un composant :
- façon traditionnelle : transformer le composant pour l'écrire sous forme de classe
- façon moderne : avec le hook d'état (et le composant reste une fonction)

Un composant React c'est une fonction, sauf si...
- je veux utiliser un state
- je veux accéder aux méthodes du cycle de vie
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
    console.log('App - constructor');

    // fait appel au constructor de React.Component
    super(props);

    // initialisation du state (objet)
    this.state = {
      // indique si les devises sont affichées
      open: true,
      // valeur de l'input du montant
      baseAmount: '1',
      currency: 'United States Dollar',
      // valeur de l'input de recherche des devises
      inputSearch: '',
    };

    // en Javascript, quand on utilise une méthode en callback (par exemple pour
    // un écouteur d'événement), on perd la valeur de this
    // => on va "attacher" this à notre méthode
    // https://javascript.info/bind

    // on remplace la méthode handleClick par sa version améliorée à laquelle on
    // a attaché this
    this.handleClick = this.handleClick.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setBaseAmount = this.setBaseAmount.bind(this);
  }

  // appelé après le premier affichage du composant
  componentDidMount() {
    console.log('App - componentDidMount');

    this.updateTitle();
  }

  // appelé après chaque mise à jour de l'affichage du composant
  // dans les paramètres de componentDidUpdate, on a accès aux props et au state
  // qu'il y avait avant le nouveau rendu => on peut comparer avec les props actuelles
  // ou le state actuel pour personnaliser le traitement
  componentDidUpdate(prevProps, prevState) {
    console.log('App - componentDidUpdate');
    // console.log(prevState);
    // console.log(this.state);

    const { currency } = this.state;

    // on veut mettre à jour le titre seulement quand la devise a changé
    if (prevState.currency !== currency) {
      this.updateTitle();
    }
  }

  // handler pour quand on clique sur le bouton
  handleClick() {
    // console.log('clic !');

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

  setCurrency(newCurrencyName) {
    this.setState({
      currency: newCurrencyName,
    });
  }

  // met à jour inputSearch dans le state en utilisant la nouvelle valeur fournie
  // en paramètre
  setSearch(newValue) {
    this.setState({
      inputSearch: newValue,
    });
  }

  setBaseAmount(newValue) {
    this.setState({
      baseAmount: newValue,
    });
  }

  // met à jour le titre de la page
  updateTitle() {
    console.log('mise à jour du titre');
    const { currency } = this.state;
    document.title = `Converter - ${currency}`;
  }

  computeAmount() {
    const { baseAmount, currency } = this.state;

    const baseAmountAsNumber = parseInt(baseAmount, 10);

    // récupérer le taux de conversion (à partir de la devise sélectionnée)
    // on récupère la valeur de "rate" pour la devise qui a pour nom la valeur de "currency"
    const selectedCurrency = currenciesList.find((item) => item.name === currency);
    // eslint-disable-next-line prefer-destructuring
    const rate = selectedCurrency.rate;

    // multiplier le montant de base par le taux de conversion
    const result = baseAmountAsNumber * rate;

    // astuce pour arrondir à 2 décimales
    return (Math.round(result * 100) / 100);
  }

  // la méthode render d'un composant : retourne le JSX
  render() {
    console.log('App - render');
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
      currency,
      inputSearch,
      baseAmount,
    } = this.state;
    const result = this.computeAmount();

    let filteredCurrencies;

    // si le champ de recherche est vide => toutes les devises
    if (inputSearch.length === 0) {
      filteredCurrencies = currenciesList;
    }
    else {
      // sinon => on filtre en fonction de la valeur du champ
      filteredCurrencies = currenciesList.filter((item) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase

        // passer en minuscule la chaine à rechercher et le nom de la devise
        const inputSearchLowered = inputSearch.toLowerCase();
        const nameLowered = item.name.toLowerCase();

        // regarder si le nom de la devise inclut la chaine à rechercher
        return nameLowered.includes(inputSearchLowered);
      });
    }

    return (
      <div className="app">
        <Header baseAmount={baseAmount} setBaseAmount={this.setBaseAmount} />
        <CustomButton manageClick={this.handleClick} />
        {open && (
          <Currencies
            currencies={filteredCurrencies}
            handleClickCurrency={this.setCurrency}
            search={inputSearch}
            setSearch={this.setSearch}
          />
        )}
        <Amount amount={result} currency={currency} />
      </div>
    );
  }
}

// == Export
export default App;
