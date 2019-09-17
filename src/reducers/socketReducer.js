import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  WRONG_ANSWER,
  CORRECTLY_ANSWERED,
  START_NEW_ROUND,
} from '../actions/socketActions';

const initialState = {
  listening: false,
  gameId: null,
  isPlaying: false,
  isDrawing: false,
  roundId: null,
  roundNumber: null,
  currentDrawer: '',
  guesses: [],
  winner: {}
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case BEGIN_LISTENING:
      return { ...state, listening: true };
    case END_LISTENING:
      return { ...state, listening: false };
    case JOINED_GAME:
      return { ...state, gameId: action.payload };
    case WRONG_ANSWER:
      return { ...state, guesses: [...state.guesses, action.payload] };
    case CORRECTLY_ANSWERED:
      return { ...state, winner: action.payload };
    case START_NEW_ROUND:
      return {
        ...state,
        isPlaying: true,
        isDrawing: action.payload.round.drawerId === action.payload.userId,
        roundId: action.payload.round._id,
        roundNumber: action.payload.round.roundNumber,
        currentDrawer: action.payload.drawer.nickname
      };
    default:
      return state;
  }
}
