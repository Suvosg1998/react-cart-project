import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../Layout/Header";
import { Footer } from "../Layout/Footer";

import { CartPage } from "../Components/CartPage";
import HomePage from "../Components/Home";
import ProductDetails from "../Components/ProductDetails";

const Routing = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:category" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default Routing;