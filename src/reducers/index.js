import { combineReducers } from 'redux';
import drawing from './drawingReducer';
import socket from './socketReducer';
import user from './authReducer';

export default combineReducers({
  drawing,
  socket,
  user
});
