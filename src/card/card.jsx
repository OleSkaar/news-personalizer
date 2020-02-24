import React from 'react';
import emoji from '../utils.js';
import placeholderImage from './placeholder.png'


class Card extends React.Component {
  render() {
    const articleData = this.props.article.data;
    return (
      <div className={"card " + (this.props.article.isUsed() ? 'card--used ' : '')}>
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


function CardImage(props) {
  return (
    <div className="card__image">
      <img
        height="100%"
        src={props.img == null ? placeholderImage : props.img}
        alt={props.img == null ? "Can't load image" : props.alt}>
      </img>
    </div>
  );
}


function Headline(props) {
  return (
      <div className="card__headline-area">
          <a className="card__headline-area--link" href={props.url} target="blank">
            <h2 className="card__headline-area--text">{props.title}</h2>
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
      <div className="card__action-area">
        {this.renderActionAreaButton(1, "👍", "Thumbs up", this.props.index)}

        <div className="card__publisher">
          <p className="card__publisher-name">{this.props.publisher.toUpperCase()}</p>
        </div>
        {this.renderActionAreaButton(0, "👎", "Thumbs down", this.props.index)}
      </div>
    );
  }
}

function ActionAreaButton(props) {
  return(
    <button
      className={"button card__action-button " + ((props.buttonState === props.value) ? "card__action-button--clicked" : '')}
      value={props.value}
      onClick={props.onClick}
    >
      <p className="card__action-button--text">{props.content}</p>
    </button>
  )
}





export default Card;
