import React from 'react';
import PropTypes from 'prop-types';

import './customButton.scss';

const CustomButton = ({ handleClick }) => (
  <button
    className="custom-button"
    type="button"
    onClick={handleClick}
  >
    =
  </button>
);

CustomButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CustomButton;
