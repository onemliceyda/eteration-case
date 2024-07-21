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
};

const productSlice = createSlice({
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
  },
});

export const { setProducts, setSelectedProduct, addToCart, removeFromCart } =
  productSlice.actions;

export const selectTotalQuantity = (state) =>
  state.allProducts.cart.reduce((total, item) => total + item.quantity, 0);

export default productSlice.reducer;
