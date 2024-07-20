import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, List } from "antd";
import {
  addToCart,
  removeFromCart,
} from "../../app/redux/reducers/productReducer";

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

  return (
    <div
      style={{
        width: "213px",
        height: "143px",
        overflow: "hidden",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        right: "85px",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => handleDecreaseQuantity(item)} size="small">
                -
              </Button>,
              <span>{item.quantity}</span>,
              <Button onClick={() => handleIncreaseQuantity(item)} size="small">
                +
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`${(parseFloat(item.price) * item.quantity).toFixed(
                2
              )} ₺`}
              style={{ textAlign: "left" }}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default Checkout;
