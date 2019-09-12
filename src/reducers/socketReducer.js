import {
  BEGIN_LISTENING,
  END_LISTENING,
} from '../actions/socketActions';

const initialState = {
  listening: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case BEGIN_LISTENING:
      return { ...state, listening: true };
    case END_LISTENING:
      return { ...state, listening: false };
    default:
      return state;
  }
}
