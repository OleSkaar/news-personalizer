import React from 'react';
import { DOMStrings } from '../constants.js';

function ActionAreaButton(props) {
  return (
  <button 
    className={DOMStrings.button + ' ' + DOMStrings.cardActionButton + ' ' +
    ((props.buttonState === props.value) ? DOMStrings.cardActionButtonClicked : '')} 
    value={props.value} 
    onClick={props.onClick}>
    <p className={DOMStrings.cardActionButtonText}>{props.content}</p>
  </button>);
}

export default ActionAreaButton;