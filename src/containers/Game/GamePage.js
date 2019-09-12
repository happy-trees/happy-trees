import React from 'react';
import styles from './game.css';

import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch from '../../sketch/sketch';

import StatusBar from '../../components/gameInput/StatusBar';

class GamePage extends React.Component {

  state = {
    cavasWidth: null,
    canvasHeight: null
  }

  socket = io('http://localhost:3000');

  componentDidMount() {
    const gameContainer = document.querySelector('#game-container');
    if(gameContainer && gameContainer.offsetWidth && gameContainer.offsetWidth)
      this.setState({ canvasWidth:  gameContainer.offsetWidth, canvasHeight: gameContainer.offsetHeight });
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
  }
  
  render() {
    const { canvasWidth, canvasHeight } = this.state;
    return (
      <>
        <StatusBar />
        <div id="game-container" className={styles.GameContainer}>
          <P5Wrapper sketch={sketch} color={'#000000'} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
        </div>
      </>
    );
  }
}

export default GamePage;
