import React from 'react';
import Game from '../containers/Game/GamePage';
import styles from './app.css';

import 'normalize.css';

export default function App() {
  return (
    <section>
      <h1>DRAW THE THING</h1>
      <Game />
    </section>
  );
}
