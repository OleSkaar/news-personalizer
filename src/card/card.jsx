import React from 'react';
import emoji from '../utils.js';
import placeholderImage from './placeholder.png'
import { DOMStrings } from '../constants.js';

export const articleCardClassNames = (baseClassname, isUsed) =>

    baseClassname  && isUsed + " card " + DOMStrings.cardUsed




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


export const  CardImage = (props)  => (
    <div className={DOMStrings.cardImage}>
      <img
        height="100%"
        src={ props.img || placeholderImage}
        alt={props.img == null ? "Can't load image" : props.alt}>
      </img>
    </div>)

function Headline(props) {
  return (
      <div className={DOMStrings.cardHeadline}>
          <a className={DOMStrings.cardHeadlineLink} href={props.url} target="blank">
            <h2 className={DOMStrings.cardHeadlineText}>{props.title}</h2>
          </a>
      </div>

  );
}

class ActionArea extends React.Component {
  renderActionAreaButton(value, content, label, index) {
    return (
      <ActionAreaButton
        value={value}
        content={emoji(content, label)}
        onClick={() => this.props.onClick(value, index)}
        buttonState={this.props.buttonState}
      />
    );
  }
  render() {
    return (
      <div className={DOMStrings.cardActionArea}>
        {this.renderActionAreaButton(1, "👍", "Thumbs up", this.props.index)}

        <div className={DOMStrings.cardPublisher}>
          <p className={DOMStrings.cardPublisherName}>{this.props.publisher.toUpperCase()}</p>
        </div>
        {this.renderActionAreaButton({
          buttonStatus: 0,
          emoji: "👎",
          label: "Thumbs down",
          index: this.props.index})}
        <ShortButton
            isUsed={true}
            label="Thumbs Down"
            index={this.props.index}
        >👎</ShortButton>
      </div>
    );
  }
}

const ShortButton = props => (
  <button
    className={DOMStrings.button + ' ' + DOMStrings.cardActionButton + ' ' +
    ((props.buttonState === props.value) ? DOMStrings.cardActionButtonClicked : '')}
    value={props.value}
    onClick={props.onClick}
  >
    <p className={DOMStrings.cardActionButtonText}>{props.content}</p>
    {props.children}
  </button>
)

function ActionAreaButton(props) {
  return(
    <button
      className={DOMStrings.button + ' ' + DOMStrings.cardActionButton + ' ' +
      ((props.buttonState === props.value) ? DOMStrings.cardActionButtonClicked : '')}
      value={props.value}
      onClick={props.onClick}
    >
      <p className={DOMStrings.cardActionButtonText}>{props.content}</p>
    </button>
  )
}





export default Card;
