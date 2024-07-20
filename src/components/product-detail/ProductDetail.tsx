import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../service/product/product.service.ts";
import {
  setSelectedProduct,
  addToCart,
} from "../../app/redux/reducers/productReducer.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductDetail.module.scss";

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
  };
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = useSelector(
    (state: RootState) => state.allProducts.selectedProduct
  );
  const dispatch = useDispatch();

  const getProductById = async (productId: string) => {
    try {
      const response = await productService.getProductById(productId);
      if (response && response.data) {
        dispatch(setSelectedProduct(response.data));
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (!productId) return;
    getProductById(productId);
  }, [dispatch, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.price}>
          {parseFloat(product.price).toFixed(2)} ₺
        </div>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className={styles.productDescription}>{product.description}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
