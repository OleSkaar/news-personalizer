import React from 'react';
import './cardbox.scss';
import Card from '../card/card.jsx';
import { DOMStrings } from '../constants.js';

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

export default Cardbox;