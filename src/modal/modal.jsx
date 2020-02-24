import React from 'react';
import emoji from '../utils.js';

function Modal(props) {
  if (!props.modalRead) {
    return (
        <div className={"modal app " + props.mode}>
          <h1>{emoji("📰", "Newspaper")} Welcome to News Personalizer!</h1>
          <p className="modal--item">Vote up your favorite news sources, and downvote those you don't.
          <br /> {`Sources will be hidden after ${-1 * props.dislikeThreshold} downvotes.`}</p>
          <p className="modal--item">All the data is stored locally in your browser. You can clear it with the button in the footer.</p>
          <p className="modal--item">News stories are cached for five minutes, so don't expect instant results {emoji("😉", "Winking face")}</p>
          <button
            className="button button--large button--spacing button--top-margin"
            onClick={props.onClick}
            >
            {emoji("✔️", "Check mark")} Got it!
          </button>
        </div>
      );
  } else {
    return (
      <div></div>
    )
  }
}

export default Modal;
