import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductList from "../components/product-list/ProductList.tsx";

jest.mock("../components/product/Product.tsx", () => () => (
  <div>Product Component</div>
));

test("renders ProductList and displays Product component", () => {
  render(<ProductList />);

  expect(screen.getByText("Product Component")).toBeInTheDocument();
});
