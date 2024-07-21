import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import ModelFilter from "../components/model-filter/ModelFilter.tsx";
import rootReducer from "../app/redux/reducers/productReducer.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(rootReducer);

const renderWithStore = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const models = ["Model A", "Model B", "Model C", "Model D"];

test("renders ModelFilter component and displays model options", () => {
  renderWithStore(<ModelFilter />);

  expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  models.forEach((model) => {
    expect(screen.getByLabelText(model)).toBeInTheDocument();
  });
});

test("handles search functionality", () => {
  renderWithStore(<ModelFilter />);

  const searchInput = screen.getByPlaceholderText("Search");
  fireEvent.change(searchInput, { target: { value: "Model B" } });

  expect(screen.queryByLabelText("Model A")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Model B")).toBeInTheDocument();
  expect(screen.queryByLabelText("Model C")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Model D")).not.toBeInTheDocument();
});

test("handles model selection", () => {
  renderWithStore(<ModelFilter />);

  const modelACheckbox = screen.getByLabelText("Model A");
  fireEvent.click(modelACheckbox);

  expect(modelACheckbox).toBeChecked();
});

test("handles model deselection", () => {
  renderWithStore(<ModelFilter />);

  const modelACheckbox = screen.getByLabelText("Model A");
  fireEvent.click(modelACheckbox);
  fireEvent.click(modelACheckbox);

  expect(modelACheckbox).not.toBeChecked();
});
