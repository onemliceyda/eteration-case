import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import Product from "../components/product/Product.tsx";
import rootReducer from "../app/redux/reducers/productReducer.js";
import { productService } from "../../service/product/product.service.ts";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../service/product/product.service.ts", () => ({
  productService: {
    getAllProducts: jest.fn(),
  },
}));

const store = configureStore(rootReducer);

const renderWithStore = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    image: "http://example.com/image1.jpg",
    price: "100.00",
    description: "Description for Product 1",
    model: "Model 1",
    brand: "Brand 1",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Product 2",
    image: "http://example.com/image2.jpg",
    price: "150.00",
    description: "Description for Product 2",
    model: "Model 2",
    brand: "Brand 2",
    createdAt: "2023-01-02T00:00:00Z",
  },
];

test("renders Product component and displays products", async () => {
  productService.getAllProducts.mockResolvedValue({ data: mockProducts });

  renderWithStore(<Product />);

  await waitFor(() => {
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByAltText(product.name)).toHaveAttribute(
        "src",
        product.image
      );
      expect(
        screen.getByText(`${parseFloat(product.price).toFixed(2)} ₺`)
      ).toBeInTheDocument();
    });
  });
});

test("handles pagination", async () => {
  productService.getAllProducts.mockResolvedValue({ data: mockProducts });

  renderWithStore(<Product />);

  await waitFor(() => {
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("2"));

  await waitFor(() => {
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });
});

test("handles loading spinner", async () => {
  productService.getAllProducts.mockResolvedValue({ data: [] });

  renderWithStore(<Product />);

  expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
});

test("handles add to cart button", async () => {
  productService.getAllProducts.mockResolvedValue({ data: mockProducts });

  renderWithStore(<Product />);

  await waitFor(() => {
    const addToCartButton = screen.getByText("Add to Cart");
    expect(addToCartButton).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(addToCartButton);
  });
});
