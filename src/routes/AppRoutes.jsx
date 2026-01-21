import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import Admin from "../pages/Admin";
import Adminproduct from "../pages/Adminproduct";
import AdminProductAdd from "../pages/AdminProductAdd";
import AdminEditProduct from "../pages/AdminEditProduct";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Admin */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/products" element={<Adminproduct />} />
      <Route path="/admin/products/add" element={<AdminProductAdd />} />
      <Route path="/admin/products/edit" element={<AdminEditProduct />} />
    </Routes>
  );
};

export default AppRoutes;
