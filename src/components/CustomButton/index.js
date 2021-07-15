import React from 'react';
import PropTypes from 'prop-types';

import './customButton.scss';

/*
    onClick={() => {
      manageClick();
    }}

    si on n'a pas d'argument à transmettre
    onClick={manageClick}
*/

const CustomButton = ({ manageClick }) => (
  <button
    className="custom-button"
    type="button"
    onClick={manageClick}
  >
    =
  </button>
);

CustomButton.propTypes = {
  manageClick: PropTypes.func.isRequired,
}

export default CustomButton;
