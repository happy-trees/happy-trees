import React from 'react';
import styles from './game.css';

import io from 'socket.io-client';

class GamePage extends React.Component {

  socket = io('http://localhost:3000');

  componentWillUnmount() {
    this.socket.emit('disconnect');
  }
  
  render() {
    return (
      <div className={styles.GameContainer}>
  
      </div>
    );
  }
}

export default GamePage;
