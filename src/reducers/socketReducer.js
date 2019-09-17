import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  GAME_STARTED,
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
    case GAME_STARTED:
      return { 
        ...state, 
        isPlaying: true,
        isDrawing: action.payload.round.drawerId === action.payload.userId,
        roundId: action.payload.round._id,
      };
    case WRONG_ANSWER:
      return { ...state, guesses: [...state.guesses, action.payload] };
    case CORRECTLY_ANSWERED:
      return { ...state, winner: action.payload };
    case START_NEW_ROUND:
      return {
        ...state,
        isDrawing: action.payload.round.drawerId === action.payload.userId,
        roundId: action.payload.round._id
      };
    default:
      return state;
  }
}
