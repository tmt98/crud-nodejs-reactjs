import * as types from "./../constants/ActionType";
var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCT:
      return action.data;
    case types.ADD_PRODUCT:
      console.log(action.data);
      return state.concat(action.data);
    case types.EDIT_PRODUCT:
      console.log(state);
      console.log(action);
      const index = state.findIndex(
        ({ product_id }) => product_id === action.product.product_id
      );
      state[index] = action.product;
      console.log(state[index]);
      console.log(state);
      return [...state];
    case types.ADD_STOCK:
      console.log(state);
      console.log(action);
      const index1 = state.findIndex(
        ({ product_id }) => product_id === action.product.product_id
      );
      state[index1] = action.product;
      console.log(state[index1]);
      console.log(state);
      return [...state];
    default:
      return state;
  }
};
export default myReducer;
