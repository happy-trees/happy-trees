import {
  EMIT_STROKE, RECEIVE_STROKE
} from '../actions/drawingActions';

const initialState = {
  strokes: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_STROKE: 
      return { ...state, strokes: [...state.strokes, action.payload] };
    case EMIT_STROKE:
      return { ...state, strokes: [...state.strokes, action.payload] };
    default:
      return state;
  }
}
