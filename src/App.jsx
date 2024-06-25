import React from "react";
import PaymentSuccess from "./componentsJSX/Paymentsuccess";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginForm from "./componentsJSX/LoginForm";
import RootLayout from "./componentsJSX/RootLayout";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import CustomerService from "./pages/CustomerService";
import Member from "./pages/Member";
import Checkout from "./pages/Checkout";
import { UserDataProvider } from "./componentsJSX/UserDataContext";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const _token = localStorage.getItem("token")?.slice(7);
    const token = _token ? jwtDecode(_token) : "";
    token.exp > Date.now() / 1000 ? setIsLogin(true) : setIsLogin(false);
  }, []);
  console.log("isLoginisLoginisLogin", isLogin);
  const a = 1;
  return (
    <Router>
      <UserDataProvider>
        <Routes>
          <Route element={<RootLayout />}>
            Home
            <Route path="/" element={<Home />} />
            <Route
              path="/contact"
              element={!isLogin ? <Navigate to="/" replace /> : <Contact />}
            />
            <Route
              path="/favorite"
              element={!isLogin ? <Navigate to="/" replace /> : <Favorite />}
            />
            <Route
              path="/cart"
              element={!isLogin ? <Navigate to="/" replace /> : <Cart />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/search" element={<Search />} />
            <Route path="/productpage/:id" element={<ProductPage />} />
            <Route
              path="/checkout"
              element={!isLogin ? <Navigate to="/" replace /> : <Checkout />}
            />
            <Route
              path="customerservice"
              element={
                !isLogin ? <Navigate to="/" replace /> : <CustomerService />
              }
            />
            <Route
              path="member"
              element={!isLogin ? <Navigate to="/" replace /> : <Member />}
            />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </UserDataProvider>
    </Router>
  );
};

export default App;
