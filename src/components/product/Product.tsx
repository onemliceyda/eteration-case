import React from "react";
import { useSelector } from "react-redux";

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
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="productGrid">
      {products.map((product) => (
        <div key={product.id} className="cardContainer">
          <div className="imageContainer">
            <img
              src={product.image}
              alt={product.name}
              className="productImage"
            />
          </div>
          <div className="price">{product.price} ₺</div>
          <div className="productName">{product.name}</div>
          <div className="productDescription">{product.description}</div>
          <button className="addToCartButton">Add to Cart</button>
        </div>
      ))}
      <style jsx>{`
        .productGrid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 16px;
        }

        .cardContainer {
          width: 200px;
          height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 8px;
          margin: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .imageContainer {
          width: 100%;
          height: 130px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          margin-bottom: 8px;
        }

        .productImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .price {
          color: #007bff;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .productName {
          font-weight: bold;
          margin-bottom: 4px;
          text-align: center;
        }

        .productDescription {
          color: #555;
          font-size: 12px;
          margin-bottom: 8px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* 3 satır */
          -webkit-box-orient: vertical;
        }

        .addToCartButton {
          width: 100%;
          padding: 8px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .addToCartButton:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Product;
