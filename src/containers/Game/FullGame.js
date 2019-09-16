import React from 'react';
import GamePage from './GamePage';
import GameInput from '../../components/gameInput/GameInput';
import styles from './FullGame.css';


const FullGame = () => {

  return (
    <div className={styles.FullGame}>
      <h1>Happy Trees</h1>
      <div className={styles.Word}>
        <h3>W o r d</h3>
      </div>
      <GamePage />
      <div className={styles.GameInput}>
        <GameInput />
      </div>
    </div>
  );
};

export default FullGame;
