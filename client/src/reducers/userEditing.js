import * as types from "./../constants/ActionType";
var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_USER:
      console.log(action);
      return action.user;
    default:
      return state;
  }
};
export default myReducer;
