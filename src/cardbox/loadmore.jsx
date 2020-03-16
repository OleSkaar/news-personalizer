import React from 'react';
import { emoji } from '../utils.js';
import { DOMStrings } from '../constants.js';

function LoadMore(props) {
  return (
  <div className={DOMStrings.cardboxLoadMoreWrapper + ' ' +
    (props.allArticlesRead ? '' : ' ' + DOMStrings.cardboxLoadMoreWrapperCollapsed)}>
    <button 
        className={DOMStrings.button + ' ' + DOMStrings.buttonSpacing + ' ' + DOMStrings.buttonLarge} 
        onClick={props.loadMoreClick}>{emoji("➕", "Plus sign")} Load more!</button>
  </div>);
}

export default LoadMore;