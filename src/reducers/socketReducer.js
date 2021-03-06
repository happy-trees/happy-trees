import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  WRONG_ANSWER,
  CORRECTLY_ANSWERED,
  START_NEW_ROUND,
  ROUND_OVER,
  GAME_OVER,
  CLEAR_GAME_STATE
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
  guessesLeft: 3,
  word: '',
  scores: []
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
        guessesLeft: 3,
        word: action.payload.round.word
      };
    case ROUND_OVER:
      return { ...state, isIntermission: true };
    case GAME_OVER:
      return { ...state, scores: action.payload, isPlaying: false, word: '' };
    case CLEAR_GAME_STATE:
      return {
        ...state,
        isPlaying: false,
        isDrawing: false,
        isIntermission: false,
        currentDrawer: null,
        gameId: null,
        roundNumber: null,
        roundId: null,
        guesses: [],
        winner: null,
        guessesLeft: 3,
        scores: []
      };
    default:
      return state;
  }
}
