import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const initialProductState = {
  products: [],
  selectedProduct: null,
  cart: loadCartFromLocalStorage(),
  searchTerm: "",
  filteredProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.id;

      state.cart = state.cart.reduce((updatedCart, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            updatedCart.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          updatedCart.push(item);
        }
        return updatedCart;
      }, []);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;

      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addToCart,
  removeFromCart,
  setSearchTerm,
} = productSlice.actions;

export const selectTotalQuantity = (state) =>
  state.allProducts.cart.reduce((total, item) => total + item.quantity, 0);

export const selectFilteredProducts = (state) =>
  state.allProducts.filteredProducts;

export default productSlice.reducer;
