import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";

const saveProductsToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === "products/addToCart" ||
    action.type === "products/removeFromCart"
  ) {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.allProducts.cart));
  }
  return result;
};

const store = configureStore({
  reducer: {
    allProducts: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveProductsToLocalStorage),
});

export default store;
