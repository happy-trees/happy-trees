import React from 'react';
import PropTypes from 'prop-types';
import styles from './game.css';

import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import sketch from '../../sketch/sketch';
import { beginListening, endListening, joinedGame, gameStarted, startNewRound } from '../../actions/socketActions';
import { getStrokes } from '../../selectors/drawingSelectors';
import { getUserNickname } from '../../selectors/authSelectors';
import { receiveStroke } from '../../actions/drawingActions';

import StatusBar from '../../components/gameInput/StatusBar';
import { getUserId } from '../../selectors/authSelectors';
import { getIsDrawing, getGameId, getRoundId, getIsPlaying } from '../../selectors/socketSelectors';
import GameInput from '../../components/gameInput/GameInput';

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
    roundId: PropTypes.string,
    nickname: PropTypes.string,
    isPlaying: PropTypes.bool.isRequired,
    startNewRound: PropTypes.func.isRequired
  }

  state = {
    cavasWidth: null,
    canvasHeight: null,
    time: null,
    guess: '',
  }

  socket = io('http://localhost:3000');

  componentDidMount() {
    const gameContainer = document.querySelector('#game-container');
    if(gameContainer && gameContainer.offsetWidth && gameContainer.offsetWidth) {
      this.setState({ 
        canvasWidth:  gameContainer.offsetWidth, 
        canvasHeight: gameContainer.offsetHeight 
      });
    }

    this.listenForGameEvents();
    this.socket.emit('find game');
  }

  listenForGameEvents = () => {
    this.props.startListening();

    this.socket.on('stroke', data => {
      this.props.receiveStroke(data);
    });

    this.socket.on('timer', ({ countdown, round }) => {
      console.log('round timer', countdown, round);
      this.setState({ time: countdown });
    });

    this.socket.on('joined game', gameId => this.props.joinedGame(gameId));

    this.socket.on('start game', (startRound) => {
      const { userId } = this.props;
      this.props.gameStarted(startRound, userId);
    });

    this.socket.on('correct answer', () => {
      console.log('someone made a correct answer');
    });

    this.socket.on('wrong answer', () => [
      console.log('someone made a wrong answer')
    ]);

    this.socket.on('intermission', ({ countdown }) => {
      console.log('intermission', countdown);
    });

    this.socket.on('new round', ({ round }) => {
      console.log('new round', round);
      this.props.startNewRound(round, this.props.userId);
    });

    this.socket.on('round over', () => {
      console.log('round over');
    });

    this.socket.on('game over', () => {
      console.log('game over');
    });
  }

  componentWillUnmount() {
    this.socket.removeListener('stroke');
    this.socket.emit('disconnect');
    this.props.stopListening();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  emitStroke = (data) => {
    const { gameId } = this.props;
    this.props.receiveStroke(data);
    this.socket.emit('stroke', { data, gameId });
  }

  emitAnswer = (e) => {
    e.preventDefault();
    const { gameId, roundId } = this.props;
    const { guess } = this.state;
    this.socket.emit('answer', {
      answer: guess,
      roundId,
      gameId,
      currentRoundNumber: 1
    });
    this.setState({ guess: '' });
  }
  
  render() {
    const { canvasWidth, canvasHeight, time, guess } = this.state;
    const { isDrawing, nickname, strokes, isPlaying } = this.props;
    
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
        {isPlaying && !isDrawing && <GameInput 
          guesses={3}
          guess={guess}
          handleSubmit={this.emitAnswer}
          handleChange={this.handleChange}
        />}
        
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  strokes: getStrokes(state),
  userId: getUserId(state),
  isDrawing: getIsDrawing(state),
  gameId: getGameId(state),
  roundId: getRoundId(state),
  nickname: getUserNickname(state),
  isPlaying: getIsPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  startListening: () => dispatch(beginListening()),
  stopListening: () => dispatch(endListening()),
  receiveStroke: (data) => dispatch(receiveStroke(data)),
  joinedGame: (gameId) => dispatch(joinedGame(gameId)),
  gameStarted: (startRound, userId) => dispatch(gameStarted(startRound, userId)),
  startNewRound: (round, userId) => dispatch(startNewRound(round, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
