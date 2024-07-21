import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addToCart,
  selectFilteredProducts,
} from "../../app/redux/reducers/productReducer.js";
import { productService } from "../../service/product/product.service.ts";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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

interface RootState {
  allProducts: {
    products: Product[];
    selectedProduct: Product | null;
    cart: Product[];
    filteredProducts: Product[];
    searchTerm: string;
  };
}

const Product = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

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

  return (
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
        filteredProducts.map((product) => (
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
  );
};

export default Product;
