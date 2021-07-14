import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ baseAmount, handle, switchToChangeAmount, handleChangeAmount }) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    { !switchToChangeAmount && <p onClick={handle} className="header-amount">{baseAmount} euro</p>}
    { switchToChangeAmount  && <input onChange={handleChangeAmount} className="header-amount" type="number" />} 
  </header>
);

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
};

export default Header;
