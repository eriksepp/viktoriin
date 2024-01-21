import React from 'react';
import styles from './ActionButton.module.css';

// Button is shown at all stages of the app with custom text and onClick action.
const ActionButton = ({ text, inactive, onClick }) => {
  // inactive is true when user hasn't chosen any answer for a question, 
  // button is then disabled, grey and with default cursor.
  const buttonClasses = `${styles.actionButton} 
    ${inactive ? styles.inactive : styles.active}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={inactive}>
      {text}
    </button>
  );
};

export default ActionButton;