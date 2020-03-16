import React from 'react';
import Card from '../card/card.jsx';
import emoji from '../utils.js';
import { DOMStrings } from '../constants.js';


function LoadMore(props) {
    return (
      <div className={DOMStrings.cardboxLoadMoreWrapper + ' ' +
        (props.allArticlesRead ? '' : ' ' + DOMStrings.cardboxLoadMoreWrapperCollapsed)}>
        <button className={DOMStrings.button + ' ' + DOMStrings.buttonSpacing + ' ' + DOMStrings.buttonLarge}
                onClick={props.loadMoreClick}>{emoji("➕", "Plus sign")} Load more!</button>
      </div>
    )
}

function Cardbox(props) {
  const cards = [];
  let articleIndex = 0;
  for (const articleObject of props.topArticles) {
      cards.push(
          <Card
            key={articleIndex}
            index={articleIndex}
            article={articleObject}
            onClick={props.onClick}
          />
        );

      articleIndex++;
  }

  return (
    <section className={DOMStrings.cardbox}>
      {cards}
    </section>
  );
}



export { Cardbox, LoadMore }
