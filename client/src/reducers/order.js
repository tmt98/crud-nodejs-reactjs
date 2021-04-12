import * as types from "./../constants/ActionType";
var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ORDER:
      return action.data;
    case types.GET_ALL_ORDER_WITH_JWT:
      return action.data;
    default:
      return state;
  }
};
export default myReducer;
