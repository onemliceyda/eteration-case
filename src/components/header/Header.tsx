import React from "react";
import { useSelector } from "react-redux";
import { Badge, Button, Col, Input, Layout, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Checkout from "../checkout-card/Checkout.tsx";
import { Link } from "react-router-dom";
import { selectTotalQuantity } from "../../app/redux/reducers/productReducer.js";

interface ICheckout {
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
    products: ICheckout[];
    selectedProduct: ICheckout | null;
    cart: ICheckout[];
  };
}

const Header = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const cart = useSelector((state: RootState) => state.allProducts.cart);

  const totalPrice = cart
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <>
      <Header
        style={{
          backgroundColor: "#2A59FE",
          display: "flex",
          alignItems: "center",
          padding: "0",
          width: "100%",
        }}
      >
        <Link to={"/"}>
          <h4
            style={{
              color: "#fff",
              fontFamily: "Montserrat",
              fontSize: "24px",
              fontWeight: "800",
              marginLeft: "100px",
            }}
          >
            Eteration
          </h4>
        </Link>

        <Row style={{ width: "100%" }}>
          <Col flex="auto">
            <div style={{ marginTop: "30px", marginRight: "600px" }}>
              <Search
                placeholder="Search"
                enterButton={<SearchOutlined />}
                style={{ maxWidth: 400 }}
              />
            </div>
          </Col>
          <Col
            style={{
              textAlign: "right",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Badge count={totalQuantity}>
              <Button
                type="link"
                icon={<ShoppingCartOutlined />}
                style={{
                  color: "#fff",
                }}
              />
            </Badge>
            <span
              style={{
                color: "#fff",
                marginLeft: "10px",
                marginBottom: "3px",
                fontFamily: "Montserrat",
                marginRight: "10px",
                marginTop: "15px",
              }}
            >
              {totalPrice} ₺
            </span>
          </Col>
        </Row>
      </Header>
      <Checkout />
    </>
  );
};
export default Header;
