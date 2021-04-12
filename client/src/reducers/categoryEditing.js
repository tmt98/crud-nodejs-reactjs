import * as types from "./../constants/ActionType";
var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_EDIT_CATEGORY:
      console.log(action);
      return action.category;
    default:
      return state;
  }
};
export default myReducer;
