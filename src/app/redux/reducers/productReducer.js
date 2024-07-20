import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  products: [],
  selectedProduct: "",
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
    removeSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setProducts, setSelectedProduct, removeSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;
