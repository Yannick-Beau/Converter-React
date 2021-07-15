import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ baseAmount, setBaseAmount }) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    <input
      type="text"
      className="header-input"
      value={baseAmount}
      onChange={(event) => {
        setBaseAmount(event.currentTarget.value);
      }}
    />
    <p className="header-amount">euro</p>
  </header>
);

Header.propTypes = {
  baseAmount: PropTypes.string.isRequired,
  // paramètre : nouvelle valeur
  setBaseAmount: PropTypes.func.isRequired,
};

export default Header;
