import {
  LOGIN_USER,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
} from '../actions/authActions';

const initialState = {
  userId: null,
  nickname: null,
  loading: false,
  avatar: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER_LOADING:
      return { ...state, loading: true };
    case LOGIN_USER:
      return { 
        ...state, 
        loading: false, 
        userId: action.payload._id, 
        nickname: action.payload.nickname,
        avatar: action.payload.avatar,
        error: null 
      };
    case LOGIN_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
