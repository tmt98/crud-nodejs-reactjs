import { combineReducers } from "redux";
import users from "./users";
import userEditing from "./userEditing";

import currentUser from "./isCurrentUser";
import isLoggedIn from "./isLoggedIn";

import isDisplayForm from "./isDisplayForm";

import category from "./category";
import categoryEditing from "./categoryEditing";

import product from "./product";
import productEditing from "./productEditing";
import productShow from "./productShow";
import isShowProductDetail from "./isShowProductDetail";

import order from "./order";

import cart from "./cart";
const myReducer = combineReducers({
  users, // users:users
  userEditing,
  category,
  categoryEditing,
  product,
  productEditing,
  productShow,
  currentUser,
  isLoggedIn,
  isDisplayForm,
  isShowProductDetail,
  cart,
  order,
});
export default myReducer;
