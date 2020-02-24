import React from 'react';
import emoji from '../utils.js';

function Header(props) {
  return (
    <header className="header">
      <h1 className="header__text">{emoji("📰", "Newspaper")} News Personalizer</h1>
    </header>
  );
}

export default Header;
