import { guestSignUp } from '../services/guestSignUp';
import { fetchVerify } from '../services/fetchVerify';
import { guestLogout } from '../services/guestLogout';

export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUser = (nickname, avatar) => dispatch => {
  dispatch({
    type: LOGIN_USER_LOADING
  });

  return guestSignUp(nickname, avatar)
    .then(user => {
      dispatch({
        type: LOGIN_USER,
        payload: user
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err
      });
    });
};

export const VERIFY_USER_LOADING = 'VERIFY_USER_LOADING';
export const VERIFY_USER = 'VERIFY_USER';
export const VERIFY_USER_ERROR = 'VERIFY_USER_ERROR';
export const verifyUser = () => dispatch => {
  dispatch({
    type: VERIFY_USER_LOADING
  });

  return fetchVerify()
    .then(user => {
      dispatch({
        type: VERIFY_USER,
        payload: user
      });
    })
    .catch(err => {
      dispatch({
        type: VERIFY_USER_ERROR,
        payload: err
      });
    });
};

export const CLEAR_USER = 'CLEAR_USER';
export const clearUser = () => ({
  type: CLEAR_USER
});

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_LOADING = 'LOGOUT_USER_LOADING';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER_LOADING
  });

  return guestLogout()
    .then(user => {
      dispatch({
        type: LOGOUT_USER,
        payload: user
      });
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_USER_ERROR,
        payload: err
      });
    });
};
