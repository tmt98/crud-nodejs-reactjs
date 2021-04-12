import * as types from "./../constants/ActionType";
// import axios from "axios";

var data = JSON.parse(localStorage.getItem("CART"));
// const fff = async () => {
//   var data1 = await Promise.all(
//     data.map(async (item, index) => {
//       await axios
//         .get("http://localhost:9999/product/" + item.product.product_id)
//         .then((res) => {
//           item.product = res.data;
//           return item;
//         });
//     })
//   );
//   return data1;
// };
console.log(data);
// console.log(fff());
var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {
  // console.log(new_data);
  var { product, quantity } = action;
  var index = -1;
  switch (action.type) {
    case types.ADD_TO_CART:
      index = findProductInCart(state, product);
      console.log(action + ":" + index);
      if (index !== -1) {
        state[index].quantity += quantity;
      } else {
        state.push({
          product,
          quantity,
        });
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case types.REMOVE_CART:
      index = findProductInCart(state, product);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case types.UPDATE_AMOUNT:
      index = findProductInCart(state, product);
      if (index !== -1) {
        state[index].quantity = quantity;
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    default:
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
  }
};
var findProductInCart = (cart, product) => {
  var index = -1;
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].product.product_id === product.product_id) {
        index = i;
        console.log(index);
        break;
      }
    }
  }
  return index;
};
export default myReducer;
