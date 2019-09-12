import React from 'react';
import PropTypes from 'prop-types';
import styles from './game.css';

import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import sketch from '../../sketch/sketch';
import { beginListening, endListening } from '../../actions/socketActions';
import { getStrokes } from '../../selectors/drawingSelectors';
import { receiveStroke } from '../../actions/drawingActions';

import StatusBar from '../../components/gameInput/StatusBar';

class GamePage extends React.Component {

  static propTypes ={
    startListening: PropTypes.func.isRequired,
    stopListening: PropTypes.func.isRequired,
    receiveStroke: PropTypes.func.isRequired,
    strokes: PropTypes.array.isRequired
  }

  state = {
    cavasWidth: null,
    canvasHeight: null
  }

  socket = io('http://localhost:3000');

  componentDidMount() {
    const gameContainer = document.querySelector('#game-container');
    if(gameContainer && gameContainer.offsetWidth && gameContainer.offsetWidth)
      this.setState({ 
        canvasWidth:  gameContainer.offsetWidth, 
        canvasHeight: gameContainer.offsetHeight 
      });

    this.props.startListening();
    this.socket.on('stroke', data => {
      this.props.receiveStroke(data);
    });
  }

  componentWillUnmount() {
    this.socket.removeListener('stroke');
    this.socket.emit('disconnect');
    this.props.stopListening();
  }

  emitStroke = (data) => {
    this.socket.emit('stroke', data);
  }
  
  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const { strokes } = this.props;
    return (
      <>
        <StatusBar />
      
      <div id="game-container" className={styles.GameContainer}>
        <P5Wrapper 
          sketch={sketch} 
          color={'#000000'} 
          canvasWidth={canvasWidth} 
          canvasHeight={canvasHeight}
          emitStroke={this.emitStroke}
          socket={this.socket}
          strokes={strokes}
        />
      </div>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  strokes: getStrokes(state)
});

const mapDispatchToProps = dispatch => ({
  startListening: () => dispatch(beginListening()),
  stopListening: () => dispatch(endListening()),
  receiveStroke: (data) => dispatch(receiveStroke(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
