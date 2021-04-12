import * as types from "./../constants/ActionType";
var initialState = null;
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};
export default myReducer;
