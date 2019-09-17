import {
  BEGIN_LISTENING,
  END_LISTENING,
  JOINED_GAME,
  GAME_STARTED,
  GUEST_ANSWERED,
  CORRECTLY_ANSWERED,
} from '../actions/socketActions';

const initialState = {
  listening: false,
  gameId: null,
  isPlaying: false,
  isDrawing: false,
  roundId: null,
  guesses: [],
  answer: ''
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
        isDrawing: action.payload.startRound.drawerId === action.payload.userId,
        roundId: action.payload.startRound._id
      };
    case GUEST_ANSWERED:
      return { ...state, guesses: [...state.guesses, action.payload] };
    case CORRECTLY_ANSWERED:
      return { ...state, answer: action.payload };
    default:
      return state;
  }
}
