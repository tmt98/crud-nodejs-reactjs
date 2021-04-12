import * as types from "./../constants/ActionType";
var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORY:
      console.log(action.data);
      return action.data;
    case types.ADD_CATEGORY:
      console.log(action.data);
      return state.concat(action.data);
    case types.EDIT_CATEGORY:
      console.log(state);
      console.log(action);
      const index = state.findIndex(
        ({ category_id }) => category_id === action.category.category_id
      );
      state[index] = action.category;
      console.log(state[index]);
      console.log(state);
      return [...state];
    default:
      return state;
  }
};
export default myReducer;
