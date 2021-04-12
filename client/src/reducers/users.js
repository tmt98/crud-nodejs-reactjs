import * as types from "./../constants/ActionType";
var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USER:
      console.log(action.data);
      return action.data;
    case types.ADD_USER:
      console.log(action);
      return state.concat(action.data);
    default:
      return state;
  }
};
export default myReducer;
