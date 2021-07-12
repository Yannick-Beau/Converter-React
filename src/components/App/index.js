// == Import npm
import React from 'react';

// == Import
import './styles.css';

import Converter from 'src/components/Converter';
import Currencies from 'src/components/Currencies';
import Result from 'src/components/Result';

import currencies from 'src/data/currencies';

// == Composant
const App = () => (
  <div className="app">
    <Converter />
    <Currencies currencies={currencies} />
    <Result />
  </div>
);

// == Export
export default App;
