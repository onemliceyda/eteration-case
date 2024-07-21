import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Input, Layout, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Checkout from "../checkout-card/Checkout.tsx";
import { Link } from "react-router-dom";
import {
  selectTotalQuantity,
  setSearchTerm,
} from "../../app/redux/reducers/productReducer.js";
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
    searchTerm: string;
  };
}

const Header = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.allProducts.cart);
  const totalQuantity = useSelector(selectTotalQuantity);
  const searchTerm = useSelector(
    (state: RootState) => state.allProducts.searchTerm
  );

  const totalPrice = cart
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

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
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ maxWidth: 400 }}
                prefix={<SearchOutlined />}
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
