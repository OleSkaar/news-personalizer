import React from 'react';
import emoji from '../utils.js';
import { DOMStrings } from '../constants.js';

function Footer(props) {
  let mode = props.mode === DOMStrings.light ? "Dark mode" : "Light mode"
  let modeEmoji = props.mode === DOMStrings.light ? emoji("🌑", mode) : emoji("☀️", mode)

  return (
    <footer className={DOMStrings.footer}>
      <p>Built with&nbsp;
        <a className={DOMStrings.footerLinks} href="https://create-react-app.dev/">create-react-app</a> and&nbsp;
        <a className={DOMStrings.footerLinks} href="https://newsapi.org/">NewsAPI</a> by&nbsp;
        <a className={DOMStrings.footerLinks} href="https://github.com/oleskaar">Ole Skaar</a>.
      </p>
      <button
        className={DOMStrings.button + ' ' + DOMStrings.buttonSpacing + ' ' + DOMStrings.footerSpacing}
        onClick={() => localStorage.clear()}>
        {emoji("🗑️", "Trash can")} Clear my data
      </button>
      <button
        className={DOMStrings.button + ' ' + DOMStrings.buttonSpacing + ' ' + DOMStrings.footerSpacing}
        onClick={props.toggleModal}>
        {emoji("❔", "Info")} Info
      </button>
      <button
        className={DOMStrings.button + ' ' + DOMStrings.buttonSpacing + ' ' + DOMStrings.footerSpacing}
        onClick={props.onClick}>
        {modeEmoji} {mode}
      </button>
    </footer>
  );
}

export default Footer;
