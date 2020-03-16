import React from 'react';
import emoji from '../utils.js';
import { DOMStrings } from '../constants.js';

function Header(props) {
  return (
    <header className={DOMStrings.header}>
      <h1 className={DOMStrings.headerText}>{emoji("📰", "Newspaper")} News Personalizer</h1>
    </header>
  );
}

export default Header;
