import { combineReducers } from 'redux';
import drawing from './drawingReducer';
import socket from './socketReducer';

export default combineReducers({
  drawing,
  socket
});
