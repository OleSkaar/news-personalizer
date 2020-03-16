import React from 'react';
import './card.scss';
import '../button/button.scss';
import { DOMStrings } from '../constants.js';
import { CardImage } from './cardimage';
import { Headline } from './headline';
import { ActionArea } from './actionarea';

export const articleCardClassNames = (baseClassname, isUsed) =>
  baseClassname + ' ' + (isUsed ? DOMStrings.cardUsed : '')

class Card extends React.Component {
  render() {
    const articleData = this.props.article.data;
    return (
      <div className={articleCardClassNames(DOMStrings.card, this.props.article.isUsed())}>
        <CardImage
          img={articleData.urlToImage}
          alt={articleData.title}
          />
        <Headline
          title={articleData.title}
          url={articleData.url}
          />
        <ActionArea
          index={this.props.index}
          publisher={articleData.source.name}
          onClick={this.props.onClick}
          isUsed={this.props.article.isUsed()}
          buttonState={this.props.article.buttonState}
        />
      </div>
    );
  }
}


export default Card;
