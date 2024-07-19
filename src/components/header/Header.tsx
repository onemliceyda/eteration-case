import React from "react";
import { Badge, Button, Col, Input, Layout, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Header = () => {
  const { Header } = Layout;
  const { Search } = Input;

  return (
    <Header
      style={{
        backgroundColor: "#2A59FE",
        display: "flex",
        alignItems: "center",
        padding: "0",
        width: "100%",
      }}
    >
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
          flex="100px"
          style={{
            textAlign: "right",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Badge count={5}>
            <Button
              type="link"
              icon={<ShoppingCartOutlined />}
              style={{
                color: "#fff",
              }}
            />
          </Badge>
        </Col>
      </Row>
    </Header>
  );
};

export default Header;
