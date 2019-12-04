import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        console.log(err);
        dispatch(purchaseBurgerFailed(err));
      });
  };
};

//Redirect when user reload the page
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(res => {
        const orders = [];
        for (let orderKey in res.data) {
          orders.push({ ...res.data[orderKey], key: orderKey });
        }
        dispatch(fetchOrderSuccess(orders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};
