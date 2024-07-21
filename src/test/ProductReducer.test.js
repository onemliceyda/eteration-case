import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  setProducts,
  addToCart,
  removeFromCart,
  setSearchTerm,
  setBrandFilter,
  setModelFilter,
  setSortOption,
  selectTotalQuantity,
  selectFilteredProducts,
  selectBrands,
  selectModels,
} from "../app/redux/reducers/productReducer.js";

const initialState = {
  products: [],
  selectedProduct: null,
  cart: [],
  searchTerm: "",
  brandFilter: [],
  modelFilter: [],
  filteredProducts: [],
  sortOption: null,
};

const store = configureStore({
  reducer: { allProducts: productReducer },
  preloadedState: { allProducts: initialState },
});

test("should handle initial state", () => {
  const state = store.getState().allProducts;
  expect(state).toEqual(initialState);
});

test("should handle setProducts", () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      price: "100.00",
      brand: "Brand A",
      model: "Model A",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Product B",
      price: "200.00",
      brand: "Brand B",
      model: "Model B",
      createdAt: "2024-02-01",
    },
  ];

  store.dispatch(setProducts(products));
  const state = store.getState().allProducts;

  expect(state.products).toEqual(products);
  expect(state.filteredProducts).toEqual(products);
});

test("should handle addToCart", () => {
  const product = {
    id: 1,
    name: "Product A",
    price: "100.00",
    brand: "Brand A",
    model: "Model A",
    createdAt: "2024-01-01",
  };

  store.dispatch(addToCart(product));
  const state = store.getState().allProducts;

  expect(state.cart).toContainEqual({ ...product, quantity: 1 });
});

test("should handle removeFromCart", () => {
  const product = {
    id: 1,
    name: "Product A",
    price: "100.00",
    brand: "Brand A",
    model: "Model A",
    createdAt: "2024-01-01",
  };

  store.dispatch(addToCart(product));
  store.dispatch(removeFromCart(product));
  const state = store.getState().allProducts;

  expect(state.cart).toHaveLength(0);
});

test("should handle setSearchTerm", () => {
  store.dispatch(setSearchTerm("Product A"));
  const state = store.getState().allProducts;

  expect(state.searchTerm).toBe("Product A");
});

test("should handle setBrandFilter", () => {
  store.dispatch(setBrandFilter(["Brand A"]));
  const state = store.getState().allProducts;

  expect(state.brandFilter).toEqual(["Brand A"]);
});

test("should handle setModelFilter", () => {
  store.dispatch(setModelFilter(["Model A"]));
  const state = store.getState().allProducts;

  expect(state.modelFilter).toEqual(["Model A"]);
});

test("should handle setSortOption", () => {
  store.dispatch(setSortOption("highToLow"));
  const state = store.getState().allProducts;

  expect(state.sortOption).toBe("highToLow");
});

test("should selectTotalQuantity correctly", () => {
  const product = {
    id: 1,
    name: "Product A",
    price: "100.00",
    brand: "Brand A",
    model: "Model A",
    createdAt: "2024-01-01",
  };

  store.dispatch(addToCart(product));
  store.dispatch(addToCart(product));

  const totalQuantity = selectTotalQuantity(store.getState());
  expect(totalQuantity).toBe(2);
});

test("should selectFilteredProducts correctly", () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      price: "100.00",
      brand: "Brand A",
      model: "Model A",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Product B",
      price: "200.00",
      brand: "Brand B",
      model: "Model B",
      createdAt: "2024-02-01",
    },
  ];

  store.dispatch(setProducts(products));
  store.dispatch(setSearchTerm("Product A"));

  const filteredProducts = selectFilteredProducts(store.getState());
  expect(filteredProducts).toEqual([products[0]]);
});

test("should selectBrands correctly", () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      price: "100.00",
      brand: "Brand A",
      model: "Model A",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Product B",
      price: "200.00",
      brand: "Brand B",
      model: "Model B",
      createdAt: "2024-02-01",
    },
  ];

  store.dispatch(setProducts(products));
  const brands = selectBrands(store.getState());
  expect(brands).toEqual(["Brand A", "Brand B"]);
});

test("should selectModels correctly", () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      price: "100.00",
      brand: "Brand A",
      model: "Model A",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Product B",
      price: "200.00",
      brand: "Brand B",
      model: "Model B",
      createdAt: "2024-02-01",
    },
  ];

  store.dispatch(setProducts(products));
  const models = selectModels(store.getState());
  expect(models).toEqual(["Model A", "Model B"]);
});
