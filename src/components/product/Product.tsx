import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addToCart,
  selectFilteredProducts,
} from "../../app/redux/reducers/productReducer.js";
import { productService } from "../../service/product/product.service.ts";
import { Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";
import Checkout from "../checkout-card/Checkout.tsx";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  createdAt: string;
}

const PAGE_SIZE = 12;

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      if (response && response.data) {
        dispatch(setProducts(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterColumn}>
        {/* Filter content goes here */}
        <p>Filter</p>
      </div>
      <div className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 250,
                  marginTop: 250,
                }}
                spin
              />
            }
          />
        ) : (
          paginatedProducts.map((product) => (
            <div key={product.id} className={styles.cardContainer}>
              <Link to={`/product/${product.id}`}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
              </Link>
              <div className={styles.price}>
                {parseFloat(product.price).toFixed(2)} ₺
              </div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productDescription}>
                {product.description}
              </div>
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={filteredProducts.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Checkout />
    </div>
  );
};

export default Product;
