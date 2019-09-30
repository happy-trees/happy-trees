import React from 'react';
import PropTypes from 'prop-types';
import styles from './FullGame.css';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import sketch from '../../sketch/sketch';
import { beginListening, endListening, joinedGame, startNewRound, wrongAnswer,
  correctylyAnswered, roundOver, gameOver } from '../../actions/socketActions';
import { getStrokes } from '../../selectors/drawingSelectors';
import { getUserNickname } from '../../selectors/authSelectors';
import { receiveStroke } from '../../actions/drawingActions';

import StatusBar from '../../components/gameInput/StatusBar';
import { getUserId } from '../../selectors/authSelectors';
import { getIsDrawing, getGameId, getRoundId, getIsPlaying, getGuesses,
  getRoundNumber, getCurrentDrawer, getCorrectWinner, getIsIntermission,
  getGuessesLeft, getWord,
} from '../../selectors/socketSelectors';
import GameInput from '../../components/gameInput/GameInput';
import ModalStats from '../../components/modal/ModalStats';

class GamePage extends React.Component {

  static propTypes ={
    startListening: PropTypes.func.isRequired,
    stopListening: PropTypes.func.isRequired,
    receiveStroke: PropTypes.func.isRequired,
    joinedGame: PropTypes.func.isRequired,
    strokes: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    isDrawing: PropTypes.bool.isRequired,
    gameId: PropTypes.string,
    roundId: PropTypes.string,
    roundNumber: PropTypes.number,
    nickname: PropTypes.string,
    isPlaying: PropTypes.bool.isRequired,
    wrongAnswer: PropTypes.func,
    guesses: PropTypes.array,
    correctlyAnswered: PropTypes.func,
    startNewRound: PropTypes.func.isRequired,
    currentDrawer: PropTypes.string,
    roundWinner: PropTypes.object,
    isIntermission: PropTypes.bool,
    roundOver: PropTypes.func,
    gameOver: PropTypes.func.isRequired,
    guessesLeft: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
  }

  state = {
    cavasWidth: null,
    canvasHeight: null,
    time: null,
    guess: '',
    countdown: null,
    color: '#000000'
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

    this.socket.on('timer', ({ countdown }) => {
      this.setState({ time: countdown });
    });

    this.socket.on('joined game', gameId => this.props.joinedGame(gameId));

    this.socket.on('correct answer', ({ answer, nickname }) => {
      this.props.correctlyAnswered(answer, nickname);
    });

    this.socket.on('wrong answer', ({ answer, userId }) => {
      const isUsersGuess = userId === this.props.userId;
      this.props.wrongAnswer(answer, isUsersGuess);
    });

    this.socket.on('intermission', ({ countdown }) => {
      this.setState({ countdown });
    });

    this.socket.on('new round', ({ round, drawer }) => {
      this.props.startNewRound(round, this.props.userId, drawer);
    });

    this.socket.on('round over', () => {
      this.props.roundOver();
    });

    this.socket.on('game scores', ({ scores }) => {
      this.props.gameOver(scores);
    });
  }

  componentWillUnmount() {
    this.socket.removeListener('stroke');
    this.socket.emit('disconnect', this.props.gameId);
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
    const { gameId, roundId, roundNumber } = this.props;
    const { guess } = this.state;
    this.socket.emit('answer', {
      answer: guess,
      roundId,
      gameId,
      currentRoundNumber: roundNumber
    });
    this.setState({ guess: '' });
    
  }

  wordBlanks = () => {
    return this.props.word.split('').map((l, i) => {
      return <span key={i}>_ </span>;
    });
  }
  
  render() {
    const { canvasWidth, canvasHeight, time, guess, countdown, color } = this.state;
    const { isDrawing, nickname, strokes, isPlaying, guesses, currentDrawer,
      roundWinner, roundNumber, isIntermission, guessesLeft, word,
    } = this.props;
    
    return (
      <>
        <div className={styles.FullGame}>

          <div className={styles.fullBorder}>
            <StatusBar 
              nickname={nickname}
              roundNumber={roundNumber}
              time={time} 
              currentDrawer={currentDrawer} 
              handleChange={this.handleChange}
              color={color}
            />

            <div className={styles.Word}>

              {isDrawing && <h3>Draw: {word}</h3>}
              {!isDrawing && <h3>{this.wordBlanks()}</h3>} 

            </div>
            <div className={styles.gameBorder}>
              <div id="game-container" className={styles.GameContainer}>
                {isPlaying 
                  ? <P5Wrapper 
                    sketch={sketch} 
                    color={color} 
                    canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    emitStroke={this.emitStroke}
                    strokes={strokes}
                    isDrawing={isDrawing}
                    isIntermission={isIntermission}
                  /> 
                  : <h3 className={styles.waiting}>WAITING FOR PLAYERS</h3>
                }
              </div>
            </div>

            {isPlaying && !isDrawing && <GameInput 
              guesses={guessesLeft}
              guess={guess}
              handleSubmit={this.emitAnswer}
              handleChange={this.handleChange}
            />}

            {isIntermission && <ModalStats
              roundWinner={roundWinner}
              nickname={nickname} 
              countdown={countdown}
              guesses={guesses} 
              isPlaying={isPlaying}
              word={word}
            /> }
        
          </div>
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
  roundNumber: getRoundNumber(state),
  nickname: getUserNickname(state),
  isPlaying: getIsPlaying(state),
  guesses: getGuesses(state),
  currentDrawer: getCurrentDrawer(state),
  roundWinner: getCorrectWinner(state),
  isIntermission: getIsIntermission(state),
  guessesLeft: getGuessesLeft(state),
  word: getWord(state),
});
const mapDispatchToProps = dispatch => ({
  startListening: () => dispatch(beginListening()),
  stopListening: () => dispatch(endListening()),
  receiveStroke: (data) => dispatch(receiveStroke(data)),
  joinedGame: (gameId) => dispatch(joinedGame(gameId)),
  wrongAnswer: (answer, isUsersGuess) => dispatch(wrongAnswer(answer, isUsersGuess)),
  correctlyAnswered: (answer, nickname) => dispatch(correctylyAnswered(answer, nickname)),
  startNewRound: (round, userId, drawer) => dispatch(startNewRound(round, userId, drawer)),
  roundOver: () => dispatch(roundOver()),
  gameOver: (scores) => dispatch(gameOver(scores))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
