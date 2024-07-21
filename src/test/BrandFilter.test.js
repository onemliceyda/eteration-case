import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import BrandFilter from "../components/brand-filter/BrandFilter.tsx";
import rootReducer from "../app/redux/reducers/productReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(rootReducer);

const renderWithStore = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const brands = ["Apple", "Samsung", "Sony", "Xiaomi"];

test("renders BrandFilter component and displays brand options", () => {
  renderWithStore(<BrandFilter />);

  expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  brands.forEach((brand) => {
    expect(screen.getByLabelText(brand)).toBeInTheDocument();
  });
});

test("handles search functionality", () => {
  renderWithStore(<BrandFilter />);

  const searchInput = screen.getByPlaceholderText("Search");
  fireEvent.change(searchInput, { target: { value: "s" } });

  expect(screen.queryByLabelText("Apple")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Samsung")).toBeInTheDocument();
  expect(screen.getByLabelText("Sony")).toBeInTheDocument();
  expect(screen.getByLabelText("Xiaomi")).toBeInTheDocument();
});

test("handles brand selection", () => {
  renderWithStore(<BrandFilter />);

  const appleCheckbox = screen.getByLabelText("Apple");
  fireEvent.click(appleCheckbox);

  expect(appleCheckbox).toBeChecked();
});

test("handles brand deselection", () => {
  renderWithStore(<BrandFilter />);

  const appleCheckbox = screen.getByLabelText("Apple");
  fireEvent.click(appleCheckbox);
  fireEvent.click(appleCheckbox);

  expect(appleCheckbox).not.toBeChecked();
});
