import React from 'react';
import PropTypes from 'prop-types';

import './amount.scss';

const Amount = ({ amount, currency }) => (
  <div className="amount">
    <p className="amount-value">{amount}</p>
    <p className="amount-currency">{currency}</p>
  </div>
);

Amount.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Amount;
