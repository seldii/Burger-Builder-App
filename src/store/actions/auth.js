import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

//check timeout of token to og the user out

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOG_OUT
  };
};
export const checkTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

//connection with the backend *async
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8eCLmOuYBTEEJ-P3JyD5UYABoO7sJqp8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8eCLmOuYBTEEJ-P3JyD5UYABoO7sJqp8";
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        const { idToken, localId, expiresIn } = response.data;
        dispatch(authSuccess(idToken, localId));
        dispatch(checkTimeout(expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
