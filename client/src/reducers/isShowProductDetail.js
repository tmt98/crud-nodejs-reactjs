import * as types from "./../constants/ActionType";
var initialState = false;
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_OFF_PRODUCT_DETAIL:
      return !state;
    default:
      return false;
  }
};
export default myReducer;
