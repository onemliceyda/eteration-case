import React from "react";
import { useSelector } from "react-redux";
import Product from "../product/Product.tsx";

const ProductList = () => {
  const products = useSelector((state) => state);

  console.log(products, "products kısmı burası");

  return (
    <>
      <div>
        <Product />
      </div>
    </>
  );
};

export default ProductList;
