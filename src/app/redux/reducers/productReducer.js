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
  brandFilter: [],
  modelFilter: [],
  filteredProducts: [],
  sortOption: null,
};

const filterAndSortProducts = (state) => {
  const filtered = state.products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    const matchesBrandFilter =
      state.brandFilter.length === 0 ||
      state.brandFilter.includes(product.brand);
    const matchesModelFilter =
      state.modelFilter.length === 0 ||
      state.modelFilter.includes(product.model);
    return matchesSearchTerm && matchesBrandFilter && matchesModelFilter;
  });

  switch (state.sortOption) {
    case "highToLow":
      state.filteredProducts = filtered.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      break;
    case "lowToHigh":
      state.filteredProducts = filtered.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      break;
    case "newToOld":
      state.filteredProducts = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "oldToNew":
      state.filteredProducts = filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    default:
      state.filteredProducts = filtered;
      break;
  }
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      filterAndSortProducts(state);
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
      filterAndSortProducts(state);
    },
    setBrandFilter: (state, action) => {
      state.brandFilter = action.payload;
      filterAndSortProducts(state);
    },
    setModelFilter: (state, action) => {
      state.modelFilter = action.payload;
      filterAndSortProducts(state);
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      filterAndSortProducts(state);
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addToCart,
  removeFromCart,
  setSearchTerm,
  setBrandFilter,
  setModelFilter,
  setSortOption,
} = productSlice.actions;

export const selectTotalQuantity = (state) =>
  state.allProducts.cart.reduce((total, item) => total + item.quantity, 0);

export const selectFilteredProducts = (state) =>
  state.allProducts.filteredProducts;

export const selectBrands = (state) => [
  ...new Set(state.allProducts.products.map((product) => product.brand)),
];

export const selectModels = (state) => [
  ...new Set(state.allProducts?.products.map((product) => product.model)),
];

export default productSlice.reducer;
