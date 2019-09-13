import React from 'react';
//import Game from '../containers/Game/GamePage';
import styles from './app.css';
import Home from '../containers/Home/Home';

import 'normalize.css';
import PlayButton from './homePage/PlayButton';

export default function App() {
  return (
    <section>
      <h1>DRAW THE THING</h1>
      <Home />
    </section>
  );
}
