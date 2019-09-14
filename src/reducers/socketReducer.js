import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  GAME_STARTED,
} from '../actions/socketActions';

const initialState = {
  listening: false,
  gameId: null,
  isPlaying: false,
  isDrawing: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case BEGIN_LISTENING:
      return { ...state, listening: true };
    case END_LISTENING:
      return { ...state, listening: false };
    case JOINED_GAME:
      return { ...state, gameId: action.payload };
    case GAME_STARTED:
      return { ...state, isPlaying: true };
    default:
      return state;
  }
}
