import React from 'react';
import Card from '../card/card.jsx';
import emoji from '../utils.js';


function LoadMore(props) {
    return (
      <div className={"cardbox__load-more-wrapper " + (props.allArticlesRead ? '' : ' cardbox__load-more-wrapper--collapsed')}>
        <button className="button button--spacing button--large" onClick={props.loadMoreClick}>{emoji("➕", "Plus sign")} Load more!</button>
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
    <section className="cardbox">
      {cards}
    </section>
  );
}



export { Cardbox, LoadMore }
