import React from 'react';
import { emoji } from '../utils.js';
import { DOMStrings } from '../constants.js';
import ActionAreaButton from './actionareabutton';

export class ActionArea extends React.Component {
  likeValue = 1;
  dislikeValue = 0;
  render() {
    return (<React.Fragment>
      <div className={DOMStrings.cardActionArea}>

        <ActionAreaButton 
            value={this.likeValue} 
            content={emoji("👍", "Thumbs up")} 
            onClick={() => this.props.onClick(this.likeValue, this.props.index)} 
            buttonState={this.props.buttonState} />

        <div className={DOMStrings.cardPublisher}>
          <p className={DOMStrings.cardPublisherName}>{this.props.publisher.toUpperCase()}</p>
        </div>

        <ActionAreaButton 
            value={this.dislikeValue} 
            content={emoji("👎", "Thumbs down")} 
            onClick={() => this.props.onClick(this.dislikeValue, this.props.index)} 
            buttonState={this.props.buttonState} />

      </div>
    </React.Fragment>);
  }
}
