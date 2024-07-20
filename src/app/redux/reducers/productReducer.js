import { createSlice } from "@reduxjs/toolkit";

const addProductToLocalStorage = () => {
  try {
    const selectedProduct = localStorage.getItem("cart");
    return selectedProduct ? JSON.parse(selectedProduct) : [];
  } catch (e) {
    console.error("Could not load product from localStorage", e);
    return [];
  }
};

const initialProductState = {
  products: [],
  selectedProduct: null,
  cart: addProductToLocalStorage(),
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { setProducts, setSelectedProduct, addToCart, removeFromCart } =
  productSlice.actions;

export default productSlice.reducer;
