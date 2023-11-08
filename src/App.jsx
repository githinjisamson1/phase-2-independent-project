import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/productsPage/Products";
import ShoppingCart from "./pages/shoppingCartPage/ShoppingCart";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* configure routes */}
      <Routes>
        <Route index path="/products" element={<Products />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
};

export default App;
