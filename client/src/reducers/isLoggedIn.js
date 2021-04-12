import * as types from "./../constants/ActionType";
var initialState = false;
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_LOGIN:
      return true;
    default:
      return state;
  }
};
export default myReducer;
