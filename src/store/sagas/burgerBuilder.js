import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get("/ingredients.json");
    const ingredients = yield response.data;
    yield put(actions.setIngredients(ingredients));
  } catch (err) {
    yield put(actions.ingredientsFetchFailed());
  }
}
