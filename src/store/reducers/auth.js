import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        loading: false
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.AUTH_LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    default:
      return { ...state };
  }
};

export default authReducer;
