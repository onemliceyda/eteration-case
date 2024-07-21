import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Checkout from "../components/checkout-card/Checkout.tsx";
import rootReducer from "../../app/redux/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "../app/redux/reducers/productReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(rootReducer);

const renderWithStore = (component) => {
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

const product = {
  id: 1,
  name: "Product A",
  image: "image_url",
  price: "100.00",
  description: "Description",
  model: "Model A",
  brand: "Brand A",
  createdAt: "2024-01-01",
  quantity: 2,
};

test("renders Checkout component with cart items", () => {
  store.dispatch(addToCart(product));

  renderWithStore(<Checkout />);

  expect(screen.getByText(product.name)).toBeInTheDocument();
  expect(screen.getByText(`${product.price} ₺`)).toBeInTheDocument();
  expect(screen.getByText(`${product.quantity}`)).toBeInTheDocument();
});

test("handles increase and decrease quantity", () => {
  store.dispatch(addToCart(product));

  renderWithStore(<Checkout />);

  const increaseButton = screen.getByText("+");
  const decreaseButton = screen.getByText("-");
  const quantitySpan = screen.getByText(`${product.quantity}`);

  fireEvent.click(increaseButton);

  expect(screen.getByText(`${product.quantity + 1}`)).toBeInTheDocument();

  fireEvent.click(decreaseButton);

  expect(screen.getByText(`${product.quantity}`)).toBeInTheDocument();
});

test("calculates and displays total price correctly", () => {
  store.dispatch(addToCart(product));

  renderWithStore(<Checkout />);

  const totalPrice = (parseFloat(product.price) * product.quantity).toFixed(2);
  expect(screen.getByText(`Total Price: ${totalPrice} ₺`)).toBeInTheDocument();
});

test("renders Checkout button", () => {
  renderWithStore(<Checkout />);

  expect(screen.getByText("Checkout")).toBeInTheDocument();
});
