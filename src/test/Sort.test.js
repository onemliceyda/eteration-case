import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Sort from "../components/sort/Sort.tsx";
import productReducer from "../app/redux/reducers/productReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(productReducer);

const renderWithStore = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

test("renders Sort component and checks default state", () => {
  renderWithStore(<Sort />);

  expect(screen.getByText(/Sort By/i)).toBeInTheDocument();

  const highToLowRadio = screen.getByLabelText(/High to Low/i);
  const lowToHighRadio = screen.getByLabelText(/Low to High/i);
  const newToOldRadio = screen.getByLabelText(/New to Old/i);
  const oldToNewRadio = screen.getByLabelText(/Old to New/i);

  expect(highToLowRadio).not.toBeChecked();
  expect(lowToHighRadio).not.toBeChecked();
  expect(newToOldRadio).not.toBeChecked();
  expect(oldToNewRadio).not.toBeChecked();
});

test("changes selected option on click and dispatches action", () => {
  renderWithStore(<Sort />);

  const highToLowRadio = screen.getByLabelText(/High to Low/i);
  const lowToHighRadio = screen.getByLabelText(/Low to High/i);

  fireEvent.click(highToLowRadio);
  expect(highToLowRadio).toBeChecked();

  expect(lowToHighRadio).not.toBeChecked();
});
