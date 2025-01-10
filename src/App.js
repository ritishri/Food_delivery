import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import MenuPage from "./pages/Menu.js";
import OrderPage from "./pages/Order.js";
import Cart from "./pages/Cart.js";
import Home from "./pages/Home.js";

function App() {
    return (
      
        <Router>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<OrderPage />} />
            </Routes>
        </Router>
    );
}

export default App;
