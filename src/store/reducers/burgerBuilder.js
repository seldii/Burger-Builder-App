import * as actionTypes from "../actions/actionTypes";

//global variable
const INGREDIENT_PRICES = {
  salad: 0.5,
  patty: 3,
  mushroom: 2,
  cheese: 1.4,
  pickle: 0.5,
  jalapeno: 0.2
};
const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  burgerBuilding: false
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 2,
        burgerBuilding: false
      };
    case actionTypes.INGREDIENTS_FETCH_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        burgerBuilding: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default burgerBuilderReducer;
