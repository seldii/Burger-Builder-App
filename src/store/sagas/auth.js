import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";
import config from "../../config/config";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkoutTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    config.apiKey;
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      config.apiKey;
  }
  try {
    const response = yield axios.post(url, authData);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    //store the token in localStorage to persist the aoth state of the user
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", localId);
    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.checkTimeout(expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}
