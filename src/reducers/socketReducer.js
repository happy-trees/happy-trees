import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  WRONG_ANSWER,
  CORRECTLY_ANSWERED,
  START_NEW_ROUND,
  ROUND_OVER,
  GAME_OVER
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
  winner: null,
  isIntermission: false,
  guessesLeft: 3
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
      return { 
        ...state, 
        guesses: [...state.guesses, action.payload.answer],
        guessesLeft: action.payload.isUsersGuess 
          ? state.guessesLeft - 1 
          : state.guessesLeft
      };
    case CORRECTLY_ANSWERED:
      return { ...state, winner: action.payload, isIntermission: true };
    case START_NEW_ROUND:
      return {
        ...state,
        isPlaying: true,
        isDrawing: action.payload.round.drawer === action.payload.userId,
        roundId: action.payload.round._id,
        roundNumber: action.payload.round.roundNumber,
        currentDrawer: action.payload.drawer.nickname,
        guesses: [],
        winner: null,
        isIntermission: false,
        guessesLeft: 3
      };
    case ROUND_OVER:
      return { ...state, isIntermission: true };
    case GAME_OVER:
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}
