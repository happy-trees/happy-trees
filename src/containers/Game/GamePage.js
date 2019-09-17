import React from 'react';
import PropTypes from 'prop-types';

import styles from './FullGame.css';

import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import sketch from '../../sketch/sketch';
import { beginListening, endListening, joinedGame, gameStarted, startNewRound, guestAnswered, correctylyAnswered } from '../../actions/socketActions';
import { getStrokes } from '../../selectors/drawingSelectors';
import { getUserNickname } from '../../selectors/authSelectors';
import { receiveStroke } from '../../actions/drawingActions';

import StatusBar from '../../components/gameInput/StatusBar';
import { getUserId } from '../../selectors/authSelectors';
import { getIsDrawing, getGameId, getRoundId, getIsPlaying, getGuesses } from '../../selectors/socketSelectors';
import GameInput from '../../components/gameInput/GameInput';
import ModalStats from '../../components/modal/ModalStats';

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
    guestAnswered: PropTypes.func,
    guesses: PropTypes.array,
    correctlyAnswered: PropTypes.func,
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
      console.log('round ',  round.roundNumber);
      this.setState({ time: countdown });
    });

    this.socket.on('joined game', gameId => this.props.joinedGame(gameId));

    this.socket.on('start game', ({ round }) => {
      const { userId } = this.props;
      console.log('start game', round);
      this.props.gameStarted(round, userId);
    });

    this.socket.on('correct answer', ({ answer, nickname }) => {
      console.log('someone made a correct answer', answer, nickname);
      this.props.correctlyAnswered(answer, nickname);
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
    const { guess, answer, nickname } = this.state;
    this.socket.emit('answer', {
      answer: guess,
      roundId,
      gameId,
      currentRoundNumber: 1
    });
    this.props.guestAnswered(guess);
    this.props.correctlyAnswered(answer, nickname);
    this.setState({ guess: '' });
    
  }

  
  render() {
    const { canvasWidth, canvasHeight, time, guess } = this.state;
    const { isDrawing, nickname, strokes, isPlaying, guesses } = this.props;

    return (
      <>
      <div className={styles.FullGame}>
        <h1>Happy Trees</h1>
        <StatusBar nickname={nickname} time={time} />
        <div className={styles.Word}>
          <h3>W o r d</h3>
        </div>
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
        { time === 0 && <ModalStats nickname={nickname} guesses={guesses} guess={guess} /> }
        
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
  roundId: getRoundId(state),
  nickname: getUserNickname(state),
  isPlaying: getIsPlaying(state),
  guesses: getGuesses(state)
});
const mapDispatchToProps = dispatch => ({
  startListening: () => dispatch(beginListening()),
  stopListening: () => dispatch(endListening()),
  receiveStroke: (data) => dispatch(receiveStroke(data)),
  joinedGame: (gameId) => dispatch(joinedGame(gameId)),
  guestAnswered: (guess) => dispatch(guestAnswered(guess)),
  correctlyAnswered: (answer, nickname) => dispatch(correctylyAnswered(answer, nickname)),
  gameStarted: (round, userId) => dispatch(gameStarted(round, userId)),
  startNewRound: (round, userId) => dispatch(startNewRound(round, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
