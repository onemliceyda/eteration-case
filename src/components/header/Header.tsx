import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Input, Layout, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
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

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.allProducts.cart);
  const totalQuantity = useSelector(selectTotalQuantity);
  const searchTerm = useSelector(
    (state: RootState) => state.allProducts.searchTerm
  );

  const totalPrice = cart
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleSearchChange = (e: any) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: "#2A59FE",
          width: "100%",
        }}
      >
        <Row justify="space-between" align="middle" style={{ width: "100%" }}>
          <Col>
            <Link to={"/"}>
              <h4
                style={{
                  color: "#fff",
                  fontFamily: "Montserrat",
                  fontSize: "24px",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Eteration
              </h4>
            </Link>
          </Col>
          <Col flex="auto" style={{ textAlign: "center" }}>
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ maxWidth: 400, margin: "0 auto" }}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginRight: "100px",
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
                  fontFamily: "Montserrat",
                }}
              >
                {totalPrice} ₺
              </span>
            </div>
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default Header;
