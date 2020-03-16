import React from 'react';
import { DOMStrings } from '../constants.js';

export function Headline(props) {
  return (<div className={DOMStrings.cardHeadline}>
    <a className={DOMStrings.cardHeadlineLink} 
        href={props.url} 
        target="blank">
      <h2 className={DOMStrings.cardHeadlineText}>{props.title}</h2>
    </a>
  </div>);
}
