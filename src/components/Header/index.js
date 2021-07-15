import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({
  baseAmount,
  handle,
  switchToChangeAmount,
  handleChangeAmount,
  inputAmount,
}) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    { !switchToChangeAmount && <p onClick={handle} className="header-amount">{baseAmount} euro</p>}
    { switchToChangeAmount && <input onChange={(event) => {handleChangeAmount(event.currentTarget.value)}} className="header-inputAmount" type="text" value={inputAmount} />}
  </header>
);

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  handle: PropTypes.func.isRequired,
  switchToChangeAmount: PropTypes.bool.isRequired,
  handleChangeAmount: PropTypes.func.isRequired,
  inputAmount: PropTypes.string.isRequired,
};

export default Header;
