import React from 'react';
import PropTypes from 'prop-types';
import styles from './game.css';

import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import sketch from '../../sketch/sketch';
import { beginListening, endListening, joinedGame, gameStarted } from '../../actions/socketActions';
import { getStrokes } from '../../selectors/drawingSelectors';
import { getUserNickname } from '../../selectors/authSelectors';
import { receiveStroke } from '../../actions/drawingActions';

import StatusBar from '../../components/gameInput/StatusBar';
import { getUserId } from '../../selectors/authSelectors';
import { getIsDrawing, getGameId } from '../../selectors/socketSelectors';

class GamePage extends React.Component {

  static propTypes ={
    startListening: PropTypes.func.isRequired,
    stopListening: PropTypes.func.isRequired,
    receiveStroke: PropTypes.func.isRequired,
    joinedGame: PropTypes.func.isRequired,
    gameStarted: PropTypes.func.isRequired,
    strokes: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    isDrawing: PropTypes.bool.isRequired,
    gameId: PropTypes.string,
    nickname: PropTypes.string
  }

  state = {
    cavasWidth: null,
    canvasHeight: null,
    time: null,
  }

  socket = io('http://localhost:3000');

  componentDidMount() {
    const gameContainer = document.querySelector('#game-container');
    if(gameContainer && gameContainer.offsetWidth && gameContainer.offsetWidth)
      this.setState({ 
        canvasWidth:  gameContainer.offsetWidth, 
        canvasHeight: gameContainer.offsetHeight 
      });

    this.socket.emit('find game');

    this.props.startListening();

    this.socket.on('stroke', data => {
      this.props.receiveStroke(data);
    });

    this.socket.on('timer', countdown => {
      this.setState({ time: countdown });
    });

    this.socket.on('joined game', gameId => this.props.joinedGame(gameId));

    this.socket.on('start game', (startRound) => {
      const { userId } = this.props;
      this.props.gameStarted(startRound, userId);
    });
  }

  componentWillUnmount() {
    this.socket.removeListener('stroke');
    this.socket.emit('disconnect');
    this.props.stopListening();
  }

  emitStroke = (data) => {
    const { gameId } = this.props;
    this.socket.emit('stroke', { data, gameId });
  }
  
  render() {
    const { canvasWidth, canvasHeight, time } = this.state;
    const { isDrawing, nickname, strokes } = this.props;
    
    return (
      <>
        <StatusBar nickname={nickname} time={time} />
      
        <div id="game-container" className={styles.GameContainer}>
          <P5Wrapper 
            sketch={sketch} 
            color={'#000000'} 
            canvasWidth={canvasWidth} 
            canvasHeight={canvasHeight}
            emitStroke={this.emitStroke}
            strokes={strokes}
            isDrawing={isDrawing}
          />
        </div>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  strokes: getStrokes(state),
  userId: getUserId(state),
  isDrawing: getIsDrawing(state),
  gameId: getGameId(state),
  nickname: getUserNickname(state)
});

const mapDispatchToProps = dispatch => ({
  startListening: () => dispatch(beginListening()),
  stopListening: () => dispatch(endListening()),
  receiveStroke: (data) => dispatch(receiveStroke(data)),
  joinedGame: (gameId) => dispatch(joinedGame(gameId)),
  gameStarted: (startRound, userId) => dispatch(gameStarted(startRound, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
