import * as types from "./../constants/ActionType";
// --> Form
export const onShowForm = () => {
  return {
    type: types.ON_OFF_FORM,
  };
};
export const onCloseForm = () => {
  return {
    type: types.CLOSE_FORM,
  };
};
export const onOpenForm = () => {
  return {
    type: types.OPEN_FORM,
  };
};
// --> User
export const getAllUser = (data) => {
  return {
    type: types.GET_ALL_USER,
    data,
  };
};
export const getCurrentUser = (currentUser) => {
  return {
    type: types.GET_CURRENT_USER,
    currentUser,
  };
};
export const addUser = (user) => {
  return {
    type: types.ADD_USER,
    user,
  };
};
export const onEditUser = (user) => {
  console.log(user);
  return {
    type: types.EDIT_USER,
    user,
  };
};
// --> Category
export const getAllCategory = (data) => {
  return {
    type: types.GET_ALL_CATEGORY,
    data,
  };
};
export const addCategory = (data) => {
  console.log(data);
  return {
    type: types.ADD_CATEGORY,
    data,
  };
};
export const onEditCategory = (category) => {
  return {
    type: types.IS_EDIT_CATEGORY,
    category,
  };
};
export const editCategory = (category) => {
  console.log(category);
  return {
    type: types.EDIT_CATEGORY,
    category,
  };
};
// --> Product
export const getAllProduct = (data) => {
  return {
    type: types.GET_ALL_PRODUCT,
    data,
  };
};
export const addProduct = (data) => {
  return {
    type: types.ADD_PRODUCT,
    data,
  };
};
export const onEditProduct = (product) => {
  console.log(product);
  return {
    type: types.IS_EDIT_PRODUCT,
    product,
  };
};
export const editProduct = (product) => {
  return {
    type: types.EDIT_PRODUCT,
    product,
  };
};
export const onShowProductDetail = () => {
  return {
    type: types.ON_OFF_PRODUCT_DETAIL,
  };
};
export const showProductDetail = (product) => {
  return {
    type: types.SHOW_PRODUCT,
    product,
  };
};
export const addStock = (product) => {
  return {
    type: types.ADD_STOCK,
    product,
  };
};
// --> Cart
export const getAllCart = (data) => {
  return {
    type: types.GET_CART,
  };
};
export const onAddToCart = (product, quantity) => {
  return {
    type: types.ADD_TO_CART,
    product,
    quantity,
  };
};
export const deleteProductInCart = (product) => {
  return {
    type: types.REMOVE_CART,
    product,
  };
};
export const updateProductInCart = (product, quantity) => {
  return {
    type: types.UPDATE_AMOUNT,
    product,
    quantity,
  };
};
// --> Login
export const onLogin = () => {
  return {
    type: types.ON_LOGIN,
  };
};
// --> Order
export const getAllOrder = (data) => {
  return {
    type: types.GET_ALL_ORDER,
    data,
  };
};
export const getAllOrderWithJWT = (data) => {
  return {
    type: types.GET_ALL_ORDER_WITH_JWT,
    data,
  };
};
