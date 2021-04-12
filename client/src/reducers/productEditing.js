import * as types from "./../constants/ActionType";
var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_EDIT_PRODUCT:
      console.log(action);
      return action.product;
    default:
      return state;
  }
};
export default myReducer;
