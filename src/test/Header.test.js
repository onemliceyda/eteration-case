import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";

import Header from "../components/header/Header.tsx";
import rootReducer from "../app/redux/reducers/productReducer.js";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(rootReducer);

const renderWithStore = (component) => {
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

test("renders Header component with correct elements", () => {
  renderWithStore(<Header />);

  expect(screen.getByText(/Eteration/i)).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /ShoppingCartOutlined/i })
  ).toBeInTheDocument();

  expect(screen.getByText(/0.00 ₺/i)).toBeInTheDocument();
});

test("updates search term in the Redux store on input change", () => {
  renderWithStore(<Header />);

  const searchInput = screen.getByPlaceholderText(/Search/i);

  fireEvent.change(searchInput, { target: { value: "New Search Term" } });
});
