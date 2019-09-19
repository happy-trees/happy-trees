import {
  EMIT_STROKE, RECEIVE_STROKE
} from '../actions/drawingActions';
import { ROUND_OVER, CORRECTLY_ANSWERED, START_NEW_ROUND } from '../actions/socketActions';

const initialState = {
  strokes: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_STROKE: 
      return { ...state, strokes: [...state.strokes, action.payload] };
    case EMIT_STROKE:
      return { ...state, strokes: [...state.strokes, action.payload] };
    case ROUND_OVER: 
      return { ...state, strokes: [] };
    case CORRECTLY_ANSWERED: 
      return { ...state, strokes: [] };
    case START_NEW_ROUND:
      return { ...state, strokes: [] };
    default:
      return state;
  }
}
