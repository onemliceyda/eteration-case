import "./App.css";
import Header from "./components/header/Header.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/product-list/ProductList.tsx";
import ProductDetail from "./components/product-detail/ProductDetail.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
