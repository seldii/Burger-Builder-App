import * as actionTypes from "./actions";

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
  ingredients: {
    salad: 0,
    patty: 0,
    mushroom: 0,
    cheese: 0,
    pickle: 0,
    jalapeno: 0
  },
  totalPrice: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
