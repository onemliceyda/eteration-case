import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../app/redux/reducers/productReducer";
import styles from "./Checkout.module.scss";

interface Checkout {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  createdAt: string;
  quantity: number;
}

interface RootState {
  allProducts: {
    products: Checkout[];
    selectedProduct: Checkout | null;
    cart: Checkout[];
  };
}

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.allProducts.cart);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(removeFromCart(product));
  };

  const totalPrice = cart
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <div className={styles.checkoutContainer}>
        <ul className={styles.list}>
          {cart.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <div className={styles.listItemMeta}>
                <span>{item.name}</span>
                <h5 className={styles.price}>{item.price} ₺</h5>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.totalContainer}>
          <div className={styles.totalText}>Total Price: {totalPrice} ₺</div>
          <button className={styles.checkoutButton}>Checkout</button>
        </div>
      </div>
    </>
  );
};
export default Checkout;
