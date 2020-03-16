import React from 'react';
import placeholderImage from './placeholder.png';
import { DOMStrings } from '../constants.js';

export const CardImage = (props) => (<div className={DOMStrings.cardImage}>
  <img height="100%" src={props.img || placeholderImage} alt={props.img == null ? "Can't load image" : props.alt}>
  </img>
</div>);
