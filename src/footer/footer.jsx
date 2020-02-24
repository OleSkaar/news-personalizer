import React from 'react';
import emoji from '../utils.js';

function Footer(props) {
  let mode = props.mode === 'light' ? "Dark mode" : "Light mode"
  let modeEmoji = props.mode === 'light' ? emoji("🌑", mode) : emoji("☀️", mode)

  return (
    <footer className="footer">
      <p>Built with&nbsp;
        <a className="footer--links" href="https://create-react-app.dev/">create-react-app</a> and&nbsp;
        <a className="footer--links" href="https://newsapi.org/">NewsAPI</a> by&nbsp;
        <a className="footer--links" href="https://github.com/oleskaar">Ole Skaar</a>.
      </p>
      <button
        className="button button--spacing footer--spacing"
        onClick={() => localStorage.clear()}>
        {emoji("🗑️", "Trash can")} Clear my data
      </button>
      <button
        className="button button--spacing footer--spacing"
        onClick={props.toggleModal}>
        {emoji("❔", "Info")} Info
      </button>
      <button
        className="button button--spacing footer--spacing"
        onClick={props.onClick}>
        {modeEmoji} {mode}
      </button>
    </footer>
  );
}

export default Footer;
