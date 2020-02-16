import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFailed(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = yield "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    const orders = [];
    for (let orderKey in response.data) {
      orders.push({ ...response.data[orderKey], key: orderKey });
    }
    yield put(actions.fetchOrderSuccess(orders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
