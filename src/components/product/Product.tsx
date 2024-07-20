import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productService } from "../../service/product/product.service.ts";
import styles from "./Product.module.scss";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  model: string;
  brand: string;
  createdAt: string;
}

interface RootState {
  allProducts: {
    products: Product[];
    selectedProduct: Product | null;
  };
}

const Product = () => {
  const productsFromState = useSelector(
    (state: RootState) => state.allProducts.products
  );

  const [products, setProducts] = useState<Product[]>(productsFromState);

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      if (response && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.productGrid}>
      {products.length === 0 ? (
        <div>No products available</div>
      ) : (
        products.map((product) => (
          <div key={product.id} className={styles.cardContainer}>
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.price}>{product.price} ₺</div>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productDescription}>
              {product.description}
            </div>
            <button className={styles.addToCartButton}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
