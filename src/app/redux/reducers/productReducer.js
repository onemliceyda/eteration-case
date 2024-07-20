import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  products: [],
  selectedProduct: null,
  cart: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setProducts, setSelectedProduct, addToCart, removeFromCart } =
  productSlice.actions;

export default productSlice.reducer;
